# UIForge Engineering Standards: Application Security & Guardrails

**Document ID:** `UIF-ENG-STD-004`  
**Classification:** Authoritative Engineering Standard  

---

## 1. Five-Level Security Ladder
UIForge enforces a 5-level security ladder governing operations:
- **Level 1 (READ):** Non-destructive inspection and AST scanning. Auto-approved.
- **Level 2 (EVAL):** Read-only local server spawning, browser execution, accessibility checking.
- **Level 3 (STAGED):** Write-Ahead Log (WAL) pre-image generation, in-memory patch formulation.
- **Level 4 (APPLY):** Coordinate slice patching on target codebase. Requires explicit human approval and diff-bound cryptographic token verification.
- **Level 5 (DANGEROUS):** Git commit/push, dependency installations, shell command execution. Requires explicit out-of-band authorization.

---

## 2. Path Traversal & Symlink Guards
- All file paths supplied to analyzers or MCP tools must be resolved and strictly asserted to stay within the target project root (`rootPath`).
- Path traversals outside the project boundary trigger `ERR-SECURITY-PATH_TRAVERSAL` and terminate the transaction immediately.
