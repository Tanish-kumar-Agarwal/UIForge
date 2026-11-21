# UIForge Phase 02.2 — Cross-Workstream Conflict & Gap Register

**Document Identifier:** `UIF-PH02.2-CONFLICT-REGISTER`  
**Classification:** Technical Discrepancy Reconciliation & Architecture Gap Register  
**Parent Phase:** Phase 02.2 — Deep Technical Audit, Architecture Decisions & Cross-Workstream Consolidation  
**Target Standard:** Principal Software Architect + Principal Frontend Infrastructure Engineer + Application Security Architect  
**Status:** COMPLETE & CONSOLIDATED  
**Date:** November 21, 2026  

---

## 1. Executive Summary & Reconciliation Standard

During the separate execution of Workstreams 1 through 5, individual workstream reports developed technical assumptions, data models, and tooling targets that partially overlapped or conflicted when viewed from a whole-system perspective.

This document identifies, analyzes, and formally reconciles **twelve cross-workstream technical conflicts and architecture gaps**. In accordance with the UIForge Research Standard:

> **We do not prioritize agreement over correctness.** Contradictions are not swept under the rug; they are resolved in favor of the more technically rigorous, evidence-backed, and security-hardened architecture.

---

## 2. Reconciled Conflict & Gap Register

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CROSS-WORKSTREAM CONFLICT REGISTER                              │
├───────┬───────────────────────────────┬─────────────┬──────────────────────────────────┤
│ ID    │ Conflict Description          │ Workstreams │ Resolution Status                │
├───────┼───────────────────────────────┼─────────────┼──────────────────────────────────┤
│ CF-01 │ Redundant Project Scanners    │ WS-1 / WS-2 │ Resolved: WS-1 Authoritative     │
│ CF-02 │ Competing Component Models    │ WS-2 / WS-3 │ Resolved: Normalized Catalog     │
│ CF-03 │ Token Color Representation    │ WS-3 / WS-2 │ Resolved: DTCG 2025.10 Components│
│ CF-04 │ Browser Binary Footprint      │ WS-4 / Core │ Resolved: Dynamic Adapter Load   │
│ CF-05 │ Accessibility API Baseline    │ WS-4 / WS-2 │ Resolved: Playwright ariaSnapshot│
│ CF-06 │ WCAG Conformance Terminology  │ WS-4 / WS-2 │ Resolved: 55-Criteria Demarcation│
│ CF-07 │ Approval Model Fragmentation  │ WS-1 / WS-5 │ Resolved: 5-Level Diff-Bound Gate│
│ CF-08 │ Multi-File Rollback Integrity │ WS-1 / WS-3 │ Resolved: SQLite Pre-Image Journ.│
│ CF-09 │ Hash Digest vs. Signature     │ WS-4 / WS-5 │ Resolved: recordDigest Renamed   │
│ CF-10 │ In-Memory vs. OS Permissions  │ WS-5 / WS-1 │ Resolved: Policy Tested; OS P03  │
│ CF-11 │ Multi-Agent Primacy Overclaim │ WS-5 / Core │ Resolved: Simulation Reclass.    │
│ CF-12 │ MCP Protocol Version Baseline │ WS-5 / Core │ Resolved: 2026-07-28 Ingress     │
└───────┴───────────────────────────────┴─────────────┴──────────────────────────────────┘
```

---

### CF-01: Redundant Project Scanners & State Desynchronization
- **Workstreams Involved:** WS-1 (Project Intelligence) and WS-2 (Component Architecture).
- **Original Positions:** WS-1 designed a multi-layer scanner (`oxc-parser` + `ast-grep`) producing `ProjectSnapshot`. WS-2 independently proposed scanning component directories using standard `glob` and TypeScript compiler hosts.
- **Technical Contradiction:** Running parallel scanners creates race conditions, doubles I/O overhead on large repositories, and causes cache desynchronization where WS-2 analyzes files that WS-1 has not yet indexed.
- **Resolution:** **WS-1 is the sole authoritative owner of repository scanning and filesystem indexing.** WS-2 receives the pre-parsed AST nodes and file inventory via `uiforge.contract.project-intelligence.v1`. WS-2 is strictly prohibited from invoking independent directory globbing.
- **Affected Contracts:** `uiforge.contract.project-intelligence.v1`, `uiforge.contract.component-intelligence.v1`.
- **ADR Reference:** ADR-003.

---

### CF-02: Competing Component Metadata Models
- **Workstreams Involved:** WS-2 (Component Architecture) and WS-3 (Registry & Ingestion).
- **Original Positions:** WS-2 designed a component model focused on RSC boundaries, client hooks, and prop APIs. WS-3 adopted the official shadcn `registry.json` schema (all 12 item types) focused on package dependencies and raw file templates.
- **Technical Contradiction:** Attempting to force local project components into shadcn's template schema drops critical AST metadata (RSC tiers, accessibility profiles), while forcing external templates into local AST models breaks registry ingestion.
- **Resolution:** Formally separate **Installed Project Components** (`uiforge.contract.component-intelligence.v1`, owned by WS-2) from **Ingested Registry Resources** (`uiforge.contract.registry-resource.v1`, owned by WS-3). When a registry resource is ingested, it is transformed and registered into WS-2's Component Catalog.
- **Affected Contracts:** Contracts B and C.
- **ADR Reference:** ADR-004, ADR-005.

---

### CF-03: Token Color Representation & Syntax Discrepancies
- **Workstreams Involved:** WS-3 (Tokens & Styling) and WS-2 (Component Styling).
- **Original Positions:** Early drafts in WS-2 assumed shadcn tokens were raw HSL number tuples (`--primary: 222.2 47.4% 11.2%`). WS-3 evaluated DTCG with obsolete `"channels"` syntax before correcting to the Color Module with `"components"`.
- **Technical Contradiction:** Downstream components could not parse OKLCH colors, while token generators emitted non-standard properties.
- **Resolution:** **Canonicalize on W3C DTCG 2025.10 with `components: [number, number, number]` and `colorSpace: 'oklch'`**. Clarify that shadcn's modern `cssVars` supports full CSS color strings (`oklch(0.65 0.24 258.2)`). UIForge converts DTCG color tokens to appropriate target CSS syntax based on the target project's styling paradigm.
- **Affected Contracts:** `uiforge.contract.design-token.v1`, `uiforge.contract.styling-transformation.v1`.
- **ADR Reference:** ADR-006, ADR-007.

---

### CF-04: Heavyweight Browser Binary Dependencies in Core
- **Workstreams Involved:** WS-4 (Browser Verification) and Core Monorepo Architecture.
- **Original Positions:** WS-4 initially drafted browser verification as a core service called on every transformation verification step.
- **Technical Contradiction:** Requiring Playwright browser binaries (>400MB) inside `@uiforge/core` makes simple CLI commands (`uiforge analyze`, `uiforge tokens`) slow, bloated, and unusable in lightweight CI environments or Docker containers lacking WebKit dependencies.
- **Resolution:** **Isolate Playwright into an optional, dynamically loaded package: `@uiforge/verification`.** Core exposes a technology-neutral `IBrowserAdapter`. CLI dynamically loads the verification package only when `uiforge verify` is invoked.
- **Affected Packages:** `@uiforge/core`, `@uiforge/verification`, `@uiforge/cli`.
- **ADR Reference:** ADR-001, ADR-009.

---

### CF-05: Obsolete Accessibility API References
- **Workstreams Involved:** WS-4 (Browser Verification) and WS-2 (Accessibility Verification).
- **Original Positions:** Early WS-4 drafts referenced `page.accessibility.snapshot()`.
- **Technical Contradiction:** `page.accessibility.snapshot()` was deprecated in Playwright for multiple release cycles and is removed in modern Playwright releases.
- **Resolution:** **Replaced exclusively with `page.ariaSnapshot()`.** Clarify that ARIA snapshots capture the YAML role tree of accessibility nodes, not native OS platform accessibility APIs (MSAA/IA2/UIA).
- **Affected Contracts:** `uiforge.contract.browser-verification.v1`.
- **ADR Reference:** ADR-009, ADR-010.

---

### CF-06: Conflation of Automated Scans with WCAG Conformance
- **Workstreams Involved:** WS-4 (Browser Testing) and WS-2 (A11y Profile).
- **Original Positions:** Early drafts loosely claimed "axe-core verifies 40% of WCAG criteria" and described automated passes as "WCAG compliant".
- **Technical Contradiction:** Automated DOM scanners only reliably check 12 out of 55 WCAG 2.2 Level A/AA criteria. Overclaiming conformance creates severe legal and architectural liability.
- **Resolution:** **Adopt the 55-Criteria Demarcation Matrix.** Automated passes are recorded strictly as `automated-checks-pass`. Keyboard interactions (23 criteria) require Playwright tracing. The remaining 20 criteria are explicitly flagged as `requires-human-audit`.
- **Affected Contracts:** Contracts B, G, and H.
- **ADR Reference:** ADR-010.

---

### CF-07: Approval Model Fragmentation
- **Workstreams Involved:** WS-1 (Transforms) and WS-5 (Agent Integration & Security).
- **Original Positions:** WS-1 defined single-file atomic renames as safety boundaries. WS-5 defined a multi-tier permission ladder with token challenges.
- **Technical Contradiction:** Two independent, uncoordinated approval systems where an agent might satisfy WS-5 permissions but bypass WS-1 diff validation, or vice versa.
- **Resolution:** **Unify into the 5-Level Security Permission Ladder backed by `uiforge.contract.change-approval.v1`.** WS-5 evaluates the operation tier and mints the approval challenge; WS-1 binds the approval token to exact pre-image file hashes and executes the write.
- **Affected Contracts:** `uiforge.contract.change-approval.v1`.
- **ADR Reference:** ADR-015.

---

### CF-08: Multi-File Rollback Atomicity vs. External Package State
- **Workstreams Involved:** WS-1 (Transforms) and WS-3 (Registry & Dependencies).
- **Original Positions:** WS-1 asserted "guaranteed rollback restores repository state". WS-3 noted that adding registry resources often runs `npm install`, modifying `node_modules` and external caches.
- **Technical Contradiction:** Filesystem file rollback cannot roll back external package manager caches or globally installed binaries without running unmanaged package scripts.
- **Resolution:** **Explicitly bound rollback guarantees.** UIForge guarantees atomic rollback of **tracked repository files** recorded in the SQLite pre-image journal. Package manager state changes are isolated: automated dependency operations enforce `--ignore-scripts`, and package restoration requires explicit lockfile reversion.
- **Affected Contracts:** Contract F.
- **ADR Reference:** ADR-008.

---

### CF-09: Cryptographic Digest vs. Digital Signature Terminology
- **Workstreams Involved:** WS-4 (Verification Records) and WS-5 (Audit Logging).
- **Original Positions:** Previous deliverables referred to SHA-256 hashes as "tamper-proof cryptographic signatures".
- **Technical Contradiction:** A SHA-256 hash is a digest, not a digital signature. Without public-key infrastructure or independent external timestamping, an attacker with write access to local storage can recalculate hashes for modified records.
- **Resolution:** **Corrected terminology across all contracts.** Renamed fields to `recordDigest`, `payloadDigest`, and `snapshotHash`. Explicitly document that hash chaining detects corruption and accidental mutation, while legal non-repudiation requires external trust anchors (Phase 04).
- **Affected Contracts:** Contracts G, H, and F.
- **ADR Reference:** ADR-015.

---

### CF-10: In-Memory Policy Testing vs. Operating System Enforcement
- **Workstreams Involved:** WS-5 (Agent Security) and WS-1 (File Transforms).
- **Original Positions:** WS-5 Experiment E5 passed in-memory policy checks for path boundaries, symlinks, and TOCTOU races, leading to claims that security enforcement was established.
- **Technical Contradiction:** Testing JavaScript logic in a test script does not prove real OS-level filesystem protection against concurrent processes, OS symlink dereferencing, or disk locking failures.
- **Resolution:** **Formally reclassify E5 as `LOCAL-HARNESS-TESTED`.** Document the security algorithms in specification, while marking live OS-level kernel filesystem locks and symlink boundary tests as **Phase 03 implementation requirements**.
- **Affected Subsystems:** Security & Execution Layers.
- **ADR Reference:** ADR-015.

---

### CF-11: Multi-Agent Superiority Overclaim
- **Workstreams Involved:** WS-5 (Agent Architecture) and Application Orchestration.
- **Original Positions:** Earlier discussions suggested UIForge implement complex multi-agent swarms (planner, coder, reviewer, tester).
- **Technical Contradiction:** Multi-agent token overhead and latency make frontend iterations unmanageable without proving superior code quality.
- **Resolution:** **Adopt Single-Agent Primacy as the provisional baseline.** Reclassify WS-5 Experiment E8 as a `REPORTED-SIMULATION` cost model (3.28× token bloat, 3× latency). UIForge empowers a single external agent with deterministic tools; multi-agent orchestration is deferred to Phase 04.
- **Affected Contracts:** Contract I, Contract J.
- **ADR Reference:** ADR-014.

---

### CF-12: Outdated MCP Protocol Version Baseline
- **Workstreams Involved:** WS-5 (Agent Integration) and Ingress Architecture.
- **Original Positions:** WS-5 initial audits evaluated the legacy `2024-11-05` MCP specification.
- **Technical Contradiction:** The official TypeScript SDK now targets `2026-07-28` (modular v2 SDK: `@modelcontextprotocol/server`, `@modelcontextprotocol/core`) with a unified Streamable HTTP POST endpoint and removal of legacy GET streaming.
- **Resolution:** **Update MCP ingress adapter baseline to `2026-07-28`**. Expose the single unified POST endpoint and maintain compatibility with the `2025-11-25` maintenance line.
- **Affected Packages:** `@uiforge/mcp-server`.
- **ADR Reference:** ADR-012.
