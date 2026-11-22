# UIForge Engineering Standards: Error Handling & Fault Isolation

**Document ID:** `UIF-ENG-STD-008`  
**Classification:** Authoritative Engineering Standard  

---

## 1. Error Invariants
- UIForge never throws untyped generic exceptions (`throw new Error("...")`).
- All errors must be instances of `UIForgeError` originating from `@uiforge/contracts`.
- Every error must include:
  - An immutable error code (`ErrorCode`).
  - An architectural category (`ErrorCategory`).
  - Actionable remediation hints.
  - A fatal flag indicating whether the active transaction must abort.

---

## 2. Error Code Taxonomy (E1000–E8000)
- `ERR-SECURITY-*`: Authorization, path traversal, token expiration, tampering.
- `ERR-VALIDATION-*`: Zod schema mismatch, token syntax, contrast failures.
- `ERR-AST-*`: Unrecoverable syntax errors, coordinate span mismatches.
- `ERR-SAFE_MOD-*`: TypeScript compiler diagnostic regressions, WAL rollback failures.
- `ERR-BROWSER-*`: Target unreachable, navigation timeouts, missing browser binaries.
- `ERR-STORAGE-*`: Disk full, database locked, snapshot not found.
- `ERR-ORCHESTRATION-*`: Task failures, state machine invalid transitions.
