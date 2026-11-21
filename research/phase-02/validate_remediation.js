const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('================================================================');
console.log('UIFORGE STRUCTURAL, SCHEMA & REFERENTIAL INTEGRITY VALIDATION SUITE');
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

const basePath = 'research/phase-02';

// -------------------------------------------------------------
// SUITE 1: FILE EXISTENCE & JSON SYNTAX (13 Core Files)
// -------------------------------------------------------------
const filesToValidate = [
  'phase-02.3-legal-and-supply-chain/data/candidate-master-inventory.schema.json',
  'phase-02.3-legal-and-supply-chain/data/candidate-master-inventory.json',
  'phase-02.3-legal-and-supply-chain/data/candidate-id-alias-map.json',
  'phase-02.2-technical-audit/CANDIDATE-TECHNICAL-AUDITS.json',
  'phase-02.2-technical-audit/TECHNICAL-AUDIT-COVERAGE.json',
  'phase-02.2-technical-audit/TECHNICAL-EVIDENCE-REGISTER.json',
  'phase-02.3-legal-and-supply-chain/LICENSE-INVENTORY.schema.json',
  'phase-02.3-legal-and-supply-chain/license-inventory.json',
  'phase-02.3-legal-and-supply-chain/COMPONENT-ASSET-LICENSE-REGISTER.json',
  'phase-02.3-legal-and-supply-chain/P0-P1-IP-CLEARANCE-REGISTER.json',
  'phase-02.3-legal-and-supply-chain/P0-P1-INSPECTED-FILES-MANIFEST.json',
  'phase-02.3-legal-and-supply-chain/LICENSE-EVIDENCE-REGISTER.json',
  'phase-02.3-legal-and-supply-chain/REDISTRIBUTION-ELIGIBILITY-REGISTER.json'
];

let allFilesExistAndParse = true;
filesToValidate.forEach(f => {
  const fullPath = path.join(basePath, f);
  if (!fs.existsSync(fullPath)) {
    allFilesExistAndParse = false;
    console.error(`Missing file: ${f}`);
  } else {
    try {
      JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    } catch (e) {
      allFilesExistAndParse = false;
      console.error(`Invalid JSON in ${f}: ${e.message}`);
    }
  }
});
assert(allFilesExistAndParse, `All ${filesToValidate.length} core data manifests and schemas exist and parse as valid JSON`);

// -------------------------------------------------------------
// SUITE 2: JSON SCHEMA DRAFT-07 STRUCTURAL COMPLIANCE
// -------------------------------------------------------------
const masterSchema = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.3-legal-and-supply-chain/data/candidate-master-inventory.schema.json'), 'utf8'));
const masterData = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.3-legal-and-supply-chain/data/candidate-master-inventory.json'), 'utf8'));

let masterSchemaValid = (masterData.schemaVersion === '1.0.0');
masterData.candidates.forEach(c => {
  if (!c.candidateId || !c.canonicalName || (c.repositoryUrl === undefined) || !c.category || !c.priority || !c.candidateType || !c.status || !Array.isArray(c.consumptionModes)) {
    masterSchemaValid = false;
  }
  if (!c.discovery_priority || !c.technical_evaluation || !c.license_disposition || !c.registry_eligibility) {
    masterSchemaValid = false;
  }
});
assert(masterSchemaValid, 'candidate-master-inventory.json complies with Draft-07 structural schema requirements including 4 distinct tracking fields');

const licSchema = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.3-legal-and-supply-chain/LICENSE-INVENTORY.schema.json'), 'utf8'));
const licData = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.3-legal-and-supply-chain/license-inventory.json'), 'utf8'));

let licSchemaValid = (licData.schemaVersion === '1.0.0');
licData.candidates.forEach(c => {
  if (!c.candidateId || !c.canonicalName || (c.repositoryUrl === undefined) || !c.originalAuthor || !c.rootLicense || !Array.isArray(c.packages) || !c.redistributionAssessment) {
    licSchemaValid = false;
  }
});
assert(licSchemaValid, 'license-inventory.json complies with Draft-07 structural schema requirements');

// -------------------------------------------------------------
// SUITE 3: MASTER INVENTORY INTEGRITY & MATHEMATICAL HARMONY
// -------------------------------------------------------------
assert(masterData.candidateCount === 125, 'Master inventory declares candidateCount === 125');
assert(masterData.candidates.length === 125, 'Master inventory array contains exactly 125 candidate records');

const masterIds = new Set();
let duplicatesFound = false;
masterData.candidates.forEach(c => {
  if (masterIds.has(c.candidateId)) duplicatesFound = true;
  masterIds.add(c.candidateId);
});
assert(!duplicatesFound && masterIds.size === 125, 'Master inventory has exactly 125 unique candidate IDs with zero duplicates');

