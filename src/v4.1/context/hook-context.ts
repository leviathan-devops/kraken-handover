/**
 * src/v4.1/context/hook-context.ts
 * 
 * HookContext — The safety layer passed to every hook handler.
 * Provides agent awareness, phase awareness, session isolation, and logging.
 */

import type { Logger } from '../utils/logger.js';
import { createLogger } from '../utils/logger.js';
import { createAgentAwareness, type AgentAwareness } from './agent-awareness.js';

export interface SessionState {
  phase?: string;
  activeAgent?: string;
  [key: string]: unknown;
}

export interface HookContext {
  // Identity
  readonly sessionID: string;
  readonly agentName: string | undefined;
  readonly phase: string | undefined;

  // Agent checking
  isMyAgent(agent?: string): boolean;
  isMyOrchestrator(agent?: string): boolean;
  isVanillaAgent(agent?: string): boolean;
  isOtherPluginAgent(agent?: string): boolean;

  // Phase
  getPhase(): string | undefined;

  // Session state (per-session isolation)
  getSessionState(): SessionState;

  // Logging
  log: Logger;
}

// Vanilla agents that should never be affected by plugin hooks
const VANILLA_AGENTS = new Set(['plan', 'build', 'general', 'explore']);

/**
 * Create agent awareness utilities.
 * MUST be configured with plugin-specific constants.
 */
export function createAgentAwarenessContext(
  pluginName: string,
  agentPrefix: string,
  orchestratorName: string,
  managedAgents: Set<string>
): AgentAwareness {
  return {
    isMyAgent(agentName: string | undefined): boolean {
      if (!agentName) return false;
      // Check if it's one of our managed agents
      if (managedAgents.has(agentName)) return true;
      // Check prefix
      if (agentName.startsWith(agentPrefix)) return true;
      // Check orchestrator
      if (agentName === orchestratorName) return true;
      return false;
    },

    isMyOrchestrator(agentName: string | undefined): boolean {
      return agentName === orchestratorName;
    },

    isVanillaAgent(agentName: string | undefined): boolean {
      return VANILLA_AGENTS.has(agentName ?? '');
    },

    isOtherPluginAgent(agentName: string | undefined): boolean {
      if (!agentName) return false;
      // Not vanilla, not mine = other plugin's agent
      return (
        !VANILLA_AGENTS.has(agentName) &&
        !managedAgents.has(agentName) &&
        !agentName.startsWith(agentPrefix) &&
        agentName !== orchestratorName
      );
    },
  };
}

/**
 * Create a HookContext from hook input.
 * Extracts sessionID, agentName, and phase from OpenCode's hook input.
 */
function strOrUndef(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function strOrFallback(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

export function createHookContext(
  input: unknown,
  awareness: AgentAwareness,
  sessionGetter: (id: string) => SessionState,
  logger: Logger
): HookContext {
  const raw = (input ?? {}) as Record<string, unknown>;
  const rawSession = (raw.session ?? {}) as Record<string, unknown>;
  const sessionID = strOrFallback(raw.sessionID ?? rawSession.sessionId, 'unknown');
  const agentName = strOrUndef(raw.agent ?? rawSession.agentName ?? raw.agentName);
  const phase = strOrUndef(raw.phase);

  return {
    sessionID,
    agentName,
    phase,

    isMyAgent: (agent?: string) => awareness.isMyAgent(agent ?? agentName),
    isMyOrchestrator: (agent?: string) => awareness.isMyOrchestrator(agent ?? agentName),
    isVanillaAgent: (agent?: string) => awareness.isVanillaAgent(agent ?? agentName),
    isOtherPluginAgent: (agent?: string) => awareness.isOtherPluginAgent(agent ?? agentName),

    getPhase: () => phase,

    getSessionState: () => sessionGetter(sessionID),

    log: logger,
  };
}
