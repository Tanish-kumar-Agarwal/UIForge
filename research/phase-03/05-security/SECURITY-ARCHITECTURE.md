# UIFORGE — PHASE 03: SYSTEM SECURITY ARCHITECTURE
## Defense-in-Depth Model, Security Lifecycle, Permission Boundaries & Isolation Invariants

**Document ID:** `UIF-PH03-SECURITY-ARCHITECTURE`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Application Security Architect & Principal Software Architect  

---

## 1. Executive Security Blueprint

UIForge operates at the intersection of untrusted developer codebases, external AI coding agents, third-party component registries, and local filesystem access.

In strict adherence to UIForge Architectural Invariants, the platform implements a **Fail-Closed, Defense-in-Depth Security Architecture**.

### Fundamental Security Axiom:
> *A UIForge application authorization token alone does NOT provide operating-system-level isolation. Security is guaranteed only through layered boundaries: OS user privileges + Process sandboxing + Network isolation + Canonical path validation + Cryptographic diff-bound approval tokens.*

---

## 2. Seven-Stage Security Lifecycle

```
[1. DISCOVERY] ──► [2. CLASSIFICATION] ──► [3. AUTHORIZATION] ──► [4. EXECUTION]
                                                                        │
┌───────────────────────────────────────────────────────────────────────┘
▼
[5. EVIDENCE] ──► [6. VERIFICATION] ──► [7. AUDIT LOGGING]
```

1. **Discovery:** Identifies all targets (source files, packages, URLs, component registries) and flags untrusted inputs.
2. **Classification:** Maps target operations to the **Five-Level Security Ladder** (Level 0 through Level 4).
3. **Authorization:** If operation requires Level 2+, halts execution, computes unified diff, and requests a signed human authorization token.
4. **Execution:** Executes operation within strict process and filesystem constraints (coordinate slice patching, WAL pre-images).
5. **Evidence:** Captures cryptographic assertion artifacts (screenshot hashes, axe violation arrays, compile diagnostic counts).
6. **Verification:** TypeScript Compiler API verifies that zero diagnostic regressions were introduced ($\text{newRegressions} === 0$).
7. **Audit Logging:** Appends signed event record to append-only, hash-chained `audit.jsonl` journal.

---

## 3. Layered Isolation Boundaries

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              LAYERED DEFENSE BOUNDARIES                                │
├──────────────────────────┬─────────────────────────────────────────────────────────────┤
│ Defense Boundary         │ Enforcement Mechanism & Invariants                          │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 1. Application Layer     │ 5-level security ladder; Zod schema input validation;       │
│                          │ diff-bound authorization tokens (HMAC-SHA256).              │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 2. Filesystem Layer      │ Canonical path resolution (`path.resolve()`); realpath      │
│                          │ symlink verification; pre-image WAL journaling; atomic writes│
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 3. Process Layer         │ Headless Chromium running in OS sandbox; out-of-process CLI │
│                          │ execution via `execFile` without shell interpolation.       │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 4. Network Layer         │ Core operations 100% offline; MCP daemon binds strictly to  │
│                          │ loopback (`127.0.0.1`); Playwright blocks external egress.   │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ 5. Supply-Chain Layer    │ Consumption permissions matrix; fail-closed license gating; │
│                          │ SHA-256 package provenance digests from Phase 02.4 registry.│
└──────────────────────────┴─────────────────────────────────────────────────────────────┘
```

---

## 4. Distinction Between Security Constructs

UIForge strictly separates security responsibilities to prevent false safety claims:
- **Application Authorization:** UIForge checks whether the human developer approved an agent's proposed diff.
- **Filesystem Permissions:** The underlying OS (Windows ACLs, POSIX permissions) enforces whether the running user can write to target directories.
- **Process Isolation:** Chromium child processes and external CLI tools run in separated OS processes; a crash or exploit in the browser cannot corrupt Core Node.js memory.
- **Network Restrictions:** The loopback interface blocks remote network attackers from accessing the local MCP server or local Studio endpoints.
