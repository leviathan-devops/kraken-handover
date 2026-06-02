/**
 * Kraken L0-L7 Firewall — Combined enforcement pipeline
 * All layers evaluated in order on every tool.execute.before hook.
 */

import { checkKrakenIdentityWall, type L0CheckResult } from './l0-identity.js';
import { checkOrchestrationTheater, type L1CheckResult } from './l1-orchestration-theater.js';
import { checkFalseCompletion, type L2CheckResult } from './l2-false-completion.js';
import { checkOutputInspection, type L3CheckResult } from './l3-output-inspection.js';
import { checkWrongCluster, type L4CheckResult } from './l4-wrong-cluster.js';
import { checkMacroDerailment, type L5CheckResult } from './l5-macro-derailment.js';
import { checkKrakenProtection, checkProtectionPatterns, extractPathsFromCommand, type L6CheckResult } from './l6-kraken-protection.js';
import { evaluateCoordinationGate, type L7CheckResult } from './l7-coordination-gates.js';
import { LayerEngine } from '../../../system-brain/firewall/layer-engine.js';
import { DEFAULT_LAYERS } from '../../../system-brain/firewall/layers/index.js';
import { checkAntiRetardPattern } from '../../../system-brain/firewall/l6-anti-retard.js';
import { getPlanningBrain } from '../../planning/planning-brain.js';
import { getExecutionBrain } from '../../execution/execution-brain.js';
import { getSystemBrain } from '../system-brain.js';
import { EvidenceGate } from '../../../system-brain/firewall/evidence-gate.js';
import { KrakenOperationType } from '../../../system-brain/firewall/types.js';
import { FirewallAudit } from '../../../system-brain/firewall/firewall-audit.js';
import { bridgeFirewallToHive } from '../../../system-brain/firewall/firewall-context-bridge.js';
import { existsSync } from 'fs';
import { join } from 'path';

export type FirewallLayer = 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7';

export interface FirewallResult {
  allowed: boolean;
  blockedBy?: FirewallLayer;
  reason?: string;
  details: Record<string, unknown>;
  layerResults: {
    l0: L0CheckResult;
    l1: L1CheckResult;
    l2: L2CheckResult;
    l3?: L3CheckResult;
    l4?: L4CheckResult;
    l5?: L5CheckResult;
    l6?: L6CheckResult;
    l7?: L7CheckResult;
  };
}

export interface FirewallContext {
  agentName?: string;
  toolName: string;
  toolArgs: Record<string, unknown>;
  message?: string;
  taskType?: string;
  targetCluster?: string;
  outputsRetrieved?: boolean;
  filesOnHost?: string[];
}

/**
 * Run full L0-L7 firewall enforcement on a tool execution.
 * Returns at first blocking layer (fail-fast).
 */
