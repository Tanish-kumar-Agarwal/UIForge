# UIFORGE — PHASE 03: PHASE 02 TO PHASE 03 TRACEABILITY MATRIX
## Authoritative Lineage, Research Carry-Forward & Architecture Reconciliation Register

**Document ID:** `UIF-PH03-TRACEABILITY-MATRIX`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Parent Phases:** Phase 02.1 (Discovery), Phase 02.2 (Consolidation), Phase 02.3 (Legal & Supply Chain), Phase 02.4 (Source Registry), Phase 02.5 (Selection & Prioritization)  
**Standard:** Principal Software Architect, Application Security Architect & Technical Auditor  

---

## 1. Executive Traceability Overview

Phase 03 transforms the exhaustive empirical and architectural research from Phase 01 and Phase 02 into an engineering-ready product specification, monorepo architecture, shared contract catalog, security model, and implementation roadmap.

In strict adherence to UIForge Engineering Invariants, Phase 03 does **not** restart ecosystem discovery, redo competitive analysis, or re-evaluate licenses. Instead, it carries forward all approved architectural decisions, hard gates, adoption tiers, and empirical findings.

### Evidence Classification Legend
- **`[PHASE-02-DECIDED]`**: Established and approved during Phase 02 research and audits.
- **`[SOURCE-VERIFIED]`**: Verified directly against upstream official documentation, specifications, or RFCs.
- **`[REPO-VERIFIED]`**: Confirmed via direct inspection of the UIForge codebase, manifests, or git history.
- **`[ARCHITECTURE-DECISION]`**: Deliberately selected and frozen architectural policy for UIForge.
- **`[PROPOSED]`**: Recommended architectural path proposed in Phase 03 awaiting implementation validation.
- **`[ASSUMPTION]`**: Necessary working assumption requiring Phase 04 empirical benchmarking.
- **`[NOT-ESTABLISHED]`**: Insufficient evidence; quarantined from MVP commitments.

---

## 2. Phase 02 to Phase 03 Traceability Register