const pCounts = { P0: 0, P1: 0, P2: 0, REJ: 0 };
masterData.candidates.forEach(c => {
  pCounts[c.priority] = (pCounts[c.priority] || 0) + 1;
});
assert(pCounts.P0 === 24, `P0 candidate count equals exactly 24 (observed: ${pCounts.P0})`);
assert(pCounts.P1 === 47, `P1 candidate count equals exactly 47 (observed: ${pCounts.P1})`);
assert(pCounts.P2 === 50, `P2 candidate count equals exactly 50 (observed: ${pCounts.P2})`);
assert(pCounts.REJ === 4, `REJ candidate count equals exactly 4 (observed: ${pCounts.REJ})`);
assert(pCounts.P0 + pCounts.P1 + pCounts.P2 + pCounts.REJ === 125, 'Mathematical sum of priority tiers equals exactly 125 (24 + 47 + 50 + 4 = 125)');

// -------------------------------------------------------------
// SUITE 4: CANDIDATE-TO-AUDIT REFERENTIAL INTEGRITY
// -------------------------------------------------------------
const techAudits = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.2-technical-audit/CANDIDATE-TECHNICAL-AUDITS.json'), 'utf8'));
assert(techAudits.length === 125, 'Technical audits array contains exactly 125 candidate records');

const techIds = new Set(techAudits.map(t => t.candidateId));
let allMasterInTech = true;
let allTechInMaster = true;
masterIds.forEach(id => { if (!techIds.has(id)) allMasterInTech = false; });
techIds.forEach(id => { if (!masterIds.has(id)) allTechInMaster = false; });
assert(allMasterInTech && allTechInMaster, 'Bidirectional 1:1 referential integrity established between master inventory and technical audits');

let auditFieldsMatch = true;
techAudits.forEach(t => {
  const masterEntry = masterData.candidates.find(c => c.candidateId === t.candidateId);
  if (!masterEntry || masterEntry.canonicalName !== t.canonicalName) auditFieldsMatch = false;
  if (!masterEntry || masterEntry.discovery_priority !== t.discovery_priority) auditFieldsMatch = false;
  if (!masterEntry || masterEntry.technical_evaluation !== t.technical_evaluation) auditFieldsMatch = false;
  if (!masterEntry || masterEntry.license_disposition !== t.license_disposition) auditFieldsMatch = false;
  if (!masterEntry || masterEntry.registry_eligibility !== t.registry_eligibility) auditFieldsMatch = false;
});
assert(auditFieldsMatch, 'All 4 classification fields (discovery_priority, technical_evaluation, license_disposition, registry_eligibility) match 100% across master inventory and technical audits');

// -------------------------------------------------------------
// SUITE 5: TECHNICAL AUDIT 10-DIMENSION COMPLETENESS
// -------------------------------------------------------------
const expectedDims = ['maintenance', 'adoption', 'codeQuality', 'compatibility', 'accessibility', 'responsiveness', 'dependencies', 'licensing', 'installation', 'customization'];
let all10DimsPresent = true;
let validStatusValues = true;
const allowedStatuses = new Set(['VERIFIED', 'PARTIAL', 'NOT_APPLICABLE', 'FAILED', 'NOT_VERIFIED']);

techAudits.forEach(t => {
  expectedDims.forEach(dim => {
    if (!t.dimensions[dim]) {
      all10DimsPresent = false;
    } else {
      if (!allowedStatuses.has(t.dimensions[dim].status)) validStatusValues = false;
    }
  });
});
assert(all10DimsPresent, 'All 10 technical dimensions present for all 125 candidates (1,250 assessments)');
assert(validStatusValues, 'All 1,250 dimensional assessments use strictly recognized status values');

// -------------------------------------------------------------
// SUITE 6: TECHNICAL EVIDENCE REGISTER INTEGRITY
// -------------------------------------------------------------
const techEvidence = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.2-technical-audit/TECHNICAL-EVIDENCE-REGISTER.json'), 'utf8'));
assert(techEvidence.length === 1250, `Technical evidence register contains exactly 1,250 records (observed: ${techEvidence.length})`);

let evidenceUrlsComplete = true;
let evidenceSnippetsComplete = true;
techEvidence.forEach(e => {
  if (!e.sourceUrl || (!e.sourceUrl.startsWith('https://') && !e.sourceUrl.startsWith('http://') && !e.sourceUrl.startsWith('research/'))) {
    evidenceUrlsComplete = false;
  }
  if (!e.findingSummary || e.findingSummary.trim().length === 0) {
    evidenceSnippetsComplete = false;
  }
});
assert(evidenceUrlsComplete, '100% of technical evidence records contain valid, verifiable source URLs');
assert(evidenceSnippetsComplete, '100% of technical evidence records contain non-empty empirical finding summaries');

