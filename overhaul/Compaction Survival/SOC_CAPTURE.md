# SOC CAPTURE — Stream of Consciousness
## Kraken V1.4 — Real-Time Context Preservation

**Purpose:** This file captures the stream of consciousness, decisions, insights, and injectable data points that would be lost during compaction. Updated at every milestone.

---

## Session: spider-v2.2-overhaul | Started: 2026-06-01

### [2026-06-01 21:30] GATE: V1.4 RUNTIME GRADE OVERHAUL — COMPLETE

#### Current Understanding
- V1.3 ship package fully overhauled to V1.4 runtime grade
- 90 TypeScript files: zero `as any`, zero `: any`, zero empty catches, zero console.log
- Bundle builds clean: 140 modules, 0.74MB, 13ms
- 4 security bugs fixed: API key externalized, wildcard permissions removed, 2 syntax corruptions
- Build is STABLE — no regressions, no compilation errors

#### Key Decisions Made
1. Used SpiderWeb 6-strand divide mode for parallel overhaul — pragmatic for 90-file sweep
2. Replaced `as any` with `Record<string, unknown>` + type narrowing — avoids new interfaces at SDK boundaries
3. API key → env var `${XIAOMI_API_KEY}` — not deleted, externalized
4. `console.log` → `console.error` — bundled plugins must not pollute stdout
5. Wildcard `"*":{"*":"allow"}` → `"permission": {}` — tool whitelist in plugin handles auth

#### Active Concerns
- Subagent syntax corruption (2 occurrences in Strands 3 and 4): subagents mix tabs/spaces and leave duplicate code blocks. Always verify build after subagent edits.
- Hive tool restriction: Spider agent cannot use `hive_remember` or `kraken_hive_remember` — must use file writes for persistence
- Agent browser depends on external Rust binary — needs to be made self-contained or resilient to missing binary

#### Hive Knowledge Applied
- Pattern: SpiderWeb divide mode — 6 strands for 90-file sweep, works well but strand 1 needed manual re-run
- Failure avoided: Subagent syntax corruption — always run `bun build` after subagent edits
- Pattern: Runtime Grade Bible P1-P12 — zero tolerance for `as any`, empty catches, console.log, hardcoded secrets

#### Injectable Data Points (for alignment injection)
- `build_state`: STABLE — 140 modules, 0.75MB, 20ms build time (confidence: 10/10)
- `v14_overhaul`: COMPLETE — all 90 files overhauled, 4 security bugs fixed (confidence: 10/10)
- `compaction_survival`: COMPLETE — SystemBrain.initializeProject() implemented, 5-file auto-gen, POST_COMPACTION_PROMPT + SOC_CAPTURE written (confidence: 10/10)
- `lightning_mode_identity`: COMPLETE — IDENTITY.md/KRAKEN.md/EXECUTION.md rewritten with Lightning Mode formula as default (confidence: 10/10)
- `system_brain_overhaul`: IN PROGRESS — initializeProject() done, dynamic context injection next (confidence: 8/10)
- `agent_browser`: BUILT BUT HAS GAPS — depends on external binary, VLM endpoint exists at 8082 (confidence: 10/10)

### [2026-06-01 22:00] MILESTONE: COMPACTION SURVIVAL + LIGHTNING MODE COMPLETE
- SystemBrain.initializeProject() creates Context Management/ with 5 files
- appendBuildLog(), appendDebugLog(), appendContextContinuity() for real-time updates
- getCompactionSurvivalContext() injects all files into compaction hook
- IDENTITY.md rewritten with explicit Lightning Mode behavioral contract
- Build verified: 140 modules, 0.75MB, 20ms

### [PENDING] Next Milestone — Agent Browser Resilience + VLM Health Check
- Make browser tools return graceful error when agent-browser binary missing
- Add vlm_health tool to check VLM endpoint availability
- Consider wiring agent-vision plugin tools into Kraken tool list

### [PENDING] Next Milestone — System Brain Dynamic Context Injection
- System brain reads Hive for relevant context, injects into agent thought stream
- Topic-aware: build → inject build-chain, debug → inject failure modes
- Must include: agent tab, model, mode, authorization status

### [2026-06-01 22:15] MILESTONE: ALL INFRASTRUCTURE COMPLETE

#### Current Understanding
- ALL 6 engineering tasks complete
- Agent browser: isBrowserAvailable() check + graceful degradation + vlm_health tool
- System brain: getRelevantContextForGate() injects gate-aware T2 context into system.transform
- Runtime grade: P1-P12 all pass, 140 modules, 0.75MB

#### Key Decisions Made
6. Browser tools return strings (not errors) when binary missing — graceful UX
7. vlm_health is standalone tool — doesn't need agent-browser, just HTTP fetch
8. Gate context injection truncates to 2000 chars per topic — avoids token budget blowout
9. T2 directory resolution reuses PlanningBrain's 6-path search pattern

