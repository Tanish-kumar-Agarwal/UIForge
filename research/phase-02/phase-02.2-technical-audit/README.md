# UIForge Phase 02.2 — Technical Repository Audit & Architectural Decisions

**Parent Phase:** Phase 02 — Open-Source Ecosystem & Technical Architecture Research  
**Workstream:** Phase 02.2: Deep Technical Audit & Architectural Decisions  
**Document Identifier:** `UIF-PH02-TECH-AUDIT-INDEX`  
**Status:** WS-1, WS-2, WS-3, WS-4, WS-5 COMPLETE & AUDITED (Phase 02.2 Complete)  
**Date:** November 21, 2026  

---

## 1. Executive Mission & Workstream Structure

Phase 02.2 transitions UIForge from high-level ecosystem discovery (Phase 02.1) into deep, evidence-based technical audits, architecture decisions, and empirical benchmarks.

Rather than building competing component libraries or proprietary compilers, UIForge implements a **Frontend Engineering Intelligence Platform** designed to equip AI coding agents with AST-aware project intelligence, semantic design token manipulation, cross-paradigm styling transformations, deterministic browser verification, and standardized Model Context Protocol (MCP) tooling.

Phase 02.2 is organized into five rigorous technical workstreams:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PHASE 02.2 TECHNICAL AUDIT WORKSTREAMS                         │
├─────────────────────────┬──────────────────────────┬───────────────────────────────────┤
│ Workstream              │ Status                   │ Master Architectural Report       │
├─────────────────────────┼──────────────────────────┼───────────────────────────────────┤
│ WS-1: Project Intel &   │ COMPLETE & RECONCILED    │ WS1-PROJECT-INTELLIGENCE.md       │
│ Safe Code Transformation│                          │                                   │
├─────────────────────────┼──────────────────────────┼───────────────────────────────────┤
│ WS-2: Component &       │ COMPLETE & RECONCILED    │ WS2-COMPONENT-ARCHITECTURE.md     │
│ Design-System Arch      │                          │                                   │
├─────────────────────────┼──────────────────────────┼───────────────────────────────────┤
│ WS-3: Registry, Tokens  │ COMPLETE & RECONCILED    │ WS3-REGISTRY-AND-TOKENS.md        │
│ & Styling Architecture  │                          │                                   │
├─────────────────────────┼──────────────────────────┼───────────────────────────────────┤
│ WS-4: Browser Testing,  │ COMPLETE & AUDITED       │ WS4-BROWSER-VERIFICATION.md       │
│ Visual Quality & A11y   │                          │                                   │
├─────────────────────────┼──────────────────────────┼───────────────────────────────────┤
│ WS-5: AI Agent Arch,    │ COMPLETE & AUDITED       │ WS5-AGENT-ARCHITECTURE-MCP-       │
│ MCP, SDK & Tooling      │                          │ TOOLING.md                        │
└─────────────────────────┴──────────────────────────┴───────────────────────────────────┘
```

---

## 2. Workstream Summaries

### Workstream 1 (WS-1): Project Intelligence & Safe Code Transformation
- **Report File:** [WS1-PROJECT-INTELLIGENCE.md](WS1-PROJECT-INTELLIGENCE.md)
- **Key Architectures:**
  - **TypeScript 7.0 vs. 7.1 Beta**: Evaluates the native Go compiler (released July 8, 2026; 8–12× CLI build speedup) against the programmatic Compiler API. Pins `@typescript/typescript6@6.0.2` as production-safe fallback while evaluating TypeScript 7.1 Beta entry points (`typescript/sync`, `typescript/async`, `typescript/fs`).
  - **Toolchain Matrix**: Pinned baselines for `ts-morph` (`v28.0.0`), `ast-grep` (`v0.51.3`), `oxc-parser` (`v0.159.0`), and `biome` (`v2.6.8`).
  - **Four-Layer Capability-Based Orchestrator**: Replaces monolithic AST pipelines with specialized layers (Fast Structural Grep ➔ CST Non-Destructive Rewriting ➔ Semantic Graph ➔ Full Type-Check Fallback).
  - **Three Inviolable Safe Transformation Rules**: (1) Never overwrite unrelated user work; (2) Scope atomicity honestly; (3) Never claim rollback restores everything unless it actually does (documenting unmanaged npm cache state).
- **Empirical Evidence:** Experiments E1–E7 recorded in [ws1-evidence.md](../experiments/evidence/ws1-evidence.md).

---

### Workstream 2 (WS-2): Component & Design-System Architecture
- **Report File:** [WS2-COMPONENT-ARCHITECTURE.md](WS2-COMPONENT-ARCHITECTURE.md)
- **Key Architectures:**
  - **Primitive Foundations**: Reconciles Base UI v1.0.0 release history (stable Dec 11, 2025; v1.2.0 Feb 12, 2026). Qualifies Base UI, Radix UI, React Aria, and Zag/Ark state-machine architectures.
  - **Four-Tier RSC Boundary Taxonomy**: Tier 1 (Server-Pure), Tier 2 (Resolved Entry Point Preserves `'use client'`), Tier 3 (Client Wrapper Boundary), Tier 4 (Client-Exclusive SPA).
  - **Four-Tier Accessibility Verification**: Tier 1 (`axe-core` automated scanning), Tier 2 (Playwright keyboard interaction traces), Tier 3 (ARIA accessibility tree snapshots), Tier 4 (Manual screen reader protocols).
  - **Two-Stage Component Selection Engine**: Mode-Specific Eligibility Gates (Hard Pass/Fail) followed by Multi-Dimensional Weighted Ranking favoring existing codebase patterns.
  - **Normalized Component Data Model**: Standardizes abstract component definitions, empirical verification records, and multi-source provenance manifests.

---

### Workstream 3 (WS-3): Registry, Tokens & Styling Architecture
- **Report File:** [WS3-REGISTRY-AND-TOKENS.md](WS3-REGISTRY-AND-TOKENS.md)
- **Key Architectures:**
  - **Official shadcn Registry Audit**: Validates all 12 item types (`registry:base`, `registry:component`, `registry:font`, `registry:page`, `registry:file`, `registry:style`, `registry:theme`, `registry:item`, `registry:ui`, `registry:block`, `registry:hook`, `registry:lib`). Clarifies that `cssVars` supports complete CSS color functions (including OKLCH strings).
  - **W3C DTCG 2025.10 Specification**: Clarifies stable Community Group status (not Standards Track). Adopts canonical Color Module with `components` property (not `channels`). Models all 13 token types and composite array structures (font stacks, gradient stops, multi-layer shadows).
  - **Token Architecture & Theming**: 5-tier storage architecture; group-level `$type` inheritance; `$deprecated` metadata propagation; `MultiDimensionalResolverContext` (modes across contrast, brand, platform, density).
  - **Cross-Paradigm Styling & Cascade Specificity**: Tailwind v3 vs v4 (`@theme`); CSS Modules scoping (`:root` document-global vs component-scoped classes); CSS Cascade Level 5 specificity audit proving unlayered CSS Modules override `@layer components` utilities.
  - **Bounded 14-Conversion Matrix**: Rigorously distinguishes *Value Preservation* (visual match) from *Semantic Preservation* (metadata survival) across 14 conversion vectors.
  - **Style Dictionary Decoupling & Supply Chain Security**: Pinned `style-dictionary@5.8.0` (CVE-2026-54639 mitigated in `5.4.4`). Threat mitigations for SSRF, path traversal, prototype pollution, and npm lifecycle script isolation (`--ignore-scripts`).
  - **Multi-File Journaled Rollback**: Snapshot-based SHA-256 restoration engine with honest boundaries distinguishing filesystem state from unmanaged npm cache state.
- **Empirical Evidence:** Experiments E1–E8 recorded in [ws3-evidence.md](../experiments/evidence/ws3-evidence.md).

---

### Workstream 4 (WS-4): Browser Verification, Visual Quality & Automated Testing
- **Report File:** [WS4-BROWSER-VERIFICATION.md](WS4-BROWSER-VERIFICATION.md)
- **Status:** RESEARCH COMPLETE — ARCHITECTURE CONDITIONALLY ACCEPTED — LIVE VALIDATION PENDING
- **Key Architectures:**
  - **Browser Automation Core:** Playwright adopted as primary automation engine (Chromium, Firefox, WebKit); technology-neutral `IBrowserAdapter`.
  - **Local-First Visual Evaluation:** Two-layer engine pairing Pixelmatch v8 (OKLab/HyAB) with bounding box dynamic content masking and strict human-governed baseline approvals.
  - **Four-Tier Accessibility Protocol:** Demarcates automated static checks (12/55 criteria), browser keyboard traces (23/55 criteria), and manual assistive tech reviews (20/55 criteria).
  - **Layout Geometry Engine:** Programmatic detection of document horizontal overflow (`HTML.scrollWidth > innerWidth`), boundary breaches, element occlusion, and WCAG 2.5.8 candidate touch target findings.
  - **Cryptographic Digest Evidence Records:** Tamper-evident `VerificationEvidenceRecord` with SHA-256 digests (`recordDigest`), correlated DOM/style snapshots, and actionable diagnostic envelopes for AI agent AST repair.
- **Empirical Evidence:** Experiments E1–E8 recorded in [ws4-evidence/ws4-evidence.md](ws4-evidence/ws4-evidence.md).

---

### Workstream 5 (WS-5): AI Agent Architecture, Model Context Protocol (MCP), Agent SDK & Tooling
- **Report File:** [WS5-AGENT-ARCHITECTURE-MCP-TOOLING.md](WS5-AGENT-ARCHITECTURE-MCP-TOOLING.md)
- **Status:** RESEARCH COMPLETE — ARCHITECTURE CONDITIONALLY ACCEPTED — LIVE RUNTIME VALIDATION PENDING
- **Key Architectures:**
  - **Mandate 1 (MCP As Ingress Adapter):** MCP acts strictly as an external transport adapter via `@uiforge/mcp-server` targeting the modular v2 SDK (`@modelcontextprotocol/server`, `@modelcontextprotocol/client`, `@modelcontextprotocol/core`) and current `2026-07-28` specification (with `2025-11-25` maintenance compatibility). Core domain contracts remain clean, typed, and executable via CLI (`uiforge`) or programmatic Node.js SDK.
  - **Mandate 2 (Decoupled Agent SDK vs. LLM Provider):** Agent Integration SDK (`@uiforge/agent-sdk`) manages context packaging, tool schemas, and validation; calling agents (Claude Code, Cursor, Codex, Antigravity) own their model selection, reasoning, and billing. UIForge is the deterministic environment oracle, not an LLM wrapper.
  - **Mandate 3 (Single-Agent Primacy & Earned Complexity):** Adopts Single-Agent Primacy as a provisional baseline supported by simplicity and tool leverage. Simulated cost modeling illustrates a 3.28x token bloat and 3x latency on multi-agent swarms; live comparative agent benchmarks remain future work.
  - **5-Layer Context Architecture:** Token budgeting structure (Identity ➔ Map ➔ Component Excerpt ➔ Diagnostics ➔ Permissions) achieving **91.2% measured text reduction** on local fixtures using character approximations (9,964 chars down to 871 chars; 4/4 facts verified).
  - **Seven Tool Families & Security Architecture:** Comprehensive Zod schemas for 7 tool families. The 5-level security ladder is specified with single-use approval tokens, path canonicalization, symlink guards, and TOCTOU checks (with policy logic tested in memory, while runtime OS filesystem enforcement remains Phase 03 work).
  - **Transport-Specific Security & Observability:** Local `stdio` operates over OS pipes without network authentication; remote `streamableHttp` enforces TLS and HTTP authorization. Audit logging implements SHA-256 digest chaining (noting external anchoring requirements).
  - **Reconciled Scorecard:** 9 PASS, 9 PARTIAL, 2 NOT ESTABLISHED across 20 criteria.
- **Empirical Evidence:** Experiments E1–E10 recorded in [ws5-evidence/ws5-evidence.md](ws5-evidence/ws5-evidence.md).