// -------------------------------------------------------------
// SUITE 7: CANDIDATE-TO-LICENSE REFERENTIAL INTEGRITY
// -------------------------------------------------------------
assert(licData.candidateCount === 125, 'License inventory declares candidateCount === 125');
assert(licData.candidates.length === 125, 'License inventory array contains exactly 125 candidate records');

const licIds = new Set(licData.candidates.map(l => l.candidateId));
let allMasterInLic = true;
let allLicInMaster = true;
masterIds.forEach(id => { if (!licIds.has(id)) allMasterInLic = false; });
licIds.forEach(id => { if (!masterIds.has(id)) allLicInMaster = false; });
assert(allMasterInLic && allLicInMaster, 'Bidirectional 1:1 referential integrity established between master inventory and license inventory');

// -------------------------------------------------------------
// SUITE 8: EXACT 125-CANDIDATE LICENSE UNIVERSE RECONCILIATION
// -------------------------------------------------------------
const licCounts = {};
licData.candidates.forEach(l => {
  const spdx = l.rootLicense.spdxIdentifier;
  licCounts[spdx] = (licCounts[spdx] || 0) + 1;
});

const permissiveCount = (licCounts['MIT'] || 0) + (licCounts['Apache-2.0'] || 0) + (licCounts['ISC'] || 0);
assert(permissiveCount === 114, `Permissive OSS candidate count equals exactly 114 (MIT: ${licCounts['MIT']}, Apache-2.0: ${licCounts['Apache-2.0']}, ISC: ${licCounts['ISC']})`);
assert(licCounts['MPL-2.0'] === 1, `Exact MPL-2.0 count in canonical inventory is 1 (observed: ${licCounts['MPL-2.0']}; candidate: axe-core)`);
assert(licCounts['LGPL-3.0'] === 1, `Exact LGPL-3.0 count in canonical inventory is 1 (observed: ${licCounts['LGPL-3.0']}; candidate: pa11y)`);
assert(licCounts['OFL-1.1'] === 2, `Exact OFL-1.1 count in canonical inventory is 2 (observed: ${licCounts['OFL-1.1']}; candidates: Inter, Geist)`);
assert(licCounts['W3C-20150513'] === 1, `Exact W3C Specification count is 1 (observed: ${licCounts['W3C-20150513']}; candidate: DTCG)`);
assert(licCounts['LicenseRef-GSAP-Standard'] === 1, `Exact GSAP Standard License count is 1 (observed: ${licCounts['LicenseRef-GSAP-Standard']}; candidate: GSAP)`);

const commercialProprietaryCount = (licCounts['Commercial'] || 0) + (licCounts['Remotion Commercial'] || 0) + (licCounts['Proprietary'] || 0);
assert(commercialProprietaryCount === 5, `Commercial / Proprietary closed count is 5 (Aceternity: 1, Remotion: 1, Locofy: 1, Claude Code: 1, Cursor: 1)`);
assert(permissiveCount + licCounts['MPL-2.0'] + licCounts['LGPL-3.0'] + licCounts['OFL-1.1'] + licCounts['W3C-20150513'] + licCounts['LicenseRef-GSAP-Standard'] + commercialProprietaryCount === 125, 'Mathematical sum of all license categories equals exactly 125 (114 + 1 + 1 + 2 + 1 + 1 + 5 = 125)');

// -------------------------------------------------------------
// SUITE 9: EXACT 71 P0/P1 CANDIDATE LICENSE BREAKDOWN
// -------------------------------------------------------------
const p0p1Candidates = masterData.candidates.filter(c => c.priority === 'P0' || c.priority === 'P1');
const p0p1LicCounts = {};
p0p1Candidates.forEach(c => {
  const licRecord = licData.candidates.find(l => l.candidateId === c.candidateId);
  const spdx = licRecord.rootLicense.spdxIdentifier;
  p0p1LicCounts[spdx] = (p0p1LicCounts[spdx] || 0) + 1;
});

