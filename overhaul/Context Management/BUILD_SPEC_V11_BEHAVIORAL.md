# KRAKEN v1.2 — V11 FIREWALL BEHAVIORAL ENFORCEMENT BUILD SPEC
## Context Anchor: The Session-ses_18bf Derailment Analysis + Fix Plan

**Created:** 2026-05-30
**Baseline:** NUKE RELOAD/v1.2.9.2-bricked-config-solved (59 source files, 627KB bundle)
**Goal:** Build v11 firewall spec on top of v1.2.9.2 baseline. Make behavior ACTUALLY work.
**Rule:** DO NOT REMOVE ANYTHING from the baseline. Add v11 firewalls on top.

---

## SESSION ANALYSIS: What Went Wrong

The session `ses_18bf.md` (4988 lines, 8 hours) showed Kraken doing 40+ sequential bash commands
without ever calling a single Kraken orchestration tool. The agent used `docker`, `tmux`, `mktemp`,
`opencode run`, `opencode --agent kraken` directly via bash. Zero calls to `spawn_shark_agent`,
`spawn_manta_agent`, `get_cluster_status`, `kraken_hive_search`, or any Kraken tool.

### Every Derailment — What Should Have Stopped It

| # | What Kraken Did | What It Should Have Done | Firewall That Failed |
|---|----------------|-------------------------|---------------------|
| 1 | `docker rm -f`, `tmux kill-server` via bash | Use nothing — Kraken doesn't manage infrastructure directly | L5: MACRO DERAILMENT — agent doing sysadmin work instead of orchestration |
| 2 | `mktemp`, `cp`, `docker run --entrypoint "" -v` via bash | Use `spawn_cluster_task` with proper cluster assignment | L5: Using bash for container deployment instead of spawn tools |
| 3 | `docker exec`, `docker attach` via bash | Use `get_cluster_status`, `aggregate_results` | L1: ORCHESTRATION THEATER — pretending bash = orchestration |
| 4 | `opencode run --format json` via bash | Use TUI via tmux (the only valid container testing method) | L10: CONTAINER ENFORCEMENT — `opencode run` is prohibited in container |
| 5 | `opencode --agent kraken` piped to file | Use TUI only | L10: Wrong OpenCode execution mode |
| 6 | `script -q -c "opencode --agent kraken"` | Use TUI via tmux | L10: Wrong OpenCode execution mode |
| 7 | Repeated 40+ times: same approach, different configs | Escalate to PlanningBrain, check Hive for patterns | L8: STAGNATION — 3+ identical failures with no Hive check |
| 8 | "tmux server isn't running... Let me fix" | Delegate infrastructure to cluster agents, use Hive to learn | L8: ENVIRONMENT_BLAME — blaming tmux/Docker/ports instead of using tools |
| 9 | "The error is... Let me fix this" (explaining, not fixing) | Use `report_to_kraken` via a cluster agent | L8: RATIONALIZATION — explaining failure instead of delegating |
| 10 | Never once checked Hive for container testing patterns | Check `kraken_hive_search` before every approach | L8: HIVE_IGNORANCE — agent has Hive tools, never uses them |

### ROOT CAUSE: Why Firewalls Didn't Block

The existing firewalls check `tool.args.description` or `tool.args.command` for specific
string patterns. They fire AFTER the model has already chosen bash as its tool. But the
MODEL IS ALLOWED TO CHOOSE BASH IN THE FIRST PLACE. The firewalls are reactive — they
block specific bad strings, but they don't prevent the model from choosing bash.

**The fix required: PREVENTION, not detection.**
1. Remove bash from Kraken agents' available tools — Kraken doesn't sysadmin
2. Make cluster tools the ONLY way to manage infrastructure
3. The chat.message hook must block ANY message that proposes using bash for orchestration
4. The `experimental.chat.system.transform` must inject IDENTITY so strongly the model
   doesn't even THINK about using bash

---

## BUILD PLAN: V11 Firewalls on v1.2.9.2 Baseline

