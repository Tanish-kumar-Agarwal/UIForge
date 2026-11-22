# UIFORGE — PHASE 03: ARCHITECTURE DIAGRAMS CATALOGUE
## Ten Canonical Architectural, Workflow, Sequence & Security Data-Flow Diagrams

**Document ID:** `UIF-PH03-ARCHITECTURE-DIAGRAMS`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Application Security Architect  

---

## 1. Executive Diagrammatic Overview

This document provides the complete suite of ten canonical architecture diagrams for UIForge. All diagrams are formulated in pure Mermaid syntax, matching the written specifications in `MASTER-SYSTEM-ARCHITECTURE.md` and `SECURITY-ARCHITECTURE.md` with zero discrepancy.

---

## 2. Diagram 1: System Context Diagram

```mermaid
graph TD
    subgraph ExternalActors["External Actors & Environments"]
        Dev["Human Developer<br>(Terminal / IDE)"]
        Agent["Autonomous AI Agent<br>(Claude Code / Cursor / OpenCode)"]
        CI["CI/CD Runner<br>(GitHub Actions / GitLab CI)"]
        Designer["UI/UX Designer<br>(Figma / Penpot)"]
    end

    subgraph UIForgeSystem["UIForge System Boundary"]
        CLI["@uiforge/cli<br>(Terminal CLI)"]
        MCP["@uiforge/mcp-server<br>(MCP 2026-07-28)"]
        Core["@uiforge/core<br>(Orchestration Engine)"]
        Studio["@uiforge/studio<br>(Optional Local Web GUI)"]
    end

    subgraph TargetEnvironment["Target Project Codebase"]
        Repo["Project Repository<br>(JSX/TSX, CSS, Config)"]
        DevServer["Local App Preview<br>(http://localhost:3000)"]
        DotUIForge[".uiforge/ State<br>(Snapshots, WAL, Audit)"]
    end

    Dev -->|Invokes Commands| CLI
    Agent -->|JSON-RPC Tools| MCP
    CI -->|Quality Gate| CLI
    Designer -->|Inspects Tokens| Studio

    CLI --> Core
    MCP --> Core
    Studio --> Core

    Core -->|AST Read / Slice Patch| Repo
    Core -->|Headless Render & a11y| DevServer
    Core -->|Snapshots & Audit Logs| DotUIForge
```

---

## 3. Diagram 2: Container & Component Architecture Diagram

```mermaid
graph TB
    subgraph IngressLayer["1. Ingress & Interface Layer"]
        CLI["@uiforge/cli"]
        MCP["@uiforge/mcp-server"]
        AgentSDK["@uiforge/agent-sdk"]
        Studio["@uiforge/studio"]
    end

    subgraph CoreLayer["2. Core Orchestration Layer"]
        Orchestrator["@uiforge/core<br>(Workflow Coordinator & State Machine)"]
    end

    subgraph DomainEngines["3. Domain Intelligence Engines"]
        Intel["@uiforge/project-intelligence<br>(AST Scanner, Routes, Babel)"]
        Design["@uiforge/design-engine<br>(Briefs, Directions, APG)"]
        Tokens["@uiforge/tokens<br>(W3C DTCG, Style Dictionary v5.8)"]
        Reg["@uiforge/component-registry<br>(shadcn model, Phase 02.4 Pool)"]
        SafeMod["@uiforge/safe-modifier<br>(Slice Patcher, WAL, TS Comparator)"]
        Browser["@uiforge/browser-eval<br>(Playwright, Pixelmatch, axe-core)"]
        Eval["@uiforge/eval<br>(Finding Categorizer, Policies)"]
        Report["@uiforge/reporting<br>(HTML & Markdown Dossiers)"]
    end

    subgraph InfrastructureLayer["4. Infrastructure & Ground Contracts"]
        Security["@uiforge/security<br>(5-Level Ladder, Token Signer)"]
        Storage["@uiforge/storage<br>(Local Filesystem, SQLite)"]
        Contracts["@uiforge/contracts<br>(Zod Schemas & TypeScript Types)"]
    end

    CLI --> Orchestrator
    MCP --> AgentSDK --> Orchestrator
    Studio --> Orchestrator

    Orchestrator --> Intel
    Orchestrator --> Design
    Orchestrator --> Tokens
    Orchestrator --> Reg
    Orchestrator --> SafeMod
    Orchestrator --> Browser
    Orchestrator --> Eval
    Orchestrator --> Report

    Intel --> Security
    SafeMod --> Security
    SafeMod --> Storage
    Browser --> Storage
    Report --> Storage

    Security --> Contracts
    Storage --> Contracts
    DomainEngines --> Contracts
```

