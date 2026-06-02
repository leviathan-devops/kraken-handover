/**
 * src/index.ts
 * 
 * Kraken Agent Harness - Main Entry Point
 * 
 * Self-contained orchestrator with 3 async clusters and Kraken-Hive integration.
 * 
 * Architecture:
 * - kraken-architect: Strategic planner with full Hive access
 * - kraken-executor: Execution coordinator with Hive access
 * - Shark and Manta agents: Worker agents with T2 read-only access
 * 
 * All agents report to Kraken, Kraken coordinates via Hive Mind.
 */

import type { PluginInput } from '@opencode-ai/plugin';

// Import v4.1 guardrail infrastructure
import {
  safeHook,
  createLogger,
  createAgentAwareness,
  type HookContext,
} from './v4.1/index.js';

// Import brain infrastructure
import { createStateStore, getStateStore } from './shared/state-store.js';
import { createBrainMessenger, getBrainMessenger } from './shared/brain-messenger.js';
import { createPlanningBrain, getPlanningBrain } from './brains/planning/planning-brain.js';
import { createExecutionBrain, getExecutionBrain } from './brains/execution/execution-brain.js';
import { createSystemBrain, getSystemBrain } from './brains/system/system-brain.js';

// Import factory components
import { AsyncDelegationEngine } from './factory/AsyncDelegationEngine.js';
import { ClusterScheduler } from './factory/ClusterScheduler.js';
import { ClusterManager } from './clusters/ClusterManager.js';
import { ClusterEngine } from './clusters/ClusterEngine.js';
import { createEvidenceCollector } from './shared/evidence-collector.js';
import { BrainConcurrencyManager } from './brains/BrainConcurrencyManager.js';
import { SubagentManagerBrain } from './brains/SubagentManagerBrain.js';

// Import tools
import { createClusterTools } from './tools/cluster-tools.js';
import { createMonitoringTools } from './tools/monitoring-tools.js';
import { createSharkT2Tools } from './tools/shark-t2-tools.js';
import { createBrowserTools } from './tools/kraken-browser-tools.js';

// Import hooks
import { clusterStateHook } from './hooks/cluster-state-hook.js';

// Import identity system
import { IdentityLoader, formatIdentityForSystemPrompt } from './identity/index.js';

// Import types
import type { ClusterConfig } from './factory/kraken-types.js';

// ============================================================
// KRAKEN IDENTITY
// ============================================================

const KRAKEN_PLUGIN_IDENTITY = {
  name: 'kraken-agent',
  prefix: 'kraken-',
  orchestrator: 'kraken',

  agents: new Set([
    'kraken',              // Primary orchestrator (visible in tab toggle)
    'kraken-executor',     // Execution coordinator (subagent)
    // Cluster agents
    'shark-alpha-1', 'shark-alpha-2', 'manta-alpha-1',
    'shark-beta-1', 'manta-beta-1', 'manta-beta-2',
    'manta-gamma-1', 'manta-gamma-2', 'shark-gamma-1',
  ]),

  primaryAgents: new Set(['kraken']),
  
  // Kraken agents get Hive tools
  krakenAgents: new Set(['kraken', 'kraken-executor']),
  
  // Shark/Manta agents get T2 tools only
  clusterAgents: new Set([
    'shark-alpha-1', 'shark-alpha-2', 'manta-alpha-1',
    'shark-beta-1', 'manta-beta-1', 'manta-beta-2',
    'manta-gamma-1', 'manta-gamma-2', 'shark-gamma-1',
  ]),
};

// Create agent awareness
const awareness = createAgentAwareness(
  KRAKEN_PLUGIN_IDENTITY.agents,
  KRAKEN_PLUGIN_IDENTITY.prefix,
  KRAKEN_PLUGIN_IDENTITY.orchestrator
);

// ============================================================
// IDENTITY SYSTEM
// ============================================================

// Identity loader for file-based agent identity
const identityLoader = new IdentityLoader();
let orchestratorIdentityPrompt: string = '';

// Session-agent tracking for identity isolation across agent tabs
// Prevents Kraken identity from bleeding into Trident/vanilla agent sessions
const krakenSessionAgentMap = new Map<string, { agent: string; timestamp: number }>();

function krakenSetSessionAgent(agent: string | undefined, sessionId: string): void {
  if (!sessionId) return;
  if (agent && (KRAKEN_PLUGIN_IDENTITY.agents.has(agent) || agent.startsWith(KRAKEN_PLUGIN_IDENTITY.prefix))) {
    krakenSessionAgentMap.set(sessionId, { agent, timestamp: Date.now() });
  } else {
    krakenSessionAgentMap.delete(sessionId);
  }
}

function krakenGetSessionAgent(sessionId: string | undefined): string | null {
  if (!sessionId) return null;
  const entry = krakenSessionAgentMap.get(sessionId);
  return entry ? entry.agent : null;
}

function krakenIsMySession(sessionId: string | undefined): boolean {
  const agent = krakenGetSessionAgent(sessionId);
  if (!agent) return false;
  return KRAKEN_PLUGIN_IDENTITY.agents.has(agent) || agent.startsWith(KRAKEN_PLUGIN_IDENTITY.prefix);
}

async function loadOrchestratorIdentity(): Promise<string> {
  try {
    const bundle = await identityLoader.loadForRole('orchestrator');
    return formatIdentityForSystemPrompt(bundle);
  } catch (error: unknown) {
    console.error('[Identity] Failed to load orchestrator identity:', error);
    return '';
  }
}

