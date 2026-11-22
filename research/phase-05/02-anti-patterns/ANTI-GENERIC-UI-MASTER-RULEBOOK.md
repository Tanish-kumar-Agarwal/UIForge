# UIForge Phase 05 — Anti-Generic-AI UI Master Rulebook
## Deconstructing Generic AI Design Tropes, Automated Flaws & Diagnostic Remediation

**Document ID:** UIF-PH05-ANTI-AI-RULEBOOK  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Executive Mandate: The Root Cause of "AI-Generated Slop"

Current generative AI coding tools produce interfaces that feel instantly recognizable as artificial, repetitive, and low-quality. This is not caused by technical limitations of HTML or CSS; it is caused by **epistemic laziness in prompt design and foundational models**:
1. **Regurgitating the Same Five Superficial Design Tropes:**
   * Centered hero with giant purple-to-blue gradient text.
   * Identical 3-column rounded card grids across every page section.
   * Floating blurred gradient spheres (blobs) behind frosted glass (`backdrop-filter: blur`).
   * Ultra-pill buttons (`rounded-full`) applied uniformly to everything.
   * Faint grey text (`#A0AEC0`) that fails basic WCAG contrast standards.
2. **Ignorance of Domain Functionality:** Applying consumer marketing landing page aesthetics to dense enterprise SaaS, financial ledgers, or healthcare portals.
3. **Absence of Real State Engineering:** Designing only the ideal "populated happy path" while completely omitting loading shimmers, empty states, validation errors, and keyboard focus states.

UIForge establishes this Master Rulebook to give AI coding agents and human engineers **explicit diagnostic and remediation capabilities**.

---

## 2. Anti-Pattern Classification Matrix

The rulebook classifies all design defects across eight discrete categories:

| Category Code | Domain | Primary Focus | Canonical File |
| :--- | :--- | :--- | :--- |
| **`ANTI-LAY-*`** | Layout Engineering | Grid monotony, bento abuse, container inception | [layout-anti-patterns.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-05/02-anti-patterns/layout-anti-patterns.md) |
| **`ANTI-TYP-*`** | Typography Intelligence | Unbounded measure, flat hierarchy, proportional numerals | [typography-anti-patterns.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-05/02-anti-patterns/typography-anti-patterns.md) |
| **`ANTI-COL-*`** | Color Intelligence | Low contrast, gratuitous gradients, pitch black dark mode | [color-anti-patterns.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-05/02-anti-patterns/color-anti-patterns.md) |
| **`ANTI-INT-*`** | Interaction & Motion | Sluggish animations, missing focus rings, blank empty states | [interaction-anti-patterns.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-05/02-anti-patterns/interaction-anti-patterns.md) |
| **`ANTI-COM-*`** | Visual Composition | Floating blobs, glassmorphism blur, pill overload | [composition-anti-patterns.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-05/02-anti-patterns/composition-anti-patterns.md) |
| **`ANTI-CNT-*`** | Content & Narrative | Placeholder copy, unrealistic claims, fake metrics | [content-anti-patterns.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-05/02-anti-patterns/content-anti-patterns.md) |
| **`ANTI-RSP-*`** | Responsive Physics | Viewport squeezing, horizontal overflow, small touch targets | [responsive-anti-patterns.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-05/02-anti-patterns/responsive-anti-patterns.md) |
| **`ANTI-A11Y-*`**| Accessibility Mandates | Color-only status, div buttons, broken focus trapping | [accessibility-anti-patterns.md](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-05/02-anti-patterns/accessibility-anti-patterns.md) |

---

## 3. Severity Scoring & Blocking Policy

Every detected anti-pattern is assigned a deterministic severity tier:
- **`CRITICAL`:** Violates non-negotiable legal/accessibility standards (WCAG AA) or causes catastrophic data loss/navigation blockage. **Blocks automated deployment.**
- **`HIGH`:** Substantially damages readability, information hierarchy, or mobile usability. Triggers high-priority remediation finding.
- **`MEDIUM`:** Ergonomic friction, gratuitous decoration, or design system drift. Recommended remediation.
- **`LOW`:** Minor visual inconsistency or stylistic sub-optimality. Advisory notice.
- **`INFORMATIONAL`:** Contextual note regarding design alternatives.

---

## 4. Machine-Readable Integration

All anti-patterns defined in this rulebook are synchronized with the canonical JSON database at:
[anti-pattern-catalogue.json](file:///c:/Users/kukpo/OneDrive/Desktop/UIForge/research/phase-05/02-anti-patterns/anti-pattern-catalogue.json)
This catalog is directly consumable by `@uiforge/project-analyzer`, `@uiforge/core`, and AST evaluation linters.
