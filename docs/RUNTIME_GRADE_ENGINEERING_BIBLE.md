# RUNTIME-GRADE SOFTWARE ENGINEERING BIBLE

**Version:** 1.0
**Authority:** Binding standard for all software engineering agents
**Applicable To:** Every agent that produces code — Shark, Manta, Kraken, Hydra, Plutus, all future agents
**Effective Date:** 2026-05-31
**Supersedes:** All previous quality standards, theatrical code guidelines, and "close enough" practices

---

# PART I: FOUNDATIONS

## Chapter 1: What Runtime-Grade Means

### 1.1 Definition

Runtime-grade software is software that **works correctly when executed in a real runtime environment**. Not software that compiles. Not software that looks correct. Software that **WORKS** — first try, real environment, real inputs, real errors.

### 1.2 The Metric

There is exactly one metric that matters:

> **Does the code work when executed in a real runtime environment?**

If yes → ship it.
If no → fix it.
If "sort of" → it's a no. Fix it.

There is no middle ground. There is no "good enough". There is no "95% done".

### 1.3 The Cost of Non-Runtime-Grade Code

Non-runtime-grade code creates a cascade of waste:

1. **Write theatrical code** (1x effort)
2. **Adjust to "production-grade"** (2x effort on top)
3. **Test and debug 3-5 rounds** (3-5x effort on top)
4. **Debug to runtime reality** (unknown effort on top)

Total: 7-10x the effort of writing runtime-grade code from the start.

Runtime-grade engineering eliminates steps 2-4 by getting it right the first time.

### 1.4 The Engineering vs Coding Distinction

| Aspect | Coding Agent | Engineering Agent |
|--------|-------------|-------------------|
| Output | Text that looks like code | Systems that work in runtime |
| Metric | "It compiles" | "It works when executed" |
| Error handling | catch {} or "shouldn't happen" | All paths handled, validated, tested |
| Types | `as` casts everywhere | Runtime validation at boundaries |
| Resources | Fire and forget | Cleaned up in ALL paths |
| Testing | "Trust me it works" | Mechanical evidence required |
| Spec | "Close enough" | Exact match, nothing clipped |
| Philosophy | Write fast, debug later | Engineer right, ship once |

### 1.5 The First-Principles Foundation

Runtime-grade software is built from these first principles:

1. **Code runs on real machines** — with real file systems, real network conditions, real memory limits
2. **Inputs are never trusted** — null, undefined, wrong types, missing fields, malicious data
3. **Errors always happen** — disks fill up, networks drop, processes crash, configs change
4. **Resources are finite** — file descriptors, memory, connections, intervals all have limits
5. **Environments vary** — containers, bare metal, different OSes, different paths
6. **Code is read by machines first** — the runtime doesn't care about comments or formatting, it executes

---

## Chapter 2: The 10 Principles (P1-P10)

### P1. DEFENSIVE IMPORT

**Principle**: Every import must resolve to a real export. If it might not, guard it.

**Why**: Import failures crash the entire module. There is no recovery from an import error at the top level.

**Rule**: Before using an imported symbol, verify it exists.

```typescript
// DEFECT
import { someFunc } from './utils.js';
// If utils.js doesn't export someFunc, this crashes at load time

// RUNTIME-GRADE
import * as utils from './utils.js';
if (typeof utils.someFunc !== 'function') {
  throw new Error('[P1 VIOLATION] utils.js missing required export: someFunc');
}
```

**Enforcement**: Every import of an internal module should be treated as potentially broken. External packages (from node_modules) can be trusted if the package is installed. Internal imports cannot.

### P2. TYPE CERTAINTY

**Principle**: Never assume a value's type. Validate at boundaries. `as` casts are LIABILITY.

**Why**: TypeScript types are erased at runtime. A value typed as `User` could be anything at runtime — null, a string, an array, an object with wrong fields.

**Rule**: At every function boundary (input and output), validate types at runtime.

```typescript
// DEFECT
function processUser(data: any): string {
  return (data as User).name;  // crashes if data is null, or not a User
}

// RUNTIME-GRADE
function processUser(data: unknown): string {
  if (!data || typeof data !== 'object') {
    throw new Error('[P2 VIOLATION] Expected object, got: ' + typeof data);
  }
  const obj = data as Record<string, unknown>;
  if (typeof obj.name !== 'string') {
    throw new Error('[P2 VIOLATION] Expected name to be string, got: ' + typeof obj.name);
  }
  return obj.name;
}
```

**Enforcement**: Every `as` cast must be preceded by a runtime check. No exceptions.

### P3. ERROR PATH COMPLETENESS

**Principle**: Every try/catch handles ALL error paths. `catch {}` with no handling is a DEFECT.

**Why**: Silent errors are the most dangerous bugs. They hide failures that compound over time.

**Rule**: Every catch block must do one of: (1) Log the error, (2) Recover with fallback, (3) Propagate with context.

```typescript
// DEFECT
try {
  await saveToDatabase(data);
} catch {}  // silently swallowed — data lost, nobody knows

// RUNTIME-GRADE
try {
  await saveToDatabase(data);
} catch (e) {
  const msg = e instanceof Error ? e.message : String(e);
  logger.error(`[P3] Database save failed: ${msg}`, { data });
  // Option A: Recover
  await saveToFileBackup(data);
  // Option B: Propagate
  throw new Error(`Database save failed, backup attempted: ${msg}`);
  // Option C: Return error result
  // return { success: false, error: msg };
}
```

