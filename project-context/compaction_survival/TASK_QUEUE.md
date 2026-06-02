# TASK_QUEUE.md

_Initialized by CompactionManager. Updated on each milestone._

## Phase 0: CRITICAL CRASH FIXES (Do First)

| # | Task | File | Priority | Status |
|---|------|------|----------|--------|
| P0-2 | Remove `run_subagent_task` and `run_parallel_tasks` entirely | `src/tools/monitoring-tools.ts` | CRITICAL | **DONE** |
| P0-5 | Replace `require('url')` with `import { fileURLToPath }` | `src/brains/system/system-brain.ts` | CRITICAL | **DONE** |
| P0-3 | Delete polling loops from all 3 spawn tools | `src/tools/cluster-tools.ts` | CRITICAL | **DONE** |
| P0-1 | Remove duplicate `syncBrainsAfterTask` call from processQueue | `src/factory/AsyncDelegationEngine.ts` | CRITICAL | **DONE** |
| P0-4 | Add re-trigger for processQueue after processing completes | `src/factory/AsyncDelegationEngine.ts` | CRITICAL | **DONE** |

## Phase 1: HIGH DEFECTS

| # | Task | File | Priority | Status |
|---|------|------|----------|--------|
| P1-2 | Fix processLoop LIFO → FIFO | `src/clusters/ClusterInstance.ts:93` | HIGH | PENDING |
| P1-3 | Fix hardcoded agent names in spawnAgentTask | `src/clusters/ClusterInstance.ts:241-254` | HIGH | PENDING |
| P1-4 | Remove double-escaped JSON in spawnAgentTask | `src/clusters/ClusterInstance.ts:225` | HIGH | PENDING |
| P1-5 | Remove pendingTasks double-count in ClusterScheduler | `src/factory/ClusterScheduler.ts:173` | HIGH | PENDING |
| P1-6 | Fix error log prefixes | `src/tools/cluster-tools.ts` | HIGH | **DONE** (with P0-3) |
| P1-7 | Fix processLoop blocking while async ops pending | `src/clusters/ClusterInstance.ts:89-131` | HIGH | PENDING |
| P1-8 | Add output field to spawn return values | `src/tools/cluster-tools.ts` | HIGH | **DONE** (with P0-3) |

## Phase 2: EXECUTIONBRAIN ENGINEERING

| # | Task | File | Priority | Status |
|---|------|------|----------|--------|
| P2-1a | Add `registerTask(task)` — stores PendingTask with status "planned" | `src/brains/execution/execution-brain.ts` | HIGH | PENDING |
| P2-1b | Add `getPendingTask(agent)` — find planned task for system.transform | `src/brains/execution/execution-brain.ts` | HIGH | PENDING |
| P2-1c | Add `claimTask(taskId)` — mark as "spawning" after context injection | `src/brains/execution/execution-brain.ts` | HIGH | PENDING |
| P2-1d | Add `completeTask(taskId, result)` — mark done, L2 verify, sync brains | `src/brains/execution/execution-brain.ts` | HIGH | PENDING |
| P2-1e | Add `detectTaskAlerts()` — stuck/failed/slack detection | `src/brains/execution/execution-brain.ts` | MEDIUM | PENDING |
| P2-1f | Add `retryTask(taskId)` and `drainCluster(clusterId)` | `src/brains/execution/execution-brain.ts` | MEDIUM | PENDING |
| P1-1 | Three-tier identity injection in system.transform | `src/index.ts:678-739` | HIGH | PENDING |

## Phase 3: TYPE SYSTEM

| # | Task | File | Priority | Status |
|---|------|------|----------|--------|
| 3-1 | Add cluster lifecycle types | `src/factory/kraken-types.ts` | MEDIUM | **DONE** |
| 3-2 | Add `tasks` field to ClusterStatus | `src/factory/kraken-types.ts` | MEDIUM | **DONE** |
| 3-3 | Delete unused types (D6) | `src/factory/kraken-types.ts` | LOW | **DONE** |

## Phase 4: CLUSTERENGINE

| # | Task | File | Priority | Status |
|---|------|------|----------|--------|
| 4-1 | Create ClusterEngine.ts with M1-M13 | NEW: `src/clusters/ClusterEngine.ts` | MEDIUM | PENDING |
| 4-2 | Wire ClusterEngine into cluster-tools.ts | `src/tools/cluster-tools.ts` | MEDIUM | PENDING |

## Phase 5: COMPLETE SUBAGENT TOOL

| # | Task | File | Priority | Status |
|---|------|------|----------|--------|
| 5-1 | Add `complete_subagent_task` tool | `src/tools/cluster-tools.ts` | HIGH | **DONE** |
| 5-2 | Add `action_required: "SPAWN"` to spawn_* return values | `src/tools/cluster-tools.ts` | HIGH | **DONE** |
| 5-3 | Enhance `aggregate_results` with mode-specific consensus detection | `src/tools/monitoring-tools.ts` | MEDIUM | PENDING |
| 5-4 | Enhance `get_cluster_status` with per-task status array | `src/tools/monitoring-tools.ts` | MEDIUM | PENDING |

## Phase 6: QUALITY FIXES

| # | Task | File | Priority | Status |
|---|------|------|----------|--------|
| P2-2 | Fix shell injection in browser_exec/browser_fill | `src/tools/kraken-browser-tools.ts` | MEDIUM | PENDING |
| P2-4 | Session-scope browser state | `src/tools/kraken-browser-tools.ts` | MEDIUM | PENDING |
| P2-3 | Optimize tmux attempt in SubagentManagerBrain | `src/brains/SubagentManagerBrain.ts` | MEDIUM | PENDING |

## Phase 7: DEAD CODE PURGE

| # | File | Lines | Status |
|---|------|-------|--------|
| D1 | `src/factory/ArchitectureFactory.ts` | 186 | PENDING |
| D2 | `src/clusters/wrappers/opencode_agent.py` | 589 | PENDING |
| D3 | `src/clusters/wrappers/container_pool.py` | 523 | PENDING |
| D4 | `src/clusters/wrappers/__init__.py` | 4 | PENDING |
| D5 | `src/tools/kraken-hive-tools.ts` | 165 | PENDING |
| D6 | `src/factory/kraken-types.ts:203-229` — unused types | 27 | **DONE** |
| D7 | `src/tools/monitoring-tools.ts:14-21` — unused Zod schemas | 8 | **DONE** |
| D8 | `src/tools/cluster-tools.ts:18-23` — ClusterTaskStatus | 6 | **DONE** (with P0-3) |
| D9 | `AsyncDelegationEngine.ts:142-145` — startProcessingLoop no-op | 4+1 | **DONE** |
| D10 | `ClusterInstance.ts:22` — SUBAGENT_PORT_BASE | 1 | PENDING |
| D11 | `src/tools/cluster-tools.ts:25-48` — unused Zod schemas | 24 | **DONE** (with P0-3) |
| D12 | `src/index.ts:16` — unused Plugin type import | 1 | PENDING |

## Phase 8: REBUILD + TEST

| # | Task | Status |
|---|------|--------|
| 8-1 | Rebuild bundle | PENDING |
| 8-2 | Deploy to container | PENDING |
| 8-3 | Full adversarial test | PENDING |
