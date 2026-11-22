# UIFORGE — PHASE 03: ERROR TAXONOMY & REMEDIATION REGISTER
## Canonical Error Codes, JSON-RPC Mapping, Severity Tiers & Remediation Semantics

**Document ID:** `UIF-PH03-ERROR-TAXONOMY`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Lead API Architect  

---

## 1. Executive Error Architecture

UIForge establishes a unified, machine-actionable **Error Taxonomy**. In accordance with UIForge Reliability Invariants, errors are never thrown as generic unhandled exceptions (`throw new Error("something failed")`).

Every error emitted by UIForge Core, CLI, or MCP endpoints conforms to `uiforge.contract.error.v1` and provides:
1. A unique, immutable error code (`ERR-<CATEGORY>-<CODE>`).
2. An architectural category classification.
3. Explicit fatal / non-fatal flags.
4. HTTP and JSON-RPC 2.0 status code mappings.
5. Actionable human-readable remediation hints.

---

## 2. Master Error Hierarchy Register

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  MASTER ERROR HIERARCHY REGISTER                                 │
├───────────────────────────────────┬──────────────┬──────────┬──────────┬─────────────────────────┤
│ Error Code                        │ Category     │ JSON-RPC │ HTTP     │ Remediation Hint        │
├───────────────────────────────────┼──────────────┼──────────┼──────────┼─────────────────────────┤
│ ERR-SECURITY-APPROVAL_REQUIRED    │ SECURITY     │ -32001   │ 403      │ Review diff & grant auth│
│ ERR-SECURITY-PATH_TRAVERSAL       │ SECURITY     │ -32002   │ 403      │ Path must stay in root  │
│ ERR-SECURITY-TOKEN_EXPIRED        │ SECURITY     │ -32003   │ 401      │ Re-issue authorization  │
│ ERR-SECURITY-TOKEN_TAMPERED       │ SECURITY     │ -32004   │ 403      │ Diff hash mismatch      │
│ ERR-SECURITY-PROPRIETARY_RESALE   │ SECURITY     │ -32005   │ 403      │ License prohibits resale│
├───────────────────────────────────┼──────────────┼──────────┼──────────┼─────────────────────────┤
│ ERR-VALIDATION-SCHEMA_MISMATCH    │ VALIDATION   │ -32602   │ 400      │ Check Zod field errors  │
│ ERR-VALIDATION-TOKEN_SYNTAX       │ VALIDATION   │ -32602   │ 400      │ Invalid W3C DTCG format │
│ ERR-VALIDATION-CONTRAST_FAIL      │ VALIDATION   │ -32010   │ 422      │ Adjust color for 4.5:1  │
├───────────────────────────────────┼──────────────┼──────────┼──────────┼─────────────────────────┤
│ ERR-AST-UNRECOVERABLE_SYNTAX      │ AST_PARSER   │ -32020   │ 422      │ Unclosed template/paren │
│ ERR-AST-TARGET_SPAN_MISMATCH      │ AST_PARSER   │ -32021   │ 409      │ File modified on disk   │
│ ERR-AST-MANIFEST_CORRUPT          │ AST_PARSER   │ -32022   │ 500      │ package.json unparseable│
├───────────────────────────────────┼──────────────┼──────────┼──────────┼─────────────────────────┤
│ ERR-SAFE_MOD-TS_REGRESSION        │ SAFE_MOD     │ -32030   │ 422      │ TS compile error undone │
│ ERR-SAFE_MOD-WAL_RESTORE_FAILED   │ SAFE_MOD     │ -32031   │ 500      │ Inspect .uiforge/wal/   │
├───────────────────────────────────┼──────────────┼──────────┼──────────┼─────────────────────────┤
│ ERR-BROWSER-TARGET_UNREACHABLE    │ BROWSER      │ -32040   │ 502      │ Start local dev server  │
│ ERR-BROWSER-TIMEOUT_EXCEEDED      │ BROWSER      │ -32041   │ 504      │ Increase navigation wait│
│ ERR-BROWSER-BINARIES_MISSING      │ BROWSER      │ -32042   │ 500      │ Run playwright install  │
├───────────────────────────────────┼──────────────┼──────────┼──────────┼─────────────────────────┤
│ ERR-STORAGE-DISK_FULL             │ STORAGE      │ -32050   │ 507      │ Free local disk space   │
│ ERR-STORAGE-DATABASE_LOCKED       │ STORAGE      │ -32051   │ 503      │ Close concurrent process│
│ ERR-STORAGE-SNAPSHOT_NOT_FOUND    │ STORAGE      │ -32052   │ 404      │ Verify snapshot ID      │
└───────────────────────────────────┴──────────────┴──────────┴──────────┴─────────────────────────┘
```

---

## 3. Deep Architectural Error Handling Semantics

### 3.1 Security Errors (`SECURITY`)
- **`ERR-SECURITY-APPROVAL_REQUIRED`:** Returned whenever an external AI agent attempts to invoke a tool that modifies the filesystem (Level 2+) without an authorization token. The error payload includes:
  ```json
  {
    "code": "ERR-SECURITY-APPROVAL_REQUIRED",
    "category": "SECURITY",
    "message": "Filesystem mutation requires explicit human approval.",
    "fatal": false,
    "details": {
      "diff": "--- a/modal.tsx\n+++ b/modal.tsx...",
      "diffSha256": "8a7b6c5d...",
      "challengeId": "CHAL-9912",
      "authorizationCommand": "uiforge authorize CHAL-9912"
    }
  }
  ```

### 3.2 Safe Modification Errors (`SAFE_MOD`)
- **`ERR-SAFE_MOD-TS_REGRESSION`:** Triggered when the TypeScript Compiler API diagnostic comparator detects new compilation errors after applying a coordinate slice patch. The transaction is automatically rolled back via the WAL pre-image before returning this error. The payload includes the exact compiler diagnostics (`TS2322`, `TS2304`) to assist the caller in repairing the prompt.

### 3.3 AST Parser Errors (`AST_PARSER`)
- **`ERR-AST-UNRECOVERABLE_SYNTAX`:** In accordance with Finding C26, Babel `errorRecovery: true` handles missing closing tags and missing semicolons, but unclosed template literals or unterminated block comments throw fatal syntax errors. UIForge catches these fatal errors, holds the token chunk in the streaming buffer, and emits this error without crashing the process.