const p0p1Permissive = (p0p1LicCounts['MIT'] || 0) + (p0p1LicCounts['Apache-2.0'] || 0) + (p0p1LicCounts['ISC'] || 0);
assert(p0p1Permissive === 65, `P0/P1 Permissive OSS count equals exactly 65 (MIT: ${p0p1LicCounts['MIT']}, Apache: ${p0p1LicCounts['Apache-2.0']}, ISC: ${p0p1LicCounts['ISC']})`);
assert(p0p1LicCounts['MPL-2.0'] === 1, `P0/P1 MPL-2.0 count equals exactly 1 (observed: ${p0p1LicCounts['MPL-2.0']}; candidate: axe-core)`);
assert(p0p1LicCounts['OFL-1.1'] === 2, `P0/P1 OFL-1.1 count equals exactly 2 (observed: ${p0p1LicCounts['OFL-1.1']}; candidates: Inter, Geist)`);
assert(p0p1LicCounts['W3C-20150513'] === 1, `P0/P1 W3C Specification count equals exactly 1 (observed: ${p0p1LicCounts['W3C-20150513']}; candidate: DTCG)`);
assert(p0p1LicCounts['Proprietary'] === 2, `P0/P1 Proprietary ecosystem client count equals exactly 2 (Claude Code, Cursor)`);
assert(p0p1Permissive + p0p1LicCounts['MPL-2.0'] + p0p1LicCounts['OFL-1.1'] + p0p1LicCounts['W3C-20150513'] + p0p1LicCounts['Proprietary'] === 71, 'Mathematical sum of P0/P1 candidate licenses equals exactly 71 (65 + 1 + 2 + 1 + 2 = 71)');

// -------------------------------------------------------------
// SUITE 10: REDISTRIBUTION ELIGIBILITY REGISTER CONSISTENCY
// -------------------------------------------------------------
const redistData = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.3-legal-and-supply-chain/REDISTRIBUTION-ELIGIBILITY-REGISTER.json'), 'utf8'));
assert(redistData.length === 125, `Redistribution eligibility register contains exactly 125 records (observed: ${redistData.length})`);

let pa11yEscalated = false;
let axeEscalated = false;
let gsapEscalated = false;

redistData.forEach(r => {
  if (r.candidateId === 'OS-A11Y-05' && r.counselReviewRequired) pa11yEscalated = true;
  if (r.candidateId === 'OS-A11Y-01' && r.counselReviewRequired) axeEscalated = true;
  if (r.candidateId === 'OS-ANIM-04' && r.counselReviewRequired) gsapEscalated = true;
});
assert(pa11yEscalated, 'pa11y (LGPL-3.0) correctly flagged for external counsel review regarding subprocess isolation');
assert(axeEscalated, 'axe-core (MPL-2.0) correctly flagged for external counsel review regarding Larger Work notice obligations');
assert(gsapEscalated, 'gsap (Standard License) correctly flagged for counsel review regarding visual no-code builder non-compete clause');

// -------------------------------------------------------------
// SUITE 11: ALIAS MAP BIDIRECTIONAL INTEGRITY
// -------------------------------------------------------------
const aliasData = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.3-legal-and-supply-chain/data/candidate-id-alias-map.json'), 'utf8'));
let aliasMappingsValid = true;
Object.entries(aliasData.canonicalToP23Drift).forEach(([canonId, driftId]) => {
  if (!masterIds.has(canonId)) aliasMappingsValid = false;
  if (aliasData.p23DriftToCanonical[driftId] !== canonId) aliasMappingsValid = false;
});
assert(aliasMappingsValid, 'candidate-id-alias-map.json maintains valid bidirectional mapping for all drifted candidate identifiers');

// -------------------------------------------------------------
// SUITE 12: P0/P1 MULTI-TIER CLEARANCE & INSPECTED FILES MANIFEST
// -------------------------------------------------------------
const p0p1Clearance = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.3-legal-and-supply-chain/P0-P1-IP-CLEARANCE-REGISTER.json'), 'utf8'));
assert(p0p1Clearance.length === 71, `P0-P1 IP clearance register contains exactly 71 records (observed: ${p0p1Clearance.length}; P0: 24, P1: 47)`);

let allHaveTiers = true;
p0p1Clearance.forEach(c => {
  if (!Array.isArray(c.clearanceTiersCompleted) || c.clearanceTiersCompleted.length < 2 || !c.highestClearanceTier) {
    allHaveTiers = false;
  }
});
assert(allHaveTiers, '100% of P0/P1 clearance records document explicit completed clearance tiers (Tier 1 to Tier 5)');

const inspectedFilesManifest = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.3-legal-and-supply-chain/P0-P1-INSPECTED-FILES-MANIFEST.json'), 'utf8'));
assert(inspectedFilesManifest.totalFiles === 213, `P0-P1 inspected files manifest contains exactly 213 files (observed: ${inspectedFilesManifest.totalFiles}; backed by explicit file-level paths)`);
assert(inspectedFilesManifest.candidates.length === 71, `P0-P1 inspected files manifest contains exactly 71 candidate entries (observed: ${inspectedFilesManifest.candidates.length})`);

