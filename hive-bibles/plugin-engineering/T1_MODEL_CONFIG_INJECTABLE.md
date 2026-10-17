# T1: Model Config Injectable — Copy-Paste Container Setup

## Default Config (MiMo — Milk It)

```json
{
  "model": "xiaomi-token-plan-sgp/mimo-v2.5-pro",
  "provider": {
    "xiaomi-token-plan-sgp": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "https://token-plan-sgp.xiaomimimo.com/v1",
        "apiKey": "<REDACTED_SET_VIA_ENV>"
      }
    }
  },
  "plugin": [],
  "agent": {},
  "permission": {"*": {"*": "allow"}}
}
```

## OpenRouter Free

| Model | `model` value |
|---|---|
| DeepSeek V4 Flash Free | `openrouter/deepseek-v4-flash-free` |
| Nemotron 3 Super Free | `openrouter/nemotron-3-super-free` |

```json
{
  "model": "openrouter/deepseek-v4-flash-free",
  "provider": {
    "openrouter": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "https://openrouter.ai/api/v1",
        "apiKey": "YOUR_KEY"
      }
    }
  }
}
```

## OpenCode Zen Free

| Model | `model` value |
|---|---|
| DeepSeek V4 Flash Free | `opencode-zen/deepseek-v4-flash-free` |
| Nemotron 3 Super Free | `opencode-zen/nemotron-3-super-free` |

```json
{
  "model": "opencode-zen/deepseek-v4-flash-free",
  "provider": {
    "opencode-zen": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "https://zen.opencode.ai/v1",
        "apiKey": "YOUR_KEY"
      }
    }
  }
}
```

## Google Direct Free

| Model | Use |
|---|---|
| `google/Gemma-4-26b` | Most reliable, rarely rate-limited, good for anti-retard testing |
| `google/Gemma-4-31b` | Smarter, rate-limited faster |
| `google/gemini-2.5-flash` | Smartest free, rate-limited quickest |

```json
{
  "model": "google/Gemma-4-26b",
  "provider": {
    "google": {
      "npm": "@ai-sdk/google",
      "options": {
        "apiKey": "YOUR_GOOGLE_KEY"
      }
    }
  }
}
```

## Model Selection Quick Reference

| Need | Model | Provider |
|---|---|---|
| Everything (default) | `xiaomi-token-plan-sgp/mimo-v2.5-pro` | MiMo (paid) |
| Fast free fallback | `openrouter/deepseek-v4-flash-free` | OpenRouter |
| Smarter free | `openrouter/nemotron-3-super-free` | OpenRouter |
| OR rate-limited | `opencode-zen/deepseek-v4-flash-free` | OpenCode Zen |
| Anti-retard testing | `google/Gemma-4-26b` | Google Direct |

## BANNED Providers

`minimax/*` — `deepseek/*` direct API — `xlam2/*` — any paid API except MiMo

## Config Rules

- `model` at TOP LEVEL, not inside provider
- `tools` as OBJECT `{}`, not array `[]`
- `permission` block required: `{"*": {"*": "allow"}}`
