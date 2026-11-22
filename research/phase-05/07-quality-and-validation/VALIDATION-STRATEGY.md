# UIForge Phase 05 — Validation Strategy & Automated Integrity Suite
## Multi-Stage Integrity Checks, Schema Verification & Referential Closure

**Document ID:** UIF-PH05-VALIDATION-STRATEGY  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Validation Architecture

To guarantee that the knowledge base remains mathematically consistent and free of broken links or orphaned entries, UIForge implements a **four-stage validation suite**:

1. **Stage 1: Structural File Integrity:**
   * Verifies the presence of all 40+ canonical Phase 05 specification files across the 8 subdirectories.
2. **Stage 2: Schema Syntax & Machine-Readability:**
   * Validates `knowledge-entry.schema.json`, `taxonomy-registry.json`, `anti-pattern-catalogue.json`, and `EVIDENCE-REGISTER.json` against JSON Schema Draft-07 specifications.
3. **Stage 3: Referential Closure & Graph Integrity:**
   * Verifies that every `evidence` citation (`EVID-*`) resolves to a valid entry in `EVIDENCE-REGISTER.json`.
   * Verifies that every `sourceId` (`SRC-*`) resolves to a valid entry in `SOURCE-REGISTER.md`.
   * Verifies that every `antiPatterns` reference resolves to an active entry in `anti-pattern-catalogue.json`.
   * Verifies that all categories and subcategories match `taxonomy-registry.json`.
4. **Stage 4: Qualitative Completeness & Anti-Pattern Coverage:**
   * Checks that all 19 visual fundamental principles have all 12 required canonical fields.
   * Checks that all 10 canonical domains have dedicated positive pattern specifications.
   * Checks that all 8 anti-pattern categories are fully represented with remediations.
