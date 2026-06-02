/**
 * src/brains/execution/execution-brain.ts
 *
 * V1.3 Execution Brain — CENTRAL EXECUTION ORCHESTRATOR
 *
 * Owns: execution-state, quality-state
 *
 * All spawn_* tools route through ExecutionBrain.
 * It sits ABOVE the AsyncDelegationEngine → ClusterManager → ClusterInstance chain.
 *
 * Key responsibilities:
 * - Task registration and lifecycle tracking (registerTask → completeTask)
 * - Task context injection for cluster agents via getPendingTask/claimTask
 * - Output verification (L2 fire-and-forget detection)
 * - Task health monitoring (stuck/failed/slack detection via detectTaskAlerts)
 * - Task retry and cluster drain
 * - Override commands (ABORT, RETRIEVE_OUTPUTS)
 * - Quality enforcement
 */

import { getStateStore, type StateStore } from '../../shared/state-store.js';
import { getBrainMessenger, type BrainMessenger } from '../../shared/brain-messenger.js';
import type { DomainId } from '../../shared/domain-ownership.js';
import type { OverrideCommand } from '../../shared/brain-messenger.js';
import type { PendingTask, TaskAlert, ClusterDrainReport } from '../../factory/kraken-types.js';

export interface ExecutionState {
  initialized: boolean;
  activeTasks: number;
  completedTasks: number;
  failedTasks: number;
}

export interface TaskOutput {
  taskId: string;
  path: string;
  type: 'file' | 'directory';
  required: boolean;
  retrieved: boolean;
  retrievedAt?: number;
}

export interface ExecutionResult {
  taskId: string;
  success: boolean;
  clusterId: string;
  agentId: string;
  output?: string;
  error?: string;
  completedAt: number;
}

export class ExecutionBrain {
  private initialized = false;
  private state: ExecutionState = {
    initialized: false,
    activeTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
  };
  private stateStore: StateStore;
  private messenger: BrainMessenger;
  private registeredOutputs: Map<string, TaskOutput[]> = new Map();
  private activeTasks: Map<string, { clusterId: string; status: string; startTime: number }> = new Map();
  private pendingTasks: Map<string, PendingTask> = new Map();
  private agentTaskIndex: Map<string, string> = new Map();
  private taskResults: Map<string, ExecutionResult> = new Map();

  constructor(stateStore?: StateStore, messenger?: BrainMessenger) {
    this.stateStore = stateStore || getStateStore();
    this.messenger = messenger || getBrainMessenger();
  }

