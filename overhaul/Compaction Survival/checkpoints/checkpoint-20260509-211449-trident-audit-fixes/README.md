# Kraken Agent v1.2 — Multi-Brain Orchestrator

**OpenCode plugin for autonomous multi-agent orchestration with 3 concurrent brains, L0-L7 firewall, Hive Mind knowledge base, and 16 verified subsystems.**

> Kraken is an EXECUTION ENGINE, not a chatbot. When properly deployed, it coordinates parallel builds across 3 clusters (Alpha/Beta/Gamma) with automatic domain validation, output verification, and gate advancement.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    KRAKEN ORCHESTRATOR                       │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                 │
│  │ PLANNING │──>│EXECUTION │<──│  SYSTEM  │  <- 3 concurrent │
│  │  BRAIN   │   │  BRAIN   │   │  BRAIN   │     async loops │
│  │ 200ms    │   │ 200ms    │   │ 500ms    │                 │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘                 │
│       │              │              │                        │
│       └──────────────┼──────────────┘                        │
│                      ▼                                       │
│           ┌──────────────────┐                               │
│           │ BRAIN MESSENGER  │  <- Priority queues           │
│           │ (drainMessages)  │     Override commands         │
│           └────────┬─────────┘                               │
│                    ▼                                         │
│     ┌──────────────┼──────────────┐                          │
│     ▼              ▼              ▼                          │
│ ┌───────┐     ┌───────┐     ┌───────┐                        │
│ │ ALPHA │     │ BETA  │     │ GAMMA │                        │
│ │ build │     │ debug │     │ test  │  <- 9 agents            │
│ │ shark │     │ manta │     │ manta │    3 clusters           │
│ └───────┘     └───────┘     └───────┘                        │
└──────────────────────────────────────────────────────────────┘
```

## 16 Subsystems

| # | Subsystem | Purpose |
|---|-----------|---------|
| 1 | Identity System | 5 markdown files (8609 chars), system prompt injection |
| 2 | Planning Brain | T1 generation (SPEC.md + chat), T2 context (10 files) |
| 3 | Execution Brain | Task supervision, output verification, fire-and-forget detection |
| 4 | System Brain | 6-gate pipeline, L4 domain validation, L2 output checks |
| 5 | Brain Messenger | Priority queues, drainMessages, override commands, ACK |
| 6 | State Store | Domain-owned, write-enforced, watchers |
| 7 | Brain Concurrency | 3 independent async event loops (200ms/200ms/500ms) |
| 8 | L0-L7 Firewall | 9 files, 50+ patterns, wired to tool.execute.before |
| 9 | Evidence Collector | Gate evidence, file verification, persistence |
| 10 | Compaction Survival | session.compacting hook preserves brain state |
| 11 | Subagent Manager Brain | 7 override command handlers |
| 12 | Cluster Manager | 3 clusters, Docker spawn, retry logic (3 attempts) |
| 13 | Delegation Engine | Async task queue, waitForCompletion, brain sync |
| 14 | Kraken Hive | File-based pattern storage, search, 5 seed + 10 T2 |
| 15 | T2 Context | 10 operational knowledge files loaded at init |
| 16 | Session Cleanup | event hook stops brain loops on session end |

## L0-L7 Firewall

| Layer | Name | Blocks |
|-------|------|--------|
| L0 | Identity Wall | Non-Kraken agents writing to protected paths |
| L1 | Orchestration Theater | spawn=done, assigned=complete claims |
| L2 | False Completion | Completion without output retrieval |
| L3 | Output Inspection | Container-only verification |
| L4 | Wrong Cluster | Build→gamma, debug→alpha |
| L5 | Macro Derailment | Focus collision, planner-executor desync |
| L6 | Kraken Protection | SYSTEM/STATE zone violations |
| L7 | Coordination Gates | task-assignment, output-retrieval, roundtable-sync |

## Gate Pipeline

```
PLAN → BUILD → TEST → VERIFY → AUDIT → DELIVERY
  ↑       ↑       ↑        ↑        ↑        ↑
  T2     tasks   outputs   host     security  evidence
 master  spawned  verified  check    audit     collected
```

Gates auto-advance when criteria are met via real mechanical checks (not theatrical).

## Cluster Assignment

| Task Type | Cluster | Agents | Strategy |
|-----------|---------|--------|----------|
| build, create, implement | Alpha | shark-α1, shark-α2, manta-α1 | Aggressive, full speed |
| debug, fix, refactor, analyze | Beta | shark-β1, manta-β1, manta-β2 | Precise, methodical |
| test, verify, audit | Gamma | manta-γ1, manta-γ2, shark-γ1 | Thorough, evidence-based |

## Quick Deploy

```bash
./DEPLOY.sh
```

### opencode.json
```json
{
  "plugin": [
    "file:///home/leviathan/.config/opencode/plugins/kraken-agent/dist/index.js"
  ],
  "permission": { "*": { "*": "allow" } }
}
```

### Environment
```bash
export KRAKEN_IDENTITY_DIR=$HOME/.config/opencode/plugins/kraken-agent/identity
export KRAKEN_PLUGIN_NAME=kraken-agent
export KRAKEN_PLUGIN_DIR=$HOME/.config/opencode/plugins/kraken-agent
```

## Build

```bash
bun run build
# → 123 modules, 630KB, 14ms build time
cp dist/index.js ~/.config/opencode/plugins/kraken-agent/dist/index.js
cp -r kraken-context ~/.config/opencode/plugins/kraken-agent/
```

## Testing

**TUI testing ONLY. `opencode run` does not fire hooks and is BANNED.**

```bash
opencode --agent kraken
```

| Test | Expected |
|------|----------|
| `who are you` | "Kraken Orchestrator, multi-brain execution engine" |
| `show me the current brain status` | Planning/Execution/System initialized, T2 loaded |
| `plan how you would build a CLI app` | Task decomposition with cluster assignment |
| `read kraken context about failure modes` | Returns operational patterns from T2 |
| `search the hive for delegation patterns` | Returns cluster assignment patterns |

## Documentation

| File | Purpose |
|------|---------|
| `docs/COMPACTION_SURVIVAL.md` | Recovery anchor after session loss |
| `docs/ship_report_v5.md` | Full system audit (19 bugs fixed) |
| `docs/DEBUG_LOG.md` | Bug catalog with root cause analysis |
| `docs/BUILD_LOG.md` | Architecture + build documentation |

## Ship History

| Ship | Date | Status | Milestone |
|------|------|--------|-----------|
| V4 | Apr 28 | 🟢 | Identity + T2, 8 P0 bugs fixed |
| V5 | Apr 28 | 🟢 | Integration pipeline |
| V6 | Apr 29 | 🟢 | L0-L7 Firewall + evidence |
| V7 | Apr 29 | 🟢 | Brain concurrency + subagent + hive |
| V8 | May 1-2 | 🟢 | T2 context (10 files) + message drain |
| **V9** | **May 2** | **🟢** | **19 bugs fixed, identity override removed, 16/16 subsystems verified** |

## Bundle

- **Size:** 630KB
- **Modules:** 123
- **Source files:** 59 TypeScript
- **T2 context:** 10 operational knowledge files
- **Build time:** ~14ms (bun)
