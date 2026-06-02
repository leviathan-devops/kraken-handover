# KRAKEN V1.2 — BUILD LOG: SHIP V4

**Date:** 2026-04-28 23:10 UTC
**Build ID:** kraken-v1.2-ship-v4
**Bundle:** `dist/index.js` — 571KB, 110 modules, bun ESM
**Deployed:** `~/.config/opencode/plugins/kraken-agent/dist/index.js`
**OpenCode:** 1.14.29 (container), 1.14.28 (local)
**Checkpoint:** `Compaction Survival/CHECKPOINTS/ship-v4-identity-fixed-20260428_230701/`

---

## ARCHITECTURE OVERVIEW

### Triple-Brain Orchestrator

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  PLANNING BRAIN │     │ EXECUTION BRAIN │     │  SYSTEM BRAIN   │
│                 │     │                 │     │                 │
│ owns:           │     │ owns:           │     │ owns:           │
│ planning-state  │     │ execution-state │     │ workflow-state  │
│ context-bridge  │     │ quality-state   │     │ security-state  │
│                 │     │                 │     │                 │
│ Methods:        │     │ Methods:        │     │ Methods:        │
│ loadT2Master()  │     │ startTask()     │     │ setCurrentGate()│
│ generateT1()    │     │ recordResult()  │     │ recordDecision()│
│ decomposeTasks()│     │ verifyOutputs() │     │ recordTaskDone()│
│ assignCluster() │     │ sendOverride()  │     │ getGateCriteria()│
│ designateDomains│     │ registerOutputs()│    │ evaluateGate()  │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                      ┌──────────┴──────────┐
                      │   BRAIN MESSENGER   │
                      │                     │
                      │ Priority signaling:  │
                      │ • context-inject     │
                      │ • gate-failure       │
                      │ • checkpoint         │
                      │ • override           │
                      │ • sync               │
                      └──────────┬──────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          ▼                      ▼                      ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │   ALPHA     │       │    BETA     │       │   GAMMA     │
   │  (steamroll)│       │ (precision) │       │  (testing)  │
   │             │       │             │       │             │
   │ shark-α1    │       │ shark-β1    │       │ manta-γ1    │
   │ shark-α2    │       │ manta-β1    │       │ manta-γ2    │
   │ manta-α1    │       │ manta-β2    │       │ shark-γ1    │
   └─────────────┘       └─────────────┘       └─────────────┘
```

### Hooks Registered

| Hook | Agent Filter | What It Does |
|------|-------------|--------------|
| `experimental.chat.system.transform` | `null` (fires for all) | Injects Kraken orchestrator identity (5 files, 8734 chars) into `output.system[]` if `orchestratorIdentityPrompt` is non-empty |
| `chat.message` | `null` (fires for all) | Identity detection: regex match on identity queries → injects fallback identity. Brain wiring: calls `generateT1()` → injects task decomposition into system prompt. System brain notification. |
| `tool.execute.before` | All 11 kraken agents | Session state tracking: records last tool and timestamp |

### Tools Registered

**Kraken agents** (`kraken`, `kraken-executor`):
- `anchor_cluster` — anchor cluster to focus name
- `spawn_cluster_task` — generic task queueing
- `spawn_shark_agent` — Shark-specific task with identity injection
- `spawn_manta_agent` — Manta-specific task with identity injection
- `get_cluster_status` — cluster health and system load
- `aggregate_results` — wait for + aggregate task results
- `get_agent_status` — agent availability across clusters
- `kraken_brain_status` — all 3 brain states + messaging
- `kraken_message_status` — message queue inspection
- `kraken_hive_search` — search Hive patterns
- `kraken_hive_remember` — store to Hive
- `kraken_hive_inject_context` — inject context into tasks

**Cluster agents** (9 Shark/Manta agents):
- `read_kraken_context` — read T2 patterns
- `report_to_kraken` — report to orchestrator
- `get_task_context` — get injected context

---

## HOW EACH SUBSYSTEM WORKS

### 1. Identity Loading (`src/identity/loader.ts`)

**Flow:**
1. `IdentityLoader.loadForRole('orchestrator')` called at plugin init
2. `findIdentityDir()` searches:
   - Absolute path from `KRAKEN_IDENTITY_DIR` env var
   - 4 known relative locations × 2 base dirs (cwd + HOME)
   - Falls back to `cwd/identity/`
3. Loads 5 markdown files from `identity/orchestrator/`:
   - `KRAKEN.md` (1518B) — Core directives, anti-hallucination
   - `IDENTITY.md` (1046B) — Role, expertise, working style
   - `EXECUTION.md` (3265B) — Delegation philosophy
   - `QUALITY.md` (1574B) — Quality gates
   - `TOOLS.md` (1206B) — Tool listing
4. `formatIdentityForSystemPrompt()` concatenates all 5 files
5. Result: 8734-character identity prompt injected into system prompt

**Env vars:**
```
KRAKEN_IDENTITY_DIR=/home/leviathan/.config/opencode/plugins/kraken-agent/identity
KRAKEN_PLUGIN_NAME=kraken-agent
KRAKEN_PLUGIN_DIR=/home/leviathan/.config/opencode/plugins/kraken-agent
```

### 2. Planning Brain (`src/brains/planning/planning-brain.ts`)

**Initialization:**
- `initialize()` — sets initialized flag, loads T2 master async (fire-and-forget)
- `loadT2Master()` — loads static kraken-context (capabilities, cluster types)
- Sets `t2MasterLoaded = true` in state
- Notifies execution brain via messenger: `context-inject` message

**T1 Generation:**
- `generateT1(userRequest)` — main task decomposition method
- `parseRequestIntoTasks()` — 3 strategies:
  1. Markdown heading parsing (`# Task Name`)
  2. Newline/sentence splitting (multi-step requests)
  3. Single task fallback
