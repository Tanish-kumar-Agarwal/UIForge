# UIForge Phase 02.4: Security and Trust Model

**Document ID:** UIF-PH02.4-SECURITY-AND-TRUST-MODEL  
**Classification:** Software Supply-Chain Security, Threat Modeling, Trust Architecture  
**Status:** Canonical / Approved  
**Authoritative Location:** `research/phase-02/phase-02.4-internal-source-registry/SECURITY-AND-TRUST-MODEL.md`  

---

## 1. Executive Summary & Purpose

The **UIForge Internal Source Registry** operates as the primary supply-chain defense boundary for the UIForge generation platform. Because UIForge ingests, evaluates, references, and selectively emits external dependencies and code templates into user projects, an unmitigated supply-chain compromise could poison both UIForge core services and client downstream production environments.

This security and trust model formalizes:
1. The **30-Threat Registry Threat Model** covering all known open-source and supply-chain failure vectors.
2. The **Trust Tiers and Boundary Enforcements** governing ingestion and emission.
3. The **Quarantine, Blacklist, and Revocation Protocol** for mitigating active compromises.

---

## 2. Trust Tiers and Ingestion Boundaries

UIForge classifies all software entities into four hierarchical trust tiers:

```
┌────────────────────────────────────────────────────────┐
│  TIER 0: AUTHORITATIVE INTERNAL (UIForge Core)         │
│  - First-party code, audited schemas, signed manifests │
└──────────────────────────┬─────────────────────────────┘
                           │ Cryptographic Verification
                           ▼
┌────────────────────────────────────────────────────────┐
│  TIER 1: VENDOR & INSTITUTIONAL (Canonical Upstream)    │
│  - Verified orgs (e.g., Radix/WorkOS, Tailwind Labs)   │
│  - Explicitly evaluated, pinned commits & tarball digests│
└──────────────────────────┬─────────────────────────────┘
                           │ Sandboxed Evaluation & Licensing Clearance
                           ▼
┌────────────────────────────────────────────────────────┐
│  TIER 2: EVALUATED COMMUNITY OPEN SOURCE               │
│  - P1/P2/P3 community libraries with verified licenses  │
│  - High scrutiny, transitive dependency audits         │
└──────────────────────────┬─────────────────────────────┘
                           │ STRICT QUARANTINE / REJECTION
                           ▼
┌────────────────────────────────────────────────────────┐
│  TIER 3: UNTRUSTED / EXTERNAL (Wild npm & GitHub)      │
│  - Unaudited code, unpinned tags, dynamic CDN scripts   │
│  - STRICTLY FORBIDDEN from direct ingestion or emission │
└────────────────────────────────────────────────────────┘
```

---

## 3. The 30-Threat Registry Threat Model

The following matrix documents the complete 30-threat surface modeled for the UIForge Source Registry, including attack vectors, registry mitigations, residual risk, and current implementation status.

