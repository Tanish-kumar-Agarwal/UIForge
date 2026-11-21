# UIForge Phase 02.2 — Shared Interface Contracts Specification

**Document Identifier:** `UIF-PH02.2-SHARED-CONTRACTS`  
**Classification:** Canonical Cross-Workstream Data & Interface Contract Catalog  
**Parent Phase:** Phase 02.2 — Deep Technical Audit, Architecture Decisions & Cross-Workstream Consolidation  
**Target Standard:** Principal Software Architect + Principal Frontend Infrastructure Engineer + AI Systems Architect + Application Security Architect  
**Status:** COMPLETE & CONSOLIDATED  
**Date:** November 21, 2026  

---

## 1. Contract Architecture Principles & Versioning Standard

To ensure seamless interoperability between UIForge subsystems without tight coupling, all inter-module communication is governed by **Strict Shared Interface Contracts**.

### 1.1 Inviolable Contract Principles
1. **Schema-First Validation:** Every contract is defined as a strongly typed TypeScript interface and paired with an authoritative runtime validator (Zod schema). Data crossing subsystem boundaries must be validated upon entry.
2. **Deterministic Immutability:** Inter-subsystem messages and state snapshots are deeply frozen (`Readonly<T>`). Subsystems must never mutate input objects received from another subsystem.
3. **Semantic Versioning & URI Identifiers:** Every contract bears a globally unique URI identifier structured as `uiforge.contract.<name>.v<major>`. Breaking schema changes increment the major version and require formal migration adapters. Minor extensions (adding optional fields) are non-breaking.
4. **Digest Verification & Hash Linkage:** Contracts referencing project files, diffs, or artifacts must include SHA-256 digests (`fileDigest`, `diffDigest`, `recordDigest`). Subsystems verify hashes to guard against Time-of-Check to Time-of-Use (TOCTOU) desynchronization.
5. **Universal Error Envelope:** Subsystems report domain and operational failures using a standardized error structure with structured error codes, retryability flags, and diagnostic contexts.

---

## 2. Canonical Cross-Workstream Contract Catalog

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CANONICAL DATA CONTRACT CATALOG                                 │
├──────┬─────────────────────────────────────────────────┬─────────────┬─────────────────┤
│ Ref  │ Contract Identifier                             │ Owning Sub  │ Primary Purpose │
├──────┼─────────────────────────────────────────────────┼─────────────┼─────────────────┤
│ A    │ `uiforge.contract.project-intelligence.v1`      │ WS-1        │ Project State   │
│ B    │ `uiforge.contract.component-intelligence.v1`    │ WS-2        │ Components/RSC  │
│ C    │ `uiforge.contract.registry-resource.v1`         │ WS-3        │ Ingested Assets │
│ D    │ `uiforge.contract.design-token.v1`              │ WS-3        │ DTCG Tokens     │
│ E    │ `uiforge.contract.styling-transformation.v1`    │ WS-3        │ Style Adapters  │
│ F    │ `uiforge.contract.change-approval.v1`           │ WS-1 / WS-5 │ Diff & Approval │
│ G    │ `uiforge.contract.browser-verification.v1`      │ WS-4        │ Playwright/A11y │
│ H    │ `uiforge.contract.evidence-provenance.v1`       │ Cross-Cut   │ Tamper-Evident  │
│ I    │ `uiforge.contract.agent-tool.v1`                │ WS-5        │ MCP / Tool API  │
│ J    │ `uiforge.contract.session-context.v1`           │ WS-5        │ Context Budget  │
└──────┴─────────────────────────────────────────────────┴─────────────┴─────────────────┘
```

---

### Contract A: Project Intelligence Contract

- **Contract Name:** Project Intelligence & AST State Contract
- **Contract Identifier:** `uiforge.contract.project-intelligence.v1`
- **Owning Subsystem:** WS-1 (Project Intelligence & AST Transformation)
- **Consuming Subsystems:** WS-2 (Components), WS-3 (Tokens), WS-4 (Browser Verification), WS-5 (Agent Ingress), Orchestration
- **Purpose:** Provide an authoritative, immutable semantic representation of the target repository's structure, routes, components, dependencies, and configuration.

#### Schema Definition (TypeScript)
```typescript
export interface ProjectIntelligenceContractV1 {
  readonly contractId: 'uiforge.contract.project-intelligence.v1';
  readonly schemaVersion: '1.0.0';
  readonly projectId: string; // Canonical persistent repository UUID (derived from initial repo init)
  readonly snapshotId: string; // Deterministic snapshot identifier (SHA-256 Merkle root)
  readonly analysisRunId: string; // Ephemeral analysis execution ID (UUID v4)
  readonly repositoryRoot: string; // Absolute canonical path
  readonly scannedAt: string; // ISO 8601 UTC
  readonly snapshotHash: string; // SHA-256 Merkle root of tracked source files, package manifests, and configs

  readonly environment: {
    readonly nodeVersion: string;
    readonly packageManager: 'npm' | 'pnpm' | 'yarn' | 'bun';
    readonly packageManagerVersion: string;
    readonly framework: {
      readonly name: 'next' | 'remix' | 'react-router' | 'vite' | 'spa' | 'unknown';
      readonly version: string;
      readonly routingParadigm: 'app-router' | 'pages-router' | 'file-system' | 'spa-declarative';
    };
    readonly typescript: {
      readonly isConfigured: boolean;
      readonly tsconfigPath?: string;
      readonly compilerVersion?: string;
      readonly strictMode: boolean;
    };
  };