- `inferTaskType()` — keyword-based classification: build, debug, test, refactor, analyze, audit
- `assignCluster()` — maps task types to clusters:
  - build → alpha
  - debug/refactor/analyze → beta
  - test/audit → gamma
- `decomposeTasks()` — adds output declarations, confirms cluster assignments
- `designateDomains()` — maps tasks to state domains

**State tracking:**
```
getState() → { t2MasterLoaded, t1Generated, tasksDecomposed, domainsDesignated }
getSnapshot() → full state dump with T1 context
```

### 3. Execution Brain (`src/brains/execution/execution-brain.ts`)

**Task lifecycle:**
- `startTask(taskId, clusterId)` — increments `activeTasks`
- `recordResult(ExecutionResult)` — increments `completedTasks` or `failedTasks`
- `getState()` → `{ activeTasks, completedTasks, failedTasks }`

**Output verification:**
- `registerTaskOutputs(taskId, outputs[])` — declare expected outputs
- `claimOutputsRetrieved(taskId, hostPaths[])` — mark outputs as retrieved
- `verifyAllOutputs(taskId)` — check all required outputs exist
- `getOutputEvidence(taskId)` — evidence report with verification status

**Override commands:**
- `createOverrideCommand(action, target, payload)` — structured override
- `sendOverride(command)` — send via brain messenger
- Override actions: ABORT, CLAIM_COMPLETE, REASSIGN, RETRIEVE_OUTPUTS, RETRY, SUSPEND, RESUME

### 4. System Brain (`src/brains/system/system-brain.ts`)

**Workflow tracking:**
- `setCurrentGate(gate)` — advances gate (plan/building/testing/verification/audit/delivery)
- `getCurrentGate()` — current workflow gate
- `recordDecision({ description, type, contextFiles })` — decision logging
- `recordTaskComplete(taskId)` — adds to completed tasks list
- `recordTaskFailure(taskId, reason)` — failure tracking

**Gate management:**
- `getGateCriteria(gate)` — returns criteria for each gate
- `evaluateGateEntry(gate, criteria)` — checks if criteria met

**Security:**
- `recordSecurityEvent(event)` — log security events
- `getSecurityState()` — current security state

### 5. Brain Messenger (`src/shared/brain-messenger.ts`)

**Messaging:**
- `send(message)` — queue + deliver to brain or broadcast
- `deliverMessage(from, to, type, payload, priority)` — convenience wrapper
- `getQueuedMessages(brainId?)` — inspect queue
- `broadcast()` — send to all subscribed brains

**Override commands:**
- `sendOverride(command)` → `OverrideResult`
- `acknowledgeCommand(id, status)` — update status
- `completeCommand(id, result)` — mark complete
- `getCommandStatus(id)` — check status

**Subscription:**
- `subscribe(brainId, handler)` → returns unsubscribe function
- Brains subscribe at init for inter-brain communication

