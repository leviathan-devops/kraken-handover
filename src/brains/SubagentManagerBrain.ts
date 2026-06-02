/**
 * SubagentManagerBrain — V1.2
 * 
 * Standalone brain managing the subagent-manager plugin integration.
 * Receives override commands from Execution Brain, manages container pool,
 * handles output retrieval as first-class operation, reports back with autonomy levels.
 * 
 * Autonomy levels per blueprint:
 * - HIGH: execute_task, allocate_container, queue_subtask, report_progress
 * - MEDIUM: merge_outputs, change_task_priority, allocate_extra_resources  
 * - LOW: abort_task, change_task_scope, reassign_to_cluster, claim_task_complete
 */

import type { BrainMessenger, BrainMessage, OverrideCommand } from '../shared/brain-messenger.js';
import type { StateStore } from '../shared/state-store.js';
import { existsSync } from 'fs';
import { execFileSync } from 'child_process';

export type AutonomyLevel = 'high' | 'medium' | 'low';

export interface SubagentState {
  initialized: boolean;
  activeContainers: number;
  queuedTasks: number;
  completedTasks: number;
  failedTasks: number;
  outputsRetrieved: number;
  outputsPending: number;
  overrideCommandsReceived: number;
  overrideCommandsProcessed: number;
}

export class SubagentManagerBrain {
  private initialized = false;
  private messenger: BrainMessenger;
  private stateStore: StateStore;
  private state: SubagentState = {
    initialized: false,
    activeContainers: 0,
    queuedTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    outputsRetrieved: 0,
    outputsPending: 0,
    overrideCommandsReceived: 0,
    overrideCommandsProcessed: 0,
  };

  private sanitizeContainerName(name: string): string {
    const sanitized = name.replace(/[^a-zA-Z0-9_.-]/g, '');
    if (sanitized !== name) {
      console.warn(`[SubagentManagerBrain] Container name sanitized: "${name}" → "${sanitized}"`);
    }
    return sanitized;
  }

  constructor(messenger: BrainMessenger, stateStore: StateStore) {
    this.messenger = messenger;
    this.stateStore = stateStore;
  }

  initialize(): void {
    if (this.initialized) return;
    this.initialized = true;
    this.state.initialized = true;

    // Subscribe to override commands from Execution Brain
    this.messenger.subscribe('kraken-subagent', this.handleMessage.bind(this));

    console.error('[SubagentManagerBrain] Initialized — listening for override commands');
  }

  isInitialized(): boolean { return this.initialized; }

  /**
   * Process incoming messages from other brains.
   * Execution Brain sends override commands here.
   */
  private async handleMessage(message: BrainMessage): Promise<void> {
    this.state.overrideCommandsReceived++;

    switch (message.payload.action) {
      case 'ABORT':
        await this.handleAbort(message);
        break;
      case 'CLAIM_COMPLETE':
        await this.handleClaimComplete(message);
        break;
      case 'RETRIEVE_OUTPUTS':
        await this.handleRetrieveOutputs(message);
        break;
      case 'REASSIGN':
        await this.handleReassign(message);
        break;
      case 'RETRY':
        await this.handleRetry(message);
        break;
      case 'SUSPEND':
        await this.handleSuspend(message);
        break;
      case 'RESUME':
        await this.handleResume(message);
        break;
      default:
        console.error(`[SubagentManagerBrain] Unknown override action: ${message.payload.action}`);
    }

    this.state.overrideCommandsProcessed++;
  }

  private async handleAbort(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId || message.payload.taskId as string;
    const containerName = message.payload.containerName as string;
    console.error(`[SubagentManagerBrain] ABORT: task ${taskId}, container ${containerName || 'none'}`);

    if (containerName) {
      const safeName = this.sanitizeContainerName(containerName);
      try {
        try {
          const sessions = execFileSync('docker', ['exec', safeName, 'tmux', 'list-sessions', '-F', '#{session_name}'], { timeout: 3000 }).toString().trim();
          if (sessions) {
            const s = sessions.split('\n')[0].replace(/[^a-zA-Z0-9_.-]/g, '');
            execFileSync('docker', ['exec', safeName, 'tmux', 'send-keys', '-t', s, 'C-c'], { timeout: 3000 });
            execFileSync('docker', ['exec', safeName, 'tmux', 'send-keys', '-t', s, 'exit', 'Enter'], { timeout: 2000 });
          }
        } catch (e) { console.error('[SubagentManagerBrain] tmux session cleanup failed:', e instanceof Error ? e.message : String(e)); }
        execFileSync('docker', ['kill', safeName], { timeout: 5000 });
        console.error(`[SubagentManagerBrain] Container ${containerName} killed`);
      } catch (err) { console.warn('[SubagentManagerBrain] Abort error:', err instanceof Error ? err.message : String(err)); }
    }

    this.messenger.acknowledgeCommand(message.payload.commandId as string || message.id, 'completed');
  }

