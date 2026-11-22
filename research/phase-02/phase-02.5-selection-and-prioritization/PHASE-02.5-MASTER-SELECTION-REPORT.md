# UIForge Phase 02.5: Master Repository Selection, Technical Scoring & Adoption Report

**Document ID:** `UIF-PH02.5-MASTER-SELECTION-REPORT`  
**Classification:** Authoritative Technical Decision Document  
**Status:** Certified / Complete  
**Date:** November 2026  
**Auditor & Architect:** Principal Software Architect, Senior Frontend Infrastructure Architect & Independent Evidence Auditor  

---

## 1. Executive Summary & Strategic Architecture

UIForge Phase 02.5 synthesizes the empirical research, technical audits, licensing registers, and normalized data records of Phases 02.1 through 02.4 to determine the authoritative technology selection for UIForge.

The evaluation process establishes an unequivocal distinction between **discovery prominence** and **architectural necessity**:
- High GitHub star counts or social popularity do not justify introducing architectural coupling.
- A commercial or copyleft license is not disqualified arbitrarily, but its restrictions must be strictly bounded.
- The UIForge platform requires a lean, production-grade core foundation (**Tier 0: 24 candidates**), surrounded by curated core-adjacent primitives (**Tier 1: 34 candidates**), modular optional plugins (**Tier 2: 40 candidates**), reference architectures (**Tier 3: 16 candidates**), deferred candidates (**Tier 4: 4 candidates**), and explicitly excluded/rejected libraries (**Tier 5: 7 candidates**).

---

## 2. Canonical Identity & Supersession Reconciliation (Finding C11)

### Canonical Identity & Supersession Table (Finding C11 Reconciliation)

To ensure tamper-evident traceability and prevent alias confusion, the following table formally maps every scrutinized candidate to its immutable identifier in the Phase 02.4 Canonical Source Registry (`sources.json`), superseding all erroneous identifiers from earlier working drafts:

| Canonical Candidate ID | Canonical Source ID | Formal Name | Primary Category | Erroneous Prior Draft ID | Root Cause & Supersession Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`OS-ANIM-08`** | `SRC-OS-ANIM-08` | `remotion-dev/remotion` | Category 07 (Motion) | `OS-ANIM-05` | `OS-ANIM-05` is canonical `airbnb/lottie-web`. Remotion is canonical `OS-ANIM-08` (REJ priority; Tier 5 Excluded due to G5 mission misfit). |
| **`OS-D2C-08`** | `SRC-OS-D2C-08` | `locofy/locofy` | Category 02 (Design-to-Code) | `OS-D2C-05` | `OS-D2C-05` is canonical `WICG/open-ui`. Locofy is canonical `OS-D2C-08` (REJ priority; Tier 5 Excluded due to closed proprietary SaaS). |
| **`OS-LAYT-08`** | `SRC-OS-LAYT-08` | `Every-Layout` | Category 09 (Layout) | `OS-LAYT-06` | `OS-LAYT-06` is canonical `kristoferbaxter/flexboxgrid`. Every Layout is canonical `OS-LAYT-08` (P1 priority; Tier 3 Reference under clean-room boundary). |
| **`OS-VREG-04`** | `SRC-OS-VREG-04` | `oblador/loki` | Category 06 (Visual Regr.) | `OS-VREG-03` | `OS-VREG-03` is canonical `argos-ci/argos`. Loki is canonical `OS-VREG-04` (P2 priority; Tier 5 Excluded due to Playwright redundancy). |
| **`OS-VREG-05`** | `SRC-OS-VREG-05` | `garris/BackstopJS` | Category 06 (Visual Regr.) | `OS-VREG-04` | `OS-VREG-04` is canonical `oblador/loki`. BackstopJS is canonical `OS-VREG-05` (P2 priority; Tier 5 Excluded due to Playwright redundancy). |
| **`OS-DASH-05`** | `SRC-OS-DASH-05` | `react-grid-layout/react-grid-layout` | Category 08 (Dashboard) | `OS-LAYT-03` | `OS-LAYT-03` is canonical Radix UI Aspect Ratio primitive. React-Grid-Layout is canonical `OS-DASH-05` (P2 priority; Tier 2 Optional adapter). |
| **`OS-LAYT-03`** | `SRC-OS-LAYT-03` | `radix-ui/primitives (Aspect Ratio)` | Category 09 (Layout) | None | Immutable Radix Aspect Ratio primitive (P1 priority; Tier 1 Core-Adjacent), strictly distinct from `OS-DASH-05`. |


---

## 3. Answers to the Twelve Core Selection Questions

