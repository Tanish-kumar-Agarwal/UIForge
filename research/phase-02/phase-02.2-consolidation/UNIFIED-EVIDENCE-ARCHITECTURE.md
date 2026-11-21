# UIForge Phase 02.2 — Unified Evidence & Verification Architecture

**Document Identifier:** `UIF-PH02.2-EVIDENCE-ARCHITECTURE`  
**Classification:** Canonical System-Wide Evidence, Verification Lifecycle & Failure Governance Specification  
**Parent Phase:** Phase 02.2 — Deep Technical Audit, Architecture Decisions & Cross-Workstream Consolidation  
**Target Standard:** Principal Quality Engineer + Principal Software Architect + Application Security Architect  
**Status:** COMPLETE & CONSOLIDATED  
**Date:** November 21, 2026  

---

## 1. Executive Mission & Evidence Philosophy

UIForge adheres to an absolute engineering rule:

> **Evidence Over Assertions.** No subsystem, automated tool, or AI coding agent may claim that a component is accessible, that a style conversion is lossless, or that a code change is safe without producing a cryptographically correlated, reproducible **Verification Evidence Record**.

In traditional frontend workflows, tools make sweeping, unfounded claims (e.g., claiming "100% WCAG conformance" based on 20 automated lint checks or claiming "pixel-perfect parity" based on downscaled JPEG diffs). UIForge eliminates this ambiguity by establishing:
1. **Eight Explicit Evidence Classifications** that prevent synthetic simulations from being disguised as live empirical benchmarks.
2. **A Unified Evidence Envelope** (`VerificationEvidenceRecord`) shared by all five workstreams.
3. **Cross-Workstream Multi-Gate Verification Pipelines**, where one subsystem's pass cannot override or imply another subsystem's verdict.
4. **An 18-Code Standardized Failure Taxonomy** detailing severity, retryability, and responsible recovery owners.

---

## 2. Eight Canonical Evidence Classification Tiers

