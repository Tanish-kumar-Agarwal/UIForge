# UIForge IP Audit — Third-Party Assets, Fonts, Icons, Trademarks & Commercial Boundaries

**Document ID:** `UIF-PH02.3-ASSET-IP-AUDIT`  
**Phase:** 02.3 — Master Legal, Licensing, Intellectual Property & Software Supply-Chain Audit  
**Classification:** Canonical Intellectual Property, Asset Licensing & Trademark Review  
**Date:** November 2026  
**Status:** Complete Architectural & Legal Baseline  
**Auditor Lead:** Software Intellectual Property Research Specialist & Commercial Software Licensing Analyst  

---

## 1. Executive Summary & Asset Scope

Modern frontend frameworks are not merely composed of source code algorithms; they aggregate typography, vector glyphs, color specifications, design tokens, brand logos, and aesthetic interaction paradigms.

Each of these non-code and semi-code assets is governed by distinct intellectual property legal frameworks, including:
- **Copyright in Typeface & Font Software**: Distinct protections under US Law (where typeface design is not copyrightable, but font software code is) versus European and Indian jurisprudence (where typeface design enjoys sui generis industrial design and copyright protection).
- **Trademark & Brand Protection**: Lanham Act (15 U.S.C. § 1051 et seq.), EU Trademark Regulation, and Indian Trade Marks Act 1999.
- **Contractual Terms of Service (ToS)**: EULAs and commercial site terms governing proprietary design systems (e.g., Aceternity UI Pro, Tailwind UI).

