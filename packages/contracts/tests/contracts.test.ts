import { describe, it, expect } from 'vitest';
import {
  ProjectSchema,
  ProjectSnapshotSchema,
  DtcgTokenSchema,
  FindingSchema,
  EvaluationSchema,
  ApprovalSchema,
  ProposedModificationSchema,
  ModificationResultSchema,
  ErrorSchema,
  AnalysisRunSchema,
  DesignBriefSchema,
  VisualDirectionSchema,
  DesignSystemSchema,
  ComponentDefinitionSchema,
  ComponentImplementationSchema,
  ComponentVerificationSchema,
  RegistrySourceSchema,
  ProvenanceSchema,
  EvidenceSchema,
  AgentSchema,
  AgentSessionSchema,
  TaskSchema,
  ToolExecutionSchema,
  PermissionSchema,
  ValidationRunSchema,
  ComparisonSchema,
  ExportArtifactSchema,
  WorkflowSchema,
  ProjectAnalysisResultSchema,
  UIForgeError,
  ErrorCode,
  ErrorCategory,
} from '../src/index.js';

describe('@uiforge/contracts - 28 Canonical Contracts Verification', () => {
  const uuid = '123e4567-e89b-12d3-a456-426614174000';
  const sha256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const isoTime = '2026-11-22T12:00:00.000Z';

  it('01: validates Project contract (PRJ-)', () => {
    const valid = {
      id: 'PRJ-1a2b3c4d',
      name: 'Sample App',
      rootPath: '/projects/sample',
      createdAt: isoTime,
      framework: { name: 'react-vite', version: '5.4.0', router: 'spa-hash' },
      styling: { engine: 'tailwind', tailwindVersion: 'v4', cssVariablesDetected: true },
    };
    expect(ProjectSchema.parse(valid)).toMatchObject(valid);
    expect(() => ProjectSchema.parse({ ...valid, id: 'INVALID-ID' })).toThrow();
  });

  it('02: validates ProjectSnapshot contract (SNAP-)', () => {
    const valid = {
      snapshotId: 'SNAP-1a2b3c4d',
      projectId: 'PRJ-1a2b3c4d',
      timestamp: isoTime,
      gitCommit: 'a1b2c3d',
      tokensDigest: sha256,
      componentInventoryDigest: sha256,
      packageLockDigest: sha256,
    };
    expect(ProjectSnapshotSchema.parse(valid)).toMatchObject(valid);
  });

  it('03: validates DtcgToken contract (TOK-)', () => {
    const valid = {
      $type: 'color',
      $value: '#3b82f6',
      $description: 'Brand primary blue',
    };
    expect(DtcgTokenSchema.parse(valid)).toMatchObject(valid);
    expect(() => DtcgTokenSchema.parse({ $type: 'unknown-type', $value: 123 })).toThrow();
  });

  it('04: validates Finding contract (FND-)', () => {
    const valid = {
      id: 'FND-1a2b3c4d',
      evaluationId: 'EVAL-1a2b3c4d',
      category: 'A11Y',
      severity: 'CRITICAL',
      title: 'Missing accessible name',
      description: 'Button element does not have accessible text',
      selector: 'button#submit',
      viewport: '1280px',
    };
    expect(FindingSchema.parse(valid)).toMatchObject(valid);
  });

  it('05: validates Evaluation contract (EVAL-)', () => {
    const valid = {
      id: 'EVAL-1a2b3c4d',
      projectId: 'PRJ-1a2b3c4d',
      targetUrl: 'http://localhost:3000',
      timestamp: isoTime,
      overallScore: 92.5,
      findings: [],
      consoleErrors: [],
      networkFailures: [],
    };
    expect(EvaluationSchema.parse(valid)).toMatchObject(valid);
  });

  it('06: validates Approval contract (AUTH-)', () => {
    const valid = {
      id: 'AUTH-1a2b3c4d',
      permissionLevel: 3,
      targetFiles: ['src/button.tsx'],
      diffSha256: sha256,
      issuedAt: isoTime,
      expiresAt: '2026-11-22T13:00:00.000Z',
      signatureSha256: sha256,
      approverIdentity: 'cli-local-user',
    };
    expect(ApprovalSchema.parse(valid)).toMatchObject(valid);
  });

  it('07: validates ProposedModification contract (MOD-)', () => {
    const valid = {
      id: 'MOD-1a2b3c4d',
      projectId: 'PRJ-1a2b3c4d',
      targetFilePath: 'src/button.tsx',
      characterSpan: [100, 150],
      originalTextDigest: sha256,
      replacementText: 'className="bg-blue-600 text-white"',
      unifiedDiff: '--- a/button.tsx\n+++ b/button.tsx',
    };
    expect(ProposedModificationSchema.parse(valid)).toMatchObject(valid);
  });

  it('08: validates ModificationResult contract (RES-)', () => {
    const valid = {
      id: 'RES-1a2b3c4d',
      modificationId: 'MOD-1a2b3c4d',
      committed: true,
      walJournalId: 'WAL-1a2b3c4d',
      baselineErrorsCount: 0,
      postErrorsCount: 0,
      deltaRegressionsCount: 0,
      rollbackExecuted: false,
    };
    expect(ModificationResultSchema.parse(valid)).toMatchObject(valid);
  });

  it('09: validates ErrorPayload contract (ERR-)', () => {
    const valid = {
      code: 'ERR-VALIDATION_SCHEMA_MISMATCH',
      category: 'VALIDATION',
      message: 'Field rootPath is required',
      fatal: true,
      timestamp: isoTime,
    };
    expect(ErrorSchema.parse(valid)).toMatchObject(valid);
  });

  it('10: validates AnalysisRun contract (ANL-)', () => {
    const valid = {
      analysisId: uuid,
      projectId: uuid,
      timestamp: isoTime,
      analyzerVersion: '0.1.0',
      detectedFramework: 'Next.js',
      detectedRouter: 'App Router',
      stylingStrategy: 'Tailwind CSS v4',
      componentCount: 14,
      routeCount: 5,
      durationMs: 342,
      status: 'SUCCESS',
      warnings: [],
    };
    expect(AnalysisRunSchema.parse(valid)).toMatchObject(valid);
  });

  it('11: validates DesignBrief contract (BRF-)', () => {
    const valid = {
      briefId: uuid,
      projectId: uuid,
      title: 'Enterprise Analytics Dashboard',
      description: 'Executive KPI monitoring platform',
      brandValues: ['Precision', 'Trust'],
      aestheticKeywords: ['Modern', 'Data-Dense'],
      colorPreferences: {
        dominantHue: '#0f172a',
        mode: 'DARK',
        contrastTarget: 'WCAG_AA',
      },
      createdAt: isoTime,
    };
    expect(DesignBriefSchema.parse(valid)).toMatchObject(valid);
  });

  it('12: validates VisualDirection contract (DIR-)', () => {
    const valid = {
      directionId: uuid,
      briefId: uuid,
      name: 'Hyper-Dense Charcoal',
      moodboardKeywords: ['High Contrast', 'Minimalist'],
      fontPairing: { heading: 'Inter Display', body: 'Inter' },
      primaryPalette: ['#0f172a', '#3b82f6', '#f8fafc'],
      radiusScale: '4px',
      elevationStyle: 'SUBTLE',
      status: 'PROPOSED',
    };
    expect(VisualDirectionSchema.parse(valid)).toMatchObject(valid);
  });

  it('13: validates DesignSystem contract (DS-)', () => {
    const valid = {
      systemId: uuid,
      projectId: uuid,
      name: 'UIForge Default System',
      version: '1.0.0',
      tokenCollectionCount: 4,
      componentCount: 28,
      supportedThemes: ['light', 'dark'],
      w3cCompliant: true,
      lastUpdated: isoTime,
    };
    expect(DesignSystemSchema.parse(valid)).toMatchObject(valid);
  });

  it('14: validates ComponentDefinition contract (CMP-)', () => {
    const valid = {
      componentId: uuid,
      name: 'DataGrid',
      category: 'COMPOSITE',
      description: 'Virtualized data grid component',
      propsInterface: {
        data: { type: 'Array<Record<string, unknown>>', required: true },
      },
      accessibilityRoles: ['grid', 'row', 'gridcell'],
    };
    expect(ComponentDefinitionSchema.parse(valid)).toMatchObject(valid);
  });

  it('15: validates ComponentImplementation contract (IMP-)', () => {
    const valid = {
      implementationId: uuid,
      componentId: uuid,
      filePath: 'src/components/datagrid.tsx',
      language: 'TSX',
      sourceCode: 'export const DataGrid = () => null;',
      dependencies: ['react'],
      internalTokensUsed: ['color.neutral.900'],
    };
    expect(ComponentImplementationSchema.parse(valid)).toMatchObject(valid);
  });

  it('16: validates ComponentVerification contract (VRF-)', () => {
    const valid = {
      verificationId: uuid,
      componentId: uuid,
      typeCheckPass: true,
      diagnosticCount: 0,
      a11yScore: 100,
      wcagCompliant: true,
      renderTestPass: true,
      verifiedAt: isoTime,
    };
    expect(ComponentVerificationSchema.parse(valid)).toMatchObject(valid);
  });

  it('17: validates RegistrySource contract (SRC-)', () => {
    const valid = {
      registryId: 'shadcn-ui',
      name: 'shadcn/ui Canonical Components',
      version: '0.9.0',
      license: 'MIT',
      componentCount: 52,
      verifiedCompatibility: ['react-18', 'react-19', 'tailwind-v4'],
    };
    expect(RegistrySourceSchema.parse(valid)).toMatchObject(valid);
  });

  it('18: validates Provenance contract (PRV-)', () => {
    const valid = {
      recordId: uuid,
      targetEntityId: uuid,
      entityType: 'COMPONENT',
      origin: 'AGENT_GENERATED',
      authorIdentifier: 'uiforge-agent-v1',
      signatureHmac: sha256,
      timestamp: isoTime,
    };
    expect(ProvenanceSchema.parse(valid)).toMatchObject(valid);
  });

  it('19: validates Evidence contract (EVD-)', () => {
    const valid = {
      evidenceId: uuid,
      evaluationId: uuid,
      classification: 'REPO_VERIFIED',
      claim: 'Target repository compiles with 0 diagnostic regressions',
      sourceArtifact: 'tsc-diagnostics.json',
      sha256Digest: sha256,
      timestamp: isoTime,
    };
    expect(EvidenceSchema.parse(valid)).toMatchObject(valid);
  });

  it('20: validates Agent contract (AGT-)', () => {
    const valid = {
      agentId: 'claude-code-worker-1',
      name: 'Claude Code Agent',
      protocolVersion: '2026-07-28',
      clientType: 'CLAUDE_CODE',
      supportedTools: ['scan_project', 'evaluate_route'],
      authenticated: true,
      connectedAt: isoTime,
    };
    expect(AgentSchema.parse(valid)).toMatchObject(valid);
  });

  it('21: validates AgentSession contract (SES-)', () => {
    const valid = {
      sessionId: uuid,
      agentId: 'claude-code-worker-1',
      projectId: uuid,
      activePermissions: ['LEVEL_1_READ', 'LEVEL_2_EVAL'],
      allocatedMemoryMb: 512,
      startedAt: isoTime,
      expiresAt: '2026-11-22T14:00:00.000Z',
    };
    expect(AgentSessionSchema.parse(valid)).toMatchObject(valid);
  });

  it('22: validates Task contract (TSK-)', () => {
    const valid = {
      taskId: uuid,
      type: 'ANALYZE',
      status: 'EXECUTING',
      progressPercentage: 45,
      createdAt: isoTime,
    };
    expect(TaskSchema.parse(valid)).toMatchObject(valid);
  });

  it('23: validates ToolExecution contract (EXE-)', () => {
    const valid = {
      executionId: uuid,
      toolName: 'scan_project',
      agentId: 'claude-code-worker-1',
      parameters: { rootPath: '.' },
      durationMs: 120,
      requiresAuth: false,
      status: 'SUCCESS',
    };
    expect(ToolExecutionSchema.parse(valid)).toMatchObject(valid);
  });

  it('24: validates Permission contract (PRM-)', () => {
    const valid = {
      permissionLevel: 'LEVEL_1_READ',
      targetResource: 'workspace://src',
      grantedTo: 'agent://claude-code',
      expiresAt: '2026-11-22T18:00:00.000Z',
      singleUse: false,
    };
    expect(PermissionSchema.parse(valid)).toMatchObject(valid);
  });

  it('25: validates ValidationRun contract (VAL-)', () => {
    const valid = {
      runId: uuid,
      projectId: uuid,
      typecheckPassed: true,
      lintPassed: true,
      unitTestsPassed: true,
      a11yPassed: true,
      visualPassed: true,
      exitCode: 0,
      executedAt: isoTime,
    };
    expect(ValidationRunSchema.parse(valid)).toMatchObject(valid);
  });

  it('26: validates Comparison contract (CMPR-)', () => {
    const valid = {
      comparisonId: uuid,
      baselineSnapshotId: uuid,
      candidateSnapshotId: uuid,
      changedComponentCount: 3,
      visualDiffPercentage: 0.12,
      a11yScoreDelta: +5.0,
      breakingChangesDetected: false,
      comparedAt: isoTime,
    };
    expect(ComparisonSchema.parse(valid)).toMatchObject(valid);
  });

  it('27: validates ExportArtifact contract (ART-)', () => {
    const valid = {
      artifactId: uuid,
      format: 'HTML_REPORT',
      destinationPath: 'reports/compliance-dossier.html',
      fileSizeBufferBytes: 1048576,
      sha256Hash: sha256,
      generatedAt: isoTime,
    };
    expect(ExportArtifactSchema.parse(valid)).toMatchObject(valid);
  });

  it('28: validates Workflow contract (WFL-)', () => {
    const valid = {
      workflowId: uuid,
      type: 'BROWNFIELD_IMPROVEMENT',
      activeStep: 2,
      totalSteps: 5,
      stateMachineStatus: 'AWAITING_APPROVAL',
      walTransactionActive: true,
      startedAt: isoTime,
    };
    expect(WorkflowSchema.parse(valid)).toMatchObject(valid);
  });

  it('29: validates ProjectAnalysisResult contract (uiforge.contract.project-analysis.v1)', () => {
    const valid = {
      $schema: 'https://schemas.uiforge.dev/v1/project-analysis.json',
      execution: {
        analysisId: uuid,
        timestamp: isoTime,
        durationMs: 42,
        analyzerVersion: '0.2.0',
        environment: { nodeVersion: 'v22.12.0', platform: 'win32' },
      },
      analysis: {
        projectIdentity: {
          name: 'sample-app',
          framework: {
            name: 'next',
            version: '14.2.0',
            router: 'app-router',
            confidence: 'CONFIRMED',
            evidence: ['dependency:next@14.2.0', 'directory:src/app'],
          },
          language: {
            primary: 'typescript',
            hasTsConfig: true,
            strictMode: true,
          },
          runtime: {
            detected: 'node',
            confidence: 'CONFIRMED',
          },
          packageManager: {
            name: 'pnpm',
            lockfilePresent: true,
            lockfilePath: 'pnpm-lock.yaml',
          },
          workspace: {
            isMonorepo: false,
            type: 'none',
            rootPath: '.',
            packagesCount: 1,
          },
        },
        dependencies: {
          direct: { next: '14.2.0', react: '18.3.1' },
          devDependencies: { typescript: '^5.7.0' },
          scripts: { build: 'next build', dev: 'next dev' },
          tools: {
            buildTools: ['next'],
            testFrameworks: ['vitest'],
            linters: ['eslint'],
          },
        },
        architecture: {
          routes: [
            {
              routePath: '/',
              filePath: 'src/app/page.tsx',
              type: 'page',
              routerType: 'app-router',
              hasDynamicSegments: false,
            },
          ],
          components: [
            {
              name: 'Button',
              filePath: 'src/components/Button.tsx',
              exportType: 'named',
              propsInterface: 'ButtonProps',
              renderedComponents: [],
              importedModules: ['react'],
              hasInlineStyles: false,
              usesCssClasses: true,
            },
          ],
          styling: {
            primaryEngine: 'tailwind',
            tailwindVersion: 'v4',
            cssVariablesCount: 12,
            cssFiles: ['src/app/globals.css'],
            hasDesignTokens: false,
            tokenFiles: [],
            iconLibraries: ['lucide-react'],
            detectedDesignSystems: ['shadcn/ui'],
          },
        },
        signals: {
          responsive: {
            hasViewportMeta: true,
            mediaQueriesCount: 2,
            responsiveUtilityClassesCount: 15,
          },
          accessibility: {
            ariaAttributesCount: 4,
            explicitRolesCount: 1,
            semanticElementsCount: 8,
            buttonsWithoutTypeCount: 1,
            imagesWithoutAltCount: 0,
            divButtonsCount: 0,
          },
          designTokens: {
            colorLiteralsCount: 3,
            spacingLiteralsCount: 2,
            samples: ['#3b82f6', '24px'],
          },
        },
        git: {
          isGitRepository: true,
          currentBranch: 'main',
          isWorktreeDirty: false,
        },
        coverage: {
          totalFilesFound: 25,
          totalFilesScanned: 22,
          totalDirectoriesScanned: 6,
          skippedFiles: [
            {
              filePath: '.env.local',
              reason: 'SENSITIVE_SECRET',
              detail: 'Secret-bearing file shielded',
            },
          ],
          limitsHit: [],
        },
        findings: [
          {
            id: 'FND-8f3b1a20',
            detector: 'ast:jsx-accessibility',
            nature: 'INFERRED_SIGNAL',
            category: 'ACCESSIBILITY',
            severity: 'MODERATE',
            title: 'Button element without explicit type attribute',
            description: 'Button defaults to type="submit" inside forms, which can trigger unintended form submissions.',
            location: { filePath: 'src/components/Button.tsx', line: 12, column: 5 },
            antiPatternId: 'ANTI-A11Y-002',
            evidence: ['JSXElement:<button>', 'attribute:missing-type'],
            confidence: 'CONFIRMED',
          },
        ],
        recommendations: [
          {
            id: 'REC-01',
            title: 'Add explicit type="button" to non-submitting buttons',
            description: 'Explicitly define button types to prevent accidental form submission.',
            suggestedAction: 'Specify type="button" on line 12 in Button.tsx',
            relatedFindingIds: ['FND-8f3b1a20'],
            antiPatternId: 'ANTI-A11Y-002',
          },
        ],
        warnings: [],
        status: 'SUCCESS',
      },
    };
    expect(ProjectAnalysisResultSchema.parse(valid)).toMatchObject(valid);
  });

  it('instantiates and serializes UIForgeError with correct taxonomy', () => {
    const err = new UIForgeError({
      code: ErrorCode.ERR_SECURITY_PATH_TRAVERSAL,
      category: ErrorCategory.SECURITY,
      message: 'Access denied: path traverses outside root',
      fatal: true,
      remediationHint: 'Pass a relative path located within rootPath',
    });

    expect(err.name).toBe('UIForgeError');
    expect(err.code).toBe('ERR-SECURITY-PATH_TRAVERSAL');
    expect(err.category).toBe('SECURITY');
    expect(err.fatal).toBe(true);

    const json = err.toJSON();
    expect(json.code).toBe('ERR-SECURITY-PATH_TRAVERSAL');
    expect(json.remediationHint).toBe('Pass a relative path located within rootPath');
  });
});
