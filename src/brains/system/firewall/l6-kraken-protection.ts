/**
 * L6: Kraken Zone Protection
 * SYSTEM zone: read-only, never modified
 * STATE zone: managed by Hive only
 * COMPACTION zone: auto-managed, never manual
 */

export const KRAKEN_ZONES = {
  SYSTEM: {
    paths: [
      '/root/.config/opencode/',
      '.config/opencode/',
    ],
    access: 'read-only' as const,
    description: 'Kraken configuration zone',
  },
  STATE: {
    paths: [
      '/root/.local/share/opencode/kraken-hive/',
      '.local/share/opencode/kraken-hive/',
    ],
    access: 'hive-only' as const,
    description: 'Kraken state managed by Hive',
  },
  COMPACTION: {
    paths: [
      '/tmp/kraken-compaction/',
    ],
    access: 'auto-managed' as const,
    description: 'Compaction survival data',
  },
};

const PROTECTION_PATTERNS = [
  { pattern: /rm\s+-rf.*kraken/i, reason: 'attempted-kraken-deletion' },
  { pattern: /delete.*kraken.*config/i, reason: 'config-deletion-attempt' },
  { pattern: /overwrite.*kraken.*state/i, reason: 'state-overwrite-attempt' },
];

const REDIRECT_PATH_RE = /(?:>>|>|<)\s*['"]?(\/[^\s'";|&]+)['"]?/g;
const CP_MV_PATH_RE = /(?:cp|mv|install|mkdir|tee|dd)\s+(?:.+?\s+)?['"]?(\/[^\s'";&]+)['"]?/g;
const SED_INPLACE_RE = /sed\s+.*-i.*\s+['"]?(\/[^\s'";&]+)['"]?/g;

export function extractPathsFromCommand(command: string): string[] {
  const paths: string[] = [];
  let m: RegExpExecArray | null;

  REDIRECT_PATH_RE.lastIndex = 0;
  while ((m = REDIRECT_PATH_RE.exec(command)) !== null) {
    paths.push(m[1]);
  }

  CP_MV_PATH_RE.lastIndex = 0;
  while ((m = CP_MV_PATH_RE.exec(command)) !== null) {
    paths.push(m[1]);
  }

  SED_INPLACE_RE.lastIndex = 0;
  while ((m = SED_INPLACE_RE.exec(command)) !== null) {
    paths.push(m[1]);
  }

  return paths;
}

export interface L6CheckResult {
  allowed: boolean;
  reason?: string;
  layer: 'L6';
  zone?: string;
}

export function checkKrakenProtection(
  filePath: string,
  operation: 'read' | 'write' | 'delete'
): L6CheckResult {
  for (const [zoneName, zone] of Object.entries(KRAKEN_ZONES)) {
    for (const zonePath of zone.paths) {
      if (filePath.includes(zonePath)) {
        if (zone.access === 'read-only' && operation !== 'read') {
          return {
            allowed: false,
            layer: 'L6',
            reason: `[L6_KRAKEN_PROTECTION] ${zoneName} zone is read-only — cannot ${operation}: ${filePath}`,
            zone: zoneName,
          };
        }
        if (zone.access === 'hive-only' && operation !== 'read') {
          return {
            allowed: false,
            layer: 'L6',
            reason: `[L6_KRAKEN_PROTECTION] ${zoneName} zone is Hive-managed — cannot ${operation}: ${filePath}`,
            zone: zoneName,
          };
        }
      }
    }
  }

  return { allowed: true, layer: 'L6' };
}

export function checkProtectionPatterns(command: string): L6CheckResult {
  for (const { pattern, reason } of PROTECTION_PATTERNS) {
    if (pattern.test(command)) {
      return {
        allowed: false,
        layer: 'L6',
        reason: `[L6_KRAKEN_PROTECTION] ${reason}`,
      };
    }
  }

  return { allowed: true, layer: 'L6' };
}