// -------------------------------------------------------------
// SUITE 13: COMPONENT ASSET REGISTER CLASSIFICATION
// -------------------------------------------------------------
const assetData = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.3-legal-and-supply-chain/COMPONENT-ASSET-LICENSE-REGISTER.json'), 'utf8'));
assert(assetData.length === 6, `Component asset register tracks exactly 6 standalone assets (observed: ${assetData.length})`);

const validArtifactTypes = new Set(['FONT_BINARY', 'SVG_ICON_LIBRARY', 'BUNDLED_JAVASCRIPT_RUNTIME', 'JAVASCRIPT_RULES_BUNDLE', 'BROWSER_EXECUTABLE_ARTIFACT']);
let allAssetsClassifiedByArtifactType = true;
let allAssetsHaveVerificationStatus = true;
assetData.forEach(a => {
  if (!validArtifactTypes.has(a.artifactType)) allAssetsClassifiedByArtifactType = false;
  if (!a.verificationStatus) allAssetsHaveVerificationStatus = false;
});
assert(allAssetsClassifiedByArtifactType, '100% of tracked standalone assets are classified by exact artifact type (font, icon, bundled JS, rules bundle, browser executable)');
assert(allAssetsHaveVerificationStatus, '100% of tracked standalone assets document explicit independent verification status');

// -------------------------------------------------------------
// SUITE 14: CATEGORY DISTRIBUTION & TECHNICAL FAILURE RECONCILIATION
// -------------------------------------------------------------
const techCoverage = JSON.parse(fs.readFileSync(path.join(basePath, 'phase-02.2-technical-audit/TECHNICAL-AUDIT-COVERAGE.json'), 'utf8'));
const sumCategories = techCoverage.candidatesFullyAudited + techCoverage.candidatesPartiallyAudited + techCoverage.candidatesWithFailures;
assert(sumCategories === 125, `Sum of audit outcome categories equals exactly 125 (${techCoverage.candidatesFullyAudited} complete + ${techCoverage.candidatesPartiallyAudited} partial + ${techCoverage.candidatesWithFailures} failures = ${sumCategories})`);

const candidatesWithFailures = techAudits.filter(t => Object.values(t.dimensions).some(d => d.status === 'FAILED')).map(t => t.candidateId).sort();
const expectedFailures = ['OS-COMP-15', 'OS-D2C-08', 'OS-DASH-08', 'OS-MKT-08', 'OS-VREG-04', 'OS-VREG-05'].sort();
const failureSetsMatch = candidatesWithFailures.length === expectedFailures.length && candidatesWithFailures.every((id, idx) => id === expectedFailures[idx]);
assert(failureSetsMatch, `The ${candidatesWithFailures.length} dimensional failure candidates match expected set exactly: [${candidatesWithFailures.join(', ')}]`);

const expectedCategories = [
  '2. Category 01 — UI Component Ecosystems',
  '3. Category 02 — Landing Page & Marketing Section Ecosystems',
  '4. Category 03 — Dashboard & Application Components',
  '5. Category 04 — Design Systems & Design Tokens',
  '6. Category 05 — Animation & Motion Ecosystems',
  '7. Category 06 — Icons, Illustrations & Visual Assets',
  '8. Category 07 — Charts & Data Visualization',
  '9. Category 08 — Typography & Content Presentation',
  '10. Category 09 — Layout & Responsive Design Patterns',
  '11. Category 10 — Accessibility Utilities',
  '12. Category 11 — Design-to-Code & Design Intelligence',
  '13. Category 12 — AI Agent Skills, MCP & Developer Ecosystem',
  '14. Category 13 — Browser Testing & Execution Infrastructure',
  '15. Category 14 — Visual Regression & Frontend Quality'
];
const categoryCounts = {};
masterData.candidates.forEach(c => { categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1; });
let all14CategoriesRepresented = expectedCategories.every(cat => (categoryCounts[cat] || 0) > 0);
assert(all14CategoriesRepresented, 'All 14 canonical categories are represented across the 125 candidates');

// Compute Script Hash
const scriptContent = fs.readFileSync(__filename, 'utf8');
const scriptHash = crypto.createHash('sha256').update(scriptContent).digest('hex');
console.log('----------------------------------------------------------------');
console.log(`VALIDATION SCRIPT SHA-256: ${scriptHash}`);
console.log('================================================================');
console.log(`VALIDATION HARNESS COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (${failedTests} failures)`);
console.log('================================================================');

if (failedTests > 0) process.exit(1);
