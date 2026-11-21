# UIForge Phase 02.4: Registry Gap and Limitation Register

**Document ID:** UIF-PH02.4-REGISTRY-GAP-AND-LIMITATION-REGISTER  
**Classification:** Risk Management, Technical Debt Tracking, Legal Escalations  
**Status:** Canonical / Active  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/REGISTRY-GAP-AND-LIMITATION-REGISTER.md`  

---

## 1. Executive Summary & Purpose

The **UIForge Internal Source Registry** operates under strict evidentiary standards: known gaps, ambiguities, and unresolved legal questions must be explicitly cataloged rather than concealed. 

This register tracks all identified gaps across technical evaluation depth, legal clarity, data modeling constraints, and operational tooling, mapping each to an explicit mitigation and target resolution milestone.

---

## 2. Active Technical & Operational Gaps

| Gap ID | Title | Category | Description & Platform Impact | Affected Candidates | Mitigation / Current Workaround | Target Resolution | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `GAP-01` | **P2/P3 Technical Evaluation Depth** | Technical | 54 P2/P3 candidates received repository-level license and metadata screening but lack deep AST-level performance benchmarks. | All P2 and P3 candidates | Marked `PARTIALLY_EVALUATED` in `evaluations.json`. Blocked from core generator templates until Phase 02.5 scoring. | Phase 02.5 | `MITIGATED` |
| `GAP-02` | **Automated Tarball Mirroring** | Supply Chain | Upstream npm tarballs and Git repositories are referenced via canonical URLs but not yet mirrored to a private internal Verdaccio cache. | All 147 packages | Pinned commit hashes and SHA-256 digests in `provenance.json` ensure tamper-detection upon fetch. | Phase 03.1 | `OPEN` |
| `GAP-03` | **Subdependency AST Expansion** | Architecture | Transitive dependency trees for massive monorepos (e.g. Next.js, Storybook) are evaluated via lockfile audits rather than exhaustive per-subdependency AST analysis. | Next.js, Storybook, Vite | Scope restricted to explicit core packages; non-essential transitive plugins excluded. | Phase 02.5 | `ACCEPTED_RISK` |
| `GAP-04` | **Dual-Licensing Commercial Gates** | Legal / IP | Dual-licensed candidates (e.g. GSAP standard vs commercial plugins, Remotion) require runtime license key validation if premium plugins are requested. | GSAP, Remotion | Permitted only under free/standard tiers. Commercial plugins flagged `requiresLegalCounselReview: true`. | Phase 03.2 | `MITIGATED` |
| `GAP-05` | **Font Binary Subsetting Pipeline** | Architecture | Inter and Geist font binaries are registered as full `.woff2` files without automated unicode-range subsetting. | Inter (`AST-FONT-INTER-OFL`), Geist (`AST-FONT-GEIST-OFL`) | Manual pre-subsetted binaries verified and tracked in `assets.json`. | Phase 03.3 | `MITIGATED` |
| `GAP-06` | **Runtime axe-core Subprocess Latency** | Performance | External execution of `axe-core` via CLI or headless browser adds 400ms-1200ms latency to generation test loop. | axe-core CLI (`SRC-088`) | Caching parsed AST audit results; batching accessibility assertions. | Phase 03.4 | `OPEN` |
| `GAP-07` | **Automated CVE Webhook Invalidation** | Security | Freshness invalidations on new CVE publications are currently batch-polled rather than driven by real-time OSV/NVD webhooks. | All 125 candidates | Periodic CI audit scripts (`npm audit`, OSV scanning) run on every build. | Phase 03.1 | `OPEN` |
| `GAP-08` | **Component Group Granularity** | Data Model | 31 component groups represent high-level functional groups; sub-atom primitives (e.g., individual Radix subcomponents) are grouped under parent primitives. | Radix Primitives, React Aria | Subcomponents inherit parent primitive permissions and notices. | Phase 02.5 | `ACCEPTED_RISK` |

---

## 3. Cross-Reference to Legal Escalations (Phase 02.3 Re-alignment)

The registry explicitly maps all unresolved licensing questions to the authoritative Phase 02.3 Legal Escalation Register (`LEGAL-ESCALATION-REGISTER.md`):

| Escalation ID | Subject Candidate | Root Issue | Registry Disposition | Current Resolution Status |
| :--- | :--- | :--- | :--- | :--- |
| **`LEG-01`** | **GSAP Standard License** | Non-compete clause in GSAP Standard License; Webflow April 2025 commercial free tier. | `DEPENDENCY: ELIGIBLE_WITH_RESTRICTIONS` (emitted user dependency); `SOURCE_COPY: BLOCKED`. | Formal counsel review pending; restrictive guardrails active. |
| **`LEG-02`** | **axe-core (MPL-2.0)** | Section 3 "Larger Work" obligations; notice distribution in generated enterprise bundles. | `DEPENDENCY: ELIGIBLE_WITH_RESTRICTIONS`; `SOURCE_COPY: ELIGIBLE_WITH_RESTRICTIONS` (modified files under MPL). | Notice generation automated in `consumption-permissions.json`. |
| **`LEG-03`** | **pa11y (LGPL-3.0)** | Strong copyleft dynamic linking concerns in compiled JavaScript runtimes. | `DEPENDENCY: PENDING_REVIEW`; `SOURCE_COPY: BLOCKED`; `EXTERNAL_TOOL: APPROVED`. | Sandboxed CLI execution isolated; direct import blocked. |
| **`LEG-04`** | **LiquidJS Historical Licensing** | Historical MulanPSL references reconciled; confirmed MIT for audited v10.x line. | `DEPENDENCY: APPROVED`; `SOURCE_COPY: APPROVED`. | Reconciled and verified MIT in Phase 02.3 remediation. |
| **`LEG-05`** | **SIL OFL 1.1 Fonts** | Reserved Font Name (RFN) compliance and binary bundling in commercial products. | `ASSET_REDISTRIBUTION: ELIGIBLE_WITH_RESTRICTIONS` (RFN preserved, OFL text retained). | Bundled font assets tracked in `assets.json` with hash validation. |
| **`LEG-06`** | **Remotion Commercial Tier** | Free for individuals / small entities; paid license required for companies > 3 employees. | `DEPENDENCY: CONDITIONAL`; `requiresLegalCounselReview: true`. | Gated behind user-supplied license key configuration. |
| **`LEG-07`** | **Tailwind UI / Aceternity (Closed Code)** | Proprietary component templates; strict prohibition against redistribution. | `DEPENDENCY: BLOCKED`; `SOURCE_COPY: BLOCKED`; `REFERENCE_ONLY: APPROVED`. | Clean-room implementation required; zero code copying. |
| **`LEG-08`** | **v0 / Locofy.ai (SaaS Platforms)** | Cloud-hosted generation APIs; non-redistributable proprietary terms. | `DEPENDENCY: BLOCKED`; `SOURCE_COPY: BLOCKED`; `REFERENCE_ONLY: APPROVED`. | Reference for design patterns and prompt engineering only. |
| **`LEG-09`** | **W3C Software & Document License** | Attribution and notice retention for W3C ARIA design pattern examples. | `SOURCE_COPY: ELIGIBLE_WITH_RESTRICTIONS` (verbatim W3C notice retention). | Notice block configured in `consumption-permissions.json`. |
| **`LEG-10`** | **Lucide Icons (ISC License)** | Retaining copyright notice across hundreds of inlined SVG icons. | `ASSET_REDISTRIBUTION: APPROVED`; `SOURCE_COPY: APPROVED`. | Global attribution header configured for generated icon packs. |

---

## 4. Technical Debt and Maintenance Backlog

1. **Schema Validation Integration in CI:** Migrate the standalone validation runner `validate_registry.js` into the root npm test pipeline (`npm test`) during Phase 03.
2. **Registry Web UI / Visual Inspector:** Develop a lightweight internal developer dashboard to visualize the 125 candidates, their permission matrices, and freshness statuses.
3. **Automated SemVer Bot:** Implement a GitHub Action to ping npm for new versions of registered packages and automatically open PRs against `packages.json` and `provenance.json`.
