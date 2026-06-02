# PLUGIN ENGINEERING

## Quick Access
- SHIPPING-SOP.md - How to build and deploy
- TUI-TESTING-BIBLE.md - How to test properly
- HOOKS.md - Hook architecture
- TAB-TOGGLE.md - Agent registration
- BOILERPLATE.md - Templates

## Common Commands

### Build & Deploy
```bash
bun run build
cp dist/index.js ~/.config/opencode/plugins/<name>/dist/
# Update opencode.json plugin array
```

### Test (TUI Container)
```bash
docker run -d --rm -v ~/.config/opencode:/root/.config/opencode opencode-test:1.4.3
tmux new-session -d -s t "docker exec -it $(docker ps -q) opencode --agent shark"
sleep 6 && tmux send-keys Escape && tmux send-keys "test" Enter
tmux capture-pane -p -S -40
```

## Key Rules
- `opencode run` does NOT fire hooks - NEVER use for testing
- Container test is the ONLY valid test
- Bundle content != runtime behavior