import {
  type AnalysisFinding,
  type AnalysisRecommendation,
  type StylingArchitecture,
  type AccessibilitySignals,
  type HardcodedDesignValues,
  type PackageManagerMetadata,
} from '@uiforge/contracts';

export class QualityEvaluator {
  /**
   * Generates actionable, evidence-linked recommendations referencing Phase 05 Anti-Patterns.
   * Avoids disruptive defaults and does not present false positives as facts.
   */
  public generateRecommendations(
    findings: AnalysisFinding[],
    styling: StylingArchitecture,
    a11y: AccessibilitySignals,
    tokens: HardcodedDesignValues,
    pkgManager: PackageManagerMetadata,
  ): AnalysisRecommendation[] {
    const recs: AnalysisRecommendation[] = [];

    // 1. Interactive div button refactoring (Phase 05 ANTI-A11Y-002)
    const divButtonFindings = findings.filter(
      (f) => f.antiPatternId === 'ANTI-A11Y-002' && f.severity === 'CRITICAL',
    );
    if (divButtonFindings.length > 0) {
      recs.push({
        id: 'REC-A11Y-01',
        title: 'Refactor non-semantic div/span click handlers to native <button> elements',
        description:
          'Detected interactive <div> or <span> elements with click handlers lacking keyboard activation and screen reader semantics (ANTI-A11Y-002, EVID-DOM-003).',
        suggestedAction:
          'Replace <div> elements with <button type="button"> or attach explicit role="button", tabIndex={0}, and onKeyDown handlers.',
        relatedFindingIds: divButtonFindings.map((f) => f.id).sort(),
        antiPatternId: 'ANTI-A11Y-002',
      });
    }

    // 2. Button type attribute recommendation (Non-disruptive signal)
    const buttonTypeFindings = findings.filter(
      (f) => f.nature === 'INFERRED_SIGNAL' && f.title.includes('missing explicit type'),
    );
    if (buttonTypeFindings.length > 0) {
      recs.push({
        id: 'REC-A11Y-02',
        title: 'Specify explicit type attribute on <button> elements',
        description:
          'In standard HTML forms, buttons default to type="submit". Non-submit buttons can cause unintended form triggers.',
        suggestedAction: 'Add type="button" to action buttons to ensure predictable behavior.',
        relatedFindingIds: buttonTypeFindings.map((f) => f.id).sort(),
        antiPatternId: 'ANTI-A11Y-002',
      });
    }

    // 3. Image alt attribute recommendation
    const imgFindings = findings.filter((f) => f.title.includes('Image element missing alt'));
    if (imgFindings.length > 0) {
      recs.push({
        id: 'REC-A11Y-03',
        title: 'Provide meaningful alt attributes on <img> elements',
        description:
          'Images missing alt attributes present critical barriers to screen reader users (WCAG 2.2 SC 1.1.1).',
        suggestedAction: 'Add informative alt="description" or alt="" for purely decorative images.',
        relatedFindingIds: imgFindings.map((f) => f.id).sort(),
      });
    }

    // 4. Hardcoded color & design token consolidation
    if (tokens.colorLiteralsCount >= 5) {
      recs.push({
        id: 'REC-TOK-01',
        title: 'Extract hardcoded color literals into semantic design tokens',
        description:
          `Found ${tokens.colorLiteralsCount} hardcoded color literals in source code. Centralizing them into DTCG-compliant tokens improves themeability and contrast auditing (EVID-TOK-001).`,
        suggestedAction:
          'Extract repeated colors into CSS variables or a centralized tokens.json file using @uiforge/tokens.',
        relatedFindingIds: [],
        antiPatternId: 'ANTI-COL-001',
      });
    }

    // 5. Tailwind v3 considerations (Nuanced, non-disruptive)
    if (styling.primaryEngine === 'tailwind' && styling.tailwindVersion === 'v3') {
      recs.push({
        id: 'REC-STY-01',
        title: 'Evaluate Tailwind CSS v4 upgrade when compatibility allows',
        description:
          'Project uses Tailwind CSS v3. Tailwind v4 introduces a streamlined CSS-first @theme architecture and reduced build overhead.',
        suggestedAction:
          'Review project plugins and dependencies before upgrading. Tailwind v3 remains fully supported and stable; upgrade only when project requirements justify it.',
        relatedFindingIds: [],
      });
    }

    // 6. Missing lockfile warning
    if (!pkgManager.lockfilePresent) {
      recs.push({
        id: 'REC-PKG-01',
        title: 'Generate and commit a package manager lockfile',
        description:
          'No lockfile (pnpm-lock.yaml, package-lock.json, etc.) was detected. Lockfiles ensure reproducible builds across development and CI environments.',
        suggestedAction: 'Run your package manager install command and commit the resulting lockfile.',
        relatedFindingIds: [],
      });
    }

    return recs.sort((a, b) => a.id.localeCompare(b.id));
  }
}
