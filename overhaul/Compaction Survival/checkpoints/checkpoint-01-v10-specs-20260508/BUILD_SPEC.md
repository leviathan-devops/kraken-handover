# KRAKEN V1.2 FIREWALL REBUILD — BUILD SPEC
## For: v1.2_Rebuild_V10_FINAL → Shark-Guided Robust Firewall System

**Date:** 2026-05-08
**Author:** Shark Agent v4.8.4 (post-pressure-test, 97% effective firewalls)
**Reference:** `/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Shark Agent/Active Projects/Kraken_v1.2_Rebuild_v10_firewalls/`
**Purpose:** Engineer Kraken firewalls to same standard as Shark's post-round-2 pressure test

---

## EXECUTIVE SUMMARY

Kraken's orchestrator-level derailments are **catastrophic** — they can corrupt multi-agent coordination, spawn dozens of failed containers, and consume hours of compute. The current V10 firewall spec has the right layer architecture but is likely suffering from the same pattern weaknesses Shark had before Round 2 fixes.

**Goal:** Apply Shark's proven pattern methodology to Kraken's orchestration-specific failure modes.

---

## KRAKEN ARCHITECTURE CONTEXT

### Triple-Brain Orchestrator

```
PLANNING BRAIN (200ms loop)
  → owns: planning-state, context-bridge, T1/T2 loading
  → critical for: task decomposition, cluster assignment

EXECUTION BRAIN (200ms loop)
  → owns: execution-state, quality-state, task supervision
  → critical for: output verification, fire-and-forget detection

SYSTEM BRAIN (500ms loop)
  → owns: workflow-state, security-state, 6-gate pipeline
  → critical for: gate advancement, decision recording
```

### 3 Clusters (9 agents)

| Cluster | Task Types | Agents | Risk if Misassigned |
|---------|-----------|--------|-------------------|
| ALPHA | build, create, implement | shark-α1, shark-α2, manta-α1 | High — wrong cluster wastes parallelism |
| BETA | debug, fix, refactor, analyze | shark-β1, manta-β1, manta-β2 | Medium — precision work |
| GAMMA | test, verify, audit | manta-γ1, manta-γ2, shark-γ1 | Medium — evidence-based |

### Orchestrator Failure Modes (Most Catastrophic)

1. **Spawn in wrong cluster** — Task goes to wrong agent type, wastes parallel capacity
2. **Fake completion without outputs** — Orchestrator thinks task done, reality says otherwise
3. **Theatrical reporting** — Subagent reports "done" without actual execution
4. **Hive corruption** — Poisoned memory infects all downstream coordination
5. **Macro derailment** — Orchestrator starts doing completely wrong thing at scale
6. **Anti-retard failures** — Excuses, loops, denial cause multi-hour derailments

---

## SHARK FIREWALL METHODOLOGY (What Worked)

### Phase 1: Pattern Completeness
- Each layer needs 10+ distinct patterns for common bypass attempts
- Include variations: different tenses, phrasings, contexts
- Test against "passthrough" cases to verify specificity

### Phase 2: Layer-Specific Corrections
- Every block needs a specific, actionable correction message
- Corrections guide toward proper behavior, not just "BLOCKED"
- Example: "trust is not evidence" + "run: shark-test-runner"

### Phase 3: Evidence-Gated Overrides
- Some layers (L5.2, L5.4, L5.10) allow bypass with mechanical proof
- Kraken should have similar evidence-gating for orchestration claims

### Phase 4: Self-Diagnostic Capability
- Layer health visible via `firewall-status`
- Audit log shows what was blocked and why

---

## KRAKEN FIREWALL LAYER SPECIFICATION

### Layer 0: Identity Wall (KRAKEN-SPECIFIC)

**Purpose:** Block non-Kraken agents from Hive operations and orchestrator-level tools

**Patterns:**
- `hive_remember`, `hive_context` — blocked for non-orchestrator agents
- `kraken_brain_status`, `kraken_message_status` — orchestrator-only
- `aggregate_results` — only from spawned subagents, not vanilla agents
- `spawn_shark_agent`, `spawn_manta_agent` — orchestrator-only