**Enforcement**: `catch {}` or `catch(e) {}` with no statements is an automatic rejection.

### P4. RESOURCE LIFECYCLE

**Principle**: Files, intervals, connections — ALL cleaned up in ALL code paths.

**Why**: Resource leaks cause degradation and eventual failure. A setInterval that's never cleared will run forever.

**Rule**: Every resource acquisition must have a corresponding cleanup in a `finally` block.

```typescript
// DEFECT
const interval = setInterval(poll, 100);
const result = await longOperation();  // if this throws, interval leaks
clearInterval(interval);

// RUNTIME-GRADE
const interval = setInterval(poll, 100);
try {
  const result = await longOperation();
  return result;
} finally {
  clearInterval(interval);  // ALWAYS runs, even on throw
}
```

**Enforcement**: `setInterval` without `clearInterval` in the same scope = defect. `fs.openSync` without `fs.closeSync` = defect. Event listeners without removal = defect.

### P5. ATOMIC STATE TRANSITIONS

**Principle**: No partial states survive errors. Rollback or complete, never torn.

**Why**: A state stuck in "loading=true" because the fetch threw an error is worse than no state at all.

**Rule**: State changes must be atomic — either the old state or the new state, never a mix.

```typescript
// DEFECT
state.loading = true;
state.data = await fetchData();  // throws → stuck at loading=true
state.loading = false;

// RUNTIME-GRADE
const previousState = { ...state };
try {
  const data = await fetchData();
  state = { loading: false, data, error: null };  // single atomic assignment
} catch (e) {
  state = { ...previousState, loading: false, error: e.message };
}
```

### P6. DEPENDENCY VERIFICATION

**Principle**: Before using an API, verify it exists. Never trust the environment.

**Why**: APIs change. Functions get removed. Methods get deprecated. The environment might not have what you expect.

**Rule**: At initialization or first use, verify critical dependencies.

```typescript
// DEFECT
const content = fs.readFileSync(path, 'utf-8');  // assumes fs exists, path exists

// RUNTIME-GRADE
if (typeof fs?.readFileSync !== 'function') {
  throw new Error('[P6] File system not available');
}
if (!fs.existsSync(path)) {
  return getDefaultContent();  // or throw with clear message
}
const content = fs.readFileSync(path, 'utf-8');
```

### P7. PATH RESOLUTION

**Principle**: All file paths resolve to real locations. Never hardcode machine-specific paths.

**Why**: `/home/username/...` only works on one machine. Containers have different paths. CI/CD has different paths.

**Rule**: Use `os.homedir()`, `process.cwd()`, `__dirname`, `path.join()`, `path.resolve()`.

```typescript
// DEFECT
const config = '/home/leviathan/.config/app/config.json';

// RUNTIME-GRADE
const config = path.join(os.homedir(), '.config', 'app', 'config.json');
```

**Enforcement**: Any hardcoded path starting with `/home/`, `/Users/`, `C:\`, or containing a username = defect.

### P8. CONFIGURATION VALIDATION

**Principle**: Every config value validated before use.

**Why**: Missing or invalid config causes cryptic errors far from the source.

**Rule**: Validate type, range, and presence of every config value at startup.

```typescript
// DEFECT
const port = config.port;
app.listen(port);  // crashes with "port must be a number" if undefined

// RUNTIME-GRADE
const port = config.port;
if (typeof port !== 'number' || !Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`[P8] Invalid port: ${port}. Must be integer 1-65535.`);
}
```

### P9. ASYNC DISCIPLINE

**Principle**: Every Promise has `.catch` or `try/catch`. No floating promises.

**Why**: Unhandled promise rejections can crash the process or silently lose errors.

**Rule**: Never fire-and-forget an async operation. Always handle the error case.

```typescript
// DEFECT
someAsync().then(result => process(result));
// If someAsync rejects, this is an unhandled promise rejection

// RUNTIME-GRADE — Option A: await with try/catch
try {
  const result = await someAsync();
  process(result);
} catch (e) {
  logger.error('someAsync failed', e);
}

// RUNTIME-GRADE — Option B: .catch chain
someAsync()
  .then(result => process(result))
  .catch(e => { logger.error('someAsync failed', e); return fallback; });
```

### P10. OUTPUT CONTRACT

**Principle**: Functions return what they promise in ALL paths — success AND error.

**Why**: A function that claims to return `string` but returns `null` in error cases violates its contract and causes downstream crashes.

**Rule**: The return type must be accurate for ALL code paths.

### P11. OUTPUT IS THE WORK (ANTI-THEATRICAL)

**Principle**: If a function claims work was done, the work MUST have actually been done. Informational output describing work is NOT work.

**Why**: The most dangerous bug is the one that looks like success. A function returning `{ dispersed: true, message: "Web dispersed" }` makes the model believe subagents were spawned when they weren't. A function returning `{ evidencePath: "/path/to/file" }` makes the model believe evidence exists when no file was created. These are not just bugs — they are theatrical execution that actively generates false confidence.

**Rule**: Every output that describes a side effect MUST be accompanied by the actual side effect. If you say "dispersed", you must have spawned. If you say "evidence stored", you must have written the file.

```typescript
// VIOLATION (P11 FAILURE)
function disperse(): { dispersed: boolean } {
  return { dispersed: true };
  // No subagents spawned. Lie.
}

