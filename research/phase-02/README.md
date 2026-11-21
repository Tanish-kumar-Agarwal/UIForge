# UIForge Phase 02 — Open-Source Ecosystem & Technical Architecture Research

**Master Directory:** `research/phase-02/`  
**Phase Identifier:** Phase 02 — Open-Source Ecosystem & Technical Architecture Research  
**Current Status:** Phase 02.1 Complete; Phase 02.2 Complete & Consolidated (12 Master Architecture Deliverables); Phase 02.3 Scheduled  
**Execution Mode:** PHASE 1 — STRICT RESEARCH-ONLY (Zero Codebase Changes, Zero Git Commits)  
**Date:** November 21, 2026  

---

## 1. Executive Mission & Phase Overview

**UIForge** is an open-core Frontend Engineering Intelligence Platform designed to empower AI coding agents with the upstream context (design tokens, component discovery, AST inspection) and downstream verification (headless multi-viewport browser automation, deterministic accessibility audits, visual regression, Model Context Protocol integration) needed to produce production-grade frontend applications.

**Phase 02** establishes the technical and architectural foundation of UIForge through four systematic phases:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              UIFORGE PHASE 02 ROADMAP                                  │
├───────────────────┬───────────────────────────────────┬────────────────────────────────┤
│ Phase Segment     │ Focus Area                        │ Status                         │
├───────────────────┼───────────────────────────────────┼────────────────────────────────┤
│ Phase 02.1        │ Open-Source Ecosystem Discovery   │ COMPLETE (125 Candidates)      │
│                   │ & Intelligence                    │ Located in ecosystem-discovery/│
├───────────────────┼───────────────────────────────────┼────────────────────────────────┤
│ Phase 02.2        │ Deep Technical Repository Audit,  │ COMPLETE & CONSOLIDATED:       │
│                   │ Architecture Decisions & System   │ • WS-1 to WS-5 Reports Complete│
│                   │ Consolidation                     │ • 12 Consolidation Deliverables│
│                   │                                   │   in phase-02.2-consolidation/ │
├───────────────────┼───────────────────────────────────┼────────────────────────────────┤
│ Phase 02.3        │ Software Supply-Chain, Licensing  │ SCHEDULED (Follows Phase 02.2) │
│                   │ & Commercial Risk Audit           │                                │
├───────────────────┼───────────────────────────────────┼────────────────────────────────┤
│ Phase 02.4        │ Integration Architecture, Proof   │ SCHEDULED (Follows Phase 02.3) │
│                   │ of Concept & System Synthesis     │                                │
└───────────────────┴───────────────────────────────────┴────────────────────────────────┘
```

---

## 2. Directory Structure & Organization

```text
research/phase-02/
├── README.md                                          # This master index and executive orientation
│
├── phase-02.1-discovery/                              # Phase 02.1 Discovery Audit Register
│   └── README.md                                      # Pointers & summary of research/ecosystem-discovery/
│
├── phase-02.2-technical-audit/                        # Phase 02.2 Deep Technical Workstream Reports
│   ├── README.md                                      # Technical audit index and roadmap
│   ├── WS1-PROJECT-INTELLIGENCE.md                    # WS-1: Project Intelligence & AST Transformation
│   ├── WS2-COMPONENT-ARCHITECTURE.md                  # WS-2: Component & Design-System Architecture
│   ├── WS3-REGISTRY-AND-TOKENS.md                     # WS-3: Registry, Design Tokens & Styling Architecture
│   ├── WS4-BROWSER-VERIFICATION.md                    # WS-4: Browser Verification, Visual Quality & A11y
│   ├── ws4-evidence/                                  # WS-4 empirical test runner, results, and audit
│   │   ├── README.md
│   │   ├── run_ws4_experiments.cjs
│   │   ├── ws4-execution-results.json
│   │   └── ws4-evidence.md
│   ├── WS5-AGENT-ARCHITECTURE-MCP-TOOLING.md          # WS-5: AI Agent Arch, MCP, SDK & Context Tooling
│   └── ws5-evidence/                                  # WS-5 empirical test runner, results, and audit
│       ├── README.md
│       ├── run_ws5_experiments.cjs
│       ├── ws5-execution-results.json
│       └── ws5-evidence.md
│
├── phase-02.2-consolidation/                          # Phase 02.2 Master Architecture Consolidation
│   ├── README.md                                      # Master orientation and deliverable index
│   ├── MASTER-ARCHITECTURE.md                         # Unified 11-layer architecture, topology & ownership
│   ├── SHARED-INTERFACE-CONTRACTS.md                  # 10 canonical cross-subsystem TypeScript contracts (A–J)
│   ├── DEPENDENCY-AND-PACKAGE-ARCHITECTURE.md         # Monorepo DAG, package boundaries & dependency rules
│   ├── SECURITY-AND-TRUST-ARCHITECTURE.md             # 21-vector threat model & 5-level security ladder
│   ├── PROVENANCE-AND-REGISTRY-GOVERNANCE.md          # 6-tier consumption model & provenance.json schema
│   ├── UNIFIED-EVIDENCE-ARCHITECTURE.md               # 8 evidence tiers, verification lifecycle & failure codes
│   ├── ARCHITECTURE-DECISION-REGISTER.md              # 15 cross-workstream reconciled ADRs (ADR-001–ADR-015)
│   ├── CONFLICT-AND-GAP-REGISTER.md                   # 12 technical contradictions resolved
│   ├── END-TO-END-WORKFLOWS.md                        # Flows A–G with complete Mermaid sequence diagrams
│   ├── PHASE-03-IMPLEMENTATION-READINESS.md           # 4-stage dependency roadmap & complexity matrix
│   └── ACCEPTANCE-AND-EVIDENCE-REPORT.md              # Quality gate audit (25 PASS, 3 PARTIAL, 0 NOT ESTABLISHED)
│
└── experiments/                                       # Empirical Experiments, Fixtures & Audit Evidence
    ├── README.md                                      # Experiment catalog and execution instructions
    ├── ws1-experiments/                               # Workstream 1 reproducible test suite
    │   ├── run_experiments.cjs                       # Node.js runner for WS-1 (E1–E7)
    │   └── fixtures/                                  # Self-contained Next.js test fixture
    │       ├── tsconfig.json
    │       ├── app/dashboard/page.tsx
    │       ├── components/dashboard/kpi-card.tsx
    │       ├── components/ui/card.tsx
    │       └── lib/utils.ts
    ├── ws3-experiments/                               # Workstream 3 reproducible test suite
    │   └── run_ws3_unified_suite.cjs                  # Node.js unified runner for WS-3 (E1–E8)
    ├── ws4-experiments/                               # Workstream 4 reproducible test suite
    │   └── run_ws4_experiments.cjs                    # Node.js unified runner for WS-4 (E1–E8)
    ├── ws5-experiments/                               # Workstream 5 reproducible test suite
    │   ├── README.md
    │   └── run_ws5_experiments.cjs                    # Node.js unified runner for WS-5 (E1–E10)
    └── evidence/                                      # Captured JSON data and evidence registers
        ├── ws1-execution-results.json                 # Captured stdout from WS-1 test runner
        ├── ws1-evidence.md                            # Detailed empirical evidence audit for WS-1
        ├── ws3-execution-results.json                 # Captured stdout from WS-3 test runner
        ├── ws3-evidence.md                            # Detailed empirical evidence audit for WS-3
        ├── ws4-execution-results.json                 # Captured stdout from WS-4 test runner
        ├── ws4-evidence.md                            # Detailed empirical evidence audit for WS-4
        ├── ws5-execution-results.json                 # Captured stdout from WS-5 test runner
        └── ws5-evidence.md                            # Detailed empirical evidence audit for WS-5
