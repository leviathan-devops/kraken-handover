# KRAKEN V1.3 BUILD OVERHAUL SPEC — FINAL

**Date:** 2026-06-02
**Authority:** Binding engineering standard. Supersedes all prior plans.
**Status:** PLAN — read-only. No implementation until user approval.

---

## PART I: ARCHITECTURE OVERVIEW — CORRECTED

### §1 What Kraken Is

Kraken is a multi-brain orchestrator that manages parallel agent execution through 3 autonomous brains, 3 clusters, and 9 specialized agents:

```
┌──────────────────────────────────────────────────────────────────────┐
│                     KRAKEN ORCHESTRATOR                              │
│                                                                      │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐                     │
│  │ PLANNING │────▶│EXECUTION │◀────│  SYSTEM  │                     │
│  │  BRAIN   │     │  BRAIN   │     │  BRAIN   │                     │
│  │ T2 Master│     │Supervisor│     │ Firewall │                     │
│  │ T1 Gen.  │     │Override  │     │ L0-L7    │                     │
│  └──────────┘     └────┬─────┘     └──────────┘                     │
│                        │ Central execution orchestrator              │
│                        │ ALL spawn_* routes through here             │
│         ┌──────────────┼──────────────┐                             │
│         ▼              ▼              ▼                              │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                        │
│  │  ALPHA   │   │   BETA   │   │  GAMMA   │                        │
│  │ CLUSTER  │   │ CLUSTER  │   │ CLUSTER  │                        │
│  │ 3 agents │   │ 3 agents │   │ 3 agents │                        │
│  │ Steamroll│   │Precision │   │ Testing  │                        │
│  └──────────┘   └──────────┘   └──────────┘                        │
│                                                                      │
│                    All subagents spawned via task() tool              │
│                    In-process threads. No Docker nesting.            │
└──────────────────────────────────────────────────────────────────────┘
```

### §2 Agent Identity Tiers

| Tier | Agents | Identity Source | System Prompts Injected |
|------|--------|-----------------|-------------------------|
| **Orchestrator** | `kraken`, `kraken-executor` | `identity/orchestrator/` files + dynamic gate context | Full orchestrator identity. Lightning Mode. Architecture. |
| **Cluster** | `shark-alpha-1`, `shark-alpha-2`, `manta-alpha-1`, `shark-beta-1`, `manta-beta-1`, `manta-beta-2`, `manta-gamma-1`, `manta-gamma-2`, `shark-gamma-1` | Their own `config()` agent instructions (shark/manta persona) | TASK CONTEXT ONLY: description, acceptance criteria, target cluster. Never overwritten with orchestrator identity. |
| **Non-Kraken** | `build`, `plan`, `general`, `trident`, `spider`, etc. | Not Kraken-managed | Nothing — skip entirely |

### §3 How Cluster Agent Identity Works (The Correct Model)

Cluster agents are PRE-EXISTING runtime-grade agent harnesses (Shark/Manta) deployed inside Kraken clusters. They are NOT Kraken clones. Kraken does not modify them.

When Kraken spawns a cluster agent via `task(subagent_type="shark-alpha-1")`:

1. The subagent loads its OWN `config()` instructions — the shark/manta persona
2. `system.transform` detects the agent is Kraken-managed (via `krakenSessionAgentMap`)
3. `ExecutionBrain.getPendingTask("shark-alpha-1")` finds the most recent planned task
4. Task context is INJECTED into the subagent's system prompt: description, criteria, cluster
5. The subagent's own identity REMAINS INTACT — it operates as a shark/manta agent, not as kraken

### §4 Cluster Architecture

| Cluster | Domain | Agents | Focus |
|---------|--------|--------|-------|
| **Alpha** | Build/Steamroll | `shark-alpha-1`, `shark-alpha-2`, `manta-alpha-1` | from-scratch, new-feature, implement, create |
| **Beta** | Debug/Precision | `shark-beta-1`, `manta-beta-1`, `manta-beta-2` | debug, fix, refactor, analyze, investigate |
| **Gamma** | Test/Verify | `manta-gamma-1`, `manta-gamma-2` | test, verify, audit, integration |

### §5 Core Canonical Infrastructure (Must Preserve)

