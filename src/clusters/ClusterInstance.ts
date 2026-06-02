/**
 * src/clusters/ClusterInstance.ts
 *
 * Cluster Instance for Kraken
 *
 * Individual cluster runtime with async task queue and parallel execution.
 * Each cluster processes tasks asynchronously with its pool of agents.
 *
 * Fixes applied:
 * - P1-2: FIFO queue processing (was LIFO)
 * - P1-3: Dynamic agent.id (was hardcoded shark-alpha-1/manta-beta-1)
 * - P1-4: Removed double-escaped JSON
 * - P1-7: Per-agent capacity tracking (was blocking on all pending ops)
 * - D10: Removed unused SUBAGENT_PORT_BASE
 */

import type {
  ClusterConfig,
  ClusterLoad,
  KrakenDelegationRequest,
  KrakenDelegationResult,
  ClusterAgentInstance
} from '../factory/kraken-types.js';
import { spawn } from 'node:child_process';

export class ClusterInstance {
  private config: ClusterConfig;
  private agents: Map<string, ClusterAgentInstance>;
  private taskQueue: Array<{
    request: KrakenDelegationRequest;
    resolve: (result: KrakenDelegationResult) => void;
    reject: (error: Error) => void;
  }>;
  private completedTasks: KrakenDelegationResult[];
  private failedTasks: KrakenDelegationResult[];
  private processing: boolean;
  private load: ClusterLoad;
  private shutdownFlag: boolean;
  private pendingByAgent: Map<string, boolean>;

  constructor(config: ClusterConfig) {
    this.config = config;
    this.agents = new Map();
    this.taskQueue = [];
    this.completedTasks = [];
    this.failedTasks = [];
    this.processing = false;
    this.shutdownFlag = false;
    this.pendingByAgent = new Map();

    this.load = {
      clusterId: config.id,
      activeTasks: 0,
      pendingTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      lastActivity: Date.now(),
    };

    this.initializeAgents();
    this.startProcessing();
  }

  private initializeAgents(): void {
    for (const agentId of this.config.agents) {
      const agentType = agentId.startsWith('shark-') ? 'shark' : 'manta';
      this.agents.set(agentId, {
        id: agentId,
        agentType,
        busy: false,
        clusterId: this.config.id,
      });
      this.pendingByAgent.set(agentId, false);
    }
  }

  private startProcessing(): void {
    if (this.processing) return;
    this.processing = true;
    this.processLoop();
  }

  private async processLoop(): Promise<void> {
    while (!this.shutdownFlag) {
      let assigned = false;

      for (let i = 0; i < this.taskQueue.length; i++) {
        const task = this.taskQueue[i];
        if (!task) continue;

        const requiredAgentType = task.request.context?.agentType as string | undefined;
        const agent = this.findAvailableAgent(requiredAgentType);

        if (agent) {
          this.taskQueue.splice(i, 1);
          i--;

          this.pendingByAgent.set(agent.id, true);
          this.executeTaskAsync(agent, task.request)
            .then(result => {
              task.resolve(result);
            })
            .catch(error => {
              task.reject(error instanceof Error ? error : new Error(String(error)));
            })
            .finally(() => {
              this.pendingByAgent.set(agent.id, false);
            });
          assigned = true;
        }
      }

      if (!assigned) {
        await this.sleep(100);
      }
    }

    const maxWait = Date.now() + 10000;
    while (Array.from(this.pendingByAgent.values()).some(p => p) && Date.now() < maxWait) {
      await this.sleep(100);
    }

    this.processing = false;
  }

  private findAvailableAgent(agentType?: string): ClusterAgentInstance | undefined {
    for (const agent of this.agents.values()) {
      if (agent.busy) continue;
      if (this.pendingByAgent.get(agent.id)) continue;
      if (agentType !== undefined && agent.agentType !== agentType) continue;
      return agent;
    }
    return undefined;
  }

