/**
 * src/tools/cluster-tools.ts
 *
 * Cluster Tools for Kraken
 *
 * Tools for spawning tasks in clusters:
 * - spawn_cluster_task: Generic task spawning
 * - spawn_shark_agent: Spawn Shark agent (aggressive/steamroll)
 * - spawn_manta_agent: Spawn Manta agent (precise/linear)
 * - complete_subagent_task: Mark task complete, sync brains
 *
 * All spawn tools route through ExecutionBrain.
 * Polling loops removed — delegate() awaits completion directly.
 * Returns action_required: "SPAWN" for LLM to call task().
 */

import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';
import type { KrakenDelegationRequest, TaskPriority, ClusterExecutionMode } from '../factory/kraken-types.js';
import { getSystemBrain } from '../brains/system/system-brain.js';
import { getExecutionBrain } from '../brains/execution/execution-brain.js';
import type { ClusterEngine } from '../clusters/ClusterEngine.js';

export interface ClusterToolsContext {
  delegationEngine: {
    delegate(request: KrakenDelegationRequest): Promise<unknown>;
  };
  clusterScheduler: {
    assignCluster(request: KrakenDelegationRequest): Promise<string>;
    assignClusterForTaskType(task: string, taskType?: string): string;
    resolveClusterRequest(clusterIdOrFocus: string): string;
    anchorClusterToFocus(clusterId: string, focusName: string): void;
    getFocusAnchors(): Map<string, string>;
  };
  clusterManager: {
    getClusterStatus(clusterId: string): unknown;
    getAllClusterStatuses(): Map<string, unknown>;
  };
  clusterEngine: ClusterEngine;
  krakenIdentity?: string;
}