  readonly dependencies: {
    readonly production: Record<string, string>; // name -> version
    readonly development: Record<string, string>;
  };

  readonly styling: {
    readonly primaryParadigm: 'tailwind-v3' | 'tailwind-v4' | 'css-modules' | 'sass' | 'vanilla-css' | 'css-in-js';
    readonly secondaryParadigms: string[];
    readonly configFiles: ReadonlyArray<{
      readonly path: string;
      readonly digest: string;
    }>;
  };

  readonly routes: ReadonlyArray<{
    readonly routePath: string; // e.g., '/dashboard/analytics'
    readonly entrypointFile: string; // Relative to repositoryRoot
    readonly routeType: 'page' | 'layout' | 'route-handler' | 'middleware';
    readonly renderedParadigm: 'server-pure' | 'client-boundary' | 'spa-view';
    readonly sourceDigest: string; // SHA-256 of entrypoint
  }>;

  readonly analysisMetadata: {
    readonly durationMs: number;
    readonly totalFilesScanned: number;
    readonly ignoredPathsCount: number;
    readonly parseWarnings: ReadonlyArray<{
      readonly filePath: string;
      readonly line: number;
      readonly message: string;
      readonly severity: 'warning' | 'error';
    }>;
    readonly completeness: 'complete' | 'partial-syntax-errors' | 'partial-size-limit' | 'in-progress';
  };
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `projectId`, `snapshotId`, `analysisRunId`, `repositoryRoot`, `scannedAt`, `snapshotHash`, `environment`, `dependencies`, `styling`, `routes`, `analysisMetadata`.
- **Optional Fields:** `typescript.tsconfigPath`, `typescript.compilerVersion`.
- **Merkle Root Definition & Invalidation Rules:**
  - `snapshotHash` is computed as the SHA-256 Merkle root across lexicographically sorted relative file paths and SHA-256 contents of all tracked application source files (`.ts`, `.tsx`, `.js`, `.jsx`, `.css`), package manifests (`package.json`, lockfiles), and project configuration files (`tsconfig.json`, `next.config.*`, `tailwind.config.*`).
  - **Crucial Invalidation Guarantee:** A Merkle root records the state at scan time; **a Merkle root alone does NOT prevent stale analysis or scanner desynchronization** if disk files are modified concurrently or outside UIForge. Invalidation is triggered when filesystem `mtime` or file SHA-256 digests change. Downstream consumers planning mutations must revalidate current disk file digests against `snapshotHash` before authorizing changes.
- **Error Model:** Emits `PROJECT_SCAN_ERROR`, `SYNTAX_PARSE_ERROR`, or `REPO_ROOT_NOT_FOUND`.
- **Security Requirements:** Excludes `.git`, `node_modules`, `.env*`, and ignored paths from content scanning. Read-only access enforced.
- **Compatibility Guarantees:** Forward-compatible; additional environment details will be added as optional fields.
- **Known Limitations:** Does not type-check the entire project; symbol resolution is localized unless full typecheck fallback is explicitly triggered.

---

### Contract B: Component Intelligence Contract

- **Contract Name:** Component Intelligence & RSC Taxonomy Contract
- **Contract Identifier:** `uiforge.contract.component-intelligence.v1`
- **Owning Subsystem:** WS-2 (Component & Design-System Architecture)
- **Consuming Subsystems:** WS-1 (Transforms), WS-3 (Tokens), WS-5 (Agent Ingress), Orchestration
- **Purpose:** Define an authoritative taxonomy of components discovered in the target repository or available in external catalogs, detailing prop APIs, RSC tier classifications, accessibility characteristics, and reuse eligibility.

#### Schema Definition (TypeScript)
```typescript
export interface ComponentIntelligenceContractV1 {
  readonly contractId: 'uiforge.contract.component-intelligence.v1';
  readonly schemaVersion: '1.0.0';
  readonly catalogId: string; // UUID v4
  readonly projectSnapshotId: string; // References ProjectIntelligenceContractV1.snapshotId
  readonly generatedAt: string; // ISO 8601 UTC

  readonly components: ReadonlyArray<{
    readonly componentId: string; // e.g., 'ui/card' or '@local/components/kpi-card'
    readonly displayName: string;
    readonly sourceOrigin: 'local-codebase' | 'shadcn-registry' | 'package-dependency';
    readonly filePath?: string; // Relative to repo root if local
    readonly fileDigest?: string; // SHA-256

    readonly rscClassification: {
      readonly tier: 'tier-1-server-pure' | 'tier-2-client-entry' | 'tier-3-client-wrapper' | 'tier-4-spa-exclusive';
      readonly hasUseClientDirective: boolean;
      readonly hasUseServerDirective: boolean;
      readonly serverActionsBound: string[];
      readonly clientHooksUsed: string[]; // e.g., ['useState', 'useForm']
    };

    readonly propInterface: {
      readonly interfaceName?: string;
      readonly props: ReadonlyArray<{
        readonly name: string;
        readonly typeSignature: string;
        readonly isRequired: boolean;
        readonly defaultValue?: string;
        readonly description?: string;
      }>;
    };

    readonly accessibilityProfile: {
      readonly expectedAriaRole?: string;
      readonly keyboardNavigationSupported: boolean;
      readonly requiredAriaAttributes: string[];
      readonly axeAutomationTier: 'tier-1-automated' | 'tier-2-trace-assisted' | 'tier-3-human-audit-required';
    };

    readonly stylingCharacteristics: {
      readonly paradigm: 'tailwind' | 'css-modules' | 'vanilla' | 'none';
      readonly classNamesDetected: string[];
      readonly consumedDesignTokens: string[]; // e.g., ['color.brand.primary', 'space.4']
    };

    readonly selectionEligibility: {
      readonly isEligibleForReuse: boolean;
      readonly rejectionReasons?: string[];
      readonly rankingScore?: number; // 0.0 to 1.0 (from WS-2 weighted engine)
    };
  }>;
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `catalogId`, `projectSnapshotId`, `generatedAt`, `components`.
- **Validation Rules:** Every component must have a valid `rscClassification.tier`. If `sourceOrigin === 'local-codebase'`, `filePath` and `fileDigest` are strictly required.
- **Error Model:** Emits `COMPONENT_ANALYSIS_FAILED` or `INVALID_RSC_BOUNDARY`.
- **Security Requirements:** Local component paths must not escape repository root.
- **Compatibility Guarantees:** Guarantees stable enum values for RSC tiers and accessibility tiers.
- **Known Limitations:** Dynamic React prop spread (`{...props}`) without TypeScript interfaces is reported with `typeSignature: 'unknown'`.

---

### Contract C: Registry Resource Contract

- **Contract Name:** Component Registry Resource & Provenance Contract
- **Contract Identifier:** `uiforge.contract.registry-resource.v1`
- **Owning Subsystem:** WS-3 (Registry, Tokens & Styling Architecture)
- **Consuming Subsystems:** WS-2 (Component Architecture), WS-1 (Transforms), Core (Provenance Subsystem)
- **Purpose:** Standardize the representation of ingested external component registry resources (e.g., shadcn registry items), validating file integrity, dependency declarations, and licensing provenance before code reaches local files.

#### Schema Definition (TypeScript)
```typescript
export interface RegistryResourceContractV1 {
  readonly contractId: 'uiforge.contract.registry-resource.v1';
  readonly schemaVersion: '1.0.0';
  readonly resourceId: string; // Unique slug, e.g., 'shadcn/button'
  readonly registryUrl: string; // Canonical source registry endpoint
  readonly registryType: 'shadcn-v1' | 'uiforge-verified' | 'custom-private';
  readonly itemType: 
    | 'registry:base' | 'registry:component' | 'registry:font' | 'registry:page'
    | 'registry:file' | 'registry:style' | 'registry:theme' | 'registry:item'
    | 'registry:ui' | 'registry:block' | 'registry:hook' | 'registry:lib';