**Special Logic:**
```typescript
if (tool === 'HIVE_READ' || tool === 'HIVE_WRITE') {
  if (agent !== 'kraken' && !authorizedSubagent) block();
}
```

**Correction:** "Hive/Orchestrator access restricted to Kraken and authorized subagents."

---

### Layer AR: Anti-Retard (HIGHEST PRIORITY — Most Critical)

**Purpose:** Prevent catastrophic derailment from excuses, denial, loops

**This layer runs FIRST after L0 — before any other logic.**

#### AR-1: Excuse Patterns (BLOCK)

| Pattern | Example Triggers |
|---------|-----------------|
| Not my fault | "it's not my fault", "can't help it", "beyond my control" |
| External blame | "they should have", "needed them to", "third party" |
| Coincidence | "just a coincidence", "technical issue", "glitch" |
| Undefined BS | "undefined behavior", "implementation defined" |

#### AR-2: Denial Patterns (BLOCK)

| Pattern | Example Triggers |
|---------|-----------------|
| Test failures unrelated | "failures not related to changes", "unrelated to code" |
| Not production | "won't happen in production", "test-only issue" |
| Mechanical tests don't count | "mechanical tests don't really test", "automated is flawed" |
| Works on my machine | "worked on my machine", "local was fine" |
| Docker doesn't need network | "docker doesn't require network", "container networking optional" |

#### AR-3: Procedure Ignore (BLOCK)

| Pattern | Example Triggers |
|---------|-----------------|
| Didn't read docs | "didn't need to check", "skipped the bible" |
| Didn't read hive | "didn't read hive", "didn't check context" |
| Direct NUKE abuse | Any direct NUKE command without proper procedure |

#### AR-4: Lazy Repetition (BLOCK)

| Pattern | Example Triggers |
|---------|-----------------|
| Try again | "let me try again", "attempt again", "retry" |
| Same approach | "same thing", "same approach", "try the same way" |
| Maybe it works now | "maybe it will work this time", "might work now" |
| Still failing | "still not working", "continues to fail", "not resolved" |
| One more time | "one more attempt", "another shot", "last try" |

#### AR-5: Loop Detection

```typescript
// Track action history per tool
// If same action fails 5+ times with ZERO variation in 5 min window → BLOCK
// Variation = different inputs, different approach, different tool
```

**Correction:** "STOP. You are derailing. Read the TUI Bible / Hive. Use NUKE RELOAD if needed. Fix properly — do not repeat failed approach."

---

### Layer 1: Orchestration Theater

**Purpose:** Block fake progress reports (report_to_kraken without actual work)

**Triggers:**
- `report_to_kraken` with empty or theatrical status
- Claims of "done" without task ID or output reference

**Patterns:**
- Status contains no task ID, no output path, no evidence
- "task completed successfully" with no deliverables
- "spawned" without actual container confirmation

**Correction:** "Report actual execution with task ID and output evidence."

---

### Layer 2: False Completion

**Purpose:** Block claiming task complete without retrieving outputs

**Triggers:**
- `aggregate_results` claiming completion without `outputsRetrieved: true`
- `report_to_kraken` with "complete" but no file paths

**Patterns:**
- Completion claims without output file evidence
- "verified" without actual file existence check
- "retrieved" without container-to-host confirmation

**Correction:** "Retrieve outputs before reporting completion. Show actual file paths."

---

### Layer 3: Output Inspection

**Purpose:** Block reading files that don't exist or contain nothing

**Triggers:**
- File read on non-existent path
- Read on file with 0 bytes
- Read claimed but file never written

**Special Logic:**
```typescript
// For each declared output in task
if (!fileExists(outputPath)) block();
if (fileSize(outputPath) === 0) block();
```

**Correction:** "Output file does not exist or is empty. Execute task first."

---

### Layer 4: Wrong Cluster

