# UIForge Phase 05: Master Design Knowledge Base & Anti-Generic-UI Intelligence
## The Core Design Intelligence, Ergonomic Taxonomy & Anti-AI UI Rulebook for UIForge

**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  
**Document ID:** UIF-PH05-INDEX  
**Status:** Complete (Phase 1 Specification & Knowledge Architecture)  
**Authority:** Principal Design Systems Architect & Distinguished Frontend Architect  

---

## 1. Executive Overview

Phase 05 establishes the foundational design intelligence for UIForge. It equips future AI coding agents and human engineers with the formal reasoning capabilities required to:
- Understand **why** professional interfaces succeed optically, ergonomically, and cognitively.
- Detect and systematically eradicate **generic AI design tropes** (sluggish animations, unaligned bento grids, low-contrast text, excessive pills, floating blur blobs).
- Apply **context-specific design architectures** across 10 distinct software domains without forcing a single universal aesthetic.
- Evaluate interface quality using **measurable, evidence-backed physical signals** rather than subjective or arbitrary scores.

---

## 2. Directory Architecture & Canonical Deliverables

```
research/phase-05/
├── 01-taxonomy/                       # Master Design Knowledge Taxonomy
│   ├── MASTER-DESIGN-KNOWLEDGE-TAXONOMY.md
│   ├── visual-fundamentals.md         # 19 Principles (each with 12 canonical fields)
│   ├── layout-engineering.md          # 8px/4px spatial grid, container queries, grids
│   ├── typography-intelligence.md     # Harmonic scales, 65ch measure, tabular figures
│   ├── color-intelligence.md          # OKLCH perceptual space, 6 functional tiers
│   ├── interaction-and-motion.md      # 9 canonical states, focus rings, reduced motion
│   ├── ux-information-architecture.md # Form flows, error summaries, destructive guards
│   ├── design-systems-intelligence.md # W3C DTCG 2025.10 3-tier token architecture
│   └── terminology-glossary.md        # Authoritative definitions & disambiguation
│
├── 02-anti-patterns/                  # Anti-Generic-AI UI Master Rulebook
│   ├── ANTI-GENERIC-UI-MASTER-RULEBOOK.md
│   ├── layout-anti-patterns.md        # Grid monotony, bento abuse, container inception
│   ├── typography-anti-patterns.md    # Unbounded measure, flat hierarchy, proportional nums
│   ├── color-anti-patterns.md         # Low contrast, tacky gradients, pitch black glare
│   ├── interaction-anti-patterns.md   # Sluggish animations, missing focus rings, blanks
│   ├── composition-anti-patterns.md   # Floating blobs, glassmorphism, pill overload
│   ├── content-anti-patterns.md       # Placeholder copy, unrealistic claims, fake metrics
│   ├── responsive-anti-patterns.md    # Viewport squeezing, overflow, cramped touch targets
│   ├── accessibility-anti-patterns.md # Color-only status, div buttons, keyboard traps
│   └── anti-pattern-catalogue.json    # 32 machine-readable entries with remediations
│
├── 03-positive-patterns/              # Context-Specific Positive Pattern Library
│   ├── POSITIVE-DESIGN-PATTERN-LIBRARY.md
│   ├── editorial-patterns.md          # Domain 1: Editorial & Long-Form Reading
│   ├── enterprise-saas-patterns.md    # Domain 2: Enterprise SaaS & Data Grids
│   ├── fintech-patterns.md            # Domain 3: Fintech & Financial Ledgers
│   ├── ecommerce-patterns.md          # Domain 4: E-Commerce & Merchant Platforms
│   ├── developer-tool-patterns.md     # Domain 5: Developer Tools & Diff Splitters
│   ├── healthcare-patterns.md         # Domain 6: Healthcare & Clinical Triage
│   ├── education-patterns.md          # Domain 7: Education & Stepped Learning
│   ├── dashboard-patterns.md          # Domain 8: Dashboards & Subgrid KPI Decks
│   ├── administration-patterns.md     # Domain 9: Administration & GOV.UK Error Summary
│   └── consumer-application-patterns.md # Domain 10: Consumer Apps & Bottom Sheets
│
├── 04-knowledge-schema/               # Versioned Machine-Readable Contracts
│   ├── KNOWLEDGE-MODEL-SPECIFICATION.md
│   ├── knowledge-entry.schema.json    # JSON Schema Draft-07 specification
│   ├── knowledge-types.md             # Principles, Anti-Patterns, Heuristics, Rules
│   ├── taxonomy-registry.json         # Categories, subcategories, domains, severities
│   ├── knowledge-versioning.md        # SemVer 2.0.0 lifecycle & deprecation rules
│   └── knowledge-governance.md        # Editorial review gates & bias mitigation
│
├── 05-design-intelligence/            # Future Design Intelligence Engine Specification
│   ├── DESIGN-INTELLIGENCE-ENGINE-ARCHITECTURE.md
│   ├── knowledge-retrieval.md         # Faceted multi-dimensional querying
│   ├── contextual-reasoning.md        # 10-step cognitive reasoning pipeline
│   ├── pattern-selection.md           # Multi-alternative trade-off matrices
│   ├── conflict-resolution.md         # Precedence hierarchy (Standards > Ergonomics > Brand)
│   ├── design-evaluation-framework.md # Measurable signals & anti-false-precision
│   └── explainability-and-confidence.md # Traceable evidence & uncertainty reporting
│
├── 06-research-and-evidence/          # Authoritative Research & Provenance
│   ├── RESEARCH-METHODOLOGY.md        # Source triangulation & non-fabrication rules
│   ├── SOURCE-REGISTER.md             # Normative standards (WCAG 2.2, W3C CSS, DTCG)
│   ├── EVIDENCE-REGISTER.json         # 24 machine-readable evidence entries
│   ├── design-system-references.md    # Deconstruction of Material 3, Carbon, HIG, Polaris
│   ├── standards-and-specifications.md# Web platform & accessibility standards
│   └── evidence-limitations.md        # Known boundaries & epistemic humility
│
├── 07-quality-and-validation/         # Integrity & Validation Suite
│   ├── KNOWLEDGE-QUALITY-STANDARD.md  # 10 Cardinal Quality Principles
│   ├── VALIDATION-STRATEGY.md         # 4-stage validation pipeline
│   ├── contradiction-register.md      # Dialectical tensions & canonical reconciliations
│   ├── coverage-matrix.md             # Traceability across 7 categories & 10 domains
│   ├── validate_phase05.js            # Automated verification test runner
│   └── validation-results.md          # Empirical audit results (100% passing)
│
└── 08-architecture-and-roadmap/       # Architecture & Phase 06 Handoff
    ├── PHASE-05-ARCHITECTURE.md       # High-level architecture & package positioning
    ├── PACKAGE-AND-CONTRACT-IMPACT.md # Downstream contracts & zero-drift guarantee
    ├── PHASE-06-IMPLEMENTATION-HANDOFF.md # Acceptance handoff to Phase 06
    ├── DECISION-REGISTER.md           # Architectural decisions frozen in Phase 05
    ├── RISK-REGISTER.md               # Technical risks & formal mitigations
    └── PHASE-05-ACCEPTANCE-REPORT.md  # Formal audit of Gates 1 through 10
```

---

## 3. Automated Validation Execution

To run the automated integrity suite:
```bash
node research/phase-05/07-quality-and-validation/validate_phase05.js
```
The suite verifies all structural files, JSON schemas, referential integrity, and acceptance gates.
