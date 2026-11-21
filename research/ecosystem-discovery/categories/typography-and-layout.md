# Categories 08 & 09 — Typography, Content & Layout Ecosystems

**Document ID:** `UIF-CAT-007`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Category Focus:** Open Fonts, Metric Trimming, Container Queries & Split Layouts  
**Date:** November 2026  

---

## 1. Category Overview

Typography and layout composition establish the structural hierarchy of any user interface. Weak typographic scale, erratic line-heights, unconstrained container widths, and rigid viewport-only media queries are primary symptoms of generic AI-generated frontend code.

This document audits open-source typography systems (Category 08) and layout primitives (Category 09).

---

## 2. Typography & Font Delivery (Category 08)

| Candidate ID | Project & URL | License | Type | Strengths & Capabilities | UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `OS-TYPO-01` | **Tailwind Typography** (`tailwindcss-typography`) | MIT | Plugin | Official `prose` classes enforcing typographic rhythm, line length, and heading margins. | **`[DEP]` / `[REG]` Primary Standard (P0)** |
| `OS-TYPO-02` | **Capsize** (`seek-oss/capsize`) | MIT | Tool | Trims typographic leading space; aligns capital letters precisely with CSS bounding boxes. | **`[DEP]` / `[REF]` High Value (P1)** |
| `OS-TYPO-03` | **Fontsource** (`fontsource/fontsource`) | MIT / OFL | Registry | Self-hosted npm packages for open-source Google/OFL fonts. Zero external network tracking. | **`[DEP]` / `[REG]` Self-Hosted Standard (P1)** |
| `OS-TYPO-04` | **Inter** (`rsms/inter`) | SIL OFL 1.1 | Font | Industry standard digital screen font with 9 weights and variable optical sizes. | **`[REG]` Primary UI Font (P0)** |
| `OS-TYPO-05` | **Geist** (`vercel/geist-font`) | SIL OFL 1.1 | Font | Modern geometric sans and monospace font optimized for developer tools and SaaS. | **`[REG]` Developer Tool Font (P1)** |
| `OS-TYPO-06` | **Opentype.js** (`opentypejs/opentype.js`) | MIT | Parser | Extracts font metric tables (ascender, descender, unitsPerEm) in Node.js. | `[DEP]` Font Metric Engine (P2) |

---

## 3. Responsive Layout & Container Queries (Category 09)

| Candidate ID | Project & URL | License | Type | Strengths & Capabilities | UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `OS-LAYT-01` | **React Resizable Panels** (`react-resizable-panels`) | MIT | Library | Accessible, touch-friendly resizable panel groups with persistent cookie state. | **`[DEP]` / `[REG]` Foundational Layout (P0)** |
| `OS-LAYT-02` | **Tailwind Container Queries** (`tailwindcss-container-queries`)| MIT | Plugin | Enables component-relative `@sm:` and `@lg:` responsive reflow based on container width. | **`[DEP]` / `[REG]` Responsive Standard (P0)** |
| `OS-LAYT-03` | **Radix Aspect Ratio** (`radix-ui/primitives`) | MIT | Primitive | Enforces strict image, video, and card aspect ratios (16/9, 4/3, 1/1) preventing CLS. | **`[REG]` Media Container (P1)** |
| `OS-LAYT-05` | **Masonry** (`desandro/masonry`) | MIT | Algorithm | Cascading grid layout algorithm for asymmetric card and photo layouts. | `[REF]` Asymmetric Grid (P2) |
| `OS-LAYT-08` | **Every Layout** (`every-layout.dev`) | Book / Custom | Patterns | Algorithmic CSS layout primitives (The Stack, The Cluster, The Reel, The Switcher). | **`[REF]` Layout Reference (P1)** |

---

## 4. The Shift to Container Queries (`@container`)

Traditional frontend code relies heavily on global viewport media queries (`@media (min-width: 768px)`). This creates brittle components: a card that looks fine in a full-width mobile view breaks when placed inside a narrow dashboard sidebar on a desktop monitor.

UIForge standardizes on **Container Queries**:
```html
<div class="@container">
  <div class="flex flex-col @md:flex-row @lg:grid @lg:grid-cols-3 gap-4">
    <!-- Component reflows based on its immediate container, not the viewport -->
  </div>
</div>
```
Coding agents guided by UIForge are instructed to prefer container queries for reusable component blocks.