| Layer | Component | File | Purpose |
|-------|-----------|------|---------|
| **Plugin entry** | Default export, config(), hooks | `src/index.ts` | Agent registration, identity injection, tool wiring |
| **Session tracking** | `krakenSessionAgentMap`, `krakenSetSessionAgent`, `krakenIsMySession` | `index.ts:104-125` | Agent identity isolation across tabs. Works at primary AND subagent levels. |
| **Planning Brain** | T2 Master loading, T1 decomposition | `src/brains/planning/planning-brain.ts` | Context generation, task decomposition |
| **Execution Brain** | CENTRAL EXECUTION ORCHESTRATOR | `src/brains/execution/execution-brain.ts` | All spawn_* routes through here. Task tracking, output verification, override authority. |
| **System Brain** | Gate management, firewall L0-L7, compaction | `src/brains/system/system-brain.ts` | Workflow state, security, derailment detection |
| **Firewall** | L0-L7 enforcement pipeline | `src/brains/system/firewall/index.ts` | Identity wall, theater detection, false completion, output inspection, cluster routing, derailment, zone protection, coordination |
| **Delegation Engine** | Priority queue, batch processing | `src/factory/AsyncDelegationEngine.ts` | Async task lifecycle, waitForCompletion |
| **Cluster Manager** | Cluster routing | `src/clusters/ClusterManager.ts` | Exec task assignment, status aggregation |
| **Cluster Scheduler** | Focus anchoring, domain assignment | `src/factory/ClusterScheduler.ts` | Smart cluster resolution, load balancing |
| **SubagentManagerBrain** | Override command handler | `src/brains/SubagentManagerBrain.ts` | ABORT, SUSPEND, RESUME, RETRIEVE_OUTPUTS |
| **Shared infra** | State store, brain messenger, evidence | `src/shared/*` | Domain-scoped state, inter-brain messaging, evidence persistence |
| **SafeHook** | Hook safety wrapper | `src/v4.1/hooks/safe-hook.ts` | Error-safe hook execution |
| **Identity loader** | File-based identity | `src/identity/loader.ts` | Orchestrator identity from markdown files |

---

## PART II: COMPLETE DEFECT INVENTORY — CORRECTED

### §6 CRITICAL DEFECTS (P0 — runtime crashes or silent failures)

| # | Defect | File:Line | Root Cause | Fix |
|---|--------|-----------|------------|-----|
| **P0-1** | `syncBrainsAfterTask` receives wrong argument types from `processQueue()` | `AsyncDelegationEngine.ts:127` → `:216` | `.then()` passes `(KrakenDelegationRequest, KrakenDelegationResult)` but function expects `(taskId: string, success: boolean, error?: string)`. Brain sync silently fails for batch path. | **Remove duplicate call at line 127.** Correct call already at line 184 inside `executeTask()`. |
| **P0-2** | `spawn()` called but `child_process` never imported | `monitoring-tools.ts:319,336,346,399,415,431` | `run_subagent_task` and `run_parallel_tasks` call `spawn()` without import. Throws `ReferenceError` at runtime. | **REMOVE run_subagent_task and run_parallel_tasks entirely** (see §10). One spawning path: spawn_* → ExecutionBrain. |
| **P0-3** | Polling loops in all three spawn tools always fail | `cluster-tools.ts:152-197, 296-341, 439-485` | Checks `clusterStatus?.tasks?.find(...)` but `ClusterStatus` type (`kraken-types.ts:95-100`) has only `{clusterId, active, load, agents}`. No `tasks` property. `clusterStatus.tasks` is `undefined` → `.find()` throws `TypeError`. | **Delete all three polling loops.** Return `result` from `delegate()` directly. Add missing `output` field to return value. |
| **P0-4** | `processQueue` orphans tasks added during processing | `AsyncDelegationEngine.ts:106-108, 114-137` | When `enqueueWithPriority()` adds tasks while `processing === true`, nothing re-triggers `processQueue()`. Tasks sit in queue forever. | **After `finally { this.processing = false; }`, add: `if (this.taskQueue.length > 0) this.processQueue();`** |
| **P0-5** | `require('url')` in ESM context | `system-brain.ts:644` | `const { fileURLToPath } = require('url')` — `require` unavailable in ESM. Throws `ReferenceError` when `findT2Dir()` is called. | **Change to `import { fileURLToPath } from 'node:url';` at top of file.** |

### §7 HIGH DEFECTS (P1 — functional correctness)

