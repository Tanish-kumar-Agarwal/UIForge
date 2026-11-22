# UIForge Phase 05 — Knowledge Model Specification
## Versioned Knowledge Schemas, Envelope Models & TypeScript/Zod Architecture

**Document ID:** UIF-PH05-KNOWLEDGE-MODEL-SPEC  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Architectural Philosophy: Knowledge as Executable Code

UIForge treats design knowledge not as unstructured prose, but as **strongly typed, versioned, and machine-executable data contracts**. 

When an AI coding agent or design evaluation engine evaluates an interface, it must not execute vague prompts such as `"make this look modern"`. Instead, it retrieves specific knowledge entries conforming to `knowledge-entry.schema.json`, extracts discrete thresholds, compares them against the AST or computed DOM styles, and yields evidence-backed findings.

---

## 2. Shared Envelope Model

To prevent schema bloat while guaranteeing strict validation, UIForge adopts an **Envelope Architecture**:

```
┌──────────────────────────────────────────────────────────┐
│                   KNOWLEDGE ENVELOPE                     │
│  - id: string (KNOW-*, ANTI-*, PATT-*, HEUR-*)           │
│  - title: string                                         │
│  - category: enum (7 canonical categories)               │
│  - subcategory: string                                   │
│  - type: enum (principle, anti-pattern, pattern, etc)    │
│  - appliesTo: array of 10 target domains                 │
│  - severity: enum (CRITICAL, HIGH, MEDIUM, LOW, INFO)    │
│  - confidence: enum (MANDATORY, VERY_HIGH, HIGH, MED)    │
│  - evidence: array of EVID-* IDs                         │
│  - version: semver string                                │
│  - status: enum (draft, active, deprecated, superseded)  │
├──────────────────────────────────────────────────────────┤
│                  TYPE-SPECIFIC PAYLOAD                   │
│                                                          │
│  ┌───────────────────────┐   ┌────────────────────────┐  │
│  │ Anti-Pattern Payload  │   │ Positive-Pattern       │  │
│  │ - symptoms: string[]  │   │ - userGoals: string[]  │  │
│  │ - defect: string      │   │ - anatomy: object      │  │
│  │ - remediation: string │   │ - tradeOffs: string[]  │  │
│  └───────────────────────┘   └────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Evaluation Criteria Array                          │  │
│  │ - metric: string                                   │  │
│  │ - method: AUTOMATED_STATIC | BROWSER | HUMAN       │  │
│  │ - threshold: string                                │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Zod & TypeScript Contract Alignment

In Phase 06, this specification will be implemented in `@uiforge/contracts` as a new schema:

```typescript
// Proposed Level 0 Contract for @uiforge/contracts
export const KnowledgeEntrySchema = z.object({
  id: z.string().regex(/^(KNOW|ANTI|PATT|HEUR)-[A-Z0-9]+-[0-9]{3}$/),
  title: z.string().min(5).max(120),
  category: z.enum([
    'visual-fundamentals',
    'layout-engineering',
    'typography-intelligence',
    'color-intelligence',
    'interaction-and-motion',
    'ux-information-architecture',
    'design-systems'
  ]),
  subcategory: z.string().min(2).max(50),
  type: z.enum(['principle', 'anti-pattern', 'positive-pattern', 'heuristic', 'rule']),
  summary: z.string().min(20).max(500),
  appliesTo: z.array(z.string()).min(1),
  severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL']),
  confidence: z.enum(['MANDATORY', 'VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW']),
  guidance: z.array(z.string()).min(1),
  antiPatterns: z.array(z.string()).default([]),
  positivePatterns: z.array(z.string()).default([]),
  exceptions: z.array(z.string()).default([]),
  evaluationCriteria: z.array(z.object({
    metric: z.string(),
    method: z.enum(['AUTOMATED_STATIC', 'AUTOMATED_BROWSER', 'HEURISTIC_AGENT', 'HUMAN_REVIEW']),
    threshold: z.string()
  })).default([]),
  evidence: z.array(z.string().regex(/^EVID-[A-Z0-9]+-[0-9]{3}$/)).min(1),
  version: z.string().regex(/^[0-9]+\.[0-9]+\.[0-9]+$/),
  status: z.enum(['draft', 'active', 'deprecated', 'superseded']),
  supersededBy: z.string().optional()
});

export type KnowledgeEntry = z.infer<typeof KnowledgeEntrySchema>;
```

---

## 4. Referential Integrity Guarantees

Every knowledge entry is checked by automated validation for three closures:
1. **Evidence Closure:** Every item in `evidence` must exist in `EVIDENCE-REGISTER.json`.
2. **Anti-Pattern Closure:** Every item in `antiPatterns` must exist in `anti-pattern-catalogue.json`.
3. **Category Closure:** Every `category` and `subcategory` must exist in `taxonomy-registry.json`.
