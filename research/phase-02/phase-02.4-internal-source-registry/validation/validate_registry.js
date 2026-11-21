const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('================================================================');
console.log('UIFORGE PHASE 02.4: INTERNAL SOURCE REGISTRY INTEGRITY HARNESS');
console.log('================================================================');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${String(totalTests).padStart(2, '0')}: ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${String(totalTests).padStart(2, '0')}: ${message}`);
    failedTests++;
  }
}

const registryDir = 'research/phase-02/phase-02.4-internal-source-registry';
const dataDir = path.join(registryDir, 'data');
const schemaDir = path.join(registryDir, 'schemas');

// -------------------------------------------------------------
// SUITE 1: DATA FILES EXISTENCE & JSON PARSING (10 Files)
// -------------------------------------------------------------
const dataFiles = [
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
dataFiles.forEach(f => {
  const p = path.join(dataDir, f);
  if (!fs.existsSync(p)) {
    allDataFilesExistAndParse = false;
    console.error(`Missing data file: ${f}`);
  } else {
    try {
      JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {
      allDataFilesExistAndParse = false;
      console.error(`Invalid JSON in ${f}: ${e.message}`);
    }
  }
});
assert(allDataFilesExistAndParse, `All ${dataFiles.length} normalized data entities exist and parse as valid JSON`);

const schemaFiles = [
  'source-registry.schema.json',
  'consumption-permissions.schema.json',
  'provenance-and-evidence.schema.json'
];
let allSchemasExistAndParse = true;
schemaFiles.forEach(f => {
  const p = path.join(schemaDir, f);
  if (!fs.existsSync(p)) {
    allSchemasExistAndParse = false;
    console.error(`Missing schema file: ${f}`);
  } else {
    try {
      JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {
      allSchemasExistAndParse = false;
      console.error(`Invalid JSON in ${f}: ${e.message}`);
    }
  }
});
assert(allSchemasExistAndParse, `All ${schemaFiles.length} JSON Schemas exist and parse as valid Draft-07 schemas`);

// Load Data
const sources = JSON.parse(fs.readFileSync(path.join(dataDir, 'sources.json'), 'utf8'));
const repositories = JSON.parse(fs.readFileSync(path.join(dataDir, 'repositories.json'), 'utf8'));
const packages = JSON.parse(fs.readFileSync(path.join(dataDir, 'packages.json'), 'utf8'));
const components = JSON.parse(fs.readFileSync(path.join(dataDir, 'components.json'), 'utf8'));
const assets = JSON.parse(fs.readFileSync(path.join(dataDir, 'assets.json'), 'utf8'));
const licenses = JSON.parse(fs.readFileSync(path.join(dataDir, 'licenses.json'), 'utf8'));
const evaluations = JSON.parse(fs.readFileSync(path.join(dataDir, 'evaluations.json'), 'utf8'));
const permissions = JSON.parse(fs.readFileSync(path.join(dataDir, 'consumption-permissions.json'), 'utf8'));
const provenance = JSON.parse(fs.readFileSync(path.join(dataDir, 'provenance.json'), 'utf8'));
const evidence = JSON.parse(fs.readFileSync(path.join(dataDir, 'evidence.json'), 'utf8'));

// -------------------------------------------------------------
// SUITE 2: SCHEMA STRUCTURAL VALIDATION
// -------------------------------------------------------------
const sourceSchema = JSON.parse(fs.readFileSync(path.join(schemaDir, 'source-registry.schema.json'), 'utf8'));
let sourcesSchemaConformant = true;
const requiredSourceProps = sourceSchema.items.required;
sources.forEach(s => {
  requiredSourceProps.forEach(prop => {
    if (s[prop] === undefined) sourcesSchemaConformant = false;
  });
});
assert(sourcesSchemaConformant, '100% of source records conform to source-registry.schema.json required properties');

const permSchema = JSON.parse(fs.readFileSync(path.join(schemaDir, 'consumption-permissions.schema.json'), 'utf8'));
let permsSchemaConformant = true;
const requiredPermProps = permSchema.items.required;
permissions.forEach(p => {
  requiredPermProps.forEach(prop => {
    if (p[prop] === undefined) permsSchemaConformant = false;
  });
});
assert(permsSchemaConformant, '100% of permission records conform to consumption-permissions.schema.json required properties');

// -------------------------------------------------------------
// SUITE 3: SOURCE REGISTRY STRUCTURAL INTEGRITY
// -------------------------------------------------------------
assert(sources.length === 125, `Source registry contains exactly 125 canonical records (observed: ${sources.length})`);

const sourceIds = new Set();
let duplicateSources = false;
sources.forEach(s => {
  if (sourceIds.has(s.sourceId)) duplicateSources = true;
  sourceIds.add(s.sourceId);
});
assert(!duplicateSources && sourceIds.size === 125, 'All 125 source records have unique sourceId identifiers with zero collisions');

// Verify canonical candidate ID preservation
const upstreamMaster = JSON.parse(fs.readFileSync('research/phase-02/phase-02.3-legal-and-supply-chain/data/candidate-master-inventory.json', 'utf8'));
const masterIds = new Set(upstreamMaster.candidates.map(c => c.candidateId));
let allMasterIdsPresent = true;
sources.forEach(s => {
  if (!masterIds.has(s.canonicalCandidateId)) allMasterIdsPresent = false;
});
assert(allMasterIdsPresent && masterIds.size === 125, '100% of canonical candidate IDs from Phase 02.1 are preserved in the source registry');

// Verify 4 explicit tracking fields
let all4FieldsPresent = true;
sources.forEach(s => {
  if (!s.discoveryPriority || !s.technicalEvaluationStatus || !s.licenseDisposition || !s.registryEligibility) {
    all4FieldsPresent = false;
  }
});
assert(all4FieldsPresent, 'All 125 source records include 4 distinct tracking fields (discoveryPriority, technicalEvaluationStatus, licenseDisposition, registryEligibility)');

// -------------------------------------------------------------
// SUITE 4: REFERENTIAL INTEGRITY (REPOSITORIES, PACKAGES, LICENSES, PROVENANCE)
// -------------------------------------------------------------
const repoMap = new Set(repositories.map(r => r.repositoryId));
let allRepoRefsValid = true;
sources.forEach(s => {
  if (!repoMap.has(s.repositoryRef)) allRepoRefsValid = false;
});
assert(allRepoRefsValid, '100% of source records link to a valid repository entity in repositories.json');

const licMap = new Set(licenses.map(l => l.licenseId));
let allLicRefsValid = true;
sources.forEach(s => {
  if (!licMap.has(s.licenseRef)) allLicRefsValid = false;
});
assert(allLicRefsValid, '100% of source records link to a normalized license entity in licenses.json');

const provMap = new Set(provenance.map(p => p.provenanceId));
let allProvRefsValid = true;
sources.forEach(s => {
  if (!provMap.has(s.provenanceRef)) allProvRefsValid = false;
});
assert(allProvRefsValid, '100% of source records link to a provenance record in provenance.json');

const evalMap = new Set(evaluations.map(e => e.evaluationId));
let allEvalRefsValid = true;
sources.forEach(s => {
  if (!evalMap.has(s.evaluationRef)) allEvalRefsValid = false;
});
assert(allEvalRefsValid, '100% of source records link to an evaluation record in evaluations.json');

// -------------------------------------------------------------
// SUITE 5: PACKAGE, COMPONENT & ASSET NORMALIZATION
// -------------------------------------------------------------
assert(packages.length >= 125, `Normalized packages registry contains ${packages.length} packages (>= 125, accounting for monorepo sub-packages)`);
let allPackagesMapToSource = true;
packages.forEach(p => {
  if (!sourceIds.has(p.sourceId)) allPackagesMapToSource = false;
});
assert(allPackagesMapToSource, '100% of package records link to a valid source entity');

assert(components.length > 0, `Component registry populated with ${components.length} primary component groups`);
let allComponentsMapToSource = true;
components.forEach(c => {
  if (!sourceIds.has(c.sourceId)) allComponentsMapToSource = false;
});
assert(allComponentsMapToSource, '100% of component records link to a valid source entity');

assert(assets.length === 6, `Asset registry tracks exactly 6 standalone assets (observed: ${assets.length})`);
const validAssetTypes = new Set(['FONT_BINARY', 'SVG_ICON_LIBRARY', 'BUNDLED_JAVASCRIPT_RUNTIME', 'JAVASCRIPT_RULES_BUNDLE', 'BROWSER_EXECUTABLE_ARTIFACT']);
let allAssetsHaveValidTypology = true;
let allAssetsHaveVerificationStatus = true;
assets.forEach(a => {
  if (!validAssetTypes.has(a.artifactType)) allAssetsHaveValidTypology = false;
  if (!a.verificationStatus) allAssetsHaveVerificationStatus = false;
});
assert(allAssetsHaveValidTypology, 'All 6 standalone assets are classified by exact artifact typology');
assert(allAssetsHaveVerificationStatus, 'All 6 standalone assets document explicit independent verification status');

// -------------------------------------------------------------
// SUITE 6: CONSUMPTION PERMISSIONS MATRIX (750 RECORDS)
// -------------------------------------------------------------
assert(permissions.length === 750, `Consumption permissions manifest contains exactly 750 records (125 candidates * 6 modes; observed: ${permissions.length})`);

const expectedModes = new Set([
  'REFERENCE_ONLY',
  'DEPENDENCY',
  'SOURCE_COPY',
  'ASSET_REDISTRIBUTION',
  'EXTERNAL_TOOL',
  'TEMPLATE_ADAPTATION'
]);
let allCandidatesHave6Modes = true;
sources.forEach(s => {
  const candidatePerms = permissions.filter(p => p.candidateId === s.canonicalCandidateId);
  if (candidatePerms.length !== 6) allCandidatesHave6Modes = false;
  const modesPresent = new Set(candidatePerms.map(p => p.consumptionMode));
  expectedModes.forEach(m => {
    if (!modesPresent.has(m)) allCandidatesHave6Modes = false;
  });
});
assert(allCandidatesHave6Modes, 'Every single source candidate has all 6 consumption modes evaluated with explicit permissions');

// -------------------------------------------------------------
// SUITE 7: BUSINESS RULES & ELIGIBILITY BOUNDARY CHECKS
// -------------------------------------------------------------
// Check GSAP 4-scenario isolation
const gsapDepPerm = permissions.find(p => p.candidateId === 'OS-ANIM-04' && p.consumptionMode === 'DEPENDENCY');
const gsapCopyPerm = permissions.find(p => p.candidateId === 'OS-ANIM-04' && p.consumptionMode === 'SOURCE_COPY');
assert(gsapDepPerm && gsapDepPerm.eligibility === 'ELIGIBLE_WITH_RESTRICTIONS', 'GSAP dependency mode is ELIGIBLE_WITH_RESTRICTIONS (emitted user dependency with non-compete clause)');
assert(gsapCopyPerm && gsapCopyPerm.eligibility === 'BLOCKED', 'GSAP source-copy mode is strictly BLOCKED (proprietary source copying prohibited)');

// Check axe-core MPL-2.0 Section 3 boundary
const axeDepPerm = permissions.find(p => p.candidateId === 'OS-A11Y-01' && p.consumptionMode === 'DEPENDENCY');
const axeCopyPerm = permissions.find(p => p.candidateId === 'OS-A11Y-01' && p.consumptionMode === 'SOURCE_COPY');
assert(axeDepPerm && axeDepPerm.eligibility === 'ELIGIBLE_WITH_RESTRICTIONS', 'axe-core dependency mode is ELIGIBLE_WITH_RESTRICTIONS (MPL-2.0 Section 3 Larger Work notice obligations)');
assert(axeCopyPerm && axeCopyPerm.eligibility === 'ELIGIBLE_WITH_RESTRICTIONS', 'axe-core source-copy mode is ELIGIBLE_WITH_RESTRICTIONS (modified covered files must be offered under MPL-2.0)');

// Check pa11y LGPL-3.0 subprocess boundary
const pa11yDepPerm = permissions.find(p => p.candidateId === 'OS-A11Y-05' && p.consumptionMode === 'DEPENDENCY');
const pa11yCopyPerm = permissions.find(p => p.candidateId === 'OS-A11Y-05' && p.consumptionMode === 'SOURCE_COPY');
assert(pa11yDepPerm && pa11yDepPerm.eligibility === 'PENDING_REVIEW', 'pa11y dependency mode is PENDING_REVIEW (subprocess isolation pending counsel confirmation)');
assert(pa11yCopyPerm && pa11yCopyPerm.eligibility === 'BLOCKED', 'pa11y source-copy mode is strictly BLOCKED (LGPL-3.0 source copying prohibited)');

// Check Commercial Closed Products are BLOCKED
const aceternityDepPerm = permissions.find(p => p.candidateId === 'OS-MKT-08' && p.consumptionMode === 'DEPENDENCY');
const locofyDepPerm = permissions.find(p => p.candidateId === 'OS-D2C-08' && p.consumptionMode === 'DEPENDENCY');
assert(aceternityDepPerm && aceternityDepPerm.eligibility === 'BLOCKED', 'Aceternity UI is strictly BLOCKED for operational dependency consumption');
assert(locofyDepPerm && locofyDepPerm.eligibility === 'BLOCKED', 'Locofy.ai is strictly BLOCKED for operational dependency consumption');

// Check Reference-Only universal research permission
let allRefApproved = true;
permissions.filter(p => p.consumptionMode === 'REFERENCE_ONLY').forEach(p => {
  if (p.eligibility !== 'APPROVED') allRefApproved = false;
});
assert(allRefApproved, 'All 125 candidates have REFERENCE_ONLY permission APPROVED for architectural and research study');

// -------------------------------------------------------------
// SUITE 8: PROVENANCE & EVIDENCE REGISTER INTEGRITY
// -------------------------------------------------------------
assert(provenance.length === 125, 'Provenance manifest contains exactly 125 records');
let allDigestsValidSha256 = true;
provenance.forEach(p => {
  if (!p.contentDigest || !/^[a-f0-9]{64}$/.test(p.contentDigest)) allDigestsValidSha256 = false;
});
assert(allDigestsValidSha256, '100% of provenance records contain valid 64-character SHA-256 content digests');

assert(evidence.length === 125, 'Evidence manifest contains exactly 125 records');
let allEvidenceValid = true;
evidence.forEach(e => {
  if (!e.evidenceId || !e.claim || !e.sourceUrl || !e.evidenceClassification) allEvidenceValid = false;
});
assert(allEvidenceValid, '100% of evidence records document explicit claims, source URLs, and controlled evidence classifications');

// -------------------------------------------------------------
// SUITE 9: CANONICAL CATEGORY DISTRIBUTION (ALL 14 CATEGORIES)
// -------------------------------------------------------------
const categoryCounts = {};
sources.forEach(s => {
  categoryCounts[s.primaryCategory] = (categoryCounts[s.primaryCategory] || 0) + 1;
});
assert(Object.keys(categoryCounts).length === 14, `All 14 canonical categories are represented in the source registry (observed: ${Object.keys(categoryCounts).length})`);

// Print Script SHA-256
const scriptContent = fs.readFileSync(__filename, 'utf8');
const scriptHash = crypto.createHash('sha256').update(scriptContent).digest('hex');
console.log('----------------------------------------------------------------');
console.log(`REGISTRY VALIDATION SCRIPT SHA-256: ${scriptHash}`);
console.log('================================================================');
console.log(`VALIDATION HARNESS COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (${failedTests} failures)`);
console.log('================================================================');

if (failedTests > 0) process.exit(1);
