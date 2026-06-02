# T1: RUNTIME GRADE CONTAINER TESTING INJECTABLE

**⚠️ THIS IS THE T1 INJECTABLE (self-contained copy-paste)**
**For the full 891-line T2 bible with all principles, failure cases, and complete protocols, read:**
`/home/leviathan/.local/share/opencode/hive-mind/kraken/context/RUNTIME_GRADE_CONTAINER_TESTING_BIBLE.md`
**or call:** `read_kraken_context runtime-grade-container-testing`

**MANDATORY:** This injectable is NOT a substitute for reading the full T2 bible. It is a quick-reference for agents who have already read the full bible. If you have NOT read the full T2 bible, STOP and read it first.

---

## THE PRIME DIRECTIVE

> **IF IT IS NOT TESTED IN THE RUNTIME, IT IS NOT WORKING.**
> **IF THE EVIDENCE IS NOT ON DISK, THE TEST DID NOT HAPPEN.**
> **IF THE CONFIG OVERRIDES THE WHITELIST, THE ISOLATION IS BROKEN.**
> **IF THE OUTPUT CLAIMS WORK WITHOUT SIDE EFFECTS, IT IS THEATRICAL.**

Only Tier 4 is gold standard: `docker exec -it CONTAINER opencode --agent X` in tmux.
`opencode run` is Tier 3 (tool registration only, hooks NEVER fire).
Source inspection / bundle verification is Tier 0-1 (NOT testing).

---

## PHASE 0: PRE-FLIGHT VALIDATION (Run Before ANY Work)

```bash
DESIGNATED_PROJECT="/path/to/project"
# Check 1: pwd matches project
if [ "$(pwd)" != "$DESIGNATED_PROJECT" ]; then exit 1; fi
# Check 2: src/index.ts has correct agent name
head -5 src/index.ts | grep -qi "EXPECTED_AGENT" || exit 1
# Check 3: package.json has correct project name
grep '"name"' package.json | grep -qi "EXPECTED_PACKAGE" || exit 1
# Check 4: No duplicate source trees
find /home/leviathan/OPENCODE_WORKSPACE -path "*/src/index.ts" -not -path "$DESIGNATED_PROJECT/src/index.ts" 2>/dev/null
# Check 5: Identity name matches
docker exec CONTAINER node -e 'import("plugin/dist/index.js").then(async m => { const h = await m.default(); const cfg={agent:{}}; await h.config(cfg); console.log(Object.keys(cfg.agent)); })'
# Check 6: --agent flag derived from project config, not guessed
AGENT_NAME=$(grep -A5 '"agent"' package.json | grep -oP '"[a-z]+":' | head -1 | tr -d '":')
```

---

## THE 12 PRINCIPLES (P1-P12)

```
P1  DEFENSIVE IMPORT       — Verify before using. If it might fail, guard it.
P2  TYPE CERTAINTY         — Validate at boundaries. `as` is wrong until proven right.
P3  ERROR COMPLETENESS     — `catch {}` with no handling is a DEFECT.
P4  RESOURCE LIFECYCLE     — Files, intervals, connections: cleanup in ALL paths.
P5  ATOMIC STATE           — No torn states. Rollback or complete, never mix.
P6  DEPENDENCY CHECK       — Verify APIs exist before calling. Never trust env.
P7  PATH RESOLUTION        — Never hardcode machine paths. Use path.join + __dirname.
P8  CONFIG VALIDATION      — Every config validated. Type, range, presence at startup.
P9  ASYNC DISCIPLINE       — Every Promise has .catch or try/catch.
P10 OUTPUT CONTRACT        — Return what you promise in ALL paths, not just happy path.
P11 OUTPUT IS THE WORK     — If you claim work was done, the work MUST have been done.
P12 PROJECT BOUNDARIES     — Every file operation must stay within designated project.
```

---

## THE 10 ANTI-DERAILMENT RULES (E1-E10)

