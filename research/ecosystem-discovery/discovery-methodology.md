# UIForge Research — Open-Source Discovery Methodology & Standards

**Document ID:** `UIF-OS-001`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Status:** Methodological Framework & Schema Definition  
**Date:** November 2026  

---

## 1. Multi-Source Discovery Strategy

To prevent bias toward trending social repositories or inflated vanity metrics, candidates in Phase 02.1 were identified and verified using a multi-tier sourcing pipeline:

1. **Primary Technical Source Code & Specifications**:
   - Official GitHub / GitLab repositories, git trees, and root `LICENSE` / `COPYING` files.
   - Official package registry manifests (`package.json`, npm, crates.io).
   - Official technical documentation portals and architectural changelogs.
   - Formally published W3C and industry specifications (e.g., W3C Design Tokens Community Group specification, Model Context Protocol 2024-11-05 spec).
2. **Deterministic Empirical Testing**:
   - In-environment verification of package behaviors, CLI arguments, and export formats using Node.js 22 LTS runtimes.
3. **Exclusion of Non-Primary Signals**:
   - Marketing blog posts, listicle aggregators ("Top 10 React Libraries 2026"), and GitHub star counts were treated strictly as discovery leads, never as evidence of software quality, maintenance health, or legal redistribution rights.

---

## 2. Discovery Query Taxonomy

Discovery was structured across 14 distinct queries targeting specific architectural layers:

| Target Category | Representative Primary Queries | Discovery Focus |
| :--- | :--- | :--- |
| **01. UI Components** | `headless react components state machine github`, `react aria primitives architecture`, `radix ui vs base ui vs ark ui` | Headless behavior, unstyled primitives, WAI-ARIA compliance, framework decoupling. |
| **02. Landing Page Sections** | `copy paste tailwind landing sections github`, `animated react blocks mit license`, `magic ui cult ui origin ui` | Reusable marketing blocks (hero, bento, testimonials), animation coupling, license terms. |
| **03. Dashboard Components** | `react dashboard data table primitives`, `tanstack table headless enterprise`, `tremor raw dashboard tailwind` | Data density, state machines, sorting/filtering/pagination, KPI cards, form states. |
| **04. Design Systems & Tokens** | `w3c design tokens dtcg format specification`, `style dictionary transform tailwind`, `open props css custom properties` | Token schema standard, semantic tokens, theme transformation pipelines, runtime CSS variables. |
| **05. Animation & Motion** | `motiondivision motion react github`, `formkit auto animate zero config`, `accessible spring animation reduced motion` | Bundle size, declarative APIs, `prefers-reduced-motion` safety, SSR compatibility. |
| **06. Icons & Visual Assets** | `lucide icons react tree shaking license`, `tabler icons svgr`, `phosphor icons custom styling` | SVG vs font, tree-shaking, trademark restrictions, individual asset licensing. |
| **07. Charts & Visualization** | `recharts accessible svg react`, `apache echarts responsive canvas`, `visx d3 react primitives airbnb` | Primitives vs monolithic components, canvas vs SVG, responsiveness, headless math. |
| **08. Typography** | `open source variable fonts self hosting`, `type scale css generator open source`, `capsize font metrics seek` | OFL licensing, variable font axes, fallback metric overrides, font layout shift (CLS). |
| **09. Layout & Responsive** | `css container queries react utility`, `react resizable panels split view`, `every layout css primitives` | Container queries, intrinsic responsive grids, flexbox/grid layout systems, overflow traps. |
| **10. Accessibility Utilities** | `axe core playwright automated accessibility`, `eslint plugin jsx a11y rules`, `pa11y automated scanner` | Deterministic DOM-based rule checking, contrast formulas, keyboard focus trap testing. |
| **11. Design-to-Code** | `builderio mitosis ast compiler`, `figma code connect open source mcp`, `screenshot to code multimodal ai` | AST cross-compilation, Figma variable extraction, visual-to-code reverse engineering. |
| **12. Agent Skills & MCP** | `modelcontextprotocol typescript sdk github`, `opencode anomalyco terminal agent`, `claude code agent skills` | MCP stdio/SSE transports, tool calling schemas, read-only vs execution modes, skill formats. |
| **13. Browser Testing** | `microsoft playwright headless chromium isolation`, `testcontainers nodejs local test runner` | Ephemeral browser contexts, multi-viewport emulation, network isolation, tracing. |
| **14. Visual Regression** | `mapbox pixelmatch nodejs image comparison`, `argos ci open source visual testing`, `looks same visual diff` | Perceptual pixel-diff algorithms, masking dynamic zones, threshold tuning. |

