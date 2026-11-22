import { type ProjectAnalysisResult } from '@uiforge/contracts';

export class MarkdownReporter {
  /**
   * Generates a comprehensive, human-readable GitHub Flavored Markdown analysis report.
   */
  public generate(result: ProjectAnalysisResult): string {
    const { analysis, execution } = result;
    const { projectIdentity, architecture, signals, git, coverage, findings, recommendations, warnings } = analysis;

    const lines: string[] = [];

    // Header
    lines.push('# UIForge Project Analysis Report');
    lines.push(`## Architectural Intelligence, Framework Detection & Ergonomic Quality Audit`);
    lines.push('');
    lines.push(`- **Project Name:** \`${projectIdentity.name}\``);
    lines.push(`- **Analyzer Version:** \`${execution.analyzerVersion}\``);
    lines.push(`- **Analysis Status:** \`${analysis.status}\``);
    lines.push(`- **Execution Duration:** \`${execution.durationMs}ms\``);
    if (projectIdentity.workspace.targetApplication) {
      lines.push(`- **Target Application (Isolated):** \`${projectIdentity.workspace.targetApplication}\``);
    }
    lines.push('');
    lines.push('---');
    lines.push('');

    // 1. Executive Summary & Identity
    lines.push('## 1. Project Identity & Technology Stack');
    lines.push('');
    lines.push('| Dimension | Value | Confidence | Evidence / Details |');
    lines.push('| :--- | :--- | :---: | :--- |');
    lines.push(`| **Framework** | \`${projectIdentity.framework.name}\` (v${projectIdentity.framework.version}) | \`${projectIdentity.framework.confidence}\` | ${projectIdentity.framework.evidence.join(', ') || 'N/A'} |`);
    lines.push(`| **Router Architecture** | \`${projectIdentity.framework.router}\` | \`${projectIdentity.framework.confidence}\` | ${architecture.routes.length} routes detected |`);
    lines.push(`| **Primary Language** | \`${projectIdentity.language.primary}\` | \`CONFIRMED\` | tsconfig: ${projectIdentity.language.hasTsConfig ? 'Yes' : 'No'}, strict: ${projectIdentity.language.strictMode ?? 'N/A'} |`);
    lines.push(`| **Runtime Environment** | \`${projectIdentity.runtime.detected}\` | \`${projectIdentity.runtime.confidence}\` | ${projectIdentity.runtime.versionConstraint ?? 'default'} |`);
    lines.push(`| **Package Manager** | \`${projectIdentity.packageManager.name}\` | \`CONFIRMED\` | Lockfile: ${projectIdentity.packageManager.lockfilePresent ? `Yes (\`${projectIdentity.packageManager.lockfilePath}\`)` : 'None'} |`);
    lines.push(`| **Monorepo Structure** | \`${projectIdentity.workspace.isMonorepo ? 'Yes (' + projectIdentity.workspace.type + ')' : 'Single Application'}\` | \`CONFIRMED\` | Packages/Apps: ${projectIdentity.workspace.packagesCount} |`);
    lines.push('');

    if (projectIdentity.framework.limitations) {
      lines.push(`> [!NOTE] Framework Boundary: ${projectIdentity.framework.limitations}`);
      lines.push('');
    }

    // 2. Routing Architecture
    lines.push('## 2. Discovered Routes & Page Architecture');
    lines.push('');
    if (architecture.routes.length === 0) {
      lines.push('*No static or file-system routes detected in this project.*');
    } else {
      lines.push('| Route Path | Router Type | Route Kind | Source File | Dynamic Segments |');
      lines.push('| :--- | :--- | :--- | :--- | :---: |');
      for (const r of architecture.routes.slice(0, 20)) {
        lines.push(`| \`${r.routePath}\` | \`${r.routerType}\` | \`${r.type}\` | \`${r.filePath}\` | ${r.hasDynamicSegments ? 'Yes' : 'No'} |`);
      }
      if (architecture.routes.length > 20) {
        lines.push(`| *...and ${architecture.routes.length - 20} additional routes* | | | | |`);
      }
    }
    lines.push('');

    // 3. Components & UI Inventory
    lines.push('## 3. Component Census & Architecture');
    lines.push('');
    lines.push(`- **Total Detected Components:** ${architecture.components.length}`);
    lines.push('');
    if (architecture.components.length > 0) {
      lines.push('| Component Name | Export Type | Props Interface | Source File | Inline Styles |');
      lines.push('| :--- | :--- | :--- | :--- | :---: |');
      for (const c of architecture.components.slice(0, 15)) {
        lines.push(`| \`<${c.name} />\` | \`${c.exportType}\` | \`${c.propsInterface ?? 'None'}\` | \`${c.filePath}\` | ${c.hasInlineStyles ? 'Yes' : 'No'} |`);
      }
      if (architecture.components.length > 15) {
        lines.push(`| *...and ${architecture.components.length - 15} additional components* | | | | |`);
      }
    }
    lines.push('');

    // 4. Styling & Design System Profile
    lines.push('## 4. Styling & Design Tokens Architecture');
    lines.push('');
    lines.push(`- **Styling Engine:** \`${architecture.styling.primaryEngine}\` ${architecture.styling.tailwindVersion !== 'none' ? `(${architecture.styling.tailwindVersion})` : ''}`);
    lines.push(`- **CSS Variables Count:** ${architecture.styling.cssVariablesCount}`);
    lines.push(`- **Design System Indicators:** ${architecture.styling.detectedDesignSystems.join(', ') || 'None detected'}`);
    lines.push(`- **Icon Libraries:** ${architecture.styling.iconLibraries.join(', ') || 'None detected'}`);
    lines.push(`- **Dedicated Token Files:** ${architecture.styling.tokenFiles.join(', ') || 'None'}`);
    lines.push('');

    // 5. Quality & Ergonomic Signals
    lines.push('## 5. Quality Signals & Ergonomic Health');
    lines.push('');
    lines.push('### 5.1 Responsive Design Signals');
    lines.push(`- **Viewport Meta Present:** ${signals.responsive.hasViewportMeta ? 'Yes' : 'No'}`);
    lines.push(`- **CSS Media Queries Detected:** ${signals.responsive.mediaQueriesCount}`);
    lines.push(`- **Tailwind Responsive Utility Classes:** ${signals.responsive.responsiveUtilityClassesCount}`);
    lines.push('');

    lines.push('### 5.2 Accessibility Signals (Observations, Not Compliance Claims)');
    lines.push(`- **Semantic HTML Elements Count:** ${signals.accessibility.semanticElementsCount}`);
    lines.push(`- **Explicit ARIA Attributes Count:** ${signals.accessibility.ariaAttributesCount}`);
    lines.push(`- **Interactive Div Buttons Without Semantics:** ${signals.accessibility.divButtonsCount}`);
    lines.push(`- **Buttons Missing Explicit Type Attribute:** ${signals.accessibility.buttonsWithoutTypeCount}`);
    lines.push(`- **Images Missing Alt Attribute:** ${signals.accessibility.imagesWithoutAltCount}`);
    lines.push('');

    lines.push('### 5.3 Hardcoded Design Values (Token Hygiene)');
    lines.push(`- **Hardcoded Color Literals:** ${signals.designTokens.colorLiteralsCount}`);
    lines.push(`- **Hardcoded Spacing Literals:** ${signals.designTokens.spacingLiteralsCount}`);
    if (signals.designTokens.samples.length > 0) {
      lines.push(`- **Sample Hardcoded Literals:** \`${signals.designTokens.samples.join('`, `')}\``);
    }
    lines.push('');

    // 6. Actionable Findings (Phase 05 Anti-Patterns)
    lines.push('## 6. Actionable Findings & Anti-Pattern Indicators');
    lines.push('');
    if (findings.length === 0) {
      lines.push('*Zero high-priority design or accessibility anti-patterns detected.*');
    } else {
      lines.push('| ID | Category | Nature | Severity | Anti-Pattern | Title & Location |');
      lines.push('| :--- | :--- | :--- | :--- | :--- | :--- |');
      for (const f of findings.slice(0, 20)) {
        const loc = `${f.location.filePath}${f.location.line ? `:${f.location.line}` : ''}`;
        lines.push(`| \`${f.id}\` | \`${f.category}\` | \`${f.nature}\` | \`${f.severity}\` | \`${f.antiPatternId ?? 'N/A'}\` | **${f.title}**<br>\`${loc}\` |`);
      }
      if (findings.length > 20) {
        lines.push(`| *...and ${findings.length - 20} additional findings* | | | | | |`);
      }
    }
    lines.push('');

    // 7. Actionable Recommendations
    lines.push('## 7. Prioritized Recommendations');
    lines.push('');
    if (recommendations.length === 0) {
      lines.push('*Project conforms well to baseline architectural and token standards.*');
    } else {
      for (const r of recommendations) {
        lines.push(`### [${r.id}] ${r.title}`);
        lines.push(`${r.description}`);
        lines.push('');
        lines.push(`**Suggested Action:** ${r.suggestedAction}`);
        if (r.antiPatternId) {
          lines.push(`**Governing Anti-Pattern:** \`${r.antiPatternId}\``);
        }
        lines.push('');
      }
    }

    // 8. Filesystem Safety & Scan Coverage
    lines.push('## 8. Filesystem Safety & Scan Coverage');
    lines.push('');
    lines.push(`- **Total Files Scanned:** ${coverage.totalFilesScanned} (Found: ${coverage.totalFilesFound})`);
    lines.push(`- **Total Directories Scanned:** ${coverage.totalDirectoriesScanned}`);
    lines.push(`- **Limits Reached:** ${coverage.limitsHit.length > 0 ? coverage.limitsHit.join(', ') : 'None (Full Scan)'}`);
    lines.push(`- **Skipped Files / Exclusions:** ${coverage.skippedFiles.length}`);
    lines.push('');

    if (coverage.skippedFiles.length > 0) {
      lines.push('| Relative Path | Exclusion Reason | Details |');
      lines.push('| :--- | :--- | :--- |');
      for (const s of coverage.skippedFiles.slice(0, 15)) {
        lines.push(`| \`${s.filePath}\` | \`${s.reason}\` | ${s.detail ?? 'N/A'} |`);
      }
      if (coverage.skippedFiles.length > 15) {
        lines.push(`| *...and ${coverage.skippedFiles.length - 15} additional skipped files* | | |`);
      }
      lines.push('');
    }

    // 9. Git Status (Read-Only)
    lines.push('## 9. Git Worktree Intelligence');
    lines.push('');
    lines.push(`- **Is Git Repository:** ${git.isGitRepository ? 'Yes' : 'No'}`);
    if (git.isGitRepository) {
      lines.push(`- **Current Branch:** \`${git.currentBranch ?? 'detached'}\``);
      lines.push(`- **HEAD Commit:** \`${git.headCommit?.slice(0, 8) ?? 'N/A'}\``);
      lines.push(`- **Worktree Clean Status:** ${git.isWorktreeDirty ? 'Dirty (Uncommitted modifications)' : 'Clean'}`);
      if (git.isWorktreeDirty) {
        lines.push(`  - Modified files: ${git.modifiedFilesCount ?? 0}`);
        lines.push(`  - Untracked files: ${git.untrackedFilesCount ?? 0}`);
      }
    }
    lines.push('');

    if (warnings.length > 0) {
      lines.push('## 10. Scan Warnings');
      lines.push('');
      for (const w of warnings) {
        lines.push(`- ${w}`);
      }
      lines.push('');
    }

    return lines.join('\n');
  }
}
