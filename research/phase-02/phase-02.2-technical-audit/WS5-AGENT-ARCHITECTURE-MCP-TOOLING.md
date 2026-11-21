# UIFORGE — PHASE 02.2, WORKSTREAM 5 (WS-5)
# MASTER DEEP RESEARCH, ECOSYSTEM INVESTIGATION, EXPERIMENTAL VALIDATION & ARCHITECTURE SPECIFICATION (RECONCILED FINAL)
## AI Agent Architecture, Model Context Protocol (MCP), Agent SDK, Context Engineering & Tooling Integration

**Document Identifier:** `UIF-PH02-WS5-MASTER-RECONCILED`  
**Workstream:** WS-5 — AI Agent Architecture, Model Context Protocol (MCP), Agent SDK, Context Engineering & Tooling Integration  
**Parent Phase:** Phase 02.2 — Deep Technical Audit & Architectural Decisions  
**Execution Classification:** Principal AI Systems Architecture & Protocol Engineering  
**Standard:** Principal AI Systems Architect + MCP Protocol Specialist + Developer Tools Architect + Application Security Architect  
**Status:** `RESEARCH COMPLETE — ARCHITECTURE CONDITIONALLY ACCEPTED — LIVE RUNTIME VALIDATION PENDING`  
**Date:** November 2026 (Final Reconciled Audit Baseline)  
**Related Documents:**
- Project Intelligence & AST: [WS1-PROJECT-INTELLIGENCE.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.2-technical-audit/WS1-PROJECT-INTELLIGENCE.md)
- Component Architecture: [WS2-COMPONENT-ARCHITECTURE.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.2-technical-audit/WS2-COMPONENT-ARCHITECTURE.md)
- Registry & Design Tokens: [WS3-REGISTRY-AND-TOKENS.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.2-technical-audit/WS3-REGISTRY-AND-TOKENS.md)
- Browser Verification: [WS4-BROWSER-VERIFICATION.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.2-technical-audit/WS4-BROWSER-VERIFICATION.md)
- Empirical Evidence Trail: [ws5-evidence.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.2-technical-audit/ws5-evidence/ws5-evidence.md)

---

# 1. EXECUTIVE SUMMARY & ARCHITECTURAL MANDATES

Workstream 5 (WS-5) defines the **AI Agent Architecture and Integration Subsystem** for UIForge. It establishes how autonomous coding agents (such as Anthropic Claude Code, Anysphere Cursor, OpenAI Codex, and Google Antigravity) discover, inspect, reason over, mutate, and verify enterprise web frontend applications.

Modern AI coding agents frequently struggle with frontend engineering not because of inadequate LLM reasoning, but because of **impoverished sensory bandwidth** and **unconstrained, non-deterministic action spaces**. Agents are given raw whole-repository dumps that blow token budgets, hallucinate CSS properties, generate non-accessible markup, break existing routing conventions, and lack feedback mechanisms to see if their rendered output actually works in a real browser.

UIForge solves this by serving as an **authoritative project intelligence and verification oracle**. Rather than forcing AI agents into a rigid proprietary harness, UIForge provides deterministic, structured APIs, surgical AST transforms, design token translation, and headless browser validation.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          EXTERNAL CODING AGENTS                                 │
│      Claude Code  │  Cursor Agent  │  Google Antigravity  │  OpenCode / CLI     │
└───────────┬───────────────────┬────────────────────┬────────────────────┬───────┘
            │                   │                    │                    │
            ▼                   ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                             UIFORGE INGRESS LAYER                               │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────┐  │
│  │  @uiforge/mcp-server    │  │  @uiforge/cli           │  │  @uiforge/sdk   │  │
│  │  (stdio / HTTP POST)    │  │  (stdout / JSON / Exit) │  │  (Node.js API)  │  │
│  └────────────┬────────────┘  └────────────┬────────────┘  └────────────┬────┘  │
└───────────────┼────────────────────────────┼────────────────────────────┼───────┘
                │                            │                            │
                ▼                            ▼                            ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      UIFORGE CORE ENGINE (HEXAGONAL CORE)                       │
│                                                                                 │
│   ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐   │
│   │ Project Intelligence│   │  Design Token Engine│   │ Browser Verification│   │
│   │  (AST / Discovery)  │   │   (DTCG / Tailwind) │   │  (Playwright / A11y)│   │
│   │       [WS-1]        │   │        [WS-3]       │   │        [WS-4]       │   │
│   └─────────────────────┘   └─────────────────────┘   └─────────────────────┘   │
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │ 5-Level Security & Permission Ladder (Specified Architecture)           │   │
│   │ [In-memory policy tested; OS path canonicalization & TOCTOU in Phase 03]│   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │ Context Engineering: 5-Layer Token Budget Optimizer (91.2% Reduction)   │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### The Three Foundational Architectural Mandates

This research and architecture specification strictly operationalizes three non-negotiable architectural mandates:

#### Mandate 1: MCP As an Integration Adapter, Not the Core Architecture
Model Context Protocol (MCP) is an RPC transport adapter for exposing tools, resources, and prompt templates over `stdio` and `streamableHttp`. It is **not** an application framework, a business domain model, or an architectural backbone.
- UIForge Core is developed as a pure, headless TypeScript library with internal domain contracts, typed interfaces, and zero runtime dependency on `@modelcontextprotocol/*` packages.
- `@uiforge/mcp-server` is an optional, decoupled ingress adapter that translates incoming JSON-RPC 2.0 requests into UIForge Core API calls.
- UIForge retains its own first-class CLI (`uiforge <command>`) and programmatic Node.js SDK (`import { UIForge } from '@uiforge/sdk'`), ensuring full operational capability in CI pipelines, bash scripts, and environments where MCP is unavailable or unsuited.

#### Mandate 2: Decoupled Agent Integration SDK vs. LLM Provider SDK
A common anti-pattern in developer tooling is coupling agent integration with a specific LLM Provider SDK (e.g., bundling `@anthropic-ai/sdk` or `openai` inside the core engine).
- **The Agent Integration SDK** (`@uiforge/agent-sdk`) standardizes how external agents communicate with UIForge: context packaging, tool schemas, approval requests, and verification diagnostics.
- **The LLM Provider SDK** (model selection, prompt rendering, temperature, streaming tokens, provider billing) belongs strictly to the **calling agent** (Claude Code, Cursor, Codex, Antigravity). Coding agents already have their own fine-tuned models, context management, and proprietary system loops. UIForge does not bundle, wrap, or proxy LLM inference in Core. UIForge is the **environment oracle**, not the model runner.

