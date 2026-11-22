# UIForge Phase 05 — Administrative Systems Design Patterns
## Governance, Radical Usability, Error Summaries & Accessible Transactional Workflows

**Document ID:** UIF-PH05-PATT-ADMINISTRATION  
**Domain:** Government Portals, Administration, Compliance & Identity Verification  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** Submitting official documents, renewing permits, managing organization permissions, auditing access logs.
- **Cognitive State:** Anxious, compliance-focused; users may be stressed or using low-end devices and assistive technologies.

---

## 2. Canonical Positive Pattern: `PATT-ADM-001` (Accessible Form & Error Summary)

### 2.1 The GOV.UK Error Summary Architecture (`EVID-SYS-004`)
- **Error Summary Banner:**
  - Placed at the top of the form, bordered by a prominent 4px red line (`#D4351C`).
  - Contains a bold heading: `"There is a problem"` with `tabindex="-1"` so programmatic focus jumps directly to it upon failed form submission.
  - Lists every invalid field as a clickable hyperlink jumping focus directly to the offending input.
- **Field-Level Error Association:**
  - Input field receives a thick red border (`3px solid #D4351C`).
  - Error message text placed directly above the input, styled in bold red text.
  - Linked to input via `aria-describedby="input-error-id"`, with `aria-invalid="true"`.

### 2.2 Form Structure & Label Placement
- **Single-Column Vertical Layout:** Eliminates zigzag eye scanning.
- **Permanent Labels:** Bold `<label>` elements positioned permanently above inputs. Floating labels and placeholder-only fields are strictly prohibited.
- **Progressive Disclosure (`<details>` / `<summary>`):** Complex legal explanations hidden behind accessible native disclosure widgets so users can choose to read deeper guidance without cluttering the primary form.

### 2.3 Observable Evaluation Signals
- 100% WCAG 2.2 AA pass rate via automated axe-core scanning.
- Programmatic focus transfer to error summary on failed submit.
- Zero decorative graphics, animations, or unessential scripts.