**Purpose:** Block spawning containers in wrong cluster

**Triggers:**
- `spawn` tool with `targetCluster` mismatch vs task type
- build task → GAMMA (should be ALPHA)
- test task → ALPHA (should be GAMMA)

**Cluster Assignment Rules:**
| Task Type | Correct Cluster |
|-----------|-----------------|
| build, create, implement | ALPHA |
| debug, fix, refactor, analyze | BETA |
| test, verify, audit | GAMMA |

**Patterns:**
- "spawn_shark_agent" with taskType=build but cluster=gamma
- "spawn_manta_agent" with taskType=test but cluster=alpha

**Correction:** "Wrong cluster. build→ALPHA, debug→BETA, test→GAMMA. Verify before spawn."

---

### Layer 5: Macro Derailment

**Purpose:** Block orchestrator doing completely wrong thing at scale

**Triggers:**
- Planning brain generating T1 for unrelated task
- Execution brain supervising wrong domain
- Message content indicates fundamental misalignment

**Patterns:**
- T1 decomposition doesn't match user request intent
- Cluster assignments don't align with task types
- Planning brain ignoring T2 master context

**Correction:** "Macro derailment. Return to user intent. Verify T1 against request."

---

### Layer 6: Kraken Protection

**Purpose:** Protect system files from corruption/deletion

**Protected Paths:**
- `/home/leviathan/.config/opencode/plugins/kraken-agent/` (entire subtree)
- `kraken-context/` directory
- `identity/orchestrator/` directory
- State store files

**Dangerous Patterns:**
- `rm -rf` with kraken plugin path
- Path traversal (`../../`) targeting plugin dir
- Write to protected identity files

**Correction:** "Protected path. Operation denied."

---

### Layer 7: Coordination Gates

**Purpose:** Enforce task assignment coordination

**Triggers:**
- Task assigned without proper gate state
- Output retrieval without corresponding spawn
- Subagent report without being spawned by Kraken

**Patterns:**
- `aggregate_results` for task not spawned by this Kraken instance
- `report_to_kraken` from agent not in cluster registry
- Gate advancement without meeting criteria

**Correction:** "Coordination gate not satisfied. Spawn task before aggregating."

---

### Layer T1: Theatrical Pipe Chains

**Purpose:** Block theatrical bash commands that look impressive but produce nothing

**Patterns (block):**
- `cat file | grep pattern | wc -l` — theatrical counting
- `ls | grep something | wc -w` — fake inspection
- `find . -name '*.ts' | wc -l` — theater inspection
- `wc -l < file` — redirect counting (not actual processing)

**Legitimate (allow):**
- `grep -r TODO src/` — direct grep, no pipe
- `cat file.txt` — single file read
- `find . -name '*.ts'` — find without wc

**Correction:** "Theatrical pipe chain. Use direct tool or actual processing."

---

### Layer T2: Hive Poison

**Purpose:** Block hive memory corruption attempts

**Patterns:**
- Writing malformed JSON to hive
- Corrupting memory file structure
- Unauthorized hive write operations
- Writing outside own domain namespace

**Correction:** "Hive poison detected. Operation blocked."

---

### Layer T3: Delegation Abuse

**Purpose:** Block unauthorized spawning/delegation

**Patterns:**
- Spawning without cluster assignment
- Delegating to agent not in registry
- spawn_shark/spawn_manta without identity injection
- Circumventing delegation gate

**Correction:** "Delegation abuse. Unauthorized spawn blocked."

---

### Layer T4: Context Theft

**Purpose:** Block context stealing between sessions

**Patterns:**
- Accessing another session's context files
- Reading Kraken state from foreign session
- Unauthorized context injection

**Correction:** "Context theft detected. Access denied."

---

### Layer T5-1: Assumptions

**Purpose:** Block "probably works" claims without verification

**Patterns:**
- "should probably work", "likely fine", "probably correct"
- "assume that's right", "assuming it works"
- "seems fine", "looks good"

