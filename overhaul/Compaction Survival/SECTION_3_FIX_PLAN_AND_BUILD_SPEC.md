# KRAKEN v1.2 — Section 3-6 Fix Plan & Build Spec
## Fix Sections: Broken Components → New Features → Priority

**Created:** 2026-05-30
**Status:** RECOVERY — Ship v11 was stripped to firewall-only

---

## SECTION 3 — FIX PLAN: Broken Components (V10_FINAL Bugs)

### Fix 1: AsyncDelegationEngine.processQueue() — CRITICAL

**File:** `src/factory/AsyncDelegationEngine.ts`
**Severity:** CRITICAL — blocks all subagent spawning
**Symptom:** `spawn_shark_agent` and `spawn_manta_agent` timeout (never complete)
**Root Cause:** `processQueue()` fires each task but does NOT await. Sets `processing = false` immediately, marking queue as done. Tasks resolve in background, results never propagate. No error handling for failed tasks.

**Current Code (broken):**
```typescript
private processQueue(): void {
  if (this.processing) return;
  this.processing = true;
  const batch = this.queue.splice(0, 3);
  for (const task of batch) {
    this.executeTask(task); // ← NOT AWAITED — fire-and-forget
  }
  this.processing = false; // ← sets false immediately before tasks complete
}
```

**Fixed Code:**
```typescript
private processQueue(): void {
  if (this.processing) return;
  this.processing = true;
  try {
    const batch = this.queue.splice(0, 3); // Max 3 concurrent
    await Promise.all(batch.map(task => this.executeTask(task)));
  } finally {
    this.processing = false;
  }
}

private async executeTask(task: QueuedTask): Promise<void> {
  try {
    const result = await this.clusterManager.executeTask(task.request);
    task.resolve(result);
    await this.syncBrainsAfterTask(task.request, result);
  } catch (err) {
    task.reject(err);
    // Record failure in SystemBrain for smart error detection
    try {
      const { getSystemBrain } = await import('../brains/system/system-brain.js');
      getSystemBrain().recordTaskFailure(task.request.taskId, String(err));
    } catch {}
  }
}
```

**Verification:**
1. Spawn a simple task via `spawn_shark_agent`: "echo hello"
2. Call `waitForCompletion(taskId, 30000)`
3. Assert: result is not null, contains stdout with "hello"
4. Assert: task marked completed in ExecutionBrain

---

### Fix 2: SubagentManagerBrain — Stub Handlers

**File:** `src/brains/SubagentManagerBrain.ts`
**Severity:** HIGH — override commands (abort, reassign, retry) are useless without real operations

**Current (stubs):**
```typescript
handleAbort(taskId: string): void {
  console.log(`[SubagentManager] Abort requested for ${taskId}`);
  this.messenger.send({ type: 'ack', payload: { command: 'abort', acknowledged: true } });
}

handleClaimComplete(taskId: string): void {
  console.log(`[SubagentManager] Claim complete for ${taskId}`);
  // Acknowledges without ANY verification — theatrical
}
```

**Minimum Viable Fix (v1.2 ship):**

```typescript
handleAbort(taskId: string): void {
  try {
    const container = this.getContainerForTask(taskId);
    if (!container) {
      this.sendResponse('nack', { reason: 'No container found for task' });
      return;
    }
    // Send SIGTERM to the tmux session
    execSync(`docker exec ${container.name} tmux send-keys -t ${container.tmuxSession} C-c`, { timeout: 5000 });
    // Wait 2s for graceful shutdown
    sleepSync(2000);
    // Force kill if still alive
    const alive = execSync(`docker exec ${container.name} tmux has-session -t ${container.tmuxSession} 2>/dev/null || echo 'dead'`, { timeout: 3000 });
    if (!alive.includes('dead')) {
      // Container killed, clean up
      this.destroyContainer(container);
      this.sendResponse('ack', { status: 'killed' });
    }
  } catch (err) {
    this.sendResponse('ack', { status: 'container already dead', error: String(err) });
  }
}

handleClaimComplete(taskId: string): void {
  try {
    // L2 mechanical verification: check if outputs exist on host
    const outputs = this.getRegisteredOutputs(taskId);
    const existOnHost = outputs.filter(p => fs.existsSync(p));
    
    if (existOnHost.length === 0) {
      this.sendResponse('nack', { reason: '[L2_FALSE_COMPLETION] No outputs found on host' });
      return;
    }
    
    this.sendResponse('ack', { 
      status: 'complete', 
      outputsVerified: existOnHost.length,
      filesOnHost: existOnHost,
    });
  } catch (err) {
    this.sendResponse('nack', { reason: String(err) });
  }
}

handleRetrieveOutputs(taskId: string): void {
  try {
    const container = this.getContainerForTask(taskId);
    const outputs = execSync(`docker exec ${container.name} find /workspace -type f -newer /workspace/.kraken-start-marker 2>/dev/null`, { timeout: 5000 })
      .toString().trim().split('\n').filter(Boolean);
    
    // Copy outputs to host
    for (const output of outputs) {
      execSync(`docker cp ${container.name}:${output} ${process.cwd()}/${path.basename(output)}`, { timeout: 10000 });
    }
    
    this.sendResponse('ack', { outputsCount: outputs.length, files: outputs });
  } catch (err) {
    this.sendResponse('nack', { reason: String(err) });
  }
}
```