  private async executeTaskAsync(
    agent: ClusterAgentInstance,
    request: KrakenDelegationRequest
  ): Promise<KrakenDelegationResult> {
    agent.busy = true;
    agent.currentTaskId = request.taskId;
    this.load.activeTasks++;
    this.load.pendingTasks = Math.max(0, this.load.pendingTasks - 1);
    this.load.lastActivity = Date.now();

    try {
      const result = await this.executeOnAgent(agent, request);

      if (result.success) {
        this.completedTasks.push(result);
        this.load.completedTasks++;
      } else {
        this.failedTasks.push(result);
        this.load.failedTasks++;
      }

      return result;
    } catch (error) {
      const failedResult: KrakenDelegationResult = {
        success: false,
        taskId: request.taskId,
        clusterId: this.config.id,
        agentId: agent.id,
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
        completedAt: Date.now(),
      };
      this.failedTasks.push(failedResult);
      this.load.failedTasks++;
      return failedResult;
    } finally {
      agent.busy = false;
      agent.currentTaskId = undefined;
      this.load.activeTasks = Math.max(0, this.load.activeTasks - 1);
      this.load.lastActivity = Date.now();
    }
  }

  private async executeOnAgent(
    agent: ClusterAgentInstance,
    request: KrakenDelegationRequest,
    retryCount: number = 0
  ): Promise<KrakenDelegationResult> {
    const MAX_RETRIES = 1;
    const result = await this.spawnAgentTask(agent, request);

    if (!result.success && retryCount < MAX_RETRIES) {
      console.error(`[ClusterInstance] Retrying failed task ${request.taskId} (attempt ${retryCount + 2}/${MAX_RETRIES + 1})`);
      await new Promise(r => setTimeout(r, 1000));
      return this.executeOnAgent(agent, request, retryCount + 1);
    }

    return result;
  }

