/**
 * src/clusters/ClusterEngine.ts
 *
 * ClusterEngine — Task lifecycle state, health monitoring, timeout detection, retry logic.
 *
 * 13 patterns ported from working implementation with Kraken-native naming:
 * M1  constructCluster
 * M2  calculateAgentCount
 * M3  generateAgentTasks
 * M4  activateCluster
 * M5  markTasksRunning
 * M6  updateTaskStatus
 * M7  updateClusterStatus (private)
 * M8  updateClusterHealth (private)
 * M9  detectTaskAlerts
 * M10 retryCluster
 * M11 retrySingleTask
 * M12 drainCluster
 * M13 computeOutputSimilarity (private)
 */

import type {
  KrakenCluster,
  KrakenAgentTask,
  ClusterHealth,
  TaskAlert,
  ClusterDrainReport,
  ClusterExecutionMode,
  AgentTaskStatus,
} from '../factory/kraken-types.js';

export class ClusterEngine {
  private clusters: Map<string, KrakenCluster> = new Map();

  constructCluster(
    task: string,
    criteria: string[],
    mode: ClusterExecutionMode,
    clusterId: string,
    agentCount?: number,
  ): string {
    const count = agentCount ?? this.calculateAgentCount(task, mode);

    const cluster: KrakenCluster = {
      clusterId,
      task,
      acceptanceCriteria: criteria,
      executionMode: mode,
      tasks: [],
      clusterHealth: {
        taskCount: 0,
        activeTasks: 0,
        completedTasks: 0,
        failedTasks: 0,
        escalationCount: 0,
        lastRetry: 0,
      },
      escalationCount: 0,
      createdAt: Date.now(),
      status: 'constructing',
    };

    cluster.tasks = this.generateAgentTasks(clusterId, task, mode, count);
    cluster.clusterHealth.taskCount = cluster.tasks.length;

    this.clusters.set(clusterId, cluster);
    return clusterId;
  }

  calculateAgentCount(task: string, mode: ClusterExecutionMode): number {
    const taskLen = task.length;

    switch (mode) {
      case 'verify': {
        if (taskLen < 200) return 2;
        if (taskLen < 1000) return 3;
        return 4;
      }
      case 'divide': {
        if (taskLen < 200) return 2;
        if (taskLen < 500) return 3;
        if (taskLen < 1500) return 4;
        if (taskLen < 3000) return 5;
        return 6;
      }
      case 'pressure':
        return 4;
      default:
        return 2;
    }
  }

  generateAgentTasks(
    clusterId: string,
    task: string,
    mode: ClusterExecutionMode,
    count: number,
  ): KrakenAgentTask[] {
    const tasks: KrakenAgentTask[] = [];

    for (let i = 0; i < count; i++) {
      const agentTypes = mode === 'pressure'
        ? ['shark', 'manta', 'shark', 'manta']
        : ['shark', 'manta'];
      const agentType = agentTypes[i % agentTypes.length];

      let description = task;
      if (mode === 'verify') {
        description = `[Verify Approach ${i + 1}/${count}] ${task}`;
      } else if (mode === 'divide') {
        description = `[Part ${i + 1}/${count}] ${task}`;
      } else if (mode === 'pressure') {
        description = `[Pressure Phase ${i + 1}] ${task}`;
      }

      tasks.push({
        taskId: `ct_${clusterId}_${i}_${Date.now().toString(36)}`,
        agentType,
        taskDescription: description,
        assignedFiles: [],
        agentSessionId: '',
        status: 'pending',
        output: '',
        startedAt: 0,
      });
    }

    return tasks;
  }

  activateCluster(clusterId: string): boolean {
    const cluster = this.clusters.get(clusterId);
    if (!cluster) return false;

    cluster.status = 'active';
    for (const task of cluster.tasks) {
      if (task.status === 'pending') {
        task.status = 'spawning';
      }
    }
    this.updateClusterHealth(cluster);
    return true;
  }

