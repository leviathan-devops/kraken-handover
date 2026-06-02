# HOOK ARCHITECTURE

## Hook Execution Order

1. `command.execute.before` - Agent command dispatcher
2. `tool.execute.before` - Guardian enforcement (BLOCKING)
3. **[TOOL EXECUTION]**
4. `tool.execute.after` - Gate advancement, evidence collection
5. `chat.message` - Brain initialization
6. `experimental.chat.messages.transform` - Message transform
7. `experimental.chat.system.transform` - System prompt injection

## 5 Standard Hooks

| Hook | Purpose |
|------|---------|
| session-hook | Init gates, coordinator, state directory |
| system-transform-hook | Inject brain/gate context into system prompts |
| guardian-hook | tool.execute.before security checks |
| gate-hook | tool.execute.after evidence + gate advancement |
| compacting-hook | State snapshots during compaction |

## Safe Hook Pattern
```javascript
const myHook = safeHook(async (input, output, ctx) => {
  if (!ctx.isMyAgent()) return;
  // logic
}, { agentFilter: [...], pluginName, managedAgents, agentPrefix, orchestratorName });
```

## Evidence Variable Ordering
In gate hooks, `buildEvidenceRecord()` MUST be called BEFORE `checkGateAdvance()`.