Every finding, benchmark, test result, or compatibility claim produced across UIForge is tagged with one of eight immutable evidence classifications:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        EIGHT CANONICAL EVIDENCE CLASSIFICATIONS                        │
├──────────────────────────┬─────────────────────────────────────────────────────────────┤
│ Classification Tag       │ Strict Operational Definition & Admissibility Criteria       │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ `DOC/SOURCE-VERIFIED`    │ Verified directly against published official specs, RFCs,   │
│                          │ or vendor source code at a pinned commit/version.           │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ `STATIC-ANALYSIS`        │ Verified via AST parsing, TypeScript compiler diagnostics,  │
│                          │ linters, or static code analysis without executing runtime. │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ `LOCAL-HARNESS-TESTED`   │ Empirically executed inside a small, standalone Node.js or  │
│                          │ local testing harness using mock or isolated fixtures.      │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ `LIVE-INTEGRATION-TESTED`│ Empirically executed against live production-grade runtime  │
│                          │ dependencies, real browser processes, and real dev servers. │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ `REPORTED-SIMULATION`    │ Derived from simulated mathematical models, cost models, or │
│                          │ synthetic approximations. (MUST NEVER BE CALLED EMPIRICAL). │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ `HUMAN-REVIEWED`         │ Evaluated and approved by a qualified human engineer        │
│                          │ (e.g., screen reader audit, golden visual diff approval).   │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ `NOT-EXECUTED`           │ Test scenario or benchmark is specified and designed, but   │
│                          │ execution was skipped due to environment/dependency limits. │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ `NOT-ESTABLISHED`        │ Hypothesis or claim was investigated, but available evidence│
│                          │ is insufficient, ambiguous, or failed to validate claim.    │
└──────────────────────────┴─────────────────────────────────────────────────────────────┘
```

### Inviolable Admissibility Rules
- **Rule 1 (Simulation Demarcation):** A simulated model (such as WS-5 Experiment E8's 3.28× multi-agent token bloat projection) must remain tagged as `REPORTED-SIMULATION`. It must never be upgraded to `LIVE-INTEGRATION-TESTED` without live multi-agent API execution.
- **Rule 2 (Harness Demarcation):** Passing an in-memory policy test in a standalone Node.js script (such as WS-5 Experiment E5's approval token logic) qualifies strictly as `LOCAL-HARNESS-TESTED`. It does not prove runtime operating-system filesystem enforcement.
- **Rule 3 (No False Conformance):** Automated axe-core scanning evaluates only 12 out of 55 WCAG 2.2 Level A/AA criteria. Passing axe-core must be recorded as `automated-checks-pass`, never as `WCAG-2.2-AA-compliant`.
- **Rule 4 (Methodology Transparency):** The 12 automated / 23 browser-assisted / 20 human audit breakdown is **UIForge's internal verification methodology**, not an official or universal W3C classification. W3C defines success criteria and techniques, while individual tools operationalize verification. Automated tools must never claim full conformance.
- **Rule 5 (Runner Exit Code vs Empirical Evidence):** A test runner executing with exit code 0 indicates that the harness script ran without unhandled Node.js crashes and internal assertions evaluated to true. It does NOT prove real-world production readiness, OS-level filesystem concurrency safety, or live browser cross-platform rendering consistency. Evidence tiers must reflect the actual harness constraint.

---

## 3. Workstream Experiment Evidence Reconciliation (WS-1 Through WS-5)

To maintain absolute evidentiary integrity across all five research workstreams, every completed experiment has been independently audited and cataloged with its runner status, tested behavior, harness type, specific assertion output, final evidence classification, and explicit non-coverage boundaries:

| Workstream | Experiment ID | Actual Tested Behavior | Harness Type | Actual Assertion / Output | Evidence Classification | What The Experiment Does NOT Establish |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **WS-1** | `E1` | Project discovery & route scanning | Local Node.js file scan | Scanned 5 files in 5.96ms; extracted AST metadata | `STATIC-ANALYSIS` | Does not test multi-thousand file monorepos or uncommitted Git states. |
| **WS-1** | `E2` | TypeScript compiler type diagnostics | In-memory ts-morph | Caught TS2322 union type mismatch on `trend="positive"` | `LOCAL-HARNESS-TESTED` | Does not test Go-based native TS 7.0 compiler API (TS 7.1 Beta pending). |
| **WS-1** | `E3` | Structural pattern matching (ast-grep) | In-memory ast-grep | Identified 3 target JSX `<KpiCard />` component nodes | `STATIC-ANALYSIS` | Does not test complex dynamic prop expressions or higher-order components. |
| **WS-1** | `E4` | CST non-destructive code rewriting | In-memory ts-morph AST | Preserved comments, whitespace, and formatting on rewrite | `LOCAL-HARNESS-TESTED` | Does not test macro-heavy syntax or non-standard JSX extensions. |
| **WS-1** | `E5` | Pre-image conflict & rollback | In-memory hash check | Aborted write on hash mismatch; restored in-memory state | `LOCAL-HARNESS-TESTED` | Does not test OS-level concurrency, locked file handles, or multi-file crashes. |
| **WS-3** | `E1` | shadcn v1 registry ingestion schema | In-memory schema check | Validated 12 registry types; rejected invalid types | `STATIC-ANALYSIS` | Does not test live remote registry fetching or network transport. |
| **WS-3** | `E2` | DTCG 2025.10 token parsing & aliases | In-memory token parser | Parsed 7 tokens; resolved aliases, group types, shadows | `LOCAL-HARNESS-TESTED` | Does not test arbitrary external community plugins or non-standard token models. |
| **WS-3** | `E3` | CSS Custom Properties generation | In-memory string builder | Emitted scoped CSS custom properties tree from tokens | `LOCAL-HARNESS-TESTED` | Does not test CSS build tools (PostCSS, LightningCSS) in live pipelines. |
| **WS-3** | `E4` | Cross-paradigm styling adapters | In-memory transformer | Emitted Tailwind v4 `@theme`, CSS Modules, and AntD JSON | `LOCAL-HARNESS-TESTED` | Does not test live runtime theme toggling or dynamic CSS-in-JS injection. |
| **WS-3** | `E5` | Bidirectional conversion loss scoring | In-memory loss scorer | Scored value preservation vs semantic metadata loss | `LOCAL-HARNESS-TESTED` | Does not guarantee visual parity across disparate layout paradigms (e.g. flex to grid). |
| **WS-3** | `E6` | CSS cascade layer specificity audit | Static specification audit | Proved unlayered CSS Modules override `@layer` rules | `STATIC-ANALYSIS` | Does not test browser-specific cascade bugs across legacy rendering engines. |
| **WS-3** | `E7` | Token circular dependency detection | In-memory graph search | Traversed graph, detected cycles, aborted resolution | `LOCAL-HARNESS-TESTED` | Does not evaluate performance across graphs with >100,000 token nodes. |
| **WS-3** | `E8` | Multi-file journaled rollback engine | Local filesystem mock | Restored modified files to initial SHA-256 pre-images | `LOCAL-HARNESS-TESTED` | Does not test recovery after abrupt process SIGKILL mid-write (Phase 02.4 Gate 2). |
| **WS-4** | `E1` | Browser automation API baseline audit | Specification inspection | Pinned Playwright v1.65.1; qualified WebKit engine | `DOC/SOURCE-VERIFIED` | Does not execute live browser launches across remote Selenium/BiDi grids. |
| **WS-4** | `E2` | Perceptual visual regression & mask | Synthetic RGBA buffer math| Verified OKLab/HyAB buffer diffing and ignore-mask | `REPORTED-SIMULATION` | Does not run real headless browser rendering or GPU rasterization. |
| **WS-4** | `E3` | Responsive layout geometry engine | Synthetic DOM geometry | Detected horizontal overflow, offscreen breach, occlusion | `REPORTED-SIMULATION` | Does not test live CSS subpixel rounding across different device scale factors. |
| **WS-4** | `E4` | Contrast math & 55 WCAG criteria | Algorithmic math fixture | Calculated 4.5:1/3:1 ratios; mapped 12/23/20 criteria split | `LOCAL-HARNESS-TESTED` | Does not certify full WCAG 2.2 AA compliance; reports internal test results only. |
| **WS-4** | `E5` | Dialog keyboard trapping & inert state | Synthetic state machine | Modeled open/focus/escape cycle and inert background | `REPORTED-SIMULATION` | Does not test live screen reader speech output or OS accessibility APIs. |
| **WS-4** | `E6` | Multi-browser rendering discrepancies | Documented engine audit | Audited Blink/Gecko/WebKit subpixel shifts & gamuts | `DOC-VERIFIED` | Did not execute multi-browser binaries in CI; same-engine baseline required. |
| **WS-4** | `E7` | SHA-256 record digest verification | In-memory hash test | Proved SHA-256 record digest detects payload tampering | `LOCAL-HARNESS-TESTED` | Digest detects modification; not a cryptographic digital signature or PKI anchor. |
| **WS-4** | `E8` | Agent AST repair diagnostic envelope | Synthetic envelope builder | Emitted structured diagnostic envelope with AST mapping | `LOCAL-HARNESS-TESTED` | Heuristic AST source mapping; does not test network route blocking or SSRF. |
| **WS-5** | `E1` | MCP protocol specification audit | Specification inspection | Pinned 2026-07-28 & modular v2 SDK baseline | `DOC/SOURCE-VERIFIED` | Does not test live MCP client connections. |
| **WS-5** | `E2` | Coding agent interface compatibility | Documentation audit | Audited Claude Code, Cursor, OpenCode, Codex, AGY | `DOC/SOURCE-VERIFIED` | Does not execute live autonomous coding agent benchmarks. |
| **WS-5** | `E3` | Core vs MCP boundary independence | In-memory import check | Core runs pure TypeScript without MCP dependencies | `LOCAL-HARNESS-TESTED` | Does not test running Core as a separate standalone microservice. |
| **WS-5** | `E4` | Context compression & token packing | In-memory text trimmer | Measured 91.2% text reduction on test fixture | `LOCAL-HARNESS-TESTED` | Uses ~4 chars/token heuristic; does not measure real model tokenizer counts. |
| **WS-5** | `E5` | 5-level security ladder in-memory policy | In-memory policy harness | In-memory policy rejected unapproved/out-of-scope calls | `LOCAL-HARNESS-TESTED` | In-memory logic check; does not enforce OS filesystem access or block symlink races. |
| **WS-5** | `E6` | Untrusted code comment sanitization | In-memory string sanitizer | Filtered injection keywords; SHA-256 digest attached | `LOCAL-HARNESS-TESTED` | Digests detect tampering; does not neutralize sophisticated semantic prompt jailbreaks. |
| **WS-5** | `E7` | Session lifecycle & idempotent retry | In-memory state machine | Verified state transitions and idempotent replay | `LOCAL-HARNESS-TESTED` | Does not test secret redaction or audit log chaining. |
| **WS-5** | `E8` | Multi-agent coordination cost model | Mathematical cost model | Modeled 3.28× token overhead and 3× latency penalty | `REPORTED-SIMULATION` | Cost model simulation; not a live multi-agent swarm empirical benchmark. |
| **WS-5** | `E9` | Secret masking & chained audit logs | In-memory regex & hash | Masked Bearer tokens/passwords; SHA-256 hash chaining | `LOCAL-HARNESS-TESTED` | Chaining detects tampering; does not provide external PKI trust anchoring. |
| **WS-5** | `E10`| Simulated JSON-RPC loopback dispatch | In-memory loopback mock | Dispatched tool call to mock handler in-memory | `REPORTED-SIMULATION` | Mock loopback; does not test real MCP client-server subprocess stdio communication. |

---

## 4. The Universal Evidence Envelope Schema

Every verification run, visual diff, accessibility check, or AST audit produces a standardized JSON record adhering to `uiforge.contract.evidence-provenance.v1`:

```typescript
export interface UniversalEvidenceEnvelopeV1 {
  readonly evidenceId: string; // UUID v4
  readonly contractId: 'uiforge.contract.evidence-provenance.v1';
  readonly schemaVersion: '1.0.0';
  readonly timestamp: string; // ISO 8601 UTC

