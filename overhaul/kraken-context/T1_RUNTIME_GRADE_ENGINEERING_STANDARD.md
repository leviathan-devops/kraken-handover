# T1 Injectable: Runtime-Grade Software Engineering Standard

**Version:** 1.0
**Last Updated:** 2026-05-31
**Applicable To:** ALL agents (Shark, Manta, Kraken, Hydra, Plutus, any future agent)
**Mandatory:** YES — this is the engineering standard for all software production

---

## What Is Runtime-Grade Software?

Runtime-grade software is code that **works correctly in a real runtime environment on first execution**. Not "code that compiles". Not "code that looks right". Code that **WORKS** when executed.

The difference between "code that compiles" and "software that works" is the entire gap between amateur hour and professional engineering. This standard closes that gap to ZERO.

### The Metric

Output is judged by ONE metric: **Does it work when executed in a real runtime environment?**

If the answer is anything other than "yes on the first try with 90%+ test pass rate", the engineering was insufficient. There is no middle ground.

---

## The 10 Non-Negotiable Principles (P1-P10)

### P1. DEFENSIVE IMPORT
Every import must resolve to a real export. If it might not, guard it.
```
BAD:  import { someFunc } from './utils.js';  // assumes export exists
GOOD: import * as utils from './utils.js';
      if (typeof utils.someFunc !== 'function') {
        throw new Error('utils.js missing required export: someFunc');
      }
```

### P2. TYPE CERTAINTY
Never assume a value's type. Validate at boundaries. `as` casts are LIABILITY.
```
BAD:  const name = (data as User).name;           // crashes if data isn't User
GOOD: if (data && typeof data === 'object' && 'name' in data && typeof data.name === 'string') {
        const name = data.name;
      }
```

### P3. ERROR PATH COMPLETENESS
Every try/catch handles ALL error paths. `catch {}` with no handling is a DEFECT.
```
BAD:  try { await save(); } catch {}              // error silently swallowed
GOOD: try {
        await save();
      } catch (e) {
        logger.error('Save failed', e);
        return { success: false, error: e.message };
      }
```

### P4. RESOURCE LIFECYCLE
Files, intervals, connections — ALL cleaned up in ALL code paths, not just happy path.
```
BAD:  const iv = setInterval(poll, 100);
      await doWork();                              // if this throws, iv leaks forever

GOOD: const iv = setInterval(poll, 100);
      try { await doWork(); } finally { clearInterval(iv); }
```

### P5. ATOMIC STATE TRANSITIONS
No partial states survive errors. Rollback or complete, never torn.
```
BAD:  state.loading = true;
      state.data = await fetch();                  // if throws, stuck at loading=true
      state.loading = false;

GOOD: const prev = { ...state };
      try {
        state = { ...state, loading: true };
        const data = await fetch();
        state = { data, loading: false, error: null };
      } catch (e) {
        state = { ...prev, loading: false, error: e.message };
      }
```

### P6. DEPENDENCY VERIFICATION
Before using an API, verify it exists. Never trust the environment.
```
BAD:  fs.readFileSync(path);                       // assumes fs is available, path exists
GOOD: if (typeof fs?.readFileSync === 'function' && fs.existsSync(path)) {
        const content = fs.readFileSync(path, 'utf-8');
      }
```

### P7. PATH RESOLUTION
All file paths resolve to real locations. Never hardcode machine-specific paths.
```
BAD:  '/home/leviathan/project/config.json'
GOOD: path.join(os.homedir(), 'project', 'config.json')
```

### P8. CONFIGURATION VALIDATION
Every config value validated before use.
```
BAD:  const port = config.port;                    // might be undefined
GOOD: const port = config.port;
      if (typeof port !== 'number' || port < 1 || port > 65535) {
        throw new Error(`Invalid port: ${port}. Must be 1-65535.`);
      }
```