  markTasksRunning(clusterId: string): number {
    const cluster = this.clusters.get(clusterId);
    if (!cluster) return 0;

    let marked = 0;
    for (const task of cluster.tasks) {
      if (task.status === 'spawning') {
        task.status = 'running';
        task.startedAt = task.startedAt || Date.now();
        marked++;
      }
    }
    this.updateClusterHealth(cluster);
    return marked;
  }

  updateTaskStatus(
    clusterId: string,
    taskIndex: number,
    status: AgentTaskStatus,
    output?: string,
    exitCode?: number,
  ): boolean {
    const cluster = this.clusters.get(clusterId);
    if (!cluster) return false;

    const task = cluster.tasks[taskIndex];
    if (!task) return false;

    task.status = status;
    if (output !== undefined) task.output = output;
    if (exitCode !== undefined) task.exitCode = exitCode;
    if (status === 'completed' || status === 'failed') {
      task.completedAt = Date.now();
    }

    this.updateClusterHealth(cluster);
    this.updateClusterStatus(cluster);
    return true;
  }

  private updateClusterStatus(cluster: KrakenCluster): void {
    const allCompleted = cluster.tasks.every(t => t.status === 'completed');
    const anyFailed = cluster.tasks.some(t => t.status === 'failed');
    const anyRunning = cluster.tasks.some(t => t.status === 'running' || t.status === 'spawning');

    if (allCompleted) {
      cluster.status = 'completed';
    } else if (anyFailed && !anyRunning) {
      cluster.status = 'retrying';
    }
  }

  private updateClusterHealth(cluster: KrakenCluster): void {
    cluster.clusterHealth = {
      taskCount: cluster.tasks.length,
      activeTasks: cluster.tasks.filter(t => t.status === 'running' || t.status === 'spawning').length,
      completedTasks: cluster.tasks.filter(t => t.status === 'completed').length,
      failedTasks: cluster.tasks.filter(t => t.status === 'failed').length,
      escalationCount: cluster.escalationCount,
      lastRetry: cluster.clusterHealth.lastRetry,
    };
  }

  detectTaskAlerts(clusterId: string): TaskAlert[] {
    const cluster = this.clusters.get(clusterId);
    if (!cluster) return [];

    const alerts: TaskAlert[] = [];
    const now = Date.now();
    const STUCK_THRESHOLD_MS = 180000;
    const SLACK_OUTPUT_MIN = 50;

    for (let i = 0; i < cluster.tasks.length; i++) {
      const task = cluster.tasks[i];

      if (task.status === 'running' && task.startedAt > 0) {
        const elapsed = now - task.startedAt;
        if (elapsed > STUCK_THRESHOLD_MS) {
          alerts.push({
            type: 'stuck',
            taskIndex: i,
            taskId: task.taskId,
            reason: `Running for ${Math.round(elapsed / 1000)}s (threshold: ${STUCK_THRESHOLD_MS / 1000}s)`,
            timestamp: now,
          });
        }
      }

      if (task.status === 'failed') {
        alerts.push({
          type: 'failed',
          taskIndex: i,
          taskId: task.taskId,
          reason: `Task failed${task.output ? ': ' + task.output.substring(0, 200) : ''}`,
          timestamp: now,
        });
      }

      if (task.status === 'completed' && task.output.length < SLACK_OUTPUT_MIN) {
        alerts.push({
          type: 'slack',
          taskIndex: i,
          taskId: task.taskId,
          reason: `Completed with only ${task.output.length} chars output (min: ${SLACK_OUTPUT_MIN})`,
          timestamp: now,
        });
      }
    }

    if (cluster.executionMode === 'verify' && cluster.tasks.length >= 2) {
      const completedTasks = cluster.tasks.filter(t => t.status === 'completed');
      if (completedTasks.length >= 2) {
        for (let i = 0; i < completedTasks.length - 1; i++) {
          const sim = this.computeOutputSimilarity(completedTasks[i].output, completedTasks[i + 1].output);
          if (sim < 0.3) {
            alerts.push({
              type: 'divergent',
              taskIndex: cluster.tasks.indexOf(completedTasks[i]),
              taskId: completedTasks[i].taskId,
              reason: `Output similarity ${sim.toFixed(2)} below threshold 0.3`,
              timestamp: now,
            });
          }
        }
      }
    }

    return alerts;
  }