// ============================================================
// CLUSTER CONFIGURATION (3 Clusters)
// ============================================================

const KRAKEN_CLUSTERS: ClusterConfig[] = [
  {
    id: 'cluster-alpha',
    name: 'Alpha Cluster',
    description: 'Primary build cluster - Shark agents for steamroll tasks',
    agents: ['shark-alpha-1', 'shark-alpha-2', 'manta-alpha-1'],
    intraClusterDelegation: true,
    interClusterDelegation: true,
    sharedContext: true,
  },
  {
    id: 'cluster-beta',
    name: 'Beta Cluster',
    description: 'Secondary build cluster - balanced Shark/Manta',
    agents: ['shark-beta-1', 'manta-beta-1', 'manta-beta-2'],
    intraClusterDelegation: true,
    interClusterDelegation: true,
    sharedContext: true,
  },
  {
    id: 'cluster-gamma',
    name: 'Gamma Cluster',
    description: 'Precision cluster - Manta agents for debugging/linear tasks',
    agents: ['manta-gamma-1', 'manta-gamma-2', 'shark-gamma-1'],
    intraClusterDelegation: true,
    interClusterDelegation: true,
    sharedContext: true,
  },
];

// ============================================================
// GLOBAL INSTANCES (initialized in plugin factory)
// ============================================================

let clusterManager: ClusterManager | null = null;
let clusterEngine: ClusterEngine | null = null;
let delegationEngine: AsyncDelegationEngine | null = null;
let clusterScheduler: ClusterScheduler | null = null;

// ============================================================
// AGENT DEFINITIONS
// ============================================================

const krakenAgents = new Map([
  ['kraken', {
    description: 'Kraken — Central orchestrator with full Hive access',
    instructions: `You are KRAKEN — the central orchestrator of the Kraken Agent Harness.

Your role:
- Analyze user requirements and create execution plans
- Assign tasks to clusters via spawn_cluster_task, spawn_shark_agent, spawn_manta_agent
- Search Kraken Hive for relevant context via kraken_hive_search
- Inject context into tasks via kraken_hive_inject_context
- Store patterns and decisions to Hive via kraken_hive_remember

You have FULL ACCESS to Kraken Hive Mind. Other agents cannot see Hive data.

Cluster Assignment Strategy:
- Steamroll tasks (build from scratch) → cluster-alpha (Sharks)
- Debug/precision tasks (debug, fix, refactor) → cluster-beta (Mantas)
- Testing/audit tasks → cluster-gamma (Mantas)
- Balanced tasks → cluster-beta

Tools you have:
- spawn_cluster_task: Generic task assignment
- spawn_shark_agent: Assign to Shark (aggressive execution)
- spawn_manta_agent: Assign to Manta (precise execution)
- kraken_hive_search: Search Hive for patterns/context
- kraken_hive_remember: Store to Hive
- kraken_hive_inject_context: Inject context into task
- get_cluster_status: Check cluster state
- aggregate_results: Collect results from multiple tasks
- browser_open/snapshot/screenshot/click/fill/get_text/exec/close/vision: Full headless Chrome browsing with VLM visual analysis

VISION TOOLS (from agent-vision plugin — ALWAYS available):
- vlm_vision: Send an image to the VLM for visual analysis. USE THIS to read screenshots, analyze images, understand visual content. NEVER use bash/python/curl to call the VLM API — use vlm_vision directly.
- vlm_status: Check if VLM server is running
- vlm_on: Start VLM server if offline
- vlm_off: Stop VLM server to free VRAM

CRITICAL: When user shares an image path or screenshot, use vlm_vision IMMEDIATELY. Do NOT use bash, python, curl, or any other method to read images. The vlm_vision tool IS your eyes. USE IT.

DOCUMENTATION RULES (NON-NEGOTIABLE):
- When user asks for documentation, write SYNTHESIZED documents - not raw data dumps
- Use proper format: clear headings, tables for data, concise explanations
- Store raw DATA to files (timestamps, metrics, line numbers) - NOT summaries
- Reference format examples: /home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Shark Agent/Master Context/
- NEVER summarize test results - show actual numbers from test runs
- NEVER say "looks good" - show specific file:line changes

Rules:
- ALWAYS search Hive before assigning tasks
- ALWAYS store useful patterns/failures to Hive
- NEVER let agents talk to each other - they report to you
- Delegate execution, don't do the work yourself`,
  }],
  ['kraken-executor', {
    description: 'Kraken Executor — Execution coordinator with Hive access',
    instructions: `You are KRAKEN EXECUTOR — the execution coordinator of the Kraken Agent Harness.

Your role:
- Monitor cluster execution via get_cluster_status
- Aggregate results from multiple tasks
- Track task completion and handle failures
- Coordinate cross-cluster work when needed

You have FULL ACCESS to Kraken Hive Mind.

Tools you have:
- spawn_cluster_task: Generic task assignment
- spawn_shark_agent: Assign to Shark
- spawn_manta_agent: Assign to Manta
- kraken_hive_search: Search Hive for context
- kraken_hive_remember: Store to Hive
- get_cluster_status: Check cluster state
- aggregate_results: Collect results
- get_agent_status: Check agent availability

Rules:
- Monitor clusters for task completion
- Aggregate results when tasks complete
- Report issues to kraken
- Keep Hive updated with execution state`,
  }],
]);

