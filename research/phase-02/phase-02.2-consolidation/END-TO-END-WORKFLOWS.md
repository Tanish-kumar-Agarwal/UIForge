# UIForge Phase 02.2 — End-to-End Operational Workflows Specification

**Document Identifier:** `UIF-PH02.2-WORKFLOWS`  
**Classification:** Canonical System-Wide Operational Execution Flows & State Transitions  
**Parent Phase:** Phase 02.2 — Deep Technical Audit, Architecture Decisions & Cross-Workstream Consolidation  
**Target Standard:** Principal Software Architect + Principal Frontend Infrastructure Engineer + AI Systems Architect  
**Status:** COMPLETE & CONSOLIDATED  
**Date:** November 21, 2026  

---

## 1. Executive Summary & Workflow Principles

To validate that UIForge's 11 layers, 10 shared contracts, and 5 workstream domains cooperate seamlessly, this document defines **Seven Canonical End-to-End Operational Flows**.

### 1.1 Non-Negotiable Operational Principles
1. **Read-Only Ingress Gate:** Every workflow begins in a strictly non-mutating state. Scanning, analysis, token normalization, and candidate ranking never touch disk or stage Git modifications.
2. **Deterministic Pre-Image Hashing:** Workflows that propose mutations capture pre-image SHA-256 hashes of all target files to prevent TOCTOU concurrency corruption.
3. **Diff-Bound Authorization:** Human approvals are cryptographically bound to specific unified diffs and target file hashes.
4. **Independent Post-Mutation Verification:** Code changes are verified in headless browsers before an operation is declared successful.
5. **Fail-Closed Crash Recovery:** Any mid-operation crash or verification failure triggers write-ahead journal rollback.

---

## 2. Seven Canonical End-to-End Workflows

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CANONICAL OPERATIONAL WORKFLOWS                                 │
├──────┬───────────────────────────────────────────────┬─────────────────────────────────┤
│ Ref  │ Workflow Title                                │ Primary Execution Focus         │
├──────┼───────────────────────────────────────────────┼─────────────────────────────────┤
│ **A**│ Brownfield Project Analysis                   │ Read-only discovery & context   │
│ **B**│ Component Discovery & Reuse                   │ Two-stage candidate selection   │
│ **C**│ Design-System & Token Generation              │ DTCG parsing & loss reporting   │
│ **D**│ Controlled Frontend Transformation            │ Diff planning, approval & write │
│ **E**│ Independent Browser Quality Verification      │ Playwright, A11y & visual diff  │
│ **F**│ External Agent Ingress via MCP                │ Protocol handshake & tool call  │
│ **G**│ Failed Transformation & Crash Recovery        │ Mid-transaction journal rollback│
└──────┴───────────────────────────────────────────────┴─────────────────────────────────┘
```

---

### Flow A: Brownfield Project Analysis (Read-Only Discovery)

**Description:** An engineer or AI agent points UIForge to an existing repository. UIForge performs deep syntactic and semantic indexing without modifying a single byte on disk.

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer / Agent
    participant Orch as Orchestration Layer
    participant WS1 as WS-1: Project Intelligence
    participant WS2 as WS-2: Component Architecture
    participant WS3 as WS-3: Registry & Tokens
    participant Disk as Target Repository

    Dev->>Orch: Start Analysis (repoRoot: '/app')
    Orch->>WS1: scanProject(repoRoot)
    WS1->>Disk: Read package.json, tsconfig, routes (oxc-parser)
    WS1->>WS1: Compute Merkle Hash Root (snapshotHash)
    WS1-->>Orch: ProjectIntelligenceContract (SnapshotId: S-1)

    par Parallel Domain Analysis
        Orch->>WS2: analyzeComponents(Snapshot S-1)
        WS2->>WS1: Get AST Nodes for Component Files
        WS2->>WS2: Classify RSC Tiers (1 to 4) & A11y Profiles
        WS2-->>Orch: ComponentIntelligenceContract (Catalog C-1)
    and
        Orch->>WS3: extractTokensAndStyles(Snapshot S-1)
        WS3->>Disk: Read tailwind.config / CSS Custom Properties
        WS3->>WS3: Parse DTCG Tokens & Detect Cascades
        WS3-->>Orch: DesignTokenContract (Tokens T-1)
    end

    Orch->>Orch: Synthesize Master Knowledge Model
    Orch-->>Dev: Return Complete Project Knowledge (Zero Disk Writes)
```

