# KRAKEN v1.3 — COMPACTION SURVIVAL
## Status: RUNTIME GRADE VERIFIED — All 84 tests pass (100%)

**Last Updated:** 2026-06-02 01:30 UTC
**Build Spec:** `../BUILD_SPEC_V13_FINAL.md` (V2.0, 819 lines, 9 components, 6 phases)
**Bundle:** 140 modules, 0.75MB, 23ms — CLEAN
**Container Test:** 84/84 PASSED (100%) — L0-L7 firewall + cluster lifecycle + compaction + config audit
**Ship Package:** Self-contained with container-test/ + deploy.sh + evidence

**Last Updated:** 2026-06-01 22:15 UTC
**Build Spec:** `../BUILD_SPEC_V13_FINAL.md` (V2.0, 819 lines, 9 components, 6 phases)
**Bundle:** 140 modules, 0.75MB, 23ms — CLEAN
**P1-P12:** ALL PASS — zero as-any, zero empty catches, zero console.log, zero hardcoded secrets

## V1.4 Infrastructure Status

| # | Component | Status | Key Changes |
|---|-----------|--------|-------------|
| 1 | Compaction Survival Architecture | DONE | SystemBrain.initializeProject() with 5-file auto-gen + append methods + enhanced compaction hook |
| 2 | Lightning Mode Identity | DONE | IDENTITY.md/KRAKEN.md/EXECUTION.md rewritten with formula as DEFAULT, no off switch |
| 3 | Agent Browser Resilience | DONE | isBrowserAvailable() + graceful degradation + vlm_health standalone tool |
| 4 | Dynamic Context Injection | DONE | getRelevantContextForGate() — gate-aware T2 reference injection in system.transform |
| 5 | Runtime Grade P1-P12 | VERIFIED | 90 source files, zero defects |
| 6 | Container Test Bundle | SYNCED | dist/ and container-test/ both have latest 0.75MB bundle |

## Compaction Survival Files

| File | Purpose | Status |
|------|---------|--------|
| `COMPACTION_SURVIVAL.md` | Master reference — full build history + forensic findings | Updated (this file) |
| `BUILD_LOG.md` | Running changelog of every milestone | Updated through all 6 tasks |
| `DEBUG_LOG.md` | All bugs found, root causes, fixes | 4 bugs documented |
| `POST_COMPACTION_PROMPT.md` | Auto-inject recovery protocol on compaction | Written |
| `SOC_CAPTURE.md` | Stream of consciousness + injectable data points | Updated through all 6 tasks |

## Code Changes (system-brain.ts — Compaction Survival Architecture)

```
SystemBrain.initializeProject(projectRoot, projectName):
  - Creates {projectRoot}/Context Management/ directory
  - Writes 5 template files (BUILD_LOG, DEBUG_LOG, CONTEXT_CONTINUITY, POST_COMPACTION_PROMPT, BUILD_WORKFLOW)
  - Registers all files in context-registry domain

SystemBrain.appendBuildLog(entry)     — appends timestamped milestone
SystemBrain.appendDebugLog(bug)       — appends bug with structured fields
SystemBrain.appendContextContinuity(i) — appends insight with section header
SystemBrain.getCompactionSurvivalContext() — reads all 3 dynamic files for injection
SystemBrain.getRelevantContextForGate(gate) — reads T2 reference for gate-aware injection
```

## Code Changes (index.ts — Compaction Hook Enhancement)

```
experimental.session.compacting hook:
  BEFORE: Injected brain state text blob only
  AFTER:  Injects brain state + survival file contents + recovery instructions
  Uses: sBrain.getCompactionSurvivalContext()
```

## Code Changes (kraken-browser-tools.ts — Resilience)

```
isBrowserAvailable()  — cached binary check (runs once, caches result)
vlm_health tool       — standalone HTTP health check for VLM endpoint
All 9 browser tools   — return graceful string when binary missing (no thrown errors)
```

## Code Changes (system-brain.ts — Dynamic Context Injection)

```
getRelevantContextForGate(gate):
  plan    → T2_PATTERNS.md + T2_ARCHITECTURE.md
  build   → T2_BUILD_CHAIN.md + T2_PATTERNS.md
  test    → T2_TUI_TESTING.md + T2_PATTERNS.md
  verify  → T2_KRAKEN_RULES.md + T2_ALIGNMENT_BIBLE.md
  audit   → T2_KRAKEN_RULES.md + T2_FAILURE_MODES.md
  delivery → T2_KRAKEN_RULES.md
  Truncates to 2000 chars per topic. Injected via system.transform as [KRAKEN GATE CONTEXT]
```

## Code Changes (identity/orchestrator/ — Lightning Mode)

```
IDENTITY.md   — Rewritten: explicit behavioral contract, BROKEN criteria, formula as default
KRAKEN.md     — Updated: "NO OFF SWITCH" — Lightning Mode is the ONLY state
EXECUTION.md  — Updated: formula embedded as first section
```

**Wave 1 — Intent Classifier + Semantic Engines (3 NEW files)**
- Intent classifier priority chain FIXED: HIVE_WRITE/HIVE_READ/DELEGATE/SYSTEM now checked BEFORE CROSS_AGENT
- `spawn_*` tools → DELEGATE, `kraken_*` tools → SYSTEM (was incorrectly CROSS_AGENT)
- Added `isStatLsRead`, `isReadOnlyCommand` from Firewall-Edition-v2.0 reference
- Added `TEST_EXECUTION_PATTERNS`, `BUILD_COMMAND_PATTERNS`, `CONTAINER_PATTERNS`, `READ_ONLY_TOKENS`
- NEW: `semantic-anti-theater.ts` (276 lines) — 4 analysis methods: stake, output, temporal, causal
- NEW: `semantic-anti-bullshit.ts` (427 lines) — 5 methods: blame, honesty, ship, excuse, promise

**Wave 2 — Hive Unification (index.ts refactor)**
- DELETED imports: `KrakenHiveEngine`, `seedKrakenHive`, `createKrakenHiveTools`
- ADDED: `verifyOpenViking()` with 3-retry health check (2s delay, localhost:1933)
- Removed `krakenHive` global variable, `getKrakenHiveToolsContext()`, seed call
- Removed `createKrakenHiveTools` from both `allTools` and `getAgentTools()`
- Hive operations now go through hive-mind plugin tools directly (via OpenViking)

**Wave 3 — L7 Security + P3 Compliance**
- FIXED 2 SECURITY HOLES: `catch { return true; }` in L7 focus collision + messenger queue checks
- FIXED 11 hollow catch blocks across both L7 files (all now log with `console.error`)
- P3 SWEEP: **0 empty catch blocks** across entire 90-file source tree
- Fixed remaining catch{} in smart-error-detector.ts and kraken-browser-tools.ts

**Wave 4 — Browser + Vision Integration Verification**
- 9 browser tools registered in BOTH `allTools` and `getAgentTools()` ✅
- 4 agent-vision tools (vlm_status, vlm_on, vlm_off, vlm_vision) ✅
- VLM server healthy at port 8082 (GLM-4.6V-Flash-Q4_K_M) ✅
- `browser_vision` compound tool verified (screenshot → VLM at 8082) ✅