---

## 4. Diagram 3: Package Dependency DAG

```mermaid
graph TD
    CLI["@uiforge/cli"] --> Core["@uiforge/core"]
    MCP["@uiforge/mcp-server"] --> AgentSDK["@uiforge/agent-sdk"]
    MCP --> Core
    AgentSDK --> Core
    Studio["@uiforge/studio"] --> Core

    Core --> Intel["@uiforge/project-intelligence"]
    Core --> Design["@uiforge/design-engine"]
    Core --> Tokens["@uiforge/tokens"]
    Core --> Reg["@uiforge/component-registry"]
    Core --> SafeMod["@uiforge/safe-modifier"]
    Core --> Browser["@uiforge/browser-eval"]
    Core --> Eval["@uiforge/eval"]
    Core --> Report["@uiforge/reporting"]

    Design --> Tokens
    Design --> Reg
    SafeMod --> Security["@uiforge/security"]
    Browser --> Eval
    Report --> Eval

    Core --> Storage["@uiforge/storage"]
    Core --> Security

    Intel --> Contracts["@uiforge/contracts"]
    Tokens --> Contracts
    Reg --> Contracts
    SafeMod --> Contracts
    Browser --> Contracts
    Eval --> Contracts
    Report --> Contracts
    Storage --> Contracts
    Security --> Contracts
```

---

## 5. Diagram 4: Workflow A Sequence Diagram (New Frontend Creation)

```mermaid
sequenceDiagram
    autonumber
    actor User as Developer / Agent
    participant CLI as @uiforge/cli
    participant Core as @uiforge/core
    participant Design as @uiforge/design-engine
    participant Tokens as @uiforge/tokens
    participant Scaffold as @uiforge/scaffold
    participant Browser as @uiforge/browser-eval
    participant Report as @uiforge/reporting

    User->>CLI: uiforge generate my-app --brief="SaaS Dashboard"
    CLI->>Core: executeWorkflowA(briefPrompt)
    Core->>Design: generateDesignBrief(prompt)
    Design-->>Core: DesignBriefRecord
    Core->>Design: generateVisualDirections(brief)
    Design-->>Core: VisualDirectionRecord (Selected)
    Core->>Tokens: compileTokens(direction)
    Tokens-->>Core: CSS Variables + Tailwind v4 rules
    Core->>Scaffold: scaffoldProject(template, tokens)
    Scaffold-->>Core: Project Initialized on Disk
    Core->>Browser: verifyRender(previewUrl, viewports)
    Browser-->>Core: EvaluationRecord (Screenshots, a11y pass)
    Core->>Report: buildQualityDossier()
    Report-->>Core: audit-report.html
    Core-->>CLI: Generation Complete (Snapshot v1.0.0)
    CLI-->>User: Output Clean Project + Report Link
```

---

## 6. Diagram 5: Workflow B Diagram (Brownfield UI Improvement)

```mermaid
flowchart TD
    Start([User runs: uiforge improve]) --> Scan[1. Read-Only Codebase Scan]
    Scan --> AST[2. Extract AST, Routes & Tokens]
    AST --> Browser[3. Headless Browser Run: 375px/768px/1280px]
    Browser --> Audit[4. axe-core & Layout Overflow Audit]
    Audit --> Categorize[5. Categorize Findings: Critical/Serious/Moderate]
    Categorize --> PatchGen[6. Formulate Targeted AST Slice Patch]
    PatchGen --> PromptUser{7. Human Reviews Diff & Prompts Approval}
    
    PromptUser -- Denied --> Abort([Halt: Zero Files Modified])
    PromptUser -- Approved --> WAL[8. Flush Pre-Image to .uiforge/wal/]
    
    WAL --> ApplyPatch[9. Apply Coordinate Slice Patch to JSX]
    ApplyPatch --> TSCheck[10. Evaluate TS Compiler API Diagnostics]
    TSCheck --> RegCheck{11. New Regressions Introduced?}
    
    RegCheck -- Yes --> Rollback[12. Automated WAL Rollback: Restore Pre-Image]
    Rollback --> ErrorExit([Halt: Mutation Reverted, Diagnostics Emitted])
    
    RegCheck -- No --> Commit[13. Commit Transaction & Update Snapshot]
    Commit --> Done([Done: Clean Code Mutation Applied])
```