  readonly context: {
    readonly projectSnapshotId: string;
    readonly changeProposalId?: string;
    readonly workstreamOrigin: 'WS-1' | 'WS-2' | 'WS-3' | 'WS-4' | 'WS-5';
    readonly targetFile?: string;
  };

  readonly producer: {
    readonly toolName: string; // e.g., 'playwright', 'pixelmatch', 'axe-core', 'oxc-parser'
    readonly exactVersion: string; // Pinned semver (e.g., '1.65.1', '8.0.0', '4.14.1')
    readonly executionEnvironment: {
      readonly os: string;
      readonly nodeVersion: string;
      readonly architecture: string;
    };
  };

  readonly assertion: {
    readonly requirementId: string; // e.g., 'REQ-A11Y-WCAG22-SC143', 'REQ-RSC-TIER1'
    readonly classification: EvidenceClassification;
    readonly verdict: 'PASS' | 'PARTIAL' | 'NOT_ESTABLISHED' | 'NOT_APPLICABLE';
    readonly confidence: 'HIGH' | 'MEDIUM' | 'LOW';
    readonly expectedBehavior: string;
    readonly actualBehavior: string;
    readonly quantitativeMetrics?: Record<string, number>; // e.g., { diffPixels: 0, overflowPx: 0 }
  };

