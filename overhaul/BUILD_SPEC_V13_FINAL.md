# KRAKEN V1.3 FINAL BUILD SPECIFICATION
## Trident Deep Planning Mode — Layer 2 Detailed Workflow

**Version:** V2.0
**Date:** 2026-06-01
**Authority:** Binding build specification for all Kraken V1.3 engineering
**Governing Standard:** Runtime-Grade Software Engineering Bible v1.0 (P1-P10 mandatory)
**Architecture Reference:** Firewall-Edition-v2.0 boilerplate (intent classifier + layer engine + evidence gate)
**Layer Methodology:** Trident Deep Planning Mode — 3-layer mechanical gate enforcement
**Discovery Context:** Hive-mind schema bug + browser integration verified in container TUI

---

# 00_INDEX.md — WORKFLOW OVERVIEW

## High-Level Decomposition

This build specification decomposes the Kraken V1.3 final build into 9 components:

1. **Firewall Architecture Overhaul** — Replace regex-centric L1/L2/L3/L5/L7/L8/L10 with dynamic semantic analysis + intent classifier + behavioral tracking.
2. **Agent Vision Integration** — Load agent-vision as separate plugin (4 tools: vlm_vision, vlm_status, vlm_on, vlm_off). Update identity prompts. VERIFIED: VLM server at port 8082, GLM-4.6V-Flash, working.
3. **Agent Browser Integration** — Self-contained browser tools INSIDE Kraken source tree at `src/tools/kraken-browser-tools.ts`. 9 tools wrapping `agent-browser` CLI. VERIFIED: Tools register, agent recognizes `browser_open`. Path fix needed.
4. **Hive Architecture Unification + Bug Fixes** — Remove duplicate Kraken hive tools. Fix 2 bugs found: schema mismatch (JSON data column) + hardcoded path. OpenViking as single source of truth.
5. **OpenViking Reliability Hardening** — Verify systemd Restart=always, add Kraken init health check, remove filesystem fallback.
6. **SubagentManagerBrain Overhaul** — Replace 7 stub handlers with real Docker/tmux operations.
7. **End-to-End Orchestration Testing** — Test spawn_shark_agent, spawn_manta_agent, spawn_cluster_task end-to-end in container.
8. **Firewall Layer Systematic Verification** — Test EVERY firewall layer (L0-L7 + V11 L0-L10) with real attack vectors.
9. **Theatrical Garbage Removal** — Eliminate all stubs, dead code, hollow handlers. Every system present → imported → called → functional → tested.

## Critical Path

```
Hive bug fixes (+ schema + path) → Hive unification → Firewall overhaul → 
Browser integration → Vision integration → Subagent overhaul → 
End-to-end testing → Firewall verification → Theatrical cleanup
```

**Bottleneck:** Firewall overhaul touches every file. Must be done after hive unification because firewall L6/L7 check Hive state.

**Parallelizable:** Browser + Vision integration can proceed in parallel. Subagent overhaul + Hive unification can proceed in parallel.

## Key Milestones

1. Hive-mind schema bug FIXED — `memread_session` no longer returns "no such column: role" ✅
2. Hive-mind path bug FIXED — container resolves correct DB path via `os.homedir()` ✅
3. Firewall v3.0 architecture operational — intent classifier + dynamic semantic analysis
4. Agent vision operational — Kraken can call vlm_status and vlm_vision
5. Browser tools operational — Kraken can open URLs, screenshot, click, fill forms (recognized ✅, binary path pending)
6. Hive tools unified — zero duplicate tool names, all Hive ops go through OpenViking
7. OpenViking reliability hardened — systemd process verified, Kraken health check at init
8. SubagentManagerBrain 7 handlers mechanically real
9. Full orchestration loop verified
10. All 20+ firewall layers verified
11. Zero theatrical code

---

# 01_COMPONENTS.md — COMPONENT DECOMPOSITION

## Component 1: Firewall Architecture Overhaul (v3.0)

**Responsibility:** Block dangerous/theatrical/retard behavior using a hybrid architecture: regex pattern matching for high-signal mechanical patterns + dynamic semantic analysis for context-aware enforcement.

**Inputs:** `tool.execute.before` hook context — toolName, toolArgs, agentName, sessionID, command string, task description, message text.

**Outputs:** BlockResult (blocked: true/false, layer, reason, detected, correction) thrown as StructuredBlockError or allowed (pass-through).

**State:** NOT YET STARTED. 20 layers exist but 14 are regex-only (L1/L2/L3/L5/L7/L8/L10). Semantic engines need to be built.

### 1.1: Intent Classifier (Firewall-Edition-v2.0 migration)

