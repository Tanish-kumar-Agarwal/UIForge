# UIFORGE — PHASE 03: DATA ARCHITECTURE & STORAGE SPECIFICATION
## Local-First Storage Topology, Snapshot Formats, WAL Journaling & Data Retention Lifecycle

**Document ID:** `UIF-PH03-DATA-ARCHITECTURE`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Principal Database Architect  

---

## 1. Executive Storage Architecture

UIForge implements a **Local-First, Content-Addressed Data Architecture**. To protect developer privacy, preserve project intellectual property, and enable 100% offline functionality, all operational state, design tokens, snapshots, and audit logs reside within the target project's `.uiforge/` directory.

No distributed cloud database, managed SaaS backend, or external network storage is required for full Core functionality.

---

## 2. The `.uiforge/` Directory Topology

```
<project-root>/
└── .uiforge/
    ├── config.json            # Project-level UIForge configuration
    ├── state.db               # SQLite database for relational metadata & queries
    ├── audit.jsonl            # Append-only cryptographic security & event journal
    ├── cache/                 # Ephemeral parse trees & route manifests (gitignored)
    │   ├── ast-index.json
    │   └── route-manifest.json
    ├── snapshots/             # Immutable content-addressed project snapshots
    │   ├── SNAP-0a1b2c3d.json
    │   └── SNAP-4e5f6g7h.json
    ├── wal/                   # Active Write-Ahead Log transaction pre-images
    │   ├── journal-txn-001.log
    │   └── journal-txn-001.meta.json
    ├── briefs/                # Structured Design Brief records
    │   └── BRIEF-20261122-01.json
    ├── directions/            # Selected Visual Direction records
    │   └── DIR-modern-enterprise.json
    ├── evaluations/           # Raw headless browser & a11y evaluation records
    │   ├── EVAL-20261122-1400.json
    │   └── screenshots/
    │       ├── baseline-375px.png
    │       ├── current-375px.png
    │       └── diff-375px.png
    └── tokens/                # W3C DTCG source design tokens
        └── tokens.json
```

---

## 3. Core Data Entities & Content-Addressing

### 3.1 Content-Addressed Project Snapshots (`SNAP-<hash>.json`)
Snapshots represent immutable, point-in-time captures of a project's frontend state.
- **Identifier:** `SNAP-<sha256-first-8>` where hash is computed over the serialized canonical JSON payload.
- **Payload Structure:**
  ```json
  {
    "snapshotId": "SNAP-a1b2c3d4",
    "timestamp": "2026-11-22T17:50:00.000Z",
    "projectRoot": "/workspace/my-app",
    "gitCommit": "55a69a93f412...",
    "framework": { "name": "next", "version": "15.1.0", "router": "app" },
    "tokensHash": "8f4a2c...",
    "componentInventory": [
      { "name": "Button", "path": "src/components/ui/button.tsx", "hash": "1a2b..." }
    ],
    "packageLockDigest": "3e4f5a...",
    "latestEvaluationId": "EVAL-20261122-1400"
  }
  ```
- **Storage Policy:** Snapshots reference file hashes and token digests; they do **not** duplicate the full source code tree, keeping snapshot files $< 100\text{ KB}$ each.

### 3.2 Write-Ahead Log (WAL) Journal Format
Prior to executing any file mutation, the Safe Modifier writes a pre-image journal to `.uiforge/wal/journal-<txnId>.log`:
- **Format:**
  ```text
  --- BEGIN TRANSACTION txn_20261122_001 ---
  TARGET_PATH: src/components/ui/modal.tsx
  ORIGINAL_SHA256: d41d8cd98f00b204e9800998ecf8427e...
  ORIGINAL_BYTES_LENGTH: 4210
  --- BEGIN PRE-IMAGE ---
  <Exact byte-for-byte pre-modification contents>
  --- END PRE-IMAGE ---
  PROPOSED_DIFF_SHA256: 7f8a9b...
  AUTHORIZATION_TOKEN_ID: AUTH-TOKEN-9912
  STATUS: STAGED
  ```
- **Guarantees:** If the process crashes mid-write, the WAL recovery scanner restores the pre-image on subsequent startup before any new commands execute.

### 3.3 Append-Only Audit Journal (`audit.jsonl`)
Every state transition, agent tool invocation, and human approval is written to `audit.jsonl`:
- **Record Structure:**
  ```json
  {
    "sequence": 1042,
    "timestamp": "2026-11-22T17:52:10.124Z",
    "eventType": "MUTATION_COMMITTED",
    "actor": { "type": "AGENT", "identity": "claude-code-v1" },
    "targetFiles": ["src/components/ui/modal.tsx"],
    "authorizationTokenId": "AUTH-TOKEN-9912",
    "prevEventHash": "b3f4a1...",
    "eventHash": "c5e6d7..."
  }
  ```
- **Tamper-Evident Hash Chaining:** Each record includes `prevEventHash` (SHA-256 of the prior line), forming an immutable hash chain.

---

## 4. SQLite Relational Store (`state.db`)

For fast local queries across large component libraries and historical test runs, UIForge embeds a lightweight SQLite database managed by `better-sqlite3`:

```sql
CREATE TABLE IF NOT EXISTS components (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    source_type TEXT NOT NULL, -- LOCAL, REGISTRY_SHADCN, MONOREPO
    category TEXT NOT NULL,
    props_schema TEXT,         -- JSON string of prop interfaces
    ast_hash TEXT NOT NULL,
    last_scanned_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS findings (
    id TEXT PRIMARY KEY,
    evaluation_id TEXT NOT NULL,
    category TEXT NOT NULL,    -- A11Y, UX, RESPONSIVE, TS_DIAGNOSTIC
    severity TEXT NOT NULL,    -- CRITICAL, SERIOUS, MODERATE, MINOR
    wcag_criteria TEXT,        -- e.g. "1.4.3"
    selector TEXT NOT NULL,
    file_path TEXT,
    line_number INTEGER,
    remediation_patch TEXT,
    status TEXT NOT NULL       -- OPEN, RESOLVED, SUPPRESSED
);
```

---

## 5. Data Retention & Pruning Lifecycle

1. **Snapshots:** Retains last 20 snapshots by default; older snapshots pruned automatically unless tagged with `--keep`.
2. **Screenshots & Visual Diffs:** Stored in `.uiforge/evaluations/screenshots/`. Automatic pruning removes images older than 14 days or exceeding 500 MB total cache.
3. **Cache Files:** `.uiforge/cache/` is ephemeral and can be deleted at any time without data loss (`uiforge cache clean`).
4. **Audit Journal:** `audit.jsonl` is permanent and never automatically pruned.
