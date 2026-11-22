# UIFORGE — PHASE 03: CANONICAL DATA SCHEMAS & ZOD SPECIFICATIONS
## Authoritative TypeScript Types, Zod Validation Schemas & JSON Data Structures

**Document ID:** `UIF-PH03-DATA-SCHEMAS`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Lead TypeScript Engineer  

---

## 1. Executive Schema Architecture

All data exchanged between UIForge packages, persisted in `.uiforge/`, and transmitted over MCP wires is validated via **Zod schemas**. This document defines the canonical TypeScript types and Zod schema definitions for the foundational entities of the platform.

All schemas reside in `@uiforge/contracts`.

---

## 2. Foundational Zod Schemas & TypeScript Definitions

```typescript
import { z } from "zod";

// ============================================================================
// 1. PROJECT SCHEMA (uiforge.contract.project.v1)
// ============================================================================

export const FrameworkMetadataSchema = z.object({
  name: z.enum(["next", "react-vite", "remix", "sveltekit", "vue-vite", "unknown"]),
  version: z.string(),
  router: z.enum(["app-router", "pages-router", "file-system", "spa-hash", "none"]),
});

export const StylingMetadataSchema = z.object({
  engine: z.enum(["tailwind", "css-modules", "sass", "vanilla-css", "styled-components"]),
  tailwindVersion: z.enum(["v3", "v4", "none"]).optional(),
  cssVariablesDetected: z.boolean(),
});

export const ProjectSchema = z.object({
  $schema: z.literal("https://schemas.uiforge.dev/v1/project.json").default("https://schemas.uiforge.dev/v1/project.json"),
  id: z.string().regex(/^PRJ-[a-f0-9]{8}$/),
  name: z.string().min(1).max(128),
  rootPath: z.string().min(1),
  createdAt: z.string().datetime(),
  framework: FrameworkMetadataSchema,
  styling: StylingMetadataSchema,
  activeSnapshotId: z.string().regex(/^SNAP-[a-f0-9]{8}$/).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

// ============================================================================
// 2. PROJECT SNAPSHOT SCHEMA (uiforge.contract.project-snapshot.v1)
// ============================================================================

export const ProjectSnapshotSchema = z.object({
  $schema: z.literal("https://schemas.uiforge.dev/v1/project-snapshot.json").default("https://schemas.uiforge.dev/v1/project-snapshot.json"),
  snapshotId: z.string().regex(/^SNAP-[a-f0-9]{8}$/),
  projectId: z.string().regex(/^PRJ-[a-f0-9]{8}$/),
  timestamp: z.string().datetime(),
  gitCommit: z.string().regex(/^[a-f0-9]{7,40}$/).optional(),
  tokensDigest: z.string().regex(/^[a-f0-9]{64}$/),
  componentInventoryDigest: z.string().regex(/^[a-f0-9]{64}$/),
  packageLockDigest: z.string().regex(/^[a-f0-9]{64}$/),
  evaluationSummary: z.object({
    overallScore: z.number().min(0).max(100),
    criticalFindingsCount: z.number().int().min(0),
    pixelDeltaRatio: z.number().min(0).max(1),
  }).optional(),
});

export type ProjectSnapshot = z.infer<typeof ProjectSnapshotSchema>;

// ============================================================================
// 3. W3C DTCG DESIGN TOKEN SCHEMA (uiforge.contract.token.v1)
// ============================================================================

export const DtcgTokenTypeSchema = z.enum([
  "color",
  "dimension",
  "fontFamily",
  "fontWeight",
  "duration",
  "cubicBezier",
  "number",
  "shadow",
  "border",
  "transition"
]);

export const DtcgTokenSchema = z.object({
  $type: DtcgTokenTypeSchema,
  $value: z.union([z.string(), z.number(), z.record(z.unknown())]),
  $description: z.string().optional(),
  $extensions: z.record(z.unknown()).optional(),
});

export type DtcgToken = z.infer<typeof DtcgTokenSchema>;

// ============================================================================
// 4. FINDING SCHEMA (uiforge.contract.finding.v1)
// ============================================================================

export const FindingSeveritySchema = z.enum(["CRITICAL", "SERIOUS", "MODERATE", "MINOR"]);
export const FindingCategorySchema = z.enum(["A11Y", "UX", "RESPONSIVE", "COMPILE", "SECURITY"]);

export const FindingSchema = z.object({
  id: z.string().regex(/^FND-[a-f0-9]{8}$/),
  evaluationId: z.string().regex(/^EVAL-[a-f0-9]{8}$/),
  category: FindingCategorySchema,
  severity: FindingSeveritySchema,
  title: z.string().min(1),
  description: z.string().min(1),
  selector: z.string().min(1),
  viewport: z.enum(["375px", "768px", "1280px", "1920px", "all"]),
  wcagCriteria: z.string().optional(), // e.g. "1.4.3"
  filePath: z.string().optional(),
  lineNumber: z.number().int().positive().optional(),
  remediationPatch: z.string().optional(),
  screenshotHash: z.string().regex(/^[a-f0-9]{64}$/).optional(),
});

export type Finding = z.infer<typeof FindingSchema>;

// ============================================================================
// 5. EVALUATION SCHEMA (uiforge.contract.evaluation.v1)
// ============================================================================

export const EvaluationSchema = z.object({
  $schema: z.literal("https://schemas.uiforge.dev/v1/evaluation.json").default("https://schemas.uiforge.dev/v1/evaluation.json"),
  id: z.string().regex(/^EVAL-[a-f0-9]{8}$/),
  projectId: z.string().regex(/^PRJ-[a-f0-9]{8}$/),
  targetUrl: z.string().url(),
  timestamp: z.string().datetime(),
  overallScore: z.number().min(0).max(100),
  findings: z.array(FindingSchema),
  consoleErrors: z.array(z.string()),
  networkFailures: z.array(z.object({ url: z.string(), status: z.number() })),
  visualDeltaRatio: z.number().min(0).max(1).optional(),
});

export type Evaluation = z.infer<typeof EvaluationSchema>;

// ============================================================================
// 6. APPROVAL AUTHORIZATION SCHEMA (uiforge.contract.approval.v1)
// ============================================================================

export const ApprovalSchema = z.object({
  id: z.string().regex(/^AUTH-[a-f0-9]{8}$/),
  permissionLevel: z.union([z.literal(2), z.literal(3), z.literal(4)]),
  targetFiles: z.array(z.string()).min(1),
  diffSha256: z.string().regex(/^[a-f0-9]{64}$/),
  issuedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  signatureSha256: z.string().regex(/^[a-f0-9]{64}$/),
  approverIdentity: z.enum(["cli-local-user", "studio-admin", "ci-bot"]),
});

export type Approval = z.infer<typeof ApprovalSchema>;

// ============================================================================
// 7. PROPOSED MODIFICATION SCHEMA (uiforge.contract.proposed-mod.v1)
// ============================================================================

export const ProposedModificationSchema = z.object({
  id: z.string().regex(/^MOD-[a-f0-9]{8}$/),
  projectId: z.string().regex(/^PRJ-[a-f0-9]{8}$/),
  targetFilePath: z.string().min(1),
  characterSpan: z.tuple([z.number().int().min(0), z.number().int().min(0)]),
  originalTextDigest: z.string().regex(/^[a-f0-9]{64}$/),
  replacementText: z.string(),
  unifiedDiff: z.string(),
  resolvedFindingId: z.string().regex(/^FND-[a-f0-9]{8}$/).optional(),
});

export type ProposedModification = z.infer<typeof ProposedModificationSchema>;

// ============================================================================
// 8. MODIFICATION RESULT SCHEMA (uiforge.contract.mod-result.v1)
// ============================================================================

export const ModificationResultSchema = z.object({
  id: z.string().regex(/^RES-[a-f0-9]{8}$/),
  modificationId: z.string().regex(/^MOD-[a-f0-9]{8}$/),
  committed: z.boolean(),
  walJournalId: z.string(),
  baselineErrorsCount: z.number().int().min(0),
  postErrorsCount: z.number().int().min(0),
  deltaRegressionsCount: z.number().int().min(0),
  rollbackExecuted: z.boolean(),
  rollbackReason: z.string().optional(),
});

export type ModificationResult = z.infer<typeof ModificationResultSchema>;

// ============================================================================
// 9. ERROR SCHEMA (uiforge.contract.error.v1)
// ============================================================================

export const ErrorCategorySchema = z.enum([
  "VALIDATION",
  "SECURITY",
  "AST_PARSER",
  "BROWSER",
  "STORAGE",
  "NETWORK",
  "ORCHESTRATION"
]);

export const ErrorSchema = z.object({
  code: z.string().regex(/^ERR-[A-Z_]+$/),
  category: ErrorCategorySchema,
  message: z.string().min(1),
  fatal: z.boolean(),
  timestamp: z.string().datetime(),
  remediationHint: z.string().optional(),
  fieldErrors: z.array(z.object({ path: z.string(), issue: z.string() })).optional(),
});

export type ErrorPayload = z.infer<typeof ErrorSchema>;
```

