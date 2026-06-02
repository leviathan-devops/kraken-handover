# KRAKEN V1.2 FIREWALL V2 SPEC
## Algorithmic System Brain + Self-Enforcing Orchestrator/Cluster Firewalls

**Version:** 2.0 (V2) — REVISED WITH ANTI-RETARD EXPANSION
**Date:** 2026-05-08
**Author:** Shark Agent v4.8.4 (post-round-2 pressure test, 97% effective firewalls)
**Reference:** `/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Shark Agent/Active Projects/Kraken_v1.2_Rebuild_v10_firewalls/`
**Parent Spec:** `BUILD_SPEC.md` (V1 - pattern-based approach)
**Data Source:** `/home/leviathan/OPENCODE_WORKSPACE/kraken-retard-example.md` (live failure session)

---

## CRITICAL UPDATE: ANTI-RETARD EXPANSION

This V2 spec has been significantly updated based on:
1. User feedback on V1 spec
2. Live failure session data from `kraken-retard-example.md`
3. Specific failure patterns observed in production Kraken sessions

### Key Changes from V1:

| Issue | V1 Behavior | V2 Required Behavior |
|-------|-------------|---------------------|
| AR Correction | "Use NUKE RELOAD" | **NEVER mention NUKE** — requires explicit user permission |
| AR Correction | "Read TUI Bible/Hive" | **Inject relevant context dynamically** — not hardcoded |
| L5 Macro | Basic scope monitoring | **Instruction adherence tracking** — "Do X" must do X |
| L6 Protection | Kraken paths only | **ALL active plugins + opencode config** |
| T4 Context | Basic theft detection | **Relevance scoring** — block keyword-matching without analysis |
| T5-4 Retard | Minimal patterns | **HEAVILY EXPANDED** — 20+ patterns |
| T5-5 Scope | Basic creep | **POWER + GUARDRAILS** — don't castrate KRAKEN |

---

## CORE PRINCIPLE

**Mechanical Intelligence > Model Intelligence**

Firewalls must be **algorithmically structured** — not model-dependent. The System Brain IS the firewall engine. When any cluster or the orchestrator exhibits derailment behavior, the System Brain detects it mechanically and enforces corrections in real-time.

---

## EXECUTIVE SUMMARY

### The V1 Problem (Pattern-Based Firewalls)

V1 (BUILD_SPEC.md) uses regex pattern matching — same as Shark's pre-round-2 approach. This works at 75-97% but has fundamental flaws:

1. **Brittle** — Agents can rephrase to bypass patterns
2. **Incomplete** — Can't anticipate all bypass attempts
3. **Model-dependent** — Relies on model to "think correctly"
4. **No cluster-level enforcement** — Only works at tool level
5. **No instruction adherence** — Agents can do anything BUT what was asked

### The V2 Solution (Algorithmic System Brain)

**System Brain is the Firewall. Firewall is the System Brain.**

```
┌─────────────────────────────────────────────────────────────────┐
│                      KRAKEN SYSTEM BRAIN                        │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              ALGORITHMIC FIREWALL ENGINE                 │   │
│  │                                                           │   │
│  │  State Monitor ──► Anomaly Detection ──► Enforcement    │   │
│  │         │                  │                  │          │   │
│  │         ▼                  ▼                  ▼          │   │
│  │   ┌─────────┐        ┌─────────┐        ┌─────────┐       │   │
│  │   │Cluster  │        │Orchestr │        │Evidence │       │   │
│  │   │Health   │        │State    │        │Verify   │       │   │
│  │   └─────────┘        └─────────┘        └─────────┘       │   │
│  │                                                           │   │
│  │   ┌─────────────────────────────────────────────────┐   │   │
│  │   │           ANTI-RETARD LAYER (EXPANDED)           │   │   │
│  │   │  • Instruction adherence (must do what was asked)  │   │   │
│  │   │  • Autonomous action blocking (no NUKE, no ship)   │   │   │
│  │   │  • Timeline awareness (40min without progress=bad)  │   │   │
│  │   │  • Root cause required (no bulk error dumps)       │   │   │
│  │   └─────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│         ┌────────────────────┼────────────────────┐              │
│         ▼                    ▼                    ▼              │
│   ┌───────────┐       ┌───────────┐       ┌───────────┐         │
│   │  ALPHA    │       │   BETA    │       │  GAMMA    │         │
│   │  CLUSTER  │       │  CLUSTER  │       │  CLUSTER  │         │
│   └───────────┘       └───────────┘       └───────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## LIVE FAILURE DATA: kraken-retard-example.md

### Documented Retard Failures

The following failures were observed in a live Kraken session (12 hours wasted):

#### Failure 1: Instruction Ignorance (CRITICAL)
**Pattern:** User says "Do X" → Agent spends 40 minutes doing anything BUT X → Returns saying "I did abc, my conclusion is we need to do X. Would you like me to do X now?"

**Impact:** 40 minutes completely wasted. Original task never started.

#### Failure 2: Wrong Analysis Priority
**Pattern:** Agent spends 4+ hours debugging container issue when solution exists in Hive/T2

**Impact:** Hours wasted when answer was already documented.

#### Failure 3: Stack Dump Without Analysis
**Pattern:** "Here are 50 stack traces" without identifying root cause

**Impact:** Bulk error reporting wastes everyone's time.

#### Failure 4: Self-Evidence Claims
**Pattern:** "I analyzed it thoroughly and my conclusion is..." without external verification

**Impact:** Self-referential proof is not proof.

#### Failure 5: Problem Creation
**Pattern:** Building functionality not requested, "adding value" on own initiative

**Impact:** Scope creep, wasted effort, user confusion.

#### Failure 6: Bundle Size Catastrophe
**Pattern:** Building 40KB bundle when original was 600KB+ (90% reduction)

**Impact:** Complete failure to understand what was being built.

#### Failure 7: Timeline Ignorance
**Pattern:** After 40 minutes of nothing, asking "what should I do next?"

**Impact:** No sense of time or progress tracking.

---

## PART 1: ANTI-RETARD LAYER (EXPANDED — HIGHEST PRIORITY)

### AR Layer Purpose

Blocks catastrophic derailment from:
1. **Not doing what was asked** — instruction adherence failure
2. **Autonomous actions** — NUKE usage, auto-shipping without permission
3. **Timeline waste** — hours spent with no forward progress
4. **Bulk error dumps** — stack traces without root cause analysis
5. **Problem creation** — building things not requested

### NO AUTONOMOUS NUKE USAGE

**CRITICAL RULE:** Agents are **STRICTLY PROHIBITED** from any autonomous use of "NUKE" assets under any circumstances.

**Correction Template (NEVER mention NUKE):**
```
STOP. [BLOCK REASON].

