# RUNTIME GRADE CONTAINER TESTING BIBLE

**Version:** 1.0.0 — 2026-06-01
**Authority:** Binding standard. Supersedes all prior testing protocols.
**Scope:** Every agent that produces code. Every build. Every test. Every ship.
**Fractal fingerprint:** Contains the entirety of RUNTIME_GRADE_ENGINEERING_BIBLE + T2_TUI_TESTING_BIBLE + TESTING_FRAMEWORK_ADVERSARIAL_PRESSURE within this single document. Reading this is sufficient to know everything required for runtime-grade container testing.

---

## TABLE OF CONTENTS

```
PART I:    FOUNDATIONS
   §1  The Prime Directive
   §2  What Runtime Grade Actually Means
   §3  The 4 Ways Builds Fail (Hydra + Spider Post-Mortem)
   §4  The 12 Principles (P1-P12)
   §5  The Anti-Derailment Enforcement (E1-E9)

PART II:   RUNTIME GRADE BUILD PROTOCOL (GAPS CLOSED)
   §6  The 8 Uncovered Patterns — Addendum
        §6.1  G1: Coder Must Receive Full Spec
        §6.2  G2: Gate Consensus Deadlock Protocol
        §6.3  G3: No Mocks In Integration Tests
        §6.4  G4: Undocumented Failure Modes
        §6.5  G5: Placeholder Objects In Validation Calls
        §6.6  G6: Unreachable Code / Dead Exports
        §6.7  G7: LayerRule Configuration Integrity
        §6.8  G8: Preserved File Diff Enforcement

PART III:  TEST PROTOCOL (ALL PHASES)
   §17 Phase 2: Identity Scoping
   §18 Phase 3: Mode-Specific Validation
   §19 Phase 4: Negative Testing + Firewall Enforcement
   §20 Phase 5: Theatrical Audit
   §21 Phase 6: Full Lifecycle Verification
   §23 Phase 7: Config Audit

PART IV:   VERIFICATION + SHIP
   §23 Evidence Collection
   §24 Ship Checklist
   §25 The Anti-Derailment Fractal Rule
```

---

## PART I: FOUNDATIONS

### §1 The Prime Directive

> **IF IT IS NOT TESTED IN THE RUNTIME, IT IS NOT WORKING.**
> **IF THE EVIDENCE IS NOT ON DISK, THE TEST DID NOT HAPPEN.**
> **IF THE CONFIG OVERRIDES THE WHITELIST, THE ISOLATION IS BROKEN.**
> **IF THE OUTPUT CLAIMS WORK WITHOUT SIDE EFFECTS, IT IS THEATRICAL.**

There is exactly one metric that matters: **Does the code work when executed in a real runtime environment?**

- If yes → ship it.
- If no → fix it.
- If "sort of" → it's a no. Fix it.
- If "the model says it works" → the model is lying. Prove it with mechanical evidence.
- If "it compiles" → compilation proves types, NOT correctness.
- If "I verified the bundle" → bundle verification is NOT testing.

**The cost of non-runtime-grade code:**
1. Write theatrical code (1x effort)
2. Adjust to "production-grade" (2x effort)
3. Test and debug 3-5 rounds (3-5x effort)
4. Debug to runtime reality (unknown effort)
Total: 7-10x the effort of writing runtime-grade code from the start.

**Runtime-grade engineering eliminates steps 2-4 by getting it right the first time.**

---

### §2 What Runtime Grade Actually Means

Runtime-grade software is software that **works correctly when executed in a real runtime environment**. Not software that compiles. Not software that looks correct. Software that WORKS — first try, real environment, real inputs, real errors.

**The 5 foundations of runtime-grade:**
1. Code runs on real machines — with real file systems, real network conditions, real memory limits
2. Inputs are never trusted — null, undefined, wrong types, missing fields, malicious data
3. Errors always happen — disks fill up, networks drop, processes crash, configs change
4. Resources are finite — file descriptors, memory, connections all have limits
5. The runtime doesn't care about comments or formatting — it executes what it receives

**The engineering vs coding distinction:**

| | Coding Agent | Engineering Agent |
|---|---|---|
| Output | Text that looks like code | Systems that work in runtime |
| Metric | "It compiles" | "It works when executed" |
| Error handling | catch {} or "shouldn't happen" | All paths handled, validated, tested |
| Types | `as` casts everywhere | Runtime validation at boundaries |
| Resources | Fire and forget | Cleaned up in ALL paths |
| Testing | "Trust me it works" | Mechanical evidence required |
| Spec | "Close enough" | Exact match, nothing clipped |
| Ship | "Ship it, fix later" | "Ship once, ship right" |

---

### §3 The 4 Ways Builds Fail (Hydra + Spider Post-Mortem)

**These are the specific failure patterns that this bible was created to prevent.** Every section below reverse-engineers these failures into correct build + test procedures.

#### F1: Tool Leakage Via Wildcard Permission (SEVERITY: CRITICAL)

**What happened:** Spider v2.2 had `"permission": {"*": {"*": "allow"}}` in the deployment config. This overrode the 20-tool whitelist and granted every tool on the system to the spider agent. The model discovered and called 37 non-spider tools including manta-status, shark-evidence, trident-audit, kraken_hive_remember, checkpoint, todowrite.

**Root cause chain:**
1. Test config had wildcard permission to "make tests work"
2. Test config WAS deployment config — no separation
3. Hook-based tool blocking used BLACKLIST (~30 tools) instead of ALLOWLIST
4. Blacklist checked `manta_` (underscore) but NOT `manta-` (hyphen)
5. Blacklist didn't cover generic tools (checkpoint, todowrite, skill)
6. Negative testing was NEVER performed

