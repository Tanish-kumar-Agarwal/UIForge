# UIForge Phase 05 — Design Systems Intelligence
## W3C DTCG Token Architecture, Three-Tier Abstraction, Component Anatomy & Governance

**Document ID:** UIF-PH05-TAX-DESIGN-SYSTEMS  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Executive Summary & Architectural Grounding

A design system is not a component library, nor is it a Figma sticker sheet. It is an agreed-upon system of **shared visual and architectural contracts** that coordinate designers, engineers, and autonomous AI agents across platforms.

UIForge implements the **Design Tokens Community Group (DTCG Draft 2025.10)** specification (`OS-TOKN-01`), developed within the W3C Design Tokens Community Group. *(Note: As a Community Group Report, this represents cross-industry tooling consensus rather than a formal W3C Recommendation)*, freezing compatibility with ADR-005 and `@uiforge/contracts`.


---

## 2. The Three-Tier Token Architecture (`EVID-TOK-001`)

To guarantee strict separation between raw brand values and contextual UI semantics, UIForge enforces three strictly separated token tiers:

```
┌──────────────────────────────────────────────────────────────────┐
│                   TIER 1: PRIMITIVE TOKENS                       │
│  Raw visual values without semantic intent                       │
│  - color.primitive.blue.500: "#2563EB"                           │
│  - space.primitive.16: "16px"                                    │
│  - font.primitive.inter: "'Inter', sans-serif"                   │
└─────────────────────────────────┬────────────────────────────────┘
                                  │ Referenced by
┌─────────────────────────────────▼────────────────────────────────┐
│                   TIER 2: SEMANTIC TOKENS                        │
│  Contextual meaning, role, and intent                            │
│  - color.semantic.action.primary: "{color.primitive.blue.500}"   │
│  - color.semantic.surface.canvas: "{color.primitive.neutral.50}" │
│  - space.semantic.card.padding: "{space.primitive.16}"           │
└─────────────────────────────────┬────────────────────────────────┘
                                  │ Referenced by
┌─────────────────────────────────▼────────────────────────────────┐
│                  TIER 3: COMPONENT TOKENS                        │
│  Scoped to specific component properties                         │
│  - button.primary.background: "{color.semantic.action.primary}"  │
│  - button.primary.paddingY: "{space.primitive.8}"                │
│  - card.default.borderRadius: "{radius.semantic.md}"             │
└──────────────────────────────────────────────────────────────────┘
```

### Invariant Rules:
1. **Zero Raw Values in Components:** Component implementation code (`.tsx`, `.vue`, `.html`) must **never** reference Primitive tokens or raw hex/pixel literals directly. They must strictly consume Semantic or Component tokens.
2. **Deterministic Aliasing:** Aliasing must use DTCG curly-brace syntax (`{color.semantic.action.primary}`). Style Dictionary v5.8.0 resolves these into native CSS variables (`--color-action-primary`).

---

## 3. Component Anatomy & Contract Specification

Every production component in UIForge follows a standardized anatomy:

```
┌────────────────────────────────────────────────────────┐
│ COMPONENT CONTAINER                                    │
│ (Surface fill, border, corner radius, elevation)       │
│                                                        │
│   ┌──────┐  ┌─────────────────────────┐  ┌──────────┐  │
│   │ LEAD │  │ CONTENT CONTAINER       │  │ TRAIL    │  │
│   │ ICON │  │ - Primary Label         │  │ ACTION   │  │
│   │      │  │ - Secondary Description │  │ (Chevron/│  │
│   │      │  │                         │  │  Badge)  │  │
│   └──────┘  └─────────────────────────┘  └──────────┘  │
└────────────────────────────────────────────────────────┘
```

### Component Contract Properties:
1. **Props API:** Strictly typed via TypeScript and Zod schemas (`ComponentDefinitionSchema` in `@uiforge/contracts`).
2. **State Machine:** Explicit handling of all 9 canonical interaction states (Default, Hover, Focus, Active, Disabled, Loading, Success, Error, Empty).
3. **Accessibility Attributes:** Built-in ARIA roles, states, and properties (`aria-expanded`, `aria-controls`, `aria-busy`).
4. **Theme Adaptability:** Complete decoupling from light/dark hardcoded styles; styles resolve entirely through semantic CSS custom properties.

---

## 4. Design System Governance & Token Lifecycle

1. **Immutability of Released Tokens:** Once a semantic token is published in a minor release, its token name and `$type` cannot be changed or removed until the next Major version.
2. **Deprecation Protocol:** Deprecated tokens receive a `$description` warning and are logged during build compilation via Style Dictionary transforms.
3. **Automated Drift Detection:** CI/CD linters scan pull requests and ASTs to detect any hardcoded CSS colors, raw pixel values, or unaliased primitive tokens, blocking the build on violation.