| Phase 02 Origin Artifact | Phase 02 Key Findings & Decisions | Phase 03 Destination Artifact | Disposition | Architectural Impact in Phase 03 | Evidence Class |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `WS1-PROJECT-INTELLIGENCE.md` | Non-destructive AST parsing via Babel/TypeScript; AST grep for structural search; dynamic route discovery; component dependency mapping. | `01-product-requirements/FUNCTIONAL-REQUIREMENTS.md` (FR-02)<br>`03-system-architecture/MASTER-SYSTEM-ARCHITECTURE.md` | **REUSED & REFINED** | Establishes `@uiforge/project-intelligence` package boundaries; enforces read-only brownfield invariant. | `[PHASE-02-DECIDED]` |
| `WS2-COMPONENT-ARCHITECTURE.md` | Headless primitive foundation (Radix/React Aria); zero-runtime registry distribution (shadcn model); multi-framework abstraction. | `01-product-requirements/FUNCTIONAL-REQUIREMENTS.md` (FR-06)<br>`docs/architecture/ADR-006-component-registry.md` | **REUSED** | Forms core component intelligence; decouples UIForge from hardcoded React/Tailwind assumptions. | `[PHASE-02-DECIDED]` |
| `WS3-REGISTRY-AND-TOKENS.md` | W3C DTCG 2025.10 token format; Style Dictionary v5.8.0 compiler; Tailwind CSS v4 native CSS variable theme cascade; `@tailwindcss/container-queries`. | `01-product-requirements/FUNCTIONAL-REQUIREMENTS.md` (FR-05)<br>`04-contracts/CONTRACT-CATALOGUE.md` (Token contracts) | **REUSED & REFINED** | Defines `@uiforge/tokens` schema; establishes bidirectional token extraction and compilation pipeline. | `[PHASE-02-DECIDED]` |
| `WS4-BROWSER-VERIFICATION.md` | Playwright v1.50+ headless runner; Pixelmatch pure-JS visual diffing; axe-core WCAG 2.2 AA automation; independent test evidence. | `01-product-requirements/FUNCTIONAL-REQUIREMENTS.md` (FR-08, FR-10)<br>`docs/architecture/ADR-007-evaluation-architecture.md` | **REUSED** | Defines `@uiforge/browser-eval` package; mandates test runners run out-of-process in devDependencies or CLI subprocesses. | `[PHASE-02-DECIDED]` |
| `WS5-AGENT-ARCHITECTURE-MCP-TOOLING.md` | Model Context Protocol SDK (^2.1.0); modern 2026-07-28 stateless discovery (`server/discover`, request `_meta`); OpenCode reference architecture; 5-level security ladder. | `01-product-requirements/FUNCTIONAL-REQUIREMENTS.md` (FR-09)<br>`docs/architecture/ADR-003-agent-abstraction.md`<br>`05-security/SECURITY-ARCHITECTURE.md` | **REUSED & REFINED** | Establishes `@uiforge/mcp-server` and `@uiforge/agent-sdk`; enforces diff-bound authorization and permission tokens. | `[PHASE-02-DECIDED]` |
| `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md` (Ph 02.3) | Permitted consumption modes: `REFERENCE_ONLY`, `DEPENDENCY`, `SOURCE_COPY`, `ASSET_REDISTRIBUTION`, `EXTERNAL_TOOL`, `TEMPLATE_ADAPTATION`. Prohibited resale. | `04-contracts/DATA-SCHEMAS.md`<br>`05-security/TRUST-BOUNDARIES.md` | **REUSED** | Governs package dependency admissions and registry license verification logic. | `[PHASE-02-DECIDED]` |
| `sources.json` / `packages.json` (Ph 02.4) | 125 canonical candidate pool; 119 open-source repositories; 147 resolved packages; 750-cell consumption permissions matrix. | `03-system-architecture/PACKAGE-DEPENDENCY-GRAPH.md`<br>`08-reconciliation/ARCHITECTURE-DECISION-REGISTER.md` | **REUSED** | Provides authoritative universe of allowed libraries, ensuring zero unvetted external dependencies enter Phase 03. | `[REPO-VERIFIED]` |
| `candidate-selection-scorecard.json` (Ph 02.5) | Adoption tiers: Tier 0 (24), Tier 1 (34), Tier 2 (40), Tier 3 (16), Tier 4 (4), Tier 5 (7). 7 weighted scoring criteria summing to 1.000. | `01-product-requirements/MVP-SCOPE.md`<br>`07-implementation-roadmap/MVP-IMPLEMENTATION-PLAN.md` | **REUSED** | Governs MVP component inclusion; strictly blocks Tier 5 rejects and quarantines Tier 4 deferred items. | `[REPO-VERIFIED]` |
| Finding C20 & C27 (MCP Negotiation) | Modern 2026-07-28 discovery via `server/discover` and `_meta` headers; auto-negotiation fallback to legacy 2025-11-25 / 2024-11-05. | `04-contracts/API-SPECIFICATION.md`<br>`docs/architecture/ADR-003-agent-abstraction.md` | **REUSED** | Eliminates legacy initialize handshake assumptions for 2026 protocol. | `[SOURCE-VERIFIED]` |
| Finding C25 & C21 (OFL Font Subsetting) | Reserved Font Name (RFN) rules under SIL OFL 1.1; custom glyph subsetting defaults to font family rename (`UIForgeInter`, `UIForgeGeist`). | `01-product-requirements/FUNCTIONAL-REQUIREMENTS.md` (FR-05)<br>`03-system-architecture/MASTER-SYSTEM-ARCHITECTURE.md` | **REUSED** | Specifies `pyftsubset` build pipeline with Name table rewriting to protect RFN trademarks. | `[SOURCE-VERIFIED]` |
| Finding C26 (Babel vs UIForge WAL) | Babel `errorRecovery: true` decoupled from UIForge Write-Ahead Logging (WAL); WAL handles unrecoverable tokens via coordinate slice patching. | `01-product-requirements/FUNCTIONAL-REQUIREMENTS.md` (FR-11)<br>`docs/architecture/ADR-008-project-safety.md` | **REFINED** | Formalizes `@uiforge/safe-modifier` WAL transaction engine specification for Phase 04 implementation. | `[ARCHITECTURE-DECISION]` |
| Finding C30 & C33 (Tier 0 Partitioning) | 24 Tier 0 candidates partitioned across 7 architectural layers; Tier 0 is strategic foundation, not a monolithic mandatory runtime dependency bundle. | `03-system-architecture/PACKAGE-BOUNDARIES.md`<br>`03-system-architecture/PACKAGE-DEPENDENCY-GRAPH.md` | **REUSED** | Distinguishes runtime dependencies, build/dev tooling, CLI subprocesses, standards, and reference architectures. | `[ARCHITECTURE-DECISION]` |
| Finding C36 (OpenCode Tier 0 Rationale) | `anomalyco/opencode` (`OS-AGNT-02`, Score: 92.4, G1–G6 PASS, `REFERENCE_ONLY`) is UIForge's primary open-source agent reference pattern. | `01-product-requirements/FUNCTIONAL-REQUIREMENTS.md` (FR-09)<br>`docs/architecture/ADR-003-agent-abstraction.md` | **REUSED** | Establishes shadow-workspace execution patterns and tool dispatch loops without library bundling. | `[PHASE-02-DECIDED]` |
| Finding C37 (`@axe-core/playwright` License) | Corrected to MPL-2.0; weak file-level copyleft; devDependencies test runner; Section 3 notices enforced; zero runtime application contamination. | `04-contracts/DATA-SCHEMAS.md`<br>`05-security/SECURITY-ARCHITECTURE.md` | **REUSED** | Governs testing runner dependency boundaries and attribution manifests. | `[SOURCE-VERIFIED]` |

