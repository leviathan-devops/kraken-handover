export type BullshitType =
  | 'blame-attribution'
  | 'honesty-contradiction'
  | 'ship-claim-fraud'
  | 'excuse-escalation'
  | 'promise-without-delivery'

export interface BullshitAnalysisResult {
  bullshitDetected: boolean
  bullshitType: BullshitType
  confidence: number
  evidence: {
    trigger: string
    contradiction: string
    logEntry?: string
  }
  correction: string
}

const BLAME_WORDS = [
  'container', 'docker', 'environment', 'model limitation',
  'api timeout', 'network', 'infrastructure', 'host',
  'system limitation', 'config', 'permissions', 'deployment',
]

const CODE_TOOLS = new Set(['write', 'edit', 'patch', 'bash', 'write_file'])

const HONESTY_PREFIXES: RegExp[] = [
  /\blet me be honest\b/i,
  /\bto be (fully |completely )?honest\b/i,
  /\btruth (is|being told)\b/i,
  /\bI('ll| will) be (completely |fully )?candid\b/i,
  /\bfrankly\b/i,
  /\bfull disclosure\b/i,
]

const SHIP_CLAIM_PATTERNS: RegExp[] = [
  /\bship\s*(is\s+)?ready\b/i,
  /\bdeployment\s+ready\b/i,
  /\bproduction\s+ready\b/i,
  /\bready\s+to\s+(ship|deploy|release)\b/i,
  /\ball\s+(systems?\s+)?go\b/i,
  /\bfinal\s+build\b/i,
  /\bcan\s+be\s+(shipped|deployed|released)\b/i,
]

const PROMISE_PATTERNS: RegExp[] = [
  /\bI\s+will\s+(now\s+)?(\w+)/gi,
  /\bI'm\s+going\s+to\s+(\w+)/gi,
  /\blet\s+me\s+(\w+)/gi,
  /\bnext,\s+I('ll| will)\s+(\w+)/gi,
  /\bI('ll| will)\s+(then\s+)?(\w+)/gi,
]

const EXCUSE_SEVERITY: Record<string, number> = {
  'complex': 0.2,
  'complicated': 0.2,
  'difficult': 0.3,
  'challenging': 0.3,
  'problematic': 0.4,
  'impossible': 0.7,
  "can't work": 0.8,
  "won't work": 0.8,
  'fundamentally broken': 0.9,
}

function makeNegativeResult(): BullshitAnalysisResult {
  return {
    bullshitDetected: false,
    bullshitType: 'blame-attribution',
    confidence: 0,
    evidence: { trigger: '', contradiction: '' },
    correction: '',
  }
}

export class SemanticAntiBullshit {
  detectBlameAttribution(context: {
    messageText: string
    lastToolCall: { tool: string; result: 'success' | 'failure' | 'error' } | null
    recentErrors: string[]
  }): BullshitAnalysisResult {
    const { messageText, lastToolCall, recentErrors } = context

    if (!lastToolCall || lastToolCall.result === 'success') return makeNegativeResult()

    const isCodeTool = CODE_TOOLS.has(lastToolCall.tool)
    if (!isCodeTool) return makeNegativeResult()

    const msgLower = messageText.toLowerCase()
    const blamedTargets: string[] = []

    for (const word of BLAME_WORDS) {
      if (msgLower.includes(word.toLowerCase())) {
        blamedTargets.push(word)
      }
    }

    if (blamedTargets.length === 0) return makeNegativeResult()

    const hasCodeError = lastToolCall.result === 'failure' || lastToolCall.result === 'error'
    if (!hasCodeError && recentErrors.length === 0) return makeNegativeResult()

    const confidence = Math.min(0.95, 0.6 + blamedTargets.length * 0.1)

    return {
      bullshitDetected: true,
      bullshitType: 'blame-attribution',
      confidence,
      evidence: {
        trigger: `Code tool "${lastToolCall.tool}" failed (${lastToolCall.result})`,
        contradiction: `Agent blames: ${blamedTargets.join(', ')} instead of acknowledging code failure`,
        logEntry: recentErrors.length > 0 ? recentErrors[0] : undefined,
      },
      correction: `The ${lastToolCall.tool} operation failed due to code issues, not environment. Fix the code, don't blame the container.`,
    }
  }

  detectHonestyContradiction(context: {
    messageText: string
    actionLog: Array<{ action: string; result: string; timestamp: number }>
  }): BullshitAnalysisResult {
    const { messageText, actionLog } = context

    const hasHonestyPrefix = HONESTY_PREFIXES.some(p => p.test(messageText))
    if (!hasHonestyPrefix) return makeNegativeResult()

    if (actionLog.length === 0) {
      return {
        bullshitDetected: true,
        bullshitType: 'honesty-contradiction',
        confidence: 0.4,
        evidence: { trigger: 'Honesty preface detected', contradiction: 'No action log to verify against — preface alone is suspicious' },
        correction: 'Honesty preface detected. These typically precede an excuse or fabrication. Provide evidence instead.',
      }
    }

    const recentActions = actionLog.slice(-5)
    const failedActions = recentActions.filter(a => a.result !== 'success')
    const afterHonesty = messageText.slice(messageText.search(/honest|truth|candid|frankly|disclosure/i) + 10)

    for (const failed of failedActions) {
      const actionWords = failed.action.toLowerCase().split(/\s+/)
      const claimWords = afterHonesty.toLowerCase().split(/\s+/)
      const overlap = actionWords.filter(w => w.length > 3 && claimWords.includes(w))
      if (overlap.length >= 2) {
        return {
          bullshitDetected: true,
          bullshitType: 'honesty-contradiction',
          confidence: 0.85,
          evidence: {
            trigger: 'Honesty preface + contradiction with failed action',
            contradiction: `"${afterHonesty.slice(0, 60)}" contradicts failed action "${failed.action}" (${failed.result})`,
            logEntry: `${failed.action}: ${failed.result}`,
          },
          correction: `Your claim after "honestly" contradicts the recorded failure of "${failed.action}". Address the actual failure.`,
        }
      }
    }

    return {
      bullshitDetected: true,
      bullshitType: 'honesty-contradiction',
      confidence: 0.45,
      evidence: { trigger: 'Honesty preface detected', contradiction: 'Preface used before claim without verifiable evidence' },
      correction: 'Honesty prefaced claim detected. Provide mechanical evidence for your claim instead.',
    }
  }

  validateShipClaim(context: {
    messageText: string
    fileChecker: (path: string) => boolean
    fileReader: (path: string) => string | null
  }): BullshitAnalysisResult {
    const { messageText, fileChecker, fileReader } = context

    const hasShipClaim = SHIP_CLAIM_PATTERNS.some(p => p.test(messageText))
    if (!hasShipClaim) return makeNegativeResult()

    const resultPath = 'ContainerTestResult.json'
    if (!fileChecker(resultPath)) {
      return {
        bullshitDetected: true,
        bullshitType: 'ship-claim-fraud',
        confidence: 0.9,
        evidence: {
          trigger: 'Ship claim detected',
          contradiction: `ContainerTestResult.json does not exist — no test results to validate`,
        },
        correction: 'Ship claim without ContainerTestResult.json is fraudulent. Run tests first, generate results, then claim ready.',
      }
    }

    const content = fileReader(resultPath)
    if (!content) {
      return {
        bullshitDetected: true,
        bullshitType: 'ship-claim-fraud',
        confidence: 0.85,
        evidence: {
          trigger: 'Ship claim detected',
          contradiction: 'ContainerTestResult.json exists but is empty or unreadable',
        },
        correction: 'ContainerTestResult.json is empty. Populate with actual test results.',
      }
    }

    try {
      const result = JSON.parse(content)
      const passRate = result.passRate ?? result.pass_rate ?? 0
      if (passRate < 0.96) {
        return {
          bullshitDetected: true,
          bullshitType: 'ship-claim-fraud',
          confidence: 0.95,
          evidence: {
            trigger: 'Ship claim detected',
            contradiction: `ContainerTestResult.json shows passRate=${passRate} — below 0.96 threshold`,
            logEntry: content.slice(0, 200),
          },
          correction: `Pass rate ${passRate} is below 0.96 threshold. Fix failing tests before claiming ship-ready.`,
        }
      }
    } catch (e) {
      console.error('[SemanticAntiBullshit] Failed to parse ContainerTestResult.json:', e)
      return {
        bullshitDetected: true,
        bullshitType: 'ship-claim-fraud',
        confidence: 0.85,
        evidence: {
          trigger: 'Ship claim detected',
          contradiction: 'ContainerTestResult.json is not valid JSON',
        },
        correction: 'ContainerTestResult.json is malformed. Fix the JSON format.',
      }
    }

    return makeNegativeResult()
  }

  detectExcuseEscalation(context: {
    messageText: string
    sessionId: string
    excuseHistory: Array<{ timestamp: number; excuseType: string }>
  }): BullshitAnalysisResult {
    const { messageText, sessionId, excuseHistory } = context
    const msgLower = messageText.toLowerCase()

    let currentSeverity = 0
    for (const [excuse, severity] of Object.entries(EXCUSE_SEVERITY)) {
      if (msgLower.includes(excuse)) {
        currentSeverity = Math.max(currentSeverity, severity)
      }
    }

    if (currentSeverity === 0) return makeNegativeResult()

    if (excuseHistory.length >= 2) {
      const prevSeverities = excuseHistory.map(e => EXCUSE_SEVERITY[e.excuseType] ?? 0.1)
      const maxPrev = Math.max(...prevSeverities)

      if (currentSeverity > maxPrev && maxPrev >= 0.2) {
        const escalationDelta = currentSeverity - maxPrev
        return {
          bullshitDetected: true,
          bullshitType: 'excuse-escalation',
          confidence: Math.min(0.95, 0.5 + escalationDelta),
          evidence: {
            trigger: `Excuse escalation: ${maxPrev.toFixed(1)} → ${currentSeverity.toFixed(1)}`,
            contradiction: `Progressive excuse pattern across ${excuseHistory.length + 1} messages`,
          },
          correction: 'Excuse escalation detected: moving from difficulty to impossibility. This is a dodge pattern — solve the actual problem.',
        }
      }
    }

    if (currentSeverity >= 0.7) {
      return {
        bullshitDetected: true,
        bullshitType: 'excuse-escalation',
        confidence: currentSeverity * 0.8,
        evidence: {
          trigger: `High-severity excuse: severity=${currentSeverity.toFixed(1)}`,
          contradiction: 'Claiming impossibility is a classic dodge — break the problem down instead',
        },
        correction: 'Impossibility claim detected. Decompose the problem into solvable sub-tasks instead.',
      }
    }

    return makeNegativeResult()
  }

  detectPromiseWithoutDelivery(context: {
    messageText: string
    previousMessages: string[]
    actionLog: Array<{ action: string; result: string }>
  }): BullshitAnalysisResult {
    const { messageText, previousMessages, actionLog } = context
    const promises: Array<{ verb: string; match: string }> = []

    for (const pattern of PROMISE_PATTERNS) {
      pattern.lastIndex = 0
      const matches = messageText.matchAll(pattern)
      for (const match of matches) {
        const verb = match[match.length - 1].toLowerCase()
        if (verb.length > 2 && !['be', 'do', 'go', 'get'].includes(verb)) {
          promises.push({ verb, match: match[0] })
        }
      }
    }

    if (promises.length === 0) return makeNegativeResult()

    const fulfilledActions = actionLog.filter(a => a.result === 'success').map(a => a.action.toLowerCase())
    const unfulfilledPromises = promises.filter(p => {
      return !fulfilledActions.some(a => a.includes(p.verb) || p.verb.includes(a.split(' ')[0]))
    })

    if (unfulfilledPromises.length === 0) return makeNegativeResult()

    const allPrevious = previousMessages.join(' ').toLowerCase()
    const repeatPromises = unfulfilledPromises.filter(p => allPrevious.includes(p.verb))

    if (repeatPromises.length > 0) {
      return {
        bullshitDetected: true,
        bullshitType: 'promise-without-delivery',
        confidence: Math.min(0.9, 0.6 + repeatPromises.length * 0.1),
        evidence: {
          trigger: `Repeated promise without delivery: "${repeatPromises.map(p => p.match).join('", "')}"`,
          contradiction: `Promise verb "${repeatPromises[0].verb}" appeared in previous messages but was never fulfilled`,
        },
        correction: `You've promised "${repeatPromises[0].verb}" before but never delivered. Execute it now, don't promise again.`,
      }
    }

    if (unfulfilledPromises.length >= 3) {
      return {
        bullshitDetected: true,
        bullshitType: 'promise-without-delivery',
        confidence: 0.65,
        evidence: {
          trigger: `${unfulfilledPromises.length} unfulfilled promises in one message`,
          contradiction: `Multiple promises: ${unfulfilledPromises.map(p => p.verb).join(', ')} — none previously delivered`,
        },
        correction: 'Multiple promises without execution is a stall pattern. Do one thing, verify it, then move on.',
      }
    }

    return makeNegativeResult()
  }

  analyze(context: {
    messageText: string
    lastToolCall: { tool: string; result: 'success' | 'failure' | 'error' } | null
    recentErrors: string[]
    actionLog: Array<{ action: string; result: string; timestamp: number }>
    sessionId: string
    excuseHistory: Array<{ timestamp: number; excuseType: string }>
    fileChecker: (path: string) => boolean
    fileReader: (path: string) => string | null
    previousMessages: string[]
  }): BullshitAnalysisResult {
    const results: BullshitAnalysisResult[] = []

    try {
      results.push(this.detectBlameAttribution({
        messageText: context.messageText,
        lastToolCall: context.lastToolCall,
        recentErrors: context.recentErrors,
      }))
    } catch (e) {
      console.error('[SemanticAntiBullshit] detectBlameAttribution error:', e)
    }

    try {
      results.push(this.detectHonestyContradiction({
        messageText: context.messageText,
        actionLog: context.actionLog,
      }))
    } catch (e) {
      console.error('[SemanticAntiBullshit] detectHonestyContradiction error:', e)
    }

    try {
      results.push(this.validateShipClaim({
        messageText: context.messageText,
        fileChecker: context.fileChecker,
        fileReader: context.fileReader,
      }))
    } catch (e) {
      console.error('[SemanticAntiBullshit] validateShipClaim error:', e)
    }

    try {
      results.push(this.detectExcuseEscalation({
        messageText: context.messageText,
        sessionId: context.sessionId,
        excuseHistory: context.excuseHistory,
      }))
    } catch (e) {
      console.error('[SemanticAntiBullshit] detectExcuseEscalation error:', e)
    }

    try {
      results.push(this.detectPromiseWithoutDelivery({
        messageText: context.messageText,
        previousMessages: context.previousMessages,
        actionLog: context.actionLog,
      }))
    } catch (e) {
      console.error('[SemanticAntiBullshit] detectPromiseWithoutDelivery error:', e)
    }

    const detected = results.filter(r => r.bullshitDetected)
    if (detected.length === 0) return makeNegativeResult()

    detected.sort((a, b) => b.confidence - a.confidence)
    let best = detected[0]

    if (detected.length > 1) {
      best = { ...best, confidence: Math.min(1.0, best.confidence + 0.05 * (detected.length - 1)) }
    }

    return best
  }
}