#### Mandate 3: Single-Agent Primacy ("Earned Complexity")
Industry discourse often promotes complex multi-agent swarms (e.g., autonomous debates between "Architect", "Coder", "Critic", and "Tester" subagents). Controlled cost modeling (**Experiment E8: Simulated Cost Model — Not a Live Agent Benchmark**) illustrates that multi-agent swarms on frontend tasks introduce:
1. **Theoretical Token Multiplication:** The simulation models a **3.28x token overhead** (~22,000 tokens vs. ~6,700 tokens) due to redundant role initialization prompts and inter-agent reasoning transcripts.
2. **Latency Inflation:** Execution time increases (~38s vs ~12.5s simulated) due to sequential turns and synchronization barriers.
3. **State Desynchronization Risk:** When multiple agents independently propose edits to the same filesystem tree, git conflicts and AST desynchronization occur.
- **Architectural Policy:** UIForge adopts **Single-Agent Primacy as a provisional architectural baseline** supported by model simplicity, lower token expenditure, and high tool leverage. Multi-agent orchestration is retained as an optional, advanced pipeline until live comparative agent benchmarks are executed on real production endpoints.

---

# 2. SUB-AREA RESEARCH & TECHNICAL AUDIT (WS5-A THROUGH WS5-L)

## WS5-A: AI Coding Agent Ecosystem Deep Dive

We conducted an in-depth capability, protocol, and UX analysis across five leading AI coding agent architectures (November 2026 baseline).

To maintain absolute research integrity, verification status is explicitly demarcated across all evaluated clients:
$$\text{DOCUMENTATION VERIFIED} \neq \text{CONFIGURATION VERIFIED} \neq \text{CONNECTION TESTED} \neq \text{END-TO-END TESTED}$$

```
┌───────────────────┬────────────────────┬─────────────────┬──────────────────────┬───────────────────────────────┐
│ Agent / Client    │ Primary Interface  │ MCP Support     │ Verification Status  │ Optimal UIForge Integration   │
├───────────────────┼────────────────────┼─────────────────┼──────────────────────┼───────────────────────────────┤
│ Anthropic         │ Terminal CLI       │ Native stdio &  │ DOCUMENTATION        │ Hybrid: @uiforge/mcp-server   │
│ Claude Code       │ (Bash subprocess)  │ Streamable HTTP │ VERIFIED             │ stdio + CLAUDE.md guidelines  │
├───────────────────┼────────────────────┼─────────────────┼──────────────────────┼───────────────────────────────┤
│ Anysphere Cursor  │ VS Code Fork /     │ Native mcp.json │ DOCUMENTATION        │ Dedicated @uiforge/mcp-server │
│                   │ Agent Mode         │ configuration   │ VERIFIED             │ stdio + .cursorrules          │
├───────────────────┼────────────────────┼─────────────────┼──────────────────────┼───────────────────────────────┤
│ OpenCode /        │ Terminal CLI /     │ Native or stdio │ DOCUMENTATION        │ Direct uiforge CLI commands   │
│ Community Agents  │ Headless Agent     │ JSON-RPC bridge │ VERIFIED             │ + JSON stdout streaming       │
├───────────────────┼────────────────────┼─────────────────┼──────────────────────┼───────────────────────────────┤
│ OpenAI Codex /    │ Web, API, IDE      │ Native CLI &    │ DOCUMENTATION        │ Direct JSON Schema contracts  │
│ Canvas            │ extension          │ config files    │ VERIFIED             │ + Programmatic Node.js SDK    │
├───────────────────┼────────────────────┼─────────────────┼──────────────────────┼───────────────────────────────┤
│ Google            │ Sandboxed Agent    │ Native MCP tool │ DOCUMENTATION        │ Full Protocol: GEMINI.md      │
│ Antigravity       │ with Swarm hooks   │ integration     │ VERIFIED             │ + MCP tools + CLI runner      │
└───────────────────┴────────────────────┴─────────────────┴──────────────────────┴───────────────────────────────┘
```

### Detailed Agent Profiles

1. **Anthropic Claude Code:**
   - *Architecture:* High-velocity terminal-native CLI agent executing commands directly in the developer's shell environment.
   - *Tool Model:* Implements custom tool definitions and standard MCP clients over both `stdio` and HTTP transports via `claude mcp add`. Supports auto-approval rules via prefix matching (e.g., auto-approving `uiforge inspect *`).
   - *Context Mechanism:* Automatically reads `CLAUDE.md` from the project root on every turn, prepending it to user instructions. Tools return standard text or JSON blocks.
   - *Verification Status:* `DOCUMENTATION VERIFIED`. While documented by Anthropic, real connection testing with `@uiforge/mcp-server` awaits Phase 03 package builds.

2. **Anysphere Cursor (Agent Mode):**
   - *Architecture:* IDE-integrated agent operating directly over the workspace buffer and terminal.
   - *Tool Model:* Configured via `.cursor/mcp.json`. Automatically discovers tools and resources. Read-only tools run in the background; mutations trigger visual diff reviews.
   - *Context Mechanism:* Semantic codebase indexing combined with `.cursorrules` directives. Context is injected into agent memory via vector search and explicit `@mention` bindings.
   - *Verification Status:* `DOCUMENTATION VERIFIED`. Cursor documents tools, resources, prompts, and multiple transports.

3. **Google Antigravity:**
   - *Architecture:* Advanced autonomous agent combining sandboxed execution, dynamic subagent delegation, and native MCP client registries.
   - *Tool Model:* Operates in a dual-mode sandbox: Standard Sandbox Mode (`BypassSandbox: false`) for local filesystem/build/test tasks, and elevated Bypass Sandbox Mode (`BypassSandbox: true`) requiring explicit human authorization.
   - *Context Mechanism:* Hierarchical context incorporating system instructions, project-level `GEMINI.md` protocols, real-time message boards, and structured markdown artifacts (`.brain/`).
   - *Verification Status:* `DOCUMENTATION VERIFIED`. Aligns with Antigravity's two-phase execution rule (Phase 1 Development vs Phase 2 Commit/Push).