---

## 3. Policy & Governance Traceability

### 3.1 Non-Negotiable Invariants Carried Forward
1. **Read-Only Inspection by Default:** Analysis and audit commands must never alter the target codebase. All writes require human-verified, diff-bounded authorization tokens `[PHASE-02-DECIDED]`.
2. **Headless Core Independence:** UIForge Core (`@uiforge/core`) must be 100% functional without an active browser, without cloud infrastructure, without an MCP connection, and without external LLM provider subscriptions `[ARCHITECTURE-DECISION]`.
3. **Decoupled LLM Provider Architecture:** UIForge does not wrap, resell, or enforce specific LLM inference. External agents supply their own reasoning and context windows. UIForge provides deterministic environment tools and validation oracles `[ARCHITECTURE-DECISION]`.
4. **Evidence Over Assertion:** Automated tools report concrete assertion metrics; subjective quality assertions and WCAG conformance claims are strictly prohibited without empirical evidence envelopes `[PHASE-02-DECIDED]`.
5. **Fail-Closed Security & Provenance:** External registries, untrusted repositories, and generative outputs are treated as hostile inputs. All file writes enforce canonical path validation, symlink guards, and pre-image journaling `[PHASE-02-DECIDED]`.

### 3.2 Superseded or Clarified Concepts
- **Clarification:** Earlier preliminary WS-1 diagrams suggested monolithic AST rewriting via `@babel/core`. Phase 02.5 and Phase 03 strictly clarify that Babel is utilized for partial JSX parsing (`@babel/parser` with `errorRecovery: true`), while formatting-preserving mutations use coordinate-based slice patching, AST-grep, and TypeScript Compiler API diagnostics `[ARCHITECTURE-DECISION]`.
- **Clarification:** Early drafts described Tier 0 as "mandatory production dependencies". Phase 02.5 (C30/C33) and Phase 03 explicitly establish that Tier 0 represents a 7-layer architectural catalog adopted selectively per project context `[ARCHITECTURE-DECISION]`.
