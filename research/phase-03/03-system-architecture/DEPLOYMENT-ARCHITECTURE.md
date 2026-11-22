# UIFORGE — PHASE 03: DEPLOYMENT ARCHITECTURE & ENVIRONMENT TOPOLOGY
## Local-First Workstation Deployment, Headless CI/CD Runners & Agent Ingress Topologies

**Document ID:** `UIF-PH03-DEPLOYMENT-ARCHITECTURE`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Infrastructure Engineer & Application Security Architect  

---

## 1. Executive Deployment Topology

UIForge is designed from the ground up as a **zero-infrastructure, local-first software platform**. It runs directly on the developer's workstation or within ephemeral CI/CD containers without requiring external database servers, container orchestration (Kubernetes), or cloud backend subscriptions.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              FIVE DEPLOYMENT TOPOLOGIES                                │
├────────────┬─────────────────────────────┬───────────────────────────┬─────────────────┤
│ Topology   │ Execution Target            │ Primary Interfaces        │ Network Egress  │
├────────────┼─────────────────────────────┼───────────────────────────┼─────────────────┤
│ Topo 1     │ Local Developer Workstation │ CLI (`uiforge`)           │ 0.0% (Offline)  │
│ Topo 2     │ AI Agent Desktop Substrate  │ MCP Server (stdio / HTTP) │ 0.0% (Localhost)│
│ Topo 3     │ Headless CI/CD Runner       │ CLI CI Gate (`validate`)  │ 0.0% (PR Cache) │
│ Topo 4     │ Local Visual Studio Server  │ Studio Web GUI (localhost)│ 0.0% (Localhost)│
│ Topo 5     │ (Level C) Hosted Cloud Sync │ REST API / Webhooks       │ TLS Egress      │
└────────────┴─────────────────────────────┴───────────────────────────┴─────────────────┘
```

---

## 2. Granular Deployment Topologies

### Topology 1: Local Developer Workstation (Interactive CLI)
- **Target Environment:** macOS (ARM64/x86_64), Linux (Ubuntu, Debian, Fedora), Windows 11 (PowerShell/CMD/WSL2).
- **Execution Model:** Developer invokes `uiforge <command>` from within their project repository.
- **Process Lifecycle:** Ephemeral Node.js process starts, executes command, updates local terminal, writes logs to `.uiforge/`, and terminates with standard exit code.
- **Network Boundaries:** Completely air-gapped; zero outbound internet requests.

### Topology 2: AI Agent Desktop Substrate (MCP Background Server)
- **Target Environment:** Developer workstation running external AI coding agents (Claude Code, Cursor, OpenCode, Codex).
- **Execution Model:**
  - **Stdio Mode:** Coding agent spawns `uiforge mcp` as a child subprocess, communicating over standard input/output pipes via JSON-RPC 2.0 messages.
  - **Streamable HTTP Mode:** UIForge runs as a local background daemon (`uiforge mcp --port=3001`), accepting HTTP POST requests at `http://127.0.0.1:3001/mcp`.
- **Process Lifecycle:** Long-running daemon process maintaining connection state and context token budgets.
- **Security Guard:** Binds strictly to loopback interface (`127.0.0.1`); rejects non-localhost connections; gates write operations behind human authorization.

### Topology 3: Headless CI/CD Pipeline (Quality Gate)
- **Target Environment:** GitHub Actions, GitLab CI, CircleCI, Bitbucket Pipelines runners (Ubuntu Linux x86_64 or ARM64).
- **Execution Model:** Executed during pull request workflows via `npx @uiforge/cli validate --fail-on=critical`.
- **Process Lifecycle:**
  1. Installs minimal dependencies (or utilizes cached Playwright browser binaries).
  2. Launches local preview server (e.g. `npm run preview` on port 3000).
  3. Executes headless accessibility and visual regression battery in parallel.
  4. Exports standard SARIF (`audit.sarif`) and JUnit XML (`results.xml`) reports for native GitHub PR annotations.
  5. Exits with code 0 (pass) or code 1 (fail).
- **Resource Constraints:** Operates cleanly within standard 2-vCPU, 4 GB RAM container limits.

### Topology 4: Optional Local Studio Server (Visual Workspace - Level B)
- **Target Environment:** Developer workstation launched on demand via `uiforge studio`.
- **Execution Model:** Spins up a lightweight local HTTP/WebSocket server on `http://127.0.0.1:4200` serving the precompiled Studio SPA.
- **Security Boundaries:** Enforces CORS restrictions; rejects external IP connections; CSRF token validation on all mutating API endpoints.

### Topology 5: Future Enterprise Hosted Cloud Sync (Level C Scope)
- **Target Environment:** Optional central cloud service for enterprise multi-repository governance.
- **Execution Model:** Local CLI/CI runners asynchronously push signed `VerificationEvidenceRecord` bundles over TLS to a central dashboard.
- **Security Boundaries:** Zero source code is transmitted; only aggregated test metrics, token schemas, and accessibility compliance scorecards are synced.

---

## 3. System & Runtime Prerequisites

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              RUNTIME PREREQUISITES MATRIX                              │
├─────────────────────┬───────────────────────────┬──────────────────────────────────────┤
│ Component           │ Minimum Supported Version │ Recommended Production Version       │
├─────────────────────┼───────────────────────────┼──────────────────────────────────────┤
│ Node.js Runtime     │ Node.js 22.0.0 LTS        │ Node.js 22.12.0 LTS (Active)         │
│ Package Manager     │ pnpm 9.x / npm 10.x       │ pnpm 9.15+                           │
│ Operating System    │ Windows 10/11, macOS 13+, │ Windows 11 / macOS 14 / Ubuntu 24.04 │
│ Browser Engine      │ Playwright Chromium v1.50 │ Playwright v1.50.1 headless          │
│ Python (Font tools) │ Python 3.10+ (pyftsubset) │ Python 3.12 (optional for subsetting)│
│ RAM Allocation      │ 4 GB System Memory        │ 8 GB+ System Memory                  │
└─────────────────────┴───────────────────────────┴──────────────────────────────────────┘
```