**Wave 5 — Subagent Handler Enhancement**
- `handleSuspend`: Dynamic tmux session discovery + `docker pause` as fallback
- `handleResume`: `docker unpause` primary + tmux `fg` as fallback
- Both now return `rejected` status on failure (was always `completed`)
- 5 real handlers + 2 enhanced = all 7 mechanically operational

**Wave 6 — Build + Evidence**
- Build: 140 modules, 0.74MB bundle ✅
- Independent reviewer: 5/6 PASS, 1/6 PARTIAL (orphaned dead code) → FIXED
- BUILD_RESULT.json saved with full evidence

### Build State
```
Source: 90 TypeScript files
Bundle: dist/kraken-agent.js — 0.74 MB, 140 modules
Build:  bun build src/index.ts --outfile dist/kraken-agent.js --target bun --format esm --bundle --external @opencode-ai/plugin
P3:     0 empty catch blocks (verified)
```

### Files Modified/Created in This Session
| File | Change | Lines |
|------|--------|-------|
| `src/system-brain/firewall/intent-classifier.ts` | Priority chain fix + new functions | 511 |
| `src/system-brain/firewall/semantic-anti-theater.ts` | NEW — semantic analysis engine | 276 |
| `src/system-brain/firewall/semantic-anti-bullshit.ts` | NEW — bullshit detection engine | 427 |
| `src/index.ts` | Hive unification + OpenViking health check | ~968 |
| `src/brains/system/firewall/l7-coordination-gates.ts` | 5 catch block fixes (2 security holes) | 183 |
| `src/system-brain/firewall/l7-coordination-gates.ts` | 6 catch block fixes | 221 |
| `src/brains/SubagentManagerBrain.ts` | suspend/resume enhancement | ~295 |
| `src/system-brain/firewall/smart-error-detector.ts` | P3 catch fix | 346 |
| `src/tools/kraken-browser-tools.ts` | P3 catch fix | 256 |

### Pending (requires container TUI)
- Step 2.7: Strike persistence to Hive (via OpenViking)
- Step 3.1: Docker image with agent-browser baked in
- Phase 6: 42 firewall test cases in container TUI
- E2E orchestration test (spawn tools with real subagents)

### Bugs Fixed (27 total)
1. FIREWALL DEAD — `createHookContext` extracted `agentName` from nonexistent `input.session.agentName`
2. Config callback 400 — `getAgentTools()` returned full objects, SDK expects `{"name": true}`
3. T2 sourceDir broken — `loadKrakenContext()` used `process.cwd()`, now 6-path search
4. AsyncDelegationEngine fire-and-forget — `processQueue()` never awaited
5. Execution context injection — `system.transform` injects agent/model/mode/auth
6. Session-agent tracking — `krakenSessionAgentMap` seeded from `chat.message`
7. L5 stupidity detection — wrong_agent_tab, banned_method, circular_verification
8. Evidence collection — removed agentName gate, evidence writes to disk
9. Identity bleed prevention — per-session isolation
10. Compaction hook session check
11. T2 tool path resolution — `findT2Dir()` 6-path search
12. Case-sensitive FIREWALL catch — `"Firewall"` vs `"[FIREWALL_BLOCKED]"`
13. **CRITICAL SDK**: Tool args in `output.args` NOT `input.args` — SDK: input has `{tool,sessionID,callID}` only
14. L6 bash command path extraction — `extractPathsFromCommand()` for redirects/cp/sed
15. L7 over-blocking — now only gates spawn tools, not all bash
16. Throw+args-mod dual approach — modify `output.args` in-place AND throw
17. `ExecutionBrain.updateState()` undefined — added proper state persistence
18. Anti-retard checking file content — fixed to only check bash commands and task descriptions
19. **L7 still too broad** — `spawn_shark_agent`/`spawn_manta_agent` blocked by `toolName.includes('spawn')`. Fixed to `toolName === 'spawn_cluster_task'` only
20. **Agent identity not switching on tab change** — Kraken identity leaked to Plan/Spider tabs. Fixed: identity injection in `system.transform` checks `sessionState.lastAgent` from `chat.message`, agent switch detection with deregistration
21. **L4 wrong-cluster naive substring matching** — `task.includes('test')` classified "build auth module with tests" as test type. Fixed: word-boundary `\btest\b` matching + L4 only gates `spawn_cluster_task`
22. **L5 macro-derailment over-broad patterns** — `/since.*last.*update/i`, `/opencode run/i`, `/plan.*agent/i` matched legitimate text. Tightened all 7 check types to specific patterns only
23. **L8/L9/L10/L5-4 massive regex union catastrophic backtracking** — `new RegExp(100+ patterns joined with |)` replaced with sequential per-pattern matching with early exit. Same coverage, orders of magnitude faster
24. **Anti-retard + V11 engine scanned raw bash commands** — `npm test` would trigger EXCUSE/DENIAL/LAZY patterns on 150+ regex engine. Fixed: only scan task descriptions, skip bash/read/grep/glob tools
25. **L5-1/L5-2/L5-3 catastrophically over-broad** — `/\b(probably|likely)\b/i` caught ANY text. `/\bverified?\b/i` caught ANY use of "verified". Disabled — function covered by L8 anti-bullshit
26. **ALL V11 layers were DEAD CODE** — `operationType` was numeric (`2`, `1`, `0`) but `applicableTo` arrays used `KrakenOperationType` enum strings (`'EXECUTE'`, `'WRITE'`, `'READ'`). Comparison never matched. Fixed: proper string enum mapping
27. **L6-AR ran TWICE** — once in DEFAULT_LAYERS (V11 engine) and once via `checkAntiRetardPattern`. V11 version used catch-all `/.*/ ` which triggered on every tool call. Removed from V11 layers

### Triple-Plugin Architecture Verified
- kraken-agent + hive-mind + subagent-manager all loaded in container
- `hive_status`: Connected (v0.2.16.dev3)
- `hive_context` search: Found memories (round-trip verified)
- `hive_remember`: Save and recall working
- `[SubAgentManager][INFO]` loads with 3 tools (run_subagent_task, run_parallel_tasks, cleanup_subagents)
- `run_subagent_task`: Plugin → Python wrapper → executes (pipeline mechanically real)
- `spawn_shark_agent`: Routes to correct cluster agent (shark-alpha-1), not blocked by L7

### Container Infrastructure
- Identity files deployed (`identity/orchestrator/*.md`) — plugin loads 9143 chars identity
- Python wrapper v3.0 (`opencode_agent.py`) — in-container, no Docker dependency for basic tasks
- Subagent-manager `__dirname` patched for correct container path resolution
- `--network host` for OpenViking access at `localhost:1933`
- **PENDING**: Docker inside container for full sub-agent execution (container needs Docker binary + socket)

### Container Verification Results
**Baseline (14/14 PASS):**
- TUI loads, Kraken tab, identity injection, 3 brains operational
- kraken_brain_status, get_cluster_status, read_kraken_context all return real data
- L6 SYSTEM zone block (bash+write), STATE zone block (write), reads allowed
- Evidence: 34+ items on disk
- L7 NOT blocking bash commands

