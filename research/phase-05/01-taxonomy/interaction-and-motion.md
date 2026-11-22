# UIForge Phase 05 — Interaction & Motion Intelligence
## State Machines, Keyboard Ergonomics, Functional Motion & Accessibility Physics

**Document ID:** UIF-PH05-TAX-INTERACTION-MOTION  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Executive Summary & Core Philosophy

Motion and interaction in UIForge are **functional communicative tools**, not decorative amusement. 

Every visual transition must answer one of three ergonomic questions for the user:
1. *Where did that object come from?* (Spatial continuity).
2. *Did the system receive my action?* (Feedback and acknowledgment).
3. *What changed as a result of my action?* (State transition).

Excessive, lingering, or purely decorative animations (e.g. bouncing icons, spinning cards, sluggish 800ms dropdowns) degrade user efficiency, cause motion sickness, and represent classic amateur design.

---

## 2. The Nine Canonical Component Interaction States

Every interactive component in UIForge must deterministically implement 9 distinct states:

| State | Ergonomic Purpose | Visual Requirement |
| :--- | :--- | :--- |
| **1. Default** | Rest state; communicates affordance | Baseline token values; clear clickable boundary |
| **2. Hover** | Signals pointer presence & interactivity | 8% tint overlay or subtle elevation shift; cursor: pointer |
| **3. Focus** | Essential for keyboard navigation | Minimum 3:1 contrast focus ring; 2px perimeter offset |
| **4. Active / Pressed** | Immediate tactile physical feedback | 12% darken overlay or subtle 1px downward translation |
| **5. Disabled** | Signals action is currently unavailable | Desaturated, reduced opacity (38%), `cursor: not-allowed` |
| **6. Loading** | Prevents double submission; signals work | Inline spinner or shimmer; control disabled but preserved in layout |
| **7. Success** | Confirms completion of asynchronous task | Brief green checkmark transition before resetting |
| **8. Error** | Signals validation failure or network drop | High-contrast red perimeter; linked inline error message |
| **9. Empty** | Guides user when zero items exist | Actionable empty illustration, explanation, and primary CTA |

---

## 3. Keyboard Ergonomics & Focus Management

### 3.1 Unbroken Focus Ring Invariant (WCAG 2.2 SC 2.4.7 Level AA & SC 2.4.13 Level AAA Enhanced)
* `outline: none` without an immediate high-contrast replacement is a **CRITICAL** accessibility violation of WCAG 2.2 Level AA SC 2.4.7 (Focus Visible) and SC 2.4.11 (Focus Not Obscured).
* Use `:focus-visible` to display the focus ring exclusively during keyboard navigation (Tab/arrow keys), suppressing it during mouse clicks to maintain clean visual aesthetics while guaranteeing keyboard accessibility.
* UIForge focus ring contract: `outline: 2px solid var(--focus-ring); outline-offset: 2px;` achieving $\ge 3:1$ contrast against adjacent surfaces (satisfying enhanced Level AAA SC 2.4.13).


### 3.2 Modal Focus Trapping (W3C WAI-ARIA APG)
When an overlay dialog, slide-over drawer, or modal opens (`EVID-DOM-003`):
1. **Initial Focus:** Focus immediately shifts to the first interactive element inside the modal (or the close button).
2. **Tab Trapping:** Pressing Tab on the last element wraps focus to the first element; Shift+Tab on the first element wraps to the last. Focus cannot leak into the obscured background.
3. **Escape Key:** Pressing Escape immediately closes the modal.
4. **Return Focus:** Upon closing, focus must return precisely to the button that triggered the modal.

---

## 4. Functional Motion Curves & Timing Hierarchy

### 4.1 Timing Duration Guidelines
* **Micro-interactions (Hover, Press, Toggle):** $100\text{ms} - 150\text{ms}$. Anything longer feels laggy.
* **Component Expansions (Accordion, Dropdown, Tooltip):** $150\text{ms} - 250\text{ms}$.
* **Macro Transitions (Modal open, Page slide, Drawer):** $250\text{ms} - 350\text{ms}$.
* **Prohibited Duration:** Any UI transition exceeding $400\text{ms}$ is classified as an anti-pattern.

### 4.2 Asymmetric Easing Invariant (`EVID-SYS-006`)
* **Entering Elements:** Must use **Decelerate Easing** (`cubic-bezier(0.0, 0.0, 0.2, 1.0)`). Starts fast so the user sees immediate response, then gently slows to rest.
* **Exiting Elements:** Must use **Accelerate Easing** (`cubic-bezier(0.4, 0.0, 1.0, 1.0)`). Starts slow and quickly exits the screen to clear the canvas.
* **Linear Easing:** Strictly forbidden for spatial movement. Only permitted for continuous progress spinners.

---

## 5. Reduced Motion Mandate (`prefers-reduced-motion`)

For users with vestibular disorders, motion triggers dizziness, nausea, and disorientation.

**Non-Negotiable CSS Contract:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
* In reduced-motion mode, all spatial sliding, bouncing, and parallax scrolling are eliminated.
* State transitions are replaced with instantaneous updates or subtle, instantaneous opacity crossfades.

---

## 6. Perceived Performance & Optimistic UI Architecture

1. **Sub-100ms Response:** Visual feedback must occur within 100ms of click/tap to feel instantaneous to the human nervous system.
2. **Optimistic Updates (`EVID-DOM-002`):** For low-risk micro-actions (favoriting an item, marking a checkbox, toggling a switch), the UI must update immediately in local state before the network request returns. If the API returns an error, the state rolls back deterministically with a persistent toast notification.
3. **Prohibited for High-Risk Actions:** Optimistic updates are strictly prohibited for financial transfers, irreversible record deletion, or batch exports.
