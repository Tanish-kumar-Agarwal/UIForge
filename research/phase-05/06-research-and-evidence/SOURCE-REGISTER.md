# UIForge Phase 05 — Master Source Register
## Authoritative Standards, Specifications, Empirical HCI Research & Design Systems

**Document ID:** UIF-PH05-SRC-REGISTER  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  
**Classification:** Research Baseline & Evidence Traceability Register  

---

## 1. Register Architecture & Authority Tiers

Every claim, rule, anti-pattern, and evaluation criterion in UIForge must trace to an authoritative source in this register. Sources are strictly categorized into five evidentiary authority tiers:

| Tier | Category | Description | Weight in Reasoning |
| :--- | :--- | :--- | :--- |
| **Tier 1** | **Normative Web & Accessibility Standards** | W3C Recommendations, ISO standards, WCAG 2.2, RFCs. These are non-negotiable legal/technical baselines. | 1.0 (Mandatory) |
| **Tier 2** | **Technical Platform Specifications** | WHATWG HTML Living Standard, W3C CSS Modules Level 3/4, DTCG Specifications. Formal platform behavior. | 0.95 (High Authority) |
| **Tier 3** | **Peer-Reviewed & Empirical HCI Research** | Nielsen Norman Group studies, academic perceptual psychology, published usability laboratory benchmarks. | 0.85 (Empirical) |
| **Tier 4** | **Enterprise Design System Architectures** | Material 3, Apple HIG, IBM Carbon, Microsoft Fluent, GOV.UK, Shopify Polaris. Battle-tested scale systems. | 0.80 (Production-Proven) |
| **Tier 5** | **Domain-Specific Architectural Guidance** | Specialist financial, healthcare, editorial, and developer tool ergonomic literature. | 0.75 (Contextual) |

---

## 2. Canonical Source Catalog

### 2.1 Tier 1: Normative Standards & Specifications

#### `SRC-STD-001`: W3C Web Content Accessibility Guidelines (WCAG) 2.2
- **Publisher:** World Wide Web Consortium (W3C)
- **Publication Date:** October 5, 2023
- **Status:** W3C Recommendation
- **Canonical URL:** `https://www.w3.org/TR/WCAG22/`
- **Scope & Coverage:** Normative success criteria:
  - Contrast: SC 1.4.3 Contrast (Minimum, Level AA: 4.5:1 text, 3:1 large text), SC 1.4.6 Contrast (Enhanced, Level AAA: 7:1 text), SC 1.4.11 Non-text Contrast (Level AA: 3:1 components/states).
  - Target Sizing: SC 2.5.8 Target Size (Minimum, Level AA: 24×24 CSS pixels minimum with spacing offsets), SC 2.5.5 Target Size (Enhanced, Level AAA: 44×44 CSS pixels).
  - Focus: SC 2.4.7 Focus Visible (Level AA), SC 2.4.11 Focus Not Obscured (Minimum, Level AA), SC 2.4.13 Focus Appearance (Level AAA: 3:1 contrast and 2px perimeter indicator).
  - Dragging & Navigation: SC 2.5.7 Dragging Movements (Level AA), SC 3.2.6 Consistent Help (Level AA), SC 3.3.8 Accessible Authentication (Level AA).
- **Application in UIForge:** Authoritative truth for contrast calculations, target minimums (24×24px AA floor), focus visibility, keyboard navigation, and cognitive accessibility.

#### `SRC-STD-002`: W3C WAI-ARIA Authoring Practices Guide (APG)
- **Publisher:** W3C Web Accessibility Initiative (WAI)
- **Status:** W3C Note & Living Guide
- **Canonical URL:** `https://www.w3.org/WAI/ARIA/apg/`
- **Scope & Coverage:** Canonical design patterns for accessible widgets: dialogs, tabs, accordions, comboboxes, menus, tooltips, disclosure widgets, treeviews, grids, and landmarks.
- **Application in UIForge:** Behavioral contracts, keyboard interaction models, ARIA role mapping, and focus management across components.

#### `SRC-STD-003`: Design Tokens Community Group (DTCG) Draft Specification
- **Publisher:** Design Tokens Community Group (hosted by W3C)
- **Publication Date:** October 2025 (Draft 2025.10)
- **Status:** Community Group Draft Report / Specification (`OS-TOKN-01`)
- **Note:** A W3C Community Group Report is an industry consensus specification developed within a W3C Community Group; it is not a formal W3C Recommendation or standard track deliverable of the W3C Working Groups.
- **Canonical URL:** `https://tr.designtokens.org/format/`
- **Scope & Coverage:** Machine-readable design token exchange format, explicit `$type`, `$value`, `$description`, token aliasing `{path.to.token}`, modes, composite tokens.
- **Application in UIForge:** Canonical token schema for `@uiforge/tokens` and design system generation; verified zero-shim compilation via Style Dictionary v5.8.0.


