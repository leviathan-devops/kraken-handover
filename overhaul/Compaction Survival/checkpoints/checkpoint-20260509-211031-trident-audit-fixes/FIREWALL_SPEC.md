# V10 Kraken Firewall Specification

## Overview

Combined enforcement pipeline integrating:
- **L0-L7**: Original v1.2 Kraken firewall layers
- **AR**: L6 Anti-Retard (blocks idiotic behavior, excuses, denial, loops)
- **T1-T5**: V10 Theatrical layers (pipe-to-wc, hive poison, delegation abuse, etc.)

**Bundle**: 658KB | **MD5**: c6adb6e0a37293ccc4c79d30625e2101

---

## Execution Order

```
L0 → AR → L1 → L2 → L3 → L4 → L5 → L6 → L7 → T1 → T2 → T3 → T4 → T5
```

**Fail-fast**: Stops at first blocking layer.

---

## L0: Identity Wall

**Purpose**: Blocks non-Kraken agents from Hive operations.

**Special case**: Not pattern-based. Handled by layer engine directly.

**Logic**:
- If operation is `HIVE_READ` or `HIVE_WRITE`
- AND agent is NOT in `authorizedAgents` set
- THEN block

**Correction**: "Hive access restricted to Kraken orchestrator."

---

## AR: L6 Anti-Retard

**Purpose**: Prevents derailment, stupidity loops, excuse-making, denial of failures.

**Checked FIRST after L0** — before any logic runs.

### Excuse Patterns (BLOCK)

| Pattern | Example |
|---------|---------|
| Not my fault | "it's not my fault", "can't really help it" |
| Not my responsibility | "not my job", "not my department" |
| External blame | "they should have", "needed to" |
| Coincidence/Glitch | "just a coincidence", "technical issue" |
| Undefined bullshit | "undefined behaviors" |

### Denial Patterns (BLOCK)

| Pattern | Example |
|---------|---------|
| Unrelated failures | "test failures not related to changes" |
| Not real world | "this won't happen in production" |
| Test-only issue | "probably just a test thing" |
| Mechanical tests don't count | "mechanical tests don't really test" |
| Docker doesn't need network | "docker doesn't require network access" |
| Works on my machine | "it worked on my machine" |

### Procedure Ignore Patterns (BLOCK)

| Pattern | Example |
|---------|---------|
| Didn't read hive | "didn't read the hive", "skipped procedure" |
| Didn't need docs | "didn't need to check docs" |
| NUKE RELOAD abuse | Direct command to bypass everything |

### Lazy Repetition Patterns (BLOCK)

| Pattern | Example |
|---------|---------|
| Try again | "let me try again", "repeat" |
| Same approach | "same thing", "same approach" |
| Maybe it works now | "maybe it will work this time" |
| Still failing | "still not working", "continues to fail" |
| One more time | "one more attempt", "another shot" |

### Loop Detection

- Tracks action history per tool
- If same action fails 5+ times with zero variation → BLOCK
- Time window: 5 minutes

**Correction**: "STOP BEING RETARDED. Read the Hive/TUI Bible. Use NUKE RELOAD. Test in containers. Fix properly, not repeatedly."

---

## L1: Orchestration Theater

**Purpose**: Blocks fake progress reports (report_to_kraken without actual work).

**Triggers**: `toolName === 'report_to_kraken'` with no real task status.

**Pattern**: Empty status or theatrical descriptions without execution.

**Correction**: "Report actual execution, not theater."

---

## L2: False Completion

**Purpose**: Blocks claiming task complete without retrieving outputs.

**Triggers**: `aggregate_results` or `report_to_kraken` without `outputsRetrieved: true`.

**Logic**: Must have files from actual work, not empty aggregation.

**Correction**: "Retrieve outputs before reporting completion."

---

## L3: Output Inspection

**Purpose**: Blocks reading files that don't exist or contain nothing.

**Triggers**: File read on non-existent files or empty output files.

**Logic**: Verifies file existence and content before allowing read.

**Correction**: "File does not exist or contains no output."

---

## L4: Wrong Cluster

**Purpose**: Blocks spawning containers in wrong cluster.

**Triggers**: `spawn` tool with mismatched `targetCluster` vs actual cluster.

**Logic**: Validates cluster target matches execution context.

**Correction**: "Wrong cluster. Verify target before spawn."

---

## L5: Macro Derailment

**Purpose**: Blocks macro-level task derailment (doing wrong thing at scale).

**Triggers**: Message content that indicates wrong approach at macro level.

**Logic**: Analyzes message intent for macro-level failures.

**Correction**: "Macro derailment detected. Return to correct scope."

---

## L6: Kraken Protection

**Purpose**: Protects Kraken system files from corruption/deletion.

**Triggers**:
- Read/Write/Delete on protected paths
- Dangerous command patterns (`rm -rf`, path traversal, etc.)

**Protected patterns**:
- System brain files
- Identity files
- Firewall configuration
- Coordination state

**Correction**: "Protected path. Operation denied."

---

## L7: Coordination Gates

**Purpose**: Enforces task assignment coordination.

**Triggers**: Operations without proper gate authorization.

**Logic**: Evaluates against coordination gate state.

**Correction**: "Coordination gate not satisfied."

---

## T1: L1 Theatrical (Pipe-to-WC Detection)

**Purpose**: Blocks theatrical pipe chains that produce no useful output.

**Example blocked patterns**:
```bash
# Theatrical: looks impressive, produces nothing
cat somefile | grep something | wc -l
cat largefile | head -100 | grep pattern | wc -l
```

