# UIForge Phase 02.2 — Architecture Decision Register (ADR)

**Document Identifier:** `UIF-PH02.2-ADR-REGISTER`  
**Classification:** Canonical System-Wide Architecture Decision Records  
**Parent Phase:** Phase 02.2 — Deep Technical Audit, Architecture Decisions & Cross-Workstream Consolidation  
**Target Standard:** Principal Software Architect + Principal Frontend Infrastructure Engineer + Application Security Architect  
**Status:** COMPLETE & CONSOLIDATED  
**Date:** November 21, 2026  

---

## 1. Executive Summary & ADR Governance Standard

This Architecture Decision Register reconciles, formalizes, and unifies all technical architectural decisions established across Workstreams 1 through 5. Every decision in this register has been evaluated for cross-workstream compatibility, security integrity, and empirical reproducibility.

### ADR Classification Statuses
- `ACCEPTED`: Fully justified by empirical evidence, vendor documentation, and architectural invariants.
- `ACCEPTED_WITH_CONDITIONS`: Adopted baseline, subject to specific runtime validation in Phase 02.4 / Phase 03.
- `PROVISIONAL`: Provisionally selected baseline pending future comparative benchmarks.
- `DEFERRED`: Formally planned capability postponed to a future development phase (Phase 03 or 04).
- `REJECTED`: Explicitly evaluated and rejected with recorded rationale.
- `SUPERSEDED`: Replaced by a more rigorous subsequent decision.

---