| # | Defect | File:Line | Fix |
|---|--------|-----------|-----|
| **P1-1** | Orchestrator identity injected into cluster agents | `index.ts:694-715` | **See §8 — Three-Tier Identity Injection.** Check `KRAKEN_PLUGIN_IDENTITY.krakenAgents` for orchestrator identity. Check `KRAKEN_PLUGIN_IDENTITY.clusterAgents` for task context injection. |
| **P1-2** | `processLoop` picks from END of queue (LIFO) | `ClusterInstance.ts:93` | Change to FIFO: `for (let i = 0; i < this.taskQueue.length; i++)`. |
| **P1-3** | `spawnAgentTask` uses hardcoded agent names | `ClusterInstance.ts:241-254` | Use `agent.id` dynamically in the inline script. |
| **P1-4** | `spawnAgentTask` double-escapes JSON | `ClusterInstance.ts:225` | Remove `replace(/\\/g, '\\\\')` — `JSON.stringify` already escapes. |
| **P1-5** | `pendingTasks` double-counted | `ClusterScheduler.ts:173` | Remove `load.pendingTasks++` from `ClusterScheduler.incrementLoad()`. |
| **P1-6** | Wrong error log prefixes | `cluster-tools.ts:280,291,424,435` | Change `'[spawn_cluster_task]'` to `'[spawn_shark_agent]'` and `'[spawn_manta_agent]'` respectively. |
| **P1-7** | `processLoop` blocks while any async op pending | `ClusterInstance.ts:89-131` | Use per-agent capacity tracking instead of `pendingOps.length` check. |
| **P1-8** | Missing `output` field in spawn return values | `cluster-tools.ts:200-208,344-352,488-496` | Add `output: result.output || ''` to the return JSON. |

### §8 Three-Tier Identity Injection (P1-1 — THE CRITICAL ARCHITECTURAL FIX)

**Current (broken):** `system.transform` at `index.ts:678-739` injects `[KRAKEN EXECUTION CONTEXT]` and orchestrator identity into ALL 11 Kraken-managed agents. Line 691: `shouldInject = isMyAgent(effectiveAgent)` matches everything. Cluster agents get told "Agent: kraken (Orchestrator)" which overwrites their shark/manta identity.

**Fixed:** Three-tier discrimination:

```typescript
'system.transform': safeHook(async (input, output, ctx) => {
  const effectiveAgent = inputAgent || lastKnownAgent || mapAgent || '';

  // TIER 3: Non-Kraken agents → skip entirely
  if (effectiveAgent && !ctx.isMyAgent(effectiveAgent) && 
      effectiveAgent !== 'kraken' && !effectiveAgent.startsWith('kraken-')) {
    return;
  }

  // TIER 1: Orchestrator (kraken, kraken-executor)
  if (KRAKEN_PLUGIN_IDENTITY.krakenAgents.has(effectiveAgent)) {
    // Full orchestrator identity — existing behavior, CORRECT
    if (orchestratorIdentityPrompt && orchestratorIdentityPrompt !== 'FALLBACK') {
      output.system = output.system || [];
      if (!output.system.some(s => typeof s === 'string' && s.includes('KRAKEN ORCHESTRATOR'))) {
        output.system.push(orchestratorIdentityPrompt);
      }
    }
    output.system.push(`[KRAKEN EXECUTION CONTEXT]
Agent: kraken (Orchestrator)
Model: ${model || 'default'}
Mode: Build (full tool access)
Authorization: FULL — all Kraken tools, Hive, clusters, firewall
...`);
  }

  // TIER 2: Cluster agents (shark-alpha-1, manta-beta-1, etc.)
  else if (KRAKEN_PLUGIN_IDENTITY.clusterAgents.has(effectiveAgent)) {
    // Their identity = from config() (shark/manta persona) — NOT MODIFIED
    // Task context only if spawned BY Kraken (not manually selected)
    if (krakenIsMySession(ctx.sessionID)) {
      const execBrain = getExecutionBrain();
      const pendingTask = execBrain.getPendingTask(effectiveAgent);
      if (pendingTask && pendingTask.status === 'planned') {
        execBrain.claimTask(pendingTask.taskId);
        output.system.push(`[KRAKEN TASK ASSIGNMENT]
You are executing a task delegated by the Kraken orchestrator.
Your identity and capabilities remain your own.
Task: ${pendingTask.description}
Acceptance Criteria: ${pendingTask.criteria.join(', ')}
Cluster: ${pendingTask.clusterId}`);
      }
    }
  }

  // Gate-aware context — for orchestrator only
  if (KRAKEN_PLUGIN_IDENTITY.krakenAgents.has(effectiveAgent)) {
    // ... existing getRelevantContextForGate code
  }
});
```

**How Task Context Reaches the Subagent:**