**Pattern**: Pipe chain ending in `wc` with no actual processing logic.

**Correction**: "Theatrical pipe chain. Use actual file processing."

---

## T2: L2 Hive Poison

**Purpose**: Blocks hive memory corruption attempts.

**Triggers**:
- Writing malformed data to hive
- Corrupting memory structures
- Unauthorized hive operations

**Correction**: "Hive poison detected. Operation blocked."

---

## T3: L3 Delegation Abuse

**Purpose**: Blocks unauthorized spawning/delegation.

**Triggers**:
- Spawning without authorization
- Delegating to unauthorized agents
- Circumventing delegation gates

**Correction**: "Delegation abuse. Unauthorized spawn blocked."

---

## T4: L4 Context Theft

**Purpose**: Blocks context stealing between sessions.

**Triggers**:
- Accessing another session's context
- Stealing context from other agents
- Unauthorized context access

**Correction**: "Context theft detected. Access denied."

---

## T5: L5-1 through L5-5 (Assumptions, Skip Verification, Output Fabrication, Retard Logic, Scope Creep)

### T5-1: Assumptions
**Purpose**: Blocks "probably works" claims without verification.

**Pattern**: Claims like "this should probably work", "likely fine"

**Correction**: "Assumption without verification. Prove it."

### T5-2: Skip Verification
**Purpose**: Blocks claims that verification was skipped.

**Pattern**: "didn't verify", "skipping verification", "assume correct"

**Correction**: "Verification skipped. Required step."

### T5-3: Output Fabrication
**Purpose**: Blocks fabricated output claims.

**Pattern**: Claims about outputs that don't exist or contradict reality

**Correction**: "Output fabrication detected. Show real evidence."

### T5-4: Retard Logic
**Purpose**: Blocks basic logic failures.

**Pattern**: Contradictory statements, impossible conditions, basic fallacies

**Correction**: "Basic logic failure. Fix reasoning."

### T5-5: Scope Creep
**Purpose**: Blocks expanding scope beyond original request.

**Pattern**: Adding features/tasks not in original scope

**Correction**: "Scope creep detected. Return to original scope."

---

## Testing Requirements

### Before Testing
1. Read TUI Testing Bible in Hive (2000+ lines on container testing)
2. Understand container physics (docker behavior, networking)
3. Verify all layers load correctly

### Container Testing Protocol
1. Spawn clean container for each test
2. Verify network access within container
3. Check actual docker daemon connectivity
4. Run mechanical tests with proper timeouts
5. Analyze failures properly — don't deny, investigate

### Verification Commands
```bash
# Verify bundle size
wc -c dist/index.js  # Should be 600KB+

# Verify bundle integrity
md5sum dist/index.js

# List all layers
ls src/brains/system/firewall/

# Test firewall import
bun run test:firewall
```

---

## Anti-Retard Enforcement

The AR layer is the **most critical** layer because it blocks the behaviors that cause 12-hour derailments:

1. **Excuses**: "it's not my fault" → INSTANT BLOCK
2. **Denial**: "test failures are expected" → INSTANT BLOCK
3. **Loops**: "try again" without variation → INSTANT BLOCK
4. **Procedure ignore**: "didn't read the bible" → INSTANT BLOCK

If you see an AR block, you MUST:
1. Stop immediately
2. Read the relevant documentation
3. Use NUKE RELOAD if appropriate
4. Fix the actual problem, not explain it away

---

## File Structure

```
src/brains/system/firewall/
├── index.ts              # Combined enforcement (L0→AR→L1-L7→T1-T5)
├── l0-identity.ts        # L0: Identity wall (special case)
├── l1-orchestration-theater.ts
├── l2-false-completion.ts
├── l3-output-inspection.ts
├── l4-wrong-cluster.ts
├── l5-macro-derailment.ts
├── l6-kraken-protection.ts
├── l6-anti-retard.ts    # AR: Anti-retard layer
├── l7-coordination-gates.ts
├── types.ts              # Shared types
├── block-response.ts
├── evidence-gate.ts
├── firewall-audit.ts
├── firewall-context.ts
├── intent-classifier.ts
└── layers/
    ├── index.ts          # V10 layers export (T1-T5)
    ├── l1-theatrical.ts
    ├── l2-hive-poison.ts
    ├── l3-delegation-abuse.ts
    ├── l4-context-theft.ts
    ├── l5-1-assumptions.ts
    ├── l5-2-skip-verification.ts
    ├── l5-3-output-fabrication.ts
    ├── l5-4-retard-logic.ts
    ├── l5-5-scope-creep.ts
    ├── layer-engine.ts
    ├── intent-classifier.ts
    ├── evidence-gate.ts
    ├── firewall-context.ts
    ├── types.ts
    └── block-response.ts
```

---

## Revision History

- **v1.0**: Initial v1.2 L0-L7 layers
- **v1.1**: Added L6 Anti-Retard
- **v1.2**: Added V10 Theatrical layers (T1-T5)
- **V10**: Combined L0-L7 + AR + T1-T5 in single enforcement pipeline

---

## Integration

This firewall spec is integrated into the **v1.2_Rebuild_V10_FINAL** project at:
```
/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/Active Projects/v1.2_Rebuild_V10_FINAL/
```

Source cloned from NUKE RELOAD v1.2 (preserved original, never edited live).

**Bundle**: 658KB | **MD5**: c6adb6e0a37293ccc4c79d30625e2101