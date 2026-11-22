# ADR-010: Open-Core Licensing Boundaries & Commercial Separation
## Permissive Open-Source Core, Local-First Guarantee & Commercial Studio Delimitation

**Status:** Accepted  
**Date:** 2026-11-22  
**Decision Driver:** Principal Software Architect & Legal/Supply-Chain Auditor  

---

## 1. Context & Problem Statement
Developer tools adopting commercialization frequently alienate open-source communities by:
1. Crippling core functionality to force users into paid SaaS tiers (e.g. SaaS UI Pro lock-in `OS-COMP-15`).
2. Adopting restrictive source-available licenses (SSPL, BSL, Server-Side Public License) that prevent enterprise adoption.
3. Placing artificial limits on local execution (e.g. requiring an internet connection or cloud account to run a CLI).

UIForge must define unambiguous, permanent boundaries between its **Free Open-Source Core** and **Commercial Enterprise Extensions**.

---

## 2. Decision Constraints
1. **Unrestricted Core Functionality:** The core engine, CLI, design token compiler, project scanner, safe modifier, and MCP server must be permanently free and fully functional offline.
2. **Permissive Open-Source Licensing:** Core packages must be released under permissive open-source licenses (Apache-2.0 or MIT).
3. **No Artificial Cloud Gates:** Local CLI commands must never require an internet connection, a credit card, or a UIForge user account.
4. **Clean Extension Points:** Enterprise and hosted features must plug into Core via public interfaces without modifying open-source internals.

---

## 3. Options Considered
- **Option 1: Closed-Source Proprietary SaaS:** Keep the entire platform closed-source; distribute only client CLI wrappers pointing to cloud APIs.
- **Option 2: Restrictive Source-Available (BSL / SSPL):** Code is visible but restricted for commercial competition.
- **Option 3: Strict Open-Core Boundary (Permissive Core + Proprietary Hosted Studio/Sync):**
  - Core, CLI, MCP Server, Token Engine, and Safe Modifier are 100% open-source under Apache-2.0 / MIT.
  - Commercial extensions are strictly additive: hosted multi-user Studio, cross-organization component hubs, and enterprise compliance reporting.

---

## 4. Evaluation of Options

| Criteria | Option 1: Closed SaaS | Option 2: BSL / SSPL | Option 3: Strict Open-Core |
| :--- | :--- | :--- | :--- |
| **Developer Adoption & Trust** | Very Low | Moderate to Low | Very High (developer loved) |
| **Enterprise Legal Clearance** | High friction | Blocked by corporate legal | Instant approval (Apache-2.0/MIT)|
| **Offline / Local Sovereignty** | Impossible | Possible | 100% Guaranteed |
| **Commercial Sustainability** | High (if adoption happens)| Moderate | Proven (GitLab, Supabase model) |

---

## 5. Decision Outcome
**Selected Option:** **Option 3: Strict Open-Core Boundary.**

### Boundary Specification:
1. **Permanently Free & Open-Source (Apache-2.0):**
   - `@uiforge/core`: Application orchestrator and state machines.
   - `@uiforge/contracts`: Shared Zod schemas and TypeScript types.
   - `@uiforge/project-intelligence`: Non-destructive AST and route parser.
   - `@uiforge/tokens`: W3C DTCG token parser and Style Dictionary compiler.
   - `@uiforge/component-registry`: Open-source registry adapter (shadcn model).
   - `@uiforge/safe-modifier`: Coordinate slice patcher and WAL engine.
   - `@uiforge/browser-eval`: Playwright and Pixelmatch verification runners.
   - `@uiforge/eval` & `@uiforge/reporting`: Local finding scoring and HTML dossier builder.
   - `@uiforge/mcp-server`: Official Model Context Protocol 2026-07-28 server.
   - `@uiforge/cli`: Local terminal CLI tool (`uiforge`).
2. **Commercial Enterprise & Hosted Extensions (Proprietary / Additive):**
   - UIForge Cloud Workspace: Multi-tenant hosted Studio collaboration web app.
   - Organizational Component Hub: Centralized private component registries with enterprise RBAC.
   - Enterprise Compliance Vault: Automated cross-repository ADA / European Accessibility Act reporting with SAML SSO.

---

## 6. Consequences & Impact
- **Positive:**
  - Complete developer trust and frictionless enterprise adoption under Apache-2.0.
  - Zero risk of cloud vendor lock-in; projects always retain their local `.uiforge/` files and standard source code.
  - Clear, defensible commercial monetization focused on enterprise scale, collaboration, and hosted convenience.
- **Negative:**
  - Individual developers have zero incentive to pay for cloud tiers, which is by design (monetization targets enterprise teams).

---

## 7. Security & Operational Impact
- Open-source Core enables public security audits of the WAL engine and permission ladder.

---

## 8. Research References
- Phase 02.3: `MASTER-LEGAL-AND-SUPPLY-CHAIN-AUDIT.md`.
- Phase 02.5: Finding C05 (Quarantine of Aceternity resale restrictions) and C14 (Pa11y LGPL review).

---

## 9. Open Questions
- None. Open-core boundaries are frozen and locked.
