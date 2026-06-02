# NUKE RELOAD BIBLE v2.0 — Corrupted Plugin Recovery

## THE GOLDEN RULE
**NUKE FIRST, DEBUG LATER.** When a plugin is corrupted, the fastest path to working state is: remove the broken plugin → deploy the known-good nuke-reload bundle → restart opencode. Do not try to patch broken plugins in place.

---

## ⚠️ ANTI-PATTERN: DO NOT DO THIS ⚠️

**THE FOLLOWING IS RETARDED BEHAVIOR. DO NOT DO THESE THINGS:**

```
❌ Compare checksums of src/index.ts files
❌ Check timestamps to see "if it's really corrupted"
❌ Try to "fix" the corrupted plugin in place
❌ Edit code in the corrupted plugin
❌ Run bun build when the dist/ is already pre-built
❌ Ask "but is it really corrupted?"
❌ Try to selectively delete files from the plugin directory
❌ Over-analyze — just NUKE and RELOAD
```

**IF YOU FIND YOURSELF DOING ANY OF THE ABOVE, STOP. READ THIS BIBLE AGAIN. THEN DO THE 6-STEP PROCESS.**

---

## CROSS-REFERENCES

| For | Read |
|-----|------|
| Plugin build pipeline | `plugin-engineering/PLUGIN-ENGINEERING-BIBLE.md` |
| opencode.json structure | `plugin-engineering/PLUGIN-ENGINEERING-BIBLE.md` (PART 2) |
| Hook system reference | `plugin-engineering/PLUGIN-ENGINEERING-BIBLE.md` (PART 4) |
| TUI container testing | `plugin-engineering/TUI-TESTING-BIBLE.md` |
| Debugging failures | `failures/FAILURES-BIBLE.md` |
| Guardian file protection | `guardian/GUARDIAN-BIBLE.md` |

---

## PART 1: WHAT IS A NUKE RELOAD BUNDLE?

A **NUKE RELOAD bundle** is a known-good, production-verified plugin build stored in the Shared Workspace Context under `/{AGENT}/NUKE RELOAD/{VERSION}/`. It contains:

```
{NUKE_RELOAD_BUNDLE}/
├── dist/
│   └── index.js          ← PRE-BUILT plugin bundle (USE THIS)
├── src/                  ← Source code (optional, not needed for deploy)
├── package.json          ← Build metadata
├── DEPLOY.md             ← Agent-specific deploy instructions
└── FIXES.md              ← What bugs this version fixes
```

**The `dist/index.js` is pre-built.** You do NOT rebuild. You copy it directly to the plugin destination.

---

## PART 2: NUKE RELOAD COMMAND REFERENCE

### Shark Agent — One-Liner

```bash
NUKE_NAME="shark v4.7 hotfix v2"
PLUGIN_DIR="/home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent"
SRC="/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Shark Agent/NUKE RELOAD/v4.7-hotfix-v2-fixed"
TARGET_JSON="/home/leviathan/.config/opencode/opencode.json"

# Step 1: Nuke old plugin directory
rm -rf "$PLUGIN_DIR" && mkdir -p "$PLUGIN_DIR"

# Step 2: Copy pre-built dist
cp -r "$SRC/dist" "$PLUGIN_DIR/"

# Step 3: Update opencode.json (register plugin + agent config)
python3 -c "
import json
p='$TARGET_JSON'
c=json.load(open(p))
c['plugin']=[x for x in c.get('plugin',[]) if 'shark' not in x.lower()]
c['plugin'].append('file://$PLUGIN_DIR/dist/index.js')
if 'agent' not in c: c['agent']={}
c['agent']['shark']={'color':'#228B22','mode':'primary','hidden':False}
if 'permission' not in c: c['permission']={'*':{'*':'allow'}}
json.dump(c,open(p,'w'),indent=2)
"

echo "✅ NUKE RELOAD COMPLETE: $NUKE_NAME"
ls -la "$PLUGIN_DIR/dist/index.js"
```

### Kraken Agent — One-Liner