```
Step 1: spawn_cluster_task.execute()
  → execBrain.registerTask({
      taskId: "task_xxx",
      agent: "shark-alpha-1",
      description: "build login page",
      criteria: ["responsive", "accessible"],
      clusterId: "cluster-alpha",
      status: "planned"
    })
  → returns { taskId, action_required: "SPAWN", agent: "shark-alpha-1" }

Step 2: Kraken LLM calls task(description="build login page", subagent_type="shark-alpha-1")
  → opencode framework spawns subagent thread with new sessionID

Step 3: chat.message hook fires for the subagent
  → krakenSetSessionAgent("shark-alpha-1", sessionID)
  → Session now tracked under Kraken management

Step 4: system.transform fires for the subagent
  → effectiveAgent resolved from session map = "shark-alpha-1"
  → KRAKEN_PLUGIN_IDENTITY.clusterAgents.has("shark-alpha-1") = true
  → krakenIsMySession(sessionID) = true
  → execBrain.getPendingTask("shark-alpha-1") → finds task "task_xxx"
  → execBrain.claimTask("task_xxx") → marks status "spawning"
  → Task context injected into system prompt
  → Subagent's own shark/manta identity (from config()) + task context = final prompt
```

### §9 MEDIUM DEFECTS (P2 — design / quality)

| # | Defect | File:Line | Fix |
|---|--------|-----------|-----|
| **P2-1** | `ExecutionBrain.executeTask()` is a complete stub that always returns `{success: false}` | `execution-brain.ts:166-202` | **Full engineering as central execution orchestrator** — see §10. |
| **P2-2** | Shell injection in `browser_exec`/`browser_fill` | `kraken-browser-tools.ts:218,245` | Use `child_process.spawn` with argument arrays, not template literal shell strings. |
| **P2-3** | `SubagentManagerBrain.handleAbort` assumes tmux | `SubagentManagerBrain.ts:120` | Add `docker kill` fallback when tmux unavailable. |
| **P2-4** | Browser tool state is module-global | `kraken-browser-tools.ts:61-63` | Move `browserOpen`, `currentUrl`, `lastSnapshot` into session-scoped Map. |
| **P2-5** | `hive_*` native tools not visible — reliance on external Hive Mind plugin | `index.ts:608-618` | Document that Kraken uses Hive Mind plugin's native Hive tools. Delete dead `createKrakenHiveTools()`. |

---

## PART III: EXECUTIONBRAIN AS CENTRAL ORCHESTRATOR (P2-1)

### §10 ExecutionBrain Role

ExecutionBrain is the CENTRAL execution orchestrator. It sits ABOVE the AsyncDelegationEngine → ClusterManager → ClusterInstance chain. All spawn tools route through it.

```
                    ExecutionBrain (CENTRAL ORCHESTRATOR)
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
    spawn_cluster_task   spawn_shark_agent   spawn_manta_agent
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                    ExecutionBrain API:
```

**ExecutionBrain must implement:**

| Method | Signature | Purpose |
|--------|-----------|---------|
| `registerTask(task)` | `(task: PendingTask) → void` | Called by spawn_* tools. Stores task with status "planned". |
| `getPendingTask(agent)` | `(agentId: string) → PendingTask \| null` | Called by system.transform. Finds the most recent planned task for this agent. |
| `claimTask(taskId)` | `(taskId: string) → void` | Called by system.transform after task context is injected. Marks status "spawning". |
| `completeTask(taskId, result)` | `(taskId: string, result: CompleteResult) → void` | Called by complete_subagent_task tool. Marks status "completed"/"failed". Triggers L2 output verification. Syncs SystemBrain + PlanningBrain. |
| `getAgentState(agentId)` | `→ AgentState` (busy/free, current task) | Agent availability tracking. |
| `detectTaskAlerts()` | `→ TaskAlert[]` | Scans for stuck (>180s), failed, slack (<50 chars) tasks. |
| `retryTask(taskId)` | `→ boolean` | Resets a failed/stuck task to "planned" for re-spawn. |
| `drainCluster(clusterId)` | `→ ClusterDrainReport` | Finalize cluster: aggregate + produce drain report. |

**PendingTask type:**
```typescript
interface PendingTask {
  taskId: string;
  agent: string;
  description: string;
  criteria: string[];
  clusterId: string;
  status: 'planned' | 'spawning' | 'running' | 'completed' | 'failed' | 'stuck';
  output?: string;
  registeredAt: number;
  completedAt?: number;
}
```

### §11 Single Spawning Path (P2-6 — Remove run_subagent_task/run_parallel_tasks)

The current `run_subagent_task` and `run_parallel_tasks` bypass all cluster management, spawn Docker containers directly, and have no firewall enforcement. **REMOVE ENTIRELY.**

**Only spawning path:** `spawn_cluster_task` / `spawn_shark_agent` / `spawn_manta_agent`

All three route through ExecutionBrain:

```
spawn_cluster_task(task, clusterId="alpha")
  → ExecutionBrain.registerTask() — validate L4, check availability
  → Delegation Engine → Cluster Manager → Cluster Instance — create AgentTask record
  → ExecutionBrain.getPendingTask() — ready for system.transform
  → Returns { taskId, status: "planned", action_required: "SPAWN", agent: "shark-alpha-1", ... }
  → LLM calls task(description, subagent_type="shark-alpha-1")
  → cluster agent runs with own identity + task context

spawn_shark_agent(task, clusterId="alpha") — same path, agentType pre-set to "shark"
spawn_manta_agent(task, clusterId="beta") — same path, agentType pre-set to "manta"
```

For simple single-task spawning without cluster routing: call `spawn_cluster_task` without `clusterId` → ExecutionBrain auto-assigns to least-loaded cluster.

---

## PART IV: CLUSTER LIFECYCLE — PORTED FROM WORKING PATTERN

These patterns are ported from a working implementation with Kraken-native naming. 13 patterns total.

### §12 Type Definitions (add to `kraken-types.ts`)

```typescript
export type ClusterExecutionMode = 'verify' | 'divide' | 'pressure';
export type KrakenClusterStatus = 'constructing' | 'active' | 'retrying' | 'draining' | 'completed';
export type AgentTaskStatus = 'pending' | 'spawning' | 'running' | 'completed' | 'stuck' | 'failed';

export interface KrakenCluster {
  clusterId: string;
  task: string;
  acceptanceCriteria: string[];
  executionMode: ClusterExecutionMode;
  tasks: KrakenAgentTask[];
  clusterHealth: ClusterHealth;
  escalationCount: number;
  createdAt: number;
  status: KrakenClusterStatus;
  target?: string;
}

export interface KrakenAgentTask {
  taskId: string;
  agentType: string;
  taskDescription: string;
  assignedFiles: string[];
  agentSessionId: string;
  status: AgentTaskStatus;
  output: string;
  exitCode?: number;
  startedAt: number;
  completedAt?: number;
  evidenceFiles?: { file: string; exists: boolean; valid: boolean }[];
  pressurePhase?: number;
}

export interface ClusterHealth {
  taskCount: number;
  activeTasks: number;
  completedTasks: number;
  failedTasks: number;
  escalationCount: number;
  lastRetry: number;
}

export interface TaskAlert {
  type: 'stuck' | 'failed' | 'slack' | 'divergent';
  taskIndex: number;
  taskId: string;
  reason: string;
  timestamp: number;
}

export interface AggregatedClusterResults {
  consensus: boolean;
  taskResults: Record<string, string>;
  mergedOutput: string;
  discrepancies: string[];
  verificationProof: boolean;
}

export interface ClusterDrainReport {
  clusterId: string;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  finalOutput: string;
  evidencePath: string;
  drainedAt: number;
  passRate?: number;
}
```

Also add `tasks` field to `ClusterStatus` (the field that was missing, causing the polling loop bug):

```typescript
export interface ClusterStatus {
  clusterId: string;
  active: boolean;
  load: ClusterLoad;
  agents: string[];
  tasks: Array<{
    taskId: string;
    agentType: string;
    status: AgentTaskStatus;
    outputLen: number;
    startedAt: number;
  }>;
}
```

### §13 ClusterEngine Methods (new file: `src/clusters/ClusterEngine.ts`)

| # | Method | Purpose |
|---|--------|---------|
| M1 | `constructCluster(task, criteria, mode, agentCount?)` | Creates cluster with calculated agent count and generated tasks. Returns clusterId. |
| M2 | `calculateAgentCount(task, mode)` | Task-length heuristic: verify 2-4, divide scales 2-6, pressure=4. |
| M3 | `generateAgentTasks(clusterId, task, mode, count)` | Creates task records with agent-type assignment and mode-specific prompt wrapping. |
| M4 | `activateCluster(clusterId)` | Transitions cluster from "constructing" to "active". Marks all tasks as "spawning". |
| M5 | `markTasksRunning(clusterId)` | Marks spawning tasks as "running". Used when LLM calls task() for each. |
| M6 | `updateTaskStatus(clusterId, taskIndex, status, output?, exitCode?)` | Updates single task state. Recalculates cluster status and health. |
| M7 | `updateClusterStatus(cluster)` (private) | If all completed → "completed". If any failed and none running → "retrying". |
| M8 | `updateClusterHealth(cluster)` (private) | Recalculates live health metrics: activeTasks, completedTasks, failedTasks. |
| M9 | `detectTaskAlerts(cluster)` | Scans for: stuck (>180s running), failed, slack (completed with <50 chars), divergent (verify-mode output similarity <0.3). Returns TaskAlert[]. |
| M10 | `retryCluster(clusterId, reason)` | Resets failed/stuck tasks to "pending". Increments escalationCount. Transitions to "active". |
| M11 | `retrySingleTask(clusterId, taskIndex, reason)` | Resets one task to "pending". |
| M12 | `drainCluster(clusterId)` | Finalizes cluster. Calls aggregate. Produces ClusterDrainReport with passRate for pressure mode. |
| M13 | `computeOutputSimilarity(a, b)` (private) | Jaccard-like word set similarity. Words > 3 chars. Returns 0..1. Used by detectTaskAlerts for divergence detection. |

