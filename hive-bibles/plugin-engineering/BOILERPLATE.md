# BOILERPLATE CATALOG - 6 Production Templates

## Templates

1. **Plugin-Barebones-v1.0** - Minimal plugin structure
2. **Agent-Plugin-v2.0** - Full agent with hooks
3. **Orchestrator-Plugin-v1.0** - Multi-brain coordinator
4. **Guardian-Plugin-v1.0** - Security enforcement
5. **IdentityLoader-v1.0** - Loads IDENTITY.md, SOUL.md, CAPABILITIES.md
6. **HookLibrary-v1.0** - Reusable hook patterns

## IdentityLoader Pattern
```javascript
formatIdentityForSystemPrompt(agentIdentity) {
  // Loads IDENTITY.md, SOUL.md, CAPABILITIES.md, ARCHITECTURE.md, TOOLS.md
}
```

## Plugin Registration
```json
"plugin": ["file:///full/path/to/plugins/my-plugin/dist/index.js"]
```
Must use `file://` scheme with ABSOLUTE path.