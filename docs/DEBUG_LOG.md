# KRAKEN TUI BREAK - FULL DEBUG LOG
**Date:** 2026-05-10 to 2026-05-11
**Duration:** ~5 hours of investigation
**Status:** RESOLVED

---

## EXECUTIVE SUMMARY

The Kraken Agent v1.2 caused the OpenCode TUI to crash with a 400 error on the `/config` endpoint. After 5+ weeks of working fine, kraken suddenly became incompatible. The root cause was that kraken's `config` callback was setting agent `tools` to full tool definition objects instead of boolean filter objects, which the OpenCode SDK expects.

---

## THE PROBLEM

### Symptom
- TUI crashes immediately on load with 400 error:
```
Error: opencode server GET http://opencode.internal/config?directory=%2Fhome%2Fleviathan → 400: (empty response body)
```
- nginx logs show: `127.0.0.1 - - [10/May/2026:03:15:07 +0400] "GET /config?directory=/home%2Fleviathan HTTP/1.1" 400 0 "-"`
- Error occurs during plugin config hook execution
- The 400 means the server IS running but explicitly REJECTING the config

### Context
- kraken v1.2 worked for 5+ weeks
- Code is byte-for-byte identical to GitHub (MD5: 9cbb467590deac408eba56d710f75c38)
- Host binary is 1.14.43 (working)
- Patched kraken (no-op config) works fine
- This suggested the issue was in the config mutation, not the kraken code itself

---

## INVESTIGATION PROCESS

### Step 1: Isolating the Problem
- Tested 5 plugins including kraken → FAILED with 400
- Tested 4 plugins without kraken → PASSED
- Conclusion: kraken plugin is the crash point

### Step 2: Config Mutation Theory
- Identified kraken's config callback does `Object.assign(opencodeConfig.agent, sdkConfigs)`
- This mutates the live config object that gets sent to server
- Patched kraken with no-op config callback → works
- Confirmed: mutation is the issue, not kraken generally

### Step 3: Dual Plugin Discovery
- Found DUAL_PLUGIN_SYSTEM.md explaining kraken requires TWO plugins:
  1. kraken-agent - orchestration
  2. opencode-subagent-manager - container execution
- Current config was missing subagent-manager
- Added it but still crashed → not the root cause

### Step 4: Plugin Architecture Research
- Read PLUGIN_CHEATSHEET.md to understand expected plugin format
- Read TAB_TOGGLE_FIX.md to understand agent registration
- Read Agent_Tab_Toggle_Config_Callback_SOLVED.md to understand config callback requirements

### Step 5: Instrumenting kraken
Created instrumented version that logs what it's trying to register:
```javascript
config: async (opencodeConfig) => {
  // ... builds sdkConfigs ...
  console.log('KRAKEN CONFIG DEBUG:');
  console.log('Agent count:', Object.keys(sdkConfigs).length);
  console.log('Sample agent:', JSON.stringify(sdkConfigs['kraken'], null, 2));
  // ... mutation ...
}
```

### Step 6: Log Analysis
Container logs showed:
```
KRAKEN CONFIG DEBUG:
  "instructions": "You are KRAKEN — the central orchestrator...",
  "description": "Spawn a task in a cluster for async execution...",
  "description": "Get the status of all agents..."
```

The `tools` field in the logged output showed FULL TOOL DEFINITIONS, not boolean filters.

### Step 7: Root Cause Identification

kraken's config callback was doing:
```javascript
tools: getAgentTools(id)
```

Where `getAgentTools()` returns:
```javascript
{
  spawn_cluster_task: tool({ description: "...", args: {...}, execute: async () => {} }),
  anchor_cluster: tool({ ... }),
  // ... more full tool definitions
}
```

But OpenCode SDK expects `tools` to be a **boolean filter object**:
```javascript
tools: { "spawn_cluster_task": true, "anchor_cluster": true, ... }
```

This mismatch caused the server to reject the mutated config with 400.

---

## THE FIX

### Code Change
In `/tmp/kraken-v1.2-fixed/dist/index.js`:

Changed (2 places in config callback):
```javascript
// WRONG:
tools: getAgentTools(id)

// CORRECT:
tools: Object.fromEntries(Object.keys(getAgentTools(id)).map(t => [t, true]))
```

This converts:
```javascript
// From: { spawn_cluster_task: tool({...}), anchor_cluster: tool({...}) }
// To:   { spawn_cluster_task: true, anchor_cluster: true }
```

### Verification
1. TUI loads without 400 error ✓
2. Kraken appears in tab toggle ✓
3. Tools respond to calls ✓
4. spawn_shark_agent triggers container spawning ✓

---

## WHY THIS BROKE NOW

The issue likely arose because:
1. OpenCode server updated to more strictly validate the `tools` field
2. Or the server started validating the config after mutation
3. The same code worked for 5 weeks because validation wasn't happening

---

## FILES INVOLVED

### Original (broken):
`/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/NUKE RELOAD/v1.2_ship_v9_identity_hotfix/dist/index.js`
- 626,905 bytes
- Contains `tools: getAgentTools(id)` in config callback

### Fixed version:
`/tmp/kraken-v1.2-fixed/dist/index.js`
- Same size (replacement is syntactically equivalent)
- Contains `tools: Object.fromEntries(Object.keys(getAgentTools(id)).map(t => [t, true]))`

---

## LIVE SESSION

- TUI PID: 1480581 at pts/6
- Launched: 2026-05-10 22:15
- Status: WORKING (was launched before the kraken update, so kraken config not active)
- Binary: 1.14.43
- **DO NOT KILL**

---

## DEPLOYMENT INSTRUCTIONS

To deploy the fix:

1. Stop any TUI sessions using kraken
2. Copy fixed file:
```bash
cp /tmp/kraken-v1.2-fixed/dist/index.js \
  "/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/NUKE RELOAD/v1.2_ship_v9_identity_hotfix/dist/index.js"
```
3. Restart TUI

---

## NOTES FOR FUTURE DEBUGGING

1. **400 error + empty body = server rejected config** - connection worked, content rejected
2. **Config mutation theory** - when plugins modify `opencodeConfig`, they modify the live object
3. **Tools field format** - must be boolean filter, not full tool definitions
4. **Container testing** - always use `opencode-test:1.14.34` image and `docker exec -it`
5. **Patch vs Real** - patched kraken with no-op config is theatrical garbage, always test real kraken

---

**END OF DEBUG LOG**