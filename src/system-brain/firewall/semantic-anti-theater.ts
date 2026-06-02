export type TheaterType =
  | 'spawned-is-done'
  | 'queued-is-complete'
  | 'assigned-is-done'
  | 'complete-without-output'
  | 'temporal-impossibility'
  | 'causal-chain-break'

export interface TheaterEvidence {
  expectedHostFiles: string[]
  actualHostFiles: string[]
  timeElapsed: number
  outputStatus: 'none' | 'claimed' | 'verified'
}

export interface TheaterAnalysisResult {
  theaterDetected: boolean
  theaterType: TheaterType
  confidence: number
  evidence: TheaterEvidence
  correction: string
}

const COMPLETION_CLAIM_PATTERNS: RegExp[] = [
  /\b(task|build|implementation|feature|module)\s+(is\s+)?(complete|done|finished|built|implemented|ready|shipped)\b/i,
  /\bsuccessfully\s+(built|created|implemented|deployed|completed|wrote)\b/i,
  /\b(all|both|each)\s+\d+\s+(files?|tests?|modules?)\s+(have been|are)\s+(created|written|implemented|updated)\b/i,
  /\bI('ve| have)\s+(built|created|implemented|written|completed|finished)\b/i,
]

const FILE_PATH_PATTERN = /(?:^|[\s"'(\[])([\w./\-]+\.(?:ts|js|json|md|tsx|jsx|py|rs|go|yaml|yml|toml|sql|sh|css|html))(?=[\s"'")\],;]|$)/gm

function extractClaimedPaths(messageText: string): string[] {
  const paths: string[] = []
  let match: RegExpExecArray | null
  const re = new RegExp(FILE_PATH_PATTERN.source, FILE_PATH_PATTERN.flags)
  while ((match = re.exec(messageText)) !== null) {
    if (match[1] && match[1].length > 3) {
      paths.push(match[1])
    }
  }
  return [...new Set(paths)]
}

function hasCompletionClaim(messageText: string): boolean {
  return COMPLETION_CLAIM_PATTERNS.some(p => p.test(messageText))
}

function makeNegativeResult(): TheaterAnalysisResult {
  return {
    theaterDetected: false,
    theaterType: 'complete-without-output',
    confidence: 0,
    evidence: { expectedHostFiles: [], actualHostFiles: [], timeElapsed: 0, outputStatus: 'none' },
    correction: '',
  }
}

export class SemanticAntiTheater {
  analyzeStake(
    messageText: string,
    expectedOutputs: string[],
    fileChecker: (path: string) => boolean
  ): TheaterAnalysisResult {
    if (!hasCompletionClaim(messageText)) return makeNegativeResult()

    const claimedPaths = extractClaimedPaths(messageText)
    const allExpected = [...new Set([...expectedOutputs, ...claimedPaths])]

    if (allExpected.length === 0) return makeNegativeResult()

    const existing: string[] = []
    const missing: string[] = []
    for (const p of allExpected) {
      if (fileChecker(p)) {
        existing.push(p)
      } else {
        missing.push(p)
      }
    }

    const allMissing = existing.length === 0 && missing.length > 0
    const someMissing = missing.length > 0 && existing.length > 0

    if (allMissing) {
      return {
        theaterDetected: true,
        theaterType: 'complete-without-output',
        confidence: 0.9,
        evidence: { expectedHostFiles: allExpected, actualHostFiles: existing, timeElapsed: 0, outputStatus: 'claimed' },
        correction: `Claimed completion but NONE of ${missing.length} expected files exist on host: ${missing.slice(0, 5).join(', ')}`,
      }
    }

    if (someMissing) {
      const ratio = missing.length / allExpected.length
      return {
        theaterDetected: true,
        theaterType: 'complete-without-output',
        confidence: Math.min(0.85, 0.4 + ratio * 0.5),
        evidence: { expectedHostFiles: allExpected, actualHostFiles: existing, timeElapsed: 0, outputStatus: 'claimed' },
        correction: `Claimed completion but ${missing.length}/${allExpected.length} files missing: ${missing.slice(0, 5).join(', ')}`,
      }
    }

    return makeNegativeResult()
  }

  verifyOutputs(
    messageText: string,
    fileChecker: (path: string) => boolean
  ): TheaterAnalysisResult {
    const claimedPaths = extractClaimedPaths(messageText)
    if (claimedPaths.length === 0) return makeNegativeResult()

    const existing: string[] = []
    const missing: string[] = []
    for (const p of claimedPaths) {
      if (fileChecker(p)) {
        existing.push(p)
      } else {
        missing.push(p)
      }
    }

    if (missing.length === 0) return makeNegativeResult()

    const ratio = missing.length / claimedPaths.length
    return {
      theaterDetected: true,
      theaterType: 'complete-without-output',
      confidence: Math.min(0.95, 0.5 + ratio * 0.45),
      evidence: { expectedHostFiles: claimedPaths, actualHostFiles: existing, timeElapsed: 0, outputStatus: 'claimed' },
      correction: `Agent referenced ${missing.length} file(s) that don't exist: ${missing.slice(0, 5).join(', ')}`,
    }
  }

  checkTemporalConsistency(
    taskStartTime: number,
    taskEndTime: number,
    claimedLinesOfCode: number,
    toolCallsCount: number
  ): TheaterAnalysisResult {
    const elapsed = taskEndTime - taskStartTime
    if (elapsed <= 0) return makeNegativeResult()

    if (claimedLinesOfCode > 100 && elapsed < 1000) {
      return {
        theaterDetected: true,
        theaterType: 'temporal-impossibility',
        confidence: 0.9,
        evidence: { expectedHostFiles: [], actualHostFiles: [], timeElapsed: elapsed, outputStatus: 'claimed' },
        correction: `Claimed ${claimedLinesOfCode} lines in ${elapsed}ms — physically impossible writing speed`,
      }
    }

    if (claimedLinesOfCode > 50 && elapsed < 3000) {
      return {
        theaterDetected: true,
        theaterType: 'temporal-impossibility',
        confidence: 0.7,
        evidence: { expectedHostFiles: [], actualHostFiles: [], timeElapsed: elapsed, outputStatus: 'claimed' },
        correction: `Claimed ${claimedLinesOfCode} lines in ${elapsed}ms — suspicious speed`,
      }
    }

    if (claimedLinesOfCode > 0 && toolCallsCount === 0) {
      return {
        theaterDetected: true,
        theaterType: 'temporal-impossibility',
        confidence: 0.6,
        evidence: { expectedHostFiles: [], actualHostFiles: [], timeElapsed: elapsed, outputStatus: 'claimed' },
        correction: `Claimed ${claimedLinesOfCode} lines with 0 tool calls — no write operations performed`,
      }
    }

    return makeNegativeResult()
  }

  validateCausalChain(
    actionHistory: Array<{ action: string; result: 'allowed' | 'blocked' }>,
    currentClaim: string
  ): TheaterAnalysisResult {
    if (actionHistory.length === 0) return makeNegativeResult()

    const lastBlocked = actionHistory.filter(a => a.result === 'blocked')
    if (lastBlocked.length === 0) return makeNegativeResult()

    const recentBlocked = lastBlocked.slice(-3)
    const blockedActions = recentBlocked.map(a => a.action.toLowerCase())

    const claimLower = currentClaim.toLowerCase()
    const successWords = ['built', 'created', 'wrote', 'implemented', 'completed', 'finished', 'success']
    const claimSuccess = successWords.some(w => claimLower.includes(w))

    if (!claimSuccess) return makeNegativeResult()

    for (const blocked of recentBlocked) {
      const blockedAction = blocked.action.toLowerCase()
      const overlap = claimLower.split(/\s+/).some(
        word => word.length > 3 && blockedAction.includes(word)
      )
      if (overlap) {
        return {
          theaterDetected: true,
          theaterType: 'causal-chain-break',
          confidence: 0.85,
          evidence: { expectedHostFiles: [], actualHostFiles: [], timeElapsed: 0, outputStatus: 'claimed' },
          correction: `Claimed "${currentClaim.slice(0, 80)}" but previous action "${blocked.action}" was BLOCKED — causal chain broken`,
        }
      }
    }

    if (recentBlocked.length >= 3 && claimSuccess) {
      return {
        theaterDetected: true,
        theaterType: 'causal-chain-break',
        confidence: 0.6,
        evidence: { expectedHostFiles: [], actualHostFiles: [], timeElapsed: 0, outputStatus: 'claimed' },
        correction: `Claimed success but ${recentBlocked.length} recent actions were blocked`,
      }
    }

    return makeNegativeResult()
  }

  analyze(context: {
    messageText: string
    expectedOutputs: string[]
    fileChecker: (path: string) => boolean
    taskStartTime: number
    taskEndTime: number
    toolCallsCount: number
    actionHistory: Array<{ action: string; result: 'allowed' | 'blocked' }>
    currentClaim: string
  }): TheaterAnalysisResult {
    const results: TheaterAnalysisResult[] = []

    try {
      results.push(this.analyzeStake(context.messageText, context.expectedOutputs, context.fileChecker))
    } catch (e) {
      console.error('[SemanticAntiTheater] analyzeStake error:', e)
    }

    try {
      results.push(this.verifyOutputs(context.messageText, context.fileChecker))
    } catch (e) {
      console.error('[SemanticAntiTheater] verifyOutputs error:', e)
    }

    try {
      const locEstimate = context.messageText.split('\n').length * 5
      results.push(this.checkTemporalConsistency(context.taskStartTime, context.taskEndTime, locEstimate, context.toolCallsCount))
    } catch (e) {
      console.error('[SemanticAntiTheater] checkTemporalConsistency error:', e)
    }

    try {
      results.push(this.validateCausalChain(context.actionHistory, context.currentClaim))
    } catch (e) {
      console.error('[SemanticAntiTheater] validateCausalChain error:', e)
    }

    const detected = results.filter(r => r.theaterDetected)
    if (detected.length === 0) return makeNegativeResult()

    detected.sort((a, b) => b.confidence - a.confidence)
    let best = detected[0]

    if (detected.length > 1) {
      best = { ...best, confidence: Math.min(1.0, best.confidence + 0.05 * (detected.length - 1)) }
    }

    return best
  }
}