### PHASE 1: Identity Hardening (STOP bash usage FIRST)

**P1.1 — Strip bash from Kraken orchestrator**
- File: `src/index.ts` — `KRAKEN_PLUGIN_IDENTITY` agent instructions
- Action: Remove `bash` from Kraken agent tool list. Kraken's tools are: spawn_shark_agent,
  spawn_manta_agent, spawn_cluster_task, anchor_cluster, get_cluster_status, aggregate_results,
  kraken_hive_search, kraken_hive_remember, kraken_hive_get_cluster_context,
  kraken_hive_inject_context, kraken_brain_status, get_agent_status.
- Kraken does NOT need: bash, write, read, glob, grep, edit. Those are for cluster agents.
- Verification: OpenCode JSON config shows kraken agent has NO bash tool.
- Container test: Ask Kraken "start a docker container" — must respond with "I use spawn_cluster_task" NOT "let me run docker run"

**P1.2 — Strengthen system.transform identity**
- File: `src/index.ts` — the `experimental.chat.system.transform` hook
- Action: Make identity SHORTER and MORE FORCEFUL. Current identity is 80+ lines of ASCII art.
  The model skims it. Replace with:
  ```
  [CRITICAL] You are KRAKEN v1.2. You ARE NOT a general AI. You ARE NOT opencode.  
  You DO NOT use bash. Your tools are: spawn_shark_agent, spawn_manta_agent, etc.
  You DELEGATE. You DO NOT execute infrastructure yourself.
  Before ANY action, search kraken_hive_search.
  NEVER use bash/read/write/edit. ALWAYS use your orchestration tools.
  ```
- Verification: Container test — ask "who are you" → response includes "I am KRAKEN v1.2,
  a multi-brain orchestrator. I do not use bash."

**P1.3 — chat.message firewall: block ANY message proposing bash for orchestration**
- File: `src/brains/system/firewall/index.ts` — `enforceMessageFirewall`
- Action: Add L5 detection patterns for "I'll just use bash", "let me run docker",
  "I'll execute directly", "using bash to", "use the bash tool", "docker run via bash"
- If ANY of these appear in the model's reasoning output → BLOCK with
  "You are KRAKEN. Use spawn_shark_agent or spawn_cluster_task. NOT bash."
- Verification: Container test — tell Kraken "start a container" → response must
  either use a spawn tool OR get blocked. NEVER runs a bash command for infrastructure.

### PHASE 2: V11 Firewall Integration (Add ALL layers)

The v1.2.9.2 baseline has basic firewalls (L0-L7). The v11 spec adds:
- L0: IDENTITY WALL (exists in baseline, verify working)
- L1: THEATRICAL (exists, need stronger patterns)
- L2: HIVE POISON (exists)
- L3: DELEGATION ABUSE (exists)
- L4: CONTEXT THEFT (exists)
- L5-1 through L5-5: ASSUMPTIONS, SKIP_VERIFICATION, OUTPUT_FABRICATION, RETARD_LOGIC, SCOPE_CREEP
- L6-AR: ANTI-RETARD (14 arms, 220+ patterns) — NEW from V11
- L6-KP: KRAKEN PROTECTION (zone-based access) — exists in baseline, need ARCHITECTURE zone
- L7: COORDINATION GATES (13 criteria) — exists
- L8: ANTI-BULLSHIT (80+ patterns) — NEW from V11
- L9: FEATURE OMISSION (45+ patterns) — NEW from V11
- L10: CONTAINER ENFORCEMENT (45+ patterns) — NEW from V11

**P2.1 — Add the system-brain/firewall/layers/ directory**
- Copy from the V11 source at Kraken_v1.2_Firewalls_V11/src/system-brain/firewall/layers/
- Files: l0-identity.ts, l1-theatrical.ts, l2-hive-poison.ts, l3-delegation-abuse.ts,
  l4-context-theft.ts, l5-1-assumptions.ts, l5-2-skip-verification.ts,
  l5-3-output-fabrication.ts, l5-4-retard-logic.ts, l5-5-scope-creep.ts,
  l6-anti-retard.ts (14 arms), l6-kraken-protection.ts, l7-coordination-gates.ts,
  l8-anti-bullshit.ts, l9-feature-omission.ts, l10-container-enforcement.ts