  readonly artifacts: ReadonlyArray<{
    readonly artifactType: 'screenshot' | 'aria-snapshot' | 'unified-diff' | 'ast-tree' | 'trace';
    readonly artifactPath: string; // Relative to .uiforge/artifacts/
    readonly sha256Digest: string; // SHA-256 of the artifact file
  }>;

  readonly limitationsAndCaveats: string[];
  readonly recordDigest: string; // SHA-256 of all above fields combined
}
```

---

## 5. Cross-Workstream Verification Pipeline

In UIForge, an operation is not considered verified until it traverses the **Cross-Workstream Multi-Gate Verification Pipeline**:

```mermaid
flowchart LR
    subgraph Gate1["Gate 1: WS-1 AST & Structural Check"]
        AST["Syntax Valid?<br/>Imports Resolved?<br/>No Unrelated Edits?"]
    end

    subgraph Gate2["Gate 2: WS-2 Component & RSC Check"]
        RSC["RSC Boundary Respected?<br/>Props Match TypeScript Interface?"]
    end

    subgraph Gate3["Gate 3: WS-3 Styling & Token Check"]
        Tokens["DTCG Tokens Valid?<br/>Conversion Loss Acceptable?"]
    end

    subgraph Gate4["Gate 4: WS-4 Browser & Quality Check"]
        Browser["Dev Server Loads?<br/>Zero Visual Regressions?<br/>Axe & Overflow Pass?"]
    end

    subgraph Gate5["Gate 5: WS-5 Security & Approval Check"]
        Security["Diff-Bound Token Valid?<br/>TOCTOU Checked?<br/>Audit Chained?"]
    end

    AST -->|Pass| RSC
    RSC -->|Pass| Tokens
    Tokens -->|Pass| Security
    Security -->|Authorized Mutation| Browser
    Browser -->|Pass| Complete["FINAL VERIFIED TRANSFORMATION"]

    AST -.->|Fail| Reject["Abort & Diagnostic Report"]
    RSC -.->|Fail| Reject
    Tokens -.->|Fail| Reject
    Security -.->|Fail| Reject
    Browser -.->|Fail| Rollback["Atomic Rollback & Repair Envelope"]