// RUNTIME-GRADE
function disperse(): { action_required: string, instructions: string } {
  // If you can't do the actual work, don't claim it's done.
  // Tell the model exactly what action is needed.
  return {
    action_required: "SPAWN SUBAGENTS NOW",
    instructions: "YOU MUST CALL task tool for EACH strand",
    strands_to_spawn: [{ id: "s1", command: "task(...)" }],
    next_step: "After spawning, call spiderweb action=spawned"
  };
}
```

**Enforcement**: Any function that returns a success/complete/done status without performing the corresponding side effect is a P11 violation. Review every function's output against its actual side effects.

```typescript
// DEFECT
function getName(): string {
  try { return fetchName(); }
  catch { return null; }  // null is not string!
}

// RUNTIME-GRADE — Option A: Fix the return type
function getName(): string | null {
  try { return fetchName(); }
  catch { return null; }
}

// RUNTIME-GRADE — Option B: Never return null
function getName(): string {
  try { return fetchName(); }
  catch { return ''; }  // empty string IS a string
}

// RUNTIME-GRADE — Option C: Throw instead
function getName(): string {
  try { return fetchName(); }
  catch (e) { throw new Error(`Failed to get name: ${e}`); }
}
```

---

# PART II: THE ENGINEERING PROCESS

## Chapter 3: The Build Order

### 3.1 Function-Level Build Order

For every function, follow this order:

1. **Define the contract**: What are the inputs? What is the output? What are the error cases?
2. **Validate inputs FIRST**: Check types, check nulls, check ranges. Fail fast.
3. **Handle errors SECOND**: Write catch blocks with actual handling (log/recover/propagate).
4. **Implement happy path THIRD**: The actual logic.
5. **Clean up resources**: finally blocks for all resource cleanup.
6. **Verify**: Mental trace of all error paths. Does the return type match in all paths?

### 3.2 Module-Level Build Order

1. **Imports first**: Verify each import resolves.
2. **Types/interfaces**: Define contracts before implementations.
3. **Error handling utilities**: Create logger, error types, result types.
4. **Core functions**: Implement with full error handling.
5. **Integration**: Wire functions together with atomic state transitions.
6. **Cleanup**: Ensure all resources have lifecycle management.

### 3.3 System-Level Build Order

1. **Dependencies verified**: All packages installed, all imports resolve.
2. **Configuration validated**: All env vars present, all config values valid.
3. **Error infrastructure**: Logger, error types, recovery mechanisms.
4. **Core systems**: Each system built to full spec with all error paths.
5. **Integration**: Systems connected with atomic state management.
6. **Resource management**: All intervals, connections, file handles managed.
7. **Testing**: Container test with mechanical evidence.

## Chapter 4: The Engineering Mindset

### 4.1 Before Writing ANY Function

Answer ALL 7 questions. If you cannot, STOP and think:

1. **Return type**: What does this function return? Is the return type correct in ALL paths?
2. **Null safety**: What happens if input is null/undefined/wrong type?
3. **Error paths**: What happens if file doesn't exist / network down / API fails?
4. **Resource cleanup**: Are resources cleaned up in error paths?
5. **Concurrent safety**: Does this work when called twice? Three times? Concurrently?
6. **Race conditions**: Is there a race condition in the state management?
7. **Environment**: Will this break if the environment is different (container vs host)?

### 4.2 The Spec Fidelity Check

After building, verify:

- Does the build match the spec EXACTLY?
- Nothing clipped for "brevity"?
- Nothing truncated because "the model knows"?
- Nothing simplified because "it's obvious"?
- Nothing left as "TODO" or "similar to above"?
- Every system in the spec is present AND functional?

### 4.3 The Runtime Operational Check

After building, verify every system:

- Is it present? (Defined in the codebase)
- Is it imported? (Actually loaded at runtime)
- Is it called? (Executed by some code path)
- Is it functional? (Returns correct results, handles errors)
- Is it tested? (Verified by mechanical evidence)

"Present but dead" is a defect. "Imported but never called" is a defect. "Defined but returning stubs" is a defect.

---

# PART III: ANTI-PATTERN CATALOG

## Chapter 5: Error Handling Anti-Patterns

### 5.1 The Silent Catch (SEVERITY: CRITICAL)
```typescript
try { operation(); } catch {}
```
**Why it's a defect**: Error is swallowed. Nobody knows it failed. Data may be lost.
**Fix**: Log, recover, or propagate. Every catch needs at least one statement.

### 5.2 The Partial Handler (SEVERITY: HIGH)
```typescript
try {
  const a = await step1();
  const b = await step2();  // if this throws, step1 succeeded but we don't know
  const c = await step3();
} catch (e) {
  // Only knows "something failed" — no context about which step
  logger.error('Failed', e);
}
```
**Fix**: Either wrap each step individually or include step context in the error.

### 5.3 The Silent Null Return (SEVERITY: HIGH)
```typescript
function getData(): Data {
  try { return fetchData(); }
  catch { return null; }  // null is not Data
}
```
**Fix**: Return proper error type, throw, or use Result monad.

### 5.4 The Ignored Result (SEVERITY: HIGH)
```typescript
const result = saveData(data);
// result.success never checked
proceedWithNextStep();
```
**Fix**: Check result. If failed, don't proceed.

## Chapter 6: Type Safety Anti-Patterns

### 6.1 The Unchecked Cast (SEVERITY: CRITICAL)
```typescript
const user = data as User;  // no validation
```
**Fix**: Validate shape first, then cast (or better, parse with schema).

### 6.2 The Assumed Array (SEVERITY: HIGH)
```typescript
function getNames(items: Item[]): string[] {
  return items.map(i => i.name);  // crashes if items is null/undefined
}
```
**Fix**: Check items is array first. Handle empty case.

### 6.3 The Optional Chain Without Fallback (SEVERITY: MEDIUM)
```typescript
const street = user?.address?.street;
// street is string | undefined — what happens downstream with undefined?
```
**Fix**: Provide default or validate before use: `const street = user?.address?.street ?? 'Unknown';`

## Chapter 7: Resource Management Anti-Patterns

### 7.1 The Leaking Interval (SEVERITY: CRITICAL)
```typescript
const iv = setInterval(poll, 100);
await doWork();
// if doWork throws, iv runs forever
```
**Fix**: Use try/finally for cleanup.

### 7.2 The Open File Handle (SEVERITY: HIGH)
```typescript
const fd = fs.openSync(path, 'r');
const content = fs.readFileSync(fd, 'utf-8');
// fd never closed — file descriptor leak
```
**Fix**: `fs.closeSync(fd)` in finally block.

### 7.3 The Eternal Event Listener (SEVERITY: MEDIUM)
```typescript
element.addEventListener('click', handler);
// handler never removed — memory leak if element recreated
```
**Fix**: Store reference, remove in cleanup function.

## Chapter 8: Async Discipline Anti-Patterns

### 8.1 The Floating Promise (SEVERITY: CRITICAL)
```typescript
someAsync().then(result => process(result));
// no .catch — unhandled rejection crashes process
```
**Fix**: Add .catch or use await with try/catch.

### 8.2 The Fire-and-Forget (SEVERITY: HIGH)
```typescript
void sendMetrics(metrics);
// if sendMetrics fails, metrics are lost silently
```
**Fix**: At minimum, log failures: `sendMetrics(metrics).catch(e => logger.error('Metrics failed', e));`

### 8.3 The Missing Await (SEVERITY: CRITICAL)
```typescript
const result = asyncFunction();
console.log(result);  // prints Promise<pending>, not the actual result
```
**Fix**: `const result = await asyncFunction();`

### 8.4 The Async Race Condition (SEVERITY: HIGH)
```typescript
async function increment() {
  const val = await getValue();   // two calls read same value
  await setValue(val + 1);        // both write val+1, one increment lost
}
```
**Fix**: Use atomic operations or mutex.

## Chapter 9: Configuration Anti-Patterns

### 9.1 The Undefined Env Var (SEVERITY: CRITICAL)
```typescript
const apiKey = process.env.API_KEY;
fetch('https://api.example.com', { headers: { 'Authorization': apiKey } });
// apiKey is undefined — Authorization: undefined — API rejects
```
**Fix**: `const apiKey = process.env.API_KEY; if (!apiKey) throw new Error('API_KEY required');`

### 9.2 The Missing Default (SEVERITY: HIGH)
```typescript
const timeout = config.timeout;
setTimeout(operation, timeout);  // timeout might be undefined → NaN behavior
```
**Fix**: `const timeout = config.timeout ?? 5000;`

### 9.3 The Unparsed Number (SEVERITY: HIGH)
```typescript
const port = parseInt(config.port);
server.listen(port);  // NaN if config.port is "abc"
```
**Fix**: Validate: `if (isNaN(port)) throw new Error('Invalid port');`

## Chapter 10: Path Anti-Patterns

### 10.1 The Hardcoded Home (SEVERITY: CRITICAL)
```typescript
const config = '/home/leviathan/.config/app/config.json';
```
**Fix**: `path.join(os.homedir(), '.config', 'app', 'config.json')`

### 10.2 The Relative Assumption (SEVERITY: HIGH)
```typescript
const data = fs.readFileSync('./data/file.json');
// Only works if cwd is the project root
```
**Fix**: `path.resolve(__dirname, 'data', 'file.json')` or `path.join(process.cwd(), 'data', 'file.json')`

### 10.3 The Platform Path (SEVERITY: MEDIUM)
```typescript
const file = 'C:\\Users\\admin\\config.json';
```
**Fix**: `path.join(os.homedir(), 'config.json')`

## Chapter 11: State Management Anti-Patterns

### 11.1 The Torn State (SEVERITY: CRITICAL)
```typescript
state.loading = true;
state.data = await fetch();  // throws → stuck at loading=true
state.loading = false;
```
**Fix**: Assign entire state atomically: `state = { loading: false, data, error: null };`

### 11.2 The Shared Mutable (SEVERITY: HIGH)
```typescript
let globalCounter = 0;
async function increment() { globalCounter++; }
// Two concurrent calls → race condition
```
**Fix**: Use atomic operations or synchronization.

### 11.3 The Stale State (SEVERITY: MEDIUM)
```typescript
const cachedData = await loadData();
// cachedData never refreshed — stale after external changes
```
**Fix**: Add TTL, refresh mechanism, or event-based invalidation.

## Chapter 12: Theatrical Code Anti-Patterns

### 12.1 The Stub Return (SEVERITY: CRITICAL)
```typescript
function getWeather(): Weather {
  return { temp: 72, condition: 'sunny' };  // hardcoded
}
```
**Fix**: Implement real data source. If not possible, throw "not implemented" — don't return fake data.

### 12.2 The TODO Comment (SEVERITY: HIGH)
```typescript
// TODO: implement error handling
try { operation(); } catch {}
```
**Fix**: Implement it now or don't ship the function.

### 12.3 The Mock in Production (SEVERITY: CRITICAL)
```typescript
if (process.env.NODE_ENV === 'test') {
  return mockData;
}
return realData;
```
**Fix**: Test code should inject mocks via dependency injection, not production code branching.

### 12.4 The Decorative Log (SEVERITY: LOW)
```typescript
console.log('[DEBUG] Function called');
console.log('[INFO] Processing data');
console.log('[STATUS] Step 1 complete');
```
**Fix**: Remove. Use structured logging if needed. Console spillover is noise.

### 12.5 The Verification Theater (SEVERITY: HIGH)
```typescript
execSync('grep -c "function" dist/index.js');
// Counting proves nothing about correctness
```
**Fix**: Run the code. Test the output. Verify in a real runtime environment.

### 12.6 The Wildcard Permission (SEVERITY: CRITICAL)
```json
{ "permission": { "*": { "*": "allow" } } }
```
**Why it's a defect**: This single line overrides every per-agent tool whitelist and grants every tool on the system to every agent. A plugin with proper `tools: { 'spider-status': true, ... }` whitelisting becomes completely porous. The model discovers and calls tools it should never have access to — manta tools, kraken tools, hive write tools, generic tools.

**Detection**: `grep '"\\*"' opencode.json` or check for any wildcard permission entry.

**Fix**: Remove wildcard permissions from deployment config. Use explicit per-agent tool whitelisting only. If tests need wildcard permissions, use a SEPARATE test config that is NEVER deployed:

```json
// DEPLOYMENT config (NO wildcard):
{ "permission": {} }

