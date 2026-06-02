# PLUGIN-ENGINEERING-BIBLE v1.0 — Build, Ship & Operate Agents

## THE GOLDEN RULE
**SKILL ≠ PLUGIN.** A Skill is markdown knowledge. A Plugin is compiled JavaScript loaded by OpenCode. Never confuse them.

---

## CROSS-REFERENCES

| For | Read |
|-----|------|
| Building agents | `kraken/KRAKEN-BIBLE.md` |
| Container testing deep dive | `plugin-engineering/TUI-TESTING-BIBLE.md` |
| System internals | `system/SYSTEM-BIBLE.md` |
| Debugging build failures | `failures/FAILURES-BIBLE.md` |
| Guardian (if locking files) | `guardian/GUARDIAN-BIBLE.md` |
| Corrupted plugin recovery | `plugin-engineering/NUKE_RELOAD_BIBLE.md` |

---

## PART 0: QUICK START — PLUGIN BUILD SEQUENCE

### The Mandatory Pipeline

```
1. SOURCE CHANGES
   └── src/index.ts, src/tools/*.ts, src/hooks/*.ts

2. BUILD
   └── bun run build → dist/index.js

3. DEPLOY
   └── cp dist/index.js ~/.config/opencode/plugins/{plugin-name}/dist/index.js

4. VERIFY CONFIG
   └── cat opencode.json → confirm single plugin entry

5. TEST IN CONTAINER
   └── opencode tui → verify hooks fire → smoke test tools

6. SHIP
   └── git tag vX.Y.Z → record bundle hash
```

### Pre-Flight Checklist

```
[ ] Old plugin REMOVED from opencode.json
[ ] Source changes complete
[ ] TypeScript compiles: bun tsc --noEmit
[ ] Lint clean: npm run lint (if exists)
[ ] Build succeeds: bun run build
[ ] dist/index.js exists
[ ] Plugin path correct in opencode.json
[ ] Config verified: cat opencode.json
[ ] Container TUI test passed
```

---

## PART 1: PLUGIN vs SKILL vs AGENT

### The Trinity

| Concept | Format | Loaded By | Purpose |
|---------|--------|-----------|---------|
| **Plugin** | Compiled JS (`dist/index.js`) | OpenCode runtime via `opencode.json` | Tools, hooks, runtime behavior |
| **Skill** | Markdown (`*.md`) | Agent at runtime | Knowledge, instructions, context |
| **Agent** | Plugin + Identity + Tools | Kraken orchestrator | Autonomous execution unit |

### Plugin Anatomy

```
my-agent/
├── src/
│   ├── index.ts          ← Entry point, plugin definition
│   ├── tools/            ← Tool implementations
│   │   ├── tool1.ts
│   │   └── tool2.ts
│   └── hooks/            ← Hook implementations
│       └── hook1.ts
├── dist/                 ← Built output
│   └── index.js          ← The ACTUAL plugin file
├── package.json
├── tsconfig.json
└── README.md
```

### What a Plugin Provides

```typescript
// dist/index.js exports:
{
  tools: [
    { name: "tool1", execute: async (ctx) => {...} },
    { name: "tool2", execute: async (ctx) => {...} }
  ],
  hooks: {
    "chat.message": (ctx) => {...},
    "tool.execute.before": (ctx) => {...}
  }
}
```

---

## PART 2: opencode.json CONFIGURATION

### Required Structure

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "minimax": {}
  },
  "plugin": [
    "file:///path/to/opencode-subagent-manager/dist/index.js",
    "file:///path/to/kraken-agent/dist/index.js"
  ],
  "agent": {
    "architect": { "disable": true }
  },
  "permission": {
    "*": {
      "*": "allow"
    }
  }
}
```

**⚠️ CRITICAL**: Without `"permission"`, prompts block all tool execution.

### Plugin Load Order

```
FIRST: opencode-subagent-manager (base execution layer)
SECOND: kraken-agent (orchestration depends on execution)

