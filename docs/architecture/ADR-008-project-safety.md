# ADR-008: Project Safety, Non-Destructive Mutation & Write-Ahead Logging (WAL)
## Pre-Image Journaling, Coordinate Slice Patching, TypeScript Semantic Baselines & External-Edit Protection

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Application Security Architect, Principal Software Architect & Compiler Specialist  
**Classification:** `[ARCHITECTURE-DECISION]`  

---

## 1. Context & Problem Statement
The single greatest source of developer distrust toward AI coding assistants is **uncontrolled, destructive codebase mutation**. Automated tools frequently:
1. Overwrite working custom business logic during broad refactorings.
2. Clobber custom code comments, formatting, and indentation.
3. Silently introduce syntax breaks, import errors, or type regressions.
4. Execute file modifications without explicit human authorization.
5. Suffer from partial file corruption if interrupted mid-write.
6. Overwrite concurrent external edits made by the developer or IDE (Time-of-Check to Time-of-Use / TOCTOU conflicts).

UIForge requires a rigorous safety architecture that guarantees zero silent code destruction, crash-resilient rollback, external-edit conflict prevention, and strict human authorization.

---

## 2. Decision Constraints
1. **Read-Only Brownfield Default:** All repository inspection, AST analysis, and audit operations must be strictly non-mutating.
2. **Formatting & Comment Preservation:** Modifications must not rewrite entire files with AST pretty-printers; they must mutate only targeted character spans $[start, end]$.
3. **Decoupled WAL & OS Filesystem Crash Recovery:**
   - *Critical Constraint:* SQLite database transactions (`PRAGMA journal_mode = WAL;`) provide ACID guarantees exclusively for internal SQLite pages (`state.db`). They **cannot** make external operating system filesystem modifications atomic.
   - Operating system filesystem modifications require an independent, dedicated two-phase pre-image journaling protocol with synchronous disk flush (`fsync`) and startup crash recovery.
4. **External-Edit & TOCTOU Protection:** UIForge must detect if a target file has been modified externally (by a developer, editor, or git checkout) between initial AST inspection and modification execution. If file content or hash deviates, the transaction must abort.
5. **TypeScript Semantic Conformance Comparator:**
   - *Qualification:* A successful TypeScript compilation check evaluates **semantic type and syntax conformance only**. It does **not** prove runtime behavioral correctness, UI rendering fidelity, event handler execution, or business logic preservation.
   - Mutations must be checked against baseline diagnostics ($\text{baselineErrors}$). If $\text{postErrors} \setminus \text{baselineErrors} > 0$, the mutation must be rolled back.
6. **Diff-Bound Authorization Tokens:** Mutations must be locked behind cryptographic tokens bound to the SHA-256 hash of the exact unified diff.

---

## 3. Options Considered
- **Option 1: Whole-File Overwriting via AST Printer (Babel / Prettier):** Parse AST, mutate nodes, and re-print the entire file using `@babel/generator` or Prettier.
- **Option 2: Git Stash / Temporary Branch Commits:** Use Git branching and stashing as the rollback and safety mechanism.
- **Option 3: Coordinate-Based Slice Patching + Two-Phase Pre-Image Journal + TS Semantic Comparator + TOCTOU Guard:** Apply surgical character slices directly, journal original file bytes before write with `fsync`, verify hash pre-conditions, check TS compiler diagnostic deltas, and execute atomic rollback on regression or crash.

---

## 4. Evaluation of Options

| Criteria | Option 1: Whole-File Reprinter | Option 2: Git Branching | Option 3: Slice Patch + Two-Phase Journal + TS Comparator |
| :--- | :--- | :--- | :--- |
| **Comment & Whitespace Safety** | Destructive (clobbers custom formatting)| Preserved | 100% Preserved (touches only mutated character span) |
| **Git Working Tree Invariant** | Destroys uncommitted user work | Creates messy branch trees| Preserves uncommitted user work completely |
| **OS Filesystem Crash Atomicity** | Partial file corruption risk | Git lockfile conflicts | Crash-resilient via synchronous pre-image journal & recovery |
| **External-Edit (TOCTOU) Safety**| Blind overwrite | Merge conflicts | Aborts immediately if pre-write file hash diverges |
| **Type Regression Detection**| None (blind write) | None | Automated TS Compiler API diagnostic delta check |

---

## 5. Decision Outcome
**Selected Option:** **Option 3: Coordinate-Based Slice Patching + Two-Phase Pre-Image Journal + TS Semantic Comparator + TOCTOU Guard.**

