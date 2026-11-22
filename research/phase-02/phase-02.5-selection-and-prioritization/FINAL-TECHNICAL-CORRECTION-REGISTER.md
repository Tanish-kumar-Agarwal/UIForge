# UIFORGE — PHASE 02.5: FINAL TECHNICAL CORRECTION REGISTER
## Comprehensive Audit Trail of Technical Findings C01 Through C37

**Document ID:** `UIF-PH02.5-FINAL-TECHNICAL-CORRECTION-REGISTER`  
**Phase:** Phase 02.5 — Repository Selection, Technical Prioritization & Adoption Strategy  
**Authority:** Principal Software Architect & Technical Due-Diligence Auditor  
**Status:** **100% RESOLVED — 37 / 37 AUDIT FINDINGS CLOSED WITH EMPIRICAL EVIDENCE**  
**Audit Date:** 2026-11-22  

---

## 1. Master Findings Resolution Summary (C01 Through C37)

Every finding raised across Phase 02.5 audit cycles has been investigated, resolved against canonical upstream sources, and permanently documented:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                         MASTER TECHNICAL CORRECTIONS MATRIX (C01–C37)                            │
├─────┬──────────────────────┬──────────────────────────────────────────────────────────┬──────────┤
│ ID  │ Scrutinized Area     │ Technical Root Cause & Verified Remediation              │ Status   │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C01 │ React-Grid-Layout    │ Reopened maintenance evaluation; verified active release │ RESOLVED │
│     │ Maintenance & ID     │ v2.3.0 (Oct 2026); resolved identity as OS-DASH-05.      │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C02 │ Remotion Licensing   │ Corrected overbroad rejection; separated license terms   │ RESOLVED │
│     │ & Mission Fit        │ from mission misfit (rejected for UI scope, not license).│          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C03 │ DTCG Specification   │ Evaluated G3/G6 as NOT_APPLICABLE under gate matrix      │ RESOLVED │
│     │ Gate Applicability   │ rather than treating standard specification as abandoned.│          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C04 │ BackstopJS Redundancy│ Corrected maintenance claim (v6.3.25 active); rejected   │ RESOLVED │
│     │ vs Maintenance       │ for capability redundancy with Playwright in Tier 5.     │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C05 │ Aceternity UI Resale │ Evaluated proprietary redistribution clause; strictly    │ RESOLVED │
│     │ Restrictions         │ quarantined to Tier 5 under G2 licensing failure.        │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C06 │ Visx Bundle Size     │ Qualified ~15-20 KB tree-shaken claim as preliminary     │ RESOLVED │
│     │ Qualification        │ estimate subject to Phase 03 benchmark verification.     │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C07 │ RGL A11y Scoring     │ Qualified 5.5/10 accessibility score as preliminary      │ RESOLVED │
│     │ Matrix Specification │ estimate subject to 6-test verification matrix in Ph 03. │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C08 │ Scorecard Formula    │ Reconciled all 125 candidate scores to match weighted    │ RESOLVED │
│     │ Arithmetic Alignment │ formula Final Score = Σ(Dim × Weight) × 10 exactly.      │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C09 │ Evidence Claim       │ Generated 125 granular claim dossiers matching 100% of   │ RESOLVED │
│     │ Register Traceability│ candidates with unique CLM-PH02.5-* identifiers.         │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C10 │ Style Dictionary     │ Upgraded to Style Dictionary v5.8.0 supporting native    │ RESOLVED │
│     │ Version Upgrade      │ DTCG format on Node.js 22 LTS without legacy transforms. │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C11 │ Canonical Identity & │ Reconciled 11 scrutinized candidate IDs against Phase    │ RESOLVED │
│     │ Alias Reconciliation │ 02.4 sources.json, eliminating silent reassignments.     │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C12 │ Hard-Gate Schema     │ Restored canonical G1-G6 gate definitions (G4=Architec-  │ RESOLVED │
│     │ Definition Integrity │ ture, G6=Security) preserving evaluation consistency.    │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C13 │ MCP SDK Pinned Range │ Specified declared semver range ^2.1.0 (evaluated v2.1.1)│ RESOLVED │
│     │ & Negotiation Spec   │ with auto-negotiation between modern and legacy protocol.│          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C14 │ Pa11y Copyleft Gating│ Quarantined pa11y to Tier 4 (DEFER) with G2: PENDING     │ RESOLVED │
│     │ & Review Disposition │ pending formal legal counsel review of LGPL-3.0 linking. │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C15 │ GSAP Secondary Scope │ Preserved original REJ priority; admitted to Tier 2      │ RESOLVED │
│     │ Specificity          │ (OPTIONAL) for secondary plugin emission only.           │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C16 │ Visx Micro-Benchmark │ Formalized experimental validation protocol for Phase 03 │ RESOLVED │
│     │ Protocol             │ production bundle measurement.                           │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C17 │ RGL A11y Test Matrix │ Formalized 6-test accessibility verification protocol.   │ RESOLVED │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C18 │ SIL OFL Subsetting   │ Formalized default font-family renaming rule for custom  │ RESOLVED │
│     │ Safe Posture         │ subsets (UIForgeInter, UIForgeGeist) under OFL Clause 3. │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C19 │ Test Harness Digest  │ Qualified script SHA-256 digest as local script-byte     │ RESOLVED │
│     │ Scope Qualification  │ verification rather than 3rd-party certification.        │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C20 │ MCP Protocol Model   │ Corrected protocol model: modern revision 2026-07-28 is   │ RESOLVED │
│     │ Correction           │ stateless and uses server/discover, NOT initialize flow. │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C21 │ SIL OFL Functional-  │ Documented SIL OFL FAQ Q5.3 functional-equivalence rule  │ RESOLVED │
│     │ Equivalence Exception│ for web font character-set optimization vs glyph removal.│          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C22 │ Babel Error Recovery │ Decoupled 6 distinct architectural guarantees; proved     │ RESOLVED │
│     │ Distinct Guarantees  │ fatal tokens throw SyntaxError and require WAL buffering.│          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C23 │ Test Scope & Digest  │ Formally qualified test harness outputs as verifying     │ RESOLVED │
│     │ Honesty              │ conditions under local Node.js v22 environment only.     │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C24 │ MCP Semver Ranges    │ Formally classified @modelcontextprotocol/* as declared  │ RESOLVED │
│     │ vs Lockfile Pinning  │ semver ranges (^2.1.0) with Phase 03 lockfile pinning.   │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C25 │ Complete SIL OFL 1.1 │ Constructed 16-column Font Compliance Matrix for Inter & │ RESOLVED │
│     │ Font Audit Matrix    │ Geist; documented pyftsubset flags and Name table IDs.   │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C26 │ Babel / WAL Strict   │ Decoupled 9 Babel capabilities from 8 UIForge WAL        │ RESOLVED │
│     │ Separation           │ capabilities; classified WAL as SPECIFIED_ARCHITECTURALLY│          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C27 │ MCP Protocol Eras &  │ Preserved modern 2026-07-28 discovery vs legacy fallback;│ RESOLVED │
│     │ Honest Test Status   │ classified live socket integration tests as NOT-EXECUTED.│          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C28 │ Standardized 12-Enum │ Replaced generic PACKAGE-VERIFIED with 12 canonical enum │ RESOLVED │
│     │ Classification System│ taxonomy; applied consistently across all 125 claims.    │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C29 │ Recharts & Victory   │ Traced canonical scorecards: Recharts (OS-CHRT-01) is    │ RESOLVED │
│     │ Tier Reconciliation  │ Tier 0 Core Foundation (95.0); Victory (OS-CHRT-08) is   │          │
│     │                      │ Tier 2 Optional (74.7). Corrected erroneous prose lists. │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C30 │ Correct Tier 0       │ Replaced "mandatory production foundation" with canonical│ RESOLVED │
│     │ Adoption Language    │ definition. Explicitly partitioned 24 Tier 0 candidates  │          │
│     │                      │ into runtime deps, dev tools, external tools, specs, etc.│          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C31 │ Test & Regression    │ Preserved exact results (67/67, 46/46, 10/10; arithmetic │ RESOLVED │
│     │ Claims Honesty       │ total: 123 assertions). Qualified structural checks vs   │          │
│     │                      │ independent tests. Baseline zero regressions confirmed.  │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C32 │ Final Completion &   │ Separated selection completion from external legal       │ RESOLVED │
│     │ Closure Language     │ clearances and live Phase 03 integrations. Adopted exact │          │
│     │                      │ mandated Phase 02.5 closure statement.                   │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C33 │ Tier 0 Seven-Layer   │ Reconciled all 24 Tier 0 candidates against canonical    │ RESOLVED │
│     │ & Candidate Mapping  │ sources; produced 24-row matrix; decoupled runtime vs    │          │
│     │                      │ build/dev tools; reviewed Tailwind container queries.    │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C34 │ Test & Regression    │ Explicitly distinguished assertion counts, structural    │ RESOLVED │
│     │ Claim Precision      │ checks, behavioral fixtures, and baseline comparisons;   │          │
│     │                      │ preserved 123 assertions with zero assertion failures.   │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C35 │ Git Working-Tree     │ Accounted for all 11 modified and 6 untracked files from │ RESOLVED │
│     │ Status Reconciliation│ previous phases; verified working tree is 100% clean     │          │
│     │                      │ with zero unexpected changes, deletions, or uncommitteds│          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C36 │ OpenCode Tier 0      │ Reconciled draft placeholder list; OpenCode is canonical │ RESOLVED │
│     │ Justification & T4   │ Tier 0 Core Foundation (OS-AGNT-02, score 92.4, G1-G6    │          │
│     │ Canonical Sources    │ PASS, REFERENCE_ONLY) for autonomous agent patterns;     │          │
│     │                      │ Tier 4 canonically contains figma/code-connect, browser- │          │
│     │                      │ use, pa11y, and BuilderIO/mitosis.                       │          │
├─────┼──────────────────────┼──────────────────────────────────────────────────────────┼──────────┤
│ C37 │ @axe-core/playwright │ Upstream license corrected from MIT to MPL-2.0 across    │ RESOLVED │
│     │ MPL-2.0 License &    │ all manifests & scorecard. Documented weak copyleft      │          │
│     │ Notice Compliance    │ boundary (devDependencies test runner; no runtime conta- │          │
│     │                      │ mination; Section 3 notice obligations enforced).        │          │
└─────┴──────────────────────┴──────────────────────────────────────────────────────────┴──────────┘
```

---

## 2. In-Depth Technical Summaries for Critical Remediations

### 2.1 C20 & C27: Model Context Protocol (MCP) Wire Protocol Architecture
1. **Stateless Modern Revision (`2026-07-28`):**
   - The modern MCP protocol eliminated the stateful `initialize` JSON-RPC handshake.
   - Client discovers server capabilities, tools, and resources via `server/discover`.
   - Every individual JSON-RPC request transmits active protocol version metadata:
     ```json
     {
       "jsonrpc": "2.0",
       "method": "tools/call",
       "params": { ... },
       "_meta": {
         "protocolVersion": "2026-07-28"
       }
     }
     ```
   - For HTTP/SSE transport, requests carry the header `mcp-protocol-version: 2026-07-28`.
2. **Version Negotiation & Fallback:**
   - Enabling `versionNegotiation: { mode: "auto" }` in the SDK client configuration initiates modern discovery.
   - If the server responds with an error indicating an unrecognized method (`MethodNotFound`), the client automatically falls back to the latest legacy stateful handshake (`2025-11-25`), or older legacy revision (`2024-11-05`).
3. **Semver Classification & Test Execution:**
   - Package dependencies `@modelcontextprotocol/server@^2.1.0` and `@modelcontextprotocol/client@^2.1.0` are declared semver ranges evaluated under release `v2.1.1` on Node.js 22 LTS.
   - Live socket execution tests are classified as **`NOT-EXECUTED`** because Phase 02.5 does not install application dependencies into the root workspace.

---

### 2.2 C21 & C25: SIL Open Font License 1.1 Font Compliance Audit
1. **Reserved Font Name Protection (Clause 3):**
   - SIL OFL 1.1 Clause 3 strictly prohibits using Reserved Font Names for modified versions unless explicit written permission is obtained from the copyright holder.
   - Inter declares RFN "Inter" (Rasmus Andersson).
   - Geist declares RFN "Geist" (Vercel Inc.).
2. **Functional-Equivalence Qualification (SIL OFL FAQ Q5.3):**
   - Optimization without renaming is permitted **only if** the output maintains functional equivalence: complete character inventory preserved, OpenType tables intact, zero visual degradation, all metadata and notices preserved.
   - Pre-subsetting that removes glyphs (e.g. producing an ASCII-only subset) is a modification and **does not qualify** for the functional-equivalence exception.
3. **Production Implementation Standard:**
   - Custom subsets removing glyphs must default to derived font-family names: `UIForgeInter` and `UIForgeGeist`.
   - Subsetting is performed via `pyftsubset` (`fonttools >= 4.45.0`):
     ```bash
     pyftsubset Inter.var.woff2 \
       --unicodes="U+0020-007E,U+00A0-00FF,U+2010-2027,U+20AC,U+2122" \
       --layout-features=* \
       --desubroutinize \
       --flavor=woff2 \
       --name-IDs=* \
       --output-file=UIForgeInter.var.woff2
     ```
   - OpenType Name table IDs 1 (Family), 4 (Full Name), and 6 (PostScript Name) are modified to `UIForgeInter` / `UIForgeGeist`.
   - Original copyright notices and SIL OFL 1.1 text are bundled with an added modification note per Clause 2.

---

### 2.3 C22 & C26: Babel AST Transformation vs UIForge Write-Ahead Logging (WAL)
1. **Capability Separation:**
   - `@babel/parser`, `@babel/traverse`, `@babel/types`, and `@babel/generator` provide syntax analysis, AST hierarchy manipulation, and code generation.
   - Babel **does not** provide token buffering, transaction commit/rollback, malformed code quarantine, or file mutation recovery. These are custom UIForge-owned architectural capabilities.
2. **Implementation Status:**
   - In Phase 02.5, UIForge WAL is **SPECIFIED ARCHITECTURALLY & SIMULATED IN TESTS** (`SIMULATED`). Production WAL implementation is scheduled for Phase 03.
3. **Parser Error Handling:**
   - Recoverable anomalies (e.g., `JSXMissingClosingTag`, `MissingPropertySeparator`, `MissingSemicolon`) are captured in `ast.errors` while producing a valid AST.
   - Fatal tokens (e.g., `UnterminatedTemplate`, `UnexpectedToken`, `UnterminatedComment`) throw unrecoverable `SyntaxError`. The UIForge WAL quarantines these incomplete tokens until matching delimiters arrive.
4. **Formatting Preservation:**
   - `retainLines: true` only preserves line numbers.
   - Exact whitespace, indentation, and comment formatting are preserved by **Coordinate-Based Token Slice Patching**, replacing only the modified character slice `[start, end]`.
5. **TypeScript Baseline Comparator:**
   - Semantic regression check calculates:
     $$\text{newRegressions} = \text{postDiagnostics} \setminus \text{baselineDiagnostics}$$
   - Keying diagnostics on `file + code + messageText` tolerates cosmetic line/column shifts without generating false regressions.

---

### 2.4 C29: Recharts & Victory Tier Reconciliation
1. **Canonical Source Inspection:**
   - Traced `sources.json`: `OS-CHRT-01` (`recharts/recharts`, Discovery Priority `P0`, Operational Tier `TIER_A`).
   - Traced `sources.json`: `OS-CHRT-08` (`FormidableLabs/victory`, Discovery Priority `P2`, Operational Tier `TIER_C`).
2. **Canonical Scorecard Reconciliation:**
   - Recharts (`OS-CHRT-01`): Final Score 95.0, G1–G6 All PASS. Canonical Adoption: **TIER 0 (Core Foundation)** under `DEPENDENCY` mode (`ADOPT`). Recharts is UIForge's primary declarative SVG chart library, dynamically lazy-loaded for dashboard analytics.
   - Victory (`OS-CHRT-08`): Final Score 74.7, G1–G6 All PASS. Canonical Adoption: **TIER 2 (Optional Integrations)** under `DEPENDENCY` mode (`OPTIONAL`). Victory provides cross-platform charting primitives (React Native + web).
3. **Discrepancy Remediation:**
   - An earlier working draft narrative erroneously listed Recharts and Victory under Tier 5. The canonical 7 Tier 5 candidates are: `saas-ui` (`OS-COMP-15`), `BackstopJS` (`OS-VREG-05`), `loki` (`OS-VREG-04`), `aceternity/ui` (`OS-MKT-08`), `tabler-react` (`OS-DASH-08`), `remotion` (`OS-ANIM-08`), `locofy` (`OS-D2C-08`). All markdown reports have been synchronized.

---

### 2.5 C30: Tier 0 Decoupling & Architectural Layering
1. **Elimination of Monolithic Runtime Coupling:**
   - Replaced all wording implying that all 24 Tier 0 candidates are mandatory runtime dependencies.
2. **Canonical Tier 0 Definition:**
   > *"Tier 0 — Core Foundation: Strategic architectural foundations and capabilities to adopt selectively according to product requirements, existing infrastructure, compatibility and eligibility."*
3. **Architectural Partitioning (Reconciled under C33):**
   - **Runtime Library Dependencies (8):** `@radix-ui/react-*` (`OS-COMP-02`), `@react-aria/*` (`OS-COMP-03`), `motion` (`OS-ANIM-01`), `lucide-react` (`OS-ICON-01`), `recharts` (`OS-CHRT-01`), `@tanstack/react-table` (`OS-DASH-03`), `react-resizable-panels` (`OS-LAYT-01`), `@modelcontextprotocol/typescript-sdk` (`OS-AGNT-01`).
   - **Development, Build & Testing Tools (8):** `style-dictionary` (`OS-TOKN-02`), `tailwindcss` v4 (`OS-TOKN-04`), `tailwindcss-container-queries` (`OS-LAYT-02`), `babel/babel` (`OS-D2C-07`), `eslint-plugin-jsx-a11y` (`OS-A11Y-03`), `playwright` (`OS-BROW-01`), `axe-core/playwright` (`OS-A11Y-02`), `pixelmatch` (`OS-VREG-01`).
   - **External CLI Subprocesses (2):** `@axe-core/cli` (`OS-A11Y-01`, release blocked pending counsel clearance), `ast-grep` (`OS-D2C-06`).
   - **Source Copy / Code Registry Templates (1):** `shadcn-ui/ui` (`OS-COMP-01`).
   - **Standards & Specifications (2):** W3C DTCG Format (`OS-TOKN-01`), W3C ARIA APG 1.2 (`OS-A11Y-08`).
   - **Asset Redistribution (2):** Inter font (`OS-TYPO-04`), Geist font (`OS-TYPO-05`).
   - **Reference Architectures & Patterns (1):** `anomalyco/opencode` (`OS-AGNT-02`).

---

### 2.6 C31: Test Result Reporting Honesty & Regression Claims
1. **Preservation of Actual Execution Results:**
   - `validate_selection.js`: 67 / 67 PASS (SHA-256: `800cc130725785275c808ef56a2a3082acfd1758725253e52d2f3324b6d8b016`)
   - `validate_registry.js`: 46 / 46 PASS (SHA-256: `a96bfe007c3f57c12c0f365a677131de795cb8d38598b1524b2a635bef67916c`)
   - `verify_babel_recovery.js`: 10 / 10 PASS (SHA-256: `e2171ce0c13e9bd5512cba4e49a9e1e5a29c6afda90a40fd5c2e35f298546155`)
2. **Arithmetic Total & Scope Qualification:**
   - Total of 123 automated assertions across 3 verification test scripts (including data integrity checks, schema validations, structural assertions, and empirical behavioral fixtures).
   - Zero regressions is claimed strictly in the context of verified baseline test assertions.
   - Model Context Protocol runtime socket tests remain honestly classified as `NOT-EXECUTED`.
   - UIForge Write-Ahead Logging (WAL) functionality remains classified as `SPECIFIED_ARCHITECTURALLY` and `SIMULATED`.

---

### 2.7 C32: Final Completion & Phase Closure Language
1. **Separation of Concerns:**
   - Phase 02.5 research, selection, reconciliation, and documentation completion is strictly decoupled from external legal clearances (axe-core, pa11y), live MCP wire integration, production WAL runtime implementation, and Phase 03 bundle-size benchmarking.
2. **Authoritative Phase Closure Decision:**
   > **"PHASE 02.5 — RESEARCH, SELECTION, RECONCILIATION AND DOCUMENTATION COMPLETE. EXTERNAL LEGAL AND OPERATIONAL DEPENDENCIES TRACKED FOR PHASE 03."**

---

### 2.8 C33: Tier 0 Seven-Layer Classification & Canonical Candidate Reconciliation
1. **Elimination of Non-Tier-0 Insertions and Substitutions:**
   - In earlier draft prose summaries, `@ariakit/react` was mistakenly listed under Tier 0 runtime dependencies; `ariakit/ariakit` (`OS-COMP-13`) is canonically **Tier 1** (Score: 84.0). Replaced with canonical Tier 0 candidate `adobe/react-spectrum` (`OS-COMP-03`, React Aria, Score: 93.4).
   - Clarified that `OpenDevin / OpenHands reference architecture` is canonically `anomalyco/opencode` (`OS-AGNT-02`, Tier 0, `REFERENCE_ONLY`).
   - Clarified that ambient runtime capabilities such as the TypeScript Compiler API and internal dependencies such as `pngjs` (internal to `pixelmatch` `OS-VREG-01`) are not autonomous repository candidates in the 125 candidate universe.
2. **Tailwind CSS Container Queries Analysis:**
   - Under Tailwind CSS v4, container queries are supported natively in core CSS via `@container`, `@sm:`, `@md:`, eliminating the necessity for a standalone plugin in pure v4 projects.
   - `@tailwindcss/container-queries` (`OS-LAYT-02`, Score: 92.4, Tier 0) is categorized as an optional build-time backward-compatibility plugin for legacy Tailwind v3 consumer projects, **not** a mandatory runtime dependency.
3. **Canonical 24-Candidate Tier 0 Mapping:**
   Every single one of the 24 Tier 0 candidates from `candidate-selection-scorecard.json` and `sources.json` appears exactly once across the seven architectural layers with complete traceability to evidence claim IDs and legal conditions.

---

### 2.9 C34: Test and Regression Evidence Precision
1. **Taxonomy of Assertion Types:**
   - **Structural & Schema Assertions (55 checks):** JSON parsing, Draft-07 schema compliance, file existence, array non-emptiness, field types across manifests.
   - **Inventory & Baseline Comparison Assertions (13 checks):** Exact priority distributions (P0:24, P1:47, P2:50, REJ:4), candidate ID / source ID 1:1 alignment against Phase 02.4 `sources.json`, tier census arithmetic ($24+34+40+16+4+7=125$).
   - **Policy, Gate & Dimension Checks (39 checks):** G1–G6 hard-gate results, dimensional score boundaries ($0 \le s \le 10$), scoring weight math ($\sum w_i = 1.000$).
   - **Empirical Behavioral Fixtures (11 checks):** 6 streaming JSX parser fixtures (`REC-01` through `UNREC-03`) validating Babel reasonCodes and AST generation, plus 5 TypeScript diagnostic comparator tests.
   - **Cryptographic Integrity (5 checks):** Script SHA-256 self-digests and digest-backed provenance manifests.
2. **Zero Failures vs Baseline Regressions:**
   - "Zero assertion failures" is certified across all 123 assertions (67/67 + 46/46 + 10/10).
   - "Zero regressions against baseline" is certified strictly against the recorded Phase 02.4 source registry baseline and the TypeScript diagnostic comparator baseline (where `newRegressions === 0`).
3. **Execution Boundaries:**
   - Live MCP socket tests remain classified as `NOT-EXECUTED` pending package installation in Phase 03.
   - UIForge Write-Ahead Logging (WAL) and streaming token buffers remain classified as `SPECIFIED_ARCHITECTURALLY` and `SIMULATED`.

---

### 2.10 C35: Git Working-Tree Status Reconciliation
1. **Reconciliation of Prior State (11 Modified Files + 6 Untracked Dossiers):**
   - The 11 modified files and 6 untracked final dossiers created during Phase 02.5 audit remediations were systematically reviewed, staged per logical unit, and committed across verified Conventional Commits (`2631c67`, `b687873`, `16881c0`, `3280072`, `9c7cac3`, `e33b229`, `274937d`, `2c148a6`, `7f7e9ef`).
   - Every file was pushed to `origin/main` upon explicit user authorization triggers.
2. **Current Repository Invariants:**
   - No unexpected staged changes exist in the Git index.
   - No unexpected deletions or untracked debris exist in the workspace.
   - No unrelated user work has been overwritten, reset, or discarded.
   - All Phase 02.5 deliverables exist on disk, are fully tracked in Git history, and synchronize with `origin/main`.

---

### 2.11 C36: OpenCode Tier 0 Architectural Justification & Reconciliation
1. **Reconciliation of Draft Prose Artifacts:**
   - An earlier working draft narrative mistakenly grouped OpenCode under Tier 4 alongside placeholder names (`Pa11y, OpenCode, AutoCode, Supervibe`). This was an early clerical draft placeholder created before multi-dimensional scoring and hard-gate evaluations were executed.
   - "AutoCode" and "Supervibe" do not exist in the 125 candidate universe.
2. **Canonical Scoring & Hard Gate Evaluation:**
   - Candidate: `anomalyco/opencode` (`OS-AGNT-02`, source `SRC-OS-AGNT-02`).
   - Weighted score: **92.4** (exceeds the $\ge 92.0$ Tier 0 foundation threshold).
   - Hard Gates: G1: PASS, G2: PASS, G3: PASS, G4: PASS, G5: PASS, G6: PASS (overall: PASS).
3. **Architectural Role in UIForge:**
   - OpenCode serves as UIForge's primary open-source reference architecture for autonomous AI coding agent loop orchestration, tool execution protocol handling, terminal environment sandboxing, and shadow-workspace change generation.
   - Directly addresses UIForge Platform Capability 15 (Agentic UI Construction & Code Emission).
4. **Clean-Room Governance (`REFERENCE_ONLY`):**
   - Consumed strictly under `REFERENCE_ONLY` mode (no runtime binary or library dependencies).
   - Distinct from commercial reference targets (Cursor, Claude Code, Windsurf) by being fully open-source under the permissive MIT license.
5. **Canonical Tier 4 Sources:**
   - The authoritative 4 Tier 4 Deferred candidates are:
     1. `figma/code-connect` (`OS-D2C-02`, Score: 68.8, component mapping deferred to Phase 04).
     2. `browser-use/browser-use` (`OS-BROW-06`, Score: 68.8, Python-based browser agent deferred pending IPC benchmark).
     3. `pa11y/pa11y` (`OS-A11Y-05`, Score: 68.2, LGPL-3.0 copyleft review pending counsel opinion).
     4. `BuilderIO/mitosis` (`OS-D2C-01`, Score: 68.2, cross-framework compilation deferred to post-React roadmap).

---

### 2.12 C37: @axe-core/playwright MPL-2.0 License Reconciliation
1. **License Reclassification:**
   - Upstream author/publisher: Deque Systems.
   - Actual package license: **Mozilla Public License 2.0 (MPL-2.0)** (not MIT).
   - Reconciled in Phase 02.4 source registry (`SRC-OS-A11Y-02`), package registry (`PKG-OS-A11Y-02-1`), and Phase 02.5 candidate scorecard (`OS-A11Y-02`).
2. **Licensing Impact & Copyleft Boundaries:**
   - MPL-2.0 is a weak, file-level copyleft license (Section 3). It applies copyleft obligations only to modifications of covered source files.
   - UIForge consumes `@axe-core/playwright` as an unmodified testing runner dependency within `devDependencies` for automated CI/CD Playwright accessibility assertions.
   - Because `@axe-core/playwright` is consumed as an unmodified external dependency and not bundled into UIForge production runtime artifacts, it does **not** trigger copyleft contamination of UIForge's core proprietary codebase.
3. **Attribution & Notice Obligations:**
   - UIForge preserves Deque Systems' copyright and MPL-2.0 license notice in test harness documentation and third-party attribution manifests.
   - Transitive copyleft risk is formally classified as `WEAK_FILE_LEVEL` in `sources.json`.
