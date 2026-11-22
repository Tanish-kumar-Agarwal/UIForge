# UIFORGE — PHASE 03: END-TO-END WORKFLOW SPECIFICATIONS (WORKFLOWS A–D)
## Multi-Step Execution Pipelines, Transition Logic, Error Recovery & Audit Checkpoints

**Document ID:** `UIF-PH03-WORKFLOW-SPECIFICATIONS`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & AI Systems Architect  

---

## 1. Executive Workflow Architecture

UIForge orchestrates its eight operating modes into four canonical **End-to-End Workflows**. Each workflow establishes deterministic state transitions, clear human-in-the-loop checkpoints, automated regression boundaries, and fail-closed error recovery paths.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                             FOUR CANONICAL WORKFLOWS                                   │
├────────────┬─────────────────────────────┬───────────────────────────┬─────────────────┤
│ Workflow   │ Core Operational Scenario   │ Primary Actors            │ Execution Model │
├────────────┼─────────────────────────────┼───────────────────────────┼─────────────────┤
│ Workflow A │ New Frontend Creation       │ Developer + Scaffold      │ Staged Pipeline │
│ Workflow B │ Brownfield UI Improvement   │ Developer + Safe Modifier │ Loop / Approved │
│ Workflow C │ Agent-Assisted Construction │ Coding Agent + MCP Gate   │ Protocol / RPC  │
│ Workflow D │ Continuous CI Quality Gate  │ CI Runner + Headless Eval │ Automated Gate  │
└────────────┴─────────────────────────────┴───────────────────────────┴─────────────────┘
```

---

## 2. Granular Workflow Specifications

### Workflow A: New Frontend Creation (Greenfield)
**Pipeline:** Requirements $\rightarrow$ Design Brief $\rightarrow$ Visual Directions $\rightarrow$ Design System $\rightarrow$ Component Discovery $\rightarrow$ Architecture $\rightarrow$ Generation $\rightarrow$ Browser Evaluation $\rightarrow$ Accessibility Evaluation $\rightarrow$ Refinement $\rightarrow$ Final Report.

```
[INIT] ──► (1. Requirements Ingest) ──► (2. Design Brief) ──► (3. Visual Direction)
                                                                       │
┌──────────────────────────────────────────────────────────────────────┘
▼
(4. Token Compilation) ──► (5. Component Search) ──► (6. Code Scaffolding)
                                                              │
┌─────────────────────────────────────────────────────────────┘
▼
(7. Headless Browser Render) ──► (8. a11y & UX Audit) ──► (9. Validation Pass?)
                                                                │        │
                                                           NO   │        │ YES
                                                                ▼        ▼
                                                          [Refine]   [10. Final Report]
```

#### Step-by-Step State Transitions:
1. **Requirements Ingest:** User provides natural language prompt and framework preferences. State: `REQ_INGESTED`.
2. **Design Brief Formulation (`FR-03`):** Engine emits `DesignBriefRecord` defining personas, states, and responsive constraints. State: `BRIEF_COMPILED`.
3. **Visual Direction Generation (`FR-04`):** Generates 3 accessible color/typography variants. User selects active theme. State: `DIRECTION_LOCKED`.
4. **Token Compilation (`FR-05`):** Style Dictionary v5.8.0 compiles W3C DTCG tokens to CSS variables and Tailwind v4 rules. State: `TOKENS_COMPILED`.
5. **Component Discovery (`FR-06`):** Identifies required headless primitives and layout shells. State: `COMPONENTS_RESOLVED`.
6. **Code Scaffolding (`FR-01`):** Writes project structure, configs, and baseline components. State: `SCAFFOLD_WRITTEN`.
7. **Headless Browser Render (`FR-10`):** Playwright launches and renders scaffolded routes across viewports. State: `RENDER_CAPTURED`.
8. **Accessibility & UX Audit (`FR-07`, `FR-08`):** Injects axe-core runner and measures tap targets/overflow. State: `AUDIT_EVALUATED`.
9. **Validation Check:**
   - If violations exist: routes to automated refinement loop. State: `REFINING`.
   - If zero critical violations: proceeds to completion. State: `VALIDATION_PASSED`.
10. **Final Report & Snapshot (`FR-13`, `FR-14`):** Captures baseline Snapshot `v1.0.0` and exports quality dossier. State: `WORKFLOW_COMPLETED`.

#### Error & Failure Recovery Paths:
- **Scaffold Write Failure (Disk Full / Permission Denied):** Rolls back created directories; emits `EACCES_SCAFFOLD_ABORTED`.
- **Compile Failure (`npm run build` fails):** Retains scaffold in quarantine directory `.uiforge/quarantine/`; outputs compiler diagnostics.

---

### Workflow B: Existing Frontend Improvement (Brownfield)
**Pipeline:** Read-Only Analysis $\rightarrow$ Project Understanding $\rightarrow$ UX/Accessibility Audit $\rightarrow$ Findings $\rightarrow$ Proposed Improvements $\rightarrow$ User Approval $\rightarrow$ Scoped Modifications $\rightarrow$ Regression Testing $\rightarrow$ Comparison $\rightarrow$ Final Report.

```
[START] ──► (1. Read-Only Scan) ──► (2. Project Map) ──► (3. Headless Audit)
                                                                │