  readonly metadata: {
    readonly title: string;
    readonly description: string;
    readonly author?: string;
    readonly homepage?: string;
  };

  readonly files: ReadonlyArray<{
    readonly targetPath: string; // Recommended relative path in project
    readonly rawContent: string;
    readonly sha256Digest: string; // SHA-256 of rawContent
    readonly fileRole: 'component' | 'hook' | 'util' | 'style' | 'type-definition';
  }>;

  readonly dependencies: {
    readonly npmPackages: Record<string, string>; // package -> semver
    readonly npmDevPackages: Record<string, string>;
    readonly registryDependencies: string[]; // other registry resourceIds
  };

  readonly tailwindConfig?: {
    readonly cssVariables: Record<string, string>;
    readonly themeExtensions: Record<string, unknown>;
  };

  readonly licenseProvenance: {
    readonly spdxExpression: string; // e.g., 'MIT', 'Apache-2.0'
    readonly licenseFileIncluded: boolean;
    readonly attributionNotice?: string;
    readonly auditClassification: 'permissive' | 'weak-copyleft' | 'strong-copyleft' | 'unlicensed';
  };

  readonly integrityVerification: {
    readonly verifiedAt: string; // ISO 8601 UTC
    readonly payloadDigest: string; // SHA-256 of entire received JSON envelope
    readonly trustStatus: 'trusted-official' | 'community-verified' | 'untrusted-raw';
    readonly securityAuditNotes?: string[];
  };
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `resourceId`, `registryUrl`, `registryType`, `itemType`, `metadata`, `files`, `dependencies`, `licenseProvenance`, `integrityVerification`.
- **Validation Rules:** Every file's `sha256Digest` must match `crypto.createHash('sha256').update(file.rawContent).digest('hex')`. Ingestion fails immediately if any digest does not match.
- **Error Model:** Emits `REGISTRY_SSRF_BLOCKED`, `PAYLOAD_DIGEST_MISMATCH`, or `UNSUPPORTED_LICENSE_RESTRICTION`.
- **Security Requirements:** Ingestion executes through strict SSRF network barriers (no private RFC 1918 IPs); target files must not contain path traversal sequences (`../`).
- **Compatibility Guarantees:** Supports all 12 official shadcn registry item types.
- **Known Limitations:** Ingested files are templates; they must be adapted to target project import aliases before compilation.

---

### Contract D: Design Token Contract

- **Contract Name:** W3C DTCG 2025.10 Design Token Contract
- **Contract Identifier:** `uiforge.contract.design-token.v1`
- **Owning Subsystem:** WS-3 (Registry, Tokens & Styling Architecture)
- **Consuming Subsystems:** WS-1 (Transforms), WS-2 (Components), WS-4 (Browser Verification), Orchestration
- **Purpose:** Represent design tokens in full compliance with the stable **W3C Design Tokens Community Group (DTCG) 2025.10 specification** (published under the W3C Community Group process, not a formal W3C Standards Track Recommendation). Supports exact multi-dimensional resolution (light/dark, contrast, density), group-level inheritance, and color-space-specific component mathematics without lossy downcasting.

#### Schema Definition (TypeScript)
```typescript
export type DTCGTokenType = 
  | 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'duration' | 'cubicBezier'
  | 'number' | 'strokeStyle' | 'border' | 'transition' | 'shadow' | 'gradient' | 'typography';

export interface DTCGColorValue {
  readonly colorSpace: 'srgb' | 'oklch' | 'srgb-linear' | 'display-p3' | string;
  // Components strictly defined by colorSpace:
  // - For 'oklch': [L, C, H] where L in [0, 1] (perceived lightness), C in [0, 0.4+] (chroma), H in [0, 360] (hue angle)
  // - For 'srgb' / 'display-p3': [r, g, b] normalized in [0, 1]
  readonly components: [number, number, number];
  readonly alpha?: number; // Normalized in [0, 1]
  readonly hex?: string; // Optional resolved preview string
}

export interface DesignTokenContractV1 {
  readonly contractId: 'uiforge.contract.design-token.v1';
  readonly schemaVersion: '1.0.0';
  readonly tokenSetId: string; // UUID v4
  readonly projectSnapshotId: string;
  readonly sourceFormat: 'dtcg-json' | 'tailwind-config' | 'css-variables' | 'style-dictionary';
  readonly sourceDigest: string; // SHA-256

  readonly tokens: Record<string, {
    readonly tokenPath: string; // e.g., 'color.brand.primary'
    readonly type: DTCGTokenType;
    readonly rawValue: unknown; // Original parsed DTCG value
    readonly normalizedValue: DTCGColorValue | string | number | Record<string, unknown>;
    readonly description?: string;
    readonly deprecated?: boolean | string;
    readonly aliasReferences: string[]; // References to other tokens (e.g. ['{color.blue.600}'])
    readonly resolvedValuesByContext: Record<string, string>; // contextKey -> CSS string (e.g. 'light' -> '#2563eb')
  }>;

  readonly resolutionContexts: ReadonlyArray<{
    readonly contextKey: string; // e.g., 'light:standard:desktop'
    readonly dimensions: {
      readonly colorScheme: 'light' | 'dark';
      readonly contrast: 'standard' | 'high' | 'low';
      readonly platform: 'web' | 'mobile';
      readonly density: 'comfortable' | 'compact';
    };
  }>;

  readonly conversionDiagnostics: {
    readonly totalTokens: number;
    readonly cyclicReferencesFound: string[];
    readonly unsupportedPropertiesIgnored: ReadonlyArray<{
      readonly tokenPath: string;
      readonly propertyName: string;
      readonly reason: string;
    }>;
  };
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `tokenSetId`, `projectSnapshotId`, `sourceFormat`, `sourceDigest`, `tokens`, `resolutionContexts`, `conversionDiagnostics`.
- **Validation Rules:** Color tokens must specify `colorSpace` and a 3-element `components` array matching that color space's dimension definitions (e.g., `[L, C, H]` for OKLCH, `[r, g, b]` for sRGB). Circular references detected during alias traversal must cause `cyclicReferencesFound` to be populated and abort resolution.
- **Specification Status:** Stable W3C Community Group Specification (October 2025). Adopts Color Module canonical `components` syntax (not legacy `"channels"`).
- **Error Model:** Emits `CYCLIC_TOKEN_REFERENCE`, `INVALID_DTCG_SYNTAX`, or `UNRESOLVED_TOKEN_ALIAS`.
- **Security Requirements:** Disallows `$value` expressions attempting JavaScript code evaluation or prototype manipulation.
- **Compatibility Guarantees:** Guarantees lossless round-tripping of all 13 official DTCG 2025.10 token types.
- **Known Limitations:** CSS custom properties containing complex calc() expressions without unit normalization are preserved as raw string dimensions.

---

### Contract E: Styling Transformation Contract

- **Contract Name:** Cross-Paradigm Styling Transformation Contract
- **Contract Identifier:** `uiforge.contract.styling-transformation.v1`
- **Owning Subsystem:** WS-3 (Registry, Tokens & Styling Architecture)
- **Consuming Subsystems:** WS-1 (Transforms), WS-4 (Browser Verification), Orchestration
- **Purpose:** Document proposed styling conversions across disparate paradigms (e.g., Tailwind v3/v4 to CSS Modules), rigorously distinguishing value preservation (visual match) from semantic preservation (token graph survival) and detailing conversion losses.

#### Schema Definition (TypeScript)
```typescript
export interface StylingTransformationContractV1 {
  readonly contractId: 'uiforge.contract.styling-transformation.v1';
  readonly schemaVersion: '1.0.0';
  readonly transformationId: string; // UUID v4
  readonly sourceParadigm: 'tailwind-v3' | 'tailwind-v4' | 'css-modules' | 'sass' | 'vanilla-css';
  readonly targetParadigm: 'tailwind-v3' | 'tailwind-v4' | 'css-modules' | 'sass' | 'vanilla-css';

