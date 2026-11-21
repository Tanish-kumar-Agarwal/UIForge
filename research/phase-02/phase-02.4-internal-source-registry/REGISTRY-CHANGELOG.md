# UIForge Phase 02.4: Registry Changelog

**Document ID:** UIF-PH02.4-REGISTRY-CHANGELOG  
**Classification:** Version History, Release Notes, Audit Traceability  
**Status:** Canonical / Active  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/REGISTRY-CHANGELOG.md`  

---

## [1.2.0] — 2026-11-22

### Comprehensive Resolution of Remaining Issues (Findings 01 – 12)

#### 1. Dependency Arithmetic Reconciliation (Finding 01)
- Reconciled all 125 candidate sources in `DEPENDENCY` mode: **111 APPROVED + 2 RESTRICTED (113 eligible) + 7 BLOCKED + 1 PENDING_REVIEW + 4 NOT_APPLICABLE (`Every-Layout`, `claude-code`, `cursor`, `windsurf`) = 125 exact**.
- Resolved the missing 2 records by properly classifying non-package candidates (`OS-AGNT-03`, `OS-AGNT-04`, `OS-AGNT-05`, `OS-LAYT-08`) as `NOT_APPLICABLE` in dependency mode rather than using mismatched enums.

#### 2. REJ Selection Precedence & Default Core Stack Exclusion (Finding 02)
- Formally defined that `originalDiscoveryPriority: REJ` strictly excludes candidates from selection as UIForge's default core runtime stack in Phase 02.5.
- Mode-level `ELIGIBLE_WITH_RESTRICTIONS` for GSAP defines legal emission boundaries for optional, user-requested secondary plugins only, and does not override core stack rejection.

#### 3. Every Layout License Entity Census (Finding 03)
- Added **`LIC-EVERY-LAYOUT-COMMERCIAL`** to `data/licenses.json`, expanding the canonical license census to **12 normalized license entities** and covering all 125 candidate sources.

#### 4. Font Inventory Reconciliation & Fontsource Mapping (Finding 04)
- Reconciled font inventory: Inter (`OS-TYPO-04`) and Geist (`OS-TYPO-05`) are standalone font upstream candidates; JetBrains Mono and Fira Code are font packages distributed via the Fontsource monorepo candidate (`OS-TYPO-03`).
- Added asset records for `JetBrains Mono` and `Fira Code` to `data/assets.json` (8 assets total), tracing their SIL OFL 1.1 RFN terms directly to `OS-TYPO-03`.

#### 5. Candidate IDs vs Source IDs Distinction (Finding 05)
- Preserved original immutable `candidateId` directly alongside `sourceId` across all 125 records in `data/sources.json`.
- Updated test harness to assert direct equality against upstream master inventory IDs without string alias transformations.

#### 6. axe-core External-Tool Distribution Boundary (Finding 06)
- Updated `axe-core` external tool mode to **`ELIGIBLE_WITH_RESTRICTIONS`** (`allowed: true`).
- Established concrete distribution boundary: UIForge supports execution strictly as a user-managed external integration (invoking user-installed `@axe-core/cli`; zero binary bundling or redistribution).

#### 7. Claim-Level Evidence Quality Enhancement (Finding 07)
- Enhanced all 625 items in `data/evidence.json` with `claimSupported`, `exactSourceArtifact`, `relevantFileOrSection`, and `verificationClassification`.

#### 8. Validation Scope & Boundary Qualification (Finding 08)
- Qualified in `REGISTRY-VALIDATION-REPORT.md` and acceptance reports precisely what the automated test harness validates (structural and referential data integrity) versus what requires ongoing legal counsel or human review. Emphasized that a passing validator proves only the conditions it actually tests.

#### 9. GSAP Restriction Scoped to UIForge Product Behavior (Finding 09)
- Scoped GSAP's restriction to Webflow’s April 30, 2025 Standard License terms: prohibited use is narrow (no-code visual animation-building tools). UIForge’s programmatic React/TypeScript code emission is permitted.

#### 10. Every Layout Authored Content Terms vs Clean-Room Boundaries (Finding 10)
- Distinguished permissible study of general, uncopyrightable CSS layout patterns (flexbox wrapping, CSS grid auto-fit/auto-fill, clamp-based fluid spacing) from strictly prohibited copying of protected authored text, explanatory prose, copyrighted diagrams, illustrations, or proprietary implementation code under `LIC-EVERY-LAYOUT-COMMERCIAL`. Qualified that UIForge makes no unconditional legal guarantee of non-infringement; clean-room engineering verification and legal review remain required.

#### 11. Mandatory Counsel Review Flags (`counselReviewRequired: true`) (Finding 11)
- Preserved `counselReviewRequired: true` across `axe-core` and `pa11y` in `data/consumption-permissions.json` and governance policies, ensuring architectural isolation models are not misconstrued as unconditional legal clearance.

#### 12. Technical Evaluation Terminology Standardization (Finding 12)
- Replaced inappropriate "AST audit" claims with **"71 complete candidate technical evaluations"** and **"54 screened/partial evaluations"**.

#### 13. Validation Suite Expansion (46 / 46 PASS)
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
