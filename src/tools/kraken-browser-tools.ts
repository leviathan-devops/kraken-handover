/**
 * src/tools/kraken-browser-tools.ts
 * 
 * Self-contained headless browser tools for Kraken agent.
 * Wraps agent-browser Rust CLI. No external plugin dependencies.
 * 
 * Tools:
 * - browser_open: Open a URL in headless Chrome
 * - browser_snapshot: Get accessibility tree with element references
 * - browser_screenshot: Take a screenshot (PNG)
 * - browser_click: Click element by ref or CSS selector
 * - browser_fill: Fill input field by ref
 * - browser_get_text: Get text content of element
 * - browser_exec: Execute JavaScript in page
 * - browser_close: Close the browser
 * - browser_vision: Screenshot + VLM visual analysis (compound tool)
 */

import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';
import { execSync, execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// ============================================================
// CONFIGURATION
// ============================================================

const BROWSER_BIN = process.env.AGENT_BROWSER_BIN || 'agent-browser';
const BROWSER_TIMEOUT_MS = parseInt(process.env.AGENT_BROWSER_TIMEOUT || '30000');
const SCREENSHOT_DIR = '/tmp/kraken-browser';
const VLM_ENDPOINT = process.env.VLM_ENDPOINT || 'http://127.0.0.1:8082';

// ============================================================
// BINARY AVAILABILITY CHECK
// ============================================================

let browserAvailable: boolean | null = null;

function isBrowserAvailable(): boolean {
  if (browserAvailable !== null) return browserAvailable;
  try {
    const result = execSync(`which ${BROWSER_BIN} 2>/dev/null`, {
      encoding: 'utf-8',
      timeout: 3000,
    });
    browserAvailable = result.trim().length > 0;
  } catch (_e) {
    browserAvailable = false;
  }
  return browserAvailable;
}

const BROWSER_UNAVAILABLE_MSG = 'Browser tools unavailable: agent-browser binary not found in PATH. Install with `npm install -g agent-browser` or set AGENT_BROWSER_BIN env var to the binary path.';

// ============================================================
// BROWSER STATE TRACKING
// ============================================================

interface BrowserSession {
  open: boolean;
  url: string;
  lastSnapshot: string;
}
const browserSessions = new Map<string, BrowserSession>();
const defaultSessionKey = '__default__';
function getBrowserSession(key?: string): BrowserSession {
  const k = key || defaultSessionKey;
  let session = browserSessions.get(k);
  if (!session) {
    session = { open: false, url: '', lastSnapshot: '' };
    browserSessions.set(k, session);
  }
  return session;
}

function execBrowserArgs(args: string[], timeoutMs: number = BROWSER_TIMEOUT_MS): string {
  try {
    const result = execFileSync(BROWSER_BIN, args, {
      encoding: 'utf-8',
      timeout: timeoutMs,
      maxBuffer: 50 * 1024 * 1024,
      env: { ...process.env, DISPLAY: ':99' },
    });
    return result.trim();
  } catch (err: unknown) {
    let stderr = '';
    let stdout = '';
    let message = '';
    if (err instanceof Error) {
      if ('stderr' in err && typeof (err as Error & { stderr: string }).stderr === 'string') {
        stderr = (err as Error & { stderr: string }).stderr;
      }
      if ('stdout' in err && typeof (err as Error & { stdout: string }).stdout === 'string') {
        stdout = (err as Error & { stdout: string }).stdout;
      }
      message = err.message;
    } else {
      message = String(err);
    }
    const msg = stderr || stdout || message;
    throw new Error(`agent-browser failed: ${msg.slice(0, 500)}`);
  }
}

function execBrowser(cmd: string, timeoutMs: number = BROWSER_TIMEOUT_MS): string {
  return execBrowserArgs(cmd.split(' '), timeoutMs);
}

function ensureScreenshotDir(): string {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
  return SCREENSHOT_DIR;
}

// ============================================================
// VLM VISION BRIDGE (for browser_vision compound tool)
// ============================================================

async function queryVLMForImage(imagePath: string, prompt: string): Promise<string> {
  const buf = fs.readFileSync(imagePath);
  const b64 = Buffer.from(buf).toString('base64');
  const ext = path.extname(imagePath).toLowerCase();
  const mimeMap: Record<string, string> = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.webp': 'image/webp', '.bmp': 'image/bmp',
  };
  const mime = mimeMap[ext] || 'image/png';

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);

  try {
    const resp = await fetch(`${VLM_ENDPOINT}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: `data:${mime};base64,${b64}` } },
          ],
        }],
        max_tokens: 1000,
        temperature: 0.1,
      }),
      signal: controller.signal,
    });

    const result = await resp.json() as { choices?: Array<{ message?: { content?: string } }> };
    return result.choices?.[0]?.message?.content || '(no visual analysis returned)';
  } finally {
    clearTimeout(timeout);
  }
}

// ============================================================
// TOOLS
// ============================================================

export function createBrowserTools(): Record<string, unknown> {
  ensureScreenshotDir();

  return {
    browser_open: tool({
      description: 'Open a URL in headless Chrome browser. Must call before any other browser operation. Returns the page title and accessibility snapshot.',
      args: {
        url: z.string().describe('Full URL to open (e.g. https://example.com or http://localhost:3000)'),
      },
      execute: async (args) => {
        if (!isBrowserAvailable()) return BROWSER_UNAVAILABLE_MSG;
        if (!args.url) return 'Browser URL is required. Usage: browser_open { url: "https://example.com" }';
        const result = execBrowser(`open ${args.url}`);
        browserOpen = true;
        currentUrl = args.url;
        lastSnapshot = result;
        return `Browser opened: ${args.url}\n\n${result.slice(0, 5000)}`;
      },
    }),

    browser_snapshot: tool({
      description: 'Get the accessibility tree of the current page with element references (@e1, @e2, etc). Use these refs with browser_click and browser_fill. Also returns CSS selectors.',
      args: {},
      execute: async () => {
        if (!isBrowserAvailable()) return BROWSER_UNAVAILABLE_MSG;
        if (!browserOpen) return 'Browser is not open. Use browser_open first.';
        const result = execBrowser('snapshot');
        lastSnapshot = result;
        return result.slice(0, 8000);
      },
    }),

    browser_screenshot: tool({
      description: 'Take a screenshot of the current page and save to a PNG file. Returns the file path. Use with vlm_vision for visual analysis, or browser_vision for a single-step screenshot+analyze.',
      args: {
        filepath: z.string().optional().describe('Path to save screenshot. Defaults to /tmp/kraken-browser/screenshot-{timestamp}.png'),
      },
      execute: async (args) => {
        if (!isBrowserAvailable()) return BROWSER_UNAVAILABLE_MSG;
        if (!browserOpen) return 'Browser is not open. Use browser_open first.';
        const filepath = args.filepath || path.join(SCREENSHOT_DIR, `screenshot-${Date.now()}.png`);
        execBrowser(`screenshot ${filepath}`);
        const size = fs.existsSync(filepath) ? fs.statSync(filepath).size : 0;
        return `Screenshot saved: ${filepath} (${(size / 1024).toFixed(1)} KB)`;
      },
    }),

    browser_click: tool({
      description: 'Click an element on the page. Use accessibility refs (@e1, @e2) from browser_snapshot, or CSS selectors (#submit, .btn, etc). Returns the new page state.',
      args: {
        target: z.string().describe('Element reference (@e1, @e2) or CSS selector (#id, .class, button, etc)'),
      },
      execute: async (args) => {
        if (!isBrowserAvailable()) return BROWSER_UNAVAILABLE_MSG;
        if (!browserOpen) return 'Browser is not open. Use browser_open first.';
        const result = execBrowser(`click ${args.target}`);
        lastSnapshot = result;
        return `Clicked: ${args.target}\n\n${result.slice(0, 3000)}`;
      },
    }),

    browser_fill: tool({
      description: 'Type text into an input field. Use accessibility refs (@e3, @e4) from browser_snapshot, or CSS selectors.',
      args: {
        target: z.string().describe('Element reference (@e1) or CSS selector (#email, input[name="q"])'),
        value: z.string().describe('Text to type into the field'),
      },
      execute: async (args) => {
        if (!isBrowserAvailable()) return BROWSER_UNAVAILABLE_MSG;
        if (!browserOpen) return 'Browser is not open. Use browser_open first.';
        const escaped = args.value.replace(/"/g, '\\"');
        execBrowserArgs(['fill', args.target, escaped]);
        return `Filled: ${args.target} = "${args.value}"`;
      },
    }),

    browser_get_text: tool({
      description: 'Get the text content of a specific element by accessibility ref or CSS selector.',
      args: {
        target: z.string().describe('Element reference (@e1) or CSS selector (#title, .content, h1)'),
      },
      execute: async (args) => {
        if (!isBrowserAvailable()) return BROWSER_UNAVAILABLE_MSG;
        if (!browserOpen) return 'Browser is not open. Use browser_open first.';
        const result = execBrowser(`get text ${args.target}`);
        return result.slice(0, 5000);
      },
    }),

    browser_exec: tool({
      description: 'Execute JavaScript code in the current page. Returns the result. Use for advanced interactions (scroll, evaluate state, manipulate DOM).',
      args: {
        code: z.string().describe('JavaScript code to execute. Can access document, window, etc.'),
      },
      execute: async (args) => {
        if (!isBrowserAvailable()) return BROWSER_UNAVAILABLE_MSG;
        if (!browserOpen) return 'Browser is not open. Use browser_open first.';
        const result = execBrowserArgs(['exec', args.code]);
        return result.slice(0, 5000);
      },
    }),

    browser_close: tool({
      description: 'Close the browser and free resources. Always call when done with browsing.',
      args: {},
      execute: async () => {
        if (!isBrowserAvailable()) return BROWSER_UNAVAILABLE_MSG;
        if (!browserOpen) return 'Browser is already closed.';
        try {
          execBrowser('close', 5000);
        } catch (e) { console.error('[BrowserTools] close error:', e instanceof Error ? e.message : String(e)); }
        browserOpen = false;
        currentUrl = '';
        lastSnapshot = '';
        return 'Browser closed.';
      },
    }),

    vlm_health: tool({
      description: 'Check VLM (Vision Language Model) endpoint health. Returns online/offline status, model info, and endpoint URL. Does NOT require agent-browser binary — standalone HTTP health check. Use before browser_vision to verify VLM is available.',
      args: {},
      execute: async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        try {
          const resp = await fetch(`${VLM_ENDPOINT}/v1/models`, {
            method: 'GET',
            signal: controller.signal,
          });
          if (!resp.ok) {
            return `VLM endpoint: ${VLM_ENDPOINT}\nStatus: HTTP ${resp.status}\nState: DEGRADED`;
          }
          const data = await resp.json() as { data?: Array<{ id?: string }> };
          const models = (data.data || []).map((m: { id?: string }) => m.id || 'unknown').join(', ');
          return `VLM endpoint: ${VLM_ENDPOINT}\nStatus: ONLINE\nModels: ${models || 'unknown'}`;
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          return `VLM endpoint: ${VLM_ENDPOINT}\nStatus: OFFLINE\nError: ${msg}`;
        } finally {
          clearTimeout(timeout);
        }
      },
    }),

    browser_vision: tool({
      description: 'Take a screenshot AND analyze it with VLM vision in one step. Powerful compound tool for visual page understanding. Use when you need to SEE the page and understand its visual state. NOTE: VLM must be running (check vlm_status or start with vlm_on).',
      args: {
        prompt: z.string().describe('What to analyze about the page. Be specific: "Is the login form visible? What does the navbar show? Does the page look broken?"'),
      },
      execute: async (args) => {
        if (!isBrowserAvailable()) return BROWSER_UNAVAILABLE_MSG;
        if (!browserOpen) return 'Browser is not open. Use browser_open first.';
        const filepath = path.join(SCREENSHOT_DIR, `vision-${Date.now()}.png`);

        // Step 1: Take screenshot
        try {
          execBrowser(`screenshot ${filepath}`, 10000);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          return `Screenshot failed: ${msg}`;
        }

        if (!fs.existsSync(filepath)) {
          return 'Screenshot file was not created.';
        }

        const size = fs.statSync(filepath).size;

        // Step 2: VLM analysis
        try {
          const analysis = await queryVLMForImage(filepath, args.prompt);
          return `[Screenshot: ${filepath} (${(size / 1024).toFixed(1)} KB)]\n[URL: ${currentUrl}]\n\nVISUAL ANALYSIS:\n${analysis}`;
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          return `Screenshot saved: ${filepath} (${(size / 1024).toFixed(1)} KB)\nVLM analysis failed: ${msg}. Use vlm_vision directly on this file.`;
        }
      },
    }),
  };
}