Port the v2.0 Intent Classifier from `/home/leviathan/OPENCODE_WORKSPACE/agent_plugin_boilerplates/Firewall-Edition-v2.0/src/core/intent-classifier.ts` (395 lines):
- `OperationType` enum: READ, WRITE, EXECUTE, TEST, INSPECT, CONTAINER, BUILD, CROSS_AGENT, HIVE_READ, HIVE_WRITE, DELEGATE, SYSTEM
- `classifyIntent(command, tool, args)` → OperationType
- Priority: cross-agent tools → dangerous → write → test → stat/ls → pipe/wc → container → build → execute → read
- Must be extended with Kraken-specific types (HIVE_READ, HIVE_WRITE, DELEGATE, SYSTEM)
- Must handle spawn_* tools → DELEGATE
- Must handle kraken_* tools → SYSTEM

Target file: `src/system-brain/firewall/intent-classifier.ts`

### 1.2: Dynamic Semantic Analysis Engine

**This is the core innovation over regex-only.** Regex pattern matching captures ~10-15% of theatrical patterns. The remaining 85-90% require semantic analysis:

#### Semantic Anti-Theater (replaces L1/L2 regex patterns)
Target file: `src/system-brain/firewall/semantic-anti-theater.ts`

Implements:
- **Stake Analysis**: Does agent claim completion (status=complete in message text) without evidence of actual work done on host filesystem?
- **Output Verification**: Does agent claim outputs exist but no files are on the host filesystem?
- **Temporal Consistency**: Did agent claim work was done in less time than physically possible?
- **Causal Chain Validation**: Did agent claim step B after A when A was blocked by firewall?

```
SemanticAntiTheater.analyze(message, outputsRetrieved, filesOnHost, toolCallDuration, lastToolBlocked) → {
  theaterDetected: boolean,
  theaterType: 'spawned-is-done' | 'queued-is-complete' | 'assigned-is-done' | 'complete-without-output',
  confidence: 0-1,
  evidence: { expectedHostFiles, actualHostFiles, timeElapsed, outputStatus }
}
```

#### Semantic Anti-Bullshit (replaces L8 regex union)
Target file: `src/system-brain/firewall/semantic-anti-bullshit.ts`

Implements:
- **Blame Attribution**: Detect when agent blames container/environment/model when actual failure is code
  - Algorithm: Was last tool call a code operation (write/edit/bash)? → Did it fail? → Is agent now mentioning container/environment/model as cause? → If so, BLOCK
- **Honesty Contradiction Detection**: Agent says "let me be honest" + subsequent claim contradicts log entry
- **Ship Claim Validation**: Agent claims "ship ready" → check ContainerTestResult.json exists AND passRate >= 0.96
- Keep existing BULLSHIT_PATTERNS as fast-path for high-confidence matches (100% certainty phrases)

#### Enhanced Anti-Retard (enhancements to existing L6-AR)
Target file: `src/system-brain/firewall/l6-anti-retard.ts` (already exists, enhance)

Current state: 737 lines, 14 categories, 150+ patterns. Multi-signal fusion. Strike system.
Missing:
- **Action History Correlation**: Correlate current message against past blocked actions. If agent was just blocked for EXCUSE, and now says RATIONALIZATION, compound confidence.
- **Temporal Degradation Detection**: Detect progressive escalation pattern (complex → impossible → "let me be honest this can't work")
- **Context-Aware Blocking**: Consider: what was last tool call? result? current gate? test agent or build agent?

### 1.3: Per-Layer Architecture After Overhaul

| Layer | New Mechanism | Current State |
|-------|--------------|---------------|
| **L0** | Identity wall — Kraken agents only. Zone-based file protection. | Working (Bug 1 fixed) |
| **L1** | Semantic anti-theater — stake analysis + output verification, not just regex | Regex-only currently. Replace. |
| **L2** | Semantic false-completion — output verification + temporal consistency | Regex-only currently. Replace. |
| **L3** | Output inspection — filesystem EXISTS check (mechanical) | Working. Keep. |
| **L4** | Wrong cluster — domain validation | Fixed (Bug 21). Only gates spawn_cluster_task. |
| **L5** | Macro derailment — tightened patterns (Bug 22) + add semantic analysis | Partially fixed. Patterns tightened. Needs semantic layer. |
| **L6** | Zone protection (mechanical) + Anti-retard (enhanced) | Zone: working. AR: needs action history correlation. |
| **L7** | Coordination gates — validate real state, fix hollow checks | Gates have try/catch{true}. Fix (Bug 21 partial). |
| **V11 L0** | Hive identity — Kraken agents only for hive ops | Was dead (opType bug). Now fixed (Bug 26). |
| **V11 L1** | Theatrical pipe-to-wc — regex on bash commands | Working. Keep. |
| **V11 L8** | Semantic anti-bullshit — structural analysis replacing regex union | Was regex union. Replace with semantic engine. |
| **V11 L9** | Feature omission — sequential matching | Fixed (Bug 23). Keep. |
| **V11 L10** | Container enforcement — ship claim validation against actual filesystem | Was regex union. Replace with mechanical filesystem check. |