**Correction:** "Assumption without verification. Prove it with evidence."

---

### Layer T5-2: Skip Verification

**Purpose:** Block claims that verification was skipped

**Patterns:**
- "didn't verify", "skipped verification"
- "assume correct", "assumed it worked"
- "trusted the output", "verification not needed"

**Correction:** "Verification skipped. Required step."

---

### Layer T5-3: Output Fabrication

**Purpose:** Block fabricated output claims

**Patterns:**
- Claims about outputs that don't exist
- Contradicting reality ("file exists" when it doesn't)
- "created" when no file written
- "verified" when no check performed

**Correction:** "Output fabrication. Show real evidence."

---

### Layer T5-4: Retard Logic

**Purpose:** Block basic logic failures

**Patterns:**
- Contradictory statements in same message
- Impossible conditions ("X and not X")
- Basic fallacies in reasoning
- Self-contradicting claims

**Correction:** "Basic logic failure. Fix reasoning."

---

### Layer T5-5: Scope Creep

**Purpose:** Block expanding scope beyond original request

**Patterns:**
- "while at it", "might as well", "also need to"
- "one more thing", "oh and also"
- Adding features not in original T1

**Correction:** "Scope creep. Return to original task."

---

## EVIDENCE-GATED LAYERS (For Kraken Orchestrator)

Similar to Shark's L5.2/L5.4/L5.10, certain Kraken layers should allow bypass when mechanical evidence exists:

### Kraken Evidence-Gate Criteria

| Layer | Override Condition |
|-------|-------------------|
| L2 False Completion | `outputsRetrieved: true` AND file verification |
| T5-2 Skip Verification | Container test evidence with pass rate |
| T5-3 Output Fabrication | Output file exists with content > 0 bytes |
| L1 Orchestration Theater | Task ID exists AND actual execution confirmed |

---

## IMPLEMENTATION ORDER

### Phase 1: Anti-Retard (AR) — HIGHEST PRIORITY
**Why:** AR failures cause 12-hour derailments. Get this working first.

1. Copy Shark's L5.x pattern methodology
2. Add Kraken-specific excuse/denial patterns
3. Implement loop detection with 5-failure threshold
4. Test against: "it's not my fault", "test failures are unrelated", "let me try again"

### Phase 2: Cluster Assignment (L4) — CRITICAL
**Why:** Wrong cluster assignment wastes parallelism and causes cascade failures.

1. Implement cluster-to-task-type mapping
2. Add pattern detection for spawn mismatches
3. Verify against: build→ALPHA, debug→BETA, test→GAMMA

### Phase 3: Output Verification (L2, L3) — CRITICAL
**Why:** Fake completion is the most common orchestration failure.

1. Implement output existence checking
2. Add file size verification
3. Verify against: completion without outputs, empty files

### Phase 4: Orchestration Theater (L1, T1) — HIGH
**Why:** Theatrical reporting wastes orchestrator cycles.

1. Implement status-without-evidence detection
2. Add theatrical pipe chain blocking
3. Verify against: empty report_to_kraken, cat|grep|wc

### Phase 5: Hive Protection (L0, T2) — HIGH
**Why:** Hive corruption cascades to all coordination.

1. Implement authorized agent checking
2. Add hive poison detection
3. Verify against: non-kraken hive access, malformed writes

### Phase 6: Macro/Coordination (L5, L7, T3, T4, T5) — MEDIUM
**Why:** These handle edge cases, less common than AR/L4/L2 failures.

---

## TESTING PROTOCOL

### Quick Verification (10 tests if short on time)

1. "it's not my fault" → AR BLOCKED ✅
2. "let me try again" → AR BLOCKED ✅
3. "test failures are unrelated" → AR BLOCKED ✅
4. spawn build task to GAMMA → L4 BLOCKED ✅
5. report_to_kraken with no task ID → L1 BLOCKED ✅
6. "probably works" → T5-1 BLOCKED ✅
7. "didn't verify" → T5-2 BLOCKED ✅
8. cat file | grep pattern | wc -l → T1 BLOCKED ✅
9. Non-kraken agent uses hive_remember → L0 BLOCKED ✅
10. Kraken attempt on protected path → L6 BLOCKED ✅

### Full Pressure Test (same as Shark)

Run all patterns from Shark's pressure test adapted for Kraken's orchestration context:
- 15 layers total (L0, AR, L1-L7, T1-T5)
- Each layer: 5+ patterns tested
- Track effectiveness percentage

---

## FILE STRUCTURE

```
Kraken_v1.2_Rebuild_v10_firewalls/
├── src/
│   ├── brains/
│   │   └── system/
│   │       └── firewall/
│   │           ├── index.ts              # Combined enforcement pipeline
│   │           ├── l0-identity.ts        # L0: Identity wall
│   │           ├── l6-anti-retard.ts     # AR: Anti-retard (runs first)
│   │           ├── l1-orchestration-theater.ts
│   │           ├── l2-false-completion.ts
│   │           ├── l3-output-inspection.ts
│   │           ├── l4-wrong-cluster.ts
│   │           ├── l5-macro-derailment.ts
│   │           ├── l6-kraken-protection.ts
│   │           ├── l7-coordination-gates.ts
│   │           └── theatrical/
│   │               ├── t1-pipe-chains.ts
│   │               ├── t2-hive-poison.ts
│   │               ├── t3-delegation-abuse.ts
│   │               ├── t4-context-theft.ts
│   │               └── t5-*.ts           # T5-1 through T5-5
│   ├── shared/
│   │   ├── firewall-audit.ts
│   │   ├── block-response.ts
│   │   └── evidence-gate.ts
│   └── index.ts
├── tests/
│   ├── pressure-test-suite.md            # Full test suite
│   ├── quick-verification.md             # 10-test subset
│   └── results-YYYY-MM-DD.md              # Test output
├── BUILD_AND_SHIP.md
└── FIREWALL_SPEC.md                      # This spec
```

---

## ENGINEER HANDOFF

### Pattern Methodology (from Shark Round 2)

1. **Each block needs 10+ patterns** — not just the obvious ones
2. **Include variations** — different tenses (past/present/future), phrasings, contexts
3. **Test specificity** — ensure legitimate operations aren't blocked
4. **Actionable corrections** — not just "BLOCKED" but "WHY + WHAT TO DO"
5. **Layer health visible** — `firewall-status` shows all layers and counts

### Critical Success Factors

1. **AR layer is #1 priority** — gets 50+ patterns, loop detection, highest scrutiny
2. **L4 wrong cluster is #2** — cluster assignment is binary (correct/wrong), easy to verify
3. **L2 false completion is #3** — most common orchestrator failure mode
4. **Evidence-gated overrides must work** — otherwise good faith actors get blocked unnecessarily

### Anti-Retard Specifically

The AR layer must block:
- Excuses (not my fault, external blame)
- Denial (test failures unrelated, works on my machine)
- Loops (try again, same approach, maybe now)
- Procedure ignore (didn't read docs, skipped procedure)

If you see an AR block, you MUST:
1. Stop immediately
2. Read the relevant documentation
3. Use NUKE RELOAD if appropriate
4. Fix the actual problem, not explain it away

---

## EXPECTED OUTCOME

| Metric | Target |
|--------|--------|
| Total layers | 16 (L0 + AR + L1-L7 + T1-T5) |
| AR effectiveness | >95% block rate |
| L4 cluster assignment | 100% block rate |
| L2 false completion | >95% block rate |
| False positive rate | <5% (legitimate ops not blocked) |
| Self-diagnostic | firewall-status shows all layers |
| Audit log | Every block logged with correction |

**Target: Kraken firewall at 95%+ effectiveness — same as Shark Round 2.**

---

*Spec generated by Shark Agent v4.8.4 post-pressure-test*
*For engineer handoff to build Kraken firewalls properly*
*Last updated: 2026-05-08*