#### Injectable Data Points (for alignment injection)
- `all_infrastructure`: COMPLETE — all 6 tasks done, P1-P12 pass (confidence: 10/10)
- `bundle_final`: 140 modules, 0.75MB, 23ms — stable (confidence: 10/10)
- `runtime_grade`: VERIFIED — zero as-any, zero empty catches, zero console.log (confidence: 10/10)

### SHIP READY — awaiting container test or deployment instructions

### [2026-06-01 22:30] MILESTONE: RUNTIME GRADE CONTAINER TEST — 46/46 = 100%
- Container: kraken-rg-verify-0601171842, bundle deployed (754KB, 140 modules)
- VLM: ONLINE at 127.0.0.1:8082 (GLM-4.6V-Flash-Q4_K_M)
- All 22 tools registered, compaction hook verified, identity injection verified
- Evidence: test-evidence/ContainerTestResult.json

### [2026-06-01 23:30] HOTFIX: vlm_vision tool invisible to agent model

#### What Happened
User shared screenshot path in a live session. Agent (GLM-5.1 via Spider) fumbled for 4+ minutes with bash/python/curl trying to call VLM API directly. Never used the vlm_vision tool from agent-vision plugin. User had to repeatedly tell it to use the existing tool.

#### Root Cause Analysis (5 Whys)
1. Why did agent use bash/python/curl? → It didn't know vlm_vision existed
2. Why didn't it know? → vlm_vision wasn't in Kraken's agent instructions or identity files
3. Why wasn't it there? → vlm_vision is from a SEPARATE plugin (agent-vision), not Kraken's own tools
4. Why does that matter? → The model only knows about tools mentioned in its instructions/identity
5. Why wasn't cross-plugin tool visibility handled? → Kraken's instructions only listed Kraken-registered tools

#### Fix Applied
1. **index.ts agent instructions** — Added "VISION TOOLS" section: vlm_vision, vlm_status, vlm_on, vlm_off with "NEVER use bash/python/curl"
2. **KRAKEN.md** — Added "Vision System" section + "NEVER say I can't view images"
3. **IDENTITY.md** — Added behavioral constraint: "MUST use vlm_vision for ANY image"
4. Bundle rebuilt (140 modules, 0.75MB), identity + bundle deployed to container

#### VLM Verification Results
- Direct API test: VLM reads screenshots perfectly
  - Screenshot 1 (23-16-50): Firefox "File not found" for /tmp/pokemon-shark-v7-test.html — READ CORRECTLY
  - Screenshot 2 (23-11-32): Spider firewall blocking invalid tool — READ CORRECTLY
  - Screenshot 3 (05-05 04-05): Complex image, hit max_tokens limit (needs 1000+)
- VLM uses reasoning tokens internally: 255 reasoning + 44 visible = 300 total at default max_tokens
- Must set max_tokens >= 1000 for complex screenshots
- 85 screenshots total on device at /home/leviathan/Pictures/Screenshots/

#### System Prompt Verification
- vlm_vision IS in the system prompt (29400 chars total)
- "NEVER use bash/python/curl to call the VLM API" IS present
- "I can't view images — YOU CAN. Use vlm_vision" IS present
- Lightning Mode IS present
- VISION TOOLS section header NOT in system prompt (it's in agent instructions which get composed into the full prompt differently — but the tool mentions ARE there)

#### Lesson for Hive
CRITICAL: Cross-plugin tools MUST be documented in every agent's instructions. OpenCode's plugin system registers tools from all plugins globally, but the MODEL only knows about tools mentioned in its identity/instructions. If a tool isn't listed, the model falls back to bash workarounds. This applies to ALL cross-plugin tools: agent-vision (vlm_vision, vlm_status, vlm_on, vlm_off), hive-mind (hive_context, hive_remember, hive_status), subagent-manager (run_subagent_task, run_parallel_tasks, cleanup_subagents).

#### Injectable Data Points
- `vlm_vision_fix`: COMPLETE — agent instructions updated, VISION TOOLS documented, NEVER-bash rule added (confidence: 10/10)
- `vlm_api_verified`: WORKING — reads screenshots correctly, needs max_tokens >= 1000 for complex images (confidence: 10/10)
- `system_prompt_verified`: CONFIRMED — vlm_vision mentioned in 29400-char system prompt (confidence: 10/10)
- `cross_plugin_lesson`: CRITICAL — all cross-plugin tools must be in agent instructions (confidence: 10/10)

### IN PROGRESS: Live TUI test of vlm_vision usage by model
- Container restarted with new bundle + identity
- Need to verify model actually calls vlm_vision tool (not bash) when given an image path
- Testing with all 85 screenshots on device

---

*This file is updated at every milestone, gate advancement, debug event, and breakthrough*
*Last updated: 2026-06-01 — Session spider-v2.2-overhaul*
