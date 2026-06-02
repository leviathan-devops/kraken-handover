# COMPACTION SURVIVAL — KRAKEN v1.2 V12 Production

## Current State (2026-05-30)
- Active project: v1.2_v11_FULL_ARCHITECTURE
- Ship package: Ship Packages/KRAKEN_V1.2_V12_PRODUCTION
- Baseline: NUKE RELOAD/v1.2.9.2-bricked-config-solved
- Build: 142 modules | 680KB | 87 source files

## What Was Fixed
1. ALL 16 firewall layers throw (was: only L0/L6)
2. safeHook propagates [FIREWALL_BLOCKED] errors
3. Identity injection always fires
4. L5: 15 DIRECT_INFRASTRUCTURE derailment patterns
5. SubagentManagerBrain: real Docker/tmux/fs operations
6. Python 3.9 wrapper compatibility
7. Wrapper model default: opencode/big-pickle
8. TUI protocol: sleep infinity + --entrypoint /bin/bash

## Container TUI Protocol (WORKING)
```
docker run --rm -d --name test --entrypoint /bin/bash \
  -v config:/root/.config/opencode -v auth:... \
  opencode-test:1.14.34 -c "sleep infinity"

BIN=/usr/local/lib/node_modules/opencode-ai/node_modules/opencode-linux-x64-baseline/bin/opencode
tmux new-session -d -s test "docker exec -it test $BIN --agent kraken"
tmux send-keys -t test Escape; tmux send-keys Tab Tab Enter  # Skip update
```

## Known Gaps
- Docker-in-Docker spawn: wrapper needs --entrypoint "" fix for spawned containers
- Subagent model providers: need npm @ai-sdk packages in spawned container
