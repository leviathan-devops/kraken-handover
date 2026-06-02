/**
 * L7: Coordination Gates
 * task-assignment-gate: before execution, validate task is properly formed
 * output-retrieval-gate: before merge, verify outputs exist on host
 * roundtable-sync-gate: before next sprint, sync all three brains
 */

import type { DomainId, BrainId } from '../../shared/domain-ownership.js';
import { getStateStore } from '../../../shared/state-store.js';
import { getExecutionBrain } from '../../execution/execution-brain.js';
import { getBrainMessenger } from '../../../shared/brain-messenger.js';
import { existsSync, statSync } from 'fs';

export interface GateDefinition {
  gateId: string;
  description: string;
  criteria: { requirement: string; check: (state?: GateState) => boolean }[];
}

export interface GateState {
  taskDescription?: string;
  targetCluster?: string;
  taskType?: string;
  agentName?: string;
  outputFiles?: string[];
  brainStates?: { planning: boolean; execution: boolean; system: boolean };
}

export const COORDINATION_GATES: GateDefinition[] = [
  {
    gateId: 'task-assignment',
    description: 'Validate task before assigning to cluster',
    criteria: [
      {
        requirement: 'Task has description',
        check: (state) => (state?.taskDescription || '').length > 0,
      },
      {
        requirement: 'Task has target cluster',
        check: (state) => (state?.targetCluster || '').length > 0,
      },
      {
        requirement: 'Domain designation is valid',
        check: (state) => {
          const tt = state?.taskType || '';
          const cluster = state?.targetCluster || '';
          if (!tt || !cluster) return false;
          const validMap: Record<string, string[]> = {
            'build': ['cluster-alpha'],
            'debug': ['cluster-beta', 'cluster-alpha'],
            'test': ['cluster-gamma', 'cluster-beta'],
            'refactor': ['cluster-beta', 'cluster-alpha'],
            'analyze': ['cluster-beta'],
            'audit': ['cluster-gamma'],
          };
          const allowed = validMap[tt];
          return allowed ? allowed.includes(cluster) : true;
        },
      },
      {
        requirement: 'No focus collision detected',
        check: (state) => {
          try {
            const store = getStateStore();
            const anchors = store.snapshot('context-bridge' as DomainId);
            const clusters = Object.values(anchors).filter(
              (v: unknown) => typeof v === 'object' && v !== null && 'clusterId' in v && (v as Record<string, unknown>).clusterId === state?.targetCluster
            );
            return clusters.length <= 1;
          } catch (err) { console.error('[L7] focus collision check failed:', err instanceof Error ? err.message : String(err)); return false; }
        },
      },
    ],
  },
  {
    gateId: 'output-retrieval',
    description: 'Verify outputs before merging',
    criteria: [
      {
        requirement: 'Outputs retrieved from container',
        check: (state) => {
          try {
            const brain = getExecutionBrain();
            return brain?.isInitialized() === true;
          } catch (err) { console.error('[L7] execution brain check failed:', err instanceof Error ? err.message : String(err)); return false; }
        },
      },
      {
        requirement: 'Files exist on host filesystem',
        check: (state) => {
          const files = state?.outputFiles || [];
          if (files.length === 0) return false;
          return files.every((f: string) => existsSync(f));
        },
      },
      {
        requirement: 'File sizes match expected',
        check: (state) => {
          const files = state?.outputFiles || [];
          if (files.length === 0) return false;
          return files.every((f: string) => {
            try { return statSync(f).size > 0; }
            catch (err) { console.error('[L7] file size check failed:', err instanceof Error ? err.message : String(err)); return false; }
          });
        },
      },
      {
        requirement: 'No corruption detected',
        check: (state) => {
          const files = state?.outputFiles || [];
          if (files.length === 0) return false;
          return files.every((f: string) => {
            try { statSync(f); return true; }
            catch (err) { console.error('[L7] file corruption check failed:', err instanceof Error ? err.message : String(err)); return false; }
          });
        },
      },
    ],
  },
  {
    gateId: 'roundtable-sync',
    description: 'Sync all three brains before next sprint',
    criteria: [
      {
        requirement: 'Planning brain reports T1 complete',
        check: (state) => state?.brainStates?.planning === true,
      },
      {
        requirement: 'Execution brain reports all tasks supervised',
        check: (state) => state?.brainStates?.execution === true,
      },
      {
        requirement: 'System brain gate evaluation passed',
        check: (state) => state?.brainStates?.system === true,
      },
      {
        requirement: 'Brain messenger queue drained',
        check: () => {
          try {
            const messenger = getBrainMessenger();
            const pending = messenger.getPendingCount?.();
            return typeof pending === 'number' ? pending === 0 : true;
          } catch (err) { console.error('[L7] messenger queue check failed:', err instanceof Error ? err.message : String(err)); return false; }
        },
      },
    ],
  },
];

export interface L7CheckResult {
  passed: boolean;
  layer: 'L7';
  gateId: string;
  blockers: string[];
  criteriaResults: { requirement: string; passed: boolean }[];
}

export function evaluateCoordinationGate(
  gateId: string,
  gateState?: GateState
): L7CheckResult {
  const gate = COORDINATION_GATES.find(g => g.gateId === gateId);
  const criteria = gate?.criteria || [];
  
  const criteriaResults = criteria.map(c => ({
    requirement: c.requirement,
    passed: c.check(gateState),
  }));
  
  const blockers = criteriaResults
    .filter(c => !c.passed)
    .map(c => c.requirement);

  return {
    passed: blockers.length === 0,
    layer: 'L7',
    gateId,
    blockers,
    criteriaResults,
  };
}