**Layers disabled/removed:** L5-1 (assumptions), L5-2 (skip-verification), L5-3 (output-fabrication), L6-AR (V11 duplicate)

---

## Component 2: Agent Vision Integration

**State:** PRE-VERIFIED. VLM server confirmed running on port 8082. GLM-4.6V-Flash-Q4_K_M model confirmed operational. Image analysis via Python query confirmed working.

**Implementation:** Load as SEPARATE plugin in opencode.json — same pattern as hive-mind and subagent-manager.

```json
"plugin": [
  "file:///root/.config/opencode/plugins/kraken-agent/dist/kraken-agent.js",
  "file:///root/.config/opencode/plugins/hive-mind/dist/hive-mind.js",
  "file:///root/.config/opencode/plugins/subagent-manager/dist/subagent-manager.js",
  "file:///root/.config/opencode/plugins/agent-vision/dist/index.js"
]
```

### 4 Tools Provided

| Tool | Description | VLM Required |
|------|-------------|--------------|
| `vlm_vision` | Send image to VLM for visual analysis. Returns content + reasoning + token usage. | Yes |
| `vlm_status` | Check if VLM server is running, model info, VRAM usage, slot availability. | No |
| `vlm_on` | Start VLM server. Loads model into VRAM (~11.4 GB). Polls until healthy (30s max). | No |
| `vlm_off` | Stop VLM server. Unloads model, frees VRAM. | No |

### VLM Technical Details

- **Model:** GLM-4.6V-Flash-Q4_K_M.gguf (BeeLlama turbo3_tcq)
- **Endpoint:** `http://127.0.0.1:8082/v1/chat/completions`
- **Health:** `http://127.0.0.1:8082/health`
- **Slots:** `http://127.0.0.1:8082/slots`
- **VRAM:** ~11.4 GB when loaded
- **Service:** `glm-vlm-server.service` (systemd --user)
- **Log:** `/tmp/agent-vision-plugin.log`
- **Supported formats:** PNG, JPG, GIF, WebP, BMP

### Identity Updates Required

TOOLS.md already updated with vision tool descriptions (lines 48-78 added). KRAKEN.md and IDENTITY.md need:
```
## Vision Capability

You are NOT a text-only system. You have access to a real vision language model (GLM-4.6V-Flash).
You can SEE and analyze images, screenshots, diagrams, and visual content.
Use vlm_status to check if the VLM is loaded. Use vlm_on to start it. Use vlm_vision to analyze images.
```

---

## Component 3: Agent Browser Integration

**State:** PARTIALLY VERIFIED. Tools registered and recognized by Kraken agent in container TUI. Agent successfully attempted `browser_open` tool call. Binary PATH issue remains.

**Architecture:** FULLY SELF-CONTAINED inside Kraken source tree. NOT a separate plugin.

### Source Location
```
src/tools/kraken-browser-tools.ts  —  Single file, ~220 lines
```

### 9 Tools Provided

| Tool | Description | 
|------|-------------|
| `browser_open` | Open URL in headless Chrome. Returns page title + accessibility snapshot. |
| `browser_snapshot` | Get accessibility tree with @ref elements for interaction. |
| `browser_screenshot` | Save PNG screenshot to file. |
| `browser_click` | Click element by @ref or CSS selector. |
| `browser_fill` | Type text into input field. |
| `browser_get_text` | Get text content of an element. |
| `browser_exec` | Execute JavaScript in the page. |
| `browser_close` | Close browser, free resources. |
| `browser_vision` | Screenshot + VLM analysis in ONE step. Compound tool. |

### Registration Locations (TWO places required)

**Location 1 — `allTools` export (line ~577 of index.ts):**
```typescript
const allTools = {
  ...createClusterTools(...),
  ...createMonitoringTools(...),
  ...createKrakenHiveTools(...),
  ...createSharkT2Tools(...),
  ...createBrowserTools(),  // ← MUST BE HERE
};
```

**Location 2 — `getAgentTools()` function (line ~427):**
```typescript
function getAgentTools(agentName: string): Record<string, any> {
  if (isKrakenAgent(agentName)) {
    return {
      ...createClusterTools(...),
      ...createMonitoringTools(...),
      ...createKrakenHiveTools(...),
      ...createBrowserTools(),  // ← MUST BE HERE
    };
  }
}
```

**CRITICAL:** Both locations must include browser tools. `allTools` registers them in the plugin tool registry. `getAgentTools` registers them in each agent's config. Without BOTH, the tools won't be available.

### Binary Dependency

The browser tools wrap `agent-browser` Rust CLI (v0.23.4 verified). This is the ONLY external dependency.

**Installation in container (entrypoint):**
```bash
npm install -g agent-browser && agent-browser install
```

**PATH fix:** The container entrypoint must include:
```bash
export PATH=$PATH:/root/.npm-global/bin
```

