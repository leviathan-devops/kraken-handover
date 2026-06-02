# PLUGIN ENGINEERING - DOMAIN INDEX

## Contents
- TUI-TESTING-BIBLE.md - MANDATORY read before any testing
- PLUGIN-SHIPPING-SOP.md - Build/deploy procedure
- BOILERPLATE-CATALOG.md - 6 production templates
- HOOK-ARCHITECTURE.md - All 18 hooks explained

## Quick Reference

### Plugin Ship SOP (from boilerplate)
1. `bun run build`
2. `cp dist/index.js ~/.config/opencode/plugins/<agent>/dist/`
3. REMOVE old from opencode.json
4. ADD new plugin path
5. Verify opencode.json structure
6. TUI container test (NOT `opencode run`)
7. Rollback from .bak if broken

### Hook Execution Order
1. command.execute.before
2. tool.execute.before (Guardian enforcement)
3. [TOOL EXECUTION]
4. tool.execute.after
5. chat.message (brain init)
6. experimental.chat.messages.transform
7. experimental.chat.system.transform

### Agent Tab Toggle Registration
```javascript
agent: { myagent: { mode: "primary", hidden: false } }
```
MUST have both direct agent property AND config callback.

### 5 Standard Hooks
1. session-hook - Init gates, coordinator
2. system-transform-hook - Brain context injection
3. guardian-hook - Security checks
4. gate-hook - Evidence + gate advancement
5. compacting-hook - State snapshots

## Critical Rules
- `opencode run` does NOT fire hooks - BANNED for testing
- Container test is the ONLY valid test
- Bundle content != runtime behavior