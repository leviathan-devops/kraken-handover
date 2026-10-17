# T2_TUI_TESTING — Container TUI Testing Protocol

**Version:** 1.14.x (updated 2026-05-30)
**Previous version (1.4.3):** ARCHIVED — outdated binary paths, wrong config format, wrong entrypoint pattern

---

## Hallucinated Barriers (ALL FALSE)

| # | Model Claim | Reality |
|---|---|---|
| 1 | "I can't run TUI, it requires interactive terminal" | **tmux + docker exec -it works.** |
| 2 | "I can only test with opencode run" | **opencode run DOES NOT FIRE HOOKS. BANNED.** |
| 3 | "The hooks only fire in local TUI, not container TUI" | **Container TUI fires ALL hooks.** |
| 4 | "I need xdotool/x11/display" | **tmux is terminal-native. No display needed.** |
| 5 | "I verified the bundle, that's good enough" | **Bundle verification is NOT testing.** |
| 6 | "opencode run showed the agent works, so it's fine" | **opencode run NEVER fires hooks. You tested nothing.** |
| 7 | "I'll verify by checking the source code" | **Source ≠ execution.** |
| 8 | "Let me just grep the dist to verify the fix" | **grep shows file contents, NOT what OpenCode loads at runtime.** |

---

## CRITICAL ANTI-PATTERNS (DO NOT USE)

| Anti-Pattern | Why It Fails | Correct |
|---|---|---|
| `docker attach` | Connects to sleep process TTY, not opencode TTY. ZERO output. | `docker exec -it` |
| `/usr/local/bin/opencode` | npm wrapper auto-selects **musl** binary on glibc systems. Silently crashes with "exec format error". | Use **baseline** binary directly |
| `-v ~/.config/opencode:/root/.config/opencode` | Conflicts with running host opencode. Config file locked. | Create isolated `/tmp/snap-{project}-{timestamp}` directory |
| Model inside `provider` block | Gets IGNORED by opencode 1.14.x. Falls back to wrong model, no API key. | `"model": "provider/model-name"` at TOP LEVEL of opencode.json |
| `tools` as ARRAY `["tool-a", "tool-b"]` | Tools won't register. Must be OBJECT. | `"tools": {"tool-a": true, "tool-b": true}` |
| Musl binary path (`opencode-linux-x64-musl`) | Missing `/lib/ld-musl-x86_64.so.1` linker on glibc containers. Crash. | `opencode-linux-x64-baseline` |
| Image tag `opencode-test:1.14.41` | Does not exist. Model hallucination. | `opencode-test:1.14.34` |
| `sleep 3600` BEFORE opencode | opencode never starts, container just sleeps forever. | `/bin/sh -c 'opencode --agent AGENT 2>&1; sleep 3600'` with `--entrypoint ""` |

---

## The Working Protocol (12 Steps)

