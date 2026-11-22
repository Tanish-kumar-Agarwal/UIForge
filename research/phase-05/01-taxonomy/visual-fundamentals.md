# UIForge Phase 05 — Visual Design Fundamentals Taxonomy
## 19 Foundational Principles of Visual Perception, Spatial Composition & Cognitive Ergonomics

**Document ID:** UIF-PH05-TAX-VISUAL-FUNDAMENTALS  
**Status:** Canonical & Audited  
**Phase:** 05 — Design Knowledge Base, Anti-AI UI Rulebook & Core Design Intelligence Foundation  

---

## 1. Overview & Epistemic Framework

Visual design is not superficial decoration; it is the visual encoding of information architecture and interactive possibilities. The human visual system processes preattentive visual attributes (color, size, spatial position, motion) in under 200ms before focused cognitive attention begins (`SRC-HCI-005`). 

This document defines the 19 foundational principles of visual perception in software interfaces. Each principle is structured across **12 canonical dimensions**:

1. **Canonical Definition:** Precise technical description.
2. **Design Objective:** Desired ergonomic or cognitive outcome.
3. **Perceptual Rationale:** Neurological or psychological basis.
4. **Appropriate Contexts:** When and where it applies.
5. **Practical Guidance:** Concrete implementation instructions.
6. **Common Failure Modes:** Typical junior/AI defects.
7. **Valid Exceptions:** When to intentionally break it.
8. **Observable Signals:** Measurable CSS/DOM properties.
9. **Automated Detection:** Feasibility of algorithmic audit.
10. **Required Human Judgment:** Subjective aspects needing review.
11. **Evidence & References:** Canonical citations from Source Register.
12. **Confidence & Limitations:** Boundary conditions of the rule.

---

## 2. The 19 Canonical Visual Fundamentals

### 1. Visual Hierarchy
1. **Canonical Definition:** The intentional optical arrangement of interface elements in descending order of communicative importance.
2. **Design Objective:** Enable the user to identify the primary message, secondary details, and interactive next steps within 3 seconds of viewing.
3. **Perceptual Rationale:** Cognitive load is minimized when the human visual cortex can build an immediate spatial mental map without reading every word (`SRC-HCI-001`, `SRC-HCI-005`).
4. **Appropriate Contexts:** Universal across all 10 product domains.
5. **Practical Guidance:** Establish a clear 3-tier hierarchy: Level 1 (Page Title / Main KPI / Hero Action), Level 2 (Section Headers / Group Labels), Level 3 (Body Text / Metadata / Supporting Actions). Use size, weight, and contrast simultaneously.
6. **Common Failure Modes:** Flat visual weight (all text looks the same size); competing primary actions (three bright blue buttons next to each other); decorative elements overwhelming functional content.
7. **Valid Exceptions:** Raw data tables with homogeneous row items, where visual uniformity is required for accurate vertical scanning.
8. **Observable Signals:** Distribution of `font-size`, `font-weight`, text color contrast, and element bounding boxes.
9. **Automated Detection:** High feasibility. Can parse DOM AST to compute relative optical salience scores.
10. **Required Human Judgment:** Determining whether the most salient element actually corresponds to the user's primary goal.
11. **Evidence & References:** `SRC-HCI-001`, `SRC-HCI-005`, `EVID-HCI-001`, `EVID-HCI-004`.
12. **Confidence & Limitations:** MANDATORY. Universal across all visual communication.

### 2. Contrast
1. **Canonical Definition:** The perceptual degree of visual difference between an element and its immediate background or neighboring elements.
2. **Design Objective:** Guarantee legibility of information and rapid differentiation of interactive boundaries.
3. **Perceptual Rationale:** Photoreceptor cells in the retina (rods and cones) detect edges primarily through luminance contrast rather than chromatic hue differences (`SRC-STD-001`, `SRC-STD-004`).
4. **Appropriate Contexts:** Universal. Critical for text, input borders, icons, and focus rings.
5. **Practical Guidance:** Maintain minimum 4.5:1 luminance contrast for normal body text, 3:1 for large display text and UI component boundaries (WCAG 2.2 Level AA).
6. **Common Failure Modes:** Light grey text on white backgrounds; low-contrast placeholder text; button text disappearing on hover; decorative low-contrast cards.
7. **Valid Exceptions:** Disabled/inactive states (WCAG SC 1.4.3 explicitly exempts inactive components).
8. **Observable Signals:** Computed `color` and `background-color` values evaluated via relative luminance formulas.
9. **Automated Detection:** 100% automated via axe-core / static CSS analysis.
10. **Required Human Judgment:** Verifying text rendered over dynamic background photography or complex gradients.
11. **Evidence & References:** `SRC-STD-001`, `EVID-A11Y-001`, `EVID-A11Y-002`.
12. **Confidence & Limitations:** MANDATORY. Absolute non-negotiable legal and accessibility standard.

