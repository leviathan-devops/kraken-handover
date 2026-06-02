# T2_AGENT_IDENTITY — Agent Identity Architecture Bible

## Multi-Agent Identity Scoping in OpenCode Plugin Environments

**Verified:** 2026-05-28 — Tested with Shark v4.9 + Trident v3.3.3 + Kraken v1.2 + Build + Plan agents simultaneously in opencode-test:1.14.34 container. Zero cross-contamination.

### T1 Injectable: `t1_agent_identity_scoping_injectable` — 5-file copy-paste implementation checklist

### THE CORE MECHANISM: `Hooks['event']` Session Lifecycle

OpenCode fires `Hooks['event']` on every session lifecycle change. The input contains `event.type` ('session.created' or 'session.ended'), `event.sessionId`, and `event.agent` (the authoritative source for "which agent is active"). This fires on EVERY tab toggle.

### THREE-LAYER SCOPING:
1. **session-hook.ts (event handler)** — PRIMARY GATE: catches session.ended to clear agent state, session.created to set agent. Non-our agents get `setCurrentAgent(undefined)`. This is the ONLY reliable tab-toggle detection mechanism.
2. **system-transform-hook.ts** — Identity injection: `if (!isMyAgent) return` before any injection. Use `unshift` (not `push`) for identity. Use `agentFilter: null`. Inject on EVERY transform (no boolean guards).
3. **guardian-hook.ts** — Firewall gate: `if (!sessionAgent) return` at top. Non-our agents exit immediately with zero processing.

### 5 FILES TO CREATE:
1. `src/shared/agent-identity.ts` — `isMyAgent()` function
2. `src/hooks/v4.1/agent-state.ts` — session-keyed `Map<sessionId, AgentState>` with setCurrentAgent/getCurrentAgent/clearCurrentAgent
3. `src/hooks/v4.1/session-hook.ts` — CORE: `Hooks['event']` with session.created/session.ended handling
4. `src/hooks/v4.1/system-transform-hook.ts` — identity injection with isMyAgent gate
5. `src/hooks/v4.1/index.ts` — register 'event' hook (unwrapped), safeHook for others

### 7 COMMON FAILURE MODES:
1. Build agent gets our firewall → session.ended doesn't call clearCurrentAgent(sessionId)
2. Identity drifts after first message → identityInjected boolean guard
3. Identity overridden by default prompt → push instead of unshift
4. setCurrentAgent pollutes non-our agent → called unconditionally
5. agentFilter blocks system.transform → input has no agent field
6. session.ended clears wrong session → missing sessionId parameter
7. Tools visible to other agents → normal, only identity+firewall must be scoped

### VERIFICATION:
Load alongside 2+ other agents, tab-toggle through all, send "who are you" on each, verify only your agent has your identity.

### GOLDEN RULE:
Every identity-bearing hook MUST gate on agent identity at its FIRST instruction. `if (!isMyAgent) return;` before any state mutation. `Hooks['event']` is the ONLY reliable tab-toggle detection mechanism.

### FILESYSTEM:
- T2 bible: `/home/leviathan/OPENCODE_WORKSPACE/kraken-context/T2_AGENT_IDENTITY.md`
- T1 injectable: `/home/leviathan/OPENCODE_WORKSPACE/kraken-context/t1_agent_identity_scoping_injectable.md`
- Full bible: `/home/leviathan/OPENCODE_WORKSPACE/SHIP_PACKAGE_v4.9_2026-05-12/docs/AGENT_IDENTITY_ARCHITECTURE_BIBLE.md`

### PATTERN ORIGIN:
Trident Enhanced Manta session-hook.ts at `/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/Active Projects/Trident Enhanced Manta/src/hooks/v4.1/session-hook.ts`

### PRODUCTION VERIFIED:
Shark v4.9 multi-agent test: all 5 agents (Shark/Trident/Kraken/Build/Plan) maintain correct identity. Zero cross-contamination.