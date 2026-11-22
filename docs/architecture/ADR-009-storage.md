# ADR-009: Local-First Data Storage & Persistence Architecture
## Adoption of Local .uiforge/ Directory, SQLite Relational State & Append-Only Audit Logging

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Principal Database Architect & Principal Software Architect  

---

## 1. Context & Problem Statement
UIForge requires persistent storage for project configurations, component inventories, W3C DTCG tokens, point-in-time project snapshots, visual diff baselines, Write-Ahead Logs, and audit journals.

We must decide whether to rely on a distributed cloud database, a central server, flat JSON files, or an embedded local database.

---

## 2. Decision Constraints
1. **Local-First & Offline:** Must function 100% offline without network connectivity or external database services (PostgreSQL, MongoDB).
2. **Zero-Configuration:** Developers should not have to install, configure, or administer a database daemon.
3. **High-Performance Querying:** Must perform fast relational queries over component registries and historical defect findings.
4. **Git-Friendly & Non-Intrusive:** Storage must reside within the project's local `.uiforge/` directory and respect version control ignore rules.

---

## 3. Options Considered
- **Option 1: Distributed Cloud Database (PostgreSQL / Supabase / DynamoDB):** Store all project metadata, tokens, and audit logs in a centralized hosted database.
- **Option 2: Flat JSON Files Only:** Store everything in raw `.json` files inside `.uiforge/`.
- **Option 3: Hybrid Local-First (Flat JSON Artifacts + SQLite `state.db`):** Human-readable configuration, tokens, and snapshots stored as standard JSON; fast relational queries and finding indexes stored in an embedded SQLite database (`better-sqlite3`).

---

## 4. Evaluation of Options

| Criteria | Option 1: Cloud Database | Option 2: Pure Flat JSON | Option 3: Hybrid Local (JSON + SQLite) |
| :--- | :--- | :--- | :--- |
| **Offline / Local-First** | Fails completely offline | 100% Offline | 100% Offline |
| **Developer Privacy** | Data leaves machine | 100% Local | 100% Local |
| **Query Performance** | Fast (remote network) | Slow on large file scans | Blazing fast local B-tree indexing |
| **Human Readability** | Poor (hidden in cloud) | Excellent (inspect JSON) | Excellent for tokens/snapshots; indexed DB |
| **Setup Complexity** | High (credentials, cloud)| Zero | Zero (embedded SQLite binary) |

---

## 5. Decision Outcome
**Selected Option:** **Option 3: Hybrid Local-First Architecture (Flat JSON Artifacts + SQLite `state.db`).**

### Architectural Specification:
1. **Local Project Root Storage (`.uiforge/`):**
   - Config & Tokens: `config.json`, `tokens/tokens.json` (Human-readable, git-committable).
   - Content-Addressed Snapshots: `snapshots/SNAP-<hash>.json` (Immutable JSON manifests).
   - Write-Ahead Logs: `wal/journal-<id>.log` (Text-based pre-images).
   - Audit Trail: `audit.jsonl` (Append-only, SHA-256 hash-chained JSON lines).
   - Cache: `cache/` (Ephemeral AST parse trees; gitignored).
2. **Embedded Relational Store (`.uiforge/state.db`):**
   - Powered by `better-sqlite3` embedded driver running locally in Node.js.
   - Stores fast relational tables for components, routes, and categorized findings.
   - Enables instant SQL filtering for CLI queries like `uiforge component search --category=dialog --a11y=tier1`.

---

## 6. Consequences & Impact
- **Positive:**
  - Zero cloud dependencies; 100% developer privacy and offline operation.
  - Human developers can directly view, inspect, and git-commit `tokens.json` and design briefs.
  - Relational queries across thousands of components execute in $< 5\text{ms}$.
- **Negative:**
  - `better-sqlite3` includes a pre-built native NAPI binary; requires standard platform support across Windows, macOS, and Linux.

---

## 7. Security & Operational Impact
- SQLite database is file-locked to the active Node.js process; permissions restricted to the current operating system user.
- Audit trail uses cryptographic hash chaining (`prevEventHash`) to detect file tampering.

---

## 8. Research References
- Phase 02.2: `UNIFIED-EVIDENCE-ARCHITECTURE.md`.
- Phase 03: `DATA-ARCHITECTURE.md`.

---

## 9. Open Questions
- None. Storage architecture is locked and frozen.
