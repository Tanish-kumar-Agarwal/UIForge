# UIForge Phase 02.4: Architecture Integration Map

**Document ID:** UIF-PH02.4-ARCHITECTURE-INTEGRATION-MAP  
**Classification:** System Architecture, Internal API Contracts, Subsystem Integration  
**Status:** Canonical / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/ARCHITECTURE-INTEGRATION-MAP.md`  

---

## 1. Executive Summary & Purpose

The **UIForge Internal Source Registry** serves as the authoritative source intelligence and supply-chain governance layer for the entire UIForge platform. It acts as the gatekeeper through which UIForge’s design system generator, template emitter, CLI tooling, and accessibility test harnesses query external package capabilities, licensing permissions, and architectural constraints.

This document defines:
1. **Subsystem Ownership & Boundaries** (what the registry does and does NOT do).
2. **Conceptual TypeScript Integration Interfaces** for platform components.
3. **Downstream Integration Patterns** for Phase 02.5 (Selection & Scoring) through Phase 03 (Engine Architecture).

---

## 2. Platform Subsystem Ownership & Boundaries

```
┌────────────────────────────────────────────────────────┐
│                   UIFORGE PLATFORM                     │
│                                                        │
│  ┌────────────────────────┐  ┌──────────────────────┐  │
│  │   UIForge Generator    │  │ UIForge CLI & Agent  │  │
│  │   (Template Emitter)   │  │ (Scaffolding Engine) │  │
│  └───────────┬────────────┘  └───────────┬──────────┘  │
│              │ Queries Permissions       │             │
│              ▼                           ▼             │
│  ┌──────────────────────────────────────────────────┐  │
│  │     INTERNAL SOURCE REGISTRY (Governance Layer)  │  │
│  │  - Source Intelligence      - Provenance & SHA   │  │
│  │  - 6-Mode Permissions       - Legal Dispositions │  │
│  │  - Technical Evaluations    - Freshness & Audits │  │
│  └──────────────────────────────────────────────────┘  │
│              │ Validates Integrity                     │
│              ▼                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Supply-Chain Defense & Automated Validators    │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### 2.1 What the Registry DOES
- Acts as the single source of truth for all external library metadata, repository origins, evaluated commits, and cryptographic digests.
- Enforces consumption-mode permissions (blocking unsafe copying, illegal bundling, or unvetted dependencies).
- Exposes queryable interfaces for package resolution, component discovery, and license compliance verification.
- Enforces freshness policies, staleness tracking, and security revocations.

### 2.2 What the Registry DOES NOT Do
- **Does NOT download or install packages:** Package installation is performed strictly by user-facing build tools (`pnpm`, `npm`) under user project control.
- **Does NOT act as a public package manager:** The registry is an internal governance catalog, not an npm mirror or proxy.
- **Does NOT provide legal indemnity:** Legal dispositions are technical risk assessments; they inform decisions but do not replace certified legal counsel.
- **Does NOT mutate user code directly:** Code emission is executed by the UIForge Generator engine, which queries the registry for allowed snippets and notices.

---

## 3. Conceptual TypeScript Interfaces and Contracts

The following TypeScript contracts define the formal programmatic interfaces through which UIForge platform subsystems interact with the registry:

```typescript
/**
 * UIForge Internal Source Registry — Conceptual Platform Contracts
 * Package: @uiforge/registry-contracts
 */

export type ConsumptionMode =
  | 'REFERENCE_ONLY'
  | 'DEPENDENCY'
  | 'SOURCE_COPY'
  | 'ASSET_REDISTRIBUTION'
  | 'EXTERNAL_TOOL'
  | 'TEMPLATE_ADAPTATION';

export type EligibilityStatus =
  | 'APPROVED'
  | 'ELIGIBLE_WITH_RESTRICTIONS'
  | 'REFERENCE_ONLY'
  | 'PENDING_REVIEW'
  | 'BLOCKED'
  | 'NOT_APPLICABLE';

export type LicenseDisposition =
  | 'PERMISSIVE'
  | 'PERMISSIVE_WITH_NOTICE'
  | 'CONDITIONAL'
  | 'COPYLEFT_RESTRICTED'
  | 'PROPRIETARY_CLOSED'
  | 'BLOCKED';

export interface SourceRecord {
  sourceId: string;
  name: string;
  category: string;
  discoveryPriority: 'P0' | 'P1' | 'P2' | 'P3';
  technicalEvaluationStatus: 'EVALUATED' | 'PARTIALLY_EVALUATED' | 'NOT_EVALUATED';
  licenseDisposition: LicenseDisposition;
  registryEligibility: EligibilityStatus;
  upstreamRepositoryUrl: string;
}

export interface PermissionCheckRequest {
  sourceId: string;
  mode: ConsumptionMode;
  targetPackage?: string;
  targetComponent?: string;
}

export interface PermissionCheckResult {
  allowed: boolean;
  mode: ConsumptionMode;
  sourceId: string;
  conditions: string[];
  requiredNotices: string[];
  requiredAttribution: string | null;
  requiresSourceAvailability: boolean;
  requiresLegalCounselReview: boolean;
}

/**
 * Core Registry Query Service
 */
export interface ISourceRegistry {
  getSourceById(sourceId: string): Promise<SourceRecord | null>;
  listSources(filter?: {
    category?: string;
    priority?: string;
    eligibility?: EligibilityStatus;
  }): Promise<SourceRecord[]>;
  checkPermission(request: PermissionCheckRequest): Promise<PermissionCheckResult>;
}

/**
 * Resolves packages and transitive metadata
 */
export interface IPackageResolver {
  resolvePackage(packageName: string): Promise<{
    packageId: string;
    sourceId: string;
    version: string;
    tarballSha256: string;
    dependencies: Record<string, string>;
  } | null>;
  isPackageAllowedAsDependency(packageName: string): Promise<boolean>;
}

/**
 * Resolves reusable component primitives and emission templates
 */
export interface IComponentResolver {
  resolveComponent(componentId: string): Promise<{
    componentId: string;
    sourceId: string;
    name: string;
    sourcePath: string;
    allowedForSourceCopy: boolean;
    requiredHeaderNotice: string;
  } | null>;
}

/**
 * Validates licensing and attribution obligations
 */
export interface ILicenseEvaluator {
  evaluateCompliance(
    sourceId: string,
    mode: ConsumptionMode
  ): Promise<{
    compliant: boolean;
    licenseType: string;
    obligations: string[];
    noticeBlock: string;
  }>;
}

/**
 * Validates cryptographic provenance and integrity
 */
export interface IProvenanceStore {
  verifyDigest(sourceId: string, computedSha256: string): Promise<boolean>;
  getPinnedCommit(sourceId: string): Promise<string | null>;
}

/**
 * Validates registry data integrity and schema conformance
 */
export interface IRegistryValidator {
  validateIntegrity(): Promise<{
    valid: boolean;
    totalTests: number;
    passed: number;
    failed: number;
    errors: string[];
  }>;
}
```

---

## 4. Downstream Phase Integration

### 4.1 Phase 02.5 Integration (Source Selection & Scoring)
- The Phase 02.5 Selection Engine consumes `sources.json`, `evaluations.json`, and `consumption-permissions.json`.
- The engine computes composite scores ($0.0 - 10.0$) using the 7 weighted evaluation dimensions:
  1. Code Quality (20%)
  2. Framework Compatibility (15%)
  3. Accessibility Compliance (15%)
  4. Responsiveness & Layout (15%)
  5. Maintainability & Activity (15%)
  6. Customization & Theming (10%)
  7. Documentation & Developer Experience (10%)
- Sources marked `registryEligibility: BLOCKED` are automatically disqualified from final selection, regardless of technical score.

### 4.2 Phase 03 Integration (Core Engine Architecture)
- The UIForge Core Generator invokes `ISourceRegistry.checkPermission()` before emitting any code or dependency.
- If a template attempts to emit a dependency whose permission is `allowed: false`, code generation aborts with a compile-time governance error.
- All emitted components have verbatim copyright notices injected automatically via `ILicenseEvaluator.evaluateCompliance()`.
