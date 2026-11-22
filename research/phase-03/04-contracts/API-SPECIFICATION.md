# UIFORGE — PHASE 03: API & PROGRAMMATIC INTERFACE SPECIFICATION
## Monorepo Service Interfaces, Execution Modes, MCP Protocol Schemas & Cancellation Semantics

**Document ID:** `UIF-PH03-API-SPECIFICATION`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Lead API Architect  

---

## 1. Executive API Architecture

UIForge provides strongly typed TypeScript interfaces for programmatic monorepo consumption, paired with Model Context Protocol (MCP) tool endpoints for external AI agent integration.

Every operation is classified by its execution profile:
- **`SYNC`**: In-memory synchronous calculation ($< 5\text{ms}$).
- **`ASYNC`**: Promise-based asynchronous execution ($< 2.0\text{s}$).
- **`STREAMING`**: Emits real-time event chunks (SSE or async iterators).
- **`LONG_RUNNING`**: Multi-viewport browser runs or full repository scans ($> 2.0\text{s}$).
- **`APPROVAL_GATED`**: Requires a signed Level 2+ authorization token before executing disk mutations.

---

## 2. Monorepo Core Service Interfaces

```typescript
// ============================================================================
// 1. PROJECT INTELLIGENCE SERVICE INTERFACE (@uiforge/project-intelligence)
// ============================================================================

export interface IProjectIntelligenceService {
  /**
   * Scans a target codebase in read-only mode to discover framework, routes, and styling.
   * Execution Profile: ASYNC (Read-only, Level 0)
   */
  analyzeProject(params: {
    projectRoot: string;
    includePatterns?: string[];
    excludePatterns?: string[];
    maxDepth?: number;
  }): Promise<ProjectAnalysisRecord>;

  /**
   * Parses component AST to extract prop interfaces, exported variants, and imports.
   * Execution Profile: SYNC (In-memory AST)
   */
  parseComponentAST(sourceCode: string, filePath: string): ComponentDefinitionRecord;
}

// ============================================================================
// 2. DESIGN & TOKEN SERVICE INTERFACE (@uiforge/tokens)
// ============================================================================

export interface ITokenService {
  /**
   * Compiles W3C DTCG tokens to target CSS variables and Tailwind v4 themes.
   * Execution Profile: ASYNC (Level 1 local output)
   */
  compileTokens(params: {
    dtcgDictionary: DtcgTokenDictionary;
    targetEngines: ("css-variables" | "tailwind-v4")[];
    outDir: string;
  }): Promise<TokenCompilationResult>;

  /**
   * Mathematically evaluates color contrast ratio between foreground and background.
   * Execution Profile: SYNC ($< 1ms$)
   */
  verifyContrast(foregroundHex: string, backgroundHex: string): {
    ratio: number;
    normalTextPass: boolean; // >= 4.5:1
    largeTextPass: boolean;  // >= 3.0:1
  };
}

// ============================================================================
// 3. COMPONENT REGISTRY SERVICE INTERFACE (@uiforge/component-registry)
// ============================================================================

export interface IComponentRegistryService {
  /**
   * Queries approved component registries (Phase 02.4 pool) matching semantic requirements.
   * Execution Profile: ASYNC (Level 0 query)
   */
  searchComponents(params: {
    query: string;
    category?: string;
    targetFramework?: "react" | "vue" | "svelte";
    minAccessibilityTier?: number;
  }): Promise<ComponentRecommendationRecord[]>;
}

// ============================================================================
// 4. BROWSER EVALUATION SERVICE INTERFACE (@uiforge/browser-eval)
// ============================================================================

export interface IBrowserEvaluationService {
  /**
   * Navigates headless Chromium across viewports, capturing visual diffs and axe-core a11y.
   * Execution Profile: LONG_RUNNING (Level 0, out-of-process)
   */
  evaluateUrl(params: {
    targetUrl: string;
    viewports: ("375px" | "768px" | "1280px" | "1920px")[];
    baselineSnapshotId?: string;
    cancellationToken?: CancellationToken;
  }): Promise<BrowserEvaluationRecord>;
}

// ============================================================================
// 5. SAFE MODIFIER SERVICE INTERFACE (@uiforge/safe-modifier)
// ============================================================================

export interface ISafeModifierService {
  /**
   * Formulates a proposed coordinate slice patch and unified diff without writing to disk.
   * Execution Profile: SYNC (In-memory diff)
   */
  proposeModification(params: {
    targetFilePath: string;
    characterSpan: [number, number];
    replacementText: string;
  }): ProposedModificationRecord;

  /**
   * Executes atomic slice patch write via Write-Ahead Logging (WAL) and TS compiler check.
   * Execution Profile: ASYNC + APPROVAL_GATED (Level 3 mutation)
   */
  applyModification(params: {
    modification: ProposedModificationRecord;
    authorizationToken: ApprovalToken;
  }): Promise<ModificationResultRecord>;
}
```

