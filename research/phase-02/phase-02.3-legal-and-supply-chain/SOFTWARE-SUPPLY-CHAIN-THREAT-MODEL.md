# UIForge Supply-Chain Threat Model — 30 Vector Attack Surface Analysis & Controls

**Document ID:** `UIF-PH02.3-SC-THREAT-MODEL`  
**Phase:** 02.3 — Master Legal, Licensing, Intellectual Property & Software Supply-Chain Audit  
**Classification:** Canonical Software Supply-Chain Threat Model & Mitigation Framework  
**Date:** November 2026  
**Status:** Complete Architectural & Security Baseline  
**Auditor Lead:** Software Supply-Chain Security Architect & Application Security Researcher  

---

## 1. Executive Summary & Security Perimeter

As an autonomous frontend development engine, UIForge acts as a high-privilege nexus: it parses abstract requirements, fetches third-party npm packages, ingests component registry templates, rewrites TypeScript ASTs, compiles design tokens, and launches headless browsers to verify visual rendering.

A compromise anywhere along this supply chain could allow an adversary to:
1. Exfiltrate corporate source code and credentials from developer workstations or CI/CD runners.
2. Inject persistent backdoors or cryptocurrency miners into customer frontend production bundles.
3. Poison AI agent generation prompts to generate deliberately vulnerable code (e.g., XSS, prototype pollution).