| Threat ID | Threat Name | Category | Attack Vector / Failure Mode | Registry Mitigation Mechanism | Residual Risk | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `THREAT-01` | **Typosquatting** | Supply Chain | Attacker publishes maliciously named packages (`radix-uii`, `luicide-react`) to trick developers or automation. | Canonical `PackageEntity` schema enforces exact scoped name validation against `repositories.json`. | LOW | `CONFIGURED` |
| `THREAT-02` | **Tarball Tampering** | Supply Chain | Compromised registry or CDN alters upstream release tarball without updating source commit. | Mandatory SHA-256 digest validation on all ingested tarballs and assets in `provenance.json`. | LOW | `TESTED` |
| `THREAT-03` | **Dependency Confusion** | Supply Chain | Public registry hosts higher version number of internal package to hijack resolution. | Explicit registry origin pinning; private scoping; no public fallback for internal packages. | LOW | `CONFIGURED` |
| `THREAT-04` | **Account Hijacking** | Supply Chain | Upstream maintainer account compromised via credential stuffing or session theft; malicious release published. | Pinning to explicit evaluated commit hashes; automated freshness alerts require human review of new releases. | MEDIUM | `DESIGNED` |
| `THREAT-05` | **Repository Transfer / Takeover** | Supply Chain | Abandoned domain or GitHub org purchased by malicious actor after maintainer departs. | Authoritative repository URL and owner validation; automated check for GitHub redirect warnings. | LOW | `CONFIGURED` |
| `THREAT-06` | **Poisoned Lockfiles** | Supply Chain | Pull request or build injects malicious transitive dependencies or rogue package registries into lockfile. | Strict lockfile auditing; lockfiles treated as immutable code artifacts with SHA-256 verification. | LOW | `CONFIGURED` |
| `THREAT-07` | **Protestware / Political Payloads** | Supply Chain | Maintainer intentionally pushes destructive code (e.g., node-ipc disk wiping, banner injection) targeting specific locales. | Evaluation Gate G07 requires historical commit stability review; pin to immutable evaluated commits. | LOW | `CONFIGURED` |
| `THREAT-08` | **License Retrofitting** | Legal / IP | Permissive project changes to restrictive license (e.g., SSPL, AGPL, BSL) in newer version. | Pinned versioning; automated `LICENSE` file change detection triggers immediate `PENDING_REVIEW`. | LOW | `CONFIGURED` |
| `THREAT-09` | **Hidden Copyleft in Transitive Tree** | Legal / IP | MIT-declared root package imports GPL/AGPL runtime dependencies into generated bundle. | Deep transitive license tree resolution; strict gate blocking copyleft in `DEPENDENCY` mode. | LOW | `TESTED` |
| `THREAT-10` | **Patent Aggression** | Legal / IP | Project subject to submarine patents or lacking explicit patent grant (e.g., raw BSD-3 without patent grant). | Preference for Apache-2.0 or well-established corporate-backed permissive projects; legal review flags. | MEDIUM | `PROPOSED` |
| `THREAT-11` | **Silent Attribution Erasure** | Legal / IP | Generated UIForge templates copy code without preserving mandatory copyright and license notices. | `consumption-permissions.json` specifies `requiredNotices` and `requiredAttribution`; auto-injected. | LOW | `CONFIGURED` |
| `THREAT-12` | **Post-Install Script Execution** | Runtime | Package executes arbitrary shell scripts during `npm install` (`preinstall`, `postinstall`). | Post-install scripts globally disabled (`npm install --ignore-scripts`); zero npm install during Phase 1/2. | LOW | `CONFIGURED` |
| `THREAT-13` | **Telemetry & Secret Exfiltration** | Security | Upstream library collects analytics, environment variables, or tokens and beacons to external servers. | Static code analysis scanning for network primitives (`fetch`, `http`, `WebSocket`) in headless primitives. | LOW | `DESIGNED` |
| `THREAT-14` | **Obfuscated / Minified Payloads** | Security | Malicious logic disguised as minified or eval-packed code in published npm packages. | Evaluation Gate G05 requires 100% human-readable TypeScript/JavaScript source code in repository. | LOW | `CONFIGURED` |
| `THREAT-15` | **Vulnerability Inheritance (CVEs)** | Security | Ingesting package with known critical CVEs (e.g., XSS in template engine, Prototype Pollution). | Evaluation Gate G06 requires automated `npm audit` and vulnerability database checks. | LOW | `CONFIGURED` |
| `THREAT-16` | **Subdependency Sprawl** | Architecture | Ingesting a micro-utility that pulls 500+ transitive dependencies into user projects. | Evaluation Gate G04 enforces strict dependency count limits; preference for zero-dependency primitives. | LOW | `CONFIGURED` |
| `THREAT-17` | **Ghost Maintenance / Abandonment** | Operational | Library unmaintained for >18 months, failing when React or TypeScript versions advance. | Evaluation Gate G08 assesses maintainer activity; maximum freshness tiers force periodic re-audits. | LOW | `CONFIGURED` |
| `THREAT-18` | **Unsigned Release Assets** | Supply Chain | Binary assets (fonts, icons, WASM) downloaded without cryptographic signatures or hashes. | All assets registered in `assets.json` with mandatory SHA-256 digests and independent verification. | LOW | `TESTED` |
| `THREAT-19` | **Dynamic CDN Injection** | Architecture | Component attempts to load external scripts, styles, or fonts at runtime via unpinned CDNs. | Absolute prohibition on runtime CDN loading; all assets must be locally hosted and bundled. | LOW | `CONFIGURED` |
| `THREAT-20` | **Prototype Pollution** | Security | Utility functions recursively merge untrusted input, polluting `Object.prototype`. | Strict AST and unit test scanning of deep merge utilities (e.g., `tailwind-merge`, `clsx`). | LOW | `DESIGNED` |
| `THREAT-21` | **Memory Leaks & CPU Spikes** | Performance | Animation or charting engine fails to clean up RAF loops, DOM observers, or WebGL contexts. | Technical evaluation dimension D08 assesses runtime lifecycle cleanup in unmount hooks. | MEDIUM | `DESIGNED` |
| `THREAT-22` | **DOM-Based XSS Injection** | Security | Component renders unescaped user input via `dangerouslySetInnerHTML`. | Gate G06 scans for raw innerHTML assignments; requires strict DOMPurify integration where needed. | LOW | `CONFIGURED` |
| `THREAT-23` | **CSS Global Namespace Collisions** | Quality | Library injects un-scoped global CSS that breaks user layout styles. | Gate G02 enforces zero global style leaks; mandates Tailwind CSS or scoped CSS Modules. | LOW | `CONFIGURED` |
| `THREAT-24` | **SSR Hydration Mismatch Crashes** | Quality | Component accesses browser-only APIs (`window`, `localStorage`) during server-side render. | Gate G01 enforces strict Next.js/SSR hydration compatibility without browser crashing. | LOW | `CONFIGURED` |
| `THREAT-25` | **Silent Invalidation Bypassing** | Operational | Developer bypasses registry controls and manually installs unvetted package directly. | Pre-commit hooks, CI audit gates, and lockfile validation enforce registry-only dependencies. | LOW | `PROPOSED` |
| `THREAT-26` | **Dual-Licensing Trap** | Legal / IP | Project appears free for personal use but requires commercial license for SaaS or production. | Legal Gate G09 identifies dual-licensing (e.g., GSAP, Remotion); marks as `CONDITIONAL`. | LOW | `CONFIGURED` |
| `THREAT-27` | **Font Trademark / RFN Violation** | Legal / IP | Redistribution of OFL fonts with modified binaries retaining Reserved Font Names. | Strict compliance with SIL OFL conditions; font binaries tracked in `assets.json` without name alteration. | LOW | `CONFIGURED` |
| `THREAT-28` | **External CLI Injection** | Security | External testing tool (e.g., axe-core CLI, pa11y) executes untrusted command arguments. | External tools isolated in sandboxed CLI runners with sanitized, non-interpolated arguments. | LOW | `DESIGNED` |
| `THREAT-29` | **Schema Drift / Data Corruption** | Data Integrity | Registry data mutated manually, introducing broken references or invalid enums. | Comprehensive automated validation suite (`validate_registry.js`) running in CI on every PR. | LOW | `TESTED` |
| `THREAT-30` | **Upstream Source Deletion** | Availability | Upstream developer deletes GitHub repository (e.g., `left-pad` incident). | Local provenance archives and vendor caching of evaluated source packages in internal cache. | MEDIUM | `PROPOSED` |