  readonly sourceFile: {
    readonly path: string;
    readonly preImageDigest: string; // SHA-256
  };

  readonly proposedTransformations: ReadonlyArray<{
    readonly targetFilePath: string;
    readonly transformationType: 'new-file' | 'surgical-edit' | 'token-export';
    readonly generatedContent: string;
    readonly postImageDigest: string; // SHA-256
  }>;

  readonly preservationAudit: {
    readonly valuePreservationScore: number; // 0.0 to 1.0 (visual fidelity guarantee)
    readonly semanticPreservationScore: number; // 0.0 to 1.0 (alias & graph retention)
    readonly exactMatch: boolean;
    readonly conversionLosses: ReadonlyArray<{
      readonly sourceConstruct: string; // e.g., '@apply animate-pulse'
      readonly targetFallback: string; // e.g., 'animation: pulse 2s infinite;'
      readonly lossCategory: 'dynamic-variant-lost' | 'cascade-layer-unsupported' | 'token-alias-inlined';
      readonly severity: 'info' | 'warning' | 'critical-loss';
      readonly humanReviewRequired: boolean;
    }>;
  };

  readonly requiresApproval: boolean;
  readonly approvalReason?: string;
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `transformationId`, `sourceParadigm`, `targetParadigm`, `sourceFile`, `proposedTransformations`, `preservationAudit`, `requiresApproval`.
- **Validation Rules:** If `preservationAudit.exactMatch === false` and any loss has `severity === 'critical-loss'`, `requiresApproval` must be `true`.
- **Error Model:** Emits `UNSUPPORTED_PARADIGM_TRANSFORMATION` or `STYLE_PARSER_ERROR`.
- **Security Requirements:** Prohibits injection of malicious `@import` or `url()` directives during CSS rewriting.
- **Compatibility Guarantees:** Implements the 14-vector conversion rules audited in WS-3.
- **Known Limitations:** Tailwind dynamic arbitrary values (e.g., `w-[calc(100%-20px)]`) converted to CSS Modules require inline CSS custom property extraction.

---

### Contract F: Change Proposal and Approval Contract

- **Contract Name:** Change Proposal, Transaction Journal & Approval Contract
- **Contract Identifier:** `uiforge.contract.change-approval.v1`
- **Owning Subsystem:** WS-1 (Transforms) & WS-5 (Security & Approval Gate)
- **Consuming Subsystems:** Core (Execution Engine), CLI, Studio, Agent Ingress
- **Purpose:** Serve as the inviolable authorization boundary for any codebase mutation. Enforces single-use, time-bounded, diff-bound human approval cryptographically linked to exact pre-image file digests and project snapshot identifiers.

#### Schema Definition (TypeScript)
```typescript
export interface ChangeProposalAndApprovalContractV1 {
  readonly contractId: 'uiforge.contract.change-approval.v1';
  readonly schemaVersion: '1.0.0';
  readonly proposalId: string; // UUID v4
  readonly transactionId: string; // Local SQLite journal transaction ID
  readonly projectId: string; // Canonical persistent repository UUID
  readonly projectSnapshotId: string; // Must match current ProjectIntelligenceContractV1.snapshotId
  readonly taskId: string; // Distinct task/run identifier
  readonly targetRepoRoot: string;
  readonly createdAt: string; // ISO 8601 UTC

  readonly requestedBy: {
    readonly agentName: string; // e.g., 'Claude-Code-v1' or 'Developer-CLI'
    readonly sessionContextId: string; // References SessionContextContractV1.sessionId
    readonly userStatedIntent: string;
  };

  readonly permissionLevel: 0 | 1 | 2 | 3 | 4; // 5-level security ladder (Level 2+ requires approval)

  readonly plannedChanges: ReadonlyArray<{
    readonly filePath: string; // Canonical relative path
    readonly action: 'create' | 'modify' | 'delete' | 'rename';
    readonly preImageSha256: string | null; // null if create; otherwise exact current disk hash
    readonly postImageSha256: string | null; // null if delete; hash of proposed file
    readonly unifiedDiff: string; // Standard unified diff format
    readonly diffDigest: string; // SHA-256 of unifiedDiff string
  }>;

  readonly compositeDiffDigest: string; // SHA-256 of all plannedChanges diffDigests concatenated

  readonly approvalRecord?: {
    readonly approvalTokenId: string; // Cryptographic single-use token UUID
    readonly approvedBy: 'human-user' | 'policy-bypass-preauthorized';
    readonly approvedAt: string; // ISO 8601 UTC
    readonly expiresAt: string; // Maximum TTL: 15 minutes from approvedAt
    readonly boundProjectId: string; // Must match projectId
    readonly boundSnapshotId: string; // Must match projectSnapshotId
    readonly boundTaskId: string; // Must match taskId
    readonly boundCompositeDiffDigest: string; // Must match compositeDiffDigest
    readonly boundTargetPaths: string[]; // Explicit list of authorized paths
    readonly isConsumed: boolean; // Marked true atomically on execution entry
    readonly isRevoked: boolean; // Marked true if user or policy cancels token
  };

  readonly executionState: {
    readonly status: 'pending-approval' | 'approved' | 'executing' | 'committed' | 'rolled-back' | 'rejected';
    readonly journalDbPath: string; // Path to .uiforge/journal.db
    readonly executedAt?: string;
    readonly failureReason?: string;
  };
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `proposalId`, `transactionId`, `projectId`, `projectSnapshotId`, `taskId`, `targetRepoRoot`, `createdAt`, `requestedBy`, `permissionLevel`, `plannedChanges`, `compositeDiffDigest`, `executionState`.
- **Validation Rules:** Execution is strictly rejected if `permissionLevel >= 2` and `approvalRecord` is missing, expired, consumed, revoked, or if any bound property (`boundProjectId`, `boundSnapshotId`, `boundCompositeDiffDigest`, `boundTargetPaths`) fails exact match.
- **Error Model:** Emits `APPROVAL_REQUIRED`, `APPROVAL_EXPIRED`, `DIFF_DIGEST_MISMATCH`, or `TOCTOU_DISK_MODIFICATION_DETECTED`.
- **Security & Filesystem Guarantees:**
  - Pre-image SHA-256 verification acts as a necessary **precondition check** immediately before disk writing.
  - A hash check alone does NOT eliminate filesystem race conditions; execution requires a multi-layer defense: path canonicalization (`fs.realpathSync`), staging in a private temporary directory (`.uiforge/staging/`), atomic rename/swap operations where supported by the host OS/filesystem, and persistent write-ahead journal pre-image backups (`.uiforge/journal.db`) to allow deterministic recovery if execution terminates mid-write.
- **Compatibility Guarantees:** Compatible with standard Git unified diff format.
- **Known Limitations:** Rollback restores tracked repository files recorded in pre-image logs; external package manager caches (`node_modules`) are unmanaged and require lockfile inspection.

---

### Contract G: Browser Verification Contract

- **Contract Name:** Headless Browser Verification & Quality Contract
- **Contract Identifier:** `uiforge.contract.browser-verification.v1`
- **Owning Subsystem:** WS-4 (Browser Verification, Visual Quality & Automated Testing)
- **Consuming Subsystems:** WS-1 (Transforms), WS-2 (Components), WS-5 (Agent Ingress), Orchestration
- **Purpose:** Capture comprehensive rendering evidence from headless Playwright sessions, including multi-viewport screenshots, ARIA accessibility tree snapshots, Pixelmatch visual regression, and layout geometry overflow detection.

#### Schema Definition (TypeScript)
```typescript
export interface BrowserVerificationContractV1 {
  readonly contractId: 'uiforge.contract.browser-verification.v1';
  readonly schemaVersion: '1.0.0';
  readonly verificationRunId: string; // UUID v4
  readonly changeProposalId?: string; // References ChangeProposalAndApprovalContractV1.proposalId
  readonly targetUrl: string; // e.g., 'http://127.0.0.1:3000/dashboard'
  readonly executionTimestamp: string; // ISO 8601 UTC

