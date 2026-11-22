# ADR-005: Canonical Design Knowledge Representation & Token Formats
## Adoption of W3C DTCG 2025.10 Standard, Versioned Schemas & Machine-Readable Contracts

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Developer Tools Architect & Principal Software Architect  

---

## 1. Context & Problem Statement
Frontend design specifications, design tokens, component metadata, and evaluation results are notoriously fragmented. Tools use incompatible JSON structures, proprietary CSS variable formats, or unstructured markdown files.

UIForge requires a portable, standardized, machine-readable design knowledge format that can be parsed by AST engines, consumed by AI agents, compiled to native CSS, and validated by schema linters.

---

## 2. Decision Constraints
1. **Industry Standard for Tokens:** Must align with the authoritative W3C Design Tokens Community Group (DTCG Draft 2025.10) specification (`OS-TOKN-01`).
2. **Compiler Compatibility:** Tokens must be natively compilable by Style Dictionary v5.8.0 (`OS-TOKN-02`) running on Node.js 22 LTS without legacy transform hacks.
3. **Target Styling Agnosticism:** Must cleanly compile to native CSS custom properties, Tailwind CSS v4 `@theme` directives, and TypeScript types.
4. **Strict Schema Validation:** All design briefs, visual directions, and evaluation reports must validate against versioned Draft-07 JSON Schemas and Zod contracts.

---

## 3. Options Considered
- **Option 1: Proprietary UIForge JSON Format:** Invent a custom token and design specification schema.
- **Option 2: Plain CSS Custom Properties / Tailwind Config Direct:** Treat `globals.css` or `tailwind.config.js` as the canonical source of truth for design tokens.
- **Option 3: W3C DTCG 2025.10 Standard + Versioned Zod Contracts:** Adopt the W3C DTCG standard format for tokens and define versioned contracts (`uiforge.contract.*.v1`) for all design briefs and evaluation records.

---

## 4. Evaluation of Options

| Criteria | Option 1: Proprietary Format | Option 2: Plain CSS/Tailwind | Option 3: W3C DTCG + Zod |
| :--- | :--- | :--- | :--- |
| **Ecosystem Portability** | Low (only UIForge parses it) | Moderate (tied to CSS/Tailwind) | Universal (Figma, Tokens Studio, DTCG) |
| **Multi-Platform Targets** | Requires custom compilers | Difficult for iOS/Android/SVG | Native via Style Dictionary v5.8.0 |
| **Semantic Token Ramps** | Custom syntax | Unstructured CSS variables | Formal `$value`, `$type`, `$description` |
| **Type Safety** | Requires custom types | None | Generated TypeScript `.d.ts` types |

---

## 5. Decision Outcome
**Selected Option:** **Option 3: W3C DTCG 2025.10 Standard + Versioned Zod Contracts.**

### Architectural Specification:
1. **Token Dictionary Standard (`tokens.json`):**
   - Strictly conforms to W3C DTCG 2025.10 schema with explicit `$type` declarations (`color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `shadow`).
   - Supports formal token aliasing syntax (`{color.primitive.blue.500}`).
2. **Compilation Pipeline:**
   - Compiled via Style Dictionary v5.8.0 (`OS-TOKN-02`) to:
     - `globals.css`: Native `:root` and `.dark` CSS custom properties (`--color-primary`, `--space-4`).
     - `theme.css`: Tailwind CSS v4 `@theme` directives.
     - `tokens.d.ts`: Strongly typed TypeScript definitions for compile-time autocompletion.
3. **Versioned Design Contracts:**
   - `uiforge.contract.design-brief.v1`: Defines personas, states, layout hierarchy, and responsive constraints.
   - `uiforge.contract.visual-direction.v1`: Defines archetype, color palette, typography pairing, radius, and elevation.

---

## 6. Consequences & Impact
- **Positive:**
  - Full interoperability with Figma Tokens Studio and external design tool exports.
  - Zero lock-in: developers can migrate tokens to any toolchain supported by Style Dictionary.
  - Clear separation between raw design tokens (`tokens.json`) and compiled target artifacts (`globals.css`).
- **Negative:**
  - Requires developers to understand DTCG token hierarchy (`primitive` $\rightarrow$ `semantic` $\rightarrow$ `component`).

---

## 7. Security & Operational Impact
- Token values are sanitized during compilation to prevent CSS injection vulnerabilities (e.g. malicious expressions or `javascript:` URLs).

---

## 8. Research References
- Phase 02.2: `WS3-REGISTRY-AND-TOKENS.md`.
- Phase 02.5: Finding C10 (Style Dictionary v5.8.0 native DTCG upgrade).
- Phase 02.5: `CORE-FOUNDATION-SHORTLIST.md` (`OS-TOKN-01` DTCG Spec, Tier 0).

---

## 9. Open Questions
- None. Token format is confirmed and frozen.