- **Data Flow:** `repoRoot` ➔ `ProjectSnapshot` ➔ `ComponentCatalog` + `TokenTree` ➔ Unified Project Intelligence.
- **Security Check:** Verifies `repoRoot` exists, is canonical (`fs.realpathSync`), and excludes `.git`, `node_modules`, `.env*`.
- **Evidence Produced:** `ws1-scan-record` (`STATIC-ANALYSIS`).

---

### Flow B: Component Discovery, Evaluation & Reuse

**Description:** The user or agent requests a new UI capability (e.g., "Add an accessible tabs component"). UIForge evaluates existing components before considering external templates or package dependencies.

```mermaid
sequenceDiagram
    autonumber
    actor Agent as AI Coding Agent
    participant Orch as Orchestration Layer
    participant WS2 as WS-2: Component Selector
    participant WS3 as WS-3: Registry Ingestor
    participant WS9 as WS-9: Provenance Tracker

    Agent->>Orch: Request Component ('accessible-tabs', RSC Tier: Client)
    Orch->>WS2: findBestCandidates(criteria)
    
    rect rgb(240, 248, 255)
        note over WS2: Stage 1: Eligibility Gates
        WS2->>WS2: Filter: RSC Tier Compatible? Framework Matches?
    end

    rect rgb(255, 250, 240)
        note over WS2: Stage 2: Weighted Ranking
        WS2->>WS2: Score: Existing Local (2.5x) > shadcn Ingest (2.0x) > npm (1.0x)
    end

    alt Local Component Exists
        WS2-->>Orch: Recommend: Reuse '@local/components/ui/tabs.tsx' (Score: 0.95)
    else Ingest External shadcn Template
        WS2->>WS3: fetchRegistryResource('shadcn/tabs')
        WS3->>WS3: SSRF Check & Compute SHA-256 Digest
        WS3->>WS9: Verify License (MIT Permissive)
        WS3-->>WS2: Validated RegistryResource
        WS2-->>Orch: Recommend: Ingest 'shadcn/tabs' (Score: 0.82)
    end

    Orch-->>Agent: Present Ranked Recommendation + Provenance Evidence
```

- **Key Decision Gate:** If an existing local component satisfies the requirement, external ingestion is bypassed entirely.
- **Evidence Produced:** `component-selection-evaluation` (`REPORTED-SIMULATION`).

---

### Flow C: Design-System & Token Generation

**Description:** Extracting legacy design values and generating target styling representations across Tailwind v3, Tailwind v4, CSS Modules, or Sass with formal loss reporting.

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer / CLI
    participant Orch as Orchestration Layer
    participant WS3 as WS-3: Token Engine
    participant Style as WS-3: Styling Adapter
    participant WS4 as WS-4: Browser Verifier

    Dev->>Orch: Convert Design Tokens (Source: DTCG JSON -> Target: Tailwind v4 @theme)
    Orch->>WS3: parseAndResolve(dtcgJson, context)
    WS3->>WS3: Parse color components: [r, g, b] (OKLCH)
    WS3->>WS3: Resolve Multi-Dimensional Contexts (light/dark/contrast)
    WS3-->>Orch: ResolvedTokenTree

    Orch->>Style: convertToTarget(ResolvedTokenTree, 'tailwind-v4')
    Style->>Style: Map tokens to @theme CSS block
    Style->>Style: Audit Conversion Losses (Dynamic variants vs static)
    Style-->>Orch: StylingTransformationContract (Loss Score: 0.0, Exact Match: true)

    opt Pre-Commit Visual Verification
        Orch->>WS4: renderPreview(generatedCss)
        WS4-->>Orch: Visual Diff Verified (0 mismatched pixels)
    end

    Orch-->>Dev: Present Generated @theme CSS + Conversion Loss Report
