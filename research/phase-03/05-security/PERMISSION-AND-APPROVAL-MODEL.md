# UIFORGE — PHASE 03: PERMISSION AND APPROVAL MODEL
## Five-Level Security Ladder, Diff-Bound Authorization Tokens & Human-in-the-Loop Protocol

**Document ID:** `UIF-PH03-PERMISSION-AND-APPROVAL-MODEL`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Application Security Architect & Principal Software Architect  

---

## 1. Executive Permission Strategy

Autonomous coding assistants cannot be granted carte-blanche filesystem write permissions. Conversely, prompting developers for permission on every trivial read-only scan paralyzes the developer experience.

UIForge establishes a **Five-Level Security Ladder** paired with **Diff-Bound Authorization Tokens**:
- Read-only queries execute instantly without interruption (Levels 0 and 1).
- Operations that create new directories or files prompt for standard confirmation (Level 2).
- Operations that mutate existing code require an explicit human authorization token bound to the cryptographic hash of the exact unified diff (Level 3).
- Operations that execute external system binaries prompt for tool authorization (Level 4).

---

## 2. The Five-Level Security Ladder

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              FIVE-LEVEL SECURITY LADDER                                │
├───────┬──────────────────┬──────────────┬──────────────────────────────┬───────────────┤
│ Level │ Designation      │ Mutating?    │ Typical Operations           │ Approval Gate │
├───────┼──────────────────┼──────────────┼──────────────────────────────┼───────────────┤
│ L0    │ Read-Only Query  │ NO           │ analyze, audit, compare      │ ZERO Approval │
├───────┼──────────────────┼──────────────┼──────────────────────────────┼───────────────┤
│ L1    │ Local State Write│ .uiforge/    │ save token, compile cache    │ ZERO Approval │
├───────┼──────────────────┼──────────────┼──────────────────────────────┼───────────────┤
│ L2    │ Scaffold / New   │ Empty Dir    │ generate, init new project   │ CLI Confirm   │
├───────┼──────────────────┼──────────────┼──────────────────────────────┼───────────────┤
│ L3    │ Mutate Existing  │ Target Code  │ improve, patch JSX, add prop │ Diff-Bound Tok│
├───────┼──────────────────┼──────────────┼──────────────────────────────┼───────────────┤
│ L4    │ External Binary  │ Subprocess   │ ast-grep CLI, pyftsubset     │ Explicit Prompt│
└───────┴──────────────────┴──────────────┴──────────────────────────────┴───────────────┘
```

### Granular Level Rules:
- **Level 0 (Read-Only Query):** Absolutely non-mutating. Includes AST parsing, route extraction, headless browser rendering, and accessibility scanning. Executes freely for developers and agents.
- **Level 1 (Local State Write):** Modifies only internal UIForge files in `.uiforge/` (e.g. updating cached AST trees, saving design briefs, or compiling tokens). Does not modify target project source code.
- **Level 2 (Scaffold / New Project):** Creates new project directories and writes initial template code. Guard: target directory must be non-existent or completely empty.
- **Level 3 (Mutate Existing Code):** Modifies existing project source files (JSX, TSX, CSS). **STRICT REQUIREMENT:** Requires an approved, unexpired `ApprovalToken` cryptographically bound to the exact unified diff.
- **Level 4 (External Binary Subprocess):** Invokes external system binaries (`ast-grep`, `pyftsubset`). Prompts developer to verify that the tool is installed and trusted.

---

## 3. Diff-Bound Authorization Token Protocol

When an AI coding agent or automated script invokes a Level 3 mutation tool (`propose_modification`), UIForge executes the following protocol:

```
[Agent Tool Call] ──► (1. Generate Unified Diff) ──► (2. Compute SHA-256 Digest)
                                                                 │
┌────────────────────────────────────────────────────────────────┘
▼
(3. Issue Challenge CHAL-9912) ──► (4. Halt Agent & Return Error to Chat)
                                                 │
┌────────────────────────────────────────────────┘
▼
(5. Human Reviews Diff in Terminal / Studio) ──► (6. User Signs Token AUTH-TOKEN)
                                                                 │
┌────────────────────────────────────────────────────────────────┘
▼
(7. Agent Resubmits with Token) ──► (8. Safe Modifier Verifies & Executes WAL)
```

### 3.1 Token Cryptographic Structure
The authorization token is a JSON Web Token (JWT) or HMAC-SHA256 signed envelope:
```json
{
  "tokenId": "AUTH-a1b2c3d4-e5f6-7890",
  "permissionLevel": 3,
  "targetFiles": ["src/components/ui/modal.tsx"],
  "diffSha256": "8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b",
  "issuedAt": "2026-11-22T17:55:00.000Z",
  "expiresAt": "2026-11-22T18:10:00.000Z",
  "nonce": "NONCE-981247",
  "signature": "c5e6d7a8b9..."
}
```

### 3.2 Anti-Tamper & Anti-Replay Guarantees
1. **Diff Binding:** The token embeds `diffSha256`. If the agent or an attacker alters even a single whitespace character in the proposed patch, the hash check fails and execution is denied with `ERR-SECURITY-TOKEN_TAMPERED`.
2. **Single-Use Consumption:** Upon successful verification and execution, the `tokenId` is appended to the `.uiforge/wal/consumed_tokens.db` set. Replaying the same token fails with `ERR-SECURITY-TOKEN_EXPIRED`.
3. **Time-To-Live (TTL):** Tokens expire automatically after 15 minutes.
4. **Local Secret:** Tokens are signed using an ephemeral 256-bit HMAC secret generated locally on process startup; secrets are never transmitted across networks.