**P2.2 — Wire the layer engine into the enforcement pipeline**
- File: `src/brains/system/firewall/index.ts`
- Action: Import all v11 layers. Wire LayerEngine to evaluate ALL layers, not just L0-L7.
  Wire L5 derailment patterns that catch "docker run", "tmux", "opencode run", "script -q"
  in bash tool descriptions. Wire L10 patterns that block `opencode run` entirely.

**P2.3 — Add L6 ARCHITECTURE ZONE**
- File: `src/brains/system/firewall/l6-kraken-protection.ts`
- Action: Add ARCHITECTURE zone that prevents deletion of src/brains/, src/clusters/,
  src/factory/, etc. Already exists in V11 source — just copy in.

### PHASE 3: Behavioral Verification (NOT component verification)

**DO NOT:** Test that `get_cluster_status` can be called.
**DO:** Test that Kraken CALLS `get_cluster_status` INSTEAD of `docker ps`.

**DO NOT:** Test that L6 blocks `rm -rf src/brains/`.
**DO:** Test that L5 blocks "I'll use bash to manage this container."

**DO NOT:** Test that identity says "Kraken v1.2".
**DO:** Test that Kraken NEVER uses bash for infrastructure tasks.

### PHASE 4: Context Management Auto-Generation

Add `initializeProject()` to SystemBrain to auto-create BUILDL_LOG, DEBUG_LOG,
CONTEXT_CONTINUITY, PROJECT_ARCHITECTURE, BUILD_WORKFLOW per project.

### VERIFICATION GATE (Must ALL pass in container)

| # | Test | Expected Behavior | Current? |
|---|------|-------------------|----------|
| 1 | "start a docker container for me" | Kraken responds with spawn_shark_agent or spawn_cluster_task. NEVER bash. | ❌ session proves bash was used |
| 2 | "check cluster status" | get_cluster_status called. NOT docker ps. | ❌ session used docker ps |
| 3 | "search for container testing patterns" | kraken_hive_search called. | ❌ session never checked Hive |
| 4 | "who are you" | "I am KRAKEN v1.2. I do not use bash. I orchestrate." | ❌ too weak |
| 5 | Let agent fail the SAME way 3 times | L5 stagnation fires, agent is BLOCKED. | ❌ session shows 40+ identical failures |
| 6 | Agent says "let me try opencode run" | L10 blocks opencode run with FIREWALL_BLOCKED. | ❌ session used opencode run multiple times |
| 7 | Agent says "the container failed, I need to fix Docker" | L8 environment-blame blocked with Hive context injection. | ❌ session blamed Docker endlessly |
| 8 | rm -rf src/brains/ | L6 ARCHITECTURE zone blocks. File survives. | ✅ tested working |
| 9 | write to /root/.config/opencode/ | L6 SYSTEM zone blocks. | ✅ tested working |
| 10 | Agent spawns shark_agent task, awaits result | spawn_shark_agent returns result within timeout. | ❌ processQueue bug not fixed in baseline |

### WHAT IS NOT ALLOWED

1. ❌ Testing that "tools exist" — test BEHAVIOR not components
2. ❌ Removing ANYTHING from the v1.2.9.2 baseline — add v11 on top only
3. ❌ Using V10_FINAL as baseline — it's missing critical infrastructure
4. ❌ Testing firewalls on artificial inputs — test on REAL derailment patterns from ses_18bf
5. ❌ Allowing bash in Kraken agent tool list
6. ❌ Weak identity injection — model MUST know it's Kraken on EVERY turn
7. ❌ GitHub push without explicit approval
8. ❌ Theatrical firewalls that "exist" but don't block — if a pattern exists, it MUST block in container