Order MATTERS. Wrong order = broken tool chain.
```

### Adding a New Plugin

```bash
# WRONG (causes dual plugin breakdown):
# Just add new path, old still loaded
"plugin": [
  "file:///...old-plugin/dist/index.js",  ← LEAVES OLD IN
  "file:///...new-plugin/dist/index.js"
]

# RIGHT:
# Remove old first, then add new
"plugin": [
  "file:///...new-plugin/dist/index.js"  ← ONLY new
]
```

---

## PART 3: BUILD CHAIN

### Standard Build (Bun)

```bash
cd ~/path/to/plugin/

# Development build (watch mode)
bun run dev

# Production build
bun run build

# Output: dist/index.js
```

### Build Command Breakdown

```bash
# What bun build does:
bun build src/index.ts \
  --outdir dist \
  --target bun \
  --format esm \
  --bundle

# Flags explained:
# --outdir dist          → Output to dist/
# --target bun          → Target Bun runtime
# --format esm          → ES modules
# --bundle              → Bundle all imports
```

### Deploy Command

```bash
# Simple deploy:
cp dist/index.js ~/.config/opencode/plugins/{plugin-name}/dist/index.js

# With backup:
cp dist/index.js ~/.config/opencode/plugins/{plugin-name}/dist/index.js.new
mv ~/.config/opencode/plugins/{plugin-name}/dist/index.js.new \
   ~/.config/opencode/plugins/{plugin-name}/dist/index.js

# With rollback backup:
cp dist/index.js ~/.config/opencode/plugins/{plugin-name}/dist/index.js
cp dist/index.js dist/index.js.bak  # Keep rollback copy
```

### Verifying Build

```bash
# Check bundle exists
ls -la dist/index.js

# Check hash
sha256sum dist/index.js

# Verify it loads (basic syntax check)
node -e "import('file:///path/to/dist/index.js')"
```

---

## PART 4: HOOK SYSTEM

### Hook Registration Table

| Hook | When Fires | Blocking? | Common Use |
|------|------------|-----------|------------|
| `chat.message` | On user message | **Yes** | Identity detection, T1 generation, routing |
| `chat.params` | Before LLM call | No | Context injection |
| `tool.execute.before` | Before any tool | **Yes** | Firewall enforcement, path protection |
| `tool.execute.after` | After tool execution | No | Evidence collection, output tracking |
| `command.execute.before` | Before bash command | **Yes** | Path protection enforcement |
| `experimental.session.compacting` | Before auto-compaction | No | State preservation, handover package |

### Hook Format (CRITICAL)

```typescript
// WRONG (array):
export default [
  async (ctx) => { /* handler */ }
]

// CORRECT (function, not array):
export default async (ctx) => {
  // Single handler per hook name
}
```

### chat.message Hook Pattern

```typescript
// src/hooks/chat-message.ts
export default async (ctx: HookContext) => {
  const { input, output, session } = ctx;
  const { userMessage } = input;

  // Identity detection
  const identityQueryPattern = /\b(who are you|what are you|identify yourself)\b/i;
  if (identityQueryPattern.test(userMessage)) {
    const agent = session.agentName || '';
    if (agent.startsWith('kraken')) {
      output.system = output.system || [];
      output.system.push(orchestratorIdentityPrompt);
      return;
    }
  }

  // Continue to next hook or handler
  return;
}
```

### tool.execute.before Hook Pattern

```typescript
// src/hooks/tool-firewall.ts
export default async (ctx: HookContext) => {
  const { input, session } = ctx;
  const { toolName, toolArgs } = input;

  // L0: Identity Wall - block non-Kraken from Kraken paths
  const protectedPaths = ['/.config/opencode/plugins/kraken-agent/', '/.openviking/'];
  if (protectedPaths.some(p => JSON.stringify(toolArgs).includes(p))) {
    const agent = session.agentName || '';
    if (!agent.startsWith('kraken')) {
      throw new Error(`L0 BLOCK: ${agent} cannot access Kraken paths`);
    }
  }

  // L4: Domain designation enforcement
  // (cluster assignment validation)
}
```

---

## PART 5: TOOL DEFINITION

### Tool Anatomy

```typescript
// src/tools/my-tool.ts
import { Tool } from '../../types';

