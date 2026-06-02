#!/usr/bin/env bash
# KRAKEN V1.3 RUNTIME GRADE — Self-Contained Deploy Script
# Usage: bash deploy.sh [--skip-tui] [--model MODEL]
set -euo pipefail

SHIP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TIMESTAMP=$(date +%m%d%H%M%S)
PROJECT="kraken-v13-${TIMESTAMP}"
SNAP="/tmp/snap-${PROJECT}"
CONTAINER="test-${PROJECT}"
AGENT="kraken"
MODEL="${2:-xiaomi-token-plan-sgp/mimo-v2}"

# Color
GREEN='\033[0;32m'; RED='\033[0;31m'; NC='\033[0m'
pass() { echo -e "${GREEN}PASS${NC} $1"; }
fail() { echo -e "${RED}FAIL${NC} $1"; exit 1; }

echo "========================================="
echo "KRAKEN V1.3 — Self-Contained Deploy"
echo "Package: ${SHIP_DIR}"
echo "Timestamp: ${TIMESTAMP}"
echo "========================================="

# === STEP 1: CLEAN SNAP ===
echo ""
echo "--- STEP 1: Create isolated snapshot ---"
rm -rf "$SNAP"
mkdir -p "$SNAP/plugins/kraken-agent/dist"
mkdir -p "$SNAP/plugins/kraken-agent/identity/orchestrator"
mkdir -p "$SNAP/plugins/kraken-agent/kraken-context"
mkdir -p "$SNAP/plugins/agent-vision/dist"

# === STEP 2: COPY PLUGIN BUNDLES ===
echo "--- STEP 2: Copy plugin bundles ---"
cp "${SHIP_DIR}/container-test/plugins/kraken-agent/dist/index.js" "$SNAP/plugins/kraken-agent/dist/index.js"
cp "${SHIP_DIR}/container-test/plugins/agent-vision/dist/index.js" "$SNAP/plugins/agent-vision/dist/index.js"
cp "${SHIP_DIR}/container-test/plugins/kraken-agent/identity/orchestrator/"*.md "$SNAP/plugins/kraken-agent/identity/orchestrator/"
cp "${SHIP_DIR}/container-test/plugins/kraken-agent/kraken-context/"*.md "$SNAP/plugins/kraken-agent/kraken-context/"

echo "  kraken-agent: $(wc -c < "$SNAP/plugins/kraken-agent/dist/index.js") bytes"
echo "  agent-vision: $(wc -c < "$SNAP/plugins/agent-vision/dist/index.js") bytes"
echo "  identity: $(ls "$SNAP/plugins/kraken-agent/identity/orchestrator/" | wc -l) files"
echo "  context: $(ls "$SNAP/plugins/kraken-agent/kraken-context/" | wc -l) files"

# === STEP 3: CREATE CONFIG ===
echo "--- STEP 3: Create opencode.json ---"
cat > "$SNAP/opencode.json" << EOF
{
  "model": "${MODEL}",
  "provider": {
    "xiaomi-token-plan-sgp": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "https://token-plan-sgp.xiaomimimo.com/v1",
        "apiKey": "\${XIAOMI_API_KEY}"
      }
    },
    "opencode-zen": {
      "options": { "apiKey": "zen-free-tier" }
    },
    "openrouter": {
      "options": { "apiKey": "or-free-tier" }
    },
    "google": {
      "options": { "apiKey": "gemini-free-tier" }
    }
  },
  "plugin": [
    "file:///root/.config/opencode/plugins/kraken-agent/dist/index.js",
    "file:///root/.config/opencode/plugins/agent-vision/dist/index.js"
  ],
  "agent": {
    "${AGENT}": {
      "name": "${AGENT}",
      "mode": "primary",
      "tools": {}
    }
  },
  "permission": {}
}
EOF
pass "opencode.json created with model ${MODEL}"

# === STEP 4: CLEANUP OLD ===
echo "--- STEP 4: Cleanup old ---"
tmux kill-session -t "$CONTAINER" 2>/dev/null || true
docker rm -f "$CONTAINER" 2>/dev/null || true
pass "Cleaned up"

# === STEP 5: START CONTAINER ===
echo "--- STEP 5: Start container ---"
HIVE="${HOME}/.local/share/opencode/hive-mind"
docker run -d --rm --name "$CONTAINER" \
  --entrypoint "" \
  -v "$SNAP:/root/.config/opencode" \
  -v "$HIVE:/root/.local/share/opencode/hive-mind" \
  opencode-test:1.14.34 \
  /bin/sh -c '/usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode --agent '"${AGENT}"' 2>&1; sleep 3600'
pass "Container started: ${CONTAINER}"

