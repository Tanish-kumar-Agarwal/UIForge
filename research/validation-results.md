# UIForge Research — Problem Validation Results & Field Status

**Document ID:** `UIF-VAL-001`  
**Phase:** 01 — Product Research, Problem Validation, Competitive Intelligence & Product Differentiation  
**Status:** Phase 01 Desk Research and Product Definition Complete / Empirical Field Validation PENDING  
**Date:** November 2026  

---

## 1. Compliance Statement on Empirical Integrity

In strict adherence to UIForge Engineering Rule 4 (*No assumptions presented as facts*) and Section 14 of the Phase 01 Master Research Execution Prompt:
- **No human interviews have been fabricated.**
- **No user transcripts, participant identities, survey statistics, or adoption percentages have been simulated.**
- **Empirical Field Validation with human subjects is formally recorded as: PENDING.**

This document synthesizes **secondary empirical evidence** derived from academic benchmarks, public developer ecosystem telemetry, and GitHub issue trackers, and establishes the formal gating criteria for conducting human subject validation.

---

## 2. Secondary Validation Evidence (Literature & Ecosystem Data)

While primary field interviews remain pending, the core hypotheses of UIForge are informed by published empirical studies and public developer ecosystem observations:

| Core UIForge Hypothesis | Supporting Evidence / Source | Evidentiary Finding | Status |
| :--- | :--- | :--- | :---: |
| **H1: AI coding models struggle with fine-grained spatial and responsive layout without structural constraints.** | *Design2Code* (Stanford NLP, REF-01); *SWE-bench Multimodal* (REF-05) | Multimodal models fail to recall dense layout structures and generate correct CSS wrapping in complex real-world test cases without programmatic scaffolding. | **Informed by Academic Benchmarks** |
| **H2: Orchestration, design constraints, and component scaffolding contribute substantially to frontend quality.** | *UI-Bench* (arXiv:2508.20410, REF-02) | 10 commercial tools exhibited significant variance in designer-evaluated visual quality across standardized prompts. UIForge hypothesizes that scaffolding, design tokens, and component registries drive these differences alongside model capability; controlled tests are required to isolate their individual contributions. | **Hypothesis Supported by Comparative Tool Observations** |
| **H3: Autonomous agents fail in real web workflows due to missing state indicators and unannounced DOM updates.** | *WebArena* (REF-04); *VisualWebArena* (REF-03) | Autonomous web agents experience task failures when encountering pages with broken focus states, unhandled errors, or empty state omissions. | **Informed by Literature** |
| **H4: AI-generated code frequently omits accessibility markup (WCAG 2.2 AA).** | Deque Systems automated accessibility research; WebAIM Million reports | Automated testing frequently detects contrast failures (WCAG 1.4.3 / 1.4.11) and missing accessible names (WCAG 4.1.2) on unassisted AI-generated pages. Exact industry failure frequency remains unmeasured. | **Hypothesis Supported by Industry Telemetry** |
| **H5: Developers report friction regarding uncontrolled brownfield AI code modifications.** | GitHub Developer Discussions & Community Feedback (Claude Code / Cursor issue logs) | Unwanted modifications of existing code and difficulty preserving existing conventions are frequently cited in developer feedback. Exact incidence rates remain to be measured empirically. | **Hypothesis Supported by Ecosystem Signals** |

---

## 3. Pending Field Validation Protocols

To transition from secondary literature validation to primary empirical field validation, two experimental protocols have been designed and documented:

1. **Structured Qualitative User Interview Protocol** (`research/experiments/interview-guide.md`):
   - Targets 15 participants: 5 AI-Assisted Developers (Persona 1), 5 Senior Frontend Engineers (Persona 2), and 5 Product Designers (Persona 3).
   - Designed to measure real-world prompt iteration fatigue, regression frequency, and patch approval willingness.
2. **Controlled Comparative Testing Protocol** (`research/experiments/user-test-protocol.md`):
   - A standardized practical test requiring developers to build a multi-page SaaS dashboard using their existing AI agent workflow vs. the UIForge-guided workflow.
   - Measures time-to-completion, correction prompt count, Playwright-verified horizontal overflow defects, and axe-core accessibility violations.

---

## 4. Gating Requirements to Mark Field Validation "COMPLETE"

Field validation will be formally updated from `PENDING` to `COMPLETE` only when:
1. Minimum 10 recorded participant interviews are conducted using `research/experiments/interview-guide.md`.
2. Actual transcripts and scored rubrics are archived in `research/evidence/transcripts/`.
3. Minimum 5 comparative practical tests are executed and logged according to `research/experiments/user-test-protocol.md`.
4. Statistical summary tables detailing observed correction turns and defect rates are compiled without anonymized fabrication.