  private async handleClaimComplete(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    const evidence = (message.payload.evidence as string[]) || [];
    console.error(`[SubagentManagerBrain] CLAIM_COMPLETE: task ${taskId}, ${evidence.length} files`);

    if (evidence.length === 0) {
      console.warn(`[SubagentManagerBrain] L2_BLOCK: No evidence for task ${taskId}`);
      this.messenger.acknowledgeCommand(message.payload.commandId as string, 'rejected');
      return;
    }

    const verified = evidence.filter(p => existsSync(p));
    const missing = evidence.filter(p => !existsSync(p));

    if (missing.length > 0) {
      console.warn(`[SubagentManagerBrain] L2_BLOCK: ${missing.length} files not on host: ${missing.slice(0,5).join(', ')}`);
      this.messenger.acknowledgeCommand(message.payload.commandId as string, 'rejected');
      this.messenger.deliverMessage('kraken-subagent', 'kraken-execution', 'L2_BLOCK', { taskId, missingFiles: missing }, 'high');
      return;
    }

    this.state.completedTasks++;
    console.error(`[SubagentManagerBrain] Task ${taskId} verified: ${verified.length} files on host`);
    this.messenger.acknowledgeCommand(message.payload.commandId as string, 'completed');
  }

  private async handleRetrieveOutputs(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    const containerName = message.payload.containerName as string;
    const paths = (message.payload.outputPaths as string[]) || [];
    const dest = (message.payload.destDir as string) || process.cwd();
    console.error(`[SubagentManagerBrain] RETRIEVE: task ${taskId}, ${paths.length} files → ${dest}`);

    this.state.outputsPending++;
    if (!containerName || paths.length === 0) {
      this.state.outputsPending--;
      this.messenger.acknowledgeCommand(message.payload.commandId as string, 'rejected');
      return;
    }

    let retrieved = 0;
    for (const p of paths) {
      try {
        const safeName = this.sanitizeContainerName(containerName);
        execFileSync('docker', ['cp', `${safeName}:${p}`, dest], { timeout: 10000 });
        retrieved++;
      } catch (e) { console.warn(`[SubagentManagerBrain] cp failed: ${p}:`, e instanceof Error ? e.message : String(e)); }
    }

    this.state.outputsRetrieved += retrieved;
    this.state.outputsPending--;
    this.messenger.acknowledgeCommand(message.payload.commandId as string, retrieved > 0 ? 'completed' : 'rejected');
  }

  private async handleReassign(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    const targetCluster = message.payload.targetCluster as string;
    const containerName = message.payload.containerName as string;
    console.error(`[SubagentManagerBrain] REASSIGN: task ${taskId} → ${targetCluster}`);

    if (containerName) {
      try {
        const safeName = this.sanitizeContainerName(containerName);
        execFileSync('docker', ['kill', safeName], { timeout: 5000 });
        this.state.activeContainers--;
        console.error(`[SubagentManagerBrain] Killed container ${safeName} for reassignment`);
      } catch (err: unknown) {
        console.warn('[SubagentManagerBrain] Reassign kill failed:', err instanceof Error ? err.message : String(err));
      }
    }

    this.messenger.deliverMessage(
      'kraken-subagent',
      'kraken-execution',
      'task-reassigned',
      { taskId, targetCluster, previousContainer: containerName },
      'high'
    );
    this.messenger.acknowledgeCommand(message.payload.commandId as string, 'completed');
  }

