# Categories 02 & 03 — Landing Page & Dashboard Component Ecosystems

**Document ID:** `UIF-CAT-002`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Category Focus:** Marketing Page Blocks & Data-Heavy SaaS Application UI  
**Date:** November 2026  

---

## 1. Category Overview

Modern web applications split fundamentally into two distinct visual and structural archetypes:
1. **Conversion & Marketing Pages (Category 02)**: High visual impact, expressive typography, bento grids, hero sections, pricing calculators, social proof, and subtle scroll micro-interactions.
2. **SaaS Dashboards & Internal Applications (Category 03)**: High information density, data tables, sorting/filtering/pagination state machines, KPI metric summaries, settings forms, and drawer navigation.

---

## 2. Landing Page & Marketing Blocks (Category 02)

| Candidate ID | Project & URL | Strengths | Known Limitations / Risks | UIForge Classification |
| :--- | :--- | :--- | :--- | :--- |
| `OS-MKT-01` | **Magic UI** (`magicuidesign/magicui`) | High visual polish: animated beam borders, bento grids, retro grids, marquee text. | Heavy reliance on Framer Motion; can cause motion sickness without `prefers-reduced-motion`. | `[REG]` Registry Candidate (P1) |
| `OS-MKT-02` | **Cult UI** (`nolly-studio/cult-ui`) | Modern animated micro-interactions for design engineers. Compatible with shadcn. | Smaller component catalog; community-maintained. | `[REG]` Registry Candidate (P2) |
| `OS-MKT-03` | **React Bits** (`DavidHDev/react-bits`) | Creative visual effects, canvas particle backgrounds, text animations. | Variable TypeScript typing; requires manual accessibility auditing. | `[REF]` Reference Only (P2) |
| `OS-MKT-04` | **Origin UI** (`cosscom/ui`) | 100+ copy-paste Tailwind + Radix primitives (inputs, toggles, badges, dialogs). | Focuses on micro-controls rather than full full-page layout sections. | `[REG]` Registry Candidate (P1) |
| `OS-MKT-08` | **Aceternity UI** (`ui.aceternity.com`) | Popular creative landing page components. | **Commercial Terms of Service strictly forbid redistribution** in open registries or CLI tools. | **`[REJ]` Rejected from Distribution** |

---

## 3. Dashboard & Application Components (Category 03)

| Candidate ID | Project & URL | Strengths | Known Limitations / Risks | UIForge Classification |
| :--- | :--- | :--- | :--- | :--- |
| `OS-DASH-01` | **Tremor** (`tremorlabs/tremor`) | Enterprise data dashboards, KPI metric cards, area charts, bar lists. | Traditional npm package distribution coupled to Tailwind v3. | `[REG]` / `[REF]` (P1) |
| `OS-DASH-02` | **Tremor Raw** (`tremorlabs/tremor-raw`) | Uncompiled copy-paste dashboard components built for Tailwind v4 and shadcn. | Newer project; requires verification across dark mode palettes. | `[REG]` Registry Candidate (P1) |
| `OS-DASH-03` | **TanStack Table** (`TanStack/table`) | Headless table state engine; column sorting, multi-filters, pagination, row grouping. | Pure logic; requires UIForge to provide accessible markup and styling. | **`[DEP]` Core Dependency (P0)** |
| `OS-DASH-04` | **TanStack Virtual** (`TanStack/virtual`) | Headless virtualization for 100,000+ row data tables with zero lag. | Requires fixed or dynamic height measurements. | `[DEP]` Dependency (P1) |
| `OS-DASH-05` | **React Grid Layout** (`react-grid-layout/react-grid-layout`) | Draggable, resizable responsive grid layout for customizable analytics dashboards. | Legacy codebase; requires modern TypeScript wrappers. | `[REF]` / `[REG]` (P2) |

---

## 4. Architectural Synthesis for UIForge

1. **The Ingest-and-Wrap Pattern for Marketing Blocks**:
   - Marketing components from Magic UI and Cult UI are audited and ingested into `@uiforge/component-registry`.
   - Each component is modified to enforce `motion-reduce:transition-none` and `motion-reduce:animate-none` to guarantee WCAG 2.3.3 / 2.2 compliance.
2. **The Headless Data Grid Standard**:
   - Rather than bundling heavy pre-styled table widgets, UIForge implements a canonical **Data Table Archetype** powered by `TanStack Table` and styled with Tailwind utility classes.
   - Handles empty states (`data.length === 0`), loading skeletons, and interactive search queries deterministically.
