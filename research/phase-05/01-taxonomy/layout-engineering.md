# UIForge Phase 05 — Layout Engineering Intelligence
## Algorithmic Grids, Responsive Architecture, Container Queries & Spatial Physics

**Document ID:** UIF-PH05-TAX-LAYOUT-ENGINEERING  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Executive Summary: Moving Beyond Viewport-Centric Hacks

Layout engineering is the mathematical orchestration of two-dimensional space. The legacy practice of designing monolithic desktop layouts and chopping them down via arbitrary viewport media queries (`@media (max-width: 768px)`) produces fragile, broken, and unmaintainable code.

UIForge establishes an **intrinsic, component-driven layout engineering foundation** rooted in:
1. Modern CSS primitives: CSS Grid Level 2 (`subgrid`), Flexbox, and CSS Containment Level 3 (`@container`).
2. Mathematical spatial ramps derived from the 8px baseline rhythm (`SRC-SYS-003`).
3. Domain-specific density modeling (Productive vs Expressive).
4. Predictable responsive reflows that eliminate horizontal scroll traps and content clipping.

---

## 2. Core Layout Foundations

### 2.1 The 8px/4px Baseline Spatial System
All margin, padding, gap, and dimension properties in UIForge must conform to a discrete spatial scale:

| Token Name | Value | Permitted Use Case |
| :--- | :--- | :--- |
| `space-1` | 4px | Micro-spacing: input internal vertical padding, badge gaps, borders |
| `space-2` | 8px | Standard component internal padding, tight icon-text gaps |
| `space-3` | 12px | Compact card padding, form label-to-input vertical separation |
| `space-4` | 16px | Default content padding, standard card interior padding |
| `space-6` | 24px | Section padding, modal header-to-body gap, grid column gutters |
| `space-8` | 32px | Major component separation, compact section dividers |
| `space-12` | 48px | Macro section margins, hero section internal padding |
| `space-16` | 64px | Page header-to-content separation on desktop displays |
| `space-24` | 96px | Expressive editorial whitespace buffers, landing page sections |

**Anti-Pattern Invariant:** Values such as `11px`, `17px`, `23px`, or `35px` represent engineering failure and are blocked by automated boundary checks (`EVID-SYS-001`).

---

### 2.2 Grid Systems & Column Architecture

#### 1. The 12-Column Responsive Macro-Grid
- **Desktop ($\ge 1200\text{px}$):** 12 columns, 24px gutters, max-width $1280\text{px}$ (or $1440\text{px}$ for wide dashboards).
- **Tablet ($768\text{px} - 1199\text{px}$):** 8 columns, 16px gutters, fluid margins ($16\text{px} - 32\text{px}$).
- **Mobile ($< 768\text{px}$):** 4 columns, 12px or 16px gutters, 16px edge padding.

#### 2. CSS Grid vs Flexbox Usage Invariant
- **CSS Grid:** Mandatory for two-dimensional spatial layouts (page shells, card grids, dashboard widget layouts, photo galleries, form grids). Subgrid (`grid-template-rows: subgrid`) must be used for card decks so card headers, bodies, and footers align horizontally across rows.
- **Flexbox:** Mandatory for one-dimensional linear flows (navigation bars, button groups, breadcrumbs, badge rows, input with prepended/appended icons).

#### 3. Container Queries (`@container`) Invariant
Components intended for multi-slot reuse (cards, activity feeds, user profile pills) must use container queries (`container-type: inline-size`) rather than viewport media queries:
```css
.card-container {
  container-type: inline-size;
}

/* Switches from vertical stack to horizontal row based on parent slot width */
@container (min-width: 480px) {
  .product-card {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: var(--space-4);
  }
}
```

---

## 3. Structural Composition Archetypes

UIForge formalizes layout compositions into 6 production archetypes:

### 1. App Shell Architecture (Enterprise SaaS, Dashboards, DevTools)
- **Top Bar:** Fixed height (48px or 56px), contains global search, notifications, environment switcher, user avatar.
- **Left Sidebar:** Collapsible (default 240px wide, collapsed 56px icon rail), sticky or fixed, contains primary hierarchy landmarks.
- **Main Canvas:** Fluid (`min-width: 0` to prevent flex blowout), internal scroll or full-page scroll, padded with `space-6` (24px).
- **Contextual Right Drawer:** Conditional slide-over (320px - 480px) for entity inspection, metadata, or side-by-side editing.

### 2. Split-Screen Composition (Authentication, Onboarding, Compare)
- **Primary Side (50% desktop):** Clean transactional form or interactive tool on neutral surface.
- **Narrative Side (50% desktop):** Rich brand visual, social proof, or live preview.
- **Mobile Reflow:** The narrative visual collapses or completely hides on screens $< 768\text{px}$ to prioritize immediate task completion without distracting scroll height.

### 3. Editorial & Documentation Layouts (Content, Knowledge Bases)
- **Three-Column Grid:** Left sidebar (navigation/hierarchy, 240px), Center column (content measure bounded to $650\text{px} - 750\text{px}$ / 66 characters), Right sidebar (table of contents / page anchor links, 200px).
- **Measure Protection:** Center column must set `max-width: 65ch` to preserve optical line measure (`EVID-TYP-001`).

### 4. Bento Grid Composition (Controlled Expressive Layouts)
- **Definition:** Modular grid featuring asymmetric cell spans ($1\times1$, $2\times1$, $1\times2$, $2\times2$) grouping discrete features.
- **Constraint Invariant:** Bento layouts are valid strictly for feature showcases or summary overviews. They are **strictly forbidden** for homogeneous data lists or transaction forms. All bento cells must adapt to a single-column stack on screens $< 640\text{px}$.

### 5. Multi-Column Data Dashboard Layout
- **Metric Row (Top):** 3-4 KPI metric summary cards spanning full width.
- **Primary Visualizer (Center Left):** 8-column span for primary temporal chart or table.
- **Secondary Insights (Center Right):** 4-column span for breakdown pie/donut, recent activity feed, or alert list.
- **Detailed Table (Bottom):** 12-column full-width data grid with pagination and column controls.

### 6. Focused Transactional Flow (Checkout, Wizards, Setup)
- **Centered Column:** Single bounded column (`max-width: 580px`), generous top/bottom whitespace.
- **Zero Distraction:** All global navigation and footer links are stripped or simplified to prevent abandonment. Progress indicator anchored to top.

---

## 4. Responsive Adaptation & Overflow Physics

### 1. The Zero-Horizontal-Scroll Invariant
- A vertical page must never produce unintentional horizontal scrollbars at any screen width between $320\text{px}$ and $3840\text{px}$.
- Flex and grid children must declare `min-width: 0` to allow text truncation and responsive container shrinking.
- Images, videos, and canvas elements must enforce `max-width: 100%; height: auto`.

### 2. Mobile Touch Reflows
- All multi-column forms collapse to a single column on mobile screens ($< 640\text{px}$) to prevent cramped inputs and awkward tab jumping.
- Table reflow: Dense data tables must provide either:
  1. Responsive card transformation (each row becomes an independent card).
  2. Controlled, contained horizontal scrolling (`overflow-x: auto`) with visual scroll affordances and sticky primary key columns.

### 3. Breakpoint Strategy (Device-Agnostic Intervals)
UIForge uses standard ergonomic breakpoints derived from physical display boundaries:
- `sm`: $640\text{px}$ (Large mobile, phablets)
- `md`: $768\text{px}$ (Tablets, portrait iPads)
- `lg`: $1024\text{px}$ (Small laptops, landscape tablets)
- `xl`: $1280\text{px}$ (Standard desktop displays)
- `2xl`: $1536\text{px}$ (Wide workstation monitors)
