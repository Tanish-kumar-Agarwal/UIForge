# UIForge Research — AI Agent Platforms, MCP & Tooling Ecosystem

**Document ID:** `UIF-OS-005`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Status:** Agent Interoperability Architecture Reference  
**Date:** November 2026  

---

## 1. Overview of the Agent Ecosystem

UIForge is explicitly **not** another general-purpose coding agent. It is an **AI-powered Frontend Engineering Intelligence Harness & Coprocessor**.

General-purpose coding agents excel at multi-file search, shell command execution, git operations, and backend logic. However, they lack specialized **frontend engineering intelligence**—specifically, proactive design token enforcement, component discovery across existing repositories, multi-viewport responsive rendering, automated accessibility verification, and non-destructive AST patch generation.

By providing a standardized **Model Context Protocol (MCP)** server and CLI, UIForge acts as a specialized coprocessor for all major coding agents:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        AGENT INTEROPERABILITY ARCHITECTURE                             │
│                                                                                        │
│   ┌────────────────────┐   ┌────────────────────┐   ┌──────────────────────────────┐   │
│   │ Claude Code (CLI)  │   │  OpenCode (Local)  │   │ Cursor / Windsurf / Cline    │   │
│   └─────────┬──────────┘   └─────────┬──────────┘   └──────────────┬───────────────┘   │
│             │                        │                             │                   │
│             └────────────────────────┼─────────────────────────────┘                   │
│                                      │                                                 │
│                                      │ Transport: JSON-RPC 2.0 (stdio / SSE)           │
│                                      ▼                                                 │
│             ┌────────────────────────────────────────────────────────┐                 │
│             │             @uiforge/mcp-server (TypeScript)           │                 │
│             │  Built on: @modelcontextprotocol/sdk (P0 Foundational) │                 │
│             └────────────────────────┬───────────────────────────────┘                 │
│                                      │                                                 │
│                     ┌────────────────┴────────────────┐                                │
│                     ▼                                 ▼                                │
│       ┌──────────────────────────────┐  ┌──────────────────────────────┐               │
│       │        MCP TOOLS             │  │        MCP RESOURCES         │               │
│       │ • uiforge_analyze_project    │  │ • uiforge://tokens/current   │               │
│       │ • uiforge_evaluate_page      │  │ • uiforge://components/index │               │
│       │ • uiforge_discover_comp      │  │ • uiforge://audit/latest     │               │
│       │ • uiforge_generate_patch     │  │ • uiforge://rules/active     │               │
│       └──────────────────────────────┘  └──────────────────────────────┘               │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. In-Depth Audit of Target AI Coding Agents

### 2.1 Claude Code (Anthropic)
- **Candidate ID:** `OS-AGNT-03` | **Maintainer:** Anthropic
- **Runtime & Execution:** Node.js CLI running in the developer's terminal. Interacts directly with local files, executes shell commands, and supports external MCP servers. `[DOC-VERIFIED]`
- **Frontend Capabilities & Limitations:**
  - *Strength:* State-of-the-art multi-file code editing, complex TypeScript refactoring, and logical reasoning. `[PRODUCT-TESTED]`
  - *Limitation:* Lacks native headless browser evaluation; cannot visually inspect mobile responsive reflow or execute axe-core audits autonomously without external tool integration. Generates generic Tailwind utility classes unless constrained by strict token rules. `[PRODUCT-TESTED]`
- **UIForge Integration Strategy:**
  1. **MCP Server Integration:** Configured in `claude_desktop_config.json` or local CLI flags:
     ```json
     {
       "mcpServers": {
         "uiforge": {
           "command": "npx",
           "args": ["@uiforge/mcp-server"]
         }
       }
     }
     ```
  2. **Agent Skills Integration:** Exposes standardized `SKILL.md` workflows (`uiforge-design-system`, `uiforge-a11y-audit`).

### 2.2 OpenCode (Anomaly / SST)
- **Candidate ID:** `OS-AGNT-02` | **Maintainer:** Anomaly Co. / SST Community
- **Runtime & Execution:** Open-source terminal agent supporting 75+ LLM endpoints (Claude, GPT-4o, DeepSeek, local Ollama). Features dual agent roles: **Plan Agent** (read-only exploration) and **Build Agent** (full write/execute permissions). `[DOC-VERIFIED]`
- **Frontend Capabilities & Limitations:**
  - *Strength:* 100% open-source, model-agnostic, local-first terminal interface with built-in LSP integration. `[PRODUCT-TESTED]`
  - *Limitation:* Highly susceptible to generic "AI-slop" aesthetics, missing ARIA tags, and mobile horizontal overflow when using open-weights models without strict design tokens and verification loops. `[PRODUCT-TESTED]`
- **UIForge Integration Strategy:**
  - Direct MCP server integration via OpenCode's configuration.
  - UIForge's Plan/Build distinction aligns perfectly with OpenCode's architecture: UIForge Workflow B provides read-only AST analysis for the Plan Agent, and scoped patch application for the Build Agent.