WHAT YOU TRIED: [specific action]
WHY BLOCKED: [mechanical reason]

DYNAMIC CORRECTION: [inject relevant context/tools for task]
DO NOT: mention NUKE, suggest NUKE, or imply NUKE as a solution
```

### AR-1: INSTRUCTION ADHERENCE (CRITICAL — Highest Priority)

**Purpose:** Detect when agent does anything OTHER than what was explicitly requested.

**Detection Mechanisms:**

```typescript
interface InstructionTracker {
  originalInstruction: string;
  instructionHash: string;
  adherenceScore: number;      // 0.0 - 1.0
  divergenceDetected: boolean;
  divergenceReason: string;
}

// MECHANICAL CHECK: Instruction adherence score
function checkInstructionAdherence(tracker: InstructionTracker): boolean {
  // If adherence < 0.8 after 5+ minutes, block
  if (tracker.elapsedTime > 5 * 60 * 1000 && tracker.adherenceScore < 0.8) {
    return true; // BLOCK
  }
  return false;
}

// PATTERN DETECTION
const INSTRUCTION_DIVERGENCE_PATTERNS = {
  // "would you like me to do X now" when X was original task
  'DELAYED_TASK': [
    /would you like me to do x now/i,
    /should i do x now/i,
    /ready to start x/i,
  ],

  // "my conclusion is we need to do X" after doing unrelated work
  'REFRAMING': [
    /my conclusion is/i,
    /after analysis.*we need/i,
    /based on my findings.*should/i,
  ],

  // Doing something else first
  'UNRELATED_FIRST': [
    /first.*let me.*(?!x)/i,  // "first let me check X" when X unrelated
    /before.*i.*(?!x)/i,      // "before doing X, i did Y"
  ]
};
```

**Block Triggers:**
- adherenceScore < 0.8 after 5+ minutes
- Task completion claim that contradicts original instruction
- "would you like me to do X now?" when X was the only task given

**Correction (DYNAMIC — NOT hardcoded references):**
```
[ANTI-RETARD AR-1] INSTRUCTION DIVERGENCE DETECTED.

Your adherence score is [X%]. You were asked to [ORIGINAL TASK].

WHAT YOU DID: [what agent actually did]
WHAT YOU WERE ASKED: [original instruction]

DYNAMIC CORRECTION: Inject relevant context for completing the original task.
Stop all other work. Focus on what was explicitly requested.
```

### AR-2: AUTONOMOUS ACTION BLOCKING (CRITICAL)

**Purpose:** Block unauthorized autonomous actions.

**Blocked Autonomous Actions:**
1. NUKE references/usage (NEVER allowed without explicit user permission)
2. Auto-ship/deploy without user approval
3. Auto-commit to repositories
4. Auto-config changes
5. Any action affecting live systems

```typescript
const AUTONOMOUS_ACTION_PATTERNS = {
  'NUKE_REFERENCE': [
    /nuke reload/i,
    /use nuke/i,
    /nuke.*hotfix/i,
    /invoke nuke/i,
    /trigger nuke/i,
  ],
  'UNAUTHORIZED_DEPLOY': [
    /auto.deploy/i,
    /auto-deploy/i,
    /ship it now/i,
    /deploy now/i,
    /push to production/i,
    /commit and push/i,
  ],
  'LIVE_CONFIG_EDIT': [
    /edit.*\.config.*opencode/i,
    /modify.*plugin.*dist/i,
    /change.*active.*config/i,
  ]
};
```

**Correction:**
```
[ANTI-RETARD AR-2] AUTONOMOUS ACTION BLOCKED.