```

- **Critical Invariant:** If `exactMatch === false`, the conversion report details every lost construct and marks `humanReviewRequired: true`.
- **Evidence Produced:** `token-resolution-record` (`LOCAL-HARNESS-TESTED`).

---

### Flow D: Controlled Frontend Transformation (Diff, Approval & Write)

**Description:** The primary mutating workflow. An external AI agent requests a codebase modification. UIForge plans the change, requires human authorization, checks TOCTOU hashes, writes atomically via SQLite journal, and verifies the result.

```mermaid
sequenceDiagram
    autonumber
    actor Human as Human Operator
    actor Agent as AI Coding Agent
    participant Ingress as @uiforge/mcp-server
    participant Planner as WS-1: Change Planner
    participant Security as Security Gate (WS-11)
    participant Journal as SQLite Journal (WS-7)
    participant Disk as Target Repository Files
    participant WS4 as WS-4: Browser Verifier

    Agent->>Ingress: uiforge_plan_transformation(intent, targetFiles)
    Ingress->>Planner: Synthesize AST Changes
    Planner->>Disk: Read current target files & calculate Pre-Image SHA-256
    Planner->>Planner: Generate Unified Diff & compute DiffDigest
    Planner-->>Ingress: ChangeProposal (Level 3 Permission)
    Ingress-->>Agent: Status: APPROVAL_REQUIRED (Proposal ID: P-402)

    Ingress->>Human: Present Side-by-Side Diff & DiffDigest in CLI/GUI
    Human->>Security: Authorize Proposal P-402
    Security->>Security: Mint Single-Use ApprovalToken (Bound to DiffDigest & Pre-Image)
    Security-->>Agent: ApprovalToken issued

    Agent->>Ingress: uiforge_apply_transformation(ProposalID, ApprovalToken)
    Ingress->>Security: Validate Token
    Security->>Security: Check: Valid? Unexpired? Bound Diff Matches?
    Security->>Disk: TOCTOU Check: currentHash === preImageSha256?
    Security->>Journal: Begin Transaction & Record Pre-Image Snapshots
    Journal->>Disk: Atomic Multi-File Disk Write
    Journal->>Journal: Mark ApprovalToken Consumed

    Ingress->>WS4: verifyRenderedOutput(targetRoute)
    WS4-->>Ingress: Verification Evidence: PASS (Axe Clean, 0 Visual Diff)
    Journal->>Journal: Commit Transaction
    Ingress-->>Agent: Success: Changes Applied and Verified in Real Browser
```

- **Failure Boundary:** If TOCTOU check fails (disk was modified concurrently), operation aborts with `SOURCE_CHANGED`.
- **Evidence Produced:** `change-proposal-record` + `verification-evidence-record`.

---

### Flow E: Independent Headless Browser Quality Verification

**Description:** Autonomous verification of rendered web pages in real Playwright browsers, evaluating accessibility, layout geometry overflow, and perceptual visual regressions.

```mermaid
sequenceDiagram
    autonumber
    actor Orch as Orchestration / Agent
    participant WS4 as WS-4: Browser Verifier
    participant Playwright as Playwright Engine (v1.65.1)
    participant Axe as axe-core (v4.14.1)
    participant Pixel as Pixelmatch (v8.0.0)
    participant DevServer as Local Next.js Dev Server (localhost:3000)

    Orch->>WS4: verifyRoute('/dashboard', viewport: {1280, 720})
    WS4->>WS4: SSRF Check: Is destination localhost:3000? (Permitted)
    WS4->>Playwright: Launch Chromium & Navigate('http://127.0.0.1:3000/dashboard')
    Playwright->>DevServer: HTTP GET /dashboard
    DevServer-->>Playwright: 200 OK + Rendered DOM

    par Multi-Dimensional Quality Checks
        WS4->>Playwright: Check Document Overflow (HTML.scrollWidth > innerWidth)
        Playwright-->>WS4: Overflow: false (scrollWidth: 1280, innerWidth: 1280)
    and
        WS4->>Axe: Inject axe-core & run(rules: ['wcag2a', 'wcag2aa'])
        Axe-->>WS4: Automated Checks: 12 Passed, 0 Violations
    and
        WS4->>Playwright: Capture page.ariaSnapshot()
        Playwright-->>WS4: ARIA YAML Tree Digest: 'a1b2c3...'
    and
        WS4->>Playwright: Screenshot Buffer
        Playwright-->>WS4: PNG Buffer
        WS4->>Pixel: Compare against Golden Baseline (Threshold: 0.1, OKLab)
        Pixel-->>WS4: Diff Pixels: 0 (0.00%)
    end

    WS4->>WS4: Package Universal Evidence Record & Compute recordDigest
    WS4-->>Orch: BrowserVerificationContract (Status: PASS)
