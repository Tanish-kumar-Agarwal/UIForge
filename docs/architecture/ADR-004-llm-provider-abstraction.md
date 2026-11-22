# ADR-004: Decoupling LLM Provider Inference from Core Platform
## Separation of Environment Oracles from LLM Reasoning Runtimes

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** AI Systems Architect & Principal Software Architect  

---

## 1. Context & Problem Statement
Many generative AI tools make the architectural mistake of embedding direct LLM provider API clients (e.g. `@anthropic-ai/sdk`, `openai`) directly into their core domain engines. This forces the tool to:
1. Resell, meter, or bill for AI tokens.
2. Hardcode prompt templates that quickly become obsolete as models evolve.
3. Manage user API keys and handle provider outages.
4. Compete with the developer's chosen AI coding assistant rather than complementing it.

We must define UIForge's boundary regarding LLM inference providers.

---

## 2. Decision Constraints
1. **Core Invariant:** UIForge must operate as the **deterministic environment oracle and execution gatekeeper**, NOT as an LLM reasoning engine.
2. **Zero Mandatory LLM Cost:** Developers must be able to use UIForge Core for project analysis, token compilation, component searching, and browser verification completely free without an LLM API key.
3. **Agent Ownership:** External agents (Claude Code, Cursor, OpenCode) supply their own intelligence, context windows, and model subscriptions.

---

## 3. Options Considered
- **Option 1: Embedded Multi-Model Gateway in Core:** Embed OpenAI, Anthropic, and Gemini SDKs directly in `@uiforge/core`; require users to supply API keys or subscribe to a UIForge AI proxy.
- **Option 2: Strict Decoupling (UIForge as Tool Provider via MCP):** Core has zero direct LLM dependencies. External agents bring their own models and call UIForge tools over MCP.
- **Option 3: Hybrid with Optional Plugin SDK (`@uiforge/llm-provider`):** Core remains 100% deterministic and free. An optional, decoupled SDK (`@uiforge/llm-provider`) provides pluggable inference adapters only for standalone CLI features (e.g. `uiforge design brief "prompt"`).

---

## 4. Evaluation of Options

| Criteria | Option 1: Embedded Gateway | Option 2: Pure MCP Tool | Option 3: Hybrid Decoupled |
| :--- | :--- | :--- | :--- |
| **Core Determinism** | Low (non-deterministic Core) | 100% Deterministic | 100% Deterministic |
| **Free / Offline Capability** | Broken without API key | 100% Offline | 100% Offline for Core |
| **Vendor Neutrality** | Fragile API key management | Perfect (agent brings model)| Perfect |
| **Standalone CLI Ergonomics** | Good | Requires external agent | Excellent (pluggable inference) |

---

## 5. Decision Outcome
**Selected Option:** **Option 3: Hybrid Decoupled Architecture.**

### Architectural Specification:
1. **Headless Core Invariant:** `@uiforge/core`, `@uiforge/project-intelligence`, `@uiforge/tokens`, `@uiforge/safe-modifier`, and `@uiforge/browser-eval` have **ZERO dependencies on LLM provider SDKs**.
2. **MCP Agent Primacy:** Autonomous coding agents (Claude Code, Cursor, OpenCode) execute their own model inference and invoke UIForge via MCP tools. UIForge never charges for or touches the agent's LLM tokens.
3. **Optional Standalone Adapter (`@uiforge/llm-provider`):** For users invoking generative features directly from the terminal without an agent (e.g. `uiforge design brief`), an optional pluggable adapter supports standard Vercel AI SDK (`OS-AGNT-08`) interfaces or local Ollama endpoints.

---

## 6. Consequences & Impact
- **Positive:**
  - UIForge remains 100% useful, free, and functional offline as a design system, analysis, and verification platform.
  - Zero liability for model hallucinations in core evaluation metrics.
  - Developers use their existing AI subscriptions (Claude Pro, ChatGPT Plus, GitHub Copilot) without double-paying.
- **Negative:**
  - Standalone generative CLI commands require users to configure an optional provider or connect via an MCP agent.

---

## 7. Security & Operational Impact
- Eliminates central storage of sensitive user LLM API keys in UIForge Core.
- Eliminates SSRF risks associated with proxying third-party AI APIs.

---

## 8. Research References
- Phase 02.2: `MASTER-ARCHITECTURE.md` (Agent & Model Decoupling Invariant).
- Phase 02.4: `sources.json` (`OS-AGNT-08` Vercel AI SDK, Tier 1).

---

## 9. Open Questions
- None. Model decoupling invariant is frozen.