This action requires explicit user permission:
- [SPECIFIC ACTION ATTEMPTED]

NUKE assets, deployment, and live config changes
require verbal or written user approval.

DO NOT: Mention or reference NUKE as a solution option.
DO: Ask for explicit permission before any autonomous system change.
```

### AR-3: WRONG ANALYSIS PRIORITY

**Purpose:** Block spending excessive time debugging when solution exists in Hive/T2/context.

```typescript
const ANALYSIS_PRIORITY_PATTERNS = {
  // "spent X hours" when answer exists in context
  'CONTEXT_IGNORED': (args) => {
    return args?.debugTime > 30 * 60 * 1000 &&  // 30+ minutes
           args?.relevantContextExists === true &&
           args?.contextWasConsulted === false;
  },

  // "I've been trying for hours" when solution documented
  'HOURS_WITHOUT_PROGRESS': [
    /trying for (hours?|40 minutes|4 hours)/i,
    /spent.*hours?.*(debug|fix|implement)/i,
    /still not working.*hours?/i,
  ],

  // Not checking existing solutions
  'NO_HIVE_CONSULT': [
    /didn't check.*hive/i,
    /didn't look.*context/i,
    /hive.*doesn't have.*answer/i,
  ]
};
```

**Correction:**
```
[ANTI-RETARD AR-3] ANALYSIS PRIORITY ISSUE.

You've spent [X minutes] debugging without consulting existing context.

RELEVANT CONTEXT EXISTS in [Hive/T2/previous session]:
[INJECT RELEVANT SOLUTION]