### 3. Balance
1. **Canonical Definition:** The state of optical equilibrium achieved through the strategic distribution of visual weight across a layout's axes.
2. **Design Objective:** Create a visually stable composition that feels intentional, orderly, and calm.
3. **Perceptual Rationale:** The human visual system actively seeks physical equilibrium; unbalanced compositions induce perceptual tension and unease.
4. **Appropriate Contexts:** Page macro-layouts, marketing landing pages, split-screen views, dashboard grid arrangements.
5. **Practical Guidance:** Balance large elements of low visual weight (e.g. whitespace, pale background tints) with small elements of high visual weight (e.g. bold high-contrast buttons, dark badges).
6. **Common Failure Modes:** One-sided content accumulation (all heavy widgets crammed into the left column leaving the right side empty); top-heavy layouts.
7. **Valid Exceptions:** Deliberately asymmetrical editorial designs or brutalist expressive layouts.
8. **Observable Signals:** Bounding box center of gravity calculated across DOM node visual mass.
9. **Automated Detection:** Moderate feasibility via bounding box spatial mass computation.
10. **Required Human Judgment:** High. Distinguishing dynamic intentional asymmetry from accidental layout clumping.
11. **Evidence & References:** `SRC-HCI-005`, `SRC-SYS-003`.
12. **Confidence & Limitations:** HIGH. Context-dependent aesthetic and perceptual principle.

### 4. Rhythm & Vertical Cadence
1. **Canonical Definition:** The regular, harmonic repetition of spatial intervals, typographic baseline heights, and structural elements down a page.
2. **Design Objective:** Provide a predictable vertical tempo that accelerates scanning and prevents visual disorientation.
3. **Perceptual Rationale:** Saccadic eye movements rely on predictable vertical spacing intervals to anticipate the start of the next line or block (`SRC-HCI-004`).
4. **Appropriate Contexts:** Long-form editorial pages, documentation, settings forms, multi-card dashboards.
5. **Practical Guidance:** Enforce an 8px spatial baseline grid. Set line-heights and paragraph margins to exact multiples of 4px or 8px.
6. **Common Failure Modes:** Random margins (`13px`, `19px`, `27px`); inconsistent gaps between heading and paragraph pairs; paragraphs colliding with adjacent sections.
7. **Valid Exceptions:** Compact data-dense tables where 2px or 4px micro-spacing is required.
8. **Observable Signals:** Computed `margin-bottom`, `padding`, `line-height`, and grid `gap` values across sibling nodes.
9. **Automated Detection:** High feasibility. Can detect variance from the 8px/4px spatial ramp.
10. **Required Human Judgment:** Evaluating visual harmony across mixed media (images, embeds, text).
11. **Evidence & References:** `SRC-HCI-004`, `SRC-SYS-003`, `EVID-TYP-002`, `EVID-SYS-001`.
12. **Confidence & Limitations:** HIGH. Core to professional engineering craftsmanship.

