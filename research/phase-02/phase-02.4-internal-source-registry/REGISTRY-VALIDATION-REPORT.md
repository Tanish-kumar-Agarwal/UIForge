# UIForge Phase 02.4: Reconciled Registry Validation Report

**Document ID:** UIF-PH02.4-REGISTRY-VALIDATION-REPORT  
**Classification:** Automated Test Execution, Quality Assurance, Audit Certification  
**Status:** Certified / Complete  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/REGISTRY-VALIDATION-REPORT.md`  
**Execution Timestamp:** 2026-11-22T01:28:41+05:30  
**Validation Engine:** Node.js v24.15.0 (Windows NT x64)  
**Harness Script:** `research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js`  
**Harness SHA-256 Digest:** `502067519829c38183122f6332e3b096083aa2a983b8ca0a12ce0cb1641a2d28`  

---

## 1. Executive Summary & Audit Outcome

Following independent audit findings C01 through C10, an expanded automated validation harness was executed against the reconciled UIForge Phase 02.4 dataset. The test suite evaluates schema conformance, canonical priority preservation (P0: 24, P1: 47, P2: 50, REJ: 4), authoritative Git repository counts (119 real Git repos; zero placeholder repos for SaaS/commercial portals), granular reference-only scopes, pa11y legal review gating (`EXTERNAL_TOOL: PENDING_REVIEW`), explicit font Reserved Font Name (RFN) evidence, 1,250 dimensional assessments across 10 technical dimensions, 625 granular evidence items, and mode-specific Phase 02.5 eligibility filtering.

### Test Execution Summary
- **Total Assertions Evaluated:** 41
- **Assertions Passed:** 41 (100.0%)
- **Assertions Failed:** 0 (0.0%)
- **Assertions Skipped:** 0 (0.0%)
- **Exit Status Code:** `0` (Clean Exit)
- **Certification Outcome:** **FULL ACCEPTANCE / PASS**

---

## 2. Reproducibility Guide

To reproduce this validation report independently in any clean environment:

```bash
# Ensure Node.js (>= v18.0.0) is installed
node -v

# Navigate to UIForge project root
cd c:/Users/kukpo/OneDrive/Desktop/UIForge

# Verify the cryptographic integrity of the test harness script
node -e "const crypto = require('crypto'); const fs = require('fs'); const hash = crypto.createHash('sha256').update(fs.readFileSync('research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js')).digest('hex'); console.log('Expected: 502067519829c38183122f6332e3b096083aa2a983b8ca0a12ce0cb1641a2d28'); console.log('Computed: ' + hash);"

