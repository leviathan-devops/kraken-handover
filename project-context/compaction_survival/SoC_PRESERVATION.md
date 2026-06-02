# Kraken V1.3 — Stream of Consciousness Preservation

**Purpose:** First-principles reasoning, experiential insights, and problem-solving patterns that must survive compactions.

---

## Patterns Discovered

### Three-Tier Identity Injection (2026-06-02 Architecture Correction)
- **Context:** The `system.transform` hook injected `[KRAKEN EXECUTION CONTEXT]` into ALL 11 Kraken-managed agents. This gave cluster agents (shark-alpha-1, manta-beta-1) orchestrator identity — "Agent: kraken (Orchestrator)" — overwriting their true shark/manta persona.
- **Correct Model:** Kraken has THREE tiers of agents, not one:
  - **Orchestrator (kraken, kraken-executor):** Get full orchestrator identity from `identity/orchestrator/` files
  - **Cluster agents (shark-alpha-1 through shart-gamma-1):** Get TASK CONTEXT only. Their identity comes from their OWN `config()` instructions. They are NOT kraken clones — they are pre-existing runtime-grade shark/manta agents that Kraken manages.
  - **Non-kraken (build, plan, general, trident, spider):** Get nothing — skip entirely
- **Lesson:** Always distinguish between "agents that ARE the orchestrator" and "agents managed BY the orchestrator." The system.transform hook must inject identity for the former and task context for the latter. Never overwrite an agent's pre-existing identity.

### ExecutionBrain is NOT a Stub — It's the Central Execution Orchestrator
- **Context:** The initial analysis called `ExecutionBrain.executeTask()` a "stub that should be deleted." This was WRONG. ExecutionBrain is supposed to be the CENTRAL execution orchestrator — sitting ABOVE the AsyncDelegationEngine → ClusterManager → ClusterInstance chain.
- **Correct Model:** ALL spawn_* tools route through ExecutionBrain. It validates (L4 domain check), tracks (registerTask/getPendingTask/claimTask/completeTask), monitors (detectTaskAlerts), recovers (retryTask), and finalizes (drainCluster). The delegation engine is the MECHANICAL layer underneath — ExecutionBrain is the INTELLIGENCE layer above.
- **Lesson:** A stub in a component that's supposed to be the central orchestrator is not "dead code to delete" — it's a CRITICAL missing implementation. Full engineering required.

### Cluster Agents Retain Their Own Identity
- **Context:** Cluster agents (shark-alpha-1, manta-beta-1) are registered in `config()` with their own `instructions` field — this IS their shark/manta persona. They have their own runtime-grade tools. Kraken deploys them as subagents via the `task()` tool but does NOT modify them.
- **Correct Model:** When Kraken spawns `task(subagent_type="shark-alpha-1")`, the subagent loads:
  1. Its OWN `config()` instructions → shark persona (identity)
  2. Plus task context from `system.transform` → what to work on (task)
  The two are SEPARATE. Identity is never overwritten.
- **Lesson:** Cluster agents have pre-existing engineering to runtime grade. Kraken manages them but does NOT re-engineer them. Task context is injected via `system.transform` ONLY when `krakenIsMySession()` confirms it's a Kraken-spawned session.

### One Spawning Path, Not Three
- **Context:** Kraken had three spawning mechanisms: `run_subagent_task` (direct Docker), `run_parallel_tasks` (batch Docker), and `spawn_cluster_task` (cluster-managed). The Docker-based ones bypassed all cluster management and firewall enforcement.
- **Correct Model:** ONE spawning path: `spawn_cluster_task` / `spawn_shark_agent` / `spawn_manta_agent` → ExecutionBrain → returns action_required → LLM calls `task()` → subagent runs in-process. No Docker nesting, no Python wrappers, no bypass paths.
- **Lesson:** Multiple execution paths = confusion + security holes. One canonical path that routes through the central orchestrator = auditability + consistency.

### ArchitectureFactory is Boilerplate Scaffolding
- **Context:** 186 lines of code that are never instantiated. A stub `delegate()` method that always returns `{ success: true }`. Comes directly from the Agent-Factory-Edition-v4.1 template.
- **Correct Classification:** NOT a broken component to engineer. NOT theatrical code to fix. It's boilerplate scaffolding that was copied from the template and never removed. Kraken does its own initialization with direct `new` calls in `index.ts`.
- **Lesson:** When building from a boilerplate, delete the scaffolding after initialization is implemented. Every line of dead code is a maintenance burden and a source of confusion.

### Hive Tools are Redundant with Hive Mind Plugin
- **Context:** `kraken-hive-tools.ts` exports `createKrakenHiveTools()` but it was never called from `index.ts`. The Hive Mind plugin already provides native Hive tools.
- **Correct Classification:** Duplicate code that was never wired. The Hive Mind plugin's native tools are the correct path.
- **Lesson:** If a capability is provided by an external plugin, don't reimplement it in your plugin. Remove the duplicate.

### Session Tracking Works at BOTH Primary and Subagent Levels
- **Context:** The `krakenSessionAgentMap` with `krakenSetSessionAgent()` and `krakenIsMySession()` was designed for primary agent identity isolation. It ALSO works for subagent sessions. When `task()` spawns a subagent, `chat.message` fires, `krakenSetSessionAgent()` registers the session, and `system.transform` can resolve the agent from the session.
- **Lesson:** The session tracking architecture is correct and was designed for this use case. No new infrastructure needed — just the `execBrain.getPendingTask()` integration in `system.transform`.

## Things Learned

1. **Three-tier identity: orchestrator gets identity, cluster gets task, non-kraken gets nothing.** Cluster agents are NOT kraken clones.
2. **ExecutionBrain is the CENTRAL orchestrator.** Not a stub. Full engineering required.
3. **One spawning path, not three.** Remove Docker-based bypasses.
4. **ArchitectureFactory = boilerplate scaffolding, not broken component.** Delete it.
5. **Hive Mind plugin provides native Hive tools.** Don't duplicate.
6. **Session tracking works at subagent level.** `krakenSessionAgentMap` handles both primary and subagent.
7. **Polling a field that doesn't exist = wasted minutes and false failures.** Verify your data structures.
8. **`require()` in ESM will crash.** Every `require` is a time bomb.
9. **Python wrappers for subagent execution are unnecessary.** The `task` tool spawns in-process threads.
10. **Spider's pattern (task tool spawning) is the correct micro-architecture.** Port the pattern, not the naming.

## Problem Solving Approaches

1. **When spawn_cluster_task returns timeout:** The polling loop is checking a non-existent field. Delete the loop, return delegate result directly.
2. **When agent responds as "opencode":** Identity files are missing from snapshot. Copy `identity/orchestrator/*.md` to `plugins/kraken-agent/identity/orchestrator/`.
3. **When system.transform overwrites cluster agent identity:** Check the tier discrimination. Orchestrator agents get identity. Cluster agents get task context only via `execBrain.getPendingTask()`.
4. **When ExecutionBrain returns `{success: false}` for everything:** It's a stub that was never engineered. Full engineering required — registerTask, getPendingTask, claimTask, completeTask, detectTaskAlerts, retryTask, drainCluster.
5. **When `run_subagent_task` doesn't exist:** Good — it was removed. Use `spawn_cluster_task` which routes through ExecutionBrain.
6. **When compacting hook produces empty output:** Check `krakenIsMySession()`. In TUI it tracks the session. In Node.js eval it skips (correct isolation).