### 5. Alignment
1. **Canonical Definition:** The precise spatial positioning of elements along common horizontal, vertical, or baseline axes.
2. **Design Objective:** Establish clear visual connections between disparate elements and eliminate perceived visual chaos.
3. **Perceptual Rationale:** The Gestalt law of good continuation states that human eyes naturally follow lines, curves, and aligned edges (`SRC-HCI-005`).
4. **Appropriate Contexts:** Universal across all UI structures.
5. **Practical Guidance:** Align text along a strong vertical edge (left-align for LTR languages). Right-align numeric values in financial tables. Never center-align long body paragraphs.
6. **Common Failure Modes:** Ragged form label alignments; icons slightly misaligned with adjacent text baselines; buttons floating off the grid edge.
7. **Valid Exceptions:** Floating action buttons (FABs), badge overlays, or diagonal decorative brand banners.
8. **Observable Signals:** Computed bounding box X and Y coordinates across sibling and parent containers.
9. **Automated Detection:** High feasibility via DOM bounding-box coordinate diffs.
10. **Required Human Judgment:** Optical alignment vs mathematical alignment (e.g. play icons inside circular buttons need optical offset).
11. **Evidence & References:** `SRC-HCI-004`, `SRC-HCI-005`, `EVID-DOM-001`.
12. **Confidence & Limitations:** VERY_HIGH. Optical alignment is an infallible indicator of engineering polish.

### 6. Proximity
1. **Canonical Definition:** The spatial positioning of related elements closer to each other than to unrelated elements.
2. **Design Objective:** Form clear perceptual groups without needing heavy visual borders or enclosing boxes.
3. **Perceptual Rationale:** Gestalt Law of Proximity: objects that are close together are perceived as belonging to the same group (`SRC-HCI-005`).
4. **Appropriate Contexts:** Form field labels and inputs, card metadata, button groups, navigation links.
5. **Practical Guidance:** The gap between a label and its input must be strictly smaller than the gap between that input and the next form field (e.g. 8px label gap vs 24px field gap).
6. **Common Failure Modes:** Equidistant vertical spacing where a label sits midway between the input below it and the unrelated input above it; disconnected card actions.
7. **Valid Exceptions:** Standalone isolated search bars or single-input landing pages.
8. **Observable Signals:** Ratio of intra-group spacing to inter-group spacing across adjacent elements.
9. **Automated Detection:** High feasibility. AST/DOM spatial ratio analysis.
10. **Required Human Judgment:** Low. Proximity is a mathematically verifiable spatial relationship.
11. **Evidence & References:** `SRC-HCI-002`, `SRC-HCI-005`, `EVID-HCI-002`.
12. **Confidence & Limitations:** MANDATORY. Core usability invariant.

### 7. Repetition & Structural Consistency
1. **Canonical Definition:** The intentional reuse of visual attributes (typography, colors, corner radii, spacing, iconography) across an entire interface.
2. **Design Objective:** Reinforce pattern recognition, eliminate user surprise, and build interface predictability.
3. **Perceptual Rationale:** Human cognition operates by pattern matching; consistency drastically shortens the learning curve and error rate.
4. **Appropriate Contexts:** Design system token application, multi-step workflows, component libraries.
5. **Practical Guidance:** Use a strictly defined token scale: 3-5 surface colors, 1-2 font families, 4 corner radii (`0px`, `4px`, `8px`, `12px`), 1 spatial ramp.
6. **Common Failure Modes:** A page with 5 different button corner radii (`2px`, `6px`, `12px`, `9999px`); mixing outline icons and solid icons arbitrarily; varying card padding.
7. **Valid Exceptions:** Distinct alert banners or emergency modal dialogs requiring intentional visual disruption.
8. **Observable Signals:** Statistical variance of token values (radii, colors, fonts) across the DOM.
9. **Automated Detection:** Very high feasibility via AST style clustering analysis.
10. **Required Human Judgment:** Deciding when an intentional variation serves a distinct product purpose.
11. **Evidence & References:** `SRC-SYS-001`, `SRC-SYS-003`, `EVID-TOK-001`.
12. **Confidence & Limitations:** VERY_HIGH. Central to design system integrity.

