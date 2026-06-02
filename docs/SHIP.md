# KRAKEN v1.2.9.2 - BRICKED CONFIG SOLVED

## SHIP DATE: 2026-05-11

## PROBLEM
Kraken v1.2 caused TUI to crash with 400 error on `/config` endpoint after working for 5+ weeks.

## ROOT CAUSE
kraken's `config` callback set agent `tools` to full tool definition objects instead of boolean filters.

```javascript
// WRONG (caused 400):
tools: getAgentTools(id)  // Returns: { spawn_cluster_task: tool({...}), ... }

// CORRECT:
tools: Object.fromEntries(Object.keys(getAgentTools(id)).map(t => [t, true]))
// Returns: { spawn_cluster_task: true, ... }
```

## FIX APPLIED
In `dist/index.js` (line ~17363 and ~17373), replaced:
```javascript
tools: getAgentTools(id)
```
With:
```javascript
tools: Object.fromEntries(Object.keys(getAgentTools(id)).map(t => [t, true]))
```

## BUILD INSTRUCTIONS
```bash
cd /path/to/v1.2.9.2-bricked-config-solved
bun install
bun run build  # or: bun build src/index.ts --outdir dist --target bun --format esm --bundle
```

## DEPLOY
```bash
# Copy dist/index.js to production path
cp dist/index.js /home/leviathan/OPENCODE_WORKSPACE/Shared\ Workspace\ Context/Kraken\ Agent/NUKE\ RELOAD/v1.2_ship_v9_identity_hotfix/dist/index.js
```

## CONTENTS
- `src/` - TypeScript source (full codebase)
- `dist/` - Compiled bundle (FIXED)
- `wrappers/` - Python wrappers for subagent execution
- `subagent-manager/` - Container execution plugin
- `identity/` - Orchestrator identity files
- `kraken-context/` - T2 reference patterns

## VERIFICATION
```bash
# Start container with just kraken
docker run -d --rm \
  -v /tmp/snap-test:/root/.config/opencode \
  opencode-test:1.14.34 \
  /bin/sh -c '/usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode --agent kraken 2>&1; sleep 3600'
# Should load without 400 error
```

## FILES CHANGED
Only `dist/index.js` was modified. The fix converts tool definitions to boolean filters.