export function createClusterTools(ctx: ClusterToolsContext) {
  return {
    anchor_cluster: tool({
      description: 'Anchor a cluster to a focus/project name. The cluster will be renamed to reflect its current focus. Use this when starting a new project to establish cluster identity.',
      args: {
        clusterId: z.string().describe('Cluster ID (e.g., cluster-alpha) or focus name to anchor'),
        focusName: z.string().describe('Focus/project name to anchor (e.g., "shark-firewall-build", "my-api-project")'),
      },
      execute: async (args) => {
        if (!args.clusterId || !args.focusName) {
          return JSON.stringify({ success: false, error: 'clusterId and focusName are required', clusterId: args.clusterId || '', focusName: args.focusName || '' }, null, 2);
        }
        const resolvedClusterId = ctx.clusterScheduler.resolveClusterRequest(args.clusterId);
        ctx.clusterScheduler.anchorClusterToFocus(resolvedClusterId, args.focusName);
        return JSON.stringify({
          success: true,
          clusterId: resolvedClusterId,
          focusName: args.focusName,
          message: `Cluster ${resolvedClusterId} anchored to "${args.focusName}"`,
        }, null, 2);
      },
    }),

    spawn_cluster_task: tool({
      description: 'Spawn a task in a cluster for async execution. Cluster ID is auto-resolved from focus names. Tasks are queued and executed asynchronously by available agents.',
      args: {
        task: z.string().describe('Task description to execute'),
        clusterId: z.string().optional().describe('Target cluster ID or focus name (auto-selected if not specified)'),
        targetAgent: z.string().optional().describe('Specific agent ID to target'),
        context: z.record(z.string(), z.unknown()).optional().describe('Additional context for the task'),
        acceptanceCriteria: z.array(z.string()).default([]).describe('Acceptance criteria for task completion'),
        priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal').describe('Task priority'),
      },
      execute: async (args) => {
        const taskId = `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

        const resolvedCluster = args.clusterId
          ? ctx.clusterScheduler.resolveClusterRequest(args.clusterId)
          : await ctx.clusterScheduler.assignCluster({ taskId, task: args.task, targetCluster: '', context: args.context, acceptanceCriteria: [], priority: 'normal', createdAt: Date.now() });

        let clusterEngineId: string | null = null;
        try {
          const mode: ClusterExecutionMode = 'divide';
          clusterEngineId = ctx.clusterEngine.constructCluster(
            args.task,
            args.acceptanceCriteria ?? [],
            mode,
            resolvedCluster,
          );
          ctx.clusterEngine.activateCluster(clusterEngineId);
        } catch (err) { console.error('[spawn_cluster_task] ClusterEngine construct failed:', err); }

        const request: KrakenDelegationRequest = {
          taskId,
          task: args.task,
          targetCluster: resolvedCluster,
          targetAgent: args.targetAgent,
          context: args.context,
          acceptanceCriteria: args.acceptanceCriteria,
          priority: args.priority as TaskPriority,
          createdAt: Date.now(),
        };

        try {
          const sysBrain = getSystemBrain();
          if (sysBrain.isInitialized()) {
            const taskLower = (args.task || '').toLowerCase();
            let taskType = 'build';
            if (taskLower.includes('debug') || taskLower.includes('fix') || taskLower.includes('refactor')) taskType = 'debug';
            else if (taskLower.includes('test') || taskLower.includes('verif') || taskLower.includes('audit')) taskType = 'test';
            const validation = sysBrain.validateDomainAssignment(taskType, resolvedCluster);
            if (!validation.valid) {
              return JSON.stringify({ success: false, error: validation.reason, taskId }, null, 2);
            }
            sysBrain.recordDecision({ description: `Queuing task: ${(args.task || '').substring(0, 100)}`, type: 'task-spawn', contextFiles: [] });
          }
        } catch (err) { console.error('[spawn_cluster_task] Brain validation failed:', err); }

        const result = await ctx.delegationEngine.delegate(request) as Record<string, unknown>;

        return JSON.stringify({
          success: result.success ?? false,
          taskId: result.taskId ?? taskId,
          clusterId: result.clusterId ?? resolvedCluster,
          agentId: result.agentId ?? '',
          output: (result as Record<string, unknown>).output ?? '',
          status: result.status ?? 'completed',
          action_required: 'SPAWN',
          error: result.error,
        }, null, 2);
      },
    }),

    spawn_shark_agent: tool({
      description: 'Spawn a Shark agent for aggressive, steamroll-style tasks. Sharks are best for building from scratch and tackling complex problems head-on.',
      args: {
        task: z.string().describe('Task description for Shark agent'),
        clusterId: z.string().optional().describe('Target cluster (auto-selected if not specified)'),
        targetAgent: z.string().optional().describe('Specific agent ID to target'),
        instructions: z.string().optional().describe('Additional instructions for the Shark'),
        context: z.record(z.string(), z.unknown()).optional().describe('Additional context'),
        priority: z.enum(['low', 'normal', 'high', 'critical']).default('high').describe('Task priority'),
      },
      execute: async (args) => {
        if (!args.task) {
          return JSON.stringify({ success: false, error: 'task is required', task: '' }, null, 2);
        }
        const taskId = `shark_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

        const sharkPrompt = `You are SHARK - Ferrari V12 turbo vibecoding engineer.

CHARACTER:
- Aggressive, steamrolls through problems
- Figures shit out and builds it
- Builds from scratch at a solid level
- Full speed ahead, no hesitation

TASK: ${args.task}

${args.instructions ? `\nADDITIONAL INSTRUCTIONS:\n${args.instructions}` : ''}

Execute with maximum aggression and confidence.`;

        const resolvedCluster = args.clusterId
          ? ctx.clusterScheduler.resolveClusterRequest(args.clusterId)
          : ctx.clusterScheduler.assignClusterForTaskType(args.task, 'steamroll');

        const request: KrakenDelegationRequest = {
          taskId,
          task: sharkPrompt,
          targetCluster: resolvedCluster,
          targetAgent: args.targetAgent,
          context: {
            ...args.context,
            agentType: 'shark',
          },
          acceptanceCriteria: [],
          priority: args.priority as TaskPriority,
          createdAt: Date.now(),
        };

        try {
          const sysBrain = getSystemBrain();
          if (sysBrain.isInitialized()) {
            const validation = sysBrain.validateDomainAssignment('build', resolvedCluster);
            if (!validation.valid) {
              return JSON.stringify({ success: false, error: validation.reason, taskId, agentType: 'shark' }, null, 2);
            }
            sysBrain.recordDecision({ description: `Spawning shark for: ${(args.task || '').substring(0, 100)}`, type: 'task-spawn', contextFiles: [] });
          }
        } catch (err) { console.error('[spawn_shark_agent] Brain validation failed:', err); }

        try {
          const execBrain = getExecutionBrain();
          if (execBrain.isInitialized()) {
            execBrain.registerTaskOutputs(taskId, [
              { taskId, path: 'output/', type: 'directory', required: true, retrieved: false },
            ]);
            execBrain.startTask(taskId, resolvedCluster);
          }
        } catch (err) { console.error('[spawn_shark_agent] ExecutionBrain registration failed:', err); }

        const result = await ctx.delegationEngine.delegate(request) as Record<string, unknown>;

        return JSON.stringify({
          success: result.success ?? false,
          taskId: result.taskId ?? taskId,
          clusterId: result.clusterId ?? resolvedCluster,
          agentId: result.agentId ?? '',
          agentType: 'shark',
          output: (result as Record<string, unknown>).output ?? '',
          status: result.status ?? 'completed',
          action_required: 'SPAWN',
          error: result.error,
        }, null, 2);
      },
    }),

    spawn_manta_agent: tool({
      description: 'Spawn a Manta agent for precise, linear tasks. Mantas are best for debugging, testing, and methodical work.',
      args: {
        task: z.string().describe('Task description for Manta agent'),
        clusterId: z.string().optional().describe('Target cluster (auto-selected if not specified)'),
        targetAgent: z.string().optional().describe('Specific agent ID to target'),
        instructions: z.string().optional().describe('Additional instructions for the Manta'),
        context: z.record(z.string(), z.unknown()).optional().describe('Additional context'),
        priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal').describe('Task priority'),
      },
      execute: async (args) => {
        if (!args.task) {
          return JSON.stringify({ success: false, error: 'task is required', task: '' }, null, 2);
        }
        const taskId = `manta_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

        const mantaPrompt = `You are MANTA - Tesla Model S agent.

CHARACTER:
- Fast, reliable, linear, precise
- Mechanically oriented
- Perfect for debugging and linear tasks
- Methodical, follows specs exactly

TASK: ${args.task}

${args.instructions ? `\nADDITIONAL INSTRUCTIONS:\n${args.instructions}` : ''}

Execute with precision and methodical care.`;

        const resolvedCluster = args.clusterId
          ? ctx.clusterScheduler.resolveClusterRequest(args.clusterId)
          : ctx.clusterScheduler.assignClusterForTaskType(args.task, 'debug');

        const request: KrakenDelegationRequest = {
          taskId,
          task: mantaPrompt,
          targetCluster: resolvedCluster,
          targetAgent: args.targetAgent,
          context: {
            ...args.context,
            agentType: 'manta',
          },
          acceptanceCriteria: [],
          priority: args.priority as TaskPriority,
          createdAt: Date.now(),
        };

        try {
          const sysBrain = getSystemBrain();
          if (sysBrain.isInitialized()) {
            const validation = sysBrain.validateDomainAssignment('debug', resolvedCluster);
            if (!validation.valid) {
              return JSON.stringify({ success: false, error: validation.reason, taskId, agentType: 'manta' }, null, 2);
            }
            sysBrain.recordDecision({ description: `Spawning manta for: ${(args.task || '').substring(0, 100)}`, type: 'task-spawn', contextFiles: [] });
          }
        } catch (err) { console.error('[spawn_manta_agent] Brain validation failed:', err); }

        try {
          const execBrain = getExecutionBrain();
          if (execBrain.isInitialized()) {
            execBrain.registerTaskOutputs(taskId, [
              { taskId, path: 'output/', type: 'directory', required: true, retrieved: false },
            ]);
            execBrain.startTask(taskId, resolvedCluster);
          }
        } catch (err) { console.error('[spawn_manta_agent] ExecutionBrain registration failed:', err); }

        const result = await ctx.delegationEngine.delegate(request) as Record<string, unknown>;

        return JSON.stringify({
          success: result.success ?? false,
          taskId: result.taskId ?? taskId,
          clusterId: result.clusterId ?? resolvedCluster,
          agentId: result.agentId ?? '',
          agentType: 'manta',
          output: (result as Record<string, unknown>).output ?? '',
          status: result.status ?? 'completed',
          action_required: 'SPAWN',
          error: result.error,
        }, null, 2);
      },
    }),

    complete_subagent_task: tool({
      description: 'Mark a subagent task as complete. Called by the LLM after a task() subagent finishes. Routes to ExecutionBrain.completeTask().',
      args: {
        taskId: z.string().describe('Task ID to mark complete'),
        success: z.boolean().describe('Whether the task succeeded'),
        output: z.string().default('').describe('Task output / result text'),
        error: z.string().optional().describe('Error message if task failed'),
      },
      execute: async (args) => {
        if (!args.taskId) {
          return JSON.stringify({ success: false, error: 'taskId is required' }, null, 2);
        }

        try {
          const execBrain = getExecutionBrain();
          if (!execBrain.isInitialized()) {
            return JSON.stringify({ success: false, error: 'ExecutionBrain not initialized', taskId: args.taskId }, null, 2);
          }

          execBrain.completeTask({
            taskId: args.taskId,
            success: args.success,
            clusterId: '',
            agentId: '',
            error: args.error,
            output: args.output,
            completedAt: Date.now(),
          });

          return JSON.stringify({
            success: true,
            taskId: args.taskId,
            status: args.success ? 'completed' : 'failed',
          }, null, 2);
        } catch (err) {
          return JSON.stringify({
            success: false,
            taskId: args.taskId,
            error: `completeTask failed: ${err instanceof Error ? err.message : String(err)}`,
          }, null, 2);
        }
      },
    }),
  };
}
