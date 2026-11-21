# UIForge Phase 02.4: Registry Changelog

**Document ID:** UIF-PH02.4-REGISTRY-CHANGELOG  
**Classification:** Version History, Release Notes, Audit Traceability  
**Status:** Canonical / Active  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/REGISTRY-CHANGELOG.md`  

---

## [1.2.0] — 2026-11-22

### Comprehensive Resolution of Remaining Issues (Issues 1 – 12)

#### 1. Dependency Arithmetic Reconciliation (Issue 1)
- Reconciled all 125 candidate sources in `DEPENDENCY` mode: **111 APPROVED + 2 RESTRICTED (113 eligible) + 7 BLOCKED + 1 PENDING_REVIEW + 4 NOT_APPLICABLE (`Every-Layout`, `claude-code`, `cursor`, `windsurf`) = 125 exact**.
- Resolved the missing 2 records by properly classifying non-package candidates (`OS-AGNT-03`, `OS-AGNT-04`, `OS-AGNT-05`, `OS-LAYT-08`) as `NOT_APPLICABLE` in dependency mode rather than using mismatched enums.

#### 2. REJ Selection Precedence & Default Core Stack Exclusion (Issue 2)
- Formally defined that `originalDiscoveryPriority: REJ` strictly excludes candidates from selection as UIForge's default core runtime stack in Phase 02.5.
- Mode-level `ELIGIBLE_WITH_RESTRICTIONS` for GSAP defines legal emission boundaries for optional, user-requested secondary plugins only, and does not override core stack rejection.

#### 3. Every Layout Licensing Terms & License Entity Census (Issues 3 & 10)
- Added **`LIC-EVERY-LAYOUT-COMMERCIAL`** to `data/licenses.json`, expanding the canonical license census to **12 normalized license entities**.
- Corrected Every Layout's license basis: documented paid authored content terms prohibiting component code redistribution while confirming clean-room implementation permissions for underlying CSS flex/grid layout algorithms.

#### 4. Font Inventory Reconciliation & Fontsource Mapping (Issue 4)
- Reconciled font inventory: Inter (`OS-TYPO-04`) and Geist (`OS-TYPO-05`) are standalone font upstream candidates; JetBrains Mono and Fira Code are font packages distributed via the Fontsource monorepo candidate (`OS-TYPO-03`).
- Added asset records for `JetBrains Mono` and `Fira Code` to `data/assets.json` (8 assets total), tracing their SIL OFL 1.1 RFN terms directly to `OS-TYPO-03`.

#### 5. Candidate IDs vs Source IDs Distinction (Issue 5)
- Preserved original immutable `candidateId` directly alongside `sourceId` across all 125 records in `data/sources.json`.
- Updated test harness to assert direct equality against upstream master inventory IDs without string alias transformations.

#### 6. axe-core External-Tool Distribution Boundary (Issues 6 & 11)
- Updated `axe-core` external tool mode to **`ELIGIBLE_WITH_RESTRICTIONS`** (`counselReviewRequired: true`).
- Formulated concrete distribution model: UIForge supports execution strictly as a user-managed external integration (invoking user-installed `@axe-core/cli`; zero binary bundling or redistribution).

#### 7. Claim-Level Evidence Quality Enhancement (Issue 7)
- Enhanced all 625 items in `data/evidence.json` with `claimSupported`, `exactSourceArtifact`, `relevantFileOrSection`, and `verificationClassification`.

#### 8. Validation Scope & Boundary Qualification (Issue 8)
- Qualified in `REGISTRY-VALIDATION-REPORT.md` and acceptance reports precisely what the automated test harness validates (structural and referential data integrity) versus what requires ongoing legal counsel or human review.

#### 9. GSAP Restriction Scoped to UIForge Product Behavior (Issue 9)
- Scoped GSAP's restriction to Webflow’s April 30, 2025 Standard License terms: prohibited use is narrow (no-code visual animation-building tools). UIForge’s programmatic React/TypeScript code emission is permitted.

#### 10. Technical Evaluation Terminology Standardization (Issue 12)
- Replaced inappropriate "AST audit" claims with **"71 complete candidate technical evaluations"** and **"54 screened/partial evaluations"**.

#### 11. Validation Suite Expansion (46 / 46 PASS)
- Expanded `validation/validate_registry.js` from 41 to **46 comprehensive assertions** (all 46 passing cleanly, 0 failures; Script SHA-256: `a96bfe007c3f57c12c0f365a677131de795cb8d38598b1524b2a635bef67916c`).

---

## [1.1.0] — 2026-11-22

### Final Independent Reconciliation & Acceptance Correction (C01–C10 Resolution)
- Preserved canonical priorities (P0: 24, P1: 47, P2: 50, REJ: 4) and operational tiers.
- Filtered repositories to 119 real Git repositories (removed 6 placeholder portals).
- Reconciled pa11y external tool to `PENDING_REVIEW`.
- Re-classified provenance to `DIGEST_BACKED_RECORD`.

---

## [1.0.0] — 2026-11-22

### Initial Authoritative Release of the UIForge Internal Source Registry
- Established multi-entity normalized model.
- Defined formal JSON Schema Draft-07 contracts.
- Documented 6 consumption modes, 30-threat security model, freshness tiers, operating model, and platform integration contracts.