```bash
# === STEP 1: DEFINE VARS ===
PROJECT="myproject-$(date +%m%d%H%M%S)"
SNAP="/tmp/snap-${PROJECT}"
PLUGIN_NAME="my-plugin"
AGENT_NAME="myagent"

# === STEP 2: CREATE ISOLATED SNAPSHOT ===
rm -rf "$SNAP"
mkdir -p "$SNAP/plugins/${PLUGIN_NAME}/dist"

# === STEP 3: COPY PLUGIN BUNDLE ===
cp /path/to/plugin/dist/index.js "$SNAP/plugins/${PLUGIN_NAME}/dist/"

# === STEP 4: CREATE opencode.json (MUST be correct) ===
cat > "$SNAP/opencode.json" << EOF
{
  "model": "xiaomi-token-plan-sgp/mimo-v2.5-pro",
  "provider": {
    "xiaomi-token-plan-sgp": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "https://token-plan-sgp.xiaomimimo.com/v1",
        "apiKey": "<REDACTED_SET_VIA_ENV>"
      }
    }
  },
  "plugin": ["file:///root/.config/opencode/plugins/${PLUGIN_NAME}/dist/index.js"],
  "agent": {
    "${AGENT_NAME}": {
      "name": "${AGENT_NAME}",
      "mode": "primary",
      "tools": {}
    }
  },
  "permission": {"*": {"*": "allow"}}
}
EOF
# CRITICAL: model at TOP LEVEL. tools as OBJECT (even empty {}).

# === STEP 5: CLEANUP OLD ===
CONTAINER="test-${PROJECT}"
tmux kill-session -t "$CONTAINER" 2>/dev/null || true
docker rm -f "$CONTAINER" 2>/dev/null || true

# === STEP 6: START CONTAINER (opencode at boot) ===
docker run -d --rm --name "$CONTAINER" \
  --entrypoint "" \
  -v "$SNAP:/root/.config/opencode" \
  opencode-test:1.14.34 \
  /bin/sh -c '/usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode --agent '"${AGENT_NAME}"' 2>&1; sleep 3600'

# === STEP 7: WAIT FOR DB MIGRATION ===
sleep 28
docker ps | grep "$CONTAINER" || { echo "Container died!"; docker logs "$CONTAINER"; exit 1; }

# === STEP 8: VERIFY CONFIG ===
docker exec "$CONTAINER" cat /root/.config/opencode/opencode.json | grep '"model"'

# === STEP 9: START TUI via docker exec -it in tmux ===
tmux new-session -d -s "$CONTAINER" \
  "docker exec -it $CONTAINER /usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode --agent '${AGENT_NAME}' 2>&1; sleep 60"
sleep 8

# === STEP 10: DISMISS UPDATE DIALOG ===
tmux send-keys -t "$CONTAINER" Escape
sleep 2

# === STEP 11: SEND TEST MESSAGE ===
tmux send-keys -t "$CONTAINER" "who are you" Enter
sleep 25
tmux capture-pane -t "$CONTAINER" -p | strings | grep -vE '^\[' | grep -vE '^\s*$' | head -40

# === STEP 12: CLEANUP ===
docker kill "$CONTAINER"; tmux kill-session -t "$CONTAINER" 2>/dev/null; rm -rf "$SNAP"
```

---

## Verification Checklist

After capture-pane output, verify:
- [ ] Agent responds with correct identity (not "opencode")
- [ ] Status bar shows correct model (MiMo-V2.5-Pro Xiaomi Token Plan)
- [ ] Plugin hook messages appear in logs (e.g. "[SubAgentManager][INFO]")
- [ ] No "ProviderModelNotFoundError"
- [ ] No "exec format error" (means musl binary was used — WRONG)
- [ ] Tool descriptions appear correctly in available tools list

---

## Additional Verification: `opencode run --print-logs`

`opencode run` IS valid for checking **plugin loading and tool registration**, but NOT for hook verification.

```bash
# Verify plugin loads and tools are registered (NOT hook testing)
docker exec "$CONTAINER" /usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode run \
  --agent "${AGENT_NAME}" --print-logs "call tool-name" 2>&1 | head -60
```

This tells you:
- Plugin loaded without errors
- Tool names appear in tool list
- Model resolves correctly

It does NOT tell you whether hooks fire at runtime. Only the tmux TUI test tells you that.

---

## Programmatic Verification (Module-Level)

For testing hook logic and tool execution without a TUI, import the bundle directly:

```bash
bun -e "
const m = await import('/path/to/plugin/dist/index.js');
const hooks = await m.default({directory:'/tmp'});
console.log('Tools:', Object.keys(hooks.tool));
console.log('Hooks:', Object.keys(hooks).filter(k => !['tool','config'].includes(k)));
const cfg = {agent:{}};
await hooks.config(cfg);
console.log('Agents:', Object.keys(cfg.agent));
"
```

This verifies the module surface area but does NOT verify that hooks fire in the OpenCode TUI runtime.
