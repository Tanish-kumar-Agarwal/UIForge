# UIForge Phase 05 — Consumer Application Design Patterns
## Mobile Thumb Ergonomics, Bottom Sheets, Fluid Microinteractions & Touch Targets

**Document ID:** UIF-PH05-PATT-CONSUMER  
**Domain:** Consumer Mobile & Web Applications  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** Quick social updates, personal task management, media browsing, casual entertainment.
- **Cognitive State:** Casual, distracted, one-handed mobile grip; high expectation of fluid touch gestures and visual delight.

---

## 2. Canonical Positive Pattern: `PATT-CON-001` (Bottom-Sheet Touch Ergonomics)

### 2.1 The Thumb-Zone Navigation Architecture (`EVID-HCI-005`, `EVID-SYS-003`)
- **Bottom Navigation Bar (Mobile):** 4-5 core navigation icons placed strictly along the bottom edge within comfortable one-handed thumb reach.
- **Bottom Sheet Modals (Slide-Over Action Sheets):**
  - Secondary options and detailed entity views slide up from the bottom edge rather than appearing as floating desktop-style centered boxes.
  - Includes a prominent pill drag handle (`40px x 4px`) supporting downward swipe-to-dismiss gestures.
  - Interactive tap targets strictly enforce minimum $44\text{px} \times 44\text{px}$ bounding boxes (`SRC-SYS-002`).

### 2.2 Fluid Microinteractions & Tactile Feedback
- **Active State Physics:** Tapping buttons triggers a subtle tactile scale depression (`transform: scale(0.97)`) lasting 100ms.
- **Pull-to-Refresh & Optimistic Feeds:** Dragging down on activity streams reveals an unobtrusive circular spinner; new posts appear instantly in local state before remote sync.

### 2.3 Observable Evaluation Signals
- Minimum 44px touch targets on coarse pointer devices (`@media (pointer: coarse)`).
- Full compliance with `prefers-reduced-motion` (disabling bounce animations when requested).
