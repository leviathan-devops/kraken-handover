/**
 * L0: Kraken Identity Wall
 * Blocks non-Kraken agents from writing to Kraken-protected paths.
 * Allows all read operations.
 */

export const KRAKEN_PROTECTED_PATHS = [
  '/root/.config/opencode/plugins/kraken-agent/',
  '.config/opencode/plugins/kraken-agent/',
  '/root/.shark/evidence/',
  '.local/share/opencode/kraken-hive/',
];

export const KRAKEN_AGENTS = new Set([
  'kraken', 'kraken-executor',
  'shark-alpha-1', 'shark-alpha-2', 'manta-alpha-1',
  'shark-beta-1', 'manta-beta-1', 'manta-beta-2',
  'manta-gamma-1', 'manta-gamma-2', 'shark-gamma-1',
]);

const DANGEROUS_TOOLS = new Set([
  'bash', 'write', 'edit', 'Write', 'Edit',
]);

export interface L0CheckResult {
  allowed: boolean;
  reason?: string;
  layer: 'L0';
}

export function checkKrakenIdentityWall(
  agentName: string | undefined,
  toolName: string,
  args: Record<string, unknown>
): L0CheckResult {
  // Always allow Kraken agents
  if (agentName && KRAKEN_AGENTS.has(agentName)) {
    return { allowed: true, layer: 'L0' };
  }

  // Non-Kraken agents: block write operations to protected paths
  if (DANGEROUS_TOOLS.has(toolName)) {
    const filePath = (args.filePath || args.path || args.target || '') as string;
    const content = (args.content || args.command || '') as string;

    for (const protectedPath of KRAKEN_PROTECTED_PATHS) {
      if (filePath.includes(protectedPath) || content.includes(protectedPath)) {
        return {
          allowed: false,
          layer: 'L0',
          reason: `[L0_IDENTITY_WALL] Non-Kraken agent '${agentName}' blocked from ${toolName} to protected path: ${protectedPath}`,
        };
      }
    }
  }

  return { allowed: true, layer: 'L0' };
}