---

## 7. Diagram 6: Safe Modification Sequence Diagram (WAL Engine)

```mermaid
sequenceDiagram
    autonumber
    participant Caller as Caller (CLI / Agent)
    participant SafeMod as @uiforge/safe-modifier
    participant Sec as @uiforge/security
    participant WAL as WAL Journal (.uiforge/wal/)
    participant Disk as Target Project File
    participant TS as TypeScript Compiler API

    Caller->>SafeMod: applyMutation(targetFile, slicePatch, authToken)
    SafeMod->>Sec: verifyTokenSignature(authToken, patchHash)
    Sec-->>SafeMod: Token Verified (Level 3 Valid)
    SafeMod->>WAL: writeJournalEntry(preImageBytes, sha256)
    WAL-->>SafeMod: Journal Flushed to Disk
    SafeMod->>TS: getBaselineDiagnostics(projectRoot)
    TS-->>SafeMod: baselineErrorCount (e.g. 0)
    SafeMod->>Disk: writeCoordinateSlice(start, end, newBytes)
    SafeMod->>TS: getPostDiagnostics(projectRoot)
    TS-->>SafeMod: postErrorCount
    
    alt postErrorCount > baselineErrorCount (Regression Detected)
        SafeMod->>WAL: readPreImage(journalId)
        SafeMod->>Disk: overwriteWithPreImage()
        SafeMod-->>Caller: Rejected: TypeScript Compile Regression Rolled Back
    else postErrorCount == baselineErrorCount (Clean Edit)
        SafeMod->>WAL: markCommitted(journalId)
        SafeMod-->>Caller: Success: Modification Committed
    end
```

---

## 8. Diagram 7: Agent Integration Sequence Diagram (MCP Protocol)

```mermaid
sequenceDiagram
    autonumber
    actor Agent as Coding Agent (Claude Code / OpenCode)
    participant MCP as @uiforge/mcp-server
    participant Zod as Contract Validator
    participant Core as @uiforge/core
    actor Dev as Human Developer

    Agent->>MCP: POST /mcp (server/discover)
    MCP-->>Agent: { protocolVersion: "2026-07-28", tools: [...] }
    
    Agent->>MCP: tools/call ("analyze_project", {})
    MCP->>Zod: validateArguments()
    Zod-->>MCP: Valid
    MCP->>Core: executeAnalyze()
    Core-->>MCP: ProjectAnalysisRecord
    MCP-->>Agent: Result (Routes, Tokens, Components)
    
    Agent->>MCP: tools/call ("propose_modification", { patch: "..." })
    MCP->>Zod: validateArguments()
    MCP->>Core: requiresPermission(Level 3)
    Core-->>MCP: Permission Blocked
    MCP-->>Agent: Error (ApprovalRequired: diffHash, tokenChallenge)
    
    Dev->>Core: uiforge authorize <tokenChallenge> (User signs diff)
    Core-->>Dev: Authorization Token Issued
    
    Agent->>MCP: tools/call ("apply_modification", { token: "..." })
    MCP->>Core: executeSafeMutation(token)
    Core-->>MCP: ModificationResultRecord
    MCP-->>Agent: Success: Mutation Applied & Verified
```

---