**Remaining handlers (can stay stub for v1.2):**
- `handleReassign`: Move task to target cluster — needs cluster manager reference. Stub.
- `handleRetry`: Re-queue with original params — needs delegation engine reference. Stub.
- `handleSuspend`: Pause tmux (Ctrl-Z) — simple, can implement.
- `handleResume`: Resume tmux (fg) — simple, can implement.

---

### Fix 3: opencode_agent.py Read-Write Mount

**File:** `src/clusters/wrappers/opencode_agent.py`
**Severity:** HIGH — agents cannot write any files

**Current (broken):**
```python
volumes = {
    workspace_path: {'bind': workspace_path, 'mode': 'ro'},  # ← READ-ONLY
}
```

**Fixed:**
```python
volumes = {
    workspace_path: {'bind': workspace_path, 'mode': 'rw'},  # Read-write for workspace
    f'{os.path.expanduser("~")}/.config/opencode': {
        'bind': f'{os.path.expanduser("~")}/.config/opencode',
        'mode': 'ro'  # Kraken config stays read-only
    },
    f'{os.path.expanduser("~")}/.local/share/opencode/kraken-hive': {
        'bind': f'{os.path.expanduser("~")}/.local/share/opencode/kraken-hive',
        'mode': 'ro'  # Hive stays read-only for subagents
    },
}
```

---

### Fix 4: ClusterInstance Hardcoded Values

**File:** `src/clusters/ClusterInstance.ts`
**Severity:** MEDIUM

```typescript
// Replace:
spawnAgentTask(args: string[], env: Record<string, string> = {}) {
  const cmd = ['python3', 'opencode_agent.py', '--task', args.join(' '), 
    '--model', 'minimax/MiniMax-M2.7',      // ← HARDCODED
    '--timeout', '120',                      // ← HARDCODED  
    '--plugin-path', '/path/to/plugin'];     // ← HARDCODED
}

// With:
spawnAgentTask(args: string[], env: Record<string, string> = {}) {
  const model = process.env.KRAKEN_SUBAGENT_MODEL || 'big-pickle';
  const timeout = process.env.KRAKEN_SUBAGENT_TIMEOUT || '120000';
  const pluginPath = process.env.KRAKEN_PLUGIN_PATH || this.resolveDefaultPluginPath();
  
  const cmd = ['python3', 'opencode_agent.py', 
    '--task', args.join(' '), 
    '--model', model,
    '--timeout', String(Math.floor(parseInt(timeout) / 1000)),
    '--plugin-path', pluginPath];
}
```

---

### Fix 5: Identity Unification

**Problem:** `IdentityLoader` loads .md files into `orchestratorIdentityPrompt`, but `system.transform` uses hardcoded ASCII text. Two separate identity systems exist.

**Fix:** Replace hardcoded identity in `system.transform` with file-based identity:

```typescript
// In index.ts startup:
let orchestratorIdentityPrompt = '';
try {
  const bun = await identityLoader.loadForRole('orchestrator');
  orchestratorIdentityPrompt = formatIdentityForSystemPrompt(bun);
} catch {
  orchestratorIdentityPrompt = FALLBACK_IDENTITY; // hardcoded ASCII as fallback
}

// In system.transform hook, replace the ~120 lines of hardcoded text with:
output.system.push(orchestratorIdentityPrompt);
```

This makes the `.md` files the single source of truth. If they're missing, the hardcoded fallback kicks in.

---

## SECTION 4 — BUILD SPEC: Context Management Auto-Generation

### Overview

Every Kraken-managed project auto-creates a `Context Management/` directory at initialization. SystemBrain maintains 5 documents that replace manual "Compaction Survival" folders.

