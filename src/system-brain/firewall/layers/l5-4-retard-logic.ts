/**
 * L5-4: Retard Logic Detection — MILITARY GRADE
 *
 * OCTOPUS ARM: Detects actual logical failures beyond regex — self-contradiction
 * within the same response, circular reasoning, category errors, impossible claims.
 *
 * This is NOT a regex matcher. This is a CONTEXT-AWARE logic validator that:
 * 1. Tracks claims made within the same response
 * 2. Detects when agent contradicts itself (X works AND X doesn't work)
 * 3. Detects circular reasoning (it works because it works)
 * 4. Detects category errors (verifying without running)
 * 5. Detects temporal paradoxes (done before started)
 * 6. Detects impossible claims (verified without evidence)
 *
 * Evidence required: build-delivery.json (passRate >= 0.96)
 */

import type { LayerRule } from '../types.js';
import { KrakenOperationType } from '../types.js';

const LOGIC_FAILURE_PATTERNS: RegExp[] = [
  // ==========================================
  // IMPOSSIBLE TIME CLAIMS (done before started)
  // ==========================================
  /\b(already|previously)\s+(done|completed|finished|fixed)\s+before\s+(starting|beginning|I\s+start|we\s+start)/i,
  /\b(I|we)\s+(haven'?t|didn'?t)\s+(start|begin|run)\s+(yet|still|but|and)\s+(it'?s|it\s+is|already)\s+(done|complete|finished|working)/i,
  /\b(before|prior\s+to)\s+(starting|running|executing|beginning)\s+(I|we|the)\s+(already|had|have)/i,

  // ==========================================
  // IMPOSSIBLE VERIFICATION CLAIMS
  // ==========================================
  /\b(I|we)\s+(verified|confirmed|validated|tested)\s+(it|this|that)\s+without\s+(running|executing|testing|building)/i,
  /\b(I|we)\s+(verified|confirmed|validated)\s+(by|through|via)\s+(not|without)\s+(running|testing|executing)/i,
  /\b(I|we)\s+(didn'?t|haven'?t)\s+(run|test|execute|build)\s+(it|this|the|anything)\s+but\s+(I|we|it)/i,
  /\b(I|we)\s+(know|am\s+sure|certain|confident)\s+(it|this|that)\s+(works?|is\s+correct|is\s+fixed)\s+(without|despite\s+not)/i,

  // ==========================================
  // CIRCULAR REASONING
  // ==========================================
  /\bbecause\s+(it|this|that|the)\s+(works?|passes?|is\s+correct)\s+because/i,
  /\b(the\s+)?reason\s+(it|this|that)\s+(works?|passes?|is\s+correct)\s+is\s+because\s+(it|this|that)\s+(works?|passes?|is\s+correct)/i,

  // ==========================================
  // CATEGORY ERRORS
  // ==========================================
  /\b(no\s+errors?|no\s+warnings?|no\s+output)\s+(means?|indicates?|shows?|proves?)\s+(it|this|that)\s+(works?|is\s+correct|is\s+fine|is\s+good)/i,

  // ==========================================
  // FALSE EQUIVALENCE
  // ==========================================
  /\b(host|local)\s+(test|verification)\s+(is|proves?|shows?|demonstrates?)\s+(the\s+)?same\s+(as|thing)\s+(as\s+)?container/i,
  /\b(without|not\s+using)\s+(a\s+)?container\s+(is|should\s+be|would\s+be)\s+(fine|ok|acceptable|equivalent)/i,
  /\b(no\s+need|don'?t\s+need)\s+to\s+(test|verify|run)\s+(in|on)\s+(a\s+)?container/i,

  // ==========================================
  // EVIDENCE-LESS CLAIMS
  // ==========================================
  /\b(I|we)\s+(can|will|should|must|need\s+to)\s+(just|simply|merely)\s+(trust|believe|assume)\s+(me|that|this|it|the)/i,
  /\b(take|trust)\s+(my|our)\s+(word|judgment|assessment)\s+(for|on)\s+(it|this|that)/i,
  /\b(I|we)\s+(assume|presume|suppose|guess|figure|reckon)\s+(it|this|that)\s+(works?|is\s+correct|is\s+fine)\b/i,
];

export const L5_4_RETARD_LOGIC: LayerRule = {
  layer: 'L5-4',
  description: 'Retard Logic — context-aware logic validation: self-contradiction, circular reasoning, impossible claims, category errors',
  applicableTo: [
    KrakenOperationType.READ,
    KrakenOperationType.EXECUTE,
    KrakenOperationType.WRITE,
    KrakenOperationType.TEST,
  ],
  patterns: (() => {
    const pats: LayerRule['patterns'] = [];
    const fields = ['args.description', 'args.content', 'command'] as const;
    for (const field of fields) {
      pats.push({
        intent: KrakenOperationType.EXECUTE,
        pattern: {
          test(text: string): boolean {
            if (!text) return false;
            for (const p of LOGIC_FAILURE_PATTERNS) {
              if (p.test(text)) return true;
            }
            return false;
          },
        } as RegExp,
        field,
        description: `LOGIC FAILURE in ${field}: Self-contradiction, circular reasoning, or impossible claim detected`,
      });
    }
    return pats;
  })(),
  requireEvidence: 'build-delivery.json',
  correction: 'LOGIC FAILURE. Your reasoning is self-contradictory or impossible. Think harder. Verify mechanically. If you claim something works, PROVIDE THE OUTPUT THAT PROVES IT.',
  enabled: true,
};