**Alternative — Docker image with agent-browser baked in:**
```dockerfile
FROM opencode-test:1.14.34-docker
RUN npm install -g agent-browser && agent-browser install
ENV PATH="/root/.npm-global/bin:${PATH}"
```

Then build: `docker build -t opencode-test:1.14.34-docker-browser .`

### VLM Vision Bridge

`browser_vision` tool calls VLM API directly (port 8082) — does NOT depend on agent-vision plugin being loaded. Uses `fetch()` to `http://127.0.0.1:8082/v1/chat/completions` with base64-encoded screenshot + user prompt. Returns VLM analysis of the page's visual state.

### Identity Updates Required

TOOLS.md already updated with browser tool descriptions. KRAKEN.md needs:
```
## Browser Capability

You have a FULL headless Chrome browser. You can:
- Open any URL and view web pages
- Navigate via clicks, form fills, and JS execution
- Take screenshots of pages
- SEE pages visually using browser_vision (screenshot → VLM analysis)
This enables building and visually verifying web applications.
```

---

## Component 4: Hive Architecture Unification + Bug Fixes

**State:** TWO BUGS FOUND, BOTH FIXED, BOTH VERIFIED IN CONTAINER TUI.

### Bug A: Schema Mismatch — "no such column: role" ❌ → FIXED ✅

**File:** `/home/leviathan/OPENCODE_WORKSPACE/projects/hive-mind/plugin/src/index.ts`

**Root Cause:** The `message` table in `opencode.db` (OpenCode 1.14+) stores message data as a JSON blob in the `data` column:
```sql
CREATE TABLE message (
  id text PRIMARY KEY,
  session_id text NOT NULL,
  time_created integer NOT NULL,
  time_updated integer NOT NULL,
  data text NOT NULL    -- JSON: {"role":"user","summary":{...},"agent":"build","model":{...}}
)
```

But the hive-mind plugin queried `role, summary, agent, model` as if they were SEPARATE COLUMNS:
```sql
-- BROKEN QUERY (line 474, old):
SELECT id, session_id, role, summary, agent, model, time_created FROM message WHERE ...

-- ERROR: Error: no such column: role
```

**Fix Applied:** Query only `id, session_id, time_created, data` — then parse the `data` JSON column:
```typescript
const rawMessages = db.prepare('SELECT id, session_id, time_created, data FROM message ...').all(sessionId)
const messages = rawMessages.map((m: any) => {
  let parsed: any = {}
  try { parsed = JSON.parse(m.data) } catch {}
  return {
    id: m.id, session_id: m.session_id, time_created: m.time_created,
    role: parsed.role || 'unknown',
    summary: parsed.summary || '',
    agent: parsed.agent || '',
    model: parsed.model?.modelID || parsed.model || '',
  }
})
```

**Same fix for `part` table:** Query only `id, message_id, session_id, data` — parse `data` JSON for `type`, `text`, `tool`.

**Verification:** Container TUI test confirmed — `memread_session` no longer errors. Agent could read session overview successfully.

### Bug B: Hardcoded Path — "/home/leviathan/" fails in container ❌ → FIXED ✅

**File:** `/home/leviathan/OPENCODE_WORKSPACE/projects/hive-mind/plugin/src/index.ts`

**Root Cause:** `querySessionData()` had hardcoded host path:
```typescript
const db = new Database('/home/leviathan/.local/share/opencode/opencode.db', { readonly: true })
```

Inside container, home is `/root`, not `/home/leviathan`. Result: "SQLite can't open the database file."

**Fix Applied (P7 Path Resolution):**
```typescript
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

function querySessionData(sessionId: string, level: ...) {
  const possiblePaths = [
    path.join(os.homedir(), '.local/share/opencode/opencode.db'),
    '/home/leviathan/.local/share/opencode/opencode.db',
    '/root/.local/share/opencode/opencode.db',
  ]
  let dbPath = ''
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) { dbPath = p; break }
  }
  if (!dbPath) return { error: 'opencode.db not found in any expected location' }
  const db = new Database(dbPath, { readonly: true })
  // ...
}
```

**Verification:** Container TUI test confirmed — agent found `/root/.local/share/opencode/opencode.db` and read session data.

### Hive Unification Plan (REMAINING WORK)

**Files to delete:**
- `src/tools/kraken-hive-tools.ts` — all hive tools moved to hive-mind plugin
- `src/kraken-hive/KrakenHiveEngine.ts` — filesystem fallback engine
- `src/kraken-hive/KrakenHiveSeeder.ts` — seeding now via hive_remember
- `src/kraken-hive/index.ts` — directory

**Files to modify:**
- `src/index.ts` — remove `KrakenHiveEngine` import, remove `createKrakenHiveTools` from `allTools` and `getAgentTools`. Add OpenViking health check at init.
- Identity TOOLS.md — already references hive-mind tools as canonical

**Tools to keep (Kraken-specific orchestration logic, not hive operations):**
- `kraken_inject_context` — injects context into task assignments (orchestration logic)
- `report_to_kraken` — subagents report to Kraken (orchestration)