### Q1. Which candidates should UIForge actually adopt?
UIForge adopts **58 candidates** across Tier 0 (24 Core Foundation) and Tier 1 (34 Recommended Core-Adjacent):
- **Core Primitives & Registry:** `radix-ui/primitives` (`OS-COMP-02`), `react-spectrum / React Aria` (`OS-COMP-03`), and `shadcn-ui/ui` (`OS-COMP-01`).
- **Styling & Design Tokens:** `tailwindcss` v4 (`OS-TOKN-04`), `DTCG 2025.10` (`OS-TOKN-01`), and `style-dictionary` v5.8.0 (`OS-TOKN-02`) on Node.js 22 LTS (C14).
- **Analysis & Code Transformation:** Native TypeScript Compiler API engine, `ast-grep` (`OS-D2C-06`), and Babel 6-stage AST manipulation pipeline (`OS-D2C-07`) with `@babel/generator`, coordinate slice-patching, WAL token buffering, and TS baseline diagnostic regression comparator (C15, C22).
- **Verification & Testing:** `playwright` (`OS-BROW-01`), `axe-core` (`OS-A11Y-01`, `CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE`) (C17), `@axe-core/playwright` (`OS-A11Y-02`), `eslint-plugin-jsx-a11y` (`OS-A11Y-03`), and `pixelmatch` (`OS-VREG-01`).
- **Agent Interoperability:** `@modelcontextprotocol/server` (`OS-AGNT-01`, declared semver range ^2.1.0, evaluated on v2.1.1; implementing modern 2026-07-28 discovery via `server/discover` with `_meta` versioning and auto-negotiation fallback to legacy `2025-11-25` / `2024-11-05`; `@modelcontextprotocol/client` ^2.1.0) and `anomalyco/opencode` (`OS-AGNT-02`) (C13, C20, C24).
- **Foundational UI Controls & Typefaces:** `motion` (`OS-ANIM-01`), `lucide-icons` (`OS-ICON-01`), `TanStack Table` (`OS-DASH-03`), `recharts` (`OS-CHRT-01`), `react-resizable-panels` (`OS-LAYT-01`), and `Inter` / `Geist` typefaces (`OS-TYPO-04`, `OS-TYPO-05`, SIL OFL 1.1 RFN preservation; custom subsetting defaults to font-family rename unless functional-equivalence exception or permission applies) (C18, C21).

### Q2. Which candidates should remain reference-only?
**16 candidates** are assigned to **Tier 3 (Reference and Research)**:
- `Every-Layout` (`OS-LAYT-08`): Algorithmic CSS layout concepts (The Stack, The Cluster, The Reel) are studied for clean-room implementation. Direct copying of authored text, diagrams, and component code is strictly prohibited under `LIC-EVERY-LAYOUT-COMMERCIAL` (C01/C11).
- Closed AI Agent Platforms (`OS-AGNT-03` Claude Code, `OS-AGNT-04` Cursor, `OS-AGNT-05` Windsurf): Evaluated strictly for agent interaction ergonomics, MCP client behavior, and shadow-workspace editing patterns.
- Complete Monolithic UI Frameworks (`OS-COMP-05` Mantine, `OS-COMP-06` Chakra UI, `OS-COMP-07` MUI, `OS-COMP-08` Ant Design, `OS-COMP-09` NextUI, `OS-COMP-14` Blueprint): Evaluated for component slot APIs, accessibility patterns, and data density, but rejected as mandatory dependencies to avoid runtime lock-in.
- Large Design System Primitives (`OS-TOKN-07` Primer, `OS-TOKN-08` Carbon, `OS-TOKN-09` Material Web, `OS-TOKN-10` Spectrum Tokens): Evaluated for token naming scales and dark mode hierarchies.

### Q3. Which candidates should be integrated as dependencies?
Dependencies are partitioned strictly into **Core Runtime Dependencies** and **Development / Testing Dependencies**:
- **Core Runtime Dependencies (UIForge Platform & Studio):** `@modelcontextprotocol/server` (^2.1.0), `@radix-ui/react-*`, `@tanstack/react-table`, `lucide-react`, `motion`, `recharts`, `react-resizable-panels`, `tailwindcss` (v4 compiler).
- **Core Build & Test Dependencies:** `style-dictionary` (v5.8.0), `pixelmatch`, `playwright`, `@axe-core/playwright`, `eslint-plugin-jsx-a11y`, `@babel/parser`, `@babel/traverse`, `@babel/types`, `@babel/generator`.