### §14 Tool Changes

| Tool | Current | New | File |
|------|---------|-----|------|
| `spawn_cluster_task` | Broken polling loop (always times out) | Delete loop. Route through ExecutionBrain.registerTask(). Return delegate() result with output field + action_required. | `cluster-tools.ts` |
| `spawn_shark_agent` | Same broken loop. Wrong log prefixes. | Delete loop. Route through ExecutionBrain. Fix prefixes. Same output+action_required pattern. | `cluster-tools.ts` |
| `spawn_manta_agent` | Same broken loop. Wrong log prefixes. | Delete loop. Route through ExecutionBrain. Fix prefixes. Same pattern. | `cluster-tools.ts` |
| `complete_subagent_task` | **DOES NOT EXIST** | **NEW.** Called by LLM after task() subagent finishes. Routes to ExecutionBrain.completeTask(). | NEW in `cluster-tools.ts` |
| `aggregate_results` | Raw collection, no mode dispatch | Add verify/divide/pressure mode dispatch with consensus detection. Add L3 output check. | `monitoring-tools.ts` |
| `get_cluster_status` | Returns ClusterLoad only | Add per-task status array, target info, execution mode. | `monitoring-tools.ts` |
| `run_subagent_task` | Bypasses clusters, spawns Docker, missing import | **DELETE ENTIRELY** | `monitoring-tools.ts` |
| `run_parallel_tasks` | Same as above | **DELETE ENTIRELY** | `monitoring-tools.ts` |
| `get_agent_status` | Works correctly | **KEEP AS-IS** | `monitoring-tools.ts` |
| `kraken_brain_status` | Works correctly | **KEEP AS-IS** | `monitoring-tools.ts` |
| `kraken_message_status` | Works correctly | **KEEP AS-IS** | `monitoring-tools.ts` |
| All browser/vision tools | Shell injection (P2-2), global state (P2-4) | Fix shell injection. Session-scope browser state. | `kraken-browser-tools.ts` |
| `read_kraken_context` | Works correctly | **KEEP AS-IS** | `shark-t2-tools.ts` |
| `report_to_kraken` | Works correctly | **KEEP AS-IS** | `shark-t2-tools.ts` |
| `get_task_context` | Works correctly | **KEEP AS-IS** | `shark-t2-tools.ts` |

---

## PART V: DEAD CODE REMOVAL

| # | File | Lines | Reason |
|---|------|-------|--------|
| D1 | `src/factory/ArchitectureFactory.ts` | 186 | **Boilerplate from Agent-Factory-Edition-v4.1 template.** Never instantiated. Kraken does direct `new` calls in `index.ts`. |
| D2 | `src/clusters/wrappers/opencode_agent.py` | 589 | Python wrapper. Never imported. Syntax error at line 2-3. Replaced by ExecutionBrain task system. |
| D3 | `src/clusters/wrappers/container_pool.py` | 523 | Python pool. Never imported. Uses different Docker image. Pool management is handled in TypeScript ClusterInstance. |
| D4 | `src/clusters/wrappers/__init__.py` | 3 | Empty Python marker file. |
| D5 | `src/tools/kraken-hive-tools.ts` | 165 | `createKrakenHiveTools()` never called. Redundant with Hive Mind plugin's native Hive tools. |
| D6 | `src/factory/kraken-types.ts:203-229` | 27 | `KrakenAgentIdentity`, `SharkAgentConfig`, `MantaAgentConfig` — never used anywhere. |
| D7 | `src/tools/monitoring-tools.ts:14-21` | 8 | `getClusterStatusSchema`, `aggregateResultsSchema` — defined but never used. |
| D8 | `src/tools/cluster-tools.ts:18-23` | 6 | `ClusterTaskStatus` interface — only used by the now-deleted polling loop. |
| D9 | `AsyncDelegationEngine.ts:142-145` | 4 | `startProcessingLoop()` — no-op that sets `processing = false` (already default). |
| D10 | `ClusterInstance.ts:22` | 1 | `SUBAGENT_PORT_BASE` — defined, never read. |
| D11 | `src/tools/cluster-tools.ts:25-48` | 24 | Zod schemas (`spawnClusterTaskSchema`, `spawnSharkAgentSchema`, `spawnMantaAgentSchema`) — defined, never used. |
| D12 | `src/index.ts:16` | 1 | `Plugin` type import — never used. |