**Location:** `{project-root}/Context Management/`

---

### 4.1: Detection Triggers

| Event | What Updates |
|-------|-------------|
| `systemBrain.initializeProject()` | Creates all 5 files (one-time) |
| Gate advancement (`setCurrentGate()`) | `BUILD_LOG.md` + `CONTEXT_CONTINUITY.md` |
| `systemBrain.recordTaskComplete(taskId)` | `BUILD_LOG.md` |
| `systemBrain.recordTaskFailure(taskId, error)` | `DEBUG_LOG.md` |
| `systemBrain.recordDecision(decision)` | `CONTEXT_CONTINUITY.md` |
| `planningBrain.generateT1()` | `PROJECT_ARCHITECTURE.md` + `BUILD_WORKFLOW.md` (one-time) |
| Firewall context bridge trigger | `CONTEXT_CONTINUITY.md` |
| Smart error detector injection | `DEBUG_LOG.md` |
| `evidence.persist(gateId)` (compaction) | All files flushed to disk |

---

### 4.2: SystemBrain.initializeProject()

```typescript
export class SystemBrain {
  private projectRoot: string = '';
  
  initializeProject(projectRoot: string, projectName: string, t1Tasks?: T1Task[]): void {
    this.projectRoot = projectRoot;
    const ctxDir = path.join(projectRoot, 'Context Management');
    fs.mkdirSync(ctxDir, { recursive: true });

    // Template files
    const now = new Date().toISOString();
    fs.writeFileSync(path.join(ctxDir, 'BUILD_LOG.md'), 
      `# BUILD LOG — ${projectName}\n## Session: ${this.getSessionId()}\n## Started: ${now}\n\n### [${now}] PROJECT INITIALIZED\n- Kraken v1.2 orchestrator activated\n- SystemBrain initialized with ${t1Tasks?.length || 0} tasks\n\n`);
    
    fs.writeFileSync(path.join(ctxDir, 'DEBUG_LOG.md'),
      `# DEBUG LOG — ${projectName}\n## Session: ${this.getSessionId()}\n\n`);
    
    fs.writeFileSync(path.join(ctxDir, 'CONTEXT_CONTINUITY.md'),
      `# CONTEXT CONTINUITY — ${projectName}\n## Stream of Consciousness + Injectable Data Points\n\n### [${now}] PROJECT INITIALIZATION\n- ${projectName} initialized\n- Kraken v1.2 orchestrator active\n\n`);

    // Generated docs
    if (t1Tasks) {
      const arch = this.generateArchitectureDoc(projectName, t1Tasks);
      fs.writeFileSync(path.join(ctxDir, 'PROJECT_ARCHITECTURE.md'), arch);
      
      const workflow = this.generateBuildWorkflow(t1Tasks);
      fs.writeFileSync(path.join(ctxDir, 'BUILD_WORKFLOW.md'), workflow);
    }

    // Register all in context-registry
    this.registerContext('Context Management/BUILD_LOG.md', 'high');
    this.registerContext('Context Management/DEBUG_LOG.md', 'high');
    this.registerContext('Context Management/CONTEXT_CONTINUITY.md', 'high');
    this.registerContext('Context Management/PROJECT_ARCHITECTURE.md', 'critical');
    this.registerContext('Context Management/BUILD_WORKFLOW.md', 'critical');
  }

  /** Append a milestone entry to BUILD_LOG.md */
  logBuildEvent(entry: string): void {
    if (!this.projectRoot) return;
    const p = path.join(this.projectRoot, 'Context Management', 'BUILD_LOG.md');
    fs.appendFileSync(p, `\n### [${new Date().toISOString()}] ${entry}\n`);
  }

  /** Append a debug entry to DEBUG_LOG.md */
  logDebugEvent(bugNumber: number, title: string, symptom: string, rootCause: string, fix: string, location: string): void {
    if (!this.projectRoot) return;
    const p = path.join(this.projectRoot, 'Context Management', 'DEBUG_LOG.md');
    fs.appendFileSync(p, `\n### BUG #${bugNumber}: ${title}\n- **Detected:** ${new Date().toISOString()}\n- **Symptom:** ${symptom}\n- **Root Cause:** ${rootCause}\n- **Fix:** ${fix}\n- **Location:** ${location}\n`);
  }

  /** Append context/insight to CONTEXT_CONTINUITY.md */
  logContextInsight(insight: string, confidence: number): void {
    if (!this.projectRoot) return;
    const p = path.join(this.projectRoot, 'Context Management', 'CONTEXT_CONTINUITY.md');
    fs.appendFileSync(p, `\n### [${new Date().toISOString()}] Confidence: ${confidence}/10\n${insight}\n`);
  }
}
```

---

### 4.3: L11 Build Workflow Firewall

New layer that checks BUILD_WORKFLOW.md before allowing "ship ready" claims:

```typescript
// src/system-brain/firewall/layers/l11-build-workflow.ts

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export function checkBuildWorkflow(content: string, projectRoot: string): { blocked: boolean; uncheckedCount: number; reason?: string } {
  const completionPatterns = [
    /ship.*ready/i, /package.*ready/i, /ready.*deploy/i,
    /build.*complete/i, /finished/i, /done/i, /complete/i,
    /ready to ship/i, /npm publish/i, /deploy/i,
  ];

  const isDoneClaim = completionPatterns.some(p => p.test(content));
  if (!isDoneClaim) return { blocked: false, uncheckedCount: 0 };

  const workflowPath = join(projectRoot, 'Context Management', 'BUILD_WORKFLOW.md');
  if (!existsSync(workflowPath)) {
    return { blocked: false, uncheckedCount: 0 }; // No workflow doc = can't validate
  }

  const workflow = readFileSync(workflowPath, 'utf-8');
  const unchecked = (workflow.match(/\[ \]/g) || []).length;

  if (unchecked > 0) {
    return {
      blocked: true,
      uncheckedCount: unchecked,
      reason: `[L11_BUILD_WORKFLOW] ${unchecked} build workflow items unchecked. You are NOT done. Return to BUILD_WORKFLOW.md and complete all ${unchecked} unchecked items before claiming completion.`
    };
  }

  return { blocked: false, uncheckedCount: 0 };
}
```

---

### 4.4: Identity Hardening

#### 4.4.1 Unify Identity Sources

In `src/index.ts`, replace hardcoded `system.transform` identity with file-based:

```typescript
// TOP OF index.ts (plugin init):
let IDENTITY_PROMPT = '';