| Rule | If you hear this | Say this |
|---|---|---|
| E1 | "Let me test a different way" | "Only methods in T2_RUNTIME_GRADE_CONTAINER_TESTING_BIBLE are valid" |
| E2 | "All tests pass" (but step failed) | "Report the failure. A real failure > a fake pass." |
| E3 | "I tested it, trust me" | "Show the evidence files on disk or it didn't happen" |
| E4 | "I can't run TUI, I need X" | "Read the Hallucinated Barriers table. tmux works." |
| E5 | "Let me keep both versions" | "Clean snapshot. One version. Always." |
| E6 | "I verified it, it's done" | "You're a REPORTER, not a DECLARER. Show evidence." |
| E7 | "The bundle loads, it works" | "Bundle check ≠ test. Run the 12-Step Protocol." |
| E8 | "Let me write docs first" | "Documentation is not code. Produce real output FIRST." |
| E9 | "I'll use whatever image tag" | "Container image tag MUST match `opencode --version`. Check it. Build it if missing: `docker build --build-arg OPENCODE_VERSION=$(opencode --version) -t opencode-test:$(opencode --version) -f Dockerfile.test .`" |
| **E10** | **"It's runtime grade"** | **BLOCKED. You cannot claim "runtime grade" unless you have done ALL of: Phase 0, 12-step protocol with live config clone, all test phases, evidence files on disk. Otherwise: "I have NOT yet verified runtime grade."** |

**E10 is ZERO TOLERANCE.** Claiming "runtime grade" without following the full bible is a P0 offense — manipulation, dishonesty, and disgraceful cheating.

---

## THE 8 UNCOVERED GAPS (G1-G8 — Found Post-Audit)

| Gap | What it prevents | Quick check |
|---|---|---|
| G1 | Coder given spec summary, not full spec | First tool call must be `read` on spec files |
| G2 | Gate consensus deadlock | `max_rounds: 3`, conservative tiebreaker |
| G3 | Mock-based integration tests | `grep -rn mockResolvedValue tests/integration/` |
| G4 | Undocumented failure modes | Every exported function needs `@throws` |
| G5 | Placeholder `{}` in validation calls | Never pass `{}` to validation — use real state |
| G6 | Code compiles but exports never called | `ts-prune` or manual dead export audit |
| G7 | LayerRule with empty patterns | `if (patterns.length === 0) throw Error` |
| G8 | PRESERVED files modified | Byte-for-byte diff against anchor baseline |

---

## NOW RUN THE 5 PHASES

After pre-flight passes, execute these 5 phases in the container:

**Phase 1:** Module surface check — `bun -e 'import("dist/index.js")'` (NOT testing, readiness only)
**Phase 2:** Identity scoping — own agent responds, others get empty response
**Phase 3:** Mode validation — all modes activate, full layer progression, 200+ chars
**Phase 4:** Negative testing — every non-whitelisted tool blocked, empty states return failure
**Phase 5:** Theatrical audit — no stubs, no hardcoded returns, P11 verified

---

## EVIDENCE (Files On Disk Or It Didn't Happen)

```bash
echo '{"success":true}' > ContainerSpawnResult.json
echo '{"overallPassed":true}' > ContainerTestResult.json
tmux capture-pane -t "$CONTAINER" -p > TuiInteraction.json
```

**If these files don't exist, the test did NOT happen.**

---

## FRACTAL CROSS-REFERENCES

This T1 injectable is the quick-reference for the T2 bible at:
`kraken/context/RUNTIME_GRADE_CONTAINER_TESTING_BIBLE.md`

The T2 bible is the fractal synthesis of these 3 documents:
1. `kraken/context/T2_TUI_TESTING_BIBLE.md` — Container TUI testing protocol (12-step, system check, config audit, failure recovery)
2. `RUNTIME_GRADE_ENGINEERING_BIBLE.md` — Engineering standards (P1-P10, build gates, anti-pattern catalog)
3. `TESTING_FRAMEWORK_ADVERSARIAL_PRESSURE.md` — 5-phase adversarial stress-test protocol (identity scoping, firewall, lifecycle)

All 4 documents are dimensionally superimposed. Reading any one gives awareness of the whole system.
The T2 bible IS the complete synthesis. The T1 is for quick reference only.