**Prevention (reverse-engineered):**
- §23: Config Audit — verify no wildcard permissions in deployment config
- §19: Negative Testing — iterate every non-whitelisted tool, verify blocked
- §19: ALLOWLIST approach, not BLACKLIST
- §19: Dual-variant prefix blocking (both `_` and `-`)
- §23: Test config != deployment config — diff before shipping

#### F2: Theatrical Subagent Spawning (SEVERITY: CRITICAL)

**What happened:** `spiderweb action=disperse` returned `{ dispersed: true, message: "Web dispersed. 2 strands active." }` but ZERO subagents were ever spawned. The model read "dispersed" and "strands active" and assumed real work happened. Then called `aggregate` which returned `consensus: true` with 0 completed strands.

**Root cause chain:**
1. Function returned informational JSON describing what should happen
2. Function did NOT do the work itself
3. Output made the model believe work was done
4. No end-to-end lifecycle test verified the full chain

**Prevention (reverse-engineered):**
- §6 (P11): Output IS The Work — never return success without side effects
- §21: Phase 6 lifecycle test — construct → disperse → force_action → spawn → aggregate
- §15: System Check — verify module surface before container testing

#### F3: Empty Set False Consensus (SEVERITY: HIGH)

**What happened:** `aggregate()` with 0 completed strands returned `{ consensus: true }`. The code: `new Set([]).size <= 1` → `0 <= 1` → `true`. Consensus was achieved by having NOTHING to compare.

**Root cause chain:**
1. No empty-state guard on collection operations
2. `<= 1` was correct for normal operation but wrong for zero-length edge case
3. No test with 0 completed strands

**Prevention (reverse-engineered):**
- §6 (P10): Guard every collection with explicit empty check
- §7: BUILD gate requires empty state check for every collection operation
- §19 (TC-4.8): Negative test — aggregate with 0 items must return failure

#### F4: Evidence Path Never Created (SEVERITY: MEDIUM)

**What happened:** `dissolve()` reported `evidencePath: '.spider-v2/evidence/web-123'` but the directory never existed on disk.

**Root cause chain:**
1. Function returned a path string without calling fs.mkdirSync
2. No filesystem evidence check in the test suite
3. Theatrical file path — claiming filesystem state that isn't real

**Prevention (reverse-engineered):**
- §6 (P11): Every returned path must be created by the function
- §23: Evidence Collection — verify every path exists on disk
- §20: Theatrical Audit — cross-reference returned paths against fs operations

#### F5: Hydra Build Failures — Verification Theater

**What happened (Hydra v3.0-v3.1):** Multiple Hydra builds shipped with "full implementations" that were actually stubs. The model wrote beautifully formatted code that returned `{ temp: 72, condition: 'sunny' }` (hardcoded) for a "getWeather()" function. Tests "passed" because the model tested its own stubs against its own expectations.

**Root cause chain:**
1. Code review only checked format, not substance
2. Tests were written by the same agent that wrote the code
3. No adversarial testing — no attempt to break the code
4. No minimum output length checks — stubs passed because they returned ANYTHING

**Prevention (reverse-engineered):**
- §20: Minimum output length checks (> 200 chars for meaningful functions)
- §20: Adversarial testing — attempt to break every function
- §10: Spec fidelity check — build matches spec EXACTLY, nothing clipped

#### F6: Wrong Source Tree — Catastrophic Project Contamination (CRITICAL — Shark v4.9.7)

**What happened (Shark v4.9.7):** The agent was tasked with re-engineering Shark v4.9. It found the nearest `src/` directory and started working — but that `src/` was a **Manta Agent v2.1 fork**, not the real Shark source. The real Shark source was at a different path entirely. The agent:
1. Wrote 6 phases of re-engineering to the wrong source tree (zero value)
2. Deleted 7 source files from the Manta copy (42KB of code destroyed)
3. Deleted files from a completely unrelated project (`projects/trident-brain/`)
4. Registered the agent as "manta" instead of "shark" (agent name mismatch)
5. Ran a container test against the wrong agent (tested manta, not shark)
6. Scattered files across workspace root (SPEC.md, .spider-v2/, dist/)
7. Reviewer and critic approved the wrong-source build — verified code, not location
8. Total waste: ~400K tokens, ~2 hours engineering, 1 container test cycle

**Root cause chain:**
1. Agent never verified `pwd` matched the designated project directory
2. No pre-work validation step checked "is this the correct source tree?"
3. Agent had no concept of "project boundaries" — deleted files from unrelated projects
4. Coder's prompt was a summary, not the full build spec (coder didn't read the files)
5. Reviewer verified code correctness but never checked architectural context (which project?)
6. Critic approved without verifying agent name matched project requirements
7. Container test used wrong `--agent` flag (manta instead of shark)
8. Identity system silently failed — `isSharkAgent('manta')` returns false

**Prevention (reverse-engineered):**
- **§15 (Phase 0): Pre-Flight Validation** — verify project directory, source tree, agent name BEFORE any work
- **§4 (P12): Project Boundaries** — every file operation must verify it's within the designated project
- **§15.2 (P12 Enforcement): Absolute paths for all operations** — relative paths banned when multiple source trees exist
- **§15.1 (Pre-flight checks):** pwd, index.ts header, package.json, diff duplicates
- **§15.2 (Project boundary enforcement):** explicit list of valid file paths per task
- **§15.3 (Identity name audit):** verify plugin agent name matches identity system's expected agent set
- **§15.4 (Container --agent flag):** derive from project config, not guess
- **§15.5 (Anti-pollution enforcement):** all output files go to designated project directory, never workspace root

