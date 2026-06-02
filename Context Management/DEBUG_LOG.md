# DEBUG LOG — KRAKEN V1.3 BUILD OVERHAUL
## Session: kraken-overhaul (2026-06-02)

### [2026-06-02T18:30:00Z] BUG #1: ClusterEngine tree-shaken from bundle
- SYMPTOM: 2/29 bundle tests failed (cluster_engine_construct, cluster_engine_drain)
- ROOT CAUSE: ClusterEngine imported in index.ts but never instantiated — Bun tree-shakes unused classes
- FIX: Import ClusterEngine in index.ts, instantiate as global, wire into cluster-tools + monitoring-tools contexts
- VERDICT: FIXED — 29/29 after fix

### [2026-06-02T20:45:00Z] BUG #2: Shell injection in SubagentManagerBrain
- SYMPTOM: execSync with string interpolation for docker/tmux commands
- ROOT CAUSE: All 13 execSync calls used `docker exec ${safeName} tmux ...` string templates
- FIX: Replaced all execSync with execFileSync using arg arrays (e.g., execFileSync('docker', ['exec', safeName, 'tmux', ...]))
- VERDICT: FIXED — zero execSync calls remain

### [2026-06-02T22:00:00Z] BUG #3: Cross-plugin identity interference (OPEN)
- SYMPTOM: TUI "who are you" returns "Trident Brain v4.2" instead of Kraken identity when all 8 plugins loaded
- ROOT CAUSE: Under investigation
  - Kraken's system.transform injects identity correctly in isolation (12/12 tests pass)
  - Trident v4.2 has aggressive identity override: `[TRIDENT v4.2] IDENTITY OVERRIDE: You are Trident Brain v4.2`
  - When both plugins' hooks fire, model follows Trident's override instruction
  - Could be: (a) Trident overriding other agents, or (b) Kraken identity not asserting strongly enough
- INVESTIGATION:
  - Trident v4.2 is deployed (confirmed from bundle)
  - Need to test with Trident v3.3.3 to isolate
  - Need to check Hive context on proper agent identity architecture
  - Need to verify Kraken's identity injection follows Hive patterns
- VERDICT: OPEN — blocking runtime grade certification

### [2026-06-02T22:00:00Z] BUG #4: spawn_cluster_task delegation fails in container
- SYMPTOM: spawn_cluster_task tool throws when delegate() tries to spawn Docker container
- ROOT CAUSE: No Docker-in-Docker available in test container
- FIX: Not a bug — environmental limitation. Architecture is correct (ClusterEngine constructs, firewall validates)
- VERDICT: WONTFIX — expected behavior in container-without-docker environment
