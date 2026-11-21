# Category 12 — AI Agent Skills, MCP & Developer Ecosystem

**Document ID:** `UIF-CAT-010`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Category Focus:** Model Context Protocol (MCP), Coding Agent Platforms & Tool Schemas  
**Date:** November 2026  

---

## 1. Category Overview

Rather than competing with general-purpose programming agents, UIForge acts as their **frontend engineering intelligence coprocessor**. This category audits the protocols, agent platforms, and tool-calling frameworks that enable seamless interoperability.

---

## 2. In-Depth Comparative Analysis

| Candidate ID | Project & URL | License | Type | Integration Mechanism | UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `OS-AGNT-01` | **MCP TypeScript SDK** (`modelcontextprotocol/typescript-sdk`) | MIT | Protocol SDK | Standard JSON-RPC 2.0 transport over `stdio` and SSE. | **`[DEP]` Foundational Protocol Bus (P0)** |
| `OS-AGNT-02` | **OpenCode** (`anomalyco/opencode`) | MIT | Terminal Agent | Local CLI agent with Plan (read-only) and Build (execute) modes. | **`[INT]` Primary Open-Source Partner (P0)** |
| `OS-AGNT-03` | **Claude Code** (`anthropics/claude-code`) | Proprietary CLI | Terminal Agent | Anthropic terminal CLI agent supporting MCP servers and Agent Skills. | **`[INT]` Primary Agent Partner (P0)** |
| `OS-AGNT-04` | **Cursor** (`cursor.com`) | Proprietary IDE | AI-Native IDE | Connects via MCP configuration and `.cursorrules` in project root. | **`[INT]` Primary Host IDE (P0)** |
| `OS-AGNT-05` | **Windsurf** (`codeium.com/windsurf`) | Proprietary IDE | AI-Native IDE | Connects via Cascade agent MCP settings. | **`[INT]` Host IDE Environment (P1)** |
| `OS-AGNT-06` | **Continue** (`continuedev/continue`) | Apache-2.0 | IDE Agent | Acquired by Cursor; repository officially archived and read-only. | `[REF]` Historical Reference (P2) |
| `OS-AGNT-08` | **Vercel AI SDK** (`vercel/ai`) | Apache-2.0 | Inference SDK | TypeScript SDK for streaming UI, tool calling, and structured JSON output. | `[DEP]` / `[REF]` Provider SDK Layer (P1) |
| `OS-AGNT-11` | **Cline** (`cline/cline`) | Apache-2.0 | VS Code Agent | Autonomous VS Code coding agent with native MCP client support. | `[INT]` Supported MCP Client (P1) |
| `OS-AGNT-12` | **Roo Code** (`RooVetGit/Roo-Code`) | Apache-2.0 | VS Code Agent | Popular Cline community fork with multi-role agent configuration. | `[INT]` Supported MCP Client (P1) |

---

## 3. The Model Context Protocol (MCP) Primitive Architecture

UIForge's `@uiforge/mcp-server` leverages the official `@modelcontextprotocol/sdk` to expose three canonical primitives:

1. **MCP Tools (Executable Actions)**:
   - `uiforge_analyze_project`: Statically analyzes local project architecture, installed component libraries, and active CSS systems in read-only mode.
   - `uiforge_evaluate_page`: Launches headless Playwright to audit rendered DOM for responsive overflow and axe-core accessibility defects.
   - `uiforge_generate_patch`: Creates a scoped, review-gated unified `.patch` file for an existing codebase.
2. **MCP Resources (Read-Only Context URIs)**:
   - `uiforge://tokens/current`: Exposes active DTCG design tokens.
   - `uiforge://components/index`: Exposes verified component registry manifest.
   - `uiforge://audit/latest`: Returns the raw JSON results of the most recent evaluation run.
3. **MCP Prompts (Workflow Blueprints)**:
   - `uiforge_scaffold_view`: Structured prompt template guiding the agent step-by-step through architecture, token selection, markup synthesis, and browser verification.