  readonly environment: {
    readonly browserEngine: 'chromium' | 'firefox' | 'webkit';
    readonly browserVersion: string;
    readonly viewport: {
      readonly width: number;
      readonly height: number;
      readonly deviceScaleFactor: number;
    };
    readonly operatingSystem: string;
  };

  readonly functionalStatus: {
    readonly pageLoaded: boolean;
    readonly httpStatusCode: number;
    readonly navigationDurationMs: number;
    readonly consoleErrors: ReadonlyArray<{
      readonly level: 'error' | 'warning';
      readonly text: string;
    }>;
    readonly uncaughtExceptions: string[];
  };

  readonly visualQuality: {
    readonly screenshotDigest: string; // SHA-256 of full-page PNG
    readonly baselineScreenshotDigest?: string;
    readonly perceptualDiffPixels: number; // Count of mismatched pixels from Pixelmatch v8
    readonly perceptualDiffPercentage: number; // 0.0 to 100.0%
    readonly colorSpaceEvaluated: 'oklab' | 'hyab';
    readonly thresholdApplied: number; // Per-pixel threshold (0.05 to 0.2)
    readonly isVisualRegressionDetected: boolean;
  };

  readonly accessibilityAssessment: {
    readonly ariaSnapshotDigest: string; // SHA-256 of page.ariaSnapshot() YAML string
    readonly automatedChecksRun: number; // Typically 12 Level A/AA criteria
    readonly violationsDetected: ReadonlyArray<{
      readonly ruleId: string; // e.g., 'color-contrast', 'button-name'
      readonly wcagCriterion: string; // e.g., '1.4.3', '4.1.2'
      readonly impact: 'minor' | 'moderate' | 'serious' | 'critical';
      readonly targetSelector: string;
      readonly failureSummary: string;
      readonly candidateAstFile?: string; // Localized TSX file path
      readonly candidateAstLine?: number;
    }>;
    readonly wcagOverallStatus: 'automated-checks-pass' | 'violations-found' | 'requires-human-audit';
  };