### 2.3 Cursor (Anysphere)
- **Candidate ID:** `OS-AGNT-04` | **Maintainer:** Anysphere Inc.
- **Runtime & Execution:** AI-native code editor (VS Code fork) with deep semantic workspace indexing, shadow workspaces, Composer multi-file agent, and native MCP support. `[DOC-VERIFIED]`
- **Frontend Capabilities & Limitations:**
  - *Strength:* Instant multi-file diff visualization, fast local indexing, and seamless in-editor code review. `[PRODUCT-TESTED]`
  - *Limitation:* Requires developers to manually launch a dev server and inspect pages in an external browser; lacks automated headless Playwright/axe-core evaluation loops. `[PRODUCT-TESTED]`
- **UIForge Integration Strategy:**
  - UIForge operates as an MCP extension in Cursor's settings.
  - Exposes project tokens and component registry indexes directly to Composer prompt context.

### 2.4 Windsurf (Codeium)
- **Candidate ID:** `OS-AGNT-05` | **Maintainer:** Codeium Inc.
- **Runtime & Execution:** AI-native IDE featuring the Cascade agentic engine, real-time codebase indexing, and multi-file editing with full terminal tool execution. `[DOC-VERIFIED]`
- **Frontend Capabilities & Limitations:**
  - *Strength:* Seamless collaborative flow between user and agent in the editor. `[PRODUCT-TESTED]`
  - *Limitation:* General-purpose software engineering tool without specialized frontend design intelligence or automated visual regression checks. `[NOT-SUPPORTED]`
- **UIForge Integration Strategy:** Configured via Windsurf's MCP integration panel.

### 2.5 Cline & Roo Code
- **Candidate ID:** `OS-AGNT-11` & `OS-AGNT-12` | **Maintainer:** Open-source community
- **Runtime & Execution:** Open-source autonomous coding agent extensions for VS Code with custom mode switching (Architect, Code, Ask, Test) and MCP server integration. `[DOC-VERIFIED]`
- **UIForge Integration Strategy:** Supported host environments via standard stdio MCP transport.

---

## 3. Separation of Concerns: Agent Integration vs. LLM Provider SDKs

A critical architectural invariant for UIForge is the **strict decoupling of the Agent Integration SDK from the LLM Provider SDK**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ARCHITECTURAL DECOUPLING                        │
├────────────────────────────────────┬───────────────────────────────────┤
│ A. AGENT INTEGRATION SDK           │ B. LLM PROVIDER SDK               │
├────────────────────────────────────┼───────────────────────────────────┤
│ Scope: Communication WITH coding   │ Scope: Communication WITH model   │
│ agents (Claude Code, OpenCode).    │ endpoints (Anthropic API, OpenAI).│
│                                    │                                   │
│ Primitives:                        │ Primitives:                       │
│ • Model Context Protocol (MCP)     │ • Token usage & pricing tracking  │
│ • JSON-RPC stdio/SSE transports    │ • Structured JSON schema outputs  │
│ • Tool definitions & parameters    │ • Streaming chunk management      │
│ • Resources (uiforge:// URIs)      │ • Rate-limit exponential backoff  │
│ • Agent Skills (SKILL.md)          │ • Model snapshot invariance       │
│ • Unified patch (.patch) approvals │ • Multi-provider failover         │
└────────────────────────────────────┴───────────────────────────────────┘
```

### Why Decoupling Matters:
1. **Agent Agnosticism**: When a developer uses Claude Code, Claude acts as the reasoning engine and file editor. UIForge does **not** call Anthropic's API directly; it merely answers Claude's MCP tool calls.
2. **Provider Agnosticism**: When UIForge Studio or autonomous evaluation scripts need to run internal LLM inference (e.g., summarizing an accessibility violation into a recommended patch), it calls the LLM Provider SDK independently, without coupling to any specific agent harness.
3. Combining these two abstractions creates fragile monoliths that break whenever an agent client updates its transport format or a model provider updates its SDK.

---

## 4. Agent Skills Standard (`SKILL.md`)

In addition to programmatic MCP tools, UIForge will package its domain engineering intelligence as modular, human-readable **Agent Skills**:

- **Format:** Standard `SKILL.md` with YAML frontmatter:
  ```markdown
  ---
  name: uiforge-design-system
  description: Discovers and enforces design tokens, color scales, and typography in UIForge projects.
  tools:
    - uiforge_get_tokens
    - uiforge_lint_styles
  ---
  # UIForge Design System Skill
  When implementing or modifying UI components:
  1. Always query `uiforge://tokens/current` before generating color or spacing classes.
  2. Never use arbitrary inline values (e.g. `bg-[#1a2b3c]`). Use semantic token variables.
  3. Ensure all interactive buttons maintain a minimum 44x44px touch target on mobile viewports.
  ```
- **Portability:** Supported natively by Antigravity, Claude Code, and community agent runners.
