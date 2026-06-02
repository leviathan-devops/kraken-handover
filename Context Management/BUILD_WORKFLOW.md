# BUILD WORKFLOW — KRAKEN V1.3 BUILD OVERHAUL
## Phase-by-Phase Execution Checklist

### PHASE 0: PRE-FLIGHT (Prerequisites)
- [x] Docker image: opencode-test:1.14.43 built (matches host binary version)
- [x] Plugin bundle: kraken-agent (770KB, 142 modules) rebuilt with V1.3 overhaul
- [x] All 8 live plugins deployed (subagent-manager, kraken-agent, shark-agent, manta-agent-v1.5, hive-mind, trident, spider-agent-v2, agent-vision)
- [x] Identity files: 5 .md files in identity/orchestrator/
- [x] kraken-context: 11 T2 reference files
- [x] Hive Mind: accessible at ~/.local/share/opencode/hive-mind/
- [x] Config: cloned FRESH from live /home/leviathan/.config/opencode/opencode.json

### PHASE 1: 17 DEFECT FIXES (P0-P2 + Dead Code)
- [x] P0-1: Duplicate syncBrainsAfterTask removed
- [x] P0-2: run_subagent_task + run_parallel_tasks removed (~150 lines)
- [x] P0-3: 3 polling loops deleted from cluster-tools.ts
- [x] P0-4: processQueue re-trigger in finally block
- [x] P0-5: require('url') → import in system-brain.ts
- [x] P1-2: FIFO queue (was stack)
- [x] P1-3: Dynamic agent.id
- [x] P1-4: Double-escaped JSON removed
- [x] P1-5: pendingTasks double-count fixed
- [x] P1-7: Per-agent capacity tracking
- [x] P1-8: output + action_required fields added
- [x] P2-2: Shell injection fixed (execFileSync in browser tools)
- [x] P2-3: Shell injection fixed (execFileSync in SubagentManagerBrain — 13 calls)
- [x] P2-4: Per-session BrowserSession isolation
- [x] D1-D12: Dead code deleted (ArchitectureFactory, Python wrappers, kraken-hive-tools, stale types)

### PHASE 2: EXECUTION BRAIN REWRITE
- [x] ExecutionBrain rewritten as central execution orchestrator
- [x] Three-tier identity injection in system.transform
- [x] All lifecycle methods: registerTask, getPendingTask, claimTask, completeTask
- [x] detectTaskAlerts, retryTask, drainCluster implemented
- [x] L2 verification: output status tracking

### PHASE 3: CLUSTER ENGINE
- [x] ClusterEngine.ts with 13 patterns (M1-M13)
- [x] Wired into bundle (was tree-shaken — fixed by importing in index.ts)
- [x] Integrated into cluster-tools + monitoring-tools contexts

### PHASE 4: TOOL ENHANCEMENTS
- [x] complete_subagent_task tool added
- [x] aggregate_results: mode-specific consensus (verify/divide/pressure)
- [x] get_cluster_status: per-task status array from ClusterEngine

### PHASE 5: RUNTIME GRADE CONTAINER TEST (Per Bible §8)
- [x] Step 0: Read LIVE config (8 plugins, deepseek/deepseek-v4-flash)
- [x] Step 0a: Binary version 1.14.43 built and verified matching
- [x] Steps 1-4: Snapshot with ALL 8 plugins + fresh config clone
- [x] Steps 5-6: Container started, binary version confirmed matching
- [x] Steps 7-8: DB migration, config verified (8/8 plugins, 5/5 identity files)
- [x] Steps 9-10: TUI started via tmux + docker exec -it
- [x] Phase 1: Module surface — 23 tools, 7 hooks, 11 agents, 3 brains PASS
- [x] Phase 2: Identity scoping — 12/12 three-tier tests PASS (in isolation)
- [x] Phase 4: L4 firewall correctly blocks wrong-cluster routing
- [x] Phase 5: Theatrical audit — 23/23 tools return real output
- [x] Phase 7: Config audit — 8/8 plugins match live config

### PHASE 6: KNOWN ISSUES (BLOCKING RUNTIME GRADE CERTIFICATION)
- [ ] **Tier 4 TUI: Cross-plugin identity interference** — Trident v4.2 overrides Kraken identity when all 8 plugins loaded. Kraken identity works correctly in isolation (all Tier 2 hook tests pass), but multi-plugin deployment shows Trident's identity override winning.
- [ ] Investigation needed: Is Trident v4.2 causing the issue, or does Kraken have weak identity architecture?
- [ ] Try deploying Trident v3.3.3 to test if the bug persists

### PHASE 7: EVIDENCE COLLECTION
- [x] ContainerSpawnResult.json on disk
- [x] ContainerTestResult.json on disk
- [x] TuiInteraction.json on disk
- [x] EvidencePathVerified.json on disk

### PHASE 8: SHIP (PENDING APPROVAL)
- [x] BUILD_LOG.md updated
- [x] MANIFEST.md updated
- [x] Context Management/ all 5 files present
- [ ] All container tests passed (blocked by Trident identity interference)
- [ ] Runtime grade certification (blocked)