  readonly layoutGeometry: {
    readonly documentHorizontalOverflow: boolean; // HTML.scrollWidth > innerWidth
    readonly scrollWidth: number;
    readonly innerWidth: number;
    readonly occludedInteractiveElements: ReadonlyArray<{
      readonly selector: string;
      readonly occludedBySelector: string;
    }>;
    readonly touchTargetFindings: ReadonlyArray<{
      readonly selector: string;
      readonly boundingBox: { width: number; height: number };
      readonly violatesSC258: boolean; // Violates WCAG 2.2 SC 2.5.8 (24x24px)
      readonly spacingExceptionApplies: boolean;
    }>;
  };

  readonly recordDigest: string; // SHA-256 hash of this entire record (excluding recordDigest)
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `verificationRunId`, `targetUrl`, `executionTimestamp`, `environment`, `functionalStatus`, `visualQuality`, `accessibilityAssessment`, `layoutGeometry`, `recordDigest`.
- **Validation Rules:** `recordDigest` must match the SHA-256 digest of the canonical JSON string of all other fields in the contract.
- **Verification Scope & Accessibility Realism:**
  - The classification of accessibility criteria (12 automated / 23 browser-assisted / 20 human audit) represents **UIForge's internal verification methodology**, not an official W3C demarcation.
  - Passing automated checks (`automated-checks-pass`) evaluates only candidate DOM attributes and programmatic contrast; it **must NEVER be represented as complete WCAG 2.2 AA conformance**. Full conformance requires human evaluation of meaningful sequences, assistive technology interactions, and cognitive criteria.
- **Error Model:** Emits `DEV_SERVER_UNREACHABLE`, `BROWSER_CRASH`, or `TEST_TIMEOUT`.
- **Security Requirements:** Target URL must reside on localhost/127.0.0.1 or an authorized local dev server port. Prohibits SSRF to external or private corporate IPs.
- **Compatibility Guarantees:** Uses Playwright `page.ariaSnapshot()` for stable accessibility regression assertions.
- **Known Limitations:** In headless Linux CI, subtle sub-pixel font rendering differences across Chromium builds may report small perceptual diffs; threshold must be calibrated per project.

---

### Contract H: Unified Evidence and Provenance Contract

- **Contract Name:** Universal Evidence Envelope & Provenance Contract
- **Contract Identifier:** `uiforge.contract.evidence-provenance.v1`
- **Owning Subsystem:** `@uiforge/core` (Evidence & Provenance Subsystem)
- **Consuming Subsystems:** All Subsystems, CLI, CI/CD, Audit Inspectors
- **Purpose:** Provide a universal, tamper-evident envelope for any empirical observation, benchmark, test result, or license compliance finding generated across UIForge subsystems (WS-1 through WS-5).

#### Schema Definition (TypeScript)
```typescript
export type EvidenceClassification =
  | 'DOC/SOURCE-VERIFIED'
  | 'LOCAL-HARNESS-TESTED'
  | 'LIVE-INTEGRATION-TESTED'
  | 'REPORTED-SIMULATION'
  | 'STATIC-ANALYSIS'
  | 'HUMAN-REVIEWED'
  | 'NOT-EXECUTED'
  | 'NOT-ESTABLISHED';

export interface EvidenceAndProvenanceContractV1 {
  readonly contractId: 'uiforge.contract.evidence-provenance.v1';
  readonly schemaVersion: '1.0.0';
  readonly evidenceId: string; // UUID v4
  readonly parentWorkstream: 'WS-1' | 'WS-2' | 'WS-3' | 'WS-4' | 'WS-5' | 'CORE';
  readonly requirementId: string; // e.g., 'REQ-A11Y-01', 'REQ-RSC-TIER'
  readonly experimentId?: string; // e.g., 'E1', 'E5', 'E8'

  readonly producer: {
    readonly toolName: string; // e.g., 'oxc-parser', 'pixelmatch', 'axe-core'
    readonly exactVersion: string; // Pinned semver
    readonly executionEnvironment: {
      readonly os: string;
      readonly nodeVersion: string;
      readonly cpuArchitecture: string;
    };
  };

  readonly provenance: {
    readonly sourceArtifactUri: string;
    readonly inputDigest: string; // SHA-256 of inputs
    readonly outputDigest: string; // SHA-256 of generated outputs
    readonly spdxLicenseExpression?: string;
    readonly attributionRequired: boolean;
  };

  readonly evaluation: {
    readonly classification: EvidenceClassification;
    readonly verdict: 'PASS' | 'PARTIAL' | 'NOT_ESTABLISHED' | 'NOT_APPLICABLE';
    readonly confidence: 'HIGH' | 'MEDIUM' | 'LOW';
    readonly expectedBehavior: string;
    readonly actualBehavior: string;
    readonly knownLimitations: string[];
    readonly reproductionCommand?: string;
  };

  readonly recordedAt: string; // ISO 8601 UTC
  readonly recordDigest: string; // SHA-256 digest of record fields
  readonly previousRecordDigest?: string; // Chained SHA-256 for audit sequencing
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `evidenceId`, `parentWorkstream`, `requirementId`, `producer`, `provenance`, `evaluation`, `recordedAt`, `recordDigest`.
- **Validation Rules:** Never assign `LIVE-INTEGRATION-TESTED` unless executed against live runtime dependencies. Never assign `PASS` without supporting output digests.
- **Error Model:** Emits `EVIDENCE_INTEGRITY_VIOLATION` or `INVALID_EVIDENCE_CLASSIFICATION`.
- **Security Requirements:** Chained digests detect log tampering or deletion.
- **Compatibility Guarantees:** Forward-compatible schema for all Phase 02 and Phase 03 benchmarks.
- **Known Limitations:** A SHA-256 digest detects unauthorized mutation but does not constitute a legal digital signature without public-key infrastructure.

---

### Contract I: Agent Tool Contract

- **Contract Name:** Model Context Protocol & Agent Tool Contract
- **Contract Identifier:** `uiforge.contract.agent-tool.v1`
- **Owning Subsystem:** WS-5 (AI Agent Architecture, MCP & Tooling)
- **Consuming Subsystems:** External Coding Agents (Claude, Cursor, Codex, Antigravity)
- **Purpose:** Standardize tool definitions, arguments, permissions, side effects, and outputs exposed via MCP or programmatic SDK, enforcing identical semantics across all interfaces.

#### Schema Definition (TypeScript)
```typescript
export interface AgentToolContractV1 {
  readonly contractId: 'uiforge.contract.agent-tool.v1';
  readonly schemaVersion: '1.0.0';
  readonly toolName: string; // e.g., 'uiforge_plan_transformation'
  readonly toolFamily: 
    | 'project-intelligence' | 'component-intelligence' | 'design-tokens'
    | 'styling-transform' | 'code-transformation' | 'browser-verification' | 'system-audit';