### 8. Gestalt Principles (Closure, Similarity, Common Fate, Common Region)
1. **Canonical Definition:** Psychological principles describing how human vision organizes individual visual elements into unified groups, patterns, and holistic structures.
2. **Design Objective:** Structure complex multi-widget interfaces so users instinctively perceive relationships without reading instructions.
3. **Perceptual Rationale:** The human brain is an efficient pattern-matching engine that groups elements by similarity, encloses them in common regions, and visually completes broken shapes (`SRC-HCI-005`).
4. **Appropriate Contexts:** Dashboard widget partitioning, tab panels, cards, data grids.
5. **Practical Guidance:** Use subtle background surfaces (`background: var(--surface-subtle)`) to establish common regions before resorting to heavy borders. Use identical styling for items sharing identical interactive behavior (similarity).
6. **Common Failure Modes:** Putting unrelated controls inside the same card border; using differing visual treatments for items in the same list.
7. **Valid Exceptions:** Highlighting the "current" or "recommended" plan in a pricing grid.
8. **Observable Signals:** Background color grouping, border containment, and sibling node style parity.
9. **Automated Detection:** Moderate feasibility via DOM hierarchy and CSS inheritance inspection.
10. **Required Human Judgment:** High. Evaluating whether semantic grouping matches user mental models.
11. **Evidence & References:** `SRC-HCI-005`, `EVID-HCI-004`.
12. **Confidence & Limitations:** HIGH. Theoretical bedrock of visual organization.

### 9. Visual Weight & Mass
1. **Canonical Definition:** The perceived heaviness of a visual element, determined by its size, color saturation, darkness, contrast, and visual density.
2. **Design Objective:** Direct user attention in exact proportion to the functional importance of each element.
3. **Perceptual Rationale:** Darker, larger, and highly saturated objects exert greater preattentive gravitational pull on the fovea centralis (`SRC-HCI-005`).
4. **Appropriate Contexts:** Call-to-action buttons, status badges, hero sections, modal headers.
5. **Practical Guidance:** Ensure primary action has the highest visual weight on the screen; secondary actions should be outlined; tertiary actions should be ghost/text-only.
6. **Common Failure Modes:** A "Delete Account" button styled with equal or higher visual weight than the "Save Changes" button; decorative illustrations overpowering core transaction controls.
7. **Valid Exceptions:** Warning and destructive confirmation modals where the dangerous action must be deliberately prominent.
8. **Observable Signals:** Optical salience index (surface area × contrast ratio × color saturation).
9. **Automated Detection:** High feasibility via pixel salience modeling.
10. **Required Human Judgment:** Balancing brand expression with functional salience.
11. **Evidence & References:** `SRC-HCI-005`, `SRC-SYS-001`, `EVID-HCI-004`.
12. **Confidence & Limitations:** HIGH. Essential for actionable ergonomics.

### 10. Composition & Spatial Framing
1. **Canonical Definition:** The macro-level arrangement of visual elements within the display canvas to create an orderly, navigable structure.
2. **Design Objective:** Frame content so that primary workspaces, navigation landmarks, and contextual tools have intuitive spatial coordinates.
3. **Perceptual Rationale:** Users build spatial memory of software tools (e.g. navigation on the left, profile on the top right, workspace in the center). Violating established spatial conventions destroys motor memory (`SRC-HCI-006`).
4. **Appropriate Contexts:** App shells, dashboard layouts, split-screen comparison tools.
5. **Practical Guidance:** Anchor global navigation to consistent boundaries (top or left). Keep main work canvases bounded and responsive. Avoid arbitrary floating elements that obscure content.
6. **Common Failure Modes:** Unanchored floating modals; layouts where the primary workspace is shoved below the fold by massive decorative hero banners.
7. **Valid Exceptions:** Immersive canvas apps (Figma, Miro, map viewers) where toolbars float over infinite canvases.
8. **Observable Signals:** CSS grid-template-areas, flexbox structures, and fixed/sticky layout positioning.
9. **Automated Detection:** High feasibility via DOM landmark and layout container parsing.
10. **Required Human Judgment:** Suitability of novel compositions for niche creative tools.
11. **Evidence & References:** `SRC-SYS-003`, `SRC-SYS-007`, `EVID-HCI-005`.
12. **Confidence & Limitations:** VERY_HIGH. Defines software ergonomics.