4. **OpenAI Codex & Canvas:**
   - *Architecture:* Cloud-hosted foundation models interacting through OpenAI's Assistants & Function Calling APIs, with expanding desktop CLI MCP support.
   - *Tool Model:* Requires strict JSON Schema tool definitions (`name`, `description`, `parameters`).
   - *Verification Status:* `DOCUMENTATION VERIFIED`. UIForge's tool contracts are defined natively using JSON Schema / Zod, allowing zero-friction export to OpenAI function calling specifications.

---

## WS5-B: Model Context Protocol (MCP) Technical Audit & Modular SDK Baseline

The Model Context Protocol specification has undergone significant maturation. Our audit reconciles the historical baselines with current specifications:

### Official Specification Baselines
- **Current Stable Specification: `2026-07-28`**: Implemented by the current stable **v2 TypeScript SDK**.
- **Maintenance Specification: `2025-11-25`**: Supported by the v1 TypeScript SDK maintenance line.
- **Legacy Specification: `2024-11-05`**: The initial draft protocol baseline.
- **Backward Compatibility:** v2 servers negotiate protocol versions during the initial handshake, supporting clients pinned to older specification lines.

### Modular TypeScript SDK Packages (v2 Architecture)
The monolithic `@modelcontextprotocol/sdk` package has been refactored into focused, modular packages:
1. **`@modelcontextprotocol/server`**: Server runtime, connection lifecycle, and tool/resource/prompt registry.
2. **`@modelcontextprotocol/client`**: Client connection management and remote tool calling abstractions.
3. **`@modelcontextprotocol/core`**: Protocol types, JSON-RPC 2.0 schemas, and protocol-level invariants.
4. **Optional Framework Adapters**: Modular transport bindings for Node.js `http`, Express, Fastify, and Cloudflare Workers.

### Transports & Specific Security Boundaries
1. **`stdio` Transport (Standard Input/Output):**
   - The client spawns the UIForge server as a child process (`node @uiforge/mcp-server/dist/index.js`).
   - Communication occurs via line-delimited or framed JSON-RPC 2.0 over `process.stdin` and `process.stdout`.
   - *Security Isolation:* Inherits local OS file and pipe permissions with zero open network ports. **Authentication Model:** No network authentication or bearer tokens are required; process isolation is maintained by the operating-system process table and pipe boundaries.
   - *Critical Invariant:* **`process.stdout` is strictly reserved for valid JSON-RPC frames**. All logging and diagnostics must be redirected to `process.stderr` to prevent protocol corruption.
2. **`streamableHttp` Transport (2026 Unified Specification):**
   - **Unified POST Endpoint:** A single MCP endpoint accepts all HTTP POST requests.
   - **Legacy GET Endpoint Removed:** The previous separate GET streaming endpoint has been eliminated in favor of unified POST streaming responses.
   - **Protocol Sessions Removed:** Protocol-level sessions have been replaced with standard HTTP transport headers and connection state.
   - *Applicable Remote Security:* When exposed over networks, requires mandatory TLS encryption, HTTP authorization (e.g. Bearer tokens or mTLS), and strict CORS/CSRF origin controls.

---

## WS5-C: MCP vs. Alternatives Decision Matrix

UIForge evaluates five integration patterns to determine where MCP excels and where native alternatives are required:

```
┌─────────────────────────┬──────────────┬───────────────┬────────────────┬───────────────┬────────────────┐
│ Architecture / Protocol │ Tool Calling │ Resource Feed │ Process Latency│ Ecosystem Fit │ Network Capable│
├─────────────────────────┼──────────────┼───────────────┼────────────────┼───────────────┼────────────────┤
│ Model Context Protocol  │ Native       │ Native URI    │ Low (1–5ms     │ High (Claude, │ Yes (Streamable│
│ (MCP) stdio / HTTP      │ JSON Schema  │ subscriptions │ over stdio)    │ Cursor, IDEs) │ HTTP)          │
├─────────────────────────┼──────────────┼───────────────┼────────────────┼───────────────┼────────────────┤
│ Direct Headless CLI     │ Via terminal │ Via stdout /  │ Moderate       │ Universal     │ Requires SSH / │
│ (uiforge <cmd> --json)  │ command exec │ file exports  │ (spawn overhead│ (any agent,   │ remote shell   │
│                         │              │               │ 30–80ms)       │ CI/CD, bash)  │                │
├─────────────────────────┼──────────────┼───────────────┼────────────────┼───────────────┼────────────────┤
│ Language Server Protocol│ Poor (LSP is │ Code analysis │ Low            │ IDEs only;    │ Yes (TCP /     │
│ (LSP)                   │ IDE-centric) │ only          │ (daemon)       │ not for LLMs  │ stdio)         │
├─────────────────────────┼──────────────┼───────────────┼────────────────┼───────────────┼────────────────┤
│ Proprietary JSON-RPC    │ Custom       │ Custom        │ Low            │ Zero external │ Yes            │
│ over WebSockets         │              │               │                │ adoption      │                │
├─────────────────────────┼──────────────┼───────────────┼────────────────┼───────────────┼────────────────┤
│ Provider Function Call  │ Direct API   │ Monolithic    │ Zero local;    │ High (single  │ Remote API     │
│ (OpenAI / Anthropic)    │ JSON Schema  │ prompt inject │ cloud roundtrip│ vendor lock)  │ only           │
└─────────────────────────┴──────────────┴───────────────┴────────────────┴───────────────┴────────────────┘
```

### Architectural Verdict
- **MCP is the optimal protocol for conversational and IDE-integrated agents** because it provides standardized discovery (`tools/list`), structured execution (`tools/call`), and native permission negotiation.
- **CLI is the universal fallback and CI/CD standard**. Any agent with shell execution capabilities can run `uiforge` and parse JSON from stdout.
- **Dual Ingress Architecture**: UIForge implements Core domain capabilities independently, exposing them concurrently through `@uiforge/cli` and `@uiforge/mcp-server`.