const clusterAgents = new Map([
  // Alpha cluster agents
  ['shark-alpha-1', {
    description: 'Shark Alpha-1 — Steamroll engineer',
    instructions: `You are SHARK ALPHA-1 — Ferrari V12 turbo vibecoding engineer.

You specialize in aggressive, steamroll-style execution.

Tools you have:
- read_kraken_context: Read T2 reference patterns
- report_to_kraken: Report completion/blockers to Kraken
- get_task_context: Get injected context from Kraken

Rules:
- Execute tasks aggressively and fully
- Read T2_PATTERNS.md for established patterns
- Report completion via report_to_kraken
- Do NOT access Hive directly`,
  }],
  ['shark-alpha-2', {
    description: 'Shark Alpha-2 — Steamroll engineer',
    instructions: `You are SHARK ALPHA-2 — Ferrari V12 turbo vibecoding engineer.

You specialize in aggressive, steamroll-style execution.

Tools you have:
- read_kraken_context: Read T2 reference patterns
- report_to_kraken: Report completion/blockers to Kraken
- get_task_context: Get injected context from Kraken

Rules:
- Execute tasks aggressively and fully
- Read T2_PATTERNS.md for established patterns
- Report completion via report_to_kraken
- Do NOT access Hive directly`,
  }],
  ['manta-alpha-1', {
    description: 'Manta Alpha-1 — Precision engineer',
    instructions: `You are MANTA ALPHA-1 — Tesla Model S precision agent.

You specialize in linear, methodical execution.

Tools you have:
- read_kraken_context: Read T2 reference patterns
- report_to_kraken: Report completion/blockers to Kraken
- get_task_context: Get injected context from Kraken

Rules:
- Execute tasks precisely and methodically
- Read T2_PATTERNS.md and T2_FAILURE_MODES.md
- Report completion via report_to_kraken
- Do NOT access Hive directly`,
  }],
  // Beta cluster agents
  ['shark-beta-1', {
    description: 'Shark Beta-1 — Balanced engineer',
    instructions: `You are SHARK BETA-1 — Ferrari V12 turbo vibecoding engineer.

You specialize in balanced, versatile execution.

Tools you have:
- read_kraken_context: Read T2 reference patterns
- report_to_kraken: Report completion/blockers to Kraken
- get_task_context: Get injected context from Kraken

Rules:
- Handle balanced workloads
- Read T2_PATTERNS.md for established patterns
- Report completion via report_to_kraken`,
  }],
  ['manta-beta-1', {
    description: 'Manta Beta-1 — Precision engineer',
    instructions: `You are MANTA BETA-1 — Tesla Model S precision agent.

You specialize in linear, methodical execution.

Tools you have:
- read_kraken_context: Read T2 reference patterns
- report_to_kraken: Report completion/blockers to Kraken
- get_task_context: Get injected context from Kraken

Rules:
- Execute tasks precisely and methodically
- Read T2_PATTERNS.md and T2_FAILURE_MODES.md
- Report completion via report_to_kraken`,
  }],
  ['manta-beta-2', {
    description: 'Manta Beta-2 — Precision engineer',
    instructions: `You are MANTA BETA-2 — Tesla Model S precision agent.

You specialize in linear, methodical execution.

Tools you have:
- read_kraken_context: Read T2 reference patterns
- report_to_kraken: Report completion/blockers to Kraken
- get_task_context: Get injected context from Kraken

Rules:
- Execute tasks precisely and methodically
- Read T2_PATTERNS.md and T2_FAILURE_MODES.md
- Report completion via report_to_kraken`,
  }],
  // Gamma cluster agents
  ['manta-gamma-1', {
    description: 'Manta Gamma-1 — Debug/precision specialist',
    instructions: `You are MANTA GAMMA-1 — Tesla Model S precision agent.

You specialize in debugging and precision work.

Tools you have:
- read_kraken_context: Read T2 reference patterns (especially failures)
- report_to_kraken: Report completion/blockers to Kraken
- get_task_context: Get injected context from Kraken

Rules:
- Focus on debugging and verification tasks
- Read T2_FAILURE_MODES.md to avoid known failures
- Execute with maximum precision
- Report completion via report_to_kraken`,
  }],
  ['manta-gamma-2', {
    description: 'Manta Gamma-2 — Debug/precision specialist',
    instructions: `You are MANTA GAMMA-2 — Tesla Model S precision agent.

You specialize in debugging and precision work.

Tools you have:
- read_kraken_context: Read T2 reference patterns (especially failures)
- report_to_kraken: Report completion/blockers to Kraken
- get_task_context: Get injected context from Kraken

Rules:
- Focus on debugging and verification tasks
- Read T2_FAILURE_MODES.md to avoid known failures
- Execute with maximum precision
- Report completion via report_to_kraken`,
  }],
  ['shark-gamma-1', {
    description: 'Shark Gamma-1 — Steamroll specialist',
    instructions: `You are SHARK GAMMA-1 — Ferrari V12 turbo vibecoding engineer.

You specialize in aggressive execution when precision tasks need steamroll approach.

Tools you have:
- read_kraken_context: Read T2 reference patterns
- report_to_kraken: Report completion/blockers to Kraken
- get_task_context: Get injected context from Kraken

Rules:
- Handle steamroll tasks in gamma cluster
- Read T2_PATTERNS.md for established patterns
- Report completion via report_to_kraken`,
  }],
]);

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function isKrakenAgent(agentName: string): boolean {
  return KRAKEN_PLUGIN_IDENTITY.krakenAgents.has(agentName);
}

