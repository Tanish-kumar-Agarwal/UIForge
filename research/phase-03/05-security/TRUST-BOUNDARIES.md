# UIFORGE — PHASE 03: TRUST BOUNDARIES & ISOLATION ZONES
## Architectural Trust Zones, Cross-Boundary Data Flows & Enforcement Gates

**Document ID:** `UIF-PH03-TRUST-BOUNDARIES`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Application Security Architect & Principal Software Architect  

---

## 1. Executive Trust Topology

UIForge enforces four distinct **Architectural Trust Zones**. No data or execution flow may cross between zones without passing through an explicit validation or authorization gate.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               FOUR ARCHITECTURAL TRUST ZONES                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 1: UNTRUSTED EXTERNAL ZONE                                                        │
│ - External AI Coding Agents (Claude Code, Cursor, OpenCode, Codex)                     │
│ - Scanned Target Brownfield Codebase (JSX, TSX, CSS, package.json)                    │
│ - Third-Party Component Registries & npm Packages (Phase 02.4 Pool)                    │
│ - Natural Language Prompts & User Design Requests                                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                              ▼ [BORDER DEFENSE GATE]                                   │
│                     (Zod Validation, Path Sanitizer, Permission Ladder)                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 2: TRUSTED APPLICATION CORE ZONE                                                  │
│ - @uiforge/core (Orchestration Engine, Task State Machine)                             │
│ - @uiforge/project-intelligence (AST Parser, Route Tree Generator)                     │
│ - @uiforge/tokens (W3C DTCG Token Compiler)                                           │
│ - @uiforge/safe-modifier (Coordinate Slice Patcher, WAL Engine)                         │
│ - @uiforge/storage (.uiforge/ JSON manifests, SQLite state.db)                         │
│ - @uiforge/security (HMAC Token Signer, Permission Evaluator)                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                              ▼ [ISOLATION RPC GATE]                                    │
│                     (Playwright Process Pool, execFile Array)                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 3: ISOLATED WORKER EXECUTION ZONE                                                 │
│ - Playwright Headless Chromium/WebKit Worker Processes                                 │
│ - Out-of-Process CLI Subprocesses (ast-grep, pyftsubset)                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 4: CRYPTOGRAPHIC AUDIT & STORAGE VAULT                                            │
│ - .uiforge/audit.jsonl (Append-Only Hash-Chained Journal)                              │
│ - .uiforge/wal/ (Pre-Image Crash Recovery Logs)                                        │
│ - .uiforge/snapshots/ (Content-Addressed State Manifests)                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Cross-Boundary Data Flow & Enforcement Gates

### Gate 1: Untrusted Agent to Core Gate (MCP Border)
- **Data Flow:** JSON-RPC tool calls arriving over stdio or Streamable HTTP.
- **Enforcement Mechanisms:**
  1. Payload parsing and schema validation via Zod contracts (`@uiforge/contracts`).
  2. String length and token budget checks (`@uiforge/agent-sdk`).
  3. Permission ladder evaluation: Level 0 read-only queries pass; Level 2+ mutation tools halt and emit `ERR-SECURITY-APPROVAL_REQUIRED`.

### Gate 2: Untrusted Codebase to Core Gate (AST Scanner Border)
- **Data Flow:** Reading raw source files from disk for AST analysis.
- **Enforcement Mechanisms:**
  1. Symlink verification (`fs.realpathSync`) preventing link escapes outside project root.
  2. Path traversal validation rejecting `..` traversal strings.
  3. Static data parsing only: source files are parsed into ESTree/Babel AST nodes; **never** evaluated or executed via `eval()` or `require()`.

### Gate 3: Core to Isolated Execution Gate (Browser & Subprocess Border)
- **Data Flow:** Rendering target web pages or executing native AST search binaries.
- **Enforcement Mechanisms:**
  1. Headless browser runs in an isolated operating system sandbox process.
  2. Browser network navigation restricted to localhost and configured local ports.
  3. The `file://` protocol is strictly disabled in Playwright page contexts.
  4. External tools (`ast-grep`, `pyftsubset`) invoked via `child_process.execFile()` passing discrete argument arrays, completely bypassing shell command interpreters.

### Gate 4: Core to Filesystem Mutation Gate (Safe Modifier Border)
- **Data Flow:** Applying coordinate slice patches to project source files.
- **Enforcement Mechanisms:**
  1. Requires a valid, unexpired Level 3 authorization token matching `sha256(unifiedDiff)`.
  2. Mandatory pre-image write to `.uiforge/wal/journal-<id>.log` before touching target files.
  3. Pre-check: target file on disk must match original pre-image hash (TOCTOU protection).
  4. Post-check: TypeScript Compiler API evaluates diagnostic regressions; automatically restores pre-image if new errors are introduced.
