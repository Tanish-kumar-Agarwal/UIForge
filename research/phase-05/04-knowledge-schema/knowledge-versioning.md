# UIForge Phase 05 — Knowledge Versioning & Deprecation Lifecycle
## Semantic Versioning, Evolution Contracts & Deprecation Mechanics

**Document ID:** UIF-PH05-KNOWLEDGE-VERSIONING  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Semantic Versioning Specification (`MAJOR.MINOR.PATCH`)

All knowledge entries and catalog files maintain independent semantic versions conforming to SemVer 2.0.0:

1. **MAJOR Version Bump (`X.0.0`):**
   * Breaking schema changes (e.g. removal of a required property, changing property data types).
   * Fundamental inversion of a normative design rule (e.g. WCAG 3.0 APCA replacing WCAG 2.2 contrast formula).
   * Retires deprecated entries without fallback.
2. **MINOR Version Bump (`x.Y.0`):**
   * Addition of new knowledge entries, anti-patterns, or positive patterns.
   * Broadening applicability domains or adding new evidence citations.
   * Deprecating an entry while providing `supersededBy` pointing to the replacement.
3. **PATCH Version Bump (`x.y.Z`):**
   * Typos, grammatical clarifications, or URL updates in evidence citations.
   * Tightening descriptions without altering evaluation criteria or thresholds.

---

## 2. Knowledge Entry Deprecation Lifecycle

```
┌──────────┐     Publish      ┌──────────┐     Supersede     ┌──────────────┐     Retire     ┌───────────┐
│  DRAFT   ├─────────────────►│  ACTIVE  ├──────────────────►│  DEPRECATED  ├───────────────►│  RETIRED  │
└──────────┘                  └──────────┘                   └──────────────┘                └───────────┘
                                    │                               │
                                    │ Replaced                      │ Preserved in
                                    ▼                               ▼ historical logs
                               ┌──────────┐                   ┌──────────────┐
                               │SUPERSEDED│                   │  AUDIT TRAIL │
                               └──────────┘                   └──────────────┘
```

1. **Active:** Fully enforceable by the Design Intelligence Engine and evaluation linters.
2. **Deprecated:** Emits a warning during evaluation; continues to evaluate for at least one minor release cycle. Must specify `supersededBy`.
3. **Superseded:** Kept in historical storage for backward compatibility with older project analysis snapshots, but never retrieved for new designs.
4. **Retired:** Completely excluded from runtime resolution; preserved in Git version control.
