# UIFORGE — PHASE 03: VERSIONING STRATEGY & COMPATIBILITY SPECIFICATION
## Semantic Versioning Policies, Contract Schema Evolutions, Wire Handshakes & Deprecation Lifecycles

**Document ID:** `UIF-PH03-VERSIONING-STRATEGY`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Infrastructure Engineer  

---

## 1. Executive Versioning Architecture

UIForge establishes a unified, multi-tier versioning policy governing:
1. **Monorepo Package Versioning (SemVer 2.0.0).**
2. **Machine-Readable Contract Schemas (`uiforge.contract.*.v1`).**
3. **Model Context Protocol (MCP) Wire Negotiation.**
4. **Local SQLite Database Migrations (`state.db`).**

---

## 2. Monorepo Package Versioning (SemVer 2.0.0)

All packages in the `@uiforge/*` monorepo adhere strictly to **Semantic Versioning 2.0.0 (`MAJOR.MINOR.PATCH`)**:
- **`MAJOR` (Breaking Changes):** Breaking public API changes, removal of deprecated contract properties, or major restructuring of monorepo package exports.
- **`MINOR` (New Features & Additive Changes):** New CLI commands, additional MCP tools, new token transforms, or new optional schema fields. 100% backwards compatible.
- **`PATCH` (Bug Fixes & Security Patches):** Defect remediations, performance optimizations, or documentation updates with zero API changes.

### Coordinated Release Groups
Monorepo packages are version-coordinated via `@changesets/cli`:
- **Core Engine Group (Synchronized SemVer):** `@uiforge/core`, `@uiforge/cli`, `@uiforge/contracts`.
- **Domain Engine Group (Independent SemVer):** `@uiforge/tokens`, `@uiforge/browser-eval`, `@uiforge/safe-modifier`, `@uiforge/project-intelligence`.

---

## 3. Contract Schema Evolution & Namespacing

Every JSON entity schema defined in `@uiforge/contracts` features an immutable URI namespace:
```text
https://schemas.uiforge.dev/v<major>/<entity>.json
```

### Schema Evolution Rules:
1. **Additive Compatibility Rule:** New fields introduced in minor versions must always be marked `.optional()` in Zod schemas. Removing fields or making optional fields required is strictly prohibited in minor releases.
2. **Contract Major Increments:** If a field must be renamed or removed, a new major schema version is introduced (e.g. `uiforge.contract.design-brief.v2`).
3. **Automated Migration Transformers:**
   When a major contract version is bumped, `@uiforge/contracts` must provide an automated up-migration transformer:
   ```typescript
   export function migrateBriefV1ToV2(v1: DesignBriefV1): DesignBriefV2 {
     return {
       ...v1,
       $schema: "https://schemas.uiforge.dev/v2/design-brief.json",
       // apply field migrations
     };
   }
   ```
4. **Historical Snapshot Preservation:** Historical project snapshots (`.uiforge/snapshots/SNAP-<id>.json`) store their original `$schema` URI. UIForge Core reads historical snapshots using version-appropriate deserializers, guaranteeing that snapshots from earlier phases remain readable forever.

---

## 4. MCP Wire Protocol Version Negotiation

In strict adherence to Findings **C20 & C27**, `@uiforge/mcp-server` implements multi-revision wire negotiation:
- **Default Modern Revision:** `2026-07-28` (stateless discovery via `server/discover`, per-request version metadata in `_meta`).
- **Automatic Fallback:** Configured with `versionNegotiation: { mode: "auto" }`. When an older agent initiates a legacy JSON-RPC initialize handshake, the server automatically accepts and responds with the highest mutually supported legacy revision (`2025-11-25` or `2024-11-05`).

---

## 5. SQLite Database Migration Lifecycle

Local relational state stored in `.uiforge/state.db` is versioned using SQLite's native `PRAGMA user_version`:
1. **Migration Files:** Stored in `packages/storage/src/migrations/` as numbered SQL scripts (`001_initial_schema.sql`, `002_add_wcag_index.sql`).
2. **Startup Check:** On every UIForge execution, `@uiforge/storage` reads `PRAGMA user_version`. If the file version is less than the code version, it executes pending migrations in a single atomic transaction.
3. **Zero Data Loss:** Migrations only add tables, columns, or indexes; destructive table drops are prohibited.

---

## 6. Deprecation Policy

UIForge enforces a **six-month deprecation lifecycle**:
1. When an API or contract property is slated for removal, it is marked `@deprecated` in TypeScript and logs a non-fatal warning in CLI debug mode.
2. The property remains fully functional for a minimum of 6 months or 1 major version bump.
3. Removal occurs only on the subsequent `MAJOR` release.