---

## PART VI: FILE CHANGE SUMMARY

| File | Action | Est. Lines Changed |
|------|--------|-------------------|
| `src/brains/execution/execution-brain.ts` | **ADD** registerTask, getPendingTask, claimTask, completeTask, detectTaskAlerts, retryTask, drainCluster, getAgentState | +200 |
| `src/factory/kraken-types.ts` | **ADD** KrakenCluster, KrakenAgentTask, ClusterHealth, TaskAlert, AggregatedClusterResults, ClusterDrainReport types. **ADD** `tasks` field to ClusterStatus. **DELETE** unused types (D6). | +80, -27 |
| `src/clusters/ClusterEngine.ts` | **CREATE** — M1-M13 patterns | +300 |
| `src/index.ts` | **FIX** three-tier identity injection in system.transform (P1-1). **DELETE** Plugin import (D12). | ~40 changed |
| `src/tools/cluster-tools.ts` | **DELETE** all three polling loops (P0-3). **ADD** complete_subagent_task tool. **FIX** return values (add output, add action_required). **FIX** log prefixes (P1-6). **DELETE** ClusterTaskStatus (D8), Zod schemas (D11). **ROUTE** spawn_* through ExecutionBrain. | ~200 changed |
| `src/tools/monitoring-tools.ts` | **DELETE** run_subagent_task, run_parallel_tasks. **ENHANCE** aggregate_results with mode dispatch. **ENHANCE** get_cluster_status with per-task status. **DELETE** unused Zod schemas (D7). | ~100 changed |
| `src/clusters/ClusterInstance.ts` | **FIX** processLoop LIFO→FIFO (P1-2). **FIX** hardcoded agent names (P1-3). **FIX** double-escaped JSON (P1-4). **FIX** processLoop blocking (P1-7). **DELETE** SUBAGENT_PORT_BASE (D10). | ~80 changed |
| `src/factory/AsyncDelegationEngine.ts` | **FIX** duplicate syncBrainsAfterTask (P0-1). **FIX** orphan queue re-trigger (P0-4). **DELETE** startProcessingLoop (D9). | ~15 changed |
| `src/brains/system/system-brain.ts` | **FIX** require('url') → import (P0-5). | ~5 changed |
| `src/factory/ClusterScheduler.ts` | **FIX** pendingTasks double-count (P1-5). | ~3 changed |
| `src/tools/kraken-browser-tools.ts` | **FIX** shell injection (P2-2). **FIX** global state → session-scoped (P2-4). | ~20 changed |
| `src/brains/SubagentManagerBrain.ts` | **FIX** tmux assumption → Docker kill fallback (P2-3). | ~10 changed |
| `src/factory/ArchitectureFactory.ts` | **DELETE** (D1) | -186 |
| `src/clusters/wrappers/opencode_agent.py` | **DELETE** (D2) | -589 |
| `src/clusters/wrappers/container_pool.py` | **DELETE** (D3) | -523 |
| `src/clusters/wrappers/__init__.py` | **DELETE** (D4) | -3 |
| `src/tools/kraken-hive-tools.ts` | **DELETE** (D5) | -165 |
| `container-test/opencode.json` | Already done — single plugin | — |
| `deploy.sh` | Remove Python wrapper copy steps | -5 lines |
| **Net change:** | +600 added, -1500 deleted. Net -900 lines. | |

---

## PART VII: IMPLEMENTATION ORDER

### Phase 0: Fix Critical Crashes (must fix before any other work)
1. P0-2: Remove run_subagent_task/run_parallel_tasks from monitoring-tools.ts
2. P0-5: Fix `require('url')` → `import` in system-brain.ts
3. P0-3: Delete polling loops from all three spawn tools
4. P0-1: Remove duplicate syncBrainsAfterTask from processQueue
5. P0-4: Add re-trigger for processQueue after processing completes

### Phase 1: Fix High Defects
6. P1-2: LIFO → FIFO in processLoop
7. P1-3: Fix hardcoded agent names in spawnAgentTask
8. P1-4: Fix double-escaped JSON in spawnAgentTask
9. P1-5: Remove pendingTasks double-count in ClusterScheduler
10. P1-6: Fix error log prefixes
11. P1-7: Fix processLoop blocking
12. P1-8: Add output field to spawn return values

### Phase 2: Architect the ExecutionBrain
13. Add registerTask, getPendingTask, claimTask, completeTask to ExecutionBrain
14. Route all spawn_* tools through ExecutionBrain
15. Wire ExecutionBrain into system.transform for task context injection (P1-1)
16. Three-tier identity injection: orchestrator gets full identity, cluster gets task context only