```

---

## 3. Summary of Key Architectural Decisions (ADRs)

Across Workstreams 1, 2, 3, 4, and 5, twenty-five core Architectural Decision Records have been formally established:

| ADR ID | Workstream | Architectural Decision Summary | Status |
| :--- | :---: | :--- | :---: |
| **ADR-WS1-01** | WS-1 | **TypeScript Dual-Track Strategy**: Pin `@typescript/typescript6@6.0.2` as stable fallback; evaluate TypeScript 7.1 Beta programmatic API (`sync`/`async`). | `ACCEPTED` |
| **ADR-WS1-02** | WS-1 | **Four-Layer AST Orchestrator**: Fast Grep (ast-grep) ➔ CST Rewriting (Recast/Babel) ➔ Semantic Graph (ts-morph) ➔ Full Type Checker fallback. | `ACCEPTED` |
| **ADR-WS1-03** | WS-1 | **Three Inviolable Transformation Rules**: (1) Never overwrite user work; (2) Scope atomicity honestly; (3) Report unmanaged npm state during rollback. | `ACCEPTED` |
| **ADR-WS2-01** | WS-2 | **Intelligence Engine Role**: UIForge acts as an intelligence and discovery engine, never a proprietary component vendor. | `ACCEPTED` |
| **ADR-WS2-02** | WS-2 | **Two-Stage Component Selection**: Mode-Specific Eligibility Gates (Hard Pass/Fail) followed by Multi-Dimensional Weighted Ranking. | `ACCEPTED` |
| **ADR-WS2-03** | WS-2 | **Four-Tier RSC Boundary Taxonomy**: Explicitly inspect resolved entry points for `'use client'` rather than package manifest exports. | `ACCEPTED` |
| **ADR-WS2-04** | WS-2 | **Four-Tier Accessibility Verification**: Automate axe-core, Playwright keyboard traces, and ARIA snapshots before manual testing. | `ACCEPTED` |
| **ADR-WS3-01** | WS-3 | **W3C DTCG 2025.10 Token Model**: Adopt stable Community Group spec using canonical `components` color syntax, 13 token types, and group `$type` inheritance. | `ACCEPTED` |
| **ADR-WS3-02** | WS-3 | **Decoupled Style Dictionary Integration**: UIForge owns AST graph, cycle checks, and alias resolution; Style Dictionary v5 (`v5.8.0`) performs output serialization. | `ACCEPTED` |
| **ADR-WS3-03** | WS-3 | **Two-Tier Preservation Transformation Contract**: Reconcile styling transpilation across independent *Value Preservation* and *Semantic Preservation* axes. | `ACCEPTED` |
| **ADR-WS3-04** | WS-3 | **Multi-File Journaled Rollback**: Snapshot-based SHA-256 restoration engine tracking touched workspace files across multi-file operations. | `ACCEPTED` |
| **ADR-WS4-01** | WS-4 | **Playwright as Primary Automation Engine**: Adopt Playwright Dispatcher architecture for multi-browser fidelity and native tracing. | `ACCEPTED` |
| **ADR-WS4-02** | WS-4 | **Two-Layer Local-First Visual Comparison**: Combine Pixelmatch pixel diffing with bounding-box dynamic content masking. | `ACCEPTED` |
| **ADR-WS4-03** | WS-4 | **Four-Tier Accessibility Verification**: Demarcate automated axe-core scans (~40% of WCAG rules), keyboard traces, and manual audits. | `ACCEPTED` |
| **ADR-WS4-04** | WS-4 | **Layout Geometry & Responsive Engine**: Programmatically audit horizontal overflow, element occlusion, and touch targets across 5 viewports. | `ACCEPTED` |
| **ADR-WS4-05** | WS-4 | **Cryptographic Evidence Records**: Compile tamper-evident `VerificationEvidenceRecord` archives with SHA-256 signatures for AI repair. | `ACCEPTED` |
| **ADR-WS5-01** | WS-5 | **MCP as Ingress Adapter, Not Core**: UIForge Core retains typed domain contracts; MCP (`@uiforge/mcp-server`) acts as an RPC transport adapter targeting modular v2 SDK (`2026-07-28` & `2025-11-25`). | `ACCEPTED` |
| **ADR-WS5-02** | WS-5 | **Decoupled Agent SDK vs. LLM Provider**: UIForge does not bundle LLM Provider SDKs; calling agents own model inference and loops. | `ACCEPTED` |
| **ADR-WS5-03** | WS-5 | **Single-Agent Primacy (Provisional Baseline)**: Simplicity & tool leverage baseline; simulated cost model demonstrates 3.28x token bloat on swarms. | `ACCEPTED` |
| **ADR-WS5-04** | WS-5 | **5-Layer Progressive Context Architecture**: Budgeted context hierarchy achieving 91.2% measured text reduction on local fixtures. | `ACCEPTED` |
| **ADR-WS5-05** | WS-5 | **Strict Boundary Validation via JSON Schema / Zod**: All tool contracts strictly validated with `additionalProperties: false`. | `ACCEPTED` |
| **ADR-WS5-06** | WS-5 | **Five-Level Security & Scoped Approval Token Ladder**: Mutating operations enforce single-use tokens, path canonicalization, symlink guards, and TOCTOU checks. | `ACCEPTED` |
| **ADR-WS5-07** | WS-5 | **Untrusted Content Containment & Permission Gates**: Scanned snippets treated as untrusted data; execution gates block unauthorized actions regardless of model text. | `ACCEPTED` |
| **ADR-WS5-08** | WS-5 | **Stdio Transport as Primary Local Channel**: Maximum security over stdio; unified POST streamable HTTP reserved for remote verification nodes. | `ACCEPTED` |
| **ADR-WS5-09** | WS-5 | **Chained Audit Logging & Secret Redaction**: Automated secret scrubbing and SHA-256 chained digests; external anchoring required for full immutability. | `ACCEPTED` |
| **ADR-WS5-10** | WS-5 | **Idempotent Mutation Journaling & AST Rollbacks**: Checkpoint rollback journals and idempotency keys to survive crashes and retries. | `ACCEPTED` |

---

## 4. Evidence Classification & Research Integrity

All findings in this research directory adhere strictly to the **Evidence Over Assumptions** standard:
- `[LOCAL-HARNESS-TESTED]`: Empirically validated via reproducible Node.js test scripts in this repository (`research/phase-02/experiments/`).
- `[DOC/SOURCE-VERIFIED]`: Confirmed directly from published specifications, RFCs, and package manifests.
- `[REPORTED-SIMULATION]`: Validated on controlled synthetic scenarios.
- `[NOT-ESTABLISHED]`: Requires external daemon or multi-tenant infrastructure not running locally.
- `[PLANNED]`: Architectural capabilities targeted for future engine integration.