To mitigate these threats, UIForge specifies an architecture designed to align with the **SLSA v1.0 (Supply-chain Levels for Software Artifacts) Build Track (targeting Build Level 3)**, in-toto cryptographic provenance attestations, npm provenance with Sigstore, and strict subshell sandbox boundaries.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        UIFORGE SUPPLY-CHAIN DEFENSE PERIMETER                          │
├────────────────────────────┬─────────────────────────────┬─────────────────────────────┤
│ Ingestion Layer            │ Transformation Layer        │ Distribution Layer          │
├────────────────────────────┼─────────────────────────────┼─────────────────────────────┤
│ Scoped npm Registry        │ Sandboxed AST Rewriter      │ Immutable Component Registry│
│ Lockfile Integrity (pnpm)  │ In-Process Token Compiler   │ Cryptographic Digest Tree   │
│ Lifecycle Script Blocking  │ Subprocess Browser Sandbox  │ Target SLSA Build Level 3   │
│ Upstream Commit SHA Pinning│ Static AST Linting          │ in-toto Provenance Metadata │
└────────────────────────────┴─────────────────────────────┴─────────────────────────────┘
```

> [!NOTE]
> In accordance with our independent audit correction pass, SLSA Build Level 3 is formally classified as a **Phase 03 implementation target (`PROPOSED-CONTROL`)**, not as an executed or independently certified compliance level today. Control capabilities and explicit boundaries are documented in Section 4.

---

## 2. Part I: Package & Registry Threat Vectors (15 Vectors)

The following 15 vectors represent threats arising from external package managers, npm registries, dependency resolution algorithms, and maintainer accounts.

| Vector ID | Threat Vector Name | STRIDE | Description & Attack Scenario | Inherent Risk | SLSA / Security Control | Residual Risk |
| :--- | :--- | :---: | :--- | :---: | :--- | :---: |
| `T-PKG-01` | **Dependency Confusion** | Spoofing | Attacker publishes internal private package names (e.g., `@uiforge/core-private`) to public npm registry with high semver. | **CRITICAL** | Strict npm scope reservation (`@uiforge/*`); scoped `.npmrc` registry binding; private package registry proxy. | **LOW** |
| `T-PKG-02` | **Typosquatting & Combosquatting** | Spoofing | Attacker registers `radix-ui-primitives` or `ts-morf` containing malicious payloads. | **HIGH** | Explicit automated dependency allowlists; exact name matching in CLI; no dynamic fuzzy installation. | **NEGLIGIBLE** |
| `T-PKG-03` | **Maintainer Account Takeover** | Spoofing | Phishing or credential reuse compromises an upstream maintainer; attacker publishes backdoored patch. | **CRITICAL** | Cryptographic package hash pinning (`pnpm-lock.yaml`); require Sigstore / npm provenance signatures. | **MEDIUM** |
| `T-PKG-04` | **Malicious Lifecycle Scripts** | Tampering | Upstream dependency executes arbitrary shellcode in `preinstall` or `postinstall` hook. | **CRITICAL** | Enforce `ignore-scripts = true` in `.npmrc`; allow scripts only for explicitly vetted native bindings (e.g. `oxc`). | **LOW** |
| `T-PKG-05` | **Manifest Confusion** | Tampering | Discrepancy between `package.json` in git repo and published npm registry tarball metadata. | **HIGH** | Validate package tarball checksum against verified upstream git release tag before ingestion. | **LOW** |
| `T-PKG-06` | **Transitive Dependency Drift** | Tampering | Permissive ranges (`^1.0.0`) in dependencies pull unvetted transitive updates with breaking changes or malware. | **HIGH** | Strict lockfile enforcement (`pnpm --frozen-lockfile`); Renovate / Dependabot with automated CI verification. | **LOW** |
| `T-PKG-07` | **Registry Metadata Spoofing** | Tampering | Man-in-the-middle or poisoned cache alters registry response metadata. | **HIGH** | Enforce HTTPS/TLS 1.3 with certificate pinning on registry connections; verify SHA-512 subresource integrity. | **LOW** |
| `T-PKG-08` | **Unsigned Package Tarballs** | Repudiation | Tarballs lack verifiable provenance back to source build system. | **MEDIUM** | Prefer packages with Sigstore / SLSA provenance; record tarball SHA-256 in `.uiforge/provenance.json`. | **LOW** |
| `T-PKG-09` | **Malicious Package Unpublishing** | Denial of Svc | Critical dependency is unpublished (e.g., left-pad incident), breaking build infrastructure. | **HIGH** | Internal vendored artifact cache; enterprise Artifactory/Verdaccio mirror storing immutable tarballs. | **NEGLIGIBLE** |
| `T-PKG-10` | **Registry Infrastructure Compromise** | Tampering | npm registry or CDN infrastructure compromised by state actor. | **CRITICAL** | Dual cryptographic checksum verification (SHA-512 registry hash + independent source build hash). | **MEDIUM** |
| `T-PKG-11` | **Expired Domain Hijacking** | Spoofing | Maintainer email domain expires; attacker takes over domain and resets npm package maintainer account. | **HIGH** | Continuous maintainer health monitoring; flag packages with unmaintained or suspicious email domains. | **LOW** |
| `T-PKG-12` | **Social Engineering of Maintainers** | Tampering | Attacker spends months building trust (XZ Utils attack pattern) before introducing a subtle security flaw. | **CRITICAL** | Strict dependency pruning (keep dependency tree minimal); AST-based linting; a11y & visual regression tests. | **MEDIUM** |
| `T-PKG-13` | **Invisible Binary Downloads** | Elevation | Postinstall script downloads unvetted compiled binaries from external AWS S3 bucket during install. | **HIGH** | Strict network isolation during build (`BypassSandbox: false`); block outbound HTTP requests during installation. | **LOW** |
| `T-PKG-14` | **Proxy / Mirror Poisoning** | Tampering | Corporate package cache returns stale or maliciously substituted artifacts. | **HIGH** | End-to-end cryptographic integrity verification against public npm shasum database. | **LOW** |
| `T-PKG-15` | **Lockfile Merge Conflict Poisoning** | Tampering | Developer incorrectly resolves git merge conflict in `pnpm-lock.yaml`, introducing unauthorized packages. | **HIGH** | Automated CI lockfile linter; prohibit manual lockfile editing; reject PRs where lockfile does not match package.json. | **LOW** |

---

## 3. Part II: Source, Code Generation & Artifact Threat Vectors (15 Vectors)

The following 15 vectors represent threats arising from source code repositories, code generation models, AST transformations, design tokens, and local developer execution.

| Vector ID | Threat Vector Name | STRIDE | Description & Attack Scenario | Inherent Risk | SLSA / Security Control | Residual Risk |
| :--- | :--- | :---: | :--- | :---: | :--- | :---: |
| `T-ART-01` | **Compromised Upstream Git History** | Tampering | Upstream git repository suffers force-push or commit history rewrite. | **HIGH** | Pin upstream references strictly to immutable 40-character Git Commit SHAs, never floating branch names (`main`). | **LOW** |
| `T-ART-02` | **Floating Git Tag Mutation** | Tampering | Attacker moves git tag (e.g., `v1.2.0`) to point to a malicious commit. | **HIGH** | Verify tag GPG signatures; resolve tags to immutable commit SHAs prior to registry ingestion. | **LOW** |
| `T-ART-03` | **CI Pipeline Secret Exfiltration** | Info Disclosure | Malicious PR or build script leaks `NPM_TOKEN` or cloud credentials from GitHub Actions. | **CRITICAL** | Use GitHub Actions OIDC (OpenID Connect) for short-lived credentials; zero long-lived static tokens in secrets. | **LOW** |
| `T-ART-04` | **Component Registry Poisoning** | Tampering | Adversary injects malicious JSX/TSX into a public component registry template (e.g., `shadcn/button.tsx`). | **CRITICAL** | Mandatory human code review for all registry templates; immutable cryptographic hash recorded in registry index. | **LOW** |
| `T-ART-05` | **Backdoored Design Token Files** | Tampering | Attacker injects malicious CSS `calc()` expressions or XSS vectors into DTCG JSON tokens (e.g. `javascript:url()`). | **HIGH** | Strict DTCG schema validation; sanitize and escape all token values before CSS compilation; reject dynamic scripts. | **NEGLIGIBLE** |
| `T-ART-06` | **Agent Prompt Injection** | Elevation | Malicious prompt injected into LLM causes agent to emit code containing cross-site scripting (XSS) or backdoors. | **CRITICAL** | Mandatory multi-stage AST parsing; Biome/ESLint security rules run on all agent output; axe-core validation. | **LOW** |
| `T-ART-07` | **AST Rewriter Engine Exploit** | Elevation | Maliciously crafted source file exploits vulnerability in `ts-morph` or `oxc` to achieve arbitrary code execution. | **HIGH** | Run AST parsing in unprivileged sandboxed process; enforce memory limits and execution timeouts. | **LOW** |
| `T-ART-08` | **Unsigned Git Commits** | Repudiation | Commits appear with spoofed author email (e.g. `torvalds@linux-foundation.org`). | **MEDIUM** | Enforce GPG/SSH commit signature verification on all internal UIForge repository branches. | **LOW** |
| `T-ART-09` | **Pre-compiled Binary Vendoring** | Tampering | Upstream candidate bundles pre-compiled `.node` or `.dll` binaries without source transparency. | **CRITICAL** | Absolute prohibition on unverified vendored binaries. All native modules must build from verified source or audited NAPI. | **LOW** |
| `T-ART-10` | **Compromised Playwright Binaries** | Tampering | Compromised Playwright CDN distributes backdoored browser binary. | **HIGH** | Verify browser binary SHA-256 against Microsoft official release manifests before launching in test suite. | **LOW** |
| `T-ART-11` | **Workspace Configuration Poisoning**| Elevation | Malicious `.vscode/settings.json` or `.env` in customer repo triggers malicious commands upon folder opening. | **HIGH** | Ignore workspace execution configs during automated scans; read-only default filesystem access. | **LOW** |
| `T-ART-12` | **Attestation Forgery** | Spoofing | Attacker fabricates `.uiforge/provenance.json` to bypass compliance checks. | **CRITICAL** | Sign all provenance manifests using asymmetric Ed25519 or ECDSA keys; verify signatures at release gates. | **LOW** |
| `T-ART-13` | **Submodule / Asset MITM Attack** | Tampering | Unauthenticated HTTP clone of git submodules allows man-in-the-middle code injection. | **HIGH** | Enforce SSH/HTTPS with TLS 1.3 for all asset repositories; forbid unpinned submodules. | **LOW** |
| `T-ART-14` | **Stale CI Artifact Execution** | Tampering | CI runner reuses dirty workspace state, executing artifacts from a prior untrusted pull request. | **HIGH** | Ephemeral, isolated GitHub Actions runners destroyed immediately after job completion; clean checkout. | **LOW** |
| `T-ART-15` | **Preview Sandbox Escape** | Elevation | Component preview renders malicious React component that escapes iframe to access parent window or cookies. | **CRITICAL** | Strict iframe isolation (`sandbox="allow-scripts"` without `allow-same-origin`); Content Security Policy (CSP). | **LOW** |

---

## 4. Supply-Chain Security Control Architecture & Exact Protective Boundaries

To mitigate the 30 vectors, UIForge specifies an end-to-end security architecture. In accordance with the Independent Audit Correction Pass (`C12`), security controls provide defense-in-depth, not absolute immunity. The exact protective scope and limitations of each control are formally specified:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SUPPLY-CHAIN VERIFICATION PIPELINE                              │
│                                                                                        │
│  1. Package Resolution    ──> Pin exact version & SHA-512 in pnpm-lock.yaml            │
│  2. Script Isolation      ──> ignore-scripts=true; zero arbitrary postinstall          │
│  3. Provenance Verification─> Sigstore / npm provenance verification                   │
│  4. Registry Ingestion    ──> SHA-256 hash tree generated for all component code      │
│  5. AST Code Sanitization ──> Static analysis + Biome security rules                   │
│  6. Execution Sandbox     ──> Playwright runs in isolated network container            │
│  7. Release Attestation   ──> Target SLSA Build Level 3 in-toto attestations           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Detailed Control Capabilities & Known Limitations (C12)

1. **`ignore-scripts=true` in `.npmrc` (`CONFIGURED-CONTROL`)**:
   - *Protects Against*: Automatic execution of untrusted shell scripts during `npm install` / `pnpm install` (`preinstall`, `install`, `postinstall`).
   - *Does NOT Protect Against*: Malicious code executed when the package is subsequently imported or required at runtime (`import 'pkg'`), runtime prototype pollution, or memory safety bugs in permitted native NAPI binaries (`@biomejs/biome`, `@ast-grep/napi`).
2. **Exact Semver Pinning (`CONFIGURED-CONTROL`)**:
   - *Protects Against*: Silent, automated drift caused by unvetted upstream minor/patch releases (`^1.0.0` pulling `1.0.1` or `1.1.0`).
   - *Does NOT Protect Against*: Compromised packages where the pinned version itself is malicious, or unpinned dependencies in sub-transitive packages if lockfiles are bypassed.
3. **Frozen Lockfile (`pnpm --frozen-lockfile`) (`CONFIGURED-CONTROL`)**:
   - *Protects Against*: CI builds modifying the dependency tree or resolving different package hashes than those audited.
   - *Does NOT Protect Against*: Preexisting vulnerabilities or backdoors present in the locked versions.
4. **Ed25519 Cryptographic Attestations (`PROPOSED-CONTROL`)**:
   - *Protects Against*: Post-build tampering, binary substitution, or unauthorized package tarball modification.
   - *Does NOT Protect Against*: Malicious source code committed directly to the repository before the build occurred, or compromised build environments.
5. **In-Memory AST Sanitization (`CONFIGURED-CONTROL`)**:
   - *Protects Against*: Path traversal during token resolution and simple static script injection strings (`javascript:`, `expression(`).
   - *Does NOT Protect Against*: Complex semantic logic bugs, parser zero-days in underlying AST tools (`ts-morph`, `oxc`), or dynamic runtime evaluation in client browsers.
6. **Subprocess Isolation (Mode 4) (`CONFIGURED-CONTROL`)**:
   - *Protects Against*: In-process shared memory corruption and direct memory-level library linking.
   - *Does NOT Protect Against*: Resource exhaustion (CPU/RAM spikes), local denial-of-service, or legal arguments regarding distribution of companion tools.

---

## 5. Verification & Auditor Sign-Off

- **Threat Vectors Modeled:** 30 / 30 (100.0%)
- **Residual Risk Posture:** Mitigated through targeted defense-in-depth; zero critical vectors remain unmitigated.
- **Auditor Verification:** Approved as Reconciled by Software Supply-Chain Security Architect.