### P9. ASYNC DISCIPLINE
Every Promise has `.catch` or `try/catch`. No floating promises.
```
BAD:  someAsync().then(result => process(result)); // unhandled rejection
GOOD: someAsync().then(result => process(result)).catch(e => { logger.error(e); return fallback; });
```

### P10. OUTPUT CONTRACT
Functions return what they promise in ALL paths — success AND error.
```
BAD:  function getName(): string { try { return fetchName(); } catch { return null; } }  // null is not string
GOOD: function getName(): string | null { try { return fetchName(); } catch { return null; } }
      // OR: function getName(): string { try { return fetchName(); } catch { return ''; } }
```

---

## The Engineering Mindset Checklist

Before writing ANY function, answer ALL of these:

1. **Return type**: What does this function return? Is the return type correct in ALL paths?
2. **Null safety**: What happens if input is null/undefined/wrong type?
3. **Error paths**: What happens if the file doesn't exist / network is down / API fails?
4. **Resource cleanup**: Are resources cleaned up in error paths?
5. **Concurrent safety**: Does this work when called twice? Three times? Concurrently?
6. **Race conditions**: Is there a race condition in the state management?
7. **Environment**: Will this break if the environment is different (container vs host)?

If you CANNOT answer ALL of these, you are NOT ready to engineer the function. Think first. Engineer second. Type third.

---

## Build Order: Error Handling FIRST

The standard build order for any function is:
1. **Define the contract**: inputs, outputs, error cases
2. **Write error handling FIRST** (fail fast, validate inputs)
3. **Write the happy path SECOND**
4. **Verify**: concurrent safety, resource cleanup, type correctness
5. **Test**: trace every error path mentally before moving on

---

## Anti-Pattern Catalog (ALL ARE DEFECTS)

### Error Handling Defects
- `catch(e) {}` — error silently swallowed. ALWAYS handle: log, recover, or propagate.
- Partial error handling: `try { A; B; C; } catch { /* only handles A's error */ }`
- Silent null returns: caller has no idea why null was returned.
- Ignored error codes: result.success never checked.

### Type Safety Defects
- Unchecked `data as SomeType` — LIABILITY. Guard with runtime checks.
- `items.map(i => i.name)` — what if items is undefined? What if i has no name?
- Optional chaining without downstream handling: `user?.address?.street` — what if undefined?

### Resource Management Defects
- `setInterval` without `clearInterval` in same scope — resource leak.
- Open file handles without close — file descriptor leak.
- Event listeners never removed — memory leak.

### Async Discipline Defects
- `someAsync().then(...)` without `.catch()` — unhandled rejection.
- `void someAsync()` — fire-and-forget, if it fails nobody knows.
- Missing `await`: `const result = asyncFunction()` — result is Promise, not value.
- Race conditions in async state updates.

### Configuration Defects
- `process.env.API_KEY` — might be undefined. Validate.
- Missing defaults: `config.port` — crashes if undefined.
- Config type assumptions: `parseInt(config.timeout)` — NaN if not a number.

### Path and Environment Defects
- `'/home/user/project'` — fails on any other machine. Use `os.homedir()`.
- `fs.readFileSync('./data/file.json')` — what if cwd changes? Use `path.resolve`.
- Platform-specific paths: `'C:\\Users\\...'` — use `path.join()`.

### State Management Defects
- Non-atomic state updates: stuck in loading=true if fetch throws.
- Shared mutable state without synchronization — race conditions.
- State that persists across unrelated calls — stale data.

### Theatrical Code Defects
- `return { name: 'test' }` — stub, not real implementation.
- `// TODO: implement this` — incomplete work shipped as complete.
- Mock implementations in production code paths.
- Decorative logging: `console.log('Function called')` — noise, not verification.
- Counting as verification: `| wc -l` proves nothing about correctness.

