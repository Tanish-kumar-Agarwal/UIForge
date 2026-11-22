/**
 * @uiforge/contracts - Canonical Zod Schemas & TypeScript Definitions
 * Single source of truth implementing Contracts 01 to 28
 */

import { z } from 'zod';

// ============================================================================
// 1. PROJECT SCHEMA (uiforge.contract.project.v1)
// ============================================================================

export const FrameworkMetadataSchema = z.object({
  name: z.enum(['next', 'react-vite', 'remix', 'sveltekit', 'vue-vite', 'unknown']),
  version: z.string(),
  router: z.enum(['app-router', 'pages-router', 'file-system', 'spa-hash', 'none']),
});
export type FrameworkMetadata = z.infer<typeof FrameworkMetadataSchema>;

export const StylingMetadataSchema = z.object({
  engine: z.enum(['tailwind', 'css-modules', 'sass', 'vanilla-css', 'styled-components']),
  tailwindVersion: z.enum(['v3', 'v4', 'none']).optional(),
  cssVariablesDetected: z.boolean(),
});
export type StylingMetadata = z.infer<typeof StylingMetadataSchema>;

export const ProjectSchema = z.object({
  $schema: z
    .literal('https://schemas.uiforge.dev/v1/project.json')
    .default('https://schemas.uiforge.dev/v1/project.json'),
  id: z.string().regex(/^PRJ-[a-f0-9]{8}$/),
  name: z.string().min(1).max(128),
  rootPath: z.string().min(1),
  createdAt: z.string().datetime(),
  framework: FrameworkMetadataSchema,
  styling: StylingMetadataSchema,
  activeSnapshotId: z
    .string()
    .regex(/^SNAP-[a-f0-9]{8}$/)
    .optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

// ============================================================================
// 2. PROJECT SNAPSHOT SCHEMA (uiforge.contract.project-snapshot.v1)
// ============================================================================

export const ProjectSnapshotSchema = z.object({
  $schema: z
    .literal('https://schemas.uiforge.dev/v1/project-snapshot.json')
    .default('https://schemas.uiforge.dev/v1/project-snapshot.json'),
  snapshotId: z.string().regex(/^SNAP-[a-f0-9]{8}$/),
  projectId: z.string().regex(/^PRJ-[a-f0-9]{8}$/),
  timestamp: z.string().datetime(),
  gitCommit: z
    .string()
    .regex(/^[a-f0-9]{7,40}$/)
    .optional(),
  tokensDigest: z.string().regex(/^[a-f0-9]{64}$/),
  componentInventoryDigest: z.string().regex(/^[a-f0-9]{64}$/),
  packageLockDigest: z.string().regex(/^[a-f0-9]{64}$/),
  evaluationSummary: z
    .object({
      overallScore: z.number().min(0).max(100),
      criticalFindingsCount: z.number().int().min(0),
      pixelDeltaRatio: z.number().min(0).max(1),
    })
    .optional(),
});
export type ProjectSnapshot = z.infer<typeof ProjectSnapshotSchema>;

// ============================================================================
// 3. W3C DTCG DESIGN TOKEN SCHEMA (uiforge.contract.token.v1)
// ============================================================================

export const DtcgTokenTypeSchema = z.enum([
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
  'shadow',
  'border',
  'transition',
]);
export type DtcgTokenType = z.infer<typeof DtcgTokenTypeSchema>;

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

export const FindingSeveritySchema = z.enum(['CRITICAL', 'SERIOUS', 'MODERATE', 'MINOR']);
export type FindingSeverity = z.infer<typeof FindingSeveritySchema>;

export const FindingCategorySchema = z.enum(['A11Y', 'UX', 'RESPONSIVE', 'COMPILE', 'SECURITY']);
export type FindingCategory = z.infer<typeof FindingCategorySchema>;

export const FindingSchema = z.object({
  id: z.string().regex(/^FND-[a-f0-9]{8}$/),
  evaluationId: z.string().regex(/^EVAL-[a-f0-9]{8}$/),
  category: FindingCategorySchema,
  severity: FindingSeveritySchema,
  title: z.string().min(1),
  description: z.string().min(1),
  selector: z.string().min(1),
  viewport: z.enum(['375px', '768px', '1280px', '1920px', 'all']),
  wcagCriteria: z.string().optional(),
  filePath: z.string().optional(),
  lineNumber: z.number().int().positive().optional(),
  remediationPatch: z.string().optional(),
  screenshotHash: z
    .string()
    .regex(/^[a-f0-9]{64}$/)
    .optional(),
});
export type Finding = z.infer<typeof FindingSchema>;

// ============================================================================
// 5. EVALUATION SCHEMA (uiforge.contract.evaluation.v1)
// ============================================================================

export const EvaluationSchema = z.object({
  $schema: z
    .literal('https://schemas.uiforge.dev/v1/evaluation.json')
    .default('https://schemas.uiforge.dev/v1/evaluation.json'),
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
  approverIdentity: z.enum(['cli-local-user', 'studio-admin', 'ci-bot']),
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
  resolvedFindingId: z
    .string()
    .regex(/^FND-[a-f0-9]{8}$/)
    .optional(),
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
  'VALIDATION',
  'SECURITY',
  'AST_PARSER',
  'BROWSER',
  'STORAGE',
  'NETWORK',
  'ORCHESTRATION',
  'SAFE_MOD',
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

// ============================================================================
// 10. ANALYSIS RUN SCHEMA (uiforge.contract.analysis-run.v1)
// ============================================================================

export const AnalysisRunSchema = z.object({
  analysisId: z.string().uuid(),
  projectId: z.string().uuid(),
  timestamp: z.string().datetime(),
  analyzerVersion: z.string().min(1),
  detectedFramework: z.string(),
  detectedRouter: z.string(),
  stylingStrategy: z.string(),
  componentCount: z.number().int().nonnegative(),
  routeCount: z.number().int().nonnegative(),
  durationMs: z.number().nonnegative(),
  status: z.enum(['SUCCESS', 'PARTIAL', 'FAILED']),
  warnings: z.array(z.string()),
});
export type AnalysisRun = z.infer<typeof AnalysisRunSchema>;

// ============================================================================
// 11. DESIGN BRIEF SCHEMA (uiforge.contract.design-brief.v1)
// ============================================================================

export const DesignBriefSchema = z.object({
  briefId: z.string().uuid(),
  projectId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  targetAudience: z.string().optional(),
  brandValues: z.array(z.string()),
  aestheticKeywords: z.array(z.string()),
  colorPreferences: z.object({
    dominantHue: z.string().optional(),
    mode: z.enum(['LIGHT', 'DARK', 'SYSTEM', 'DUAL']),
    contrastTarget: z.enum(['WCAG_AA', 'WCAG_AAA']),
  }),
  createdAt: z.string().datetime(),
});
export type DesignBrief = z.infer<typeof DesignBriefSchema>;

// ============================================================================
// 12. VISUAL DIRECTION SCHEMA (uiforge.contract.visual-direction.v1)
// ============================================================================

export const VisualDirectionSchema = z.object({
  directionId: z.string().uuid(),
  briefId: z.string().uuid(),
  name: z.string().min(1),
  moodboardKeywords: z.array(z.string()),
  fontPairing: z.object({
    heading: z.string(),
    body: z.string(),
    code: z.string().optional(),
  }),
  primaryPalette: z.array(z.string()),
  radiusScale: z.string(),
  elevationStyle: z.enum(['FLAT', 'SUBTLE', 'LAYERED', 'NEUMORPHIC']),
  status: z.enum(['PROPOSED', 'SELECTED', 'REJECTED']),
});
export type VisualDirection = z.infer<typeof VisualDirectionSchema>;

// ============================================================================
// 13. DESIGN SYSTEM SCHEMA (uiforge.contract.design-system.v1)
// ============================================================================

export const DesignSystemSchema = z.object({
  systemId: z.string().uuid(),
  projectId: z.string().uuid(),
  name: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  tokenCollectionCount: z.number().int().nonnegative(),
  componentCount: z.number().int().nonnegative(),
  supportedThemes: z.array(z.string()),
  w3cCompliant: z.boolean(),
  lastUpdated: z.string().datetime(),
});
export type DesignSystem = z.infer<typeof DesignSystemSchema>;

// ============================================================================
// 14. COMPONENT DEFINITION SCHEMA (uiforge.contract.component-def.v1)
// ============================================================================

export const ComponentDefinitionSchema = z.object({
  componentId: z.string().uuid(),
  name: z.string().min(1),
  category: z.enum(['PRIMITIVE', 'COMPOSITE', 'LAYOUT', 'TEMPLATE']),
  description: z.string(),
  propsInterface: z.record(
    z.object({
      type: z.string(),
      required: z.boolean(),
      defaultValue: z.any().optional(),
      description: z.string().optional(),
    }),
  ),
  accessibilityRoles: z.array(z.string()),
  sourceRegistry: z.string().optional(),
});
export type ComponentDefinition = z.infer<typeof ComponentDefinitionSchema>;

// ============================================================================
// 15. COMPONENT IMPLEMENTATION SCHEMA (uiforge.contract.component-impl.v1)
// ============================================================================

export const ComponentImplementationSchema = z.object({
  implementationId: z.string().uuid(),
  componentId: z.string().uuid(),
  filePath: z.string(),
  language: z.enum(['TSX', 'JSX', 'VUE', 'SVELTE']),
  sourceCode: z.string(),
  dependencies: z.array(z.string()),
  internalTokensUsed: z.array(z.string()),
  astSpanCoordinates: z
    .object({
      startOffset: z.number().int().nonnegative(),
      endOffset: z.number().int().nonnegative(),
    })
    .optional(),
});
export type ComponentImplementation = z.infer<typeof ComponentImplementationSchema>;

// ============================================================================
// 16. COMPONENT VERIFICATION SCHEMA (uiforge.contract.component-verif.v1)
// ============================================================================

export const ComponentVerificationSchema = z.object({
  verificationId: z.string().uuid(),
  componentId: z.string().uuid(),
  typeCheckPass: z.boolean(),
  diagnosticCount: z.number().int().nonnegative(),
  a11yScore: z.number().min(0).max(100),
  wcagCompliant: z.boolean(),
  renderTestPass: z.boolean(),
  verifiedAt: z.string().datetime(),
});
export type ComponentVerification = z.infer<typeof ComponentVerificationSchema>;

// ============================================================================
// 17. REGISTRY SOURCE SCHEMA (uiforge.contract.registry-source.v1)
// ============================================================================

export const RegistrySourceSchema = z.object({
  registryId: z.string(),
  name: z.string().min(1),
  version: z.string(),
  baseUrl: z.string().url().optional(),
  license: z.string(),
  componentCount: z.number().int().nonnegative(),
  verifiedCompatibility: z.array(z.string()),
});
export type RegistrySource = z.infer<typeof RegistrySourceSchema>;

// ============================================================================
// 18. PROVENANCE SCHEMA (uiforge.contract.provenance.v1)
// ============================================================================

export const ProvenanceSchema = z.object({
  recordId: z.string().uuid(),
  targetEntityId: z.string().uuid(),
  entityType: z.enum(['COMPONENT', 'TOKEN', 'MUTATION', 'SNAPSHOT']),
  origin: z.enum(['AUTHOR_HUMAN', 'AGENT_GENERATED', 'REGISTRY_ADOPTED', 'MIGRATED']),
  authorIdentifier: z.string(),
  parentCommitSha: z.string().optional(),
  signatureHmac: z.string(),
  timestamp: z.string().datetime(),
});
export type ProvenanceRecord = z.infer<typeof ProvenanceSchema>;

// ============================================================================
// 19. EVIDENCE SCHEMA (uiforge.contract.evidence.v1)
// ============================================================================

export const EvidenceSchema = z.object({
  evidenceId: z.string().uuid(),
  evaluationId: z.string().uuid(),
  classification: z.enum([
    'PHASE_02_DECIDED',
    'SOURCE_VERIFIED',
    'REPO_VERIFIED',
    'ARCHITECTURE_DECISION',
    'PROPOSED',
    'ASSUMPTION',
    'NOT_ESTABLISHED',
  ]),
  claim: z.string().min(1),
  sourceArtifact: z.string(),
  sha256Digest: z.string(),
  timestamp: z.string().datetime(),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

// ============================================================================
// 20. AGENT SCHEMA (uiforge.contract.agent.v1)
// ============================================================================

export const AgentSchema = z.object({
  agentId: z.string(),
  name: z.string().min(1),
  protocolVersion: z.string(),
  clientType: z.enum(['CLAUDE_CODE', 'CURSOR', 'OPENCODE', 'WINDSURF', 'GENERIC_MCP']),
  supportedTools: z.array(z.string()),
  authenticated: z.boolean(),
  connectedAt: z.string().datetime(),
});
export type Agent = z.infer<typeof AgentSchema>;

// ============================================================================
// 21. AGENT SESSION SCHEMA (uiforge.contract.agent-session.v1)
// ============================================================================

export const AgentSessionSchema = z.object({
  sessionId: z.string().uuid(),
  agentId: z.string(),
  projectId: z.string().uuid(),
  activePermissions: z.array(z.string()),
  allocatedMemoryMb: z.number().nonnegative(),
  startedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
});
export type AgentSession = z.infer<typeof AgentSessionSchema>;

// ============================================================================
// 22. TASK SCHEMA (uiforge.contract.task.v1)
// ============================================================================

export const TaskSchema = z.object({
  taskId: z.string().uuid(),
  sessionId: z.string().uuid().optional(),
  type: z.enum([
    'ANALYZE',
    'DESIGN',
    'GENERATE',
    'AUDIT',
    'IMPROVE',
    'COMPARE',
    'VALIDATE',
    'EXPORT',
  ]),
  status: z.enum([
    'IDLE',
    'INITIALIZING',
    'EXECUTING',
    'AWAITING_APPROVAL',
    'COMMITTING',
    'COMPLETED',
    'FAILED',
  ]),
  progressPercentage: z.number().min(0).max(100),
  error: ErrorSchema.optional(),
  createdAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
});
export type Task = z.infer<typeof TaskSchema>;

// ============================================================================
// 23. TOOL EXECUTION SCHEMA (uiforge.contract.tool-execution.v1)
// ============================================================================

export const ToolExecutionSchema = z.object({
  executionId: z.string().uuid(),
  toolName: z.string().min(1),
  agentId: z.string(),
  parameters: z.record(z.any()),
  result: z.any().optional(),
  durationMs: z.number().nonnegative(),
  requiresAuth: z.boolean(),
  authToken: z.string().optional(),
  status: z.enum(['SUCCESS', 'DENIED', 'ERROR']),
});
export type ToolExecution = z.infer<typeof ToolExecutionSchema>;

// ============================================================================
// 24. PERMISSION SCHEMA (uiforge.contract.permission.v1)
// ============================================================================

export const PermissionSchema = z.object({
  permissionLevel: z.enum([
    'LEVEL_1_READ',
    'LEVEL_2_EVAL',
    'LEVEL_3_STAGED',
    'LEVEL_4_APPLY',
    'LEVEL_5_DANGEROUS',
  ]),
  targetResource: z.string(),
  grantedTo: z.string(),
  expiresAt: z.string().datetime(),
  singleUse: z.boolean(),
});
export type Permission = z.infer<typeof PermissionSchema>;

// ============================================================================
// 25. VALIDATION RUN SCHEMA (uiforge.contract.validation-run.v1)
// ============================================================================

export const ValidationRunSchema = z.object({
  runId: z.string().uuid(),
  projectId: z.string().uuid(),
  typecheckPassed: z.boolean(),
  lintPassed: z.boolean(),
  unitTestsPassed: z.boolean(),
  a11yPassed: z.boolean(),
  visualPassed: z.boolean(),
  exitCode: z.number().int(),
  executedAt: z.string().datetime(),
});
export type ValidationRun = z.infer<typeof ValidationRunSchema>;

// ============================================================================
// 26. COMPARISON SCHEMA (uiforge.contract.comparison.v1)
// ============================================================================

export const ComparisonSchema = z.object({
  comparisonId: z.string().uuid(),
  baselineSnapshotId: z.string().uuid(),
  candidateSnapshotId: z.string().uuid(),
  changedComponentCount: z.number().int().nonnegative(),
  visualDiffPercentage: z.number().min(0).max(100),
  a11yScoreDelta: z.number(),
  breakingChangesDetected: z.boolean(),
  comparedAt: z.string().datetime(),
});
export type Comparison = z.infer<typeof ComparisonSchema>;

// ============================================================================
// 27. EXPORT ARTIFACT SCHEMA (uiforge.contract.export-artifact.v1)
// ============================================================================

export const ExportArtifactSchema = z.object({
  artifactId: z.string().uuid(),
  format: z.enum(['HTML_REPORT', 'JSON_DATASET', 'DTCG_TOKENS', 'TAILWIND_CONFIG', 'CSS_VARS']),
  destinationPath: z.string(),
  fileSizeBufferBytes: z.number().int().nonnegative(),
  sha256Hash: z.string(),
  generatedAt: z.string().datetime(),
});
export type ExportArtifact = z.infer<typeof ExportArtifactSchema>;

// ============================================================================
// 28. WORKFLOW SCHEMA (uiforge.contract.workflow.v1)
// ============================================================================

export const WorkflowSchema = z.object({
  workflowId: z.string().uuid(),
  type: z.enum([
    'GREENFIELD_CREATION',
    'BROWNFIELD_IMPROVEMENT',
    'MCP_TOOL_LOOP',
    'CI_QUALITY_GATE',
  ]),
  activeStep: z.number().int().positive(),
  totalSteps: z.number().int().positive(),
  stateMachineStatus: z.string(),
  walTransactionActive: z.boolean(),
  startedAt: z.string().datetime(),
});
export type Workflow = z.infer<typeof WorkflowSchema>;

// ============================================================================
// 29. PROJECT ANALYSIS RESULT SCHEMA (uiforge.contract.project-analysis.v1)
// ============================================================================

export const FrameworkConfidenceSchema = z.enum(['CONFIRMED', 'PROBABLE', 'UNKNOWN']);
export type FrameworkConfidence = z.infer<typeof FrameworkConfidenceSchema>;

export const FrameworkDetectionResultSchema = z.object({
  name: z.enum(['next', 'react-vite', 'react', 'vue-vite', 'vue', 'sveltekit', 'svelte', 'unknown']),
  version: z.string(),
  router: z.enum(['app-router', 'pages-router', 'file-system', 'spa-hash', 'react-router', 'none']),
  confidence: FrameworkConfidenceSchema,
  evidence: z.array(z.string()),
  limitations: z.string().optional(),
});
export type FrameworkDetectionResult = z.infer<typeof FrameworkDetectionResultSchema>;

export const LanguageMetadataSchema = z.object({
  primary: z.enum(['typescript', 'javascript', 'mixed']),
  hasTsConfig: z.boolean(),
  strictMode: z.boolean().optional(),
  target: z.string().optional(),
});
export type LanguageMetadata = z.infer<typeof LanguageMetadataSchema>;

export const RuntimeMetadataSchema = z.object({
  detected: z.enum(['node', 'bun', 'deno', 'browser-only', 'unknown']),
  versionConstraint: z.string().optional(),
  confidence: FrameworkConfidenceSchema,
});
export type RuntimeMetadata = z.infer<typeof RuntimeMetadataSchema>;

export const PackageManagerMetadataSchema = z.object({
  name: z.enum(['pnpm', 'npm', 'yarn', 'bun', 'unknown']),
  lockfilePresent: z.boolean(),
  lockfilePath: z.string().optional(),
});
export type PackageManagerMetadata = z.infer<typeof PackageManagerMetadataSchema>;

export const WorkspaceMetadataSchema = z.object({
  isMonorepo: z.boolean(),
  type: z.enum(['pnpm-workspace', 'npm-workspaces', 'yarn-workspaces', 'turborepo', 'lerna', 'none']),
  rootPath: z.string(),
  packagesCount: z.number().int().nonnegative(),
  applications: z.array(z.string()).optional(),
  targetApplication: z.string().optional(),
});
export type WorkspaceMetadata = z.infer<typeof WorkspaceMetadataSchema>;

export const DiscoveredRouteSchema = z.object({
  routePath: z.string(),
  filePath: z.string(),
  type: z.enum(['page', 'layout', 'api', 'route-handler', 'static']),
  routerType: z.enum(['app-router', 'pages-router', 'react-router', 'custom']),
  hasDynamicSegments: z.boolean(),
  application: z.string().optional(),
});
export type DiscoveredRoute = z.infer<typeof DiscoveredRouteSchema>;

export const DiscoveredComponentSchema = z.object({
  name: z.string(),
  filePath: z.string(),
  exportType: z.enum(['default', 'named', 'internal']),
  propsInterface: z.string().optional(),
  renderedComponents: z.array(z.string()),
  importedModules: z.array(z.string()),
  hasInlineStyles: z.boolean(),
  usesCssClasses: z.boolean(),
  application: z.string().optional(),
});
export type DiscoveredComponent = z.infer<typeof DiscoveredComponentSchema>;

export const StylingArchitectureSchema = z.object({
  primaryEngine: z.enum(['tailwind', 'css-modules', 'sass', 'styled-components', 'vanilla-css', 'unknown']),
  tailwindVersion: z.enum(['v3', 'v4', 'none']).optional(),
  cssVariablesCount: z.number().int().nonnegative(),
  cssFiles: z.array(z.string()),
  hasDesignTokens: z.boolean(),
  tokenFiles: z.array(z.string()),
  iconLibraries: z.array(z.string()),
  detectedDesignSystems: z.array(z.string()),
});
export type StylingArchitecture = z.infer<typeof StylingArchitectureSchema>;

export const ResponsiveSignalsSchema = z.object({
  hasViewportMeta: z.boolean(),
  mediaQueriesCount: z.number().int().nonnegative(),
  responsiveUtilityClassesCount: z.number().int().nonnegative(),
});
export type ResponsiveSignals = z.infer<typeof ResponsiveSignalsSchema>;

export const AccessibilitySignalsSchema = z.object({
  ariaAttributesCount: z.number().int().nonnegative(),
  explicitRolesCount: z.number().int().nonnegative(),
  semanticElementsCount: z.number().int().nonnegative(),
  buttonsWithoutTypeCount: z.number().int().nonnegative(),
  imagesWithoutAltCount: z.number().int().nonnegative(),
  divButtonsCount: z.number().int().nonnegative(),
});
export type AccessibilitySignals = z.infer<typeof AccessibilitySignalsSchema>;

export const HardcodedDesignValuesSchema = z.object({
  colorLiteralsCount: z.number().int().nonnegative(),
  spacingLiteralsCount: z.number().int().nonnegative(),
  samples: z.array(z.string()),
});
export type HardcodedDesignValues = z.infer<typeof HardcodedDesignValuesSchema>;

export const SkippedFileReasonSchema = z.enum([
  'GITIGNORE',
  'SENSITIVE_SECRET',
  'BINARY_FILE',
  'EXCEEDS_FILE_SIZE',
  'SYMLINK_OUTSIDE_ROOT',
  'SYMLINK_LOOP',
  'PERMISSION_DENIED',
  'PARSE_FAILURE',
  'NOT_FOUND',
]);
export type SkippedFileReason = z.infer<typeof SkippedFileReasonSchema>;

export const SkippedFileSchema = z.object({
  filePath: z.string(),
  reason: SkippedFileReasonSchema,
  detail: z.string().optional(),
});
export type SkippedFile = z.infer<typeof SkippedFileSchema>;

export const ScanCoverageSchema = z.object({
  totalFilesFound: z.number().int().nonnegative(),
  totalFilesScanned: z.number().int().nonnegative(),
  totalDirectoriesScanned: z.number().int().nonnegative(),
  skippedFiles: z.array(SkippedFileSchema),
  limitsHit: z.array(z.string()),
});
export type ScanCoverage = z.infer<typeof ScanCoverageSchema>;

export const GitIntelligenceSchema = z.object({
  isGitRepository: z.boolean(),
  currentBranch: z.string().optional(),
  headCommit: z.string().optional(),
  isWorktreeDirty: z.boolean().optional(),
  modifiedFilesCount: z.number().int().nonnegative().optional(),
  untrackedFilesCount: z.number().int().nonnegative().optional(),
});
export type GitIntelligence = z.infer<typeof GitIntelligenceSchema>;

export const FindingNatureSchema = z.enum(['DETECTED_FACT', 'INFERRED_SIGNAL', 'OBSERVATION']);
export type FindingNature = z.infer<typeof FindingNatureSchema>;

export const AnalysisFindingSchema = z.object({
  id: z.string(),
  detector: z.string(),
  nature: FindingNatureSchema,
  category: z.enum(['SECURITY', 'ACCESSIBILITY', 'RESPONSIVE', 'DESIGN_TOKENS', 'STRUCTURE']),
  severity: z.enum(['CRITICAL', 'SERIOUS', 'MODERATE', 'MINOR', 'INFO']),
  title: z.string(),
  description: z.string(),
  location: z.object({
    filePath: z.string(),
    line: z.number().int().positive().optional(),
    column: z.number().int().positive().optional(),
  }),
  antiPatternId: z.string().optional(),
  evidence: z.array(z.string()),
  confidence: FrameworkConfidenceSchema,
  limitations: z.string().optional(),
});
export type AnalysisFinding = z.infer<typeof AnalysisFindingSchema>;

export const AnalysisRecommendationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  suggestedAction: z.string(),
  relatedFindingIds: z.array(z.string()),
  antiPatternId: z.string().optional(),
});
export type AnalysisRecommendation = z.infer<typeof AnalysisRecommendationSchema>;

export const ExecutionMetadataSchema = z.object({
  analysisId: z.string().uuid(),
  timestamp: z.string().datetime(),
  durationMs: z.number().nonnegative(),
  analyzerVersion: z.string(),
  environment: z
    .object({
      nodeVersion: z.string().optional(),
      platform: z.string().optional(),
    })
    .optional(),
});
export type ExecutionMetadata = z.infer<typeof ExecutionMetadataSchema>;

export const ProjectAnalysisContentSchema = z.object({
  projectIdentity: z.object({
    name: z.string(),
    framework: FrameworkDetectionResultSchema,
    language: LanguageMetadataSchema,
    runtime: RuntimeMetadataSchema,
    packageManager: PackageManagerMetadataSchema,
    workspace: WorkspaceMetadataSchema,
    monorepoApp: z.string().optional(),
  }),
  dependencies: z.object({
    direct: z.record(z.string()),
    devDependencies: z.record(z.string()),
    scripts: z.record(z.string()),
    tools: z.object({
      buildTools: z.array(z.string()),
      testFrameworks: z.array(z.string()),
      linters: z.array(z.string()),
    }),
  }),
  architecture: z.object({
    routes: z.array(DiscoveredRouteSchema),
    components: z.array(DiscoveredComponentSchema),
    styling: StylingArchitectureSchema,
  }),
  signals: z.object({
    responsive: ResponsiveSignalsSchema,
    accessibility: AccessibilitySignalsSchema,
    designTokens: HardcodedDesignValuesSchema,
  }),
  git: GitIntelligenceSchema,
  coverage: ScanCoverageSchema,
  findings: z.array(AnalysisFindingSchema),
  recommendations: z.array(AnalysisRecommendationSchema),
  warnings: z.array(z.string()),
  status: z.enum(['SUCCESS', 'PARTIAL', 'FAILED']),
});
export type ProjectAnalysisContent = z.infer<typeof ProjectAnalysisContentSchema>;

export const ProjectAnalysisResultSchema = z.object({
  $schema: z
    .literal('https://schemas.uiforge.dev/v1/project-analysis.json')
    .default('https://schemas.uiforge.dev/v1/project-analysis.json'),
  execution: ExecutionMetadataSchema,
  analysis: ProjectAnalysisContentSchema,
});
export type ProjectAnalysisResult = z.infer<typeof ProjectAnalysisResultSchema>;

