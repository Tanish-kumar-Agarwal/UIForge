# UIFORGE — PHASE 03: ARCHITECTURE DECISION REGISTER (ADR-001 TO ADR-011)
## Master Register of Architecture Decisions, Statuses, Drivers & Architectural Impacts

**Document ID:** `UIF-PH03-ADR-REGISTER`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Technical Auditor  

---

## 1. Executive ADR Register Summary

Phase 03 formally documents and freezes eleven Architecture Decision Records (ADRs). Every ADR addresses a fundamental architectural choice, evaluates concrete options, documents trade-offs, and establishes permanent engineering invariants for UIForge implementation.

All 11 ADR files are located in `docs/architecture/`.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             MASTER ARCHITECTURE DECISION REGISTER                                │
├─────────┬──────────────────────────┬──────────┬────────────┬─────────────────────────────────────┤
│ ADR ID  │ Title                    │ Status   │ Date       │ Core Architectural Decision         │
├─────────┼──────────────────────────┼──────────┼────────────┼─────────────────────────────────────┤
│ ADR-001 │ Monorepo Architecture    │ ACCEPTED │ 2026-11-22 │ pnpm workspaces + Turborepo DAG     │
│ ADR-002 │ Package Boundaries       │ ACCEPTED │ 2026-11-22 │ Strict 7-level DAG; 0 circularity   │
│ ADR-003 │ Agent Abstraction        │ ACCEPTED │ 2026-11-22 │ MCP 2026-07-28 stateless server     │
│ ADR-004 │ LLM Provider Abstraction │ ACCEPTED │ 2026-11-22 │ Decoupled; Core has 0 LLM billing   │
│ ADR-005 │ Design Knowledge Format  │ ACCEPTED │ 2026-11-22 │ W3C DTCG 2025.10 tokens + Zod       │
│ ADR-006 │ Component Registry       │ ACCEPTED │ 2026-11-22 │ shadcn source-copy + Radix/Aria     │
│ ADR-007 │ Evaluation Architecture  │ ACCEPTED │ 2026-11-22 │ Headless Playwright + Pixelmatch    │
│ ADR-008 │ Project Safety           │ ACCEPTED │ 2026-11-22 │ Pre-image WAL + TS diagnostic check │
│ ADR-009 │ Local Storage            │ ACCEPTED │ 2026-11-22 │ .uiforge/ JSON + SQLite state.db    │
│ ADR-010 │ Open-Core Boundaries     │ ACCEPTED │ 2026-11-22 │ Permissive Apache-2.0 Core; Studio  │
│ ADR-011 │ Versioning Strategy      │ ACCEPTED │ 2026-11-22 │ SemVer + versioned contract URIs    │
└─────────┴──────────────────────────┴──────────┴────────────┴─────────────────────────────────────┘
```

---

## 2. Traceability Matrix: ADRs to System Invariants & Workstreams

| ADR Number | Addressed Workstream | System Invariant Protected | Key Downstream Package |
| :--- | :--- | :--- | :--- |
| **ADR-001** | Workstream 4 (Architecture) | Single coordinated build & release lifecycle | Root repository tooling |
| **ADR-002** | Workstream 4 (Architecture) | Zero circular dependencies; pure ground contracts | `@uiforge/contracts` |
| **ADR-003** | Workstream 3 & 4 (Ingress) | Universal agent interoperability without lock-in | `@uiforge/mcp-server` |
| **ADR-004** | Workstream 4 (Core) | 100% deterministic, free offline Core engine | `@uiforge/core` |
| **ADR-005** | Workstream 2 (Tokens) | W3C DTCG standard compliance & multi-styling | `@uiforge/tokens` |
| **ADR-006** | Workstream 2 (Components) | Zero mandatory runtime component dependency | `@uiforge/component-registry` |
| **ADR-007** | Workstream 3 (Verification) | Independent, evidence-backed evaluation | `@uiforge/browser-eval` |
| **ADR-008** | Workstream 2 & 4 (Safety) | Non-destructive mutation; 100% atomic rollback | `@uiforge/safe-modifier` |
| **ADR-009** | Workstream 4 (Storage) | Local-first data sovereignty; 0 cloud dependency | `@uiforge/storage` |
| **ADR-010** | Workstream 8 (Open-Core) | Unrestricted open-source developer trust | Monorepo licensing |
| **ADR-011** | Workstream 6 (Contracts) | Complete backwards compatibility across versions | Monorepo changesets |