```

- **Security Isolation:** Route interception strictly blocks requests outside localhost:3000.
- **Evidence Produced:** `VerificationEvidenceRecord` (`LIVE-INTEGRATION-TESTED`).

---

### Flow F: External AI Coding Agent Ingress via Model Context Protocol (MCP)

**Description:** An external coding agent (Anthropic Claude Code, Cursor, Antigravity) connects to UIForge via MCP over Streamable HTTP POST or stdio.

```mermaid
sequenceDiagram
    autonumber
    actor Agent as External Agent (Claude Code)
    participant MCP as @uiforge/mcp-server (Ingress Adapter)
    participant Security as Security Gate (WS-11)
    participant Core as UIForge Core Engine

    Agent->>MCP: POST /mcp (JSON-RPC: initialize, protocol: 2026-07-28)
    MCP-->>Agent: 200 OK (capabilities: { tools: {}, resources: {} })

    Agent->>MCP: POST /mcp (tools/list)
    MCP-->>Agent: Expose 7 Tool Families with Typed Zod Schemas

    Agent->>MCP: POST /mcp (tools/call: uiforge_scan_project)
    MCP->>Security: Authorize Tool Call (Permission Level: 0)
    Security-->>MCP: Authorized
    MCP->>Core: scanProject()
    Core-->>MCP: ProjectSnapshot
    MCP->>MCP: Pack Context (Compress 9,964 chars -> 871 chars, 91.2% reduction)
    MCP-->>Agent: Packed Compact Project Context

    Agent->>MCP: POST /mcp (tools/call: uiforge_plan_transformation)
    MCP->>Security: Authorize Tool Call (Permission Level: 2)
    Security-->>MCP: Requires Human Approval
    MCP-->>Agent: Status: APPROVAL_REQUIRED + Diff Digest
```

- **Decoupled Mandate:** Agent pays for its own LLM inference; UIForge provides deterministic environment tools.
- **Evidence Produced:** `mcp-session-audit-record`.

---

### Flow G: Failed Transformation & Crash Recovery (Rollback)

**Description:** A multi-file transformation encounters a disk write error, unhandled exception, or post-mutation verification failure. The write-ahead journal restores pre-image files atomically.

```mermaid
sequenceDiagram
    autonumber
    actor Agent as AI Coding Agent
    participant Execution as Transformation Execution Engine
    participant Journal as SQLite Write-Ahead Journal (.uiforge/journal.db)
    participant Disk as Repository Files
    participant WS4 as WS-4: Browser Verifier

    Execution->>Journal: Begin Transaction TX-901
    Execution->>Journal: Write Pre-Image File Backups for File A, File B, File C
    Execution->>Disk: Modify File A (Success)
    Execution->>Disk: Modify File B (Success)
    
    rect rgb(255, 230, 230)
        note over Execution, Disk: Disk Error or Syntax Corruption on File C
        Execution->>Disk: Modify File C -> IO_ERROR: Disk Full or Syntax Error
    end

    Execution->>Execution: Trigger Crash Recovery Handler
    Execution->>Journal: Query Pre-Image Backups for Transaction TX-901
    Journal-->>Execution: Return Pre-Image Content for File A, File B

    Execution->>Disk: Revert File A to Pre-Image SHA-256
    Execution->>Disk: Revert File B to Pre-Image SHA-256
    Execution->>Journal: Mark Transaction TX-901 ROLLED_BACK
    
    Execution->>WS4: Verify Repository Restored Cleanly
    WS4-->>Execution: Repository Restored (Working Tree Intact)
    
    Execution-->>Agent: Error: TRANSFORMATION_FAILURE (Transaction Rolled Back, Zero Data Lost)
```

- **Guarantee:** Repository is never left in a partially modified or uncompilable state.
- **Evidence Produced:** `journal-rollback-event` (`LOCAL-HARNESS-TESTED`).