#### `SRC-STD-004`: W3C CSS Color Module Level 4 & 5
- **Publisher:** W3C CSS Working Group
- **Status:** W3C Candidate Recommendation
- **Canonical URL:** `https://www.w3.org/TR/css-color-4/`
- **Scope & Coverage:** Perceptually uniform color spaces (`oklch()`, `oklab()`), wide-gamut Display-P3 color profiles, color-mix(), relative color syntax.
- **Application in UIForge:** Perceptual color harmony, dynamic tonal ramp generation, and accessible contrast ramp calculations.

#### `SRC-STD-005`: W3C CSS Containment Module Level 3 (Container Queries)
- **Publisher:** W3C CSS Working Group
- **Status:** W3C Candidate Recommendation
- **Canonical URL:** `https://www.w3.org/TR/css-contain-3/`
- **Scope & Coverage:** Container queries (`@container`), container query units (`cqi`, `cqb`, `cqmin`), style queries, intrinsic component-driven responsiveness.
- **Application in UIForge:** Foundation for modular layout engineering; eliminates viewport-dependent media query hacks for modular components.

#### `SRC-STD-006`: W3C CSS Grid Layout Module Level 2 & Flexbox Level 1
- **Publisher:** W3C CSS Working Group
- **Status:** W3C Recommendations
- **Canonical URLs:** `https://www.w3.org/TR/css-grid-2/`, `https://www.w3.org/TR/css-flexbox-1/`
- **Scope & Coverage:** Subgrid, alignment, tracks, fractional units (`fr`), intrinsic sizing (`min-content`, `max-content`, `fit-content`), auto-placement algorithms.
- **Application in UIForge:** Algorithmic layout engineering, two-dimensional macro-layouts, and one-dimensional micro-component arrangements.

---

### 2.2 Tier 2: Empirical HCI & Perceptual Psychology Research

#### `SRC-HCI-001`: Nielsen Norman Group — F-Shaped Pattern For Reading Web Content
- **Authors:** Jakob Nielsen, Pernice, K.
- **Publisher:** Nielsen Norman Group (NN/g)
- **Canonical URL:** `https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/`
- **Findings:** Eye-tracking evidence establishing that web readers do not read word-for-word; they scan in top-horizontal, secondary-horizontal, and vertical left-edge patterns. Information placed outside scanning corridors suffers drastic drop-offs in comprehension.
- **Application in UIForge:** Visual hierarchy rules, heading design, editorial layout engineering, scannability metrics.

#### `SRC-HCI-002`: Nielsen Norman Group — How Chunking Helps UX
- **Authors:** Kate Moran
- **Publisher:** Nielsen Norman Group (NN/g)
- **Canonical URL:** `https://www.nngroup.com/articles/chunking/`
- **Findings:** Rooted in Miller (1956) and Cowan (2001); short-term working memory is limited to 4 ± 1 units of discrete information. Grouping items into meaningful chunks significantly reduces cognitive friction and error rates.
- **Application in UIForge:** Form design, dashboard metric grouping, navigation structure, card density constraints.

#### `SRC-HCI-003`: Nielsen Norman Group — The Aesthetic-Usability Effect
- **Authors:** Kate Moran
- **Publisher:** Nielsen Norman Group (NN/g)
- **Canonical URL:** `https://www.nngroup.com/articles/aesthetic-usability-effect/`
- **Findings:** Users perceive aesthetically pleasing designs as more usable, but aesthetic masking hides underlying friction and cannot overcome catastrophic usability defects.
- **Application in UIForge:** Scoring decoupling: aesthetic scores cannot artificially inflate usability, task-completion, or accessibility ratings.

#### `SRC-HCI-004`: Bringhurst, Robert — The Elements of Typographic Style
- **Author:** Robert Bringhurst
- **Publisher:** Hartley & Marks Publishers
- **Standard Edition:** Version 4.0
- **Findings:** Foundational principles of typographic rhythm: optical line length (measure: 45–75 characters per line, optimal 66 characters), proportional leading relative to measure and font x-height, harmonic scale intervals (musical ratios: perfect fourth 4:3, fifth 3:2, golden ratio 1.618).
- **Application in UIForge:** Typography intelligence algorithms, line-length constraints, vertical rhythm calculations, scale ratio selection.

#### `SRC-HCI-005`: Ware, Colin — Information Visualization: Perception for Design
- **Author:** Colin Ware
- **Publisher:** Morgan Kaufmann / Elsevier
- **Edition:** 4th Edition
- **Findings:** Preattentive processing (color hue, size, motion, spatial position processed in <200ms by the visual cortex prior to conscious attention), Gestalt perceptual grouping laws (proximity, similarity, common region, connected lines), visual salience modeling.
- **Application in UIForge:** Visual weight scoring, visual hierarchy algorithms, layout proximity checks, preattentive data-visualization rules.

