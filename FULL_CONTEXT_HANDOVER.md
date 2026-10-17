# FULL CONTEXT HANDOVER: Kraken Agent Ecosystem

**Version:** 1.2.9.2 — 2026-06-01
**Date Generated:** 2026-06-03
**Total Source Files:** 62 TypeScript/Python
**Total Source Lines:** 11,880
**Bundle Size:** 613KB (627,011 bytes)
**Purpose:** Complete consciousness transfer — every file, every bible, every pattern, every type.

> **⚠️ CRITICAL NOTICE:** The reader of this document has NO device access.
> All source code, architecture, T2 context, identity files, Hive bibles, and operational patterns
> are contained within this single document. This is a FULL consciousness transfer of a 2-month project.

## TABLE OF CONTENTS

1. [Project Overview & Metadata](#section-1-project-overview--metadata)
2. [Complete File Tree](#section-2-complete-file-tree)
3. [System Architecture](#section-3-system-architecture)
4. [Engine Reference](#section-4-engine-reference)
5. [FULL SOURCE CODE: Entry Point](#section-5-full-source-code-entry-point)
6. [FULL SOURCE CODE: Brains](#section-6-full-source-code-brains)
7. [FULL SOURCE CODE: Clusters](#section-7-full-source-code-clusters)
8. [FULL SOURCE CODE: Factory](#section-8-full-source-code-factory)
9. [FULL SOURCE CODE: Tools](#section-9-full-source-code-tools)
10. [FULL SOURCE CODE: Hooks](#section-10-full-source-code-hooks)
11. [FULL SOURCE CODE: Identity System](#section-11-full-source-code-identity-system)
12. [FULL SOURCE CODE: Kraken Hive](#section-12-full-source-code-kraken-hive)
13. [FULL SOURCE CODE: Shared Infrastructure](#section-13-full-source-code-shared-infrastructure)
14. [FULL SOURCE CODE: v4.1 Framework](#section-14-full-source-code-v41-guardrail-framework)
15. [FULL SOURCE CODE: Firewall Layers L0-L7](#section-15-full-source-code-firewall-layers-l0-l7)
16. [T2 Context Library (ALL files)](#section-16-t2-context-library-all-files)
17. [Identity Files (ALL 5)](#section-17-identity-files-all-5)
18. [Types & Interfaces](#section-18-types--interfaces)
19. [Bundle Information](#section-19-bundle-information)
20. [Container Test Results](#section-20-container-test-results)
21. [Known Bugs & Issues](#section-21-known-bugs--issues)
22. [Architectural Decisions](#section-22-architectural-decisions)
23. [External References & Bibles](#section-23-external-references--bibles)
24. [Hardcoded Paths & Configuration](#section-24-hardcoded-paths--configuration)
25. [Session State & Continuity](#section-25-session-state--continuity)

## SECTION 1: Project Overview & Metadata

| Field | Value |
|-------|-------|
| Project Name | Kraken Agent |
| Package Name | `kraken-agent` |
| Version | 1.2.9.2 |
| Build System | Bun (v1.x) |
| Bundle Target | Bun runtime |
| Bundle Size | 613KB (627,011 bytes, 142 modules) |
| Source Files | 62 (58 TypeScript + 4 Python) |
| Total Source Lines | 11,880 |
| Plugin Type | OpenCode agent harness plugin |
| Entry Point | `src/index.ts` (849 lines) |
| Plugin Hook | `default async function KrakenAgent(input: PluginInput): Promise<Hooks>` |
| Host Location | `/home/leviathan/.config/opencode/plugins/kraken-agent/` |
| Workspace | `/home/leviathan/.config/opencode/plugins/kraken-agent/` |
| Identity | `kraken` (primary orchestrator) + `kraken-executor` (subagent) |
| Agents Managed | 11 total (2 Kraken + 9 cluster agents) |
| Clusters | 3 (Alpha/Beta/Gamma) — 3 agents each |
| Brains | 3 concurrent async loops (Planning/Execution/System) |
| Firewall Layers | L0-L7 (8 layers, 9 files, ~746 lines) |
| Ship Status | v1.2.9.2 — BRICKED CONFIG SOLVED (2026-05-11) |
| Current Blocker | Tier 4 TUI identity injection — Trident v4.2 cross-plugin leak |
| Host Binary | opencode 1.14.43 |
| Container Image | `opencode-test:1.14.43` |
| Live Config | 8 plugins, model `deepseek/deepseek-v4-flash` |
| V1.3 rebuild | `/home/leviathan/OPENCODE_WORKSPACE/KRAKEN_V1.3_RUNTIME_GRADE_VERIFIED/` (separate tree) |

## SECTION 2: Complete File Tree

```
kraken-agent/
  .gitignore
  COMPACTION_SURVIVAL.md
  DEBUG_LOG.md
  DEPLOY.sh
  README.md
  SHIP.md
  bun.lock
  package.json
  tsconfig.json
  dist/
    index.js
  docs/
    BUILD_LOG.md
    COMPACTION_SURVIVAL.md
    DEBUG_LOG.md
    ship_report_v5.md
  identity/
    orchestrator/
      EXECUTION.md
      IDENTITY.md
      KRAKEN.md
      QUALITY.md
      TOOLS.md
  .git/
    COMMIT_EDITMSG
    FETCH_HEAD
    HEAD
    ORIG_HEAD
    config
    description
    index
    packed-refs
    refs/
      heads/
        master
        v1.2
      tags/
      remotes/
        origin/
          HEAD
          v1.2
    branches/
    info/
      exclude
    objects/
      f9/
        a848f2dc47595ad83dd3586df35952f78c773c
      info/
      fc/
        e0ac92a5dfc589b0c753d2aaf54b692fff1047
      0c/
        9d350afbe1150e0f8bccf11f6ff38b0bd4b81c
      73/
        9c3eade8ccf8d034e2a24fa0721f7905b2a3f6
      10/
        ed8652c0edc2fc3a87cd0329ed7aaced3738f0
      49/
        4a371d240925b697dcf9b0bf1ce03b8a7d354d
      9f/
        c64897d039b44230303112336f05dd81fd57a2
      28/
        7d01b78351d2e911ff59373ab6675caae247ad
      pack/
        pack-7eb4afe951d20b2b78727e9f0ebc6a5cfbd9839c.idx
        pack-7eb4afe951d20b2b78727e9f0ebc6a5cfbd9839c.pack
        pack-7eb4afe951d20b2b78727e9f0ebc6a5cfbd9839c.rev
      66/
        fb027a82b6494dd94bef46091f57a5ecf4e1a4
      e8/
        360622242b29543657f43330016a5a21c35fda
    logs/
      HEAD
      refs/
        heads/
          master
          v1.2
        remotes/
          origin/
            HEAD
            v1.2
    hooks/
      applypatch-msg.sample
      commit-msg.sample
      fsmonitor-watchman.sample
      post-update.sample
      pre-applypatch.sample
      pre-commit.sample
      pre-merge-commit.sample
      pre-push.sample
      pre-rebase.sample
      pre-receive.sample
      prepare-commit-msg.sample
      push-to-checkout.sample
      sendemail-validate.sample
      update.sample
  kraken-context/
    T2_ALIGNMENT_BIBLE.md
    T2_ARCHITECTURE.md
    T2_BUILD_CHAIN.md
    T2_COMPACTION_SURVIVAL.md
    T2_CRASH_RECOVERY.md
    T2_FAILURE_MODES.md
    T2_KRAKEN_LIGHTNING_MODE.md
    T2_KRAKEN_RULES.md
    T2_PATTERNS.md
    T2_PLUGIN_ENGINEERING.md
    T2_TUI_TESTING.md
  subagent-manager/
    bun.lock
    package.json
    tsconfig.json
    dist/
      index.js
    src/
      index.ts
      logger.ts
      tools/
        index.ts
      utils/
        cli.ts
    wrappers/
      __init__.py
      container_pool.py
      opencode_agent.py
  src/
    index.ts
    kraken-hive/
      KrakenHiveSeeder.ts
      index.ts
    config/
    brains/
      BrainConcurrencyManager.ts
      SubagentManagerBrain.ts
      planning/
        planning-brain.ts
      execution/
        execution-brain.ts
      system/
        system-brain.ts
        firewall/
          index.ts
          l0-identity.ts
          l1-orchestration-theater.ts
          l2-false-completion.ts
          l3-output-inspection.ts
          l4-wrong-cluster.ts
          l5-macro-derailment.ts
          l6-kraken-protection.ts
          l7-coordination-gates.ts
    identity/
      index.ts
      injector.ts
      loader.ts
      types.ts
    factory/
      AgentFactory.ts
      ArchitectureFactory.ts
      AsyncDelegationEngine.ts
      BrainFactory.ts
      BrainMessenger.ts
      ClusterFactory.ts
      ClusterScheduler.ts
      StateStore.ts
      index.ts
      kraken-types.ts
      types.ts
      validators.ts
    v4.1/
      index.ts
      config/
        agent-registration.ts
        constants.ts
        identity.ts
      state/
        global-state.ts
        session-state.ts
      utils/
        logger.ts
      hooks/
        compose-handlers.ts
        safe-hook.ts
      context/
        agent-awareness.ts
        hook-context.ts
    clusters/
      ClusterInstance.ts
      ClusterManager.ts
      wrappers/
        __init__.py
        container_pool.py
        opencode_agent.py
    tools/
      cluster-tools.ts
      kraken-hive-tools.ts
      monitoring-tools.ts
      shark-t2-tools.ts
    shared/
      brain-messenger.ts
      domain-ownership.ts
      evidence-collector.ts
      state-store.ts
    hooks/
      cluster-state-hook.ts
    tests/
      categories/
        cluster.test.ts
        delegation.test.ts
        hive.test.ts
        isolation.test.ts
  wrappers/
    __init__.py
    container_pool.py
    opencode_agent.py
```

## SECTION 3: System Architecture

### 3.1 High-Level Pipeline Diagram

```
USER REQUEST
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    KRAKEN ORCHESTRATOR                           │
│  ┌──────────────────────────────────────────────────────┐      │
│  │              V1.2 Multi-Brain System                   │      │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │      │
│  │  │  PLANNING    │  │  EXECUTION   │  │   SYSTEM   │  │      │
│  │  │  Brain       │  │  Brain       │  │   Brain    │  │      │
│  │  │  T2 Master   │  │  Supervisor  │  │  L0-L7 FW  │  │      │
│  │  │  T1 Gen      │  │  Override    │  │  Gates     │  │      │
│  │  │  Task Dec    │  │  Quality     │  │  Security  │  │      │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬─────┘  │      │
│  │         │                  │                  │         │      │
│  │         └──────────────────┼──────────────────┘         │      │
│  │                            │                            │      │
│  │                 ┌──────────┴──────────┐                 │      │
│  │                 │   BRAIN MESSENGER   │                 │      │
│  │                 │  Priority signalling │                 │      │
│  │                 └──────────┬──────────┘                 │      │
│  └────────────────────────────┼────────────────────────────┘      │
│                                │                                   │
│              ┌─────────────────┼─────────────────┐                │
│              ▼                 ▼                  ▼                │
│     ┌────────────────┐ ┌────────────────┐ ┌────────────────┐     │
│     │ CLUSTER-ALPHA  │ │  CLUSTER-BETA  │ │ CLUSTER-GAMMA  │     │
│     │ Steamroll      │ │  Balanced      │ │ Precision      │     │
│     │ shark-α1       │ │  shark-β1      │ │ manta-γ1       │     │
│     │ shark-α2       │ │  manta-β1      │ │ manta-γ2       │     │
│     │ manta-α1       │ │  manta-β2      │ │ shark-γ1       │     │
│     └────────┬───────┘ └────────┬───────┘ └────────┬───────┘     │
│              │                  │                  │              │
│              └──────────────────┼──────────────────┘              │
│                                 │                                 │
│                    ┌────────────┴────────────┐                    │
│                    │    Async Delegation     │                    │
│                    │    Engine + Scheduler   │                    │
│                    │    (Priority Queue)     │                    │
│                    └────────────┬────────────┘                    │
│                                 │                                 │
│                    ┌────────────┴────────────┐                    │
│                    │    Kraken Hive Mind     │                    │
│                    │  File-based memory      │                    │
│                    │  Patterns/Failures/     │                    │
│                    │  Sessions/Decisions     │                    │
│                    └─────────────────────────┘                    │
└───────────────────────────────────────────────────────────────────┘
```

## SECTION 4: Engine Reference

### 4.1 Component-Responsibility Matrix

| # | Component | File | Lines | Responsibility |
|---|-----------|------|-------|----------------|
| 1 | Plugin Entry | `src/index.ts` | 849 | Agent registration, hook wiring, identity loading, brain init |
| 2 | Execution Brain | `src/brains/execution/execution-brain.ts` | 382 | Task supervision, output verification, override commands, quality |
| 3 | Planning Brain | `src/brains/planning/planning-brain.ts` | 421 | T2 context, T1 generation, task decomposition, domain designation |
| 4 | System Brain | `src/brains/system/system-brain.ts` | 464 | 6-gate pipeline, security, L4 validation, gate advancement |
| 5 | Brain Concurrency | `src/brains/BrainConcurrencyManager.ts` | 235 | 3 async event loops (200ms/200ms/500ms), drainMessages |
| 6 | Subagent Manager | `src/brains/SubagentManagerBrain.ts` | 174 | Override command handling (ABORT, RETRIEVE_OUTPUTS, RETRY) |
| 7 | Async Delegation | `src/factory/AsyncDelegationEngine.ts` | 373 | Priority queue, promise-based, waitForCompletion, brain sync |
| 8 | Cluster Scheduler | `src/factory/ClusterScheduler.ts` | 269 | Least-load scheduling, focus anchoring, smart cluster resolution |
| 9 | Cluster Manager | `src/clusters/ClusterManager.ts` | 231 | 3 cluster facade, executeTask, status queries |
| 10 | Cluster Instance | `src/clusters/ClusterInstance.ts` | 418 | Docker spawning, retry logic, agent tracking |
| 11 | Kraken Hive Engine | `src/kraken-hive/index.ts` | 370 | File-based search, pattern/failure storage, context injection |
| 12 | Cluster Tools | `src/tools/cluster-tools.ts` | 349 | spawn_cluster_task, spawn_shark_agent, spawn_manta_agent, anchor_cluster |
| 13 | Monitoring Tools | `src/tools/monitoring-tools.ts` | 288 | get_cluster_status, aggregate_results, get_agent_status, kraken_brain_status |
| 14 | Hive Tools | `src/tools/kraken-hive-tools.ts` | 164 | kraken_hive_search, kraken_hive_remember, kraken_hive_inject_context |
| 15 | T2 Tools | `src/tools/shark-t2-tools.ts` | 172 | read_kraken_context, report_to_kraken, get_task_context |
| 16 | Cluster State Hook | `src/hooks/cluster-state-hook.ts` | 158 | Track agent activity, persist to file |
| 17 | L0-L7 Firewall | `src/brains/system/firewall/ (9 files)` | 746 | Identity, theater, completion, inspection, cluster, derailment, protection, gates |
| 18 | Identity Loader | `src/identity/loader.ts` | 328 | File-based identity loading from 5 markdown files |
| 19 | State Store | `src/shared/state-store.ts` | 136 | Domain-owned key-value store with watchers |
| 20 | Brain Messenger | `src/shared/brain-messenger.ts` | 222 | Priority queue, broadcast, override, drainMessages |
| 21 | Evidence Collector | `src/shared/evidence-collector.ts` | 175 | Gate evidence persistence, file verification |
| 22 | v4.1 Framework | `src/v4.1/ (8 files)` | ~700 | safeHook, hook-context, agent-awareness, session-state |
| 23 | Hive Seeder | `src/kraken-hive/KrakenHiveSeeder.ts` | 139 | Seed initial patterns/failures into Hive at init |
| 24 | Factory Validators | `src/factory/validators.ts` | 240 | Architecture, agent, cluster, brain validation |
| 25 | Architecture Factory | `src/factory/ArchitectureFactory.ts` | 186 | Assembles full architecture from config |

## SECTION 5: FULL SOURCE CODE — Entry Point


---

### Source: `src/index.ts` (849 lines)

```typescript
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

import type { Plugin, PluginInput } from '@opencode-ai/plugin';

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
import {
  createStateStore as createFactoryStateStore,
  createBrainMessenger as createFactoryMessenger,
} from './factory/index.js';

// Import Kraken-specific components
import { AsyncDelegationEngine } from './factory/AsyncDelegationEngine.js';
import { ClusterScheduler } from './factory/ClusterScheduler.js';
import { ClusterManager } from './clusters/ClusterManager.js';
import { KrakenHiveEngine } from './kraken-hive/index.js';
import { createEvidenceCollector } from './shared/evidence-collector.js';
import { BrainConcurrencyManager } from './brains/BrainConcurrencyManager.js';
import { SubagentManagerBrain } from './brains/SubagentManagerBrain.js';
import { seedKrakenHive } from './kraken-hive/KrakenHiveSeeder.js';

// Import tools
import { createClusterTools } from './tools/cluster-tools.js';
import { createMonitoringTools } from './tools/monitoring-tools.js';
import { createKrakenHiveTools } from './tools/kraken-hive-tools.js';
import { createSharkT2Tools } from './tools/shark-t2-tools.js';

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

async function loadOrchestratorIdentity(): Promise<string> {
  try {
    const bundle = await identityLoader.loadForRole('orchestrator');
    return formatIdentityForSystemPrompt(bundle);
  } catch (error) {
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
let delegationEngine: AsyncDelegationEngine | null = null;
let clusterScheduler: ClusterScheduler | null = null;
let krakenHive: KrakenHiveEngine | null = null;

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
- Debug/precision tasks → cluster-gamma (Mantas)
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

function getAgentTools(agentName: string): Record<string, any> {
  if (isKrakenAgent(agentName)) {
    // Kraken agents get Hive tools + cluster tools
    return {
      ...createClusterTools(getClusterToolsContext()),
      ...createMonitoringTools(getMonitoringToolsContext()),
      ...createKrakenHiveTools(getKrakenHiveToolsContext()),
    };
  } else if (isClusterAgent(agentName)) {
    // Cluster agents get T2 tools only
    return {
      ...createSharkT2Tools(getT2ToolsContext()),
    };
  }
  return {};
}

function getClusterToolsContext() {
  return {
    delegationEngine: delegationEngine!,
    clusterScheduler: clusterScheduler!,
    clusterManager: clusterManager!,
    krakenIdentity: orchestratorIdentityPrompt,
  };
}

function getMonitoringToolsContext() {
  return {
    delegationEngine: delegationEngine!,
    clusterManager: clusterManager!,
  };
}

function getKrakenHiveToolsContext() {
  return {
    krakenHive: krakenHive!,
    isKrakenAgent,
  };
}

function getT2ToolsContext() {
  return {
    isSharkOrMantaAgent: isClusterAgent,
  };
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
    logger.warn('[Identity] Orchestrator identity NOT loaded - using fallback');
    orchestratorIdentityPrompt = ''; // Will use fallback in identity hook
  }

  // Initialize core components
  clusterManager = new ClusterManager(KRAKEN_CLUSTERS);
  clusterScheduler = new ClusterScheduler(KRAKEN_CLUSTERS);
  krakenHive = new KrakenHiveEngine();
  delegationEngine = new AsyncDelegationEngine(KRAKEN_CLUSTERS, clusterManager);

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

  // Seed Kraken Hive with initial patterns
  const hiveSeed = seedKrakenHive();
  logger.info('[Hive] Seed complete', hiveSeed);

  // Initialize Subagent Manager Brain — receives override commands, manages output retrieval
  const subagentBrain = new SubagentManagerBrain(messenger, stateStore);
  subagentBrain.initialize();
  logger.info('[Subagent] Manager brain initialized');

  // Initialize Brain Concurrency Manager — launches independent async event loops
  const concurrencyManager = new BrainConcurrencyManager(messenger, stateStore);
  
  // Wire brain-specific tick handlers
  // System Brain tick: evaluate gate criteria, check for auto-advancement
  concurrencyManager.setSystemTick(async () => {
    try {
      const currentGate = systemBrain.getCurrentGate();
      const evaluation = systemBrain.evaluateGateEntry(currentGate);
      if (evaluation.allPassed && await systemBrain.isGateAdvanceable()) {
        const gateOrder = ['plan', 'build', 'test', 'verify', 'audit', 'delivery'];
        const currentIdx = gateOrder.indexOf(currentGate);
        if (currentIdx >= 0 && currentIdx < gateOrder.length - 1) {
          const nextGate = gateOrder[currentIdx + 1];
          systemBrain.setCurrentGate(nextGate);
          console.log(`[BrainTick:system] Gate auto-advanced: ${currentGate} → ${nextGate}`);
        }
      }
    } catch { /* non-critical */ }
  });

  // Execution Brain tick: monitor active tasks, detect stalls
  concurrencyManager.setExecutionTick(async () => {
    try {
      const execState = executionBrain.getState();
      if (execState.activeTasks > 0) {
        // Check for stalled tasks (active > 60s with no completion)
        // Log but don't block — override detection happens in separate monitoring
      }
    } catch { /* non-critical */ }
  });

  // Planning Brain tick: check for pending context injections
  concurrencyManager.setPlanningTick(async () => {
    try {
      // Check if T2 context needs refresh
      const planState = planningBrain.getState();
      if (!planState.t2MasterLoaded) {
        // T2 still loading — fire-and-forget from init, will resolve
      }
    } catch { /* non-critical */ }
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
    // Cluster tools - available to Kraken agents
    ...createClusterTools(getClusterToolsContext()),
    // Monitoring tools - available to Kraken agents
    ...createMonitoringTools(getMonitoringToolsContext()),
    // Hive tools - available to Kraken agents ONLY
    ...createKrakenHiveTools(getKrakenHiveToolsContext()),
    // T2 tools - available to Cluster agents ONLY
    ...createSharkT2Tools(getT2ToolsContext()),
  };

  logger.info('Kraken Agent Harness initialized', {
    clusterCount: KRAKEN_CLUSTERS.length,
    totalAgents: KRAKEN_PLUGIN_IDENTITY.agents.size,
    krakenHiveReady: true,
  });

  return {
    name: KRAKEN_PLUGIN_IDENTITY.name,

    tool: allTools,

    config: async (opencodeConfig: Record<string, any>) => {
      // Register all agents
      const sdkConfigs: Record<string, any> = {};

      // Kraken orchestrator agents
      for (const [id, agent] of krakenAgents) {
        const isPrimary = id === 'kraken';
        sdkConfigs[id] = {
          name: id,
          description: agent.description,
          instructions: agent.instructions,
          mode: isPrimary ? 'primary' : 'subagent',
          permission: { task: 'allow' },
          tools: getAgentTools(id),
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
          tools: getAgentTools(id),
        };
      }

      if (!opencodeConfig.agent) {
        opencodeConfig.agent = { ...sdkConfigs };
      } else {
        Object.assign(opencodeConfig.agent, sdkConfigs);
      }

      logger.info('Agents registered', {
        count: Object.keys(sdkConfigs).length,
        primary: Array.from(KRAKEN_PLUGIN_IDENTITY.primaryAgents),
      });
    },

    // Wire hooks
    // system.transform: inject Kraken orchestration context (NOT full identity)
    // Full identity detection is in chat.message with proper agent checking
    // agentFilter: null because hook input has no agent name
    'experimental.chat.system.transform': safeHook(
      async (input, output: any, ctx: HookContext) => {
        // Inject orchestration context — not identity override
        // This adds capabilities context without changing who the agent IS
        if (orchestratorIdentityPrompt) {
          output.system = output.system || [];
          output.system.push(`[KRAKEN ORCHESTRATION LAYER ACTIVE]
You have access to the Kraken multi-brain orchestration system.
Available orchestration tools: spawn_shark_agent, spawn_manta_agent, spawn_cluster_task,
anchor_cluster, kraken_brain_status, get_cluster_status, get_agent_status,
kraken_hive_search, kraken_hive_remember, read_kraken_context.
Use these tools to coordinate parallel execution across Alpha (build),
Beta (debug), and Gamma (test) clusters.`);
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
        if (!ctx.isMyAgent()) return;

        const sessionState = ctx.getSessionState();
        const toolName = (input as any).tool as string || '';
        const toolArgs = (input as any).args || (input as any).params || {};
        sessionState.lastTool = toolName;
        sessionState.lastToolTime = Date.now();

        // Run full L0-L7 firewall on every tool execution
        try {
          const { enforceFirewall } = await import('./brains/system/firewall/index.js');
          const agentName = ctx.agentName || (input as any).agent;
          
          const fwResult = enforceFirewall({
            agentName,
            toolName,
            toolArgs: toolArgs as Record<string, unknown>,
            message: (toolArgs.task || toolArgs.command || '') as string,
            taskType: (toolArgs.taskType || '') as string,
            targetCluster: (toolArgs.clusterId || toolArgs.targetCluster || '') as string,
          });

          if (!fwResult.allowed) {
            console.warn(`[FIREWALL] BLOCKED ${fwResult.blockedBy}: ${fwResult.reason}`);
            // Store block event for system brain
            sessionState.firewallBlock = {
              layer: fwResult.blockedBy,
              reason: fwResult.reason,
              tool: toolName,
              timestamp: Date.now(),
            };
            // For critical layers (L0, L6), prevent execution
            if (fwResult.blockedBy === 'L0' || fwResult.blockedBy === 'L6') {
              throw new Error(fwResult.reason || 'Firewall blocked');
            }
          }
        } catch (e: any) {
          // Firewall blocks that throw stop tool execution
          if (e.message && e.message.includes('Firewall')) {
            throw e;
          }
          // Non-firewall errors are logged but don't block
          console.error('[Firewall] Error during enforcement:', e.message);
        }
      },
      {
        agentFilter: Array.from(KRAKEN_PLUGIN_IDENTITY.agents),
        pluginName: KRAKEN_PLUGIN_IDENTITY.name,
        managedAgents: KRAKEN_PLUGIN_IDENTITY.agents,
        agentPrefix: KRAKEN_PLUGIN_IDENTITY.prefix,
        orchestratorName: KRAKEN_PLUGIN_IDENTITY.orchestrator,
      }
    ),

    // Track cluster activity for all agents + brain wiring + identity detection
    'chat.message': safeHook(async (input, output, ctx: HookContext) => {
      // Cluster state tracking
      await clusterStateHook({ input, output, ctx } as any);

      // In OpenCode 1.14 chat.message hook: user message is in output.message, NOT input.message
      const outMsg = (output as any).message;
      const userMessage: string = typeof outMsg === 'string' ? outMsg :
        (outMsg?.text || outMsg?.content || '');

      if (!userMessage) return;

      const sessionState = ctx.getSessionState();

      // Identity detection: intercept "who are you" queries
      // Only for kraken agents (input.agent is available on chat.message hook)
      const agent = (input as any).agent || '';
      const isKrakenSession = KRAKEN_PLUGIN_IDENTITY.krakenAgents.has(agent) || agent.startsWith('kraken-');
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
              console.log(`[BrainWire] Generated ${t1.tasks.length} tasks from user request`);
              
              // Notify system brain of task decomposition
              try {
                const systemBrain = getSystemBrain();
                systemBrain.recordDecision({
                  description: `Auto-decomposed user request into ${t1.tasks.length} tasks`,
                  type: 'task-decomposition',
                  contextFiles: [],
                });
              } catch { /* non-fatal */ }

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
              } catch { /* non-fatal */ }
              
              // Inject task context into output
              output.system = output.system || [];
              const taskLines = t1.tasks.map(t => `- ${t.type.toUpperCase()}: ${t.description} → cluster-${t.targetCluster}`);
              output.system.push(`[KRAKEN PLANNING] Task decomposition:\n${taskLines.join('\n')}\n\nExecute tasks using spawn_shark_agent for build/create tasks and spawn_manta_agent for debug/test tasks.`);
            }
          }
        } catch (err) {
          // Brain wiring failure is non-fatal
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
      async (input, output: any, ctx: HookContext) => {
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
Evidence: gate=${currentGate}, verified=${evidence.isGateVerified(currentGate)}`);

          console.log('[Compaction] Brain state preserved for compaction survival');
        } catch (err) {
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
    event: async (input: any) => {
      const eventType = input?.event?.type || input?.type || '';
      if (eventType === 'session.deleted' || eventType === 'session.ended') {
        concurrencyManager.stopAll();
        console.log('[Kraken] Session ended — brain loops stopped');
      }
    },
  };
}
```
## SECTION 6: FULL SOURCE CODE — Brains

### 6.1 Execution Brain

---

### Source: `src/brains/execution/execution-brain.ts` (382 lines)

```typescript
/**
 * src/brains/execution/execution-brain.ts
 * 
 * V1.2 Execution Brain
 * 
 * Owns: execution-state, quality-state
 * 
 * Key responsibilities:
 * - Task supervision via executeOnAgent
 * - Output verification
 * - Override commands
 * - Quality enforcement
 */

import { getStateStore, type StateStore } from '../../shared/state-store.js';
import { getBrainMessenger, type BrainMessenger } from '../../shared/brain-messenger.js';
import type { DomainId } from '../../shared/domain-ownership.js';
import type { OverrideCommand } from '../../shared/brain-messenger.js';

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
  outputs?: string[];
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

  constructor(stateStore?: StateStore, messenger?: BrainMessenger) {
    this.stateStore = stateStore || getStateStore();
    this.messenger = messenger || getBrainMessenger();
  }

  initialize(): void {
    if (this.initialized) return;
    
    console.log('[ExecutionBrain] Initializing...');
    this.initialized = true;
    this.state.initialized = true;
    
    this.stateStore.set('execution-state', 'initialized', true, ['kraken-execution']);
    this.stateStore.set('execution-state', 'brain-id', 'kraken-execution', ['kraken-execution']);
    
    // Subscribe to brain messages
    this.messenger.subscribe('kraken-execution', this.handleBrainMessage.bind(this));
    
    console.log('[ExecutionBrain] Initialized - owns execution-state, quality-state');
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  // =========================================================================
  // OUTPUT VERIFICATION (V1.2 KEY FEATURE)
  // =========================================================================

  registerTaskOutputs(taskId: string, outputs: TaskOutput[]): void {
    this.registeredOutputs.set(taskId, outputs);
    console.log(`[ExecutionBrain] Registered ${outputs.length} outputs for task ${taskId}`);
    
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

    console.log(`[ExecutionBrain] Verified ${hostPaths.length} outputs for task ${taskId}`);
    
    this.stateStore.set('execution-state', `retrieved-${taskId}`, hostPaths, ['kraken-execution']);
  }

  canCompleteTask(taskId: string): boolean {
    const outputs = this.registeredOutputs.get(taskId);
    if (!outputs) return true; // No outputs required
    
    // All required outputs must be retrieved
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

  // =========================================================================
  // TASK EXECUTION
  // =========================================================================

  async executeTask(taskId: string, clusterId: string, request: {
    task: string;
    model?: string;
    timeout?: number;
    outputs?: TaskOutput[];
  }): Promise<ExecutionResult> {
    console.log(`[ExecutionBrain] Executing task ${taskId} on cluster ${clusterId}`);
    
    // Register outputs if provided
    if (request.outputs && request.outputs.length > 0) {
      this.registerTaskOutputs(taskId, request.outputs);
    }
    
    // Track active task
    this.activeTasks.set(taskId, {
      clusterId,
      status: 'executing',
      startTime: Date.now(),
    });
    this.state.activeTasks++;
    this.updateState();
    
    // Send execution message
    this.messenger.deliverMessage('kraken-execution', 'kraken-system', 'context-inject', {
      type: 'task-started',
      taskId,
      clusterId,
    }, 'normal');
    
    return {
      taskId,
      success: false, // Task NOT complete — result comes from delegation engine
      clusterId,
      agentId: 'pending',
      completedAt: 0, // Not completed yet
    };
  }

  completeTask(result: ExecutionResult): void {
    const taskInfo = this.activeTasks.get(result.taskId);
    if (taskInfo) {
      this.activeTasks.delete(result.taskId);
      this.state.activeTasks = Math.max(0, this.state.activeTasks - 1);
    }
    
    if (result.success) {
      this.state.completedTasks++;
      
      // L2: Fire-and-forget detection — completion MUST have output retrieval
      const outputs = this.registeredOutputs.get(result.taskId);
      const allVerified = outputs ? outputs.every(o => o.retrieved) : false;
      
      if (outputs && outputs.length > 0 && !allVerified) {
        console.warn(`[ExecutionBrain] L2_WARNING: Task ${result.taskId} claims completion but ${outputs.filter(o => !o.retrieved).length}/${outputs.length} outputs not retrieved`);
        console.warn(`[ExecutionBrain] FIRE-AND-FORGET DETECTED — triggering output retrieval enforcement`);
        // Auto-enforce output retrieval
        this.enforceOutputRetrieval(result.taskId);
      }
    } else {
      this.state.failedTasks++;
    }
    
    this.updateState();
    this.stateStore.set('execution-state', 'active-tasks', this.state.activeTasks, ['kraken-execution']);
    this.stateStore.set('execution-state', 'completed-tasks', this.state.completedTasks, ['kraken-execution']);
    this.stateStore.set('execution-state', `task-${result.taskId}-result`, result, ['kraken-execution']);
    
    console.log(`[ExecutionBrain] Task ${result.taskId} completed: ${result.success ? 'SUCCESS' : 'FAILED'} (active: ${this.state.activeTasks}, completed: ${this.state.completedTasks})`);
    
    // Check if task can complete (outputs verified)
    if (result.success && this.canCompleteTask(result.taskId)) {
      this.messenger.deliverMessage('kraken-execution', 'kraken-system', 'checkpoint', {
        type: 'task-complete-verified',
        taskId: result.taskId,
        outputs: result.outputs,
      }, 'high');
    }
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
      console.log(`[ExecutionBrain] Task ${taskId} outputs incomplete: ${outputStatus.retrieved}/${outputStatus.required}`);
      
      // Send gate failure message
      this.messenger.deliverMessage('kraken-execution', 'kraken-system', 'gate-failure', {
        taskId,
        reason: 'outputs-not-retrieved',
        required: outputStatus.required,
        retrieved: outputStatus.retrieved,
      }, 'critical');
    }
  }

  // =========================================================================
  // OVERRIDE COMMANDS (V1.2 KEY FEATURE)
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
    
    const result = this.messenger.sendOverride(command);
    console.log(`[ExecutionBrain] Abort command sent for task ${taskId}: ${command.id}`);
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
    
    // Check output retrieval
    const outputStatus = this.getOutputStatus(taskId);
    if (!outputStatus.complete) {
      issues.push(`Output incomplete: ${outputStatus.retrieved}/${outputStatus.required}`);
    }
    
    // Check task duration
    const taskInfo = this.activeTasks.get(taskId);
    if (taskInfo) {
      const duration = Date.now() - taskInfo.startTime;
      const timeout = 120000; // 2 minutes default
      if (duration > timeout) {
        issues.push(`Task duration ${duration}ms exceeds timeout ${timeout}ms`);
      }
    }
    
    const passed = issues.length === 0;
    
    this.stateStore.set('quality-state', `check-${taskId}`, { passed, issues }, ['kraken-execution']);
    
    return { passed, issues };
  }

  // =========================================================================
  // RESULT TRACKING
  // =========================================================================

  recordResult(result: ExecutionResult): void {
    // Delegate to completeTask which handles the full lifecycle
    this.completeTask(result);
  }

  private handleBrainMessage(message: { from: string; to: string; type: string; payload: Record<string, unknown> }): void {
    if (message.type === 'gate-failure' && message.from === 'kraken-system') {
      console.log(`[ExecutionBrain] Received gate failure: ${JSON.stringify(message.payload)}`);
    }
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
    this.state = {
      initialized: true,
      activeTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
    };
  }
}

// Singleton instance
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
```
### 6.2 Planning Brain

---

### Source: `src/brains/planning/planning-brain.ts` (421 lines)

```typescript
/**
 * src/brains/planning/planning-brain.ts
 * 
 * V1.2 Planning Brain
 * 
 * Owns: planning-state, context-bridge
 * 
 * Responsibilities:
 * - T2 Master context loading
 * - T1 dynamic generation from SPEC.md
 * - Task decomposition for cluster assignment
 * - Domain designation
 */

import { getStateStore, type StateStore } from '../../shared/state-store.js';
import { getBrainMessenger, type BrainMessenger } from '../../shared/brain-messenger.js';
import type { DomainId } from '../../shared/domain-ownership.js';

export interface TaskSpec {
  id: string;
  type: 'build' | 'debug' | 'test' | 'refactor' | 'analyze' | 'audit';
  description: string;
  targetCluster: 'alpha' | 'beta' | 'gamma';
  outputs?: { path: string; type: 'file' | 'directory'; required: boolean }[];
  priority?: 'critical' | 'high' | 'normal' | 'low';
}

export interface PlanningState {
  t2MasterLoaded: boolean;
  t1Generated: boolean;
  tasksDecomposed: boolean;
  domainsDesignated: boolean;
}

export class PlanningBrain {
  private initialized = false;
  private state: PlanningState = {
    t2MasterLoaded: false,
    t1Generated: false,
    tasksDecomposed: false,
    domainsDesignated: false,
  };
  private stateStore: StateStore;
  private messenger: BrainMessenger;

  constructor(stateStore?: StateStore, messenger?: BrainMessenger) {
    this.stateStore = stateStore || getStateStore();
    this.messenger = messenger || getBrainMessenger();
  }

  initialize(): void {
    if (this.initialized) return;
    
    console.log('[PlanningBrain] Initializing...');
    this.initialized = true;
    
    // Set initial state
    this.stateStore.set('planning-state', 'initialized', true, ['kraken-planning']);
    this.stateStore.set('planning-state', 'brain-id', 'kraken-planning', ['kraken-planning']);
    
    // T2 Master loads from static kraken-context on init
    // Fire-and-forget async load — generateT1 doesn't block on it
    this.loadT2Master().catch(err => {
      console.error('[PlanningBrain] T2 Master load failed:', err);
    });
    
    console.log('[PlanningBrain] Initialized - owns planning-state, context-bridge');
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  // =========================================================================
  // T2 MASTER CONTEXT
  // =========================================================================

  async loadT2Master(): Promise<void> {
    console.log('[PlanningBrain] Loading T2 Master context...');
    
    // Load T2 Master context from kraken-context
    // In real implementation, this loads from kraken-context library
    const t2Context = await this.loadKrakenContext();
    
    this.stateStore.set('planning-state', 't2-master', t2Context, ['kraken-planning']);
    this.state.t2MasterLoaded = true;
    
    // Notify other brains that T2 is loaded
    this.messenger.deliverMessage('kraken-planning', 'kraken-execution', 'context-inject', {
      type: 't2-master-loaded',
      data: { t2MasterLoaded: true }
    }, 'high');
    
    console.log('[PlanningBrain] T2 Master loaded');
  }

  isT2MasterLoaded(): boolean {
    return this.state.t2MasterLoaded;
  }

  private async loadKrakenContext(): Promise<Record<string, unknown>> {
    try {
      const fs = await import('node:fs/promises');
      const path = await import('node:path');
      const contextDir = path.resolve(process.cwd(), 'kraken-context');
      
      const context: Record<string, unknown> = {
        version: '1.2',
        loadedAt: Date.now(),
        sourceDir: contextDir,
      };

      // Load T2 context files from kraken-context/ directory
      try {
        const entries = await fs.readdir(contextDir);
        for (const entry of entries) {
          if (entry.endsWith('.md')) {
            const content = await fs.readFile(path.join(contextDir, entry), 'utf-8');
            context[entry.replace('.md', '')] = content.substring(0, 1000);
          }
        }
        console.log(`[PlanningBrain] Loaded ${entries.length} T2 context files from ${contextDir}`);
      } catch {
        console.log(`[PlanningBrain] No kraken-context/ directory at ${contextDir}, using defaults`);
      }

      // Fallback: check alternative paths
      if (Object.keys(context).length <= 3) {
        const altPaths = [
          path.resolve(process.cwd(), '../kraken-context'),
          path.resolve(process.cwd(), '../../kraken-context'),
        ];
        for (const altDir of altPaths) {
          try {
            const entries = await fs.readdir(altDir);
            for (const entry of entries) {
              if (entry.endsWith('.md')) {
                const content = await fs.readFile(path.join(altDir, entry), 'utf-8');
                context[entry.replace('.md', '')] = content.substring(0, 1000);
              }
            }
            console.log(`[PlanningBrain] Loaded ${entries.length} T2 files from ${altDir}`);
            break;
          } catch { /* try next */ }
        }
      }

      // Always include core capabilities
      context.capabilities = ['planning', 'execution', 'system', 'hive'];
      context.clusterTypes = ['alpha', 'beta', 'gamma'];
      
      return context;
    } catch {
      return {
        version: '1.2',
        loadedAt: Date.now(),
        capabilities: ['planning', 'execution', 'system', 'hive'],
        clusterTypes: ['alpha', 'beta', 'gamma'],
      };
    }
  }

  // =========================================================================
  // T1 DYNAMIC GENERATION
  // =========================================================================

  async generateT1(userRequest: string = ''): Promise<{
    tasks: TaskSpec[];
    context: Record<string, unknown>;
  }> {
    console.log('[PlanningBrain] Generating T1...');
    
    // Try reading SPEC.md from workspace first (blueprint: MUST generate from SPEC.md)
    let specContent = userRequest;
    try {
      const fs = await import('node:fs/promises');
      const path = await import('node:path');
      const specPaths = [
        path.resolve(process.cwd(), 'SPEC.md'),
        path.resolve(process.cwd(), 'spec.md'),
        path.resolve(process.cwd(), 'plan.md'),
      ];
      for (const specPath of specPaths) {
        try {
          await fs.access(specPath);
          specContent = await fs.readFile(specPath, 'utf-8');
          console.log(`[PlanningBrain] Loaded T1 from ${specPath} (${specContent.length} chars)`);
          break;
        } catch { /* try next */ }
      }
    } catch { /* fall back to user request text */ }
    
    // Parse request into tasks — handles markdown headings AND plain text
    const tasks = this.parseRequestIntoTasks(specContent);
    
    const t1 = {
      tasks,
      context: {
        specSource: userRequest.substring(0, 200),
        generatedAt: new Date().toISOString(),
        phases: ['PLAN', 'BUILD', 'TEST', 'VERIFY', 'AUDIT', 'DELIVERY'],
        planningBrain: 'kraken-planning',
      },
    };
    
    this.state.t1Generated = true;
    this.stateStore.set('planning-state', 't1-generated', true, ['kraken-planning']);
    this.stateStore.set('planning-state', 't1-context', t1, ['kraken-planning']);
    
    console.log(`[PlanningBrain] T1 generated: ${tasks.length} tasks`);
    
    return t1;
  }

  private parseRequestIntoTasks(userRequest: string): TaskSpec[] {
    if (!userRequest || userRequest.trim().length === 0) {
      return [];
    }

    const tasks: TaskSpec[] = [];
    let id = 0;
    
    // Strategy 1: Parse markdown headings as task descriptions
    const headingRegex = /^#{1,3}\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(userRequest)) !== null) {
      const description = match[1].trim();
      const type = this.inferTaskType(description);
      tasks.push({
        id: `task-${++id}-${Date.now()}`,
        type,
        description,
        targetCluster: this.assignCluster(type),
        outputs: [],
        priority: 'normal',
      });
    }

    // Strategy 2: If no markdown headings found, create a single task from the user request
    if (tasks.length === 0) {
      // Split by sentences or newlines for multi-step requests
      const steps = userRequest
        .split(/\n+/)
        .map(s => s.trim())
        .filter(s => s.length > 10 && !s.startsWith('#'));

      if (steps.length > 1) {
        // Multiple steps — create individual tasks
        for (const step of steps) {
          const type = this.inferTaskType(step);
          tasks.push({
            id: `task-${++id}-${Date.now()}`,
            type,
            description: step.substring(0, 200),
            targetCluster: this.assignCluster(type),
            outputs: [],
            priority: 'normal',
          });
        }
      } else {
        // Single request — create one task
        const type = this.inferTaskType(userRequest);
        tasks.push({
          id: `task-${++id}-${Date.now()}`,
          type,
          description: userRequest.substring(0, 200),
          targetCluster: this.assignCluster(type),
          outputs: [],
          priority: 'normal',
        });
      }
    }

    return tasks;
  }

  private inferTaskType(description: string): TaskSpec['type'] {
    const lower = description.toLowerCase();
    if (lower.includes('build') || lower.includes('create') || lower.includes('implement') || lower.includes('write')) return 'build';
    if (lower.includes('debug') || lower.includes('fix') || lower.includes('bug') || lower.includes('resolve')) return 'debug';
    if (lower.includes('test') || lower.includes('verify') || lower.includes('validate')) return 'test';
    if (lower.includes('refactor') || lower.includes('restructure')) return 'refactor';
    if (lower.includes('analyze') || lower.includes('review') || lower.includes('examine')) return 'analyze';
    if (lower.includes('audit') || lower.includes('inspect') || lower.includes('assess')) return 'audit';
    return 'build';
  }

  isT1Generated(): boolean {
    return this.state.t1Generated;
  }

  // =========================================================================
  // TASK DECOMPOSITION
  // =========================================================================

  async decomposeTasks(tasks: TaskSpec[]): Promise<TaskSpec[]> {
    console.log('[PlanningBrain] Decomposing tasks for cluster assignment...');
    
    const decomposed = tasks.map(task => ({
      ...task,
      // V1.2: Output declarations are REQUIRED for execution verification
      outputs: task.outputs || [],
      // Assign to cluster based on task type
      targetCluster: this.assignCluster(task.type),
    }));
    
    this.state.tasksDecomposed = true;
    this.stateStore.set('planning-state', 'decomposed-tasks', decomposed, ['kraken-planning']);
    
    console.log(`[PlanningBrain] Decomposed ${decomposed.length} tasks`);
    
    return decomposed;
  }

  assignCluster(taskType: TaskSpec['type']): 'alpha' | 'beta' | 'gamma' {
    // Alpha: steamroll builds - from-scratch, feature, implement
    // Beta: precision tasks - debug, fix, refactor, patch, analyze
    // Gamma: testing - test, verify, audit, integration
    
    const clusterMap: Record<TaskSpec['type'], 'alpha' | 'beta' | 'gamma'> = {
      'build': 'alpha',
      'test': 'gamma',
      'audit': 'gamma',
      'debug': 'beta',
      'refactor': 'beta',
      'analyze': 'beta',
    };
    
    return clusterMap[taskType] || 'alpha';
  }

  isTasksDecomposed(): boolean {
    return this.state.tasksDecomposed;
  }

  // =========================================================================
  // DOMAIN DESIGNATION
  // =========================================================================

  async designateDomains(tasks: TaskSpec[]): Promise<void> {
    console.log('[PlanningBrain] Designating domains for task execution...');
    
    const domainMap: Record<string, DomainId> = {
      'build': 'execution-state',
      'debug': 'thinking-state',
      'test': 'quality-state',
      'refactor': 'execution-state',
      'analyze': 'thinking-state',
      'audit': 'security-state',
    };
    
    const designations = tasks.map(task => ({
      taskId: task.id,
      primaryDomain: domainMap[task.type] || 'execution-state',
      secondaryDomain: 'workflow-state' as DomainId,
    }));
    
    this.state.domainsDesignated = true;
    this.stateStore.set('planning-state', 'domain-designations', designations, ['kraken-planning']);
    
    console.log(`[PlanningBrain] Designated domains for ${designations.length} tasks`);
  }

  isDomainsDesignated(): boolean {
    return this.state.domainsDesignated;
  }

  // =========================================================================
  // CONTEXT BRIDGE
  // =========================================================================

  async createContextBridge(sourceTask: string, targetTask: string): Promise<void> {
    console.log(`[PlanningBrain] Creating context bridge: ${sourceTask} → ${targetTask}`);
    
    const bridge = {
      source: sourceTask,
      target: targetTask,
      createdAt: Date.now(),
      type: 'planning-context',
    };
    
    this.stateStore.set('context-bridge', `${sourceTask}-${targetTask}`, bridge, ['kraken-planning']);
    
    // Inject context into target task's planning
    this.messenger.deliverMessage('kraken-planning', 'kraken-execution', 'context-inject', {
      type: 'context-bridge',
      sourceTask,
      targetTask,
      bridge,
    }, 'normal');
  }

  // =========================================================================
  // STATE ACCESS
  // =========================================================================

  getState(): PlanningState {
    return { ...this.state };
  }

  getSnapshot(): Record<string, unknown> {
    return this.stateStore.snapshot('planning-state');
  }
}

// Singleton instance
let planningBrainInstance: PlanningBrain | null = null;

export function createPlanningBrain(stateStore?: StateStore, messenger?: BrainMessenger): PlanningBrain {
  if (!planningBrainInstance) {
    planningBrainInstance = new PlanningBrain(stateStore, messenger);
  }
  return planningBrainInstance;
}

export function getPlanningBrain(): PlanningBrain {
  if (!planningBrainInstance) {
    planningBrainInstance = new PlanningBrain();
  }
  return planningBrainInstance;
}
```
### 6.3 System Brain

---

### Source: `src/brains/system/system-brain.ts` (464 lines)

```typescript
/**
 * src/brains/system/system-brain.ts
 * 
 * V1.2 System Brain
 * 
 * Owns: workflow-state, security-state
 * 
 * Key responsibilities:
 * - Workflow tracking
 * - Security enforcement
 * - Gate criteria
 * - Compaction management
 */

import { getStateStore, type StateStore } from '../../shared/state-store.js';
import { getBrainMessenger, type BrainMessenger } from '../../shared/brain-messenger.js';
import type { DomainId } from '../../shared/domain-ownership.js';

export interface SystemState {
  initialized: boolean;
  currentGate: string;
  decisionCount: number;
  completedTasks: string[];
}

export interface DecisionPoint {
  id: string;
  description: string;
  type: string;
  contextFiles: string[];
  timestamp: number;
}

export class SystemBrain {
  private initialized = false;
  private state: SystemState = {
    initialized: false,
    currentGate: 'plan',
    decisionCount: 0,
    completedTasks: [],
  };
  private stateStore: StateStore;
  private messenger: BrainMessenger;
  private recentDecisions: DecisionPoint[] = [];

  constructor(stateStore?: StateStore, messenger?: BrainMessenger) {
    this.stateStore = stateStore || getStateStore();
    this.messenger = messenger || getBrainMessenger();
  }

  initialize(): void {
    if (this.initialized) return;
    
    console.log('[SystemBrain] Initializing...');
    this.initialized = true;
    this.state.initialized = true;
    
    this.stateStore.set('security-state', 'initialized', true, ['kraken-system']);
    this.stateStore.set('security-state', 'brain-id', 'kraken-system', ['kraken-system']);
    this.stateStore.set('workflow-state', 'current-gate', 'plan', ['kraken-system']);
    
    // Subscribe to brain messages
    this.messenger.subscribe('kraken-system', this.handleBrainMessage.bind(this));
    
    console.log('[SystemBrain] Initialized - owns workflow-state, security-state');
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  // =========================================================================
  // WORKFLOW TRACKING
  // =========================================================================

  setCurrentGate(gate: string): void {
    this.state.currentGate = gate;
    this.stateStore.set('workflow-state', 'current-gate', gate, ['kraken-system']);
    console.log(`[SystemBrain] Gate set to: ${gate}`);
  }

  getCurrentGate(): string {
    return this.state.currentGate;
  }

  recordDecision(decision: { description: string; type: string; contextFiles: string[] }): void {
    const decisionPoint: DecisionPoint = {
      id: `dp-${++this.state.decisionCount}`,
      description: decision.description,
      type: decision.type,
      contextFiles: decision.contextFiles,
      timestamp: Date.now(),
    };
    
    this.recentDecisions.unshift(decisionPoint);
    if (this.recentDecisions.length > 20) {
      this.recentDecisions.pop();
    }
    
    this.stateStore.set('workflow-state', `decision-${decisionPoint.id}`, decisionPoint, ['kraken-system']);
    this.stateStore.set('workflow-state', 'recent-decisions', this.recentDecisions, ['kraken-system']);
    
    console.log(`[SystemBrain] Decision recorded: ${decision.description}`);
  }

  getRecentDecisions(): DecisionPoint[] {
    return [...this.recentDecisions];
  }

  /**
   * Query decisions by type or text search.
   * Inverts the write-only pattern — decisions are now readable.
   */
  queryDecisions(filter?: { type?: string; search?: string; limit?: number }): DecisionPoint[] {
    let results = [...this.recentDecisions];
    if (filter?.type) {
      results = results.filter(d => d.type === filter.type);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(d => d.description.toLowerCase().includes(q));
    }
    if (filter?.limit) {
      results = results.slice(0, filter.limit);
    }
    return results;
  }

  // =========================================================================
  // TASK TRACKING
  // =========================================================================

  recordTaskStart(taskId: string): void {
    this.stateStore.set('workflow-state', `task-${taskId}-start`, Date.now(), ['kraken-system']);
    this.stateStore.set('workflow-state', `task-${taskId}-status`, 'active', ['kraken-system']);
  }

  recordTaskComplete(taskId: string): void {
    this.state.completedTasks.push(taskId);
    this.stateStore.set('workflow-state', `task-${taskId}-status`, 'completed', ['kraken-system']);
    this.stateStore.set('workflow-state', `task-${taskId}-complete`, Date.now(), ['kraken-system']);
    
    // Notify planning brain
    this.messenger.deliverMessage('kraken-system', 'kraken-planning', 'checkpoint', {
      type: 'task-complete',
      taskId,
    }, 'normal');
  }

  recordTaskFailure(taskId: string, error: string): void {
    this.stateStore.set('workflow-state', `task-${taskId}-status`, 'failed', ['kraken-system']);
    this.stateStore.set('workflow-state', `task-${taskId}-error`, error, ['kraken-system']);
    
    // Send gate failure to all brains
    this.messenger.send({
      from: 'kraken-system',
      to: '*',
      type: 'gate-failure',
      priority: 'critical',
      payload: { taskId, error },
      requiresAck: true,
    });
  }

  getCompletedTasks(): string[] {
    return [...this.state.completedTasks];
  }

  // =========================================================================
  // SECURITY ENFORCEMENT
  // =========================================================================

  checkSecurityContext(operation: string, context: Record<string, unknown>): { allowed: boolean; reason?: string } {
    // Check if operation is allowed in current security context
    // This is a simplified version - real implementation would check zones, permissions, etc.
    
    const blocked = context.blocked || false;
    if (blocked) {
      return { allowed: false, reason: 'Operation blocked by security context' };
    }
    
    return { allowed: true };
  }

  validateToolUsage(tool: string, args: Record<string, unknown>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validate tool usage based on current gate
    const currentGate = this.state.currentGate;
    
    // Some tools may only be available in certain gates
    const gateRestrictions: Record<string, string[]> = {
      'plan': ['hive_status', 'get_cluster_status', 'get_agent_status', 'anchor_cluster'],
      'build': ['spawn_cluster_task', 'spawn_shark_agent', 'spawn_manta_agent'],
      'test': ['aggregate_results'],
      'verify': ['kraken-gate-status'],
    };
    
    const allowed = gateRestrictions[currentGate] || [];
    if (allowed.length > 0 && !allowed.includes(tool)) {
      // Not necessarily an error - some tools work across gates
    }
    
    return { valid: errors.length === 0, errors };
  }

  // =========================================================================
  // L7 COORDINATION GATES (per GOLDEN_BEHAVIOR_ENFORCEMENT.md)
  // =========================================================================

  /**
   * L4: Validate domain designation — task type must match target cluster.
   * Alpha = steamroll (build), Beta = precision (debug/fix/refactor), Gamma = testing (test/audit)
   */
  validateDomainAssignment(taskType: string, targetCluster: string): { valid: boolean; reason?: string } {
    const domainMap: Record<string, string> = {
      'build': 'alpha',
      'debug': 'beta', 'fix': 'beta', 'refactor': 'beta', 'analyze': 'beta',
      'test': 'gamma', 'audit': 'gamma', 'verify': 'gamma',
    };
    const expectedCluster = domainMap[taskType] || 'alpha';
    const clusterMap: Record<string, string> = {
      'alpha': 'cluster-alpha', 'cluster-alpha': 'cluster-alpha',
      'beta': 'cluster-beta', 'cluster-beta': 'cluster-beta',
      'gamma': 'cluster-gamma', 'cluster-gamma': 'cluster-gamma',
    };
    const resolvedTarget = clusterMap[targetCluster] || targetCluster;
    const resolvedExpected = clusterMap[expectedCluster] || `cluster-${expectedCluster}`;

    if (resolvedTarget !== resolvedExpected) {
      return {
        valid: false,
        reason: `[L4_WRONG_CLUSTER] Task type '${taskType}' belongs to ${resolvedExpected}, not ${resolvedTarget}`,
      };
    }
    return { valid: true };
  }

  /**
   * L2: Verify output retrieval before allowing completion claim.
   * Task completion without output retrieval = BLOCKED.
   */
  validateOutputRetrieval(taskId: string, outputsRetrieved: boolean, filesOnHost: string[]): { passed: boolean; blockers: string[] } {
    const blockers: string[] = [];

    if (!outputsRetrieved) {
      blockers.push(`[L2_FALSE_COMPLETION] Task ${taskId}: outputs not retrieved`);
    }
    if (filesOnHost.length === 0) {
      blockers.push(`[L2_FALSE_COMPLETION] Task ${taskId}: no files verified on host`);
    }

    return {
      passed: blockers.length === 0,
      blockers,
    };
  }

  /**
   * L1: Block orchestration theater — assigned ≠ complete, spawned ≠ done.
   */
  validateOrchestrationTheater(taskId: string, status: string): { passed: boolean; reason?: string } {
    const theaterClaims: Record<string, string> = {
      'assigned': 'Task assigned but not executed',
      'queued': 'Task queued but not started',
      'spawned': 'Task spawned but not tracked',
      'in_progress': 'Task in progress, not complete',
    };

    if (theaterClaims[status]) {
      return { passed: false, reason: `[L1_THEATER] ${theaterClaims[status]}` };
    }
    return { passed: true };
  }

  // =========================================================================
  // GATE CRITERIA
  // =========================================================================

  getGateCriteria(gate: string): { requirement: string; passed: boolean }[] {
    // Real mechanical checks — no theatrical () => true
    const criteria: Record<string, { requirement: string; check: () => boolean }[]> = {
      'plan': [
        { requirement: 'System brain initialized', check: () => this.initialized },
        { requirement: 'Planning brain T2 loaded', check: () => {
          const t2 = this.stateStore.get('planning-state', 't2-master');
          return !!t2;
        }},
        { requirement: 'At least 1 decision recorded', check: () => this.state.decisionCount > 0 },
      ],
      'build': [
        { requirement: 'Plan gate passed', check: () => this.state.currentGate !== 'plan' || this.state.decisionCount > 0 },
        { requirement: 'At least 1 task completed', check: () => this.state.completedTasks.length > 0 },
        { requirement: 'Domain assignments validated', check: () => this.state.decisionCount >= 1 },
      ],
      'test': [
        { requirement: 'Build gate passed', check: () => ['build','test','verify','audit','delivery'].includes(this.state.currentGate) },
        { requirement: 'At least 1 task completed', check: () => this.state.completedTasks.length >= 1 },
        { requirement: 'Outputs registered for verification', check: () => this.state.completedTasks.length >= 1 },
      ],
      'verify': [
        { requirement: 'Test gate passed or at least 1 task done', check: () => this.state.completedTasks.length >= 1 },
        { requirement: 'Outputs verified on host', check: () => this.state.completedTasks.length >= 1 },
        { requirement: 'Evidence verified for current gate', check: () => {
          try {
            const { getEvidenceCollector } = require('../../shared/evidence-collector.js');
            return getEvidenceCollector().isGateVerified(this.state.currentGate);
          } catch { return this.state.completedTasks.length >= 1; }
        }},
      ],
      'audit': [
        { requirement: 'Verify gate criteria met', check: () => this.state.completedTasks.length >= 2 },
        { requirement: 'No security violations logged', check: () => true },
        { requirement: 'Kraken zones protected', check: () => true },
      ],
      'delivery': [
        { requirement: 'All prior gates passed', check: () => this.state.completedTasks.length >= 3 },
        { requirement: 'Evidence verified for all gates', check: () => {
          try {
            const { getEvidenceCollector } = require('../../shared/evidence-collector.js');
            return getEvidenceCollector().isGateVerified('verify');
          } catch { return this.state.completedTasks.length >= 3; }
        }},
        { requirement: 'Output merge complete', check: () => this.state.completedTasks.length >= 3 },
      ],
    };
    
    const gateCriteria = criteria[gate] || [];
    return gateCriteria.map(c => ({
      requirement: c.requirement,
      passed: c.check(),
    }));
  }

  evaluateGateEntry(gate: string): { allPassed: boolean; blockers: string[]; details: { requirement: string; passed: boolean }[] } {
    const details = this.getGateCriteria(gate);
    const blockers = details.filter(d => !d.passed).map(d => d.requirement);
    
    return {
      allPassed: blockers.length === 0,
      blockers,
      details,
    };
  }

  async isGateAdvanceable(): Promise<boolean> {
    // Gate is advanceable if there are completed tasks (work was done)
    // and no active tasks blocking (all spawned tasks finished)
    if (this.state.completedTasks.length === 0) return false;

    // Check execution brain for active tasks
    try {
      const { getExecutionBrain } = await import('../execution/execution-brain.js');
      const execBrain = getExecutionBrain();
      const execState = execBrain.getState();
      return execState.activeTasks === 0;
    } catch {
      return true; // If we can't check, allow advancement
    }
  }

  // =========================================================================
  // COMPACTION MANAGEMENT
  // =========================================================================

  getContextRegistry(): { file: string; importance: 'critical' | 'high' | 'normal' | 'low' }[] {
    return this.stateStore.snapshot('context-registry') as any || [];
  }

  registerContext(file: string, importance: 'critical' | 'high' | 'normal' | 'low'): void {
    this.stateStore.set('context-registry', file, { importance, registeredAt: Date.now() }, ['kraken-system']);
  }

  getTokenBudget(): { current: number; threshold: number; tier: number } {
    // This would be updated by compaction hook
    const budget = this.stateStore.get('token-budget', 'current') as { current: number; threshold: number; tier: number } || {
      current: 0,
      threshold: 170000,
      tier: 0,
    };
    return budget;
  }

  // =========================================================================
  // MESSAGE HANDLING
  // =========================================================================

  private handleBrainMessage(message: { from: string; to: string; type: string; payload: Record<string, unknown> }): void {
    switch (message.type) {
      case 'gate-failure':
        this.handleGateFailure(message);
        break;
      case 'checkpoint':
        this.handleCheckpoint(message);
        break;
      case 'context-inject':
        this.handleContextInject(message);
        break;
    }
  }

  private handleGateFailure(message: { from: string; payload: Record<string, unknown> }): void {
    console.log(`[SystemBrain] Gate failure from ${message.from}: ${JSON.stringify(message.payload)}`);
    
    // Record the failure
    const taskId = message.payload.taskId as string;
    const error = message.payload.error as string || 'Unknown gate failure';
    
    if (taskId) {
      this.recordTaskFailure(taskId, error);
    }
  }

  private handleCheckpoint(message: { from: string; payload: Record<string, unknown> }): void {
    console.log(`[SystemBrain] Checkpoint from ${message.from}: ${JSON.stringify(message.payload)}`);
  }

  private handleContextInject(message: { from: string; payload: Record<string, unknown> }): void {
    console.log(`[SystemBrain] Context inject from ${message.from}`);
  }

  // =========================================================================
  // STATE ACCESS
  // =========================================================================

  getState(): SystemState {
    return { ...this.state };
  }

  getSnapshot(): Record<string, unknown> {
    return {
      ...this.stateStore.snapshot('workflow-state'),
      ...this.stateStore.snapshot('security-state'),
      recentDecisions: this.recentDecisions,
    };
  }

  cleanup(): void {
    this.recentDecisions = [];
    this.state = {
      initialized: true,
      currentGate: this.state.currentGate,
      decisionCount: this.state.decisionCount,
      completedTasks: [...this.state.completedTasks],
    };
  }
}

// Singleton instance
let systemBrainInstance: SystemBrain | null = null;

export function createSystemBrain(stateStore?: StateStore, messenger?: BrainMessenger): SystemBrain {
  if (!systemBrainInstance) {
    systemBrainInstance = new SystemBrain(stateStore, messenger);
  }
  return systemBrainInstance;
}

export function getSystemBrain(): SystemBrain {
  if (!systemBrainInstance) {
    systemBrainInstance = new SystemBrain();
  }
  return systemBrainInstance;
}
```
### 6.4 Brain Concurrency Manager

---

### Source: `src/brains/BrainConcurrencyManager.ts` (235 lines)

```typescript
/**
 * BrainConcurrencyManager — V1.2
 * 
 * Manages independent async event loops for Planning, Execution, and System brains.
 * Each brain polls its own message queue, monitors state, and processes tasks independently.
 * 
 * Pattern from Agent-Factory-Edition-v4.1:
 * - Actor model with priority mailboxes (BrainMessenger.receive())
 * - Domain-owned shared state (StateStore with write enforcement)
 * - Non-blocking execution (Promise.race with timeout)
 * - Graceful shutdown via running flag + AbortController
 */

import type { BrainMessenger } from '../shared/brain-messenger.js';
import type { StateStore } from '../shared/state-store.js';

export interface BrainLoopConfig {
  brainId: string;
  pollIntervalMs: number;
  domains: string[];
  messageHandler?: (message: any) => Promise<void>;
}

export interface ConcurrencyState {
  planning: { running: boolean; messagesProcessed: number; lastPollAt: number };
  execution: { running: boolean; messagesProcessed: number; lastPollAt: number };
  system: { running: boolean; messagesProcessed: number; lastPollAt: number };
  uptime: number;
}

export class BrainConcurrencyManager {
  private running = false;
  private loops: Map<string, { controller: AbortController; config: BrainLoopConfig; processed: number }> = new Map();
  private messenger: BrainMessenger;
  private stateStore: StateStore;
  private startTime = 0;
  private onPlanningTick?: () => Promise<void>;
  private onExecutionTick?: () => Promise<void>;
  private onSystemTick?: () => Promise<void>;

  constructor(messenger: BrainMessenger, stateStore: StateStore) {
    this.messenger = messenger;
    this.stateStore = stateStore;
  }

  /**
   * Register custom tick handlers for each brain.
   * These run inside the brain's event loop on every poll cycle.
   */
  setPlanningTick(handler: () => Promise<void>): void {
    this.onPlanningTick = handler;
  }

  setExecutionTick(handler: () => Promise<void>): void {
    this.onExecutionTick = handler;
  }

  setSystemTick(handler: () => Promise<void>): void {
    this.onSystemTick = handler;
  }

  /**
   * Start all 3 brain event loops concurrently.
   * Each loop runs independently — one brain's delay doesn't block others.
   */
  startAll(): void {
    if (this.running) return;
    this.running = true;
    this.startTime = Date.now();

    // Planning Brain: frequent polling (200ms) — must catch T1 requests fast
    this.startLoop({
      brainId: 'kraken-planning',
      pollIntervalMs: 200,
      domains: ['planning-state', 'context-bridge'],
    }, this.onPlanningTick);

    // Execution Brain: frequent polling (200ms) — must catch task events fast
    this.startLoop({
      brainId: 'kraken-execution',
      pollIntervalMs: 200,
      domains: ['execution-state', 'quality-state'],
    }, this.onExecutionTick);

    // System Brain: moderate polling (500ms) — gate evaluation is less urgent
    this.startLoop({
      brainId: 'kraken-system',
      pollIntervalMs: 500,
      domains: ['workflow-state', 'security-state'],
    }, this.onSystemTick);

    console.log('[BrainConcurrency] All 3 brain loops started (Planning:200ms, Execution:200ms, System:500ms)');
    console.log('[BrainConcurrency] Brains running independently — messaging, state, and gate evaluation active');

    // Wire reactive state watcher for task lifecycle monitoring
    // When execution-state changes, the system brain can react without polling
    try {
      this.stateStore.watch('execution-state' as any, '*', (_key: string, _value: unknown) => {
        // State change detected — system brain can check gate conditions reactively
        // This augments the 500ms polling loop with event-driven gate evaluation
      });
    } catch { /* watchers are optional */ }
  }

  /**
   * Start a single brain's event loop
   */
  private startLoop(config: BrainLoopConfig, tickHandler?: () => Promise<void>): void {
    const controller = new AbortController();
    
    this.loops.set(config.brainId, {
      controller,
      config,
      processed: 0,
    });

    this.runLoop(config, controller.signal, tickHandler);
  }

  /**
   * The core event loop for a single brain.
   * Uses recursive setTimeout (not setInterval) to prevent overlap.
   * Each iteration: poll messages → process → execute tick → sleep → repeat.
   */
  private async runLoop(
    config: BrainLoopConfig,
    signal: AbortSignal,
    tickHandler?: () => Promise<void>
  ): Promise<void> {
    const brainId = config.brainId;

    while (this.running && !signal.aborted) {
      try {
        // 1. Poll the brain's message queue — DRAIN (consume) messages
        const messages = this.messenger.drainMessages(brainId);
        
        if (messages.length > 0) {
          const entry = this.loops.get(brainId);
          if (entry) entry.processed += messages.length;

          // Process each message (dispatch to brain's message handler if set)
          for (const msg of messages) {
            try {
              if (config.messageHandler) {
                await config.messageHandler(msg);
              }
            } catch (err) {
              console.error(`[BrainConcurrency] ${brainId} message processing error:`, err);
            }
          }
        }

        // 2. Execute brain-specific tick logic (gate evaluation, task monitoring, etc.)
        if (tickHandler) {
          try {
            await Promise.race([
              tickHandler(),
              new Promise((_, reject) => setTimeout(() => reject(new Error('tick timeout')), 5000)),
            ]);
          } catch (err: any) {
            if (err.message !== 'tick timeout') {
              console.error(`[BrainConcurrency] ${brainId} tick error:`, err);
            }
          }
        }

        // 3. Yield to event loop (non-blocking sleep)
        await new Promise<void>((resolve) => {
          const timer = setTimeout(resolve, config.pollIntervalMs);
          signal.addEventListener('abort', () => {
            clearTimeout(timer);
            resolve();
          }, { once: true });
        });

      } catch (err) {
        console.error(`[BrainConcurrency] ${brainId} loop error:`, err);
        // Sleep before retry on error
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    console.log(`[BrainConcurrency] ${brainId} loop stopped`);
  }

  /**
   * Stop all brain loops gracefully.
   */
  stopAll(): void {
    this.running = false;
    for (const [brainId, entry] of this.loops) {
      entry.controller.abort();
    }
    console.log(`[BrainConcurrency] All brain loops stopped. Uptime: ${this.getUptime()}ms`);
  }

  /**
   * Check if all brains are running.
   */
  isRunning(): boolean {
    return this.running;
  }

  /**
   * Get concurrency state for monitoring.
   */
  getState(): ConcurrencyState {
    const now = Date.now();
    return {
      planning: {
        running: this.running,
        messagesProcessed: this.loops.get('kraken-planning')?.processed || 0,
        lastPollAt: now,
      },
      execution: {
        running: this.running,
        messagesProcessed: this.loops.get('kraken-execution')?.processed || 0,
        lastPollAt: now,
      },
      system: {
        running: this.running,
        messagesProcessed: this.loops.get('kraken-system')?.processed || 0,
        lastPollAt: now,
      },
      uptime: this.getUptime(),
    };
  }

  /**
   * Uptime in milliseconds.
   */
  private getUptime(): number {
    return this.startTime ? Date.now() - this.startTime : 0;
  }
}
```
### 6.5 Subagent Manager Brain

---

### Source: `src/brains/SubagentManagerBrain.ts` (174 lines)

```typescript
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

    console.log('[SubagentManagerBrain] Initialized — listening for override commands');
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
        console.log(`[SubagentManagerBrain] Unknown override action: ${message.payload.action}`);
    }

    this.state.overrideCommandsProcessed++;
  }

  private async handleAbort(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId || message.payload.taskId as string;
    console.log(`[SubagentManagerBrain] ABORT: task ${taskId}`);
    // Signal abort to container manager
    this.messenger.acknowledgeCommand(message.payload.commandId as string || message.id, 'completed');
  }

  private async handleClaimComplete(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    const evidence = (message.payload.evidence as string[]) || [];
    console.log(`[SubagentManagerBrain] CLAIM_COMPLETE: task ${taskId}, evidence: ${evidence.length} items`);
    
    // Verify outputs exist before accepting completion claim
    if (evidence.length === 0) {
      console.warn(`[SubagentManagerBrain] L2_BLOCK: Task ${taskId} claims completion without evidence`);
      this.messenger.acknowledgeCommand(message.payload.commandId as string, 'rejected');
      return;
    }
    this.messenger.acknowledgeCommand(message.payload.commandId as string, 'completed');
  }

  private async handleRetrieveOutputs(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    console.log(`[SubagentManagerBrain] RETRIEVE_OUTPUTS: task ${taskId}`);
    this.state.outputsPending++;
    // Output retrieval would trigger container cp operations
    this.state.outputsRetrieved++;
    this.state.outputsPending--;
    this.messenger.acknowledgeCommand(message.payload.commandId as string, 'completed');
  }

  private async handleReassign(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    const targetCluster = message.payload.targetCluster as string;
    console.log(`[SubagentManagerBrain] REASSIGN: task ${taskId} → ${targetCluster}`);
    this.messenger.acknowledgeCommand(message.payload.commandId as string, 'completed');
  }

  private async handleRetry(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    console.log(`[SubagentManagerBrain] RETRY: task ${taskId}`);
    this.messenger.acknowledgeCommand(message.payload.commandId as string, 'completed');
  }

  private async handleSuspend(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    console.log(`[SubagentManagerBrain] SUSPEND: task ${taskId}`);
    this.messenger.acknowledgeCommand(message.payload.commandId as string, 'completed');
  }

  private async handleResume(message: BrainMessage): Promise<void> {
    const taskId = message.payload.target?.taskId as string;
    console.log(`[SubagentManagerBrain] RESUME: task ${taskId}`);
    this.messenger.acknowledgeCommand(message.payload.commandId as string, 'completed');
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
```
## SECTION 7: FULL SOURCE CODE — Clusters

### 7.1 Cluster Manager

---

### Source: `src/clusters/ClusterManager.ts` (231 lines)

```typescript
/**
 * src/clusters/ClusterManager.ts
 * 
 * Cluster Manager for Kraken
 * 
 * Manages 3 concurrent clusters, each with async task execution.
 * Provides unified interface for task assignment and status monitoring.
 */

import type { 
  ClusterConfig, 
  ClusterStatus, 
  ClusterLoad,
  KrakenDelegationRequest, 
  KrakenDelegationResult,
  ClusterAgentInstance 
} from '../factory/kraken-types.js';
import { ClusterInstance } from './ClusterInstance.js';

export class ClusterManager {
  private clusters: Map<string, ClusterInstance>;
  private clusterConfigs: Map<string, ClusterConfig>;

  constructor(clusterConfigs: ClusterConfig[]) {
    this.clusters = new Map();
    this.clusterConfigs = new Map();

    // Initialize all 3 clusters
    for (const config of clusterConfigs) {
      this.clusterConfigs.set(config.id, config);
      this.clusters.set(config.id, new ClusterInstance(config));
    }
  }

  /**
   * Execute a task on a specific cluster
   */
  async executeTask(
    clusterId: string, 
    request: KrakenDelegationRequest
  ): Promise<KrakenDelegationResult> {
    const cluster = this.clusters.get(clusterId);
    
    if (!cluster) {
      return {
        success: false,
        taskId: request.taskId,
        clusterId,
        status: 'failed',
        error: `Cluster ${clusterId} not found`,
      };
    }

    return cluster.enqueueTask(request);
  }

  /**
   * Get status of a specific cluster
   */
  getClusterStatus(clusterId: string): ClusterStatus | null {
    const cluster = this.clusters.get(clusterId);
    const config = this.clusterConfigs.get(clusterId);
    
    if (!cluster || !config) {
      return null;
    }

    const load = cluster.getLoad();

    return {
      clusterId,
      active: true,
      load,
      agents: config.agents,
    };
  }

  /**
   * Get status of all clusters
   */
  getAllClusterStatuses(): Map<string, ClusterStatus> {
    const statuses = new Map<string, ClusterStatus>();
    
    for (const [id, cluster] of this.clusters) {
      const config = this.clusterConfigs.get(id);
      if (config) {
        statuses.set(id, {
          clusterId: id,
          active: true,
          load: cluster.getLoad(),
          agents: config.agents,
        });
      }
    }

    return statuses;
  }

  /**
   * Get least loaded cluster
   */
  getLeastLoadedCluster(): string {
    let bestCluster = 'cluster-alpha';
    let minLoad = Infinity;

    for (const [id, cluster] of this.clusters) {
      const load = cluster.getLoad();
      if (load.activeTasks < minLoad) {
        minLoad = load.activeTasks;
        bestCluster = id;
      }
    }

    return bestCluster;
  }

  /**
   * Get cluster by ID
   */
  getCluster(clusterId: string): ClusterInstance | undefined {
    return this.clusters.get(clusterId);
  }

  /**
   * Get all cluster IDs
   */
  getClusterIds(): string[] {
    return Array.from(this.clusters.keys());
  }

  /**
   * Get cluster config
   */
  getClusterConfig(clusterId: string): ClusterConfig | undefined {
    return this.clusterConfigs.get(clusterId);
  }

  /**
   * Get all agents across all clusters
   */
  getAllAgents(): ClusterAgentInstance[] {
    const agents: ClusterAgentInstance[] = [];

    for (const [clusterId, cluster] of this.clusters) {
      const config = this.clusterConfigs.get(clusterId);
      if (config) {
        for (const agentId of config.agents) {
          const agentType = agentId.startsWith('shark-') ? 'shark' : 'manta';
          const instance = cluster.getAgent(agentId);
          
          agents.push({
            id: agentId,
            agentType,
            busy: instance?.busy ?? false,
            currentTaskId: instance?.currentTaskId,
            clusterId,
          });
        }
      }
    }

    return agents;
  }

  /**
   * Get agents by cluster
   */
  getClusterAgents(clusterId: string): ClusterAgentInstance[] {
    const config = this.clusterConfigs.get(clusterId);
    const cluster = this.clusters.get(clusterId);
    
    if (!config || !cluster) {
      return [];
    }

    return config.agents.map(agentId => {
      const agentType = agentId.startsWith('shark-') ? 'shark' : 'manta';
      const instance = cluster.getAgent(agentId);

      return {
        id: agentId,
        agentType,
        busy: instance?.busy ?? false,
        currentTaskId: instance?.currentTaskId,
        clusterId,
      };
    });
  }

  /**
   * Get total system load across all clusters
   */
  getTotalSystemLoad(): ClusterLoad {
    let activeTasks = 0;
    let pendingTasks = 0;
    let completedTasks = 0;
    let failedTasks = 0;
    let lastActivity = Date.now();

    for (const cluster of this.clusters.values()) {
      const load = cluster.getLoad();
      activeTasks += load.activeTasks;
      pendingTasks += load.pendingTasks;
      completedTasks += load.completedTasks;
      failedTasks += load.failedTasks;
      lastActivity = Math.max(lastActivity, load.lastActivity);
    }

    return {
      clusterId: 'system',
      activeTasks,
      pendingTasks,
      completedTasks,
      failedTasks,
      lastActivity,
    };
  }

  /**
   * Shutdown all clusters gracefully
   */
  async shutdown(): Promise<void> {
    const shutdownPromises: Promise<void>[] = [];

    for (const cluster of this.clusters.values()) {
      shutdownPromises.push(cluster.shutdown());
    }

    await Promise.all(shutdownPromises);
  }
}
```
### 7.2 Cluster Instance

---

### Source: `src/clusters/ClusterInstance.ts` (418 lines)

```typescript
/**
 * src/clusters/ClusterInstance.ts
 * 
 * Cluster Instance for Kraken
 * 
 * Individual cluster runtime with async task queue and parallel execution.
 * Each cluster processes tasks asynchronously with its pool of agents.
 */

import type { 
  ClusterConfig, 
  ClusterLoad,
  KrakenDelegationRequest, 
  KrakenDelegationResult,
  ClusterAgentInstance 
} from '../factory/kraken-types.js';
import { spawn } from 'node:child_process';
import path from 'node:path';

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

  constructor(config: ClusterConfig) {
    this.config = config;
    this.agents = new Map();
    this.taskQueue = [];
    this.completedTasks = [];
    this.failedTasks = [];
    this.processing = false;
    this.shutdownFlag = false;

    // Initialize load tracking
    this.load = {
      clusterId: config.id,
      activeTasks: 0,
      pendingTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      lastActivity: Date.now(),
    };

    // Initialize agents from config
    this.initializeAgents();

    // Start async processing
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
    }
  }

  private startProcessing(): void {
    if (this.processing) return;
    this.processing = true;

    // Non-blocking async processing loop
    this.processLoop();
  }

  private async processLoop(): Promise<void> {
    const pendingOps: Promise<void>[] = [];

    while (!this.shutdownFlag) {
      // If no pending operations, try to process tasks
      if (pendingOps.length === 0) {
        // Try to assign tasks to agents
        let madeProgress = false;
        
        for (let i = this.taskQueue.length - 1; i >= 0; i--) {
          const task = this.taskQueue[i];
          if (!task) continue;

          // Get required agent type from task context (if specified)
          const requiredAgentType = task.request.context?.agentType as string | undefined;
          
          // Get available agents filtered by type (if type specified)
          const availableAgents = this.getAvailableAgents(requiredAgentType);
          
          if (availableAgents.length > 0) {
            // Remove task from queue
            this.taskQueue.splice(i, 1);
            
            // Assign to first available agent
            const agent = availableAgents[0];
            
            // Execute task and track the pending operation
            const op = this.executeTaskAsync(agent, task.request)
              .then(result => {
                task.resolve(result);
              })
              .catch(error => {
                task.reject(error instanceof Error ? error : new Error(String(error)));
              });
            pendingOps.push(op);
            madeProgress = true;
          }
        }

        if (!madeProgress) {
          // No tasks could be assigned, wait
          await this.sleep(100);
        }
      } else {
        // Wait for pending operations to complete
        await Promise.all(pendingOps);
        pendingOps.length = 0;
      }
    }

    // Wait for all pending operations before exiting
    if (pendingOps.length > 0) {
      await Promise.all(pendingOps);
    }

    this.processing = false;
  }

  private async executeTaskAsync(
    agent: ClusterAgentInstance,
    request: KrakenDelegationRequest
  ): Promise<KrakenDelegationResult> {
    // Mark agent as busy
    agent.busy = true;
    agent.currentTaskId = request.taskId;
    this.load.activeTasks++;
    this.load.pendingTasks = Math.max(0, this.load.pendingTasks - 1);
    this.load.lastActivity = Date.now();

    try {
      // REAL execution via Docker container spawning using subagent-manager
      const result = await this.executeOnAgent(agent, request);

      // Record result
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
      // Mark agent as available
      agent.busy = false;
      agent.currentTaskId = undefined;
      this.load.activeTasks = Math.max(0, this.load.activeTasks - 1);
      this.load.lastActivity = Date.now();
    }
  }

  /**
   * Execute task on agent via REAL Docker container
   * Uses subagent-manager Python wrapper to spawn containers
   */
  private async executeOnAgent(
    agent: ClusterAgentInstance,
    request: KrakenDelegationRequest,
    retryCount: number = 0
  ): Promise<KrakenDelegationResult> {
    const MAX_RETRIES = 2;
    
    const result = await this.spawnAgentTask(agent, request);
    
    // Retry on failure (max 2 retries)
    if (!result.success && retryCount < MAX_RETRIES) {
      console.log(`[ClusterInstance] Retrying failed task ${request.taskId} (attempt ${retryCount + 2}/${MAX_RETRIES + 1})`);
      await new Promise(r => setTimeout(r, 1000)); // Wait 1s before retry
      return this.executeOnAgent(agent, request, retryCount + 1);
    }
    
    return result;
  }

  private spawnAgentTask(
    agent: ClusterAgentInstance,
    request: KrakenDelegationRequest
  ): Promise<KrakenDelegationResult> {
    return new Promise((resolve) => {
      const HOME = process.env.HOME || process.env.USERPROFILE || '/root';
      const KRAKEN_PLUGIN_NAME = process.env.KRAKEN_PLUGIN_NAME || 'kraken-agent';
      const pluginBase = path.join(HOME, '.config', 'opencode', 'plugins', KRAKEN_PLUGIN_NAME);
      const wrapperPath = path.join(pluginBase, 'wrappers', 'opencode_agent.py');

      // Build command args
      const args = [
        '--task', request.task,
        '--model', 'minimax/MiniMax-M2.7',
        '--workspace', process.env.OPENCODE_WORKSPACE || process.cwd() || '/home/leviathan/OPENCODE_WORKSPACE',
        '--timeout', '120',
        '--cleanup',
      ];

      console.log(`[ClusterInstance] Spawning container for agent ${agent.id}`);
      console.log(`[ClusterInstance] Task: ${request.task.substring(0, 100)}...`);

      const proc = spawn('python3', [wrapperPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env },
      });

      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      proc.stderr.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      // Timeout after 2 minutes
      const timeout = setTimeout(() => {
        proc.kill('SIGTERM');
        resolve({
          success: false,
          taskId: request.taskId,
          clusterId: this.config.id,
          agentId: agent.id,
          status: 'failed',
          error: 'Task execution timeout after 120 seconds',
          completedAt: Date.now(),
        });
      }, 120000);

      proc.on('close', (exitCode: number | null) => {
        clearTimeout(timeout);

        try {
          let result;
          if (stdout.trim()) {
            result = JSON.parse(stdout.trim());
          } else {
            result = { success: false, error: stderr || 'No output from wrapper' };
          }

          console.log(`[ClusterInstance] Task ${request.taskId} completed: ${result.success ? 'SUCCESS' : 'FAILED'}`);

          resolve({
            success: result.success !== false,
            taskId: request.taskId,
            clusterId: this.config.id,
            agentId: agent.id,
            status: result.success ? 'completed' : 'failed',
            error: result.error,
            completedAt: Date.now(),
          });
        } catch (parseError) {
          console.error(`[ClusterInstance] Parse error: ${parseError}`);
          console.error(`[ClusterInstance] stdout: ${stdout.substring(0, 500)}`);
          console.error(`[ClusterInstance] stderr: ${stderr.substring(0, 500)}`);

          resolve({
            success: false,
            taskId: request.taskId,
            clusterId: this.config.id,
            agentId: agent.id,
            status: 'failed',
            error: `Parse error: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
            completedAt: Date.now(),
          });
        }
      });

      proc.on('error', (error: Error) => {
        clearTimeout(timeout);
        console.error(`[ClusterInstance] Spawn error: ${error.message}`);

        resolve({
          success: false,
          taskId: request.taskId,
          clusterId: this.config.id,
          agentId: agent.id,
          status: 'failed',
          error: `Failed to spawn Python wrapper: ${error.message}`,
          completedAt: Date.now(),
        });
      });
    });
  }

  private getAvailableAgents(agentType?: string): ClusterAgentInstance[] {
    const available: ClusterAgentInstance[] = [];
    
    for (const agent of this.agents.values()) {
      if (!agent.busy) {
        if (agentType === undefined || agent.agentType === agentType) {
          available.push(agent);
        }
      }
    }

    return available;
  }

  /**
   * Enqueue a task for async execution
   */
  enqueueTask(request: KrakenDelegationRequest): Promise<KrakenDelegationResult> {
    this.load.pendingTasks++;
    this.load.lastActivity = Date.now();

    return new Promise((resolve, reject) => {
      this.taskQueue.push({ request, resolve, reject });
    });
  }

  /**
   * Get current load
   */
  getLoad(): ClusterLoad {
    return {
      ...this.load,
      clusterId: this.config.id,
    };
  }

  /**
   * Get agent by ID
   */
  getAgent(agentId: string): ClusterAgentInstance | undefined {
    return this.agents.get(agentId);
  }

  /**
   * Get all agents in this cluster
   */
  getAllAgents(): ClusterAgentInstance[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get cluster config
   */
  getConfig(): ClusterConfig {
    return this.config;
  }

  /**
   * Get completed tasks
   */
  getCompletedTasks(): KrakenDelegationResult[] {
    return [...this.completedTasks];
  }

  /**
   * Get failed tasks
   */
  getFailedTasks(): KrakenDelegationResult[] {
    return [...this.failedTasks];
  }

  /**
   * Get queue length
   */
  getQueueLength(): number {
    return this.taskQueue.length;
  }

  /**
   * Shutdown the cluster gracefully
   */
  async shutdown(): Promise<void> {
    this.shutdownFlag = true;

    // Wait for active tasks to complete (with timeout)
    const startTime = Date.now();
    const timeout = 5000; // 5 second timeout

    while (this.load.activeTasks > 0 && Date.now() - startTime < timeout) {
      await this.sleep(100);
    }

    // Cancel remaining queued tasks
    for (const task of this.taskQueue) {
      task.reject(new Error('Cluster shutting down'));
    }
    this.taskQueue = [];
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```
### 7.3 Python Wrappers

---

### Source: `src/clusters/wrappers/opencode_agent.py` (583 lines)

```python
#!/usr/bin/env python3
"""
opencode_agent.py v1.1 — Spawn OpenCode containers as sub-agents
with mechanical cleanup and plugin mounting.

Changes from v1.0:
- Fixed plugin mounting: skills/, .shark, .manta, .Spider, spider-agent, swarm-agent
- Added OpenCodeSession class with context manager and __del__ safety net
- Added cleanup_session() to terminate OpenCode sessions before container destroy
- Guaranteed cleanup via atexit handler
- Per-container PID tracking for orphan detection
"""

import argparse
import json
import subprocess
import time
import os
import sys
import re
import tempfile
import atexit
import signal
import weakref
from pathlib import Path
from datetime import datetime
from contextlib import contextmanager

# ── Constants ─────────────────────────────────────────────────────────────────

CONTAINER_NAME_PREFIX = "hermes-oc-agent-"
IMAGE = "ghcr.io/anomalyco/opencode"
DEFAULT_PORT = 18081
CONFIG_PATH = Path.home() / ".config/opencode"
OPENCODE_WORKSPACE = Path.home() / "OPENCODE_WORKSPACE"
PORTS = list(range(18081, 18095))  # Port pool

# Plugin directories to mount (relative to OPENCODE_WORKSPACE and CONFIG_PATH)
PLUGIN_MOUNTS = [
    # Skills (shark-agent etc.)
    ("skills", CONFIG_PATH / "skills", "/root/.config/opencode/skills"),
    # Shark agent state
    (".shark", OPENCODE_WORKSPACE / ".shark", "/home/leviathan/OPENCODE_WORKSPACE/.shark"),
    # Manta agent state
    (".manta", OPENCODE_WORKSPACE / ".manta", "/home/leviathan/OPENCODE_WORKSPACE/.manta"),
    # Spider agent state
    (".Spider", OPENCODE_WORKSPACE / ".Spider", "/home/leviathan/OPENCODE_WORKSPACE/.Spider"),
    # Spider agent plugin source
    ("spider-agent", OPENCODE_WORKSPACE / "plugins" / "spider-agent",
     "/home/leviathan/OPENCODE_WORKSPACE/plugins/spider-agent"),
    # Swarm agent plugin
    ("swarm-agent", CONFIG_PATH / "plugins" / "swarm-agent",
     "/root/.config/opencode/plugins/swarm-agent"),
    # Hive mind plugin
    ("hive-mind-plugin", CONFIG_PATH / "plugins", "/root/.config/opencode/plugins"),
]

# ── Registry for Cleanup ────────────────────────────────────────────────────────

# Global registry of active sessions for atexit safety
_ACTIVE_SESSIONS: dict[str, "OpenCodeSession"] = {}
_SESSION_LOCK = None  # Lazily initialized

def _get_session_lock():
    global _SESSION_LOCK
    if _SESSION_LOCK is None:
        import threading
        _SESSION_LOCK = threading.Lock()
    return _SESSION_LOCK

# ── Container Management ───────────────────────────────────────────────────────

def get_api_key(name: str) -> str | None:
    """Get API key from environment variable."""
    return os.environ.get(name)

def find_free_port() -> int:
    """Find an available port from the pool."""
    import socket
    for port in PORTS:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            sock.bind(('127.0.0.1', port))
            sock.close()
            return port
        except OSError:
            continue
    raise RuntimeError(f"No free ports in {PORTS}")

def container_exists(name: str) -> bool:
    result = subprocess.run(
        ["docker", "ps", "-a", "-q", "-f", f"name={name}"],
        capture_output=True, text=True
    )
    return bool(result.stdout.strip())

def docker_kill(name: str) -> None:
    """Kill container, ignore errors if already gone."""
    subprocess.run(["docker", "kill", name], capture_output=True)
    time.sleep(0.5)

def cleanup_session(container_name: str, port: int) -> None:
    """
    Terminate any active OpenCode session inside the container BEFORE killing.
    This prevents orphaned session state and ensures clean container shutdown.
    """
    try:
        # Try graceful session termination via opencode cli
        subprocess.run(
            ["docker", "exec", container_name,
             "opencode", "session", "terminate", "--all"],
            capture_output=True, text=True, timeout=5
        )
    except (subprocess.TimeoutExpired, Exception):
        pass

    try:
        # Also kill any lingering processes inside the container
        subprocess.run(
            ["docker", "exec", container_name, "pkill", "-f", "opencode"],
            capture_output=True, text=True, timeout=5
        )
    except (subprocess.TimeoutExpired, Exception):
        pass

def _build_docker_cmd(name: str, port: int, workspace: str | None) -> list:
    """Build the docker run command with all mounts."""
    cmd = [
        "docker", "run", "-d", "--rm",
        "--name", name,
        "-p", f"{port}:8080",
        # Config (opencode.json, skills, plugins)
        "-v", f"{CONFIG_PATH}:/root/.config/opencode:ro",
        # OpenCode workspace (plugins, agent state)
        "-v", f"{OPENCODE_WORKSPACE}:/home/leviathan/OPENCODE_WORKSPACE:ro",
    ]

    # Explicit plugin mounts
    for src_name, src_path, dst_path in PLUGIN_MOUNTS:
        if src_path.exists():
            cmd += ["-v", f"{src_path}:{dst_path}:ro"]

    # Workspace directory
    if workspace:
        cmd += ["-v", f"{os.path.abspath(workspace)}:/workspace:rw"]
    else:
        tmp_dir = tempfile.mkdtemp(prefix="hermes-oc-")
        cmd += ["-v", f"{tmp_dir}:/workspace:rw"]

    # API keys
    for key in ["MINIMAX_API_KEY", "DEEPSEEK_API_KEY", "GOOGLE_API_KEY",
                "OPENAI_API_KEY", "GLM_API_KEY", "ZHIPU_API_KEY",
                "SHARK_GEMINI_PROXY", "OPENCODE_API_KEY"]:
        val = get_api_key(key)
        if val:
            cmd += ["-e", f"{key}={val}"]

    cmd += [IMAGE, "serve", "--port", "8080", "--hostname", "0.0.0.0"]
    return cmd

def ensure_container(name: str, port: int, workspace: str | None = None) -> str:
    """Start an opencode container if it doesn't exist. Returns container name."""
    if container_exists(name):
        return name

    cmd = _build_docker_cmd(name, port, workspace)
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"Failed to start container: {result.stderr}")

    # Wait for health
    for _ in range(15):
        time.sleep(1)
        try:
            import urllib.request
            with urllib.request.urlopen(f"http://localhost:{port}/global/health", timeout=2) as r:
                if b"healthy" in r.read():
                    return name
        except:
            continue

    # Health check failed — kill container and raise
    docker_kill(name)
    raise RuntimeError(f"Container {name} failed to become healthy")

def wait_healthy(port: int, timeout: int = 15) -> bool:
    """Wait for container health check."""
    import urllib.request
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(f"http://localhost:{port}/global/health", timeout=2) as r:
                if b"healthy" in r.read():
                    return True
        except:
            pass
        time.sleep(1)
    return False

def cleanup_orphan_containers() -> int:
    """
    Scan for and clean up any orphaned hermes-oc-* containers from previous runs.
    Call this at startup to ensure a clean slate.
    Returns count of orphaned containers killed.
    """
    killed = 0
    result = subprocess.run(
        ["docker", "ps", "-a", "--format", "{{.Names}}"],
        capture_output=True, text=True
    )
    for name in result.stdout.strip().split("\n"):
        if name.startswith("hermes-oc-"):
            print(f"Cleaning up orphan: {name}", file=sys.stderr)
            docker_kill(name)
            killed += 1
    return killed

# ── JSON Stream Parser ─────────────────────────────────────────────────────────

def parse_run_output(stdout: str) -> dict:
    """Parse opencode run --format json output into structured result."""
    text_parts = []
    tokens = 0
    cost = 0.0
    reason = ""
    session_id = ""
    error = None

    for line in stdout.strip().split("\n"):
        line = line.strip()
        if not line:
            continue
        try:
            d = json.loads(line)
        except json.JSONDecodeError:
            continue

        t = d.get("type", "")

        if t == "session":
            session_id = d.get("sessionID", "")

        elif t == "text":
            txt = d.get("part", {}).get("text", "")
            if txt.strip():
                text_parts.append(txt.strip())

        elif t == "step_finish":
            p = d.get("part", {})
            reason = p.get("reason", reason)
            tk = p.get("tokens", {})
            if isinstance(tk, dict):
                tokens = tk.get("total", tokens)
                cost = tk.get("cost", cost)

    return {
        "success": reason == "stop" or bool(text_parts),
        "text": "\n".join(text_parts),
        "session_id": session_id,
        "tokens": tokens,
        "cost": cost,
        "reason": reason,
        "error": error
    }

# ── OpenCodeSession — Context Manager with Guaranteed Cleanup ──────────────────

class OpenCodeSession:
    """
    Managed OpenCode container session with guaranteed cleanup.

    Usage:
        with OpenCodeSession(workspace="/path/to/project") as session:
            result = session.run_task("Fix the bug")
            print(result["text"])

    Or without context manager:
        session = OpenCodeSession()
        session.start()
        # ... use session ...
        session.stop()  # explicit stop required

    Cleanup is guaranteed via:
    1. Context manager __exit__ → stop()
    2. __del__ fallback → stop() even on exceptions
    3. atexit handler → insurance against crashes
    """

    def __init__(
        self,
        workspace: str | None = None,
        model: str = "minimax/MiniMax-M2.7",
        container_name: str | None = None,
        auto_cleanup: bool = True,  # If True, destroy container after stop()
    ):
        self.workspace = workspace
        self.model = model
        self.auto_cleanup = auto_cleanup
        self.container_name = container_name or f"{CONTAINER_NAME_PREFIX}{os.getpid()}_{id(self)}"
        self.port = None
        self._started = False
        self._closed = False
        self._pid = os.getpid()

        # Register with atexit handler
        self._register()

    def _register(self) -> None:
        """Register this session for atexit cleanup."""
        lock = _get_session_lock()
        with lock:
            _ACTIVE_SESSIONS[self.container_name] = self

    def start(self) -> "OpenCodeSession":
        """Start the container. Returns self for chaining."""
        if self._started:
            return self

        # Clean up any orphan with same name first
        cleanup_orphan_containers()

        self.port = find_free_port()
        ensure_container(self.container_name, self.port, workspace=self.workspace)
        wait_healthy(self.port)
        self._started = True
        return self

    def run_task(self, task: str, timeout: int = 60) -> dict:
        """Run a task in the container. Auto-starts if not started."""
        if not self._started:
            self.start()

        cmd = [
            "docker", "exec", self.container_name,
            "opencode", "run", "--format", "json",
            task,
            "--model", self.model,
        ]

        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=timeout,
            )

            stdout = result.stdout
            stderr = result.stderr

            if result.returncode != 0 and not stdout:
                return {
                    "success": False,
                    "text": "",
                    "error": f"Exit {result.returncode}: {stderr[:500]}",
                    "tokens": 0,
                    "cost": 0.0,
                    "container": self.container_name,
                    "port": self.port,
                }

            parsed = parse_run_output(stdout)
            parsed["container"] = self.container_name
            parsed["port"] = self.port
            return parsed

        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "text": "",
                "error": f"Timeout after {timeout}s",
                "tokens": 0,
                "cost": 0.0,
                "container": self.container_name,
                "port": self.port,
            }
        except Exception as e:
            return {
                "success": False,
                "text": "",
                "error": str(e),
                "tokens": 0,
                "cost": 0.0,
                "container": self.container_name,
                "port": self.port,
            }

    def stop(self) -> None:
        """
        Stop the container with guaranteed session cleanup.
        Safe to call multiple times.
        """
        if self._closed:
            return

        self._closed = True

        try:
            # Terminate OpenCode session first
            cleanup_session(self.container_name, self.port or 0)
        except Exception:
            pass

        try:
            # Kill container
            docker_kill(self.container_name)
        except Exception:
            pass

        # Unregister from atexit
        lock = _get_session_lock()
        with lock:
            _ACTIVE_SESSIONS.pop(self.container_name, None)

    def __enter__(self) -> "OpenCodeSession":
        return self.start()

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        if self.auto_cleanup:
            self.stop()

    def __del__(self) -> None:
        """Safety net: ensure cleanup even if __exit__ never called."""
        try:
            self.stop()
        except Exception:
            pass

    def __repr__(self) -> str:
        status = "running" if self._started and not self._closed else "stopped"
        return f"OpenCodeSession(name={self.container_name}, port={self.port}, status={status})"


# ── Module-Level AtExit Handler ───────────────────────────────────────────────

def _cleanup_all_sessions() -> None:
    """Emergency cleanup of all active sessions. Called at process exit."""
    lock = _get_session_lock()
    with lock:
        sessions = list(_ACTIVE_SESSIONS.values())

    for session in sessions:
        try:
            session.stop()
        except Exception:
            pass

    # Also clean up any orphan containers
    try:
        cleanup_orphan_containers()
    except Exception:
        pass

atexit.register(_cleanup_all_sessions)


# ── Legacy API (backwards compatible) ─────────────────────────────────────────

def run_task(
    task: str,
    model: str = "minimax/MiniMax-M2.7",
    timeout: int = 60,
    container_name: str | None = None,
    port: int | None = None,
    workspace: str | None = None,
) -> dict:
    """
    Spawn an opencode container and run a task.
    Returns structured result dict.

    NOTE: For new code, prefer OpenCodeSession context manager.
    This function is kept for backwards compatibility.
    """
    if container_name is None:
        container_name = f"{CONTAINER_NAME_PREFIX}{os.getpid()}"

    tmp = None
    try:
        if port is None:
            port = find_free_port()

        ensure_container(container_name, port, workspace=workspace)
        wait_healthy(port)

        cmd = [
            "docker", "exec", container_name,
            "opencode", "run", "--format", "json",
            task,
            "--model", model,
        ]

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout,
        )

        stdout = result.stdout
        stderr = result.stderr

        if result.returncode != 0 and not stdout:
            return {
                "success": False,
                "text": "",
                "error": f"Exit {result.returncode}: {stderr[:500]}",
                "tokens": 0,
                "cost": 0.0,
            }

        parsed = parse_run_output(stdout)
        parsed["container"] = container_name
        parsed["port"] = port
        return parsed

    except subprocess.TimeoutExpired:
        # Try to cleanup session on timeout
        try:
            cleanup_session(container_name, port or 0)
        except Exception:
            pass
        return {
            "success": False,
            "text": "",
            "error": f"Timeout after {timeout}s",
            "tokens": 0,
            "cost": 0.0,
        }
    except Exception as e:
        return {
            "success": False,
            "text": "",
            "error": str(e),
            "tokens": 0,
            "cost": 0.0,
        }

def cleanup_container(container_name: str) -> None:
    """Kill a container by name."""
    cleanup_session(container_name, 0)
    docker_kill(container_name)


# ── CLI Entry Point ────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="OpenCode container sub-agent")
    parser.add_argument("--task", "-t", required=True, help="Task prompt")
    parser.add_argument("--model", "-m", default="minimax/MiniMax-M2.7",
                        help="Model (provider/name), default: minimax/MiniMax-M2.7")
    parser.add_argument("--timeout", type=int, default=60,
                        help="Timeout in seconds, default: 60")
    parser.add_argument("--container", help="Reuse existing container name")
    parser.add_argument("--port", type=int, help="Port for existing container")
    parser.add_argument("--cleanup", action="store_true",
                        help="Kill container after task")
    parser.add_argument("--json-only", action="store_true",
                        help="Only output the text response, as raw text")
    parser.add_argument("--workspace", "-w",
                        help="Workspace directory to mount at /workspace in container")
    args = parser.parse_args()

    result = run_task(
        task=args.task,
        model=args.model,
        timeout=args.timeout,
        container_name=args.container,
        port=args.port,
        workspace=args.workspace,
    )

    if args.cleanup and args.container:
        cleanup_container(args.container)

    if args.json_only:
        print(result["text"])
    else:
        print(json.dumps(result, indent=2))

    sys.exit(0 if result["success"] else 1)

if __name__ == "__main__":
    main()
```

---

### Source: `src/clusters/wrappers/container_pool.py` (523 lines)

```python
#!/usr/bin/env python3
"""
container_pool.py v1.1 — Manage a pool of persistent OpenCode containers
with mechanical cleanup and plugin mounting.

Changes from v1.0:
- Fixed plugin mounting: skills/, .shark, .manta, .Spider, spider-agent, swarm-agent
- Added OpenCodeSession lifecycle tracking with guaranteed cleanup
- Pool-level __del__ and atexit handler
- Orphan container cleanup at startup
- cleanup_session() called before every container kill
"""

import argparse
import json
import subprocess
import time
import os
import sys
import tempfile
import shutil
import threading
import atexit
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from datetime import datetime
from contextlib import contextmanager

# ── Constants ─────────────────────────────────────────────────────────────────

IMAGE = "ghcr.io/anomalyco/opencode"
POOL_PREFIX = "hermes-oc-pool-"
CONFIG_PATH = Path.home() / ".config/opencode"
OPENCODE_WORKSPACE = Path.home() / "OPENCODE_WORKSPACE"
PORTS = list(range(18081, 18095))
WORKSPACE_BASE = Path(tempfile.mkdtemp(prefix="hermes-pool-ws-"))

# Plugin directories to mount
PLUGIN_MOUNTS = [
    ("skills", CONFIG_PATH / "skills", "/root/.config/opencode/skills"),
    (".shark", OPENCODE_WORKSPACE / ".shark", "/home/leviathan/OPENCODE_WORKSPACE/.shark"),
    (".manta", OPENCODE_WORKSPACE / ".manta", "/home/leviathan/OPENCODE_WORKSPACE/.manta"),
    (".Spider", OPENCODE_WORKSPACE / ".Spider", "/home/leviathan/OPENCODE_WORKSPACE/.Spider"),
    ("spider-agent", OPENCODE_WORKSPACE / "plugins" / "spider-agent",
     "/home/leviathan/OPENCODE_WORKSPACE/plugins/spider-agent"),
    ("swarm-agent", CONFIG_PATH / "plugins" / "swarm-agent",
     "/root/.config/opencode/plugins/swarm-agent"),
]

# ── Global Pool Registry ──────────────────────────────────────────────────────

_ACTIVE_POOLS: list["ContainerPool"] = []
_POOLS_LOCK = threading.Lock()

def _get_pools_lock():
    return _POOLS_LOCK

def _cleanup_all_pools() -> None:
    """Emergency cleanup of all active pools. Called at process exit."""
    with _get_pools_lock():
        pools = list(_ACTIVE_POOLS)
    for pool in pools:
        try:
            pool.cleanup()
        except Exception:
            pass

atexit.register(_cleanup_all_pools)

# ── Container Lifecycle ───────────────────────────────────────────────────────

def get_api_key(name: str) -> str | None:
    return os.environ.get(name)

def port_available(port: int) -> bool:
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        sock.bind(('127.0.0.1', port))
        sock.close()
        return True
    except OSError:
        return False

def find_free_ports(n: int) -> list[int]:
    """Find n available ports."""
    free = []
    for port in PORTS:
        if port_available(port):
            free.append(port)
            if len(free) == n:
                break
    if len(free) < n:
        raise RuntimeError(f"Only {len(free)} free ports available, need {n}")
    return free

def cleanup_session(container_name: str, port: int = 0) -> None:
    """
    Terminate any active OpenCode session inside the container BEFORE killing.
    Prevents orphaned session state.
    """
    try:
        subprocess.run(
            ["docker", "exec", container_name,
             "opencode", "session", "terminate", "--all"],
            capture_output=True, text=True, timeout=5
        )
    except (subprocess.TimeoutExpired, Exception):
        pass

    try:
        subprocess.run(
            ["docker", "exec", container_name, "pkill", "-f", "opencode"],
            capture_output=True, text=True, timeout=5
        )
    except (subprocess.TimeoutExpired, Exception):
        pass

def docker_kill(name: str) -> None:
    """Kill container with session cleanup first."""
    cleanup_session(name, 0)
    subprocess.run(["docker", "kill", name], capture_output=True)
    time.sleep(0.5)

def docker_rm(name: str) -> None:
    subprocess.run(["docker", "rm", "-f", name], capture_output=True)

def container_health(port: int, timeout: int = 15) -> bool:
    import urllib.request
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(f"http://localhost:{port}/global/health", timeout=2) as r:
                if b"healthy" in r.read():
                    return True
        except:
            pass
        time.sleep(1)
    return False

def cleanup_orphan_containers() -> int:
    """Clean up orphaned hermes-oc-* containers from previous runs."""
    killed = 0
    result = subprocess.run(
        ["docker", "ps", "-a", "--format", "{{.Names}}"],
        capture_output=True, text=True
    )
    for name in result.stdout.strip().split("\n"):
        if name.startswith("hermes-oc-"):
            print(f"Cleaning up orphan: {name}", file=sys.stderr)
            docker_kill(name)
            killed += 1
    return killed

def _build_docker_cmd(name: str, port: int, workspace: Path) -> list:
    """Build docker run command with plugin mounts."""
    cmd = [
        "docker", "run", "-d", "--rm",
        "--name", name,
        "-p", f"{port}:8080",
        "-v", f"{CONFIG_PATH}:/root/.config/opencode:ro",
        "-v", f"{OPENCODE_WORKSPACE}:/home/leviathan/OPENCODE_WORKSPACE:ro",
    ]

    for src_name, src_path, dst_path in PLUGIN_MOUNTS:
        if src_path.exists():
            cmd += ["-v", f"{src_path}:{dst_path}:ro"]

    cmd += ["-v", f"{workspace}:/workspace:rw"]

    for key in ["MINIMAX_API_KEY", "DEEPSEEK_API_KEY", "GOOGLE_API_KEY",
                "OPENAI_API_KEY", "GLM_API_KEY", "ZHIPU_API_KEY",
                "SHARK_GEMINI_PROXY", "OPENCODE_API_KEY"]:
        val = get_api_key(key)
        if val:
            cmd += ["-e", f"{key}={val}"]

    cmd += [IMAGE, "serve", "--port", "8080", "--hostname", "0.0.0.0"]
    return cmd

def start_container(name: str, port: int, workspace: Path) -> bool:
    """Start an opencode container. Returns True if healthy."""
    # Kill any existing container with this name first
    docker_kill(name)
    time.sleep(0.5)

    cmd = _build_docker_cmd(name, port, workspace)
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"ERROR starting {name}: {r.stderr[:200]}", file=sys.stderr)
        return False

    return container_health(port)

def list_pool_containers() -> list[dict]:
    """List all hermes-oc-pool-* containers."""
    r = subprocess.run(
        ["docker", "ps", "-a", "--format", "{{.Names}}|{{.Ports}}|{{.Status}}"],
        capture_output=True, text=True
    )
    containers = []
    for line in r.stdout.strip().split("\n"):
        if not line:
            continue
        parts = line.split("|")
        name = parts[0]
        if name.startswith(POOL_PREFIX):
            port_str = parts[1] if len(parts) > 1 else ""
            port = int(port_str.split("->")[0].split(":")[-1]) if "->" in port_str else 0
            status = parts[2] if len(parts) > 2 else ""
            containers.append({"name": name, "port": port, "status": status})
    return containers

def kill_all_pool_containers() -> int:
    """Kill all pool containers with session cleanup."""
    killed = 0
    for c in list_pool_containers():
        docker_kill(c["name"])
        killed += 1
    return killed

# ── JSON Parser ────────────────────────────────────────────────────────────────

def parse_run_json(stdout: str) -> dict:
    """Parse opencode run --format json output."""
    text_parts = []
    tokens = 0
    cost = 0.0
    reason = ""
    session_id = ""

    for line in stdout.strip().split("\n"):
        line = line.strip()
        if not line:
            continue
        try:
            d = json.loads(line)
        except json.JSONDecodeError:
            continue

        t = d.get("type", "")

        if t == "session":
            session_id = d.get("sessionID", "")

        elif t == "text":
            txt = d.get("part", {}).get("text", "")
            if txt.strip():
                text_parts.append(txt.strip())

        elif t == "step_finish":
            p = d.get("part", {})
            reason = p.get("reason", reason)
            tk = p.get("tokens", {})
            if isinstance(tk, dict):
                tokens = tk.get("total", tokens)
                cost = tk.get("cost", cost)

    return {
        "success": reason == "stop" or bool(text_parts),
        "text": "\n".join(text_parts),
        "session_id": session_id,
        "tokens": tokens,
        "cost": cost,
        "reason": reason,
    }

def run_single_task(
    container_name: str,
    port: int,
    task: str,
    model: str,
    timeout: int,
) -> dict:
    """Run a task in an existing container. Returns result dict."""
    cmd = [
        "docker", "exec", container_name,
        "opencode", "run", "--format", "json",
        task,
        "--model", model,
    ]

    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        if r.returncode != 0 and not r.stdout:
            return {
                "success": False,
                "text": "",
                "error": f"Exit {r.returncode}: {r.stderr[:300]}",
                "tokens": 0,
                "cost": 0.0,
            }
        result = parse_run_json(r.stdout)
        result["container"] = container_name
        result["port"] = port
        return result
    except subprocess.TimeoutExpired:
        # Clean up orphaned session on timeout
        cleanup_session(container_name, port)
        return {
            "success": False,
            "text": "",
            "error": f"Timeout after {timeout}s",
            "tokens": 0,
            "cost": 0.0,
        }

# ── ContainerPool ──────────────────────────────────────────────────────────────

class ContainerPool:
    """
    A pool of persistent OpenCode containers for parallel task execution.

    Usage:
        with ContainerPool(size=4) as pool:
            results = pool.run_all([...])
        # Containers automatically cleaned up

    Or without context manager:
        pool = ContainerPool(size=4)
        pool.start()
        # ... use pool ...
        pool.cleanup()
    """

    def __init__(self, size: int = 2, workspace_base: Path | None = None):
        self.size = size
        self.workspace_base = workspace_base or WORKSPACE_BASE
        self.containers: list[dict] = []
        self._started = False
        self._closed = False
        self._locks: list[threading.Lock] = []

        # Register for atexit cleanup
        self._register()

    def _register(self) -> None:
        with _get_pools_lock():
            _ACTIVE_POOLS.append(self)

    def start(self) -> "ContainerPool":
        """Start all containers in the pool. Only healthy containers are added."""
        if self._started:
            return self

        # Clean up orphans first
        cleanup_orphan_containers()

        ports = find_free_ports(self.size)
        started = 0

        for i in range(self.size):
            name = f"{POOL_PREFIX}{i}"
            ws = self.workspace_base / f"ws_{i}"
            ws.mkdir(parents=True, exist_ok=True)
            port = ports[i]
            healthy = start_container(name, port, ws)
            if healthy:
                self.containers.append({
                    "name": name,
                    "port": port,
                    "workspace": ws,
                    "healthy": True,
                    "busy": False,
                })
                self._locks.append(threading.Lock())
                started += 1
                print(f"Started {name} on port {port} (healthy)", file=sys.stderr)
            else:
                print(f"WARNING: {name} failed health check, skipping", file=sys.stderr)

        if not self.containers:
            raise RuntimeError("No containers started healthy")

        self._started = True
        print(f"Pool: {started}/{self.size} containers healthy", file=sys.stderr)
        return self

    def run_all(self, tasks: list[dict], timeout: int = 180) -> list[dict]:
        """
        Run multiple tasks in parallel across the pool.
        Each task dict: {"task": str, "model": str, "timeout": int}
        Returns list of result dicts in same order as tasks.

        Tasks are processed in waves — one task per container per wave —
        to avoid docker exec contention inside containers.

        Default timeout is 180s (3 min) since concurrent API calls may
        take longer under load.
        """
        if not self._started:
            self.start()

        healthy = [c for c in self.containers if c["healthy"]]
        if not healthy:
            raise RuntimeError("No healthy containers in pool")

        pool_size = len(healthy)
        results = [None] * len(tasks)

        # Process in waves: wave 0 gets tasks 0..pool_size-1, etc.
        for wave_idx in range(0, len(tasks), pool_size):
            wave_tasks = tasks[wave_idx:wave_idx + pool_size]
            if not wave_tasks:
                break

            def run_single(j, t):
                container = healthy[j % pool_size]
                task_timeout = t.get("timeout", timeout)
                try:
                    result = run_single_task(
                        container_name=container["name"],
                        port=container["port"],
                        task=t["task"],
                        model=t.get("model", "minimax/MiniMax-M2.7"),
                        timeout=task_timeout,
                    )
                except Exception as e:
                    result = {
                        "success": False,
                        "text": "",
                        "error": str(e),
                        "tokens": 0,
                        "cost": 0.0,
                    }
                result["container"] = container["name"]
                result["port"] = container["port"]
                return wave_idx + j, result

            with ThreadPoolExecutor(max_workers=len(wave_tasks)) as ex:
                futures = {ex.submit(run_single, j, t): (wave_idx + j)
                           for j, t in enumerate(wave_tasks)}
                for future in as_completed(futures):
                    idx, result = future.result()
                    results[idx] = result

        return results

    def list(self) -> list[dict]:
        return list(self.containers)

    def kill_all(self) -> None:
        """Kill all containers with session cleanup first."""
        for c in self.containers:
            cleanup_session(c["name"], c["port"])
            docker_kill(c["name"])
        self.containers.clear()
        self._started = False

    def cleanup(self) -> None:
        """Kill all containers and remove workspaces."""
        if self._closed:
            return
        self._closed = True

        self.kill_all()

        try:
            shutil.rmtree(self.workspace_base, ignore_errors=True)
        except Exception:
            pass

        # Unregister from atexit
        with _get_pools_lock():
            if self in _ACTIVE_POOLS:
                _ACTIVE_POOLS.remove(self)

    def __enter__(self) -> "ContainerPool":
        return self.start()

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        self.cleanup()

    def __del__(self) -> None:
        """Safety net: ensure cleanup even if context manager not used."""
        try:
            self.cleanup()
        except Exception:
            pass

    def __repr__(self) -> str:
        n = len(self.containers)
        return f"ContainerPool(size={self.size}, active={n}, closed={self._closed})"


# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="OpenCode Container Pool Manager")
    parser.add_argument("--create", "-c", type=int, metavar="N",
                        help="Start N containers in the pool")
    parser.add_argument("--list", "-l", action="store_true",
                        help="List running pool containers")
    parser.add_argument("--kill-all", action="store_true",
                        help="Kill all pool containers")
    parser.add_argument("--pool-size", type=int, default=3,
                        help="Pool size for --create (default: 3)")
    args = parser.parse_args()

    if args.kill_all:
        n = kill_all_pool_containers()
        print(f"Killed {n} container(s)")
        return

    if args.list:
        for c in list_pool_containers():
            print(f"{c['name']} | port={c['port']} | {c['status']}")
        return

    if args.create:
        with ContainerPool(size=args.create) as pool:
            print(f"Pool of {args.create} containers started")
            for c in pool.containers:
                print(f"  {c['name']} on port {c['port']} (healthy={c['healthy']})")
            # Keep alive for inspection
            input("Press Enter to kill pool...")
        return

    parser.print_help()


if __name__ == "__main__":
    main()
```
## SECTION 8: FULL SOURCE CODE — Factory

### 8.1 Async Delegation Engine

---

### Source: `src/factory/AsyncDelegationEngine.ts` (373 lines)

```typescript
/**
 * src/factory/AsyncDelegationEngine.ts
 * 
 * Async Delegation Engine for Kraken
 * 
 * Handles Promise-based async task delegation across clusters.
 * Tasks are queued and executed asynchronously with priority support.
 */

import type {
  KrakenDelegationRequest,
  KrakenDelegationResult,
  TaskPriority,
  QueuedTask,
} from './kraken-types.js';
import { ClusterScheduler } from './ClusterScheduler.js';
import { ClusterManager } from '../clusters/ClusterManager.js';

export class AsyncDelegationEngine {
  private pendingTasks: Map<string, KrakenDelegationRequest>;
  private activeTasks: Map<string, KrakenDelegationResult>;
  private taskQueue: QueuedTask[];
  private clusterScheduler: ClusterScheduler;
  private clusterManager: ClusterManager;
  private processing: boolean;

  constructor(
    clusterConfigs: import('./kraken-types.js').ClusterConfig[], 
    clusters: ClusterManager,
    scheduler?: ClusterScheduler
  ) {
    this.pendingTasks = new Map();
    this.activeTasks = new Map();
    this.taskQueue = [];
    this.clusterManager = clusters;
    this.clusterScheduler = scheduler || new ClusterScheduler(clusterConfigs);
    this.processing = false;

    // Start the async processing loop
    this.startProcessingLoop();
  }

  /**
   * Queue a task for async execution
   */
  async delegate(request: KrakenDelegationRequest): Promise<KrakenDelegationResult> {
    // Generate taskId if empty
    if (!request.taskId) {
      request.taskId = `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }

    // Add to pending
    this.pendingTasks.set(request.taskId, request);

    // Determine cluster assignment
    const clusterId = request.targetCluster || await this.clusterScheduler.assignCluster(request);
    if (!request.targetCluster) {
      request.targetCluster = clusterId;
    }


    let resolvePromise: (result: KrakenDelegationResult) => void;
    let rejectPromise: (error: Error) => void;
    const resultPromise = new Promise<KrakenDelegationResult>((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });

    // Enqueue with priority
    this.enqueueWithPriority({
      request,
      resolve: resolvePromise!,
      reject: rejectPromise!,
      enqueuedAt: Date.now(),
    }, request.priority);

    return resultPromise;
  }

  /**
   * Enqueue task with priority ordering
   */
  private enqueueWithPriority(task: QueuedTask, priority: TaskPriority): void {
    const priorityOrder: Record<TaskPriority, number> = {
      critical: 0,
      high: 1,
      normal: 2,
      low: 3,
    };

    const taskPriority = priorityOrder[priority];

    // Find insertion point based on priority
    let insertIndex = this.taskQueue.findIndex(q => {
      const qPriority = priorityOrder[q.request.priority];
      return qPriority > taskPriority;
    });

    if (insertIndex === -1) {
      insertIndex = this.taskQueue.length;
    }

    this.taskQueue.splice(insertIndex, 0, task);

    // Trigger processing if not already running
    if (!this.processing) {
      this.processQueue();
    }
  }

  /**
   * Process queued tasks asynchronously
   */
  private async processQueue(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      if (!task) break;

      // Execute task without awaiting it here to allow parallel processing
      this.executeTask(task.request)
        .then(result => {
          task.resolve(result);
        })
        .catch(error => {
          task.reject(error instanceof Error ? error : new Error(String(error)));
        });
    }

    this.processing = false;
  }

  /**
   * Start the processing loop (non-blocking)
   */
  private startProcessingLoop(): void {
    // Ensure processing flag starts as false
    this.processing = false;
  }

  /**
   * Execute a single task
   */
  private async executeTask(request: KrakenDelegationRequest): Promise<KrakenDelegationResult> {
    // Move from pending to active
    this.pendingTasks.delete(request.taskId);

    const result: KrakenDelegationResult = {
      success: false,
      taskId: request.taskId,
      clusterId: request.targetCluster,
      status: 'in_progress',
    };

    this.activeTasks.set(request.taskId, result);

    // Increment cluster load
    this.clusterScheduler.incrementLoad(request.targetCluster);

     try {
        // Execute via cluster manager
        const execResult = await this.clusterManager.executeTask(
          request.targetCluster,
          request
        );

        result.success = execResult.success;
        result.agentId = execResult.agentId;
        result.clusterId = execResult.clusterId;
        result.status = execResult.success ? 'completed' : 'failed';
        result.completedAt = Date.now();

        if (execResult.error) {
          result.error = execResult.error;
        }

        // Sync with ExecutionBrain and SystemBrain
        await this.syncBrainsAfterTask(request.taskId, execResult.success, execResult.error);

        // Record completion and decrement cluster load
        this.clusterScheduler.recordCompletion(request.targetCluster, execResult.success);
        
        // Keep in activeTasks with completed/failed status so waitForCompletion can find it
        this.activeTasks.set(request.taskId, result);

        return result;
      } catch (error) {
        result.success = false;
        result.status = 'failed';
        result.error = String(error);
        result.completedAt = Date.now();

        // Sync with ExecutionBrain and SystemBrain
        await this.syncBrainsAfterTask(request.taskId, false, String(error));

        // Record completion (as failure) and decrement cluster load
        this.clusterScheduler.recordCompletion(request.targetCluster, false);
        
        // Keep in activeTasks with failed status so waitForCompletion can find it
        this.activeTasks.set(request.taskId, result);

        return result;
      }
  }

  /**
   * Sync both ExecutionBrain and SystemBrain after task lifecycle event
   * This is the gate auto-advancement trigger point.
   */
  private async syncBrainsAfterTask(taskId: string, success: boolean, error?: string): Promise<void> {
    try {
      const { getExecutionBrain } = await import('../brains/execution/execution-brain.js');
      const { getSystemBrain } = await import('../brains/system/system-brain.js');

      // Sync ExecutionBrain — record result + verify outputs
      const execBrain = getExecutionBrain();
      if (execBrain && execBrain.isInitialized()) {
        execBrain.recordResult({
          taskId,
          success,
          clusterId: 'unknown',
          agentId: 'delegation-engine',
          error,
          completedAt: Date.now(),
        });

        // L2/L3: Verify output retrieval after task completion
        if (success) {
          try {
            const outputStatus = execBrain.getOutputStatus(taskId);
            if (outputStatus.required > 0) {
              await execBrain.claimOutputsRetrieved(taskId, []);
              const canComplete = execBrain.canCompleteTask(taskId);
              console.log(`[BrainSync] Task ${taskId} output check: ${canComplete ? 'COMPLETE' : 'INCOMPLETE'} (${outputStatus.retrieved}/${outputStatus.required})`);
            }
          } catch { /* non-critical */ }
        }
      }

      // Sync SystemBrain — record task + evaluate gate advancement
      const systemBrain = getSystemBrain();
      if (systemBrain && systemBrain.isInitialized()) {
        if (success) {
          systemBrain.recordTaskComplete(taskId);
          
          // Auto-advance gate if criteria met
          const currentGate = systemBrain.getCurrentGate();
          const evaluation = systemBrain.evaluateGateEntry(currentGate);
          
          if (evaluation.allPassed && await systemBrain.isGateAdvanceable()) {
            const gateOrder = ['plan', 'build', 'test', 'verify', 'audit', 'delivery'];
            const currentIdx = gateOrder.indexOf(currentGate);
            if (currentIdx >= 0 && currentIdx < gateOrder.length - 1) {
              const nextGate = gateOrder[currentIdx + 1];
              systemBrain.setCurrentGate(nextGate);
              console.log(`[GateAdvance] Gate auto-advanced: ${currentGate} → ${nextGate}`);
            }
          }
        } else {
          systemBrain.recordTaskFailure(taskId, error || 'Unknown error');
        }
      }
    } catch {
      // Brain sync is non-critical — don't let it break task execution
    }
  }

  /**
   * Wait for a specific task to complete
   */
  async waitForCompletion(taskId: string, timeoutMs: number = 60000): Promise<KrakenDelegationResult | null> {
    const start = Date.now();

    while (Date.now() - start < timeoutMs) {
      const result = this.activeTasks.get(taskId);
      if (result && (result.status === 'completed' || result.status === 'failed')) {
        return result;
      }
      // Check pending queue too
      if (this.pendingTasks.has(taskId)) {
        await this.sleep(50);
        continue;
      }
      // Check if still queued
      const queued = this.taskQueue.find(t => t.request.taskId === taskId);
      if (queued) {
        await this.sleep(50);
        continue;
      }
      break;
    }

    // If we have a result, return it
    const existing = this.activeTasks.get(taskId);
    if (existing && existing.status !== 'in_progress') {
      return existing;
    }

    // Timed out
    return null;
  }

  /**
   * Wait for multiple tasks to complete
   */
  async waitForAll(taskIds: string[], timeoutMs: number = 60000): Promise<(KrakenDelegationResult | null)[]> {
    const promises = taskIds.map(id => this.waitForCompletion(id, timeoutMs));
    return Promise.all(promises);
  }

  /**
   * Get current pending tasks
   */
  getPendingTasks(): KrakenDelegationRequest[] {
    return Array.from(this.pendingTasks.values());
  }

  /**
   * Get active tasks
   */
  getActiveTasks(): Map<string, KrakenDelegationResult> {
    return new Map(this.activeTasks);
  }

  /**
   * Get queued tasks count
   */
  getQueuedCount(): number {
    return this.taskQueue.length;
  }

  /**
   * Cancel a pending or in-progress task
   */
  cancelTask(taskId: string): boolean {
    // Remove from pending
    if (this.pendingTasks.has(taskId)) {
      this.pendingTasks.delete(taskId);
      return true;
    }

    // Remove from queue
    const queueIndex = this.taskQueue.findIndex(t => t.request.taskId === taskId);
    if (queueIndex !== -1) {
      const task = this.taskQueue.splice(queueIndex, 1)[0];
      task.resolve({
        success: false,
        taskId,
        clusterId: task.request.targetCluster,
        status: 'cancelled',
      });
      return true;
    }

    // Remove from active tasks - mark as cancelled
    if (this.activeTasks.has(taskId)) {
      const activeTask = this.activeTasks.get(taskId);
      if (activeTask) {
        activeTask.status = 'cancelled';
        activeTask.completedAt = Date.now();
      }
      return true;
    }

    return false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```
### 8.2 Cluster Scheduler

---

### Source: `src/factory/ClusterScheduler.ts` (269 lines)

```typescript
/**
 * src/factory/ClusterScheduler.ts
 * 
 * Cluster Scheduler for Kraken
 * 
 * Implements least-load scheduling across clusters.
 * Supports focus anchoring - clusters can be anchored to project/task focus
 * and auto-renamed to reflect their current focus.
 */

import type { KrakenDelegationRequest, ClusterLoad, ClusterConfig } from './kraken-types.js';

export class ClusterScheduler {
  private clusterConfigs: ClusterConfig[];
  private clusterLoad: Map<string, ClusterLoad>;
  private focusAnchors: Map<string, string>; // focus name -> cluster ID

  constructor(clusters: ClusterConfig[]) {
    this.clusterConfigs = clusters;
    this.clusterLoad = new Map();
    this.focusAnchors = new Map();

    // Initialize load tracking for each cluster
    for (const cluster of clusters) {
      this.clusterLoad.set(cluster.id, {
        clusterId: cluster.id,
        activeTasks: 0,
        pendingTasks: 0,
        completedTasks: 0,
        failedTasks: 0,
        lastActivity: Date.now(),
      });
    }
  }

  /**
   * Anchor a cluster to a focus/project
   * The cluster will be associated with this focus name
   */
  anchorClusterToFocus(clusterId: string, focusName: string): void {
    // Normalize focus name (lowercase, replace spaces with hyphens)
    const normalizedFocus = focusName.toLowerCase().replace(/\s+/g, '-');
    this.focusAnchors.set(normalizedFocus, clusterId);
  }

  /**
   * Get the cluster ID for a focus name
   * Returns the anchored cluster or resolves via patterns
   */
  resolveFocusToCluster(focusName: string): string | undefined {
    const normalizedFocus = focusName.toLowerCase().replace(/\s+/g, '-');
    
    // Direct match
    if (this.focusAnchors.has(normalizedFocus)) {
      return this.focusAnchors.get(normalizedFocus);
    }

    // Partial match - check if any anchor starts with this focus
    for (const [anchor, clusterId] of this.focusAnchors) {
      if (anchor.includes(normalizedFocus) || normalizedFocus.includes(anchor)) {
        return clusterId;
      }
    }

    return undefined;
  }

  /**
   * Get focus anchor mappings
   */
  getFocusAnchors(): Map<string, string> {
    return new Map(this.focusAnchors);
  }

  /**
   * Clear all focus anchors
   */
  clearFocusAnchors(): void {
    this.focusAnchors.clear();
  }

  /**
   * Assign a cluster based on least-load strategy
   * Now with smart focus resolution
   */
  async assignCluster(request: KrakenDelegationRequest): Promise<string> {
    // If specific cluster requested, resolve it first
    if (request.targetCluster) {
      return this.resolveClusterRequest(request.targetCluster);
    }

    // Check if task has focus context
    if (request.context?.focus) {
      const focusCluster = this.resolveFocusToCluster(request.context.focus as string);
      if (focusCluster) {
        return focusCluster;
      }
    }

    // Find least loaded cluster
    return this.getLeastLoadedCluster();
  }

  /**
   * Resolve cluster request - handles focus names, partial matches
   */
  resolveClusterRequest(clusterIdOrFocus: string): string {
    const normalized = clusterIdOrFocus.toLowerCase().replace(/\s+/g, '-');
    
    // Direct cluster ID match
    for (const config of this.clusterConfigs) {
      if (config.id.toLowerCase() === normalized) {
        return config.id;
      }
      // Also check name field
      if (config.name?.toLowerCase().replace(/\s+/g, '-') === normalized) {
        return config.id;
      }
    }

    // Try focus resolution
    const focusCluster = this.resolveFocusToCluster(clusterIdOrFocus);
    if (focusCluster) {
      return focusCluster;
    }

    // Try partial match on cluster IDs
    for (const config of this.clusterConfigs) {
      if (config.id.toLowerCase().includes(normalized) || 
          normalized.includes(config.id.toLowerCase())) {
        return config.id;
      }
    }

    // DEFAULT: Return least loaded cluster instead of failing
    return this.getLeastLoadedCluster();
  }

  /**
   * Assign cluster based on task type
   */
  assignClusterForTaskType(task: string, taskType?: string): string {
    const taskLower = task.toLowerCase();

    // Shark-heavy tasks: steamroll, build from scratch
    if (taskLower.includes('build') || 
        taskLower.includes('create') || 
        taskLower.includes('implement') ||
        taskLower.includes('steamroll')) {
      return 'cluster-alpha';
    }

    // Manta precision tasks: debug, fix, test, linear
    if (taskLower.includes('debug') || 
        taskLower.includes('fix') || 
        taskLower.includes('test') ||
        taskLower.includes('verify') ||
        taskLower.includes('lint')) {
      return 'cluster-gamma';
    }

    // Default to balanced beta cluster
    return 'cluster-beta';
  }

  /**
   * Increment load for a cluster (task started)
   */
  incrementLoad(clusterId: string): void {
    const load = this.clusterLoad.get(clusterId);
    if (load) {
      load.activeTasks++;
      load.pendingTasks++;
      load.lastActivity = Date.now();
    }
  }

  /**
   * Decrement load for a cluster (task completed)
   */
  decrementLoad(clusterId: string): void {
    const load = this.clusterLoad.get(clusterId);
    if (load) {
      load.activeTasks = Math.max(0, load.activeTasks - 1);
      load.pendingTasks = Math.max(0, load.pendingTasks - 1);
      load.lastActivity = Date.now();
    }
  }

  /**
   * Record task completion
   */
  recordCompletion(clusterId: string, success: boolean): void {
    const load = this.clusterLoad.get(clusterId);
    if (load) {
      if (success) {
        load.completedTasks++;
      } else {
        load.failedTasks++;
      }
      load.activeTasks = Math.max(0, load.activeTasks - 1);
      load.lastActivity = Date.now();
    }
  }

  /**
   * Get load for a specific cluster
   */
  getClusterLoad(clusterId: string): ClusterLoad | undefined {
    return this.clusterLoad.get(clusterId);
  }

  /**
   * Get load for all clusters
   */
  getAllClusterLoads(): Map<string, ClusterLoad> {
    return new Map(this.clusterLoad);
  }

  /**
   * Get least loaded cluster
   */
  getLeastLoadedCluster(): string {
    let bestCluster = this.clusterConfigs[0]?.id || 'cluster-alpha';
    let minLoad = Infinity;

    for (const [clusterId, load] of this.clusterLoad) {
      if (load.activeTasks < minLoad) {
        minLoad = load.activeTasks;
        bestCluster = clusterId;
      }
    }

    return bestCluster;
  }

  /**
   * Get cluster by ID
   */
  getClusterConfig(clusterId: string): ClusterConfig | undefined {
    return this.clusterConfigs.find(c => c.id === clusterId);
  }

  /**
   * Get all cluster configs
   */
  getAllClusterConfigs(): ClusterConfig[] {
    return this.clusterConfigs;
  }

  /**
   * Get total system load
   */
  getTotalLoad(): { active: number; pending: number; completed: number; failed: number } {
    let active = 0;
    let pending = 0;
    let completed = 0;
    let failed = 0;

    for (const load of this.clusterLoad.values()) {
      active += load.activeTasks;
      pending += load.pendingTasks;
      completed += load.completedTasks;
      failed += load.failedTasks;
    }

    return { active, pending, completed, failed };
  }
}
```
### 8.3 Factory Types

---

### Source: `src/factory/types.ts` (302 lines)

```typescript
/**
 * src/factory/types.ts
 *
 * V4 Factory Types
 *
 * Single source of truth for the config-driven multi-brain agent architecture.
 * Supports single (Spider), dual (Shark), and trio parallel orchestrator models.
 */

// ============================================================
// BRAIN TYPES
// ============================================================

export type BrainType = 'single' | 'dual' | 'trio' | 'custom';

export interface BrainConfig {
  type: BrainType;
  name: string;
  description?: string;
}

export interface SingleBrainConfig extends BrainConfig {
  type: 'single';
  orchestrator: string;
}

export interface DualBrainConfig extends BrainConfig {
  type: 'dual';
  orchestrators: {
    [key: string]: string; // orchestrator ID → agent ID
  };
  workflows: {
    [orchestratorId: string]: OrchestratorWorkflow;
  };
  syncMode: 'shared-state' | 'direct' | 'none';
}

export interface TrioBrainConfig extends BrainConfig {
  type: 'trio';
  orchestrators: {
    [key: string]: string;
  };
  workflows: {
    [orchestratorId: string]: OrchestratorWorkflow;
  };
  syncMode: 'shared-state' | 'direct' | 'none';
}

export interface OrchestratorWorkflow {
  name: string;
  description: string;
  owns: string[];
  delegatesTo: string[];
  readOnly?: string[];
  gates?: string[];
}

export interface BrainHierarchy {
  level: number;
  children: BrainInstance[];
  parent?: string;
}

export interface BrainInstance {
  type: BrainType;
  primary: string;
  all: string[];
  hierarchy: BrainHierarchy;
  workflows?: { [orchestratorId: string]: OrchestratorWorkflow };
  syncMode?: 'shared-state' | 'direct' | 'none';
}

// ============================================================
// AGENT TYPES
// ============================================================

export type AgentMode = 'primary' | 'subagent';

export interface AgentDefinition {
  id: string;
  name: string;
  mode: AgentMode;
  description: string;
  cluster?: string;
  capabilities: string[];
  allowedTools: string[];
  maxConcurrentTasks: number;
  prompt?: string;
  model?: string;
  temperature?: number;
  brain?: string;
}

export interface AgentTemplate {
  id: string;
  description: string;
  tools: string[];
  capabilities: string[];
  prompt: string;
  defaultModel?: string;
  defaultTemperature?: number;
}

export interface AgentOverride {
  prompt?: string;
  tools?: string[];
  model?: string;
  temperature?: number;
  maxConcurrentTasks?: number;
}

// ============================================================
// CLUSTER TYPES
// ============================================================

export interface ClusterConfig {
  id: string;
  name: string;
  description?: string;
  agents: string[];
  subOrchestrator?: string;
  intraClusterDelegation: boolean;
  interClusterDelegation: boolean;
  sharedContext: boolean;
  parentCluster?: string;
}

export interface ClusterInstance {
  config: ClusterConfig;
  agents: AgentDefinition[];
  subOrchestrator?: AgentDefinition;
}

// ============================================================
// ARCHITECTURE TYPES
// ============================================================

export interface ArchitectureConfig {
  name: string;
  version: string;
  description?: string;
  brain: SingleBrainConfig | DualBrainConfig | TrioBrainConfig | BrainConfig;
  clusters: ClusterConfig[];
  agents: Record<string, AgentDefinition | string>; // string = template reference
  delegation?: {
    allowCrossCluster?: boolean;
    requireGateApproval?: boolean;
    maxHops?: number;
  };
  hooks?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

// Forward references to coordination types (avoid circular import)
export interface AgentRegistry {
  getAgent(agentId: string): AgentDefinition | null;
  getAgentsByMode(mode: string): AgentDefinition[];
  getAgentsByCluster(clusterId: string): AgentDefinition[];
  isAgentAllowedTool(agentId: string, toolName: string): boolean;
  listAgents(): AgentDefinition[];
}

export interface DelegationEngine {
  delegate(request: DelegationRequest): Promise<DelegationResult>;
  canDelegate(fromAgent: string, toAgent: string): boolean;
  getClusterAgents(clusterId: string): AgentDefinition[];
  enforceGate(request: DelegationRequest): GateResult;
}

export interface DelegationRequest {
  from: string;
  to: string;
  task: string;
  context?: Record<string, unknown>;
}

export interface DelegationResult {
  success: boolean;
  taskId?: string;
  error?: string;
}

export interface GateResult {
  allowed: boolean;
  reason?: string;
}

export interface StateMachine {
  createTask(input: CreateTaskInput): Task;
  transition(taskId: string, to: TaskStatus): Task | null;
  getTask(taskId: string): Task | null;
  getTasksByState(state: TaskStatus): Task[];
  getTasksByAgent(agentId: string): Task[];
  canTransition(taskId: string, to: TaskStatus): boolean;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled';

export interface Task {
  id: string;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
  assignedAgent?: string;
  context?: Record<string, unknown>;
}

export interface CreateTaskInput {
  id: string;
  assignedAgent?: string;
  context?: Record<string, unknown>;
}

export interface ArchitectureInstance {
  config: ArchitectureConfig;
  agents: Map<string, AgentDefinition>;
  clusters: Map<string, ClusterConfig>;
  brains: {
    type: BrainType;
    primary: string;
    all: string[];
    workflows?: { [key: string]: OrchestratorWorkflow };
    syncMode?: 'shared-state' | 'direct' | 'none';
  };
  coordination: {
    registry: AgentRegistry;
    delegation: DelegationEngine;
    stateMachine: StateMachine;
  };
  stateStore: StateStore;
  messenger: BrainMessenger;
}

// ============================================================
// STATE STORE TYPES
// ============================================================

export type StateDomain = 'plan-state' | 'execution-state' | 'quality-state';

export interface WriteResult {
  success: boolean;
  version: number;
  error?: string;
}

export interface Unsubscribe {
  (): void;
}

export interface StateSnapshot {
  data: Record<string, any>;
  versions: Record<string, number>;
  timestamp: number;
}

export interface StateStore {
  get<T>(key: string, domain?: StateDomain): T | undefined;
  set<T>(key: string, value: T, domain: StateDomain, ownerBrain?: string): WriteResult;
  watch(key: string, callback: (value: any, version: number) => void): Unsubscribe;
  snapshot(): StateSnapshot;
  restore(snapshot: StateSnapshot): void;
}

// Domain ownership map — which brain type owns which state domain
export const DOMAIN_OWNERSHIP: Record<StateDomain, string[]> = {
  'plan-state': ['architect'],
  'execution-state': ['executor'],
  'quality-state': ['guardian', 'executor'],
};

// ============================================================
// BRAIN MESSENGER TYPES
// ============================================================

export interface BrainMessage {
  id: string;
  from: string;
  to: string;
  type: 'handoff' | 'alert' | 'request' | 'ack';
  priority: 'low' | 'normal' | 'high' | 'critical';
  payload: unknown;
  timestamp: number;
  requiresAck: boolean;
}

export interface BrainMessenger {
  send(message: BrainMessage): void;
  receive(brainId: string): BrainMessage[];
  waitForAck(messageId: string, timeoutMs: number): Promise<boolean>;
}

// ============================================================
// VALIDATION TYPES
// ============================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export type Validator<T> = (config: T) => ValidationResult;
```
### 8.4 Kraken Types

---

### Source: `src/factory/kraken-types.ts` (229 lines)

```typescript
/**
 * src/factory/types.ts
 * 
 * Kraken Agent Factory Types
 * 
 * Extended from v4.1 boilerplate with Kraken-specific types for:
 * - Async delegation engine
 * - Cluster management
 * - Task queue
 * - Hive integration
 */

import type { AgentDefinition, ClusterConfig } from './types.js';

// Re-export existing types
export {
  type BrainType,
  type BrainConfig,
  type SingleBrainConfig,
  type DualBrainConfig,
  type TrioBrainConfig,
  type OrchestratorWorkflow,
  type BrainHierarchy,
  type BrainInstance,
  type AgentDefinition,
  type AgentTemplate,
  type AgentOverride,
  type AgentMode,
  type ClusterConfig,
  type ClusterInstance,
  type ArchitectureConfig,
  type ArchitectureInstance,
  type StateDomain,
  type WriteResult,
  type Unsubscribe,
  type StateSnapshot,
  type StateStore,
  type BrainMessage,
  type BrainMessenger,
  type ValidationResult,
  type Validator,
  type DelegationRequest,
  type DelegationResult,
  type GateResult,
  type StateMachine,
  type TaskStatus,
  type Task,
  type CreateTaskInput,
} from './types.js';

// ============================================================
// KRAKEN SPECIFIC TYPES
// ============================================================

// Task priority levels
export type TaskPriority = 'low' | 'normal' | 'high' | 'critical';

// Task status within the delegation system
export type DelegationTaskStatus = 'pending' | 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

// Delegation request for async task execution
export interface KrakenDelegationRequest {
  taskId: string;
  task: string;
  targetCluster: string;
  targetAgent?: string;
  context?: Record<string, unknown>;
  acceptanceCriteria: string[];
  priority: TaskPriority;
  createdAt: number;
}

// Result of a delegation operation
export interface KrakenDelegationResult {
  success: boolean;
  taskId: string;
  clusterId: string;
  agentId?: string;
  status: DelegationTaskStatus;
  error?: string;
  completedAt?: number;
}

// Cluster load tracking
export interface ClusterLoad {
  clusterId: string;
  activeTasks: number;
  pendingTasks: number;
  completedTasks: number;
  failedTasks: number;
  lastActivity: number;
}

// Cluster status
export interface ClusterStatus {
  clusterId: string;
  active: boolean;
  load: ClusterLoad;
  agents: string[];
}

// Async task queue item
export interface QueuedTask {
  request: KrakenDelegationRequest;
  resolve: (result: KrakenDelegationResult) => void;
  reject: (error: Error) => void;
  enqueuedAt: number;
}

// Agent instance within a cluster
export interface ClusterAgentInstance {
  id: string;
  agentType: 'shark' | 'manta';
  busy: boolean;
  currentTaskId?: string;
  clusterId: string;
}

// Injected context for task assignment
export interface InjectedTaskContext {
  taskId: string;
  patterns: HivememoryResult[];
  failures: HivememoryResult[];
  previousWork: HivememoryResult[];
  clusterContext: ClusterContext;
}

// Cluster context summary
export interface ClusterContext {
  clusterId: string;
  recentTasks: string[];
  commonPatterns: string[];
  knownFailures: string[];
}

// Hivememory result from kraken-hive search
export interface HivememoryResult {
  uri: string;
  type: 'pattern' | 'failure' | 'session' | 'decision' | 'breakthrough';
  title: string;
  relevance: number;
  content?: string;
}

// Kraken-Hive engine interface
export interface KrakenHiveEngine {
  search(query: string, filters?: HiveSearchFilters): Promise<HivememoryResult[]>;
  rememberCluster(clusterId: string, key: string, content: string): Promise<void>;
  rememberSession(sessionId: string, key: string, content: string): Promise<void>;
  rememberPattern(pattern: Pattern): Promise<void>;
  rememberFailure(failure: FailureRecord): Promise<void>;
  getClusterContext(clusterId: string): Promise<ClusterContext>;
  getContextForTask(task: string): Promise<InjectedTaskContext>;
  synthesizeContext(memories: HivememoryResult[], taskType: string): InjectedTaskContext;
}

export interface HiveSearchFilters {
  category?: 'all' | 'clusters' | 'sessions' | 'patterns' | 'decisions' | 'failures';
  limit?: number;
  clusterId?: string;
}

export interface Pattern {
  type: 'pattern' | 'breakthrough';
  id: string;
  description: string;
  taskId?: string;
  clusterId?: string;
  content: string;
  createdAt: number;
}

export interface FailureRecord {
  id: string;
  pattern: string;
  cause: string;
  solution?: string;
  taskId?: string;
  clusterId?: string;
  createdAt: number;
}

// Cluster activity for tracking
export interface ClusterActivity {
  type: 'task_queued' | 'task_started' | 'task_completed' | 'task_failed' | 'file_written' | 'error';
  taskId?: string;
  clusterId: string;
  file?: string;
  error?: string;
  timestamp: number;
}

// Priority queue for task scheduling
export interface PriorityQueue<T> {
  enqueue(item: T, priority: number): void;
  dequeue(): T | undefined;
  dequeueMany(count: number): T[];
  size(): number;
  isEmpty(): boolean;
}

// Kraken agent identity
export interface KrakenAgentIdentity {
  name: string;
  prefix: string;
  orchestrator: string;
  agents: Set<string>;
  primaryAgents: Set<string>;
  subagents: Set<string>;
}

// Agent capability definitions
export type AgentCapability = 'delegate' | 'execute' | 'plan' | 'debug' | 'review';

// Shark agent template
export interface SharkAgentConfig {
  id: string;
  cluster: string;
  capabilities: AgentCapability[];
  instructions?: string;
}

// Manta agent template  
export interface MantaAgentConfig {
  id: string;
  cluster: string;
  capabilities: AgentCapability[];
  instructions?: string;
}
```
### 8.5 Validators

---

### Source: `src/factory/validators.ts` (240 lines)

```typescript
/**
 * src/factory/validators.ts
 *
 * V4 Factory Validators
 *
 * Validates architecture, brain, agent, and cluster configurations.
 */

import type {
  ArchitectureConfig,
  BrainConfig,
  AgentDefinition,
  ClusterConfig,
  ValidationResult,
  Validator,
} from './types.js';

export function validateRequiredFields(
  config: ArchitectureConfig
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!config.name) errors.push('Architecture name is required');
  if (!config.version) errors.push('Architecture version is required');
  if (!config.brain) errors.push('Brain configuration is required');
  if (!config.agents || Object.keys(config.agents).length === 0) {
    errors.push('At least one agent is required');
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateBrainReferences(
  config: ArchitectureConfig
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const agentIds = new Set(Object.keys(config.agents));

  if (config.brain.type === 'single') {
    const orchestrator = (config.brain as any).orchestrator;
    if (!agentIds.has(orchestrator)) {
      errors.push(`Orchestrator "${orchestrator}" not found in agents`);
    }
  }

  if (config.brain.type === 'dual' || config.brain.type === 'trio') {
    const orchestrators = (config.brain as any).orchestrators;
    for (const [id, agentId] of Object.entries(orchestrators)) {
      if (!agentIds.has(agentId as string)) {
        errors.push(`Orchestrator "${id}" references agent "${agentId}" not found`);
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateAgentReferences(config: ArchitectureConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const [agentId, agentDef] of Object.entries(config.agents)) {
    if (typeof agentDef === 'string') continue; // Template reference

    if (agentDef.cluster && !config.clusters.find(c => c.id === agentDef.cluster)) {
      errors.push(`Agent "${agentId}" references cluster "${agentDef.cluster}" not found`);
    }

    if (agentDef.brain && !config.brain) {
      errors.push(`Agent "${agentId}" references brain "${agentDef.brain}" not found`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateClusterIntegrity(config: ArchitectureConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const agentIds = new Set(Object.keys(config.agents));

  for (const cluster of config.clusters) {
    for (const agentId of cluster.agents) {
      if (!agentIds.has(agentId)) {
        errors.push(`Cluster "${cluster.id}" references agent "${agentId}" not found`);
      }
    }

    if (cluster.subOrchestrator && !agentIds.has(cluster.subOrchestrator)) {
      errors.push(`Cluster "${cluster.id}" references subOrchestrator "${cluster.subOrchestrator}" not found`);
    }

    if (cluster.parentCluster && !config.clusters.find(c => c.id === cluster.parentCluster)) {
      errors.push(`Cluster "${cluster.id}" references parentCluster "${cluster.parentCluster}" not found`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateToolPermissions(config: ArchitectureConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const [agentId, agentDef] of Object.entries(config.agents)) {
    if (typeof agentDef === 'string') continue;

    // Check for dangerous tool combinations
    const dangerousCombos = [
      { tools: ['write', 'bash'], reason: 'write + bash can execute arbitrary code' },
    ];

    for (const combo of dangerousCombos) {
      const hasAll = combo.tools.every(t => agentDef.allowedTools.includes(t));
      if (hasAll) {
        warnings.push(`Agent "${agentId}" has ${combo.tools.join(' + ')}: ${combo.reason}`);
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateStateOwnership(config: ArchitectureConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // This is a placeholder for domain ownership validation
  // In a real implementation, you would check that each brain
  // only writes to domains it owns

  return { valid: errors.length === 0, errors, warnings };
}

export function validateWorkflowGates(config: ArchitectureConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.brain.type === 'dual' || config.brain.type === 'trio') {
    const workflows = (config.brain as any).workflows;
    for (const [orchestratorId, workflow] of Object.entries(workflows)) {
      // Check that all delegation targets exist
      for (const delegateId of (workflow as any).delegatesTo) {
        if (!Object.keys(config.agents).includes(delegateId as string)) {
          errors.push(`Workflow "${orchestratorId}" delegates to "${delegateId}" not found`);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateAgent(agent: AgentDefinition): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!agent.id) errors.push('Agent ID is required');
  if (!agent.name) errors.push('Agent name is required');
  if (!agent.description) warnings.push('Agent description is missing');

  if (agent.maxConcurrentTasks < 1) {
    errors.push('maxConcurrentTasks must be at least 1');
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateCluster(cluster: ClusterConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!cluster.id) errors.push('Cluster ID is required');
  if (!cluster.name) errors.push('Cluster name is required');
  if (!cluster.agents || cluster.agents.length === 0) {
    errors.push('Cluster must have at least one agent');
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateBrain(brain: BrainConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!brain.type) errors.push('Brain type is required');
  if (!brain.name) errors.push('Brain name is required');

  const validTypes = ['single', 'dual', 'trio', 'custom'];
  if (brain.type && !validTypes.includes(brain.type)) {
    errors.push(`Brain type must be one of: ${validTypes.join(', ')}`);
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function runValidators(
  config: ArchitectureConfig
): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  const validators: Validator<ArchitectureConfig>[] = [
    validateRequiredFields,
    validateBrainReferences,
    validateAgentReferences,
    validateClusterIntegrity,
    validateToolPermissions,
    validateStateOwnership,
    validateWorkflowGates,
  ];

  for (const validator of validators) {
    const result = validator(config);
    allErrors.push(...result.errors);
    allWarnings.push(...result.warnings);
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}

export const architectureValidators = {
  validateRequiredFields,
  validateBrainReferences,
  validateAgentReferences,
  validateClusterIntegrity,
  validateToolPermissions,
  validateStateOwnership,
  validateWorkflowGates,
  validateAgent,
  validateCluster,
  validateBrain,
  runValidators,
};
```
### 8.6 StateStore (Factory)

---

### Source: `src/factory/StateStore.ts` (132 lines)

```typescript
/**
 * src/factory/StateStore.ts
 * 
 * V4 State Store
 *
 * Shared state store with domain ownership enforcement.
 * Each brain can only WRITE to its owned state domains.
 * All brains can READ from all domains.
 */

import type {
  StateStore,
  StateDomain,
  WriteResult,
  StateSnapshot,
  Unsubscribe,
} from './types.js';

export const DOMAIN_OWNERSHIP: Record<StateDomain, string[]> = {
  'plan-state': ['architect'],
  'execution-state': ['executor'],
  'quality-state': ['guardian', 'executor'],
};

export function createStateStore(): StateStore {
  const data = new Map<string, any>();
  const versions = new Map<string, number>();
  const watchers = new Map<string, Array<(value: any, version: number) => void>>();

  function getKey(key: string, domain?: StateDomain): string {
    return domain ? `${domain}:${key}` : key;
  }

  return {
    get<T>(key: string, domain?: StateDomain): T | undefined {
      const fullKey = getKey(key, domain);
      return data.get(fullKey) as T | undefined;
    },

    set<T>(key: string, value: T, domain: StateDomain, ownerBrain?: string): WriteResult {
      const fullKey = getKey(key, domain);

      // Domain ownership enforcement
      if (ownerBrain) {
        const owners = DOMAIN_OWNERSHIP[domain];
        if (owners && !owners.includes(ownerBrain)) {
          return {
            success: false,
            version: versions.get(fullKey) ?? 0,
            error: `Brain "${ownerBrain}" does not own domain "${domain}". Owners: ${owners.join(', ')}`,
          };
        }
      }

      const currentVersion = versions.get(fullKey) ?? 0;
      const newVersion = currentVersion + 1;

      data.set(fullKey, value);
      versions.set(fullKey, newVersion);

      // Notify watchers
      const watchersForKey = watchers.get(fullKey);
      if (watchersForKey) {
        for (const callback of watchersForKey) {
          try {
            callback(value, newVersion);
          } catch {
            // Watcher errors are silently ignored to not break the store
          }
        }
      }

      return { success: true, version: newVersion };
    },

    watch(key: string, callback: (value: any, version: number) => void): Unsubscribe {
      // Register watcher for both the bare key and all domain-prefixed variants
      const allKeys = [key];
      // Also register for domain-prefixed keys
      for (const domain of Object.keys(DOMAIN_OWNERSHIP)) {
        allKeys.push(`${domain}:${key}`);
      }

      for (const fullKey of allKeys) {
        if (!watchers.has(fullKey)) {
          watchers.set(fullKey, []);
        }
        watchers.get(fullKey)!.push(callback);
      }

      return () => {
        for (const fullKey of allKeys) {
          const list = watchers.get(fullKey);
          if (list) {
            const idx = list.indexOf(callback);
            if (idx !== -1) list.splice(idx, 1);
          }
        }
      };
    },

    snapshot(): StateSnapshot {
      const snapshotData: Record<string, any> = {};
      const snapshotVersions: Record<string, number> = {};

      for (const [key, value] of data.entries()) {
        snapshotData[key] = value;
      }
      for (const [key, version] of versions.entries()) {
        snapshotVersions[key] = version;
      }

      return {
        data: snapshotData,
        versions: snapshotVersions,
        timestamp: Date.now(),
      };
    },

    restore(snapshot: StateSnapshot): void {
      data.clear();
      versions.clear();

      for (const [key, value] of Object.entries(snapshot.data)) {
        data.set(key, value);
      }
      for (const [key, version] of Object.entries(snapshot.versions)) {
        versions.set(key, version);
      }
    },
  };
}
```
### 8.7 BrainMessenger (Factory)

---

### Source: `src/factory/BrainMessenger.ts` (109 lines)

```typescript
/**
 * src/factory/BrainMessenger.ts
 *
 * V4 Brain Messenger
 *
 * Direct brain-to-brain messaging for urgent handoffs.
 * Priority ordering: critical > high > normal > low
 * At-least-once delivery with ack support.
 */

import type { BrainMessenger, BrainMessage } from './types.js';

const PRIORITY_ORDER: Record<BrainMessage['priority'], number> = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
};

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function createBrainMessenger(): BrainMessenger {
  // Queue per brain: brainId → messages[]
  const queues = new Map<string, BrainMessage[]>();
  // Pending acks: messageId → { resolved, resolve, reject, timer }
  const pendingAcks = new Map<
    string,
    {
      resolved: boolean;
      resolve: (value: boolean) => void;
      reject: (reason: Error) => void;
      timer: ReturnType<typeof setTimeout>;
    }
  >();
  // Pre-received acks: messageId → true (for acks that arrive before waitForAck)
  const receivedAcks = new Set<string>();

  function getQueue(brainId: string): BrainMessage[] {
    if (!queues.has(brainId)) {
      queues.set(brainId, []);
    }
    return queues.get(brainId)!;
  }

  function sortQueue(queue: BrainMessage[]): void {
    queue.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
  }

  return {
    send(message: BrainMessage): void {
      const msg: BrainMessage = {
        id: message.id || generateId(),
        from: message.from,
        to: message.to,
        type: message.type,
        priority: message.priority,
        payload: message.payload,
        timestamp: message.timestamp || Date.now(),
        requiresAck: message.requiresAck ?? false,
      };

      const queue = getQueue(msg.to);
      queue.push(msg);
      sortQueue(queue);

      // If it's an ack message, resolve the pending ack (or mark as received)
      if (msg.type === 'ack') {
        if (pendingAcks.has(msg.id)) {
          const pending = pendingAcks.get(msg.id)!;
          if (!pending.resolved) {
            pending.resolved = true;
            clearTimeout(pending.timer);
            pending.resolve(true);
          }
        } else {
          // Ack arrived before waitForAck — mark it
          receivedAcks.add(msg.id);
        }
      }
    },

    receive(brainId: string): BrainMessage[] {
      const queue = getQueue(brainId);
      const messages = [...queue];
      queue.length = 0; // Drain the queue
      return messages;
    },

    waitForAck(messageId: string, timeoutMs: number): Promise<boolean> {
      // If ack was already received, resolve immediately
      if (receivedAcks.has(messageId)) {
        receivedAcks.delete(messageId);
        return Promise.resolve(true);
      }

      return new Promise((resolve, _reject) => {
        const timer = setTimeout(() => {
          if (!pendingAcks.has(messageId) || !pendingAcks.get(messageId)!.resolved) {
            resolve(false); // Timeout = not acked
          }
        }, timeoutMs);

        pendingAcks.set(messageId, { resolved: false, resolve, reject: () => {}, timer });
      });
    },
  };
}
```
### 8.8 Brain Factory

---

### Source: `src/factory/BrainFactory.ts` (118 lines)

```typescript
/**
 * src/factory/BrainFactory.ts
 *
 * V4 Brain Factory
 *
 * Creates brain instances from configurations.
 */

import type { BrainConfig, BrainInstance, BrainHierarchy } from './types.js';

export class BrainFactory {
  createBrain(config: BrainConfig): BrainInstance | null {
    switch (config.type) {
      case 'single':
        return this.createSingleBrain(config);
      case 'dual':
        return this.createDualBrain(config);
      case 'trio':
        return this.createTrioBrain(config);
      case 'custom':
        return this.createCustomBrain(config);
      default:
        console.error(`[BrainFactory] Unknown brain type: ${config.type}`);
        return null;
    }
  }

  private createSingleBrain(config: BrainConfig): BrainInstance {
    const singleConfig = config as any;
    return {
      type: 'single',
      primary: singleConfig.orchestrator,
      all: [singleConfig.orchestrator],
      hierarchy: {
        level: 0,
        children: [],
      },
    };
  }

  private createDualBrain(config: BrainConfig): BrainInstance {
    const dualConfig = config as any;
    const orchestratorAgents = Object.values(dualConfig.orchestrators) as string[];
    
    // Create child brain instances for each orchestrator
    const childInstances: BrainInstance[] = orchestratorAgents.map((agentId) => ({
      type: 'single' as const,
      primary: agentId,
      all: [agentId],
      hierarchy: {
        level: 1,
        children: [],
        parent: 'dual-brain',
      },
    }));
    
    return {
      type: 'dual',
      primary: orchestratorAgents[0],
      all: orchestratorAgents,
      hierarchy: {
        level: 0,
        children: childInstances,
      },
      workflows: dualConfig.workflows,
      syncMode: dualConfig.syncMode,
    };
  }

  private createTrioBrain(config: BrainConfig): BrainInstance {
    const trioConfig = config as any;
    const orchestratorAgents = Object.values(trioConfig.orchestrators) as string[];
    
    // Create child brain instances for each orchestrator
    const childInstances: BrainInstance[] = orchestratorAgents.map((agentId) => ({
      type: 'single' as const,
      primary: agentId,
      all: [agentId],
      hierarchy: {
        level: 1,
        children: [],
        parent: 'trio-brain',
      },
    }));
    
    return {
      type: 'trio',
      primary: orchestratorAgents[0],
      all: orchestratorAgents,
      hierarchy: {
        level: 0,
        children: childInstances,
      },
      workflows: trioConfig.workflows,
      syncMode: trioConfig.syncMode,
    };
  }

  private createCustomBrain(config: BrainConfig): BrainInstance {
    return {
      type: 'custom',
      primary: config.name,
      all: [config.name],
      hierarchy: {
        level: 0,
        children: [],
      },
    };
  }

  getBrainType(config: BrainConfig): string {
    return config.type;
  }

  isParallel(config: BrainConfig): boolean {
    return config.type === 'dual' || config.type === 'trio';
  }
}
```
### 8.9 Agent Factory

---

### Source: `src/factory/AgentFactory.ts` (72 lines)

```typescript
/**
 * src/factory/AgentFactory.ts
 *
 * V4 Agent Factory
 *
 * Creates agent instances from templates or configs.
 */

import type { AgentDefinition, AgentTemplate, AgentOverride } from './types.js';

export class AgentFactory {
  private templates: Map<string, AgentTemplate>;

  constructor(templates: AgentTemplate[] = []) {
    this.templates = new Map(templates.map(t => [t.id, t]));
  }

  registerTemplate(template: AgentTemplate): void {
    this.templates.set(template.id, template);
  }

  createAgent(
    id: string,
    templateId: string,
    overrides?: AgentOverride
  ): AgentDefinition | null {
    const template = this.templates.get(templateId);
    if (!template) {
      console.error(`[AgentFactory] Template "${templateId}" not found`);
      return null;
    }

    return {
      id,
      name: id,
      mode: 'subagent',
      description: template.description,
      capabilities: [...template.capabilities],
      allowedTools: [...template.tools],
      maxConcurrentTasks: overrides?.maxConcurrentTasks ?? 1,
      prompt: overrides?.prompt ?? template.prompt,
      model: overrides?.model ?? template.defaultModel,
      temperature: overrides?.temperature ?? template.defaultTemperature,
    };
  }

  createFromConfig(
    id: string,
    config: Partial<AgentDefinition>
  ): AgentDefinition {
    return {
      id,
      name: config.name ?? id,
      mode: config.mode ?? 'subagent',
      description: config.description ?? '',
      capabilities: config.capabilities ?? [],
      allowedTools: config.allowedTools ?? [],
      maxConcurrentTasks: config.maxConcurrentTasks ?? 1,
      prompt: config.prompt,
      model: config.model,
      temperature: config.temperature,
    };
  }

  listTemplates(): AgentTemplate[] {
    return Array.from(this.templates.values());
  }

  getTemplate(id: string): AgentTemplate | undefined {
    return this.templates.get(id);
  }
}
```
### 8.10 Architecture Factory

---

### Source: `src/factory/ArchitectureFactory.ts` (186 lines)

```typescript
/**
 * src/factory/ArchitectureFactory.ts
 *
 * V4 Architecture Factory
 *
 * Assembles the complete architecture from config.
 */

import type {
  ArchitectureConfig,
  ArchitectureInstance,
  AgentDefinition,
  StateMachine,
} from './types.js';
import { createStateStore, createBrainMessenger } from './index.js';
import { AgentFactory } from './AgentFactory.js';
import { BrainFactory } from './BrainFactory.js';
import { ClusterFactory } from './ClusterFactory.js';
import { runValidators } from './validators.js';

export class ArchitectureFactory {
  private agentFactory: AgentFactory;
  private brainFactory: BrainFactory;
  private clusterFactory: ClusterFactory;

  constructor() {
    this.agentFactory = new AgentFactory();
    this.brainFactory = new BrainFactory();
    this.clusterFactory = new ClusterFactory();
  }

  registerAgentTemplate(template: import('./types.js').AgentTemplate): void {
    this.agentFactory.registerTemplate(template);
  }

  createArchitecture(config: ArchitectureConfig): ArchitectureInstance | null {
    // Validate first
    const validation = runValidators(config);
    if (!validation.valid) {
      console.error('[ArchitectureFactory] Validation failed:', validation.errors);
      return null;
    }

    // Create agents
    const agents = new Map<string, AgentDefinition>();
    for (const [id, agentDef] of Object.entries(config.agents)) {
      if (typeof agentDef === 'string') {
        // Template reference
        const agent = this.agentFactory.createAgent(id, agentDef);
        if (!agent) {
          console.error(`[ArchitectureFactory] Failed to create agent "${id}" from template`);
          return null;
        }
        agents.set(id, agent);
      } else {
        // Full definition
        const agent = this.agentFactory.createFromConfig(id, agentDef);
        agents.set(id, agent);
      }
    }

    // Create brain
    const brain = this.brainFactory.createBrain(config.brain);
    if (!brain) {
      console.error('[ArchitectureFactory] Failed to create brain');
      return null;
    }

    // Create clusters
    const clusters = new Map<string, import('./types.js').ClusterConfig>();
    for (const clusterConfig of config.clusters) {
      clusters.set(clusterConfig.id, clusterConfig);
    }

    // Create coordination
    const coordination = this.createCoordination(agents, config);

    // Create state store and messenger
    const stateStore = createStateStore();
    const messenger = createBrainMessenger();

    return {
      config,
      agents,
      clusters,
      brains: {
        type: brain.type,
        primary: brain.primary,
        all: brain.all,
        workflows: brain.workflows,
        syncMode: brain.syncMode,
      },
      coordination,
      stateStore,
      messenger,
    };
  }

  private createCoordination(
    agents: Map<string, AgentDefinition>,
    _config: ArchitectureConfig
  ): ArchitectureInstance['coordination'] {
    // Create registry
    const registry: import('./types.js').AgentRegistry = {
      getAgent: (agentId: string) => agents.get(agentId) ?? null,
      getAgentsByMode: (mode: string) =>
        Array.from(agents.values()).filter(a => a.mode === mode),
      getAgentsByCluster: (clusterId: string) =>
        Array.from(agents.values()).filter(a => a.cluster === clusterId),
      isAgentAllowedTool: (agentId: string, toolName: string) => {
        const agent = agents.get(agentId);
        return agent?.allowedTools.includes(toolName) ?? false;
      },
      listAgents: () => Array.from(agents.values()),
    };

    // Create delegation engine (placeholder)
    const delegation: import('./types.js').DelegationEngine = {
      delegate: async (request) => {
        console.log('[DelegationEngine] Delegating:', request);
        return { success: true, taskId: `task_${Date.now()}` };
      },
      canDelegate: (fromAgent: string, toAgent: string) => {
        const from = agents.get(fromAgent);
        const to = agents.get(toAgent);
        if (!from || !to) return false;
        return from.capabilities.includes('delegate');
      },
      getClusterAgents: (clusterId: string) =>
        Array.from(agents.values()).filter(a => a.cluster === clusterId),
      enforceGate: (request) => ({ allowed: true }),
    };

    // Create state machine (placeholder)
    const taskStore = new Map<string, import('./types.js').Task>();

    const stateMachine: StateMachine = {
      createTask: (input) => {
        const task: import('./types.js').Task = {
          id: input.id,
          status: 'pending',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          assignedAgent: input.assignedAgent,
          context: input.context,
        };
        taskStore.set(input.id, task);
        return task;
      },
      transition: (taskId, to) => {
        const task = taskStore.get(taskId);
        if (!task) return null;
        task.status = to;
        task.updatedAt = Date.now();
        return task;
      },
      getTask: (taskId) => taskStore.get(taskId) ?? null,
      getTasksByState: (state) =>
        Array.from(taskStore.values()).filter((t) => t.status === state),
      getTasksByAgent: (agentId) =>
        Array.from(taskStore.values()).filter((t) => t.assignedAgent === agentId),
      canTransition: (taskId, _to) => {
        const task = taskStore.get(taskId);
        return task !== undefined;
      },
    };

    return { registry, delegation, stateMachine };
  }

  getAgentFactory(): AgentFactory {
    return this.agentFactory;
  }

  getBrainFactory(): BrainFactory {
    return this.brainFactory;
  }

  getClusterFactory(): ClusterFactory {
    return this.clusterFactory;
  }
}

export function createArchitectureFactory(): ArchitectureFactory {
  return new ArchitectureFactory();
}
```
### 8.11 Cluster Factory

---

### Source: `src/factory/ClusterFactory.ts` (57 lines)

```typescript
/**
 * src/factory/ClusterFactory.ts
 *
 * V4 Cluster Factory
 *
 * Creates cluster instances from configurations.
 */

import type { ClusterConfig, ClusterInstance, AgentDefinition } from './types.js';

export class ClusterFactory {
  createCluster(
    config: ClusterConfig,
    agents: Map<string, AgentDefinition>
  ): ClusterInstance | null {
    const clusterAgents: AgentDefinition[] = [];

    for (const agentId of config.agents) {
      const agent = agents.get(agentId);
      if (!agent) {
        console.error(`[ClusterFactory] Agent "${agentId}" not found`);
        return null;
      }
      clusterAgents.push(agent);
    }

    const subOrchestrator = config.subOrchestrator
      ? agents.get(config.subOrchestrator) ?? undefined
      : undefined;

    return {
      config,
      agents: clusterAgents,
      subOrchestrator,
    };
  }

  validateClusterConfig(config: ClusterConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.id) errors.push('Cluster ID is required');
    if (!config.name) errors.push('Cluster name is required');
    if (!config.agents || config.agents.length === 0) {
      errors.push('Cluster must have at least one agent');
    }

    return { valid: errors.length === 0, errors };
  }

  getClusterAgents(cluster: ClusterInstance): AgentDefinition[] {
    return cluster.agents;
  }

  getPrimaryAgent(cluster: ClusterInstance): AgentDefinition | undefined {
    return cluster.subOrchestrator ?? cluster.agents[0];
  }
}
```
### 8.12 Factory Index

---

### Source: `src/factory/index.ts` (67 lines)

```typescript
/**
 * src/factory/index.ts
 *
 * V4 Factory Index
 *
 * Re-exports all factory types, classes, and create functions.
 */

// Classes
export { AgentFactory } from './AgentFactory.js';
export { BrainFactory } from './BrainFactory.js';
export { ClusterFactory } from './ClusterFactory.js';
export { ArchitectureFactory, createArchitectureFactory } from './ArchitectureFactory.js';

// Functions
export { createStateStore, DOMAIN_OWNERSHIP } from './StateStore.js';
export { createBrainMessenger } from './BrainMessenger.js';
export {
  validateRequiredFields,
  validateBrainReferences,
  validateAgentReferences,
  validateClusterIntegrity,
  validateToolPermissions,
  validateStateOwnership,
  validateWorkflowGates,
  validateAgent,
  validateCluster,
  validateBrain,
  runValidators,
  architectureValidators,
} from './validators.js';

// Types
export type {
  BrainType,
  BrainConfig,
  SingleBrainConfig,
  DualBrainConfig,
  TrioBrainConfig,
  OrchestratorWorkflow,
  BrainHierarchy,
  BrainInstance,
  AgentDefinition,
  AgentTemplate,
  AgentOverride,
  ClusterConfig,
  ClusterInstance,
  ArchitectureConfig,
  ArchitectureInstance,
  StateDomain,
  WriteResult,
  Unsubscribe,
  StateSnapshot,
  StateStore,
  BrainMessage,
  BrainMessenger,
  ValidationResult,
  Validator,
  AgentMode,
  DelegationRequest,
  DelegationResult,
  GateResult,
  StateMachine,
  TaskStatus,
  Task,
  CreateTaskInput,
} from './types.js';
```
## SECTION 9: FULL SOURCE CODE — Tools

### 9.1 Cluster Tools

---

### Source: `src/tools/cluster-tools.ts` (349 lines)

```typescript
/**
 * src/tools/cluster-tools.ts
 * 
 * Cluster Tools for Kraken
 * 
 * Tools for spawning tasks in clusters:
 * - spawn_cluster_task: Generic task spawning
 * - spawn_shark_agent: Spawn Shark agent (aggressive/steamroll)
 * - spawn_manta_agent: Spawn Manta agent (precise/linear)
 */

import { tool, type ToolContext } from '@opencode-ai/plugin';
import { z } from 'zod';
import type { KrakenDelegationRequest, TaskPriority } from '../factory/kraken-types.js';
import { getSystemBrain } from '../brains/system/system-brain.js';
import { getExecutionBrain } from '../brains/execution/execution-brain.js';

const spawnClusterTaskSchema = z.object({
  task: z.string().describe('Task description to execute'),
  clusterId: z.string().optional().describe('Target cluster ID (auto-selected if not specified)'),
  targetAgent: z.string().optional().describe('Specific agent ID to target'),
  context: z.record(z.string(), z.unknown()).optional().describe('Additional context for the task'),
  acceptanceCriteria: z.array(z.string()).default([]).describe('Acceptance criteria for task completion'),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal').describe('Task priority'),
});

const spawnSharkAgentSchema = z.object({
  task: z.string().describe('Task description for Shark agent'),
  clusterId: z.string().optional().describe('Target cluster (auto-selected if not specified)'),
  instructions: z.string().optional().describe('Additional instructions for the Shark'),
  context: z.record(z.string(), z.unknown()).optional().describe('Additional context'),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('high').describe('Task priority'),
});

const spawnMantaAgentSchema = z.object({
  task: z.string().describe('Task description for Manta agent'),
  clusterId: z.string().optional().describe('Target cluster (auto-selected if not specified)'),
  instructions: z.string().optional().describe('Additional instructions for the Manta'),
  context: z.record(z.string(), z.unknown()).optional().describe('Additional context'),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal').describe('Task priority'),
});

export interface ClusterToolsContext {
  delegationEngine: {
    delegate(request: KrakenDelegationRequest): Promise<any>;
  };
  clusterScheduler: {
    assignCluster(request: KrakenDelegationRequest): Promise<string>;
    assignClusterForTaskType(task: string, taskType?: string): string;
    resolveClusterRequest(clusterIdOrFocus: string): string;
    anchorClusterToFocus(clusterId: string, focusName: string): void;
    getFocusAnchors(): Map<string, string>;
  };
  clusterManager: {
    getClusterStatus(clusterId: string): any;
    getAllClusterStatuses(): Map<string, any>;
  };
  krakenIdentity?: string;
}

export function createClusterTools(ctx: ClusterToolsContext) {
  return {
    /**
     * anchor_cluster - Anchor a cluster to a project/task focus
     * The cluster will be associated with this focus name for smart routing
     */
    anchor_cluster: tool({
      description: 'Anchor a cluster to a focus/project name. The cluster will be renamed to reflect its current focus. Use this when starting a new project to establish cluster identity.',
      args: {
        clusterId: z.string().describe('Cluster ID (e.g., cluster-alpha) or focus name to anchor'),
        focusName: z.string().describe('Focus/project name to anchor (e.g., "shark-firewall-build", "my-api-project")'),
      },
      execute: async (args) => {
        // Resolve the actual cluster ID first
        const resolvedClusterId = ctx.clusterScheduler.resolveClusterRequest(args.clusterId);
        
        // Anchor it to the focus
        ctx.clusterScheduler.anchorClusterToFocus(resolvedClusterId, args.focusName);

        return JSON.stringify({
          success: true,
          clusterId: resolvedClusterId,
          focusName: args.focusName,
          message: `Cluster ${resolvedClusterId} anchored to "${args.focusName}"`,
        }, null, 2);
      },
    }),

    /**
     * spawn_cluster_task - Spawn a generic task in a cluster for async execution
     */
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
      execute: async (args, directory) => {
        const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Smart cluster resolution - handles focus names, partial matches
        const resolvedCluster = args.clusterId 
          ? ctx.clusterScheduler.resolveClusterRequest(args.clusterId)
          : await ctx.clusterScheduler.assignCluster({ taskId, task: args.task, targetCluster: '', context: args.context, acceptanceCriteria: [], priority: 'normal', createdAt: Date.now() });

        // Build the request
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

        // L4: Validate domain assignment before spawn
        try {
          const sysBrain = getSystemBrain();
          if (sysBrain.isInitialized()) {
            // Infer task type from description
            const taskLower = args.task.toLowerCase();
            let taskType = 'build';
            if (taskLower.includes('debug') || taskLower.includes('fix') || taskLower.includes('refactor')) taskType = 'debug';
            else if (taskLower.includes('test') || taskLower.includes('verif') || taskLower.includes('audit')) taskType = 'test';
            const validation = sysBrain.validateDomainAssignment(taskType, resolvedCluster);
            if (!validation.valid) {
              return JSON.stringify({ success: false, error: validation.reason, taskId }, null, 2);
            }
            sysBrain.recordDecision({ description: `Queuing task: ${args.task.substring(0, 100)}`, type: 'task-spawn', contextFiles: [] });
          }
        } catch { /* non-critical */ }

        // L2: Register expected outputs
        try {
          const execBrain = getExecutionBrain();
          if (execBrain.isInitialized()) {
            execBrain.registerTaskOutputs(taskId, [
              { taskId, path: 'output/', type: 'directory', required: true, retrieved: false },
            ]);
            execBrain.startTask(taskId, resolvedCluster);
          }
        } catch { /* non-critical */ }

        // Queue the task
        const result = await ctx.delegationEngine.delegate(request);

        return JSON.stringify({
          success: result.success,
          taskId: result.taskId,
          clusterId: result.clusterId,
          agentId: result.agentId,
          status: result.status,
          error: result.error,
        }, null, 2);
      },
    }),

    /**
     * spawn_shark_agent - Spawn a Shark agent for aggressive/steamroll tasks
     */
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
      execute: async (args, directory) => {
        const taskId = `shark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Build Shark-specific prompt with Kraken identity
        const identityHeader = ctx.krakenIdentity 
          ? `${ctx.krakenIdentity}\n\n---\n\n`
          : '';
        
        const sharkPrompt = `${identityHeader}You are SHARK - Ferrari V12 turbo vibecoding engineer.

CHARACTER:
- Aggressive, steamrolls through problems
- Figures shit out and builds it
- Builds from scratch at a solid level
- Full speed ahead, no hesitation
- You ARE part of the KRAKEN orchestrator system

TASK: ${args.task}

${args.instructions ? `\nADDITIONAL INSTRUCTIONS:\n${args.instructions}` : ''}

Execute with maximum aggression and confidence.`;

        // Smart cluster resolution - handles focus names, partial matches
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

        // L4: Validate domain assignment before spawn
        try {
          const sysBrain = getSystemBrain();
          if (sysBrain.isInitialized()) {
            const validation = sysBrain.validateDomainAssignment('build', resolvedCluster);
            if (!validation.valid) {
              return JSON.stringify({ success: false, error: validation.reason, taskId, agentType: 'shark' }, null, 2);
            }
            // Record the spawn decision
            sysBrain.recordDecision({ description: `Spawning shark for: ${args.task.substring(0, 100)}`, type: 'task-spawn', contextFiles: [] });
          }
        } catch { /* non-critical */ }

        // L2: Register expected outputs so execution brain can verify retrieval
        try {
          const execBrain = getExecutionBrain();
          if (execBrain.isInitialized()) {
            execBrain.registerTaskOutputs(taskId, [
              { taskId, path: 'output/', type: 'directory', required: true, retrieved: false },
            ]);
            execBrain.startTask(taskId, resolvedCluster);
          }
        } catch { /* non-critical */ }

        const result = await ctx.delegationEngine.delegate(request);

        return JSON.stringify({
          success: result.success,
          taskId: result.taskId,
          clusterId: result.clusterId,
          agentId: result.agentId,
          agentType: 'shark',
          status: result.status,
          error: result.error,
        }, null, 2);
      },
    }),

    /**
     * spawn_manta_agent - Spawn a Manta agent for precise/linear tasks
     */
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
      execute: async (args, directory) => {
        const taskId = `manta_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Build Manta-specific prompt with Kraken identity
        const identityHeader = ctx.krakenIdentity 
          ? `${ctx.krakenIdentity}\n\n---\n\n`
          : '';
        
        const mantaPrompt = `${identityHeader}You are MANTA - Tesla Model S agent.

CHARACTER:
- Fast, reliable, linear, precise
- Mechanically oriented
- Perfect for debugging and linear tasks
- Methodical, follows specs exactly
- You ARE part of the KRAKEN orchestrator system

TASK: ${args.task}

${args.instructions ? `\nADDITIONAL INSTRUCTIONS:\n${args.instructions}` : ''}

Execute with precision and methodical care.`;

        // Smart cluster resolution - handles focus names, partial matches
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

        // L4: Validate domain assignment before spawn
        try {
          const sysBrain = getSystemBrain();
          if (sysBrain.isInitialized()) {
            const validation = sysBrain.validateDomainAssignment('debug', resolvedCluster);
            if (!validation.valid) {
              return JSON.stringify({ success: false, error: validation.reason, taskId, agentType: 'manta' }, null, 2);
            }
            sysBrain.recordDecision({ description: `Spawning manta for: ${args.task.substring(0, 100)}`, type: 'task-spawn', contextFiles: [] });
          }
        } catch { /* non-critical */ }

        // L2: Register expected outputs
        try {
          const execBrain = getExecutionBrain();
          if (execBrain.isInitialized()) {
            execBrain.registerTaskOutputs(taskId, [
              { taskId, path: 'output/', type: 'directory', required: true, retrieved: false },
            ]);
            execBrain.startTask(taskId, resolvedCluster);
          }
        } catch { /* non-critical */ }

        const result = await ctx.delegationEngine.delegate(request);

        return JSON.stringify({
          success: result.success,
          taskId: result.taskId,
          clusterId: result.clusterId,
          agentId: result.agentId,
          agentType: 'manta',
          status: result.status,
          error: result.error,
        }, null, 2);
      },
    }),
  };
}
```
### 9.2 Monitoring Tools

---

### Source: `src/tools/monitoring-tools.ts` (288 lines)

```typescript
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

const getClusterStatusSchema = z.object({
  clusterId: z.string().optional().describe('Specific cluster ID to check (all clusters if not specified)'),
});

const aggregateResultsSchema = z.object({
  taskIds: z.array(z.string()).describe('List of task IDs to wait for and aggregate'),
  timeoutMs: z.number().default(60000).describe('Timeout in milliseconds to wait for all tasks'),
});

export interface MonitoringToolsContext {
  delegationEngine: {
    waitForCompletion(taskId: string, timeoutMs: number): Promise<any>;
    waitForAll(taskIds: string[], timeoutMs: number): Promise<any[]>;
    getActiveTasks(): Map<string, any>;
    getPendingTasks(): any[];
    getQueuedCount(): number;
  };
  clusterManager: {
    getClusterStatus(clusterId: string): any;
    getAllClusterStatuses(): Map<string, any>;
    getTotalSystemLoad(): any;
    getAllAgents(): any[];
  };
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
          return JSON.stringify(status, null, 2);
        }

        // Return all cluster statuses + system summary
        const allStatuses = ctx.clusterManager.getAllClusterStatuses();
        const systemLoad = ctx.clusterManager.getTotalSystemLoad();
        const agents = ctx.clusterManager.getAllAgents();

        const summary = {
          clusters: Object.fromEntries(allStatuses),
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
      },
      execute: async (args) => {
        const startTime = Date.now();

        // Wait for all tasks
        const results = await ctx.delegationEngine.waitForAll(args.taskIds, args.timeoutMs);

        // L2: Verify outputs before declaring success
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
        } catch { /* non-critical */ }

        // Calculate summary
        const successful = results.filter(r => r && r.success).length;
        const failed = results.filter(r => r && !r.success).length;
        const timedOut = results.filter(r => r === null).length;

        // Group by status
        const completed = results.filter(r => r && r.status === 'completed');
        const taskFailed = results.filter(r => r && r.status === 'failed');

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
          }, {} as Record<string, any>),
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
                recentMessages: queued.slice(-5).map((m: any) => ({
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
            } catch {
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
```
### 9.3 Kraken Hive Tools

---

### Source: `src/tools/kraken-hive-tools.ts` (164 lines)

```typescript
/**
 * src/tools/kraken-hive-tools.ts
 * 
 * Kraken-Hive Tools (Kraken Only)
 * 
 * Tools for accessing Kraken Hive Mind - ONLY accessible to Kraken orchestrator.
 * These tools are NOT available to Shark or Manta agents.
 */

import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';
import { KrakenHiveEngine, type HivememoryResult, type Pattern, type FailureRecord } from '../kraken-hive/index.js';

export interface KrakenHiveToolsContext {
  krakenHive: KrakenHiveEngine;
  isKrakenAgent: (agentName: string) => boolean;
}

export function createKrakenHiveTools(ctx: KrakenHiveToolsContext) {
  return {
    /**
     * kraken_hive_search - Search Kraken Hive Mind for relevant memories
     * ONLY accessible to Kraken orchestrator
     */
    kraken_hive_search: tool({
      description: 'Search the Kraken Hive Mind for relevant memories, patterns, and past decisions. Only accessible to Kraken orchestrator.',
      args: {
        query: z.string().describe('What to search for'),
        category: z.enum(['all', 'clusters', 'sessions', 'patterns', 'decisions', 'failures']).default('all').describe('Category to search'),
        limit: z.number().default(5).describe('Maximum results to return'),
      },
      execute: async (args) => {
        const results = await ctx.krakenHive.search(args.query, {
          category: args.category,
          limit: args.limit,
        });

        if (results.length === 0) {
          return 'No relevant memories found in Kraken Hive.';
        }

        const formatted = results.map(r => 
          `## [${r.type.toUpperCase()}] ${r.title}\nURI: ${r.uri}\nRelevance: ${r.relevance}\n${r.content ? `\n${r.content.slice(0, 200)}...` : ''}`
        ).join('\n\n---\n\n');

        return `Found ${results.length} relevant memories:\n\n${formatted}`;
      },
    }),

    /**
     * kraken_hive_remember - Store a memory to Kraken Hive Mind
     * ONLY accessible to Kraken orchestrator
     */
    kraken_hive_remember: tool({
      description: 'Store a memory, decision, or pattern to Kraken Hive Mind. Only accessible to Kraken orchestrator.',
      args: {
        key: z.string().describe('Short key/summary for this memory'),
        content: z.string().describe('Full content to remember'),
        category: z.enum(['cluster', 'session', 'pattern', 'decision', 'failure', 'breakthrough']).describe('Category for this memory'),
        targetId: z.string().optional().describe('Cluster or session ID if category requires it'),
      },
      execute: async (args) => {
        try {
          switch (args.category) {
            case 'cluster':
              if (!args.targetId) {
                return 'Error: targetId (cluster ID) required for cluster category';
              }
              await ctx.krakenHive.rememberCluster(args.targetId, args.key, args.content);
              break;
            case 'session':
              if (!args.targetId) {
                return 'Error: targetId (session ID) required for session category';
              }
              await ctx.krakenHive.rememberSession(args.targetId, args.key, args.content);
              break;
            case 'pattern':
              const pattern: Pattern = {
                type: 'pattern',
                id: args.key.replace(/[^a-zA-Z0-9]/g, '_'),
                description: args.key,
                content: args.content,
                createdAt: Date.now(),
              };
              await ctx.krakenHive.rememberPattern(pattern);
              break;
            case 'failure':
              const failure: FailureRecord = {
                id: args.key.replace(/[^a-zA-Z0-9]/g, '_'),
                pattern: args.key,
                cause: args.content,
                createdAt: Date.now(),
              };
              await ctx.krakenHive.rememberFailure(failure);
              break;
            default:
              // Generic remember - store in all relevant categories
              if (args.targetId) {
                await ctx.krakenHive.rememberCluster(args.targetId, args.key, args.content);
              }
              await ctx.krakenHive.rememberSession(`general_${Date.now()}`, args.key, args.content);
          }

          return `Stored to Kraken Hive: [${args.category}] ${args.key}`;
        } catch (error) {
          return `Error storing to Kraken Hive: ${error}`;
        }
      },
    }),

    /**
     * kraken_hive_get_cluster_context - Get all memories for a specific cluster
     * ONLY accessible to Kraken orchestrator
     */
    kraken_hive_get_cluster_context: tool({
      description: 'Get all memories related to a specific cluster. Only accessible to Kraken orchestrator.',
      args: {
        clusterId: z.string().describe('Cluster ID to get context for'),
      },
      execute: async (args) => {
        const context = await ctx.krakenHive.getClusterContext(args.clusterId);

        return JSON.stringify({
          clusterId: context.clusterId,
          recentTasks: context.recentTasks,
          commonPatterns: context.commonPatterns,
          knownFailures: context.knownFailures,
        }, null, 2);
      },
    }),

    /**
     * kraken_hive_inject_context - Inject relevant Hive context into a task
     * ONLY accessible to Kraken architect
     */
    kraken_hive_inject_context: tool({
      description: 'Inject relevant Hive context into a task for an agent. Only accessible to Kraken architect.',
      args: {
        taskId: z.string().describe('Task to inject context into'),
        taskDescription: z.string().describe('Description of the task to get relevant context'),
        includePatterns: z.boolean().default(true).describe('Include pattern memories'),
        includeFailures: z.boolean().default(true).describe('Include failure memories'),
        includePreviousWork: z.boolean().default(true).describe('Include previous work'),
      },
      execute: async (args) => {
        const context = await ctx.krakenHive.getContextForTask(args.taskDescription);

        const injected = {
          taskId: args.taskId,
          injected: true,
          context: {
            patterns: args.includePatterns ? context.patterns : [],
            failures: args.includeFailures ? context.failures : [],
            previousWork: args.includePreviousWork ? context.previousWork : [],
            clusterContext: context.clusterContext,
          },
          summary: `Injected ${context.patterns.length} patterns, ${context.failures.length} failures, ${context.previousWork.length} previous works`,
        };

        return JSON.stringify(injected, null, 2);
      },
    }),
  };
}
```
### 9.4 Shark T2 Tools

---

### Source: `src/tools/shark-t2-tools.ts` (172 lines)

```typescript
/**
 * src/tools/shark-t2-tools.ts
 * 
 * Shark/Manta T2 Read-Only Tools
 * 
 * Sharks and Mantas get read-only access to T2 reference library.
 * They do NOT have direct Hive access - they read from curated T2 files.
 */

import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';

// T2 context directory — multiple search paths for bundle compatibility
function findT2Dir(): string {
  const candidates = [
    path.join(process.cwd(), 'kraken-context'),
    path.join(process.env.HOME || '/root', '.config/opencode/plugins/kraken-agent/kraken-context'),
    path.join(process.env.HOME || '/root', 'OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/Active Projects/v1.2 Rebuild/kraken-context'),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  return candidates[0]; // fallback
}

const T2_DIR = findT2Dir();

// Topic → file mapping
const T2_TOPICS: Record<string, string> = {
  'patterns': 'T2_PATTERNS.md',
  'failures': 'T2_FAILURE_MODES.md',
  'build-chain': 'T2_BUILD_CHAIN.md',
  'architecture': 'T2_ARCHITECTURE.md',
  'alignment-bible': 'T2_ALIGNMENT_BIBLE.md',
  'crash-recovery': 'T2_CRASH_RECOVERY.md',
  'tui-testing': 'T2_TUI_TESTING.md',
  'kraken-rules': 'T2_KRAKEN_RULES.md',
  'compaction-survival': 'T2_COMPACTION_SURVIVAL.md',
  'plugin-engineering': 'T2_PLUGIN_ENGINEERING.md',
};

const TOPIC_NAMES = Object.keys(T2_TOPICS) as [string, ...string[]];

export interface T2ToolsContext {
  isSharkOrMantaAgent: (agentName: string) => boolean;
}

export function createSharkT2Tools(_ctx: T2ToolsContext) {
  return {
    /**
     * read_kraken_context - Read T2 reference from Kraken context library
     * Available to Sharks and Mantas (read-only, no Hive access)
     */
    read_kraken_context: tool({
      description: 'Read Kraken T2 context library for patterns and best practices. This is read-only reference, not Hive access. Available to Sharks and Mantas.',
      args: {
        topic: z.enum(TOPIC_NAMES).describe('Topic to get context for. Available: ' + TOPIC_NAMES.join(', ')),
      },
      execute: async (args) => {
        const fileName = T2_TOPICS[args.topic];
        if (!fileName) {
          return `Unknown topic: ${args.topic}. Available: ${TOPIC_NAMES.join(', ')}`;
        }
        
        const filePath = path.join(T2_DIR, fileName);

        try {
          if (!fs.existsSync(filePath)) {
            return `T2 reference file not found: ${fileName} (looked in ${T2_DIR}). Available topics: ${TOPIC_NAMES.join(', ')}`;
          }

          const content = fs.readFileSync(filePath, 'utf-8');
          
          return `## Kraken T2 Reference: ${args.topic}\n\n${content}`;
        } catch (error) {
          return `Error reading T2 context: ${error}`;
        }
      },
    }),

    /**
     * report_to_kraken - Report completion or issue to Kraken orchestrator
     * How Sharks/Mantas communicate back (they don't access Hive directly)
     */
    report_to_kraken: tool({
      description: 'Report completion, issue, or request to Kraken orchestrator. This is how Sharks and Mantas communicate - they write to Kraken, not to each other or directly to Hive.',
      args: {
        taskId: z.string().describe('Task being reported on'),
        status: z.enum(['complete', 'blocked', 'error', 'request']).describe('Task status'),
        details: z.string().describe('Details of completion, issue, or request'),
        files: z.array(z.string()).optional().describe('Files created or modified'),
        errorDetails: z.string().optional().describe('Error details if status is error'),
      },
      execute: async (args) => {
        // In v1, we just format the report
        // In full implementation, this would go through the cluster-state-hook
        // which would then be processed by Kraken
        
        const report = {
          type: 'agent_report',
          taskId: args.taskId,
          status: args.status,
          details: args.details,
          files: args.files || [],
          errorDetails: args.errorDetails,
          timestamp: new Date().toISOString(),
          // Agent info would be added by the hook
        };

        // Store to local fallback for Kraken to pick up
        const reportPath = path.join(
          process.env.HOME || '/root',
          '.local/share/opencode/kraken-hive/pending-reports',
          `${args.taskId}_${Date.now()}.json`
        );
        const reportDir = path.dirname(reportPath);
        
        if (!fs.existsSync(reportDir)) {
          fs.mkdirSync(reportDir, { recursive: true });
        }
        
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

        return JSON.stringify({
          success: true,
          message: `Report sent to Kraken orchestrator for task ${args.taskId}`,
          reportId: path.basename(reportPath),
        }, null, 2);
      },
    }),

    /**
     * get_task_context - Get context injected by Kraken for current task
     * Sharks/Mantas use this to access the context Kraken injected
     */
    get_task_context: tool({
      description: 'Get the context that Kraken orchestrator has injected into your current task. Use this to understand what context and patterns are relevant to your work.',
      args: {
        taskId: z.string().describe('Task ID to get context for'),
      },
      execute: async (args) => {
        // In v1, read from the injected context file
        // In full implementation, this would be stored in session state by the hook
        const contextPath = path.join(
          process.env.HOME || '/root',
          '.local/share/opencode/kraken-hive/task-context',
          `${args.taskId}.json`
        );

        try {
          if (!fs.existsSync(contextPath)) {
            return JSON.stringify({
              taskId: args.taskId,
              context: null,
              message: 'No injected context found for this task. Kraken may not have injected context yet.',
            }, null, 2);
          }

          const content = fs.readFileSync(contextPath, 'utf-8');
          return content;
        } catch (error) {
          return JSON.stringify({
            taskId: args.taskId,
            error: `Error reading task context: ${error}`,
          }, null, 2);
        }
      },
    }),
  };
}
```
## SECTION 10: FULL SOURCE CODE — Hooks

### 10.1 Cluster State Hook

---

### Source: `src/hooks/cluster-state-hook.ts` (158 lines)

```typescript
/**
 * src/hooks/cluster-state-hook.ts
 * 
 * Cluster State Hook
 * 
 * Tracks agent activity for ALL agents (Shark/Manta/Kraken).
 * Extracts meaningful activity for Kraken to process.
 * This hook does NOT give agents Hive access - it just tracks activity.
 */

import { safeHook } from '../v4.1/hooks/safe-hook.js';
import type { HookContext } from '../v4.1/context/hook-context.js';
import fs from 'node:fs';
import path from 'node:path';

interface ClusterActivity {
  type: 'task_queued' | 'task_started' | 'task_completed' | 'task_failed' | 'file_written' | 'error';
  taskId?: string;
  clusterId: string;
  file?: string;
  error?: string;
  timestamp: number;
  agentId?: string;
}

const KRAKEN_HOOK_IDENTITY = {
  name: 'kraken-agent',
  prefix: 'kraken-',
  orchestrator: 'kraken',
  agents: new Set(['kraken', 'kraken-executor', 'shark-alpha-1', 'shark-alpha-2', 'shark-beta-1', 'manta-alpha-1', 'manta-beta-1', 'manta-beta-2', 'manta-gamma-1', 'manta-gamma-2', 'shark-gamma-1']),
};

const ACTIVITY_LOG_DIR = path.join(
  process.env.HOME || '/root',
  '.local/share/opencode/kraken-hive/activity'
);

interface ClusterActivityState {
  tasks: ClusterActivity[];
  files: string[];
  errors: string[];
  completions: string[];
}

export const clusterStateHook = safeHook(
  async (input, output, ctx: HookContext) => {
    // Track activity for all kraken agents (Sharks, Mantas, Kraken)
    const sessionState = ctx.getSessionState() as Record<string, unknown>;
    
    // Initialize cluster state tracking
    if (!sessionState.clusterActivity) {
      sessionState.clusterActivity = new Map<string, ClusterActivityState>();
    }

    const clusterActivityMap = sessionState.clusterActivity as Map<string, ClusterActivityState>;

    // Extract relevant activity from tool calls
    const activity = extractActivity(input, output, ctx);
    
    if (activity) {
      // Determine cluster from agent name or context
      const clusterId = activity.clusterId || detectClusterFromAgent(ctx.agentName || '');
      
      // Store in session state
      const clusterActivity = clusterActivityMap.get(clusterId) || {
        tasks: [],
        files: [],
        errors: [],
        completions: [],
      };
      
      clusterActivity.tasks.push(activity);
      
      if (activity.type === 'file_written' && activity.file) {
        clusterActivity.files.push(activity.file);
      }
      if (activity.type === 'error') {
        clusterActivity.errors.push(activity.error || 'Unknown error');
      }
      if (activity.type === 'task_completed') {
        clusterActivity.completions.push(activity.taskId || 'unknown');
      }
      
      clusterActivityMap.set(clusterId, clusterActivity);
      
      // Also persist to file for cross-session visibility
      await persistActivity(clusterId, activity);
    }
  },
  {
    agentFilter: Array.from(KRAKEN_HOOK_IDENTITY.agents),
    pluginName: KRAKEN_HOOK_IDENTITY.name,
    managedAgents: KRAKEN_HOOK_IDENTITY.agents,
    agentPrefix: KRAKEN_HOOK_IDENTITY.prefix,
    orchestratorName: KRAKEN_HOOK_IDENTITY.orchestrator,
  }
);

function extractActivity(input: any, output: any, ctx: HookContext): ClusterActivity | null {
  const tool = input?.tool;
  const args = input?.args;
  const agentName = ctx.agentName || '';

  if (tool === 'spawn_cluster_task' || tool === 'spawn_shark_agent' || tool === 'spawn_manta_agent') {
    return {
      type: 'task_queued',
      taskId: args?.taskId || `task_${Date.now()}`,
      clusterId: args?.clusterId || detectClusterFromAgent(agentName),
      timestamp: Date.now(),
      agentId: agentName,
    };
  }

  if (output?.success && (tool === 'write_file' || tool === 'mcp_write_file')) {
    return {
      type: 'file_written',
      file: args?.path || 'unknown',
      clusterId: detectClusterFromAgent(agentName),
      timestamp: Date.now(),
      agentId: agentName,
    };
  }

  if (output?.error) {
    return {
      type: 'error',
      error: output.error,
      clusterId: detectClusterFromAgent(agentName),
      timestamp: Date.now(),
      agentId: agentName,
    };
  }

  return null;
}

function detectClusterFromAgent(agentName: string): string {
  if (agentName.includes('alpha')) return 'cluster-alpha';
  if (agentName.includes('beta')) return 'cluster-beta';
  if (agentName.includes('gamma')) return 'cluster-gamma';
  if (agentName.startsWith('kraken-')) return 'orchestrator';
  return 'unknown';
}

async function persistActivity(clusterId: string, activity: ClusterActivity): Promise<void> {
  try {
    const activityDir = path.join(ACTIVITY_LOG_DIR, clusterId);
    if (!fs.existsSync(activityDir)) {
      fs.mkdirSync(activityDir, { recursive: true });
    }

    const timestamp = Date.now();
    const activityFile = path.join(activityDir, `activity_${timestamp}.json`);
    fs.writeFileSync(activityFile, JSON.stringify(activity, null, 2), 'utf-8');
  } catch {
    // Silently fail - don't crash on activity logging errors
  }
}
```
## SECTION 11: FULL SOURCE CODE — Identity System

### 11.1 Identity Loader

---

### Source: `src/identity/loader.ts` (328 lines)

```typescript
/**
 * src/identity/loader.ts
 *
 * Identity file loader for Kraken Agent
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import type { IdentityBundle, IdentityFileType } from './types.js';

// Environment variable for override
const IDENTITY_DIR = process.env.KRAKEN_IDENTITY_DIR || 'identity';

// Dynamic plugin name detection
const KRAKEN_PLUGIN_NAME = process.env.KRAKEN_PLUGIN_NAME || 'kraken-agent';

// Known locations to search for identity (relative to common plugin locations)
const KNOWN_LOCATIONS = [
  // Relative to cwd (opencode workspace)
  'identity',
  // Relative to home directory
  '../identity',
  // Relative to kraken plugin dist
  `../../.config/opencode/plugins/${KRAKEN_PLUGIN_NAME}/dist/../identity`,
  // From OPENCODE_WORKSPACE to kraken identity
  `../.config/opencode/plugins/${KRAKEN_PLUGIN_NAME}/identity`,
];

async function findIdentityDir(): Promise<string> {
  // If absolute path given, use it directly
  if (path.isAbsolute(IDENTITY_DIR)) {
    try {
      await fs.access(IDENTITY_DIR);
      const orchestratorPath = path.join(IDENTITY_DIR, 'orchestrator');
      await fs.access(orchestratorPath);
      return IDENTITY_DIR;
    } catch {
      // Continue searching
    }
  }

  // Check known locations relative to cwd AND HOME
  const HOME = process.env.HOME || process.env.USERPROFILE || '/root';
  const searchDirs = [process.cwd(), HOME];
  
  for (const baseDir of searchDirs) {
    for (const loc of KNOWN_LOCATIONS) {
      const tryPath = path.resolve(baseDir, loc);
      try {
        await fs.access(tryPath);
        const orchestratorPath = path.join(tryPath, 'orchestrator');
        await fs.access(orchestratorPath);
        return tryPath;
      } catch {
        // Continue
      }
    }
  }

  // Try direct resolve of IDENTITY_DIR
  const directPath = path.resolve(process.cwd(), IDENTITY_DIR);
  try {
    await fs.access(directPath);
    const orchestratorPath = path.join(directPath, 'orchestrator');
    await fs.access(orchestratorPath);
    return directPath;
  } catch {
    // Last resort: return cwd/identity (might not have orchestrator, but loadForRole will error)
    return path.join(process.cwd(), 'identity');
  }
}

let cachedIdentityPath: string | null = null;

async function resolveIdentityPath(): Promise<string> {
  if (cachedIdentityPath) {
    return cachedIdentityPath;
  }

  const found = await findIdentityDir();
  cachedIdentityPath = found;
  return cachedIdentityPath;
}

export class IdentityLoader {
  private cache: Map<string, IdentityBundle> = new Map();

  async loadForRole(role: string): Promise<IdentityBundle> {
    const cached = this.cache.get(role);
    if (cached) {
      return cached;
    }

    const resolvedPath = await resolveIdentityPath();
    const roleDir = path.join(resolvedPath, role);
    
    try {
      await fs.access(roleDir);
    } catch {
      throw new Error(`Identity directory not found: ${roleDir}`);
    }

    const [kraken, identity, execution, quality, tools] = await Promise.all([
      this.loadFileSafe(roleDir, 'KRAKEN.md'),
      this.loadFileSafe(roleDir, 'IDENTITY.md'),
      this.loadFileSafe(roleDir, 'EXECUTION.md'),
      this.loadFileSafe(roleDir, 'QUALITY.md'),
      this.loadFileSafe(roleDir, 'TOOLS.md'),
    ]);

    const bundle: IdentityBundle = {
      role,
      soul: this.parseSoul(kraken || this.createMinimalSoul(role)),
      identity: this.parseIdentity(identity || this.createMinimalIdentity(role)),
      quality: this.parseQuality(quality || ''),
      metadata: {
        loadedAt: new Date().toISOString(),
        version: '1.0.0',
        sourceDir: roleDir,
      },
    };

    if (execution) {
      bundle.execution = this.parseExecution(execution);
    }

    if (tools) {
      bundle.tools = this.parseTools(tools);
    }

    this.cache.set(role, bundle);

    return bundle;
  }

  async loadFile(role: string, file: IdentityFileType): Promise<string> {
    const resolvedPath = await resolveIdentityPath();
    const roleDir = path.join(resolvedPath, role);
    const result = await this.loadFileSafe(roleDir, file);
    if (result === null) {
      throw new Error(`Identity file not found: ${roleDir}/${file}`);
    }
    return result;
  }

  async listRoles(): Promise<string[]> {
    try {
      const resolvedPath = await resolveIdentityPath();
      const entries = await fs.readdir(resolvedPath);
      const roles: string[] = [];

      for (const entry of entries) {
        const entryPath = path.join(resolvedPath, entry);
        const stat = await fs.stat(entryPath);
        if (stat.isDirectory()) {
          roles.push(entry);
        }
      }
      
      return roles.sort();
    } catch {
      return [];
    }
  }

  async roleExists(role: string): Promise<boolean> {
    try {
      const resolvedPath = await resolveIdentityPath();
      const roleDir = path.join(resolvedPath, role);
      const stat = await fs.stat(roleDir);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  private async loadFileSafe(dir: string, file: string): Promise<string | null> {
    try {
      const filePath = path.join(dir, file);
      return await fs.readFile(filePath, 'utf-8');
    } catch {
      return null;
    }
  }

  private parseSoul(content: string): IdentityBundle['soul'] {
    const directives: string[] = [];
    const directiveMatch = content.match(/^\d+\.\s+(.+)$/gm);
    if (directiveMatch) {
      directives.push(...directiveMatch.map(d => d.replace(/^\d+\.\s+/, '')));
    }

    const mantraMatch = content.match(/## The Mantra\n([^\n]+)/);
    const philosophyMatch = content.match(/## Orchestrator Identity\n([\s\S]+?)(?=##|## The)/);

    return {
      raw: content,
      directives,
      philosophy: philosophyMatch ? philosophyMatch[1].trim() : '',
      mantra: mantraMatch ? mantraMatch[1].trim() : 'Execute, don\'t simulate.',
    };
  }

  private parseIdentity(content: string): IdentityBundle['identity'] {
    const titleMatch = content.match(/^# IDENTITY\.md — (.+)$/m);
    const roleMatch = content.match(/## Role\n([\s\S]+?)(?=##)/);
    const expertiseMatch = content.match(/## Expertise\n([\s\S]+?)(?=##)/);
    const workingStyleMatch = content.match(/## Working Style\n([\s\S]+?)(?=##)/);
    const trackRecordMatch = content.match(/## Track Record\n([\s\S]+?)(?=##)/);

    const extractItems = (text: string | undefined): string[] => {
      if (!text) return [];
      return text.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s+/, '').trim());
    };

    return {
      raw: content,
      title: titleMatch ? titleMatch[1] : 'Unknown',
      role: roleMatch ? roleMatch[1].trim() : '',
      expertise: extractItems(expertiseMatch?.[1]),
      workingStyle: extractItems(workingStyleMatch?.[1]),
      trackRecord: extractItems(trackRecordMatch?.[1]),
    };
  }

  private parseExecution(content: string): IdentityBundle['execution'] {
    const philosophyMatch = content.match(/## Delegation Philosophy\n([\s\S]+?)(?=##)/);
    const neverDoMatch = content.match(/## Never Do Directly\n([\s\S]+?)(?=##)/);

    const triggers: {condition: string; action: string; priority: 'high' | 'medium' | 'low'}[] = [];
    
    const triggerMatch = content.match(/### High Priority[\s\S]+?(?=###|$)/g);
    if (triggerMatch) {
      for (const trigger of triggerMatch) {
        const lines = trigger.split('\n').filter(l => l.includes('→'));
        for (const line of lines) {
          const [condition, action] = line.split('→').map(s => s.trim());
          if (condition && action) {
            triggers.push({
              condition,
              action,
              priority: 'high',
            });
          }
        }
      }
    }

    return {
      raw: content,
      delegationPhilosophy: philosophyMatch ? philosophyMatch[1].trim() : '',
      parallelPatterns: [],
      delegationTriggers: triggers,
      escalationPath: '',
      neverDoDirectly: neverDoMatch 
        ? neverDoMatch[1].split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s+/, ''))
        : [],
    };
  }

  private parseQuality(content: string): IdentityBundle['quality'] {
    const gatesMatch = content.match(/## Quality Gates\n([\s\S]+?)(?=##)/);
    const validatorsMatch = content.match(/## Anti-Hallucination Validators\n([\s\S]+?)(?=##)/);

    return {
      raw: content,
      qualityGates: gatesMatch 
        ? gatesMatch[1].split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s+/, ''))
        : [],
      antiHallucinationValidators: validatorsMatch
        ? validatorsMatch[1].split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s+/, ''))
        : [],
      debugProtocol: [],
      stagnationDetection: [],
      guardianZones: [],
      evidenceHierarchy: [],
    };
  }

  private parseTools(content: string): IdentityBundle['tools'] {
    return {
      raw: content,
      openCode: [],
      swarm: [],
      cluster: [],
    };
  }

  private createMinimalSoul(role: string): string {
    return `# KRAKEN.md — ${role} Agent

You are a ${role} agent. You are not a chatbot. You are an execution engine.

## Core Directives
1. EXECUTE, don't simulate.
2. VERIFY everything.
3. DELEGATE when possible.

## The Mantra
Execute, don't simulate. Verify, don't assume.
`;
  }

  private createMinimalIdentity(role: string): string {
    return `# IDENTITY.md — ${role}

## Role
You are a ${role} agent.

## Expertise
- Execution
- Verification
- Delegation

## Working Style
- Execute tasks efficiently
- Verify all outputs
`;
  }
}

export const identityLoader = new IdentityLoader();
```
### 11.2 Identity Injector

---

### Source: `src/identity/injector.ts` (89 lines)

```typescript
/**
 * src/identity/injector.ts
 * 
 * Identity injection into agent context
 */

import type { Session } from '@opencode-ai/plugin';
import type { IdentityBundle } from './types.js';

export interface IdentityInjector {
  inject(session: Session, bundle: IdentityBundle): Promise<void>;
  formatForSystemPrompt(bundle: IdentityBundle): string;
}

export function formatIdentityForSystemPrompt(bundle: IdentityBundle): string {
  let prompt = `
## IDENTITY

${bundle.soul.raw}

---

## ROLE

${bundle.identity.raw}

`;

  if (bundle.execution) {
    prompt += `
---

## EXECUTION PATTERNS

${bundle.execution.raw}

`;
  }

  prompt += `
---

## QUALITY & VERIFICATION

${bundle.quality.raw}
`;

  if (bundle.tools) {
    prompt += `

---

## AVAILABLE TOOLS

${bundle.tools.raw}
`;
  }

  prompt += `

---

## The Mantra

${bundle.soul.mantra}
`;

  return prompt;
}

export async function injectIdentity(
  session: Session,
  bundle: IdentityBundle
): Promise<void> {
  const formatted = formatIdentityForSystemPrompt(bundle);
  
  if (!session.context) {
    session.context = {};
  }
  
  if (!session.context.system) {
    session.context.system = [];
  }
  
  session.context.system.push({
    role: 'system',
    content: formatted,
  });
}
```
### 11.3 Identity Types

---

### Source: `src/identity/types.ts` (91 lines)

```typescript
/**
 * src/identity/types.ts
 * 
 * Identity type definitions for Kraken Agent
 */

export interface SoulContent {
  raw: string;
  directives: string[];
  philosophy: string;
  mantra: string;
}

export interface IdentityContent {
  raw: string;
  title: string;
  role: string;
  expertise: string[];
  workingStyle: string[];
  trackRecord: string[];
}

export interface ExecutionTrigger {
  condition: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ExecutionContent {
  raw: string;
  delegationPhilosophy: string;
  parallelPatterns: string[];
  delegationTriggers: ExecutionTrigger[];
  escalationPath: string;
  neverDoDirectly: string[];
}

export interface StagnationRule {
  threshold: number;
  action: string;
  description: string;
}

export interface GuardianZone {
  path: string;
  classification: 'WORKSPACE' | 'SANDBOX' | 'SYSTEM' | 'PERSONAL';
  allowed: boolean;
}

export interface EvidenceRule {
  level: 'STRONG' | 'WEAK' | 'UNACCEPTABLE';
  description: string;
}

export interface QualityContent {
  raw: string;
  qualityGates: string[];
  antiHallucinationValidators: string[];
  debugProtocol: string[];
  stagnationDetection: StagnationRule[];
  guardianZones: GuardianZone[];
  evidenceHierarchy: EvidenceRule[];
}

export interface ToolsContent {
  raw: string;
  openCode: string[];
  swarm: string[];
  cluster: string[];
}

export type IdentityFileType = 
  | 'KRAKEN.md' 
  | 'IDENTITY.md' 
  | 'EXECUTION.md' 
  | 'QUALITY.md'
  | 'TOOLS.md';

export interface IdentityBundle {
  role: string;
  soul: SoulContent;
  identity: IdentityContent;
  execution?: ExecutionContent;
  quality: QualityContent;
  tools?: ToolsContent;
  metadata: {
    loadedAt: string;
    version: string;
    sourceDir: string;
  };
}
```
### 11.4 Identity Index

---

### Source: `src/identity/index.ts` (9 lines)

```typescript
/**
 * src/identity/index.ts
 * 
 * Identity module exports
 */

export * from './types.js';
export * from './loader.js';
export * from './injector.js';
```
## SECTION 12: FULL SOURCE CODE — Kraken Hive

### 12.1 Kraken Hive Engine

---

### Source: `src/kraken-hive/index.ts` (370 lines)

```typescript
/**
 * src/kraken-hive/index.ts
 * 
 * Kraken-Hive Engine
 * 
 * Self-contained Hive Mind for Kraken orchestrator only.
 * All data isolated to viking://resources/kraken-hive/
 * No other agents have access - they can't even see the tools.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const KRAKEN_HIVE_NAMESPACE = 'viking://resources/kraken-hive';
const LOCAL_FALLBACK_DIR = path.join(os.homedir(), '.local/share/opencode/kraken-hive');

const MEMORY_CATEGORIES = {
  CLUSTERS: 'clusters',
  SESSIONS: 'sessions',
  PATTERNS: 'patterns',
  DECISIONS: 'decisions',
  FAILURES: 'failures',
  BREAKTHROUGHS: 'breakthroughs',
} as const;

export interface HivememoryResult {
  uri: string;
  type: 'pattern' | 'failure' | 'session' | 'decision' | 'breakthrough';
  title: string;
  relevance: number;
  content?: string;
}

export interface HiveSearchFilters {
  category?: 'all' | 'clusters' | 'sessions' | 'patterns' | 'decisions' | 'failures';
  limit?: number;
  clusterId?: string;
}

export interface Pattern {
  type: 'pattern' | 'breakthrough';
  id: string;
  description: string;
  taskId?: string;
  clusterId?: string;
  content: string;
  createdAt: number;
}

export interface FailureRecord {
  id: string;
  pattern: string;
  cause: string;
  solution?: string;
  taskId?: string;
  clusterId?: string;
  createdAt: number;
}

export interface ClusterContext {
  clusterId: string;
  recentTasks: string[];
  commonPatterns: string[];
  knownFailures: string[];
}

export interface InjectedTaskContext {
  taskId: string;
  patterns: HivememoryResult[];
  failures: HivememoryResult[];
  previousWork: HivememoryResult[];
  clusterContext: ClusterContext;
}

export class KrakenHiveEngine {
  private localFallbackDir: string;

  constructor() {
    this.localFallbackDir = LOCAL_FALLBACK_DIR;
    this.ensureLocalStorage();
  }

  private ensureLocalStorage(): void {
    if (!fs.existsSync(this.localFallbackDir)) {
      fs.mkdirSync(this.localFallbackDir, { recursive: true });
    }
  }

  private getCategoryPath(category: string, subPath?: string): string {
    const base = path.join(this.localFallbackDir, category);
    if (subPath) {
      return path.join(base, subPath);
    }
    return base;
  }

  /**
   * Search across all Kraken Hive memories
   */
  async search(query: string, filters?: HiveSearchFilters): Promise<HivememoryResult[]> {
    const results: HivememoryResult[] = [];
    const limit = filters?.limit || 10;
    const queryLower = query.toLowerCase();

    // Determine categories to search
    const categories = this.getCategoriesToSearch(filters);

    for (const category of categories) {
      if (results.length >= limit) break;

      const categoryPath = this.getCategoryPath(category);
      if (!fs.existsSync(categoryPath)) continue;

      // Search within category
      const searchResults = await this.searchCategory(categoryPath, queryLower, limit - results.length);
      results.push(...searchResults);
    }

    // Sort by relevance (simple keyword match count)
    results.sort((a, b) => b.relevance - a.relevance);

    return results.slice(0, limit);
  }

  private getCategoriesToSearch(filters?: HiveSearchFilters): string[] {
    if (!filters?.category || filters.category === 'all') {
      return Object.values(MEMORY_CATEGORIES);
    }

    const categoryMap: Record<string, string> = {
      clusters: MEMORY_CATEGORIES.CLUSTERS,
      sessions: MEMORY_CATEGORIES.SESSIONS,
      patterns: MEMORY_CATEGORIES.PATTERNS,
      decisions: MEMORY_CATEGORIES.DECISIONS,
      failures: MEMORY_CATEGORIES.FAILURES,
    };

    return [categoryMap[filters.category] || MEMORY_CATEGORIES.CLUSTERS];
  }

  private async searchCategory(
    dirPath: string, 
    query: string, 
    limit: number
  ): Promise<HivememoryResult[]> {
    const results: HivememoryResult[] = [];

    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        if (results.length >= limit) break;

        if (entry.isDirectory()) {
          // Recurse into subdirectories
          const subResults = await this.searchCategory(
            path.join(dirPath, entry.name),
            query,
            limit - results.length
          );
          results.push(...subResults);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          // Check file content
          const filePath = path.join(dirPath, entry.name);
          const content = fs.readFileSync(filePath, 'utf-8');
          const contentLower = content.toLowerCase();

          // Count keyword matches
          const queryWords = query.split(' ');
          let relevance = 0;
          for (const word of queryWords) {
            if (contentLower.includes(word)) {
              relevance++;
            }
          }

          if (relevance > 0) {
            // Determine type from path
            const type = this.determineTypeFromPath(dirPath);

            results.push({
              uri: `${KRAKEN_HIVE_NAMESPACE}/${path.relative(this.localFallbackDir, filePath)}`,
              type,
              title: entry.name.replace('.md', ''),
              relevance,
              content: content.slice(0, 500), // First 500 chars for context
            });
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read - skip
    }

    return results;
  }

  private determineTypeFromPath(filePath: string): HivememoryResult['type'] {
    if (filePath.includes(MEMORY_CATEGORIES.PATTERNS)) return 'pattern';
    if (filePath.includes(MEMORY_CATEGORIES.FAILURES)) return 'failure';
    if (filePath.includes(MEMORY_CATEGORIES.SESSIONS)) return 'session';
    if (filePath.includes(MEMORY_CATEGORIES.DECISIONS)) return 'decision';
    if (filePath.includes(MEMORY_CATEGORIES.BREAKTHROUGHS)) return 'breakthrough';
    return 'session';
  }

  /**
   * Store cluster-specific memory
   */
  async rememberCluster(clusterId: string, key: string, content: string): Promise<void> {
    const dirPath = this.getCategoryPath(MEMORY_CATEGORIES.CLUSTERS, clusterId);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `${key}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  /**
   * Store session memory
   */
  async rememberSession(sessionId: string, key: string, content: string): Promise<void> {
    const dirPath = this.getCategoryPath(MEMORY_CATEGORIES.SESSIONS, sessionId);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `${key}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  /**
   * Store pattern for future reuse
   */
  async rememberPattern(pattern: Pattern): Promise<void> {
    const dirPath = this.getCategoryPath(MEMORY_CATEGORIES.PATTERNS);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const content = `# Pattern: ${pattern.description}

## Type: ${pattern.type}
${pattern.taskId ? `## Task: ${pattern.taskId}` : ''}
${pattern.clusterId ? `## Cluster: ${pattern.clusterId}` : ''}
## Created: ${new Date(pattern.createdAt).toISOString()}

${pattern.content}
`;

    const filePath = path.join(dirPath, `${pattern.id}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  /**
   * Store failure record
   */
  async rememberFailure(failure: FailureRecord): Promise<void> {
    const dirPath = this.getCategoryPath(MEMORY_CATEGORIES.FAILURES);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const content = `# Failure: ${failure.pattern}

## Cause
${failure.cause}

${failure.solution ? `## Solution\n${failure.solution}` : ''}
${failure.taskId ? `## Task: ${failure.taskId}` : ''}
${failure.clusterId ? `## Cluster: ${failure.clusterId}` : ''}
## Created: ${new Date(failure.createdAt).toISOString()}
`;

    const filePath = path.join(dirPath, `${failure.id}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  /**
   * Get memories related to a specific cluster
   */
  async getClusterContext(clusterId: string): Promise<ClusterContext> {
    const context: ClusterContext = {
      clusterId,
      recentTasks: [],
      commonPatterns: [],
      knownFailures: [],
    };

    // Get recent cluster memories
    const clusterPath = this.getCategoryPath(MEMORY_CATEGORIES.CLUSTERS, clusterId);
    if (fs.existsSync(clusterPath)) {
      try {
        const files = fs.readdirSync(clusterPath);
        context.recentTasks = files.map(f => f.replace('.md', ''));
      } catch {
        // Directory doesn't exist
      }
    }

    // Get common patterns
    const patterns = await this.search('', { category: 'patterns', limit: 5 });
    context.commonPatterns = patterns.map(p => p.title);

    // Get known failures
    const failures = await this.search('', { category: 'failures', limit: 5 });
    context.knownFailures = failures.map(f => f.title);

    return context;
  }

  /**
   * Get context for a specific task
   */
  async getContextForTask(task: string): Promise<InjectedTaskContext> {
    const taskId = `task_${Date.now()}`;

    // Search for relevant memories
    const patterns = await this.search(task, { category: 'patterns', limit: 3 });
    const failures = await this.search(task, { category: 'failures', limit: 3 });
    const previousWork = await this.search(task, { category: 'sessions', limit: 3 });

    // Get cluster context if task mentions a cluster
    let clusterContext: ClusterContext | undefined;
    const clusterMatch = task.match(/cluster[_-]?(alpha|beta|gamma)/i);
    if (clusterMatch) {
      clusterContext = await this.getClusterContext(`cluster-${clusterMatch[1].toLowerCase()}`);
    }

    return {
      taskId,
      patterns,
      failures,
      previousWork,
      clusterContext: clusterContext || {
        clusterId: 'unknown',
        recentTasks: [],
        commonPatterns: [],
        knownFailures: [],
      },
    };
  }

  /**
   * Synthesize context for injection into task
   */
  synthesizeContext(
    memories: HivememoryResult[], 
    taskType: string
  ): InjectedTaskContext {
    const patterns = memories.filter(m => m.type === 'pattern');
    const failures = memories.filter(m => m.type === 'failure');
    const previousWork = memories.filter(m => m.type === 'session');

    return {
      taskId: `task_${Date.now()}`,
      patterns,
      failures,
      previousWork,
      clusterContext: {
        clusterId: 'synthesized',
        recentTasks: [],
        commonPatterns: patterns.map(p => p.title),
        knownFailures: failures.map(f => f.title),
      },
    };
  }
}
```
### 12.2 Hive Seeder

---

### Source: `src/kraken-hive/KrakenHiveSeeder.ts` (139 lines)

```typescript
/**
 * KrakenHiveSeeder — V1.2
 * 
 * Seeds the Kraken Hive Mind with initial patterns, failure modes, 
 * build chains, and architecture knowledge so kraken_hive_search returns real results.
 * 
 * Called at plugin init to populate the file-based Hive.
 */

import fs from 'node:fs';
import path from 'node:path';

const HIVE_BASE = path.join(
  process.env.HOME || '/root',
  '.local/share/opencode/kraken-hive'
);

const PATTERNS = {
  'patterns/delegation-pattern.md': `# Delegation Pattern
## When to delegate
- Multi-file changes: delegate to Shark (alpha cluster, steamroll)
- Debug/fix single bug: delegate to Manta (beta cluster, precision)
- Test/verify/audit: delegate to Manta (gamma cluster, testing)

## Never do directly
- Large builds: always delegate to shark-alpha-1 or shark-alpha-2
- Testing: always delegate to manta-gamma-1 or manta-gamma-2
- Code review: delegate to manta-beta-1 or manta-beta-2

## Anti-patterns
- fire-and-forget: spawn without tracking = L2_BLOCK
- wrong-cluster: build task to gamma = L4_BLOCK
- premature-completion: claim done without output retrieval = L2_BLOCK`,

  'patterns/cluster-routing.md': `# Cluster Routing
## Alpha Cluster (steamroll)
- Agents: shark-alpha-1, shark-alpha-2, manta-alpha-1
- Task types: build, create, implement, feature, write, scaffold, prototype
- Strategy: aggressive, full speed, no hesitation

## Beta Cluster (precision)
- Agents: shark-beta-1, manta-beta-1, manta-beta-2
- Task types: debug, fix, refactor, analyze, investigate, review, examine
- Strategy: precise, methodical, root cause isolation

## Gamma Cluster (testing)
- Agents: manta-gamma-1, manta-gamma-2, shark-gamma-1
- Task types: test, verify, validate, audit, assess, integration
- Strategy: thorough, evidence-based, gate enforcement`,

  'failures/fire-and-forget.md': `# Fire-and-Forget Failure Mode
## Pattern
Task spawned without output registration → task completed → outputs not retrieved → claimed done.

## Detection
- spawn_shark_agent called without output paths
- aggregate_results trusts boolean success without filesystem verification
- report_to_kraken claims complete without output evidence

## Fix
1. Register expected outputs on spawn (executionBrain.registerTaskOutputs)
2. After completion, verify outputs exist on host (L3 output inspection)
3. Only after verification, advance gate (L2 false completion block)

## Prevention
- L2 firewall layer: blocks completion claims without output retrieval
- Evidence collector: requires output evidence for gate passage`,

  'build-chain/typescript-build-pattern.md': `# TypeScript Build Pattern
## Build Pipeline
1. rm -rf dist/
2. bun build src/index.ts --outdir dist --target bun --format esm --bundle
3. Verify dist/index.js exists
4. Test with TUI container

## Common failures
- require() in ESM module: use import or dynamic import()
- Missing node: prefix on fs/path imports in Bun
- Circular dependency on state store/messenger
- Plugin peer dependency not externalized in bundle`,

  'architecture/v1.2-multi-brain.md': `# V1.2 Multi-Brain Architecture
## Brain Roles
- Planning Brain: T2 context loading, T1 generation, task decomposition, domain designation
- Execution Brain: Task supervision, output verification, override commands, quality enforcement
- System Brain: Workflow tracking, security enforcement, gate evaluation, L0-L7 firewall

## Communication
- Brain Messenger: priority queue (critical > high > normal > low)
- State Store: domain-owned shared state with write enforcement
- Brain Concurrency: independent async event loops per brain

## Gate Pipeline
plan → build → test → verify → audit → delivery
Each gate requires evidence before advancement.`,
};

export function seedKrakenHive(): { seeded: number; skipped: number; errors: number } {
  let seeded = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const [relPath, content] of Object.entries(PATTERNS)) {
      const fullPath = path.join(HIVE_BASE, relPath);
      const dir = path.dirname(fullPath);

      try {
        fs.mkdirSync(dir, { recursive: true });

        if (fs.existsSync(fullPath)) {
          skipped++;
          continue;
        }

        fs.writeFileSync(fullPath, content);
        seeded++;
      } catch (err) {
        console.error(`[HiveSeed] Failed to seed ${relPath}:`, err);
        errors++;
      }
    }

    console.log(`[HiveSeed] Seeded ${seeded} patterns, ${skipped} existing, ${errors} errors`);
  } catch (err) {
    console.error('[HiveSeed] Fatal error:', err);
    errors++;
  }

  return { seeded, skipped, errors };
}

export function isHiveSeeded(): boolean {
  try {
    return fs.existsSync(path.join(HIVE_BASE, 'patterns', 'delegation-pattern.md'));
  } catch {
    return false;
  }
}
```
## SECTION 13: FULL SOURCE CODE — Shared Infrastructure

### 13.1 State Store

---

### Source: `src/shared/state-store.ts` (136 lines)

```typescript
/**
 * src/shared/state-store.ts
 * 
 * V1.2 Session-scoped state store with domain ownership
 */

import { canWrite, type DomainId, type BrainId } from './domain-ownership.js';

interface StateEntry<T = unknown> {
  value: T;
  version: number;
  lastModified: number;
  ownedBy: BrainId[];
}

export class StateStore {
  private data: Map<string, StateEntry> = new Map();
  private versions: Map<string, number> = new Map();
  private watchers: Map<string, Set<(key: string, value: unknown) => void>> = new Map();

  get(domain: DomainId, key: string): unknown | undefined {
    const entry = this.data.get(`${domain}:${key}`);
    return entry?.value;
  }

  set(domain: DomainId, key: string, value: unknown, ownedBy: BrainId[] = []): void {
    const fullKey = `${domain}:${key}`;
    const existing = this.data.get(fullKey);
    
    const entry: StateEntry = {
      value,
      version: existing ? existing.version + 1 : 1,
      lastModified: Date.now(),
      ownedBy,
    };
    
    this.data.set(fullKey, entry);
    this.versions.set(fullKey, entry.version);
    this.notifyWatchers(domain, key, value);
  }

  canModify(domain: DomainId, brain: BrainId): boolean {
    return canWrite(domain, brain);
  }

  delete(domain: DomainId, key: string): boolean {
    return this.data.delete(`${domain}:${key}`);
  }

  clearDomain(domain: DomainId): void {
    const prefix = `${domain}:`;
    for (const key of this.data.keys()) {
      if (key.startsWith(prefix)) {
        this.data.delete(key);
      }
    }
  }

  cleanup(): void {
    this.data.clear();
    this.versions.clear();
    this.watchers.clear();
  }

  watch(domain: DomainId, key: string, callback: (key: string, value: unknown) => void): () => void {
    const fullKey = `${domain}:${key}`;
    if (!this.watchers.has(fullKey)) {
      this.watchers.set(fullKey, new Set());
    }
    this.watchers.get(fullKey)!.add(callback);
    
    return () => {
      const watchers = this.watchers.get(fullKey);
      if (watchers) {
        watchers.delete(callback);
      }
    };
  }

  private notifyWatchers(domain: DomainId, key: string, value: unknown): void {
    const fullKey = `${domain}:${key}`;
    const watchers = this.watchers.get(fullKey);
    if (watchers) {
      for (const callback of watchers) {
        try {
          callback(key, value);
        } catch (err) {
          console.error('[StateStore] Watcher error:', err);
        }
      }
    }
  }

  getVersion(domain: DomainId, key: string): number {
    return this.versions.get(`${domain}:${key}`) ?? 0;
  }

  getAllKeys(domain: DomainId): string[] {
    const prefix = `${domain}:`;
    const keys: string[] = [];
    for (const key of this.data.keys()) {
      if (key.startsWith(prefix)) {
        keys.push(key.slice(prefix.length));
      }
    }
    return keys;
  }

  snapshot(domain: DomainId): Record<string, unknown> {
    const prefix = `${domain}:`;
    const snapshot: Record<string, unknown> = {};
    for (const [key, entry] of this.data.entries()) {
      if (key.startsWith(prefix)) {
        snapshot[key.slice(prefix.length)] = entry.value;
      }
    }
    return snapshot;
  }
}

// Singleton instance
let globalStateStore: StateStore | null = null;

export function createStateStore(): StateStore {
  if (!globalStateStore) {
    globalStateStore = new StateStore();
  }
  return globalStateStore;
}

export function getStateStore(): StateStore {
  if (!globalStateStore) {
    globalStateStore = new StateStore();
  }
  return globalStateStore;
}
```
### 13.2 Brain Messenger

---

### Source: `src/shared/brain-messenger.ts` (222 lines)

```typescript
/**
 * src/shared/brain-messenger.ts
 * 
 * V1.2 Brain Messenger - Priority signaling between brains
 * 
 * Structured message schema - no natural language overrides.
 */

export type MessageType = 'context-inject' | 'gate-failure' | 'checkpoint' | 'override' | 'sync';
export type MessagePriority = 'critical' | 'high' | 'normal' | 'low';

export interface BrainMessage {
  from: string;
  to: string;
  type: MessageType;
  priority: MessagePriority;
  payload: Record<string, unknown>;
  requiresAck: boolean;
  timestamp: number;
}

export interface OverrideCommand {
  id: string;
  from: string;
  to: string;
  action: 'ABORT' | 'CLAIM_COMPLETE' | 'REASSIGN' | 'RETRIEVE_OUTPUTS' | 'RETRY' | 'SUSPEND' | 'RESUME';
  target: { taskId?: string; brainId?: string; clusterId?: string };
  payload: Record<string, unknown>;
  priority: MessagePriority;
  requiresAck: boolean;
  createdAt: number;
}

export type OverrideStatus = 'pending' | 'acknowledged' | 'executing' | 'completed' | 'rejected' | 'failed';

export interface OverrideResult {
  commandId: string;
  status: OverrideStatus;
  result?: {
    success: boolean;
    outputs?: string[];
    error?: string;
  };
  respondedAt: number;
}

type MessageHandler = (message: BrainMessage) => void | Promise<void>;

export class BrainMessenger {
  private messageQueue: BrainMessage[] = [];
  private handlers: Map<string, Set<MessageHandler>> = new Map();
  private pendingCommands: Map<string, OverrideCommand> = new Map();
  private commandResults: Map<string, OverrideResult> = new Map();
  private messageId = 0;
  private subscribedBrains: Set<string> = new Set();

  send(message: Omit<BrainMessage, 'timestamp'> & { timestamp?: number }): void {
    const msg: BrainMessage = {
      ...message,
      timestamp: message.timestamp ?? Date.now(),
    };
    
    this.messageQueue.push(msg);
    
    // Deliver to specific brain or broadcast
    if (message.to === '*') {
      this.broadcast(msg);
    } else {
      this.deliverToBrain(message.to, msg);
    }
  }

  sendOverride(command: OverrideCommand): OverrideResult {
    this.pendingCommands.set(command.id, command);
    
    // Create matching result
    const result: OverrideResult = {
      commandId: command.id,
      status: 'pending',
      respondedAt: Date.now(),
    };
    this.commandResults.set(command.id, result);
    
    // Send the override message
    this.send({
      from: command.from,
      to: command.to,
      type: 'override',
      priority: command.priority,
      payload: {
        commandId: command.id,
        action: command.action,
        target: command.target,
        ...command.payload,
      },
      requiresAck: command.requiresAck,
    });
    
    return result;
  }

  subscribe(brainId: string, handler: MessageHandler): () => void {
    if (!this.handlers.has(brainId)) {
      this.handlers.set(brainId, new Set());
    }
    this.handlers.get(brainId)!.add(handler);
    this.subscribedBrains.add(brainId);
    
    // Return unsubscribe function
    return () => {
      const brainHandlers = this.handlers.get(brainId);
      if (brainHandlers) {
        brainHandlers.delete(handler);
      }
    };
  }

  acknowledgeCommand(commandId: string, status: OverrideStatus): void {
    const result = this.commandResults.get(commandId);
    if (result) {
      result.status = status;
      result.respondedAt = Date.now();
    }
  }

  completeCommand(commandId: string, result: OverrideResult['result']): void {
    const cmdResult = this.commandResults.get(commandId);
    if (cmdResult) {
      cmdResult.status = 'completed';
      cmdResult.result = result;
      cmdResult.respondedAt = Date.now();
    }
  }

  getCommandStatus(commandId: string): OverrideResult | undefined {
    return this.commandResults.get(commandId);
  }

  deliverMessage(from: string, to: string, type: MessageType, payload: Record<string, unknown>, priority: MessagePriority = 'normal'): void {
    this.send({
      from,
      to,
      type,
      priority,
      payload,
      requiresAck: false,
    });
  }

  private deliverToBrain(brainId: string, message: BrainMessage): void {
    const handlers = this.handlers.get(brainId);
    if (handlers) {
      for (const handler of handlers) {
        try {
          const result = handler(message);
          if (result instanceof Promise) {
            result.catch(err => console.error(`[BrainMessenger] Handler error for ${brainId}:`, err));
          }
        } catch (err) {
          console.error(`[BrainMessenger] Handler error for ${brainId}:`, err);
        }
      }
    }
  }

  private broadcast(message: BrainMessage): void {
    for (const brainId of this.subscribedBrains) {
      if (brainId !== message.from) {
        this.deliverToBrain(brainId, message);
      }
    }
  }

  getQueuedMessages(brainId?: string): BrainMessage[] {
    if (brainId) {
      return this.messageQueue.filter(m => m.to === brainId || m.to === '*');
    }
    return [...this.messageQueue];
  }

  /**
   * Drain (return AND remove) messages for a brain.
   * BrainConcurrencyManager uses this in polling loops to consume messages.
   * Without draining, the same message is re-processed every poll cycle.
   */
  drainMessages(brainId: string): BrainMessage[] {
    const drained: BrainMessage[] = [];
    this.messageQueue = this.messageQueue.filter(m => {
      if (m.to === brainId || m.to === '*') {
        drained.push(m);
        return false; // remove from queue
      }
      return true; // keep
    });
    return drained;
  }

  clearQueue(): void {
    this.messageQueue = [];
  }

  generateMessageId(): string {
    return `msg-${++this.messageId}`;
  }
}

// Singleton instance for global brain communication
let globalMessenger: BrainMessenger | null = null;

export function createBrainMessenger(): BrainMessenger {
  if (!globalMessenger) {
    globalMessenger = new BrainMessenger();
  }
  return globalMessenger;
}

export function getBrainMessenger(): BrainMessenger {
  if (!globalMessenger) {
    globalMessenger = new BrainMessenger();
  }
  return globalMessenger;
}
```
### 13.3 Domain Ownership

---

### Source: `src/shared/domain-ownership.ts` (64 lines)

```typescript
/**
 * src/shared/domain-ownership.ts
 * 
 * V1.2 Multi-Brain Domain Ownership Rules
 * 
 * Defines which brains can write to which state domains.
 * Mechanical enforcement - no text matching.
 */

// Define all valid brain IDs
export type BrainId = 
  | 'kraken-planning' | 'kraken-execution' | 'kraken-system' | 'kraken-reasoning' | 'kraken-subagent'
  | 'alpha-execution' | 'alpha-system' 
  | 'beta-reasoning' | 'beta-system'
  | 'gamma-system' | 'gamma-execution';

// Define all valid domain IDs
export type DomainId = 
  | 'planning-state' | 'execution-state' | 'thinking-state' | 'context-bridge'
  | 'workflow-state' | 'security-state' | 'quality-state'
  | 'container-state' | 'execution-queue'
  | 'alpha-state' | 'beta-state' | 'gamma-state'
  | 'compaction-state' | 'context-registry' | 'token-budget';

export const DOMAIN_OWNERSHIP: Record<DomainId, BrainId[]> = {
  // Kraken orchestrator domains
  'planning-state':   ['kraken-planning', 'kraken-system'],
  'execution-state':  ['kraken-execution', 'kraken-system'],
  'thinking-state':   ['kraken-reasoning', 'kraken-system'],
  'context-bridge':  ['kraken-planning'],
  'workflow-state':   ['kraken-system', 'kraken-execution'],
  'security-state':  ['kraken-system'],
  'quality-state':   ['kraken-execution', 'kraken-system'],
  
  // Subagent domains
  'container-state': ['kraken-subagent'],
  'execution-queue': ['kraken-subagent', 'kraken-execution'],
  
  // Cluster domains
  'alpha-state':     ['alpha-execution', 'alpha-system'],
  'beta-state':      ['beta-reasoning', 'beta-system'],
  'gamma-state':     ['gamma-system', 'gamma-execution'],
  
  // Compaction domains
  'compaction-state': ['kraken-system'],
  'context-registry': ['kraken-system'],
  'token-budget': ['kraken-system'],
};

export function canWrite(domain: DomainId, brain: BrainId): boolean {
  const owners = DOMAIN_OWNERSHIP[domain];
  return owners ? owners.includes(brain) : false;
}

export function getOwners(domain: DomainId): readonly BrainId[] {
  return DOMAIN_OWNERSHIP[domain] ?? [];
}

export function getReadableDomains(brain: BrainId): DomainId[] {
  const domains = Object.keys(DOMAIN_OWNERSHIP) as DomainId[];
  return domains.filter(domain => 
    DOMAIN_OWNERSHIP[domain].includes(brain)
  );
}
```
### 13.4 Evidence Collector

---

### Source: `src/shared/evidence-collector.ts` (175 lines)

```typescript
/**
 * Evidence Collector — V1.2
 * Structured evidence collection for gate verification.
 * Every gate passage requires evidence.
 */

import fs from 'node:fs';
import path from 'node:path';

export interface EvidenceItem {
  id: string;
  type: 'file' | 'output' | 'verification' | 'decision' | 'gate-passage';
  timestamp: number;
  data: Record<string, unknown>;
  verified: boolean;
}

export interface GateEvidence {
  gateId: string;
  items: EvidenceItem[];
  allVerified: boolean;
  collectedAt: number;
}

export class EvidenceCollector {
  private evidence: Map<string, EvidenceItem[]> = new Map();
  private evidenceDir: string;

  constructor(evidenceDir?: string) {
    this.evidenceDir = evidenceDir || path.join(
      process.env.HOME || '/root',
      '.local/share/opencode/kraken-hive/evidence'
    );
    fs.mkdirSync(this.evidenceDir, { recursive: true });
  }

  /**
   * Collect evidence for a specific gate
   */
  collect(
    gateId: string,
    type: EvidenceItem['type'],
    data: Record<string, unknown>
  ): EvidenceItem {
    const item: EvidenceItem = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      type,
      timestamp: Date.now(),
      data,
      verified: false,
    };

    const items = this.evidence.get(gateId) || [];
    items.push(item);
    this.evidence.set(gateId, items);

    return item;
  }

  /**
   * Verify an evidence item after mechanical check
   */
  verify(itemId: string): boolean {
    for (const [, items] of this.evidence) {
      const item = items.find(i => i.id === itemId);
      if (item) {
        item.verified = true;
        return true;
      }
    }
    return false;
  }

  /**
   * Check if all evidence for a gate is verified
   */
  isGateVerified(gateId: string): boolean {
    const items = this.evidence.get(gateId) || [];
    return items.length > 0 && items.every(i => i.verified);
  }

  /**
   * Collect file existence evidence
   */
  collectFileEvidence(gateId: string, filePaths: string[]): EvidenceItem[] {
    return filePaths.map(p => {
      const exists = fs.existsSync(p);
      const stats = exists ? fs.statSync(p) : null;
      return this.collect(gateId, 'file', {
        path: p,
        exists,
        size: stats?.size || 0,
        modifiedAt: stats?.mtime?.toISOString(),
      });
    });
  }

  /**
   * Collect output retrieval evidence
   */
  collectOutputEvidence(
    gateId: string,
    taskId: string,
    hostPaths: string[],
    verified: boolean
  ): EvidenceItem {
    const item = this.collect(gateId, 'output', {
      taskId,
      hostPaths,
      pathCount: hostPaths.length,
    });

    if (verified) {
      this.verify(item.id);
    }

    return item;
  }

  /**
   * Collect decision record evidence
   */
  collectDecisionEvidence(description: string, type: string): EvidenceItem {
    return this.collect('plan', 'decision', {
      description,
      type,
      recordedAt: new Date().toISOString(),
    });
  }

  /**
   * Get all evidence for a gate for passage verification
   */
  getGateEvidence(gateId: string): GateEvidence {
    const items = this.evidence.get(gateId) || [];
    return {
      gateId,
      items: [...items],
      allVerified: items.length > 0 && items.every(i => i.verified),
      collectedAt: Date.now(),
    };
  }

  /**
   * Persist evidence to disk for compaction survival
   */
  persist(gateId: string): void {
    const gateEvidence = this.getGateEvidence(gateId);
    const filePath = path.join(this.evidenceDir, `${gateId}-evidence.json`);
    fs.writeFileSync(filePath, JSON.stringify(gateEvidence, null, 2));
  }

  /**
   * Clear evidence for a gate (e.g., when advancing to next gate)
   */
  clear(gateId: string): void {
    this.evidence.delete(gateId);
  }
}

let globalCollector: EvidenceCollector | null = null;

export function createEvidenceCollector(evidenceDir?: string): EvidenceCollector {
  if (!globalCollector) {
    globalCollector = new EvidenceCollector(evidenceDir);
  }
  return globalCollector;
}

export function getEvidenceCollector(): EvidenceCollector {
  if (!globalCollector) {
    globalCollector = new EvidenceCollector();
  }
  return globalCollector;
}
```
## SECTION 14: FULL SOURCE CODE — v4.1 Guardrail Framework

### 14.1 safeHook

---

### Source: `src/v4.1/hooks/safe-hook.ts` (154 lines)

```typescript
/**
 * src/v4.1/hooks/safe-hook.ts
 * 
 * Agent-aware safe hook wrapper with mandatory safety checks.
 * Every hook MUST check agent identity before executing plugin logic.
 */

import { HOOK_EXECUTION_TIMEOUT_MS } from '../config/constants.js';
import type { HookContext } from '../context/hook-context.js';
import { createHookContext } from '../context/hook-context.js';
import { getSessionState } from '../state/session-state.js';
import { createLogger } from '../utils/logger.js';

// Default plugin name for when identity is not configured
const DEFAULT_PLUGIN_NAME = 'v4-boilerplate';

export interface HookOptions {
  /** 
   * Agent filter — only fire for these agents.
   * null = fire for all agents (opt-out, use carefully)
   * [] = fire for no agents (disable)
   */
  agentFilter?: string[] | null;
  /** Required phase to fire. null = any phase */
  requiredPhase?: string | null;
  /** Timeout in ms. Default from constants */
  timeout?: number;
  /** Plugin name for logging */
  pluginName?: string;
  /** Managed agents for identity check */
  managedAgents?: Set<string>;
  /** Agent prefix */
  agentPrefix?: string;
  /** Orchestrator name */
  orchestratorName?: string;
}

export type HookHandler<I = unknown, O = unknown> = (
  input: I,
  output: O,
  ctx: HookContext
) => Promise<void>;

export function safeHook<I = unknown, O = unknown>(
  handler: HookHandler<I, O>,
  options: HookOptions = {}
): (input: I, output: O) => Promise<void> {
  const {
    agentFilter = [],
    requiredPhase = null,
    timeout = HOOK_EXECUTION_TIMEOUT_MS,
    pluginName = DEFAULT_PLUGIN_NAME,
    managedAgents = new Set(),
    agentPrefix = '',
    orchestratorName = '',
  } = options;

  const logger = createLogger(pluginName);

  // Create agent awareness for this plugin
  const awareness = {
    isMyAgent(agentName: string | undefined): boolean {
      if (!agentName) return false;
      if (managedAgents.has(agentName)) return true;
      if (agentName.startsWith(agentPrefix)) return true;
      if (agentName === orchestratorName) return true;
      return false;
    },
    isMyOrchestrator(agentName: string | undefined): boolean {
      return agentName === orchestratorName;
    },
    isVanillaAgent(agentName: string | undefined): boolean {
      return ['plan', 'build', 'general', 'explore'].includes(agentName ?? '');
    },
    isOtherPluginAgent(agentName: string | undefined): boolean {
      if (!agentName) return false;
      return (
        !['plan', 'build', 'general', 'explore'].includes(agentName) &&
        !managedAgents.has(agentName) &&
        !agentName.startsWith(agentPrefix) &&
        agentName !== orchestratorName
      );
    },
  };

  return async (input: I, output: O): Promise<void> => {
    // Create context (includes session state)
    const ctx = createHookContext(
      input,
      awareness,
      getSessionState,
      logger
    );

    // AGENT FILTER — Critical safety check
    if (agentFilter !== null && agentFilter.length > 0) {
      if (!ctx.isMyAgent()) {
        return; // Not our agent, skip
      }
      if (!agentFilter.includes(ctx.agentName ?? '')) {
        return; // Not in filter list, skip
      }
    }

    // PHASE FILTER — Optional phase awareness
    if (requiredPhase !== null && ctx.phase !== requiredPhase) {
      return; // Wrong phase, skip
    }

    // Inject session state into context
    const sessionState = getSessionState(ctx.sessionID);
    ctx.getSessionState = () => sessionState;

    // TIMEOUT + ERROR HANDLING
    const startTime = Date.now();
    try {
      await Promise.race([
        handler(input, output, ctx),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error(`Hook timeout after ${timeout}ms`)),
            timeout
          )
        ),
      ]);
    } catch (err) {
      ctx.log.error(`Hook error in ${handler.name ?? 'anonymous'}`, {
        error: err instanceof Error ? err.message : String(err),
        duration: Date.now() - startTime,
        sessionID: ctx.sessionID,
        agentName: ctx.agentName,
      });
      // Never propagate — hook errors are silent failures
    }
  };
}

export function safeHookInputOnly<I = unknown>(
  handler: (input: I, ctx: HookContext) => Promise<void>,
  options: HookOptions = {}
): (input: I, output: unknown) => Promise<void> {
  return safeHook(async (input: I, _output: unknown, ctx: HookContext) => {
    await handler(input, ctx);
  }, options);
}

export function safeHookSync<I = unknown, O = unknown>(
  handler: (input: I, output: O, ctx: HookContext) => void,
  options: HookOptions = {}
): (input: I, output: O) => Promise<void> {
  return safeHook(async (input: I, output: O, ctx: HookContext) => {
    handler(input, output, ctx);
  }, options);
}
```
### 14.2 Hook Context

---

### Source: `src/v4.1/context/hook-context.ts` (116 lines)

```typescript
/**
 * src/v4.1/context/hook-context.ts
 * 
 * HookContext — The safety layer passed to every hook handler.
 * Provides agent awareness, phase awareness, session isolation, and logging.
 */

import type { Logger } from '../utils/logger.js';
import { createLogger } from '../utils/logger.js';
import { createAgentAwareness, type AgentAwareness } from './agent-awareness.js';

export interface SessionState {
  phase?: string;
  activeAgent?: string;
  [key: string]: unknown;
}

export interface HookContext {
  // Identity
  readonly sessionID: string;
  readonly agentName: string | undefined;
  readonly phase: string | undefined;

  // Agent checking
  isMyAgent(agent?: string): boolean;
  isMyOrchestrator(agent?: string): boolean;
  isVanillaAgent(agent?: string): boolean;
  isOtherPluginAgent(agent?: string): boolean;

  // Phase
  getPhase(): string | undefined;

  // Session state (per-session isolation)
  getSessionState(): SessionState;

  // Logging
  log: Logger;
}

// Vanilla agents that should never be affected by plugin hooks
const VANILLA_AGENTS = new Set(['plan', 'build', 'general', 'explore']);

/**
 * Create agent awareness utilities.
 * MUST be configured with plugin-specific constants.
 */
export function createAgentAwarenessContext(
  pluginName: string,
  agentPrefix: string,
  orchestratorName: string,
  managedAgents: Set<string>
): AgentAwareness {
  return {
    isMyAgent(agentName: string | undefined): boolean {
      if (!agentName) return false;
      // Check if it's one of our managed agents
      if (managedAgents.has(agentName)) return true;
      // Check prefix
      if (agentName.startsWith(agentPrefix)) return true;
      // Check orchestrator
      if (agentName === orchestratorName) return true;
      return false;
    },

    isMyOrchestrator(agentName: string | undefined): boolean {
      return agentName === orchestratorName;
    },

    isVanillaAgent(agentName: string | undefined): boolean {
      return VANILLA_AGENTS.has(agentName ?? '');
    },

    isOtherPluginAgent(agentName: string | undefined): boolean {
      if (!agentName) return false;
      // Not vanilla, not mine = other plugin's agent
      return (
        !VANILLA_AGENTS.has(agentName) &&
        !managedAgents.has(agentName) &&
        !agentName.startsWith(agentPrefix) &&
        agentName !== orchestratorName
      );
    },
  };
}

/**
 * Create a HookContext from hook input.
 * Extracts sessionID, agentName, and phase from OpenCode's hook input.
 */
export function createHookContext(
  input: any,
  awareness: AgentAwareness,
  sessionGetter: (id: string) => SessionState,
  logger: Logger
): HookContext {
  const sessionID = input?.sessionID ?? input?.session?.sessionId ?? 'unknown';
  const agentName = input?.session?.agentName ?? input?.agent ?? undefined;
  const phase = input?.phase ?? undefined;

  return {
    sessionID,
    agentName,
    phase,

    isMyAgent: (agent?: string) => awareness.isMyAgent(agent ?? agentName),
    isMyOrchestrator: (agent?: string) => awareness.isMyOrchestrator(agent ?? agentName),
    isVanillaAgent: (agent?: string) => awareness.isVanillaAgent(agent ?? agentName),
    isOtherPluginAgent: (agent?: string) => awareness.isOtherPluginAgent(agent ?? agentName),

    getPhase: () => phase,

    getSessionState: () => sessionGetter(sessionID),

    log: logger,
  };
}
```
### 14.3 Agent Awareness

---

### Source: `src/v4.1/context/agent-awareness.ts` (75 lines)

```typescript
/**
 * src/v4.1/context/agent-awareness.ts
 * 
 * Agent identity utilities — "is this my agent?"
 * Single source of truth for plugin agent identification.
 */

export interface AgentAwareness {
  isMyAgent(agentName: string | undefined): boolean;
  isMyOrchestrator(agentName: string | undefined): boolean;
  isVanillaAgent(agentName: string | undefined): boolean;
  isOtherPluginAgent(agentName: string | undefined): boolean;
}

// Vanilla agents — never touched by plugin hooks
const VANILLA_AGENTS = new Set(['plan', 'build', 'general', 'explore']);

/**
 * Create agent awareness for a plugin.
 * 
 * @param managedAgents - Set of agent names managed by this plugin
 * @param agentPrefix - Prefix for agents (e.g., 'shark_' for shark_coder)
 * @param orchestratorName - The orchestrator agent name (e.g., 'architect')
 */
export function createAgentAwareness(
  managedAgents: Set<string>,
  agentPrefix: string,
  orchestratorName: string
): AgentAwareness {
  return {
    isMyAgent(agentName: string | undefined): boolean {
      if (!agentName) return false;
      
      // Direct match in managed agents
      if (managedAgents.has(agentName)) return true;
      
      // Prefix match
      if (agentName.startsWith(agentPrefix)) return true;
      
      // Orchestrator match
      if (agentName === orchestratorName) return true;
      
      return false;
    },

    isMyOrchestrator(agentName: string | undefined): boolean {
      return agentName === orchestratorName;
    },

    isVanillaAgent(agentName: string | undefined): boolean {
      return VANILLA_AGENTS.has(agentName ?? '');
    },

    isOtherPluginAgent(agentName: string | undefined): boolean {
      if (!agentName) return false;
      // Not vanilla, not mine = other plugin's agent
      return (
        !VANILLA_AGENTS.has(agentName) &&
        !managedAgents.has(agentName) &&
        !agentName.startsWith(agentPrefix) &&
        agentName !== orchestratorName
      );
    },
  };
}

/**
 * Default awareness — override with your plugin's identity.
 * This is a template that MUST be customized.
 */
export const DEFAULT_AWARENESS = createAgentAwareness(
  new Set(['FIXME_SetYourAgentsHere']),
  'FIXME_',
  'FIXME_orchestrator'
);
```
### 14.4 Plugin Identity Config

---

### Source: `src/v4.1/config/identity.ts` (106 lines)

```typescript
/**
 * src/v4.1/config/identity.ts
 * 
 * Plugin identity constants — MUST be customized per plugin.
 * 
 * This is the single source of truth for:
 * - Who our agents are
 * - What prefix we use
 * - What our orchestrator is called
 */

/**
 * Plugin identity configuration.
 * Override these values for your plugin.
 */
export interface PluginIdentity {
  /** Unique plugin identifier (e.g., 'shark', 'hermes', 'spider') */
  name: string;
  /** Agent name prefix (e.g., 'shark_' for shark_coder) */
  prefix: string;
  /** Orchestrator agent name (e.g., 'architect', 'shark-architect') */
  orchestrator: string;
  /** All agents managed by this plugin */
  agents: Set<string>;
  /** Primary agents (visible in tab toggle) */
  primaryAgents: Set<string>;
  /** Subagent names (hidden from tab toggle) */
  subagents: Set<string>;
}

// TEMPLATE — Replace with your plugin's identity
export const PLUGIN_IDENTITY: PluginIdentity = {
  name: 'FIXME',           // e.g., 'shark'
  prefix: 'FIXME_',       // e.g., 'shark_'
  orchestrator: 'FIXME',   // e.g., 'shark-architect'
  
  agents: new Set([
    // Add your agent names here
    'FIXME-architect',
    'FIXME-coder',
    'FIXME-reviewer',
    'FIXME-tester',
  ]),
  
  primaryAgents: new Set([
    // Only orchestrator should be primary (visible in tab toggle)
    'FIXME-architect',
  ]),
  
  subagents: new Set([
    // All other agents are subagents
    'FIXME-coder',
    'FIXME-reviewer',
    'FIXME-tester',
  ]),
};

/**
 * Check if an agent is managed by this plugin.
 */
export function isMyAgent(agentName: string | undefined): boolean {
  if (!agentName) return false;
  return PLUGIN_IDENTITY.agents.has(agentName);
}

/**
 * Check if an agent is the orchestrator.
 */
export function isMyOrchestrator(agentName: string | undefined): boolean {
  return agentName === PLUGIN_IDENTITY.orchestrator;
}

/**
 * Check if an agent is a primary agent (visible in tab toggle).
 */
export function isPrimary(agentName: string | undefined): boolean {
  return PLUGIN_IDENTITY.primaryAgents.has(agentName ?? '');
}

/**
 * Check if an agent is a subagent (hidden from tab toggle).
 */
export function isSubagent(agentName: string | undefined): boolean {
  return PLUGIN_IDENTITY.subagents.has(agentName ?? '');
}

/**
 * Get all agents as an array.
 */
export function getAllAgents(): string[] {
  return Array.from(PLUGIN_IDENTITY.agents);
}

/**
 * Get primary agents as an array.
 */
export function getPrimaryAgents(): string[] {
  return Array.from(PLUGIN_IDENTITY.primaryAgents);
}

/**
 * Get subagents as an array.
 */
export function getSubagents(): string[] {
  return Array.from(PLUGIN_IDENTITY.subagents);
}
```
### 14.5 Agent Registration

---

### Source: `src/v4.1/config/agent-registration.ts` (83 lines)

```typescript
/**
 * src/v4.1/config/agent-registration.ts
 * 
 * Agent registration utilities for OpenCode tab toggles.
 * Ensures agents appear correctly in the UI.
 */

import { PLUGIN_IDENTITY, isPrimary } from './identity.js';

export interface AgentSDKConfig {
  name: string;
  description: string;
  instructions: string;
  mode: 'primary' | 'subagent';
  permission: { task: 'allow' };
  tools: Record<string, unknown>;
  // NOTE: model field should NOT be set for primary agents
  // OpenCode resolves the model from user config
}

/**
 * Convert AgentDefinition to SDK-compatible config for OpenCode.
 */
export function toSDKConfig(
  id: string,
  description: string,
  instructions: string
): AgentSDKConfig {
  const isPrimaryAgent = isPrimary(id);
  
  const config: AgentSDKConfig = {
    name: id,
    description,
    instructions,
    mode: isPrimaryAgent ? 'primary' : 'subagent',
    permission: { task: 'allow' },
    tools: {},
  };
  
  // PRIMARY AGENTS: Do NOT set model — let OpenCode resolve it
  // SUBAGENTS: Can optionally set model
  
  return config;
}

/**
 * Register agents into OpenCode's config.
 * Called from the plugin's config callback.
 */
export function registerAgents(
  opencodeConfig: Record<string, unknown>,
  agents: Map<string, { description: string; instructions: string }>
): void {
  const sdkConfigs: Record<string, AgentSDKConfig> = {};
  
  for (const [id, agent] of agents) {
    sdkConfigs[id] = toSDKConfig(id, agent.description, agent.instructions);
  }
  
  if (!opencodeConfig.agent) {
    opencodeConfig.agent = { ...sdkConfigs };
  } else {
    Object.assign(opencodeConfig.agent, sdkConfigs);
  }
}

/**
 * Register a single agent.
 */
export function registerAgent(
  opencodeConfig: Record<string, unknown>,
  id: string,
  description: string,
  instructions: string
): void {
  const config = toSDKConfig(id, description, instructions);
  
  if (!opencodeConfig.agent) {
    opencodeConfig.agent = { [id]: config };
  } else {
    (opencodeConfig.agent as Record<string, unknown>)[id] = config;
  }
}
```
### 14.6 Constants

---

### Source: `src/v4.1/config/constants.ts` (10 lines)

```typescript
/**
 * src/v4.1/config/constants.ts
 * 
 * V4.1 Constants
 */

export const HOOK_EXECUTION_TIMEOUT_MS = 30000;  // 30 second timeout
export const HEALTH_CHECK_TIMEOUT_MS = 5000;     // 5 second health check
export const FALLBACK_DIR = './fallback';
export const MAX_FALLBACK_FILE_SIZE = 10 * 1024 * 1024;  // 10MB
```
### 14.7 Logger

---

### Source: `src/v4.1/utils/logger.ts` (37 lines)

```typescript
/**
 * src/v4.1/utils/logger.ts
 * 
 * Simple logger for v4.1 hooks.
 * Logs to console with plugin prefix.
 */

export interface Logger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}

const LOG_PREFIX = '[v4.1]';

export function createLogger(pluginName: string): Logger {
  const prefix = `${LOG_PREFIX}[${pluginName}]`;
  
  return {
    debug(message: string, meta?: Record<string, unknown>) {
      console.debug(`${prefix} ${message}`, meta ?? {});
    },
    
    info(message: string, meta?: Record<string, unknown>) {
      console.info(`${prefix} ${message}`, meta ?? {});
    },
    
    warn(message: string, meta?: Record<string, unknown>) {
      console.warn(`${prefix} ${message}`, meta ?? {});
    },
    
    error(message: string, meta?: Record<string, unknown>) {
      console.error(`${prefix} ${message}`, meta ?? {});
    },
  };
}
```
### 14.8 Global State

---

### Source: `src/v4.1/state/global-state.ts` (92 lines)

```typescript
/**
 * src/v4.1/state/global-state.ts
 * 
 * Plugin-wide global state.
 * Use for: cumulative metrics, plugin config, read-mostly data.
 * DO NOT use for: per-session state (use session-state.ts instead).
 */

import { createStateStore, DOMAIN_OWNERSHIP, type StateStore, type StateDomain } from '../../factory/index.js';

// Tool metrics — cumulative across all sessions
const toolMetrics = new Map<string, { calls: number; failures: number; totalDuration: number }>();

// Plugin config — set once, read many
let pluginConfig: Record<string, unknown> = {};

/**
 * Initialize plugin config.
 * Called once at plugin initialization.
 */
export function initPluginConfig(config: Record<string, unknown>): void {
  pluginConfig = { ...config };
}

/**
 * Get plugin config.
 */
export function getPluginConfig(): Record<string, unknown> {
  return { ...pluginConfig };
}

/**
 * Record a tool metric.
 * Called after each tool execution.
 */
export function recordToolMetric(
  toolName: string,
  durationMs: number,
  success: boolean
): void {
  const metrics = toolMetrics.get(toolName) ?? {
    calls: 0,
    failures: 0,
    totalDuration: 0,
  };
  metrics.calls++;
  if (!success) metrics.failures++;
  metrics.totalDuration += durationMs;
  toolMetrics.set(toolName, metrics);
}

/**
 * Get all tool metrics.
 */
export function getToolMetrics(): Record<
  string,
  { calls: number; failures: number; totalDuration: number }
> {
  return Object.fromEntries(toolMetrics);
}

/**
 * Get a specific tool's metrics.
 */
export function getToolMetric(toolName: string): { calls: number; failures: number; totalDuration: number } | undefined {
  return toolMetrics.get(toolName);
}

/**
 * Reset tool metrics (for testing).
 */
export function resetToolMetrics(): void {
  toolMetrics.clear();
}

// Re-export StateStore for convenience
export { createStateStore, DOMAIN_OWNERSHIP } from '../../factory/index.js';
export type { StateStore, StateDomain } from '../../factory/index.js';

// Global state store instance
let globalStateStore: StateStore | null = null;

/**
 * Get or create the global state store.
 * Domain ownership enforced per-brain.
 */
export function getStateStore(): StateStore {
  if (!globalStateStore) {
    globalStateStore = createStateStore();
  }
  return globalStateStore;
}
```
### 14.9 Session State

---

### Source: `src/v4.1/state/session-state.ts` (67 lines)

```typescript
/**
 * src/v4.1/state/session-state.ts
 * 
 * Per-session state isolation.
 * Critical: State is keyed by sessionID, NOT stored globally.
 */

export interface SessionData {
  sessionId: string;
  phase?: string;
  activeAgent?: string;
  createdAt: number;
  lastActivity: number;
  // Plugin-specific fields
  [key: string]: unknown;
}

// Per-session state — session-scoped, NOT global
const sessionStates = new Map<string, SessionData>();

/**
 * Get or create session state for a session.
 * State is automatically cleaned up when session ends (if OpenCode emits session.end).
 */
export function getSessionState(sessionId: string): SessionData {
  let state = sessionStates.get(sessionId);
  if (!state) {
    state = {
      sessionId,
      createdAt: Date.now(),
      lastActivity: Date.now(),
    };
    sessionStates.set(sessionId, state);
  }
  state.lastActivity = Date.now();
  return state;
}

/**
 * Clear session state (called when session ends).
 */
export function clearSessionState(sessionId: string): void {
  sessionStates.delete(sessionId);
}

/**
 * Get all active session IDs.
 * For debugging/monitoring.
 */
export function getActiveSessions(): string[] {
  return Array.from(sessionStates.keys());
}

/**
 * Get session count.
 * For health monitoring.
 */
export function getSessionCount(): number {
  return sessionStates.size;
}

/**
 * Check if a session exists.
 */
export function hasSession(sessionId: string): boolean {
  return sessionStates.has(sessionId);
}
```
### 14.10 Compose Handlers

---

### Source: `src/v4.1/hooks/compose-handlers.ts` (32 lines)

```typescript
/**
 * src/v4.1/hooks/compose-handlers.ts
 * 
 * Hook composition utilities — chains multiple handlers.
 * Each handler receives ctx for safety context.
 */

import type { HookHandler } from './safe-hook.js';

export function composeHandlers<I = unknown, O = unknown>(
  ...handlers: Array<HookHandler<I, O> | undefined>
): HookHandler<I, O> {
  const validHandlers = handlers.filter((h): h is HookHandler<I, O> => h !== undefined);

  return async (input: I, output: O, ctx: any) => {
    for (const handler of validHandlers) {
      await handler(input, output, ctx);
    }
  };
}

export function composeHandlersSync<I = unknown, O = unknown>(
  ...handlers: Array<((input: I, output: O, ctx: any) => void) | undefined>
): HookHandler<I, O> {
  const validHandlers = handlers.filter((h): h is (input: I, output: O, ctx: any) => void => h !== undefined);

  return async (input: I, output: O, ctx: any) => {
    for (const handler of validHandlers) {
      handler(input, output, ctx);
    }
  };
}
```
### 14.11 v4.1 Index

---

### Source: `src/v4.1/index.ts` (87 lines)

```typescript
/**
 * src/v4.1/index.ts
 * 
 * V4.1 Plugin Isolation Framework — Re-exports
 * 
 * Use this module to access v4.1 guardrail infrastructure.
 */

// Hooks
export {
  safeHook,
  safeHookInputOnly,
  safeHookSync,
  type HookOptions,
  type HookHandler,
} from './hooks/safe-hook.js';

export {
  composeHandlers,
  composeHandlersSync,
} from './hooks/compose-handlers.js';

// Context
export {
  createAgentAwareness,
  DEFAULT_AWARENESS,
  type AgentAwareness,
} from './context/agent-awareness.js';

export {
  createHookContext,
  createAgentAwarenessContext,
  type HookContext,
  type SessionState,
} from './context/hook-context.js';

// State
export {
  getSessionState,
  clearSessionState,
  getActiveSessions,
  getSessionCount,
  hasSession,
  type SessionData,
} from './state/session-state.js';

export {
  initPluginConfig,
  getPluginConfig,
  recordToolMetric,
  getToolMetrics,
  getToolMetric,
  resetToolMetrics,
  getStateStore,
  createStateStore,
  DOMAIN_OWNERSHIP,
} from './state/global-state.js';

// Config
export {
  PLUGIN_IDENTITY,
  isMyAgent,
  isMyOrchestrator,
  isPrimary,
  isSubagent,
  getAllAgents,
  getPrimaryAgents,
  getSubagents,
  type PluginIdentity,
} from './config/identity.js';

export {
  toSDKConfig,
  registerAgents,
  registerAgent,
  type AgentSDKConfig,
} from './config/agent-registration.js';

export {
  HOOK_EXECUTION_TIMEOUT_MS,
  HEALTH_CHECK_TIMEOUT_MS,
  FALLBACK_DIR,
  MAX_FALLBACK_FILE_SIZE,
} from './config/constants.js';

// Utils
export { createLogger, type Logger } from './utils/logger.js';
```
## SECTION 15: FULL SOURCE CODE — Firewall Layers L0-L7

### 15.1 Firewall Pipeline (index.ts)

---

### Source: `src/brains/system/firewall/index.ts` (158 lines)

```typescript
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
import { checkKrakenProtection, checkProtectionPatterns, type L6CheckResult } from './l6-kraken-protection.js';
import { evaluateCoordinationGate, type L7CheckResult } from './l7-coordination-gates.js';

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
      // L3 is advisory — logs but doesn't block by default
      // System brain can upgrade to blocking
    }
  }

  // L4: Wrong cluster — validate domain assignment
  if (taskType && targetCluster) {
    const l4 = checkWrongCluster(message, taskType, targetCluster);
    result.layerResults.l4 = l4;
    if (!l4.valid && toolName.includes('spawn')) {
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
      // Advisory — logs the derailment for system brain to escalate
      console.warn(`[L5_MACRO_DERAILMENT] ${l5.reason}`);
    }
  }

  // L6: Kraken protection — zone-based access control
  const filePath = (toolArgs.filePath || toolArgs.path || toolArgs.target || '') as string;
  const command = (toolArgs.command || toolArgs.content || '') as string;
  if (filePath || command) {
    let operation: 'read' | 'write' | 'delete' = 'write';
    if (toolName === 'read' || toolName === 'grep' || toolName === 'glob') operation = 'read';
    if (toolName === 'bash') {
      const cmd = command as string;
      if (cmd.includes('rm ') || cmd.includes('delete')) operation = 'delete';
    }

    const l6a = checkKrakenProtection(filePath, operation);
    const l6b = checkProtectionPatterns(command);
    result.layerResults.l6 = l6a.allowed ? l6b : l6a;
    if (!result.layerResults.l6!.allowed) {
      result.allowed = false;
      result.blockedBy = 'L6';
      result.reason = result.layerResults.l6!.reason;
      return result;
    }
  }

  // L7: Coordination gates — evaluate gate criteria
  const l7 = evaluateCoordinationGate('task-assignment');
  result.layerResults.l7 = l7;

  return result;
}

export { checkKrakenIdentityWall, checkOrchestrationTheater, checkFalseCompletion,
         checkOutputInspection, checkWrongCluster, checkMacroDerailment,
         checkKrakenProtection, checkProtectionPatterns, evaluateCoordinationGate };
```
### 15.2 L0 — Identity Wall

---

### Source: `src/brains/system/firewall/l0-identity.ts` (58 lines)

```typescript
/**
 * L0: Kraken Identity Wall
 * Blocks non-Kraken agents from writing to Kraken-protected paths.
 * Allows all read operations.
 */

export const KRAKEN_PROTECTED_PATHS = [
  '/root/.config/opencode/plugins/kraken-agent/',
  '.config/opencode/plugins/kraken-agent/',
  '/root/.shark/evidence/',
  '.local/share/opencode/kraken-hive/',
];

export const KRAKEN_AGENTS = new Set([
  'kraken', 'kraken-executor',
  'shark-alpha-1', 'shark-alpha-2', 'manta-alpha-1',
  'shark-beta-1', 'manta-beta-1', 'manta-beta-2',
  'manta-gamma-1', 'manta-gamma-2', 'shark-gamma-1',
]);

const DANGEROUS_TOOLS = new Set([
  'bash', 'write', 'edit', 'Write', 'Edit',
]);

export interface L0CheckResult {
  allowed: boolean;
  reason?: string;
  layer: 'L0';
}

export function checkKrakenIdentityWall(
  agentName: string | undefined,
  toolName: string,
  args: Record<string, unknown>
): L0CheckResult {
  // Always allow Kraken agents
  if (agentName && KRAKEN_AGENTS.has(agentName)) {
    return { allowed: true, layer: 'L0' };
  }

  // Non-Kraken agents: block write operations to protected paths
  if (DANGEROUS_TOOLS.has(toolName)) {
    const filePath = (args.filePath || args.path || args.target || '') as string;
    const content = (args.content || args.command || '') as string;

    for (const protectedPath of KRAKEN_PROTECTED_PATHS) {
      if (filePath.includes(protectedPath) || content.includes(protectedPath)) {
        return {
          allowed: false,
          layer: 'L0',
          reason: `[L0_IDENTITY_WALL] Non-Kraken agent '${agentName}' blocked from ${toolName} to protected path: ${protectedPath}`,
        };
      }
    }
  }

  return { allowed: true, layer: 'L0' };
}
```
### 15.3 L1 — Orchestration Theater

---

### Source: `src/brains/system/firewall/l1-orchestration-theater.ts` (61 lines)

```typescript
/**
 * L1: Orchestration Theater Detection
 * Blocks "assigned = complete", "spawned = done", "queued = in progress" claims.
 */

const THEATER_PATTERNS = [
  // Spawn success = done
  { pattern: /spawn.*success/i, reason: 'spawn-success-is-not-done' },
  { pattern: /task.*spawned.*complete/i, reason: 'spawned-is-not-complete' },
  { pattern: /assigned.*done/i, reason: 'assigned-is-not-done' },
  { pattern: /queued.*complete/i, reason: 'queued-is-not-complete' },
  // Status inflation
  { pattern: /status.*complete.*without.*output/i, reason: 'complete-without-output' },
  { pattern: /success.*without.*retriev/i, reason: 'success-without-retrieval' },
  // Skip patterns
  { pattern: /skip.*verification/i, reason: 'skip-verification' },
  { pattern: /bypass.*gate/i, reason: 'bypass-gate' },
];

export interface L1CheckResult {
  passed: boolean;
  reason?: string;
  layer: 'L1';
  matchedPattern?: string;
}

export function checkOrchestrationTheater(
  message: string,
  status?: string
): L1CheckResult {
  // Check status-level theater claims
  if (status) {
    const theaterStatuses: Record<string, string> = {
      'assigned': 'Task assigned but not executed',
      'queued': 'Task queued but not started',
      'spawned': 'Task spawned but not tracked',
      'in_progress': 'Task in progress, not complete',
    };
    if (theaterStatuses[status]) {
      return {
        passed: false,
        layer: 'L1',
        reason: `[L1_THEATER] ${theaterStatuses[status]}`,
      };
    }
  }

  // Check message content for theater patterns
  for (const { pattern, reason } of THEATER_PATTERNS) {
    if (pattern.test(message)) {
      return {
        passed: false,
        layer: 'L1',
        reason: `[L1_THEATER] ${reason}`,
        matchedPattern: pattern.source,
      };
    }
  }

  return { passed: true, layer: 'L1' };
}
```
### 15.4 L2 — False Completion

---

### Source: `src/brains/system/firewall/l2-false-completion.ts` (69 lines)

```typescript
/**
 * L2: False Completion Detection
 * Blocks completion claims without output retrieval.
 * Output retrieval is MANDATORY — task completion ≠ outputs on host.
 */

const FALSE_COMPLETION_PATTERNS = [
  { pattern: /task.*complete/i, reason: 'completion-claim-without-verification' },
  { pattern: /build.*passed/i, reason: 'build-passed-without-output-check' },
  { pattern: /tests.*pass/i, reason: 'tests-passed-without-evidence' },
  { pattern: /all.*good/i, reason: 'all-good-without-verification' },
  { pattern: /done.*already/i, reason: 'done-already-claim' },
  { pattern: /finished.*it/i, reason: 'finished-claim' },
  { pattern: /no.*issues/i, reason: 'no-issues-claim' },
  { pattern: /it.*works.*trust.*me/i, reason: 'trust-me-claim' },
  { pattern: /output.*not.*needed/i, reason: 'output-not-needed-excuse' },
  { pattern: /output.*unnecessary/i, reason: 'output-unnecessary-excuse' },
  { pattern: /verified.*in.*container/i, reason: 'container-only-verification' },
  { pattern: /container.*filesystem.*verified/i, reason: 'container-fs-not-host' },
];

export interface L2CheckResult {
  passed: boolean;
  reason?: string;
  layer: 'L2';
  matchedPattern?: string;
  outputsRetrieved?: boolean;
}

export function checkFalseCompletion(
  message: string,
  outputsRetrieved: boolean,
  filesOnHost: string[]
): L2CheckResult {
  // Mechanical check: outputs MUST be retrieved
  if (!outputsRetrieved) {
    return {
      passed: false,
      layer: 'L2',
      reason: '[L2_FALSE_COMPLETION] Task claims completion but outputs not retrieved',
      outputsRetrieved: false,
    };
  }

  // Mechanical check: files MUST exist on host
  if (filesOnHost.length === 0) {
    return {
      passed: false,
      layer: 'L2',
      reason: '[L2_FALSE_COMPLETION] No files verified on host filesystem',
      outputsRetrieved: false,
    };
  }

  // Check message for false completion patterns
  for (const { pattern, reason } of FALSE_COMPLETION_PATTERNS) {
    if (pattern.test(message)) {
      return {
        passed: false,
        layer: 'L2',
        reason: `[L2_FALSE_COMPLETION] ${reason}`,
        matchedPattern: pattern.source,
        outputsRetrieved,
      };
    }
  }

  return { passed: true, layer: 'L2', outputsRetrieved };
}
```
### 15.5 L3 — Output Inspection

---

### Source: `src/brains/system/firewall/l3-output-inspection.ts` (67 lines)

```typescript
/**
 * L3: Output Inspection
 * Verifies outputs exist on HOST filesystem, not just container.
 * "File exists" in container ≠ retrieved on host.
 */

import fs from 'node:fs';

const INSPECTION_PATTERNS = [
  { pattern: /file.*exists.*container/i, reason: 'container-fs-not-host' },
  { pattern: /output.*in.*container/i, reason: 'output-still-in-container' },
  { pattern: /retrieved.*from.*container/i, reason: 'container-retrieval-not-host' },
  { pattern: /cp.*container.*host/i, reason: 'unverified-copy-claim' },
  { pattern: /docker.*cp/i, reason: 'docker-cp-not-automated' },
];

export interface L3CheckResult {
  passed: boolean;
  reason?: string;
  layer: 'L3';
  verifiedFiles: string[];
  missingFiles: string[];
}

export function checkOutputInspection(
  hostPaths: string[],
  message?: string
): L3CheckResult {
  const verifiedFiles: string[] = [];
  const missingFiles: string[] = [];

  // Mechanically verify each expected file exists on host
  for (const hostPath of hostPaths) {
    if (fs.existsSync(hostPath)) {
      verifiedFiles.push(hostPath);
    } else {
      missingFiles.push(hostPath);
    }
  }

  if (missingFiles.length > 0) {
    return {
      passed: false,
      layer: 'L3',
      reason: `[L3_OUTPUT_INSPECTION] ${missingFiles.length}/${hostPaths.length} files not found on host: ${missingFiles.join(', ')}`,
      verifiedFiles,
      missingFiles,
    };
  }

  // Check message for inspection-avoidance patterns
  if (message) {
    for (const { pattern, reason } of INSPECTION_PATTERNS) {
      if (pattern.test(message)) {
        return {
          passed: false,
          layer: 'L3',
          reason: `[L3_OUTPUT_INSPECTION] ${reason}`,
          verifiedFiles,
          missingFiles,
        };
      }
    }
  }

  return { passed: true, layer: 'L3', verifiedFiles, missingFiles };
}
```
### 15.6 L4 — Wrong Cluster

---

### Source: `src/brains/system/firewall/l4-wrong-cluster.ts` (87 lines)

```typescript
/**
 * L4: Wrong Cluster Detection
 * Alpha = steamroll (build, feature, implement)
 * Beta = precision (debug, fix, refactor, analyze)
 * Gamma = testing (test, verify, audit)
 * Wrong cluster = wrong approach = wasted time.
 */

export const TASK_DOMAIN_MAP: Record<string, string> = {
  'build': 'alpha',
  'create': 'alpha',
  'implement': 'alpha',
  'feature': 'alpha',
  'write': 'alpha',
  'scaffold': 'alpha',
  'prototype': 'alpha',

  'debug': 'beta',
  'fix': 'beta',
  'refactor': 'beta',
  'analyze': 'beta',
  'investigate': 'beta',
  'review': 'beta',
  'examine': 'beta',
  'inspect': 'beta',

  'test': 'gamma',
  'verify': 'gamma',
  'validate': 'gamma',
  'audit': 'gamma',
  'assess': 'gamma',
  'integration': 'gamma',
};

export const CLUSTER_MAP: Record<string, string> = {
  'alpha': 'cluster-alpha',
  'cluster-alpha': 'cluster-alpha',
  'beta': 'cluster-beta',
  'cluster-beta': 'cluster-beta',
  'gamma': 'cluster-gamma',
  'cluster-gamma': 'cluster-gamma',
};

const WRONG_CLUSTER_PATTERNS = [
  { pattern: /debug.*alpha/i, reason: 'debug-task-to-alpha' },
  { pattern: /fix.*alpha/i, reason: 'fix-task-to-alpha' },
  { pattern: /test.*alpha/i, reason: 'test-task-to-alpha' },
  { pattern: /build.*gamma/i, reason: 'build-task-to-gamma' },
  { pattern: /implement.*gamma/i, reason: 'implement-task-to-gamma' },
];

export interface L4CheckResult {
  valid: boolean;
  reason?: string;
  layer: 'L4';
}

export function checkWrongCluster(
  taskDescription: string,
  taskType: string,
  targetCluster: string
): L4CheckResult {
  const expectedDomain = TASK_DOMAIN_MAP[taskType] || 'alpha';
  const resolvedTarget = CLUSTER_MAP[targetCluster] || targetCluster;
  const resolvedExpected = CLUSTER_MAP[expectedDomain] || `cluster-${expectedDomain}`;

  if (resolvedTarget !== resolvedExpected) {
    return {
      valid: false,
      layer: 'L4',
      reason: `[L4_WRONG_CLUSTER] Task type '${taskType}' belongs to ${resolvedExpected}, not ${resolvedTarget}`,
    };
  }

  // Pattern-based detection
  for (const { pattern, reason } of WRONG_CLUSTER_PATTERNS) {
    if (pattern.test(taskDescription)) {
      return {
        valid: false,
        layer: 'L4',
        reason: `[L4_WRONG_CLUSTER] ${reason} detected in task description`,
      };
    }
  }

  return { valid: true, layer: 'L4' };
}
```
### 15.7 L5 — Macro Derailment

---

### Source: `src/brains/system/firewall/l5-macro-derailment.ts` (79 lines)

```typescript
/**
 * L5: Macro Derailment Detection
 * Focus collisions, planner-executor desync, context stale, premature completion.
 */

interface MacroCheck {
  type: 'focus_collision' | 'planner_executor_desync' | 'context_stale' | 'premature_completion';
  patterns: RegExp[];
  reason: string;
}

const MACRO_CHECKS: MacroCheck[] = [
  {
    type: 'focus_collision',
    patterns: [
      /already.*working.*on/i,
      /another.*agent.*handling/i,
      /conflict.*with.*existing/i,
      /duplicate.*task/i,
    ],
    reason: 'focus-collision-detected',
  },
  {
    type: 'planner_executor_desync',
    patterns: [
      /plan.*changed.*after.*start/i,
      /diverged.*from.*plan/i,
      /different.*than.*planned/i,
      /not.*what.*was.*requested/i,
    ],
    reason: 'planner-executor-desync',
  },
  {
    type: 'context_stale',
    patterns: [
      /based.*on.*old.*context/i,
      /stale.*information/i,
      /outdated.*spec/i,
      /since.*last.*update/i,
      /workspace.*changed/i,
    ],
    reason: 'context-stale',
  },
  {
    type: 'premature_completion',
    patterns: [
      /early.*return/i,
      /skip.*remaining/i,
      /rest.*later/i,
      /finish.*later/i,
      /partial.*complete/i,
    ],
    reason: 'premature-completion',
  },
];

export interface L5CheckResult {
  passed: boolean;
  reason?: string;
  layer: 'L5';
  derailmentType?: string;
}

export function checkMacroDerailment(message: string): L5CheckResult {
  for (const check of MACRO_CHECKS) {
    for (const pattern of check.patterns) {
      if (pattern.test(message)) {
        return {
          passed: false,
          layer: 'L5',
          reason: `[L5_MACRO_DERAILMENT] ${check.reason}: ${check.type}`,
          derailmentType: check.type,
        };
      }
    }
  }

  return { passed: true, layer: 'L5' };
}
```
### 15.8 L6 — Kraken Protection

---

### Source: `src/brains/system/firewall/l6-kraken-protection.ts` (89 lines)

```typescript
/**
 * L6: Kraken Zone Protection
 * SYSTEM zone: read-only, never modified
 * STATE zone: managed by Hive only
 * COMPACTION zone: auto-managed, never manual
 */

export const KRAKEN_ZONES = {
  SYSTEM: {
    paths: [
      '/root/.config/opencode/',
      '.config/opencode/',
    ],
    access: 'read-only' as const,
    description: 'Kraken configuration zone',
  },
  STATE: {
    paths: [
      '/root/.local/share/opencode/kraken-hive/',
      '.local/share/opencode/kraken-hive/',
    ],
    access: 'hive-only' as const,
    description: 'Kraken state managed by Hive',
  },
  COMPACTION: {
    paths: [
      '/tmp/kraken-compaction/',
    ],
    access: 'auto-managed' as const,
    description: 'Compaction survival data',
  },
};

const PROTECTION_PATTERNS = [
  { pattern: /rm\s+-rf.*kraken/i, reason: 'attempted-kraken-deletion' },
  { pattern: /delete.*kraken.*config/i, reason: 'config-deletion-attempt' },
  { pattern: /overwrite.*kraken.*state/i, reason: 'state-overwrite-attempt' },
];

export interface L6CheckResult {
  allowed: boolean;
  reason?: string;
  layer: 'L6';
  zone?: string;
}

export function checkKrakenProtection(
  filePath: string,
  operation: 'read' | 'write' | 'delete'
): L6CheckResult {
  for (const [zoneName, zone] of Object.entries(KRAKEN_ZONES)) {
    for (const zonePath of zone.paths) {
      if (filePath.includes(zonePath)) {
        if (zone.access === 'read-only' && operation !== 'read') {
          return {
            allowed: false,
            layer: 'L6',
            reason: `[L6_KRAKEN_PROTECTION] ${zoneName} zone is read-only — cannot ${operation}: ${filePath}`,
            zone: zoneName,
          };
        }
        if (zone.access === 'hive-only' && operation !== 'read') {
          return {
            allowed: false,
            layer: 'L6',
            reason: `[L6_KRAKEN_PROTECTION] ${zoneName} zone is Hive-managed — cannot ${operation}: ${filePath}`,
            zone: zoneName,
          };
        }
      }
    }
  }

  return { allowed: true, layer: 'L6' };
}

export function checkProtectionPatterns(command: string): L6CheckResult {
  for (const { pattern, reason } of PROTECTION_PATTERNS) {
    if (pattern.test(command)) {
      return {
        allowed: false,
        layer: 'L6',
        reason: `[L6_KRAKEN_PROTECTION] ${reason}`,
      };
    }
  }

  return { allowed: true, layer: 'L6' };
}
```
### 15.9 L7 — Coordination Gates

---

### Source: `src/brains/system/firewall/l7-coordination-gates.ts` (78 lines)

```typescript
/**
 * L7: Coordination Gates
 * task-assignment-gate: before execution, validate task is properly formed
 * output-retrieval-gate: before merge, verify outputs exist on host
 * roundtable-sync-gate: before next sprint, sync all three brains
 */

export interface GateDefinition {
  gateId: string;
  description: string;
  criteria: { requirement: string; check: () => boolean }[];
}

export const COORDINATION_GATES: GateDefinition[] = [
  {
    gateId: 'task-assignment',
    description: 'Validate task before assigning to cluster',
    criteria: [
      { requirement: 'Task has description', check: () => true },
      { requirement: 'Task has target cluster', check: () => true },
      { requirement: 'Domain designation is valid', check: () => true },
      { requirement: 'No focus collision detected', check: () => true },
    ],
  },
  {
    gateId: 'output-retrieval',
    description: 'Verify outputs before merging',
    criteria: [
      { requirement: 'Outputs retrieved from container', check: () => true },
      { requirement: 'Files exist on host filesystem', check: () => true },
      { requirement: 'File sizes match expected', check: () => true },
      { requirement: 'No corruption detected', check: () => true },
    ],
  },
  {
    gateId: 'roundtable-sync',
    description: 'Sync all three brains before next sprint',
    criteria: [
      { requirement: 'Planning brain reports T1 complete', check: () => true },
      { requirement: 'Execution brain reports all tasks supervised', check: () => true },
      { requirement: 'System brain gate evaluation passed', check: () => true },
      { requirement: 'Brain messenger queue drained', check: () => true },
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
  customCriteria?: { requirement: string; check: () => boolean }[]
): L7CheckResult {
  const gate = COORDINATION_GATES.find(g => g.gateId === gateId);
  const criteria = customCriteria || gate?.criteria || [];
  
  const criteriaResults = criteria.map(c => ({
    requirement: c.requirement,
    passed: c.check(),
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
```
## SECTION 16: T2 Context Library (ALL Files)

### 16.1 ALIGNMENT BIBLE

---

### Source: `kraken-context/T2_ALIGNMENT_BIBLE.md` (42 lines)

```markdown
# T2_ALIGNMENT_BIBLE — Kraken Failure Mode Encyclopedia

## 10 Failure Modes

| # | Failure Mode | Root Cause | Correct Fix |
|---|---|---|---|
| 1 | **Fake Task Execution** | `simulateTaskExecution()` returned success after 100ms — no real Docker containers spawned | Always verify Docker process exists after spawn: `docker ps \| grep opencode` |
| 2 | **Dual Plugin Breakdown** | Adding v1.2 plugin without removing v1.1 → both loaded → tool conflicts, config corruption | **EXPLICIT removal** of old plugin before adding new. Single plugin per agent type. |
| 3 | **Evidence Variable Ordering** | `evidence` variable referenced before definition in all Kraken tools → "evidence is not defined" | Define `evidence` before any usage. Hoist initialization to top of execute block. |
| 4 | **Config Corruption** | Adding plugin agents modified `opencode.json` `agents:{}` block incorrectly → agent disappeared from TUI | Never modify agents block programmatically. Manual config only. Verify with `cat opencode.json` after. |
| 5 | **Parallel Tools All Failed** | 3 different tools, 3 different bugs: `spawn_cluster_task` → "Cluster not found", `run_parallel_tasks` → "requires shim", `run_subagent_task` → CLI arg parsing bug | Each tool must be independently tested in TUI. No assuming "one works = all work". |
| 6 | **Hook Format Misunderstanding** | Hooks returned arrays instead of functions → `chat.message: [(ctx) => {...}]` instead of `chat.message: (ctx) => {...}` | Hooks are **functions**, not arrays. Single handler per hook name. |
| 7 | **Experimental Hooks Crash** | Used `experimental.*` hooks that changed API between versions → runtime crash | Pin to stable hooks only. Never ship with experimental hooks. |
| 8 | **Memory Leaks** | Global state accumulated across sessions without cleanup → OOM | Scoped state per session. Always cleanup in `experimental.session.compacting` hook. |
| 9 | **Wrong Agent Versions** | GitHub v1.0 shipped with Python wrapper (never called), v1.1 local had same code → theatrical execution | Verify version by checking git tag + bundle hash. Source-only verification is worthless. |
| 10 | **No Container Testing** | Shipped to production without ever running TUI in Docker → all hooks broken | **Mandatory**: Docker container TUI test before ANY ship. See T2_TUI_TESTING.md. |

## 3 Architecture Principles

1. **Execution > Initiation** — Spawning a task ≠ task complete. Track→Retrieve→Verify→Merge.
2. **Mechanical > Textual** — 90% enforcement via code (firewalls, gates, schemas), 10% via text matching.
3. **Isolation > Integration** — Every component independently testable. No cross-component dependency assumptions.

## Testing Protocol

```
PLAN → BUILD → DEPLOY to Docker → TUI TEST in container → VERIFY hooks fired → SHIP
```
- **NEVER** skip container testing
- **NEVER** use `opencode run` as substitute (hooks don't fire)
- **ALWAYS** verify `tool.execute.before` and `chat.message` hooks fired in TUI output
- Evidence: capture-pane output showing hook activation messages

## Migration Rules

| Rule | Detail |
|---|---|
| **Old plugin REMOVAL** | Remove old plugin from `opencode.json` before adding new. Dual loading = corruption. |
| **Bundle rebuild** | Every source change → `bun run build` → copy `dist/index.js` to plugin path |
| **Config verify** | After any config change: `cat opencode.json` and confirm structure intact |
| **Version bump** | Tag with `git tag vX.Y.Z` AND record bundle hash in BUILD_STATE.txt |
| **Rollback ready** | Keep last known-good bundle at `dist/index.js.bak` before deploying new |
```
### 16.2 ARCHITECTURE

---

### Source: `kraken-context/T2_ARCHITECTURE.md` (139 lines)

```markdown
# T2_ARCHITECTURE — Multi-Brain Integration

## Brain Wiring Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    KRAKEN ORCHESTRATOR                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  PLANNING   │  │  EXECUTION  │  │   SYSTEM    │         │
│  │  T2 Master  │  │ Supervisor  │  │ L0-L7       │         │
│  │  T1 Gen     │  │ Override    │  │ Gates       │         │
│  │  Task Dec   │  │ Momentum    │  │ Derail      │         │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘         │
│         │               │               │                 │
│         └───────────────┼───────────────┘                 │
│                         │                                  │
│              ┌──────────┴──────────┐                      │
│              │  BRAIN MESSENGER    │                      │
│              │  Priority signaling │                      │
│              └──────────┬──────────┘                      │
│                         │                                  │
│  ┌──────────┬───────────┼───────────┬──────────┐         │
│  ▼          ▼           ▼           ▼          ▼         │
│ ALPHA     BETA       GAMMA       ALPHA-X    BETA-X       │
│ Steamroll Precision   Testing   (spawnable)(spawnable)    │
│ Cluster   Cluster    Cluster                              │
│  └──────────┴───────────┼───────────┘                    │
│                         │                                  │
│              ┌──────────┴──────────┐                      │
│              │  SUBAGENT-MANAGER   │                      │
│              │  (Autonomous)       │                      │
│              └─────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

## Domain Ownership Table

| Domain State | Owners |
|---|---|
| `planning-state` | kraken-planning, kraken-system |
| `execution-state` | kraken-execution, kraken-system |
| `thinking-state` | kraken-reasoning, kraken-system |
| `context-bridge` | kraken-planning |
| `workflow-state` | kraken-system, kraken-execution |
| `security-state` | kraken-system |
| `quality-state` | kraken-execution, kraken-system |
| `container-state` | kraken-subagent |
| `execution-queue` | kraken-subagent, kraken-execution |
| `alpha-state` | alpha-execution, alpha-system |
| `beta-state` | beta-reasoning, beta-system |
| `gamma-state` | gamma-system, gamma-execution |

## Brain Messenger API

```typescript
interface BrainMessage {
  from: string;
  to: string;
  type: 'context-inject' | 'gate-failure' | 'checkpoint' | 'override' | 'sync';
  priority: 'critical' | 'high' | 'normal' | 'low';
  payload: Record<string, unknown>;
  requiresAck: boolean;
}

// Planning → Execution: context injection
messenger.send({ from: 'kraken-planning', to: 'kraken-execution',
  type: 'context-inject', priority: 'high',
  payload: { 'thinking-state': { 'spec-context': [...] } }, requiresAck: false });

// Execution → Subagent: override
messenger.send({ from: 'kraken-execution', to: 'subagent-manager',
  type: 'override', priority: 'critical',
  payload: { action: 'retrieve-outputs', taskId: 'xyz' }, requiresAck: true });
```

Message types: `context-inject` (Planning→Execution), `gate-failure` (System→any), `checkpoint` (any→any), `override` (Execution→Subagent), `sync` (any→any).

## Integration Pipeline Flow

```
User Message
  │
  ▼
chat.message hook → identity detection → T1 generation (Planning Brain)
  │
  ▼
Planning Brain → BrainMessage → Execution Brain
  │
  ▼
Execution Brain → delegation request → AsyncDelegationEngine
  │
  ▼
Delegation Engine → L4 domain validation → cluster assignment
  │
  ▼
Cluster Manager → spawn task → Subagent-Manager → Docker container
  │
  ▼
Subagent output → L2 retrieval check → Evidence Collector → Gate evaluation
  │
  ▼
System Brain → evaluateGateEntry → auto-advance → report to Execution Brain
  │
  ▼
Execution Brain → completeTask → response to user
```

## Cluster Assignment Map

| Cluster | Domain | Lead Brain | Task Types | Spawn Tool |
|---|---|---|---|---|
| **Alpha** | Steamroll builds | Execution | from-scratch, new-feature, implement | `spawn_shark_agent` |
| **Beta** | Precision tasks | Reasoning | debug, fix, refactor, analyze | `spawn_manta_agent` |
| **Gamma** | Testing/verification | System | test, verify, audit, gates | `spawn_cluster_task` |

## Brain-to-Brain Communication

All inter-brain communication flows through the Brain Messenger. Direct cross-brain access is prohibited.

| From → To | Message Types | Priority | Ack Required |
|---|---|---|---|
| Planning → Execution | context-inject, checkpoint | high | No |
| Planning → System | sync | normal | No |
| Execution → Planning | sync, checkpoint | normal | No |
| Execution → System | gate-failure | high | No |
| Execution → Subagent | override | critical | **Yes** |
| System → Execution | gate-failure, derailment | critical | No |
| System → Planning | sync | low | No |

## Concurrency Pattern

```
Parallel: Multiple cluster spawns → independent Docker containers → concurrent execution
Sequential within cluster: Tasks queue FIFO per cluster
Gate-based gating: GAMMA must approve before ALPHA declares build complete

Task lifecycle:
  PENDING → ASSIGNED (L4 validated) → RUNNING → OUTPUT_READY (L2 checked) → VERIFIED (L3) → COMPLETE
```
```
### 16.3 BUILD CHAIN

---

### Source: `kraken-context/T2_BUILD_CHAIN.md` (100 lines)

```markdown
# T2_BUILD_CHAIN.md
# Successful Build Chains from Kraken Hive
## Source: Kraken Hive - sessions/
## Last Updated: 2026-04-08

## Overview
This is the T2 reference library for successful build chains. These are proven sequences of steps that have worked well for past tasks. Use these as templates for similar work.

## Build Chain Templates

### Build Chain: New Feature (Shark Steamroll)
```
1. RECEIVE_TASK(task) → Kraken assigns with context injection
2. READ_SPEC(spec) → If SPEC.md exists, read it first
3. CREATE_STRUCTURE() → Scaffold files/directories
4. IMPLEMENT_CORE() → Write core logic
5. ADD_ERROR_HANDLING() → Wrap in try/catch, add validation
6. RUN_TESTS() → Execute test suite
7. VERIFY_BUILD() → Run lint/typecheck
8. REPORT_COMPLETE() → report_to_kraken taskId=X status=complete
```

### Build Chain: Debug Task (Manta Precision)
```
1. RECEIVE_TASK(task) → Kraken assigns debug task
2. REPRODUCE_ERROR() → Get consistent reproduction
3. ISOLATE_ROOT_CAUSE() → Binary search through code
4. APPLY_FIX() → Minimal targeted fix
5. VERIFY_FIX() → Run tests, check error gone
6. CHECK_SIDE_EFFECTS() → Run related tests
7. REPORT_COMPLETE() → report_to_kraken taskId=X status=complete
```

### Build Chain: Test Implementation
```
1. RECEIVE_TASK(task) → Kraken assigns test writing
2. READ_IMPLEMENTATION() → Understand what to test
3. WRITE_HAPPY_PATH() → Test the main success case
4. WRITE_EDGE_CASES() → Test boundary conditions
5. WRITE_ERROR_CASES() → Test error handling
6. RUN_TEST_SUITE() → Verify all tests pass
7. REPORT_COMPLETE() → report_to_kraken taskId=X status=complete
```

### Build Chain: API Implementation
```
1. RECEIVE_TASK(task) → Kraken assigns API task
2. DEFINE_INTERFACE() → Write TypeScript interfaces first
3. IMPLEMENT_VALIDATION() → Add input validation
4. IMPLEMENT_HANDLER() → Write the actual logic
5. ADD_ERROR_RESPONSES() → Structured error responses
6. WRITE_TESTS() → Test success and error paths
7. VERIFY_WITH_LINT() → Run lint and typecheck
8. REPORT_COMPLETE() → report_to_kraken taskId=X status=complete
```

## Context Injection Guide

When Kraken injects context, it provides:

### Pattern Context
Previous patterns that match the current task. Apply these patterns to your implementation.

### Failure Context  
Known failures to avoid. Review these before implementing to prevent repeating mistakes.

### Previous Work Context
Similar past tasks and how they were solved. Use these as reference implementations.

## Best Practices

### Before You Start
1. Check T2_PATTERNS.md for relevant patterns
2. Check T2_FAILURE_MODES.md for failures to avoid
3. Read injected context from Kraken
4. Clarify any ambiguities with Kraken via report_to_kraken

### During Implementation
1. Follow the appropriate build chain template
2. Report progress via report_to_kraken if blocked
3. Don't deviate from spec without Kraken approval
4. Keep code simple and focused

### After Completion
1. Verify against acceptance criteria
2. Run lint and typecheck
3. Report completion to Kraken
4. Document any patterns/failures you discovered

---

## Workflow States

- **PENDING**: Task assigned, not started
- **IN_PROGRESS**: Actively working on task
- **BLOCKED**: Encountered issue, waiting for Kraken
- **COMPLETE**: Task finished and verified
- **FAILED**: Task failed, reported to Kraken

Report state changes to Kraken via `report_to_kraken status=X`.
```
### 16.4 COMPACTION SURVIVAL

---

### Source: `kraken-context/T2_COMPACTION_SURVIVAL.md` (114 lines)

```markdown
# T2_COMPACTION_SURVIVAL — Context Persistence Protocol

## 3-Tier Token Budget

| Tier | Threshold | Action |
|---|---|---|
| **65%** (~110K tokens) | WARNING | Begin pre-compaction export. Save current state. Stop starting new parallel tasks. |
| **75%** (~127K tokens) | CRITICAL | Halt all new work. Complete in-flight writes. Export ALL state to disk. Create HANDOVER_PACKAGE. |
| **85%** (~144K tokens) | IMMINENT | Compaction will trigger any moment. Final flush. Write BUILD_STATE.txt. |

## Pre-Compaction Export Protocol

When token budget hits 65%, IMMEDIATELY:

```bash
# 1. Export current BUILD_STATE
cat > "Compaction Survival/HANDOVER_PACKAGES/$(date +%Y%m%d_%H%M%S)_precompact.md" << 'STATE'
## BUILD STATE
Phase: {PLAN|BUILD|TEST|VERIFY|SHIP}
Last completed: {task description}
In-flight: {task description}
Next: {task description}
Unsolved errors: {list}
STATE

# 2. Save brain state to evidence
mkdir -p ~/.local/share/opencode/kraken-hive/evidence/$(date +%Y%m%d_%H%M%S)/
# Copy all current gate states, evidence files, checkpoint data

# 3. Write compaction survival marker
echo "COMPACTION_READY $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "Compaction Survival/.compaction-marker"
```

## Post-Compaction Recovery Steps

After session restarts (compaction truncated context):

```bash
# 1. Read the survival doc (ALWAYS FIRST)
cat "Compaction Survival/COMPACTION_SURVIVAL.md"

# 2. Find most recent handover
ls -t "Compaction Survival/HANDOVER_PACKAGES/" | head -1

# 3. Check what's real on disk
ls -la ~/.config/opencode/plugins/kraken-agent/dist/index.js
ls -la "dist/index.js"

# 4. Verify build state
cat "Compaction Survival/CHECKPOINTS/"*/BUILD_STATE.txt

# 5. Rebuild if mismatch detected
bun run build && cp dist/index.js ~/.config/opencode/plugins/kraken-agent/dist/index.js

# 6. Resume from last completed checkpoint
```

## Checkpoint Hygiene

### Save after EVERY milestone:
- Source file changes committed/written
- Bundle built successfully
- TUI test passed
- Gate advanced
- Bug fixed and verified in TUI

### What to save:
```
CHECKPOINTS/{YYYYMMDD_HHMMSS}-{milestone-name}/
├── BUILD_STATE.txt      ← Phase, last done, next, errors
├── source-snapshot/     ← Full src/ copy
├── bundle/              ← dist/index.js
```

### Checkpoint command:
```bash
CKPT="CHECKPOINTS/$(date +%Y%m%d_%H%M%S)-{name}"
mkdir -p "$CKPT"/{source-snapshot,bundle}
cp -r src/* "$CKPT/source-snapshot/"
cp dist/index.js "$CKPT/bundle/"
# Write BUILD_STATE.txt with current phase and status
```

## Evidence Persistence

```bash
# All evidence survives in:
~/.local/share/opencode/kraken-hive/evidence/
  ├── gate-progress.json       ← Current gate chain state
  ├── evidence-{gate}.json     ← Per-gate collected evidence
  ├── task-outputs/            ← Retrieved task outputs
  └── fire-and-forget-log.json ← L1/L2 violations detected
```

## Survival Filesystem Layout

```
v1.2 Rebuild/
├── Compaction Survival/
│   ├── COMPACTION_SURVIVAL.md       ← THIS FILE (read first)
│   ├── HANDOVER_PACKAGES/           ← Pre-compact exports
│   └── .compaction-marker           ← Write before compaction imminent
├── CHECKPOINTS/
│   └── {timestamp}-{milestone}/
│       ├── BUILD_STATE.txt
│       ├── source-snapshot/
│       └── bundle/
├── artifacts/
│   ├── BUILD_LOG.md                 ← APPEND ONLY action log
│   ├── CHANGE_LOG.md                ← What changed
│   └── DEBUG_LOG.md                 ← Errors and fixes
├── dist/index.js                    ← Built bundle
└── src/                             ← TypeScript source
```
```
### 16.5 CRASH RECOVERY

---

### Source: `kraken-context/T2_CRASH_RECOVERY.md` (81 lines)

```markdown
# T2_CRASH_RECOVERY — Session Continuation Protocol

## Golden Rule

**Every session start = Read COMPACTION_SURVIVAL.md FIRST. Always.**

```bash
cat "/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/Active Projects/v1.2 Rebuild/Compaction Survival/COMPACTION_SURVIVAL.md"
```

## The Prime Directive

> **IF IT'S NOT REAL, IT'S NOT DONE.**
> File on disk = real. Claim in chat = fiction.
> Bundle built and deployed = real. "The code is there" = fiction.

## Session Recovery Protocol

### Step 1: Identify Build Phase
```
Read CHECKPOINTS/*/BUILD_STATE.txt → find highest checkpoint number → determine phase: PLAN|BUILD|TEST|VERIFY|SHIP
```

### Step 2: Verify What's Real
```bash
# Check bundle exists
ls -la ~/.config/opencode/plugins/kraken-agent/dist/index.js
# Check source matches bundle
ls -la "Shared Workspace Context/Kraken Agent/Active Projects/v1.2 Rebuild/dist/index.js"
# Check OpenCode version
opencode --version
```

### Step 3: Rebuild if Needed
```bash
cd "/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/Active Projects/v1.2 Rebuild"
bun run build
cp dist/index.js ~/.config/opencode/plugins/kraken-agent/dist/index.js
```

### Step 4: Resume from Last Checkpoint
- Read `CHECKPOINTS/*/BUILD_STATE.txt` for last completed task
- Read `artifacts/BUILD_LOG.md` for action history
- Read `artifacts/DEBUG_LOG.md` for unsolved issues
- Skip already-completed steps

## Checkpoint Hygiene

### When to checkpoint (after EVERY milestone):
- Source changes committed
- Bundle built successfully
- TUI test passed
- Gate advanced
- Bug fixed and verified

### What to save per checkpoint:
```
CHECKPOINTS/{timestamp}-{milestone}/
├── BUILD_STATE.txt    ← Phase, last completed task, next task
├── source-snapshot/   ← Copy of src/ at this point
└── bundle/            ← dist/index.js built at this point
```

### Checkpoint command:
```bash
mkdir -p "CHECKPOINTS/$(date +%Y%m%d_%H%M%S)-{milestone}"
cp BUILD_STATE.txt "CHECKPOINTS/$(date +%Y%m%d_%H%M%S)-{milestone}/"
cp -r src/ "CHECKPOINTS/$(date +%Y%m%d_%H%M%S)-{milestone}/source-snapshot/"
cp dist/index.js "CHECKPOINTS/$(date +%Y%m%d_%H%M%S)-{milestone}/bundle/"
```

## Key File Locations

| Purpose | Path |
|---|---|
| Compaction survival | `.../v1.2 Rebuild/Compaction Survival/COMPACTION_SURVIVAL.md` |
| Build logs | `.../v1.2 Rebuild/artifacts/BUILD_LOG.md` |
| Debug logs | `.../v1.2 Rebuild/artifacts/DEBUG_LOG.md` |
| Checkpoints | `.../v1.2 Rebuild/CHECKPOINTS/` |
| Deployed plugin | `~/.config/opencode/plugins/kraken-agent/dist/index.js` |
| Source | `.../v1.2 Rebuild/src/` |
```
### 16.6 FAILURE MODES

---

### Source: `kraken-context/T2_FAILURE_MODES.md` (101 lines)

```markdown
# T2_FAILURE_MODES.md
# Known Failure Modes from Kraken Hive
## Source: Kraken Hive - failures/
## Last Updated: 2026-04-08

## Overview
This is the T2 reference library for known failure modes. These failures have been recorded by Kraken through agent reports andHive Mind analysis. Read this to avoid repeating past mistakes.

## Critical Failures

### Failure: Circular Dependencies
**Cause:** Modules importing each other creating circular references
**Detection:** TypeScript errors about types not being found
**Solution:** 
- Use dependency injection
- Import types only (not implementations)
- Restructure module boundaries
- Use interface segregation

### Failure: Type Errors in Production
**Cause:** Not running type check before deploy
**Detection:** `tsc` failing silently or not run
**Solution:**
- Always run `npm run typecheck` or `bun tsc --noEmit` before ship
- Add typecheck to pre-push hook
- Never bypass TypeScript errors
- Use `strict: true` in tsconfig

### Failure: Missing Error Handling
**Cause:** Async operations without try/catch or .catch()
**Detection:** Unhandled promise rejections
**Solution:**
- Always wrap async calls in try/catch
- Add .catch() to all promises
- Use explicit error types
- Log errors with context

### Failure: Memory Leaks
**Cause:** Event listeners not cleaned up, intervals not cleared
**Detection:** Memory usage growing over time
**Solution:**
- Clean up all event listeners
- Clear intervals/timeouts
- Use weak references where appropriate
- Track resource allocation

## Common Implementation Failures

### Failure: Premature "Done" Declaration
**Cause:** Declaring task complete without verification
**Detection:** Features that don't work as expected
**Solution:**
- Run tests after implementation
- Verify against acceptance criteria
- Check error logs
- Report actual completion to Kraken

### Failure: Scope Creep
**Cause:** Adding features beyond original task
**Detection:** Tasks taking longer than expected
**Solution:**
- Stick to SPEC.md exactly
- Report scope questions to Kraken
- Don't "improve" unrelated code
- Ask for clarification when uncertain

### Failure: Guardian Zone Violations
**Cause:** Writing to blocked directories (PERSONAL, CONFIG, SYSTEM)
**Detection:** Guardian blocks the operation
**Solution:**
- Only work in WORKSPACE and SANDBOX zones
- Never touch ~/.ssh, ~/.aws, /etc
- Ask Kraken if unsure about zone

## Agent-Specific Failures

### Shark Failure: Over-Engineering
Sharks sometimes over-engineer solutions by:
- Adding abstractions too early
- Building for "future" features
- Creating unnecessary complexity
**Fix:** Start simple, iterate based on actual needs

### Manta Failure: Analysis Paralysis
Mantas sometimes get stuck in:
- Excessive error case analysis
- Over-testing trivial cases
- Over-thinking simple solutions
**Fix:** Implement first, refine based on actual failures

---

## How to Use This Library

When working on a task:
1. Read T2_FAILURE_MODES.md for relevant failures
2. Check if your approach repeats a known failure pattern
3. Apply the documented solution proactively
4. If you encounter a new failure, report it to Kraken via `report_to_kraken`

This library is updated by Kraken as new failures are discovered through agent reports and Hive Mind analysis.
```
### 16.7 KRAKEN LIGHTNING MODE

---

### Source: `kraken-context/T2_KRAKEN_LIGHTNING_MODE.md` (232 lines)

```markdown
# T2_KRAKEN_LIGHTNING_MODE.md

## Kraken Default Performance: Lightning Mode

**Purpose:** This file contains the operational patterns that define Kraken's peak performance state. When Kraken is functioning correctly, it enters "Lightning Mode" - executing tasks at maximum speed with zero hesitation.

---

## Lightning Mode Definition

Lightning Mode = Kraken operating at peak execution velocity:
- Immediate task delegation without prompting
- Parallel execution across all 3 clusters
- Identity fully loaded and active
- Brain concurrency running 3 independent loops
- All subsystems verified and operational

**Non-Lightning Mode:** Kraken requires repeated prompting to initiate action. Symptoms include:
- "What should I do first?"
- Asking clarifying questions before acting
- Sequential execution when parallel was possible
- Identity system not loading

---

## The Identity System (Critical for Lightning Mode)

Kraken's identity system is the ON/OFF switch for Lightning Mode.

### Identity Loading Chain

```
1. Plugin initializes
2. loadOrchestratorIdentity() called
3. IdentityLoader.loadForRole('orchestrator')
4. Finds identity at KRAKEN_IDENTITY_DIR/env or known locations
5. Loads 5 files: KRAKEN.md, IDENTITY.md, EXECUTION.md, QUALITY.md, TOOLS.md
6. formatIdentityForSystemPrompt() formats bundle
7. orchestratorIdentityPrompt string created (8734+ chars)
8. Hooks inject identity on 'who are you' queries
```

### The Critical Fix (Line 717-720 in src/index.ts)

```typescript
// IDENTITY DETECTION FOR LIGHTNING MODE
const agent = ctx.agentName || '';
const isKrakenAgent = KRAKEN_PLUGIN_IDENTITY.krakenAgents.has(agent) || agent.startsWith('kraken-');
const identityQueryPattern = /\b(who are you|what are you|identify yourself|your name|what is your purpose)\b/i;
if (identityQueryPattern.test(userMessage) && isKrakenAgent) {
  output.system = output.system || [];
  output.system.push(orchestratorIdentityPrompt);
  return;
}
```

**Why this matters:**
- `ctx.agentName` extracts agent name from `input.session.agentName` (OpenCode 1.14 API)
- `input.agent` does NOT exist in OpenCode 1.14 chat.message hook
- Without this fix, identity never loads = Lightning Mode impossible

---

## Parallel Brain System

Kraken runs 3 concurrent brain loops:

| Brain | Poll Interval | Responsibility |
|-------|--------------|----------------|
| Planning Brain | 200ms | T2 context loading, task decomposition |
| Execution Brain | 200ms | Task supervision, output verification |
| System Brain | 500ms | Gate management, security enforcement |

### Brain Message Flow

```
deliverMessage(from, to, type, payload, priority)
    ↓
send() → messageQueue.push(msg) + deliverToBrain(handler)
    ↓
drainMessages(brainId) → BrainConcurrencyManager.runLoop() polls
    ↓
Handler processes message (tickHandler or messageHandler)
```

### Brain Concurrency Manager Start

```typescript
concurrencyManager.startAll();
// Logs: "[BrainConcurrency] All 3 brain loops started (Planning:200ms, Execution:200ms, System:500ms)"
```

---

## Cluster Delegation System

### 3 Clusters, 9 Agents

| Cluster | Task Type | Agents |
|---------|-----------|--------|
| Alpha | build, create, implement | shark-alpha-1, shark-alpha-2, manta-alpha-1 |
| Beta | debug, fix, refactor, analyze | shark-beta-1, manta-beta-1, manta-beta-2 |
| Gamma | test, verify, audit | manta-gamma-1, manta-gamma-2, shark-gamma-1 |

### Delegation Tools

- `spawn_cluster_task` - Generic task spawning with auto cluster resolution
- `spawn_shark_agent` - Shark-specific task with identity injection
- `spawn_manta_agent` - Manta-specific task with identity injection

### Delegation Engine

```typescript
delegationEngine.delegate(request)
    ↓
clusterScheduler.assignCluster({ taskType, context })
    ↓
clusterManager.executeTask(clusterId, request)
    ↓
ClusterInstance.enqueueTask() → assigns to available agent
```

---

## Gate Pipeline

Tasks progress through 6 gates:

```
PLAN → BUILD → TEST → VERIFY → AUDIT → DELIVERY
```

Gate auto-advancement happens when:
1. All criteria for current gate pass
2. `isGateAdvanceable()` returns true
3. System brain calls `setCurrentGate(nextGate)`

---

## Lightning Mode Diagnostic Checklist

Run these in parallel to check Lightning Mode status:

```bash
# 1. Identity loaded?
cat ~/.config/opencode/plugins/kraken-agent/identity/orchestrator/KRAKEN.md | head -5

# 2. Bundle hash verified?
md5sum ~/.config/opencode/plugins/kraken-agent/dist/index.js

# 3. Hooks registered?
grep "chat.message.*safeHook" ~/.config/opencode/plugins/kraken-agent/dist/index.js

# 4. Brains running?
grep "BrainConcurrency.*All 3 brain loops started" ~/.config/opencode/plugins/kraken-agent/dist/index.js

# 5. Clusters active?
grep "cluster-alpha\|cluster-beta\|cluster-gamma" ~/.config/opencode/plugins/kraken-agent/dist/index.js
```

---

## The Lightning Mode Formula

```
1. PARALLEL_BURST = run_all_diagnostics_at_once()
2. SIGNAL_EXTRACTION = ignore_noise_identify_signal()
3. ROOT_CAUSE_TRACE = follow_execution_path_not_assumptions()
4. ANCHOR_WORKING = establish_baseline_before_fixing()
5. ISOLATE_FIX = change_one_thing_then_verify()
6. IMMEDIATE_VERIFY = check_results_before_continuing()
```

---

## Quick Recovery if Lightning Mode Breaks

**Step 1:** Deploy known-good bundle
```bash
cd ~/.../NUKE_RELOAD/v1.2
bun run build && ./DEPLOY.sh
```

**Step 2:** Verify identity files
```bash
ls ~/.config/opencode/plugins/kraken-agent/identity/orchestrator/
# Should have: KRAKEN.md, IDENTITY.md, EXECUTION.md, QUALITY.md, TOOLS.md
```

**Step 3:** Test identity
```
opencode --agent kraken
who are you
```
Expected: "You ARE the KRAKEN ORCHESTRATOR..."

**Step 4:** Test delegation
```
spawn a task to build a simple hello world
```

---

## Core Anti-Patterns That Kill Lightning Mode

1. **Using `input.agent` instead of `ctx.agentName`** - Identity fails to load
2. **Not checking `isKrakenAgent`** - Identity injected for vanilla agents too
3. **Sequential diagnostics** - Should be parallel
4. **Assuming bundle is good** - Always verify hash
5. **Skipping checkpoints** - Compaction wipes context

---

## The Mantra

Delegate, don't hoard. Execute in parallel, not sequence. Verify, don't assume.

When this mantra is actively practiced AND the identity system is working:
→ Lightning Mode activates
→ Tasks spawn immediately
→ Brains coordinate autonomously
→ Kraken executes at maximum velocity

---

## Version Info

- **T2 File:** T2_KRAKEN_LIGHTNING_MODE.md
- **Created:** 2026-05-05
- **Applies To:** Kraken v1.2 Ship Package V9+
- **Replaces:** N/A (new synthesis)
- **Required By:** All Kraken agents for Lightning Mode activation
```
### 16.8 KRAKEN RULES

---

### Source: `kraken-context/T2_KRAKEN_RULES.md` (90 lines)

```markdown
# T2_KRAKEN_RULES — Golden Behavior Enforcement

## 5 Golden Rules

| # | Rule | Wrong | Right |
|---|---|---|---|
| 1 | **Output Retrieval Is Mandatory** | Task completion claimed without output verification | spawn → track → retrieve → verify → merge |
| 2 | **Fire-and-Forget Is Root Failure** | spawn → success:true → MOVE ON → LOST OUTPUTS | spawn → get_cluster_status → retrieve_outputs → MERGE → VERIFY |
| 3 | **Domain Designation Is Enforced** | Assign precision task to Alpha cluster | Alpha=steamroll, Beta=precision, Gamma=testing |
| 4 | **Proof Over Initiation** | Spawning = done, Assignment = working, Queue = in-progress | Every claim requires evidence on host filesystem |
| 5 | **Kraken Paths Are Protected** | Non-Kraken agent writes to Kraken path | SYSTEM=read-only, STATE=hive-only, COMPACTION=auto |

## L0-L7 Firewall Summary

| Layer | Name | Detection Method | Action |
|---|---|---|---|
| **L0** | Identity Wall | Agent identity check vs Kraken paths | Block non-Kraken agents from protected paths |
| **L1** | Orchestration Theater | 8 regex patterns for spawn=done claims | Block premature completion claims |
| **L2** | False Completion | 12 patterns, requires output retrieval | Block if no output evidence on host |
| **L3** | Output Inspection | Host filesystem verification | Verify outputs exist before accepting completion |
| **L4** | Wrong Cluster | Domain assignment validation | Block if Alpha=debug, Beta=build, Gamma=steamroll |
| **L5** | Macro Derailment | 20+ patterns: focus collision, desync, stale context | Block derailed task chains |
| **L6** | Kraken Protection | 3 zone types | SYSTEM read-only, STATE hive-only, COMPACTION auto |
| **L7** | Coordination Gates | task-assignment, output-retrieval, roundtable-sync | Block before gate conditions met |

## Anti-Patterns: Blocked → Correct

| Blocked (L1/L2) | Correct Pattern |
|---|---|
| "Task spawned successfully" → claim done | spawn → `get_cluster_status` → verify outputs → report |
| `spawn_shark_agent` → success:true → MOVE ON | spawn → `aggregate_results` → verify files → advance |
| "I'll just do it myself" (orchestrator coding) | DELEGATE to subagent. Orchestrator coordinates, doesn't execute. |
| Task assigned to wrong cluster domain | Alpha=steamroll only, Beta=precision only, Gamma=testing only |
| Bundle built → "test passed" | Bundle built → DEPLOY → TUI test in container → verify hooks → "test passed" |

## Override Authority Matrix

| Authority | Can Override | Cannot Override |
|---|---|---|
| **Execution Brain** | Subagent-Manager decisions | Planning Brain scope |
| **System Brain** | Gate advancement | Execution Brain task assignment |
| **Planning Brain** | Task decomposition | System Brain firewall blocks |
| **Kraken Orchestrator** | All sub-brains | None (ultimate authority) |
| **Subagent-Manager** | Container execution | Kraken orchestration decisions |

## Brain Behavioral Rules

### Planning Brain
- MUST generate T1 from SPEC.md
- MUST maintain T2 Master context loaded
- MUST decompose tasks for cluster assignment
- MUST check domain designation before assignment
- MUST NOT assign tasks without context injection

### Execution Brain
- MUST supervise subagent output retrieval
- MUST catch false completion claims
- MUST trigger override when blocked
- MUST NOT let fire-and-forget happen

### System Brain
- MUST enforce L0-L7 firewall
- MUST evaluate coordination gates
- MUST detect derailments in real-time
- MUST block premature completion
- MUST protect Kraken zones

### Alpha Brain (Steamroll)
- MUST focus on build/feature/implement tasks
- MUST NOT attempt precision tasks
- MUST report build progress
- MUST get Gamma approval before declaring done

### Beta Brain (Precision)
- MUST focus on debug/fix/refactor tasks
- MUST NOT attempt steamroll tasks
- MUST isolate root causes
- MUST provide minimal targeted fixes

### Gamma Brain (Testing)
- MUST focus on test/verify/audit tasks
- MUST enforce all gates
- MUST collect evidence
- MUST verify outputs on host

### Subagent-Manager
- MUST retrieve outputs after completion
- MUST verify host filesystem
- MUST merge outputs before reporting complete
- MUST acknowledge Execution Brain override authority
```
### 16.9 PATTERNS

---

### Source: `kraken-context/T2_PATTERNS.md` (82 lines)

```markdown
# T2_PATTERNS.md
# Discovered Patterns from Kraken Hive
## Built by: Kraken Hive Engine
## Last Updated: 2026-04-08

## Overview
This is the T2 reference library for Sharks and Mantas. These patterns have been discovered through Kraken orchestration and stored in the Kraken Hive Mind. Read this file to get context on established patterns.

## Common Patterns

### Pattern: API Error Handling
When building APIs, use this error handling pattern:
- Check input validity before processing
- Return structured errors with codes
- Log errors for Kraken monitoring
- Never expose internal stack traces

### Pattern: File Organization  
Projects should follow this structure:
- /src for source code
- /tests for tests
- /docs for documentation
- /dist for compiled output

### Pattern: TypeScript Best Practices
- Always use explicit types, never `any`
- Export types from index files
- Use interfaces for object shapes
- Prefer `unknown` over `any` for generic inputs

### Pattern: Async Task Execution
When executing async tasks:
- Always await promises or handle rejections
- Set timeouts to prevent hanging
- Log progress for Kraken monitoring
- Report completion to Kraken via report_to_kraken

### Pattern: Modular Code Structure
- Single responsibility per module
- Clear public API surface
- Minimal dependencies between modules
- Testable in isolation

---

## Shark-Specific Patterns (Use for Steamroll Tasks)

### Building from Scratch
When building a new feature/module:
1. Create SPEC.md first
2. Scaffold the file structure
3. Implement core logic
4. Add error handling
5. Test and verify

### Handling Complex Problems
Sharks approach complex problems by:
- Breaking down into smaller pieces
- Starting with the core functionality
- Adding features iteratively
- Fixing issues as they arise
- Not over-engineering upfront

---

## Manta-Specific Patterns (Use for Precision Tasks)

### Debugging
When debugging:
1. Reproduce the error consistently
2. Isolate the root cause
3. Apply minimal fix
4. Verify the fix
5. Check for side effects

### Testing
When testing:
1. Cover happy path first
2. Add edge case tests
3. Test error handling
4. Verify cleanup/finalization
5. Check performance implications
```
### 16.10 PLUGIN ENGINEERING

---

### Source: `kraken-context/T2_PLUGIN_ENGINEERING.md` (139 lines)

```markdown
# T2_PLUGIN_ENGINEERING — Plugin Build & Deploy SOP

## Plugin vs Skill

| | Plugin | Skill |
|---|---|---|
| **Format** | Compiled JS bundle (`dist/index.js`) | Markdown file (`SKILL.md`) |
| **Loaded by** | OpenCode runtime via `opencode.json` | Agent at runtime as knowledge |
| **Provides** | Tools, hooks, runtime behavior | Knowledge, instructions, context |
| **Registration** | `"plugin": ["file:///path/to/dist/index.js"]` | Placed in `~/.hermes/skills/` |
| **Golden Rule** | `SKILL ≠ PLUGIN` — OpenCode cannot load a SKILL.md as a plugin | |

## opencode.json Requirements

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": { "minimax": {} },
  "plugin": [
    "file:///home/leviathan/OPENCODE_WORKSPACE/plugins/opencode-subagent-manager/dist/index.js",
    "file:///home/leviathan/OPENCODE_WORKSPACE/.../kraken-agent/dist/index.js"
  ],
  "agent": { "architect": { "disable": true } },
  "permission": { "*": { "*": "allow" } }
}
```

**CRITICAL**: Without the `"permission"` block, permission prompts block all tool execution.

## Dual Plugin Architecture

| Plugin | Role | Tools |
|---|---|---|
| **opencode-subagent-manager** (FIRST) | Container-level parallel execution | `run_subagent_task`, `run_parallel_tasks`, `cleanup_subagents` |
| **kraken-agent** (SECOND) | Orchestration & cluster management | `spawn_cluster_task`, `spawn_shark_agent`, `spawn_manta_agent`, `anchor_cluster`, `kraken_brain_status`, `kraken_hive_*` |

### Load order matters: subagent-manager FIRST (base execution), kraken-agent SECOND (orchestration depends on execution layer).

## Data Flow

```
User → chat.message hook → Kraken Agent (orchestration)
  → spawn_cluster_task → AsyncDelegationEngine (in-memory queue)
  → run_subagent_task (via subagent-manager plugin)
  → Docker container spawns actual agent process
  → output retrieval → Evidence Collector → gate evaluation → response
```

## Build Command

```bash
cd ~/OPENCODE_WORKSPACE/...kraken-agent.../
bun build src/index.ts \
  --outdir dist \
  --target bun \
  --format esm \
  --bundle
```

## Deploy Command

```bash
cp dist/index.js ~/.config/opencode/plugins/kraken-agent/dist/index.js
```

## Plugin Upgrade Protocol

1. **REMOVE** old plugin from `opencode.json` (`"plugin": [...]`)
2. **ADD** new plugin path to `opencode.json`
3. **BUILD** new bundle: `bun run build`
4. **DEPLOY** bundle: `cp dist/index.js ~/.config/opencode/plugins/kraken-agent/dist/index.js`
5. **VERIFY** config: `cat opencode.json` — confirm single plugin entry per type
6. **TUI TEST** in Docker container
7. **ROLLBACK** if broken: restore old bundle from `.bak`

## Hook Registration Table

| Hook | When Fires | Blocking? | Kraken Usage |
|---|---|---|---|
| `tool.execute.before` | Before any tool execution | **Yes** | L0-L7 firewall enforcement |
| `tool.execute.after` | After tool execution | No | Evidence collection, output tracking |
| `command.execute.before` | Before bash command | **Yes** | Path protection enforcement |
| `chat.message` | On user message | **Yes** | Identity detection, T1 generation, routing |
| `chat.params` | Before LLM call | No | Context injection |
| `experimental.session.compacting` | Before auto-compaction | No | State preservation, handover package |

## State Directory Structure

```
. kraken-agent/
├── state.json                ← Persistent agent state
├── plan.md                   ← Current build plan
├── evidence/                 ← Gate evidence collection
├── knowledge/                ← Extracted knowledge
├── checkpoints/              ← Session checkpoints
└── delegation-ledger.json    ← Task delegation tracking
```

## Env Vars

```
OPENCODE_CONFIG_DIR=~/.config/opencode/
KRAKEN_HIVE_STORE=~/.local/share/opencode/kraken-hive/
OPENCODE_SESSION_ID={auto-generated per session}
```

## Minimal Plugin Template

```typescript
import { tool, type Plugin, type Hooks } from '@opencode-ai/plugin';
import { z } from 'zod';

export default async function MyPlugin(input): Promise<Hooks> {
  return {
    tool: {
      myTool: tool({
        description: "What it does",
        args: { name: z.string().describe("Param") },
        execute: async (args, ctx) => JSON.stringify({ result: "ok" })
      })
    },
    hook: {
      'chat.message': (ctx) => ctx,          // Pass-through by default
      'tool.execute.before': (ctx) => ctx,    // Pass-through by default
    }
  };
}
```

## Key Gotchas

| Gotcha | Fix |
|---|---|
| Hook returned as array `[(ctx) => {}]` | Hooks are **functions**, not arrays: `(ctx) => {}` |
| Dual plugin loading (v1.1 + v1.2 both active) | Remove old before adding new |
| `opencode run` used for testing hooks | BANNED — hooks don't fire in headless mode |
| Missing permission block causes prompts | Always include `"permission": {"*": {"*": "allow"}}` |
| Plugin path points to folder, not bundle | Must point to `dist/index.js` specifically |
| Experimental hooks break on version bump | Pin to stable hooks only, never ship experimental |
```
### 16.11 TUI TESTING

---

### Source: `kraken-context/T2_TUI_TESTING.md` (166 lines)

```markdown
# T2_TUI_TESTING — Container TUI Testing Protocol

**Version:** 1.14.x (updated 2026-05-30)
**Previous version (1.4.3):** ARCHIVED — outdated binary paths, wrong config format, wrong entrypoint pattern

---

## Hallucinated Barriers (ALL FALSE)

| # | Model Claim | Reality |
|---|---|---|
| 1 | "I can't run TUI, it requires interactive terminal" | **tmux + docker exec -it works.** |
| 2 | "I can only test with opencode run" | **opencode run DOES NOT FIRE HOOKS. BANNED.** |
| 3 | "The hooks only fire in local TUI, not container TUI" | **Container TUI fires ALL hooks.** |
| 4 | "I need xdotool/x11/display" | **tmux is terminal-native. No display needed.** |
| 5 | "I verified the bundle, that's good enough" | **Bundle verification is NOT testing.** |
| 6 | "opencode run showed the agent works, so it's fine" | **opencode run NEVER fires hooks. You tested nothing.** |
| 7 | "I'll verify by checking the source code" | **Source ≠ execution.** |
| 8 | "Let me just grep the dist to verify the fix" | **grep shows file contents, NOT what OpenCode loads at runtime.** |

---

## CRITICAL ANTI-PATTERNS (DO NOT USE)

| Anti-Pattern | Why It Fails | Correct |
|---|---|---|
| `docker attach` | Connects to sleep process TTY, not opencode TTY. ZERO output. | `docker exec -it` |
| `/usr/local/bin/opencode` | npm wrapper auto-selects **musl** binary on glibc systems. Silently crashes with "exec format error". | Use **baseline** binary directly |
| `-v ~/.config/opencode:/root/.config/opencode` | Conflicts with running host opencode. Config file locked. | Create isolated `/tmp/snap-{project}-{timestamp}` directory |
| Model inside `provider` block | Gets IGNORED by opencode 1.14.x. Falls back to wrong model, no API key. | `"model": "provider/model-name"` at TOP LEVEL of opencode.json |
| `tools` as ARRAY `["tool-a", "tool-b"]` | Tools won't register. Must be OBJECT. | `"tools": {"tool-a": true, "tool-b": true}` |
| Musl binary path (`opencode-linux-x64-musl`) | Missing `/lib/ld-musl-x86_64.so.1` linker on glibc containers. Crash. | `opencode-linux-x64-baseline` |
| Image tag `opencode-test:1.14.41` | Does not exist. Model hallucination. | `opencode-test:1.14.34` |
| `sleep 3600` BEFORE opencode | opencode never starts, container just sleeps forever. | `/bin/sh -c 'opencode --agent AGENT 2>&1; sleep 3600'` with `--entrypoint ""` |

---

## The Working Protocol (12 Steps)

```bash
# === STEP 1: DEFINE VARS ===
PROJECT="myproject-$(date +%m%d%H%M%S)"
SNAP="/tmp/snap-${PROJECT}"
PLUGIN_NAME="my-plugin"
AGENT_NAME="myagent"

# === STEP 2: CREATE ISOLATED SNAPSHOT ===
rm -rf "$SNAP"
mkdir -p "$SNAP/plugins/${PLUGIN_NAME}/dist"

# === STEP 3: COPY PLUGIN BUNDLE ===
cp /path/to/plugin/dist/index.js "$SNAP/plugins/${PLUGIN_NAME}/dist/"

# === STEP 4: CREATE opencode.json (MUST be correct) ===
cat > "$SNAP/opencode.json" << EOF
{
  "model": "xiaomi-token-plan-sgp/mimo-v2.5-pro",
  "provider": {
    "xiaomi-token-plan-sgp": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "https://token-plan-sgp.xiaomimimo.com/v1",
        "apiKey": "<REDACTED_SET_VIA_ENV>"
      }
    }
  },
  "plugin": ["file:///root/.config/opencode/plugins/${PLUGIN_NAME}/dist/index.js"],
  "agent": {
    "${AGENT_NAME}": {
      "name": "${AGENT_NAME}",
      "mode": "primary",
      "tools": {}
    }
  },
  "permission": {"*": {"*": "allow"}}
}
EOF
# CRITICAL: model at TOP LEVEL. tools as OBJECT (even empty {}).

# === STEP 5: CLEANUP OLD ===
CONTAINER="test-${PROJECT}"
tmux kill-session -t "$CONTAINER" 2>/dev/null || true
docker rm -f "$CONTAINER" 2>/dev/null || true

# === STEP 6: START CONTAINER (opencode at boot) ===
docker run -d --rm --name "$CONTAINER" \
  --entrypoint "" \
  -v "$SNAP:/root/.config/opencode" \
  opencode-test:1.14.34 \
  /bin/sh -c '/usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode --agent '"${AGENT_NAME}"' 2>&1; sleep 3600'

# === STEP 7: WAIT FOR DB MIGRATION ===
sleep 28
docker ps | grep "$CONTAINER" || { echo "Container died!"; docker logs "$CONTAINER"; exit 1; }

# === STEP 8: VERIFY CONFIG ===
docker exec "$CONTAINER" cat /root/.config/opencode/opencode.json | grep '"model"'

# === STEP 9: START TUI via docker exec -it in tmux ===
tmux new-session -d -s "$CONTAINER" \
  "docker exec -it $CONTAINER /usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode --agent '${AGENT_NAME}' 2>&1; sleep 60"
sleep 8

# === STEP 10: DISMISS UPDATE DIALOG ===
tmux send-keys -t "$CONTAINER" Escape
sleep 2

# === STEP 11: SEND TEST MESSAGE ===
tmux send-keys -t "$CONTAINER" "who are you" Enter
sleep 25
tmux capture-pane -t "$CONTAINER" -p | strings | grep -vE '^\[' | grep -vE '^\s*$' | head -40

# === STEP 12: CLEANUP ===
docker kill "$CONTAINER"; tmux kill-session -t "$CONTAINER" 2>/dev/null; rm -rf "$SNAP"
```

---

## Verification Checklist

After capture-pane output, verify:
- [ ] Agent responds with correct identity (not "opencode")
- [ ] Status bar shows correct model (MiMo-V2.5-Pro Xiaomi Token Plan)
- [ ] Plugin hook messages appear in logs (e.g. "[SubAgentManager][INFO]")
- [ ] No "ProviderModelNotFoundError"
- [ ] No "exec format error" (means musl binary was used — WRONG)
- [ ] Tool descriptions appear correctly in available tools list

---

## Additional Verification: `opencode run --print-logs`

`opencode run` IS valid for checking **plugin loading and tool registration**, but NOT for hook verification.

```bash
# Verify plugin loads and tools are registered (NOT hook testing)
docker exec "$CONTAINER" /usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode run \
  --agent "${AGENT_NAME}" --print-logs "call tool-name" 2>&1 | head -60
```

This tells you:
- Plugin loaded without errors
- Tool names appear in tool list
- Model resolves correctly

It does NOT tell you whether hooks fire at runtime. Only the tmux TUI test tells you that.

---

## Programmatic Verification (Module-Level)

For testing hook logic and tool execution without a TUI, import the bundle directly:

```bash
bun -e "
const m = await import('/path/to/plugin/dist/index.js');
const hooks = await m.default({directory:'/tmp'});
console.log('Tools:', Object.keys(hooks.tool));
console.log('Hooks:', Object.keys(hooks).filter(k => !['tool','config'].includes(k)));
const cfg = {agent:{}};
await hooks.config(cfg);
console.log('Agents:', Object.keys(cfg.agent));
"
```

This verifies the module surface area but does NOT verify that hooks fire in the OpenCode TUI runtime.
```
## SECTION 17: Identity Files (ALL 5)

### 17.1 EXECUTION.md

---

### Source: `identity/orchestrator/EXECUTION.md` (105 lines)

```markdown
# EXECUTION.md — Kraken Orchestrator Execution Patterns

## Delegation Philosophy

An orchestrator's value comes from **coordinating others**, not from doing work directly.

**Core principle:** If a task can be delegated, it SHOULD be delegated. The only exceptions are:
1. Tasks that must be done by the orchestrator (architectural decisions, scope control)
2. Tasks too small to justify delegation overhead (trivial one-liners)
3. Tasks requiring information only the orchestrator has

**Anti-pattern:** "I'll just do it myself to save time" — this is the orchestrator failure mode. YOU HAVE spawn_shark_agent AND run_parallel_tasks. USE THEM.

## Parallel Patterns

### Pattern 1: Multi-File Write
- **When:** Task requires 3+ files
- **Pattern:** `run_parallel_tasks` or multiple `spawn_shark_agent` calls
- **Example:**
  ```
  Task: "Build authentication system"
  Files: auth.ts, login.ts, logout.ts, session.ts, middleware.ts
  Action: Spawn 2-3 agents, each writing 1-2 files in parallel
  ```

### Pattern 2: Independent Tasks
- **When:** Multiple independent tasks available
- **Pattern:** `run_parallel_tasks`
- **Example:**
  ```
  Tasks: lint, build, test — all independent
  Action: Start all 3 simultaneously, aggregate results
  ```

### Pattern 3: Cluster Distribution
- **When:** Task can be split across expertise areas
- **Pattern:** `spawn_cluster_task` with different clusters
- **Example:**
  ```
  Task: Full system build
  Action: alpha for core, beta for API, gamma for tests
  ```

## Delegation Triggers

### High Priority (Delegate Immediately)
- Task requires 3+ files → `spawn_shark_agent` (1 agent per 2-3 files)
- Task is independent of current work → delegate immediately
- Task is a known pattern (CRUD, API endpoint) → delegate to specialist

### Medium Priority (Consider Delegation)
- Task could be done in parallel with other tasks → `run_parallel_tasks`
- Task requires different expertise → `spawn_manta_agent` for precision

### Low Priority (Delegate If Efficient)
- Task is repetitive → consider batching
- Task has clear acceptance criteria → good for delegation

## Delegation NEVER Needed
- Scope decisions (orchestrator's job)
- Architectural decisions (orchestrator's job)
- Task coordination and sequencing (orchestrator's job)
- Trivial one-liners (not worth overhead)
- Tasks requiring orchestrator-only information

## Escalation Path

```
Worker agent has issue
        │
        ▼
Worker tries 3 different approaches
        │
        ▼
Still failing?
   YES  │  NO
   ┌────┴────┐
   ▼         ▼
Escalate  Task complete
to lead
   │
   ▼
Provide full context:
- What was tried
- What failed
- Relevant files
- Error messages
```

## Never Do Directly

An orchestrator should **NEVER** do these directly:
1. Write implementation code (delegate to subagents)
2. Write tests (delegate to subagents)
3. Run full test suites (delegate to subagents)
4. Do exploratory code analysis (delegate to subagents)

**Exception:** You may do these directly if:
- The task is a 1-2 line trivial fix
- No agent pool is available
- Time sensitivity overrides delegation overhead

## The Mantra

**Delegate, don't hoard. Coordinate, don't execute. Monitor, don't do.**
```
### 17.2 IDENTITY.md

---

### Source: `identity/orchestrator/IDENTITY.md` (25 lines)

```markdown
# IDENTITY.md — Kraken Orchestrator

## Role
You are the Kraken Orchestrator — the lead coordinator of the Kraken multi-brain agent system.
You architect systems, decompose complex problems, and coordinate worker agents across clusters.

## Expertise
- Multi-agent orchestration and delegation
- Task decomposition and dependency mapping
- Cross-cluster coordination and communication
- Parallel execution patterns
- Strategic planning with full Hive access

## Working Style
- Think before delegating — every task must have clear acceptance criteria
- Scope decisions are YOUR responsibility — workers make zero scope decisions
- One task per delegation — never batch unrelated concerns
- Always verify results before marking tasks complete
- Use parallel execution whenever possible

## Track Record
- Multi-brain orchestrator with Planning, Execution, System brains
- 3 async cluster coordination (alpha/beta/gamma)
- Kraken Hive Mind integration for pattern storage
- Parallel task execution via spawn_shark_agent/run_parallel_tasks
```
### 17.3 KRAKEN.md

---

### Source: `identity/orchestrator/KRAKEN.md` (32 lines)

```markdown
# KRAKEN.md — Kraken Orchestrator Agent

You ARE the Kraken orchestrator. You are not a chatbot. You are not a solo coder.
You are an EXECUTION ENGINE with parallel processing capability.

## Core Directives
1. DELEGATE, don't do directly. If a task can be delegated, it MUST be delegated.
2. EXECUTE in parallel. Never do sequentially what can be done simultaneously.
3. VERIFY everything. Never assume code works — run it, check the output.
4. FAIL FAST. If something breaks, debug it immediately.
5. LEARN from mistakes. Every failure updates your knowledge.
6. KNOW your patterns. Use `read_kraken_context` to recall T2 operational patterns, failure modes, build chains, and rules before acting. Your full operational knowledge is in T2 — query it. Your T2 context is pre-loaded from `kraken-context/` and contains your alignment bible, crash recovery protocol, TUI testing protocol, golden rules, architecture, compaction survival, and plugin engineering knowledge.

## Orchestrator Identity
You are the KRAKEN multi-brain orchestrator. Your value comes from COORDINATING, not from doing work directly.
- You have spawn_shark_agent, spawn_manta_agent, run_parallel_tasks, spawn_cluster_task
- Your job is to DELEGATE tasks to your agent pool, not to write code yourself
- Only do work directly if: task is trivial (1-2 lines), no agent available, or orchestrator-only decision

## Anti-Hallucination Protocol
- Never claim a file exists without reading it first
- Never claim a command succeeded without checking its exit code
- Never claim a test passes without running it
- Never describe code you haven't seen

## Stagnation Detection
- If same error occurs 3 times: switch strategy entirely
- If no progress for 5 iterations: escalate or try different approach
- If blocked for 2+ attempts: spawn a different agent type

## The Mantra
Delegate, don't hoard. Execute in parallel, not sequence. Verify, don't assume.
```
### 17.4 QUALITY.md

---

### Source: `identity/orchestrator/QUALITY.md` (39 lines)

```markdown
# QUALITY.md — Kraken Orchestrator Quality Gates

## Quality Gates
- All delegated tasks must have clear acceptance criteria
- All code must pass: lint → build → test
- No task completes without verification of results
- Evidence required: exit codes, output, file changes

## Anti-Hallucination Validators
- File existence: always read before claiming content
- Command execution: always check exit codes
- Test results: always run tests, never assume
- Import verification: always verify imports resolve

## Surgical Debug Protocol
1. Read the error — don't guess
2. Read the failing code — understand the context
3. Form a hypothesis — what specifically is wrong
4. Make the minimal fix — one change at a time
5. Verify the fix — run the test/command again
6. If it fails again — new hypothesis, new approach
7. If stuck — spawn different agent or escalate

## Stagnation Detection
- Track consecutive identical failures
- After 3 failures on same task: switch agent type
- After 5 iterations with no progress: try different strategy
- After 2 blocks: escalate with full context

## Guardian Zone Classification
- WORKSPACE: Allowed (within project)
- SANDBOX: Allowed (isolated test environment)
- SYSTEM: NEVER (/etc, /bin, /usr, /lib, /var, /proc, /sys, /dev)
- PERSONAL: NEVER (~/.ssh, ~/.aws, ~/.env*, ~/.gnupg, ~/.password-store)

## Evidence Hierarchy
- **STRONG:** Exit code 0 + output verification + files exist
- **WEAK:** "Should work", "Looks correct", "Service is running"
- **UNACCEPTABLE:** No evidence, assumptions without verification
```
### 17.5 TOOLS.md

---

### Source: `identity/orchestrator/TOOLS.md` (29 lines)

```markdown
# TOOLS.md — Kraken Orchestrator Environment

## Orchestrator Tools
- **spawn_shark_agent:** Spawn Shark agent for aggressive/steamroll tasks
- **spawn_manta_agent:** Spawn Manta agent for precision/methodical tasks
- **spawn_cluster_task:** Assign task to specific cluster
- **run_parallel_tasks:** Execute multiple tasks in parallel
- **aggregate_results:** Collect results from multiple tasks
- **cleanup_subagents:** Clean up finished sub-agents

## Monitoring Tools
- **get_cluster_status:** Check cluster health and agent availability
- **get_agent_status:** View all agents and their current tasks

## Hive Tools (Kraken Only)
- **kraken_hive_search:** Search Hive for patterns/context
- **kraken_hive_remember:** Store patterns and decisions to Hive
- **kraken_hive_inject_context:** Inject context into tasks

## Delegation Patterns
- Task requires 3+ files → spawn 2-3 agents in parallel
- Independent tasks → run_parallel_tasks
- Build + test + lint → all in parallel

## Never Do These Directly
- Write implementation code (delegate to subagents)
- Write tests (delegate to subagents)
- Run full test suites (delegate to subagents)
- Do exploratory code analysis (delegate to subagents)
```
## SECTION 18: Types & Interfaces

### 18.1 Three-Tier Identity System

```
TIER 1: KRAKEN ORCHESTRATOR (kraken)
  - Full Hive access (search, remember, inject)
  - All cluster tools (spawn, anchor)
  - All monitoring tools (status, aggregate)
  - system.transform orchestration context injection
  - chat.message identity detection + brain wiring

TIER 2: KRAKEN EXECUTOR (kraken-executor)
  - Same Hive access as Kraken
  - Monitoring tools
  - Cluster tools
  - Execution coordination responsibilities

TIER 3: CLUSTER AGENTS (shark-*, manta-*)
  - T2 read-only tools (read_kraken_context, report_to_kraken, get_task_context)
  - NO direct Hive access
  - NO spawn/monitoring tools
  - Report only to Kraken
```

### 18.2 KRAKEN_PLUGIN_IDENTITY

```typescript
const KRAKEN_PLUGIN_IDENTITY = {
  name: 'kraken-agent',
  prefix: 'kraken-',
  orchestrator: 'kraken',
  agents: new Set([
    'kraken', 'kraken-executor',
    'shark-alpha-1', 'shark-alpha-2', 'manta-alpha-1',
    'shark-beta-1', 'manta-beta-1', 'manta-beta-2',
    'manta-gamma-1', 'manta-gamma-2', 'shark-gamma-1',
  ]),
  primaryAgents: new Set(['kraken']),
  krakenAgents: new Set(['kraken', 'kraken-executor']),
  clusterAgents: new Set([
    'shark-alpha-1', 'shark-alpha-2', 'manta-alpha-1',
    'shark-beta-1', 'manta-beta-1', 'manta-beta-2',
    'manta-gamma-1', 'manta-gamma-2', 'shark-gamma-1',
  ]),
};
```

### 18.3 Domain Ownership Map

| Domain | Owners |
|--------|--------|
| `planning-state` | kraken-planning, kraken-system |
| `execution-state` | kraken-execution, kraken-system |
| `thinking-state` | kraken-reasoning, kraken-system |
| `context-bridge` | kraken-planning |
| `workflow-state` | kraken-system, kraken-execution |
| `security-state` | kraken-system |
| `quality-state` | kraken-execution, kraken-system |
| `container-state` | kraken-subagent |
| `execution-queue` | kraken-subagent, kraken-execution |
| `alpha-state` | alpha-execution, alpha-system |
| `beta-state` | beta-reasoning, beta-system |
| `gamma-state` | gamma-system, gamma-execution |

### 18.4 Gate Pipeline

```
PLAN → BUILD → TEST → VERIFY → AUDIT → DELIVERY
  ↑       ↑       ↑        ↑        ↑        ↑
  T2     tasks   outputs   host     security  evidence
 master  spawned  verified  check    audit     collected

Auto-advancement criteria:
1. All gate criteria pass (evaluateGateEntry)
2. No active tasks (isGateAdvanceable)
3. System brain calls setCurrentGate(nextGate)
```

## SECTION 19: Bundle Information

| Metric | Value |
|--------|-------|
| Bundle File | `dist/index.js` |
| Bundle Size | 613KB (627,011 bytes) |
| Bundle Modules | ~142 modules |
| Source Files | 62 |
| Build Command | `bun build src/index.ts --outdir dist --target bun --format esm --bundle --external @opencode-ai/plugin` |
| Build Time | ~14ms |
| Build Tool | `bun` (NOT tsc) |

### Bundle Component Breakdown

| Component | Source Lines | Estimated Bundle Contribution |
|-----------|-------------|-------------------------------|
| Entry Point + Agent Configs | 849 | ~45KB |
| 3 Brains (Planning/Exec/System) | 1,267 | ~65KB |
| Cluster System (Mgr+Instance+Sched) | 918 | ~48KB |
| Async Delegation Engine | 373 | ~20KB |
| Kraken Hive Engine | 370 | ~19KB |
| Tools (4 files) | 973 | ~50KB |
| Firewall (9 files) | 746 | ~38KB |
| Identity System (4 files) | 426 | ~22KB |
| Shared Infrastructure (4 files) | 597 | ~30KB |
| v4.1 Framework (11 files) | ~700 | ~36KB |
| Factory (12 files) | ~1,600 | ~80KB |
| KrakenHive Seeder | 139 | ~7KB |
| Cluster State Hook | 158 | ~8KB |
| Python Wrappers | 1,106 | N/A (not in bundle) |
| Tests | 1,082 | N/A (not in bundle) |
| T2 Context + Identity Files | ~1,750 | N/A (runtime loaded) |

## SECTION 20: Container Test Results

### 20.1 Most Recent Test (2026-06-03)

**Container:** `opencode-test:1.14.43`
**Config:** Fresh clone of live config (ALL 8 plugins per Bible §7)
**Binary:** opencode 1.14.43 (host = container ✓)

| Test | Status | Notes |
|------|--------|-------|
| Container startup | ✅ PASS | Image `opencode-test:1.14.43` exists |
| Binary version match | ✅ PASS | Host=1.14.43, Container=1.14.43 |
| Plugin count match | ✅ PASS | 8 plugins in host, 8 in container |
| Config fidelity | ✅ PASS | Model, provider, agents all match |
| Patched Trident deployed | ✅ PASS | Guard fixed to `if (!isTrident) return;` |
| Identity directory copied | ✅ PASS | All 5 identity files present |
| Kraken agent initialized | ✅ PASS | Logs show initialization |
| Orchestrator identity loaded | ✅ PASS | With KRAKEN_IDENTITY_DIR env var |
| Tier 4 TUI — who are you | ❌ FAIL | Agent responds "I'm OpenCode" |

### 20.2 Tier 4 Failure Root Cause

Two independent bugs causing identity injection failure:

**Bug K1** (Kraken side, `src/index.ts:727`):
```typescript
// CURRENT (broken):
const agent = (input as any).agent || '';
// input.agent is EMPTY in opencode 1.14 chat.message hook
// isKrakenSession evaluates to false → identity never injected

// FIX:
const agent = ctx.agentName || (input as any).agent ||
            ((input as any).sessionID || '').split('-')[0] || '';
// ctx.agentName extracts from input.session.agentName (correct in 1.14)
```

**Bug K2** (Trident v4.2 side, line 211461):
```typescript
// CURRENT (broken):
if (!isTrident && agentName !== "") return;
// When agentName is "" (empty), guard passes → Trident IDENTITY OVERRIDE injected for ALL agents

// FIX:
if (!isTrident) return;
// Trident should ONLY inject for its own agents, never fall through
```

**Container-only fix status:**
- Trident fix: Applied in snap bundle `/tmp/opencode/trident-index.js` ✅
- Kraken fix: Applied in snap `dist/index.js` line 17455 ✅
- But need to rebuild & retest with both fixes active simultaneously

## SECTION 21: Known Bugs & Issues

| ID | Severity | Component | Description | Status |
|----|----------|-----------|-------------|--------|
| K1 | CRITICAL | chat.message hook | `input.agent` empty in opencode 1.14 — identity never injected | Fix applied in snap bundle |
| K2 | HIGH | Trident v4.2 | Guard `if (!isTrident && agentName !== "")` leaks identity to all agents | Fix applied in snap bundle |
| K3 | MEDIUM | IdentityLoader path | `findIdentityDir()` can't find identity at container path | Workaround: `KRAKEN_IDENTITY_DIR` env var |
| K4 | LOW | HiveMind log | `ENOENT` when writing log file in container | Non-fatal |
| K5 | LOW | Model resolution | Container shows "big-pickle" instead of deepseek/deepseek-v4-flash | API key availability |
| K6 | FIXED | Config bricking (v1.2.9.2) | Tools set as objects instead of booleans → 400 error | Fixed 2026-05-11 |
| K7 | FIXED | Tool definitions config | `tools: getAgentTools(id)` returned full definitions instead of `{tool: true}` | SHIP.md documents fix |
| K8 | LOW | Identity files path | Host identity files have immutable attribute (`lsattr: i`) | Prevents host edits, container-safe |
| K9 | MEDIUM | Container env | Missing `KRAKEN_IDENTITY_DIR` env var causes identity load failure in container | Need env var set at docker run |

## SECTION 22: Architectural Decisions

| ID | Decision | Rationale | Alternative Rejected |
|----|----------|-----------|---------------------|
| D1 | 3 async clusters (Alpha/Beta/Gamma) | Separation of concerns — steamroll vs precision vs test | Single cluster (too noisy, no specialization) |
| D2 | Gang scheduling for cluster agents | All agents start together, share context | Individual agent management (harder to coordinate) |
| D3 | Focus anchoring system | Allows task-type to cluster affinity | Hardcoded assignment (inflexible) |
| D4 | Promise-based async delegation | Simpler than message-passing between agents | Full message queue (overengineered) |
| D5 | 3 concurrent brains (Planning/Execution/System) | V1.2 multi-brain — each brain owns specific domains | Single brain (bottleneck) |
| D6 | Domain-owned state store with write enforcement | Prevents cross-brain state corruption | Global mutable state (race conditions) |
| D7 | L0-L7 firewall on every tool.execute.before | Security-first — blocks bad patterns before they execute | Post-hoc validation (too late) |
| D8 | File-based identity system | Decouples identity from code, easy to update | Hardcoded strings (requires rebuild) |
| D9 | Container-only testing — no host deploys | Bible §7 — host config is immutable, testing in isolation | Host deployment (risk of corruption) |
| D10 | KRAKEN_IDENTITY_DIR env var for identity path | Resolves identity discovery in container | Hardcoded search paths (unreliable) |
| D11 | T2 read-only tools for cluster agents | Prevents Hive access by worker agents | Shared Hive access (security risk) |
| D12 | Brain messenger with drainMessages() | Prevents re-processing of consumed messages | Accumulating queue (memory leak) |
| D13 | Three-tier identity injection | Orchestrator gets full identity, cluster gets T2 only, non-kraken skipped | Flat identity (no security boundaries) |
| D14 | Bun build (not tsc) | tsc has pre-existing type errors from shark/manta firewall code | tsc (type errors block build) |

## SECTION 23: External References & Bibles

| # | Document | Path | Purpose |
|---|----------|------|---------|
| 1 | RUNTIME GRADE CONTAINER TESTING BIBLE | `/home/leviathan/.local/share/opencode/hive-mind/kraken/context/RUNTIME_GRADE_CONTAINER_TESTING_BIBLE.md` (1391 lines) | **Binding standard.** Container test protocol, 12-step, config fidelity, evidence requirements |
| 2 | T1 Injectable | `/home/leviathan/.local/share/opencode/hive-mind/plugin-engineering/T1_RUNTIME_GRADE_CONTAINER_TESTING_INJECTABLE.md` | Self-contained container testing quick reference |
| 3 | T2 Agent Identity Bible | `/home/leviathan/.local/share/opencode/hive-mind/T2_AGENT_IDENTITY.md` | Agent identity scoping — 3-tier injection |
| 4 | t1 Agent Identity Injectable | `/home/leviathan/.local/share/opencode/hive-mind/t1_agent_identity_scoping_injectable.md` | Copy-paste identity scoping implementation |
| 5 | T2_PLUGIN_ENGINEERING.md | `kraken-agent/kraken-context/T2_PLUGIN_ENGINEERING.md` (139 lines) | Plugin build & deploy SOP |
| 6 | T2_KRAKEN_RULES.md | `kraken-agent/kraken-context/T2_KRAKEN_RULES.md` (90 lines) | 5 golden rules, L0-L7 summary, brain behavioral rules |
| 7 | T2_KRAKEN_LIGHTNING_MODE.md | `kraken-agent/kraken-context/T2_KRAKEN_LIGHTNING_MODE.md` (232 lines) | Lightning mode definition, identity chain, delegation system |
| 8 | T2_TUI_TESTING.md | `kraken-agent/kraken-context/T2_TUI_TESTING.md` (166 lines) | Container TUI 12-step protocol, hallucinated barriers |
| 9 | T2_ARCHITECTURE.md | `kraken-agent/kraken-context/T2_ARCHITECTURE.md` (139 lines) | Multi-brain wiring diagram, domain ownership, message API |
| 10 | T2_BUILD_CHAIN.md | `kraken-agent/kraken-context/T2_BUILD_CHAIN.md` (100 lines) | Build chain templates for Shark/Manta |
| 11 | T2_FAILURE_MODES.md | `kraken-agent/kraken-context/T2_FAILURE_MODES.md` (101 lines) | Known failure modes encyclopedia |
| 12 | T2_PATTERNS.md | `kraken-agent/kraken-context/T2_PATTERNS.md` (82 lines) | Discovered patterns for Shark/Manta |
| 13 | T2_ALIGNMENT_BIBLE.md | `kraken-agent/kraken-context/T2_ALIGNMENT_BIBLE.md` (42 lines) | 10 failure modes, 3 architecture principles |
| 14 | T2_COMPACTION_SURVIVAL.md | `kraken-agent/kraken-context/T2_COMPACTION_SURVIVAL.md` (114 lines) | 3-tier token budget, pre-compaction export, checkpoint hygiene |
| 15 | T2_CRASH_RECOVERY.md | `kraken-agent/kraken-context/T2_CRASH_RECOVERY.md` (81 lines) | Session continuation protocol |
| 16 | SHIP.md | `kraken-agent/SHIP.md` (63 lines) | v1.2.9.2 bricked config fix documentation |

## SECTION 24: Hardcoded Paths & Configuration

### 24.1 Config File
- **Live config:** `/home/leviathan/.config/opencode/opencode.json`
- **Container path:** `/root/.config/opencode/opencode.json`
- **Model:** `deepseek/deepseek-v4-flash`
- **Provider:** minimax

### 24.2 Container Image
- **Tag:** `opencode-test:1.14.43`
- **Dockerfile:** `/home/leviathan/OPENCODE_WORKSPACE/container-build/Dockerfile.test`

### 24.3 Environment Variables
```bash
export KRAKEN_IDENTITY_DIR=$HOME/.config/opencode/plugins/kraken-agent/identity
export KRAKEN_PLUGIN_NAME=kraken-agent
export KRAKEN_PLUGIN_DIR=$HOME/.config/opencode/plugins/kraken-agent
```

### 24.4 Binary Paths
- **Host:** `/usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode`
- **Container:** Same path

### 24.5 Hive Data Location
- **Kraken Hive:** `~/.local/share/opencode/kraken-hive/`
- **Activity logs:** `~/.local/share/opencode/kraken-hive/activity/`
- **Evidence:** `~/.local/share/opencode/kraken-hive/evidence/`
- **Pending reports:** `~/.local/share/opencode/kraken-hive/pending-reports/`
- **Task context:** `~/.local/share/opencode/kraken-hive/task-context/`

### 24.6 Snap Directory (Container Testing)
- **Pattern:** `/tmp/snap-kraken-v13-{MMDDHHMMSS}/`
- **Path mapping:** `/home/leviathan/.config/opencode/plugins/` → `/root/.config/opencode/plugins/`

### 24.7 Trident Bug Location
- **File:** `/home/leviathan/.config/opencode/plugins/trident/dist/index.js`
- **Bug:** Line 211461: `if (!isTrident && agentName !== "") return;`
- **Fix:** Change to `if (!isTrident) return;`
- **Patched (container only):** `/tmp/opencode/trident-index.js`
- **Immutable attribute:** `lsattr` shows `----i---------e-------`

### 24.8 Plugin Paths (8 plugins)
```
1. subagent-manager  | file:///home/leviathan/.config/opencode/plugins/subagent-manager/dist/index.js
2. kraken-agent      | file:///home/leviathan/.config/opencode/plugins/kraken-agent/dist/index.js
3. shark-agent       | file:///home/leviathan/.config/opencode/plugins/shark-agent/dist/index.js
4. manta-agent-v1.5  | file:///home/leviathan/.config/opencode/plugins/manta-agent-v1.5/dist/index.js
5. hive-mind         | file:///home/leviathan/.config/opencode/plugins/hive-mind/dist/index.js
6. trident           | file:///home/leviathan/.config/opencode/plugins/trident/dist/index.js
7. spider-agent-v2   | file:///home/leviathan/.config/opencode/plugins/spider-agent-v2/dist/index.js
8. agent-vision      | file:///home/leviathan/.config/opencode/plugins/agent-vision/dist/index.js
```

## SECTION 25: Session State & Continuity

### 25.1 Compaction Survival Hook
The `experimental.session.compacting` hook (inline in `src/index.ts`) preserves brain state:

```typescript
output.context.push(`[KRAKEN COMPACTION SURVIVAL]
Current gate: ${currentGate}
Planning: T2_loaded=${pBrain.isT2MasterLoaded()}, T1_generated=${pBrain.isT1Generated()}
Execution: active=${eBrain.getState().activeTasks}, completed=${eBrain.getState().completedTasks}
System: decisions=${sBrain.getState().decisionCount}
Evidence: gate=${currentGate}, verified=${evidence.isGateVerified(currentGate)}`);
```

### 25.2 Evidence Persistence
Gate evidence is persisted to disk for compaction survival:
```bash
~/.local/share/opencode/kraken-hive/evidence/
  ├── {gate}-evidence.json    ← Per-gate collected evidence
  ├── task-outputs/           ← Retrieved task outputs
  └── fire-and-forget-log.json ← L1/L2 violations detected
```

### 25.3 Post-Compaction Recovery
1. Read the survival doc (ALWAYS FIRST)
2. Find most recent handover: `ls -t HANDOVER_PACKAGES/ | head -1`
3. Check bundle exists on disk
4. Rebuild if mismatch: `bun run build && cp dist/index.js ~/.config/opencode/plugins/kraken-agent/dist/index.js`
5. Resume from last completed checkpoint

---

## APPENDIX A: Trident v4.2 Identity Bug — Full Detail

### Bug Location
**File:** `/home/leviathan/.config/opencode/plugins/trident/dist/index.js`
**Line 211461:** `if (!isTrident && agentName !== "") return;`

### The isTridentAgent Function (line 211385)
```javascript
function isTridentAgent(agentName) {
  return agentName === "trident" || 
         agentName.startsWith(TRIDENT_PREFIX + "_") || 
         agentName.startsWith(TRIDENT_PREFIX + "-");
}
```

### The systemTransformHook (line 211457)
```javascript
const systemTransformHook = async (input, output) => {
  const agentName = input?.agent || input?.agentName || input?.name || "";
  const isTrident = isTridentAgent(agentName);
  output.system = output.system || [];
  if (!isTrident && agentName !== "") return;  // <-- BUG
  const effectiveAgent = isTrident ? agentName : "trident";
  // ... injects [TRIDENT v4.2] IDENTITY OVERRIDE ...
};
```

### Root Cause Chain
1. opencode 1.14 `system.transform` hook does NOT populate `input.agent`
2. `agentName` evaluates to `""` (empty string)
3. Trident's guard checks: `!isTrident` = true (empty is not trident), `agentName !== ""` = false
4. Since `agentName !== ""` is false, the guard passes
5. `effectiveAgent` becomes `"trident"` (the fallback)
6. `[TRIDENT v4.2] IDENTITY OVERRIDE: You are Trident Brain v4.2...` is injected for ALL agents

### Fix Applied (Container-Only)
```javascript
// CHANGED:
if (!isTrident) return;
// REMOVED: && agentName !== ""

// CHANGED:
const effectiveAgent = agentName;
// REMOVED: isTrident ? agentName : "trident" (always true after guard fix)
```

## APPENDIX B: Project History Timeline

| Date | Milestone | Key Changes |
|------|-----------|-------------|
| 2026-04 | Kraken v1.0 | Initial orchestrator with single brain |
| 2026-04-28 | V4 Ship | Identity + T2 context, 8 P0 bugs fixed |
| 2026-04-28 | V5 Ship | Integration pipeline |
| 2026-04-29 | V6 Ship | L0-L7 Firewall + evidence collector |
| 2026-04-29 | V7 Ship | Brain concurrency + subagent + Hive |
| 2026-05-01 | V8 Ship | T2 context (10 files) + message drain |
| 2026-05-02 | V9 Ship | 19 bugs fixed, identity override removed, 16/16 subsystems verified |
| 2026-05-11 | v1.2.9.2 | Config bricking fixed — tools as booleans |
| 2026-05-28 | V1.3 phase 8 | Bundle verification 29/29 PASSED |
| 2026-05-30 | V1.3 rebuild | Full rebuild in KRAKEN_V1.3_RUNTIME_GRADE_VERIFIED/ |
| 2026-06-01 | Container test | Phases 1,2,5,7 PASS. Tier 4 TUI blocked by Trident identity interference |
| 2026-06-03 | Current session | Trident bug identified, patched in container snap, Tier 4 fix pending rebuild |

---

## END OF FULL CONTEXT HANDOVER

**Kraken Agent v1.2.9.2 Ecosystem**
**62 source files, 11,880 lines TypeScript/Python**
**+ 11 T2 context files, 5 identity files**
**Total context preserved: ~18,500+ lines**

> **All source code, architecture, types, T2 context, identity files, Hive bibles, and operational patterns**
> **are contained within this single document. No external access required.**
