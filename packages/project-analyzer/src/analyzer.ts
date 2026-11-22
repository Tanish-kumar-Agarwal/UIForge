import * as path from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  type AnalysisRun,
  type ProjectAnalysisResult,
  AnalysisRunSchema,
  ProjectAnalysisResultSchema,
  UIForgeError,
  ErrorCode,
  ErrorCategory,
} from '@uiforge/contracts';

import { SecurityBoundaryManager, type SecurityOptions } from './security.js';
import { WorkspaceManager } from './workspace.js';
import { TechnologyDetector } from './detector.js';
import { AstSourceAnalyzer } from './ast-analyzer.js';
import { QualityEvaluator } from './quality.js';
import { MarkdownReporter } from './reporter.js';

export interface ProjectAnalysisOptions extends SecurityOptions {
  rootPath: string;
  projectId?: string;
  targetApplication?: string;
}

export class ProjectAnalyzer {
  private readonly rawRootPath: string;
  private readonly projectId: string;
  private readonly targetApplication?: string;
  private readonly options: ProjectAnalysisOptions;
  private securityInstance?: SecurityBoundaryManager;
  private workspaceInstance?: WorkspaceManager;

  constructor(options: ProjectAnalysisOptions) {
    if (!options.rootPath) {
      throw new UIForgeError({
        code: ErrorCode.ERR_VALIDATION_SCHEMA_MISMATCH,
        category: ErrorCategory.VALIDATION,
        message: 'rootPath must be provided for project analysis',
      });
    }

    this.rawRootPath = options.rootPath;
    this.projectId = options.projectId ?? randomUUID();
    this.targetApplication = options.targetApplication;
    this.options = options;
  }

  private getSecurity(): SecurityBoundaryManager {
    if (!this.securityInstance) {
      this.securityInstance = new SecurityBoundaryManager(this.rawRootPath, this.options);
    }
    return this.securityInstance;
  }

  private getWorkspace(): WorkspaceManager {
    if (!this.workspaceInstance) {
      const sec = this.getSecurity();
      this.workspaceInstance = new WorkspaceManager(sec.canonicalRoot, sec);
    }
    return this.workspaceInstance;
  }

  /**
   * Primary comprehensive analysis engine.
   * Produces a deterministic, validated ProjectAnalysisResult conforming to Contract 29.
   */
  public async analyze(): Promise<ProjectAnalysisResult> {
    const startTime = performance.now();
    const warnings: string[] = [];
    const security = this.getSecurity();
    const workspace = this.getWorkspace();

    // 1. Filesystem Crawl & Discovery
    const discoveredFiles = workspace.crawlFiles(this.targetApplication);

    // 2. Package Manager & Lockfile Detection
    const packageManager = workspace.detectPackageManager();

    // 3. Workspace / Monorepo Detection
    const workspaceMeta = workspace.detectWorkspace(this.targetApplication);

    // 4. Dependencies & Tooling
    const dependencyAnalysis = workspace.analyzeDependencies();
    warnings.push(...dependencyAnalysis.warnings);

    // 5. Framework & Technology Detection
    const detector = new TechnologyDetector(
      security.canonicalRoot,
      discoveredFiles,
      dependencyAnalysis,
    );
    const framework = detector.detectFramework();
    const language = detector.detectLanguage();
    const runtime = detector.detectRuntime();
    const styling = detector.detectStyling();

    // 6. TypeScript Compiler API AST Source Analysis
    const astAnalyzer = new AstSourceAnalyzer(security.canonicalRoot, security);
    const astResult = astAnalyzer.analyzeSources(
      discoveredFiles.allSourceFiles,
      this.targetApplication,
    );
    warnings.push(...astResult.parseWarnings);

    // 7. Quality Signals & Recommendations
    const qualityEvaluator = new QualityEvaluator();
    const recommendations = qualityEvaluator.generateRecommendations(
      astResult.findings,
      styling,
      astResult.accessibilitySignals,
      astResult.hardcodedValues,
      packageManager,
    );

    // 8. Read-Only Git Intelligence
    const git = workspace.inspectGit();

    const durationMs = Math.round(performance.now() - startTime);

    // Derive project name from directory or package.json
    let projectName = path.basename(security.canonicalRoot);
    if (dependencyAnalysis.direct['name']) {
      projectName = dependencyAnalysis.direct['name'];
    }

    // Determine status
    let status: 'SUCCESS' | 'PARTIAL' | 'FAILED' = 'SUCCESS';
    if (discoveredFiles.limitsHit.length > 0) {
      status = 'PARTIAL';
      warnings.push(`Scan limits reached: ${discoveredFiles.limitsHit.join(', ')}`);
    }

    // Compile result conforming to Contract 29 (uiforge.contract.project-analysis.v1)
    const result: ProjectAnalysisResult = {
      $schema: 'https://schemas.uiforge.dev/v1/project-analysis.json',
      execution: {
        analysisId: randomUUID(),
        timestamp: new Date().toISOString(),
        durationMs,
        analyzerVersion: '0.2.0',
        environment: {
          nodeVersion: process.version,
          platform: process.platform,
        },
      },
      analysis: {
        projectIdentity: {
          name: projectName,
          framework,
          language,
          runtime,
          packageManager,
          workspace: workspaceMeta,
          monorepoApp: this.targetApplication,
        },
        dependencies: {
          direct: dependencyAnalysis.direct,
          devDependencies: dependencyAnalysis.devDependencies,
          scripts: dependencyAnalysis.scripts,
          tools: dependencyAnalysis.tools,
        },
        architecture: {
          routes: astResult.routes,
          components: astResult.components,
          styling,
        },
        signals: {
          responsive: astResult.responsiveSignals,
          accessibility: astResult.accessibilitySignals,
          designTokens: astResult.hardcodedValues,
        },
        git,
        coverage: discoveredFiles.coverage,
        findings: astResult.findings,
        recommendations,
        warnings: Array.from(new Set(warnings)).sort(),
        status,
      },
    };

    return ProjectAnalysisResultSchema.parse(result);
  }

  /**
   * Generates a comprehensive human-readable Markdown analysis report.
   */
  public async generateReport(): Promise<string> {
    const analysisResult = await this.analyze();
    const reporter = new MarkdownReporter();
    return reporter.generate(analysisResult);
  }

  /**
   * Backwards-compatible scan() method returning Contract 10 AnalysisRun.
   */
  public async scan(): Promise<AnalysisRun> {
    const fullResult = await this.analyze();
    const { analysis, execution } = fullResult;

    const run: AnalysisRun = {
      analysisId: execution.analysisId,
      projectId: this.projectId,
      timestamp: execution.timestamp,
      analyzerVersion: execution.analyzerVersion,
      detectedFramework: analysis.projectIdentity.framework.name,
      detectedRouter: analysis.projectIdentity.framework.router,
      stylingStrategy: analysis.architecture.styling.primaryEngine,
      componentCount: analysis.architecture.components.length,
      routeCount: analysis.architecture.routes.length,
      durationMs: execution.durationMs,
      status: analysis.status,
      warnings: analysis.warnings,
    };

    return AnalysisRunSchema.parse(run);
  }
}