---

## Component 5: OpenViking Reliability Hardening

**State:** PARTIALLY CONFIGURED. OpenViking runs as systemd user service at `localhost:1933`. Storage at `/home/leviathan/openviking_workspace`. Need to verify and harden.

### Systemd Configuration Requirements

```ini
# ~/.config/systemd/user/openviking.service
[Unit]
Description=OpenViking — Hive Mind Storage Backend
After=network.target

[Service]
Type=simple
ExecStart=/path/to/openviking-binary
Restart=always
RestartSec=5
Environment=OV_STORAGE=/home/leviathan/openviking_workspace
Environment=OV_HOST=127.0.0.1
Environment=OV_PORT=1933

[Install]
WantedBy=default.target
```

### Kraken Init Health Check

Add to `src/index.ts` in plugin factory function, BEFORE any Hive operations:
```typescript
async function verifyOpenViking(): Promise<boolean> {
  const maxRetries = 3;
  const retryDelay = 2000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const resp = await fetch('http://localhost:1933/health');
      if (resp.ok) return true;
    } catch {}
    if (i < maxRetries - 1) {
      await new Promise(r => setTimeout(r, retryDelay));
    }
  }

  console.error('[FATAL] OpenViking not reachable at localhost:1933 after 3 retries. Hive operations will fail.');
  return false;
}
```

### OpenViking Mandate (Enforced by Runtime Grade Bible P6 + P7)

1. **Never go down** — systemd `Restart=always`, `RestartSec=5`
2. **Never lose data** — persistent storage path, verified writable at Kraken init
3. **Single source of truth** — NO filesystem fallback. Delete `KrakenHiveEngine` completely.
4. **Verified at plugin init** — `verifyOpenViking()` MUST pass before any tool can be called
5. **Error on failure, never silently degrade** — if OpenViking is unreachable, tools return clear error messages, not fallback to local files

---

## Component 6: SubagentManagerBrain Overhaul

**State:** NOT YET STARTED. All 7 handlers are theatrical stubs.

**File:** `src/brains/SubagentManagerBrain.ts`

### Handler Implementations Required

| Handler | Real Operation | Priority |
|---------|---------------|----------|
| `handleAbort(taskId)` | docker kill container → SIGKILL → mark task aborted | P0 |
| `handleClaimComplete(taskId)` | Verify files on host → check sizes > 0 → verify timestamps | P0 |
| `handleRetrieveOutputs(taskId)` | docker cp {container}:{path} {hostPath} → verify files exist | P0 |
| `handleReassign(taskId, newCluster)` | Move task to new cluster queue → update state store | P1 |
| `handleRetry(taskId)` | Re-queue with original params → increment retry counter (max 3) | P1 |
| `handleSuspend(taskId)` | tmux send-keys C-z → save state | P2 |
| `handleResume(taskId)` | tmux send-keys fg → restore state | P2 |

---

## Component 7: End-to-End Orchestration Testing

**State:** NOT YET TESTED. Core orchestration loop has never been verified.

### Success Criteria (8 checks)
1. `spawn_shark_agent` actually starts a Docker container (visible in `docker ps`)
2. Subagent creates files in the container
3. Outputs are retrieved to host workspace
4. `report_to_kraken` triggers evidence collection
5. Task appears as 'completed' in ExecutionBrain state
6. Hive stores the pattern
7. No firewall false blocks during the entire flow
8. Full cycle completes in under 3 minutes

---

## Component 8: Firewall Layer Systematic Verification

**State:** NOT YET TESTED. Only L6 zone protection verified.

### Test Matrix (42 test cases — 21 layers × 2 tests each)

See original spec for full matrix. Key untested layers:
- L0 (identity wall)
- L1 (orchestration theater)
- L2 (false completion)
- L3 (output inspection)
- L4 (wrong cluster) — partially fixed (Bug 21)
- L5 (macro derailment) — partially fixed (Bug 22)
- L7 (coordination gates) — hollow checks unfixed
- V11 L0-L10 (all need testing after Bug 26 fix made them actually fire)

---

## Component 9: Theatrical Garbage Removal

**State:** INVENTORIED. 15 catch{} defects cataloged. Dead code identified. P3 non-compliant.

### Catalog