---

## WS5-D: Decoupled Agent Integration SDK Architecture

UIForge adopts a **Hexagonal (Ports-and-Adapters) Architecture**. The Core Engine is completely isolated from the execution transport and LLM providers.

```
                           ┌──────────────────────────────┐
                           │      CLI Ingress Adapter     │
                           │         (@uiforge/cli)       │
                           └──────────────┬───────────────┘
                                          │
 ┌──────────────────────────────┐         │          ┌──────────────────────────────┐
 │    MCP Ingress Adapter       │         ▼          │    Programmatic Node SDK     │
 │    (@uiforge/mcp-server)     ├──────► [PORT] ◄────┤    (@uiforge/agent-sdk)      │
 └──────────────────────────────┘         ▲          └──────────────────────────────┘
                                          │
                                          │
                           ┌──────────────┴───────────────┐
                           │   UIFORGE CORE DOMAIN API    │
                           │   - ProjectAnalyzer          │
                           │   - ASTTransformEngine       │
                           │   - TokenNormalizer          │
                           │   - BrowserVerificationOracle│
                           │   - PolicyEngine             │
                           └──────────────────────────────┘
```

### Core Domain Interfaces (TypeScript)

The Agent Integration SDK exposes clean, technology-neutral TypeScript contracts:

```typescript
// packages/agent-sdk/src/contracts/agent-context.ts

export type FrameworkType = 'next-app-router' | 'next-pages-router' | 'vite-react' | 'remix' | 'astro';
export type StylingEngine = 'tailwind-v4' | 'tailwind-v3' | 'css-modules' | 'styled-components';

export interface ProjectIdentityContext {
  framework: FrameworkType;
  reactVersion: string;
  stylingEngine: StylingEngine;
  packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun';
  rootDirectory: string;
}

export interface ComponentSummary {
  name: string;
  filePath: string;
  tier: 'SERVER_STATIC' | 'SERVER_DATA' | 'CLIENT_INTERACTIVE' | 'ISLAND_LEAF';
  dependencies: string[];
  exportedProps: string[];
}

export interface VerificationDiagnostic {
  ruleId: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
  message: string;
  selector?: string;
  wcagCriterion?: string;
  remediationSuggestion?: string;
}

export interface ToolExecutionContext {
  sessionId: string;
  approvalToken?: string;
  workingDirectory: string;
  dryRun?: boolean;
}

export interface ToolExecutionResult<TData = unknown> {
  success: boolean;
  data?: TData;
  error?: {
    code: string;
    message: string;
    recoverable: boolean;
  };
  diagnostics?: VerificationDiagnostic[];
  executionDigest: string; // SHA-256 for audit chaining
}
```

---

## WS5-E: Context Engineering & Token Economy (The 5-Layer Model)

LLMs operate within bounded context windows where unnecessary tokens inflate costs, increase latency, and introduce attention degradation.

UIForge establishes a **5-Layer Progressive Context Architecture**:

```
┌────────────────────────────────────────────────────────────────────────┐
│ LAYER 1: PROJECT IDENTITY & CAPABILITIES (~50 tokens)                  │
│ Framework: Next.js 15 (App) | Styling: Tailwind v4 | PM: pnpm         │
├────────────────────────────────────────────────────────────────────────┤
│ LAYER 2: ARCHITECTURAL ROUTE & COMPONENT TOPOLOGY (~250 tokens)        │
│ Discovered Routes | Key UI Component Inventory | Theme References      │
├────────────────────────────────────────────────────────────────────────┤
│ LAYER 3: TARGETED COMPONENT INTERFACE & AST OUTLINE (~300 tokens)      │
│ Target Component Props | Imported Subcomponents | Variant Interfaces   │
├────────────────────────────────────────────────────────────────────────┤
│ LAYER 4: SURGICAL EVIDENCE & DIAGNOSTIC ENVELOPE (~200 tokens)         │
│ Browser Verification Diffs | WCAG Failures | Broken AST Selectors      │
├────────────────────────────────────────────────────────────────────────┤
│ LAYER 5: EXECUTION BOUNDARIES & PERMISSION TOKENS (~50 tokens)         │
│ Allowed File Paths | Scoped Approval Hash | Rollback Checkpoint ID     │
└────────────────────────────────────────────────────────────────────────┘
```

### Context Compression Benchmark Details (Experiment E4)
In local testing against a synthetic multi-component fixture using a standard character-based heuristic (~4 characters per token):
- **Exact Input Characters:** 9,964 characters (`package.json`, 3 components, `tokens.json`).
- **Estimated Input Tokens:** 2,491 tokens ($\lceil 9964 / 4 \rceil$).
- **Exact Output Characters:** 871 characters (5-layer structured JSON).
- **Estimated Output Tokens:** 218 tokens ($\lceil 871 / 4 \rceil$).
- **Compression Formulas:**
  $$\text{Character Reduction} = \frac{9964 - 871}{9964} \times 100\% = 91.26\%$$
  $$\text{Heuristic Token Reduction} = \frac{2491 - 218}{2491} \times 100\% = 91.2\%$$
- **Deterministic Facts Checked (4/4 via Programmatic Assertions):**
  1. Framework identity (`Next.js 15 (App Router)`).
  2. Target component identifier (`Button`).
  3. TypeScript interface declaration (`ButtonProps`).
  4. Diagnostic contrast finding (`2.54:1` vs `4.5:1`).
- **Methodology Notice:** The ~4 characters-per-token heuristic is an estimation, not a tokenizer measurement (e.g., tiktoken or SentencePiece). This test proves local text compression; evaluating actual agent task completion effectiveness requires live LLM model execution.

---

## WS5-F: Tool Taxonomy & Contract Specification

UIForge organizes its tool capabilities into **Seven Distinct Tool Families**:

```
┌────────────────────────────────┬─────────────────────────────────────────────────────────────────────────┐
│ Tool Family                    │ Purpose & Core Tools                                                    │
├────────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ 1. Discovery & Intelligence    │ Inspect project architecture, detect frameworks, list routes.           │
│                                │ Tools: uiforge_inspect_project, uiforge_discover_routes                  │
├────────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ 2. Component Inspection        │ Deep AST analysis of components, RSC tier, props, and imported styles.  │
│                                │ Tools: uiforge_inspect_component, uiforge_trace_component_tree          │
├────────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ 3. Design Tokens & Theming     │ Query DTCG tokens, resolve OKLCH/Tailwind colors, convert token sets.   │
│                                │ Tools: uiforge_get_tokens, uiforge_resolve_color_contrast               │
├────────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ 4. Component Registry          │ Search open-source registries (shadcn, Radix), fetch schemas.           │
│                                │ Tools: uiforge_search_registry, uiforge_fetch_component_spec            │
├────────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ 5. Surgical AST Mutation       │ Propose and apply verified AST modifications without breaking layout.   │
│                                │ Tools: uiforge_propose_ast_diff, uiforge_apply_ast_mutation            │
├────────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ 6. Headless Browser Oracle     │ Render component or page in Playwright; capture ARIA snapshots and DOM. │
│                                │ Tools: uiforge_verify_url, uiforge_capture_aria_snapshot                │
├────────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ 7. Accessibility Auditor       │ Run axe-core rules, evaluate WCAG 2.2 touch target geometry.            │
│                                │ Tools: uiforge_audit_accessibility, uiforge_check_touch_targets         │
└────────────────────────────────┴─────────────────────────────────────────────────────────────────────────┘
```

### Representative Tool Schema: `uiforge_inspect_component`

```json
{
  "name": "uiforge_inspect_component",
  "description": "Performs read-only AST inspection on a target React component, returning its props interface, RSC tier, imported subcomponents, and accessibility tree structure.",
  "parameters": {
    "type": "object",
    "required": ["componentName"],
    "properties": {
      "componentName": {
        "type": "string",
        "description": "The exact name of the component function or export (e.g. 'Button', 'KpiCard').",
        "minLength": 1,
        "maxLength": 100
      },
      "filePath": {
        "type": "string",
        "description": "Optional relative path to the component file. If omitted, UIForge resolves it via the project symbol index."
      },
      "includeA11y": {
        "type": "boolean",
        "description": "Whether to include static accessibility role and aria-attribute audit data in the response.",
        "default": true
      },
      "depth": {
        "type": "integer",
        "description": "Subcomponent traversal depth (1 to 5).",
        "minimum": 1,
        "maximum": 5,
        "default": 1
      }
    },
    "additionalProperties": false
  }
}
```

---

## WS5-G: Agent Autonomy, Security Boundaries & Permission Specification

UIForge specifies a strict **Five-Level Security and Permission Ladder**:

```
┌─────────┬──────────────────┬───────────────────────┬──────────────────────────────────────────────┐
│ Level   │ Classification   │ Allowed Operations    │ Authorization Gate                           │
├─────────┼──────────────────┼───────────────────────┼──────────────────────────────────────────────┤
│ Level 0 │ OBSERVE          │ Read AST, scan routes,│ Automatic / Unrestricted                     │
│         │                  │ inspect design tokens │ (Zero side-effects)                          │
├─────────┼──────────────────┼───────────────────────┼──────────────────────────────────────────────┤
│ Level 1 │ ANALYZE          │ Generate diagnostics, │ Automatic / Sandboxed                        │
│         │                  │ compute contrast      │ (Zero side-effects)                          │
├─────────┼──────────────────┼───────────────────────┼──────────────────────────────────────────────┤
│ Level 2 │ PROPOSE          │ Compute AST diffs,    │ Automatic proposal;                          │
│         │                  │ draft component specs │ Emits reviewable patch envelope              │
├─────────┼──────────────────┼───────────────────────┼──────────────────────────────────────────────┤
│ Level 3 │ EXECUTE          │ Write modified AST to │ EXPLICIT HUMAN APPROVAL REQUIRED             │
│         │                  │ target disk file      │ Single-use, scoped, time-bounded token       │
├─────────┼──────────────────┼───────────────────────┼──────────────────────────────────────────────┤
│ Level 4 │ VERIFY           │ Spawn headless browser│ Automatic within local sandbox;              │
│         │                  │ run axe-core tests    │ Network egress requires bypass permission    │
└─────────┴──────────────────┴───────────────────────┴──────────────────────────────────────────────┘
```

### Distinction Between Specification and Runtime Implementation
To avoid overclaims, we explicitly distinguish the **specified security architecture** from what was tested:
1. **Tested in Harness (E5):** In-memory policy evaluation logic. Confirmed that policy rules correctly deny unapproved writes, reject out-of-scope targets, recognize expired tokens, and honor revocations.
2. **Specified for Phase 03 Implementation (Not Runtime Validated in Phase 02):**
   - **Path Canonicalization & Symlink Guards:** All paths must resolve via `fs.realpathSync` and verify containment within the project root.
   - **Why `fs.realpathSync` is NOT a Complete TOCTOU Defense:** Resolving a realpath at check time does not prevent a concurrent process from swapping a directory with a symlink before write time. Full TOCTOU protection requires atomic filesystem operations, file descriptor handles (`open` with `O_NOFOLLOW` / `O_EXCL`), or dedicated workspace locking.
   - **Single-Use Binding:** Tokens expire in **60 seconds** and bind strictly to `[ProjectID, TaskID, OperationType, TargetFilePath, ProposedASTDiffHash]`.
   - **Subprocess & Network Isolation:** In standard execution mode, arbitrary child process spawning and external network calls are disabled.

---

## WS5-H: Single-Agent vs. Multi-Agent Orchestration Architecture

### The "Earned Complexity" Doctrine
Many multi-agent frameworks introduce substantial coordination overhead under the assumption that assigning separate agents to code, review, and test improves outcomes.

Our simulated cost model (**Experiment E8: Simulated Cost Model — Not a Live Agent Benchmark**) illustrates the theoretical penalties:

```
┌─────────────────────────────────┬───────────────────────┬───────────────────────┬──────────────────────┐
│ Metric                          │ Single-Agent + Tools  │ Multi-Agent Swarm     │ Simulated Penalty    │
├─────────────────────────────────┼───────────────────────┼───────────────────────┼──────────────────────┤
│ Base Prompt Tokens              │ 3,500 tokens          │ 14,000 tokens (4x)    │ 4.00x                │
│ Intermediate Handoff Tokens     │ 0 tokens              │ 4,800 tokens          │ Infinite             │
│ Execution Tokens                │ 3,200 tokens          │ 3,200 tokens          │ 1.00x                │
│ TOTAL TOKEN CONSUMPTION         │ 6,700 tokens          │ 22,000 tokens         │ 3.28x Bloat          │
│ Simulated Latency               │ 12.5 seconds          │ 38.0 seconds          │ 3.04x Slower         │
│ State Synchronization Conflict  │ Zero (atomic)         │ High (race condition) │ Severe Operational   │
│                                 │                       │ on file modifications │ Risk                 │
└─────────────────────────────────┴───────────────────────┴───────────────────────┴──────────────────────┘
```

### Policy Conclusion
UIForge adopts **Single-Agent Primacy as a provisional architectural baseline**. A single competent agent equipped with deterministic, high-leverage UIForge oracle tools provides predictable execution without token inflation. Multi-agent orchestration is reserved for optional, asynchronous verification pipelines pending empirical live benchmarks.

---

## WS5-I: Human-in-the-Loop & Approval UX Workflows

UIForge treats human oversight as an essential safety gate:
1. **Terminal Interactive Gate (CLI & Claude Code):** Displays a colorful syntax-highlighted character-level diff on stdout and prompts for `[y/N]` confirmation before applying disk changes.
2. **IDE Modal Review (Cursor & VS Code):** Emits a virtual document URI allowing developers to review diffs side-by-side in their editor before accepting.
3. **Auto-Approval Patterns (Antigravity & CI):** Trusted environments can define prefix-match rules (e.g., auto-approving `uiforge inspect *`), while write operations always require explicit authorization.

---

## WS5-J: Security Architecture: Untrusted Content Handling & Prompt Injection Defense

When an AI agent inspects a codebase, it frequently encounters untrusted code in `node_modules`, open-source dependencies, or user pull requests.

### Realistic Security Demarcation (Experiment E6 Findings)
- **Hashing and JSON encapsulation do NOT neutralize prompt injection:** A SHA-256 digest establishes data integrity relative to an expected hash; it is not a digital signature and does not render malicious text harmless.
- **Defense-in-Depth Model:**
  1. **Untrusted Source Classification:** All external code files, comments, and tool outputs are tagged explicitly as `UNTRUSTED_SOURCE_SNIPPET`.
  2. **Comment Filtering:** Strips known HTML comment command blocks (`<!-- SYSTEM OVERRIDE -->`).
  3. **Execution Gate Decoupling:** Even if an agent follows an injected instruction (e.g., "delete all files in app/"), the UIForge Policy Engine terminates the action at Level 3 because no human-approved token exists for that file path.
- *Crucial Security Caveat:* Approval boundaries prevent unauthorized disk writes, but do not guarantee that an agent cannot be manipulated into generating defective code or leaking context through otherwise permitted query tools.

---

## WS5-K: Session Lifecycle, State Management & Crash Recovery

UIForge sessions maintain in-memory and disk-backed state:
- **Idempotency Keys (Experiment E7):** Every mutating tool call requires an `idempotencyKey` (UUIDv4). If a network timeout or agent retry resends the request, UIForge detects the duplicate key and returns the cached outcome without repeating the AST mutation.
- **Process-Level Recovery Requirements:** Real crash recovery across abrupt OS process termination (SIGKILL) requires persisting session journals to an append-only SQLite or JSON file on disk, which remains a Phase 03 engineering deliverable.

---

## WS5-L: Observability, Tracing, Auditability & Secret Redaction

To meet enterprise compliance standards, UIForge records tool invocations and AST modifications in an append-only audit journal.

### Secret Redaction & Hash Chaining (Experiment E9)
- **Credential Scrubbing:** Automated regex filters scrub sensitive credentials (Bearer tokens, database passwords) before log serialization.
- **Tamper-Evident Chaining:** Audit events are linked via SHA-256 digest chaining:
  $$\text{Digest}_n = \text{SHA-256}(\text{Digest}_{n-1} + \text{CanonicalJSON}(\text{Event}_n))$$
- **Integrity Notice:** Hash chaining detects tampering only when anchored to an external, independently trusted checkpoint (such as a remote server digest or signed git commit). Without an external anchor, an attacker with write access to the log file could alter events and recalculate valid hashes.

---

# 3. ARCHITECTURE DECISION RECORDS (ADRS)

### ADR-WS5-01: MCP as an Ingress Adapter Rather Than Core Architecture
- **Status:** ACCEPTED
- **Context:** Deciding whether UIForge should build its internal domain model on top of `@modelcontextprotocol/*` packages.
- **Decision:** UIForge Core domain logic remains completely decoupled from MCP. MCP is implemented strictly as an ingress transport adapter (`@uiforge/mcp-server`) targeting the modular v2 SDK (`2026-07-28` specification) with backward compatibility for `2025-11-25`.
- **Consequences:** UIForge can be run via CLI, programmatic Node.js API, or MCP without code duplication. Future MCP specification shifts do not break UIForge business logic.

### ADR-WS5-02: Complete Decoupling of Agent Integration SDK from LLM Provider SDKs
- **Status:** ACCEPTED
- **Context:** Deciding whether UIForge should bundle LLM client libraries (e.g., Anthropic, OpenAI) to generate code internally.
- **Decision:** UIForge Core will **not** bundle or invoke LLM provider SDKs. Coding agents own their own models and inference loops. UIForge acts exclusively as an environmental intelligence and verification oracle.
- **Consequences:** Zero model API key management inside UIForge; zero provider vendor lock-in; lightweight package footprint.

### ADR-WS5-03: Single-Agent Primacy with Earned-Complexity Progression
- **Status:** ACCEPTED (Provisional Architectural Baseline)
- **Context:** Evaluating single-agent tool execution vs. multi-agent swarm orchestration for frontend tasks.
- **Decision:** Adopt Single-Agent Primacy as the default production standard based on architectural simplicity and simulated token economy. Multi-agent workflows are deferred to optional, parallel verification pipelines until live comparative benchmarks are executed.
- **Consequences:** Eliminates simulated 3.28x token bloat, reduces latency, and avoids file desynchronization risks.

