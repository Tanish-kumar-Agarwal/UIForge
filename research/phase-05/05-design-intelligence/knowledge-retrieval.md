# UIForge Phase 05 — Design Knowledge Retrieval Architecture
## Multi-Dimensional Indexing, Faceted Querying & Contextual Filtering

**Document ID:** UIF-PH05-ENGINE-RETRIEVAL  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Multi-Dimensional Knowledge Indexing

Knowledge entries are indexed across eight discrete orthogonal axes:

1. **Domain Axis (10 Values):** `editorial`, `enterprise-saas`, `fintech`, `ecommerce`, `developer-tools`, `healthcare`, `education`, `dashboards`, `administration`, `consumer-applications`.
2. **Category Axis (7 Values):** `visual-fundamentals`, `layout-engineering`, `typography-intelligence`, `color-intelligence`, `interaction-and-motion`, `ux-information-architecture`, `design-systems`.
3. **Subcategory Axis:** Discrete specializations (e.g. `grid-systems`, `accessible-contrast`, `type-scales`).
4. **Knowledge Type Axis:** `principle`, `anti-pattern`, `positive-pattern`, `heuristic`, `rule`.
5. **Severity Axis:** `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `INFORMATIONAL`.
6. **Confidence Axis:** `MANDATORY`, `VERY_HIGH`, `HIGH`, `MEDIUM`, `LOW`.
7. **Component Slot Axis:** `navigation`, `app-shell`, `table`, `form`, `card`, `modal`, `button`, `input`.
8. **Viewport Mode Axis:** `desktop`, `tablet`, `mobile`.

---

## 2. Faceted Retrieval Algorithm

When an agent needs design knowledge for a specific task:

```typescript
interface RetrievalQuery {
  domain: ProductDomain;
  targetSlot: ComponentSlot;
  viewport: 'desktop' | 'mobile';
  densityMode: 'productive' | 'expressive';
  requiredSeverities: Severity[];
}

function retrieveDesignKnowledge(query: RetrievalQuery): KnowledgeBundle {
  // 1. Mandatory Rules Filter: Always retrieve all CRITICAL normative rules
  const normativeRules = index.query({ severity: 'CRITICAL', confidence: 'MANDATORY' });
  
  // 2. Domain-Specific Positive Patterns
  const positivePatterns = index.query({
    type: 'positive-pattern',
    appliesTo: [query.domain, 'all']
  });
  
  // 3. Slot-Relevant Anti-Patterns
  const activeAntiPatterns = index.query({
    type: 'anti-pattern',
    category: mapSlotToCategory(query.targetSlot)
  });
  
  // 4. Return rank-ordered bundle
  return { normativeRules, positivePatterns, activeAntiPatterns };
}
```

This guarantees that the AI coding agent never receives generic, irrelevant design tips.
