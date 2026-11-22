import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
console.log('=== UIFORGE ARCHITECTURAL BOUNDARY & IMPORT CHECKER ===\n');

// 1. Run Madge Circularity Check
console.log('[1/2] Checking for circular dependencies via Madge...');
try {
  const packagesDir = path.join(ROOT, 'packages');
  const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const srcDirs = packages
    .map((p) => path.join('packages', p, 'src'))
    .filter((d) => fs.existsSync(path.join(ROOT, d)));

  const madgeOutput = execSync(`npx madge --circular ${srcDirs.join(' ')}`, {
    cwd: ROOT,
    encoding: 'utf8',
  });
  console.log(madgeOutput);
  if (madgeOutput.includes('Found 0 circular dependencies') || !madgeOutput.includes('circular')) {
    console.log('✓ Madge circularity check: PASSED (0 cycles detected)');
  }
} catch (err) {
  // If madge finds circular dependencies it exits with non-zero
  console.error('✗ Madge detected circular dependencies:\n', err.stdout || err.message);
  process.exit(1);
}

// 2. Strict Architectural Allowlist Verification
console.log('\n[2/2] Checking architectural import allowlists across packages...');

const ALLOWED_INTERNAL_IMPORTS = {
  contracts: [], // Ground state Level 0: Zero internal imports
  config: [],    // Internal tooling: Zero internal imports
  'project-analyzer': ['contracts', 'config'],
  core: ['contracts', 'config', 'project-analyzer'],
  'mcp-server': ['contracts', 'config', 'core', 'project-analyzer'],
};

const packagesDir = path.join(ROOT, 'packages');
const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let violations = 0;

for (const pkg of packages) {
  const allowed = ALLOWED_INTERNAL_IMPORTS[pkg];
  if (!allowed) {
    console.warn(`[WARN] Package '${pkg}' is not in the recognized allowlist register!`);
    continue;
  }

  const srcDir = path.join(packagesDir, pkg, 'src');
  if (!fs.existsSync(srcDir)) continue;

  const files = getAllSourceFiles(srcDir);
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const importRegex = /(?:import|from)\s+['"](@uiforge\/[^'"]+)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importedPkg = match[1].replace('@uiforge/', '');
      if (!allowed.includes(importedPkg)) {
        console.error(
          `✗ VIOLATION in ${path.relative(ROOT, file)}: ` +
          `Package '@uiforge/${pkg}' is FORBIDDEN from importing '@uiforge/${importedPkg}'!`
        );
        violations++;
      }
    }
  }
}

function getAllSourceFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllSourceFiles(full));
    } else if (/\.(ts|tsx|js|mjs)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

if (violations > 0) {
  console.error(`\n✗ Architectural boundary check FAILED with ${violations} forbidden import violation(s)!`);
  process.exit(1);
} else {
  console.log('✓ All package imports strictly conform to architectural levels (0 violations).');
}

console.log('\n=======================================================');
console.log('ALL ARCHITECTURAL BOUNDARY CHECKS PASSED 100%');
console.log('=======================================================');
