# UIForge Phase 05 — Dashboard Design Patterns
## Situational Awareness, Subgrid KPI Decks, Categorical Visualizations & Anomaly Detection

**Document ID:** UIF-PH05-PATT-DASHBOARDS  
**Domain:** Operational Dashboards, Observability & Analytics  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** Rapid situational assessment; identifying anomalies, outliers, and system health trends in seconds.
- **Cognitive State:** Monitoring mode; scanning across multiple widgets; intolerant of visual clutter or misaligned metrics.

---

## 2. Canonical Positive Pattern: `PATT-DSB-001` (Subgrid-Aligned KPI Metric Deck)

### 2.1 Macro Layout & Metric Alignment
- **Top Metric Row (KPI Cards):**
  - CSS Grid with 4 equal columns.
  - Subgrid (`grid-template-rows: subgrid`) across 3 rows:
    - Row 1: Metric Title + Tooltip Info Icon.
    - Row 2: Giant Stat Value (30px bold tabular figures).
    - Row 3: Sparkline micro-chart + 24hr Delta Badge (`+14.2%` vs prior period).
  - Guarantees that metric values and sparklines align across adjacent cards regardless of title text wrapping.

### 2.2 Data Visualization Color Palettes
- **Categorical Color Coding:** 5-8 distinct hues in OKLCH space with minimum $\Delta E \ge 12$ separation.
- **Accessible Legend Mapping:** Every chart series includes an interactive, toggleable legend directly above the visualizer.
- **Tooltip Inspector:** Hovering or focusing a data point renders a high-contrast popover displaying precise timestamp, metric name, and exact numerical value.

### 2.3 Observable Evaluation Signals
- Subgrid alignment active across KPI card containers.
- Tabular figures (`tabular-nums`) enforced on all displayed values.
- Density mode switcher (Comfortable vs Compact) altering table row heights and card padding.
