# DECISION_CHAIN.md

_Initialized by CompactionManager. Updated on each milestone._

## Key Decisions in V1.3 Overhaul (CORRECTED)

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| 1 | **Three-tier identity injection** — orchestrator (full), cluster (task only), non-kraken (skip) | Cluster agents (shark/manta) are pre-existing runtime-grade agents with their own identity from config(). They are NOT kraken clones. Overwriting their identity with orchestrator context was a critical architectural error. | 2026-06-02 |
| 2 | **ExecutionBrain as CENTRAL execution orchestrator** — ALL spawn_* tools route through it | ExecutionBrain is not a stub. It is the intelligence layer above the delegation engine's mechanical execution. Full engineering: registerTask, getPendingTask, claimTask, completeTask, detectTaskAlerts, retryTask, drainCluster. | 2026-06-02 |
| 3 | **Single spawning path** — spawn_cluster_task/spawn_shark_agent/spawn_manta_agent only | run_subagent_task and run_parallel_tasks bypass all cluster management, spawn Docker containers directly, and have no firewall enforcement. Removed. One canonical path through ExecutionBrain. | 2026-06-02 |
| 4 | **Keep AsyncDelegationEngine → ClusterManager → ClusterInstance chain** | This is the core canonical parallel execution infrastructure. Only the broken polling loops and stub ExecutionBrain are fixed. The chain itself is correct. | 2026-06-02 |
| 5 | **Cluster agents spawn via task() tool, NOT Docker** | The task tool creates visible in-process subagent threads. No Docker nesting, no Python wrappers, no cold-start overhead. Spider's pattern ported with Kraken-native naming. | 2026-06-02 |
| 6 | **Delete ArchitectureFactory.ts (boilerplate)** | Leftover scaffolding from Agent-Factory-Edition-v4.1 template. Never instantiated. Kraken does direct `new` calls in index.ts. | 2026-06-02 |
| 7 | **Delete kraken-hive-tools.ts (redundant)** | Kraken uses Hive Mind plugin's native Hive tools. Duplicate was never wired and is unnecessary. | 2026-06-02 |
| 8 | **Delete Python wrappers entirely** | opencode_agent.py (589 lines, syntax error) and container_pool.py (523 lines, wrong image) are never imported from TypeScript. No Python path needed for subagent execution. | 2026-06-02 |
| 9 | **Port SpiderWeb patterns with Kraken-native naming** | 13 patterns from working implementation: AgentTask (not strand), TaskAlert (not vibration), retryCluster (not tightenWeb), drainCluster (not dissolveWeb). No spider naming inside Kraken. | 2026-06-02 |