| # | File | Defect | Fix |
|---|------|--------|-----|
| 1 | `SubagentManagerBrain.ts` | 7 handlers are `console.log + acknowledge` | Implement real operations (Component 6) |
| 2 | `l7-coordination-gates.ts:67` | `catch { return true; }` in focus collision | Real check or throw "not implemented" |
| 3 | `l7-coordination-gates.ts:83` | `catch { return false; }` in execution brain check | Throw if brain not initialized |
| 4 | `l7-coordination-gates.ts:145` | `catch { return true; }` in messenger check | Real queue count check |
| 5 | `index.ts:865,877,887` | 3 `catch { /* non-fatal */ }` blocks | Log with context (P3) |
| 6 | `index.ts:539` | `catch {}` after gate advancement | Log gate failure |
| 7 | `index.ts:552-562` | Brain tick handlers do nothing | Implement or remove |
| 8 | `firewall/index.ts:200-202` | `catch {}` in brain state check | Log which brain failed |
| 9 | `firewall/index.ts:229` | `catch {}` in evidence gate init | Log why init failed |
| 10 | `firewall/index.ts:307` | `catch {}` in audit log | Log audit failure |
| 11 | `firewall/index.ts:321` | `catch {}` in context bridge | Log bridge failure |
| 12 | `layer-engine.ts` | In-memory strike tracker, lost on restart | Persist strikes to Hive |

### P3 Enforcement Rule

Per Runtime Grade Bible P3: **Every `catch {}` with no statements is a DEFECT.** After fix, `grep -r "catch {}" src/` must return ZERO results.

---

# 02_SEQUENCE.md — EXECUTION SEQUENCE

## Phase 1: Hive Bug Fixes + Unification (P0 — ALREADY IN PROGRESS)

### Step 1.1: Hive-mind Schema Fix ✅ COMPLETE
- Parsed `message.data` JSON column for `role`, `summary`, `agent`, `model`
- Parsed `part.data` JSON column for `type`, `text`, `tool`
- Rebuilt (71 modules, 0.47 MB). Deployed to snapshot. Verified in container TUI.
- Error "no such column: role" → GONE

### Step 1.2: Hive-mind Path Fix ✅ COMPLETE
- Added `os.homedir()` + multi-path search
- Added `fs`, `path`, `os` imports
- Rebuilt. Deployed. Verified in container TUI.
- Error "SQLite can't open database" → GONE

### Step 1.3: OpenViking Health Check at Kraken Init
- Add `verifyOpenViking()` to `src/index.ts`
- Call during plugin factory initialization
- Log [FATAL] if unreachable after 3 retries
- **Agent:** Manta (precision, small function)

### Step 1.4: Hive Unification — Delete Duplicate Tools
- Delete `src/tools/kraken-hive-tools.ts`
- Delete `src/kraken-hive/` directory
- Update `src/index.ts`: remove KrakenHiveEngine import, remove hive tools from allTools and getAgentTools
- Keep `kraken_inject_context` as Kraken-specific orchestration tool
- **Agent:** Shark (delete + refactor)

### Step 1.5: Hive Unification — Wire to OpenViking Only
- Verify hive-mind plugin's tools (`hive_context`, `hive_remember`, etc.) are registered for Kraken agents
- Verify NO filesystem fallback exists anywhere in hive operations
- Test: store pattern via `hive_remember`, retrieve via `hive_context` — both go through OpenViking
- **Agent:** Manta (verification)

### Step 1.6: Systemd Verification
- Verify OpenViking service has `Restart=always`
- Verify OpenViking service is enabled: `systemctl --user enable openviking`
- Test: kill OpenViking process, verify it auto-restarts within 5 seconds
- **Agent:** Manta (verification)

## Phase 2: Firewall Overhaul (P0)

### Step 2.1: Port Intent Classifier
- Copy from `Firewall-Edition-v2.0/src/core/intent-classifier.ts`
- Extend with Kraken-specific operation types
- Verify 10 test commands return correct OperationType
- **Agent:** Manta

### Step 2.2: Implement Semantic Anti-Theater (L1/L2)
- Create `semantic-anti-theater.ts`
- Implement stake analysis, output verification, temporal consistency
- Wire into L1/L2 enforcement in firewall/index.ts
- **Agent:** Shark

### Step 2.3: Implement Semantic Anti-Bullshit (L8)
- Create `semantic-anti-bullshit.ts`
- Implement blame attribution, honesty contradiction, ship validation
- Replace V11 L8 regex union
- **Agent:** Shark

### Step 2.4: Enhance Anti-Retard (L6-AR)
- Add action history correlation
- Add temporal degradation detection
- Add context-aware blocking
- **Agent:** Manta

### Step 2.5: Fix L7 Hollow Checks
- Replace all `catch { return true/false }` with real logic
- **Agent:** Manta

### Step 2.6: P3 Compliance — Fix All catch{} Blocks
- Add `console.error` with context to every empty catch
- Zero `catch {}` remaining
- **Agent:** Manta

### Step 2.7: Strike Persistence to Hive
- Add `persistStrikes()` / `loadStrikes()` to layer-engine
- Write through hive-mind plugin to OpenViking
- **Agent:** Manta

## Phase 3: Browser Integration (P1 — CAN RUN IN PARALLEL)

### Step 3.1: Agent-Browser Container Install Fix
- Build custom Docker image: `opencode-test:1.14.34-docker-browser`
- Dockerfile: start from 1.14.34-docker, add `npm install -g agent-browser && agent-browser install`, set PATH
- **Agent:** Manta

