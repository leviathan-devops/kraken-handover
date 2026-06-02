/**
 * src/brains/system/firewall/layers/index.ts
 *
 * V10 Theatrical Layers (T1-T5)
 * These are separate from the L0-L7 original layers.
 * L0 is a special case handled by the parent firewall index.ts.
 */

import type { LayerRule } from '../types.js';
import { L1_THEATRICAL } from './l1-theatrical.ts';
import { L2_HIVE_POISON } from './l2-hive-poison.ts';
import { L3_DELEGATION_ABUSE } from './l3-delegation-abuse.ts';
import { L4_CONTEXT_THEFT } from './l4-context-theft.ts';
import { L5_1_ASSUMPTIONS } from './l5-1-assumptions.ts';
import { L5_2_SKIP_VERIFICATION } from './l5-2-skip-verification.ts';
import { L5_3_OUTPUT_FABRICATION } from './l5-3-output-fabrication.ts';
import { L5_4_RETARD_LOGIC } from './l5-4-retard-logic.ts';
import { L5_5_SCOPE_CREEP } from './l5-5-scope-creep.ts';

export const V10_LAYERS: LayerRule[] = [
  L1_THEATRICAL,        // T1: Pipe-to-wc theatrical detection
  L2_HIVE_POISON,       // T2: Hive memory corruption
  L3_DELEGATION_ABUSE,  // T3: Unauthorized spawning
  L4_CONTEXT_THEFT,     // T4: Context stealing
  L5_1_ASSUMPTIONS,     // T5-1: "Probably works" claims
  L5_2_SKIP_VERIFICATION, // T5-2: Skip verification claims
  L5_3_OUTPUT_FABRICATION, // T5-3: Fabricated output claims
  L5_4_RETARD_LOGIC,    // T5-4: Basic logic failures
  L5_5_SCOPE_CREEP,    // T5-5: Scope expansion
];

// Re-export all layers for external access
export {
  L1_THEATRICAL,
  L2_HIVE_POISON,
  L3_DELEGATION_ABUSE,
  L4_CONTEXT_THEFT,
  L5_1_ASSUMPTIONS,
  L5_2_SKIP_VERIFICATION,
  L5_3_OUTPUT_FABRICATION,
  L5_4_RETARD_LOGIC,
  L5_5_SCOPE_CREEP,
};