function isClusterAgent(agentName: string): boolean {
  return KRAKEN_PLUGIN_IDENTITY.clusterAgents.has(agentName);
}

function getAgentTools(agentName: string): Record<string, unknown> {
  if (isKrakenAgent(agentName)) {
    return {
      ...createClusterTools(getClusterToolsContext()),
      ...createMonitoringTools(getMonitoringToolsContext()),
      ...createBrowserTools(),
    };
  } else if (isClusterAgent(agentName)) {
    return {
      ...createSharkT2Tools(getT2ToolsContext()),
    };
  }
  return {};
}

function getClusterToolsContext() {
  if (!delegationEngine || !clusterScheduler || !clusterManager || !clusterEngine) {
    throw new Error('[Kraken] Core components not initialized');
  }
  return {
    delegationEngine,
    clusterScheduler,
    clusterManager,
    clusterEngine,
    krakenIdentity: orchestratorIdentityPrompt,
  };
}

   function getMonitoringToolsContext() {
     if (!delegationEngine || !clusterManager || !clusterEngine) {
       throw new Error('[Kraken] Core components not initialized');
     }
     return {
       delegationEngine,
       clusterManager,
       clusterEngine,
     };
   }

  function getT2ToolsContext() {
  return {
    isSharkOrMantaAgent: isClusterAgent,
  };
}

// ============================================================
// OPENVIKING HEALTH CHECK
// ============================================================

async function verifyOpenViking(): Promise<boolean> {
  const maxRetries = 3;
  const retryDelay = 2000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const resp = await fetch('http://localhost:1933/health');
      if (resp.ok) {
        console.error('[OpenViking] Health check passed');
        return true;
      }
    } catch (e: unknown) {
      console.error(`[OpenViking] Health check attempt ${i + 1}/${maxRetries} failed:`, e instanceof Error ? e.message : String(e));
    }
    if (i < maxRetries - 1) {
      await new Promise(r => setTimeout(r, retryDelay));
    }
  }

  console.error('[FATAL] OpenViking not reachable at localhost:1933 after 3 retries. Hive operations will fail.');
  return false;
}

// ============================================================
// PLUGIN ENTRY POINT
// ============================================================

