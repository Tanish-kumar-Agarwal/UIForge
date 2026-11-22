# ADR-011: Versioning Strategy & Wire Protocol Compatibility
## Semantic Versioning, Schema Evolution Policies & Wire Backwards-Compatibility Guarantees

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Principal Software Architect & Infrastructure Engineer  

---

## 1. Context & Problem Statement
UIForge exposes multiple public interface surfaces:
1. npm packages (`@uiforge/*`).
2. Machine-readable JSON contracts and schemas (tokens, design briefs, audit reports).
3. Local storage snapshots and SQLite database tables (`state.db`).
4. Network and stdio wire protocols (Model Context Protocol).

Without a unified versioning and schema evolution policy, updates will break coding agent tool calls, invalidate historical snapshots, or cause runtime schema mismatches.

---

## 2. Decision Constraints
1. **Strict Semantic Versioning:** All npm packages must follow SemVer 2.0.0 (`MAJOR.MINOR.PATCH`).
2. **Schema Invariant:** Minor and patch releases must **never** break existing JSON contracts or remove required fields.
3. **Wire Protocol Compatibility:** The MCP server must support multi-version protocol negotiation (`2026-07-28` modern with fallback to `2025-11-25`).
4. **Snapshot Portability:** Historical project snapshots captured in `.uiforge/snapshots/` must remain readable by future UIForge versions.

---

## 3. Options Considered
- **Option 1: Ad-hoc Versioning (Unversioned JSON Payloads):** Rely on package version bumps only; schemas evolve freely without version namespaces.
- **Option 2: Strict Versioned Contract URI Namespacing:** Every schema, contract, and snapshot embeds an immutable URI identifier (e.g. `uiforge.contract.design-brief.v1`); breaking schema changes increment the contract major version and provide explicit migration transforms.

---

## 4. Evaluation of Options

| Criteria | Option 1: Ad-hoc Versioning | Option 2: Versioned Contract URIs |
| :--- | :--- | :--- |
| **Backwards Compatibility** | Extremely fragile; breaks historical snapshots | High; historical snapshots specify exact schema version |
| **Agent Tool Interop** | Agents fail on subtle field renaming | Agents negotiate exact schema contracts |
| **Database Migration** | Complex, prone to silent data corruption | Deterministic up/down migration scripts |
| **Deprecation Clarity** | Ambiguous | Explicit 6-month deprecation lifecycle |

---

## 5. Decision Outcome
**Selected Option:** **Option 2: Strict Versioned Contract URI Namespacing.**

### Architectural Specification:
1. **Package Versioning:**
   - Managed via `@changesets/cli` across the monorepo.
   - Synchronized core versioning: `@uiforge/core`, `@uiforge/cli`, and `@uiforge/contracts` share coordinated version numbers.
2. **Contract Schema Namespacing:**
   - Every contract schema payload defines a `$schema` property:
     `$schema: "https://schemas.uiforge.dev/v1/design-brief.json"`.
   - Contract IDs follow the format: `uiforge.contract.<entity>.v<major>`.
3. **Schema Evolution Rules:**
   - **Additive Changes (Minor Version):** Adding new optional fields, new non-mandatory tool arguments, or new enum values is permitted without breaking contracts.
   - **Breaking Changes (Major Version):** Renaming fields, removing properties, or changing field types requires a new contract major version (e.g. `v2`).
   - The engine must provide automated schema migration transformers:
     `migrateV1ToV2(payloadV1): payloadV2`.
4. **Wire Protocol Compatibility (Finding C20 & C27):**
   - `@uiforge/mcp-server` advertises modern revision `2026-07-28` by default.
   - Configured with `versionNegotiation: { mode: "auto" }`, it automatically negotiates down to `2025-11-25` or `2024-11-05` if an older client connects.
5. **Database Migration Strategy:**
   - SQLite migrations stored in `@uiforge/storage/migrations/`.
   - Migrations are version-tracked via `PRAGMA user_version`. Up migrations execute automatically on startup.

---

## 6. Consequences & Impact
- **Positive:**
  - Complete backwards compatibility: historical snapshots from Phase 02 remain 100% valid.
  - External AI agents and CI pipelines will not break unexpectedly on UIForge upgrades.
  - Transparent deprecation paths for legacy configurations.
- **Negative:**
  - Requires maintaining migration transformers when evolving major contract versions.

---

## 7. Security & Operational Impact
- Schema version validation blocks malformed, unexpected, or poisoned contract payloads before domain engines process them.

---

## 8. Research References
- Phase 02.2: `SHARED-INTERFACE-CONTRACTS.md`.
- Phase 02.5: Finding C20 & C27 (MCP version negotiation specification).

---

## 9. Open Questions
- None. Versioning and schema evolution policy is locked and frozen.