#### `SRC-HCI-006`: Fitts, Paul M. — The Information Capacity of the Human Motor System
- **Author:** Paul M. Fitts
- **Publisher:** Journal of Experimental Psychology (1954)
- **Findings:** Time to acquire a target is a function of the distance to the target and the width of the target ($MT = a + b \log_2(2D/W)$).
- **Application in UIForge:** Touch target sizing, sticky action placement, edge/corner anchoring, primary action ergonomics.

---

### 2.3 Tier 3: Enterprise Design System Architectures

#### `SRC-SYS-001`: Google Material Design 3 (Material You)
- **Publisher:** Google LLC
- **Status:** Active Standard
- **Canonical URL:** `https://m3.material.io/`
- **Key Contributions:** Dynamic color tonal palettes (HCT color space: Hue, Chroma, Tone), surface elevation via tint and shadow, interaction state layers (hover 8%, focus 12%, pressed 12%), adaptive typography scales.
- **Application in UIForge:** State layer architecture, surface hierarchy, tonal elevation modeling.

#### `SRC-SYS-002`: Apple Human Interface Guidelines (HIG)
- **Publisher:** Apple Inc.
- **Status:** Active Guidance
- **Canonical URL:** `https://developer.apple.com/design/human-interface-guidelines/`
- **Key Contributions:** Direct manipulation, clarity through typography and whitespace, visual affordance consistency, dark mode semantic color pairing, vibration/haptics, minimum touch targets (44×44 pt).
- **Application in UIForge:** Interaction affordance standards, touch target constraints, semantic system colors, clarity heuristics.

#### `SRC-SYS-003`: IBM Carbon Design System v11
- **Publisher:** IBM Corporation
- **Status:** Production Design System (Open Source Apache-2.0)
- **Canonical URL:** `https://carbondesignsystem.com/`
- **Key Contributions:** 2x Grid system (modular 8px base grid, 4px micro-grid), expressive vs productive typography modes, 4 color themes (White, Gray 10, Gray 90, Gray 100), complex data table ergonomics, dense enterprise information architectures.
- **Application in UIForge:** Enterprise SaaS & dashboard patterns, 8px/4px layout grid rules, productive vs expressive mode switching.

#### `SRC-SYS-004`: Microsoft Fluent Design System 2
- **Publisher:** Microsoft Corporation
- **Status:** Production Standard
- **Canonical URL:** `https://fluent2.microsoft.design/`
- **Key Contributions:** Depth through materials (Mica, Acrylic, smoke), light, motion curves (deceleration/acceleration), layout ramps, cross-platform token alignment (Web, iOS, Android, Windows).
- **Application in UIForge:** Motion duration and easing curves, elevation token ramps, material surface constraints (counteracting generic glassmorphism).

#### `SRC-SYS-005`: UK Government Digital Service (GOV.UK) Design System
- **Publisher:** UK Cabinet Office
- **Status:** Normative Public Sector Standard (Crown Copyright / OGL v3.0)
- **Canonical URL:** `https://design-system.service.gov.uk/`
- **Key Contributions:** Ruthless clarity, accessible form design, error message architecture, progressive disclosure (details element), zero-decorative styling, high-contrast readability.
- **Application in UIForge:** Administrative, government, and form design patterns; error recovery architecture; radical clarity benchmarks.

#### `SRC-SYS-006`: Shopify Polaris Design System v12
- **Publisher:** Shopify Inc.
- **Status:** Production Merchant Platform System
- **Canonical URL:** `https://polaris.shopify.com/`
- **Key Contributions:** E-commerce backoffice ergonomics, resource lists, index tables, actionable empty states, contextual save bars, banner feedback hierarchies (informational, warning, critical, success).
- **Application in UIForge:** E-commerce administrative layouts, state feedback banners, complex filter/sort interfaces.

#### `SRC-SYS-007`: Atlassian Design System
- **Publisher:** Atlassian Pty Ltd
- **Status:** Production Enterprise System
- **Canonical URL:** `https://atlassian.design/`
- **Key Contributions:** Complex project management ergonomics, multi-tiered navigation (global, container, page), badge and tag semantic tokens, modal dialog decision trees, optimistic update patterns.
- **Application in UIForge:** Developer tooling and enterprise collaboration patterns, navigation models, modal vs inline confirmation standards.

---

## 3. Register Verification & Maintenance Policy
1. **Zero Broken Links:** All URLs must resolve to live canonical specifications or established archives.
2. **Periodic Audit:** Any change to WCAG, W3C CSS specifications, or DTCG Drafts triggers an immediate evaluation of downstream contracts.
3. **No Uncited Claims:** No design principle, anti-pattern, or scoring weight may be published without linking to at least one valid `SRC-*` entry.