### 6. Cluster Manager + Delegation Engine

**Cluster Manager** (`src/clusters/ClusterManager.ts`):
- Manages 3 clusters (alpha, beta, gamma)
- `executeTask(clusterId, request)` → spawns Docker container via `ClusterInstance.executeOnAgent()`
- `getClusterStatus(id)` — agent availability, load
- `getAllClusterStatuses()` — system-wide view

**Delegation Engine** (`src/factory/AsyncDelegationEngine.ts`):
- `delegate(request)` — async task delegation
- `waitForCompletion(taskId, timeout)` — blocking wait
- `waitForAll(taskIds, timeout)` — aggregate results
- `getActiveTasks()` — Map of active task states
- Brain sync: after task execution, notifies execution brain via `recordResult()`

**Cluster Instance** (`src/clusters/ClusterInstance.ts`):
- `executeOnAgent(agent, request, retryCount?)` — REAL Docker spawning via Python wrapper
- `spawnAgentTask(agent, request)` — spawns `opencode_agent.py` subprocess
- Retry logic: MAX_RETRIES=2, 1s delay between retries
- Uses `import { spawn } from 'node:child_process'` (ESM, no require)

### 7. Python Docker Wrapper (`wrappers/opencode_agent.py`)

- 683-line Python script for Docker container lifecycle
- CLI: `--task`, `--model`, `--timeout`, `--container`, `--port`, `--cleanup`, `--json-only`, `--workspace`
- Spawns containers, connects to opencode serve, runs tasks, returns output, cleans up
- Confirmed working: `python3 opencode_agent.py --task "echo hello world" --timeout 15 --cleanup --json-only`

### 8. Identity Injection into Spawned Agents

Both `spawn_shark_agent` and `spawn_manta_agent` prepend Kraken identity:
```typescript
const identityHeader = ctx.krakenIdentity
    ? `${ctx.krakenIdentity}\n\n---\n\n`
    : '';
// Prepended to task prompt so spawned agents know they're Kraken workers
```

---

## BUILD PIPELINE

```bash
cd "/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/Active Projects/v1.2 Rebuild"
bun run build
# → bun build src/index.ts --outdir dist --target bun --format esm --bundle --external @opencode-ai/plugin
# Output: dist/index.js (571KB, 110 modules, 12ms build time)

cp dist/index.js ~/.config/opencode/plugins/kraken-agent/dist/index.js
```

**Dependencies:**
- Node.js >= 20
- Bun >= 1.0
- `@opencode-ai/plugin` (peer dependency, bundled externally)
- Zod (bundled)

**Bundle stats:**
- Size: 571KB (571,471 bytes)
- Modules: 110
- Build time: ~12ms
- Format: ESM
- Target: bun runtime

---

## DEPLOYMENT STRUCTURE

```
~/.config/opencode/plugins/kraken-agent/
├── dist/index.js              ← Main plugin bundle (571KB)
├── identity/orchestrator/     ← 5 identity files (8734 chars total)
│   ├── KRAKEN.md              (1518B)
│   ├── IDENTITY.md            (1046B)
│   ├── EXECUTION.md           (3265B)
│   ├── QUALITY.md             (1574B)
│   └── TOOLS.md               (1206B)
├── wrappers/                  ← Python Docker execution
│   ├── opencode_agent.py      (683 lines)
│   ├── container_pool.py
│   └── __init__.py
└── subagent-manager/          ← Container management
```

**opencode.json entry:**
```json
{
  "plugin": [
    "file:///home/leviathan/.config/opencode/plugins/kraken-agent/dist/index.js"
  ]
}
```

---

## CONTAINER INFRASTRUCTURE

**Image:** `kraken-v1.2-tui-test:latest` (2.99GB)
**Base:** node:22-bullseye
**OpenCode:** 1.14.28 (npm global install)
**Bun:** installed via curl script
**Env:** KRAKEN_PLUGIN_NAME, KRAKEN_PLUGIN_DIR, KRAKEN_IDENTITY_DIR set in Dockerfile

**Test protocol:**
1. Mount test config to `/root/.config/opencode`
2. `opencode --agent kraken` inside tmux
3. Send keys, capture pane, parse output

---

*Built by: deepseek-v4-pro*
*Date: 2026-04-28 23:10 UTC*