export const myTool: Tool = {
  name: 'my_tool',
  description: 'What this tool does',

  parameters: {
    type: 'object',
    properties: {
      arg1: {
        type: 'string',
        description: 'Description of arg1'
      },
      arg2: {
        type: 'number',
        description: 'Description of arg2'
      }
    },
    required: ['arg1']
  },

  execute: async (ctx: ToolContext) => {
    const { input, session } = ctx;
    const { arg1, arg2 } = input;

    // Initialize evidence FIRST (before any usage)
    let evidence: EvidenceData = { logs: [], files: [] };

    try {
      // Tool implementation
      const result = await doSomething(arg1, arg2);

      // Update evidence
      evidence.logs.push(`Success: ${result}`);

      return {
        success: true,
        result,
        evidence
      };
    } catch (error) {
      evidence.logs.push(`Error: ${error.message}`);
      throw error;
    }
  }
};
```

### Common Mistakes

| Mistake | Cause | Fix |
|---------|-------|-----|
| `evidence is not defined` | Used before initialization | Initialize `evidence = { logs: [], files: [] }` at TOP of execute |
| Hook returning array | Misunderstanding hook format | Hooks are functions, not arrays |
| Using `input.agent` | Doesn't exist in OpenCode 1.14 | Use `ctx.session.agentName` |
| Dual plugin loading | Old plugin not removed | EXPLICITLY remove old from opencode.json |

---

## PART 6: SHIPPING SOP

### The Mandatory Sequence

```
1. REMOVE old plugin from opencode.json
2. ADD new plugin path to opencode.json
3. BUILD: bun run build
4. DEPLOY: cp dist/index.js ~/.config/opencode/plugins/{name}/dist/index.js
5. VERIFY: cat opencode.json (confirm single entry per type)
6. TEST in Docker container (opencode tui)
7. ROLLBACK if broken: restore dist/index.js.bak
```

### Version Bump Protocol

```bash
# 1. Update version in package.json
# 2. Git tag
git tag vX.Y.Z

# 3. Record bundle hash
echo "vX.Y.Z: $(sha256sum dist/index.js | cut -d' ' -f1)" >> BUILD_STATE.txt

# 4. Commit
git add -A && git commit -m "Release vX.Y.Z"
```

### Rollback Protocol

```bash
# If broken after deploy:
# 1. Restore old bundle
cp dist/index.js.bak dist/index.js
cp dist/index.js ~/.config/opencode/plugins/{name}/dist/index.js

# 2. Verify config
cat opencode.json

# 3. Restart opencode
```

---

## PART 7: CONTAINER TESTING (MANDATORY)

### Why Container Testing?

```
Local opencode run → hooks DON'T fire
opencode tui → hooks MIGHT fire (not 100%)
Docker container → hooks FIRE 100% correctly

NEVER ship without container testing.
```

### Container Test Sequence

```bash
# 1. Build for container
bun run build

# 2. Deploy to container path
docker cp dist/index.js opencode-container:/path/to/plugin/dist/

# 3. Run TUI in container
docker exec -it opencode-container opencode tui

# 4. Test hooks fire
# Look for:
# - [Hook] chat.message fired
# - [Hook] tool.execute.before fired

# 5. Test tools
# Run each tool, verify output

# 6. Verify evidence collection
# Check logs show evidence captured
```

### TUI-TESTING-BIBLE Quick Ref

```bash
# Container test template:
docker run -it \
  -v $(pwd):/workspace \
  -v ~/.config/opencode:/root/.config/opencode \
  leviathan/opencode:latest

