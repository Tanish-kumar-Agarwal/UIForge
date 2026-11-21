# Category 07 — Charts & Data Visualization Ecosystems

**Document ID:** `UIF-CAT-006`  
**Phase:** 02.1 — Open-Source Ecosystem Discovery & Intelligence  
**Category Focus:** Declarative React Charting, Headless Vis Primitives & Canvas Performance  
**Date:** November 2026  

---

## 1. Category Overview

Data visualization is central to modern B2B SaaS dashboards, analytics portals, and financial tools. When AI agents write charting code from scratch, they frequently fail at:
- Responsive SVG scaling (charts clipping on small viewports or overflowing container widths).
- Missing accessible data tables or screen-reader accessible summaries (`role="img"` with descriptive `aria-label`).
- Tooltip hover rendering bugs (tooltips rendering behind adjacent DOM cards due to stacking contexts).

This category audits the open-source data visualization libraries suitable for UIForge.

---

## 2. In-Depth Comparative Analysis

| Candidate ID | Project & URL | License | Rendering Engine | Paradigm | Accessibility Support | UIForge Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `OS-CHRT-01` | **Recharts** (`recharts/recharts`) | MIT | SVG | Declarative React components (`<ResponsiveContainer>`, `<AreaChart>`). | ARIA labels, customizable SVG titles. | **`[DEP]` / `[REG]` Primary Standard (P0)** |
| `OS-CHRT-02` | **Apache ECharts** (`apache/echarts`) | Apache-2.0 | Canvas / WebGL | Config-driven options object (`setOption`). | Built-in a11y decal patterns & audio descriptions. | **`[DEP]` / `[REG]` Big Data Standard (P1)** |
| `OS-CHRT-03` | **Nivo** (`plouc/nivo`) | MIT | SVG / Canvas / SSR | Rich React components built on D3 with beautiful defaults. | Clean SVG structure with title tags. | `[REG]` / `[REF]` Specialized Viz (P1) |
| `OS-CHRT-04` | **Visx** (`airbnb/visx`) | MIT | SVG (Headless) | Low-level headless primitives; developer controls DOM rendering. | 100% developer customizable. | `[DEP]` / `[REF]` Headless Primitives (P1) |
| `OS-CHRT-05` | **Chart.js** (`chartjs/Chart.js`) | MIT | Canvas | Imperative canvas configuration via `react-chartjs-2`. | Plugin-based fallback tables. | `[REF]` Reference (P2) |
| `OS-CHRT-06` | **Observable Plot** (`observablehq/plot`) | ISC | SVG | Grammar of graphics for exploratory data visualization. | Structured SVG elements. | `[REF]` Exploratory Viz (P2) |
| `OS-CHRT-07` | **D3.js** (`d3/d3`) | ISC | Low-Level Math | Mathematical scales, curves, interpolations, and force physics. | N/A (math only). | **`[DEP]` Mathematical Engine (P1)** |

---

## 3. High-Volume Data Threshold: SVG vs. Canvas

- **SVG (Recharts / Nivo)**: Superior for typical SaaS dashboards ($< 500$ data points). SVG nodes integrate seamlessly with CSS variables, Tailwind classes, and DOM click events.
- **Canvas / WebGL (Apache ECharts)**: Essential when datasets exceed $10,000$ data points (e.g., real-time time-series telemetry or financial tick charts). DOM-based SVGs degrade browser performance under heavy node counts.
- **UIForge Standard**: UIForge defaults to **Recharts** for SaaS dashboard archetypes, switching to **Apache ECharts** when high data density is detected.

---

## 4. Accessibility in Data Visualizations

Under WCAG 2.2, purely visual charts exclude blind and low-vision users. UIForge enforces an **Accessible Data Pair** pattern:
```tsx
// UIForge Accessible Chart Pattern
<figure aria-labelledby="chart-title" aria-describedby="chart-summary">
  <figcaption id="chart-title" className="text-sm font-semibold">Monthly Revenue Growth</figcaption>
  <p id="chart-summary" className="sr-only">
    Line chart showing revenue growth from $45,000 in January to $89,000 in December.
  </p>
  <ResponsiveContainer width="100%" height={240}>
    <AreaChart data={data}> ... </AreaChart>
  </ResponsiveContainer>
  {/* Screen-reader accessible data table toggle */}
</figure>
```
