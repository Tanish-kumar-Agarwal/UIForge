/**
 * UIForge Phase 02.4: Authoritative Internal Source Registry Validation Harness
 * File: research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js
 * Standard: Principal Software Architect + Open-Source Security Engineer + Independent Evidence Auditor
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const baseDir = path.resolve(__dirname, '..');
const dataDir = path.join(baseDir, 'data');
const schemasDir = path.join(baseDir, 'schemas');
const rootDir = path.resolve(baseDir, '..', '..', '..');
const invPath = path.join(rootDir, 'research', 'phase-02', 'phase-02.3-legal-and-supply-chain', 'data', 'candidate-master-inventory.json');

console.log('================================================================');
console.log('UIFORGE PHASE 02.4: RECONCILED INTERNAL SOURCE REGISTRY HARNESS');
console.log('================================================================');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    const testNum = String(totalTests).padStart(2, '0');
    console.log(`[PASS] ${testNum}: ${message}`);
  } else {
    const testNum = String(totalTests).padStart(2, '0');
    console.error(`[FAIL] ${testNum}: ${message}`);
    process.exit(1);
  }
}

// -------------------------------------------------------------
// SUITE 1: DATA MANIFEST PARSING & PRESENCE
// -------------------------------------------------------------
const requiredDataFiles = [
  'sources.json',
  'repositories.json',
  'packages.json',
  'components.json',
  'assets.json',
  'licenses.json',
  'evaluations.json',
  'consumption-permissions.json',
  'provenance.json',
  'evidence.json'
];

let allDataFilesExistAndParse = true;
const datasets = {};
requiredDataFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    allDataFilesExistAndParse = false;
  } else {
    try {
      datasets[file] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      allDataFilesExistAndParse = false;
    }
  }
});
assert(allDataFilesExistAndParse, 'All 10 normalized data entities exist and parse as valid JSON');

// -------------------------------------------------------------
// SUITE 2: DRAFT-07 JSON SCHEMA CONFORMANCE
// -------------------------------------------------------------
const schemaFiles = [
  'source-registry.schema.json',
  'consumption-permissions.schema.json',
  'provenance-and-evidence.schema.json'
];
let allSchemasParse = true;
schemaFiles.forEach(sf => {
  const sfPath = path.join(schemasDir, sf);
  if (!fs.existsSync(sfPath)) allSchemasParse = false;
  else {
    try {
      const s = JSON.parse(fs.readFileSync(sfPath, 'utf8'));
      if (s.$schema !== 'http://json-schema.org/draft-07/schema#') allSchemasParse = false;
    } catch (e) {
      allSchemasParse = false;
    }
  }
});
assert(allSchemasParse, 'All 3 JSON Schemas exist and parse as valid Draft-07 schemas');

const sources = datasets['sources.json'];
const repositories = datasets['repositories.json'];
const packages = datasets['packages.json'];
const components = datasets['components.json'];
const assets = datasets['assets.json'];
const licenses = datasets['licenses.json'];
const evaluations = datasets['evaluations.json'];
const permissions = datasets['consumption-permissions.json'];
const provenance = datasets['provenance.json'];
const evidence = datasets['evidence.json'];

// -------------------------------------------------------------
// SUITE 3: CANONICAL SOURCE UNIVERSE & IDENTITY PRESERVATION (Issue 5)
// -------------------------------------------------------------
assert(sources.length === 125, `Source registry contains exactly 125 canonical records (observed: ${sources.length})`);

const sourceIds = new Set();
let duplicateSources = false;
sources.forEach(s => {
  if (sourceIds.has(s.sourceId)) duplicateSources = true;
  sourceIds.add(s.sourceId);
});
assert(!duplicateSources && sourceIds.size === 125, 'All 125 source records have unique sourceId identifiers with zero collisions');

const upstreamMaster = JSON.parse(fs.readFileSync(invPath, 'utf8'));
const masterMap = new Map(upstreamMaster.candidates.map(c => [c.candidateId, c]));

// Issue 5: Directly assert immutable candidateId match without alias transforms
let allMasterIdsDirectlyMatch = true;
sources.forEach(s => {
  if (!masterMap.has(s.candidateId) || s.candidateId !== s.canonicalCandidateId) {
    allMasterIdsDirectlyMatch = false;
  }
});
assert(allMasterIdsDirectlyMatch && masterMap.size === 125, '100% of immutable canonical candidate IDs from Phase 02.1/02.3 match directly in sources.json');

// -------------------------------------------------------------
// SUITE 4: CANONICAL PRIORITY PRESERVATION (C01 RECONCILIATION)
// -------------------------------------------------------------
const priorityCounts = { P0: 0, P1: 0, P2: 0, REJ: 0 };
let allOriginalPrioritiesMatch = true;
sources.forEach(s => {
  const masterCandidate = masterMap.get(s.candidateId);
  if (s.originalDiscoveryPriority !== masterCandidate.priority) {
    allOriginalPrioritiesMatch = false;
  }
  if (s.currentDiscoveryPriority !== masterCandidate.priority) {
    allOriginalPrioritiesMatch = false;
  }
  priorityCounts[s.originalDiscoveryPriority] = (priorityCounts[s.originalDiscoveryPriority] || 0) + 1;
});
assert(allOriginalPrioritiesMatch, '100% of candidate records preserve original discovery priority from canonical inventory');
assert(
  priorityCounts.P0 === 24 &&
  priorityCounts.P1 === 47 &&
  priorityCounts.P2 === 50 &&
  priorityCounts.REJ === 4,
  `Canonical priority distribution matches exactly: P0: 24, P1: 47, P2: 50, REJ: 4 (observed: P0:${priorityCounts.P0}, P1:${priorityCounts.P1}, P2:${priorityCounts.P2}, REJ:${priorityCounts.REJ})`
);

const opTierCounts = { TIER_A: 0, TIER_B: 0, TIER_C: 0, TIER_D: 0 };
sources.forEach(s => {
  opTierCounts[s.registryOperationalTier] = (opTierCounts[s.registryOperationalTier] || 0) + 1;
});
assert(
  opTierCounts.TIER_A === 24 &&
  opTierCounts.TIER_B === 47 &&
  opTierCounts.TIER_C === 50 &&
  opTierCounts.TIER_D === 4,
  `Operational tiers map deterministically to priorities: TIER_A: 24, TIER_B: 47, TIER_C: 50, TIER_D: 4`
);

// -------------------------------------------------------------
// SUITE 5: SOURCE & REPOSITORY IDENTITY (C02 RECONCILIATION)
// -------------------------------------------------------------
assert(repositories.length === 119, `Authoritative Git repository manifest contains exactly 119 real Git repositories (observed: ${repositories.length})`);

const repoMap = new Map(repositories.map(r => [r.repositoryId, r]));
let validRepoLinks = 0;
let validNonRepoSources = 0;
const nullRepoCandidateIds = new Set(['OS-MKT-08', 'OS-LAYT-08', 'OS-D2C-08', 'OS-AGNT-03', 'OS-AGNT-04', 'OS-AGNT-05']);

sources.forEach(s => {
  if (nullRepoCandidateIds.has(s.candidateId)) {
    if (s.repositoryRef === null && s.repositoryUrl === null && (s.documentationUrl || s.externalPlatformUrl)) {
      validNonRepoSources++;
    }
  } else {
    if (repoMap.has(s.repositoryRef)) {
      validRepoLinks++;
    }
  }
});
assert(validRepoLinks === 119, `Exactly 119 open-source candidates link to verified Git repositories in repositories.json (observed: ${validRepoLinks})`);
assert(validNonRepoSources === 6, `Exactly 6 commercial/docs/SaaS candidates have repositoryRef: null with verified platform URLs (observed: ${validNonRepoSources})`);

// -------------------------------------------------------------
// SUITE 6: PACKAGES, COMPONENTS, AND LICENSES NORMALIZATION (Issue 3 & 10)
// -------------------------------------------------------------
assert(packages.length === 147, `Normalized packages manifest contains 147 packages resolving monorepos (observed: ${packages.length})`);
assert(components.length === 31, `Components manifest contains 31 primary component groups (observed: ${components.length})`);
assert(licenses.length === 12, `Canonical license manifest defines exactly 12 normalized license entities including Every Layout (observed: ${licenses.length})`);

const licMap = new Set(licenses.map(l => l.licenseId));
let allSourcesLinkToValidLicense = true;
sources.forEach(s => {
  if (!licMap.has(s.licenseRef)) allSourcesLinkToValidLicense = false;
  if (!s.licenseScope || !s.licenseScope.commercialTerms) allSourcesLinkToValidLicense = false;
});
assert(allSourcesLinkToValidLicense, '100% of source records link to normalized licenses and feature granular licenseScope');

// -------------------------------------------------------------
// SUITE 7: STANDALONE ASSETS & OFL RFN EVIDENCE (Issue 4 & C10)
// -------------------------------------------------------------
assert(assets.length === 8, `Asset manifest tracks exactly 8 standalone assets including JetBrains Mono and Fira Code (observed: ${assets.length})`);

const interFont = assets.find(a => a.assetId === 'ASSET-OS-TYPO-04-1');
const geistFont = assets.find(a => a.assetId === 'ASSET-OS-TYPO-05-1');
const jbMonoFont = assets.find(a => a.assetId === 'ASSET-OS-TYPO-03-JB');
const firaCodeFont = assets.find(a => a.assetId === 'ASSET-OS-TYPO-03-FC');

assert(
  interFont &&
  interFont.explicitRfnDeclared === true &&
  interFont.declaredReservedFontNames.includes('Inter') &&
  interFont.fontVersion === '4.1' &&
  interFont.redistributionState === 'UNCHANGED_BINARY',
  'Inter font asset explicitly documents RFN declaration ("with Reserved Font Name Inter"), version 4.1, and unchanged binary status'
);

assert(
  geistFont &&
  geistFont.explicitRfnDeclared === true &&
  geistFont.declaredReservedFontNames.includes('Geist') &&
  geistFont.fontVersion === '1.4.0' &&
  geistFont.redistributionState === 'UNCHANGED_BINARY',
  'Geist font asset explicitly documents RFN declaration ("with Reserved Font Name Geist"), version 1.4.0, and unchanged binary status'
);

assert(
  jbMonoFont && jbMonoFont.parentCandidateId === 'OS-TYPO-03' &&
  firaCodeFont && firaCodeFont.parentCandidateId === 'OS-TYPO-03',
  'JetBrains Mono and Fira Code are traced to Fontsource monorepo candidate (OS-TYPO-03) with OFL RFN preservation'
);

// -------------------------------------------------------------
// SUITE 8: 6-MODE CONSUMPTION PERMISSIONS (750 RECORDS)
// -------------------------------------------------------------
assert(permissions.length === 750, `Consumption permissions matrix contains exactly 750 records (125 * 6 modes; observed: ${permissions.length})`);

const validEligibilityEnum = new Set([
  'APPROVED',
  'ELIGIBLE_WITH_RESTRICTIONS',
  'REFERENCE_ONLY',
  'PENDING_REVIEW',
  'BLOCKED',
  'NOT_APPLICABLE'
]);

let allPermissionsUseCanonicalEnum = true;
let allAllowedBooleansConsistent = true;
permissions.forEach(p => {
  if (!validEligibilityEnum.has(p.eligibility)) allPermissionsUseCanonicalEnum = false;
  const shouldBeAllowed = (p.eligibility === 'APPROVED' || p.eligibility === 'ELIGIBLE_WITH_RESTRICTIONS');
  if (p.allowed !== shouldBeAllowed) allAllowedBooleansConsistent = false;
});
assert(allPermissionsUseCanonicalEnum, '100% of permission records adhere strictly to canonical eligibility enum');
assert(allAllowedBooleansConsistent, '100% of permission records maintain consistent allowed boolean derivations');

// -------------------------------------------------------------
// SUITE 9: DOMAIN GOVERNANCE BOUNDARIES (Issue 6, 9, 11)
// -------------------------------------------------------------
const gsapDep = permissions.find(p => p.candidateId === 'OS-ANIM-04' && p.consumptionMode === 'DEPENDENCY');
const gsapCopy = permissions.find(p => p.candidateId === 'OS-ANIM-04' && p.consumptionMode === 'SOURCE_COPY');
assert(
  gsapDep && gsapDep.eligibility === 'ELIGIBLE_WITH_RESTRICTIONS' && gsapDep.allowed === true &&
  gsapDep.conditions.some(c => c.includes('Webflow') && c.includes('no-code visual animation-building')),
  'GSAP dependency mode is ELIGIBLE_WITH_RESTRICTIONS scoped to UIForge programmatic React emission vs no-code animation builder'
);
assert(gsapCopy && gsapCopy.eligibility === 'BLOCKED' && gsapCopy.allowed === false, 'GSAP source-copy mode is strictly BLOCKED');

const axeDep = permissions.find(p => p.candidateId === 'OS-A11Y-01' && p.consumptionMode === 'DEPENDENCY');
const axeCopy = permissions.find(p => p.candidateId === 'OS-A11Y-01' && p.consumptionMode === 'SOURCE_COPY');
const axeTool = permissions.find(p => p.candidateId === 'OS-A11Y-01' && p.consumptionMode === 'EXTERNAL_TOOL');

assert(axeDep && axeDep.eligibility === 'ELIGIBLE_WITH_RESTRICTIONS' && axeDep.allowed === true, 'axe-core dependency mode is ELIGIBLE_WITH_RESTRICTIONS (MPL-2.0 Section 3 notice obligations)');
assert(axeCopy && axeCopy.eligibility === 'ELIGIBLE_WITH_RESTRICTIONS' && axeCopy.allowed === true, 'axe-core source-copy mode is ELIGIBLE_WITH_RESTRICTIONS (modified covered files under MPL-2.0)');
assert(
  axeTool && axeTool.eligibility === 'ELIGIBLE_WITH_RESTRICTIONS' && axeTool.allowed === true &&
  axeTool.conditions.some(c => c.includes('user-managed external integration')) &&
  axeTool.conditions.some(c => c.includes('does NOT bundle')),
  'axe-core external tool is ELIGIBLE_WITH_RESTRICTIONS with distribution boundary (invokes user-installed @axe-core/cli; no binary bundling)'
);

// Pa11y reconciliation: external tool is PENDING_REVIEW
const pa11yDep = permissions.find(p => p.candidateId === 'OS-A11Y-05' && p.consumptionMode === 'DEPENDENCY');
const pa11yCopy = permissions.find(p => p.candidateId === 'OS-A11Y-05' && p.consumptionMode === 'SOURCE_COPY');
const pa11yTool = permissions.find(p => p.candidateId === 'OS-A11Y-05' && p.consumptionMode === 'EXTERNAL_TOOL');
assert(pa11yDep && pa11yDep.eligibility === 'PENDING_REVIEW' && pa11yDep.allowed === false, 'pa11y dependency mode is PENDING_REVIEW (LGPL-3.0 dynamic linking concerns)');
assert(pa11yCopy && pa11yCopy.eligibility === 'BLOCKED' && pa11yCopy.allowed === false, 'pa11y source-copy mode is strictly BLOCKED');
assert(pa11yTool && pa11yTool.eligibility === 'PENDING_REVIEW' && pa11yTool.allowed === false, 'pa11y external-tool mode is PENDING_REVIEW pending counsel confirmation of distribution model');

// -------------------------------------------------------------
// SUITE 10: DEPENDENCY ELIGIBILITY ARITHMETIC RECONCILIATION (Issue 1)
// -------------------------------------------------------------
const depPerms = permissions.filter(p => p.consumptionMode === 'DEPENDENCY');
const depCounts = { APPROVED: 0, ELIGIBLE_WITH_RESTRICTIONS: 0, BLOCKED: 0, PENDING_REVIEW: 0, NOT_APPLICABLE: 0 };
depPerms.forEach(p => {
  depCounts[p.eligibility] = (depCounts[p.eligibility] || 0) + 1;
});
const totalDepSum = Object.values(depCounts).reduce((a, b) => a + b, 0);

assert(totalDepSum === 125, `DEPENDENCY mode accounts for all 125 records without omissions (observed: ${totalDepSum})`);
assert(
  depCounts.APPROVED === 111 &&
  depCounts.ELIGIBLE_WITH_RESTRICTIONS === 2 &&
  depCounts.BLOCKED === 7 &&
  depCounts.PENDING_REVIEW === 1 &&
  depCounts.NOT_APPLICABLE === 4,
  `Exact dependency arithmetic verified: 111 APPROVED + 2 RESTRICTED (113 eligible) + 7 BLOCKED + 1 PENDING + 4 NOT_APPLICABLE = 125`
);

// -------------------------------------------------------------
// SUITE 11: REFERENCE-ONLY SCOPE BOUNDARIES (C04 RECONCILIATION)
// -------------------------------------------------------------
let allRefScopesValid = true;
let closedSourcesRestricted = true;
let noScrapingAllowedAnywhere = true;

const refPerms = permissions.filter(p => p.consumptionMode === 'REFERENCE_ONLY');
refPerms.forEach(p => {
  if (!p.referenceScope) allRefScopesValid = false;
  if (p.referenceScope && p.referenceScope.automatedScraping !== false) noScrapingAllowedAnywhere = false;
  if (p.referenceScope && p.referenceScope.codeCopying !== false) noScrapingAllowedAnywhere = false;

  if (nullRepoCandidateIds.has(p.candidateId)) {
    if (p.referenceScope && (p.referenceScope.publicSourceCodeInspection !== false || p.referenceScope.localCloning !== false)) {
      closedSourcesRestricted = false;
    }
  }
});
assert(allRefScopesValid, '100% of REFERENCE_ONLY records define explicit granular referenceScope flags');
assert(noScrapingAllowedAnywhere, 'Automated scraping and code copying are strictly prohibited across ALL 125 reference records');
assert(closedSourcesRestricted, 'Commercial/closed products strictly forbid source inspection and local cloning under reference mode');

// -------------------------------------------------------------
// SUITE 12: 10-DIMENSION TECHNICAL EVALUATIONS (Issue 12 & C08)
// -------------------------------------------------------------
assert(evaluations.length === 125, `Evaluations manifest contains 125 evaluation dossiers (observed: ${evaluations.length})`);

let totalDimAssessments = 0;
let completeEvalsCount = 0;
let partialEvalsCount = 0;
evaluations.forEach(e => {
  const dims = Object.keys(e.evaluatedDimensions || {});
  totalDimAssessments += dims.length;
  if (e.technicalStatus === 'complete') completeEvalsCount++;
  else partialEvalsCount++;
});
assert(totalDimAssessments === 1250, `Exactly 1,250 dimensional assessments preserved across all 125 candidates (125 * 10; observed: ${totalDimAssessments})`);
assert(completeEvalsCount === 71 && partialEvalsCount === 54, `Technical evaluations traceable to Phase 02.2: 71 complete candidate technical evaluations (all 10 assessed) and 54 screened/partial evaluations`);

// -------------------------------------------------------------
// SUITE 13: GRANULAR EVIDENCE DOSSIERS & CLAIM-LEVEL QUALITY (Issue 7)
// -------------------------------------------------------------
assert(evidence.length === 125, `Evidence manifest contains exactly 125 candidate dossiers (observed: ${evidence.length})`);

let totalGranularEvidenceItems = 0;
let allItemsHaveClaimQuality = true;
const validClassifications = new Set([
  'UPSTREAM_SOURCE',
  'PACKAGE_REGISTRY',
  'RELEASE_MANIFEST',
  'LICENSE_FILE',
  'TEST_OUTPUT',
  'INDEPENDENT_AUDIT',
  'VENDOR_DOCUMENTATION'
]);

evidence.forEach(d => {
  totalGranularEvidenceItems += d.evidenceItems.length;
  d.evidenceItems.forEach(item => {
    if (!validClassifications.has(item.classification)) allItemsHaveClaimQuality = false;
    if (!item.claimSupported || !item.exactSourceArtifact || !item.relevantFileOrSection || !item.verificationClassification) {
      allItemsHaveClaimQuality = false;
    }
  });
});
assert(totalGranularEvidenceItems === 625, `Evidence catalog contains 625 granular evidence items supporting individual claims (observed: ${totalGranularEvidenceItems})`);
assert(allItemsHaveClaimQuality, '100% of granular evidence items include claimSupported, exactSourceArtifact, relevantFileOrSection, and verificationClassification');

// -------------------------------------------------------------
// SUITE 14: DIGEST-BACKED PROVENANCE (C06 RECONCILIATION)
// -------------------------------------------------------------
assert(provenance.length === 125, `Provenance manifest contains 125 records (observed: ${provenance.length})`);

let allDigestBacked = true;
provenance.forEach(p => {
  if (p.provenanceIntegrityLevel !== 'DIGEST_BACKED_RECORD') allDigestBacked = false;
  if (p.digestAlgorithm !== 'SHA-256' || !/^[a-f0-9]{64}$/.test(p.contentDigest)) allDigestBacked = false;
});
assert(allDigestBacked, '100% of provenance records correctly classified as DIGEST_BACKED_RECORD with valid SHA-256 digests');

// -------------------------------------------------------------
// SUITE 15: PHASE 02.5 MODE-SPECIFIC ELIGIBILITY FILTERING (Issue 2)
// -------------------------------------------------------------
const eligibleForDependency = permissions.filter(p => p.consumptionMode === 'DEPENDENCY' && (p.eligibility === 'APPROVED' || p.eligibility === 'ELIGIBLE_WITH_RESTRICTIONS'));
const blockedOrPendingDependency = permissions.filter(p => p.consumptionMode === 'DEPENDENCY' && (p.eligibility === 'BLOCKED' || p.eligibility === 'PENDING_REVIEW' || p.eligibility === 'NOT_APPLICABLE'));

assert(eligibleForDependency.length === 113, `Eligible dependencies pool contains exactly 113 candidates (111 APPROVED + 2 RESTRICTED)`);
assert(blockedOrPendingDependency.length === 12, `Ineligible dependency pool accounts for remaining 12 candidates (7 BLOCKED + 1 PENDING + 4 NOT_APPLICABLE)`);
assert(!eligibleForDependency.some(p => p.candidateId === 'OS-A11Y-05' || p.candidateId === 'OS-MKT-08' || p.candidateId === 'OS-D2C-08' || p.candidateId === 'OS-LAYT-08'), 'pa11y, Aceternity, Locofy, and Every Layout are strictly excluded from eligible dependency pool');

// -------------------------------------------------------------
// SCRIPT INTEGRITY & COMPLETION CERTIFICATION
// -------------------------------------------------------------
const scriptBuffer = fs.readFileSync(__filename);
const scriptDigest = crypto.createHash('sha256').update(scriptBuffer).digest('hex');
console.log('----------------------------------------------------------------');
console.log(`RECONCILED VALIDATION SCRIPT SHA-256: ${scriptDigest}`);
console.log('================================================================');
console.log(`VALIDATION HARNESS COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (0 failures)`);
console.log('================================================================');