---

## 4. Ingestion and Verification Pipeline

To ensure no entity bypasses security controls, all candidate sources must transition through the sequential verification pipeline:

```
[Candidate URL]
       │
       ▼
1. IDENTITY VALIDATION (Verify GitHub Org, npm package, avoid typosquatting)
       │
       ▼
2. REPOSITORY & PACKAGE FETCH (Fetch metadata, download tarball in sandbox)
       │
       ▼
3. CRYPTOGRAPHIC DIGESTING (Calculate SHA-256, verify integrity, pin commit)
       │
       ▼
4. STATIC ANALYSIS & VULNERABILITY SCAN (Scan AST, run npm audit, check CVEs)
       │
       ▼
5. LICENSE & IP CLEARANCE (Scan root LICENSE, notices, transitive copyleft check)
       │
       ▼
6. 10-DIMENSION TECHNICAL EVALUATION (Execute Evaluation Gates G01-G10)
       │
       ▼
7. CONSUMPTION MODE DETERMINATION (Derive permissions for all 6 modes)
       │
       ▼
8. REGISTRY INGESTION (Commit to data/ manifests, validate schema & references)
```

---

## 5. Quarantine, Revocation, and Deprecation Protocol

When an upstream source is identified as compromised, vulnerable, or legally encumbered:

1. **Immediate Quarantine:** The source's `registryEligibility` is updated to `BLOCKED`.
2. **Permission Revocation:** All active permissions in `consumption-permissions.json` are set to `allowed: false` with justification `REVOKED_SECURITY` or `REVOKED_LEGAL`.
3. **Template & Generator Isolation:** UIForge core generator immediately stops emitting references to the affected package or component.
4. **Advisory Generation:** A security bulletin is published in `REGISTRY-GAP-AND-LIMITATION-REGISTER.md` detailing the incident, affected versions, and recommended replacements.