### Architectural Specification:

#### 1. Coordinate Slice Patcher (`@uiforge/safe-modifier`):
- Calculates exact 0-indexed character offsets $[start, end]$ from AST nodes or search matches.
- Slices target buffer: `buffer.slice(0, start) + newContent + buffer.slice(end)`.
- Leaves 100% of surrounding lines, comments, and whitespace untouched.

#### 2. Two-Phase Pre-Image Journal & Crash Recovery Protocol:
- **Phase 2.1 (Journal Pre-Image):** Before modifying any target file on the OS filesystem, `@uiforge/safe-modifier` writes a pre-image journal entry into `.uiforge/wal/journal-<txid>.bin`. The journal contains:
  - Transaction UUID and timestamp.
  - Target absolute file path.
  - Original file content buffer and SHA-256 hash.
  - Synchronously flushed to storage using `fs.fsyncSync`.
- **Phase 2.2 (Staged Write / Atomic Replacement):** The mutated buffer is written to a shadow file (`<target>.uiforge-tmp`) and atomically renamed over the target file (`fs.renameSync` where supported) or written with rollback recovery journal active.
- **Phase 2.3 (Startup Crash Recovery):** On process startup, `@uiforge/safe-modifier` inspects `.uiforge/wal/`. Any uncommitted or orphaned journal entries trigger an immediate byte-for-byte restoration of the original pre-image.

#### 3. Time-of-Check to Time-of-Use (TOCTOU) External-Edit Protection:
- During initial AST inspection, UIForge records `expectedHash = sha256(fileBuffer)`.
- Immediately before applying the mutation to disk, UIForge reads the target file and verifies: `sha256(diskBuffer) === expectedHash`.
- If the hash differs (indicating external developer editing, git checkout, or linter mutation), the transaction is immediately rejected with `UIF-ERR-TOCTOU-CONFLICT`. No files are touched.

#### 4. TypeScript Semantic Conformance Comparator:
- Evaluates compiler diagnostics via the TypeScript Compiler API before mutation ($\text{baseline}$).
- Evaluates compiler diagnostics immediately after mutation ($\text{post}$).
- Computes: $\text{newRegressions} = \text{post} \setminus \text{baseline}$.
- If $\text{newRegressions} > 0$: immediately triggers atomic journal rollback, restores pre-image files, and returns diagnostics.
- If $\text{newRegressions} === 0$: marks transaction `COMMITTED` and clears the journal entry.
- **Crucial Qualification:** A clean TypeScript check guarantees that no new syntax breaks or type mismatches were introduced; it does **not** substitute for unit tests, accessibility audits, or visual regression evaluations.

#### 5. Five-Level Security Ladder & Diff-Bound Authorization:
- Level 0 (Read-Only), Level 1 (Local Output), Level 2 (Scaffold/New), Level 3 (Mutate Existing), Level 4 (Subprocess).
- Level 3 mutations require an authorization token embedding `sha256(unifiedDiff)` signed with an HMAC secret. Any tampering with the diff invalidates the token.

---

## 6. Consequences & Impact
- **Positive:**
  - Robust protection against destructive AI coding agent mutations and file corruption.
  - Developers can run UIForge on messy brownfield repositories with uncommitted working-tree changes without fear of silent overwrites.
  - External edits made concurrently by developers are safely preserved via TOCTOU guards.
  - Compile errors and syntax regressions are blocked at the source level.
- **Negative:**
  - Running full TypeScript diagnostic checks adds 1–3 seconds to mutation execution times on large projects.
  - Two-phase disk journaling introduces minor disk I/O overhead ($<15\text{ms}$).

---

## 7. Security & Operational Impact
- Protects against malicious agents attempting to overwrite `.env` files, inject telemetry, or bypass security rules.
- Canonical path checks prevent directory traversal attacks (`../../`).

---

## 8. Research References
- Phase 02.2: `SECURITY-AND-TRUST-ARCHITECTURE.md` (5-Level Security Ladder).
- Phase 02.5: Finding C22 & C26 (Decoupled Babel parser from UIForge WAL).
- Phase 02.5: `verify_babel_recovery.js` (Verified 10/10 assertions for WAL & TS comparator, proving "Zero diagnostics != proof of behavioral correctness").

---

## 9. Open Questions & Future Validation
- Phase 04 Empirical Validation: Benchmark atomic rename semantics across Windows NTFS and Linux ext4, measuring crash recovery speed under simulated process termination.