```bash
NUKE_NAME="kraken v1.2"
PLUGIN_DIR="$HOME/.config/opencode/plugins/kraken-agent"
SRC="/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/NUKE RELOAD/v1.2"

# Step 1: Nuke old plugin directory
rm -rf "$PLUGIN_DIR" && mkdir -p "$PLUGIN_DIR"

# Step 2: Run the deploy script
bash "$SRC/DEPLOY.sh"

# Step 3: Set env vars (add to ~/.bashrc)
export KRAKEN_IDENTITY_DIR="$HOME/.config/opencode/plugins/kraken-agent/identity"
export KRAKEN_PLUGIN_NAME="kraken-agent"
export KRAKEN_PLUGIN_DIR="$HOME/.config/opencode/plugins/kraken-agent"

echo "✅ NUKE RELOAD COMPLETE: $NUKE_NAME"
```

---

## PART 3: THE 6-STEP NUKE RELOAD PROCESS (ANY AGENT)

Every agent follows this exact sequence. The commands change; the steps do not.

### STEP 1 — CONFIRM THE NUKE BUNDLE EXISTS

```bash
# Shark
ls "/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Shark Agent/NUKE RELOAD/"

# Kraken
ls "/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/NUKE RELOAD/"
```

If the bundle doesn't exist, you cannot nuke-reload. You must build from source first (see PART 5).

### STEP 2 — IDENTIFY THE PLUGIN DESTINATION PATH

| Agent | Plugin Directory |
|-------|-----------------|
| shark | `/home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent` |
| kraken | `$HOME/.config/opencode/plugins/kraken-agent` |
| manta | `$HOME/.config/opencode/plugins/manta-agent` |

Check `~/.config/opencode/opencode.json` to confirm current plugin path.

### STEP 3 — NUKE (REMOVE) THE CORRUPTED PLUGIN

```bash
# ALWAYS remove the entire plugin directory first
rm -rf /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent
mkdir -p /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent

# OR for kraken:
rm -rf $HOME/.config/opencode/plugins/kraken-agent
mkdir -p $HOME/.config/opencode/plugins/kraken-agent
```

**CRITICAL: Do NOT try to selectively delete files. Nuke the entire directory.**

### STEP 4 — DEPLOY THE PRE-BUILT DIST

```bash
# For shark (pre-built dist is already bundled):
cp -r /home/leviathan/OPENCODE_WORKSPACE/Shared\ Workspace\ Context/Shark\ Agent/NUKE\ RELOAD/v4.7-hotfix-v2-fixed/dist \
      /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/

# For kraken (use the DEPLOY.sh script):
bash /home/leviathan/OPENCODE_WORKSPACE/Shared\ Workspace\ Context/Kraken\ Agent/NUKE\ RELOAD/v1.2/DEPLOY.sh
```

**DO NOT REBUILD.** The dist/ folder contains a pre-built, tested bundle. Rebuilding risks introducing new bugs.

### STEP 5 — REGISTER IN opencode.json

```bash
python3 -c "
import json
p = '$HOME/.config/opencode/opencode.json'
c = json.load(open(p))

# Remove any existing entries for this agent (by URL match)
agent_name = 'shark'  # or 'kraken', 'manta'
c['plugin'] = [x for x in c.get('plugin', []) if agent_name not in x.lower()]

# Add the nuke-reload plugin path
plugin_path = 'file:///home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/dist/index.js'
c['plugin'].append(plugin_path)

# Ensure agent config block exists
if 'agent' not in c: c['agent'] = {}
c['agent'][agent_name] = {'color': '#228B22', 'mode': 'primary', 'hidden': False}

# Ensure permission block exists (ELIMINATES BLOCKING PROMPTS)
if 'permission' not in c: c['permission'] = {'*': {'*': 'allow'}}

json.dump(c, open(p, 'w'), indent=2)
print('Registered in opencode.json')
"
```

### STEP 6 — VERIFY AND RESTART

```bash
# Verify the bundle exists and has content
ls -la /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/dist/index.js

# Kill opencode if running
pkill -f opencode || true
sleep 2

# Restart opencode
opencode

# Test the agent
shark-status   # or: opencode --agent shark
```

---

## PART 4: COMMON opencode.json PATTERNS

### Shark Agent — Full opencode.json Entry

```json
{
  "plugin": [
    "file:///home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/dist/index.js"
  ],
  "agent": {
    "shark": {
      "color": "#228B22",
      "mode": "primary",
      "hidden": false
    }
  },
  "permission": {
    "*": { "*": "allow" }
  }
}
```