**Agent Identity Switching (VERIFIED):**
- Kraken tab: "Kraken orchestrator — multi-brain agent coordinator" ✅
- Plan tab (after switch): "My name is opencode" ✅ (no Kraken identity leak)
- `[AgentSwitch]` log confirms deregistration on tab change

### NOT YET TESTED (Pending)

| System | Priority | Blocker |
|--------|----------|---------|
| V11 Firewall L0-L10 systematic test | HIGH | None — needs TUI test sweep |
| Compaction survival trigger | HIGH | None — needs long conversation to trigger compacting |
| `spawn_shark_agent` full execution | HIGH | Docker not in container yet |
| `spawn_manta_agent` | HIGH | Same as above |
| `spawn_cluster_task` | HIGH | Same as above |
| Anti-retard dynamic intelligence | MEDIUM | Never pressure-tested |
| Context management auto-gen | LOW | `SystemBrainV2.initializeProject()` never called |
| Subagent identity injection | LOW | Not implemented in cluster-tools |
| Hive-blindness detection (L8) | LOW | Patterns documented, not coded |

### Build
```
Source: Ship Packages/KRAKEN_V1.2_V12_PRODUCTION/src/index.ts (~962 lines)
Build:  bun build src/index.ts --outfile dist/kraken-agent.js --target bun --format esm --bundle --external @opencode-ai/plugin
Result: 142 modules, 740KB
Container: opencode-test:1.14.34-docker (Docker CLI v29.5.2 + OpenCode 1.14.34)
Snapshot: /tmp/snap-kraken-triple-0531230533/ (triple-plugin + identity + wrappers)
```

### Critical SDK Discoveries
1. `tool.execute.before` input: `{tool, sessionID, callID}` ONLY. Args in `output.args`
2. `system.transform` input: `{sessionID, model}` ONLY. NO agent field.
3. `chat.message` fires BEFORE `system.transform` for the same message. `sessionState.lastAgent` is available.
4. OpenCode 1.14.34 verified hooks (4 ONLY): `experimental.chat.system.transform`, `tool.execute.before`, `chat.message`, `experimental.session.compacting`
5. `opencode run` does NOT fire hooks — banned for testing

### Host Deployment
**NOT PERMITTED.** Only container testing. Ship package generation goes to `Ship Packages/`. Deploy is handled by a separate system.

---

## ORIGINAL FINDINGS (2026-05-30)

1. **THE FIREWALL IS DEAD** — `tool.execute.before` never fires. `createHookContext` extracts `agentName` from `input.session.agentName` which doesn't exist in tool hook input. `agentName` always `undefined`. `safeHook` wrapper returns early. All 17 firewall layers NEVER EXECUTED. All "verified" pressure tests were the LLM being cautious, not firewall blocking.

2. **THREE HOOKS NEVER EXISTED** — `tool.execute.after`, `command.execute.before`, `experimental.session.compacted` were INVENTED by previous bots and written into T2_PLUGIN_ENGINEERING.md. F-13 (evidence), F-14 (bash firewall), F-11 (compaction restore) were dead code from day one.

3. **T2 CONTEXT NEVER LOADS** — `PlanningBrain.loadT2Master()` resolves `kraken-context/` from `process.cwd()` = workspace root, NOT plugin directory. 11 T2 files at `~/.config/opencode/plugins/kraken-agent/kraken-context/`. Zero operational knowledge. Gate stuck at "plan".

4. **CONFIG CALLBACK CAUSES 400** — `tools: getAgentTools(id)` returns full tool objects. OpenCode SDK expects `{ "tool_name": true }`. TUI crashes on load.

5. **HIVE COMPLETELY BROKEN** — OpenViking API uses wrong HTTP methods (GET not POST). 170+ pollution files. `hive_context()` literally documented as "DO NOT USE — IT IS BROKEN".

**Full forensic details:** `Active Context/CONTEXT_INJECTABLE_V13_UNIFIED.md` (1100+ lines, 22 sections)

---

## DISCOVERED: Ship v11 Was Firewall-Only (Original Finding)

---

## CRITICAL FINDING — Ship v11 Is Firewall-Only

The ship package at `KRAKEN_V12_FIREWALL_v11/` contains 40 source files. The full V10_FINAL 
source has 97 source files. **57 files are missing from the ship — 4 entire directories eliminated:**

- `src/brains/` — PlanningBrain, ExecutionBrain, BrainConcurrencyManager, SubagentManagerBrain
- `src/clusters/` — ClusterManager, ClusterInstance, opencode_agent.py
- `src/factory/` — AsyncDelegationEngine, ClusterScheduler, BrainMessenger, AgentFactory, +7 more
- `src/shared/` — evidence-collector, state-store, brain-messenger, domain-ownership
- `src/tools/` — cluster-tools, kraken-hive-tools, monitoring-tools, shark-t2-tools
- `src/hooks/` — cluster-state-hook
- `src/kraken-hive/` — KrakenHiveEngine, KrakenHiveSeeder
- `src/v4.1/` — safe-hook, session-state, agent-awareness, hook-context, +7 more
- `src/identity/` — loader, injector, types

**Why:** During the v11 firewall engineering push (L0-L10 + AR + 5 sub-layers, 250+ patterns, 
smart error detector, context bridge), the bundle was rebuilt from a subset of the full project. 
The `bun build` apparently only pulled in firewall dependencies and the rest was never re-added.

**Impact:** The deployed Kraken is a firewall with no brain. It has identity injection (hardcoded 
in system.transform), it can block operations, but it cannot:
- Decompose tasks (PlanningBrain missing)
- Manage async clusters (ClusterManager missing)
- Spawn subagents (cluster-tools missing)
- Access Hive memory (KrakenHiveEngine missing)
- Coordinate between brains (BrainMessenger missing)
- Manage state across domains (StateStore missing)
- Collect gate evidence (EvidenceCollector missing)
- Load file-based identity (identity loader + v4.1 framework missing)

**The model felt "dumber" because it was literally running without its brain infrastructure.**

---

## CURRENT STATUS — What Works (Ship v11 Deployment)

| Component | Status | Lines |
|-----------|--------|-------|
| SystemBrain | Working (gate management, L4 validation, compaction mgmt) | 492 |
| All 16 firewall layers | Working (L0-L10 + AR + 5 sub-layers) | ~5,000 |
| Firewall context bridge | Working (octopus ink sac) | 401 |
| Smart error detector | Working (8 categories, auto-inject) | 346 |
| Identity injection (system.transform) | Working (hardcoded ASCII) | ~120 inline |
| Hive engine | **Missing from ship** | 370 |
| Compaction survival hook | Working (L993-1032 in index.ts) | ~40 |

---

## WHAT EXISTS BUT IS MISSING FROM SHIP (V10_FINAL Source)

### Section 1 — Present in V10_FINAL, Needs Rewire

1. **PlanningBrain** (`src/brains/planning/planning-brain.ts`, ~400 lines)
   - T2 Master context loading from `kraken-context/T2_*.md`
   - T1 dynamic task decomposition from SPEC.md or user request
   - Designates domains (task → cluster assignment via type mapping)
   - Context bridge creation between tasks