### 11. Emphasis & Focal Points
1. **Canonical Definition:** The intentional accentuation of a single element to create an unmistakable starting point for visual scanning.
2. **Design Objective:** Eliminate ambiguity about what the user should look at first upon entering a view.
3. **Perceptual Rationale:** Without an obvious focal point, visual search degenerates into random visual hopping, increasing task latency and cognitive fatigue (`SRC-HCI-001`).
4. **Appropriate Contexts:** Onboarding screens, purchase funnels, task dashboards, invoice review pages.
5. **Practical Guidance:** Limit a single screen view to exactly ONE dominant focal point (primary CTA or central metric) and at most TWO secondary focal points.
6. **Common Failure Modes:** The "Carnival Effect": 5 flashing badges, 3 bright buttons, and a pulsating banner all competing for attention.
7. **Valid Exceptions:** Catalog browsing grids (Pinterest, e-commerce index) where democratic scanning across multiple items is the explicit goal.
8. **Observable Signals:** Salience distribution histogram across the rendered DOM.
9. **Automated Detection:** High feasibility via salience clustering.
10. **Required Human Judgment:** Contextual alignment with business and user priorities.
11. **Evidence & References:** `SRC-HCI-001`, `SRC-HCI-005`, `EVID-HCI-001`.
12. **Confidence & Limitations:** HIGH. Prevents chaotic interfaces.

### 12. Whitespace (Negative Space)
1. **Canonical Definition:** Unoccupied space around and between visual elements within a layout.
2. **Design Objective:** Provide breathing room, enhance legibility, separate disparate concepts, and convey elegance and focus.
3. **Perceptual Rationale:** Whitespace reduces visual clutter, allowing the brain's working memory to focus cleanly on isolated information chunks (`SRC-HCI-002`).
4. **Appropriate Contexts:** Universal. Particularly crucial in marketing, editorial, and executive reporting.
5. **Practical Guidance:** Use whitespace actively as a layout tool. Increase whitespace proportionally with heading size (e.g. 48px padding above h1, 24px above h2).
6. **Common Failure Modes:** Edge-to-edge text crowding; zero padding inside card containers; treating whitespace as "wasted space" and cramming in ads or widgets.
7. **Valid Exceptions:** Ultra-dense operational environments (Bloomberg terminals, aviation software, CAD tools) where maximum visible data density is required.
8. **Observable Signals:** Ratio of content bounding box area to parent container area; computed padding and margin values.
9. **Automated Detection:** High feasibility via spatial area occupancy calculations.
10. **Required Human Judgment:** Balancing whitespace elegance against data-density operational needs.
11. **Evidence & References:** `SRC-HCI-002`, `SRC-HCI-004`, `EVID-HCI-002`.
12. **Confidence & Limitations:** VERY_HIGH. The single greatest differentiator between amateur and professional design.

