# UIForge Phase 05 — Education Platform Design Patterns
## Progressive Chunking, Interactive Feedback & Cognitive Guidance Workflows

**Document ID:** UIF-PH05-PATT-EDUCATION  
**Domain:** EdTech, Learning Management Systems (LMS) & Training Platforms  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Domain Profile & User Mentality
- **User Goals:** Comprehending new concepts, retaining procedural knowledge, completing assessments, tracking curriculum progress.
- **Cognitive State:** Learning posture; easily discouraged by dense walls of text, confusing assessment feedback, or lost progress.

---

## 2. Canonical Positive Pattern: `PATT-EDU-001` (Stepped Progressive Learning Track)

### 2.1 Information Architecture & Stepped Lessons
- **Progressive Disclosure Track:**
  - Course curriculum presented as a clean vertical roadmap with explicit state indicators (Completed, In Progress, Locked).
  - Lesson content partitioned into bite-sized 3-5 minute chunks ($4 \pm 1$ concepts per module, `SRC-HCI-002`).
  - Interactive quiz blocks embedded directly inline with narrative text rather than hidden behind awkward multi-page redirects.

### 2.2 Instant Explanatory Assessment Feedback
- **Feedback Mechanics:**
  - Selecting an answer triggers immediate visual state feedback.
  - Correct Answer: Gentle green border tint + celebratory feedback microinteraction + explanation of *why* the answer is correct.
  - Incorrect Answer: Gentle amber border (never aggressive alarming red) + encouraging hint + immediate option to re-attempt.

### 2.3 Observable Evaluation Signals
- Persistent progress bar anchored to the top of the viewport.
- Keyboard accessible assessment cards (`1-4` numeric keys select options, `Enter` submits).
- High readability scores (Flesch-Kincaid grade level mapped to learner demographic).
