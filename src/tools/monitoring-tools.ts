/**
 * src/tools/monitoring-tools.ts
 * 
 * Monitoring Tools for Kraken
 * 
 * Tools for checking cluster status and aggregating results:
 * - get_cluster_status: Check cluster or system status
 * - aggregate_results: Wait for and aggregate multiple task results
 */

import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';
import type { ClusterEngine } from '../clusters/ClusterEngine.js';

export interface MonitoringToolsContext {
  delegationEngine: {
    waitForCompletion(taskId: string, timeoutMs: number): Promise<unknown>;
    waitForAll(taskIds: string[], timeoutMs: number): Promise<unknown[]>;
    getActiveTasks(): Map<string, unknown>;
    getPendingTasks(): unknown[];
    getQueuedCount(): number;
  };
  clusterManager: {
    getClusterStatus(clusterId: string): unknown;
    getAllClusterStatuses(): Map<string, unknown>;
    getTotalSystemLoad(): unknown;
    getAllAgents(): unknown[];
  };
  clusterEngine: ClusterEngine;
}

export function createMonitoringTools(ctx: MonitoringToolsContext) {
  return {
    /**
     * get_cluster_status - Check cluster status or system-wide status
     */
    get_cluster_status: tool({
      description: 'Get the status of clusters in the Kraken system. Can check a specific cluster or all clusters.',
      args: {
        clusterId: z.string().optional().describe('Specific cluster ID to check (all clusters if not specified)'),
      },
      execute: async (args) => {
        if (args.clusterId) {
          const status = ctx.clusterManager.getClusterStatus(args.clusterId);
          if (!status) {
            return JSON.stringify({
              error: `Cluster ${args.clusterId} not found`,
              availableClusters: Array.from(ctx.clusterManager.getAllClusterStatuses().keys()),
            }, null, 2);
          }
          const engineCluster = ctx.clusterEngine.getCluster(args.clusterId);
          const tasks = engineCluster
            ? engineCluster.tasks.map(t => ({
                taskId: t.taskId,
                agentType: t.agentType,
                status: t.status,
                startedAt: t.startedAt,
                completedAt: t.completedAt ?? null,
                outputLength: t.output.length,
              }))
            : [];
          const alerts = engineCluster ? ctx.clusterEngine.detectTaskAlerts(args.clusterId) : [];
          return JSON.stringify({ ...status, tasks, alerts }, null, 2);
        }

        // Return all cluster statuses + system summary
        const allStatuses = ctx.clusterManager.getAllClusterStatuses();
        const systemLoad = ctx.clusterManager.getTotalSystemLoad();
        const agents = ctx.clusterManager.getAllAgents();

        const engineClusters = ctx.clusterEngine.getAllClusters();
        const clusterTasks = engineClusters.map(c => ({
          clusterId: c.clusterId,
          status: c.status,
          executionMode: c.executionMode,
          taskCount: c.tasks.length,
          completedTasks: c.tasks.filter(t => t.status === 'completed').length,
          failedTasks: c.tasks.filter(t => t.status === 'failed').length,
          tasks: c.tasks.map(t => ({
            taskId: t.taskId,
            agentType: t.agentType,
            status: t.status,
          })),
        }));

        const summary = {
          clusters: Object.fromEntries(allStatuses),
          clusterTasks,
          system: systemLoad,
          agents: agents,
          delegationQueue: {
            queued: ctx.delegationEngine.getQueuedCount(),
            pending: ctx.delegationEngine.getPendingTasks().length,
            active: ctx.delegationEngine.getActiveTasks().size,
          },
        };

        return JSON.stringify(summary, null, 2);
      },
    }),

    /**
     * aggregate_results - Wait for multiple tasks and aggregate their results
     */
    aggregate_results: tool({
      description: 'Wait for multiple tasks to complete and aggregate their results. Useful for collecting results from parallel cluster execution.',
      args: {
        taskIds: z.array(z.string()).describe('List of task IDs to wait for and aggregate'),
        timeoutMs: z.number().default(60000).describe('Timeout in milliseconds to wait for all tasks'),
        clusterId: z.string().optional().describe('Cluster ID for mode-specific consensus analysis'),
      },
      execute: async (args) => {
        if (!args.taskIds || !Array.isArray(args.taskIds)) {
          return JSON.stringify({ success: false, error: 'taskIds array is required' }, null, 2);
        }
        const startTime = Date.now();

        const results = await ctx.delegationEngine.waitForAll(args.taskIds, args.timeoutMs);

        let outputVerified = 0;
        let outputMissing = 0;
        try {
          const { getExecutionBrain } = await import('../brains/execution/execution-brain.js');
          const execBrain = getExecutionBrain();
          if (execBrain && execBrain.isInitialized()) {
            for (const taskId of args.taskIds) {
              const status = execBrain.getOutputStatus(taskId);
              if (status.complete) outputVerified++;
              else if (status.required > 0) outputMissing++;
            }
          }
        } catch (err) { console.error('[aggregate_results] Brain check failed:', err); }

        const successful = results.filter(r => r && r.success).length;
        const failed = results.filter(r => r && !r.success).length;
        const timedOut = results.filter(r => r === null).length;

        const completed = results.filter(r => r && r.status === 'completed');

        let consensus: Record<string, unknown> | null = null;
        if (args.clusterId) {
          const engineCluster = ctx.clusterEngine.getCluster(args.clusterId);
          if (engineCluster) {
            const alerts = ctx.clusterEngine.detectTaskAlerts(args.clusterId);
            if (engineCluster.executionMode === 'verify') {
              const completedOutputs = completed.map(r => r?.output ?? '').filter(o => typeof o === 'string' && o.length > 0);
              let divergent = false;
              if (completedOutputs.length >= 2) {
                const tokenize = (s: string): Set<string> => new Set(s.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 3));
                for (let i = 0; i < completedOutputs.length - 1; i++) {
                  const setA = tokenize(completedOutputs[i]);
                  const setB = tokenize(completedOutputs[i + 1]);
                  let intersection = 0;
                  for (const w of setA) { if (setB.has(w)) intersection++; }
                  const union = setA.size + setB.size - intersection;
                  if (union > 0 && intersection / union < 0.3) { divergent = true; break; }
                }
              }
              consensus = {
                mode: 'verify',
                approachCount: completedOutputs.length,
                divergent,
                divergenceAlerts: alerts.filter(a => a.type === 'divergent').length,
                recommendation: divergent ? 'Outputs disagree — review each approach independently before selecting' : 'Outputs agree — consensus reached',
              };
            } else if (engineCluster.executionMode === 'divide') {
              consensus = {
                mode: 'divide',
                partsCompleted: completed.length,
                partsFailed: results.filter(r => r && r.status === 'failed').length,
                partsTotal: args.taskIds.length,
                complete: completed.length === args.taskIds.length,
                recommendation: completed.length === args.taskIds.length ? 'All parts complete — merge results' : `${args.taskIds.length - completed.length} parts still pending or failed`,
              };
            } else if (engineCluster.executionMode === 'pressure') {
              const passCount = completed.length;
              const totalCount = args.taskIds.length;
              consensus = {
                mode: 'pressure',
                passRate: totalCount > 0 ? passCount / totalCount : 0,
                passThreshold: 0.9,
                passed: totalCount > 0 && passCount / totalCount >= 0.9,
                recommendation: passCount / totalCount >= 0.9 ? 'Pressure test passed (>=90%)' : `Pressure test failed (${passCount}/${totalCount})`,
              };
            }
          }
        }

        const summary = {
          total: args.taskIds.length,
          successful,
          failed,
          timedOut,
          outputVerification: {
            verified: outputVerified,
            missing: outputMissing,
            enforced: outputMissing === 0,
          },
          consensus,
          durationMs: Date.now() - startTime,
          results: results.map((r, i) => ({
            taskId: args.taskIds[i],
            success: r?.success ?? false,
            status: r?.status ?? 'unknown',
            clusterId: r?.clusterId,
            agentId: r?.agentId,
            error: r?.error,
            completedAt: r?.completedAt,
          })),
        };

        return JSON.stringify(summary, null, 2);
      },
    }),

    /**
 * get_agent_status - Check status of agents across clusters
     */
    get_agent_status: tool({
      description: 'Get the status of all agents across all clusters. Shows which agents are busy and what they are working on.',
      args: {},
      execute: async () => {
        const agents = ctx.clusterManager.getAllAgents();

        const summary = {
          total: agents.length,
          busy: agents.filter(a => a.busy).length,
          available: agents.filter(a => !a.busy).length,
          byCluster: agents.reduce((acc, agent) => {
            if (!acc[agent.clusterId]) {
              acc[agent.clusterId] = { total: 0, busy: 0, available: 0, agents: [] };
            }
            acc[agent.clusterId].total++;
            acc[agent.clusterId].busy += agent.busy ? 1 : 0;
            acc[agent.clusterId].available += agent.busy ? 0 : 1;
            acc[agent.clusterId].agents.push({
              id: agent.id,
              type: agent.agentType,
              busy: agent.busy,
              currentTask: agent.currentTaskId,
            });
            return acc;
          }, {} as Record<string, unknown>),
        };

        return JSON.stringify(summary, null, 2);
      },
    }),

    /**
     * kraken_brain_status - V1.2 Multi-brain orchestrator status
     * Shows the status of all three brains: Planning, Execution, System
     */
    kraken_brain_status: tool({
      description: 'Get the status of the V1.2 Multi-Brain Orchestrator. Shows initialization state of Planning, Execution, and System brains.',
      args: {},
      execute: async () => {
        // Import brain getters dynamically to avoid circular deps
        const { getPlanningBrain } = await import('../brains/planning/planning-brain.js');
        const { getExecutionBrain } = await import('../brains/execution/execution-brain.js');
        const { getSystemBrain } = await import('../brains/system/system-brain.js');

        const planningBrain = getPlanningBrain();
        const executionBrain = getExecutionBrain();
        const systemBrain = getSystemBrain();

        const planningState = planningBrain.getState();
        const executionState = executionBrain.getState();
        const systemState = systemBrain.getState();

        const summary = {
          version: '1.2.0',
          architecture: 'multi-brain-orchestrator',
          brains: {
            planning: {
              initialized: planningBrain.isInitialized(),
              t2MasterLoaded: planningState.t2MasterLoaded,
              t1Generated: planningState.t1Generated,
              tasksDecomposed: planningState.tasksDecomposed,
              domainsDesignated: planningState.domainsDesignated,
              snapshot: planningBrain.getSnapshot(),
            },
            execution: {
              initialized: executionBrain.isInitialized(),
              activeTasks: executionState.activeTasks,
              completedTasks: executionState.completedTasks,
              failedTasks: executionState.failedTasks,
              snapshot: executionBrain.getSnapshot(),
            },
            system: {
              initialized: systemBrain.isInitialized(),
              currentGate: systemState.currentGate,
              decisionCount: systemState.decisionCount,
              completedTasks: systemState.completedTasks.length,
              snapshot: systemBrain.getSnapshot(),
            },
          },
          messaging: await (async () => {
            try {
              const { getBrainMessenger } = await import('../shared/brain-messenger.js');
              const messenger = getBrainMessenger();
              const queued = messenger.getQueuedMessages() || [];
              return {
                queuedCount: queued.length,
                active: queued.length > 0,
                recentMessages: queued.slice(-5).map((m: { from?: string; to?: string; type?: string; priority?: string }) => ({
                  from: m.from || 'unknown',
                  to: m.to || 'unknown',
                  type: m.type || 'unknown',
                  priority: m.priority || 'normal',
                })),
              };
            } catch (err) {
              return { queuedCount: 0, active: false, recentMessages: [], error: String(err) };
            }
          })(),
          concurrency: await (async () => {
            try {
              const { default: mod } = await import('../brains/BrainConcurrencyManager.js');
              // Access via global or re-import pattern
              return { mode: 'async-event-loops', brains: 3 };
            } catch (err: unknown) {
              console.error('[kraken_brain_status] BrainConcurrencyManager import failed:', err instanceof Error ? err.message : String(err));
              return { mode: 'async-event-loops', brains: 3 };
            }
          })(),
        };

        return JSON.stringify(summary, null, 2);
      },
    }),

    /**
     * kraken_message_status - Check inter-brain message queue
     */
    kraken_message_status: tool({
      description: 'Get the status of brain-to-brain messaging. Shows queued messages and pending override commands.',
      args: {},
      execute: async () => {
        const { getBrainMessenger } = await import('../shared/brain-messenger.js');
        const messenger = getBrainMessenger();

        const queuedMessages = messenger.getQueuedMessages();
        const summary = {
          queuedMessages: queuedMessages.length,
          recentMessages: queuedMessages.slice(-10).map(m => ({
            from: m.from,
            to: m.to,
            type: m.type,
            priority: m.priority,
            timestamp: new Date(m.timestamp).toISOString(),
          })),
        };

        return JSON.stringify(summary, null, 2);
      },
    }),
  };
}