### 13. Information Density
1. **Canonical Definition:** The quantity of discrete data points, interactive controls, and text presented per unit of viewport surface area.
2. **Design Objective:** Match the visual bandwidth of the interface to the task requirements and cognitive state of the target user.
3. **Perceptual Rationale:** Novices and casual users require low density with guided cues; expert operators in high-frequency tasks require high density to minimize scrolling and context switching (`SRC-SYS-003`).
4. **Appropriate Contexts:** Varies by domain: low density for mobile consumer apps; high density for trading desks and medical records.
5. **Practical Guidance:** Support distinct density modes (e.g. Carbon's Productive vs Expressive). In high-density modes, reduce row heights (32px), tighten padding (8px), and use compact 13px/14px typography.
6. **Common Failure Modes:** Applying mobile-consumer generous padding (64px gaps) to enterprise CRM tables, forcing operators to scroll endlessly; or cramming consumer checkout pages with dense technical metadata.
7. **Valid Exceptions:** Domain-governed modes.
8. **Observable Signals:** Information units per 1000px² viewport area; table row heights; padding token scales.
9. **Automated Detection:** High feasibility via layout density metrics.
10. **Required Human Judgment:** Determining user persona expertise level and task frequency.
11. **Evidence & References:** `SRC-SYS-003`, `EVID-SYS-001`, `EVID-DOM-001`.
12. **Confidence & Limitations:** HIGH. Context-governed principle.

### 14. Visual Flow & Eye Movement
1. **Canonical Definition:** The planned path along which the designer guides the user's eye across the interface.
2. **Design Objective:** Ensure a natural, frictionless progression from orientation $\rightarrow$ comprehension $\rightarrow$ decision $\rightarrow$ action.
3. **Perceptual Rationale:** Eye tracking confirms predictable reading paths: Z-pattern for visual marketing pages, F-pattern for text content, Gutenberg diagram for terminal actions (`SRC-HCI-001`).
4. **Appropriate Contexts:** Landing pages, forms, multi-step wizards, checkout flows.
5. **Practical Guidance:** Place terminal actions (e.g. "Submit", "Continue") at the natural conclusion of the eye path (bottom right of form containers in LTR languages).
6. **Common Failure Modes:** Backtracking eye paths (e.g. putting the primary submit button on the top-left while inputs are filled from top to bottom); zigzag form layouts.
7. **Valid Exceptions:** Non-linear exploratory data visualizers where users drill down dynamically.
8. **Observable Signals:** Spatial sequencing of interactive focusable elements and headings.
9. **Automated Detection:** Moderate feasibility via DOM order vs bounding box coordinate path tracking.
10. **Required Human Judgment:** Evaluating narrative coherence and flow in marketing and editorial storytelling.
11. **Evidence & References:** `SRC-HCI-001`, `SRC-HCI-006`, `EVID-HCI-001`.
12. **Confidence & Limitations:** HIGH. Direct driver of conversion and task completion.

### 15. Consistency & Systemic Predictability
1. **Canonical Definition:** The uniform application of behaviors, terminology, visual metaphors, and visual styles across all screens of an application.
2. **Design Objective:** Minimize cognitive re-learning as users navigate between features.
3. **Perceptual Rationale:** Consistent interfaces reduce extraneous cognitive load, freeing mental bandwidth for user domain tasks.
4. **Appropriate Contexts:** Universal across all modules of an application.
5. **Practical Guidance:** Centralize all visual decisions in design tokens (`@uiforge/tokens`). Enforce identical component APIs, state semantics, and error behaviors across all pages.
6. **Common Failure Modes:** One module using "Save" while another uses "Update"; one table using blue action links while another uses grey dropdowns; mixing different modal patterns.
7. **Valid Exceptions:** Brand micro-sites or explicitly partitioned sub-experiences with unique branding identities.
8. **Observable Signals:** Component reuse frequency, token variance, vocabulary diffs across text nodes.
9. **Automated Detection:** High feasibility via codebase AST scanning and token linting.
10. **Required Human Judgment:** Deciding when domain divergence justifies breaking consistency.
11. **Evidence & References:** `SRC-SYS-001`, `SRC-SYS-003`, `EVID-TOK-001`.
12. **Confidence & Limitations:** MANDATORY. The primary mandate of design systems engineering.

### 16. Intentional Variation
1. **Canonical Definition:** The calculated, deliberate divergence from a standard visual pattern to achieve a specific communicative or psychological outcome.
2. **Design Objective:** Break visual monotony, highlight critical exceptions, or inject brand character without degrading usability.
3. **Perceptual Rationale:** The Von Restorff effect (isolation effect): an item that differs from its surroundings is significantly more likely to be remembered and noticed (`SRC-HCI-005`).
4. **Appropriate Contexts:** Pricing tier highlights ("Most Popular"), system alert callouts, editorial feature quotes.
5. **Practical Guidance:** Use intentional variation sparingly (at most 5% of visual elements). Ensure the variation has a functional communicative purpose, not mere decorative novelty.
6. **Common Failure Modes:** Arbitrary variation (every card on a page having a different background color for no reason); variations that mimic alert or error states inappropriately.
7. **Valid Exceptions:** Artistic portfolios and high-expression brand experiences.
8. **Observable Signals:** Outlier nodes in visual style clustering (color, scale, border).
9. **Automated Detection:** High feasibility via statistical anomaly detection across DOM styles.
10. **Required Human Judgment:** High. Differentiating creative intentionality from sloppy inconsistency.
11. **Evidence & References:** `SRC-HCI-005`, `EVID-HCI-004`.
12. **Confidence & Limitations:** MEDIUM. Must be tightly controlled to prevent visual chaos.

### 17. Affordances & Signifiers
1. **Canonical Definition:** The perceptual characteristics of an interface element that communicate how it can be interacted with (clickable, draggable, editable, scrollable).
2. **Design Objective:** Make interactive possibilities immediately self-evident without requiring trial-and-error clicks.
3. **Perceptual Rationale:** Gibson's theory of affordances and Norman's signifiers: users interact with software based on visual cues that signal physical manipulation metaphors (`SRC-SYS-002`).
4. **Appropriate Contexts:** Buttons, links, inputs, sliders, drag handles, dropdown menus.
5. **Practical Guidance:** Interactive elements must have clear visual boundaries, elevation, or standardized underline signifiers. Cursors must update correctly (`cursor: pointer` on clickable elements, `cursor: text` on inputs).
6. **Common Failure Modes:** Mystery meat navigation (clickable elements disguised as plain text); fake buttons (static cards styled with button drop-shadows); missing hover and focus states.
7. **Valid Exceptions:** Touchscreen mobile apps where hover states do not physically exist (requires reliance on static visual signifiers).
8. **Observable Signals:** CSS `cursor`, `:hover`, `:focus-visible`, button styling, ARIA role mapping.
9. **Automated Detection:** Very high feasibility via interactive state inspection and role validation.
10. **Required Human Judgment:** Evaluating whether novel custom controls communicate affordances effectively.
11. **Evidence & References:** `SRC-SYS-002`, `SRC-STD-002`, `EVID-SYS-003`.
12. **Confidence & Limitations:** MANDATORY. Core prerequisite for usability.

### 18. Perceptual Grouping (Common Region & Boundary)
1. **Canonical Definition:** The visual encapsulation of elements sharing a common function or context within an explicit boundary or background surface.
2. **Design Objective:** Help users mentally synthesize multiple micro-elements into a single cohesive macro-component.
3. **Perceptual Rationale:** Palmer's Common Region principle: elements located within the same closed region of space are perceived as a single perceptual unit, overpowering proximity and similarity (`SRC-HCI-005`).
4. **Appropriate Contexts:** Product cards, sidebar navigation sections, comment threads, pricing tiers.
5. **Practical Guidance:** Use subtle surface fills (`var(--surface-muted)`) or thin borders (`1px solid var(--border-subtle)`) with 8px/12px padding to define regions. Never nest more than two levels of bordered containers.
6. **Common Failure Modes:** Excessive card-in-card-in-card nesting ("Container Inception"); heavy dark borders creating a harsh prison-bar aesthetic.
7. **Valid Exceptions:** Simple clean lists with ample whitespace where explicit containers are redundant.
8. **Observable Signals:** DOM container nesting depth, background color contrasts, border declarations.
9. **Automated Detection:** High feasibility via DOM container tree analysis.
10. **Required Human Judgment:** Deciding when borderless whitespace grouping is superior to explicit card containers.
11. **Evidence & References:** `SRC-HCI-005`, `EVID-HCI-002`, `EVID-HCI-004`.
12. **Confidence & Limitations:** HIGH. Prevents visual fragmentation.

### 19. Cognitive Load & Scannability
1. **Canonical Definition:** The total amount of mental processing power required to interpret an interface and locate desired information.
2. **Design Objective:** Minimize extraneous cognitive load so the user's mental effort is dedicated entirely to completing their primary task.
3. **Perceptual Rationale:** Sweller's Cognitive Load Theory: working memory has finite processing bandwidth. Visual clutter, dense unformatted text, and ambiguous layouts cause cognitive overload and decision paralysis (`SRC-HCI-001`, `SRC-HCI-002`).
4. **Appropriate Contexts:** Universal across all software products.
5. **Practical Guidance:** Format long text into bite-sized paragraphs with bold lead-in keywords. Use bullet points for lists. Provide clear summary metrics at the top of complex reports. Chunk forms into logical steps.
6. **Common Failure Modes:** Dense walls of unbroken text; pages presenting 50 unorganized options simultaneously without search or filtering; cryptic technical jargon without tooltips.
7. **Valid Exceptions:** Legal contracts or terms of service where verbatim unformatted legal prose is mandated by compliance.
8. **Observable Signals:** Character count per paragraph, heading density, list utilization, form step count.
9. **Automated Detection:** High feasibility via text structure and information chunk analysis.
10. **Required Human Judgment:** Assessing whether domain terminology is appropriate for the target audience.
11. **Evidence & References:** `SRC-HCI-001`, `SRC-HCI-002`, `EVID-HCI-001`, `EVID-HCI-002`.
12. **Confidence & Limitations:** VERY_HIGH. The ultimate measure of user-centered design quality.
