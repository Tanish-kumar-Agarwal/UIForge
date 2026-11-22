# UIFORGE — PHASE 03: OPERATING MODES SPECIFICATION
## Eight First-Class Product Workflows, Separation Boundaries & Execution Semantics

**Document ID:** `UIF-PH03-OPERATING-MODES`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Developer Tools Architect  

---

## 1. Executive Operating Mode Architecture

UIForge structures its runtime behavior into **eight first-class operating modes**. To eliminate ambiguity, unintended side-effects, and architectural bloat, every mode has strictly bounded responsibilities, defined entry points, explicit authorization boundaries, and dedicated input/output contracts.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               EIGHT FIRST-CLASS OPERATING MODES                        │
├──────────┬─────────────────────────────┬─────────────┬──────────────┬──────────────────┤
│ Mode     │ Core Operational Mission    │ Mutating?   │ Auth Level   │ CLI Entry Point  │
├──────────┼─────────────────────────────┼─────────────┼──────────────┼──────────────────┤
│ ANALYZE  │ Read-only codebase parsing  │ NO          │ Level 0      │ uiforge analyze  │
│ DESIGN   │ Requirements & token spec   │ NO          │ Level 0 / 1  │ uiforge design   │
│ GENERATE │ Scaffold new project        │ YES (New)   │ Level 2      │ uiforge generate │
│ AUDIT    │ Detect & classify defects   │ NO          │ Level 0      │ uiforge audit    │
│ IMPROVE  │ Propose & apply mutations   │ YES (Files) │ Level 3      │ uiforge improve  │
│ COMPARE  │ Diff two project states     │ NO          │ Level 0      │ uiforge compare  │
│ VALIDATE │ Gate execution against spec │ NO          │ Level 0      │ uiforge validate │
│ EXPORT   │ Package standalone dossiers │ NO (Output) │ Level 1      │ uiforge export   │
└──────────┴─────────────────────────────┴─────────────┴──────────────┴──────────────────┘
```

### 1.1 Non-Overlapping Mode Separation Invariants
1. **Analyze understands the project; it does not issue a final quality verdict or suggest specific code repairs.** (Audit owns defect detection).
2. **Audit identifies defects; it never modifies project source files.** (Improve owns code modifications).
3. **Improve proposes and applies changes; it only executes changes that have been explicitly authorized by a human.** (Validate gates the commit).
4. **Validate executes formal quality gates; it does not invent new requirements or alter test thresholds.**
5. **Compare evaluates differences between identified project states or snapshots; it does not execute audits from scratch.**
6. **Export packages already-produced artifacts; it never silently regenerates or modifies underlying data.**

---

## 2. Granular Mode Specifications

### 2.1 Mode 1: ANALYZE
- **Purpose:** Provide complete, non-mutating syntactic and semantic comprehension of an existing frontend project.
- **User Entry Point:** CLI command `uiforge analyze [path]`, MCP tool `analyze_project`.
- **Inputs:** Target directory path, optional scan depth, optional path filters (`--include`, `--exclude`).
- **Preconditions:** Target directory exists and is readable by current OS user.
- **Execution Steps:**
  1. Parse `package.json` to detect active framework (Next.js, Vite-React, SvelteKit), styling engine, and dependencies.
  2. Traverse source directory respecting `.gitignore` and `.uiforgeignore`.
  3. Extract route trees from file system conventions (`app/`, `pages/`, `src/routes/`).
  4. Parse component definitions via `@babel/parser` / TypeScript Compiler API to extract props and dependencies.
  5. Extract active CSS variables, Tailwind classes, and design tokens.
  6. Assemble `ProjectAnalysisRecord`.
- **Required Engines:** `@uiforge/project-intelligence`.
- **Required Contracts:** `uiforge.contract.project-analysis.v1`.
- **Data Produced:** `ProjectAnalysisRecord` JSON artifact, console summary table.
- **User Interaction:** Read-only terminal output with animated spinner; no prompts.
- **Approval Requirements:** Level 0 (Zero approval required; completely non-mutating).
- **Failure States:** Directory unreadable (`EACCES`), unparseable package manifest (`MANIFEST_CORRUPT`).
- **Security Boundaries:** Enforces symlink cycle detection; denies traversal outside project root.
- **Audit Events:** `ANALYZE_COMPLETED` logged to `.uiforge/audit.jsonl`.
- **Acceptance Criteria:** Zero filesystem modifications; parses 1,000 files in $< 5.0\text{s}$.

### 2.2 Mode 2: DESIGN
- **Purpose:** Formulate structured design briefs, visual directions, and W3C DTCG-compliant design token dictionaries from natural language requirements.
- **User Entry Point:** CLI command `uiforge design brief <prompt>`, `uiforge design tokens`.
- **Inputs:** Natural language intent prompt, project context, brand guidelines, optional existing token files.
- **Preconditions:** Project context established (or raw standalone mode).
- **Execution Steps:**
  1. Ingest requirement prompt and cross-reference with existing project tokens.
  2. Formulate `DesignBriefRecord` with user personas, layout hierarchy, and state specifications.
  3. Generate DTCG-compliant token definitions for colors, typography ramps, and spacing scales.
  4. Mathematically verify color contrast ratios against WCAG 2.2 AA ($\ge 4.5:1$).
  5. Save generated token specification to `.uiforge/tokens/tokens.json`.
- **Required Engines:** `@uiforge/design-engine`, `@uiforge/tokens`.
- **Required Contracts:** `uiforge.contract.design-brief.v1`, `uiforge.contract.tokens.v1`.
- **Data Produced:** `DesignBriefRecord`, `tokens.json`.
- **User Interaction:** Interactive CLI selection for visual variants; prompt for brand color input.
- **Approval Requirements:** Level 1 (Safe configuration write to local `.uiforge/` directory).
- **Failure States:** Unparseable prompt, severe color contrast failure without accessible fallback.
- **Security Boundaries:** Prompt sanitization; zero external network egress.
- **Audit Events:** `DESIGN_BRIEF_CREATED`, `TOKENS_COMPILED`.
- **Acceptance Criteria:** All generated token pairs mathematically verify WCAG contrast; validates against DTCG schema.

### 2.3 Mode 3: GENERATE
- **Purpose:** Scaffold a complete, buildable greenfield frontend project initialized with UIForge tokens, component registries, and test harnesses.
- **User Entry Point:** CLI command `uiforge generate <project-name>`, `uiforge init`.
- **Inputs:** Project name, target directory, framework choice, styling engine, initial design brief.
- **Preconditions:** Target directory must not exist or must be completely empty.
- **Execution Steps:**
  1. Validate target directory path.
  2. Unpack framework template starter (Next.js, Vite-React).
  3. Compile initial DTCG tokens into target CSS custom properties and Tailwind v4 configuration.
  4. Configure component registry adapter (`components.json`).
  5. Configure Playwright and accessibility test fixtures.
  6. Initialize git repository with baseline commit.
- **Required Engines:** `@uiforge/scaffold`, `@uiforge/tokens`, `@uiforge/core`.
- **Required Contracts:** `uiforge.contract.project.v1`.
- **Data Produced:** Fresh project directory, baseline snapshot `v1.0.0`.
- **User Interaction:** Interactive prompts for project options (or silent with `--yes` flag).
- **Approval Requirements:** Level 2 (New directory filesystem writes).
- **Failure States:** Target directory already contains files, disk space exhausted.
- **Security Boundaries:** Rejects dangerous system directory paths (`/usr`, `C:\Windows`).
- **Audit Events:** `PROJECT_INITIALIZED`.
- **Acceptance Criteria:** Clean exit code 0; `npm run build` succeeds with zero TypeScript errors.

### 2.4 Mode 4: AUDIT
- **Purpose:** Inspect a target web application or codebase to detect, categorize, and report UX, accessibility, and responsive defects without modifying code.
- **User Entry Point:** CLI command `uiforge audit [--url=...] [--a11y] [--ux]`.
- **Inputs:** Target local URL, optional file paths, viewport matrix, audit scope flags.
- **Preconditions:** Target application running locally (or static files available).
- **Execution Steps:**
  1. Launch headless Playwright browser context.
  2. Navigate to target URL across configured viewports (375px, 768px, 1280px).
  3. Execute `@axe-core/playwright` accessibility audit script.
  4. Evaluate DOM bounding boxes for mobile tap targets ($< 24\text{px}$) and horizontal overflow.
  5. Collect console log errors, runtime JavaScript exceptions, and network 4xx/5xx responses.
  6. Classify findings into Critical, Serious, Moderate, and Minor severities.
  7. Formulate structured `AuditReportRecord`.
- **Required Engines:** `@uiforge/browser-eval`, `@uiforge/eval`.
- **Required Contracts:** `uiforge.contract.audit-report.v1`, `uiforge.contract.finding.v1`.
- **Data Produced:** `AuditReportRecord` JSON artifact, terminal finding summary.
- **User Interaction:** Non-mutating execution; displays progress bar across viewports.
- **Approval Requirements:** Level 0 (Zero approval required; completely read-only).
- **Failure States:** URL unreachable (`TARGET_OFFLINE`), navigation timeout (`TIMEOUT_EXCEEDED`).
- **Security Boundaries:** Headless browser runs sandboxed with file access disabled.
- **Audit Events:** `AUDIT_COMPLETED`.
- **Acceptance Criteria:** Detects 100% of standard axe-core violations; 0 modifications to target app.

### 2.5 Mode 5: IMPROVE
- **Purpose:** Formulate, stage, validate, and apply non-destructive code modifications to repair defects or implement design specifications.
- **User Entry Point:** CLI command `uiforge improve [--finding=...] [--brief=...]`, MCP tool `propose_modification`.
- **Inputs:** Defect finding ID or design brief, target file path, proposed patch.
- **Preconditions:** Clean git working tree (or explicit `--allow-dirty`); valid user approval token.
- **Execution Steps:**
  1. Validate human authorization token signature and diff hash.
  2. Create pre-image Write-Ahead Log (WAL) in `.uiforge/wal/journal-<id>.log`.
  3. Record baseline TypeScript Compiler API diagnostics ($\text{baselineErrors}$).
  4. Apply mutation via coordinate slice patching (replaces exact character span $[start, end]$).
  5. Run post-mutation TypeScript compiler diagnostic check ($\text{postErrors}$).
  6. Compute regression delta: $\text{newRegressions} = \text{postErrors} \setminus \text{baselineErrors}$.
  7. If $\text{newRegressions} > 0$: auto-rollback from WAL pre-image and halt with error.
  8. If $\text{newRegressions} === 0$: commit WAL transaction and emit applied unified diff.
- **Required Engines:** `@uiforge/safe-modifier`, TypeScript Compiler API, `@babel/parser`.
- **Required Contracts:** `uiforge.contract.modification.v1`, `uiforge.contract.approval.v1`.
- **Data Produced:** `ModificationResultRecord`, unified diff file, updated project source files.
- **User Interaction:** Interactive terminal prompt displaying unified diff and asking `[Y/n]` to authorize write.
- **Approval Requirements:** Level 3 (Explicit human-authorized, diff-bound signature token).
- **Failure States:** Token missing or tampered with (`AUTH_TOKEN_INVALID`), TypeScript regression detected (`TS_REGRESSION_DETECTED`).
- **Security Boundaries:** Enforces canonical path verification; prevents symlink escapes.
- **Audit Events:** `MUTATION_PROPOSED`, `MUTATION_AUTHORIZED`, `MUTATION_APPLIED` (or `MUTATION_ROLLED_BACK`).
- **Acceptance Criteria:** 100% rollback on compile error; zero unjournaled writes.

### 2.6 Mode 6: COMPARE
- **Purpose:** Compare two project snapshots, git revisions, or visual capture runs to evaluate visual deltas, token drift, and accessibility progression.
- **User Entry Point:** CLI command `uiforge compare <snapshot-A> <snapshot-B>`.
- **Inputs:** Snapshot IDs or image paths for comparison.
- **Preconditions:** Both snapshots/images exist in `.uiforge/snapshots/` or local disk.
- **Execution Steps:**
  1. Load both snapshot manifests.
  2. Compute token difference matrix (added, modified, deleted tokens).
  3. Compute component inventory diff (new props, removed components).
  4. If comparing visual captures, execute `pixelmatch` diffing to compute pixel delta percentage and highlight image.
  5. Compute accessibility delta: $\Delta \text{violations} = \text{violations}_B - \text{violations}_A$.
  6. Formulate `ComparisonRecord`.
- **Required Engines:** `@uiforge/eval`, `pixelmatch` (`OS-VREG-01`).
- **Required Contracts:** `uiforge.contract.comparison.v1`.
- **Data Produced:** `ComparisonRecord`, visual diff PNG.
- **User Interaction:** Terminal diff view; optional side-by-side terminal rendering.
- **Approval Requirements:** Level 0 (Read-only comparison).
- **Failure States:** Snapshot ID not found (`SNAPSHOT_NOT_FOUND`).
- **Security Boundaries:** Read-only access to `.uiforge/snapshots/`.
- **Audit Events:** `COMPARE_EXECUTED`.
- **Acceptance Criteria:** Accurately identifies 100% of modified token values and pixel differences.

### 2.7 Mode 7: VALIDATE
- **Purpose:** Execute defined quality gates and verification rules in CI/CD pipelines to block regressive pull requests.
- **User Entry Point:** CLI command `uiforge validate [--fail-on=critical|serious]`.
- **Inputs:** Threshold flags, baseline snapshot reference.
- **Preconditions:** Project built or test server running.
- **Execution Steps:**
  1. Trigger automated audit battery (a11y, UX, TypeScript diagnostics).
  2. Evaluate findings against configured threshold policies (e.g. `maxCriticalA11y: 0`, `maxPixelDelta: 0.05%`).
  3. If all criteria pass, emit clean exit code 0.
  4. If any gate fails, emit non-zero exit code (1) and print failed gate summary.
- **Required Engines:** `@uiforge/eval`, `@uiforge/core`.
- **Required Contracts:** `uiforge.contract.validation-run.v1`.
- **Data Produced:** `ValidationRunRecord`, JUnit/SARIF report for CI integration.
- **User Interaction:** Non-interactive CI mode; outputs standard exit codes.
- **Approval Requirements:** Level 0 (Non-mutating verification).
- **Failure States:** Target gate failure (exits with code 1 and prints remediation instructions).
- **Security Boundaries:** Read-only execution in CI runner.
- **Audit Events:** `VALIDATION_PASSED` or `VALIDATION_FAILED`.
- **Acceptance Criteria:** Deterministic CI failure when violations exceed thresholds.

### 2.8 Mode 8: EXPORT
- **Purpose:** Package generated artifacts, tokens, and verification scorecards into standalone, distributable formats (HTML dossiers, DTCG JSON, Markdown reports).
- **User Entry Point:** CLI command `uiforge export [report|tokens] [--format=html|json|md]`.
- **Inputs:** Export target type, output directory path, formatting options.
- **Preconditions:** Target artifacts exist in `.uiforge/`.
- **Execution Steps:**
  1. Read target data records from `.uiforge/`.
  2. Compile standalone bundle:
     - For HTML: inlines all CSS, JS, and base64 screenshot thumbnails (zero CDN dependencies).
     - For tokens: packages clean W3C DTCG JSON file.
     - For Markdown: formats GitHub Flavored Markdown with tables and links.
  3. Compute SHA-256 cryptographic digest of exported bundle.
  4. Write export bundle to specified output path.
- **Required Engines:** `@uiforge/reporting`, `@uiforge/tokens`.
- **Required Contracts:** `uiforge.contract.export-artifact.v1`.
- **Data Produced:** Exported file (`report.html`, `tokens.json`, `audit.md`).
- **User Interaction:** Displays output file path and SHA-256 digest.
- **Approval Requirements:** Level 1 (Safe write to specified export destination).
- **Failure States:** Output path unwriteable (`EACCES`).
- **Security Considerations:** Inlined HTML uses context-aware escaping to prevent XSS.
- **Audit Events:** `EXPORT_GENERATED`.
- **Acceptance Criteria:** Standalone HTML report opens and renders completely offline.
