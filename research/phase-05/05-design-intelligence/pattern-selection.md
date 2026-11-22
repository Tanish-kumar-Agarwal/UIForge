# UIForge Phase 05 — Pattern Selection Intelligence
## Multi-Alternative Trade-Off Matrices & Deterministic Decision Trees

**Document ID:** UIF-PH05-ENGINE-PATTERN-SELECTION  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Multi-Alternative Evaluation Framework

Instead of jumping to the first plausible design pattern, the engine generates and compares at least **two viable candidate layouts** using a trade-off scoring matrix:

| Evaluation Dimension | Weight | Description |
| :--- | :--- | :--- |
| **Cognitive Friction** | 0.25 | Working memory demand ($4 \pm 1$ chunks), visual clutter |
| **Task Completion Speed** | 0.25 | Fitts's Law target distance, keystrokes, scroll depth |
| **Data Density** | 0.20 | Information units visible per 1000px² viewport |
| **Mobile Adaptability** | 0.15 | Clean 1-column reflow without horizontal overflow |
| **Accessibility Robustness**| 0.15 | Contrast, screen reader landmark compatibility |

---

## 2. Decision Tree Example: Data Presentation Layout

```
                  ┌─────────────────────────────────────┐
                  │ How many records typically exist?   │
                  └──────────────────┬──────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 │                                       │
            < 10 Items                              >= 10 Items
                 │                                       │
                 ▼                                       ▼
  ┌──────────────────────────────┐       ┌──────────────────────────────┐
  │ Do users need to compare     │       │ Is primary task scanning     │
  │ multiple attributes?         │       │ or visual discovery?         │
  └──────────────┬───────────────┘       └──────────────┬───────────────┘
                 │                                      │
         ┌───────┴───────┐                      ┌───────┴───────┐
         │               │                      │               │
        Yes              No                  Scanning       Discovery
         │               │                      │               │
         ▼               ▼                      ▼               ▼
  [Compact Grid]  [Resource List]         [Data Table]    [Card Deck]
  (3-col subgrid) (Polaris style)         (Carbon style)  (Faceted Grid)
```

The engine outputs the winning pattern alongside an explicit rationale explaining why the rejected candidate was inferior for the specific task.