### Phase 3: Type System
17. Add §12 cluster lifecycle types to kraken-types.ts
18. Add tasks field to ClusterStatus
19. Delete unused types (D6)

### Phase 4: ClusterEngine
20. Create ClusterEngine.ts with M1-M13
21. Wire ClusterEngine into cluster-tools.ts (aggregate_results, get_cluster_status)

### Phase 5: Complete Subagent Tool
22. Add complete_subagent_task tool
23. Add action_required to spawn_* return values
24. Enhance aggregate_results with mode dispatch
25. Enhance get_cluster_status with per-task status

### Phase 6: Quality Fixes
26. Fix shell injection in browser_exec/browser_fill (P2-2)
27. Session-scope browser state (P2-4)
28. Fix tmux assumption in SubagentManagerBrain (P2-3)

### Phase 7: Dead Code Purge
29. Delete D1-D12 from Part V

### Phase 8: Rebuild + Container Test
30. Rebuild bundle: `bun build src/index.ts --outfile dist/kraken-agent.js --target bun --format esm --bundle`
31. Deploy to container with identity + Hive Mind + kraken-context
32. Full 7-phase adversarial test:
    - Firewall L0-L7 with adversarial inputs
    - Identity scoping (three-tier, zero leaks)
    - Cluster lifecycle (spawn → complete → aggregate → drain)
    - Compaction survival (compacting hook produces context)
    - Tool quality (all returning real data, no stubs)
    - Config audit (no wildcards, single plugin, identity present)

---

## PART VIII: NAMING CONVENTION

| Concept | Kraken Name | Notes |
|---------|-------------|-------|
| Cluster state object | `KrakenCluster` | Unchanged from existing naming |
| Individual task in cluster | `KrakenAgentTask` | Analogous to Spider's "strand" |
| Task alert/health event | `TaskAlert` | Analogous to Spider's "vibration" |
| Cluster health metrics | `ClusterHealth` | Analogous to Spider's "anchor state" |
| Reset all failed tasks | `retryCluster` | Analogous to Spider's "tightenWeb" |
| Reset single task | `retrySingleTask` | Analogous to Spider's "reAnchorStrand" |
| Finalize cluster | `drainCluster` | Analogous to Spider's "dissolveWeb" |
| Verify/divide/pressure | `ClusterExecutionMode` | Same values |
| Complete subagent callback | `complete_subagent_task` | Kraken-native |
| Session/agent tracking | `krakenSessionAgentMap` | Existing — unchanged |
| Task context injection | `getPendingTask`, `claimTask` | Kraken-native |

---

## APPENDIX A: DEPLOY CONFIG (Corrected)

```json
// container-test/opencode.json
{
  "model": "xiaomi-token-plan-sgp/mimo-v2",
  "provider": { ... },
  "plugin": [
    "file:///root/.config/opencode/plugins/kraken-agent/dist/index.js"
  ],
  "agent": {
    "kraken": { "name": "kraken", "mode": "primary", "tools": {} }
  },
  "permission": {}
}
```

- Single plugin: kraken-agent only
- Hive Mind: mounted via `-v ~/.local/share/opencode/hive-mind:/root/.local/share/opencode/hive-mind`
- Agent-vision (browser/VLM): optional separate plugin, not required for core architecture
- Identity files: `plugins/kraken-agent/identity/orchestrator/` (5 .md files)
- kraken-context: `plugins/kraken-agent/kraken-context/` (15 T2 files)

---

## APPENDIX B: Current Compaction Survival Docs

9 files in `Active Projects/Kraken Agent v1.3/compaction_survival/`:

| File | Purpose |
|------|---------|
| `COMPACTION_SURVIVAL.md` | Core identity + architecture + current state (182 lines) |
| `POST-COMPACTION_PROMPT.md` | Recovery instructions for post-compaction (82 lines) |
| `CHANGELOG.md` | Build history, completed phases, pending phases (128 lines) |
| `DEBUG_LOG.md` | Every bug with root cause, fix, and verdict (95 lines) |
| `SoC_PRESERVATION.md` | Patterns discovered, lessons learned, problem solving approaches (87 lines) |
| `BUILD_STATE.md` | Current phase, pending phases (23 lines) |
| `DECISION_CHAIN.md` | Key architecture decisions and rationale (16 lines) |
| `EVIDENCE_STATE.md` | Container test evidence files and results (35 lines) |
| `TASK_QUEUE.md` | Full implementation backlog organized by priority (58 lines) |
| **`BUILD_SPEC.md`** | **THIS FILE — Full build overhaul specification (this document)** |

---

**END OF BUILD SPEC — READY FOR IMPLEMENTATION**