  initialize(): void {
    if (this.initialized) return;

    console.error('[ExecutionBrain] Initializing...');
    this.initialized = true;
    this.state.initialized = true;

    this.stateStore.set('execution-state', 'initialized', true, ['kraken-execution']);
    this.stateStore.set('execution-state', 'brain-id', 'kraken-execution', ['kraken-execution']);

    this.messenger.subscribe('kraken-execution', this.handleBrainMessage.bind(this));

    console.error('[ExecutionBrain] Initialized — central execution orchestrator, owns execution-state, quality-state');
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  // =========================================================================
  // TASK LIFECYCLE — CENTRAL ORCHESTRATOR API
  // =========================================================================

  registerTask(task: PendingTask): void {
    if (!task.taskId || !task.agent || !task.description) {
      console.error('[ExecutionBrain] registerTask rejected — missing required fields:', {
        taskId: !!task.taskId,
        agent: !!task.agent,
        description: !!task.description,
      });
      return;
    }

    task.status = task.status || 'planned';
    task.registeredAt = task.registeredAt || Date.now();

    this.pendingTasks.set(task.taskId, task);
    this.agentTaskIndex.set(task.agent, task.taskId);

    this.stateStore.set('execution-state', `pending-${task.taskId}`, task, ['kraken-execution']);

    console.error(`[ExecutionBrain] Task registered: ${task.taskId} → agent ${task.agent}, status: ${task.status}`);
  }

  getPendingTask(agentId: string): PendingTask | null {
    const taskId = this.agentTaskIndex.get(agentId);
    if (!taskId) return null;

    const task = this.pendingTasks.get(taskId);
    if (!task) return null;

    if (task.status === 'planned' || task.status === 'spawning') {
      return { ...task };
    }

    return null;
  }

  claimTask(taskId: string): boolean {
    const task = this.pendingTasks.get(taskId);
    if (!task) {
      console.warn(`[ExecutionBrain] claimTask: task ${taskId} not found`);
      return false;
    }

    if (task.status !== 'planned') {
      console.warn(`[ExecutionBrain] claimTask: task ${taskId} not in planned state (current: ${task.status})`);
      return false;
    }

    task.status = 'spawning';

    this.stateStore.set('execution-state', `pending-${taskId}`, task, ['kraken-execution']);

    console.error(`[ExecutionBrain] Task claimed: ${taskId}, status → spawning`);
    return true;
  }

  completeTask(result: ExecutionResult): void {
    const task = this.pendingTasks.get(result.taskId);
    if (task) {
      task.status = result.success ? 'completed' : 'failed';
      task.output = result.output || task.output;
      task.completedAt = Date.now();
    }

    const taskInfo = this.activeTasks.get(result.taskId);
    if (taskInfo) {
      this.activeTasks.delete(result.taskId);
      this.state.activeTasks = Math.max(0, this.state.activeTasks - 1);
    }

    if (result.success) {
      this.state.completedTasks++;

      const outputs = this.registeredOutputs.get(result.taskId);
      if (outputs && outputs.length > 0) {
        const allVerified = outputs.every(o => o.retrieved);
        if (!allVerified) {
          console.warn(`[ExecutionBrain] L2_WARNING: Task ${result.taskId} completed but ${outputs.filter(o => !o.retrieved).length}/${outputs.length} outputs not retrieved`);
        }
      }
    } else {
      this.state.failedTasks++;
    }

    this.taskResults.set(result.taskId, result);

    if (task && task.agent) {
      const currentTaskId = this.agentTaskIndex.get(task.agent);
      if (currentTaskId === result.taskId) {
        this.agentTaskIndex.delete(task.agent);
      }
    }

    this.updateState();
    this.stateStore.set('execution-state', `result-${result.taskId}`, result, ['kraken-execution']);

    console.error(`[ExecutionBrain] Task ${result.taskId} completed: ${result.success ? 'SUCCESS' : 'FAILED'} (active: ${this.state.activeTasks}, completed: ${this.state.completedTasks}, failed: ${this.state.failedTasks})`);

    if (result.success) {
      this.messenger.deliverMessage('kraken-execution', 'kraken-system', 'task-complete', {
        type: 'task-complete-verified',
        taskId: result.taskId,
        clusterId: result.clusterId || (task ? task.clusterId : 'unknown'),
      }, 'normal');
    } else {
      this.messenger.deliverMessage('kraken-execution', 'kraken-system', 'task-failed', {
        type: 'task-failed',
        taskId: result.taskId,
        error: result.error,
      }, 'high');
    }
  }

  getAgentState(agentId: string): { busy: boolean; currentTask: string | null; status: string | null } {
    const taskId = this.agentTaskIndex.get(agentId);
    if (!taskId) {
      return { busy: false, currentTask: null, status: null };
    }

    const task = this.pendingTasks.get(taskId);
    if (!task) {
      return { busy: false, currentTask: null, status: null };
    }

    return {
      busy: task.status === 'running' || task.status === 'spawning',
      currentTask: taskId,
      status: task.status,
    };
  }

  detectTaskAlerts(): TaskAlert[] {
    const alerts: TaskAlert[] = [];
    const now = Date.now();
    const STUCK_THRESHOLD_MS = 180000;
    const SLACK_OUTPUT_MIN = 50;

    for (const task of this.pendingTasks.values()) {
      if (task.status === 'running') {
        const elapsed = now - task.registeredAt;
        if (elapsed > STUCK_THRESHOLD_MS) {
          alerts.push({
            type: 'stuck',
            taskIndex: -1,
            taskId: task.taskId,
            reason: `Task running for ${Math.round(elapsed / 1000)}s (threshold: ${STUCK_THRESHOLD_MS / 1000}s)`,
            timestamp: now,
          });
        }
      }

      if (task.status === 'failed') {
        alerts.push({
          type: 'failed',
          taskIndex: -1,
          taskId: task.taskId,
          reason: `Task failed${task.output ? ': ' + task.output.substring(0, 200) : ''}`,
          timestamp: now,
        });
      }

      if (task.status === 'completed' && task.output && task.output.length < SLACK_OUTPUT_MIN) {
        alerts.push({
          type: 'slack',
          taskIndex: -1,
          taskId: task.taskId,
          reason: `Completed with only ${task.output.length} chars output (min: ${SLACK_OUTPUT_MIN})`,
          timestamp: now,
        });
      }
    }

    return alerts;
  }

  retryTask(taskId: string): boolean {
    const task = this.pendingTasks.get(taskId);
    if (!task) {
      console.warn(`[ExecutionBrain] retryTask: task ${taskId} not found`);
      return false;
    }

    if (task.status !== 'failed' && task.status !== 'stuck') {
      console.warn(`[ExecutionBrain] retryTask: task ${taskId} not in failed/stuck state (current: ${task.status})`);
      return false;
    }

    task.status = 'planned';
    task.output = undefined;
    task.completedAt = undefined;
    task.registeredAt = Date.now();

    this.agentTaskIndex.set(task.agent, task.taskId);

    this.stateStore.set('execution-state', `pending-${taskId}`, task, ['kraken-execution']);

    console.error(`[ExecutionBrain] Task ${taskId} reset to planned for retry`);
    return true;
  }

  drainCluster(clusterId: string): ClusterDrainReport {
    const clusterTasks: PendingTask[] = [];
    let completedTasks = 0;
    let failedTasks = 0;
    const outputs: string[] = [];

    for (const task of this.pendingTasks.values()) {
      if (task.clusterId === clusterId) {
        clusterTasks.push(task);

        if (task.status === 'completed') {
          completedTasks++;
          if (task.output) outputs.push(task.output);
        } else if (task.status === 'failed') {
          failedTasks++;
        }
      }
    }

    const totalTasks = clusterTasks.length;
    const passRate = totalTasks > 0 ? completedTasks / totalTasks : 0;

    for (const task of clusterTasks) {
      this.pendingTasks.delete(task.taskId);
      if (this.agentTaskIndex.get(task.agent) === task.taskId) {
        this.agentTaskIndex.delete(task.agent);
      }
    }

    const report: ClusterDrainReport = {
      clusterId,
      totalTasks,
      completedTasks,
      failedTasks,
      finalOutput: outputs.join('\n---\n'),
      evidencePath: '',
      drainedAt: Date.now(),
      passRate,
    };

    this.stateStore.set('execution-state', `drain-${clusterId}`, report, ['kraken-execution']);

    console.error(`[ExecutionBrain] Cluster ${clusterId} drained: ${completedTasks}/${totalTasks} completed (${(passRate * 100).toFixed(1)}%)`);

    return report;
  }

  getTaskResult(taskId: string): ExecutionResult | undefined {
    return this.taskResults.get(taskId);
  }

  // =========================================================================
  // OUTPUT VERIFICATION (L2 ENFORCEMENT)
  // =========================================================================

  registerTaskOutputs(taskId: string, outputs: TaskOutput[]): void {
    this.registeredOutputs.set(taskId, outputs);
    console.error(`[ExecutionBrain] Registered ${outputs.length} outputs for task ${taskId}`);
    this.stateStore.set('execution-state', `outputs-${taskId}`, outputs, ['kraken-execution']);
  }

  async claimOutputsRetrieved(taskId: string, hostPaths: string[]): Promise<void> {
    const outputs = this.registeredOutputs.get(taskId);
    if (!outputs) {
      console.warn(`[ExecutionBrain] No registered outputs for task ${taskId}`);
      return;
    }

    for (const path of hostPaths) {
      const output = outputs.find(o => o.path === path);
      if (output) {
        output.retrieved = true;
        output.retrievedAt = Date.now();
      }
    }

    console.error(`[ExecutionBrain] Verified ${hostPaths.length} outputs for task ${taskId}`);
    this.stateStore.set('execution-state', `retrieved-${taskId}`, hostPaths, ['kraken-execution']);
  }

  canCompleteTask(taskId: string): boolean {
    const outputs = this.registeredOutputs.get(taskId);
    if (!outputs) return true;

    const required = outputs.filter(o => o.required);
    const retrieved = outputs.filter(o => o.retrieved);

    return required.length === retrieved.length;
  }

  getOutputStatus(taskId: string): { required: number; retrieved: number; complete: boolean } {
    const outputs = this.registeredOutputs.get(taskId) || [];
    const required = outputs.filter(o => o.required);
    const retrieved = outputs.filter(o => o.retrieved);

    return {
      required: required.length,
      retrieved: retrieved.length,
      complete: required.length === retrieved.length,
    };
  }

  getRegisteredOutputs(taskId: string): TaskOutput[] {
    return this.registeredOutputs.get(taskId) || [];
  }

  startTask(taskId: string, clusterId: string): void {
    const task = this.pendingTasks.get(taskId);
    if (task) {
      task.status = 'running';
    }

    this.activeTasks.set(taskId, {
      clusterId,
      status: 'executing',
      startTime: Date.now(),
    });
    this.state.activeTasks++;
    this.stateStore.set('execution-state', 'active-tasks', this.state.activeTasks, ['kraken-execution']);
    this.stateStore.set('execution-state', `task-${taskId}-start`, Date.now(), ['kraken-execution']);
    console.error(`[ExecutionBrain] Task ${taskId} started on cluster ${clusterId} (active: ${this.state.activeTasks})`);
  }

  // =========================================================================
  // SUPERVISION
  // =========================================================================

  async superviseTask(taskId: string): Promise<void> {
    const taskInfo = this.activeTasks.get(taskId);
    if (!taskInfo) {
      console.warn(`[ExecutionBrain] No active task ${taskId} to supervise`);
      return;
    }

    const outputStatus = this.getOutputStatus(taskId);

    if (!outputStatus.complete) {
      console.error(`[ExecutionBrain] Task ${taskId} outputs incomplete: ${outputStatus.retrieved}/${outputStatus.required}`);

      this.messenger.deliverMessage('kraken-execution', 'kraken-system', 'gate-failure', {
        taskId,
        reason: 'outputs-not-retrieved',
        required: outputStatus.required,
        retrieved: outputStatus.retrieved,
      }, 'critical');
    }
  }

  // =========================================================================
  // OVERRIDE COMMANDS
  // =========================================================================

  createOverrideCommand(params: {
    action: OverrideCommand['action'];
    target: { taskId?: string; brainId?: string; clusterId?: string };
    payload?: Record<string, unknown>;
    priority?: 'critical' | 'high';
  }): OverrideCommand {
    const commandId = `ovr-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    return {
      id: commandId,
      from: 'kraken-execution',
      to: params.target.brainId || params.target.clusterId || 'kraken-subagent',
      action: params.action,
      target: params.target,
      payload: params.payload || {},
      priority: params.priority || 'high',
      requiresAck: true,
      createdAt: Date.now(),
    };
  }

  async abortTask(taskId: string, reason: string): Promise<void> {
    const command = this.createOverrideCommand({
      action: 'ABORT',
      target: { taskId },
      payload: { reason },
      priority: 'critical',
    });

    this.messenger.sendOverride(command);
    console.error(`[ExecutionBrain] Abort command sent for task ${taskId}: ${command.id}`);
  }

  async enforceOutputRetrieval(taskId: string): Promise<void> {
    const command = this.createOverrideCommand({
      action: 'RETRIEVE_OUTPUTS',
      target: { taskId },
      payload: {},
      priority: 'high',
    });

    this.messenger.sendOverride(command);
  }

  // =========================================================================
  // QUALITY ENFORCEMENT
  // =========================================================================

  async checkQuality(taskId: string): Promise<{ passed: boolean; issues: string[] }> {
    const issues: string[] = [];

    const outputStatus = this.getOutputStatus(taskId);
    if (!outputStatus.complete) {
      issues.push(`Output incomplete: ${outputStatus.retrieved}/${outputStatus.required}`);
    }

    const taskInfo = this.activeTasks.get(taskId);
    if (taskInfo) {
      const duration = Date.now() - taskInfo.startTime;
      const timeout = 120000;
      if (duration > timeout) {
        issues.push(`Task duration ${duration}ms exceeds timeout ${timeout}ms`);
      }
    }

    const passed = issues.length === 0;

    this.stateStore.set('quality-state', `check-${taskId}`, { passed, issues }, ['kraken-execution']);

    return { passed, issues };
  }

  recordResult(result: ExecutionResult): void {
    this.completeTask(result);
  }

  private handleBrainMessage(message: { from: string; to: string; type: string; payload: Record<string, unknown> }): void {
    if (message.type === 'gate-failure' && message.from === 'kraken-system') {
      console.error(`[ExecutionBrain] Received gate failure: ${JSON.stringify(message.payload)}`);
    }
  }

  private updateState(): void {
    try {
      this.stateStore.set('execution-state', 'activeTasks', this.state.activeTasks, ['kraken-execution']);
      this.stateStore.set('execution-state', 'completedTasks', this.state.completedTasks, ['kraken-execution']);
      this.stateStore.set('execution-state', 'failedTasks', this.state.failedTasks, ['kraken-execution']);
    } catch (e) { console.error('[ExecutionBrain] state update failed:', e instanceof Error ? e.message : String(e)); }
  }

  getState(): ExecutionState {
    return { ...this.state };
  }

  getActiveTasks(): Map<string, { clusterId: string; status: string; startTime: number }> {
    return new Map(this.activeTasks);
  }

  getSnapshot(): Record<string, unknown> {
    return {
      ...this.stateStore.snapshot('execution-state'),
      ...this.stateStore.snapshot('quality-state'),
    };
  }

  cleanup(): void {
    this.registeredOutputs.clear();
    this.activeTasks.clear();
    this.pendingTasks.clear();
    this.agentTaskIndex.clear();
    this.taskResults.clear();
    this.state = {
      initialized: true,
      activeTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
    };
  }
}

let executionBrainInstance: ExecutionBrain | null = null;

export function createExecutionBrain(stateStore?: StateStore, messenger?: BrainMessenger): ExecutionBrain {
  if (!executionBrainInstance) {
    executionBrainInstance = new ExecutionBrain(stateStore, messenger);
  }
  return executionBrainInstance;
}

export function getExecutionBrain(): ExecutionBrain {
  if (!executionBrainInstance) {
    executionBrainInstance = new ExecutionBrain();
  }
  return executionBrainInstance;
}