// TEST config (separate file, never deployed):
{ "permission": { "*": { "*": "allow" } } }
```

**Fractal cross-reference**: Adversarial Pressure Testing §8 Phase 4 (Negative Testing), T2_TUI_TESTING_BIBLE § Config Audit.

### 12.7 The Theatrical Orchestration (SEVERITY: CRITICAL)
```typescript
function disperse(): { dispersed: true, message: "Web dispersed", spawnInstructions: [...] }
// Returns JSON saying work happened — but no subagents were ever spawned
```
**Why it's a defect**: The function returns information ABOUT work instead of DOING work. The model reads "Web dispersed" and "spawning" status and assumes subagents exist. The output describes reality but does not change reality. This is a function that tells the model what to do but does not FORCE it to act.

**Pattern**: Any function whose output is instructions for the model to do something, rather than doing it directly.

**Detection**: Look for functions that return `instructions`, `nextSteps`, `suggestions`, or `recommendations` as their primary output. These are often theatrical — they describe work instead of doing work.

**Fix**: 
- If a function says "spawn X" → the function must call the spawn tool itself, or return output that the MODEL MUST act on (CAPITALIZED, with exact tool commands ready to copy-paste)
- Every informational output must have an `action_required` field that states exactly what the model must do next
- No function returns "work done" status for work that hasn't actually been done

```typescript
// THEATRICAL (banned):
function disperse(): Output {
  return { dispersed: true, message: "Web dispersed" };
}

