# UIForge Phase 05 — Master Architecture Specification
## Design Intelligence Topology, System Boundaries & Multi-Layer Integration

**Document ID:** UIF-PH05-MASTER-ARCHITECTURE  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Executive Summary & Architectural Positioning

Phase 05 establishes the comprehensive design intelligence, cognitive reasoning, and anti-generic-AI foundation for UIForge. 

In accordance with ADR-002 (Package Boundaries), ADR-005 (Canonical Formats), and the strict Phase 1 execution protocol, Phase 05 produces a **machine-readable knowledge architecture** without altering existing application code or installing unauthorized runtime dependencies.

```
┌──────────────────────────────────────────────────────────────────┐
│                   PHASE 05 KNOWLEDGE FOUNDATION                  │
│                                                                  │
│  ┌─────────────────────────┐        ┌─────────────────────────┐  │
│  │ 01-taxonomy/            │        │ 02-anti-patterns/       │  │
│  │ 19 Visual Principles    │        │ 32 Anti-Patterns        │  │
│  │ 7 Category Taxonomies   │        │ Diagnostic Remediations │  │
│  └────────────┬────────────┘        └────────────┬────────────┘  │
│               │                                  │               │
│               ▼                                  ▼               │
│  ┌─────────────────────────┐        ┌─────────────────────────┐  │
│  │ 03-positive-patterns/   │◄──────►│ 04-knowledge-schema/   │  │
│  │ 10 Product Domains      │        │ JSON Schema Draft-07    │  │
│  │ Selection Intelligence  │        │ Taxonomy Registry       │  │
│  └────────────┬────────────┘        └────────────┬────────────┘  │
│               │                                  │               │
│               ▼                                  ▼               │
│  ┌─────────────────────────┐        ┌─────────────────────────┐  │
│  │ 05-design-intelligence/ │        │ 06-research-and-evidence│  │
│  │ Cognitive Reasoning     │◄──────►│ 24 Evidence Citations   │  │
│  │ Measurable Evaluation   │        │ 7 Authority Sources     │  │
│  └─────────────────────────┘        └─────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Integration with Downstream Packages

1. **`@uiforge/contracts` (Level 0):** In Phase 06, will inherit `KnowledgeEntrySchema` and `AntiPatternSchema` to type all design evaluations at compile-time.
2. **`@uiforge/tokens` (Level 2):** Consumes the 8px/4px spatial grid, OKLCH color ramps, and harmonic typographic scales defined in Phase 05.
3. **`@uiforge/design-engine` (Level 3):** Consumes the 10-step cognitive reasoning pipeline and faceted retrieval index.
4. **`@uiforge/core` (Level 4):** Orchestrates design synthesis and modification tasks using the Anti-Pattern Catalog.
