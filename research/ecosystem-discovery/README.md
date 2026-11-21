# UIForge Research — Open-Source Ecosystem Discovery & Intelligence (Phase 02.1)

**Document ID:** `UIF-OS-000`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Status:** Complete Candidate Inventory & Ecosystem Audit  
**Date:** November 2026  

---

## 1. Executive Overview

Phase 02.1 conducts a comprehensive, evidence-based investigation of the open-source software supply chain, developer tools, component registries, design systems, testing infrastructure, and AI agent platforms relevant to **UIForge**.

UIForge is an open-core **Frontend Engineering Intelligence Platform** designed to equip AI coding agents with the upstream context (design tokens, component discovery, AST inspection) and downstream verification (headless multi-viewport browser automation, deterministic accessibility audits, visual regression) needed to produce production-grade frontend applications.

This phase identifies which existing open-source technologies UIForge should:
1. **Consume as Core Dependencies** (e.g., Playwright, axe-core, Babel/TS AST parsers).
2. **Connect via Standard Protocols** (e.g., Model Context Protocol / MCP TypeScript SDK, Figma MCP).
3. **Index into Component & Token Registries** (e.g., shadcn/ui registry schemas, Radix UI primitives, React Aria, DTCG tokens).
4. **Study as Reference Architectures** (e.g., Mitosis, Open Props, Style Dictionary).
5. **Reject or Deprioritize** due to licensing hazards, commercial restrictions, architectural friction, or unmaintained repositories.

---

## 2. Directory Structure

The research is organized into specialized documents under `research/ecosystem-discovery/`:

```
research/ecosystem-discovery/
├── README.md                           # This index and executive orientation
├── discovery-methodology.md             # Multi-source methodology, evidence labels, and inventory schema
├── ecosystem-landscape.md              # Macro landscape analysis and architectural convergence
├── candidate-inventory.md              # Complete structured database of 125 discovered candidates
├── foundational-technologies.md        # In-depth analysis of P0 foundational architecture candidates
├── agent-ecosystem.md                  # Analysis of coding agents, IDEs, and MCP interoperability
├── component-and-design-ecosystem.md   # Analysis of UI libraries, design tokens, icons, and styling
├── testing-and-quality-ecosystem.md    # Analysis of headless browser, a11y, and visual regression tools
├── licensing-discovery-register.md     # Preliminary legal, commercial, and provenance risk register
├── rejected-and-deprioritized.md       # Explicit catalog of rejected candidates with evidence
├── ecosystem-gaps.md                   # Market gaps, fragmentation analysis, and UIForge opportunity
├── sources.md                          # Primary evidence citations and documentation references
└── categories/
    ├── ui-components.md                # Category 01: Headless and styled component ecosystems
    ├── landing-and-dashboard.md        # Categories 02 & 03: Marketing sections and SaaS dashboard blocks
    ├── design-systems-and-tokens.md    # Category 04: W3C DTCG tokens, token transforms, design systems
    ├── animation-and-motion.md         # Category 05: Motion libraries, spring physics, layout animations
    ├── icons-and-assets.md             # Category 06: Vector icon ecosystems, illustration sets, SVGR
    ├── charts-and-visualization.md     # Category 07: Data visualization primitives and dashboard charts
    ├── typography-and-layout.md        # Categories 08 & 09: Typographic scales, fonts, CSS Grid/Flexbox
    ├── accessibility.md                # Category 10: Automated scanners, ARIA APG, contrast tooling
    ├── design-to-code.md               # Category 11: AST compilers, visual reverse engineering, Figma
    ├── agents-and-mcp.md               # Category 12: MCP SDK, agent CLI platforms, skill ecosystems
    ├── browser-testing.md              # Category 13: Playwright, Puppeteer, containerized test runners
    └── visual-regression.md            # Category 14: Pixel diffing, DOM snapshots, visual baselines
```

---

## 3. High-Level Summary Statistics

- **Total Categories Audited:** 14 categories.
- **Total Unique Candidates Discovered & Classified:** 125 repositories and specifications.
- **Preliminary Priority Distribution:**
  - **P0 (Foundational):** 16 technologies (e.g., `@modelcontextprotocol/sdk`, Playwright, axe-core, W3C DTCG, Radix UI, React Aria, Babel/TS AST).
  - **P1 (High Value):** 44 technologies (e.g., shadcn/ui registry, Lucide, Motion, TanStack Table, Recharts, Open Props).
  - **P2 (Exploratory / Reference):** 48 technologies (e.g., AutoAnimate, Nivo, Capsize, Cult UI, Origin UI).
  - **Rejected / Deprioritized:** 17 repositories (e.g., Aceternity UI [proprietary redistribution terms], unmaintained legacy libraries, heavyweight proprietary wrappers).
- **Licensing Landscape:**
  - Permissive (MIT / Apache-2.0 / ISC / BSD): 106 candidates.
  - Reciprocal / Special (MPL-2.0 / OFL-1.1): 8 candidates (axe-core, open fonts).
  - Commercial / Proprietary / Prohibited: 11 candidates flagged for Phase 02.3 legal isolation.

---

## 4. Phase Boundary & Next Steps

This document completes **Phase 02.1 (Discovery & Intelligence)**. In accordance with project governance:
- **Phase 02.1 is complete.**
- **Phase 02.2 (Technical Repository Audit):** NOT STARTED (requires explicit user approval).
- **Phase 02.3 (Licensing & Provenance Audit):** NOT STARTED.
- **Phase 02.4 (Integration Architecture):** NOT STARTED.
- **No application code, monorepo packages, or dependencies have been installed or modified.**