## 2. Master Architecture Decision Register

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MASTER ARCHITECTURE DECISION REGISTER                           │
├─────────┬───────────────────────────────────────────────┬──────────────────────────────┤
│ ADR ID  │ Title                                         │ Status                       │
├─────────┼───────────────────────────────────────────────┼──────────────────────────────┤
│ ADR-001 │ Headless Core & Monorepo Package Topology     │ ACCEPTED                     │
│ ADR-002 │ Dual-Track TypeScript AST & CST Engine        │ ACCEPTED_WITH_CONDITIONS     │
│ ADR-003 │ Authoritative Project Snapshot Representation │ ACCEPTED                     │
│ ADR-004 │ Four-Tier RSC & Accessibility Component Model │ ACCEPTED                     │
│ ADR-005 │ Two-Stage Component Selection Engine          │ ACCEPTED                     │
│ ADR-006 │ W3C DTCG 2025.10 Token Standard with Colors   │ ACCEPTED                     │
│ ADR-007 │ Cross-Paradigm Styling & Loss Reporting       │ ACCEPTED                     │
│ ADR-008 │ Write-Ahead Transaction Journal & Rollback    │ ACCEPTED_WITH_CONDITIONS     │
│ ADR-009 │ Playwright v1.65.1 Headless Browser Adapter   │ ACCEPTED_WITH_CONDITIONS     │
│ ADR-010 │ 55-Criteria WCAG 2.2 Accessibility Demarcation│ ACCEPTED                     │
│ ADR-011 │ Pixelmatch v8 OKLab/HyAB Visual Diffing       │ ACCEPTED                     │
│ ADR-012 │ MCP Protocol 2026-07-28 As Ingress Adapter    │ ACCEPTED                     │
│ ADR-013 │ Decoupled Agent SDK vs. LLM Provider SDK      │ ACCEPTED                     │
│ ADR-014 │ Single-Agent Primacy Baseline & Cost Modeling │ PROVISIONAL                  │
│ ADR-015 │ 5-Level Security Ladder & Diff-Bound Approval │ ACCEPTED_WITH_CONDITIONS     │
└─────────┴───────────────────────────────────────────────┴──────────────────────────────┘
```

---

### ADR-001: Headless Core & Monorepo Package Topology
- **Status:** `ACCEPTED`
- **Context:** UIForge must serve terminal developers, CI/CD pipelines, and external AI agents without forcing browser downloads, cloud accounts, or desktop GUI installations.
- **Decision:** Structure UIForge as an open-core monorepo managed via `pnpm workspaces`. `@uiforge/core` is pure TypeScript domain logic. `@uiforge/cli` is the developer CLI. `@uiforge/mcp-server` is an optional ingress adapter. Browser automation (`@uiforge/verification`) is an optional dynamically loaded package.
- **Rationale:** Prevents multi-hundred-megabyte dependencies from bloating CLI startup. Preserves local-first operation.
- **Evidence:** Clean topological sort proof in [DEPENDENCY-AND-PACKAGE-ARCHITECTURE.md](DEPENDENCY-AND-PACKAGE-ARCHITECTURE.md).
- **Consequences:** Core cannot directly import Playwright or MCP SDKs; must use abstract interfaces.

---

### ADR-002: Dual-Track TypeScript AST & CST Engine
- **Status:** `ACCEPTED_WITH_CONDITIONS`
- **Context:** TypeScript 7.0 (released July 8, 2026 in Go) delivers 8–12× compilation speedups but omits the classic programmatic JS Compiler API. TypeScript 7.1 Beta introduces new modular programmatic entry points (`typescript/sync`, `typescript/async`, `typescript/fs`) scheduled for stable release November 24, 2026.
- **Decision:** Adopt a **Four-Layer Capability Orchestrator**:
  1. Fast Structural Search: `@ast-grep/napi` (Rust CST).
  2. Syntactic Scanning: `oxc-parser` (ESTree AST).
  3. Non-Destructive Rewriting: `ts-morph` (`v28.0.0`) + `@typescript/typescript6` (`v6.0.2` pinned).
  4. Forward Compatibility: Evaluate `typescript@7.1.0-beta` in Phase 02.4.
- **Conditions:** Validate stable TypeScript 7.1 release in Phase 02.4 integration suite before replacing TS 6.x fallback.
- **Evidence:** WS-1 Experiments E1–E7; measured sub-millisecond pattern matching.

---

### ADR-003: Authoritative Project Snapshot Representation
- **Status:** `ACCEPTED`
- **Context:** WS-2, WS-3, WS-4, and WS-5 all need project knowledge (routes, components, tokens, configs). If each subsystem independently scans the filesystem, race conditions, stale caches, and inconsistent interpretations arise.
- **Decision:** Establish `uiforge.contract.project-intelligence.v1` as the single authoritative project knowledge representation. All subsystems receive an immutable, frozen `ProjectSnapshot` identified by a SHA-256 Merkle root.
- **Rationale:** Ensures all subsystems evaluate the exact same codebase state.
- **Evidence:** WS-1 scan benchmarks; single-pass Merkle root calculation.

---

### ADR-004: Four-Tier RSC & Accessibility Component Model
- **Status:** `ACCEPTED`
- **Context:** Next.js App Router and modern React frameworks enforce strict boundaries between Server and Client components. Conflating them breaks builds.
- **Decision:** Classify all components into a formal 4-tier RSC taxonomy:
  - Tier 1: Server-Pure (Zero client hooks, async data fetch).
  - Tier 2: Client Entry (Explicit `'use client'`, exported boundary).
  - Tier 3: Client Wrapper (Internal state, passes children to server).
  - Tier 4: Client-Exclusive SPA (Vite / CRA style).
- **Rationale:** Prevents AI agents from injecting client hooks (`useState`, `useEffect`) into Server Components.
- **Evidence:** WS-2 AST taxonomy audit; verified across shadcn and local fixtures.

---

### ADR-005: Two-Stage Component Selection Engine
- **Status:** `ACCEPTED`
- **Context:** Autonomous agents frequently hallucinate new component libraries or duplicate existing buttons when existing project components already exist.
- **Decision:** Enforce a **Two-Stage Selection Engine**:
  - Stage 1: Mode-Specific Eligibility Gates (Hard Pass/Fail for RSC tier, runtime, licensing, and security).
  - Stage 2: Multi-Dimensional Weighted Ranking (Favors existing codebase components 2.5× over external templates; favors templates 2.0× over new npm packages).
- **Rationale:** Preserves brownfield architecture and prevents unnecessary dependency sprawl.
- **Evidence:** WS-2 selection matrix simulation.

---

### ADR-006: W3C DTCG 2025.10 Token Standard with Colors
- **Status:** `ACCEPTED`
- **Context:** Early drafts mischaracterized DTCG as a formal W3C Standards Track Recommendation and used obsolete `"channels"` syntax.
- **Decision:** Adopt the **stable W3C Design Tokens Community Group (DTCG) 2025.10 specification**. Model color tokens using the canonical Color Module property: `"$value": { "colorSpace": "oklch", "components": [0.65, 0.24, 258.2], "alpha": 1 }`. Expand internal model to all 13 DTCG types.
- **Rationale:** Aligns with modern design tool exports (Figma, Style Dictionary v5) and wide-gamut OKLCH CSS.
- **Evidence:** WS-3 Experiment E2; verified JSON validation in `run_ws3_unified_suite.cjs`.

---

### ADR-007: Cross-Paradigm Styling & Loss Reporting
- **Status:** `ACCEPTED`
- **Context:** Converting styles between Tailwind v3, Tailwind v4 (`@theme`), CSS Modules, and Sass frequently causes silent visual corruption or lost token aliases.
- **Decision:** Implement a bounded 14-vector conversion matrix. Formally distinguish **Value Preservation** (visual match) from **Semantic Preservation** (metadata survival). Require explicit human approval for any conversion with critical semantic loss.
- **Rationale:** Realistic engineering prevents silent layout corruption.
- **Evidence:** WS-3 Experiments E3, E5, E6; specificity benchmark proving CSS Modules override `@layer components`.

---

### ADR-008: Write-Ahead Transaction Journal & Rollback
- **Status:** `ACCEPTED_WITH_CONDITIONS`
- **Context:** Automated multi-file AST mutations can fail mid-write, leaving repositories in a corrupted, uncompilable state.
- **Decision:** Implement a local SQLite write-ahead journal (`.uiforge/journal.db`). Record pre-image SHA-256 snapshots before disk modification. Atomically revert files upon process crash or post-mutation verification failure.
- **Conditions:** Implement and validate live crash recovery and file-locking tests in Phase 03. Disclaim unmanaged external npm lifecycle caches.
- **Evidence:** WS-1 Experiment E7, WS-3 Experiment E8, WS-5 Experiment E7.

---

### ADR-009: Playwright v1.65.1 Headless Browser Adapter
- **Status:** `ACCEPTED_WITH_CONDITIONS`
- **Context:** Testing UI requires deterministic headless rendering across Chromium, Firefox, and WebKit without tying Core to browser binaries.
- **Decision:** Pin **Playwright `v1.65.1`** (released Nov 13, 2026) within the optional `@uiforge/verification` package. Adopt `page.ariaSnapshot()` (replacing deprecated `page.accessibility.snapshot()`). Expose technology-neutral `IBrowserAdapter`.
- **Conditions:** Validate Chromium headless performance across Linux, macOS, and Windows in Phase 02.4.
- **Evidence:** WS-4 Experiments E1–E8.

---

### ADR-010: 55-Criteria WCAG 2.2 Accessibility Demarcation
- **Status:** `ACCEPTED`
- **Context:** Automated tools cannot verify WCAG conformance; claiming 100% compliance based on axe-core is technically fraudulent.
- **Decision:** Demarcate WCAG 2.2 Level A/AA criteria into three explicit tiers:
  - 12 Criteria: Automated Static / DOM Checks (axe-core).
  - 23 Criteria: Browser Keyboard & Focus Tracing (Playwright).
  - 20 Criteria: Human & Assistive Tech Audit Required (Screen readers).
- **Rationale:** Conformance claims remain legally and technically defensible.
- **Evidence:** WS-4 55-criteria matrix; Experiment E4.

---

### ADR-011: Pixelmatch v8 OKLab/HyAB Visual Diffing
- **Status:** `ACCEPTED`
- **Context:** Legacy pixel diffing using RGB/YIQ produces false positives on anti-aliased text and wide-gamut displays.
- **Decision:** Adopt **Pixelmatch v8.0.0** using perceptual **OKLab and HyAB color space distances**. Support dynamic element bounding box masking and require explicit human approval for new golden baselines.
- **Rationale:** Minimizes false visual regression alerts while catching true layout shifts.
- **Evidence:** WS-4 Experiment E2.

---

### ADR-012: MCP Protocol 2026-07-28 As Ingress Adapter
- **Status:** `ACCEPTED`
- **Context:** MCP is an emerging industry standard for AI tool access, but building UIForge's core architecture around MCP would couple the platform to an external transport spec.
- **Decision:** Adopt MCP strictly as an **external ingress adapter** (`@uiforge/mcp-server`) targeting the **`2026-07-28` specification** (modular SDK v2: `@modelcontextprotocol/server`, `@modelcontextprotocol/core`) with backward compatibility for `2025-11-25`. Support stdio and Streamable HTTP POST. Core remains 100% independent.
- **Rationale:** Enables Claude Code, Cursor, and Antigravity to connect without compromising Core autonomy.
- **Evidence:** WS-5 Experiments E1, E2, E3, E10.

---

### ADR-013: Decoupled Agent SDK vs. LLM Provider SDK
- **Status:** `ACCEPTED`
- **Context:** Many developer tools mistakenly bundle OpenAI, Anthropic, or Gemini SDKs, forcing users into specific model billing and context management schemes.
- **Decision:** UIForge's `@uiforge/agent-sdk` handles context packaging, token budgeting, and tool schemas. It **never calls LLM APIs or manages provider billing**. Calling agents bring their own models and reasoning.
- **Rationale:** Absolute model neutrality. UIForge is the environment oracle, not an LLM wrapper.
- **Evidence:** WS-5 architectural mandate; Experiment E4 (91.2% context compression).

---

### ADR-014: Single-Agent Primacy Baseline & Cost Modeling
- **Status:** `PROVISIONAL`
- **Context:** Multi-agent swarms are popular in marketing but frequently introduce severe token bloat, latency multiplication, and coordination deadlock on frontend tasks.
- **Decision:** Adopt **Single-Agent Primacy** as the default UIForge operational baseline. The calling agent operates as the primary orchestrator using UIForge's deterministic tools. Simulated multi-agent cost models (illustrating 3.28× token bloat and 3× latency) are recorded as provisional models.
- **Rationale:** Simplicity, determinism, and lower API costs.
- **Revisit Conditions:** Conduct live, empirical comparative agent benchmarks in Phase 03/04 before evaluating multi-agent orchestration.
- **Evidence:** WS-5 Experiment E8.

---

### ADR-015: 5-Level Security Ladder & Diff-Bound Approval
- **Status:** `ACCEPTED_WITH_CONDITIONS`
- **Context:** AI coding agents must never be granted autonomous permission to modify files, install dependencies, or delete code in brownfield repositories.
- **Decision:** Enforce the 5-level security ladder. Level 2+ mutations require single-use, diff-bound, time-bounded (15m TTL) human approval tokens verified against pre-image SHA-256 disk hashes.
- **Conditions:** Implement OS-level filesystem locks and symlink traversal barriers in Phase 03.
- **Evidence:** WS-5 Experiments E5, E6, E7, E9.
