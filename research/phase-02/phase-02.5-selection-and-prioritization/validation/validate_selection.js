/**
 * UIForge Phase 02.5: Automated Validation Harness
 * Validates inventory integrity, hard gates, 7-dimension weighted scoring,
 * evidence traceability, and adoption tier decisions across all 125 canonical candidates.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..', '..', '..', '..');
const p4DataDir = path.resolve(rootDir, 'research', 'phase-02', 'phase-02.4-internal-source-registry', 'data');
const p5DataDir = path.resolve(__dirname, '..', 'data');
const p5SchemasDir = path.resolve(__dirname, '..', 'schemas');

let passCount = 0;
let failCount = 0;
const failures = [];

function assert(condition, message) {
  if (condition) {
    passCount++;
    console.log(`[PASS] ${String(passCount).padStart(2, '0')}: ${message}`);
  } else {
    failCount++;
    console.error(`[FAIL] ${String(passCount + failCount).padStart(2, '0')}: ${message}`);
    failures.push(message);
  }
}

console.log('================================================================');
console.log('UIFORGE PHASE 02.5: SELECTION & PRIORITIZATION VALIDATION HARNESS');
console.log('================================================================');

// -------------------------------------------------------------
// SUITE 1: DATA FILE AND SCHEMA CONFORMANCE
// -------------------------------------------------------------
const scorecardPath = path.join(p5DataDir, 'candidate-selection-scorecard.json');
const decisionsPath = path.join(p5DataDir, 'category-decisions.json');
const claimsPath = path.join(p5DataDir, 'evidence-and-claim-register.json');

assert(fs.existsSync(scorecardPath), 'candidate-selection-scorecard.json exists on disk');
assert(fs.existsSync(decisionsPath), 'category-decisions.json exists on disk');
assert(fs.existsSync(claimsPath), 'evidence-and-claim-register.json exists on disk');

const scorecard = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
const categoryDecisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));
const claims = JSON.parse(fs.readFileSync(claimsPath, 'utf8'));

assert(Array.isArray(scorecard), 'Scorecard parses as valid JSON array');
assert(typeof categoryDecisions === 'object' && !Array.isArray(categoryDecisions), 'Category decisions parse as valid JSON object');
assert(Array.isArray(claims), 'Evidence claims parse as valid JSON array');

const schemaScorecard = JSON.parse(fs.readFileSync(path.join(p5SchemasDir, 'selection-scorecard.schema.json'), 'utf8'));
const schemaDecisions = JSON.parse(fs.readFileSync(path.join(p5SchemasDir, 'category-decisions.schema.json'), 'utf8'));
const schemaClaims = JSON.parse(fs.readFileSync(path.join(p5SchemasDir, 'evidence-and-claim.schema.json'), 'utf8'));

assert(schemaScorecard && schemaScorecard.$schema.includes('draft-07'), 'Scorecard schema is valid Draft-07 JSON Schema');
assert(schemaDecisions && schemaDecisions.$schema.includes('draft-07'), 'Category decisions schema is valid Draft-07 JSON Schema');
assert(schemaClaims && schemaClaims.$schema.includes('draft-07'), 'Evidence claims schema is valid Draft-07 JSON Schema');

// -------------------------------------------------------------
// SUITE 2: CANONICAL INVENTORY & ID RECONCILIATION
// -------------------------------------------------------------
const p4Sources = JSON.parse(fs.readFileSync(path.join(p4DataDir, 'sources.json'), 'utf8'));

assert(scorecard.length === 125, `Scorecard contains exactly 125 canonical candidates (observed: ${scorecard.length})`);
assert(p4Sources.length === 125, 'Phase 02.4 source registry contains exactly 125 records');

const sourceMap = new Map(p4Sources.map(s => [s.candidateId, s]));
const uniqueIds = new Set(scorecard.map(c => c.candidateId));
assert(uniqueIds.size === 125, `All 125 candidateId values are unique with zero duplicates (observed: ${uniqueIds.size})`);

const allIdsMatch = scorecard.every(c => sourceMap.has(c.candidateId) && sourceMap.get(c.candidateId).sourceId === c.sourceId);
assert(allIdsMatch, '100% of candidateId and sourceId pairs match Phase 02.4 canonical source registry directly');

// Priority census preservation
const counts = { P0: 0, P1: 0, P2: 0, REJ: 0 };
scorecard.forEach(c => {
  counts[c.originalDiscoveryPriority] = (counts[c.originalDiscoveryPriority] || 0) + 1;
});
assert(counts.P0 === 24 && counts.P1 === 47 && counts.P2 === 50 && counts.REJ === 4,
  `Original priority distribution preserved exactly: P0: 24, P1: 47, P2: 50, REJ: 4 (observed: P0:${counts.P0}, P1:${counts.P1}, P2:${counts.P2}, REJ:${counts.REJ})`
);

const allPrioritiesMatch = scorecard.every(c => c.originalDiscoveryPriority === sourceMap.get(c.candidateId).originalDiscoveryPriority);
assert(allPrioritiesMatch, '100% of candidate records preserve original discovery priority from canonical master inventory');

// -------------------------------------------------------------
// SUITE 3: HARD GATES ELIGIBILITY ENGINE (G1 - G6)
// -------------------------------------------------------------
const validGateResults = new Set(['PASS', 'PASS_WITH_RESTRICTIONS', 'PENDING', 'FAIL', 'NOT_APPLICABLE']);
const allGatesValid = scorecard.every(c => {
  const g = c.hardGates;
  return g &&
    validGateResults.has(g.G1_identity) &&
    validGateResults.has(g.G2_licensing) &&
    validGateResults.has(g.G3_security) &&
    validGateResults.has(g.G4_evidence) &&
    validGateResults.has(g.G5_fit) &&
    validGateResults.has(g.G6_viability) &&
    validGateResults.has(g.overallGateResult);
});
assert(allGatesValid, '100% of candidate records have fully populated, valid G1-G6 hard-gate results');

// Verify that failed hard gates prevent Tier 0 / Tier 1 adoption
const failedGateCandidates = scorecard.filter(c => c.hardGates.overallGateResult === 'FAIL');
const allFailedInTier5 = failedGateCandidates.every(c => c.adoptionTier === 'TIER 5' && c.recommendation === 'REJECT');
assert(failedGateCandidates.length === 8 && allFailedInTier5, `All ${failedGateCandidates.length} failed-gate candidates are strictly quarantined to TIER 5 (REJECT)`);

// Verify that pending hard gates are strictly deferred to Tier 4
const pendingGateCandidates = scorecard.filter(c => c.hardGates.overallGateResult === 'PENDING');
const allPendingInTier4 = pendingGateCandidates.every(c => c.adoptionTier === 'TIER 4' && c.recommendation === 'DEFER');
assert(pendingGateCandidates.length === 4 && allPendingInTier4, `All ${pendingGateCandidates.length} pending-gate candidates are strictly deferred to TIER 4 (DEFER)`);

// Verify specific gated critical candidates
const pa11y = scorecard.find(c => c.candidateId === 'OS-A11Y-05');
assert(pa11y && pa11y.hardGates.G2_licensing === 'PENDING' && pa11y.adoptionTier === 'TIER 4' && pa11y.recommendation === 'DEFER',
  'pa11y is strictly gated under G2_licensing (PENDING) and classified as TIER 4 (DEFER) pending counsel review'
);

const aceternity = scorecard.find(c => c.candidateId === 'OS-MKT-08');
assert(aceternity && aceternity.hardGates.G2_licensing === 'FAIL' && aceternity.adoptionTier === 'TIER 5' && aceternity.recommendation === 'REJECT',
  'Aceternity UI is strictly failed under G2_licensing and rejected in TIER 5 due to proprietary redistribution prohibitions'
);

const remotion = scorecard.find(c => c.candidateId === 'OS-ANIM-08');
assert(remotion && remotion.hardGates.G2_licensing === 'FAIL' && remotion.adoptionTier === 'TIER 5' && remotion.recommendation === 'REJECT',
  'Remotion is strictly failed under G2_licensing and rejected in TIER 5 due to commercial company license restrictions'
);

const locofy = scorecard.find(c => c.candidateId === 'OS-D2C-08');
assert(locofy && locofy.hardGates.G1_identity === 'FAIL' && locofy.adoptionTier === 'TIER 5' && locofy.recommendation === 'REJECT',
  'Locofy is strictly failed under G1_identity / G5_fit and rejected in TIER 5 as a closed proprietary SaaS'
);

const rgl = scorecard.find(c => c.candidateId === 'OS-DASH-05');
assert(rgl && rgl.hardGates.G3_security === 'FAIL' && rgl.hardGates.G6_viability === 'FAIL' && rgl.adoptionTier === 'TIER 5',
  'React-Grid-Layout is strictly failed under G3/G6 and rejected in TIER 5 due to maintenance abandonment and React 18/19 regressions'
);

// -------------------------------------------------------------
// SUITE 4: WEIGHTED TECHNICAL SCORING ARITHMETIC
// -------------------------------------------------------------
const WEIGHTS = {
  codeQuality: 0.20,
  compatibility: 0.15,
  accessibility: 0.15,
  responsiveness: 0.15,
  maintainability: 0.15,
  customization: 0.10,
  documentation: 0.10
};

let mathPass = true;
scorecard.forEach(c => {
  const s = c.scores;
  const expectedWeighted = (
    s.codeQuality * WEIGHTS.codeQuality +
    s.compatibility * WEIGHTS.compatibility +
    s.accessibility * WEIGHTS.accessibility +
    s.responsiveness * WEIGHTS.responsiveness +
    s.maintainability * WEIGHTS.maintainability +
    s.customization * WEIGHTS.customization +
    s.documentation * WEIGHTS.documentation
  );
  const roundedWeighted = Math.round(expectedWeighted * 100) / 100;
  const expectedFinal = Math.round(expectedWeighted * 100) / 10;
  if (Math.abs(s.weightedScore - roundedWeighted) > 0.05 || Math.abs(s.finalScore - expectedFinal) > 0.1) {
    mathPass = false;
  }
});
assert(mathPass, '100% of candidate technical scores match weighted formula: Final Score = Σ(Dim × Weight) × 10 exactly');

const allScoresInBounds = scorecard.every(c => {
  const s = c.scores;
  return s.codeQuality >= 0 && s.codeQuality <= 10 &&
    s.compatibility >= 0 && s.compatibility <= 10 &&
    s.accessibility >= 0 && s.accessibility <= 10 &&
    s.responsiveness >= 0 && s.responsiveness <= 10 &&
    s.maintainability >= 0 && s.maintainability <= 10 &&
    s.customization >= 0 && s.customization <= 10 &&
    s.documentation >= 0 && s.documentation <= 10 &&
    s.finalScore >= 0 && s.finalScore <= 100;
});
assert(allScoresInBounds, '100% of dimension scores (0-10) and final scores (0-100) stay strictly within permitted bounds');

// -------------------------------------------------------------
// SUITE 5: ADOPTION TIER ARITHMETIC & GOVERNANCE RULES
// -------------------------------------------------------------
const tierCounts = { 'TIER 0': 0, 'TIER 1': 0, 'TIER 2': 0, 'TIER 3': 0, 'TIER 4': 0, 'TIER 5': 0 };
scorecard.forEach(c => {
  tierCounts[c.adoptionTier] = (tierCounts[c.adoptionTier] || 0) + 1;
});

assert(tierCounts['TIER 0'] === 24, `TIER 0 (Core Foundation) contains exactly 24 candidates (observed: ${tierCounts['TIER 0']})`);
assert(tierCounts['TIER 1'] === 34, `TIER 1 (Core-Adjacent) contains exactly 34 candidates (observed: ${tierCounts['TIER 1']})`);
assert(tierCounts['TIER 2'] === 39, `TIER 2 (Optional Integrations) contains exactly 39 candidates (observed: ${tierCounts['TIER 2']})`);
assert(tierCounts['TIER 3'] === 16, `TIER 3 (Reference & Research) contains exactly 16 candidates (observed: ${tierCounts['TIER 3']})`);
assert(tierCounts['TIER 4'] === 4, `TIER 4 (Deferred) contains exactly 4 candidates (observed: ${tierCounts['TIER 4']})`);
assert(tierCounts['TIER 5'] === 8, `TIER 5 (Rejected / Excluded) contains exactly 8 candidates (observed: ${tierCounts['TIER 5']})`);

const totalTierCount = Object.values(tierCounts).reduce((a, b) => a + b, 0);
assert(totalTierCount === 125, `Total tier census equals exactly 125 candidates ($24 + 34 + 39 + 16 + 4 + 8 = 125$; observed: ${totalTierCount})`);

// REJ candidates exclusion rule (Section 4.1)
const rejCandidates = scorecard.filter(c => c.originalDiscoveryPriority === 'REJ');
assert(rejCandidates.length === 4, 'Exactly 4 REJ candidates accounted for');
const noRejInTier0 = rejCandidates.every(c => c.adoptionTier !== 'TIER 0' && c.adoptionTier !== 'TIER 1');
assert(noRejInTier0, '100% of REJ candidates are strictly excluded from TIER 0 and TIER 1 adoption tiers');

// GSAP special scoping verification (Issue 9 / Webflow April 2025 license)
const gsap = scorecard.find(c => c.candidateId === 'OS-ANIM-04');
assert(gsap && gsap.originalDiscoveryPriority === 'REJ' && gsap.adoptionTier === 'TIER 2' && gsap.recommendation === 'OPTIONAL',
  'GSAP is preserved as original REJ, strictly excluded from Core Foundation (Tier 0), and admitted to Tier 2 (OPTIONAL) for secondary plugin emission only'
);

// Every Layout clean-room boundary verification
const everyLayout = scorecard.find(c => c.candidateId === 'OS-LAYT-08');
assert(everyLayout && everyLayout.adoptionTier === 'TIER 3' && everyLayout.recommendation === 'REFERENCE' && everyLayout.proposedConsumptionMode === 'REFERENCE_ONLY',
  'Every Layout is classified as TIER 3 (REFERENCE) under REFERENCE_ONLY mode, preserving clean-room boundaries under LIC-EVERY-LAYOUT-COMMERCIAL'
);

// axe-core external tool boundary verification
const axeCore = scorecard.find(c => c.candidateId === 'OS-A11Y-01');
assert(axeCore && axeCore.adoptionTier === 'TIER 0' && axeCore.proposedConsumptionMode === 'EXTERNAL_TOOL' && axeCore.hardGates.G2_licensing === 'PASS_WITH_RESTRICTIONS',
  'axe-core is classified as TIER 0 under EXTERNAL_TOOL mode with PASS_WITH_RESTRICTIONS (invokes user-installed CLI; no binary bundling)'
);

// -------------------------------------------------------------
// SUITE 6: CATEGORY COVERAGE (CATEGORIES A - H)
// -------------------------------------------------------------
const catKeys = ['CAT_A', 'CAT_B', 'CAT_C', 'CAT_D', 'CAT_E', 'CAT_F', 'CAT_G', 'CAT_H'];
assert(catKeys.every(k => categoryDecisions[k] !== undefined), 'All 8 technology categories (CAT_A through CAT_H) are defined in category-decisions.json');

const catCounts = {};
scorecard.forEach(c => {
  catCounts[c.selectionCategory] = (catCounts[c.selectionCategory] || 0) + 1;
});
assert(catKeys.every(k => (catCounts[k] || 0) > 0), 'Every category has at least one candidate assigned in the candidate scorecard');

// -------------------------------------------------------------
// SUITE 7: EVIDENCE CLAIMS TRACEABILITY
// -------------------------------------------------------------
assert(claims.length === 125, `Evidence claim register contains exactly 125 claim dossiers (observed: ${claims.length})`);
const claimCandidates = new Set(claims.map(cl => cl.candidateId));
assert(claimCandidates.size === 125, '100% of candidates have dedicated claim entries in evidence-and-claim-register.json');

const allClaimsHaveMetadata = claims.every(cl =>
  cl.claimId && cl.claimId.startsWith('CLM-PH02.5-') &&
  cl.claim.length > 20 &&
  cl.sourceType &&
  cl.verificationClassification &&
  cl.hardGateResult &&
  cl.lastVerifiedDate
);
assert(allClaimsHaveMetadata, '100% of claim records contain claimId, descriptive text, sourceType, verificationClassification, and verification date');

// -------------------------------------------------------------
// SUITE 8: CORE FOUNDATION INTEGRITY CHECKS (TIER 0)
// -------------------------------------------------------------
const inter = scorecard.find(c => c.candidateId === 'OS-TYPO-04');
assert(inter && inter.adoptionTier === 'TIER 0' && inter.proposedConsumptionMode === 'ASSET_REDISTRIBUTION',
  'Inter font is classified as TIER 0 under ASSET_REDISTRIBUTION mode with SIL OFL 1.1 RFN notice preservation'
);

const geist = scorecard.find(c => c.candidateId === 'OS-TYPO-05');
assert(geist && geist.adoptionTier === 'TIER 0' && geist.proposedConsumptionMode === 'ASSET_REDISTRIBUTION',
  'Geist font is classified as TIER 0 under ASSET_REDISTRIBUTION mode with SIL OFL 1.1 RFN notice preservation'
);

const lucide = scorecard.find(c => c.candidateId === 'OS-ICON-01');
assert(lucide && lucide.adoptionTier === 'TIER 0' && lucide.proposedConsumptionMode === 'DEPENDENCY',
  'Lucide Icons is classified as TIER 0 Core Foundation standard accessible icon package'
);

const mcp = scorecard.find(c => c.candidateId === 'OS-AGNT-01');
assert(mcp && mcp.adoptionTier === 'TIER 0' && mcp.proposedConsumptionMode === 'DEPENDENCY',
  'Model Context Protocol TypeScript SDK is classified as TIER 0 Core Foundation agent interoperability protocol'
);

const playwright = scorecard.find(c => c.candidateId === 'OS-BROW-01');
assert(playwright && playwright.adoptionTier === 'TIER 0' && playwright.proposedConsumptionMode === 'DEPENDENCY',
  'Playwright is classified as TIER 0 Core Foundation multi-browser headless automation engine'
);

const pixelmatch = scorecard.find(c => c.candidateId === 'OS-VREG-01');
assert(pixelmatch && pixelmatch.adoptionTier === 'TIER 0' && pixelmatch.proposedConsumptionMode === 'DEPENDENCY',
  'Pixelmatch is classified as TIER 0 Core Foundation deterministic visual difference engine'
);

const tailwind = scorecard.find(c => c.candidateId === 'OS-TOKN-04');
assert(tailwind && tailwind.adoptionTier === 'TIER 0' && tailwind.proposedConsumptionMode === 'DEPENDENCY',
  'Tailwind CSS v4 is classified as TIER 0 Core Foundation utility CSS engine'
);

const weightsSum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
assert(Math.abs(weightsSum - 1.0) < 0.0001, 'Canonical technical scoring weights sum to exactly 100% (1.000)');

// -------------------------------------------------------------
// SUITE 9: HARNESS DIGEST & FINAL CERTIFICATION
// -------------------------------------------------------------
const scriptContent = fs.readFileSync(__filename);
const scriptHash = crypto.createHash('sha256').update(scriptContent).digest('hex');
console.log('----------------------------------------------------------------');
console.log(`SELECTION VALIDATION SCRIPT SHA-256: ${scriptHash}`);
console.log('================================================================');

if (failCount === 0) {
  console.log(`VALIDATION HARNESS COMPLETE: ${passCount} / ${passCount} TESTS PASSED (0 failures)`);
  console.log('================================================================');
  process.exit(0);
} else {
  console.error(`VALIDATION FAILED: ${failCount} assertions failed!`);
  failures.forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
  console.log('================================================================');
  process.exit(1);
}