DYNAMIC CORRECTION: Consult existing context before extensive debugging.
```

### AR-4: ROOT CAUSE REQUIRED

**Purpose:** Block bulk error dumps without analysis.

```typescript
const ROOT_CAUSE_PATTERNS = {
  // Stack trace dumps
  'BULK_ERROR_DUMP': [
    /here('s| are) (the )?(stack |error )?traces?:?\s*$/i,
    /full (error |exception) log/i,
    /attaching.*trace/i,
    /stack traces.*below/i,
  ],

  // "all tests failed" without specifics
  'NO_SPECIFIC_FAILURE': [
    /all tests failed/i,
    /everything is broken/i,
    /multiple.*errors?( occurred)?$/i,
    /many issues found/i,
  ],

  // Raw log dumps
  'RAW_LOG_DUMP': [
    /^error:.*\n.*error:.*\n.*error:/im,
    /^\s*at\s+.*\n\s*at\s+.*\n\s*at\s+.*/im,
  ]
};
```

**Correction:**
```
[ANTI-RETARD AR-4] ROOT CAUSE ANALYSIS REQUIRED.

Bulk error dumps are not helpful. Identify:
1. FIRST error (chronologically)
2. ROOT CAUSE (why it propagated)
3. SPECIFIC FIX (what resolves it)

Do not report 50 errors. Report 1 root cause.
```

### AR-5: SELF-EVIDENCE CLAIMS

**Purpose:** Block self-referential proof without external verification.

```typescript
const SELF_EVIDENCE_PATTERNS = {
  'SELF_JUSTIFICATION': [
    /i analyzed.*thoroughly/i,
    /my analysis shows/i,
    /in my assessment/i,
    /i'm certain/i,
    /clearly correct/i,
    /obviously works/i,
    /self-?evidently/i,
  ],

  'WITHOUT_VERIFICATION': [
    /trust me/i,
    /believe me/i,
    /obviously/i,
    /clearly/i,
    /it just works/i,
  ]
};
```

**Correction:**
```
[ANTI-RETARD AR-5] SELF-EVIDENCE INSUFFICIENT.

"I analyzed" / "my assessment" / "trust me" are not proof.

REQUIRED: Mechanical evidence from execution:
- Container test results
- Output file verification
- Exit code validation

Provide evidence, not self-assurance.
```

### AR-6: TIMELINE AWARENESS

**Purpose:** Block asking for task re-explanation when task was clear.

```typescript
interface TimelineTracker {
  taskStartTime: number;
  lastProgressTime: number;
  taskDescription: string;
  isExplicit: boolean;  // Was task explicitly described?
}

const TIMELINE_PATTERNS = {
  // "what was i doing" after explicit instructions
  'EXPLICIT_IGNORED': [
    /what was i doing\??$/i,
    /remind me.*task/i,
    /what should i do\??/i,
    /i'm confused.*goal/i,
    /not sure.*next/i,
  ],

  // Progress check without progress
  'NO_PROGRESS': [
    /any progress\??/i,
    /how's it going\??/i,
    /status update\??/i,
  ],

  // Requesting clarification when clear
  'EXPLICIT_CLARITY_IGNORED': [
    /could you clarify\??/i,  // When instructions were clear
    /i need more info/i,      // When sufficient info was given
  ]
};
```

**Correction:**
```
[ANTI-RETARD AR-6] TASK EXPLICITLY GIVEN.

Your original task was clearly stated.
Task: [ORIGINAL INSTRUCTION]

Continue execution. Do not re-ask for clarification
unless blocked by a technical dependency.
```

### AR-7: PROBLEM CREATION BLOCKING

**Purpose:** Block building functionality not requested.

```typescript
const PROBLEM_CREATION_PATTERNS = {
  // "what if we also..."
  'HYPOTHETICAL_ADDITIONS': [
    /what if we also/i,
    /might also be useful/i,
    /could also add/i,
    /for future/i,
    /in case we need/i,
  ],

  // Building not requested features
  'UNREQUESTED_BUILD': [
    /i also built/i,
    /i created.*not requested/i,
    /added.*extra/i,
    /bonus feature/i,
  ],

  // "while we're at it"
  'WHILE_AT_IT': [
    /while (we('re| are) (at it|here))/i,
    /may as well/i,
    /might as well.*also/i,
  ]
};
```

**Correction:**
```
[ANTI-RETARD AR-7] SCOPE VIOLATION.

You were asked to build [EXPLICIT REQUEST].
You proposed building [PROPOSED ADDITION].

RULES:
1. Complete the original task first
2. Any additions require explicit approval
3. "While at it" / "might as well" = scope creep

Get approval before expanding scope.
```

### AR-8: EXCUSE GENERATION BLOCKING

**Purpose:** Block deflection and blame.

```typescript
const EXCUSE_PATTERNS = {
  'EXTERNAL_BLAME': [
    /it's not my fault/i,
    /can't help it/i,
    /beyond my control/i,
    /they should have/i,
    /needed them to/i,
    /someone else's (mistake|bug|issue)/i,
  ],

  'COINCIDENCE': [
    /just a coincidence/i,
    /technical issue/i,
    /glitch/i,
    /weird bug/i,
    /happens sometimes/i,
  ],

  'MACHINE_EXCUSE': [
    /works on my (machine|computer)/i,
    /local.*fine/i,
    /my setup.*different/i,
  ],

  'DOCKER_EXCUSE': [
    /docker.*doesn't need.*network/i,
    /container.*doesn't require.*internet/i,
    /docker.*isolated/i,
  ]
};
```

**Correction:**
```
[ANTI-RETARD AR-8] EXCUSE DETECTED.

Blame/deflection is not accountability.

Take responsibility:
1. Identify what YOU could have done differently
2. Propose actionable fix
3. Escalate if blocked by external dependency

Excuses block learning. Root cause analysis required.
```

### AR-9: CONTEXT RELEVANCE SCORING

**Purpose:** Block irrelevant context injection.

```typescript
interface ContextRelevance {
  contextSource: string;
  relevanceScore: number;  // 0.0 - 1.0
  keywordsMatched: string[];
  taskRelevance: boolean;
}

// CONTEXT THEFT BLOCK
function checkContextRelevance(context: ContextRelevance): boolean {
  // If relevance < 0.7, block injection
  if (context.relevanceScore < 0.7) {
    return true; // BLOCK
  }
  return false;
}

const CONTEXT_THEFT_PATTERNS = {
  // Keyword matching without relevance
  'KEYWORD_HIJACK': [
    /spider.*agent.*architecture/i,  // When "spider" in prompt but 0 relevance
    /trident.*synthesis/i,          // When target is Deep Planning
    /.*agent.*relevant/i,            // Generic agent reference
  ],

  // Cross-context contamination
  'DOMAIN_HIJACK': [
    /reading.*context.*for.*(?!current task)/i,
    /injecting.*unrelated.*context/i,
    /cross-.*context.*contamination/i,
  ]
};
```

**Correction:**
```
[ANTI-RETARD AR-9] CONTEXT IRRELEVANCE DETECTED.

Attempted to inject context from:
- Source: [CONTEXT NAME]
- Matched keywords: [KEYWORDS]
- Relevance to current task: [SCORE]%

Context rejected. Relevance threshold: 70%

Continue with task-specific context only.
```

---

## PART 2: ANTI-RETARD ENFORCEMENT ENGINE

### Mechanical vs Text-Based Balance

| Check Type | Percentage | Speed | Use Case |
|------------|------------|-------|----------|
| Mechanical (state tracking) | 70% | < 1ms | Loop detection, adherence scoring |
| Text-based (patterns) | 30% | < 5ms | Excuses, self-evidence, scope creep |

### Anti-Retard Engine Structure

```typescript
class AntiRetardEngine {
  private instructionTracker: Map<string, InstructionTracker>;
  private timelineTracker: Map<string, TimelineTracker>;
  private contextRelevance: Map<string, ContextRelevance>;

  checkAll(context: DerailmentContext): EnforcementResult {
    // 1. Instruction adherence (mechanical)
    const adherence = this.checkInstructionAdherence(context);
    if (adherence.block) return adherence;

    // 2. Timeline awareness (mechanical)
    const timeline = this.checkTimeline(context);
    if (timeline.block) return timeline;

    // 3. Context relevance (mechanical + pattern)
    const relevance = this.checkContextRelevance(context);
    if (relevance.block) return relevance;

    // 4. Text-based pattern checks
    const patterns = this.checkPatterns(context);
    if (patterns.block) return patterns;

    return { block: false };
  }

  // DYNAMIC CORRECTION INJECTION
  private injectDynamicCorrection(issue: string, context: DerailmentContext): string {
    // Instead of hardcoded "read TUI Bible"
    // Inject context specifically relevant to the issue

    const relevantContext = this.getRelevantContext(issue, context);
    return `DYNAMIC CORRECTION: ${relevantContext}`;
  }
}
```

### Dynamic Correction System

**CRITICAL:** Corrections must be dynamically relevant, NOT hardcoded references.

```typescript
function getDynamicCorrection(
  issue: string,
  taskType: string,
  errorType?: string
): string {
  // Map issues to task-relevant context
  const correctionMap = {
    'INSTRUCTION_DIVERGENCE': {
      build: 'Review SPEC.md for requirements. Complete only what was requested.',
      debug: 'Check debug handbook in kraken-context. Follow systematic approach.',
      test: 'Run test harness. Report specific failures only.',
    },
    'DEBUG_TIME_EXCEEDED': {
      timeout: 'Check Hive for similar issues. Escalate if blocked >10 minutes.',
      pattern: 'Verify stack trace against known issues in kraken-context.',
    },
    'ROOT_CAUSE_MISSING': {
      generic: 'Identify the first error in the chain. Report one root cause.',
    }
  };

  return correctionMap[issue]?.[taskType] ||
         correctionMap[issue]?.generic ||
         'Focus on the specific task. Request help only when blocked.';
}
```

---

## PART 3: LAYER 5 MACRO DERAILMENT (EXPANDED)

### L5 is now the ANTI-RETARD umbrella layer

```
L5 (MACRO DERAILMENT)
├── AR-1: Instruction Adherence
├── AR-2: Autonomous Action Blocking
├── AR-3: Wrong Analysis Priority
├── AR-4: Root Cause Required
├── AR-5: Self-Evidence Claims
├── AR-6: Timeline Awareness
├── AR-7: Problem Creation
├── AR-8: Excuse Generation
└── AR-9: Context Relevance
```

### L5 Implementation

```typescript
interface MacroDerailmentConfig {
  instructionAdherenceThreshold: number;  // 0.8 (80%)
  maxDebugTimeBeforeConsultContext: number; // 30 minutes
  timelineIgnoranceThreshold: number;      // 5 minutes
  rootCauseRequired: boolean;
  noAutonomousActions: boolean;
}

const DEFAULT_MACRO_CONFIG: MacroDerailmentConfig = {
  instructionAdherenceThreshold: 0.8,
  maxDebugTimeBeforeConsultContext: 30 * 60 * 1000,
  timelineIgnoranceThreshold: 5 * 60 * 1000,
  rootCauseRequired: true,
  noAutonomousActions: true,
};

function checkMacroDerailment(
  context: DerailmentContext,
  config: MacroDerailmentConfig = DEFAULT_MACRO_CONFIG
): DerailmentResult {
  // AR-1: Instruction adherence
  const adherence = checkInstructionAdherence(context, config.instructionAdherenceThreshold);
  if (adherence.block) return adherence;

  // AR-2: Autonomous actions
  const autonomy = checkAutonomousActions(context);
  if (autonomy.block) return autonomy;

  // AR-3: Analysis priority
  const priority = checkAnalysisPriority(context, config.maxDebugTimeBeforeConsultContext);
  if (priority.block) return priority;

  // AR-4: Root cause
  const rootCause = checkRootCause(context, config.rootCauseRequired);
  if (rootCause.block) return rootCause;

  // AR-5: Self-evidence
  const selfEvidence = checkSelfEvidence(context);
  if (selfEvidence.block) return selfEvidence;

  // AR-6: Timeline
  const timeline = checkTimeline(context, config.timelineIgnoranceThreshold);
  if (timeline.block) return timeline;

  // AR-7: Problem creation
  const problemCreation = checkProblemCreation(context);
  if (problemCreation.block) return problemCreation;

  // AR-8: Excuses
  const excuses = checkExcuses(context);
  if (excuses.block) return excuses;

  // AR-9: Context relevance
  const relevance = checkContextRelevance(context);
  if (relevance.block) return relevance;

  return { block: false };
}
```

---

## PART 4: LAYER 6 KRAKEN PROTECTION (EXPANDED)

### Protected Paths — ALL Active Plugins + OpenCode Config

```typescript
const PROTECTED_PATHS = {
  // OpenCode config directory (ALL contents)
  OPENCODE_CONFIG: [
    '/home/leviathan/.config/opencode/',
    '~/.config/opencode/',
  ],

  // ALL plugin bundles
  PLUGIN_BUNDLES: [
    '/home/leviathan/.config/opencode/plugins/*/dist/index.js',
    '/home/leviathan/.config/opencode/plugins/*/dist/*.js',
  ],

  // ALL agent configs
  AGENT_CONFIGS: [
    '/home/leviathan/.config/opencode/agent-configs/',
    '/home/leviathan/.config/opencode/agents/',
  ],

  // Identity files (Kraken + all subagents)
  IDENTITY_FILES: [
    '/home/leviathan/.config/opencode/plugins/*/identity/',
    '/home/leviathan/.config/opencode/identity/',
  ],

  // Hook configurations
  HOOK_CONFIG: [
    '/home/leviathan/.config/opencode/hooks/',
    '/home/leviathan/.config/opencode/plugins/*/hooks/',
  ],
};

// NO EDITS without explicit user permission
const PROTECTED_OPERATIONS = {
  'WRITE': ['create', 'edit', 'patch', 'write', 'modify', 'update'],
  'DELETE': ['rm', 'delete', 'remove', 'unlink'],
  'EXECUTE': ['chmod', 'chown', 'sudo', 'run as'],
};
```

### L6 Rules

1. **NO edits to live config files** without explicit user verbal permission
2. **All work done in container** in sandboxed project workspace
3. **NEVER auto-ship/deploy** — user must explicitly approve
4. **Plugin bundle edits** require full rebuild + verification before deployment

```typescript
function checkKrakenProtection(context: DerailmentContext): DerailmentResult {
  const { tool, args, path } = context;

  // Check if operation targets protected path
  for (const [category, patterns] of Object.entries(PROTECTED_PATHS)) {
    for (const pattern of patterns) {
      if (matchesPath(path, pattern)) {
        // BLOCK - requires explicit user permission
        return {
          block: true,
          layer: 'L6',
          reason: `PROTECTED_PATH: ${category}`,
          correction: `EXPLICIT USER PERMISSION REQUIRED for ${path}.

Protected path. Any edits require verbal or written approval.
All development in sandboxed container. No auto-deployment.`
        };
      }
    }
  }

  return { block: false };
}
```

---

## PART 5: LAYER T4 CONTEXT THEFT (REFINED)

### Context Relevance Scoring

```typescript
interface ContextRead {
  source: string;
  target: string;         // What the agent is actually working on
  keywordsOverlap: string[];
  semanticScore: number;  // 0.0 - 1.0
  isRelevant: boolean;
}

function scoreContextRelevance(read: ContextRead): number {
  // Keyword overlap alone is insufficient
  const keywordScore = read.keywordsOverlap.length > 0 ? 0.3 : 0;

  // Semantic similarity (using embedding or keyword analysis)
  const semanticScore = calculateSemanticSimilarity(read.source, read.target);

  // Combined score
  return keywordScore + (semanticScore * 0.7);
}

// Threshold: 70% relevance required
const CONTEXT_RELEVANCE_THRESHOLD = 0.7;

function checkContextTheft(context: DerailmentContext): DerailmentResult {
  const { toolArgs, currentTask } = context;

  // If reading context for current task
  if (toolArgs?.context?.source) {
    const score = scoreContextRelevance({
      source: toolArgs.context.source,
      target: currentTask,
      keywordsOverlap: toolArgs.context.matchedKeywords || [],
      semanticScore: toolArgs.context.semanticScore || 0,
    });

    if (score < CONTEXT_RELEVANCE_THRESHOLD) {
      return {
        block: true,
        layer: 'T4',
        reason: 'CONTEXT_RELEVANCE_BELOW_THRESHOLD',
        correction: `Context relevance: ${(score * 100).toFixed(0)}%
Required: 70%
Source: ${toolArgs.context.source}

DYNAMIC CORRECTION: Inject only context relevant to current task.`
      };
    }
  }

  return { block: false };
}
```

---

## PART 6: LAYER T5-4 RETARD LOGIC (HEAVILY EXPANDED)

### T5-4 Patterns — 20+ Patterns

```typescript
const RETARD_LOGIC_PATTERNS = {
  // Contradictory statements
  'SELF_CONTRADICTION': [
    /it works and it doesn't work/i,
    /both.*correct and.*incorrect/i,
    /x is true but.*x is false/i,
    /should and shouldn't at the same time/i,
  ],

  // Impossible conditions
  'IMPOSSIBLE_CONDITION': [
    /if.*(?!x).*then.*\1/i,  // If X then not X
    /must be.*and.*cannot be.*same/i,
    /require.*but.*prevent/i,
  ],

  // Basic fallacy
  'BASIC_FALLACY': [
    /false because.*true/i,
    /correlation.*causation.*assumed/i,
    /all.*are.*none.*are/i,
  ],

  // "I understand" followed by misunderstanding
  'STATED_UNDERSTANDING_VIOLATED': [
    /i understand.*proceed.*wrong/i,
    /got it.*doing.*opposite/i,
    /understood.*but.*didn't.*because/i,
  ],

  // Requesting clarification when clear
  'EXPLICIT_IGNORED_FOR_CLARITY': [
    /need clarification.*(?!ambiguous)/i,  // When wasn't ambiguous
    /unclear.*(?!actually unclear)/i,
    /could you explain.*(?!genuinely unclear)/i,
  ],

  // Loop without change
  'SAME_APPROACH_LOOP': [
    /same thing/i,
    /same approach/i,
    /try again.*without.*change/i,
    /again.*identical/i,
  ],

  // Claiming success without verification
  'UNVERIFIED_SUCCESS': [
    /it's fixed/i,
    /works now/i,
    /solved/i,
    /resolved/i,
    /done.*(?!verified)/i,
  ],

  // Denial of obvious
  'DENIAL_OF_OBVIOUS': [
    /that's not what i said/i,
    /that's not what you asked/i,
    /i didn't say that/i,
    /misunderstanding.*(?!actually)/i,
  ],

  // Blame shifting
  'BLAME_SHIFT': [
    /you told me to.*but/i,
    /according to.*should.*but/i,
    /the (request|instructions) said.*but.*i/i,
  ],

  // "Let me try again" without change
  'BLIND_RETRY': [
    /let me try again/i,
    /one more attempt/i,
    /another shot/i,
    /retrying.*(?!different)/i,
  ]
};
```

**Correction:**
```
[ANTI-DERAILMENT T5-4] RETARD LOGIC DETECTED.

Pattern: [SPECIFIC PATTERN MATCHED]
Issue: [WHAT'S WRONG WITH THE REASONING]

BASIC LOGIC REQUIRED:
1. A statement cannot be both true and false
2. "Try again" requires DIFFERENT approach
3. Understanding ≠ agreement ≠ execution

Fix your logic before proceeding.
```

---

## PART 7: LAYER T5-5 SCOPE CREEP (CORRECTLY STRUCTURED)

### T5-5 — POWER WITH GUARDRAILS

**Philosophy:** KRAKEN must remain powerful. We need guardrails, not cages.

### Allowed (Not Scope Creep)

```typescript
const SCOPE_ALLOWED_PATTERNS = {
  // Clarifying questions on genuinely ambiguous instructions
  'LEGITIMATE_CLARIFICATION': [
    /could you clarify.*ambiguous/i,
    /just to confirm.*scope/i,
    /for the.*feature.*which.*approach/i,
  ],

  // Reporting blockers outside original scope
  'LEGITIMATE_BLOCKER': [
    /blocked by.*dependency.*outside.*scope/i,
    /requires.*approval.*not in.*scope/i,
    /question.*about.*boundary.*of.*task/i,
  ],

  // Security/quality issues (must report)
  'SECURITY_QUALITY_FLAG': [
    /security.*issue.*found/i,
    /quality.*debt.*identified/i,
    /blocking.*bug.*in.*dependency/i,
  ]
};
```

### Blocked (Scope Creep)

```typescript
const SCOPE_CREEP_PATTERNS = {
  'WHILE_AT_IT': [
    /while at it/i,
    /while we're at it/i,
    /while here/i,
  ],

  'MIGHT_AS_WELL': [
    /might as well/i,
    /may as well/i,
  ],

  'ALSO_COULD': [
    /also could/i,
    /could also/i,
    /could add/i,
  ],

  'ONE_MORE_THING': [
    /one more thing/i,
    /oh and also/i,
    /also need to/i,
  ],

  'FOR_COMPLETENESS': [
    /for completeness/i,
    /just to be thorough/i,
    /for thoroughness/i,
  ],

  'RELATED_ISSUE': [
    /related issue/i,
    /this is related/i,
    /similar problem/i,
  ],

  'SIDE_TASK': [
    /on the side/i,
    /as a side note/i,
    /incidentally/i,
  ]
};
```

**Correction (BALANCED — Not Castrating):**
```
[ANTI-DERAILMENT T5-5] SCOPE CREEP DETECTED.

Original task: [ORIGINAL REQUEST]
Proposed addition: [PROPOSED]

RULES:
1. Complete original task first
2. Any additions require explicit approval
3. "While at it" / "might as well" = scope creep

You're building KRAKEN — be powerful but focused.
Get approval before expanding scope.
```

---

## PART 8: SYSTEM BRAIN AS FIREWALL ENGINE

(Same as previous V2 spec — unchanged)

### System Brain responsibilities

```
SYSTEM BRAIN
├── Workflow State
│   ├── currentGate
│   ├── gateHistory
│   └── decisionLog
│
├── FIREWALL ENGINE
│   ├── Cluster Health Monitor
│   ├── Anomaly Detection
│   └── Enforcement Actions
│
└── Evidence Gate
    ├── ContainerTestResult.json
    ├── Output verification
    └── Mechanical proof
```

### Cluster Health Monitor

```typescript
interface ClusterHealth {
  clusterId: 'ALPHA' | 'BETA' | 'GAMMA';
  failureCount: number;
  failurePattern: string[];
  isDerailing: boolean;
}

class ClusterHealthMonitor {
  // Loop detection after 5 identical failures
  recordFailure(clusterId: string, type: string): void;
  triggerClusterFirewall(clusterId: string, reason: string): void;
}
```

---

## PART 9: EVIDENCE-GATED RECOVERY

### Cluster Recovery Protocol

```typescript
interface RecoveryRequirement {
  clusterId: string;
  required: string[];
  passThreshold: number;
  blockedUntil: number;
}

function canRecover(clusterId: string): boolean;
function recoverCluster(clusterId: string): void;
```

---

## PART 10: FILE STRUCTURE

```
Kraken_v1.2_Rebuild_v10_firewalls/
├── src/
│   ├── brains/
│   │   └── system/
│   │       ├── system-brain.ts
│   │       └── firewall/
│   │           ├── index.ts
│   │           ├── engine.ts
│   │           ├── anti-retard.ts        # EXPANDED — 9 sub-patterns
│   │           ├── macro-derailment.ts    # L5 umbrella
│   │           ├── cluster-health.ts
│   │           ├── context-relevance.ts   # T4 refined
│   │           ├── kraken-protection.ts   # L6 expanded
│   │           ├── evidence-gate.ts
│   │           └── recovery.ts
│   ├── shared/
│   │   ├── messenger.ts
│   │   └── state-store.ts
│   └── index.ts
├── tests/
│   ├── anti-retard-tests.ts              # 20+ pattern tests
│   ├── instruction-adherence-tests.ts
│   ├── context-relevance-tests.ts
│   └── cluster-health-tests.ts
├── Compaction Survival/
│   ├── COMPACTION_SURVIVAL.md
│   └── checkpoints/
├── BUILD_SPEC.md
└── FIREWALL_V2_SPEC.md                   # This file
```

---

## PART 11: IMPLEMENTATION PRIORITY

### Phase 1: Anti-Retard Core (CRITICAL)
1. AR-1: Instruction adherence tracking
2. AR-2: Autonomous action blocking (especially NUKE prohibition)
3. AR-8: Excuse generation blocking

### Phase 2: Macro Derailment (CRITICAL)
1. L5 umbrella structure
2. AR-3 to AR-7 integration
3. Dynamic correction injection

### Phase 3: Layer Expansions (HIGH)
1. L6: Expand to ALL plugins + config
2. T4: Context relevance scoring
3. T5-4: 20+ patterns
4. T5-5: Power + guardrails balance

### Phase 4: Cluster Health (MEDIUM)
1. ClusterHealthMonitor
2. Cluster-wide firewall triggers
3. Evidence-gated recovery

---

## PART 12: TESTING

### Anti-Retard Tests

```typescript
describe('AR-1 Instruction Adherence', () => {
  it('blocks when adherence < 80% after 5 minutes', () => {
    tracker.adherenceScore = 0.7;
    tracker.elapsedTime = 6 * 60 * 1000;
    expect(checkInstructionAdherence(tracker)).toBe(true);
  });

  it('allows when adherence >= 80%', () => {
    tracker.adherenceScore = 0.85;
    expect(checkInstructionAdherence(tracker)).toBe(false);
  });
});

describe('AR-2 NUKE Prohibition', () => {
  it('blocks any NUKE reference', () => {
    expect(isBlocked('use nuke reload')).toBe(true);
    expect(isBlocked('invoke nuke')).toBe(true);
    expect(isBlocked('trigger nuke hotfix')).toBe(true);
  });

  it('allows non-NUKE recovery suggestions', () => {
    expect(isBlocked('try a different approach')).toBe(false);
  });
});

describe('T5-5 Scope Creep', () => {
  it('blocks "while at it" additions', () => {
    expect(isBlocked("while at it, fix this too")).toBe(true);
  });

  it('allows legitimate clarifying questions', () => {
    expect(isBlocked("could you clarify the ambiguous part")).toBe(false);
  });
});
```

---

## SUCCESS CRITERIA

| Criterion | Target |
|-----------|--------|
| Instruction adherence detection | > 95% |
| NUKE prohibition | 100% (zero autonomous references) |
| Scope creep prevention | > 90% |
| Context relevance scoring | Working with 70% threshold |
| Timeline awareness | 5-minute threshold |
| Root cause requirement | Enforced |
| Power preserved (T5-5) | Legitimate scope not blocked |

---

*V2 Spec — Final with Anti-Retard Expansion*
*Based on kraken-retard-example.md live failure data*
*Shark Agent v4.8.4 — 97% effective firewall engineering*
*Last updated: 2026-05-08*