  private spawnAgentTask(
    agent: ClusterAgentInstance,
    request: KrakenDelegationRequest
  ): Promise<KrakenDelegationResult> {
    return new Promise((resolve) => {
      let settled = false;
      const safeResolve = (result: KrakenDelegationResult) => {
        if (settled) return;
        settled = true;
        resolve(result);
      };

      const taskId = request.taskId;
      const taskScript = JSON.stringify(request.task).replace(/'/g, "\\'");

      const subagentScript = `
const m = await import('/root/.config/opencode/plugins/kraken-agent/dist/index.js');
const hooks = await m.default({directory: '/tmp'});

const agentId = '${agent.id}';
const agentType = '${agent.agentType}';
const taskId = '${taskId}';
const task = ${taskScript};

let result;
const sysCtx = {system: []};
await hooks['experimental.chat.system.transform']({agent: agentId}, sysCtx);
let out = {};
await hooks['chat.message']({message:{content:task},session:{agentName:agentId,sessionID:'sub-'+taskId}}, out);
result = {success: true, output: out.content || JSON.stringify(out), system: sysCtx.system};

console.log(JSON.stringify(result));
process.exit(0);
`;

      const containerName = `kraken-sub-${taskId}`;

      console.error(`[ClusterInstance] Spawning subagent container for ${agent.id}: ${request.task.substring(0, 80)}...`);

      const proc = spawn('docker', [
        'run', '-d', '--rm',
        '--name', containerName,
        '--network', 'host',
        '-v', '/root/.config/opencode:/root/.config/opencode',
        '-v', '/root/.local/share/opencode/hive-mind:/root/.local/share/opencode/hive-mind',
        'opencode-test:1.14.34',
        '/bin/sh', '-c',
        `node -e '${subagentScript}' 2>&1`
      ], { stdio: ['pipe', 'pipe', 'pipe'] });

      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (data: Buffer) => { stdout += data.toString(); });
      proc.stderr.on('data', (data: Buffer) => { stderr += data.toString(); });

      const timeout = setTimeout(() => {
        proc.kill('SIGTERM');
        setTimeout(() => {
          try { proc.kill('SIGKILL'); } catch (_e) { /* already dead */ }
          spawn('docker', ['kill', containerName], { stdio: 'ignore' }).unref();
        }, 5000).unref();
        safeResolve({
          success: false, taskId, clusterId: this.config.id, agentId: agent.id,
          status: 'failed', error: 'Subagent spawned but timed out — container may still be running',
          completedAt: Date.now(),
        });
      }, 120000);
      timeout.unref();

      proc.on('close', (exitCode) => {
        clearTimeout(timeout);
        try {
          let result;
          const stdoutTrim = stdout.trim();
          const lastJsonLine = stdoutTrim.split('\n').filter(l => l.trim().startsWith('{') || l.trim().startsWith('[')).pop();

          if (lastJsonLine) {
            result = JSON.parse(lastJsonLine);
          } else if (stderr.includes('success')) {
            result = { success: true, raw: stderr.substring(0, 500) };
          } else {
            result = { success: exitCode === 0, error: stderr || 'No output from subagent', stdout: stdoutTrim.substring(0, 200) };
          }

          console.error(`[ClusterInstance] Subagent ${agent.id} task ${taskId}: ${result.success ? 'SUCCESS' : 'FAILED'}`);

          spawn('docker', ['kill', containerName], { stdio: 'ignore' }).unref();

          safeResolve({
            success: result.success !== false,
            taskId, clusterId: this.config.id, agentId: agent.id,
            status: result.success ? 'completed' : 'failed',
            error: result.error,
            output: result.output || '',
            completedAt: Date.now(),
          });
        } catch (parseError) {
          console.error(`[ClusterInstance] Parse error: ${parseError}`);
          console.error(`[ClusterInstance] stdout: ${stdout.substring(0, 300)}`);
          spawn('docker', ['kill', containerName], { stdio: 'ignore' }).unref();
          safeResolve({
            success: false, taskId, clusterId: this.config.id, agentId: agent.id,
            status: 'failed',
            error: `Parse error: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
            completedAt: Date.now(),
          });
        }
      });

      proc.on('error', (error) => {
        clearTimeout(timeout);
        console.error(`[ClusterInstance] Spawn error: ${error.message}`);
        safeResolve({
          success: false, taskId, clusterId: this.config.id, agentId: agent.id,
          status: 'failed',
          error: `Failed to spawn subagent: ${error.message}`,
          completedAt: Date.now(),
        });
      });
    });
  }

  enqueueTask(request: KrakenDelegationRequest): Promise<KrakenDelegationResult> {
    this.load.pendingTasks++;
    this.load.lastActivity = Date.now();

    return new Promise((resolve, reject) => {
      this.taskQueue.push({ request, resolve, reject });
    });
  }

  getLoad(): ClusterLoad {
    return {
      ...this.load,
      clusterId: this.config.id,
    };
  }

  getAgent(agentId: string): ClusterAgentInstance | undefined {
    return this.agents.get(agentId);
  }

  getAllAgents(): ClusterAgentInstance[] {
    return Array.from(this.agents.values());
  }

  getConfig(): ClusterConfig {
    return this.config;
  }

  getCompletedTasks(): KrakenDelegationResult[] {
    return [...this.completedTasks];
  }

  getFailedTasks(): KrakenDelegationResult[] {
    return [...this.failedTasks];
  }

  getQueueLength(): number {
    return this.taskQueue.length;
  }

  async shutdown(): Promise<void> {
    this.shutdownFlag = true;

    const startTime = Date.now();
    const timeout = 5000;

    while (this.load.activeTasks > 0 && Date.now() - startTime < timeout) {
      await this.sleep(100);
    }

    for (const task of this.taskQueue) {
      task.reject(new Error('Cluster shutting down'));
    }
    this.taskQueue = [];
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