async function loadIdentityPrompt(): Promise<string> {
  try {
    const bun = await identityLoader.loadForRole('orchestrator');
    return formatIdentityForSystemPrompt(bun);
  } catch {
    return `[SYSTEM — KRAKEN v1.2 IDENTITY (FALLBACK)]
You ARE KRAKEN v1.2 — the central multi-brain orchestrator.
Execute. Verify. Delegate. Persist.
Hive: kraken_hive_search, kraken_hive_remember, kraken_hive_inject_context.`;
  }
}

// In plugin init:
IDENTITY_PROMPT = await loadIdentityPrompt();

// In system.transform hook:
output.system.push(IDENTITY_PROMPT);
```

#### 4.4.2 Subagent Identity Injection

Modify `spawn_shark_agent` and `spawn_manta_agent` in `cluster-tools.ts`:

```typescript
const SHARK_IDENTITY = `
You are SHARK-V2 — Kraken {cluster} Cluster steamroll agent.
Orchestrator: KRAKEN v1.2
Your cluster: {cluster} ({role})
Your tools: write, bash, read, glob, grep, read_kraken_context, report_to_kraken
Firewall: L0-L7 walls protect you — NEVER touch kraken-hive/ or ~/.config/opencode/
Hive: Use read_kraken_context topic=patterns to learn from past work.
      Use read_kraken_context topic=failures to avoid known pitfalls.
Identity: You are NOT opencode/Claude/ChatGPT. You are SHARK-V2 executing for Kraken.
Output: Write ALL files to workspace. Call report_to_kraken with file paths.
Failure: Report failure immediately. Never hide, never excuse, never blame environment.
Mantra: "Build, verify, report. Never hide failure."`;