### Q4. Which candidates should be used through source adaptation or registry consumption?
UIForge adopts the **shadcn/ui registry model** (`OS-COMP-01`) as its canonical component emission architecture:
- Components are not installed as immutable `node_modules` black boxes.
- Components are emitted directly into the user project's repository as clean TypeScript/JSX source code, giving the developer complete ownership and customization freedom.
- Core-adjacent component registries (`OS-MKT-01` Magic UI, `OS-MKT-04` Origin UI, `OS-DASH-02` Tremor Raw) are consumed via registry manifest adapters, allowing UIForge to discover and inject their code into user applications on demand.

### Q5. Which candidates should be used as external tools?
- `axe-core` (`OS-A11Y-01`): Executed out-of-process via user-installed `@axe-core/cli` or Playwright runner (`CONDITIONALLY ADOPT — RELEASE BLOCKED PENDING COUNSEL CLEARANCE`). UIForge does not bundle or redistribute axe-core binaries (C17).
- `ast-grep` (`OS-D2C-06`: Invoked as a standalone native CLI binary or pre-compiled N-API binding for high-speed AST pattern search across massive brownfield repositories.
- `Lighthouse` (`OS-A11Y-06`) & `Accessibility Insights` (`OS-A11Y-07`): Invoked as standalone external audit runners for comprehensive audits.

### Q6. Which candidates should be rejected or deferred?
- **Deferred (4 candidates, Tier 4):**
  - `pa11y` (`OS-A11Y-05`): LGPL-3.0 dynamic linking concerns pending legal counsel review (`counselReviewRequired: true`, `LEG-02`).
  - `BuilderIO/mitosis` (`OS-D2C-01`): Cross-framework compilation deferred to post-React expansion.
  - `figma/code-connect` (`OS-D2C-02`): Component mapping deferred to Phase 04 design tool integration.
  - `browser-use` (`OS-BROW-06`): Python browser agent deferred pending IPC performance benchmarking.
- **Rejected / Excluded (7 candidates, Tier 5):**
  - `aceternity/ui` (`OS-MKT-08`): Proprietary commercial terms prohibit redistribution, reselling, or embedding.
  - `locofy/locofy` (`OS-D2C-08`): Closed proprietary SaaS platform without open integration API.
  - `remotion-dev/remotion` (`OS-ANIM-08`): Excluded under Gate G5 due to mission misfit (programmatic video rendering engine vs web UI design-to-code); free license limited to <=3 employees (C02/C11).
  - `oblador/loki` (`OS-VREG-04`): Excluded due to direct capability redundancy with Playwright multi-browser engine + Pixelmatch and heavy Storybook runtime coupling (C11).
  - `garris/BackstopJS` (`OS-VREG-05`): Functional visual regression tool (v6.3.25), but excluded due to direct capability overlap with Playwright + Pixelmatch and legacy external runner harness (C11).
  - `saas-js/saas-ui` (`OS-COMP-15`): Commercial Pro upsell lock-in and tight architectural coupling.
  - `tabler/tabler-react` (`OS-DASH-08`): Abandoned React 16 legacy wrapper.
  *Note on `OS-DASH-05` (React-Grid-Layout):* Following maintenance re-evaluation (v2.3.0 published Oct 5, 2026, active Playwright E2E harness, React 18/19 support), React-Grid-Layout passes G1-G6 and is admitted to Tier 2 (Optional Integrations) as an interactive dashboard grid adapter (5.5/10 accessibility score qualified as preliminary estimate subject to 6-test verification matrix) (C11/C19). Distinct candidate ID: `OS-DASH-05` (Radix Aspect Ratio is `OS-LAYT-03`).

### Q7. Which candidates are redundant with other candidates?
Full redundancy analysis is detailed in [REDUNDANCY-AND-CAPABILITY-OVERLAP-REPORT.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.5-selection-and-prioritization/REDUNDANCY-AND-CAPABILITY-OVERLAP-REPORT.md):
- **Playwright vs. Puppeteer vs. Selenium vs. Cypress:** Playwright is selected as the unified browser engine; Puppeteer is kept as a lightweight fallback; Selenium and Cypress are redundant.
- **Pixelmatch vs. Looks-Same vs. Resemble.js:** Pixelmatch is selected for core zero-dependency pixel diffing; Looks-Same is an optional anti-aliasing adapter; Resemble.js is redundant.
- **Radix UI vs. Base UI vs. Headless UI:** Radix UI is the primary headless foundation; Base UI and Headless UI are complementary core-adjacent alternatives.
- **TanStack Table vs. Monolithic Framework Data Grids:** TanStack Table provides headless state without imposing UI styles, making monolithic grids redundant.

### Q8. Which candidates provide the greatest engineering value relative to cost?
The top 5 value-to-cost candidates:
1. `microsoft/playwright` (`OS-BROW-01`, Score: 96.0, Tier 0): Single engine providing multi-browser execution, network interception, tracing, visual screenshots, and DOM inspection.
2. `tailwindlabs/tailwindcss` v4 (`OS-TOKN-04`, Score: 95.8, Tier 0): Zero-config styling runtime with high performance and native CSS cascade variables.
3. `adobe/react-spectrum / React Aria` (`OS-COMP-03`, Score: 96.0, Tier 0): Industry-leading accessible interaction hooks, touch handlers, and keyboard navigation.
4. `TanStack/table` (`OS-DASH-03`, Score: 95.8, Tier 0): Headless data table architecture eliminating massive grid dependency bloat.
5. `shadcn-ui/ui` (`OS-COMP-01`, Score: 94.6, Tier 0): Source-copy integration avoids a mandatory UIForge runtime dependency. The copied implementation and its dependencies retain their own consumer-runtime cost.

### Q9. Which candidates should be included in the initial UIForge foundation?
The **24 Tier 0 Core Foundation candidates** specified in [CORE-FOUNDATION-SHORTLIST.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.5-selection-and-prioritization/CORE-FOUNDATION-SHORTLIST.md).

### Q10. Which candidates should remain optional extensions?
The **40 Tier 2 Optional Integration candidates** specified in [OPTIONAL-INTEGRATION-SHORTLIST.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.5-selection-and-prioritization/OPTIONAL-INTEGRATION-SHORTLIST.md) (e.g. GSAP, ECharts, Nivo, Visx, Heroicons, Tabler Icons, Auto-Animate, Argos CI, React-Grid-Layout).

### Q11. Which decisions require additional proof before implementation?
Eight concrete experiments (E1 through E8) are specified in [EXPERIMENTAL-VALIDATION-PLAN.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-02/phase-02.5-selection-and-prioritization/EXPERIMENTAL-VALIDATION-PLAN.md):
- E1: TypeScript Compiler API vs. ast-grep vs Babel 6-stage AST mutation benchmark (with WAL buffering for fatal tokens and TS baseline diagnostic regression comparator) (C15, C22).
- E2: Radix UI vs. React Aria primitive composition in brownfield projects.
- E3: DTCG 2025.10 token compilation to Tailwind v4 theme variables via Style Dictionary v5.8.0 (C14).
- E4: Headless Playwright + axe-core automated audit execution in sandboxed Docker containers (C17).
- E5: Model Context Protocol (MCP) modern discovery (`server/discover`) and auto-negotiation fallback to `2025-11-25` / `2024-11-05` (C13, C20, C24).
- E6: Registry cryptographic digest verification and untrusted artifact retrieval isolation.
- E7: Chart bundle size benchmark (Visx preliminary tree-shaken estimate ~15–20 KB vs Recharts) (C16).
- E8: React-Grid-Layout 6-test accessibility verification matrix (C19).

### Q12. What should be built internally instead of adopting an external project?
UIForge builds its unique intelligence internally while adopting external execution primitives:
- **Build Internally:** Project AST analysis engine, design-system extraction heuristics, visual hierarchy scoring algorithms, automated repair suggestion engine, component discovery registry index, and permission enforcement boundaries.
- **Adopt Externally:** Browser automation runner (Playwright), accessibility rule definitions (axe-core), pixel difference math (Pixelmatch), token transformation compiler (Style Dictionary v5.8.0), and agent communication transport (MCP SDK ^2.1.0).

---

## 4. Candidate Census & Adoption Tier Distribution

```text
┌────────────────────────────────────────────────────────────────────────┐
│ TOTAL CANONICAL CANDIDATES: 125                                        │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 0: Core Foundation            24 candidates (19.2%) [ADOPT/COND]  │
│ TIER 1: Recommended Core-Adjacent  34 candidates (27.2%) [ADOPT]       │
│ TIER 2: Optional Integrations      40 candidates (32.0%) [OPTIONAL]    │
│ TIER 3: Reference & Research       16 candidates (12.8%) [REFERENCE]   │
│ TIER 4: Deferred                    4 candidates ( 3.2%) [DEFER]       │
│ TIER 5: Rejected / Excluded         7 candidates ( 5.6%) [REJECT]      │
└────────────────────────────────────────────────────────────────────────┘
```

The mathematical reconciliation accounts for all 125 candidates:
$$24 + 34 + 40 + 16 + 4 + 7 = 125$$
Original discovery priorities are preserved:
$$P0: 24, \quad P1: 47, \quad P2: 50, \quad REJ: 4$$
Operational tiers are preserved:
$$\text{TIER\_A}: 24, \quad \text{TIER\_B}: 47, \quad \text{TIER\_C}: 50, \quad \text{TIER\_D}: 4$$