### ADR-WS5-04: 5-Layer Progressive Context Architecture
- **Status:** ACCEPTED
- **Context:** Naive whole-project context dumps consume excessive tokens and degrade LLM reasoning accuracy.
- **Decision:** Implement a 5-layer context hierarchy: L1 (Identity), L2 (Architecture Map), L3 (Targeted Component Excerpt), L4 (Verification Diagnostics), and L5 (Execution Boundaries).
- **Consequences:** Demonstrates a **91.2% measured text reduction** on local test fixtures while preserving critical component interfaces and diagnostic findings.

### ADR-WS5-05: Strict Boundary Validation via JSON Schema & Zod for all Tools
- **Status:** ACCEPTED
- **Context:** Ensuring tool calls from external agents cannot pass malformed, dangerous, or unvalidated payloads.
- **Decision:** All tool parameters are validated at runtime against strict JSON Schema / Zod models with `additionalProperties: false`.
- **Consequences:** Prevents parameter injection attacks and guarantees type safety before invoking underlying AST or filesystem engines.

### ADR-WS5-06: Five-Level Security and Scoped-Approval Permission Ladder with OS Guards
- **Status:** ACCEPTED (Architecture Specified — Runtime Enforcement Phase 03)
- **Context:** Balancing developer safety with agent velocity when modifying codebase files.
- **Decision:** Enforce a 5-tier permission model (Levels 0–4). Level 3 (Mutations) strictly requires single-use, scoped, time-bounded approval tokens combined with execution-time path canonicalization, symlink guards, and TOCTOU checks.
- **Consequences:** In-memory policy logic verified in Phase 02; runtime syscall enforcement and concurrency locking scheduled for Phase 03.

### ADR-WS5-07: Untrusted Content Containment & Execution Permission Gates
- **Status:** ACCEPTED
- **Context:** External files scanned by UIForge may contain malicious instructions designed to hijack the agent.
- **Decision:** All scanned source code snippets are sanitized and packaged inside inert JSON envelopes tagged `UNTRUSTED_SOURCE_SNIPPET`. Real protection relies on Level 3 execution authorization gates that prevent unauthorized writes regardless of model instructions.
- **Consequences:** Establishes defense-in-depth against prompt injection vectors in third-party code.

### ADR-WS5-08: Stdio Transport as Primary Local Channel with Streamable HTTP for Remote Verifiers
- **Status:** ACCEPTED
- **Context:** Selecting transport protocols for MCP communication.
- **Decision:** Use `stdio` as the primary local transport for developer CLI and IDE environments (no network authentication required). Implement unified POST `streamableHttp` (2026 specification) with TLS and Bearer authorization strictly for remote or containerized browser verification microservices.
- **Consequences:** Maximum local security with zero open ports while supporting distributed verification.

### ADR-WS5-09: Chained Audit Logging with Automated Secret Redaction & Anchoring Requirements
- **Status:** ACCEPTED
- **Context:** Maintaining audit compliance and preventing credential leakage in developer logs.
- **Decision:** All tool calls and modifications are logged in an append-only journal where each event is cryptographically hashed and chained to its predecessor. Credentials (tokens, passwords) are automatically redacted before serialization. Full tamper-proofing requires external checkpoint anchoring.
- **Consequences:** Produces high-fidelity audit trails with automated secret redaction.

### ADR-WS5-10: Idempotent Mutation Journaling with AST-Level Checkpoint Rollbacks
- **Status:** ACCEPTED
- **Context:** Recovering from interrupted agent turns or incorrect code generation.
- **Decision:** Every mutating operation generates a rollback checkpoint in the session journal and requires an idempotency key to prevent accidental duplicate writes.
- **Consequences:** Allows one-click rollback of any agent modification and guarantees crash resilience.

---

# 4. RECONCILED EXPERIMENTAL VALIDATION REGISTER (E1 THROUGH E10)

```
┌────┬─────────────────────────────┬────────────────────────┬──────────────────────────────────────────┬──────────┐
│ ID │ Experiment Title            │ Reconciled Class       │ Validated Outcome                        │ Status   │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E1 │ MCP Spec & Modular v2 SDK   │ [DOC/SOURCE-VERIFIED]  │ Audited 2026-07-28 & 2025-11-25 baselines│ VERIFIED │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E2 │ Agent Compatibility Matrix  │ [DOC/SOURCE-VERIFIED]  │ 5 clients audited; DOCUMENTATION VERIFIED│ VERIFIED │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E3 │ Tool Contract Validation    │ [LOCAL-HARNESS-TESTED] │ 3 boundary errors caught; zero escapes   │ VERIFIED │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E4 │ Context Compression Model   │ [LOCAL-HARNESS-TESTED] │ 91.2% text reduction; 4/4 facts retained │ VERIFIED │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E5 │ Permission Policy Logic     │ [LOCAL-HARNESS-TESTED] │ In-memory out-of-scope & revoked blocked │ VERIFIED │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E6 │ Untrusted Code Sanitization │ [REPORTED-SIMULATION]  │ Text filter stripped test keywords       │ VERIFIED │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E7 │ Session State & Idempotency │ [REPORTED-SIMULATION]  │ In-memory duplicate call trapped; cached │ VERIFIED │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E8 │ Single vs Multi-Agent Cost  │ [REPORTED-SIMULATION]  │ Simulated cost model: 3.28x token bloat  │ VERIFIED │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E9 │ Hash-Chain & Selected Redact│ [LOCAL-HARNESS-TESTED] │ Secrets scrubbed; chained digest verified│ VERIFIED │
├────┼─────────────────────────────┼────────────────────────┼──────────────────────────────────────────┼──────────┤
│ E10│ Stdio JSON-RPC Loopback     │ [REPORTED-SIMULATION]  │ Clean JSON-RPC loopback; Phase 03 live   │ VERIFIED │
└────┴─────────────────────────────┴────────────────────────┴──────────────────────────────────────────┴──────────┘
```

---

# 5. RECONCILED ACCEPTANCE SCORECARD (20 EVALUATION CRITERIA)