### Kraken Agent — Full opencode.json Entry

```json
{
  "plugin": [
    "file:///home/leviathan/.config/opencode/plugins/kraken-agent/dist/index.js"
  ],
  "agent": {
    "kraken": {
      "color": "#4B0082",
      "mode": "primary",
      "hidden": false
    }
  },
  "permission": {
    "*": { "*": "allow" }
  }
}
```

---

## PART 5: WHAT IF NO NUKE BUNDLE EXISTS?

If you need to nuke-reload but the bundle doesn't exist, you must build one first.

### Emergency Bundle Creation (Shark)

```bash
SRC_DIR="/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Shark Agent/NUKE RELOAD"
mkdir -p "$SRC_DIR/v4.7-hotfix-v2-fixed"

# Copy your current working source
cp -r /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/src "$SRC_DIR/v4.7-hotfix-v2-fixed/"
cp /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/package.json "$SRC_DIR/v4.7-hotfix-v2-fixed/"

cd "$SRC_DIR/v4.7-hotfix-v2-fixed"

# Build
bun install --no-save
bun build src/index.ts --outdir dist --target bun --format esm --bundle

# Verify
ls -la dist/index.js
echo "Bundle size: $(wc -c < dist/index.js) bytes"
```

### Emergency Bundle Creation (Kraken)

```bash
SRC_DIR="/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/NUKE RELOAD"
mkdir -p "$SRC_DIR/v1.2"

# Copy your current working source
cp -r $HOME/.config/opencode/plugins/kraken-agent/src "$SRC_DIR/v1.2/"
cp $HOME/.config/opencode/plugins/kraken-agent/package.json "$SRC_DIR/v1.2/"

cd "$SRC_DIR/v1.2"

# Build
bun install --no-save
bun build src/index.ts --outdir dist --target bun --format esm --bundle

# Update DEPLOY.sh if needed (see DEPLOY.sh pattern above)
```

---

## PART 6: NUKE RELOAD VERIFICATION CHECKLIST

After every nuke reload, verify ALL of these before declaring success:

```
☐ Plugin dist/index.js exists and has >100KB
☐ opencode.json contains the correct plugin path
☐ opencode.json contains the agent config block
☐ opencode.json contains the permission block
☐ opencode process was restarted
☐ Agent responds to status command (shark-status, kraken-status, etc.)
☐ Agent identity is correct (isSharkAgent(), isKrakenAgent())
☐ Gate system responds (shark-gate status, kraken-gate status)
```

---

## PART 7: TROUBLESHOOTING

### "Plugin loads but agent doesn't appear in tab toggle"

```bash
# Check opencode.json has the agent block
python3 -c "
import json
c = json.load(open('$HOME/.config/opencode/opencode.json'))
print('agent block:', c.get('agent', {}))
"

# The agent block MUST be present:
# "agent": { "shark": { "color": "#228B22", "mode": "primary", "hidden": false } }
```

### "Plugin loads but I get permission prompts blocking everything"

```bash
# Check permission block exists
python3 -c "
import json
c = json.load(open('$HOME/.config/opencode/opencode.json'))
print('permission block:', c.get('permission', {}))
"

# Must be: "permission": { "*": { "*": "allow" } }
```

### "opencode starts but agent immediately crashes"

```bash
# Check the bundle is intact
ls -la /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/dist/index.js

# Check it has content (>100KB for a full agent)
wc -c /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/dist/index.js

# Try loading it directly in node
node -e "import('file:///home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/dist/index.js').then(m => console.log('Loaded OK:', Object.keys(m))).catch(e => console.error('ERROR:', e.message))"
```

### "I nuked but opencode still loads the old broken plugin"

```bash
# opencode may be caching plugins. Kill ALL opencode processes:
pkill -9 -f opencode || true
sleep 3

# Check no zombie processes
ps aux | grep opencode

# Also check ~/.config/opencode/ for any cached plugins
find ~/.config/opencode/plugins -name "index.js" -exec ls -la {} \;

# Restart fresh
opencode
```

---

## PART 8: THE NUKE RELOAD COMMAND (NATURAL LANGUAGE)

