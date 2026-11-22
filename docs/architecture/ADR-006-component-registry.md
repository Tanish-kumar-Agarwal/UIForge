# ADR-006: Component Registry Model & Supply-Chain Governance
## Adoption of Source-Copy Component Architecture, Headless Primitives & Canonical Registry Gating

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Principal Software Architect & Application Security Architect  

---

## 1. Context & Problem Statement
UI components represent the physical building blocks of web interfaces. Historically, frontend ecosystems have oscillated between two problematic extremes:
1. **Monolithic Component Libraries (MUI, Ant Design, Chakra):** Heavy npm runtime dependencies that dictate CSS-in-JS runtimes, bloat bundle sizes, resist customization, and lock projects into specific design choices.
2. **Uncontrolled Copy-Pasting:** Developers copy raw snippets from blogs, Twitter, or AI chat, inadvertently introducing security vulnerabilities, broken accessibility, and copyleft licensing violations.

UIForge requires a component discovery and distribution architecture that provides complete customization freedom, zero unnecessary runtime bloat, and strict supply-chain governance.

---

## 2. Decision Constraints
1. **Zero Mandatory Runtime Component Dependency:** UIForge must not force a monolithic runtime UI component package on consumer projects.
2. **Headless Primitive Grounding:** Components must be grounded in verified accessible primitives (`@radix-ui/react-*` `OS-COMP-02`, `@react-aria/*` `OS-COMP-03`).
3. **Canonical Registry Alignment:** All external component recommendations must originate from the approved Phase 02.4 Canonical Source Registry (`sources.json`).
4. **Fail-Closed Licensing Gating:** Prohibited licenses (Aceternity resale restrictions `OS-MKT-08`, SaaS UI Pro lock-in `OS-COMP-15`) must be strictly blocked; LGPL copyleft items (pa11y `OS-A11Y-05`) must remain quarantined.

---

## 3. Options Considered
- **Option 1: Monolithic UIForge Runtime Library (`@uiforge/components`):** Publish a traditional pre-compiled npm component library.
- **Option 2: shadcn/ui Source-Copy Model (`SOURCE_COPY`):** Distribute components as raw, accessible TypeScript/JSX source code emitted directly into the user's project (`src/components/ui/`).
- **Option 3: Web Components / Shadow DOM Bundles:** Distribute components as framework-agnostic custom elements.

---

## 4. Evaluation of Options

| Criteria | Option 1: Monolithic npm Library | Option 2: Source-Copy Model | Option 3: Web Components |
| :--- | :--- | :--- | :--- |
| **Customization Freedom** | Limited by component props | 100% (developer owns the code)| Difficult to style through Shadow DOM |
| **Runtime Bundle Size** | Heavy (includes unused variants) | Near-zero overhead; tree-shakeable| Requires polyfills / runtime |
| **Styling Adaptation** | Hardcoded CSS-in-JS | Automatically adapts to project tokens | Isolated from Tailwind cascade |
| **Multi-Framework Fit** | Bound to one framework | Adaptable via source blueprints | Framework-agnostic but styling-rigid |

---

## 5. Decision Outcome
**Selected Option:** **Option 2: shadcn/ui Source-Copy Model (`SOURCE_COPY`) grounded in Headless Primitives.**

### Architectural Specification:
1. **Component Distribution Standard:**
   - Adopts the `shadcn-ui/ui` registry schema (`OS-COMP-01`, Tier 0 Core Foundation).
   - Components are emitted directly into the target project as clean, documented TypeScript files.
   - Consumers retain 100% ownership of their component source code.
2. **Headless Accessibility Primitives:**
   - Interactive components (dialogs, dropdowns, tooltips, popovers) build on unstyled `@radix-ui/react-*` primitives (`OS-COMP-02`) or `@react-aria/*` hooks (`OS-COMP-03`).
   - Styling is applied using project design tokens and Tailwind utility classes.
3. **Supply-Chain Governance & Provenance:**
   - Package: `@uiforge/component-registry` validates all candidate components against Phase 02.4 `sources.json`.
   - Ingested components preserve SPDX license tags, author copyright notices, and SHA-256 file digests.
   - Tier 5 rejected candidates are permanently blocked from search and suggestion.

---

## 6. Consequences & Impact
- **Positive:**
  - Developers have zero fear of vendor lock-in.
  - Zero runtime footprint added to the consumer application bundle.
  - Components automatically inherit the project's native CSS variables and dark mode themes.
- **Negative:**
  - Component updates require re-fetching or diffing the source file rather than a simple `npm update`.

---

## 7. Security & Operational Impact
- Source-copy code is scanned by `@uiforge/project-intelligence` prior to emission to ensure it contains no malicious scripts or telemetry.

---

## 8. Research References
- Phase 02.2: `WS2-COMPONENT-ARCHITECTURE.md` (RSC Taxonomy & A11y Tiers).
- Phase 02.4: `sources.json` and `packages.json` (125 canonical candidates).
- Phase 02.5: `CORE-FOUNDATION-SHORTLIST.md` (`OS-COMP-01`, `OS-COMP-02`, `OS-COMP-03`).

---

## 9. Open Questions
- None. Component registry model is confirmed and frozen.