  private async handleRetry(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    const containerName = message.payload.containerName as string;
    const originalTask = message.payload.task as string;
    const targetCluster = (message.payload.targetCluster || message.payload.target?.clusterId) as string;
    console.error(`[SubagentManagerBrain] RETRY: task ${taskId}`);

    if (containerName) {
      try {
        const safeName = this.sanitizeContainerName(containerName);
        execFileSync('docker', ['kill', safeName], { timeout: 5000 });
        this.state.activeContainers--;
      } catch (e) { console.error('[SubagentManagerBrain] retry container kill failed:', e instanceof Error ? e.message : String(e)); }
    }

    this.messenger.deliverMessage(
      'kraken-subagent',
      'kraken-execution',
      'task-retry',
      { taskId, task: originalTask, targetCluster },
      'high'
    );
    this.messenger.acknowledgeCommand(message.payload.commandId as string, 'completed');
  }

  private async handleSuspend(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    const containerName = message.payload.containerName as string;
    console.error(`[SubagentManagerBrain] SUSPEND: task ${taskId}, container ${containerName || 'none'}`);

    if (containerName) {
      const safeName = this.sanitizeContainerName(containerName);
      let suspended = false;
      try {
        const sessions = execFileSync('docker', ['exec', safeName, 'tmux', 'list-sessions', '-F', '#{session_name}'], { timeout: 3000 }).toString().trim();
        if (sessions) {
          const s = sessions.split('\n')[0].replace(/[^a-zA-Z0-9_.-]/g, '');
          execFileSync('docker', ['exec', safeName, 'tmux', 'send-keys', '-t', s, 'C-z'], { timeout: 3000 });
          console.error(`[SubagentManagerBrain] SIGTSTP sent via tmux session ${s}`);
          suspended = true;
        }
      } catch (e) { console.error('[SubagentManagerBrain] tmux suspend failed:', e instanceof Error ? e.message : String(e)); }

      if (!suspended) {
        try {
          execFileSync('docker', ['pause', safeName], { timeout: 5000 });
          console.error(`[SubagentManagerBrain] Container ${safeName} paused as fallback`);
          suspended = true;
        } catch (e) { console.error('[SubagentManagerBrain] docker pause failed:', e instanceof Error ? e.message : String(e)); }
      }

      this.messenger.acknowledgeCommand(message.payload.commandId as string, suspended ? 'completed' : 'rejected');
    } else {
      this.messenger.acknowledgeCommand(message.payload.commandId as string, 'rejected');
    }
  }

  private async handleResume(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    const containerName = message.payload.containerName as string;
    console.error(`[SubagentManagerBrain] RESUME: task ${taskId}, container ${containerName || 'none'}`);

    if (containerName) {
      const safeName = this.sanitizeContainerName(containerName);
      let resumed = false;

      try {
        execFileSync('docker', ['unpause', safeName], { timeout: 5000 });
        console.error(`[SubagentManagerBrain] Container ${safeName} unpaused`);
        resumed = true;
      } catch (e) { console.error('[SubagentManagerBrain] docker unpause failed:', e instanceof Error ? e.message : String(e)); }

      if (!resumed) {
        try {
          const sessions = execFileSync('docker', ['exec', safeName, 'tmux', 'list-sessions', '-F', '#{session_name}'], { timeout: 3000 }).toString().trim();
          if (sessions) {
            const s = sessions.split('\n')[0].replace(/[^a-zA-Z0-9_.-]/g, '');
            execFileSync('docker', ['exec', safeName, 'tmux', 'send-keys', '-t', s, 'fg', 'Enter'], { timeout: 3000 });
            console.error(`[SubagentManagerBrain] fg sent via tmux session ${s}`);
            resumed = true;
          }
        } catch (e) { console.error('[SubagentManagerBrain] tmux resume failed:', e instanceof Error ? e.message : String(e)); }
      }

      this.messenger.acknowledgeCommand(message.payload.commandId as string, resumed ? 'completed' : 'rejected');
    } else {
      this.messenger.acknowledgeCommand(message.payload.commandId as string, 'rejected');
    }
  }

  getState(): SubagentState {
    return { ...this.state };
  }

  cleanup(): void {
    this.state = {
      initialized: false,
      activeContainers: 0,
      queuedTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      outputsRetrieved: 0,
      outputsPending: 0,
      overrideCommandsReceived: 0,
      overrideCommandsProcessed: 0,
    };
  }
}