When you say **"nuke reload shark v4.7 hotfix v2"**, the agent executes:

```
1. Locate bundle: /Shared Workspace Context/Shark Agent/NUKE RELOAD/v4.7-hotfix-v2-fixed/dist/
2. Confirm dist/index.js exists
3. rm -rf /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent
4. mkdir -p /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent
5. cp -r {BUNDLE}/dist /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent/
6. Update opencode.json (remove old shark entries, add new)
7. Restart opencode
8. Verify with shark-status
```

When you say **"nuke reload kraken v1.2"**, the agent executes:

```
1. Locate bundle: /Shared Workspace Context/Kraken Agent/NUKE RELOAD/v1.2/
2. Confirm dist/ exists
3. rm -rf $HOME/.config/opencode/plugins/kraken-agent
4. bash {BUNDLE}/DEPLOY.sh
5. Set KRAKEN_IDENTITY_DIR, KRAKEN_PLUGIN_NAME, KRAKEN_PLUGIN_DIR env vars
6. Update opencode.json if needed
7. Restart opencode
8. Verify with kraken-status
```

---

## PART 9: BUNDLE NAMING CONVENTION

NUKE RELOAD bundles follow this naming:

```
{AGENT}/NUKE RELOAD/{VERSION}/
```

Examples:
- `Shark Agent/NUKE RELOAD/v4.7-hotfix-v2-fixed/`
- `Shark Agent/NUKE RELOAD/v4.8.4-clean/`
- `Kraken Agent/NUKE RELOAD/v1.1/`
- `Kraken Agent/NUKE RELOAD/v1.2/`
- `Manta Agent/NUKE RELOAD/v1.5-hotfix/`

**Version format:** `{MAJOR}.{MINOR}[-{HOTFIX}][-{QUALIFIER}]`

---

## QUICK REFERENCE CARD

```
┌─────────────────────────────────────────────────────────────────┐
│                    NUKE RELOAD CHEAT SHEET                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SHARK:                                                         │
│  rm -rf /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent │
│  mkdir -p /home/leviathan/OPENCODE_WORKSPACE/plugins/shark-agent│
│  cp -r {BUNDLE}/dist /home/leviathan/OPENCODE_WORKSPACE/plugins/│
│  python3 update_opencode_json.py shark ...                      │
│  pkill -f opencode; opencode                                    │
│                                                                 │
│  KRAKEN:                                                        │
│  rm -rf $HOME/.config/opencode/plugins/kraken-agent            │
│  bash {BUNDLE}/DEPLOY.sh                                        │
│  export KRAKEN_*_DIR=...                                        │
│  pkill -f opencode; opencode                                    │
│                                                                 │
│  VERIFY:                                                        │
│  ls -la {PLUGIN_DIR}/dist/index.js                             │
│  {agent}-status                                                 │
│  {agent}-gate status                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## REAL-WORLD FAILURE CASE (From session-ses_20a6)

**What went wrong:**
1. User said "nuke reload kraken v1.2" (clear command)
2. Agent spent 200+ lines over-analyzing instead of just NUKE RELOAD
3. Agent checked timestamps, compared checksums, asked "but is it really corrupted?"
4. Agent tried to edit code in the corrupted plugin instead of replacing it
5. User had to say "DO NOT EDIT ANY CODE. JUST REPLACE THE PLUGIN" 3 times
6. User said "basic common fucking sense. what you just found is the corrupted plugin and needs to be replaced with the nuke reload"

**The correct response to "nuke reload kraken v1.2":**

```bash
# 1. Find the bundle
ls "/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/NUKE RELOAD/v1.2/"

# 2. Nuke the corrupted plugin (the one in opencode.json)
rm -rf $HOME/.config/opencode/plugins/kraken-agent
mkdir -p $HOME/.config/opencode/plugins/kraken-agent

# 3. Deploy from bundle
bash "/home/leviathan/OPENCODE_WORKSPACE/Shared Workspace Context/Kraken Agent/NUKE RELOAD/v1.2/DEPLOY.sh"

# 4. Restart opencode
pkill -f opencode; sleep 2; opencode

# Done. That's it.
```

**If you catch yourself doing any of the ANTIPATTERN actions, stop and read this again.**