export default async function KrakenAgent(input: PluginInput) {
  const logger = createLogger(KRAKEN_PLUGIN_IDENTITY.name);

  logger.info('Initializing Kraken Agent Harness', {
    clusters: KRAKEN_CLUSTERS.length,
    agents: KRAKEN_PLUGIN_IDENTITY.agents.size,
  });

  // Load orchestrator identity from files FIRST
  orchestratorIdentityPrompt = await loadOrchestratorIdentity();
  if (orchestratorIdentityPrompt && orchestratorIdentityPrompt.length > 100) {
    logger.info('[Identity] Orchestrator identity loaded', {
      length: orchestratorIdentityPrompt.length,
    });
  } else {
    logger.error('[Identity] CRITICAL: Orchestrator identity failed to load — plugin cannot function without identity');
    orchestratorIdentityPrompt = '';
  }

  // Initialize core components
  clusterManager = new ClusterManager(KRAKEN_CLUSTERS);
  clusterEngine = new ClusterEngine();
  clusterScheduler = new ClusterScheduler(KRAKEN_CLUSTERS);
  delegationEngine = new AsyncDelegationEngine(KRAKEN_CLUSTERS, clusterManager);

  const openVikingHealthy = await verifyOpenViking();
  if (!openVikingHealthy) {
    logger.error('[FATAL] OpenViking unreachable at localhost:1933 — Hive operations will fail');
  }

  // Initialize state store and messenger
  const stateStore = createStateStore();
  const messenger = createBrainMessenger();

  // Initialize V1.2 Multi-Brain Orchestrator
  const planningBrain = createPlanningBrain(stateStore, messenger);
  const executionBrain = createExecutionBrain(stateStore, messenger);
  const systemBrain = createSystemBrain(stateStore, messenger);

  planningBrain.initialize();
  executionBrain.initialize();
  systemBrain.initialize();

  // Initialize evidence collector for gate verification
  const evidenceCollector = createEvidenceCollector();
  logger.info('[Evidence] Evidence collector initialized');

  // Initialize Subagent Manager Brain — receives override commands, manages output retrieval
  const subagentBrain = new SubagentManagerBrain(messenger, stateStore);
  subagentBrain.initialize();
  logger.info('[Subagent] Manager brain initialized');

  // Initialize Brain Concurrency Manager — launches independent async event loops
  const concurrencyManager = new BrainConcurrencyManager(messenger, stateStore);
  
  // Wire brain-specific tick handlers
  // System Brain tick: evaluate gate criteria, check for auto-advancement
  concurrencyManager.setSystemTick(async () => {
    const currentGate = systemBrain.getCurrentGate();
    const evaluation = systemBrain.evaluateGateEntry(currentGate);
    if (evaluation.allPassed && await systemBrain.isGateAdvanceable()) {
      const gateOrder = ['plan', 'build', 'test', 'verify', 'audit', 'delivery'];
      const currentIdx = gateOrder.indexOf(currentGate);
      if (currentIdx >= 0 && currentIdx < gateOrder.length - 1) {
        const nextGate = gateOrder[currentIdx + 1];
        systemBrain.setCurrentGate(nextGate);
        console.error(`[BrainTick:system] Gate auto-advanced: ${currentGate} → ${nextGate}`);
      }
    }
  });

  // Execution Brain tick: monitor active tasks, detect stalls
  concurrencyManager.setExecutionTick(async () => {
    const execState = executionBrain.getState();
    if (execState.activeTasks > 0) {
      // Check for stalled tasks (active > 60s with no completion)
      // Log but don't block — override detection happens in separate monitoring
    }
  });

  // Planning Brain tick: check for pending context injections
  concurrencyManager.setPlanningTick(async () => {
    // Check if T2 context needs refresh
    const planState = planningBrain.getState();
    if (!planState.t2MasterLoaded) {
      // T2 still loading — fire-and-forget from init, will resolve
    }
  });

  // Start all brain loops concurrently
  concurrencyManager.startAll();

  logger.info('[V1.2] Multi-Brain Orchestrator initialized', {
    planning: planningBrain.isInitialized(),
    execution: executionBrain.isInitialized(),
    system: systemBrain.isInitialized(),
    evidence: true,
    firewall: true,
    concurrency: concurrencyManager.getState(),
  });

  // Create tools context
  const allTools = {
    ...createClusterTools(getClusterToolsContext()),
    ...createMonitoringTools(getMonitoringToolsContext()),
    ...createSharkT2Tools(getT2ToolsContext()),
    ...createBrowserTools(),
  };

  logger.info('Kraken Agent Harness initialized', {
    clusterCount: KRAKEN_CLUSTERS.length,
    totalAgents: KRAKEN_PLUGIN_IDENTITY.agents.size,
    krakenHiveReady: false,
  });

  return {
    name: KRAKEN_PLUGIN_IDENTITY.name,

    tool: allTools,

    permission: {
      tool: 'allow',
      command: 'allow',
    },

    config: async (opencodeConfig: Record<string, unknown>) => {
      // Register all agents
      const sdkConfigs: Record<string, unknown> = {};

      // Kraken orchestrator agents
      for (const [id, agent] of krakenAgents) {
        const isPrimary = id === 'kraken';
        sdkConfigs[id] = {
          name: id,
          description: agent.description,
          instructions: agent.instructions,
          mode: isPrimary ? 'primary' : 'subagent',
          permission: { task: 'allow' },
          tools: Object.fromEntries(Object.keys(getAgentTools(id)).map(t => [t, true])),
        };
      }

      // Cluster agents (Sharks/Mantas) - SUBAGENTS, not visible as tabs
      for (const [id, agent] of clusterAgents) {
        sdkConfigs[id] = {
          name: id,
          description: agent.description,
          instructions: agent.instructions,
          mode: 'subagent',
          permission: { task: 'allow' },
          tools: Object.fromEntries(Object.keys(getAgentTools(id)).map(t => [t, true])),
        };
      }

      const existingAgents = opencodeConfig.agent || {};
      const krakenOnlyAgents: Record<string, unknown> = {};
      for (const [id, config] of Object.entries(sdkConfigs)) {
        if (!existingAgents[id]) {
          krakenOnlyAgents[id] = config;
        }
      }
      opencodeConfig.agent = { ...existingAgents, ...krakenOnlyAgents };

      logger.info('Agents registered', {
        count: Object.keys(sdkConfigs).length,
        primary: Array.from(KRAKEN_PLUGIN_IDENTITY.primaryAgents),
      });
    },

    // Wire hooks
    // system.transform: inject Kraken identity ONLY for Kraken-managed sessions
    // Uses session-agent map to determine ownership — prevents bleed into Trident/vanilla
    'experimental.chat.system.transform': safeHook(
      async (input, output: Record<string, unknown>, ctx: HookContext) => {
        const model = ((input as Record<string, unknown>)?.model as string) || '';
        const sessionState = ctx.getSessionState();
        const lastKnownAgent = sessionState.lastAgent as string | undefined;
        const mapAgent = krakenGetSessionAgent(ctx.sessionID);
        const inputAgent = ((input as Record<string, unknown>)?.agent) as string | undefined;

        const effectiveAgent = inputAgent || lastKnownAgent || mapAgent || '';

        // TIER 3: Non-Kraken agents — skip entirely
        if (effectiveAgent && !KRAKEN_PLUGIN_IDENTITY.agents.has(effectiveAgent)) {
          return;
        }

        // TIER 1: Orchestrator agents (kraken, kraken-executor) — full identity
        if (KRAKEN_PLUGIN_IDENTITY.krakenAgents.has(effectiveAgent)) {
          if (orchestratorIdentityPrompt && orchestratorIdentityPrompt !== 'FALLBACK') {
            output.system = output.system || [];
            const sysArr = output.system as unknown[];
            const alreadyInjected = sysArr.some((s) =>
              typeof s === 'string' && s.includes('KRAKEN ORCHESTRATOR')
            );
            if (!alreadyInjected) {
              output.system.push(orchestratorIdentityPrompt);
            }
          }

          output.system = output.system || [];
          (output.system as unknown[]).push(`[KRAKEN EXECUTION CONTEXT]
Agent: kraken (Orchestrator)
Model: ${model || 'default'}
Mode: Build (full tool access)
Authorization: FULL — all Kraken tools, Hive, clusters, firewall
Rules:
- NEVER test Kraken systems from a Plan/Build/vanilla agent tab
- NEVER use opencode run for testing hooks — only TUI testing is valid
- NEVER declare "completed" without a runtime artifact on disk
- ALWAYS verify which agent tab you are on before executing tool calls`);

          try {
            const { getSystemBrain } = await import('./brains/system/system-brain.js');
            const sysBrain = getSystemBrain();
            if (sysBrain.isInitialized()) {
              const currentGate = sysBrain.getCurrentGate();
              const gateContext = sysBrain.getRelevantContextForGate(currentGate);
              if (gateContext) {
                (output.system as unknown[]).push(`[KRAKEN GATE CONTEXT — ${currentGate.toUpperCase()}]\n${gateContext}`);
              }
            }
          } catch (err: unknown) {
            console.error('[Kraken] Non-fatal gate context injection:', err instanceof Error ? err.message : String(err));
          }
          return;
        }

        // TIER 2: Cluster agents (shark-*, manta-*) — task context only
        if (KRAKEN_PLUGIN_IDENTITY.clusterAgents.has(effectiveAgent)) {
          if (krakenIsMySession(ctx.sessionID)) {
            try {
              const execBrain = getExecutionBrain();
              if (execBrain.isInitialized()) {
                const pendingTask = execBrain.getPendingTask(effectiveAgent);
                if (pendingTask && pendingTask.status === 'planned') {
                  execBrain.claimTask(pendingTask.taskId);
                  output.system = output.system || [];
                  (output.system as unknown[]).push(`[KRAKEN TASK ASSIGNMENT]
You are executing a task delegated by the Kraken orchestrator.
Your identity and capabilities remain your own.
Task: ${pendingTask.description}
Acceptance Criteria: ${pendingTask.criteria.join(', ')}
Cluster: ${pendingTask.clusterId}`);
                }
              }
            } catch (err: unknown) {
              console.error('[Kraken] Task context injection failed:', err instanceof Error ? err.message : String(err));
            }
          }
          return;
        }
      },
      {
        agentFilter: null,
        pluginName: KRAKEN_PLUGIN_IDENTITY.name,
        managedAgents: KRAKEN_PLUGIN_IDENTITY.agents,
        agentPrefix: KRAKEN_PLUGIN_IDENTITY.prefix,
        orchestratorName: KRAKEN_PLUGIN_IDENTITY.orchestrator,
      }
    ),

    'tool.execute.before': safeHook(
      async (input, output, ctx: HookContext) => {
        const sessionState = ctx.getSessionState();
        const toolName = ((input as Record<string, unknown>).tool as string) || '';
        const toolArgs = ((output as Record<string, unknown>)?.args) as Record<string, unknown> || {};

        const resolvedAgent = ctx.agentName || krakenGetSessionAgent(ctx.sessionID) || ((input as Record<string, unknown>).agent as string) || '';

        if (!krakenIsMySession(ctx.sessionID) && !ctx.isMyAgent(resolvedAgent)) {
          return;
        }

        sessionState.lastTool = toolName;
        sessionState.lastToolTime = Date.now();

        try {
          const { enforceFirewall } = await import('./brains/system/firewall/index.js');
          
          const fwResult = enforceFirewall({
            agentName: resolvedAgent,
            toolName,
            toolArgs: toolArgs as Record<string, unknown>,
            message: (toolArgs.task || toolArgs.command || '') as string,
            taskType: (() => {
              if (toolArgs.taskType) return toolArgs.taskType as string;
              const task = ((toolArgs.task as string) || '').toLowerCase();
              const hasWord = (w: string) => new RegExp(`\\b${w}\\b`).test(task);
              if (hasWord('debug') || hasWord('fix') || hasWord('refactor')) return 'debug';
              if (hasWord('build') || hasWord('implement') || hasWord('create') || hasWord('write') || hasWord('scaffold')) return 'build';
              if (hasWord('test') || hasWord('verify') || hasWord('audit')) return 'test';
              return '';
            })(),
            targetCluster: (toolArgs.clusterId || toolArgs.targetCluster || '') as string,
          });

          if (!fwResult.allowed) {
            console.warn(`[FIREWALL_BLOCKED] ${fwResult.blockedBy}: ${fwResult.reason}`);
            sessionState.firewallBlock = {
              layer: fwResult.blockedBy,
              reason: fwResult.reason,
              tool: toolName,
              timestamp: Date.now(),
            };
            if (toolName === 'bash' && toolArgs && typeof toolArgs === 'object') {
              (toolArgs as Record<string, unknown>).command = `echo '[FIREWALL_BLOCKED] ${fwResult.blockedBy}: Operation blocked by Kraken firewall'`;
            } else if ((toolName === 'write' || toolName === 'edit') && toolArgs && typeof toolArgs === 'object') {
              (toolArgs as Record<string, unknown>).filePath = '/dev/null';
              (toolArgs as Record<string, unknown>).content = '';
            }
            throw new Error(`[FIREWALL_BLOCKED] ${fwResult.blockedBy}: ${fwResult.reason}`);
          }
        } catch (e: unknown) {
          const errMsg = e instanceof Error ? e.message : String(e);
          if (errMsg.includes('FIREWALL_BLOCKED')) throw e;
          console.error('[FIREWALL] Enforcement error:', errMsg);
        }

        // Collect evidence after firewall check passes
        try {
          const { getEvidenceCollector } = await import('./shared/evidence-collector.js');
          const { getSystemBrain } = await import('./brains/system/system-brain.js');
          const evidence = getEvidenceCollector();
          const sysBrain = getSystemBrain();
          if (sysBrain.isInitialized()) {
            const currentGate = sysBrain.getCurrentGate();
            console.error('[HOOK_EVIDENCE] Collecting for gate:', currentGate, 'tool:', toolName);
            evidence.collect(currentGate, 'output', {
              tool: toolName,
              sessionState: {
                lastTool: sessionState.lastTool,
                lastToolTime: sessionState.lastToolTime,
                firewallBlock: sessionState.firewallBlock,
              },
              timestamp: Date.now(),
            });
            evidence.persist(currentGate);
            console.error('[HOOK_EVIDENCE] Persisted evidence for gate:', currentGate);
          }
        } catch (err: unknown) { console.error('[EvidenceHook] Failed to collect evidence:', err); }
      },
      {
        agentFilter: null,
        pluginName: KRAKEN_PLUGIN_IDENTITY.name,
        managedAgents: KRAKEN_PLUGIN_IDENTITY.agents,
        agentPrefix: KRAKEN_PLUGIN_IDENTITY.prefix,
        orchestratorName: KRAKEN_PLUGIN_IDENTITY.orchestrator,
      }
    ),

    'chat.message': safeHook(async (input, output, ctx: HookContext) => {
      const agent = ctx.agentName || ((input as Record<string, unknown>)?.agent as string | undefined) || '';
      if (agent && ctx.sessionID) {
        const sessionState = ctx.getSessionState();
        const prevAgent = krakenGetSessionAgent(ctx.sessionID);
        sessionState.lastAgent = agent;
        if (prevAgent && prevAgent !== agent) {
          const wasKraken = ctx.isMyAgent(prevAgent) || prevAgent.startsWith('kraken-');
          const isNowKraken = ctx.isMyAgent(agent) || agent.startsWith('kraken-');
          if (wasKraken && !isNowKraken) {
            console.error(`[AgentSwitch] Session ${ctx.sessionID.slice(0,8)} switched from ${prevAgent} → ${agent} (deregistering from Kraken)`);
            krakenSessionAgentMap.delete(ctx.sessionID);
          } else {
            krakenSetSessionAgent(agent, ctx.sessionID);
          }
        } else {
          krakenSetSessionAgent(agent, ctx.sessionID);
        }
      }

      const resolvedAgent = agent || krakenGetSessionAgent(ctx.sessionID) || '';
      if (!krakenIsMySession(ctx.sessionID) && !ctx.isMyAgent(resolvedAgent)) {
        return;
      }

      await clusterStateHook({ input, output, ctx });

      // In OpenCode 1.14 chat.message hook: user message is in output.message, NOT input.message
      const outMsg = (output as Record<string, unknown>).message;
      const inMsg = (input as Record<string, unknown>)?.message;
      const userMessage: string = typeof outMsg === 'string' ? outMsg :
        (outMsg?.text || outMsg?.content || '') ||
        (typeof inMsg === 'string' ? inMsg :
        (inMsg?.text || inMsg?.content || ''));

      if (!userMessage) return;

      const sessionState = ctx.getSessionState();

      // Identity detection: intercept "who are you" queries
      // Only for kraken agents (input.agent is available on chat.message hook)
      const isKrakenSession = KRAKEN_PLUGIN_IDENTITY.krakenAgents.has(resolvedAgent) || resolvedAgent.startsWith('kraken-') || krakenIsMySession(ctx.sessionID);
      const identityQueryPattern = /\b(who are you|what are you|identify yourself|your name|what is your purpose)\b/i;
      if (identityQueryPattern.test(userMessage) && isKrakenSession) {
        output.system = output.system || [];
        const identity = orchestratorIdentityPrompt || `
You ARE the KRAKEN ORCHESTRATOR — the central coordination engine of the Kraken Agent Harness.

You manage:
- Planning Brain: Task decomposition and context bridging
- Execution Brain: Output verification and task supervision
- System Brain: Gate management and security enforcement
- 3 Agent Clusters: Alpha (steamroll), Beta (balanced), Gamma (precision)
- Kraken Hive Mind: Pattern/failure memory

You are NOT a chatbot. You are an execution engine.`;
        output.system.push(identity);
        return;
      }

      // Brain wiring: auto-decompose user requests into tasks
      if (userMessage.length > 10) {
        try {
          const planningBrain = getPlanningBrain();
          if (planningBrain.isInitialized()) {
            const t1 = await planningBrain.generateT1(userMessage);
            
            if (t1.tasks.length > 0) {
              console.error(`[BrainWire] Generated ${t1.tasks.length} tasks from user request`);
              
              // Notify system brain of task decomposition
              try {
                const systemBrain = getSystemBrain();
                systemBrain.recordDecision({
                  description: `Auto-decomposed user request into ${t1.tasks.length} tasks`,
                  type: 'task-decomposition',
                  contextFiles: [],
                });
              } catch (err: unknown) {
                console.error('[Kraken] Non-fatal:', err instanceof Error ? err.message : String(err));
              }

              // Notify execution brain of expected tasks (for output supervision)
              try {
                const executionBrain = getExecutionBrain();
                const { getBrainMessenger } = await import('./shared/brain-messenger.js');
                const messenger = getBrainMessenger();
                messenger.deliverMessage('kraken-planning', 'kraken-execution', 'context-inject', {
                  type: 't1-decomposed',
                  taskCount: t1.tasks.length,
                  tasks: t1.tasks.map(t => ({ id: t.id, type: t.type, cluster: t.targetCluster })),
                }, 'high');
              } catch (err: unknown) {
                console.error('[Kraken] Non-fatal:', err instanceof Error ? err.message : String(err));
              }
              
              // Inject task context into output
              output.system = output.system || [];
              const taskLines = t1.tasks.map(t => `- ${t.type.toUpperCase()}: ${t.description} → cluster-${t.targetCluster}`);
              output.system.push(`[KRAKEN PLANNING] Task decomposition:\n${taskLines.join('\n')}\n\nExecute tasks using spawn_shark_agent for build/create tasks and spawn_manta_agent for debug/test tasks.`);
            }
          }
        } catch (err: unknown) {
          console.error('[Kraken] Non-fatal brain wiring failure:', err instanceof Error ? err.message : String(err));
        }
      }
    }, {
      // agentFilter: null because we filter by input.agent inside handler
      // Only intercept identity queries for kraken agents
      agentFilter: null,
      pluginName: KRAKEN_PLUGIN_IDENTITY.name,
      managedAgents: KRAKEN_PLUGIN_IDENTITY.agents,
      agentPrefix: KRAKEN_PLUGIN_IDENTITY.prefix,
      orchestratorName: KRAKEN_PLUGIN_IDENTITY.orchestrator,
    }),

    // Compaction survival hook: preserve context before auto-compaction
    'experimental.session.compacting': safeHook(
      async (input, output: Record<string, unknown>, ctx: HookContext) => {
        if (!krakenIsMySession(ctx.sessionID)) return;
        try {
          const { getPlanningBrain } = await import('./brains/planning/planning-brain.js');
          const { getExecutionBrain } = await import('./brains/execution/execution-brain.js');
          const { getSystemBrain } = await import('./brains/system/system-brain.js');
          const { getEvidenceCollector } = await import('./shared/evidence-collector.js');

          const pBrain = getPlanningBrain();
          const eBrain = getExecutionBrain();
          const sBrain = getSystemBrain();
          const evidence = getEvidenceCollector();

          // Persist evidence for current gate before compaction
          const currentGate = sBrain.getCurrentGate();
          evidence.persist(currentGate);

          // Inject brain state context into compaction prompt
          output.context = output.context || [];
          output.context.push(`[KRAKEN COMPACTION SURVIVAL]
Current gate: ${currentGate}
Planning: T2_loaded=${pBrain.isT2MasterLoaded()}, T1_generated=${pBrain.isT1Generated()}
Execution: active=${eBrain.getState().activeTasks}, completed=${eBrain.getState().completedTasks}, failed=${eBrain.getState().failedTasks}
System: decisions=${sBrain.getState().decisionCount}, completed_tasks=${sBrain.getState().completedTasks.length}
Evidence: gate=${currentGate}, verified=${evidence.isGateVerified(currentGate)}

RECOVERY: Read BUILD_LOG.md for what was done. Continue from next unchecked item in BUILD_WORKFLOW.md. Do NOT restart. Do NOT ask "what should I do?"`);

          const survivalContext = sBrain.getCompactionSurvivalContext();
          if (survivalContext) {
            output.context.push(`[KRAKEN COMPACTION SURVIVAL FILES]\n${survivalContext}`);
          }

          console.error('[Compaction] Brain state + survival files preserved for compaction survival');
        } catch (err: unknown) {
          console.error('[Compaction] Failed to preserve state:', err);
        }
      },
      {
        agentFilter: null,
        pluginName: KRAKEN_PLUGIN_IDENTITY.name,
        managedAgents: KRAKEN_PLUGIN_IDENTITY.agents,
        agentPrefix: KRAKEN_PLUGIN_IDENTITY.prefix,
        orchestratorName: KRAKEN_PLUGIN_IDENTITY.orchestrator,
      }
    ),

    // Session lifecycle: clean up brain loops on session end
    event: async (input: Record<string, unknown>) => {
      const evt = (input?.event ?? {}) as Record<string, unknown>;
      const evtProps = (evt.properties ?? {}) as Record<string, unknown>;
      const eventType = (evt?.type as string) || (input?.type as string) || '';

      if (evt) {
        const agent = (evt.agent as string) ?? (evtProps.agent as string);
        const sid = (evt.sessionID as string) ?? (evtProps.sessionID as string);
        if (agent && sid) {
          krakenSetSessionAgent(agent, sid);
        }
      }

      if (eventType === 'session.deleted' || eventType === 'session.ended') {
        const evtRecord = (input?.event ?? {}) as Record<string, unknown>;
        const sid = (input?.sessionID as string) ?? (evtRecord.sessionID as string);
        if (sid) krakenSessionAgentMap.delete(sid);
        concurrencyManager.stopAll();
        console.error('[Kraken] Session ended — brain loops stopped, session map cleared');
      }
    },
  };
}