---

## 3. Model Context Protocol (MCP 2026-07-28) Tool Specifications

UIForge MCP Server exposes five standardized, capability-bounded tools to external AI coding agents:

### Tool 1: `analyze_project`
- **Description:** Scans the active frontend project in read-only mode. Returns detected framework (Next.js, Vite-React), routing hierarchy, styling engine (Tailwind v3/v4), and active design tokens.
- **Input Schema:**
  ```json
  {
    "type": "object",
    "properties": {
      "path": { "type": "string", "description": "Relative project root path; defaults to '.'" },
      "depth": { "type": "integer", "description": "Maximum directory scan depth" }
    }
  }
  ```
- **Execution Mode:** `ASYNC` (Read-only, Level 0, zero approval required).

### Tool 2: `extract_tokens`
- **Description:** Extracts active W3C DTCG-compliant design tokens (colors, typography ramps, spacing scales) from CSS variables, Tailwind configurations, or `.uiforge/tokens/tokens.json`.
- **Input Schema:**
  ```json
  { "type": "object", "properties": {} }
  ```
- **Execution Mode:** `SYNC` (Read-only, Level 0).

### Tool 3: `search_components`
- **Description:** Searches approved component registries (Phase 02.4 source registry) for production-ready, accessible UI components matching a plain-text intent.
- **Input Schema:**
  ```json
  {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Component intent (e.g. 'accessible modal dialog')" },
      "category": { "type": "string", "enum": ["primitives", "forms", "navigation", "layout", "charts"] }
    },
    "required": ["query"]
  }
  ```
- **Execution Mode:** `ASYNC` (Read-only, Level 0).

### Tool 4: `verify_in_browser`
- **Description:** Launches a headless Chromium browser to render the specified local URL, captures screenshots across mobile/tablet/desktop viewports, runs axe-core WCAG 2.2 AA testing, and checks console errors.
- **Input Schema:**
  ```json
  {
    "type": "object",
    "properties": {
      "url": { "type": "string", "description": "Target local URL (e.g. 'http://localhost:3000')" },
      "viewports": {
        "type": "array",
        "items": { "type": "string", "enum": ["375px", "768px", "1280px"] }
      }
    },
    "required": ["url"]
  }
  ```
- **Execution Mode:** `LONG_RUNNING` (Read-only, Level 0, isolated subprocess).

### Tool 5: `propose_modification`
- **Description:** Submits a proposed coordinate slice patch to an existing source file. Halts and returns a signed authorization challenge requiring human approval before any disk write.
- **Input Schema:**
  ```json
  {
    "type": "object",
    "properties": {
      "targetFilePath": { "type": "string", "description": "Relative path to target source file" },
      "startOffset": { "type": "integer", "description": "0-indexed character start position" },
      "endOffset": { "type": "integer", "description": "0-indexed character end position" },
      "replacementCode": { "type": "string", "description": "New code to splice into the span" }
    },
    "required": ["targetFilePath", "startOffset", "endOffset", "replacementCode"]
  }
  ```
- **Execution Mode:** `APPROVAL_GATED` (Level 3 mutation; halts and issues `ApprovalRequiredError`).

---

## 4. Cancellation & Timeout Semantics

1. **Cancellation Tokens:** All asynchronous and long-running operations accept an optional `CancellationToken` conforming to standard VS Code / AbortSignal patterns.
2. **Process Teardown on Cancel:** If a task is cancelled while Playwright is executing:
   - Playwright browser context is closed immediately via `context.close()`.
   - Browser child processes are terminated with `SIGTERM` followed by `SIGKILL` after 2.0s if unresponsive.
   - Any active WAL pre-image is evaluated; if a write was in progress, the pre-image is immediately restored.
3. **Execution Timeouts:**
   - Headless browser navigation timeout: **30 seconds** default.
   - Project AST scan timeout: **15 seconds** default.
   - Authorization prompt TTL: **15 minutes** before token expiration.
