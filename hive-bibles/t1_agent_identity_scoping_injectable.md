# T1: Agent Identity Scoping Injectable

**Type:** T1 Injectable (copy-paste implementation)
**T2 Bible:** T2_AGENT_IDENTITY
**Purpose:** Drop-in implementation checklist for scoping agent identity to prevent cross-agent contamination. Works for ANY plugin agent (Kraken, Shark, Trident, new agent).

## 5 FILES TO CREATE/MODIFY:

### FILE 1: `src/shared/agent-identity.ts` (NEW)
```typescript
const MY_AGENTS = new Set(['REPLACE_WITH_YOUR_AGENT_NAME']);
const MY_PREFIX = 'REPLACE_WITH_YOUR_PREFIX-';
export function isMyAgent(agentName: string | undefined): boolean {
  if (!agentName) return false;
  return MY_AGENTS.has(agentName) || agentName.startsWith(MY_PREFIX);
}
```

### FILE 2: `src/hooks/v4.1/agent-state.ts` (NEW)
Session-keyed Map with setCurrentAgent(agent, sessionId), getCurrentAgent(sessionId), clearCurrentAgent(sessionId). Always pass sessionId.

### FILE 3: `src/hooks/v4.1/session-hook.ts` (NEW — CRITICAL)
```typescript
export function createSessionHook(): Hooks['event'] {
  return async (input) => {
    const event = input.event as { type?: string; sessionId?: string; agent?: string };
    if (!event?.type) return;
    if (!isMyAgent(event.agent)) { setCurrentAgent(undefined, event.sessionId); return; }
    setCurrentAgent(event.agent, event.sessionId);
    if (event.type === 'session.ended') { setCurrentAgent(undefined, event.sessionId); clearCurrentAgent(event.sessionId); }
  };
}
```

### FILE 4: `src/hooks/v4.1/system-transform-hook.ts` — ADD identity gate at TOP
```typescript
const agent = getCurrentAgent(sessionId) || ctx?.agentName || '';
if (!isMyAgent(agent) && !agent.startsWith('my-prefix-')) return;
systemOutput.system.unshift(formatIdentity()); // unshift = first, highest priority
```
REMOVE any `identityInjected` boolean guard. Use `agentFilter: null`.

### FILE 5: `src/hooks/v4.1/index.ts` — REGISTER hooks
```typescript
'event': createSessionHook(),                              // UNWRAPPED — core
'chat.message': createChatMessageHook(),                   // UNWRAPPED
'tool.execute.before': createGuardianHook(),               // UNWRAPPED
'experimental.chat.system.transform': createSystemTransformHook(), // UNWRAPPED, agentFilter: null
'command.execute.before': safeHook(createCmdHook(), { agentPrefix: 'YOUR-PREFIX-' }),  // WRAPPED
```

## HOOK REGISTRATION RULES:
- `event`, `chat.message`, `system.transform`, `tool.execute.before` → UNWRAPPED (must detect agent)
- Everything else → safeHook (can be fully filtered)

## VERIFICATION:
Load alongside 2+ other agents, tab-toggle through all, send "who are you" on each. Only your agent should show your identity.

## COMMON FAILURES:
| Symptom | Fix |
|---------|-----|
| Build agent says "I am SHARK" | session-hook not registered as 'event' hook |
| Identity drifts later | identityInjected guard preventing re-injection |
| Identity ignored by model | Use unshift NOT push; use agentFilter: null |
| Firewall blocks non-plugin agents | guardian missing if (!sessionAgent) return |
| Tab-toggle doesn't clear | handleSessionEnded missing clearCurrentAgent(sessionId) |