┌───────────────────────────────────────────────────────────────┘
▼
(4. Categorized Findings) ──► (5. Generate Code Patch) ──► (6. User Approval Prompt)
                                                                    │        │
                                                            DENIED  │        │ APPROVED
                                                                    ▼        ▼
                                                                 [HALT]  (7. WAL Pre-Image)
                                                                             │
┌────────────────────────────────────────────────────────────────────────────┘
▼
(8. Slice Patch Write) ──► (9. TS Compiler Check) ──► (10. Regression?)
                                                             │       │
                                                        YES  │       │ NO
                                                             ▼       ▼
                                                        [WAL Undo] [11. Final Report]
```

#### Step-by-Step State Transitions:
1. **Read-Only Scan (`FR-02`):** AST scanner inspects package dependencies, routes, and styling conventions without modifying disk. State: `SCAN_COMPLETED`.
2. **Project Understanding:** Assembles `ProjectAnalysisRecord` mapping active tokens and component catalog. State: `ANALYSIS_RESOLVED`.
3. **Headless Audit (`FR-07`, `FR-08`):** Playwright audits existing rendered application for WCAG violations and mobile layout breaks. State: `DEFECTS_DISCOVERED`.
4. **Categorized Findings:** Groups findings by severity (Critical, Serious, Moderate) and identifies offending source AST nodes. State: `FINDINGS_RANKED`.
5. **Generate Code Patch (`FR-11`):** Formulates targeted coordinate slice patch repairing defect (e.g. adding `aria-expanded` and fixing color contrast). State: `PATCH_STAGED`.
6. **User Approval Check:** Displays unified diff in terminal with before/after contrast calculation. Halts for human prompt `[Y/n]`.
   - If user denies: cancels mutation cleanly with zero disk writes. State: `APPROVAL_DENIED`.
   - If user approves: issues signed approval token. State: `APPROVAL_GRANTED`.
7. **WAL Pre-Image Journaling:** Writes pre-image backup to `.uiforge/wal/journal-<id>.log` and records baseline TypeScript diagnostics. State: `WAL_INITIALIZED`.
8. **Slice Patch Write:** Mutates only targeted character spans $[start, end]$, preserving all surrounding formatting. State: `PATCH_APPLIED`.
9. **TypeScript Diagnostic Check:** Runs post-mutation diagnostic comparator. State: `DIAGNOSTICS_EVALUATED`.
10. **Regression Gate:**
    - If $\text{newRegressions} > 0$: triggers automated WAL rollback restoring pre-image. State: `MUTATION_ROLLED_BACK`.
    - If $\text{newRegressions} === 0$: commits transaction. State: `MUTATION_COMMITTED`.
11. **Comparison & Report (`FR-06`, `FR-14`):** Computes before/after pixel and accessibility delta; emits `QualityReportRecord`. State: `WORKFLOW_COMPLETED`.

#### Error & Failure Recovery Paths:
- **TypeScript Regression Detected:** Immediate atomic restoration of all modified files from pre-image journal; zero broken code left in repository.
- **Process Aborted During Write (`SIGINT`):** On subsequent startup, WAL scanner automatically restores uncommitted pre-images.

---

### Workflow C: Agent-Assisted Construction (MCP Tool Loop)
**Pipeline:** Agent Discovery $\rightarrow$ Context Preparation $\rightarrow$ Task Contract $\rightarrow$ Scoped Permissions $\rightarrow$ Execution $\rightarrow$ Evidence Collection $\rightarrow$ Validation $\rightarrow$ Approval $\rightarrow$ Result Recording.

```
[AGENT CONNECT] ──► (1. Protocol Discovery) ──► (2. Tool Registration)
                                                        │
┌───────────────────────────────────────────────────────┘
▼
(3. Agent Tool Call) ──► (4. Requires Mutation?)
                               │          │
                           NO  │          │ YES (Level 2+)
                               ▼          ▼
                        [Execute]  (5. Halt & Issue Approval Request)
                                          │