# Execute the validation suite
node research/phase-02/phase-02.4-internal-source-registry/validation/validate_registry.js
```

---

## 3. Verbatim Validation Execution Transcript

```
================================================================
UIFORGE PHASE 02.4: RECONCILED INTERNAL SOURCE REGISTRY HARNESS
================================================================
[PASS] 01: All 10 normalized data entities exist and parse as valid JSON
[PASS] 02: All 3 JSON Schemas exist and parse as valid Draft-07 schemas
[PASS] 03: Source registry contains exactly 125 canonical records (observed: 125)
[PASS] 04: All 125 source records have unique sourceId identifiers with zero collisions
[PASS] 05: 100% of canonical candidate IDs from Phase 02.1/02.3 are preserved in the source registry
[PASS] 06: 100% of candidate records preserve original discovery priority from canonical inventory
[PASS] 07: Canonical priority distribution matches exactly: P0: 24, P1: 47, P2: 50, REJ: 4 (observed: P0:24, P1:47, P2:50, REJ:4)
[PASS] 08: Operational tiers map deterministically to priorities: TIER_A: 24, TIER_B: 47, TIER_C: 50, TIER_D: 4
[PASS] 09: Authoritative Git repository manifest contains exactly 119 real Git repositories (observed: 119)
[PASS] 10: Exactly 119 open-source candidates link to verified Git repositories in repositories.json (observed: 119)
[PASS] 11: Exactly 6 commercial/docs/SaaS candidates have repositoryRef: null with verified platform URLs (observed: 6)
[PASS] 12: Normalized packages manifest contains 147 packages resolving monorepos (observed: 147)
[PASS] 13: Components manifest contains 31 primary component groups (observed: 31)
[PASS] 14: Canonical license manifest defines exactly 11 normalized license entities (observed: 11)
[PASS] 15: 100% of source records link to normalized licenses and feature granular licenseScope
[PASS] 16: Asset manifest tracks exactly 6 standalone verified assets (observed: 6)
[PASS] 17: Inter font asset explicitly documents RFN declaration ("with Reserved Font Name Inter"), version 4.1, and unchanged binary status
[PASS] 18: Geist font asset explicitly documents RFN declaration ("with Reserved Font Name Geist"), version 1.4.0, and unchanged binary status
[PASS] 19: Consumption permissions matrix contains exactly 750 records (125 * 6 modes; observed: 750)
[PASS] 20: 100% of permission records adhere strictly to canonical eligibility enum
[PASS] 21: 100% of permission records maintain consistent allowed boolean derivations
[PASS] 22: GSAP dependency mode is ELIGIBLE_WITH_RESTRICTIONS (emitted user dependency with non-compete clause)
[PASS] 23: GSAP source-copy mode is strictly BLOCKED
[PASS] 24: axe-core dependency mode is ELIGIBLE_WITH_RESTRICTIONS (MPL-2.0 Section 3 notice obligations)
[PASS] 25: axe-core source-copy mode is ELIGIBLE_WITH_RESTRICTIONS (modified covered files under MPL-2.0)
[PASS] 26: pa11y dependency mode is PENDING_REVIEW (LGPL-3.0 dynamic linking concerns)
[PASS] 27: pa11y source-copy mode is strictly BLOCKED
[PASS] 28: pa11y external-tool mode is PENDING_REVIEW pending counsel confirmation of distribution model
[PASS] 29: 100% of REFERENCE_ONLY records define explicit granular referenceScope flags
[PASS] 30: Automated scraping and code copying are strictly prohibited across ALL 125 reference records
[PASS] 31: Commercial/closed products strictly forbid source inspection and local cloning under reference mode
[PASS] 32: Evaluations manifest contains 125 evaluation dossiers (observed: 125)
[PASS] 33: Exactly 1,250 dimensional assessments preserved across all 125 candidates (125 * 10; observed: 1250)
[PASS] 34: Technical evaluation depths traceable to Phase 02.2: 71 complete (all 10 assessed) and 54 partial/screened (observed: 71 complete, 54 partial)
[PASS] 35: Evidence manifest contains exactly 125 candidate dossiers (observed: 125)
[PASS] 36: Evidence catalog contains 625 granular evidence items supporting individual claims (observed: 625)
[PASS] 37: 100% of granular evidence items utilize controlled evidence classifications
[PASS] 38: Provenance manifest contains 125 records (observed: 125)
[PASS] 39: 100% of provenance records correctly classified as DIGEST_BACKED_RECORD with valid SHA-256 digests
[PASS] 40: Mode-specific filtering isolates eligible dependencies (115) from blocked/pending dependencies (8)
[PASS] 41: pa11y, Aceternity, and Locofy are strictly excluded from eligible dependency pool
----------------------------------------------------------------
RECONCILED VALIDATION SCRIPT SHA-256: 502067519829c38183122f6332e3b096083aa2a983b8ca0a12ce0cb1641a2d28
================================================================
VALIDATION HARNESS COMPLETE: 41 / 41 TESTS PASSED (0 failures)
================================================================
```

---

## 4. Formal Certification

I hereby certify that the UIForge Phase 02.4 Internal Source Registry has undergone automated validation in accordance with the Phase 02.4 Master Execution Directive and Final Reconciliation Directive. The dataset is mathematically reconciled with the Phase 02.1/02.3 canonical baseline.

**Auditor:** Principal Software Architect & Independent Evidence Auditor  
**Date:** 2026-11-22  
**Result:** **FULL ACCEPTANCE (PASS)**
