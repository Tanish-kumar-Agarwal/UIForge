# UIForge Phase 05 — Design System Reference Analysis
## Comparative Deconstruction of Production Design Systems Across Scale, Architecture & Ergonomics

**Document ID:** UIF-PH05-DESIGN-SYS-REFS  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Architectural Survey of Reference Systems

UIForge deconstructs the world's most battle-tested enterprise and consumer design systems to extract architectural invariants, token structures, and ergonomic decisions.

| System | Organization | Primary Domain | Grid / Spatial Baseline | Token Architecture | Key Strength | Known Architectural Trade-off |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Material 3** | Google | Consumer, Mobile, Cross-Platform | 8dp base / 4dp dense | HCT Tonal Palettes, State Layers | Dynamic theming, perceptual color | Complex color math; can feel overly opinionated for enterprise SaaS |
| **Apple HIG** | Apple | iOS, macOS, visionOS | 8pt / 4pt subgrid | Dynamic semantic system tokens | Optical hierarchy, touch ergonomics, fluid motion | Closed ecosystem conventions; less native Web-first CSS guidance |
| **Carbon v11** | IBM | Enterprise SaaS, Cloud, Data | 2x Grid (8px / 4px / 2px) | Expressive vs Productive tokens | Dense data tables, complex enterprise forms | Highly rigid visual aesthetic; steep learning curve |
| **Fluent 2** | Microsoft | Productivity, Desktop, Web | 8px / 4px | Multi-platform aligned tokens | Elevation materials, cross-platform parity | Acrylic/Mica effects can easily degrade performance if overused |
| **GOV.UK** | UK Cabinet Office | Public Sector, Forms, Workflow | Responsive fluid column grid | Ultra-simple semantic palette | Radical accessibility, zero-fluff error recovery | Deliberately utilitarian; lacks expressive marketing components |
| **Polaris v12** | Shopify | E-Commerce Backoffice, Merchandising | 4px base increment | Semantic intent & banner tokens | Contextual workflows, resource lists, index tables | Highly optimized for merchants; less suited for consumer entertainment |
| **Atlassian** | Atlassian | Collaboration, Developer Tooling | 8px grid | Primitive $\rightarrow$ Semantic tokens | Multi-tier navigation, optimistic state management | Complex component state variants and permission-heavy controls |

---

## 2. Invariant Design System Principles Extracted for UIForge

From these 7 systems, UIForge derives 5 fundamental invariants that every generated design system must uphold:

1. **The Spatial Rhythm Invariant (8px/4px Grid):**
   * Spacing values must never be arbitrary prime or odd numbers (e.g. `13px`, `19px`, `27px`).
   * Spacing must derive from an 8px base rhythm (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`), with 4px (`4px`, `12px`, `20px`) permitted strictly for micro-spacing (input padding, badge gaps, borders).
2. **The Three-Tier Token Invariant (W3C DTCG):**
   * Never hardcode raw hex values or arbitrary CSS dimensions in component markup.
   * Enforce the hierarchy: `Primitive (Raw)` $\rightarrow$ `Semantic (Context/Intent)` $\rightarrow$ `Component (Scoped)`.
3. **The State Layer Invariant:**
   * Interactive states (hover, active, focus, disabled) must not be achieved by arbitrarily picking a different random color.
   * They must be calculated via consistent opacity overlays (e.g. `8% hover`, `12% pressed`) or deterministic lightness ramps in OKLCH space.
4. **The Productive vs. Expressive Dichotomy:**
   * Interfaces operate in two distinct modes:
     * **Productive Mode:** High data density, compact padding (32-40px rows), minimal animation, strict focus on efficiency and throughput (dashboards, tables, IDEs).
     * **Expressive Mode:** Generous whitespace, larger display typography, rich brand motion, designed to guide and engage (marketing pages, onboarding, consumer portals).
5. **The Unbroken Keyboard Focus Invariant:**
   * Every interactive component must have an unambiguous, high-contrast (3:1 minimum) focus ring that cannot be suppressed without an explicit alternative visual indicator.