```

### Critical Cross-Workstream Rules
1. **WS-3 Structurally Valid $\ne$ WS-4 Visually Correct:** A token transformation that compiles cleanly to CSS Variables in WS-3 must still be rendered in Playwright by WS-4 to verify that cascade specificity did not alter the intended component background.
2. **WS-2 Semantically Compatible $\ne$ WS-3 Ingestion Approved:** A component from an external registry may have perfectly compatible props in WS-2, but WS-3 will reject it if its licensing provenance is uncertain or if its raw JSON envelope fails SHA-256 validation.
3. **WS-5 Agent Plan $\ne$ WS-1 Execution:** An agent's plan received via MCP cannot touch the filesystem until WS-1 calculates pre-image hashes, proves path canonicalization, and receives an authorized approval token.

---

## 6. Standardized 18-Code Failure Taxonomy

Every failure across all subsystems is mapped to an authoritative error code, complete with severity, retryability, and responsible recovery ownership:

| Error Code | Category | Severity | Retryable? | Responsible Owner | Failure Trigger & Required Evidence |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **`INPUT_INVALID`** | Input | Moderate | Yes | Calling Subsystem | Zod contract schema validation failed. Required: input path & validation issue list. |
| **`PROJECT_CONTEXT_STALE`** | State | Moderate | Yes | WS-1 (Project Intel) | Snapshot hash does not match current repository files. Required: modified file list. |
| **`UNSUPPORTED_CAPABILITY`** | Domain | High | No | Orchestration | Target framework or syntax unsupported (e.g., Vue in React engine). Required: detected framework. |
| **`DEPENDENCY_FAILURE`** | Runtime | Critical | Yes | Infrastructure | Required package or binary missing (e.g., missing Playwright). Required: missing package name. |
| **`SECURITY_BLOCK`** | Security | Critical | No | WS-5 (Security Gate)| Path traversal, SSRF, symlink escape, or prototype pollution detected. Required: blocked target. |
| **`APPROVAL_REQUIRED`** | Security | Info | Yes | User / Developer | Level 2+ mutation proposed; awaiting human authorization. Required: proposalId & diffDigest. |
| **`APPROVAL_EXPIRED`** | Security | Moderate | Yes | User / Agent | Human approval token exceeded maximum 15-minute TTL. Required: expired token ID. |
| **`SOURCE_CHANGED`** | Concurrency| High | Yes | WS-1 (Transforms) | Disk file modified between approval and execution (TOCTOU). Required: expected vs actual SHA-256. |
| **`TRANSFORMATION_FAILURE`** | Code Gen | High | Yes | WS-1 (Transforms) | AST/CST code emitter produced syntax error. Required: AST parse diagnostic. |
| **`PARTIAL_MUTATION`** | Execution | Critical | No | WS-1 (Journal) | Process crashed or error occurred mid-multi-file write. Required: transactionId & affected files. |
| **`ROLLBACK_FAILURE`** | Recovery | Catastrophic| No | Human / CLI | Automated rollback failed to restore pre-image file state. Required: journalDb path & disk error. |
| **`BROWSER_INFRA_FAILURE`** | Testing | High | Yes | WS-4 (Browser) | Local dev server offline, port refused, or browser crash. Required: connection error trace. |
| **`FUNCTIONAL_FAILURE`** | Testing | High | Yes | Calling Agent | Page rendered unhandled console exception or 500 error. Required: console log trace. |
| **`VISUAL_REGRESSION`** | Quality | Moderate | Yes | Calling Agent | Pixelmatch detected perceptual visual diff > threshold. Required: diff image artifact digest. |
| **`ACCESSIBILITY_FINDING`** | Compliance | Moderate | Yes | Calling Agent | Axe-core detected WCAG violation or missing ARIA role. Required: ruleId, selector, and TSX line. |
| **`VERIFICATION_INCONCLUSIVE`**| Testing | Moderate | Yes | WS-4 (Browser) | Test timed out or dynamic animations prevented diff stability. Required: test timeout diagnostic. |
| **`AGENT_TIMEOUT`** | Ingress | Moderate | Yes | External Agent | External coding agent failed to respond within RPC deadline. Required: sessionId & toolName. |
| **`MCP_TRANSPORT_FAILURE`** | Ingress | High | Yes | WS-5 (MCP Server) | Stdio pipe broken or Streamable HTTP connection dropped. Required: transport error code. |

---

## 7. Actionable Diagnostic Envelopes for AI Agent Self-Repair

When browser verification (WS-4) or AST transformation (WS-1) fails, UIForge does not return raw, unstructured stack traces. It packages failures into an **Actionable Diagnostic Envelope** tailored for LLM reasoning:

```typescript
export interface ActionableDiagnosticEnvelopeV1 {
  readonly failureCode: 'ACCESSIBILITY_FINDING' | 'VISUAL_REGRESSION' | 'TRANSFORMATION_FAILURE';
  readonly humanSummary: string; // e.g., 'Primary Button fails WCAG 1.4.3 Color Contrast (3.2:1 < 4.5:1)'
  readonly localizedSource: {
    readonly filePath: string; // e.g., 'components/ui/button.tsx'
    readonly startLine: number;
    readonly endLine: number;
    readonly currentCodeSnippet: string;
  };
  readonly suggestedAstRepair: {
    readonly designTokenRecommendation?: string; // e.g., 'color.brand.primary-foreground'
    readonly candidateTailwindClass?: string; // e.g., 'text-slate-900 instead of text-slate-500'
  };
  readonly supportingEvidenceArtifactUri: string; // Local path to diff image or ARIA snapshot
}
```
This structured feedback enables the agent to repair its code immediately and resubmit for verification without trial-and-error guesswork.
