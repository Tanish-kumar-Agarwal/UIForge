# ADR-008: Project Safety, Non-Destructive Mutation & Write-Ahead Logging (WAL)
## Pre-Image Journaling, Coordinate Slice Patching, TypeScript Diagnostic Baselines & Authorization Tokens

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Application Security Architect & Principal Software Architect  

---

## 1. Context & Problem Statement
The single greatest source of developer distrust toward AI coding assistants is **uncontrolled, destructive codebase mutation**. Tools frequently:
1. Overwrite working custom business logic during refactorings.
2. Clobber custom code comments, formatting, and indentation.
3. Silently introduce syntax errors or TypeScript compilation breaks.
4. Execute file modifications without explicit human authorization.

UIForge requires a robust safety architecture that guarantees zero silent code destruction, atomic rollback on compiler regression, and strict human authorization.

---

## 2. Decision Constraints
1. **Read-Only Brownfield Default:** All repository inspection, AST analysis, and audit operations must be strictly non-mutating.
2. **Formatting & Comment Preservation:** Modifications must not rewrite entire files; they must mutate only targeted character spans $[start, end]$.
3. **Decoupled WAL & Crash Atomicity (Finding C26):** UIForge Write-Ahead Logging (WAL) must be decoupled from Babel parser capabilities. If a process terminates mid-write, the filesystem must automatically restore its exact pre-image bytes on subsequent startup.
4. **TypeScript Regression Comparator:** Code modifications must be evaluated against a baseline diagnostic snapshot ($\text{baselineErrors}$). If $\text{postErrors} \setminus \text{baselineErrors} > 0$, the mutation must be automatically rolled back.
5. **Diff-Bound Authorization Tokens:** Mutations must be locked behind cryptographic tokens bound to the SHA-256 hash of the exact unified diff.

---

## 3. Options Considered
- **Option 1: Whole-File Overwriting via AST Printer (Babel / Prettier):** Parse AST, mutate nodes, and re-print the entire file using `@babel/generator` or Prettier.
- **Option 2: Git Stash / Branch Temporary Commits:** Use Git branching and stashing as the rollback and safety mechanism.
- **Option 3: Coordinate-Based Slice Patching + Pre-Image WAL + TS Diagnostic Baseline:** Apply coordinate character slices directly, backup original bytes in `.uiforge/wal/`, verify TS compiler diagnostic deltas, and rollback on regression.

---

## 4. Evaluation of Options

| Criteria | Option 1: Whole-File Reprinter | Option 2: Git Branching | Option 3: Slice Patch + WAL + TS Comparator |
| :--- | :--- | :--- | :--- |
| **Comment & Whitespace Safety** | Destructive (destroys custom formatting)| Preserved | 100% Preserved (touches only mutated slice) |
| **Git Working Tree Invariant** | Destroys uncommitted user work | Creates messy branch trees| Preserves uncommitted user work completely |
| **Crash Atomicity** | Partial file corruption risk | Git lockfile conflicts | 100% Crash-safe via pre-image journal |
| **Diagnostic Regression Detection**| None (blind write) | None | Automated TS Compiler API delta check |

---

## 5. Decision Outcome
**Selected Option:** **Option 3: Coordinate-Based Slice Patching + Pre-Image WAL + TS Diagnostic Baseline.**

### Architectural Specification:
1. **Coordinate Slice Patcher (`@uiforge/safe-modifier`):**
   - Calculates exact 0-indexed character offsets $[start, end]$ from AST nodes or search matches.
   - Replaces *only* that span in the target file buffer, leaving 100% of surrounding lines, comments, and whitespace untouched.
2. **Pre-Image Write-Ahead Log (WAL):**
   - Prior to modifying any file on disk, flushes `.uiforge/wal/journal-<id>.log` containing the original file bytes and SHA-256 hash.
   - If an unhandled exception or process termination occurs, the next process execution scans the WAL directory and restores all uncommitted pre-images.
3. **TypeScript Diagnostic Regression Comparator:**
   - Evaluates compiler diagnostics via the TypeScript Compiler API before mutation ($\text{baseline}$).
   - Evaluates compiler diagnostics immediately after mutation ($\text{post}$).
   - Computes: $\text{newRegressions} = \text{post} \setminus \text{baseline}$.
   - If $\text{newRegressions} > 0$: immediately triggers atomic WAL rollback, reverts files, and reports compiler errors.
   - If $\text{newRegressions} === 0$: marks transaction `COMMITTED`.
4. **Five-Level Security Ladder & Diff-Bound Authorization:**
   - Level 0 (Read-Only), Level 1 (Local Output), Level 2 (Scaffold/New), Level 3 (Mutate Existing), Level 4 (Subprocess).
   - Level 3 mutations require an authorization token embedding `sha256(unifiedDiff)` signed with an HMAC secret. Any tampering with the diff invalidates the token.

---

## 6. Consequences & Impact
- **Positive:**
  - Absolute protection against destructive AI coding agent mutations.
  - Developers can safely run UIForge on messy brownfield repositories with uncommitted working-tree changes without fear of data loss.
  - Compile errors cannot silently slip into the repository.
- **Negative:**
  - Running full TypeScript diagnostic checks adds 1–3 seconds to mutation execution times on large projects.

---

## 7. Security & Operational Impact
- Protects against malicious agents attempting to overwrite `.env` files, inject telemetry, or bypass security rules.
- Canonical path checks prevent directory traversal attacks (`../../`).

---

## 8. Research References
- Phase 02.2: `SECURITY-AND-TRUST-ARCHITECTURE.md` (5-Level Security Ladder).
- Phase 02.5: Finding C22 & C26 (Decoupled Babel parser from UIForge WAL).
- Phase 02.5: `verify_babel_recovery.js` (Verified 10/10 assertions for WAL & TS comparator).

---

## 9. Open Questions
- None. Project safety architecture is locked and frozen.
