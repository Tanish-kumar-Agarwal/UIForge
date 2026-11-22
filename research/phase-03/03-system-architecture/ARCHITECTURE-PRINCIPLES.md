# UIFORGE — PHASE 03: ARCHITECTURE PRINCIPLES & GOVERNANCE LAWS
## Non-Negotiable System Invariants, Architectural Axioms & Engineering Constraints

**Document ID:** `UIF-PH03-ARCHITECTURE-PRINCIPLES`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Application Security Architect  

---

## 1. Executive Principle Strategy

Architecture principles in UIForge are not aspirational guidelines; they are enforceable engineering invariants. Every pull request, architecture decision record (ADR), monorepo package boundary, and code modification must mathematically and structurally obey these twelve principles.

---

## 2. Twelve Non-Negotiable Architectural Principles

### Principle 1: Headless Core Independence
- **Statement:** UIForge Core (`@uiforge/core` and domain engines) must be 100% functional without an active browser, without cloud infrastructure, without an active MCP connection, and without Studio.
- **Rationale:** Developer tools that tightly couple core logic to graphical user interfaces or cloud backends fail to run in lightweight CI/CD runners, terminal SSH sessions, and constrained agent environments.
- **Enforcement:** `@uiforge/core` has zero dependencies on React, Electron, browser DOM globals, or HTTP server packages.

### Principle 2: Zero Business Logic Duplication Across Ingress Points
- **Statement:** The developer CLI (`@uiforge/cli`) and the agent Model Context Protocol server (`@uiforge/mcp-server`) are thin transport adapters. No domain business logic, validation rules, or workflow choreography may be implemented in CLI or MCP packages.
- **Rationale:** Duplicating logic across CLI flags and MCP tool handlers creates behavioral drift, inconsistent security enforcement, and double maintenance overhead.
- **Enforcement:** CLI commands and MCP tools strictly delegate to Core Orchestration Layer methods (`IWorkflowCoordinator`).

### Principle 3: Complete Decoupling of Design Engine from Agent Specifics
- **Statement:** The Design Engine (`@uiforge/design-engine`) and Token Engine (`@uiforge/tokens`) must contain zero agent-specific prompts, model hacks, or vendor-specific token workarounds (Claude, OpenAI, Cursor).
- **Rationale:** Design systems, typography scales, and W3C DTCG tokens are mathematical, aesthetic, and structural disciplines independent of AI model architectures.
- **Enforcement:** Agent prompt framing and tool schema adaptations reside exclusively in `@uiforge/agent-sdk`.

### Principle 4: Framework-Agnostic Design Contracts
- **Statement:** Core design contracts, token formats, component metadata, and evaluation records must never make hardcoded assumptions about specific frameworks (React, Vue, Svelte, Angular) or CSS libraries.
- **Rationale:** Frontend technology shifts rapidly. By grounding the platform in W3C DTCG tokens, standard AST representations, and headless primitives, UIForge supports multi-framework codebases without redesigning core abstractions.
- **Enforcement:** Framework-specific AST code emission is encapsulated in modular adapter plugins (`@uiforge/adapter-react`, `@uiforge/adapter-vue`).

### Principle 5: Isolation of External Code Execution
- **Statement:** UIForge Core must never execute arbitrary user project code or untrusted third-party scripts directly within the main Node.js process.
- **Rationale:** Dynamic importing or executing scanned project files (`require(projectFile)`) exposes the host machine to arbitrary remote code execution (RCE) and memory leaks.
- **Enforcement:** Browser verification executes in out-of-process headless Chromium sandboxes; static analysis uses read-only AST parsing; external tools invoke isolated CLI subprocesses.

### Principle 6: Total Traceability & Non-Destructive Mutation (WAL)
- **Statement:** Every filesystem write must be fully traceable, diff-bounded, and backed by a pre-image Write-Ahead Log (WAL). Silent, unjournaled code destruction is prohibited.
- **Rationale:** Developers and teams will only trust AI tooling if they are mathematically certain that their existing business logic, custom comments, and working code cannot be silently clobbered.
- **Enforcement:** `@uiforge/safe-modifier` enforces coordinate slice patching, pre-image journaling, and automatic rollback on TypeScript diagnostic regressions.

### Principle 7: Deterministic Validation of All Generative Outputs
- **Statement:** No AI-generated or LLM-produced code, design token, or component blueprint may be presented as verified or committed to disk without automated structural and empirical validation.
- **Rationale:** Probabilistic language models hallucinate invalid CSS properties, broken imports, inaccessible color contrasts, and syntax errors.
- **Enforcement:** All outputs pass through Zod schema validation, Babel error-recovery AST checks, and TypeScript Compiler API diagnostics.

### Principle 8: Cryptographic Provenance for External Registry Assets
- **Statement:** Every component, asset, or pattern imported from an external registry or open-source repository must preserve its immutable provenance manifest (source URL, git commit, license, SHA-256 digest).
- **Rationale:** Enterprise software supply chains require rigorous auditability (SBOM / SPDX) and strict protection against copyleft license contamination (GPL/LGPL).
- **Enforcement:** Ingested components carry metadata headers and register in `.uiforge/provenance.json` conforming to Phase 02.4 standards.

### Principle 9: Read-Only Brownfield Inspection by Default
- **Statement:** Any analysis, inspection, token scanning, or audit command executed on an existing codebase must be strictly non-mutating.
- **Rationale:** Running an analysis command must never alter project timestamps, change formatting, or insert configuration files without explicit intent.
- **Enforcement:** Read-only modes (`ANALYZE`, `AUDIT`, `COMPARE`, `VALIDATE`) execute with zero filesystem write descriptors.

### Principle 10: Local-First Data Sovereignty
- **Statement:** UIForge must function completely offline. User code, project metadata, design tokens, and audit findings remain stored locally on the user's machine by default.
- **Rationale:** Intellectual property and proprietary design systems must never be leaked to third-party cloud services without explicit organizational consent.
- **Enforcement:** Zero outbound telemetry or external cloud sync in open-source Core; network operations confined to localhost test servers.

### Principle 11: Evidence Over Assertion
- **Statement:** Subsystems and test runners must produce verifiable, machine-readable evidence records (`VerificationEvidenceRecord`). Self-proclaimed compliance is invalid.
- **Rationale:** Claims like "100% accessible" or "pixel perfect" are subjective and misleading without explicit test metrics.
- **Enforcement:** Quality reports require concrete axe-core rule assertion arrays, Playwright screenshot hashes, and pixel difference percentages.

### Principle 12: Fail-Closed Security & Permission Ladder
- **Statement:** In any ambiguous, unhandled, or error state, the system must fail closed (deny mutation, halt workflow, maintain pre-image).
- **Rationale:** Failing open risks unauthorized data modifications, security bypasses, or corrupted source trees.
- **Enforcement:** Five-level security ladder: operations requiring Level 2+ permissions halt immediately unless accompanied by a verified, unexpired human authorization token.