This audit establishes the legal boundaries, usage constraints, and risk-mitigation protocols for all third-party assets incorporated into or referenced by UIForge.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        UIFORGE ASSET INTELLECTUAL PROPERTY MATRIX                      │
├───────────────────┬───────────────────┬─────────────────────┬──────────────────────────┤
│ Asset Category    │ Audited Candidates│ Governed Legal Body │ UIForge Legal Boundary   │
├───────────────────┼───────────────────┼─────────────────────┼──────────────────────────┤
│ Font Software     │ Inter (rsms),     │ SIL Open Font       │ Embed/bundle permitted;  │
│                   │ Geist (Vercel)    │ License 1.1 (OFL)   │ Reserved Font Names held.│
├───────────────────┼───────────────────┼─────────────────────┼──────────────────────────┤
│ System UI Icons   │ Lucide, Heroicons,│ ISC, MIT            │ Free embedding; retain   │
│                   │ Tabler, Radix     │                     │ upstream copyright notice│
├───────────────────┼───────────────────┼─────────────────────┼──────────────────────────┤
│ Brand & Co. Logos │ Simple Icons      │ CC0-1.0 (Copyright) │ Trademark notice;        │
│                   │ (3,000+ brands)   │ + Brand Trademarks  │ Nominative fair use only.│
├───────────────────┼───────────────────┼─────────────────────┼──────────────────────────┤
│ Commercial UI Kits│ Aceternity UI,    │ Proprietary EULA    │ STRICTLY PROHIBITED;     │
│                   │ Tailwind UI       │ Commercial ToS      │ Clean-room recreate only.│
├───────────────────┼───────────────────┼─────────────────────┼──────────────────────────┤
│ Design Token Specs│ W3C DTCG 2025.10  │ W3C Community CLA / │ Free implementation of   │
│                   │                   │ Software & Doc Lic. │ open data specifications.│
└───────────────────┴───────────────────┴─────────────────────┴──────────────────────────┘
```

---

## 2. Font Software & Typography Licensing (OFL-1.1 Audit)

UIForge incorporates and configures modern typographic baselines, prioritizing **Inter** (by Rasmus Andersson) and **Geist** (by Vercel). Both fonts are licensed under the **SIL Open Font License 1.1 (OFL-1.1)**.

### 2.1 The SIL Open Font License 1.1 Legal Framework
The OFL-1.1 is the industry-standard free, open, and libre font license recognized by the Open Source Initiative (OSI). However, it imposes four specific statutory restrictions that differ from software licenses like MIT:

1. **No Standalone Sale (Clause 1)**: The Font Software, whether modified or unmodified, may not be sold by itself. It may only be bundled, redistributed, and/or sold with any software.
   - *UIForge Status*: COMPLIANT. UIForge distributes fonts only as bundled assets or npm packages integrated into frontend applications.
2. **Reserved Font Name (RFN) Restrictions (Clause 2)**: No Modified Version of the Font Software may use the Reserved Font Name(s) unless explicit written permission is granted by the Copyright Holder.
   - *Upstream Declarations*:
     - `rsms/inter`: Reserved Font Name is **"Inter"**.
     - `vercel/geist-font`: Reserved Font Name is **"Geist"**.
   - *Legal Constraint*: If UIForge were to modify the glyph curves, hinting, or metrics of Inter or Geist and redistribute the binary, it could NOT call the result "Inter" or "Geist".
   - *UIForge Decision*: UIForge distributes strictly **unmodified** official upstream font binaries via Fontsource (`@fontsource/inter`, `@fontsource/geist-sans`). Zero font modifications are performed, fully respecting RFN protections.
3. **Requirement to Bundle License Text (Clause 4)**: The font license and copyright notices must accompany the software.
   - *UIForge Implementation*: `@uiforge/cli` includes the full OFL-1.1 text in `/public/fonts/OFL.txt` whenever font assets are initialized in a customer project.
4. **Self-Hosted vs CDN Webfonts (Privacy Hygiene & GDPR Realities)**:
   - *The Munich Precedent*: In *Landgericht München I* (Case 3 O 17493/20, Jan 2022), dynamic loading of Google Fonts from US servers without prior consent was held to violate GDPR Article 6(1)(f) due to unauthorized IP address transfer.
   - *Privacy Benefit & Limitations*: Self-hosting fonts via `@fontsource` packages eliminates third-party transmission of user IP addresses to Google, providing immediate privacy hygiene and enabling reliable offline development. However, self-hosting fonts does **not** automatically make an entire website "GDPR compliant," as GDPR compliance requires lawful processing across all server logging, analytics, cookies, and telemetry.

---

## 3. Vector Icon Sets & Brand Asset Trademark Protection

### 3.1 Permissive System Icon Sets
UIForge evaluates four foundational system icon libraries:
- **Lucide Icons** (`lucide-react`): Licensed under **ISC** (authored by Lucide Contributors).
- **Heroicons** (`@heroicons/react`): Licensed under **MIT** (authored by Tailwind Labs).
- **Tabler Icons** (`@tabler/icons-react`): Licensed under **MIT** (authored by Paweł Kuna).
- **Radix Icons** (`@radix-ui/react-icons`): Licensed under **MIT** (authored by WorkOS).

*Legal Conclusion*: All four libraries are fully approved for direct dependency bundling, React component generation, and registry distribution under permissive terms.

### 3.2 The Simple Icons Trademark Boundary & Multi-Jurisdictional Realities (`OS-ICON-04`)
`simple-icons/simple-icons` provides over 3,000 SVG brand logos for popular companies, platforms, and technologies (e.g., Google, Apple, GitHub, AWS, Stripe, Slack).

- **The Copyright vs Trademark Divergence**:
  - *Copyright Status*: Simple Icons dedicates all SVG vector paths and project code to the public domain under **Creative Commons Zero 1.0 Universal (CC0-1.0)**. Under copyright law, users have the right to copy and adapt the SVG paths.
  - *Trademark Status*: CC0-1.0 explicitly states in Section 4(b): *"No trademark or patent rights held by Affirmer are waived, abandoned, surrendered, licensed or otherwise affected by this document."*
  - The logos contained in Simple Icons remain protected registered trademarks of their respective owners worldwide.
- **International Trademark Jurisprudence & Limits of Disclaimers**:
  1. *Nominative Fair Use is Not Global*: Nominative fair use (*New Kids on the Block* test) is a common-law defense under United States trademark law. It does not exist in identical form in other jurisdictions. In the European Union (EU Trade Mark Regulation 2017/1001, Art. 14) and India (Trade Marks Act 1999, Sec. 30), statutory defenses require proof of "honest practices" and non-detriment to distinctive character.
  2. *Disclaimers Do Not Cure Infringement*: Adding a JSDoc disclaimer comment does not automatically insulate a developer or enterprise distributor from trademark infringement, dilution, or unfair competition claims if brand logos are altered, displayed prominently, or used in commercial contexts.
- **UIForge Trademark Policy (`LDEC-07`)**:
  - Emitting brand icon components requires **explicit user opt-in** in the CLI.
  - The CLI and component generator inject an advisory notice reminding users that brand assets are subject to the brand owner's official trademark usage policies:
     ```typescript
     /**
      * TRADEMARK ADVISORY: The vector logo rendered below is the protected
      * registered trademark of its respective owner. UIForge and its users claim
      * zero trademark rights therein. Emitted under developer opt-in for
      * identification purposes only. Verify usage against official brand guidelines.
      */
     ```

---

## 4. Commercial UI Kits & Proprietary Code Boundaries

### 4.1 Aceternity UI Pro (`OS-LAND-02`) & Tailwind UI
During Phase 02.1 discovery, Aceternity UI and Tailwind UI were analyzed for their cutting-edge aesthetic paradigms (e.g., bento grids, 3D card tilts, background beams, floating navigation).

- **Contractual & Licensing Audit**:
  - *Aceternity UI Terms of Service*: Grants a license to use code snippets in end products, but explicitly prohibits:
    - *"Re-distributing, selling, licensing, sub-licensing, or offering components in any component library, registry, generator, or template builder."*
  - *Tailwind UI License Agreement*: Prohibits creating any tool, library, or website where users can download, copy, or browse the components.
- **Definitive Legal Disposition (`[REJ]` / `[COM]`)**:
  - Copying, indexing, scraping, or redistributing component code, JSX markup, or CSS from Aceternity UI or Tailwind UI into `@uiforge/component-registry` constitutes a willful breach of contract and copyright infringement.
  - **Aceternity UI and Tailwind UI are STRICTLY PROHIBITED from UIForge registries.**

### 4.2 Clean-Room Engineering Architecture
To capture high-end modern aesthetic patterns without copyright contamination, UIForge establishes a strict **Clean-Room Engineering Protocol**:
1. **Separation of Specifications and Implementation**: The aesthetic design requirements (e.g., "bento card with 1px border gradient, 45-degree angle, CSS backdrop-blur 12px, hover scale 1.02") are documented purely as abstract visual descriptions without viewing proprietary source code.
2. **Clean-Room Implementation**: UIForge developers or autonomous agents author fresh React/Tailwind/Motion implementations from scratch, utilizing only public, permissive primitives (Radix, Base UI, Motion).
3. **Zero Proprietary Provenance**: The resulting component shares zero copyrightable expression with proprietary kits.

---

## 5. Design Tokens & DTCG Intellectual Property

UIForge standardizes all token representations on the **W3C Design Tokens Community Group (DTCG) 2025.10 Specification**.

- **W3C Community Contributor License Agreement (CLA)**:
  - Participants in the W3C DTCG contribute under the W3C Community CLA, granting a perpetual, non-exclusive, royalty-free, worldwide license to implement the specification.
  - The specification is published under the **W3C Software and Document License**.
- **Data Schemas vs Copyrightable Expression**:
  - Technical data formats and JSON schemas (e.g., `{"$type": "color", "$value": { "colorSpace": "srgb", "components": [0.1, 0.2, 0.9] }}`) constitute functional interoperability standards.
  - Under Section 102(b) of the US Copyright Act and the CJEU ruling in *SAS Institute v. World Programming Ltd* (Case C-406/10), functional data interfaces and syntax formats are not copyrightable subject matter.
  - UIForge's token parsers, transformers, and validators are 100% legally clear to implement DTCG 2025.10 contracts without licensing fees.

---

## 6. Nominative Trademark Use Guidelines

UIForge interacts with an extensive developer ecosystem. To avoid trademark infringement claims under the Lanham Act (15 U.S.C. § 1114 / § 1125):

1. **Descriptive & Nominative Use**: UIForge uses third-party marks ("React", "Next.js", "Tailwind CSS", "Figma", "Playwright", "Chrome", "Firefox") strictly to denote compatibility, interoperability, or target output formats.
2. **Proper Attribution**: UIForge documentation and CLI tools include standard trademark attribution disclaimers:
   > *"React is a trademark of Meta Platforms, Inc. Tailwind CSS is a trademark of Tailwind Labs, Inc. Playwright is a trademark of Microsoft Corporation. All other trademarks are the property of their respective owners. Use of these names does not imply affiliation or endorsement."*
3. **UIForge Brand Identity**: UIForge maintains an independent, distinctive brand mark and logo, preventing any possibility of consumer confusion in the marketplace.

---

## 7. Conclusions & Governance Directives

1. **Fonts**: Self-host Inter and Geist via Fontsource under OFL-1.1; keep font binaries unmodified; bundle OFL text.
2. **Icons**: Permit Lucide, Heroicons, and Tabler unconditionally; inject trademark notices when emitting Simple Icons brand marks.
3. **Commercial Kits**: Absolute prohibition against scraping or copying Aceternity UI or Tailwind UI; enforce clean-room engineering.
4. **Design Tokens**: Implement DTCG 2025.10 freely under W3C CLA.


---

## 8. Master 125-Candidate Asset & Component IP Reconciliation

In accordance with Master Remediation Directive REM-04:
- The intellectual property and asset review has been formally extended across all 71 Foundational (P0) and High-Value (P1) integration candidates in [P0-P1-IP-CLEARANCE-REPORT.md](P0-P1-IP-CLEARANCE-REPORT.md).
- **Component-Level Asset Registry**: Detailed file-level asset declarations (including vector icons, font binaries, and embedded third-party libraries) are tracked in [COMPONENT-ASSET-LICENSE-REGISTER.json](COMPONENT-ASSET-LICENSE-REGISTER.json).
- **Commercial Boundary Enforced**: Aceternity UI (`OS-MKT-08`), GSAP (`OS-ANIM-04`), Remotion (`OS-ANIM-08`), and Locofy (`OS-D2C-08`) remain strictly excluded from distribution registries and source code bundling.
