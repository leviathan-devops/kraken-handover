# SHIP MANIFEST — Kraken Agent v1.3

**Ship Date:** 2026-06-03
**Prepared for:** External model review
**Package:** `SHIP_PACKAGE_KRAKEN_V1.3_20260603_031358/`

---

## Contents

| Path | Size | Description |
|------|------|-------------|
| `FULL_CONTEXT_HANDOVER.md` | 13,671 lines / 439KB | Complete consciousness transfer — all source, architecture, T2 context, identity, bibles, decisions |
| `dist/kraken-agent.js` | 627,011 bytes | Built bundle (bun build, 142 modules) |
| `src/` | 59 TS + 3 PY files | Full TypeScript source tree |
| `identity/orchestrator/` | 5 files | KRAKEN.md, IDENTITY.md, EXECUTION.md, QUALITY.md, TOOLS.md |
| `kraken-context/` | 11 files | T2_ARCHITECTURE, T2_BUILD_CHAIN, T2_FAILURE_MODES, T2_PATTERNS, T2_KRAKEN_RULES, T2_COMPACTION_SURVIVAL, T2_CRASH_RECOVERY, T2_TUI_TESTING, T2_ALIGNMENT_BIBLE, T2_KRAKEN_LIGHTNING_MODE, T2_PLUGIN_ENGINEERING |
| `evidence/` | 1 file | ContainerTestResult.json |
| `docs/` | (placeholder) | Build logs and documentation |
| `package.json` | - | NPM package config |

## Architecture Summary

```
Kraken Orchestrator (kraken)
├── Planning Brain — T2 context, T1 generation, task decomposition
├── Execution Brain — supervision, output verification, override commands
├── System Brain — 6-gate pipeline, L0-L7 firewall, security
├── 3 Clusters (Alpha/Beta/Gamma) — 9 agents total
├── Async Delegation Engine — priority queue, brain sync
├── Kraken Hive Mind — file-based pattern/failure memory
└── Identity System — 5-file orchestrator identity
```

## Key Files for Review

1. **`src/index.ts`** — Plugin entry, agent configs, all hooks (849 lines)
2. **`src/brains/execution/execution-brain.ts`** — Task supervision engine
3. **`src/brains/system/system-brain.ts`** — Gate evaluation + L4 validation
4. **`src/factory/AsyncDelegationEngine.ts`** — Priority task delegation
5. **`src/brains/system/firewall/index.ts`** — L0-L7 firewall pipeline
6. **`src/clusters/ClusterInstance.ts`** — Docker container spawning
7. **`src/tools/cluster-tools.ts`** — spawn_shark_agent, spawn_manta_agent
8. **`src/identity/loader.ts`** — File-based identity loading

## Current Blockers

| ID | Severity | Bug |
|----|----------|-----|
| K1 | CRITICAL | `chat.message` hook uses `input.agent` which is empty in opencode 1.14 — identity never injected |
| K2 | HIGH | Trident v4.2 guard leaks identity to all agents when agentName is empty |
| K3 | MEDIUM | IdentityLoader can't find identity at container path without env var |

## Reviewer Instructions

1. Read `FULL_CONTEXT_HANDOVER.md` first (complete project context)
2. Review source in `src/` for architecture correctness
3. Verify bundle at `dist/kraken-agent.js`
4. Check identity files at `identity/orchestrator/`
5. Review T2 operational context at `kraken-context/`
6. Note the two identity bugs (K1, K2) documented in Section 21 of handover

## Environment

- **Host:** opencode 1.14.43
- **Container:** opencode-test:1.14.43
- **Model:** deepseek/deepseek-v4-flash
- **KRAKEN_IDENTITY_DIR:** `~/.config/opencode/plugins/kraken-agent/identity`
