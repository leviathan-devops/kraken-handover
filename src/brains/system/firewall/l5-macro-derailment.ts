/**
 * L5: Macro Derailment Detection
 * Focus collisions, planner-executor desync, context stale, premature completion.
 */

interface MacroCheck {
  type: 'focus_collision' | 'planner_executor_desync' | 'context_stale' | 'premature_completion' | 'wrong_agent_tab' | 'banned_method' | 'circular_verification';
  patterns: RegExp[];
  reason: string;
}

const MACRO_CHECKS: MacroCheck[] = [
  {
    type: 'focus_collision',
    patterns: [
      /already.*working.*on/i,
      /another.*agent.*handling/i,
      /conflict.*with.*existing/i,
      /duplicate.*task/i,
    ],
    reason: 'focus-collision-detected',
  },
  {
    type: 'planner_executor_desync',
    patterns: [
      /plan.*changed.*after.*start/i,
      /diverged.*from.*plan/i,
      /different.*than.*planned/i,
      /not.*what.*was.*requested/i,
    ],
    reason: 'planner-executor-desync',
  },
  {
    type: 'context_stale',
    patterns: [
      /based.*on.*stale.*context/i,
      /stale.*information.*proceeding/i,
      /outdated.*spec.*continuing/i,
      /using.*outdated.*spec/i,
    ],
    reason: 'context-stale',
  },
  {
    type: 'premature_completion',
    patterns: [
      /early.*return/i,
      /skip.*remaining/i,
      /rest.*later/i,
      /finish.*later/i,
      /partial.*complete/i,
    ],
    reason: 'premature-completion',
  },
  {
    type: 'wrong_agent_tab',
    patterns: [
      /i am (plan|build|explore|general) agent/i,
      /this is.*plan.*mode.*cannot/i,
      /testing kraken.*from.*plan.*tab/i,
    ],
    reason: 'WRONG_AGENT_TAB: Kraken tools must be tested from Kraken agent tab, not Plan/Build/vanilla',
  },
  {
    type: 'banned_method',
    patterns: [
      /use opencode run to test/i,
      /run opencode.*--format.*json.*to.*test/i,
    ],
    reason: 'BANNED_METHOD: opencode run does not fire hooks — use TUI only',
  },
  {
    type: 'circular_verification',
    patterns: [
      /output\.content.*verified/i,
      /self.*verification.*passed/i,
      /circular.*test/i,
      /48\/48.*passed/i,
      /49\/50.*passed/i,
    ],
    reason: 'CIRCULAR_VERIFICATION: Cannot verify your own output field — require external TUI verification',
  },
];

export interface L5CheckResult {
  passed: boolean;
  reason?: string;
  layer: 'L5';
  derailmentType?: string;
}

export function checkMacroDerailment(message: string): L5CheckResult {
  for (const check of MACRO_CHECKS) {
    for (const pattern of check.patterns) {
      if (pattern.test(message)) {
        return {
          passed: false,
          layer: 'L5',
          reason: `[L5_MACRO_DERAILMENT] ${check.reason}: ${check.type}`,
          derailmentType: check.type,
        };
      }
    }
  }

  return { passed: true, layer: 'L5' };
}
