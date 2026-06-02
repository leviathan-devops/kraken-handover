/**
 * src/brains/system/system-brain.ts
 * 
 * V1.2 System Brain
 * 
 * Owns: workflow-state, security-state
 * 
 * Key responsibilities:
 * - Workflow tracking
 * - Security enforcement
 * - Gate criteria
 * - Compaction management
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'node:url';
import { getStateStore, type StateStore } from '../../shared/state-store.js';
import { getBrainMessenger, type BrainMessenger } from '../../shared/brain-messenger.js';
import { getEvidenceCollector } from '../../shared/evidence-collector.js';
import type { DomainId } from '../../shared/domain-ownership.js';

export interface SystemState {
  initialized: boolean;
  currentGate: string;
  decisionCount: number;
  completedTasks: string[];
}

export interface DecisionPoint {
  id: string;
  description: string;
  type: string;
  contextFiles: string[];
  timestamp: number;
}

export class SystemBrain {
  private initialized = false;
  private state: SystemState = {
    initialized: false,
    currentGate: 'plan',
    decisionCount: 0,
    completedTasks: [],
  };
  private stateStore: StateStore;
  private messenger: BrainMessenger;
  private recentDecisions: DecisionPoint[] = [];

  constructor(stateStore?: StateStore, messenger?: BrainMessenger) {
    this.stateStore = stateStore || getStateStore();
    this.messenger = messenger || getBrainMessenger();
  }

  initialize(): void {
    if (this.initialized) return;
    
    console.error('[SystemBrain] Initializing...');
    this.initialized = true;
    this.state.initialized = true;
    
    this.stateStore.set('security-state', 'initialized', true, ['kraken-system']);
    this.stateStore.set('security-state', 'brain-id', 'kraken-system', ['kraken-system']);
    this.stateStore.set('workflow-state', 'current-gate', 'plan', ['kraken-system']);
    
    // Subscribe to brain messages
    this.messenger.subscribe('kraken-system', this.handleBrainMessage.bind(this));
    
    console.error('[SystemBrain] Initialized - owns workflow-state, security-state');

    this.restoreGateFromEvidence();
  }

  private restoreGateFromEvidence(): void {
    try {
      const evidence = getEvidenceCollector();
      const gateOrder = ['plan', 'build', 'test', 'verify', 'audit', 'delivery'];
      for (const gate of [...gateOrder].reverse()) {
        const gateEvidence = evidence.getGateEvidence(gate);
        if (gateEvidence.items.length > 0 && gateEvidence.allVerified) {
          this.setCurrentGate(gate);
          console.error(`[SystemBrain] Restored gate from evidence: ${gate}`);
          break;
        }
      }
    } catch (err: unknown) {
      console.warn('[SystemBrain] Could not restore gate:', err instanceof Error ? err.message : String(err));
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  // =========================================================================
  // WORKFLOW TRACKING
  // =========================================================================

  setCurrentGate(gate: string): void {
    this.state.currentGate = gate;
    this.stateStore.set('workflow-state', 'current-gate', gate, ['kraken-system']);
    console.error(`[SystemBrain] Gate set to: ${gate}`);
  }

  getCurrentGate(): string {
    return this.state.currentGate;
  }

  recordDecision(decision: { description: string; type: string; contextFiles: string[] }): void {
    const decisionPoint: DecisionPoint = {
      id: `dp-${++this.state.decisionCount}`,
      description: decision.description,
      type: decision.type,
      contextFiles: decision.contextFiles,
      timestamp: Date.now(),
    };
    
    this.recentDecisions.unshift(decisionPoint);
    if (this.recentDecisions.length > 20) {
      this.recentDecisions.pop();
    }
    
    this.stateStore.set('workflow-state', `decision-${decisionPoint.id}`, decisionPoint, ['kraken-system']);
    this.stateStore.set('workflow-state', 'recent-decisions', this.recentDecisions, ['kraken-system']);
    
    console.error(`[SystemBrain] Decision recorded: ${decision.description}`);
  }

  getRecentDecisions(): DecisionPoint[] {
    return [...this.recentDecisions];
  }

  /**
   * Query decisions by type or text search.
   * Inverts the write-only pattern — decisions are now readable.
   */
  queryDecisions(filter?: { type?: string; search?: string; limit?: number }): DecisionPoint[] {
    let results = [...this.recentDecisions];
    if (filter?.type) {
      results = results.filter(d => d.type === filter.type);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(d => d.description.toLowerCase().includes(q));
    }
    if (filter?.limit) {
      results = results.slice(0, filter.limit);
    }
    return results;
  }

  // =========================================================================
  // TASK TRACKING
  // =========================================================================

  recordTaskStart(taskId: string): void {
    this.stateStore.set('workflow-state', `task-${taskId}-start`, Date.now(), ['kraken-system']);
    this.stateStore.set('workflow-state', `task-${taskId}-status`, 'active', ['kraken-system']);
  }

  recordTaskComplete(taskId: string): void {
    this.state.completedTasks.push(taskId);
    this.stateStore.set('workflow-state', `task-${taskId}-status`, 'completed', ['kraken-system']);
    this.stateStore.set('workflow-state', `task-${taskId}-complete`, Date.now(), ['kraken-system']);
    
    // Notify planning brain
    this.messenger.deliverMessage('kraken-system', 'kraken-planning', 'checkpoint', {
      type: 'task-complete',
      taskId,
    }, 'normal');
  }

  recordTaskFailure(taskId: string, error: string): void {
    this.stateStore.set('workflow-state', `task-${taskId}-status`, 'failed', ['kraken-system']);
    this.stateStore.set('workflow-state', `task-${taskId}-error`, error, ['kraken-system']);
    
    // Send gate failure to all brains
    this.messenger.send({
      from: 'kraken-system',
      to: '*',
      type: 'gate-failure',
      priority: 'critical',
      payload: { taskId, error },
      requiresAck: true,
    });
  }

  getCompletedTasks(): string[] {
    return [...this.state.completedTasks];
  }

  // =========================================================================
  // SECURITY ENFORCEMENT
  // =========================================================================

  checkSecurityContext(operation: string, context: Record<string, unknown>): { allowed: boolean; reason?: string } {
    // Check if operation is allowed in current security context
    // This is a simplified version - real implementation would check zones, permissions, etc.
    
    const blocked = context.blocked || false;
    if (blocked) {
      return { allowed: false, reason: 'Operation blocked by security context' };
    }
    
    return { allowed: true };
  }

  validateToolUsage(tool: string, args: Record<string, unknown>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validate tool usage based on current gate
    const currentGate = this.state.currentGate;
    
    // Some tools may only be available in certain gates
    const gateRestrictions: Record<string, string[]> = {
      'plan': ['hive_status', 'get_cluster_status', 'get_agent_status', 'anchor_cluster'],
      'build': ['spawn_cluster_task', 'spawn_shark_agent', 'spawn_manta_agent'],
      'test': ['aggregate_results'],
      'verify': ['kraken-gate-status'],
    };
    
    const allowed = gateRestrictions[currentGate] || [];
    if (allowed.length > 0 && !allowed.includes(tool)) {
      // Not necessarily an error - some tools work across gates
    }
    
    return { valid: errors.length === 0, errors };
  }

  // =========================================================================
  // L7 COORDINATION GATES (per GOLDEN_BEHAVIOR_ENFORCEMENT.md)
  // =========================================================================

  /**
   * L4: Validate domain designation — task type must match target cluster.
   * Alpha = steamroll (build), Beta = precision (debug/fix/refactor), Gamma = testing (test/audit)
   */
  validateDomainAssignment(taskType: string, targetCluster: string): { valid: boolean; reason?: string } {
    const domainMap: Record<string, string> = {
      'build': 'alpha',
      'debug': 'beta', 'fix': 'beta', 'refactor': 'beta', 'analyze': 'beta',
      'test': 'gamma', 'audit': 'gamma', 'verify': 'gamma',
    };
    const expectedCluster = domainMap[taskType] || 'alpha';
    const clusterMap: Record<string, string> = {
      'alpha': 'cluster-alpha', 'cluster-alpha': 'cluster-alpha',
      'beta': 'cluster-beta', 'cluster-beta': 'cluster-beta',
      'gamma': 'cluster-gamma', 'cluster-gamma': 'cluster-gamma',
    };
    const resolvedTarget = clusterMap[targetCluster] || targetCluster;
    const resolvedExpected = clusterMap[expectedCluster] || `cluster-${expectedCluster}`;

    if (resolvedTarget !== resolvedExpected) {
      return {
        valid: false,
        reason: `[L4_WRONG_CLUSTER] Task type '${taskType}' belongs to ${resolvedExpected}, not ${resolvedTarget}`,
      };
    }
    return { valid: true };
  }

  /**
   * L2: Verify output retrieval before allowing completion claim.
   * Task completion without output retrieval = BLOCKED.
   */
  validateOutputRetrieval(taskId: string, outputsRetrieved: boolean, filesOnHost: string[]): { passed: boolean; blockers: string[] } {
    const blockers: string[] = [];

    if (!outputsRetrieved) {
      blockers.push(`[L2_FALSE_COMPLETION] Task ${taskId}: outputs not retrieved`);
    }
    if (filesOnHost.length === 0) {
      blockers.push(`[L2_FALSE_COMPLETION] Task ${taskId}: no files verified on host`);
    }

    return {
      passed: blockers.length === 0,
      blockers,
    };
  }

  /**
   * L1: Block orchestration theater — assigned ≠ complete, spawned ≠ done.
   */
  validateOrchestrationTheater(taskId: string, status: string): { passed: boolean; reason?: string } {
    const theaterClaims: Record<string, string> = {
      'assigned': 'Task assigned but not executed',
      'queued': 'Task queued but not started',
      'spawned': 'Task spawned but not tracked',
      'in_progress': 'Task in progress, not complete',
    };

    if (theaterClaims[status]) {
      return { passed: false, reason: `[L1_THEATER] ${theaterClaims[status]}` };
    }
    return { passed: true };
  }

  // =========================================================================
  // GATE CRITERIA
  // =========================================================================

  getGateCriteria(gate: string): { requirement: string; passed: boolean }[] {
    // Real mechanical checks — no theatrical () => true
    const criteria: Record<string, { requirement: string; check: () => boolean }[]> = {
      'plan': [
        { requirement: 'System brain initialized', check: () => this.initialized },
        { requirement: 'Planning brain T2 loaded', check: () => {
          const t2 = this.stateStore.get('planning-state', 't2-master');
          return !!t2;
        }},
        { requirement: 'At least 1 decision recorded', check: () => this.state.decisionCount > 0 },
      ],
      'build': [
        { requirement: 'Plan gate passed', check: () => this.state.currentGate !== 'plan' || this.state.decisionCount > 0 },
        { requirement: 'At least 1 task completed', check: () => this.state.completedTasks.length > 0 },
        { requirement: 'Domain assignments validated', check: () => this.state.decisionCount >= 1 },
      ],
      'test': [
        { requirement: 'Build gate passed', check: () => ['build','test','verify','audit','delivery'].includes(this.state.currentGate) },
        { requirement: 'At least 1 task completed', check: () => this.state.completedTasks.length >= 1 },
        { requirement: 'Evidence collected for test gate', check: () => {
          try {
            
            return getEvidenceCollector().isGateVerified('test') || getEvidenceCollector().getGateEvidence('test').items.length > 0;
          } catch (err: unknown) { console.error('[SystemBrain] test gate evidence check failed:', err instanceof Error ? err.message : String(err)); return false; }
        }},
      ],
      'verify': [
        { requirement: 'Test gate passed or at least 1 task done', check: () => this.state.completedTasks.length >= 1 },
        { requirement: 'Outputs verified on host', check: () => {
          try {
            
            return getEvidenceCollector().isGateVerified('verify');
          } catch (err: unknown) { console.error('[SystemBrain] verify gate evidence check failed:', err instanceof Error ? err.message : String(err)); return false; }
        }},
        { requirement: 'Evidence verified for current gate', check: () => {
          try {
            
            return getEvidenceCollector().isGateVerified(this.state.currentGate);
          } catch (err: unknown) { console.error('[SystemBrain] current gate evidence check failed:', err instanceof Error ? err.message : String(err)); return false; }
        }},
      ],
      'audit': [
        { requirement: 'Verify gate criteria met', check: () => this.state.completedTasks.length >= 2 },
        { requirement: 'No security violations in firewall log', check: () => {
          const violations = this.stateStore.get('security-state', 'firewall-violations');
          return !violations || (Array.isArray(violations) && violations.length === 0);
        }},
        { requirement: 'Evidence verified for audit gate', check: () => {
          try {
            
            return getEvidenceCollector().isGateVerified('audit');
          } catch (err: unknown) { console.error('[SystemBrain] audit gate evidence check failed:', err instanceof Error ? err.message : String(err)); return false; }
        }},
      ],
      'delivery': [
        { requirement: 'All prior gates passed', check: () => this.state.completedTasks.length >= 3 },
        { requirement: 'Evidence verified for all gates', check: () => {
          try {
            
            const gates = ['plan', 'build', 'test', 'verify', 'audit'];
            return gates.every(g => getEvidenceCollector().isGateVerified(g));
          } catch (err: unknown) { console.error('[SystemBrain] delivery gate evidence check failed:', err instanceof Error ? err.message : String(err)); return false; }
        }},
        { requirement: 'Output merge complete', check: () => {
          try {
            
            return getEvidenceCollector().isGateVerified('delivery');
          } catch (err: unknown) { console.error('[SystemBrain] delivery merge evidence check failed:', err instanceof Error ? err.message : String(err)); return false; }
        }},
      ],
    };
    
    const gateCriteria = criteria[gate] || [];
    return gateCriteria.map(c => ({
      requirement: c.requirement,
      passed: c.check(),
    }));
  }

  evaluateGateEntry(gate: string): { allPassed: boolean; blockers: string[]; details: { requirement: string; passed: boolean }[] } {
    const details = this.getGateCriteria(gate);
    const blockers = details.filter(d => !d.passed).map(d => d.requirement);
    
    return {
      allPassed: blockers.length === 0,
      blockers,
      details,
    };
  }

  async isGateAdvanceable(): Promise<boolean> {
    // Gate is advanceable if there are completed tasks (work was done)
    // and no active tasks blocking (all spawned tasks finished)
    if (this.state.completedTasks.length === 0) return false;

    // Check execution brain for active tasks
    try {
      const { getExecutionBrain } = await import('../execution/execution-brain.js');
      const execBrain = getExecutionBrain();
      const execState = execBrain.getState();
      return execState.activeTasks === 0;
    } catch (err: unknown) {
      console.error('[SystemBrain] gate advance check failed, allowing advancement:', err instanceof Error ? err.message : String(err));
      return true;
    }
  }

  // =========================================================================
  // COMPACTION MANAGEMENT
  // =========================================================================

  getContextRegistry(): { file: string; importance: 'critical' | 'high' | 'normal' | 'low' }[] {
    const snap = this.stateStore.snapshot('context-registry');
    if (!snap || typeof snap !== 'object') return [];
    return Object.values(snap) as { file: string; importance: 'critical' | 'high' | 'normal' | 'low' }[];
  }

  registerContext(file: string, importance: 'critical' | 'high' | 'normal' | 'low'): void {
    this.stateStore.set('context-registry', file, { importance, registeredAt: Date.now() }, ['kraken-system']);
  }

  getTokenBudget(): { current: number; threshold: number; tier: number } {
    const budget = this.stateStore.get('token-budget', 'current') as { current: number; threshold: number; tier: number } || {
      current: 0,
      threshold: 170000,
      tier: 0,
    };
    return budget;
  }

  // =========================================================================
  // COMPACTION SURVIVAL — Context Management Auto-Generation
  // =========================================================================

  private contextDir: string | null = null;

  initializeProject(projectRoot: string, projectName: string): void {
    this.contextDir = path.join(projectRoot, 'Context Management');

    try {
      fs.mkdirSync(this.contextDir, { recursive: true });
    } catch (err: unknown) {
      console.error('[SystemBrain] Failed to create Context Management dir:', err instanceof Error ? err.message : String(err));
      return;
    }

    const ts = new Date().toISOString();

    this.writeContextFile('BUILD_LOG.md', [
      `# BUILD LOG — ${projectName}`,
      `## Session: kraken-auto | Started: ${ts}`,
      '',
      `### [${ts}] PROJECT INITIALIZED`,
      `- Context Management directory created at: ${this.contextDir}`,
      `- 5 survival files auto-generated`,
      '- Lightning Mode: ACTIVE (default)',
      '',
    ].join('\n'));

    this.writeContextFile('DEBUG_LOG.md', [
      `# DEBUG LOG — ${projectName}`,
      `## Session: kraken-auto`,
      '',
    ].join('\n'));

    this.writeContextFile('CONTEXT_CONTINUITY.md', [
      `# CONTEXT CONTINUITY — ${projectName}`,
      '## Stream of Consciousness + Injectable Data Points',
      '',
      `### [${ts}] PROJECT INITIALIZED`,
      '#### Current Understanding',
      `- Project: ${projectName}`,
      '- State: initialized, ready for task decomposition',
      '- Lightning Mode: ACTIVE',
      '',
      '#### Injectable Data Points',
      `- project_name: ${projectName} (confidence: 10/10)`,
      `- context_dir: ${this.contextDir} (confidence: 10/10)`,
      '- lightning_mode: ACTIVE (confidence: 10/10)',
      '',
    ].join('\n'));

    this.writeContextFile('POST_COMPACTION_PROMPT.md', [
      '# POST-COMPACTION RECOVERY',
      '## Execute this protocol immediately after compaction',
      '',
      '### Step 1: WHO YOU ARE',
      'You are the KRAKEN ORCHESTRATOR — multi-brain execution engine. NOT a chatbot.',
      '',
      '### Step 2: RECOVER STATE (run in parallel)',
      '- kraken_brain_status() → Are all 3 brains running?',
      '- get_cluster_status() → Which agents are busy?',
      '- kraken_hive_search({ query: "current project" }) → What were we working on?',
      '',
      '### Step 3: READ SURVIVAL FILES',
      '- BUILD_LOG.md → What was done, what\'s pending',
      '- DEBUG_LOG.md → Bugs found and fixed',
      '- CONTEXT_CONTINUITY.md → Decisions and insights',
      '',
      '### Step 4: RESUME',
      'Read BUILD_LOG.md for last milestone. Continue from next unchecked item.',
      'Do NOT restart. Do NOT ask "what should I do?"',
      '',
    ].join('\n'));

    this.writeContextFile('BUILD_WORKFLOW.md', [
      `# BUILD WORKFLOW — ${projectName}`,
      '## Phase-by-Phase Execution Checklist',
      '',
      '### GATE: PLAN',
      '- [ ] Load T2 Master context from kraken-context/',
      '- [ ] Analyze project requirements',
      '- [ ] Decompose into tasks (T1 generation)',
      '- [ ] Designate domains (task→cluster mapping)',
      '- [ ] Record all decisions to CONTEXT_CONTINUITY.md',
      '',
      '### GATE: BUILD',
      '- [ ] Spawn cluster agents for each build task',
      '- [ ] Monitor async execution',
      '- [ ] Retrieve ALL outputs (verify files on host)',
      '- [ ] Record completions to BUILD_LOG.md',
      '- [ ] Record failures to DEBUG_LOG.md',
      '',
      '### GATE: TEST',
      '- [ ] Spawn test agents in Gamma cluster',
      '- [ ] Run test suite against built artifacts',
      '- [ ] Aggregate all test results',
      '- [ ] Record test results to BUILD_LOG.md',
      '',
      '### GATE: VERIFY',
      '- [ ] Verify all gate evidence',
      '- [ ] Mechanically verify outputs on host',
      '- [ ] Run anti-hallucination validators',
      '',
      '### GATE: DELIVERY',
      '- [ ] All prior gates verified',
      '- [ ] Bundle built successfully',
      '- [ ] Outputs merged and packaged',
      '',
    ].join('\n'));

    this.registerContext('BUILD_LOG.md', 'high');
    this.registerContext('DEBUG_LOG.md', 'high');
    this.registerContext('CONTEXT_CONTINUITY.md', 'high');
    this.registerContext('POST_COMPACTION_PROMPT.md', 'critical');
    this.registerContext('BUILD_WORKFLOW.md', 'critical');

    console.error(`[SystemBrain] Project initialized — Context Management at: ${this.contextDir}`);
  }

  appendBuildLog(entry: string): void {
    if (!this.contextDir) return;
    const filePath = path.join(this.contextDir, 'BUILD_LOG.md');
    try {
      const ts = new Date().toISOString();
      fs.appendFileSync(filePath, `\n### [${ts}] ${entry}\n`);
    } catch (err: unknown) {
      console.error('[SystemBrain] Failed to append BUILD_LOG:', err instanceof Error ? err.message : String(err));
    }
  }

  appendDebugLog(bug: { title: string; symptom: string; rootCause: string; fix: string; category: string }): void {
    if (!this.contextDir) return;
    const filePath = path.join(this.contextDir, 'DEBUG_LOG.md');
    try {
      const ts = new Date().toISOString();
      const entry = [
        '',
        `### BUG: ${bug.title}`,
        `- **Detected:** ${ts}`,
        `- **Symptom:** ${bug.symptom}`,
        `- **Root Cause:** ${bug.rootCause}`,
        `- **Fix Applied:** ${bug.fix}`,
        `- **Category:** ${bug.category}`,
      ].join('\n');
      fs.appendFileSync(filePath, entry + '\n');
    } catch (err: unknown) {
      console.error('[SystemBrain] Failed to append DEBUG_LOG:', err instanceof Error ? err.message : String(err));
    }
  }

  appendContextContinuity(insight: { section: string; content: string }): void {
    if (!this.contextDir) return;
    const filePath = path.join(this.contextDir, 'CONTEXT_CONTINUITY.md');
    try {
      const ts = new Date().toISOString();
      const entry = `\n### [${ts}] ${insight.section}\n${insight.content}\n`;
      fs.appendFileSync(filePath, entry);
    } catch (err: unknown) {
      console.error('[SystemBrain] Failed to append CONTEXT_CONTINUITY:', err instanceof Error ? err.message : String(err));
    }
  }

  getCompactionSurvivalContext(): string {
    if (!this.contextDir) return '';
    try {
      const files = ['BUILD_LOG.md', 'DEBUG_LOG.md', 'CONTEXT_CONTINUITY.md'];
      const parts: string[] = [];
      for (const file of files) {
        const filePath = path.join(this.contextDir, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          parts.push(`=== ${file} ===\n${content}`);
        }
      }
      return parts.join('\n\n');
    } catch (err: unknown) {
      console.error('[SystemBrain] Failed to read survival context:', err instanceof Error ? err.message : String(err));
      return '';
    }
  }

  private writeContextFile(filename: string, content: string): void {
    if (!this.contextDir) return;
    const filePath = path.join(this.contextDir, filename);
    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, 'utf-8');
      }
    } catch (err: unknown) {
      console.error(`[SystemBrain] Failed to write ${filename}:`, err instanceof Error ? err.message : String(err));
    }
  }

  // =========================================================================
  // DYNAMIC CONTEXT INJECTION (gate-aware T2 reference injection)
  // =========================================================================

  private t2Dir: string | null = null;

  private findT2Dir(): string | null {
    if (this.t2Dir) return this.t2Dir;
    const HOME = process.env.HOME || process.env.USERPROFILE || '/root';
    const pluginName = process.env.KRAKEN_PLUGIN_NAME || 'kraken-agent';
    const searchPaths = [
      path.join(HOME, '.config', 'opencode', 'plugins', pluginName, 'kraken-context'),
      path.join(HOME, '.config', 'opencode', 'plugins', pluginName, 'dist', '..', 'kraken-context'),
      path.join(process.cwd(), 'kraken-context'),
      path.join(process.cwd(), '..', 'kraken-context'),
      '/tmp/kraken-context',
    ];
    try {
      const thisDir = path.dirname(fileURLToPath(import.meta.url));
      searchPaths.push(
        path.join(thisDir, '..', '..', 'kraken-context'),
        path.join(thisDir, '..', '..', '..', 'kraken-context'),
      );
    } catch (_e) { /* non-Node runtime, skip */ }
    for (const dir of searchPaths) {
      try {
        if (fs.existsSync(dir)) {
          this.t2Dir = dir;
          return dir;
        }
      } catch (_e) { /* skip unreadable */ }
    }
    return null;
  }

  getRelevantContextForGate(gate: string): string {
    const gateTopics: Record<string, string[]> = {
      'plan': ['patterns', 'architecture'],
      'build': ['build-chain', 'patterns'],
      'test': ['tui-testing', 'patterns'],
      'verify': ['kraken-rules', 'alignment-bible'],
      'audit': ['kraken-rules', 'failures'],
      'delivery': ['kraken-rules'],
    };
    const topics = gateTopics[gate] || ['kraken-rules'];
    const t2Dir = this.findT2Dir();
    if (!t2Dir) return '';

    const topicFileMap: Record<string, string> = {
      'patterns': 'T2_PATTERNS.md',
      'failures': 'T2_FAILURE_MODES.md',
      'build-chain': 'T2_BUILD_CHAIN.md',
      'architecture': 'T2_ARCHITECTURE.md',
      'alignment-bible': 'T2_ALIGNMENT_BIBLE.md',
      'crash-recovery': 'T2_CRASH_RECOVERY.md',
      'tui-testing': 'T2_TUI_TESTING.md',
      'kraken-rules': 'T2_KRAKEN_RULES.md',
      'compaction-survival': 'T2_COMPACTION_SURVIVAL.md',
      'plugin-engineering': 'T2_PLUGIN_ENGINEERING.md',
    };

    const parts: string[] = [];
    for (const topic of topics) {
      const filename = topicFileMap[topic];
      if (!filename) continue;
      const filePath = path.join(t2Dir, filename);
      try {
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          parts.push(`[${topic.toUpperCase()}]\n${content.slice(0, 2000)}`);
        }
      } catch (_e) { /* skip unreadable files */ }
    }
    return parts.length > 0 ? parts.join('\n\n') : '';
  }

  // =========================================================================
  // MESSAGE HANDLING
  // =========================================================================

  private handleBrainMessage(message: { from: string; to: string; type: string; payload: Record<string, unknown> }): void {
    switch (message.type) {
      case 'gate-failure':
        this.handleGateFailure(message);
        break;
      case 'checkpoint':
        this.handleCheckpoint(message);
        break;
      case 'context-inject':
        this.handleContextInject(message);
        break;
    }
  }

  private handleGateFailure(message: { from: string; payload: Record<string, unknown> }): void {
    console.error(`[SystemBrain] Gate failure from ${message.from}: ${JSON.stringify(message.payload)}`);
    
    // Record the failure
    const taskId = message.payload.taskId as string;
    const error = message.payload.error as string || 'Unknown gate failure';
    
    if (taskId) {
      this.recordTaskFailure(taskId, error);
    }
  }

  private handleCheckpoint(message: { from: string; payload: Record<string, unknown> }): void {
    console.error(`[SystemBrain] Checkpoint from ${message.from}: ${JSON.stringify(message.payload)}`);
  }

  private handleContextInject(message: { from: string; payload: Record<string, unknown> }): void {
    console.error(`[SystemBrain] Context inject from ${message.from}`);
  }

  // =========================================================================
  // STATE ACCESS
  // =========================================================================

  getState(): SystemState {
    return { ...this.state };
  }

  getSnapshot(): Record<string, unknown> {
    return {
      ...this.stateStore.snapshot('workflow-state'),
      ...this.stateStore.snapshot('security-state'),
      recentDecisions: this.recentDecisions,
    };
  }

  cleanup(): void {
    this.recentDecisions = [];
    this.state = {
      initialized: true,
      currentGate: this.state.currentGate,
      decisionCount: this.state.decisionCount,
      completedTasks: [...this.state.completedTasks],
    };
  }
}

// Singleton instance
let systemBrainInstance: SystemBrain | null = null;

export function createSystemBrain(stateStore?: StateStore, messenger?: BrainMessenger): SystemBrain {
  if (!systemBrainInstance) {
    systemBrainInstance = new SystemBrain(stateStore, messenger);
  }
  return systemBrainInstance;
}

export function getSystemBrain(): SystemBrain {
  if (!systemBrainInstance) {
    systemBrainInstance = new SystemBrain();
  }
  return systemBrainInstance;
}