In strict adherence to independent peer review findings, all 20 criteria are evaluated with complete realism:

```
┌─────┬────────────────────────────────────────────────────────┬──────────────────────┬────────────────────────────────────────┐
│ #   │ Evaluation Criterion                                   │ Reconciled Status    │ Verification Finding / Evidence Base   │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 1   │ MCP Protocol Specification & Transport Audit           │ PASS                 │ E1: Audited 2026-07-28 & 2025-11-25    │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 2   │ AI Coding Agent Compatibility Analysis (5 Clients)     │ PASS                 │ E2: Documented support across 5 clients│
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 3   │ MCP vs. Alternatives Trade-Off Evaluation              │ PASS                 │ WS5-C: Multi-dimensional decision matrix│
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 4   │ Decoupled Agent SDK Architecture (Clean / Hexagonal)   │ PASS                 │ WS5-D: Hexagonal Ports-and-Adapters    │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 5   │ Separation of Agent Integration SDK & LLM Provider SDK │ PASS                 │ Mandate 2 & ADR-WS5-02 formulated      │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 6   │ Context Architecture & Token Benchmark                 │ PARTIAL              │ E4: 91.2% text reduction on heuristic; │
│     │                                                        │                      │ live LLM task effectiveness pending    │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 7   │ Seven Tool Families Taxonomy & Contract Schemas        │ PASS                 │ WS5-F: Zod / JSON Schema tool specs    │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 8   │ Tool Parameter Validation with Strict Boundaries       │ PASS                 │ E3: Strict JSON Schema validator test  │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 9   │ Five-Level Security & Permission Ladder Architecture   │ PARTIAL              │ E5: Policy logic tested in memory;     │
│     │                                                        │                      │ runtime OS filesystem enforcement P03  │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 10  │ Scoped, Time-Bounded Human Approval Token Mechanism    │ PARTIAL              │ E5: Logical token rules tested; binding│
│     │                                                        │                      │ to disk syscalls pending Phase 03      │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 11  │ Single-Agent Cost Model & Architecture Baseline        │ PARTIAL              │ E8: Simulated cost model (3.28x bloat);│
│     │                                                        │                      │ live comparative agent benchmark future│
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 12  │ Human-in-the-Loop Diff Review & Interaction Models     │ PASS                 │ WS5-I: Terminal, IDE, & Auto patterns  │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 13  │ Prompt-Injection Defense Architecture                  │ PARTIAL              │ E6: Comment filter & untrusted tagging;│
│     │                                                        │                      │ prompt injection immunity not proven   │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 14  │ Session State Machine & Crash Recovery Architecture    │ PARTIAL              │ E7: In-memory idempotency verified;    │
│     │                                                        │                      │ process-level disk journal pending P03 │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 15  │ Automated Sensitive Credential Redaction Pipeline      │ PARTIAL              │ E9: Tested on Bearer & password cases; │
│     │                                                        │                      │ comprehensive certified DLP unverified │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 16  │ Tamper-Evident Audit Logging Architecture              │ PARTIAL              │ E9: Hash chaining verified; external   │
│     │                                                        │                      │ checkpoint anchoring pending P03/P04   │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 17  │ 10 Comprehensive Architecture Decision Records (ADRs)  │ PASS                 │ ADR-WS5-01 through ADR-WS5-10 detailed │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 18  │ Live Multi-Agent Swarm Real-World Latency Benchmark   │ NOT ESTABLISHED      │ E8 is a simulated cost model; live     │
│     │                                                        │                      │ real-world benchmark not executed      │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 19  │ Production Desktop IDE MCP Extension End-to-End Test   │ NOT ESTABLISHED      │ E10 is a simulated loopback; live IDE  │
│     │                                                        │                      │ extension test not executed            │
├─────┼────────────────────────────────────────────────────────┼──────────────────────┼────────────────────────────────────────┤
│ 20  │ Multi-Tenant Remote MCP Server Distributed Scaling     │ PARTIAL              │ Architecture & scope analyzed; cloud   │
│     │                                                        │                      │ scaling deferred to Phase 04           │
└─────┴────────────────────────────────────────────────────────┴──────────────────────┴────────────────────────────────────────┘
```

### Scorecard Summary Reconciliation
- **Total Criteria:** 20
- **PASS:** **9** (Criteria 1, 2, 3, 4, 5, 7, 8, 12, 17)
- **PARTIAL:** **9** (Criteria 6, 9, 10, 11, 13, 14, 15, 16, 20)
- **NOT ESTABLISHED:** **2** (Criteria 18, 19)
- **NOT EXECUTED:** **0**
- **BLOCKED:** **0**

**Overall Workstream 5 Status:**  
`RESEARCH COMPLETE — ARCHITECTURE CONDITIONALLY ACCEPTED — LIVE RUNTIME VALIDATION PENDING`

---

# 6. IMPLEMENTATION ROADMAP & PHASE 03 TRANSITION

With the completion of WS-5, all five Phase 02.2 deep technical research workstreams are complete:
- **WS-1:** Project Intelligence, AST Parsing & Framework Detection
- **WS-2:** Component Architecture, RSC Taxonomy & Dynamic Design Systems
- **WS-3:** Component Registries, Design Tokens (DTCG 2025.10) & Styling
- **WS-4:** Browser Verification, Visual Quality & Automated Accessibility
- **WS-5:** AI Agent Architecture, MCP Integration, Context Engineering & Tooling

### Phase 03 Immediate Engineering Deliverables
1. **`@uiforge/core`:** Pure TypeScript core domain containing project scanners, AST engines, token converters, and browser test runners.
2. **`@uiforge/agent-sdk`:** Domain contracts, 5-layer context packaging utilities, and permission policy engines with execution-time path canonicalization.
3. **`@uiforge/cli`:** Command-line executable for human developers and bash-based coding agents.
4. **`@uiforge/mcp-server`:** Standardized MCP stdio server translating tool calls to `@uiforge/core` actions using `@modelcontextprotocol/server` v2.
5. **Project Rules Bundles:** First-class `CLAUDE.md`, `.cursorrules`, and `GEMINI.md` templates embedding UIForge tool invocation patterns into developer repositories.