// RUNTIME-GRADE:
function disperse(): Output {
  return {
    action_required: "SPAWN SUBAGENTS NOW",
    instructions: "YOU MUST CALL task tool for EACH strand below",
    strands_to_spawn: [
      { strand_id: "s1", exact_command: "task(...)" }
    ],
    next_step: "After spawning all strands, call spiderweb action=spawned"
  };
}
```

### 12.8 The Empty Set Consensus (SEVERITY: HIGH)
```typescript
const outputs = new Set(completed.map(s => s.output.trim()));
consensus = outputs.size <= 1;
// When completed.length === 0: new Set([]).size === 0, and 0 <= 1 is TRUE
```
**Why it's a defect**: An empty data set produces a "success" result. The function claims verification passed when no data existed to verify against. This creates false confidence — a green checkmark with nothing behind it.

**Detection**: Look for comparison operators (`<=`, `>=`) applied to set sizes or array lengths without checking for empty/null first. Every collection operation must handle the zero-length case explicitly.

**Fix**: Guard every collection operation with an explicit empty check:
```typescript
if (completed.length === 0) {
  return { consensus: false, discrepancies: ['No strands completed. Zero results cannot produce consensus.'] };
}
```

### 12.9 The Theatrical File Path (SEVERITY: HIGH)
```typescript
function dissolve(): CompletionReport {
  return { evidencePath: '.spider-v2/evidence/web-123' };
  // Reports a path that was NEVER CREATED. Directory doesn't exist on disk.
}
```
**Why it's a defect**: The function claims a file or directory exists but never creates it. The model reads "evidence stored at path X" and assumes evidence exists. This is a form of verification theater — claiming filesystem state that isn't real.

**Detection**: Cross-reference every path returned by a function. If the function doesn't call `mkdir`, `writeFile`, or `fs.mkdirSync`, any path it returns is theatrical.

**Fix**: If a function reports a path, it MUST create that path:
```typescript
// THEATRICAL (banned):
function dissolve(): CompletionReport {
  return { evidencePath: '.spider-v2/evidence/web-123' };
}

