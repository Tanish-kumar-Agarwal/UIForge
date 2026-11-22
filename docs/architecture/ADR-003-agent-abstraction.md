# ADR-003: Autonomous Agent Abstraction & Model Context Protocol (MCP) Integration
## Standardized Agent Ingress, Stateless Protocol Negotiation & Capability Boundaries

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** AI Systems Architect & Principal Software Architect  

---

## 1. Context & Problem Statement
UIForge must empower external autonomous coding agents (Claude Code, Cursor, OpenCode, OpenAI Codex, Google Antigravity) to understand and modify frontend codebases without:
1. Coupling UIForge Core to any specific LLM provider or proprietary agent runtime.
2. Allowing agents to make unverified, destructive file mutations.
3. Forcing agents into slow, repetitive trial-and-error reasoning loops.

We must define a stable, protocol-level agent integration abstraction.

---

## 2. Decision Constraints
1. **Industry Protocol Standard:** Must adopt the Model Context Protocol (MCP) as the primary agent communication standard.
2. **Modern Protocol Compliance (Finding C20 & C27):** Must implement modern MCP revision `2026-07-28` (stateless discovery via `server/discover` and request `_meta` headers) while providing automatic fallback (`versionNegotiation: { mode: "auto" }`) to legacy revisions `2025-11-25` and `2024-11-05`.
3. **Dual Transport:** Must support both `stdio` (for local subprocess agents) and Streamable HTTP (`POST /mcp` for network/remote agents).
4. **Fail-Closed Mutation Gating:** Agents cannot directly execute filesystem writes; all mutations must halt and request human authorization tokens.

---

## 3. Options Considered
- **Option 1: Proprietary Agent Extension Plugins (Custom VS Code / Claude Code Plugins):** Write bespoke plugin extensions for each individual coding agent.
- **Option 2: Direct LLM Prompt Injection via CLI Only:** Expect users to manually copy CLI markdown outputs into agent chat windows.
- **Option 3: Official Model Context Protocol (MCP 2026-07-28) Server + Typed Agent SDK:** Implement standard MCP server exposing typed Zod tools, paired with an open-source `@uiforge/agent-sdk`.

---

## 4. Evaluation of Options

| Criteria | Option 1: Bespoke Plugins | Option 2: Copy-Paste CLI | Option 3: Standard MCP Server |
| :--- | :--- | :--- | :--- |
| **Agent Ecosystem Reach** | Fragmented across tools | Universal but manual/slow | Universal across all MCP clients |
| **Maintenance Burden** | High (maintain 5+ plugins) | Low | Low (single standard server) |
| **Automation & Speed** | High | Very Low (human copy-paste) | High (automated tool calling) |
| **Security & Auditing** | Inconsistent across agents | Human reviews everything | Centrally enforced via 5-level ladder |

---

## 5. Decision Outcome
**Selected Option:** **Option 3: Official Model Context Protocol (MCP 2026-07-28) Server + Typed Agent SDK.**

### Architectural Specification:
1. **Transport & Protocol Negotiation:**
   - Package: `@uiforge/mcp-server` wrapping `@modelcontextprotocol/server` (`^2.1.0`).
   - Discovery: Modern clients discover server capabilities via `server/discover`. Requests carry protocol versions in `_meta`.
   - Automatic Fallback: Configured with `versionNegotiation: { mode: "auto" }` to automatically negotiate down to legacy `2025-11-25` and `2024-11-05` initialize handshakes.
2. **Standard Advertised Tools:**
   - `analyze_project`: Returns route trees, styling conventions, active tokens.
   - `extract_tokens`: Returns parsed W3C DTCG token dictionary.
   - `search_components`: Queries approved component registries (shadcn model).
   - `verify_in_browser`: Executes headless Playwright render and returns screenshot + a11y score.
   - `propose_modification`: Submits a proposed AST diff for human authorization.
3. **Permission Interception:**
   - Any tool invocation requiring Level 2+ filesystem writes halts execution and returns error code `uiforge.error.approval_required` with a signed authorization challenge.

---

## 6. Consequences & Impact
- **Positive:**
  - Zero lock-in: works with Claude Code, Cursor, OpenCode, Antigravity, and any future MCP client out of the box.
  - Agents receive real, rendered browser feedback (layout coordinates, computed styles, visual diffs) rather than guessing.
  - Security is mathematically guaranteed by the diff-bound authorization token protocol.
- **Negative:**
  - Requires agents to support MCP tool calling.

---

## 7. Security & Operational Impact
- Agent payloads are treated as untrusted input. Tool arguments pass strict Zod validation. Prompt injection attacks cannot escape to arbitrary OS command execution.

---

## 8. Research References
- Phase 02.2: `WS5-AGENT-ARCHITECTURE-MCP-TOOLING.md`.
- Phase 02.5: Findings C20 & C27 (MCP 2026-07-28 stateless protocol model).
- Phase 02.5: Finding C36 (`anomalyco/opencode` Tier 0 agent reference patterns).

---

## 9. Open Questions
- Runtime live wire socket benchmarking is tracked for Phase 04 setup.
