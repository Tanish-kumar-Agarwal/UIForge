# UIForge Phase 02.4: Registry Decision Register

**Document ID:** UIF-PH02.4-REGISTRY-DECISION-REGISTER  
**Classification:** Architecture Decision Records (ADRs), System Governance  
**Status:** Canonical / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/REGISTRY-DECISION-REGISTER.md`  

---

## 1. Executive Summary & Purpose

This register records the foundational architectural decisions (**RDEC-01 through RDEC-10**) established during the design and execution of UIForge Phase 02.4 (Internal Source Registry). Each record documents the context, architectural decision, rationale, trade-offs, rejected alternatives, and operational status.

---

## 2. Architecture Decision Records (RDEC-01 – RDEC-10)

```
┌────────────────────────────────────────────────────────────────────────┐
│ RDEC-01: Normalized Multi-Entity Model vs Monolithic Record            │
│ RDEC-02: 6-Mode Consumption Matrix vs Binary Approve/Reject            │
│ RDEC-03: Pessimistic Decision Precedence (BLOCKED Overrides All)       │
│ RDEC-04: JSON Schema Draft-07 Formal Contract Standard                 │
│ RDEC-05: Pinned Commits & SHA-256 Content Digests vs Floating Head     │
│ RDEC-06: Priority-Calibrated Freshness Tiers (P0: 30d to P3: 180d)     │
│ RDEC-07: Sequential 8-Stage Ingestion Pipeline Gates                   │
│ RDEC-08: Architectural Separation of Registry Data from Runtime Engine │
│ RDEC-09: Fine-Grained Governance for Dual-Licensed & Commercial Tools  │
│ RDEC-10: Mandatory Independent Cryptographic Asset Verification        │
└────────────────────────────────────────────────────────────────────────┘
```

---

### RDEC-01: Normalized Multi-Entity Model vs Monolithic Record
- **Context:** Early research conflated GitHub repositories, npm packages, UI components, and binary assets into a single "candidate" flat object. This caused severe data duplication and false licensing inheritance (e.g. assigning a monorepo's root MIT license to an external binary asset).
- **Decision:** Decompose the registry into 10 relational, normalized entities: `sources`, `repositories`, `packages`, `components`, `assets`, `licenses`, `evaluations`, `consumption-permissions`, `provenance`, and `evidence`.
- **Rationale:** A single repository (e.g., `radix-ui/primitives`) exports dozens of independently versioned npm packages. Normalization allows precise per-package and per-asset tracking without redundancy.
- **Trade-offs:** Requires referential integrity validation via joins/foreign keys.
- **Alternatives Considered:** Single monolithic JSON file (rejected: unwieldy, high schema churn, prone to merge conflicts).
- **Status:** `ACCEPTED`

---

### RDEC-02: 6-Mode Consumption Matrix vs Binary Approve/Reject
- **Context:** Categorizing an entire source candidate as simply "APPROVED" or "REJECTED" is technically invalid. For example, GSAP is excellent for user dependencies but illegal to copy into proprietary source code; axe-core is safe as an external CLI but subject to MPL-2.0 copyleft obligations if source code is modified.
- **Decision:** Evaluate every source across 6 independent consumption modes: `REFERENCE_ONLY`, `DEPENDENCY`, `SOURCE_COPY`, `ASSET_REDISTRIBUTION`, `EXTERNAL_TOOL`, and `TEMPLATE_ADAPTATION`.
- **Rationale:** Grants maximum architectural flexibility while maintaining strict legal and security compliance.
- **Trade-offs:** Multiplies evaluation volume to $125 \times 6 = 750$ explicit permission records.
- **Alternatives Considered:** Single binary flag `isApproved: boolean` (rejected: legally hazardous and architecturally simplistic).
- **Status:** `ACCEPTED`

---

### RDEC-03: Pessimistic Decision Precedence (BLOCKED Overrides All)
- **Context:** When combining technical, legal, and security evaluations, a mechanism is required to resolve conflicting signals (e.g., a candidate with a 10/10 technical score but a restrictive commercial license).
- **Decision:** Enforce strict pessimistic precedence: `BLOCKED` > `PENDING_REVIEW` > `REFERENCE_ONLY` > `ELIGIBLE_WITH_RESTRICTIONS` > `APPROVED` > `NOT_APPLICABLE`.
- **Rationale:** High technical performance can never waive copyright infringement risk or supply-chain compromise. Safety must always override feature richness.
- **Trade-offs:** Conservative posture may temporarily block innovative packages pending legal review.
- **Alternatives Considered:** Weighted composite scoring where legal risk is just a numerical penalty (rejected: unacceptable legal exposure).
- **Status:** `ACCEPTED`

---

### RDEC-04: JSON Schema Draft-07 Formal Contract Standard
- **Context:** To prevent schema drift and ensure programmatic interoperability with both TypeScript code and external auditing tools, a formal contract standard is needed.
- **Decision:** Standardize all data schemas on **JSON Schema Draft-07** (`source-registry.schema.json`, `consumption-permissions.schema.json`, `provenance-and-evidence.schema.json`).
- **Rationale:** Draft-07 is the industry standard with ubiquitous tooling support across Node.js (Ajv), Python, Go, and IDE validators.
- **Trade-offs:** Does not use Draft 2020-12 dynamic anchors (unnecessary for current registry needs).
- **Alternatives Considered:** TypeScript `.d.ts` interfaces only (rejected: does not provide runtime schema validation for raw JSON manifests).
- **Status:** `ACCEPTED`

---

### RDEC-05: Pinned Commits & SHA-256 Content Digests vs Floating Head
- **Context:** Tracking the `main` or `master` branch head of external open-source projects exposes UIForge to silent upstream code mutations, protestware injection, and license retrofitting.
- **Decision:** Mandate that all evaluations, packages, and assets record the exact evaluated Git commit hash (40-char hex) and a calculated 64-character SHA-256 content digest.
- **Rationale:** Guarantees 100% deterministic reproducibility and tamper-evident supply-chain auditing.
- **Trade-offs:** Requires active maintenance to bump versions rather than getting automatic updates.
- **Alternatives Considered:** SemVer range tracking (e.g., `^1.0.0`) (rejected: non-deterministic and vulnerable to supply-chain attacks).
- **Status:** `ACCEPTED`

---

### RDEC-06: Priority-Calibrated Freshness Tiers (P0: 30d to P3: 180d)
- **Context:** Re-evaluating 125 candidate sources on a uniform weekly cycle creates unsustainable operational overhead, while an annual cycle leaves critical dependencies vulnerable.
- **Decision:** Calibrate staleness windows by discovery priority: P0 (30 days), P1 (60 days), P2 (90 days), P3 (180 days).
- **Rationale:** Concentrates engineering scrutiny on the core critical path dependencies (e.g., Radix, Tailwind, Lucide) while maintaining appropriate monitoring on exploratory libraries.
- **Trade-offs:** P2/P3 libraries may lag behind upstream releases for up to 90–180 days.
- **Alternatives Considered:** Uniform 30-day window for all 125 sources (rejected: excessive cognitive load with diminishing returns).
- **Status:** `ACCEPTED`

---

### RDEC-07: Sequential 8-Stage Ingestion Pipeline Gates
- **Context:** Ingesting external libraries directly into the codebase without systematic quality checks leads to architectural bloat and security regressions.
- **Decision:** Enforce an immutable 8-stage gate sequence: Identity Validation $\to$ Repository/Package Fetch $\to$ Cryptographic Digesting $\to$ Static Analysis $\to$ License Clearance $\to$ 10-Dimension Technical Evaluation $\to$ Consumption Mode Determination $\to$ Registry Ingestion.
- **Rationale:** Early rejection saves evaluation effort; failure at any gate halts the pipeline immediately.
- **Trade-offs:** Increases latency when onboarding new experimental candidates.
- **Alternatives Considered:** Ad-hoc developer installation with post-hoc auditing (rejected: leads to irreversible tech debt).
- **Status:** `ACCEPTED`

---

### RDEC-08: Architectural Separation of Registry Data from Runtime Engine
- **Context:** Embedding registry data directly inside the UIForge generator runtime code creates tight coupling, slows compile times, and bloats the production CLI bundle.
- **Decision:** Decouple registry intelligence into an independent governance data layer (`data/` + `@uiforge/registry-contracts`), consumed by the runtime engine via clean query interfaces.
- **Rationale:** Allows data updates, audits, and security patches without requiring a rebuild or release of the core UIForge CLI.
- **Trade-offs:** Requires an asynchronous query abstraction in the generator engine.
- **Alternatives Considered:** Compiling JSON directly into TypeScript constants inside the generator (rejected: rigid, inflexible).
- **Status:** `ACCEPTED`

---

### RDEC-09: Fine-Grained Governance for Dual-Licensed & Commercial Tools
- **Context:** Candidates like GSAP (Webflow non-compete clause) and Remotion (commercial tier for >3 employees) offer valuable capabilities but carry severe commercial liability if misused.
- **Decision:** Permit these sources under `CONDITIONAL` or `ELIGIBLE_WITH_RESTRICTIONS` for emitted dependencies while strictly blocking internal source-code copying, and mandating `requiresLegalCounselReview: true`.
- **Rationale:** Avoids artificially discarding industry-leading animation engines while shielding UIForge and its enterprise users from license violations.
- **Trade-offs:** Requires downstream template generators to enforce license-key configuration or user consent dialogs.
- **Alternatives Considered:** Blanket prohibition (rejected: harms generator output quality); Blanket approval (rejected: massive legal liability).
- **Status:** `ACCEPTED`

---

### RDEC-10: Mandatory Independent Cryptographic Asset Verification
- **Context:** Static assets such as fonts (`.woff2`) and icon packs (`.svg`) are frequently redistributed as raw binaries without package managers, making them susceptible to silent tampering or Reserved Font Name violations.
- **Decision:** Track all static assets in a dedicated `assets.json` entity, requiring an explicit artifact typology, a calculated SHA-256 digest, and an independent verification audit record.
- **Rationale:** Ensures complete IP clearance and cryptographic tamper-detection for all redistributed binaries.
- **Trade-offs:** Adds an additional asset registry maintenance step.
- **Alternatives Considered:** Treating assets as generic files inside package tarballs (rejected: obscures licensing conditions like SIL OFL).
- **Status:** `ACCEPTED`