# Inside container:
opencode tui
# → Test chat.message hook
# → Test tool.execute.before hook
# → Verify identity loads
```

---

## PART 8: STATE DIRECTORY

### Plugin State Structure

```
.{plugin-name}/
├── state.json               ← Current state (planning, execution, etc)
├── plan.md                  ← Current build plan
├── evidence/                ← Gate evidence
│   └── {gate}/
│       └── {timestamp}/
├── checkpoints/             ← Session checkpoints
│   └── {YYYYMMDD_HHMMSS}-{name}/
│       ├── BUILD_STATE.txt
│       ├── source-snapshot/
│       └── bundle/
└── knowledge/              ← Accumulated knowledge
```

### State Persistence

```typescript
// Save state on significant events:
const state = {
  phase: 'BUILD',
  lastCompleted: 'user-auth-implementation',
  inFlight: 'payment-processing',
  next: 'checkout-flow',
  errors: []
};

// Write to ./{plugin-name}/state.json
await fs.writeFile('./kraken-agent/state.json', JSON.stringify(state));
```

---

## PART 9: ERROR CODES

| Code | Meaning | Action |
|------|---------|--------|
| `E001` | Hook format wrong (array) | Fix to function |
| `E002` | Plugin not in opencode.json | Add path |
| `E003` | Dual plugin loaded | Remove old plugin first |
| `E004` | evidence undefined | Initialize before use |
| `E005` | input.agent doesn't exist | Use session.agentName |
| `E006` | Build failed | Check TypeScript errors |
| `E007` | Container test failed | Debug hooks |
| `E008` | Config corrupted | Restore from backup |

---

## PART 10: TAB TOGGLE (Agent Visibility)

### The Problem

Agent doesn't show in tab toggle → not registered correctly

### The Fix

```json
// opencode.json agent section:
"agent": {
  "{agent-name}": {
    "label": "Agent Display Name",
    "tab": true,
    "disable": false
  }
}
```

### Registration Pattern (From Compiled Bundle)

```typescript
// From Spider's compiled bundle - config callback pattern:
const configCallback = (config: any) => {
  if (!config.agent) config.agent = {};
  if (!config.agent['spider-agent']) {
    config.agent['spider-agent'] = {
      label: 'Spider',
      tab: true,
      disable: false
    };
  }
  return config;
};

// Register via hook:
export const configHook = (ctx) => {
  if (ctx.path === 'opencode.json') {
    return configCallback;
  }
};
```

---

## PART 11: COMMON PATTERNS

### Pattern: Tool with File Output

```typescript
async writeFile(args) {
  const { path, content } = args;

  // Validate path (L0 protection)
  if (isProtectedPath(path)) {
    throw new Error('L0 BLOCK: Protected path');
  }

  // Execute
  await fs.writeFile(path, content);

  // Return evidence
  return {
    success: true,
    path,
    bytes: content.length,
    evidence: {
      files: [path],
      logs: [`Written ${content.length} bytes to ${path}`]
    }
  };
}
```

### Pattern: Async Delegation

```typescript
async delegateTask(args) {
  const { task, agent, cluster } = args;

  // Validate cluster assignment
  if (agent === 'shark' && cluster !== 'alpha') {
    throw new Error('L4 BLOCK: Shark must use alpha cluster');
  }

  // Delegate
  const result = await spawnAgent({ task, agent, cluster });

  // Track
  await trackTask(result.taskId);

  return result;
}
```

### Pattern: Output Retrieval

```typescript
async retrieveOutputs(args) {
  const { taskId } = args;

  // Check cluster status
  const status = await get_cluster_status({ clusterId: args.cluster });

  // If complete, retrieve
  if (status.completed) {
    const results = await aggregate_results({ taskIds: [taskId] });
    return {
      outputs: results.outputs,
      verified: true
    };
  }

  return { outputs: null, verified: false };
}
```

---

## THE MANTRA

**"Build from source. Deploy the bundle. Test in container. Ship with evidence. Never skip the TUI test."**