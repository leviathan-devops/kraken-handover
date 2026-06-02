# T1: AGENT VISION INJECTABLE — vlm_vision Quick Reference

**⚠️ T1 QUICK REFERENCE — For the full T2 Bible with anti-derailment enforcement and failure recovery, read:**
`kraken/context/T2_AGENT_VISION_BIBLE.md`

---

## THE RULE

If you need to read an image — screenshot, error dialog, diagram, UI mockup, photo — **call `vlm_vision` immediately.**
Do NOT try OCR, do NOT ask the user to describe it, do NOT curl the API directly, do NOT fumble with bash.

---

## THE 4 TOOLS

| Tool | What It Does | When To Use |
|---|---|---|
| `vlm_vision` | Analyze an image | First tool. Always. |
| `vlm_status` | Check if VLM server is running | Before vision if unsure, or when vision fails |
| `vlm_on` | Start VLM server (loads ~10.9 GB VRAM) | If server is offline |
| `vlm_off` | Stop VLM server (frees ~10.9 GB VRAM) | After done, to free VRAM |

---

## THE PATTERN

```
vlm_vision image_path="/path/to/file.png" prompt="Read this screenshot. Return the EXACT text."
```

If it fails:
1. `vlm_status` → if offline, `vlm_on`
2. `vlm_vision` again
3. If still fails: `vlm_off` → `vlm_on` → `vlm_vision`
4. If still fails: report "VLM server crashed under image load. Needs manual restart."

---

## THE WRONG WAYS (BANNED)

| Don't do this | Do this instead |
|---|---|
| `which tesseract` | `vlm_vision` |
| `vlm-analyze` | `vlm_vision` |
| `vlm-tv` | `vlm_vision` |
| `curl ... 8082` | `vlm_vision` |
| "Can you paste the error?" | `vlm_vision` |
| python script to encode image | `vlm_vision` |

---

## INSTALL STATUS

**Plugin:** `~/.config/opencode/plugins/agent-vision/dist/index.js`
**Server:** `glm-vlm-server.service` on port 8082
**Model:** GLM-4.6V-Flash-Q4_K_M (6 slots × 16K context, ~10.9 GB VRAM)

The plugin is ALREADY installed and registered in `opencode.json`. The tools are available. Use them.