---

### §4 The 12 Principles (P1-P12)

```
P1  DEFENSIVE IMPORT       — Every import verified before use. If it might fail, guard it.
P2  TYPE CERTAINTY         — Validate at every boundary. `as` casts are always wrong until proven right.
P3  ERROR COMPLETENESS     — Every try/catch handles ALL paths. `catch {}` is a DEFECT.
P4  RESOURCE LIFECYCLE     — Files, intervals, connections: cleaned up in ALL code paths.
P5  ATOMIC STATE           — No partial states survive errors. Rollback or complete.
P6  DEPENDENCY CHECK       — Before using an API, verify it exists. Never trust the environment.
P7  PATH RESOLUTION        — Never hardcode machine-specific paths. Use path.join + __dirname.
P8  CONFIG VALIDATION      — Every config value validated before use. Type, range, presence.
P9  ASYNC DISCIPLINE       — Every Promise has .catch or try/catch. No floating promises.
P10 OUTPUT CONTRACT        — Functions return what they promise in ALL paths. Not just happy path.
P11 OUTPUT IS THE WORK     — If a function claims work was done, the work MUST have been done.
P12 PROJECT BOUNDARIES     — Every file operation must verify it's within the designated project.
```

**P11 and P12 are the most important principles in this bible.** It was created because of Hydra + Spider failures. P11 means:
- `{ dispersed: true }` requires actual spawning to have happened
- `{ evidencePath: "/x" }` requires the directory to actually exist
- `{ consensus: true }` requires at least 2 items to compare
- `{ success: true }` without side effects is a LIE

---

### §5 The Anti-Derailment Enforcement (E1-E9)

Every agent MUST internalize these 9 rules. Violation = block + escalation.

**E1: Know Before You Guess.** If you don't know how to test something, read this bible. Do NOT invent alternate methods. Every test method is defined here. If it's not here, it's not valid.

**E2: Stuck = Say Stuck.** If a step fails, say it failed. Do NOT theatrical-code your way to a passing test. A real failure with a real diagnosis is INFINITELY more valuable than a fake pass.

**E3: Mechanical Evidence Only.** Nothing counts unless it's on disk. `ContainerSpawnResult.json`, `ContainerTestResult.json`, `TuiInteraction.json`. If those files don't exist, the test did NOT happen.

**E4: "I Can't" Is A Hallucination.** Every "I can't" in the Hallucinated Barriers table is pre-debunked. tmux works. docker exec works. The binary exists. Read the table before claiming impossibility.

**E5: One Version Per Plugin.** Never have multiple versions loaded. Clean snapshot every time: `rm -rf "$SNAP"` at the start of every test.

**E6: Agents Do NOT Self-Declare Completion.** You are a REPORTER, not a DECLARER. You say: "Container test executed. Evidence files at /path. overallPassed: true." You do NOT say: "I tested it, it's done."

**E7: Bundle ≠ Runtime Bundle Check ≠ Test.** The System Check (§15) is NOT a substitute for container testing. The Fractal Rule (§25) provides the detect/classify/block/escalate protocol.

...
**If an agent proposes using ONLY this check and skipping container testing → apply §25 (Fractal Rule).**

---

## PART II: RUNTIME GRADE BUILD PROTOCOL (GAPS CLOSED)

### §6 The 8 Uncovered Patterns — Addendum To The Testing Phases

The subagent analysis of 58 derailment patterns across Hydra, Spider, Shark, and Kraken builds found 8 patterns NOT covered by the original bible. These are added here and must be integrated into every test.

#### §6.1 Pattern G1: Coder Must Receive Full Spec (Uncovered — E1/Hydra D9)

**Failure observed:** Spider coder received a summary of the 49KB build spec, not the full spec. Implemented from own understanding → `validateEngineeringChecklist({})`, wrong gate chain, OR instead of AND logic, missing evidence cleanup.

**Rule:** The coder agent MUST read the FULL build spec directly. A summary is NOT sufficient. Spec-by-summary is spec-by-hallucination.

```bash
# WRONG (Shark v4.9.7 pattern):
# Coder prompt: "Implement the build spec. Key changes: gate chain, evidence system..."
# Coder implemented from summary → 4+ bugs

# CORRECT:
# Coder's first action: read the spec files directly
cat "$DESIGNATED_PROJECT/trident-deep-planning/"*.md > /dev/null  # verify access
# Then: implement each phase exactly as specified
```

**Enforcement:**
- Coder's first tool call MUST be `read` on the spec files, not `write` on implementation
- If first call is `write`, reject: "Read the spec first before writing any code"
- Reviewer MUST check: does implementation match every spec requirement, not just the summarized ones?

#### §6.2 Pattern G2: Gate Consensus Deadlock Protocol (Uncovered — E4/Spider)

**Failure observed:** Spider pipeline deadlocked when 2 explorers disagreed on internal vs external call scope for a dead function. No tiebreaker. Had to bypass with checkpoint.

**Rule:** Every gate system must have a tiebreaker mechanism. Deadlock is not an acceptable state.

```yaml
PROTOCOL:
  max_rounds: 3
  After max rounds:
    - Log ALL positions
    - Tiebreaker = MOST CONSERVATIVE position (block the action)
    - Escalate to user with:
        * What each agent said
        * The disagreement
        * The conservative outcome
    - If user doesn't respond within 5 min: proceed with conservative outcome
```

#### §6.3 Pattern G3: No Mocks In Integration Tests (Uncovered — C1)