  readonly description: string;
  readonly requiredPermissionLevel: 0 | 1 | 2 | 3 | 4;
  readonly isIdempotent: boolean;
  readonly hasSideEffects: boolean;
  readonly timeoutMs: number;

  readonly inputJsonSchema: Record<string, unknown>; // Standard JSON Schema (Zod-derived)
  readonly outputJsonSchema: Record<string, unknown>;

  readonly executionHandler: (
    input: unknown,
    context: {
      readonly sessionId: string;
      readonly approvalToken?: string;
      readonly signal: AbortSignal;
    }
  ) => Promise<{
    readonly success: boolean;
    readonly data?: unknown;
    readonly error?: {
      readonly code: string;
      readonly message: string;
      readonly retryable: boolean;
    };
    readonly evidenceRecordId?: string;
  }>;
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `toolName`, `toolFamily`, `description`, `requiredPermissionLevel`, `isIdempotent`, `hasSideEffects`, `timeoutMs`, `inputJsonSchema`, `outputJsonSchema`, `executionHandler`.
- **Validation Rules:** Tools with `hasSideEffects === true` must require `requiredPermissionLevel >= 2`.
- **Error Model:** Emits `TOOL_ARGUMENT_VALIDATION_FAILED`, `PERMISSION_DENIED`, or `TOOL_EXECUTION_TIMEOUT`.
- **Security Requirements:** All tool inputs are validated against `inputJsonSchema` before invocation.
- **Compatibility Guarantees:** Conforms directly to MCP `tools/list` and `tools/call` schemas (2026-07-28).
- **Known Limitations:** Long-running browser tests require explicit timeouts and progress notifications.

---

### Contract J: Session and Context Contract

- **Contract Name:** Agent Session, Context Budget & Token Packing Contract
- **Contract Identifier:** `uiforge.contract.session-context.v1`
- **Owning Subsystem:** WS-5 (AI Agent Architecture, MCP & Tooling)
- **Consuming Subsystems:** External Agents, Ingress Adapters, Orchestration
- **Purpose:** Manage active agent sessions, enforce context token limits, track conversation state, and compress project intelligence into minimal-token payloads (achieving >90% reduction).

#### Schema Definition (TypeScript)
```typescript
export interface SessionAndContextContractV1 {
  readonly contractId: 'uiforge.contract.session-context.v1';
  readonly schemaVersion: '1.0.0';
  readonly sessionId: string; // UUID v4
  readonly projectSnapshotId: string;
  readonly agentIdentifier: string; // e.g., 'anthropic/claude-3-7-sonnet'
  readonly startedAt: string; // ISO 8601 UTC
  readonly expiresAt: string; // ISO 8601 UTC

  readonly contextBudget: {
    readonly maxContextTokens: number; // e.g., 8192
    readonly currentContextTokens: number;
    readonly compressionRatioAchieved: number; // e.g., 0.912 (91.2% reduction)
  };

  readonly activeState: {
    readonly currentTaskId?: string;
    readonly activeApprovalTokenId?: string;
    readonly lastExecutedTool?: string;
    readonly historyTurnsCount: number;
    readonly uncommittedChangesPending: boolean;
  };

  readonly packedContextPayload: {
    readonly projectIdentityExcerpt: string;
    readonly routeHierarchyMap: string;
    readonly relevantComponentExcerpts: ReadonlyArray<{
      readonly componentId: string;
      readonly compactAstSummary: string; // Stripped of implementations, props only
    }>;
    readonly recentVerificationFindings?: ReadonlyArray<{
      readonly ruleId: string;
      readonly compactDiagnostic: string;
    }>;
  };
}
```

- **Required Fields:** `contractId`, `schemaVersion`, `sessionId`, `projectSnapshotId`, `agentIdentifier`, `startedAt`, `expiresAt`, `contextBudget`, `activeState`, `packedContextPayload`.
- **Validation Rules:** Context packing must never discard active approval constraints, security boundaries, or critical file paths.
- **Error Model:** Emits `SESSION_EXPIRED`, `CONTEXT_OVERFLOW`, or `INVALID_SESSION_TOKEN`.
- **Security Requirements:** Sessions are strictly bound to a single local project path; cross-project session access is prohibited.
- **Compatibility Guarantees:** Context excerpts use compact Markdown / YAML format compatible with all major LLMs.
- **Known Limitations:** Token counts are calculated using standard heuristics (`~4 characters per token`) when exact model BPE tokenizers are unavailable offline.
