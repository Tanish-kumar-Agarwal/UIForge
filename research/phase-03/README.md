# UIForge Phase 03 — Product Specification, System Architecture & Architecture Freeze

**Phase ID:** 03  
**Status:** Approved & Architecture Frozen  
**Lead Authority:** Principal Software Architect + Distinguished System Engineer + Technical Lead  
**Verification Level:** 100% Passed (197 Phase 03 Assertions, 320 Total Automated Assertions)  

---

## 1. Directory Structure & Navigation Guide

This directory contains the authoritative technical specifications, system architecture, contracts, security models, and implementation roadmaps for UIForge Phase 03.

```
research/phase-03/
├── 01-product-requirements/
│   ├── USER-PERSONAS-AND-JOBS.md        # 8 User personas, workflows & job stories
│   ├── MASTER-PRD.md                    # Vision, positioning, non-goals, competitive matrix
│   ├── FUNCTIONAL-REQUIREMENTS.md       # Exhaustive FR-01 through FR-15 specifications
│   ├── NON-FUNCTIONAL-REQUIREMENTS.md   # NFR-01 through NFR-10 performance & safety baselines
│   └── MVP-SCOPE.md                     # Brownfield MVP (Level A), Greenfield (Level B), Studio (Level C)
│
├── 02-operating-modes/
│   ├── OPERATING-MODES.md               # 8 First-class operating modes & separation invariants
│   ├── WORKFLOW-SPECIFICATIONS.md       # Multi-step end-to-end Workflows A, B, C, D
│   └── STATE-MACHINES.md                # Task Execution, WAL Transaction, and Approval State Machines
│
├── 03-system-architecture/
│   ├── ARCHITECTURE-PRINCIPLES.md       # 12 Non-negotiable architectural principles
│   ├── MASTER-SYSTEM-ARCHITECTURE.md    # 11 System layers, process model & communications
│   ├── PACKAGE-BOUNDARIES.md            # 16 Packages, responsibilities, public exports, forbidden imports
│   ├── PACKAGE-DEPENDENCY-GRAPH.md      # 7-Level DAG, external runtime dependency matrix
│   ├── DATA-ARCHITECTURE.md             # .uiforge/ directory topology, SQLite state.db, WAL, hash chains
│   ├── DEPLOYMENT-ARCHITECTURE.md       # 5 Deployment topologies (Local CLI, MCP, CI, Docker, Hosted)
│   └── ARCHITECTURE-DIAGRAMS.md         # 10 Mermaid architectural diagrams
│
├── 04-contracts/
│   ├── CONTRACT-CATALOGUE.md            # 28 Canonical versioned contracts (uiforge.contract.*.v1)
│   ├── DATA-SCHEMAS.md                  # Complete Zod schemas & TypeScript interfaces for all 28 contracts
│   ├── API-SPECIFICATION.md             # Service interfaces, MCP tools, execution modes, cancellation
│   ├── ERROR-TAXONOMY.md                # Canonical error codes (UIF-ERR-*), categories, remedies
│   └── VERSIONING-STRATEGY.md           # SemVer, schema URI namespacing, SQLite migration protocol
│
├── 05-security/
│   ├── SECURITY-ARCHITECTURE.md         # Defense-in-depth, 7-stage security lifecycle
│   ├── THREAT-MODEL.md                  # STRIDE analysis of 20 attack scenarios (T01 through T20)
│   ├── TRUST-BOUNDARIES.md              # 4 Trust zones, border enforcement gates
│   └── PERMISSION-AND-APPROVAL-MODEL.md # 5-Level permission ladder, HMAC diff-bound authorization tokens
│
├── 06-open-core/
│   └── OPEN-CORE-BOUNDARIES.md          # Apache-2.0 Core vs Studio, licensing compliance, SBOM
│
├── 07-implementation-roadmap/
│   ├── MVP-IMPLEMENTATION-PLAN.md       # Phase 04 to Phase 07 milestone definitions
│   ├── PHASE-04-ENGINEERING-FOUNDATION.md # Detailed work packages, sprint backlog, testing targets
│   ├── IMPLEMENTATION-DEPENDENCY-MATRIX.md # Topological package prerequisites & critical path
│   └── IMPLEMENTATION-ACCEPTANCE-GATES.md # Formal exit gates for Phase 04, 05, 06, 07
│
├── 08-reconciliation/
│   ├── PHASE-02-TO-PHASE-03-TRACEABILITY.md # 100% Candidate mapping to Phase 03 architecture
│   ├── ARCHITECTURE-DECISION-REGISTER.md   # Register of 11 ADRs in docs/architecture/
│   ├── OPEN-QUESTIONS-AND-RISKS.md      # Risk register & Phase 04 empirical validation plan
│   └── FINAL-RECONCILIATION-REPORT.md   # Comprehensive cross-phase audit & freeze verification
│
├── validation/
│   ├── validate_phase03.js              # Node.js automated verification harness (197 assertions)
│   ├── VALIDATION-RESULTS.md            # Execution logs and SHA-256 script digest
│   └── PHASE-03-ACCEPTANCE-REPORT.md    # 18-row acceptance matrix & formal freeze declaration
│
└── UIFORGE-PHASE-03-FINAL-SPECIFICATION-AND-ARCHITECTURE-FREEZE-REPORT.md # Master closure dossier
```