2. **ExecutionBrain** (`src/brains/execution/execution-brain.ts`, ~450 lines)
   - Task lifecycle: registerTaskOutputs → claimOutputsRetrieved → canCompleteTask → completeTask
   - Override commands: abortTask, createOverrideCommand (sent to SubagentManagerBrain)
   - Quality enforcement: checkQuality, enforceOutputRetrieval
   - State: owns `execution-state` and `quality-state` domains

3. **BrainConcurrencyManager** (`src/brains/BrainConcurrencyManager.ts`, 231 lines)
   - 3 async event loops: Planning (200ms), Execution (200ms), System (500ms)
   - Message polling via BrainMessenger.drainMessages()
   - Custom tick handlers per brain with 5s timeout per tick
   - Graceful shutdown via AbortController

4. **SubagentManagerBrain** (`src/brains/SubagentManagerBrain.ts`, ~200 lines)
   - **7 stub handlers** — acknowledge commands but do nothing real
   - Subscription on channel `kraken-subagent` for override commands from ExecutionBrain
   - Needs real Docker container pool management

5. **ClusterManager** (`src/clusters/ClusterManager.ts`, ~120 lines)
   - Manages 3 concurrent clusters (Alpha/Beta/Gamma)
   - Unified interface for task assignment + status monitoring
   - Least-load scheduling delegation to ClusterScheduler

6. **ClusterInstance** (`src/clusters/ClusterInstance.ts`, ~200 lines)
   - Individual cluster runtime with async task queue
   - `spawnAgentTask()` via `python3 opencode_agent.py`
   - **Hardcoded model** (`minimax/MiniMax-M2.7`), timeout (120s), plugin path

7. **opencode_agent.py** (`src/clusters/wrappers/opencode_agent.py`, ~300 lines)
   - **Real Docker spawner** — spawns `ghcr.io/anomalyco/opencode` containers
   - Context manager with guaranteed cleanup (atexit, __del__, __exit__)
   - Port pool (18081-18094), health check, JSON stream parser
   - **BUG: Mounts workspace as READ-ONLY (`:ro`)** — agents cannot write files

8. **AsyncDelegationEngine** (`src/factory/AsyncDelegationEngine.ts`, ~180 lines)
   - Promise-based async task delegation with priority queue
   - **CRITICAL BUG: processQueue() does NOT await tasks** — fire-and-forget
   - Sets `processing = false` immediately after firing tasks
   - Tasks complete in background, results never propagate

9. **ClusterScheduler** (`src/factory/ClusterScheduler.ts`, ~100 lines)
   - Least-load scheduling across clusters
   - Focus anchoring — clusters bound to project/task focus names
   - Load increment/decrement tracking

10. **BrainMessenger** (`src/shared/brain-messenger.ts`, ~150 lines)
    - Structured message bus between brains
    - Priority levels: critical > high > normal > low
    - send(), subscribe(), drainMessages(), sendOverride()

11. **StateStore** (`src/shared/state-store.ts`, 136 lines)
    - 15 domains with versioning, watchers, snapshots
    - Domain ownership enforcement
    - In-memory only — EvidenceCollector handles disk persistence

12. **EvidenceCollector** (`src/shared/evidence-collector.ts`, 175 lines)
    - Gate evidence: file existence, output retrieval, decisions
    - Disk persistence to `kraken-hive/evidence/{gateId}-evidence.json`
    - Verification: isGateVerified(), collect(), persist()

13. **Domain Ownership** (`src/shared/domain-ownership.ts`, 64 lines)
    - 15 domains: planning-state, execution-state, thinking-state, context-bridge,
      workflow-state, security-state, quality-state, container-state, execution-queue,
      alpha/beta/gamma-state, compaction-state, context-registry, token-budget

14. **Cluster Tools** (`src/tools/cluster-tools.ts`, ~200 lines)
    - 4 tools: anchor_cluster, spawn_cluster_task, spawn_shark_agent, spawn_manta_agent
    - L4 domain validation before delegation
    - Output registration with ExecutionBrain

15. **Hive Tools** (`src/tools/kraken-hive-tools.ts`, 164 lines)
    - 4 tools: kraken_hive_search, kraken_hive_remember,
      kraken_hive_get_cluster_context, kraken_hive_inject_context
    - L0 identity wall: only kraken/kraken-executor agents

16. **Monitoring Tools** (`src/tools/monitoring-tools.ts`, ~150 lines)
    - get_cluster_status, aggregate_results, get_agent_status,
      kraken_brain_status, kraken_message_status

17. **Shark T2 Tools** (`src/tools/shark-t2-tools.ts`, ~100 lines)
    - read_kraken_context — Shark/Manta read T2 reference library

18. **KrakenHiveEngine** (`src/kraken-hive/index.ts`, 370 lines)
    - File-based persistent memory at `~/.local/share/opencode/kraken-hive/`
    - 6 categories: clusters, sessions, patterns, decisions, failures, breakthroughs
    - search(), rememberCluster(), rememberPattern(), rememberFailure(), rememberSession()
    - getContextForTask(), synthesizeContext() — injectable context synthesis
    - Searchable .md files — keyword matching with relevance scoring

19. **KrakenHiveSeeder** (`src/kraken-hive/KrakenHiveSeeder.ts`, 139 lines)
    - 5 initial patterns: Delegation Pattern, Cluster Routing, Fire-and-Forget failure,
      TypeScript Build Pattern, V1.2 Multi-Brain Architecture

20. **v4.1 Framework** (11 files)
    - safe-hook.ts (now with FIREWALL_BLOCKED re-throw fix)
    - session-state.ts, global-state.ts
    - agent-awareness.ts, hook-context.ts
    - identity.ts (FIXME template — not used by Kraken)
    - agent-registration.ts, constants.ts
    - compose-handlers.ts, logger.ts

