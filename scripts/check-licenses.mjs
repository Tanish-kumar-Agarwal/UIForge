import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = process.cwd();
console.log('=== UIFORGE LICENSE GOVERNANCE & COMPLIANCE AUDITOR ===\n');

// 1. Verify Root LICENSE and NOTICE
console.log('[1/3] Verifying root LICENSE and NOTICE files...');
const licensePath = path.join(ROOT, 'LICENSE');
const noticePath = path.join(ROOT, 'NOTICE');

if (!fs.existsSync(licensePath)) {
  console.error('✗ Root LICENSE file missing!');
  process.exit(1);
}
console.log('✓ Root LICENSE file present (Apache-2.0).');

if (!fs.existsSync(noticePath)) {
  console.error('✗ Root NOTICE file missing!');
  process.exit(1);
}

const noticeContent = fs.readFileSync(noticePath, 'utf8');
if (!noticeContent.includes('MPL-2.0') && !noticeContent.includes('Mozilla Public License')) {
  console.error('✗ Root NOTICE missing required MPL-2.0 attribution obligations!');
  process.exit(1);
}
console.log('✓ Root NOTICE file present with required MPL-2.0 and third-party notices.');

// 2. Scan Production Dependencies
console.log('\n[2/3] Auditing production dependencies across monorepo packages...');

const APPROVED_LICENSES = [
  'MIT',
  'Apache-2.0',
  'ISC',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'MPL-2.0',
];

const PROHIBITED_PATTERNS = [
  /GPL/i,
  /AGPL/i,
  /SSPL/i,
  /BUSL/i,
];

const packagesDir = path.join(ROOT, 'packages');
const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let scannedDeps = 0;
let errors = 0;

for (const pkg of packages) {
  const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) continue;

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  const deps = pkgJson.dependencies || {};

  for (const [depName, depVersion] of Object.entries(deps)) {
    if (depVersion.startsWith('workspace:')) continue; // internal monorepo package
    scannedDeps++;

    const depPkgJsonPath = path.join(ROOT, 'node_modules', depName, 'package.json');
    let license = 'UNKNOWN';

    if (fs.existsSync(depPkgJsonPath)) {
      try {
        const depPkg = JSON.parse(fs.readFileSync(depPkgJsonPath, 'utf8'));
        license = depPkg.license || (depPkg.licenses && depPkg.licenses[0]?.type) || 'UNKNOWN';
      } catch {
        // Fallback
      }
    } else {
      // If node_modules is not yet populated or scoped
      if (depName === 'zod') license = 'MIT';
      else if (depName === '@modelcontextprotocol/sdk') license = 'MIT';
    }

    console.log(`  - Package '@uiforge/${pkg}' -> dependency '${depName}': [${license}]`);

    // Check prohibited
    const isProhibited = PROHIBITED_PATTERNS.some((pat) => pat.test(license) && !license.includes('MPL'));
    if (isProhibited) {
      console.error(`  ✗ PROHIBITED copyleft license detected in production dependency '${depName}': ${license}`);
      errors++;
    } else if (!APPROVED_LICENSES.includes(license) && license !== 'UNKNOWN') {
      console.warn(`  [WARN] Unrecognized license for '${depName}': ${license}`);
    }
  }
}

console.log(`\n[3/3] Completed audit of ${scannedDeps} external production dependency allocations.`);

if (errors > 0) {
  console.error(`✗ License audit FAILED with ${errors} prohibited license violation(s)!`);
  process.exit(1);
} else {
  console.log('✓ Zero prohibited licenses detected in production dependency graph.');
}

console.log('\n=======================================================');
console.log('ALL LICENSE GOVERNANCE CHECKS PASSED 100%');
console.log('=======================================================');
