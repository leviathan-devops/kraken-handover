# KRAKEN TUI BREAK - COMPACTION SURVIVAL DOC

## CRITICAL INSTRUCTIONS
1. **DO NOT KILL THE LIVE SESSION** (PID 1480581 at pts/6) - it was launched BEFORE kraken update
2. **PATCHED KRAKEN IS THEATRICAL GARBAGE** - Ignore it, there is only real kraken
3. **AUTONOMOUSLY WORK UNTIL FULLY SOLVED** - Do not stop for any reason
4. **REINJECT CONTEXT AFTER EVERY COMPACTION**

## ROOT CAUSE & SOLUTION

### Problem
kraken's `config` callback set `tools` to **full tool definition objects** instead of **boolean filters**.

### Wrong (caused 400):
```javascript
tools: getAgentTools(id)
// Returns: { spawn_cluster_task: tool({...}), anchor_cluster: tool({...}), ... }
```

### Correct (fixed):
```javascript
tools: Object.fromEntries(Object.keys(getAgentTools(id)).map(t => [t, true]))
// Returns: { spawn_cluster_task: true, anchor_cluster: true, ... }
```

### Fix Applied
```bash
# Replace in kraken config callback (2 places):
tools: getAgentTools(id)
# With:
tools: Object.fromEntries(Object.keys(getAgentTools(id)).map(t => [t, true]))
```

### Fixed File
`/tmp/kraken-v1.2-fixed/dist/index.js`

### To Deploy
Copy fixed file to path in opencode.json:
```
/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/NUKE RELOAD/v1.2_ship_v9_identity_hotfix/dist/index.js
```

---

## TEST RESULTS: 2026-05-11 00:50 UTC

### ✓ FIX VERIFIED

1. **TUI loads without 400 error** - kraken config mutation no longer crashes
2. **Kraken agent appears in tab toggle** - mode: primary works
3. **Tools are registered and callable** - spawn_cluster_task, spawn_shark_agent respond
4. **spawn_shark_agent invokes subagent containers** - ClusterInstance spawning works

### Subagent execution failures (expected)
Wrapper path `/root/.config/opencode/plugins/kraken-agent/wrappers/opencode_agent.py` missing - deployment issue, not code issue.

---

## LIVE SESSION STATUS
- TUI PID: 1480581 at pts/6
- Launched: 2026-05-10 22:15 (BEFORE kraken update)
- Status: WORKING - kraken config NOT active
- Binary: 1.14.43
- **DO NOT KILL**

## CONTAINER TESTING BIBLE
- Image: `opencode-test:1.14.34`
- Binary: `/usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode`
- Use `docker exec -it` NOT `docker attach`
- Wait 28 seconds for DB migration

---

## DUAL PLUGIN SYSTEM

Kraken requires **TWO plugins**:
1. **kraken-agent** - Orchestration & cluster management
2. **opencode-subagent-manager** - Container-level parallel execution

Both must be present in opencode.json for full functionality.

## NOTES

- Original config was 733 bytes
- User says original was 900+ bytes
- Config mutation adds 11 agents with long instruction strings
- V1_ORIGINAL hive-mind source at `/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Hive Mind Plugin/V1_ORIGINAL/`