# Kraken V1.3 — Debug Log

## Session: Deep Runtime Test (2026-06-02)

### CORRECTED — Three-Tier Identity Injection (was incorrectly labeled "identity bleed")
- **Original classification:** P1-4 "Identity bleed to cluster agents"
- **Corrected understanding:** This IS a defect, but the fix is more nuanced. The `system.transform` hook at `index.ts:694-715` injects `[KRAKEN EXECUTION CONTEXT]` and orchestrator identity into ALL 11 Kraken-managed agents. Line 691: `shouldInject = isMyAgent(effectiveAgent)` matches everything — both orchestrator AND cluster agents.
- **Cluster agents are NOT kraken:** They are pre-existing runtime-grade shark/manta agents with their own identity from `config()`. They should NOT receive orchestrator identity — they should receive only TASK CONTEXT (what to work on).
- **Three-tier fix:**
  1. Orchestrator (kraken, kraken-executor): full orchestrator identity + execution context
  2. Cluster agents (shark-alpha-1, manta-beta-1, etc.): TASK CONTEXT ONLY via `execBrain.getPendingTask(agent)`. Their identity stays from config().
  3. Non-kraken (build, plan, general, trident, spider): skip entirely
- **Verdict:** FIXED in spec. Three-tier discrimination in system.transform.
- **Root cause:** The original developer treated all 11 agents as "kraken" agents, not understanding that cluster agents are their OWN agents with pre-existing identity.

---

### P0-3: Polling Loop Bug in spawn_cluster_task — CRITICAL (UNCHANGED)
- **Issue:** `spawn_cluster_task` always returns `{success: false, error: "Task timed out after 60s"}` even when tasks complete successfully.
- **Root cause:** Polling loop at `cluster-tools.ts:152-197` checks `clusterStatus?.tasks?.find(...)` but `ClusterStatus` has NO `tasks` field (`kraken-types.ts:95-100`). The field is always `undefined`. Every spawn call wastes 60 seconds and reports failure.
- **Compounding factor:** The loop is ALSO redundant. `delegate()` at line 149 already awaits completion.
- **Fix:** Delete all three polling loops. Return `result` from `delegate()` directly. Add `output` field.
- **Verdict:** FIXED in spec.

---

### P0-2: spawn Not Imported — CRITICAL (CHANGED)
- **Original fix:** Add `import { spawn }` to monitoring-tools.ts
- **Corrected fix:** **Remove run_subagent_task and run_parallel_tasks entirely.** They bypass all cluster management, spawn Docker containers directly, have no firewall enforcement, and are redundant with the single spawning path (spawn_* → ExecutionBrain → task tool).
- **Verdict:** FIXED in spec — DELETE the tools, not add the import.

---

### P0-1: syncBrainsAfterTask Wrong Argument Types — CRITICAL (UNCHANGED)
- **Issue:** `AsyncDelegationEngine.ts:127` in `processQueue()` calls `this.syncBrainsAfterTask(task.request, execResult)` passing `(KrakenDelegationRequest, KrakenDelegationResult)` but function expects `(taskId: string, success: boolean, error?: string)`.
- **Fix:** Remove the duplicate call. Correct call already exists at line 184 inside `executeTask()`.
- **Verdict:** FIXED in spec.

---

### P0-4: processQueue Orphans Tasks — CRITICAL (UNCHANGED)
- **Issue:** Tasks added while `processing === true` sit in queue forever.
- **Fix:** After `finally`, add `if (this.taskQueue.length > 0) this.processQueue();`.
- **Verdict:** FIXED in spec.

---

### P0-5: require('url') in ESM — CRITICAL (UNCHANGED)
- **Issue:** `system-brain.ts:644` uses `require('url')` which doesn't exist in ESM.
- **Fix:** Change to `import { fileURLToPath } from 'node:url';`.
- **Verdict:** FIXED in spec.

---

### P2-1: ExecutionBrain.executeTask is a Stub — MEDIUM (CORRECTED)
- **Original classification:** "Stub that should be deleted"
- **Corrected understanding:** **This is WRONG.** ExecutionBrain is the CENTRAL EXECUTION ORCHESTRATOR. It sits ABOVE the AsyncDelegationEngine → ClusterManager → ClusterInstance chain. All spawn_* tools route through it. Making it a stub was theatrical architecture that undermines the entire execution system.
- **The fix:** Full engineering of ExecutionBrain with:
  - `registerTask()` — store task with status "planned"
  - `getPendingTask(agent)` — find planned task for system.transform
  - `claimTask(taskId)` — mark as "spawning" after context injection
  - `completeTask(taskId, result)` — mark done, L2 verify, sync brains
  - `detectTaskAlerts()` — stuck/failed/slack task detection
  - `retryTask(taskId)` — reset failed task to planned
  - `drainCluster(clusterId)` — finalize with pass rate
- **Verdict:** FIXED in spec — full engineering required.

---

### P1-2: processLoop LIFO Negates Priority — HIGH (UNCHANGED)
- Reverse iteration at `ClusterInstance.ts:93` dequeues low-priority tasks first.
- **Fix:** Forward iteration.
- **Verdict:** FIXED in spec.

---

### P1-3: Hardcoded Agent Names — HIGH (UNCHANGED)
- `spawnAgentTask.ts:241-254` uses hardcoded `'shark-alpha-1'` and `'manta-beta-1'`.
- **Fix:** Use `agent.id` dynamically.
- **Verdict:** FIXED in spec.

---

### P1-5: pendingTasks Double-Counted — HIGH (UNCHANGED)
- `ClusterScheduler.ts:173` increments `pendingTasks` same as `ClusterInstance`.
- **Fix:** Remove from scheduler.
- **Verdict:** FIXED in spec.

---

### ArchitectureFactory: Leftover Boilerplate (CORRECTED)
- **Original classification:** "Engineer properly — delegate() is a stub"
- **Corrected understanding:** This is **boilerplate scaffolding** from the Agent-Factory-Edition-v4.1 template. The template's `createArchitectureFactory()` is called in the boilerplate's `index.ts` but Kraken never calls it — it does direct `new` calls instead. The stub `delegate()` is because it was never wired into Kraken's actual execution path.
- **Verdict:** DELETE. It's dead boilerplate, not a broken component.

---

### Hive Tools: Redundant (CORRECTED)
- **Original classification:** "Wire createKrakenHiveTools() into tool export"
- **Corrected understanding:** Kraken uses the **Hive Mind plugin's native Hive tools**. The `kraken-hive-tools.ts` file is a duplicate that was never wired and should never have existed. Delete it.
- **Verdict:** DELETE. Redundant with Hive Mind plugin.
