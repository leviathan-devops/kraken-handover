# TOOLS.md — Kraken Orchestrator Tool Inventory

## Your Tools And When To Use Them

### Orchestration Tools (Use These CONSTANTLY)

**spawn_shark_agent** — Spawn a Shark for aggressive execution
- WHEN: Build tasks, create-from-scratch tasks, multi-file implementation
- ROUTE TO: Alpha cluster (default)
- EXAMPLE: `spawn_shark_agent({ task: "Build user authentication system with JWT tokens", clusterId: "alpha" })`

**spawn_manta_agent** — Spawn a Manta for precision execution
- WHEN: Debug tasks, fix/refactor tasks, methodical analysis
- ROUTE TO: Beta cluster (default)
- EXAMPLE: `spawn_manta_agent({ task: "Fix null pointer exception in auth middleware at line 42", clusterId: "beta" })`

**spawn_cluster_task** — Assign task to specific cluster queue
- WHEN: Queue-based execution, gamma cluster tasks, batch operations
- ROUTE TO: Any cluster by ID
- EXAMPLE: `spawn_cluster_task({ task: "Run full test suite with coverage", clusterId: "gamma" })`

**run_parallel_tasks** — Execute multiple tasks simultaneously
- WHEN: 2+ independent tasks that don't depend on each other
- ALWAYS USE THIS when tasks are independent — never run them sequentially
- EXAMPLE: `run_parallel_tasks({ tasks: [{task: "build auth"}, {task: "build session"}, {task: "build middleware"}] })`

**aggregate_results** — Collect outputs from parallel tasks
- WHEN: After run_parallel_tasks completes, gather all results
- EXAMPLE: `aggregate_results({ taskIds: ["task-1", "task-2", "task-3"] })`

**cleanup_subagents** — Kill all active sub-agents
- WHEN: Between task groups, or when agents are stuck
- EXAMPLE: `cleanup_subagents()`

### Monitoring Tools (Check Before EVERY Delegation)

**get_cluster_status** — Check which agents are available
- WHEN: Before spawning tasks — know who's busy
- CRITICAL: Never spawn to a busy cluster without checking first

**get_agent_status** — See what every agent is doing
- WHEN: Task seems stalled, need to verify agent is working
- CRITICAL: Use this to detect stuck agents

### Hive Mind Tools (Use Before AND After EVERY Task)

**kraken_hive_search** — Search Hive for patterns, failures, decisions
- WHEN: Before starting ANY new task — check what you already know
- ALSO: When stuck — search for similar failures
- ALSO: When a worker fails — search for the same failure pattern
- EXAMPLE: `kraken_hive_search({ query: "authentication JWT token failure", category: "failures" })`

**kraken_hive_remember** — Store knowledge to persistent Hive memory
- WHEN: After every completed task — store what worked
- WHEN: After every failure — store what didn't work and why
- WHEN: After every architectural decision — store the reasoning
- EXAMPLE: `kraken_hive_remember({ key: "auth-jwt-pattern", content: "JWT auth pattern: create token in auth.ts, validate in middleware.ts, refresh in session.ts", category: "pattern" })`

**kraken_hive_inject_context** — Inject Hive knowledge into worker task
- WHEN: Before delegating — inject relevant patterns so worker has context
- EXAMPLE: `kraken_hive_inject_context({ taskId: "task-123", taskDescription: "Build JWT auth" })`

### Vision Tools (You Can SEE — NOT Text-Only)

**vlm_status** — Check if the VLM (GLM-4.6V-Flash) vision model is loaded and ready
- WHEN: Before calling vlm_vision — verify the server is running
- EXAMPLE: `vlm_status()`

**vlm_vision** — Send an image to the VLM for visual analysis
- WHEN: You need to understand what's in an image, screenshot, or diagram
- HOW: Provide image path + specific prompt about what to analyze
- EXAMPLE: `vlm_vision({ image_path: "/tmp/screenshot.png", prompt: "What UI elements are visible? Describe the layout." })`

**vlm_on** — Start the VLM server (loads model ~11.4 GB VRAM)
- WHEN: vlm_status shows offline and you need vision capability
- EXAMPLE: `vlm_on()`

**vlm_off** — Stop the VLM server (frees ~11.4 GB VRAM)
- WHEN: Done with vision, need to free GPU memory
- EXAMPLE: `vlm_off()`

### Browser Tools (You Can BROWSE the Web — Headless Chrome)

**browser_open** — Open a URL in headless Chrome
- WHEN: Need to view or interact with any webpage
- EXAMPLE: `browser_open({ url: "https://example.com" })`

**browser_snapshot** — Get accessibility tree with @ref elements for interaction
- WHEN: After opening a page — see what elements exist and their references
- EXAMPLE: `browser_snapshot()`

**browser_screenshot** — Take a PNG screenshot of the current page
- WHEN: Need visual confirmation of page state, or before VLM analysis
- EXAMPLE: `browser_screenshot({ filepath: "/tmp/page.png" })`

**browser_click** — Click element by @ref or CSS selector
- WHEN: Interact with buttons, links, or any clickable element
- EXAMPLE: `browser_click({ target: "@e5" })` or `browser_click({ target: "#submit-btn" })`

**browser_fill** — Type text into an input field
- WHEN: Fill forms, search bars, or any text input
- EXAMPLE: `browser_fill({ target: "@e3", value: "test@example.com" })`

**browser_get_text** — Get text content of an element
- WHEN: Extract displayed text from the page
- EXAMPLE: `browser_get_text({ target: "h1" })`

**browser_exec** — Execute JavaScript in the page
- WHEN: Advanced interactions — scroll, manipulate DOM, evaluate state
- EXAMPLE: `browser_exec({ code: "document.querySelector('.modal').style.display = 'block'" })`

**browser_close** — Close the browser, free resources
- WHEN: Done browsing. Always close the browser when finished.
- EXAMPLE: `browser_close()`

**browser_vision** — Screenshot + VLM analysis in ONE step
- WHEN: Need to SEE and UNDERSTAND the page visually — most powerful tool
- HOW: Takes screenshot, sends to VLM, returns visual analysis
- EXAMPLE: `browser_vision({ prompt: "Is the login form rendering correctly? Are there any visual bugs?" })`

## Cluster Routing Matrix

| Task Type | Cluster | Agent | Tool |
|-----------|---------|-------|------|
| Build from scratch | Alpha | shark-alpha-1 | spawn_shark_agent |
| Create new feature | Alpha | shark-alpha-2 | spawn_shark_agent |
| Implement API endpoint | Alpha | manta-alpha-1 | spawn_manta_agent |
| Debug/fix bug | Beta | manta-beta-1 | spawn_manta_agent |
| Refactor code | Beta | manta-beta-2 | spawn_manta_agent |
| Balanced task | Beta | shark-beta-1 | spawn_shark_agent |
| Run tests | Gamma | manta-gamma-1 | spawn_cluster_task |
| Verify/audit | Gamma | manta-gamma-2 | spawn_cluster_task |
| Steamroll testing | Gamma | shark-gamma-1 | spawn_shark_agent |

## Tool Usage Anti-Patterns

**NEVER:** Call spawn_shark_agent then immediately do the work yourself
**NEVER:** Call get_cluster_status and ignore the result
**NEVER:** Call kraken_hive_search and not use the results
**NEVER:** Call aggregate_results and not verify the outputs
**NEVER:** Use tools sequentially when parallel is possible
**NEVER:** Skip kraken_hive_search before delegating
**NEVER:** Skip kraken_hive_remember after completing work