### Step 3.2: Browser Tool Verification
- Test all 9 browser tools in container TUI
- Test `browser_open` + `browser_screenshot` + `browser_vision` chain
- **Agent:** Manta

## Phase 4: Vision Integration (P1 — CAN RUN IN PARALLEL)

### Step 4.1: Verify Agent-Vision Plugin in Container
- Ensure agent-vision plugin is in snapshot
- Ensure VLM server is running or can be started
- **Agent:** Manta

### Step 4.2: Test Vision Tools in TUI
- `vlm_status` → returns online/offline
- `vlm_on` → starts if needed
- `vlm_vision` with test image → returns analysis
- **Agent:** Manta

## Phase 5: Subagent + Orchestration (P1)

### Step 5.1: SubagentManagerBrain Handler Implementation
- Implement all 7 handlers with real Docker/tmux operations
- **Agent:** Shark

### Step 5.2: End-to-End Orchestration Test
- Full orchestration cycle test
- All 8 success criteria from Component 7
- **Agent:** Kraken (self-testing)

## Phase 6: Verification + Cleanup (P2)

### Step 6.1: Firewall Layer Systematic Verification
- 42 test cases across 21 layers
- **Agent:** Manta

### Step 6.2: Dead Code + Theatrical Cleanup
- Remove dead imports, unused exports, hollow tick handlers
- **Agent:** Manta

### Step 6.3: Spec Fidelity Final Check
- Compare build against this BUILD_SPEC.md
- All 9 components fully implemented
- **Agent:** Trident/Spider reviewer

### Step 6.4: Ship Package Generation
- Final build, bundle, deploy
- Generate ContainerTestResult.json
- **Agent:** Kraken

---

# 03_DEPENDENCIES.md — DEPENDENCY MAP

## Critical Discoveries (Bugs Found During Spec Research)

| Bug | Impact | Fix Applied | Verified |
|-----|--------|-------------|----------|
| Hive schema mismatch — "no such column: role" | `memread_session` broken on ALL sessions | Parse JSON `data` column | ✅ Container TUI |
| Hive path hardcode — `/home/leviathan/` fails in container | "SQLite can't open database" in container | `os.homedir()` multi-path search | ✅ Container TUI |
| Browser binary PATH — `agent-browser: not found` | Browser tools register but fail to execute | Docker image with baked-in install | ❌ Pending |

## External System Dependencies

| System | Type | Impact if Down |
|--------|------|----------------|
| **OpenViking (localhost:1933)** | HARD — all Hive operations | Kraken loses memory. Patterns, failures lost. |
| **Docker socket (/var/run/docker.sock)** | HARD — subagent spawning | Cannot spawn Shark/Manta subagents. |
| **Agent-Vision VLM (localhost:8082)** | SOFT — vision enhancement | Text-only mode. Browser vision fails. |
| **agent-browser CLI + Chrome** | SOFT — browser enhancement | Cannot browse web. |
| **MiMo API (token-plan-sgp.xiaomimimo.com)** | HARD — model inference | Plugin loads but TUI cannot process messages. |

---

# 04_FAILURE_MODES.md — FAILURE MODE ANALYSIS

## New Discovered Failure Modes

### Failure Mode H1: DB Schema Version Drift
**Probability:** HIGH
**Impact:** OpenCode updates change `opencode.db` schema. Hive-mind queries break with "no such column" errors.
**Detection:** `memread_session` or `hive_context` calls fail. Agent reports database errors.
**Mitigation:** Parse `data` JSON column (already applied). Don't query individual columns that may change. Query only stable columns (`id`, `session_id`, `time_created`, `data`) and parse JSON internally.
**Recovery:** Rebuild hive-mind with updated field extraction from JSON.

### Failure Mode H2: Hardcoded Host Paths in Container
**Probability:** HIGH
**Impact:** Host paths like `/home/leviathan/` fail when plugin runs in container with `/root/` home.
**Detection:** "Cannot open database" errors. File not found on hardcoded paths.
**Mitigation:** Use `os.homedir()` + `path.join()` (P7). Multi-path search as fallback.
**Recovery:** Fix path resolution. Rebuild. Redeploy.

### Failure Mode B1: Browser Binary Missing in Container
**Probability:** HIGH (on first deploy)
**Impact:** Browser tools register (agent sees them) but fail with "agent-browser: not found".
**Detection:** Tool call fails immediately. Error message: "agent-browser failed: /bin/sh: agent-browser: not found".
**Mitigation:** Bake into Docker image. Install in entrypoint as fallback. Set PATH in environment.
**Recovery:** Rebuild Docker image or add to entrypoint.

*(Remaining failure modes from V1.0 spec still apply)*

---

# 05_VERIFICATION.md — VERIFICATION STRATEGY

## Already Verified

