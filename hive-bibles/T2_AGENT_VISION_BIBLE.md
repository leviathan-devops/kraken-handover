# T2_AGENT_VISION_BIBLE — VLM Vision Plugin Reference

**Version:** 1.2.0 — 2026-06-01
**Plugin:** agent-vision (`~/.config/opencode/plugins/agent-vision/dist/index.js`)
**Model:** GLM-4.6V-Flash-Q4_K_M (BeeLlama turbo3_tcq KV cache)
**Server:** `glm-vlm-server.service` on port 8082
**VRAM:** ~10.9 GB when loaded, 6 parallel slots × 16K context
**Fractal integration:** T2_TUI_TESTING_BIBLE (container testing with vision) + RUNTIME_GRADE_CONTAINER_TESTING_BIBLE (runtime grade pressure testing)

---

## THE PRIME DIRECTIVE

> **IF YOU NEED TO READ AN IMAGE, USE `vlm_vision`. DO NOT FUMBLE.**
> **DO NOT try `tesseract`, `vlm-analyze`, `vlm-tv`, or curl to the VLM directly.**
> **DO NOT ask the user to describe the image.**
> **DO NOT spend 6+ tool calls discovering tools you already have.**

The `vlm_vision` tool exists. It is installed. It is registered in opencode.json. USE IT.

---

## THE 4 TOOLS

### `vlm_vision` — Analyze Images

**Purpose:** Send an image to the VLM for analysis. This is the PRIMARY tool for reading screenshots, diagrams, error messages, UI mockups, and any visual content.

**Args:**
| Arg | Type | Required | Default | Description |
|---|---|---|---|---|
| `image_path` | string | Yes | — | Absolute path to image file (png, jpg, gif, webp, bmp) |
| `prompt` | string | Yes | — | What to analyze or ask about the image |
| `max_tokens` | number | No | 500 | Max tokens to generate |
| `temperature` | number | No | 0.1 | Sampling temperature (lower = more deterministic) |

**Usage pattern:**
```
vlm_vision image_path="/path/to/screenshot.png" prompt="Read this screenshot. What error message is shown? Return the EXACT text."
```

**Returns:**
```json
{
  "content": "The model's visual analysis",
  "reasoning": "Internal reasoning chain",
  "tokens": { "completion_tokens": 187, "prompt_tokens": 69 },
  "model": "GLM-4.6V-Flash-Q4_K_M"
}
```

**Anti-derailment:**
- ❌ Do NOT ask "Can you paste the error text?" — Use `vlm_vision`
- ❌ Do NOT try `which tesseract` — Use `vlm_vision`
- ❌ Do NOT try `vlm-analyze` (stock ticker tool) — Use `vlm_vision`
- ❌ Do NOT try `vlm-tv` (TradingView tool) — Use `vlm_vision`
- ❌ Do NOT try direct curl to port 8082 — Use `vlm_vision`
- ❌ Do NOT write python scripts to encode images — Use `vlm_vision`
- ✅ IF image needs analyzing → `vlm_vision` is the FIRST and ONLY tool to reach for

### `vlm_status` — Check Server Health

**Purpose:** Check if the VLM server is running before attempting vision analysis.

**Usage pattern:**
```
vlm_status
```
If status shows "offline" or error, call `vlm_on` first.

### `vlm_on` — Start the VLM Server

**Purpose:** Load the GLM-4.6V-Flash model into VRAM (~10.9 GB). Idempotent — returns immediately if already running.

**Polling:** Polls server health for up to 30 seconds until ready.

**Usage pattern:**
```
vlm_on
```

**When to use:**
- Before first `vlm_vision` call if server might be offline
- After `vlm_off` if you need vision again
- On session start if you know you'll need vision

### `vlm_off` — Stop the VLM Server

**Purpose:** Unload the model from VRAM (~10.9 GB freed). Idempotent.

**Usage pattern:**
```
vlm_off
```

**When to use:**
- After you're done with vision analysis to free VRAM for other workloads
- Before running memory-intensive container tests
- At session end

---

## USAGE PROTOCOL

### Standard Sequence (Read a Screenshot)

```bash
# STEP 1: Check if VLM is running
vlm_status
# → "online" or "offline"

# STEP 2: If offline, start it
vlm_on
# → "VLM server started successfully"

# STEP 3: Read the image
vlm_vision image_path="/path/to/screenshot.png" prompt="Read this screenshot EXACTLY. What error message is shown?"
# → Returns the analysis

# STEP 4: When done, free VRAM (optional)
vlm_off
```

### Emergency Sequence (If VLM Is Unresponsive)

```bash
# If vlm_status shows error or vlm_vision times out:
vlm_off    # stop server
sleep 2    # wait for clean shutdown
vlm_on     # restart server
vlm_vision image_path="/path/to/screenshot.png" prompt="Read this screenshot"  # retry
```

---

## ANTI-DERAILMENT ENFORCEMENT

### The 5 Things You NEVER Do When You Need To Read An Image

| Wrong Approach | Why It's Wrong | Correct |
|---|---|---|
| `which tesseract` | OCR is not VLM. Tesseract may not be installed. | `vlm_vision` |
| `vlm-analyze` | Stock ticker tool, not vision tool | `vlm_vision` |
| `vlm-tv` | TradingView chart analyzer, not general vision | `vlm_vision` |
| `curl ... 8082/v1/chat/completions` | Direct API bypasses plugin error handling, crashes with large images | `vlm_vision` |
| "Can you paste the error text?" | User gave you a screenshot. Read it. | `vlm_vision` |

### If vlm_vision Fails

1. Call `vlm_status` to check if server is running
2. If offline: `vlm_on` → wait 10s → retry `vlm_vision`
3. If still failing: `vlm_off` → `vlm_on` (restart the server) → retry
4. If server restarts but still fails: report "VLM server appears to have crashed under image load. Restarting..."
5. Do NOT fall back to bash hacks

---

## FRACTAL CROSS-REFERENCES

This bible is part of the Runtime Grade Container Testing fractal:

- **T2_TUI_TESTING_BIBLE** — Container TUI testing protocol. Use `vlm_vision` to verify TUI output, read error screenshots, capture visual regressions.
- **RUNTIME_GRADE_CONTAINER_TESTING_BIBLE** — Runtime grade pressure testing. Use `vlm_vision` during Phase 5 (Theatrical Audit) to verify visual output meets spec.
- **Spider v2.2 Build Spec** — Each spider agent (explorer, architect, coder, reviewer, test) has vision capabilities for analyzing screenshots, diagrams, UI mockups.

---

**T2_AGENT_VISION_BIBLE — The 4 vision tools. No fumbling. First tool. Every time.**