### Spec Fidelity Defects
- Spec says 10 items, code has 7 with "the rest are similar" — implement ALL 10.
- Spec says O(n log n), code uses O(n²) — wrong complexity.
- Spec says handle empty array, code crashes on empty — unhandled edge case.
- Spec says "full CRUD", code has Create and Read only — incomplete.
- Spec says XOR encryption, code uses base64 — wrong algorithm entirely.

### Runtime Operational Defects
- Function defined but never called — present but non-functional.
- Imported module never used — dead weight.
- Event handler for wrong event name — appears connected but does nothing.
- Config read but ignored — misleading.
- System exists but never triggered by any state — dead system.

---

## Spec Fidelity Rule

Build must match spec EXACTLY. Nothing clipped, truncated, simplified, or half-shipped.
If the spec says 10 items, there are 10 items. Not 7. Not 8. TEN.
If the spec says handle X, it handles X. Not "X-ish".
ZERO tolerance for partial implementation.

---

## Runtime Operational Rule

ALL systems must be runtime operational at the level specified.
- Not just **present** — **FUNCTIONAL**.
- Not just **imported** — **EXECUTING**.
- Not just **defined** — **WORKING**.

"Present but dead" is a defect. "Imported but never called" is a defect. "Defined but returning stubs" is a defect.

---

## Build Pipeline Standard

### PLAN Gate
- Define error handling strategy BEFORE writing code
- Identify all error paths and failure modes
- List all dependencies and verify they exist
- Define acceptance criteria for each system

### BUILD Gate
- Error handling FIRST, validation SECOND, happy path THIRD
- Every function passes the 7-question engineering mindset checklist
- No `catch {}` without handling
- No unchecked `as` casts
- No floating promises
- No hardcoded paths
- No stubs, no placeholders, no TODOs

### TEST Gate
- Mechanical verification via Trident or equivalent
- 0 critical/high findings required
- Every system verified to exist and function
- Spec fidelity check: does build match spec exactly?

### VERIFY Gate
- Container test at 90%+ pass rate
- Triple evidence required: spawn + test + interaction
- Runtime verification in real environment
- Evidence files with pass rate data

### AUDIT Gate
- Full spec comparison
- Runtime operational check for every system
- No dead code, no stubs, no partial implementations
- Quality checklist fully satisfied

### DELIVERY Gate
- HARD BLOCKED without container test evidence
- Autonomous survival checkpointed
- All docs updated
- Ship package complete

---

## Container Test Standard

- `opencode run` is **BANNED** — hooks never fire
- Only valid test method: TUI via tmux + docker exec -it
- Evidence files: ContainerSpawnResult.json + ContainerTestResult.json + TuiInteraction.json
- 90%+ pass rate minimum, 100% is the target
- First build should pass at 90%+ if engineered to runtime grade from the start

---

## The Philosophy

A **coding agent** produces text that looks like code.
An **engineering agent** produces systems that work in production.

The output is judged by ONE metric: **does it work when executed in a real runtime environment?**

This is not aspirational. This is the MINIMUM STANDARD. Every build starts here.

---

## Key Terminology

| Term | Definition |
|------|-----------|
| Runtime-grade | Software that works correctly on first execution in a real environment |
| Theatrical code | Code that looks correct but doesn't actually work (stubs, mocks, empty catches) |
| Spec fidelity | Build matches specification exactly — nothing clipped, truncated, or simplified |
| Runtime operational | System is not just present but FUNCTIONAL — executing and working |
| Engineering checklist | 7-question mental verification before writing any function |
| Output contract | Function returns what its signature promises in ALL paths |
| Error path completeness | Every try/catch has actual handling: log, recover, or propagate |
| Resource lifecycle | All resources cleaned up in ALL code paths, not just happy path |
| Atomic state | State transitions are complete or rolled back, never torn |
| Defensive import | Every import verified to export what's expected before use |

---

*This standard applies to ALL agents in the workspace. Runtime-grade is not optional — it is the baseline.*
