# Kraken Agent v1.2 — Hive Mind (Persistent Memory)
## T1 Injectable: Container Testing — WORKING SOLUTION

**Last Updated:** 2026-05-30
**Key Discovery:** `autoUpdate:false` is an unrecognized key in opencode v1.14.34 and CRASHES opencode on startup.

### Working TUI Protocol (verified)

```bash
# Step 1: Start container with sleep infinity (NOT sleep 3600)
docker run --rm -d --name ktest --entrypoint /bin/bash \
  -v "$SNAP/config:/root/.config/opencode" \
  -v "/path/to/auth.json:/root/.local/share/opencode/auth.json:ro" \
  opencode-test:1.14.34 -c "sleep infinity"

# Step 2: Start TUI inside tmux
BIN="/usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode"
tmux new-session -d -s ktest "docker exec -it ktest $BIN --agent kraken 2>&1; sleep 30"
sleep 8

# Step 3: Dismiss Update dialog (Tab to Skip, Enter)
tmux send-keys -t ktest Escape
tmux send-keys -t ktest Tab
tmux send-keys -t ktest Tab
tmux send-keys -t ktest Enter

# Step 4: Test
tmux send-keys -t ktest "who are you" Enter; sleep 18
tmux capture-pane -t ktest -p -S -0 | strings | grep -i "kraken\|orchestrat"
```

### Config MUST NOT contain autoUpdate
```json
{"model":"google/gemini-3.1-flash-lite","provider":{"google":{}},...}
// NO "autoUpdate":false — this is invalid in v1.14.34
```

### Docker-in-Docker Spawn Limitation
Docker-in-Docker spawn works mechanically (container created, binary runs, DB migrates)
but model resolution fails because the spawned container needs provider npm packages
(@ai-sdk/google, etc.) that aren't installed in the fresh opencode-test:1.14.34 image.