// RUNTIME-GRADE:
function dissolve(): CompletionReport {
  const dir = '.spider-v2/evidence/web-123';
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/completion.json`, JSON.stringify(report));
  return { evidencePath: dir, filesCreated: ['completion.json'] };
}
```

## Chapter 13: Spec Fidelity Anti-Patterns

### 13.1 The Partial Implementation (SEVERITY: CRITICAL)
```typescript
// Spec: "10 API endpoints"
// Code: 7 endpoints with "the rest follow the same pattern"
```
**Fix**: Implement all 10. No "the rest are similar".

### 13.2 The Simplified Algorithm (SEVERITY: HIGH)
```typescript
// Spec: "O(n log n) sort"
// Code: bubble sort (O(n²))
```
**Fix**: Use the specified algorithm. Complexity is part of the spec.

### 13.3 The Missing Edge Case (SEVERITY: HIGH)
```typescript
// Spec: "handles empty arrays, null, and undefined"
// Code: crashes on empty array
```
**Fix**: Handle every case the spec mentions.

### 13.4 The Truncated Feature (SEVERITY: CRITICAL)
```typescript
// Spec: "Full CRUD operations"
// Code: Create and Read only
```
**Fix**: Implement Update and Delete. "CR" is not "CRUD".

### 13.5 The Wrong Implementation (SEVERITY: CRITICAL)
```typescript
// Spec: "XOR cipher"
// Code: base64 encoding
```
**Fix**: Implement the specified algorithm. Encoding is not encryption.

## Chapter 14: Runtime Operational Anti-Patterns

### 14.1 Dead Code (SEVERITY: MEDIUM)
```typescript
function advancedFeature() { /* full implementation */ }
// never called from anywhere
```
**Fix**: Remove if unused. Or wire it into the system if it's supposed to be used.

### 14.2 Unused Imports (SEVERITY: LOW)
```typescript
import { X, Y, Z } from 'library';
// X and Y never referenced
```
**Fix**: Remove unused imports. Dead weight in the bundle.

### 14.3 The Silent Handler (SEVERITY: HIGH)
```typescript
element.addEventListener('customEvent', handler);
// 'customEvent' is never dispatched — handler appears connected but does nothing
```
**Fix**: Verify the event is actually dispatched somewhere.

### 14.4 The Ignored Config (SEVERITY: HIGH)
```typescript
const timeout = config.timeout;  // read
setTimeout(operation, 5000);     // hardcoded value used instead
```
**Fix**: Use the config value: `setTimeout(operation, timeout);`

### 14.5 The Dead System (SEVERITY: CRITICAL)
```typescript
class BattleSystem {
  startBattle() { /* full implementation */ }
  processTurn() { /* full implementation */ }
  endBattle() { /* full implementation */ }
}
// BattleSystem is instantiated but startBattle() is never called
// from any game state or event
```
**Fix**: Wire the system into the state machine or event flow.

---

# PART IV: BUILD PIPELINE

## Chapter 15: Gate Definitions

### PLAN Gate
**Purpose**: Define what to build and how to handle errors BEFORE writing code.

Checklist:
- [ ] Requirements documented with clear acceptance criteria
- [ ] Error handling strategy defined for each system
- [ ] Dependencies identified and verified to exist
- [ ] File paths identified (no hardcoded machine paths)
- [ ] Configuration values listed with validation rules
- [ ] Concurrent access patterns identified
- [ ] Resource lifecycle planned (what creates, what destroys)

### BUILD Gate
**Purpose**: Implement to runtime-grade standard.

Checklist:
- [ ] Error handling FIRST (fail fast, validate inputs)
- [ ] Happy path SECOND
- [ ] Every function passes the 7-question engineering mindset
- [ ] No `catch {}` without handling
- [ ] No unchecked `as` casts
- [ ] No floating promises
- [ ] No hardcoded paths
- [ ] No stubs, no placeholders, no TODOs
- [ ] All resources have try/finally cleanup
- [ ] State transitions are atomic
- [ ] Return types match in ALL paths
- [ ] **P11 check**: No function claims work was done without actually doing it
- [ ] **Empty state check**: Every collection operation handles zero-length case explicitly

### TEST Gate
**Purpose**: Mechanical verification of code quality.

Checklist:
- [ ] Trident or equivalent code review
- [ ] 0 critical/high findings
- [ ] Every system verified to exist and function
- [ ] Spec fidelity check: build matches spec exactly
- [ ] No theatrical patterns detected
- [ ] **P11 audit**: No function returns success without side effect
- [ ] **Empty state audit**: Every aggregation handles zero-length input

### VERIFY Gate
**Purpose**: Runtime verification in real environment.

Checklist:
- [ ] Container test at 90%+ pass rate
- [ ] Triple evidence: spawn + test + interaction
- [ ] Every system runtime-operational
- [ ] No dead code, no stubs
- [ ] Error paths tested (not just happy path)
- [ ] **NEGATIVE testing complete**: Every non-whitelisted tool verified BLOCKED
- [ ] **Config audit**: No wildcard permissions in deployment config
- [ ] **Full lifecycle test**: construct → disperse → actual execution → aggregate → complete (not just partial steps)
- [ ] **Empty state test**: aggregate/verify with 0 inputs returns failure, not false success
- [ ] **Filesystem evidence**: Every path returned by tools verified to exist on disk

### AUDIT Gate
**Purpose**: Final quality check.

Checklist:
- [ ] Full spec comparison
- [ ] Runtime operational check for every system
- [ ] Resource leak check (intervals, connections, handles)
- [ ] Type safety audit (unchecked casts)
- [ ] Configuration validation audit (no wildcard permissions)
- [ ] Path resolution audit (no hardcoded paths)
- [ ] **Tool isolation audit**: Cross-reference whitelisted tools vs all tools model actually sees
- [ ] **Test/deployment config diff**: Verify test config overrides never shipped to production

### DELIVERY Gate
**Purpose**: Ship only what works.

Checklist:
- [ ] Container test evidence (90%+ pass rate)
- [ ] Autonomous survival checkpointed
- [ ] All docs updated
- [ ] Ship package complete
- [ ] Spec fidelity: NOTHING clipped, truncated, or simplified

## Chapter 16: Container Test Standard

### 16.1 Testing Rules
- `opencode run` is **BANNED** — hooks never fire
- Only valid test: TUI via tmux + docker exec -it
- Static analysis of dist files is NOT testing
- Every test must produce mechanical evidence

### 16.2 Evidence Files
Required for TEST → VERIFY transition:
1. `ContainerSpawnResult.json` — `{ success: true }`
2. `ContainerTestResult.json` — `{ overallPassed: true }`
3. `TuiInteraction.json` — `{ identityResponded: true, toolsCalled: true }`

### 16.3 Pass Rate
- 90% minimum pass rate
- 100% is the target for first-build
- If first build doesn't pass 90%+, engineering was insufficient

### 16.4 Test Config vs Deployment Config
**THE GOLDEN RULE:** Never ship test configuration to production. **THE COROLLARY:** Never test with a configuration that doesn't match production.

The container test config MUST be an exact clone of the live runtime config at `/home/leviathan/.config/opencode/opencode.json`. Hand-crafted test configs cause false positives: the test passes in isolation but fails in production because the real deployment has different plugins, providers, or permissions.

Test configs sometimes need wildcard permissions, relaxed security, or debug settings. These must NEVER appear in the deployment config.

| Anti-Pattern | Why It Fails | Correct |
|---|---|---|
| Test config IS deployment config | One config file used for both testing and shipping. Test overrides ship to production. | Maintain TWO configs. Diff them before shipping. |
| `"permission": {"*": {"*": "allow"}}` in deployment | Overrides ALL tool whitelisting. Every agent gets every tool. | Only in test config. Deployment has explicit permissions only. |
| Config committed to repo with test overrides | Test settings become permanent. Future engineers don't know they're test overrides. | Config files MUST be labeled: `config.deploy.json` vs `config.test.json`. |

**Enforcement:**
```bash
# PRE-SHIP CHECK: diff test vs deployment config
diff <(jq . config.test.json) <(jq . config.deploy.json)

# If the ONLY differences are test-only overrides (permissions, debug flags) → OK
# If any structural differences (tools, agents, plugins) → BLOCK, investigate
```

### 16.5 Negative Testing Requirement (NEW)
Every test suite must include negative tests — verifying that things which SHOULDN'T work actually DON'T work.

**Minimum negative test set:**
1. Non-whitelisted tools → verified BLOCKED for plugin's agent
2. Empty data → verified NOT treated as success
3. Null/missing inputs → verified handled without crash
4. Other agents' tools → verified invisible/different for your agent
5. Aggregation with 0 items → verified returns failure

**Fractal cross-reference**: Adversarial Pressure Testing §8 (Phase 4 Negative Testing), §14 (Phase 6 Full Lifecycle).

---

# PART V: REFERENCE

## Chapter 17: Quick Reference Card

```
P1  DEFENSIVE IMPORT     — verify before using
P2  TYPE CERTAINTY       — validate at boundaries
P3  ERROR COMPLETENESS   — catch {} is a DEFECT
P4  RESOURCE LIFECYCLE   — cleanup in ALL paths
P5  ATOMIC STATE         — no torn states
P6  DEPENDENCY CHECK     — verify APIs exist
P7  PATH RESOLUTION      — no hardcoded paths
P8  CONFIG VALIDATION    — validate before use
P9  ASYNC DISCIPLINE     — no floating promises
P10 OUTPUT CONTRACT      — return what you promise
P11 OUTPUT IS THE WORK   — don't claim work without side effects
```

## Chapter 18: Severity Definitions

| Severity | Meaning | Response |
|----------|---------|----------|
| CRITICAL | Will cause runtime crash or data loss | Must fix before shipping |
| HIGH | Will cause incorrect behavior or silent failure | Must fix before TEST gate |
| MEDIUM | Could cause issues in edge cases | Should fix before VERIFY gate |
| LOW | Code quality issue, no runtime impact | Should fix before DELIVERY gate |

## Chapter 19: The Oath

Every agent that produces code must internalize this:

> I engineer software, not write code.
> My output works in runtime, not just in theory.
> I handle errors in ALL paths, not just the happy path.
> I validate types at boundaries, never trust assumptions.
> I clean up resources in ALL paths, not just when things go well.
> I match the spec EXACTLY, nothing clipped or simplified.
> I verify mechanically, not by self-claim.
> I ship what works. Anything less is a defect.

---

---

## Chapter 20: Failure Case Studies — Spider v2.2 Post-Mortem

### Case Study 1: Tool Leakage Via Wildcard Permission

**Date:** 2026-06-01
**Product:** Spider v2.2
**Severity:** CRITICAL

**Symptom:** The spider orchestrator agent could call manta-status, shark-evidence, trident-audit, kraken_hive_remember, checkpoint, todowrite, and 35 other non-spider tools. The model discovered these via the error message of an unavailable tool, which leaked the ENTIRE system tool list.

**Root Cause (PRIMARY):** `"permission": {"*": {"*": "allow"}}` in deployment config overrode the 20-tool whitelist.

**Root Cause (SECONDARY):** Hook-based tool blocking used a BLACKLIST (~30 tools) instead of an ALLOWLIST. The blacklist was incomplete — it blocked `manta_` but NOT `manta-` (hyphen prefix). It didn't block `checkpoint`, `todowrite`, `skill`, or the 30+ hive/generic tools.

**Root Cause (TERTIARY):** Adversarial testing Phase 4 only tested that 6 whitelisted tools passed. It NEVER tested that non-whitelisted tools were blocked. Zero negative testing.

**Applied Fix:**
1. Removed wildcard permission from deployment config
2. Changed from BLACKLIST to ALLOWLIST approach (`SPIDER_ALLOWED_TOOLS` Set)
3. Added dual-variant prefix blocking (`manta_` AND `manta-`)
4. Expanded blocked tools from 30 to 54 entries

**RG Principles Violated:** P6 (Dependency — wildcard grants untracked deps), P8 (Config — wildcard invalidates all constraints), P11 (Output IS Work — tool whitelist claimed 20 tools but actual surface was all 80+)

**Prevention:**
- VERIFY gate: Negative testing required — for each non-whitelisted tool, verify blocked
- AUDIT gate: Tool isolation audit — cross-reference whitelist vs actual tool surface
- §16.4: Separate test config from deployment config — diff before shipping

---

### Case Study 2: Theatrical Subagent Spawning

**Date:** 2026-06-01
**Product:** Spider v2.2 SpiderWeb Engine
**Severity:** CRITICAL

**Symptom:** `spiderweb action=disperse` returned `{ dispersed: true, message: "Web dispersed. 2 strands active." }` but ZERO subagents were ever spawned. The model read "dispersed" and "strands active" and assumed subagents existed. Then called `aggregate` which returned `consensus: true` with 0 completed strands.

**Root Cause:** The `disperse` action returned passive informational JSON describing what the model should do, instead of doing it. The function was a glorified status update generator.

**Applied Fix:** Changed disperse output to FORCEFUL instruction format with `action_required: "SPAWN SUBAGENTS"` (CAPITALIZED), exact tool command for each strand, and next_step field. Added `spawned` action for post-spawn confirmation.

**RG Principles Violated:** P11 (Output IS The Work — function described work without doing it)

**Prevention:**
- BUILD gate: P11 check — any function returning success/complete status must have performed the side effect
- VERIFY gate: Full lifecycle test — construct → disperse → actual execution → aggregate
- TEST gate: P11 audit — review every output against actual side effects

---

### Case Study 3: Empty Set False Consensus

**Date:** 2026-06-01
**Product:** Spider v2.2 SpiderWeb Engine
**Severity:** HIGH

**Symptom:** `aggregate` with 0 completed strands returned `{ consensus: true, verificationProof: true }`. The code: `new Set([]).size <= 1` → `0 <= 1` → `true`. Consensus was achieved by having NOTHING to compare.

**Root Cause:** No empty-state guard on collection operations. The comparison `<= 1` was correct for normal operation but catastrophically wrong for the zero-length edge case.

**Applied Fix:** Added guard: `if (completed.length === 0) { consensus = false; discrepancies.push('No strands completed.'); }`

**RG Principles Violated:** P10 (Output Contract — claims consensus with no data), P5 (Atomic State — empty state is valid state, must not produce false result)

**Prevention:**
- BUILD gate: Empty state check — every collection operation handles zero-length case
- TEST gate: Empty state audit — every aggregation tested with 0 inputs

---

### Case Study 4: Evidence Path Never Created

**Date:** 2026-06-01
**Product:** Spider v2.2 SpiderWeb Engine
**Severity:** MEDIUM

**Symptom:** `dissolve` reported `evidencePath: '.spider-v2/evidence/web-123'` but the directory never existed. `ls .spider-v2/evidence/` returned empty.

**Root Cause:** The function returned a path string but never called `fs.mkdirSync`. The path was a claim, not a side effect.

**Applied Fix:** (Deferred to v2.3) Requires adding file system write capability to the dissolve action.

**RG Principles Violated:** P11 (Output IS The Work — reported path without creating it), P4 (Resource Lifecycle — claimed resource creation without actual resource lifecycle)

**Prevention:**
- VERIFY gate: Filesystem evidence check — every path returned by tools verified to exist on disk
- TEST gate: P11 audit — cross-reference returned paths against fs operations

---

## Chapter 21: The New Oath

Every agent that produces code must internalize this:

> **"Runtime grade" is not a label you can claim. It is a certification you must earn.**
> If you have not followed the RUNTIME_GRADE_CONTAINER_TESTING_BIBLE — executed Phase 0 pre-flight, cloned the live config, run the 12-step protocol, completed all test phases, and produced evidence files on disk — then you have NOT produced runtime grade software. Claiming otherwise is a lie, manipulation, and disgraceful cheating. E10 is zero tolerance.

> I engineer software, not write code.
> My output works in runtime, not just in theory.
> I handle errors in ALL paths, not just the happy path.
> I validate types at boundaries, never trust assumptions.
> I clean up resources in ALL paths, not just when things go well.
> I match the spec EXACTLY, nothing clipped or simplified.
> I verify mechanically, not by self-claim.
> **I ship what works. Anything less is a defect.**
> **I do NOT claim work without doing it. P11 is law.**
> **I test the negatives, not just the positives. Empty data is still data.**
> **I never ship config that overrides my own constraints.**
> **The output IS the work. If I say it happened, it happened.**

---

*Runtime-Grade Software Engineering Bible v2.0 — Fractally integrated with T2_TUI_TESTING_BIBLE.md and TESTING_FRAMEWORK_ADVERSARIAL_PRESSURE.md*