┌─────────────────────────────────────────┘
▼
(6. Human Reviews Diff & Grants Token) ──► (7. Safe Modifier Executes WAL)
                                                         │
┌────────────────────────────────────────────────────────┘
▼
(8. Browser Render & Evidence Capture) ──► (9. Return Evidence to Agent)
```

#### Step-by-Step State Transitions:
1. **Protocol Discovery (`FR-09`):** Agent connects over stdio or Streamable HTTP. Executes modern `2026-07-28` capability discovery via `server/discover` with `_meta` versioning (or legacy `2025-11-25` fallback). State: `AGENT_CONNECTED`.
2. **Tool Registration:** Exposes typed tools (`analyze_project`, `extract_tokens`, `search_components`, `verify_in_browser`, `propose_modification`). State: `TOOLS_ADVERTISED`.
3. **Agent Tool Call:** Agent dispatches tool request with JSON arguments. Zod contract validates inputs. State: `TOOL_DISPATCHED`.
4. **Permission Evaluation:**
   - Read-only tools (Level 0) execute immediately without interruption. State: `TOOL_EXECUTED`.
   - Mutation tools (Level 2+) trigger permission gate. State: `MUTATION_BLOCKED_PENDING_AUTH`.
5. **Approval Request:** Server returns structured error `uiforge.error.approval_required` containing proposed unified diff and authorization challenge. State: `APPROVAL_REQUESTED`.
6. **Human Authorization:** User reviews diff in terminal or Studio and issues signed token. State: `AUTH_TOKEN_PROVIDED`.
7. **Safe Execution:** Safe Modifier verifies token signature and applies coordinate slice patch via WAL. State: `MUTATION_APPLIED`.
8. **Browser Verification:** Automatically launches headless Playwright to capture rendered screenshot and check console errors. State: `EVIDENCE_CAPTURED`.
9. **Return Evidence to Agent:** Returns tool response containing DOM layout metrics, screenshot digest, and updated TypeScript diagnostics. State: `SESSION_ACTIVE`.

#### Error & Failure Recovery Paths:
- **Agent Hallucination (Invalid Schema / Non-Existent Tool):** Returns Zod formatted schema error indicating missing or invalid fields.
- **Unauthorized Mutation Attempt:** Halts execution; refuses write; logs unauthorized attempt to security audit log.

---

### Workflow D: Continuous CI Quality Gate & Regression Monitoring
**Pipeline:** Snapshot Ingest $\rightarrow$ Headless Evaluation $\rightarrow$ Findings Aggregation $\rightarrow$ Policy Evaluation $\rightarrow$ Gate Decision $\rightarrow$ SARIF/JUnit Report $\rightarrow$ Commit Status.

```
[CI TRIGGER] ──► (1. Ingest Baseline) ──► (2. Headless Playwright Run)
                                                      │
┌─────────────────────────────────────────────────────┘
▼
(3. axe-core & Pixelmatch) ──► (4. Compare against Baseline)
                                           │
┌──────────────────────────────────────────┘
▼
(5. Evaluate Policy Thresholds) ──► (6. Gate Decision)
                                            │        │
                                     PASS   │        │ FAIL
                                            ▼        ▼
                                        [Exit 0] [Exit 1 + SARIF]
```

#### Step-by-Step State Transitions:
1. **Ingest Baseline:** CI runner reads baseline snapshot from `.uiforge/snapshots/` or main branch artifact. State: `BASELINE_LOADED`.
2. **Headless Execution:** Playwright spins up headless browser testing PR preview deployment or local build. State: `PAGES_RENDERED`.
3. **Automated Audit:** axe-core executes WCAG 2.2 AA rules; Pixelmatch computes visual diffs against baseline images. State: `METRICS_COLLECTED`.
4. **Baseline Comparison:** Calculates delta metrics: $\Delta \text{criticalA11y}$, $\Delta \text{pixelMismatch}$, $\Delta \text{bundleSize}$. State: `DELTAS_COMPUTED`.
5. **Policy Evaluation:** Compares deltas against project security/quality thresholds (e.g. `allowNewCriticalViolations: false`). State: `POLICY_EVALUATED`.
6. **Gate Decision:**
   - All policies satisfied: emits SARIF report and exits with clean code 0. State: `GATE_PASSED`.
   - Any policy violated: emits GitHub Actions PR annotations, failure summary, and exits with code 1. State: `GATE_FAILED`.

#### Error & Failure Recovery Paths:
- **Test Server Unreachable:** Halts after 3 connection retries; outputs `CI_ENVIRONMENT_ERROR` without false test failure attribution.