## 9. Diagram 8: Browser Evaluation Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    participant Core as @uiforge/core
    participant Browser as @uiforge/browser-eval
    participant PW as Playwright Worker (Chromium)
    participant Axe as axe-core Runner
    participant Pixel as Pixelmatch Diff Engine

    Core->>Browser: evaluateTarget(url, viewports: [375, 1280])
    Browser->>PW: spawnHeadlessContext({ fontHinting: 'none' })
    PW-->>Browser: Context Ready
    
    loop For Each Viewport
        Browser->>PW: setViewportSize(w, h)
        Browser->>PW: navigateTo(url, { waitUntil: 'networkidle' })
        PW-->>Browser: Page Loaded
        Browser->>Axe: injectAxeCoreRunner()
        Axe-->>Browser: axeResults (WCAG violations array)
        Browser->>PW: captureScreenshot()
        PW-->>Browser: currentPngBuffer
        
        opt Baseline Image Exists
            Browser->>Pixel: comparePixels(baselinePng, currentPng)
            Pixel-->>Browser: { deltaCount, mismatchRatio, diffPngBuffer }
        end
    end
    
    Browser->>PW: closeContext()
    Browser-->>Core: BrowserEvaluationRecord (Screenshots, a11y, Visual Diffs)
```

---

## 10. Diagram 9: Trust Boundaries & Security Data-Flow Diagram

```mermaid
flowchart LR
    subgraph UntrustedZone["UNTRUSTED EXTERNAL ZONE"]
        AgentPrompt["External Agent Prompts"]
        TargetFiles["Target Brownfield Codebase"]
        Registries["External npm / Component Registries"]
    end

    subgraph BoundaryDefense["TRUST BOUNDARY & PERMISSION GATES"]
        Sanitizer["Prompt & Path Sanitizer"]
        Ladder["5-Level Security Ladder"]
        AuthTokens["Signed Authorization Tokens"]
    end

    subgraph TrustedCore["TRUSTED LOCAL CORE ENGINE"]
        CoreEngine["@uiforge/core Orchestration"]
        ASTEngine["Read-Only AST Parser"]
        WALEngine["Safe Modifier WAL Engine"]
        StorageEngine[".uiforge/ Storage & Audit"]
    end

    subgraph IsolatedExecution["ISOLATED EXECUTION SANDBOXES"]
        HeadlessPW["Headless Chromium Sandbox<br>(No file:// access)"]
        CLIProcess["External Subprocess<br>(ast-grep, no shell)"]
    end

    AgentPrompt -->|Sanitize| Sanitizer
    TargetFiles -->|Validate Path| Sanitizer
    Registries -->|Verify Digest| Sanitizer

    Sanitizer --> Ladder
    Ladder -->|Level 0-1| CoreEngine
    Ladder -->|Level 2+| AuthTokens --> CoreEngine

    CoreEngine --> ASTEngine
    CoreEngine --> WALEngine
    CoreEngine --> StorageEngine

    CoreEngine -->|Isolated RPC| HeadlessPW
    CoreEngine -->|Safe execFile| CLIProcess
```

---

## 11. Diagram 10: Local-First Deployment Diagram

```mermaid
graph TD
    subgraph DeveloperMachine["Local Developer Workstation (Windows / macOS / Linux)"]
        subgraph TerminalEnvironment["Terminal Environment"]
            CLIProcess["uiforge CLI Process<br>(Node.js 22 LTS)"]
        end
        
        subgraph BackgroundDaemon["Background Daemon (Optional)"]
            MCPProcess["uiforge mcp Daemon<br>(stdio / 127.0.0.1:3001)"]
        end

        subgraph ProjectWorkspace["Target Project Directory"]
            SourceFiles["Source Code<br>(src/**/*.tsx, tailwind.css)"]
            LocalDot["Local State Directory<br>(.uiforge/)"]
            subgraph DotContents[".uiforge/ Storage"]
                WALDir["wal/ (Pre-Image Logs)"]
                SnapDir["snapshots/ (Content-Addressed)"]
                DB["state.db (SQLite)"]
                Audit["audit.jsonl (Hash-Chained)"]
            end
        end

        subgraph WorkerSandboxes["Ephemeral Worker Processes"]
            PWBrowser["Playwright Chromium Worker<br>(Headless Sandboxed Process)"]
        end
    end

    CLIProcess --> SourceFiles
    CLIProcess --> LocalDot
    CLIProcess --> PWBrowser

    MCPProcess --> SourceFiles
    MCPProcess --> LocalDot
    MCPProcess --> PWBrowser
```
