# Kraken V1.3 — Build Log (CHANGELOG)

**Status:** V1.3 pre-overhaul baseline test identified 17 defects (5 P0 critical, 8 P1 high, 4 P2 medium). Architecture corrected in spec. Implementation pending.
**Last Updated:** 2026-06-02
**Bundle Size:** 754KB, 140 modules
**Tools:** 22 (16 orchestration + monitoring, 3 T2 read-only, 10 browser/vision)
**Firewall Layers:** 8 (L0-L7)
**Container Test:** Not valid post-correction — pre-overhaul baseline tested broken architecture. Corrected test requires all Phase 0-8 fixes. See BUILD_SPEC.md Part VII for test plan.
**Ship Package:** `KRAKEN_V1.3_RUNTIME_GRADE_VERIFIED/`

---

## Phase 0: Deep Runtime Test (2026-06-02) — COMPLETED

### Critical Findings from Deep Test
| # | Severity | Defect | File:Line | Verdict |
|---|----------|--------|-----------|---------|
| P0-1 | CRITICAL | `syncBrainsAfterTask` receives wrong arg types from processQueue | `AsyncDelegationEngine.ts:127` | **FIX: Remove duplicate call** |
| P0-2 | CRITICAL | `spawn()` called but `child_process` never imported | `monitoring-tools.ts:319+` | **FIX: Remove run_subagent_task/run_parallel_tasks entirely** |
| P0-3 | CRITICAL | Polling loop checks `clusterStatus.tasks` which doesn't exist | `cluster-tools.ts:152-197,296-341,439-485` | **FIX: Delete all three loops** |
| P0-4 | CRITICAL | Tasks added during processing are orphaned | `AsyncDelegationEngine.ts:106-137` | **FIX: Re-trigger in finally** |
| P0-5 | CRITICAL | `require('url')` in ESM context | `system-brain.ts:644` | **FIX: `import` instead of `require`** |
| P1-1 | HIGH | Orchestrator identity injected into cluster agents (3-tier fix needed) | `index.ts:694-715` | **FIX: orchestrator gets full identity, cluster gets task context only** |
| P1-2 | HIGH | processLoop LIFO negates priority | `ClusterInstance.ts:93` | **FIX: Forward iteration** |
| P1-3 | HIGH | Hardcoded agent names in spawnAgentTask | `ClusterInstance.ts:241-254` | **FIX: Dynamic agent.id** |
| P1-4 | HIGH | Double-escaped JSON in spawnAgentTask | `ClusterInstance.ts:225` | **FIX: Remove extra escaping** |
| P1-5 | HIGH | pendingTasks double-counted | `ClusterScheduler.ts:173` | **FIX: Remove from scheduler** |
| P1-6 | HIGH | Wrong error log prefixes | `cluster-tools.ts:280,291,424,435` | **FIX: Correct agent names** |
| P1-7 | HIGH | processLoop blocks while any op pending | `ClusterInstance.ts:89-131` | **FIX: Per-agent capacity tracking** |
| P1-8 | HIGH | Missing output field in spawn return values | `cluster-tools.ts:200-208,344-352,488-496` | **FIX: Add output field** |
| P2-1 | MEDIUM | ExecutionBrain.executeTask is a stub | `execution-brain.ts:166-202` | **FIX: Full engineering as central executor** |
| P2-2 | MEDIUM | Shell injection in browser_exec/fill | `kraken-browser-tools.ts:218,245` | **FIX: spawn arg arrays** |
| P2-3 | MEDIUM | SubagentManagerBrain assumes tmux | `SubagentManagerBrain.ts:120` | **FIX: Docker kill fallback** |
| P2-4 | MEDIUM | Browser state is module-global | `kraken-browser-tools.ts:61-63` | **FIX: Session-scoped Map** |

### Architecture Corrections (changed from initial analysis)
| Original Wrong Call | Correct Understanding |
|--------------------|---------------------|
| P1-4 was "identity bleed to cluster agents should be fixed" | Cluster agents should get TASK CONTEXT only — orchestrator identity stays for kraken/kraken-executor ONLY |
| P1-5 was "all tools given to all agents" | NOT a defect — shark/manta agents have their own runtime-grade tools, Kraken just deploys them |
| Hive tools should be wired | NOT a defect — Kraken uses Hive Mind plugin's native Hive tools. Dead duplicates deleted |
| ArchitectureFactory should be engineered | DEAD BOILERPLATE from Agent-Factory-Edition-v4.1 template. Never instantiated. **Delete.** |
| OpenViking health check blocks init | NOT a defect — OpenViking should NEVER be down (systemd processes keep it running) |

### Ship Package Generated
- `MANIFEST.md` updated with deep test results
- `deploy.sh` with model switch step + adversarial test
- `test-adversarial.sh` comprehensive 84-test suite
- `container-test/` with single plugin (kraken-agent) + identity + kraken-context
- Evidence: ContainerSpawnResult, ContainerTestResult (pre-overhaul baseline), TuiInteraction, EvidencePathVerified

---

## Phase 1: Build Overhaul Spec (2026-06-02) — COMPLETED

### Full Spec Generated
- `BUILD_SPEC.md` (589 lines, 8 parts + 2 appendices)
- Covers all 17 defects (5 P0, 8 P1, 4 P2)
- Three-tier identity injection model
- ExecutionBrain as central execution orchestrator
- Single spawning path (run_subagent_task/run_parallel_tasks removed)
- 13 ClusterEngine patterns ported with Kraken-native naming
- 12 dead code items to delete
- 8 implementation phases

### Key Architecture Changes
1. **ExecutionBrain** becomes the CENTRAL execution orchestrator — all spawn_* route through it
2. **Three-tier identity**: orchestrator (full) / cluster (task only) / non-kraken (skip)
3. **Single spawning path**: only spawn_cluster_task/spawn_shark_agent/spawn_manta_agent → returns action_required → LLM calls task()
4. **Cluster agents retain identity**: they are shark/manta, NOT kraken clones
5. **Delete**: Python wrappers, ArchitectureFactory (boilerplate), duplicate Hive tools, run_subagent_task/run_parallel_tasks

---

## Phase 2: Implementation (PENDING)

### Order of Implementation
1. Fix P0-2: Remove run_subagent_task/run_parallel_tasks from monitoring-tools.ts
2. Fix P0-5: Fix `require('url')` → `import` in system-brain.ts
3. Fix P0-3: Delete polling loops from all three spawn tools
4. Fix P0-1: Remove duplicate syncBrainsAfterTask from processQueue
5. Fix P0-4: Add re-trigger for processQueue after processing completes
6. Fix P1-2 through P1-8: high-severity defects
7. Engineer ExecutionBrain as central orchestrator (P2-1)
8. Three-tier identity injection in system.transform (P1-1)
9. Add cluster lifecycle types to kraken-types.ts
10. Create ClusterEngine.ts (13 patterns)
11. Add complete_subagent_task tool
12. Enhance aggregate_results + get_cluster_status
13. Fix P2-2 through P2-4 (quality)
14. Delete 12 dead code items
15. Rebuild and container test