---

## 2. Companion Architecture Decision Records (ADRs)

All 11 formal Architecture Decision Records are stored in `docs/architecture/`:
- [`ADR-001-monorepo.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-001-monorepo.md): Monorepo Architecture and Workspace Tooling
- [`ADR-002-package-boundaries.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-002-package-boundaries.md): Package Boundary Enforcement & Circular Dependency Prevention
- [`ADR-003-agent-abstraction.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-003-agent-abstraction.md): Agent Integration Abstraction & MCP Ingress Protocol
- [`ADR-004-llm-provider-abstraction.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-004-llm-provider-abstraction.md): LLM Provider Abstraction & Model Decoupling
- [`ADR-005-design-knowledge-format.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-005-design-knowledge-format.md): Design Knowledge Representation & Token Interchange
- [`ADR-006-component-registry.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-006-component-registry.md): Component Registry Architecture & Source-Copy Protocol
- [`ADR-007-evaluation-architecture.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-007-evaluation-architecture.md): Visual & Accessibility Evaluation Engine Architecture
- [`ADR-008-project-safety.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-008-project-safety.md): Project Modification Safety, Splicing & Atomic Rollback
- [`ADR-009-storage.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-009-storage.md): Local-First Storage Architecture & State Management
- [`ADR-010-open-core-boundaries.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-010-open-core-boundaries.md): Open-Core Licensing Boundaries & Commercial Separation
- [`ADR-011-versioning.md`](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/docs/architecture/ADR-011-versioning.md): Schema Versioning, Wire Negotiation & Database Migration Strategy

---

## 3. Key Invariants Frozen in Phase 03

1. **Read-Only by Default:** Exploration and analysis never mutate project source code without explicit authorization.
2. **Decoupled LLM Inference:** UIForge Core never wraps, resells, or meters LLM inference. Coding agents bring their own reasoning engines.
3. **Coordinate Slice Patching:** Splicing replaces only modified character spans $[start, end]$, preserving formatting, comments, and structure.
4. **Pre-Image WAL & Automatic Rollback:** Every modification creates an atomic SQLite pre-image. TypeScript Compiler API regressions trigger automatic rollback.
5. **Diff-Bound HMAC Authorization:** High-level modifications require single-use, time-bound, diff-hashed cryptographic authorization tokens.
6. **Strict 7-Level Monorepo DAG:** 16 packages across Levels 0 through 6 with zero circular dependencies, verified by `madge`.
7. **28 Canonical Contracts:** Pure TypeScript and Zod-validated contracts governing all package and agent communication.
8. **Permissive Open-Core:** Apache-2.0 licensed Core with zero copyleft contaminations; cleanly decoupled commercial Studio.

---

## 4. Acceptance Summary

Phase 03 is **100% complete** and formally approved. To inspect the full acceptance matrix and freeze declaration, refer to [PHASE-03-ACCEPTANCE-REPORT.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-03/validation/PHASE-03-ACCEPTANCE-REPORT.md).