---

## 3. Candidate Classification Taxonomy

Every discovered repository was assigned exactly **one primary classification**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   PRIMARY CANDIDATE CLASSIFICATIONS                   │
├──────────────────────────┬─────────────────────────────────────────────┤
│ 1. Reference             │ Architectural reference, design pattern,    │
│                          │ or code example. No redistribution.         │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 2. Dependency Candidate  │ Library or utility UIForge consumes directly│
│                          │ via package manager in its core runtime.    │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 3. Integration Candidate │ External CLI, daemon, agent, or IDE invoked │
│                          │ via subprocess, MCP, or standardized APIs.  │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 4. Registry Candidate    │ Component, token, or asset library indexed   │
│                          │ or distributed via UIForge registry schemas.│
├──────────────────────────┼─────────────────────────────────────────────┤
│ 5. Infrastructure        │ Sandboxing, container orchestration, build  │
│                          │ tooling, or browser execution harness.      │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 6. Research-Only         │ Prototype or academic study; not suitable   │
│                          │ for current production implementation.      │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 7. Rejected Candidate    │ Unsuitable due to licensing, abandonware,   │
│                          │ architectural misalignment, or security.    │
└──────────────────────────┴─────────────────────────────────────────────┘
```

---

## 4. Evidentiary Standards & Labels

All statements of capability, licensing, and performance in Phase 02.1 documents are labeled with the project's standardized evidentiary tags:

- **`[DOC-VERIFIED]`**: Fact corroborated by official documentation, public git source, published specs, or maintainer release notes.
- **`[PRODUCT-TESTED]`**: Fact empirically verified through direct execution or testing by the research team.
- **`[NOT-ESTABLISHED]`**: Available evidence does not establish the capability (represents absence of evidence, not proof of absence).
- **`[NOT-SUPPORTED]`**: Reliable technical evidence or product architecture proves the capability is unavailable or unsupported.
- **`[HYPOTHESIS]`**: An engineering inference, architectural hypothesis, or potential integration pattern requiring validation in Phase 02.2/Phase 19.
- **`[PLANNED]`**: A proposed UIForge capability on the future roadmap, **never** to be described as existing code.

---

## 5. Candidate Inventory Data Schema

Each entry in the Master Candidate Inventory (`candidate-inventory.md`) and category detail files adheres to the following structured schema:

1. **Identity**: Candidate ID (`OS-[CAT]-[00]`), Repository Name, Official GitHub URL, Official Website, Maintainer Organization, Primary Category, Secondary Category.
2. **Classification**: Primary Classification, Preliminary Priority (`P0`, `P1`, `P2`, `Rejected`).
3. **Ecosystem & Runtime**: Language, Framework, Styling Engine, Distribution Channel (npm/CLI/git), MCP/API Availability.
4. **Maintenance & Activity** (Observed November 2026): Approximate Star Count, Fork Count, Recent Commit Activity, Recent Release Date, Maintenance Health Assessment.
5. **Technical Fit**: Intended UIForge use case, architectural alignment, customization potential, identified technical limitations.
6. **Licensing & Legal Status**: SPDX License Identifier, License File Location, Verification Status (`VERIFIED`, `PARTIALLY_VERIFIED`, `REVIEW_REQUIRED`), Commercial/Redistribution Constraints.
7. **Discovery Decision**: Technical justification for inclusion/rejection, Phase 02.2 audit recommendation, evidentiary status, observation date.

---

## 6. Priority Definitions

- **P0 — Foundational**: Technologies central to UIForge's core architecture, without which the platform cannot achieve its primary objectives (e.g., Playwright for headless evaluation, axe-core for deterministic accessibility, MCP SDK for agent interoperability, W3C DTCG for design token normalization).
- **P1 — High Value**: Outstanding candidates that deliver significant functional acceleration for major subsystems (e.g., shadcn/ui registry schemas, Radix UI primitives, Lucide icon ecosystem, TanStack Table, Style Dictionary).
- **P2 — Exploratory / Reference**: Niche tools, emerging frameworks, or valuable aesthetic references worth tracking or studying (e.g., Origin UI, Cult UI, Capsize, AutoAnimate).
- **Rejected / Deprioritized**: Projects with restrictive commercial licensing (e.g., Aceternity UI), archived/abandoned repositories (e.g., legacy Continue core), or architectural anti-patterns that conflict with UIForge invariants.