21. **Identity System** (4 files)
    - loader.ts (332 lines) — 7 search paths for identity/*.md files
    - injector.ts (89 lines) — formatIdentityForSystemPrompt()
    - types.ts (91 lines)
    - index.ts (9 lines) — re-exports

### Section 2 — What Is BROKEN (V10_FINAL Bugs)

| # | Bug | File | Severity | Fix |
|---|-----|------|----------|-----|
| 1 | **AsyncDelegationEngine.processQueue() fire-and-forget** | `factory/AsyncDelegationEngine.ts` | **CRITICAL** | Add `await Promise.all(tasks)` or sequential processing. Tasks complete in background with no result propagation. |
| 2 | **SubagentManagerBrain — 7 stub handlers** | `brains/SubagentManagerBrain.ts` | **HIGH** | Implement real Docker operations or at minimum real subagent process management. Currently console.log + acknowledge. |
| 3 | **opencode_agent.py `:ro` mount** | `clusters/wrappers/opencode_agent.py` | **HIGH** | Remove `:ro` flag from workspace mount. Subagent needs write access. |
| 4 | **ClusterInstance hardcoded model** | `clusters/ClusterInstance.ts` | **MEDIUM** | Read model from config/env. Remove hardcoded `minimax/MiniMax-M2.7`. |
| 5 | **Identity loaded but never injected** | `identity/loader.ts` + `index.ts` | **MEDIUM** | `orchestratorIdentityPrompt` loaded from .md files but `system.transform` uses hardcoded text. Unify. |
| 6 | **ClusterInstance hardcoded timeout** | `clusters/ClusterInstance.ts` | **LOW** | Make 120s timeout configurable. |
| 7 | **ClusterInstance hardcoded plugin path** | `clusters/ClusterInstance.ts` | **LOW** | Resolve dynamically from config. |

### Section 3 — Fix Plan for Broken Components

#### Fix 1: AsyncDelegationEngine processQueue() — CRITICAL

**File:** `src/factory/AsyncDelegationEngine.ts`
**Symptom:** `spawn_shark_agent` and `spawn_manta_agent` tools timeout because results never propagate.
**Root Cause:** `processQueue()` fires each task with `executeTask()` but does NOT await them. 
It sets `processing = false` immediately, marking the queue as done before any task completes.
Subsequent calls see `processing == false` and start new tasks, but original results are orphaned.

**Fix:**
```typescript
private async processQueue(): Promise<void> {
  this.processing = true;
  try {
    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, 3); // Max 3 concurrent
      await Promise.all(batch.map(task => this.executeTask(task)));
    }
  } finally {
    this.processing = false;
  }
}

private async executeTask(task): Promise<void> {
  try {
    const result = await this.clusterManager.executeTask(task.request);
    task.resolve(result);
    await this.syncBrainsAfterTask(task.request, result);
  } catch (err) {
    task.reject(err);
  }
}
```

**Verification:** Spawn a task → `waitForCompletion(taskId, 30000)` → result returns within timeout.

#### Fix 2: SubagentManagerBrain Stub Handlers

**File:** `src/brains/SubagentManagerBrain.ts`

Replace each stub with real logic:

- `handleAbort(taskId)` → Send SIGTERM to the container's tmux session, wait for process exit
- `handleClaimComplete(taskId)` → Check L2 evidence (files on host), verify output retrieval
- `handleRetrieveOutputs(taskId)` → ssh/docker cp outputs from container to host workspace
- `handleReassign(taskId, newCluster)` → Move task to new cluster's queue, update tracking
- `handleRetry(taskId)` → Re-queue the task with original parameters, increment retry counter
- `handleSuspend(taskId)` → Pause tmux session (Ctrl-Z equivalent), save state
- `handleResume(taskId)` → Resume tmux session, restore state

**Minimum viable:** Implement handleAbort (SIGTERM the tmux session) and handleClaimComplete (verify outputs on host). Others can remain stubs for v1.2 ship.

#### Fix 3: opencode_agent.py Read-Write Mount

**File:** `src/clusters/wrappers/opencode_agent.py`

Change workspace mount from `:ro` to read-write:
```python
volumes[f'{workspace_path}'] = {'bind': f'{workspace_path}'}  # Remove :ro
```

Add write-protection for Kraken paths explicitly:
- `~/.config/opencode/` → still read-only (must NOT be modified by subagent)
- `~/.local/share/opencode/kraken-hive/` → still read-only (must NOT be modified by subagent)
- Everything else → read-write

#### Fix 4: ClusterInstance Hardcoded Values

Read from environment/config:
```typescript
const model = process.env.KRAKEN_SUBAGENT_MODEL || 'big-pickle'; 
const timeout = parseInt(process.env.KRAKEN_SUBAGENT_TIMEOUT || '120000');
const pluginPath = process.env.KRAKEN_PLUGIN_PATH || resolveDefaultPath();
```

#### Fix 5: Identity Unification

The file-based identity from `IdentityLoader` (loaded into `orchestratorIdentityPrompt`) 
must be used by `system.transform` instead of the hardcoded ASCII.

Either:
- **Option A:** Replace hardcoded text with `orchestratorIdentityPrompt` variable in system.transform
- **Option B:** Keep hardcoded text as fallback, prepend file-based identity as primary source

Option A is preferred — single source of truth.

---

### Section 4 — Build Spec: Context Management Auto-Generation

#### Overview

Every Kraken-managed project needs a `Context Management/` directory auto-created by the 
SystemBrain at project initialization. This replaces the manual "Compaction Survival" folders 
that you have been creating by hand across every project.

**Location:** `{project-root}/Context Management/`

#### 4.1: Documents to Auto-Generate

| # | Document | Purpose | Created When | Updated When |
|---|----------|---------|-------------|-------------|
| 1 | `BUILD_LOG.md` | Running chronological changelog of every milestone | Project init (empty template) | Gate advancement, task completion, checkpoint, build event |
| 2 | `DEBUG_LOG.md` | All bugs found, root causes analyzed, fixes applied | Project init (empty template) | `recordTaskFailure()`, smart error detector trigger, manual debug entry |
| 3 | `CONTEXT_CONTINUITY.md` | First-hand awareness, insights, injectable data points for alignment | Project init (empty template) | `recordDecision()`, firewall context bridge trigger, gate advancement, breakthrough |
| 4 | `PROJECT_ARCHITECTURE.md` | Macro anchor: WHAT is being built, HOW, WHY. Mini context library at Hive-bible depth. | PlanningBrain.generateT1() — generated ONCE at build start | **NEVER changes after creation** — read-only reference anchor |
| 5 | `BUILD_WORKFLOW.md` | Phase-by-phase checklist of exactly HOW to build the architecture. Anti-derailment anchor. | PlanningBrain.generateT1() — generated ONCE at build start | Never changes — used as validation checklist |

#### 4.2: Content Structure Per Document

**BUILD_LOG.md:**
```markdown
# BUILD LOG — {project-name}
## Session: {session-id} | Started: {timestamp}

### [{timestamp}] GATE: plan → build
- T2 Master loaded: patterns, failures, architecture, build-chain
- T1 Task decomposition: {N} tasks across {clusters} clusters
- Cluster assignments: {task→cluster mapping}

### [{timestamp}] TASK: {task-id} — COMPLETE
- Agent: {shark/manta}-{cluster}-{n}
- Cluster: {cluster}
- Duration: {ms}ms
- Outputs: {n} files on host
- Evidence: verified ✅

### [{timestamp}] GATE: build → test
- Completed tasks: {n}/{total}
- Failed tasks: {n}
- Gate evidence: verified ✅
- Advanced to test gate
```

**DEBUG_LOG.md:**
```markdown
# DEBUG LOG — {project-name}
## Session: {session-id}

### BUG #{n}: {title}
- **Detected:** {timestamp}
- **Symptom:** {description}
- **Root Cause:** {analysis}
- **Fix Applied:** {description}
- **Fix Location:** {file}:{line}
- **Verified:** {timestamp} ✅
- **Category:** {BUILD|TEST|CONTAINER|CONFIG|MODEL}
- **Hive Permanent Record:** kraken://failures/{id}

### PATTERN DETECTED: {pattern-category}
- **Detection:** Smart error detector — {n}× same failure
- **Context Injected:** {topics injected}
- **Resolution:** {what fixed it}
```

**CONTEXT_CONTINUITY.md:**
```markdown
# CONTEXT CONTINUITY — {project-name}
## Stream of Consciousness + Injectable Data Points

### [{timestamp}] GATE: {gate}
#### Current Understanding
- What we know about the project state: {insight}
- Key decisions made: {list}
- Architecture validated: yes/no

#### Active Concerns
- {concern}: {status}

#### Hive Knowledge Applied
- Pattern: {name} — relevance: {score}/10
- Failure avoided: {name} — how we avoided it

#### Injectable Data Points (for alignment injection)
- {data-point-id}: {value} (confidence: {score})
- {data-point-id}: {value} (confidence: {score})
```

**PROJECT_ARCHITECTURE.md (generated ONCE, never modified):**
```markdown
# PROJECT ARCHITECTURE — {project-name}
## Macro Anchor — Hive Bible Depth

### What Is Being Built
{Detailed description from T1 decomposition — 5-10 paragraphs}

### Architecture Diagram
```
{ASCII diagram from planning brain context}
```

### Component Tree
{Each component with file paths, responsibilities, dependencies}

### Data Flow
{End-to-end data flow diagram}

### External Dependencies
{All external systems, APIs, libraries}

### Critical Constraints
{Non-negotiable constraints that define the architecture}

### Design Decisions (Why)
{Each major decision with rationale}

### Anti-Patterns To Avoid
{Specific to this architecture}

### Integration Points
{How components connect, message formats, APIs}

### Testing Strategy
{Per-component testing approach}
```

**BUILD_WORKFLOW.md (generated from T1, validated against EVERY response):**
```markdown
# BUILD WORKFLOW — {project-name}
## Phase-by-Phase Execution Checklist

### GATE: PLAN
- [ ] Load T2 Master context from kraken-context/
- [ ] Analyze project requirements
- [ ] Decompose into tasks (T1 generation)
- [ ] Designate domains (task→cluster mapping)
- [ ] Create project architecture document
- [ ] Create build workflow document (this file)
- [ ] Record all decisions to Context Continuity

### GATE: BUILD
- [ ] Spawn cluster agents for each build task
- [ ] Monitor async execution (track all tasks)
- [ ] Retrieve ALL outputs (verify files on host)
- [ ] Validate domain assignments (L4 wall)
- [ ] Verify no fire-and-forget (L1/L2 walls)
- [ ] Record task completions to Build Log
- [ ] Record any failures to Debug Log

### GATE: TEST
- [ ] Spawn test agents in Gamma cluster
- [ ] Run test suite against built artifacts
- [ ] Aggregate all test results
- [ ] Verify no test failures (or document known acceptable failures)
- [ ] Record test results to Build Log

### GATE: VERIFY
- [ ] Verify all gate evidence (EvidenceCollector.isGateVerified)
- [ ] Mechanically verify outputs exist on host
- [ ] Verify no L1 theater claims (spawned ≠ complete)
- [ ] Run anti-hallucination validators
- [ ] Record verification to Context Continuity

### GATE: AUDIT
- [ ] Full code audit (all files reviewed)
- [ ] Security audit (no secrets, no vulnerabilities)
- [ ] Firewall audit (all layers tested)
- [ ] Record audit findings to Debug Log

### GATE: DELIVERY
- [ ] All prior gates verified ✅
- [ ] Bundle built (bun build successful)
- [ ] Container test: identity verified
- [ ] Container test: firewall blocks work
- [ ] Container test: tools register correctly
- [ ] Outputs merged and packaged
- [ ] Ship manifest updated
- [ ] Deploy script verified (bash -n passes)

### COMPLETION CHECKLIST (before ANY "done" claim)
- [ ] All gate checklists ✅ checked
- [ ] PROJECT_ARCHITECTURE.md validated (nothing changed)
- [ ] BUILD_WORKFLOW.md validated (all phases complete)
- [ ] Context Management files updated (Build Log, Debug Log, Context Continuity)
- [ ] Evidence persisted for current gate
- [ ] Container test results attached
- [ ] No L1 theater claims in output
```

#### 4.3: SystemBrain.initializeProject()

New method on SystemBrain:

```typescript
initializeProject(projectRoot: string, projectName: string, t1Tasks: T1Task[]): void {
  const ctxDir = path.join(projectRoot, 'Context Management');
  fs.mkdirSync(ctxDir, { recursive: true });

  // Create empty template files
  fs.writeFileSync(path.join(ctxDir, 'BUILD_LOG.md'), 
    `# BUILD LOG — ${projectName}\n## Started: ${new Date().toISOString()}\n`);
  fs.writeFileSync(path.join(ctxDir, 'DEBUG_LOG.md'),
    `# DEBUG LOG — ${projectName}\n`);
  fs.writeFileSync(path.join(ctxDir, 'CONTEXT_CONTINUITY.md'),
    `# CONTEXT CONTINUITY — ${projectName}\n## Stream of Consciousness\n`);

  // Generate Project Architecture (detailed, one-time)
  const architecture = this.generateArchitectureDoc(projectName, t1Tasks);
  fs.writeFileSync(path.join(ctxDir, 'PROJECT_ARCHITECTURE.md'), architecture);
  this.registerContext('PROJECT_ARCHITECTURE.md', 'critical');

  // Generate Build Workflow (checklist, one-time)
  const workflow = this.generateBuildWorkflow(t1Tasks);
  fs.writeFileSync(path.join(ctxDir, 'BUILD_WORKFLOW.md'), workflow);
  this.registerContext('BUILD_WORKFLOW.md', 'critical');

  // Register all files in context-registry domain
  this.registerContext('BUILD_LOG.md', 'high');
  this.registerContext('DEBUG_LOG.md', 'high');
  this.registerContext('CONTEXT_CONTINUITY.md', 'high');
}
```

#### 4.4: L11 Build Workflow Firewall (Anti-"Ship Ready" Bullshit)

New firewall layer that validates every "done" claim against BUILD_WORKFLOW.md:

```typescript
// L11: No completion claims without workflow validation
checkBuildWorkflow(output: any): BlockResult | null {
  const completedMessage = output?.result || output?.content || '';
  const doneClaims = [
    /ship.*ready/i, /complete/i, /done/i, /finished/i,
    /package.*ready/i, /ready.*deploy/i, /build.*complete/i,
  ];

  for (const pattern of doneClaims) {
    if (pattern.test(completedMessage)) {
      // Load BUILD_WORKFLOW.md from disk
      const workflowPath = path.join(projectRoot, 'Context Management', 'BUILD_WORKFLOW.md');
      const workflow = fs.readFileSync(workflowPath, 'utf-8');
      
      // Count unchecked items
      const unchecked = (workflow.match(/\[ \]/g) || []).length;
      
      if (unchecked > 0) {
        return {
          blocked: true,
          layer: 'L11',
          reason: `[L11_BUILD_WORKFLOW] ${unchecked} build workflow items unchecked. You are not done.`,
          correction: `Return to BUILD_WORKFLOW.md. Complete all ${unchecked} unchecked items before claiming completion.`,
        };
      }
    }
  }
  return null;
}
```

#### 4.5: Identity System Hardening

**Unification:**
- `system.transform` MUST use `orchestratorIdentityPrompt` (from file-based loader) as PRIMARY identity source
- The hardcoded ASCII identity becomes FALLBACK (used if identity files not found)
- Identity files become the single source of truth

**Subagent Identity Injection:**
When `spawn_shark_agent` or `spawn_manta_agent` is called, inject structured identity:

```
You are SHARK-V2 — Kraken Alpha Cluster steamroll agent.
Orchestrator: KRAKEN v1.2 (kraken)
Your cluster: Alpha (build/steamroll tasks)
Your tools: write, bash, read, glob, grep, read_kraken_context, report_to_kraken
Firewall: L0-L7 walls protect you. Never touch kraken-hive/ or ~/.config/opencode/.
Hive: Use read_kraken_context topic=patterns to learn from past work.
Identity: You are NOT opencode. You are SHARK-V2 executing for Kraken.
Output protocol: write all files to workspace, then call report_to_kraken with paths.
Failure protocol: report failure immediately. Never hide, never excuse, never blame.
Mantra: "Build, verify, report. Never hide failure. Never claim what isn't real."
```

**Hive-Blindness Detection (new L8 sub-pattern):**
```
HIVE_IGNORANCE patterns:
- "I don't have access to hive"
- "Hive context is not available"
- "I cannot search the hive"
- "there is no hive"
→ BLOCKED with context injection pointing to kraken_hive_search tool
```

**Identity Bootstrap Sequence:**
On plugin init (`index.ts` startup), before any user message:
1. Load orchestrator identity from .md files
2. Search Hive for current project context
3. Load T2 master context from kraken-context/
4. Self-assess: "I am KRAKEN v1.2. Hive: {n} patterns, {n} failures known. Current project: {name}. Gate: {current}. Ready."
5. Inject this self-assessment into the first system prompt

---

### Section 5 — Build Priority

| Priority | Component | Why First |
|----------|-----------|-----------|
| **P0** | Merge all V10_FINAL source into ship v12 | Ship is firewall-only. No brain infrastructure. |
| **P0** | Rebuild bundle with ALL modules | Verify import graph works with full source tree |
| **P0** | Container test: identity, firewall, tools, brain init, hive | Verify deployment works end-to-end |
| **P1** | Fix AsyncDelegationEngine processQueue() fire-and-forget | Nothing works without this. Subagents can't return results. |
| **P1** | Context Management auto-generation (SystemBrain init + 5 docs) | Replaces manual babysitting you've been doing. |
| **P1** | Implement SubagentManagerBrain handlers (at minimum: abort + claimComplete) | Override commands are the orchestration backbone. |
| **P1** | Fix opencode_agent.py `:ro` → read-write (with Kraken path protection) | Subagents need to write files. |
| **P1** | Unify identity: loader files → single source of truth → system.transform | Currently two separate identity systems. |
| **P2** | Build Workflow validator (L11 firewall layer) | Prevents "ship ready" bullshit. |
| **P2** | Subagent identity injection (Shark/Manta self-awareness) | Makes subagents context-aware of their role. |
| **P2** | Hive-blindness detection patterns (L8 HIVE_IGNORANCE) | Agent should never say "I don't have Hive access." |
| **P3** | Identity bootstrap sequence (self-assessment on init) | Agent self-aware before first user message. |
| **P3** | Unhardcode ClusterInstance (model, timeout, plugin path) | Configurability from env. |
| **P3** | Strike persistence to Hive | Cross-session strike awareness. |
| **P3** | L6 firewall rule: prevent source tree deletion from ship packages | The identical pattern that caused this disaster. |

---

### Section 6 — What Already Exists (Don't Rebuild)

| System | Location | Lines | Production Ready |
|--------|----------|-------|-----------------|
| T2 Context Library (10 docs) | `kraken-context/T2_*.md` | ~2,000 | Yes |
| 5 Identity files | `identity/orchestrator/*.md` | ~5 total, ~600 lines | Yes |
| EvidenceCollector | `shared/evidence-collector.ts` | 175 | Yes |
| StateStore (15 domains) | `shared/state-store.ts` | 136 | Yes |
| BrainMessenger | `shared/brain-messenger.ts` | ~150 | Yes |
| KrakenHiveEngine | `kraken-hive/index.ts` | 370 | Yes |
| Firewall context bridge | `system-brain/firewall/firewall-context-bridge.ts` | 401 | Yes |
| Smart error detector | `system-brain/firewall/smart-error-detector.ts` | 346 | Yes |
| BrainConcurrencyManager | `brains/BrainConcurrencyManager.ts` | 231 | Yes |
| PlanningBrain | `brains/planning/planning-brain.ts` | ~400 | Yes |
| ExecutionBrain | `brains/execution/execution-brain.ts` | ~450 | Yes |
| SystemBrain | `brains/system/system-brain.ts` | 492 | Yes |
| All 16 firewall layers | `system-brain/firewall/` + `brains/system/firewall/` | ~5,000 | Yes — container verified |
| Compaction survival hook | `index.ts` L993-1032 | ~40 | Yes |
| Session lifecycle hook | `index.ts` L1035-1042 | ~7 | Yes |

---

---

## NEXT PHASE: V1.3 UNIFIED FIX — Applied 2026-05-30

**Current Gate:** BUILD (Section 3 fixes applied, awaiting runtime verification)
**Updated:** 2026-05-30 23:40 UTC
**Context Injectable:** `Active Context/CONTEXT_INJECTABLE_V13_UNIFIED.md` (1023 lines, 22 sections)

### Section 3 Fixes — APPLIED (8 fixes)

| # | Fix | File | Status | Change |
|---|-----|------|--------|--------|
| 1 | **processQueue() fire-and-forget** | `factory/AsyncDelegationEngine.ts` | **APPLIED** | `await Promise.all(batch.map(...))` with try/finally |
| 2 | **SubagentManagerBrain handlers** | `brains/SubagentManagerBrain.ts` | **ALREADY FIXED in V12** | Real Docker/tmux operations for all 7 handlers |
| 3 | **opencode_agent.py mount** | `clusters/wrappers/opencode_agent.py` | **ALREADY FIXED in V12** | Workspace is `:rw`, only plugin/auth paths are `:ro` |
| 4 | **Config callback 400 crash** | `index.ts:593,605` | **APPLIED** | `Object.fromEntries(Object.keys(getAgentTools(id)).map(t => [t, true]))` |
| 5 | **Identity unification** | `index.ts:628+` | **APPLIED** | Session-agent map + per-agent isolation |
| 6 | **T2 sourceDir broken path** | `planning-brain.ts:103+` | **APPLIED** | 6 search paths including `~/.config/opencode/plugins/kraken-agent/kraken-context/` |
| 7 | **Firewall dead (agentName)** | `hook-context.ts:97` + `safe-hook.ts` | **APPLIED** | `input.agent` first + `sessionAgentGetter` fallback |
| 8 | **Identity bleed across plugins** | `index.ts` (session map + event hook) | **APPLIED** | `krakenSessionAgentMap` + session boundary detection |

### Section 3.5 — NEW: Per-Agent Identity Isolation + Session Boundaries

**Problem:** Kraken's `system.transform` injected identity into ALL agents (Trident, vanilla, etc.) because `agentFilter: null` was set with no session check.

**Fix:** Added `krakenSessionAgentMap` — a per-session agent tracker:
- `event` hook tracks which agent is active per session
- `system.transform` checks `krakenIsMySession(sid)` before injecting — only Kraken-managed sessions get identity
- `tool.execute.before` uses `krakenGetSessionAgent(ctx.sessionID)` when `ctx.agentName` is undefined
- `chat.message` falls back to session map for identity detection
- `experimental.session.compacting` checks session ownership before persisting
- Session end clears the map entry

**Prevents:** Trident lockout (agent thought it was still Trident when switched to Kraken), identity bleed across tabs.

### Section 3.6 — NEW: Hive-Mind Plugin API Fix

**File:** `projects/hive-mind/plugin/src/index.ts`
**Changes:**
- `searchInOV()`: Changed from `GET /api/v1/search/find?uri=...&q=...` to `POST /api/v1/search/find` with JSON body `{uri, n, query}`
- `fetchFromOV()`: Changed from `content/overview` endpoint to `content/file` endpoint (returns actual content, not directory listing)
**Status:** APPLIED, rebuilt (71 modules, 0.47MB), deployed to `~/.config/opencode/plugins/hive-mind-fixed/`

### Build State

```
Bundle: dist/kraken-agent.js — 0.74 MB, 145 modules
Build: bun build src/index.ts --outfile dist/kraken-agent.js --target bun --format esm --bundle --external @opencode-ai/plugin
Container: kraken-v12-test running opencode-test:1.14.34
Container plugin: /tmp/tmp.mSv0akvNb8/config/plugins/kraken-firewall/dist/kraken-firewall.js — DEPLOYED
Local deploy: ~/.config/opencode/plugins/kraken-agent-v13/ — DEPLOYED
```

### Section 4 — Remaining Build Tasks (NOT YET STARTED)

| # | Component | Key File | Status |
|---|-----------|----------|--------|
| 6 | Context Management auto-gen | `system-brain-v2.ts` | NOT STARTED — method exists, never called |
| 7 | L11 Build Workflow firewall | `l11-build-workflow.ts` | NOT STARTED — file may not exist yet |
| 8 | Subagent identity injection | `cluster-tools.ts` | NOT STARTED — prompts are generic |
| 9 | Hive-blindness detection (L8) | `l8-anti-bullshit.ts` | NOT STARTED — patterns documented but not coded |
| 10 | Identity bootstrap sequence | `index.ts` | NOT STARTED — logs state but doesn't inject |
| 11 | Strike persistence to Hive | `layer-engine.ts` | NOT STARTED — strikes not persisted |
| 12 | **Tab/Model/Agent awareness context** | `system-brain.ts` + `index.ts` | NOT STARTED — agent doesn't know its own tab, model, or mode |
| 13 | **Stupidity detection (wrong-agent testing)** | Firewall L5 | NOT STARTED — must detect testing Kraken systems from Plan/Build tab |
| 14 | **Dynamic context injection (model selection)** | `system-brain.ts` | NOT STARTED — must inject relevant execution context like model choice |

### Section 4.5 — SYSTEM BRAIN ENFORCEMENT REQUIREMENTS

These come from the 2026-05-30 derailment where Kraken systems were tested from the Plan agent tab, model flags were ignored, and no firewall caught it.

**The system brain MUST inject context that tells the agent:**
1. **Which agent tab it's on** — Kraken, Plan, Build, Trident, etc.
2. **Which model is active** — M2.5 Pro, Gemini Flash Lite, etc.
3. **What mode it's in** — Plan mode (read-only), Build mode (full access)
4. **Whether it's authorized to test the current systems** — Plan agent cannot test Kraken tools

**The firewall MUST block:**
1. Testing Kraken/firewall/hive systems from a non-Kraken agent tab
2. Using wrong model for Kraken orchestration tasks
3. Proceeding in Plan mode when the task requires Build mode

**Implementation approach:**
- `system.transform` injects a context block: `[KRAKEN EXECUTION CONTEXT] Agent: {tab}, Model: {model}, Mode: {mode}, Authorized: {yes/no}`
- L5 MACRO_DERAILMENT gets a new sub-pattern: `WRONG_AGENT_TAB` — detects Kraken tool calls from Plan/Build tabs
- Session-agent map seeds from `chat.message` on first message (agent identity available there)
- Evidence collection tracks which agent tab called which tool

### Verification Protocol — RUNTIME RESULTS

**Test Date:** 2026-05-31
**Container:** test-kraken-v13-0531004300 (opencode-test:1.14.34)
**Method:** TUI Testing Bible 12-step protocol (isolated snapshot, docker exec -it in tmux)
**Model:** Big Pickle OpenCode Zen (minimax provider, M2.5-Pro config)
**Agent Tab:** Kraken (confirmed in TUI status bar)

| # | Check | Method | Result | Evidence |
|---|-------|--------|--------|----------|
| 1 | TUI loads without 400 | Isolated snapshot, docker run | **PASS** | No error in TUI output |
| 2 | Kraken tab appears | tmux capture-pane status bar | **PASS** | "Kraken · Big Pickle OpenCode Zen" |
| 3 | Identity injection | "who are you" in Kraken tab | **PASS** | "Kraken Orchestrator — multi-brain agent system. I coordinate clusters of specialized agents (Sharks, Mantas)" |
| 4 | Execution context | Agent reports its context | **PASS** | Agent knows mode=Build, authorization=FULL |
| 5 | Tool call (kraken_brain_status) | "call kraken_brain_status" | **PASS** | "All three brains operational. Planning, Execution, System initialized. Current gate: plan" |
| 6 | Tool call (get_cluster_status) | "call get_cluster_status" | **PASS** | "3 clusters online (alpha, beta, gamma), 9 agents idle" |
| 7 | Evidence on disk | docker exec ls evidence dir | **PASS** | plan-evidence.json, 803 bytes, 2 items (kraken_brain_status + get_cluster_status) |
| 8 | Evidence hook fires | tmux capture-pane | **PASS** | `[HOOK_EVIDENCE] Collecting for gate: plan tool: kraken_brain_status` + `Persisted evidence for gate: plan` |
| 9 | Firewall blocks | NOT TESTED | — | Need Build mode attack test |
| 10 | Identity isolation | NOT TESTED | — | Need second plugin loaded |

### Critical Runtime Discovery

**system.transform input has NO agent field.** Empirically confirmed:
```
[SYSTEM_TRANSFORM] sid=ses_18596cfbaffeyAFcAWo1DiP9tH agentMap=null inputKeys=sessionID,model
```
Input contains ONLY `sessionID` and `model`. No `agent`, no `session.agentName`, no `agentName`. The session-agent map cannot be seeded from system.transform.

**tool.execute.before ALSO has no agent field** in its input. The handler must not gate on agent identity — the firewall handles that internally.

**Evidence collection works when handler is not gated by agentName.** After removing the `if (!resolvedAgent) return;` guard, evidence was written to disk for the first time ever: `plan-evidence.json` at 450 bytes.

**Session-agent map can only be seeded from:**
- `chat.message` hook (has `ctx.agentName` or `input.agent`)
- `event` hook (has `evt.agent`)

This means identity isolation CANNOT work on the first system.transform call. The first call must inject unconditionally. Subsequent calls can check the session map.

---

*Last updated 2026-05-30 — Runtime verification phase. Section 4.5 enforcement requirements added.*