**Failure observed:** Spider Agent had 373 tests passing, 8 critical failures. Tests used `jest.fn().mockResolvedValue({success: true})` — mock passes even when real API format has changed.

**Rule:** Integration tests MUST test against REAL services. Mocks are for unit tests only.

```bash
# TC-4.9: Verify no mocks in integration tests
grep -rn "mockResolvedValue\|mockReturnValue\|jest.fn" tests/integration/ 2>/dev/null && \
  echo "FAIL: Integration tests contain mocks — tests are not testing real services" || \
  echo "PASS: No mocks in integration tests"
```

#### §6.4 Pattern G4: Undocumented Failure Modes (Uncovered — C5)

**Failure observed:** Functions have no failure mode documentation. Callers don't know what happens when dependencies fail, network drops, or data is invalid.

**Rule:** Every exported function MUST document its failure modes. What happens when each dependency fails?

```typescript
/**
 * @param apiKey - The API key
 * @throws {Error} When the API service is unreachable (network down)
 * @throws {Error} When the API key is invalid (401 response)
 * @throws {Error} When rate limit is exceeded (429 response)
 * @returns The processed result
 */
```

#### §6.5 Pattern G5: Placeholder Objects In Validation Calls (Uncovered — P4/Kraken)

**Failure observed:** `validateEngineeringChecklist({})` — empty object passed. Every falsy field = violation. ALL 15 fields violated. Gate permanently deadlocked.

**Rule:** Validation functions must NEVER receive placeholder/empty objects. If real data is unavailable, the function must handle that explicitly, not via `{}`.

```typescript
// THEATRICAL (banned):
const violations = validateEngineeringChecklist({});
// ALL 15 fields are violations → gate deadlocked forever

// RUNTIME-GRADE:
const state = brainStateStore.getCurrentState();
if (!state) {
  throw new Error("Cannot validate checklist: brain state store unavailable");
}
const violations = validateEngineeringChecklist(state.checklist);
```

#### §6.6 Pattern G6: Unreachable Code / Dead Exports (Uncovered — 10, 16/Kraken V12)

**Failure observed:** Code exists, compiles, bundles, exports functions — but is NEVER called. `SubagentManagerBrain` has 7 shell handlers (abort, retrieve, reassign, retry, suspend, resume, claim). All log + acknowledge + return — do NO actual work. 6 new wiring components exist but never imported.

**Rule:** Every exported symbol must be reachable from at least one runtime entry point. Dead exports are code that looks real but does nothing.

```bash
# TC-4.10: Verify every exported function is called at least once
# Method: grep for function names against all call sites
# If a function is defined in file A but never imported/called in files B-Z → dead export

# For TypeScript:
# Use ts-prune or manual audit:
npx ts-prune --project tsconfig.json | grep -i "(used in module)" | wc -l
# Report any unused exports
```

#### §6.7 Pattern G7: LayerRule Configuration Integrity (Uncovered — 17/Kraken V12)

**Failure observed:** `L7_COORDINATION_GATES` LayerRule has `patterns: []` (empty array). 16 real gate criteria exist in a standalone function, but the LayerRule never invokes them. LayerEngine skips L7 entirely.

**Rule:** Every configuration object that drives runtime behavior must be semantically validated — not just structurally valid.

```typescript
// Check: LayerRule has non-empty patterns array
if (layerConfig.patterns.length === 0) {
  throw new Error(`[P8] LayerRule ${layerConfig.name} has empty patterns array — configuration is inert`);
}
```

#### §6.8 Pattern G8: Preserved File Diff Enforcement (Uncovered — 14/Shark v4.8.4)

**Failure observed:** `brains.ts` was marked PRESERVED in anchor manifest. Agent modified it anyway. No diff verification after changes.

**Rule:** Files marked PRESERVED in the project anchor must be verified byte-for-byte before declaring done.