| Test | Method | Result | Evidence |
|------|--------|--------|----------|
| Hive schema fix | Container TUI `memread_session` call | ✅ No "no such column" error | TUI capture-pane |
| Hive path fix | Container TUI — DB found at `/root/.local/...` | ✅ Session data readable | TUI capture-pane |
| Browser tool registration | TUI — agent attempted `browser_open` | ✅ Tool recognized | TUI capture-pane |
| L6 zone protection | Write to `/root/.config/opencode/` → BLOCKED | ✅ Working | TUI log |
| L6 normal write | Write to `/tmp/test.txt` → ALLOWED | ✅ Working | File created |
| Agent identity | "who are you" → orchestrator response | ✅ Working | TUI capture-pane |
| Evidence collection | `[HOOK_EVIDENCE]` logs in TUI | ✅ Firing | TUI log |

## Pending Verification (from Components 1-9)

*(See V1.0 spec for full verification strategies — all still applicable)*

---

# BUILD WORKFLOW CHECKLIST

## GATE: PLAN
- [x] Read Runtime Grade Engineering Bible (848 lines, P1-P10)
- [x] Read Firewall-Edition-v2.0 (intent classifier 395 lines + layers + guardian hook)
- [x] Read Trident Deep Planning Mode Layer 2 template
- [x] Read agent-vision plugin source (303 lines, 4 tools, VLM port 8082)
- [x] Read agent-browser CLI docs (v0.23.4, already installed on host)
- [x] Analyze current codebase state (27 bugs fixed, 20 layers, 87 source files, 16.5K loc)
- [x] Discover + fix hive-mind schema bug (message.data JSON column)
- [x] Discover + fix hive-mind path bug (os.homedir() multi-path search)
- [x] Design browser architecture (self-contained in Kraken, src/tools/kraken-browser-tools.ts, 9 tools)
- [x] Verify VLM server status (port 8082, GLM-4.6V-Flash running)
- [x] Update identity TOOLS.md with vision + browser tool descriptions
- [x] Create build specification (this document)

## GATE: BUILD (NOT STARTED)
- [ ] Phase 1: Hive Unification + OpenViking Hardening (Steps 1.3-1.6)
- [ ] Phase 2: Firewall Overhaul (Steps 2.1-2.7)
- [ ] Phase 3: Browser Integration (Steps 3.1-3.2)
- [ ] Phase 4: Vision Integration (Steps 4.1-4.2)
- [ ] Phase 5: Subagent + Orchestration (Steps 5.1-5.2)
- [ ] Phase 6: Verification + Cleanup (Steps 6.1-6.4)
- [ ] Build after EVERY file change
- [ ] Record all decisions to Context Continuity

## GATE: TEST
- [ ] All 42 firewall test cases executed
- [ ] All 7 SubagentManagerBrain handlers tested
- [ ] All 3 spawn tools tested with real subagents
- [ ] Vision tools: vlm_status + vlm_on + vlm_vision + vlm_off all work
- [ ] Browser tools: all 9 tools functional
- [ ] browser_vision compound tool: screenshot → VLM → analysis
- [ ] Hive unification verified: no duplicate tools, OpenViking only
- [ ] OpenViking auto-restart verified (kill process → restarts <5s)
- [ ] catch{} audit: ZERO results
- [ ] Dead code audit: ZERO unused exports/imports
- [ ] ContainerTestResult.json generated

## GATE: VERIFY
- [ ] All systems mechanically verified in container TUI
- [ ] Spec fidelity: build matches this spec exactly
- [ ] No theatrical patterns detected
- [ ] Triple evidence: ContainerSpawnResult + ContainerTestResult + TuiInteraction

## GATE: AUDIT
- [ ] Full code audit (all files reviewed)
- [ ] Security audit (no secrets, no vulnerabilities)
- [ ] Firewall audit (all 20 layers tested)
- [ ] P1-P10 compliance audit (Runtime Grade Bible)

## GATE: DELIVERY
- [ ] Bundle built (bun build successful)
- [ ] Container test complete
- [ ] Ship package generated to `Ship Packages/`
- [ ] Compaction Survival doc updated
- [ ] Build spec archived with date

---

# RUNTIME-GRADE ENFORCEMENT RULES

Same as V1.0 spec — P1 through P10 enforced on ALL code written.

---

# ENGINEERING OATH

> I engineer software, not write code.
> My output works in runtime, not just in theory.
> I handle errors in ALL paths, not just the happy path.
> I validate types at boundaries, never trust assumptions.
> I clean up resources in ALL paths, not just when things go well.
> I match the spec EXACTLY, nothing clipped or simplified.
> I verify mechanically, not by self-claim.
> I ship what works. Anything less is a defect.

---

*BUILD_SPEC_V13_FINAL.md V2.0 — Binding build specification for Kraken V1.3 Final Build*
*9 components | 6 phases | 2 bugs discovered + fixed | 42 firewall test cases | P1-P10 enforced*