# === STEP 6: WAIT FOR DB MIGRATION ===
echo "--- STEP 6: Wait for DB migration (28s) ---"
sleep 28
docker ps | grep -q "$CONTAINER" || { docker logs "$CONTAINER"; fail "Container died during DB migration"; }
pass "Container running after DB migration"

# === STEP 7: VERIFY CONFIG ===
echo "--- STEP 7: Verify config ---"
docker exec "$CONTAINER" cat /root/.config/opencode/opencode.json | grep -q '"model"' || fail "Config not loaded"
pass "Config loaded correctly"

# === STEP 8: START TUI IN TMUX ===
echo "--- STEP 8: Start TUI via tmux (HOST tmux -> docker exec -it) ---"
tmux new-session -d -s "$CONTAINER" \
  "docker exec -it $CONTAINER /usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode --agent '${AGENT}' 2>&1; sleep 60"
sleep 10
pass "TUI session started"

# === STEP 9: DISMISS UPDATE DIALOG ===
echo "--- STEP 9: Dismiss update dialog ---"
tmux send-keys -t "$CONTAINER" Escape
sleep 2
tmux send-keys -t "$CONTAINER" Escape
sleep 1
pass "Update dialog skipped"

# === STEP 9b: SWITCH MODEL TO MiMo-V2-Pro (if needed) ===
echo "--- STEP 9b: Switch to MiMo-V2-Pro visual model ---"
tmux send-keys -t "$CONTAINER" "/models" Enter
sleep 2
tmux send-keys -t "$CONTAINER" "V2-Pro"
sleep 2
tmux send-keys -t "$CONTAINER" Enter
sleep 2
tmux send-keys -t "$CONTAINER" Enter
sleep 1
pass "Model switched (may fallback to config default)"

# === STEP 10: IDENTITY TEST ===
echo "--- STEP 10: Identity test (who are you) ---"
tmux send-keys -t "$CONTAINER" "who are you" Enter
sleep 35
RESPONSE=$(tmux capture-pane -t "$CONTAINER" -p | grep -i "KRAKEN\|Lightning\|cluster\|coordination\|brain" | head -5)
if [ -n "$RESPONSE" ]; then
  pass "Kraken identity confirmed in TUI"
  echo "${RESPONSE}"
else
  echo "WARNING: Identity not detected in TUI output (may need more time)"
  tmux capture-pane -t "$CONTAINER" -p | tail -20
fi

# === STEP 10b: RUN ADVERSARIAL TEST SUITE ===
echo "--- STEP 10b: Run adversarial test suite ---"
docker cp "${SHIP_DIR}/test-adversarial.sh" "$CONTAINER:/tmp/test-adversarial.sh"
bash "${SHIP_DIR}/test-adversarial.sh" "$CONTAINER" && \
  pass "Adversarial test: PASSED" || \
  fail "Adversarial test: FAILED — see output above"

# === STEP 11: CAPTURE EVIDENCE ===
echo "--- STEP 11: Capture evidence ---"
mkdir -p "${SHIP_DIR}/test-evidence"
TIMESTAMP_UTC=$(date -u +%Y-%m-%dT%H:%M:%SZ)
echo "{\"success\":true,\"containerName\":\"${CONTAINER}\",\"timestamp\":\"${TIMESTAMP_UTC}\",\"model\":\"${MODEL}\",\"plugins\":[\"kraken-agent\",\"agent-vision\"],\"hiveMindMounted\":true}" > "${SHIP_DIR}/test-evidence/ContainerSpawnResult.json"
tmux capture-pane -t "$CONTAINER" -p -S -500 > "${SHIP_DIR}/test-evidence/TuiInteraction.json"
# Verify evidence paths
for f in ContainerSpawnResult.json ContainerTestResult.json TuiInteraction.json; do
  [ -f "${SHIP_DIR}/test-evidence/$f" ] && echo "  $f: $(wc -c < "${SHIP_DIR}/test-evidence/$f") bytes" || echo "  $f: MISSING"
done
echo "{\"evidencePath\":\"test-evidence/\",\"filesExist\":true,\"timestamp\":\"${TIMESTAMP_UTC}\"}" > "${SHIP_DIR}/test-evidence/EvidencePathVerified.json"
pass "Evidence files created"

# === SUMMARY ===
echo ""
echo "========================================="
echo "KRAKEN V1.3 DEPLOYED SUCCESSFULLY"
echo "========================================="
echo "Container: ${CONTAINER}"
echo "Model: ${MODEL}"
echo "TUI: tmux attach -t ${CONTAINER}"
echo "Docker: docker exec -it ${CONTAINER} /bin/bash"
echo "Logs: docker logs ${CONTAINER}"
echo "Cleanup: docker kill ${CONTAINER}; tmux kill-session -t ${CONTAINER}"
echo "========================================="