export function enforceFirewall(ctx: FirewallContext): FirewallResult {
  const {
    agentName, toolName, toolArgs,
    message = '', taskType, targetCluster,
    outputsRetrieved = false, filesOnHost = [],
  } = ctx;

  const result: FirewallResult = {
    allowed: true,
    details: {},
    layerResults: {} as FirewallResult['layerResults'],
  };

  // L0: Identity wall — block non-Kraken agents from protected paths
  const l0 = checkKrakenIdentityWall(agentName, toolName, toolArgs);
  result.layerResults.l0 = l0;
  if (!l0.allowed) {
    result.allowed = false;
    result.blockedBy = 'L0';
    result.reason = l0.reason;
    return result;
  }

  // L1: Orchestration theater — block spawn=done claims
  const l1 = checkOrchestrationTheater(
    message || (toolArgs.task as string) || '',
    toolArgs.status as string
  );
  result.layerResults.l1 = l1;
  if (!l1.passed && toolName === 'report_to_kraken') {
    result.allowed = false;
    result.blockedBy = 'L1';
    result.reason = l1.reason;
    return result;
  }

  // L2: False completion — block completion without output retrieval
  const l2 = checkFalseCompletion(message, outputsRetrieved, filesOnHost);
  result.layerResults.l2 = l2;
  if (!l2.passed && (toolName === 'report_to_kraken' || toolName === 'aggregate_results')) {
    result.allowed = false;
    result.blockedBy = 'L2';
    result.reason = l2.reason;
    return result;
  }

  // L3: Output inspection — verify host filesystem (only on bash/write/edit tools)
  if (filesOnHost.length > 0) {
    const l3 = checkOutputInspection(filesOnHost, message);
    result.layerResults.l3 = l3;
    if (!l3.passed) {
      result.allowed = false;
      result.blockedBy = 'L3';
      result.reason = l3.reason;
      return result;
    }
  }

  // L4: Wrong cluster — validate domain assignment (only on cluster spawn tools)
  if (taskType && targetCluster && toolName === 'spawn_cluster_task') {
    const l4 = checkWrongCluster(message, taskType, targetCluster);
    result.layerResults.l4 = l4;
    if (!l4.valid) {
      result.allowed = false;
      result.blockedBy = 'L4';
      result.reason = l4.reason;
      return result;
    }
  }

  // L5: Macro derailment — focus collision, desync, stale context
  if (message) {
    const l5 = checkMacroDerailment(message);
    result.layerResults.l5 = l5;
    if (!l5.passed) {
      result.allowed = false;
      result.blockedBy = 'L5';
      result.reason = l5.reason;
      return result;
    }
  }

  // L6: Kraken protection — zone-based access control
  const filePath = (toolArgs.filePath || toolArgs.path || toolArgs.target || '') as string;
  const command = (toolArgs.command || toolArgs.content || '') as string;

  const pathsToCheck = [filePath];
  if (toolName === 'bash' && command) {
    pathsToCheck.push(...extractPathsFromCommand(command));
  }

  if (pathsToCheck.some(p => p) || command) {
    let operation: 'read' | 'write' | 'delete' = 'write';
    if (toolName === 'read' || toolName === 'grep' || toolName === 'glob') operation = 'read';
    if (toolName === 'bash') {
      const cmd = command as string;
      if (cmd.includes('rm ') || cmd.includes('delete')) operation = 'delete';
    }

    let l6Blocked: L6CheckResult | null = null;
    for (const p of pathsToCheck) {
      if (!p) continue;
      const check = checkKrakenProtection(p, operation);
      if (!check.allowed) { l6Blocked = check; break; }
    }

    if (!l6Blocked) {
      const l6b = checkProtectionPatterns(command);
      if (!l6b.allowed) l6Blocked = l6b;
    }

    result.layerResults.l6 = l6Blocked || { allowed: true, layer: 'L6' };
    if (l6Blocked) {
      result.allowed = false;
      result.blockedBy = 'L6';
      result.reason = l6Blocked.reason;
      return result;
    }
  }

  // L7: Coordination gates — evaluate gate criteria with real state
  const l7GateState = {
    taskDescription: (toolArgs.task || message) as string,
    targetCluster: (toolArgs.clusterId || toolArgs.targetCluster || targetCluster) as string,
    taskType: taskType || '',
    agentName: agentName || '',
    outputFiles: filesOnHost,
    brainStates: {
      planning: false,
      execution: false,
      system: false,
    },
  };

  try {
    const brain = getPlanningBrain();
    l7GateState.brainStates.planning = brain?.isInitialized() && brain?.isT1Generated();
  } catch (err) { console.error('[Firewall] planning brain state probe failed:', err instanceof Error ? err.message : String(err)); }

  try {
    const brain = getExecutionBrain();
    l7GateState.brainStates.execution = brain?.isInitialized();
  } catch (err) { console.error('[Firewall] execution brain state probe failed:', err instanceof Error ? err.message : String(err)); }

  try {
    const brain = getSystemBrain();
    l7GateState.brainStates.system = brain?.isInitialized();
  } catch (err) { console.error('[Firewall] system brain state probe failed:', err instanceof Error ? err.message : String(err)); }

  const l7 = evaluateCoordinationGate('task-assignment', l7GateState);
  result.layerResults.l7 = l7;
  if (!l7.passed && toolName === 'spawn_cluster_task') {
    result.allowed = false;
    result.blockedBy = 'L7';
    result.reason = `L7 coordination gate failed: ${l7.blockers.join('; ')}`;
    return result;
  }

  // ============================================================
  // V11 FIREWALL LAYERS — evaluate L8, L9, L10, AR, sub-layers
  // These are pattern-based behavioral enforcement layers.
  // They run AFTER L0-L7 because L0-L7 are security-critical.
  // ============================================================
  try {
    const command = (toolArgs.task || message) as string;

    let evidenceGate = null;
    try {
      const home = process.env.HOME || '/root';
      const ws = join(home, '.local/share/opencode/kraken-hive/evidence');
      if (existsSync(ws)) evidenceGate = new EvidenceGate(ws);
    } catch (err) { console.error('[Firewall] evidence gate init failed:', err instanceof Error ? err.message : String(err)); }

    const engine = new LayerEngine(evidenceGate);

    const authorizedAgents = new Set<string>();
    try {
      authorizedAgents.add('kraken');
      authorizedAgents.add('kraken-executor');
    } catch (e) { console.error('[Firewall] authorized agents setup failed:', e instanceof Error ? e.message : String(e)); }

    const layerCtx = {
      agent: agentName || '',
      tool: toolName,
      args: toolArgs,
      operationType: (() => {
        switch (toolName) {
          case 'bash': return KrakenOperationType.EXECUTE;
          case 'write': case 'edit': case 'Edit': case 'Write': return KrakenOperationType.WRITE;
          case 'read': case 'Read': return KrakenOperationType.READ;
          case 'glob': case 'grep': return KrakenOperationType.INSPECT;
          default: return KrakenOperationType.EXECUTE;
        }
      })(),
      command,
      commandTokens: command ? command.split(/\s+/) : [],
    };

    const v11Block = engine.evaluate(layerCtx, DEFAULT_LAYERS, authorizedAgents);
    if (v11Block?.blocked) {
      result.allowed = false;
      result.blockedBy = v11Block.layer as FirewallLayer;
      result.reason = v11Block.reason;
      return result;
    }
  } catch (e: unknown) {
    console.error('[FIREWALL] V11 layer evaluation FAILED — FAILING CLOSED:', e instanceof Error ? e.message : String(e));
    result.allowed = false;
    result.blockedBy = 'L8';
    result.reason = `V11 firewall evaluation error: ${e instanceof Error ? e.message : String(e)}`;
    return result;
  }

  try {
    const arDescription = (toolArgs.task || message || '') as string;
    if (arDescription && toolName !== 'bash' && toolName !== 'read' && toolName !== 'grep' && toolName !== 'glob') {
      const arResult = checkAntiRetardPattern(
        toolName,
        arDescription,
        taskType,
        ''
      );
      if (arResult.blocked) {
        result.allowed = false;
        result.blockedBy = 'L6';
        result.reason = `[ANTI-RETARD] ${arResult.reason}`;
        return result;
      }
    }
  } catch (e: unknown) {
    console.error('[FIREWALL] Anti-retard evaluation FAILED — FAILING CLOSED:', e instanceof Error ? e.message : String(e));
    result.allowed = false;
    result.blockedBy = 'L6';
    result.reason = `Anti-retard evaluation error: ${e instanceof Error ? e.message : String(e)}`;
    return result;
  }

  // Audit log — best-effort, never throws
  try {
    const audit = new FirewallAudit(process.env.HOME || '/root');
    audit.log({
      timestamp: Date.now(),
      agent: agentName || '',
      tool: toolName,
      result: result.allowed ? 'allowed' : 'blocked',
      layer: result.blockedBy || 'none',
      reason: result.reason || '',
    });
  } catch (err) { console.error('[Firewall] audit log failed:', err instanceof Error ? err.message : String(err)); }

  // Context bridge — push block data to Hive on blocks
  if (!result.allowed) {
    try {
      bridgeFirewallToHive({
        layer: result.blockedBy || 'unknown',
        category: 'firewall-block',
        confidence: 1.0,
        reason: result.reason || '',
        agentName: agentName || '',
        toolName,
      });
    } catch (err) { console.error('[Firewall] hive context bridge failed:', err instanceof Error ? err.message : String(err)); }
  }

  return result;
}

export { checkKrakenIdentityWall, checkOrchestrationTheater, checkFalseCompletion,
         checkOutputInspection, checkWrongCluster, checkMacroDerailment,
         checkKrakenProtection, checkProtectionPatterns, evaluateCoordinationGate };
