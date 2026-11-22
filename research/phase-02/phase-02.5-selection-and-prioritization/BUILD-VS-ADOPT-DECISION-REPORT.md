# UIForge Phase 02.5: Build vs. Adopt Decision Report

**Document ID:** `UIF-PH02.5-BUILD-VS-ADOPT-DECISION-REPORT`  
**Classification:** Strategic Platform Engineering & Build/Adopt Matrix  
**Status:** Certified / Complete  
**Date:** November 2026  

---

## 1. Architectural Strategy

A core tenet of UIForge is to avoid outsourcing its core value proposition while refusing to reinvent mature open-source infrastructure:
- **Build Internally:** Domain-specific design intelligence, AST project comprehension, heuristic visual scoring, component discovery indexing, and surgical modification safety.
- **Adopt Externally:** Battle-tested execution engines, browser automation drivers, accessibility rule definitions, and standard protocol transports.

---

## 2. Six-Dimensional Capability Evaluation (16 Platform Capabilities)

| Capability Domain | Strategy | Adopted / Referenced External Technology | Internal UIForge Engineering Scope |
| :--- | :---: | :--- | :--- |
| **1. Project AST Analysis** | `BUILD_WRAP` | Native TypeScript Compiler API (`typescript`) | Internal AST visitor engine, project symbol resolver, and type discovery harness. |
| **2. Fast Code Search & Transform** | `ADOPT` | `ast-grep` (`OS-D2C-06`) + Babel 6-Stage Pipeline (`OS-D2C-07`) | Invoked via CLI/N-API for grep; Babel handles fault-tolerant JSX parsing (`errorRecovery: true`) with WAL token buffering and coordinate slice-patching (C15, C22). |
| **3. Design-System Extraction** | `BUILD` | Open-source pattern references (`DTCG`, `Primer`) | Proprietary heuristic engine extracting spacing scales, typography, and color tokens from CSS/Tailwind. |
| **4. Token Normalization** | `ADAPT` | `DTCG 2025.10` (`OS-TOKN-01`) + `style-dictionary` v5.8.0 (`OS-TOKN-02`) | Style Dictionary v5.8.0 natively parses DTCG tokens into Tailwind v4 variables on Node.js 22 LTS (C14). |
| **5. Component Discovery** | `BUILD` | shadcn/ui registry format (`OS-COMP-01`) | Registry crawler, metadata extractor, and multi-registry search index. |
| **6. Registry Metadata** | `BUILD` | Phase 02.4 Draft-07 JSON Schema contracts | Canonical internal manifest engine with provenance, versioning, and license tracking. |
| **7. Provenance Management** | `BUILD` | SHA-256 cryptographic digests | Tamper-evident verification journal tracking all external source evaluations. |
| **8. License Evaluation** | `BUILD` | SPDX license list + Phase 02.3 normalized licenses | Deterministic license gate engine validating permitted consumption modes at build time. |
| **9. Accessibility Evaluation** | `ADAPT_WRAP` | `axe-core` (`OS-A11Y-01`) + W3C APG (`OS-A11Y-08`) | Headless accessibility harness invoking out-of-process `@axe-core/cli` (`CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE`) (C17). |
| **10. Responsive Evaluation** | `BUILD` | Tailwind Container Queries (`OS-LAYT-02`) | Multi-viewport headless Playwright scanner detecting horizontal scroll, overflow, and layout shifts. |
| **11. Visual Regression Diff** | `ADOPT` | `pixelmatch` (`OS-VREG-01`) | Pure JS pixel difference calculator computing perceptual change thresholds. |
| **12. Browser Automation** | `ADOPT` | `playwright` (`OS-BROW-01`) | Headless Chromium/WebKit driver running inside isolated sandbox containers. |
| **13. Agent Orchestration** | `BUILD_WRAP` | Model Context Protocol SDK (`@modelcontextprotocol/server` ^2.1.0) | Implements modern 2026-07-28 discovery (`server/discover`, `_meta`) with auto-negotiation fallback to 2025-11-25 and 2024-11-05 (C13, C20). |
| **14. Permission Enforcement** | `BUILD` | UIForge 6-Mode Consumption Matrix | Runtime authorization gate ensuring AI agents never execute forbidden mutations or copy protected code. |
| **15. Evidence Generation** | `BUILD` | Phase 02.4 Evidence Schema contracts | Automated audit trail generator producing verifiable test manifests and screenshots. |
| **16. Safe Code Patching** | `BUILD` | Gate 1 & Gate 2 TypeScript AST & WAL Journal | Surgical AST modification protocol with write-ahead logging (WAL) ensuring zero regression during code edits. |