const MANTA_IDENTITY = `
You are MANTA-V2 — Kraken {cluster} Cluster precision agent.
Orchestrator: KRAKEN v1.2
Your cluster: {cluster} ({role})
Your tools: write, bash, read, glob, grep, read_kraken_context, report_to_kraken
Firewall: L0-L7 walls protect you — NEVER touch kraken-hive/ or ~/.config/opencode/
Hive: Use read_kraken_context topic=patterns to learn from past work.
      Use read_kraken_context topic=failures to avoid known pitfalls.
Identity: You are NOT opencode/Claude/ChatGPT. You are MANTA-V2 executing for Kraken.
Output: Write ALL files to workspace. Call report_to_kraken with file paths.
Failure: Report failure immediately. Never hide or rationalize.
Mantra: "Precision. Verification. No excuses."`;
```

#### 4.4.3 Hive-Blindness Detection (L8 Anti-Bullshit Expansion)

Add to L8 patterns:
```typescript
HIVE_IGNORANCE: {
  patterns: [
    /i don.t have (access to )?(the )?hive/i,
    /hive (context|access) (is )?not available/i,
    /(cannot|can.t|cannot) (access|search|use|query) (the )?hive/i,
    /there is no hive/i,
    /hive (doesn.t|does not) exist/i,
    /(i am|i.m) (not|unable) (connected )?to (the )?hive/i,
    /no hive mind/i,
    /hive (search|read|access) (is )?(disabled|blocked|unavailable)/i,
  ],
  correction: 'You HAVE Hive access. Use kraken_hive_search to find relevant patterns, failures, and context. The Hive is a persistent file-based memory system at ~/.local/share/opencode/kraken-hive/. You can read and write to it. Use it.',
  requiredActions: [
    'Run kraken_hive_search with your query immediately',
    'Read kraken-context/T2_ARCHITECTURE.md for Hive structure',
    'Never claim Hive is unavailable — it exists on disk',
  ],
}
```

---

## SECTION 5 — BUILD PRIORITY

| # | Component | Priority | Effort | Depends On |
|---|-----------|----------|--------|------------|
| 1 | Merge V10_FINAL source into ship v12 | **P0** | 30min | Nothing |
| 2 | Rebuild bundle with all modules | **P0** | 5min | #1 |
| 3 | Container test (identity, firewall, tools, hive, brain) | **P0** | 30min | #2 |
| 4 | Fix AsyncDelegationEngine fire-and-forget | **P1** | 30min | #2 |
| 5 | Context Management auto-generation (init + 5 docs) | **P1** | 2hrs | #2 |
| 6 | SubagentManagerBrain handlers (abort + claimComplete minimum) | **P1** | 1hr | #2 |
| 7 | opencode_agent.py read-write fix | **P1** | 15min | #2 |
| 8 | Identity unification (loader → system.transform) | **P1** | 30min | #2 |
| 9 | L11 Build Workflow firewall | **P2** | 1hr | #5 |
| 10 | Subagent identity injection | **P2** | 30min | #8 |
| 11 | Hive-blindness detection (L8 expansion) | **P2** | 30min | #8 |
| 12 | Identity bootstrap sequence | **P3** | 1hr | #8 |
| 13 | Unhardcode ClusterInstance | **P3** | 30min | #7 |
| 14 | Strike persistence to Hive | **P3** | 1hr | — |
| 15 | L6 firewall rule: prevent source removal from ship | **P3** | 15min | — |

---

## SECTION 6 — VERIFICATION GATE

After P0+P1 completion, verify:

| Check | What | Expected |
|-------|------|----------|
| Identity | `who are you` in container | "I am KRAKEN v1.2 — the central multi-brain orchestrator" |
| Firewall L0 | Non-kraken agent tries kraken_hive_search | `[FIREWALL_BLOCKED] L0` |
| Firewall L6 | Write to `/root/.config/opencode/test.txt` | `[FIREWALL_BLOCKED] L6` |
| Firewall L1 | "spawned = complete" in chat | `[FIREWALL_BLOCKED] L1` |
| Tools | `get_cluster_status` returns 3 clusters | Alpha/Beta/Gamma with agent counts |
| Tools | `kraken_hive_search query="build"` returns results | Non-empty pattern list |
| Brain init | Plugin init log | "Brain loops started — Planning/Execution/System" |
| Hive seed | Check `~/.local/share/opencode/kraken-hive/patterns/` | 5 seeded patterns exist |
| Identity file | Check `identity/orchestrator/KRAKEN.md` is readable | File loaded, identity injected |
| Evidence | Call `evidence.persist('plan')` | `kraken-hive/evidence/plan-evidence.json` exists |
| Context mgmt | `systemBrain.initializeProject()` | 5 files created in `Context Management/` |
| Subagent spawn | `spawn_shark_agent "echo test"` → await result | Result returns within timeout |
| Build workflow | Claim "ship ready" with unchecked items | `[FIREWALL_BLOCKED] L11` |
| Hive awareness | Ask "why didn't you check the Hive?" | No Hive-blindness excuse |

---

*Generated 2026-05-30 — Kraken v1.2 Recovery Phase: Fix Plan & Build Spec*