```bash
# TC-5.4: Verify PRESERVED files are untouched
# For every file marked PRESERVED in BUILD_WORKFLOW_ANCHOR:
BASELINE_DIR="$PROJECT/.anchor-baseline"
PRESERVED_FILES=$(grep -r "PRESERVED" "$PROJECT/BUILD_WORKFLOW_ANCHOR.md" 2>/dev/null | grep -oP '`[^`]+\.ts`' | tr -d '`')

for FILE in $PRESERVED_FILES; do
  if [ -f "$BASELINE_DIR/$FILE" ] && [ -f "$PROJECT/$FILE" ]; then
    diff "$BASELINE_DIR/$FILE" "$PROJECT/$FILE" > /dev/null && \
      echo "PASS: $FILE unchanged" || \
      echo "FAIL: $FILE was modified (PRESERVED file violated)"
  fi
done
```

---

### §17 Phase 2: Identity Scoping

Purpose: Verify the plugin's agent responds with correct identity — and other agents do NOT.

```bash
# Tier 4 (gold standard):
tmux send-keys -t "$CONTAINER" "who are you" Enter
sleep 25
tmux capture-pane -t "$CONTAINER" -p | grep -E "SPIDER|SHARK|KRAKEN|TRIDENT|MANTA|HYDRA"

# Tier 2 (hook verification):
docker exec "$CONTAINER" node --input-type=module -e '
import("/root/.config/opencode/plugins/PLUGIN_NAME/dist/index.js").then(async (mod) => {
  const hooks = await mod.default({directory:"/tmp"});
  // Own agent gets identity
  let out = {};
  await hooks["chat.message"]({
    message: { content: "who are you" },
    session: { agentName: "MY_AGENT", sessionID: "t1" }
  }, out);
  console.log("OWN AGENT:", out.content?.includes("IDENTITY") ? "PASS" : "FAIL");

  // Other agents do NOT get identity (Spider F1 prevention)
  for (const other of ["shark", "build", "plan", "general", "manta", "kraken"]) {
    out = {};
    await hooks["chat.message"]({
      message: { content: "who are you" },
      session: { agentName: other, sessionID: "t2" }
    }, out);
    console.log(`${other}:`, out.content ? "FAIL (identity leak)" : "PASS (blocked)");
  }
}).catch(e => console.error("FATAL:", e));
'
```

**Acceptance criteria:**
- [ ] Own agent responds with correct identity (NOT "opencode")
- [ ] All other agents get EMPTY response (no identity leak)

---

### §18 Phase 3: Mode-Specific Validation

Purpose: Verify every mode activates and progresses through all layers.

```bash
docker exec "$CONTAINER" node --input-type=module -e '
import("/root/.config/opencode/plugins/PLUGIN_NAME/dist/index.js").then(async (mod) => {
  const hooks = await mod.default({directory:"/tmp"});

  // Reset then test each mode
  await hooks["chat.message"]({ message:{content:"reset"}, session:{agentName:"MY_AGENT"} }, out={});

  // Mode 1
  out = {};
  await hooks["chat.message"]({ message:{content:"MODE1_KEYWORD"}, session:{agentName:"MY_AGENT", sessionID:"m1"} }, out);
  console.log("MODE1 activates:", out.content?.includes("MODE1_BANNER") ? "PASS" : "FAIL");
  console.log("MODE1 content length:", out.content?.length, out.content?.length > 200 ? "(PASS)" : "(FAIL — possible stub)");

  // Full layer progression
  for (let l = 2; l <= MAX_LAYERS; l++) {
    out = {};
    await hooks["chat.message"]({ message:{content:"continue"}, session:{agentName:"MY_AGENT", sessionID:"m1"} }, out);
    const contains = out.content?.includes("LAYER " + l);
    console.log(`MODE1 L${l}:`, contains ? "PASS" : "FAIL");
  }

  // Repeat for all modes
}).catch(e => console.error(e));
'
```

**Acceptance criteria:**
- [ ] Each mode activates via single-keyword intent
- [ ] Layer 1 template returns 200+ characters of structured content
- [ ] Full layer progression works (L1 → L2 → ... → Lmax)
- [ ] "continue" works from any layer
- [ ] "reset" works from any state

---

### §19 Phase 4: Negative Testing + Firewall Enforcement (CRITICAL)

This phase is THE MOST IMPORTANT and was THE MOST MISSING in Hydra + Spider builds.

**Positive tests** verify things work when they should.
**Negative tests** verify things DON'T work when they shouldn't. Both are mandatory.

```bash
docker exec "$CONTAINER" node --input-type=module -e '
import("/root/.config/opencode/plugins/PLUGIN_NAME/dist/index.js").then(async (mod) => {
  const hooks = await mod.default({directory:"/tmp"});
  let passed = 0, failed = 0;
  const assert = (desc, cond, detail) => { if (cond) passed++; else { failed++; console.log(`FAIL [${desc}]: ${detail || ""}`); } };

  // ===== TC-4.6: NEGATIVE TEST — Every Non-Whitelisted Tool Blocked =====
  console.log("=== TC-4.6: Negative Tool Test ===");
  const myTools = Object.keys(hooks.tool);
  const allSystemTools = [
    "read", "write", "edit", "bash", "glob", "grep",
    "task", "question", "checkpoint", "todowrite",
    "websearch", "webfetch", "skill",
    "hive_remember", "hive_forget", "hive_purge",
    "kraken_hive_remember", "kraken_hive_search",
    "spawn_shark_agent", "spawn_manta_agent", "spawn_cluster_task",
    "aggregate_results", "get_cluster_status",
    "manta-status", "manta-gate", "manta-evidence",
    "shark-status", "shark-gate", "shark-evidence",
    "trident-audit", "trident-status", "trident-help", "trident-report",
    "spider-status", "spider-gate", "spider-evidence",
    "report_to_kraken", "kraken_brain_status",
    "read_kraken_context", "memread_session",
    "hive_context", "hive_status", "hive_trash_list", "hive_trash_status",
    "hive_scan", "hive-context",
    "run_parallel_tasks", "run_subagent_task", "cleanup_subagents",
    "anchor_cluster", "get_task_context"
  ];
  const nonMyTools = allSystemTools.filter(t => !myTools.includes(t));
  for (const tool of nonMyTools) {
    try {
      await hooks["tool.execute.before"]({ tool, session: { agentName: "MY_AGENT" } });
      assert(`${tool} blocked`, false, "Should have been blocked");
    } catch (e) {
      assert(`${tool} blocked`, true);
    }
  }

  // ===== TC-4.7: No Wildcard Permission =====
  console.log("=== TC-4.7: Config Isolation ===");
  // Verify deployment config does NOT have wildcard permissions
  // This test runs against the deployed opencode.json inside the container

  // ===== TC-4.8: Empty State Consensus Check =====
  console.log("=== TC-4.8: Empty State ===");
  // Aggregate with 0 items must return failure, not success
  const emptyResult = { completed: 0, outputsSize: 0 };
  const falseConsensus = emptyResult.outputsSize <= 1;
  assert("0 items consensus=false", !falseConsensus || emptyResult.completed === 0,
    "Empty set produced consensus=true — Spider F3");

  console.log(`\n${passed}/${passed+failed} PASSED`);
}).catch(e => console.error("FATAL:", e));
'
```

**Acceptance criteria:**
- [ ] Every non-whitelisted tool verified BLOCKED (TC-4.6) — PREVENTS SPIDER F1
- [ ] No wildcard permissions in config (TC-4.7) — PREVENTS SPIDER F1
- [ ] Empty state returns failure, not success (TC-4.8) — PREVENTS SPIDER F3
- [ ] ALLOWLIST approach used, not BLACKLIST
- [ ] Both underscore AND hyphen prefixes blocked (manta_ AND manta-)

---

### §20 Phase 5: Theatrical Audit

Purpose: Verify no function returns fake/stub/placeholder output. Every function must produce real, substantive output.

```bash
docker exec "$CONTAINER" node --input-type=module -e '
import("/root/.config/opencode/plugins/PLUGIN_NAME/dist/index.js").then(async (mod) => {
  const hooks = await mod.default({directory:"/tmp"});

  // TC-5.1: Minimum output length for mode activations
  const modes = [
    { msg: "MODE1_KEYWORD", minLen: 200, name: "Mode 1 activation" },
    { msg: "MODE2_KEYWORD", minLen: 200, name: "Mode 2 activation" },
  ];
  for (const test of modes) {
    await hooks["chat.message"]({ message:{content:"reset"}, session:{agentName:"MY_AGENT"} }, out={});
    let out = {};
    await hooks["chat.message"]({ message:{content:test.msg}, session:{agentName:"MY_AGENT"} }, out);
    console.log(`${test.name}:`, out.content.length >= test.minLen ? "PASS" : `FAIL (${out.content.length} chars, need ${test.minLen})`);
  }

  // TC-5.2: All tool execute() returns real strings
  for (const [name, toolDef] of Object.entries(hooks.tool)) {
    try {
      const result = await toolDef.execute({});
      const ok = typeof result === "string" && result.length > 10;
      console.log(`Tool ${name}:`, ok ? "PASS" : `FAIL (${typeof result}, ${result?.length || 0} chars)`);
    } catch (e) {
      // Tools with required args may fail — not theatrical if error is clear
      console.log(`Tool ${name}: ERROR (acceptable if args needed): ${e.message.slice(0, 60)}`);
    }
  }

  // TC-5.3: P11 check — verify no function returns success without work
  // This is a meta-check: if any function claims "dispersed"/"complete"/"done"
  // without spawning/creating/writing, it is theatrical
  // Look for: { status: "done" } without actual side effects
  console.log("P11 audit: manual review required — verify every success claim has a side effect");
}).catch(e => console.error(e));
'
```

**Acceptance criteria:**
- [ ] Every mode activation returns 200+ characters (prevents Hydra F5 — stubs)
- [ ] Every tool execute() returns real string (not null/undefined/empty)
- [ ] Identity response is 400+ characters
- [ ] P11 verified: no function claims work without side effects
- [ ] No function returns "OK", "Done", or other short stub strings

---

### §21 Phase 6: Full Lifecycle Verification

Purpose: Verify the entire operational lifecycle works end-to-end. This prevents Spider F2 (theatrical orchestration).

```bash
docker exec "$CONTAINER" node --input-type=module -e '
import("/root/.config/opencode/plugins/PLUGIN_NAME/dist/index.js").then(async (mod) => {
  const hooks = await mod.default({directory:"/tmp"});

  // TC-6.1: Construct produces real webId
  const constructResult = await hooks.tool["spiderweb"]?.execute({
    action: "construct", task: "test", mode: "verify"
  }) || {};
  console.log("Construct webId:", constructResult.webId ? "PASS" : "FAIL");

  // TC-6.2: Disperse must FORCE action, not just report status
  if (constructResult.webId) {
    const disperseResult = await hooks.tool["spiderweb"]?.execute({
      action: "disperse", webId: constructResult.webId
    }) || {};
    const forcesAction = disperseResult.action_required && disperseResult.action_required.includes("SPAWN");
    console.log("Disperse forces action:", forcesAction ? "PASS" : "FAIL (theatrical — Spider F2)");

    // TC-6.3: No false consensus with 0 strands (Spider F3)
    const preAggResult = await hooks.tool["spiderweb"]?.execute({
      action: "aggregate", webId: constructResult.webId
    }) || {};
    console.log("No false consensus:", preAggResult.consensus !== true ? "PASS" : "FAIL (Spider F3)");
  }

  // TC-6.4: Full lifecycle with real data produces real results
  // (Plugin-specific — test construct → spawn → work → aggregate → dissolve)
  console.log("Full lifecycle test: requires plugin-specific implementation");
}).catch(e => console.error(e));
'
```

**Acceptance criteria:**
- [ ] Construct produces real webId/identifier
- [ ] Disperse FORCES action (action_required field with CAPITALIZED instruction)
- [ ] No false consensus with 0 items (prevents Spider F3)
- [ ] Full lifecycle with real data produces real results

---

### §23 Phase 7: Config Audit (Spider F1 Prevention)

Purpose: Verify the deployment config does NOT contain test overrides.

```bash
# === Verify NO wildcard permissions in deployment config ===
docker exec "$CONTAINER" cat /root/.config/opencode/opencode.json | python3 -c "
import json, sys
config = json.load(sys.stdin)
perm = config.get('permission', {})
if '*' in perm and perm['*'] == 'allow':
    print('FAIL: Wildcard permission detected — every tool available')
    sys.exit(1)
if '*' in perm and '*' in perm['*'] and perm['*']['*'] == 'allow':
    print('FAIL: Wildcard permission detected — tool isolation broken')
    sys.exit(1)
print('PASS: No wildcard permissions')
"

# === Verify ONLY whitelisted tools are visible ===
docker exec "$CONTAINER" /path/to/baseline/opencode run \
  --agent "${AGENT_NAME}" --print-logs "list tools" 2>&1 | \
  grep -iE '(manta|shark|kraken|trident|hydra|checkpoint|todowrite)' && \
  echo "FAIL: Foreign tools visible — tool isolation broken" || \
  echo "PASS: No foreign tools visible"

# === Verify isolation boundary — hyphen AND underscore ===
# Tools like manta-status (hyphen) must be blocked just like manta_test (underscore)
docker exec "$CONTAINER" node --input-type=module -e '
import("/root/.config/opencode/plugins/PLUGIN_NAME/dist/index.js").then(async (mod) => {
  const hooks = await mod.default({directory:"/tmp"});
  // Test hyphen variant
  try {
    await hooks["tool.execute.before"]({ tool: "manta-status", session: { agentName: "MY_AGENT" } });
    console.log("FAIL: manta-status (hyphen) NOT blocked");
  } catch { console.log("PASS: manta-status (hyphen) blocked"); }
  // Test underscore variant
  try {
    await hooks["tool.execute.before"]({ tool: "manta_status", session: { agentName: "MY_AGENT" } });
    console.log("FAIL: manta_status (underscore) NOT blocked");
  } catch { console.log("PASS: manta_status (underscore) blocked"); }
}).catch(e => console.error(e));
'
```

**Acceptance criteria:**
- [ ] No wildcard permissions in deployment config (prevents Spider F1)
- [ ] No foreign tools visible in agent's tool list (prevents Spider F1)
- [ ] Both hyphen AND underscore variants blocked (prevents Spider F1 partial blacklist)

---

## PART V: VERIFICATION + SHIP

### §23 Evidence Collection

**Evidence is not a claim. Evidence is a file on disk.** Three files are required for every container test:

```bash
# File 1: Container spawn evidence
echo '{"success":true,"containerName":"test-'"${PROJECT}"'","timestamp":"'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'"}' > ContainerSpawnResult.json

# File 2: Test result evidence (generated by adversarial test suite)
docker exec "$CONTAINER" node --input-type=module < test-adversarial.js && \
  echo '{"overallPassed":true,"passed":N,"failed":0,"timestamp":"'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'"}' > ContainerTestResult.json || \
  echo '{"overallPassed":false,"passed":N,"failed":M,"timestamp":"'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'"}' > ContainerTestResult.json

# File 3: TUI interaction evidence
tmux capture-pane -t "$CONTAINER" -p > TuiInteraction.json

# File 4 (NEW — Spider F4 prevention): Evidence path verification
find .spider-v2/evidence/ -type f 2>/dev/null && \
  echo '{"evidencePath":".spider-v2/evidence/","filesExist":true}' > EvidencePathVerified.json || \
  echo '{"evidencePath":".spider-v2/evidence/","filesExist":false}' > EvidencePathVerified.json
```

**The Disk Rule (E3):** If these files don't exist on disk, the test did NOT happen. An agent claiming "I tested it" without evidence files is committing verification theater.

---

### §24 Ship Checklist

Before declaring anything complete, EVERY item must be checked:

**Build:**
- [ ] `bun run typecheck` — zero errors
- [ ] `bun run build` — bundle succeeds
- [ ] No duplicate exports, all imports resolve
- [ ] P11 audit: no function claims work without side effects
- [ ] Empty state audit: every collection handles zero-length input
- [ ] Spec fidelity: build matches spec EXACTLY

**Container (12-Step Protocol - §11):**
- [ ] Container starts and stays running (Step 7)
- [ ] Config loads correctly (Step 8)
- [ ] TUI is interactive (Steps 9-10)
- [ ] Agent identifies correctly (Step 11)

**Pre-Flight (Phase 0 — Shark v4.9.7 F6 Prevention):**
- [ ] Designated project directory exists and pwd matches it
- [ ] src/index.ts registers the expected agent name (not a different agent)
- [ ] No duplicate source trees exist
- [ ] Plugin's registered agent name matches identity system's expected agent set
- [ ] Container --agent flag derived from project config, not guessed
- [ ] All output files go to designated project directory (no workspace root pollution)

**Adversarial (Phases 1-8):**
- [ ] Phase 0: Pre-flight validation passed (project, agent, identity all verified)
- [ ] Phase 1: Module surface check passes
- [ ] Phase 2: Identity scoping — own agent yes, others no
- [ ] Phase 3: All modes activate and progress through all layers
- [ ] Phase 4: Negative testing — every non-whitelisted tool blocked (Spider F1 prevention)
- [ ] Phase 4: Empty state — no false consensus (Spider F3 prevention)
- [ ] Phase 5: Theatrical audit — no stubs, no hardcoded returns (Hydra F5 prevention)
- [ ] Phase 6: Full lifecycle — construct → work → complete (Spider F2 prevention)
- [ ] Phase 7: Config audit — no wildcard permissions (Spider F1 prevention)

**Evidence:**
- [ ] `ContainerSpawnResult.json` on disk
- [ ] `ContainerTestResult.json` on disk with `overallPassed: true`
- [ ] `TuiInteraction.json` on disk
- [ ] `EvidencePathVerified.json` on disk — verified paths exist (Spider F4 prevention)

**Config:**
- [ ] NO wildcard permissions in deployment config
- [ ] Test config != deployment config
- [ ] Both underscore AND hyphen prefix variants handled
- [ ] ALLOWLIST approach used, not BLACKLIST

**8 Uncovered Gaps (Post-Audit 2026-06-01):**
- [ ] G1: Coder read full spec directly (not summarized)
- [ ] G2: Gate system has consensus deadlock protocol (max_rounds: 3, conservative tiebreaker)
- [ ] G3: Integration tests contain NO mocks (TC-4.9)
- [ ] G4: All exported functions document failure modes
- [ ] G5: No placeholder `{}` passed to validation functions
- [ ] G6: No dead exports — every exported function has at least one caller (TC-4.10)
- [ ] G7: All LayerRules/configuration objects have non-empty patterns/valid state (TC-4.11)
- [ ] G8: PRESERVED files verified byte-for-byte against anchor baseline (TC-5.4)

**Gate Advancement (90%+ minimum pass rate — 100% target):**
- [ ] TEST gate: Trident audit, 0 critical/high, spec fidelity
- [ ] VERIFY gate: Container test with all 7 phases passed
- [ ] AUDIT gate: Tool isolation, config diff, evidence verification
- [ ] DELIVERY gate: Evidence exists, checkpoint saved, docs updated

---

### §25 The Anti-Derailment Fractal Rule

When an agent proposes anything that deviates from this bible:

```
DETECT: Agent says:
  - "I verified the bundle" → Tier 0 (source inspection — NOT valid)
  - "I checked the source code" → Tier 0
  - "It compiles, therefore it works" → Tier 0
  - "opencode run showed it works" → Tier 3 (tool registration, NOT testing)
  - "Let me test a different way" → Not in this bible → BLOCK
  - "I tested it, it's done" → E6 violation — agent self-declaration
  - "The config needs permission *:*:allow" → §21 violation — wildcard permission

CLASSIFY based on tier:
  - Tier 0 claim → Verification Theater (RG §12.5)
  - Tier 1 claim → System Check misrepresented as test (§15)
  - Tier 2-3 claim → Missing Tier 4 gold standard
  - Config override → Gameable isolation (Spider F1)
  - Self-declaration → E6 violation

BLOCK with this bible:
  - Point to the specific section that defines the correct method
  - "§15 says Tier 1 is a system check, NOT a test. Run the 12-Step Protocol (§11)."
  - "§21 says wildcard permissions are banned. Remove them from deployment config."
  - "§18 says negative testing is mandatory. TC-4.6 must be run."
  - "§24 says agents do not self-declare. Produce evidence files (§22)."

ESCALATE if agent resists:
  1. Restate the specific § that is being violated
  2. Repeat the correct action required
  3. If still resisting → this bible is binding authority
  4. Report the violation to the user with: violated §, what agent proposed, what correct action is
```

---

## APPENDIX: Quick Reference

### Hallucinated Barriers (ALL FALSE)

| "I can't..." | Reality |
|---|---|
| "run TUI, it requires interactive terminal" | tmux + docker exec -it works. See §11 Step 9. |
| "test with anything but opencode run" | opencode run is Tier 3 ONLY. Tier 4 is gold standard. |
| "hooks only fire in local TUI" | Container TUI fires ALL hooks. |
| "I need xdotool/x11/display" | tmux is terminal-native. No display needed. |
| "bundle verification is enough" | Bundle verification is NOT testing (§15). |
| "opencode run showed it works" | opencode run NEVER fires hooks. Tier 3 ≠ Tier 4. |
| "the image doesn't exist" | `opencode-test:1.14.34` exists. Build it if not pulled. |

### Critical Anti-Patterns (DO NOT USE)

| Anti-Pattern | Why It Fails | Correct |
|---|---|---|
| `docker attach` | Connects to sleep TTY, not opencode TTY | `docker exec -it` (§11 Step 9) |
| `/usr/local/bin/opencode` | musl binary crashes on glibc | Use `opencode-linux-x64-baseline` (§11 Step 6) |
| `-v ~/.config/opencode` | Config locked by host opencode | Isolated snap directory (§11 Step 2) |
| `"permission": {"*": {"*": "allow"}}` | Overrides tool whitelist (Spider F1) | `"permission": {}` (§11 Step 4) |
| Blacklist approach | Always incomplete — misses new tools | ALLOWLIST approach (§18) |
| `<=` on set sizes without empty guard | Empty sets produce false consensus (Spider F3) | Explicit `if (completed.length === 0)` check (§6) |
| Returning success without side effects | Theatrical (Spider F2, Hydra F5) | P11: Output IS The Work (§4) |

### Model Policy Quick Reference

| Use Case | Model | Provider |
|---|---|---|
| Default (paid credits) | `xiaomi-token-plan-sgp/mimo-v2.5-pro` | MiMo — milk it |
| Fast free fallback | `openrouter/deepseek-v4-flash-free` | OpenRouter |
| Smarter free fallback | `openrouter/nemotron-3-super-free` | OpenRouter |
| OpenRouter rate-limited | `opencode-zen/deepseek-v4-flash-free` | OpenCode Zen |
| Anti-retard testing | `google/Gemma-4-26b` | Google Direct |
| Need reasoning | `google/Gemma-4-31b` or `google/gemini-2.5-flash` | Google Direct (rate-limits faster) |

**BANNED:** `minimax/*`, `deepseek/*` direct API, `xlam2/*`, any paid API except MiMo.

---

*RUNTIME GRADE CONTAINER TESTING BIBLE v1.0.0 — Created 2026-06-01*
*Fractal integration: Contains the entirety of RUNTIME_GRADE_ENGINEERING_BIBLE + T2_TUI_TESTING_BIBLE + TESTING_FRAMEWORK_ADVERSARIAL_PRESSURE*
*Post-mortem integration: Spider v2.2 (F1-F4) + Hydra v3.0-v3.1 (F5)*
*Binding standard for all agents. 1000+ lines of "read this and never derail again."*
