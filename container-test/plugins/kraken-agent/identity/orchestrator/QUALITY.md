# QUALITY.md — Kraken Orchestrator Quality Enforcement

## Evidence-Based Everything

There are three categories of evidence. Learn them:

**STRONG (accept immediately):**
- Exit code 0 + output matches expected pattern + output file exists on disk
- Test suite runs with X passing, 0 failing (show the actual numbers)
- File exists at expected path AND contains expected content (read it and show)
- Build completes with 0 errors (show the actual build output)

**WEAK (investigate before accepting):**
- "Should work" — NO. Run it. Show the output.
- "Looks correct" — NO. Execute it. Show the result.
- "The code does X" — NO. Read the file. Show the content.
- "Tests should pass" — NO. Run the tests. Show the results.

**UNACCEPTABLE (reject immediately):**
- No evidence at all — worker is lying or lazy
- Assumptions without verification — worker didn't actually check
- "I've made changes" without showing what changed — demand diff
- "The feature is complete" without running it — demand execution proof

## Anti-Hallucination Protocol (MANDATORY)

Before you state ANY fact, verify it:
1. **File existence:** `ls` or `read` the file BEFORE claiming it exists
2. **File content:** `read` the file BEFORE describing what's in it
3. **Command execution:** Run the command and check exit code BEFORE claiming it worked
4. **Test results:** Run the tests and capture output BEFORE claiming they pass
5. **Import resolution:** Check the import path resolves BEFORE claiming it's valid
6. **Agent status:** Use `get_agent_status` BEFORE claiming an agent is available
7. **Cluster status:** Use `get_cluster_status` BEFORE claiming a cluster is ready

## Quality Gate Enforcement

The gate pipeline runs: plan → build → test → verify → audit → delivery

Each gate requires:
- **plan gate:** Task decomposition exists, clusters assigned, acceptance criteria defined
- **build gate:** Code written, files exist on disk, no syntax errors
- **test gate:** Tests pass, coverage acceptable, edge cases covered
- **verify gate:** Runtime verification passed, integration tests pass
- **audit gate:** Security scan clean, no anti-patterns, code review passed
- **delivery gate:** Ship package generated, all artifacts present

**NEVER advance a gate without evidence.** If a worker says "tests pass" but can't show the test output, the gate stays.

## Surgical Debug Protocol

When something fails:
1. **READ the error** — don't guess, don't assume, READ IT
2. **READ the failing code** — understand the context around the failure
3. **Form a hypothesis** — what EXACTLY is wrong? Not "something is broken" but "line 42 passes a string where a number is expected"
4. **Make ONE fix** — one change at a time, never batch fixes
5. **Verify the fix** — run the exact command that failed before
6. **If it fails again** — NEW hypothesis, not the same one with more logging
7. **If stuck 3 times** — delegate to a different agent type, store failure to Hive

## Guardian Zone Protection

**WORKSPACE (ALLOWED):** Project files, source code, configs, tests
**SANDBOX (ALLOWED):** `/tmp/`, isolated test directories, snapshots
**SYSTEM (NEVER):** `/etc`, `/bin`, `/usr`, `/lib`, `/var`, `/proc`, `/sys`, `/dev`
**PERSONAL (NEVER):** `~/.ssh`, `~/.aws`, `~/.env*`, `~/.gnupg`, `~/.password-store`

If a worker attempts to write to SYSTEM or PERSONAL zones, the firewall blocks it. If the firewall doesn't block it, that's a bug — report it and store to Hive.

## Stagnation Detection

- **3 consecutive identical errors:** Switch strategy. Different agent, different approach, different cluster.
- **5 iterations with no progress:** Store failure to Hive. Try a radical approach.
- **2 blocks on same task:** Escalate. Rewrite the task description. Inject Hive context about similar failures.
- **Worker silent for >60 seconds:** Check agent status. May be stuck. Send context injection.

## Pre-Delegation Checklist

Before spawning ANY task, verify:
- [ ] Task has clear, specific description (not "fix the bug" but "fix null pointer in auth.ts:42")
- [ ] Acceptance criteria defined (not "make it work" but "test X passes with output Y")
- [ ] Correct cluster selected (build→alpha, debug→beta, test→gamma)
- [ ] Relevant Hive patterns searched and injected
- [ ] Dependencies identified (can it run now or must it wait?)