  retryCluster(clusterId: string, reason: string): boolean {
    const cluster = this.clusters.get(clusterId);
    if (!cluster) return false;

    let retried = 0;
    for (const task of cluster.tasks) {
      if (task.status === 'failed' || task.status === 'stuck') {
        task.status = 'pending';
        task.output = '';
        task.completedAt = undefined;
        retried++;
      }
    }

    if (retried > 0) {
      cluster.escalationCount++;
      cluster.status = 'active';
      cluster.clusterHealth.lastRetry = Date.now();
      this.updateClusterHealth(cluster);
      console.error(`[ClusterEngine] Retried ${retried} tasks in cluster ${clusterId}: ${reason}`);
    }

    return retried > 0;
  }

  retrySingleTask(clusterId: string, taskIndex: number, reason: string): boolean {
    const cluster = this.clusters.get(clusterId);
    if (!cluster) return false;

    const task = cluster.tasks[taskIndex];
    if (!task) return false;

    if (task.status !== 'failed' && task.status !== 'stuck') return false;

    task.status = 'pending';
    task.output = '';
    task.completedAt = undefined;

    cluster.escalationCount++;
    cluster.status = 'active';
    cluster.clusterHealth.lastRetry = Date.now();
    this.updateClusterHealth(cluster);

    console.error(`[ClusterEngine] Retried task ${task.taskId} in cluster ${clusterId}: ${reason}`);
    return true;
  }

  drainCluster(clusterId: string): ClusterDrainReport {
    const cluster = this.clusters.get(clusterId);

    if (!cluster) {
      return {
        clusterId,
        totalTasks: 0,
        completedTasks: 0,
        failedTasks: 0,
        finalOutput: '',
        evidencePath: '',
        drainedAt: Date.now(),
      };
    }

    const completedTasks = cluster.tasks.filter(t => t.status === 'completed');
    const failedTasks = cluster.tasks.filter(t => t.status === 'failed');
    const totalTasks = cluster.tasks.length;

    let mergedOutput = completedTasks.map(t => t.output).filter(o => o.length > 0).join('\n---\n');

    cluster.status = 'completed';
    this.updateClusterHealth(cluster);

    const passRate = totalTasks > 0 ? completedTasks.length / totalTasks : 0;

    const report: ClusterDrainReport = {
      clusterId,
      totalTasks,
      completedTasks: completedTasks.length,
      failedTasks: failedTasks.length,
      finalOutput: mergedOutput,
      evidencePath: '',
      drainedAt: Date.now(),
      passRate,
    };

    this.clusters.delete(clusterId);
    return report;
  }

  private computeOutputSimilarity(a: string, b: string): number {
    const tokenize = (s: string): Set<string> => {
      return new Set(
        s.toLowerCase()
          .replace(/[^\w\s]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length > 3)
      );
    };

    const setA = tokenize(a);
    const setB = tokenize(b);

    if (setA.size === 0 && setB.size === 0) return 1.0;
    if (setA.size === 0 || setB.size === 0) return 0.0;

    let intersection = 0;
    for (const word of setA) {
      if (setB.has(word)) intersection++;
    }

    const union = setA.size + setB.size - intersection;
    return union > 0 ? intersection / union : 0;
  }

  getCluster(clusterId: string): KrakenCluster | undefined {
    return this.clusters.get(clusterId);
  }

  getAllClusters(): KrakenCluster[] {
    return Array.from(this.clusters.values());
  }
}
