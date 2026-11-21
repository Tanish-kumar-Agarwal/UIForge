# UIFORGE PHASE 02.4 — MASTER REGISTRY ARCHITECTURE
# System Boundaries, Trust Zones, Data Flows & Subsystem Integration

**Document ID:** `UIF-PH02.4-REGISTRY-ARCH`  
**Phase:** 02.4 — Internal Source Registry  
**Standard:** Principal Software Architect & Registry Platform Architect  
**Status:** Canonical Architecture Baseline  

---

## 1. System Vision & Architectural Boundaries

The UIForge Internal Source Registry is the trusted intellectual property, technical intelligence, and supply-chain governance layer of UIForge. It is designed around four foundational invariants:

1. **Local-First & Zero-Cloud-Dependency:** All registry intelligence is packaged, version-controlled, and executed locally without telemetry or mandatory remote cloud lookups.
2. **Untrusted Data Boundary:** All third-party upstream repositories, package manifests, documentation, and external CLI outputs are treated as untrusted inputs. Registry metadata never executes arbitrary code or lifecycle scripts.
3. **Decoupled Normalization:** Repositories, packages, components, and standalone assets are modeled as distinct normalized entities with foreign-key referential integrity.
4. **Multi-Mode Consumption Isolation:** Sources do not receive a blanket "approved" flag. Each candidate is independently evaluated across six distinct consumption modes.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               UIFORGE TRUST BOUNDARY                                   │
│                                                                                        │
│   UNTRUSTED EXTERNAL WORLD                                 UIFORGE CORE ENGINE         │
│   ┌───────────────────────────┐                           ┌────────────────────────┐   │
│   │ GitHub Repositories       │                           │ Project Intelligence   │   │
│   │ npm Registry Packages     │                           │ (Contract A)           │   │
│   │ Upstream Documentation    │                           └───────────▲────────────┘   │
│   │ Public Component Portals  │                                       │                │
│   └─────────────┬─────────────┘                           ┌───────────┴────────────┐   │
│                 │                                         │ Autonomous Agent SDK   │   │
│                 ▼                                         │ (Contract H - MCP)     │   │
│   ┌───────────────────────────┐                           └───────────▲────────────┘   │
│   │ Ingestion & Sanitization  │                                       │                │
│   │ Boundary (AST & Metadata) │                                       │                │
│   └─────────────┬─────────────┘                           ┌───────────┴────────────┐   │
│                 ▼                                         │ Browser Verification   │   │
│   ┌───────────────────────────────────────────────────┐   │ (Contract G)           │   │
│   │          INTERNAL SOURCE REGISTRY (02.4)          │   └───────────▲────────────┘   │
│   │  - Canonical Sources (125)                        │               │                │
│   │  - Normalized Packages (147) & Repos (125)        │               │                │
│   │  - Standalone Assets (6) & Components (31)        │───────────────┘                │
│   │  - 6-Mode Consumption Permissions (750)           │   Deterministic                │
│   │  - Provenance Digests (SHA-256) & Evidence Dossiers│   Query & Resolver APIs        │
│   └───────────────────────────────────────────────────┘                                │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Normalized Data Storage Architecture

### Phase 02 (Research & Validation Baseline): Normalized JSON
During Phase 02, the registry is codified in version-controlled, human-readable, schema-validated JSON files residing in `data/`:
- `sources.json`: Master candidate metadata and classification fields.
- `repositories.json`: Upstream VCS ownership and branch information.
- `packages.json`: Exact package ecosystem identities and version scopes.
- `components.json`: Component groups, styling systems, and accessibility statuses.
- `assets.json`: Standalone binary and non-code assets with artifact typologies.
- `licenses.json`: Normalized license definitions and legal obligations.
- `evaluations.json`: 10-dimension technical scores and limitation notes.
- `consumption-permissions.json`: 750 mode-specific permissions with conditions and notices.
- `provenance.json`: SHA-256 content digests, retrieval timestamps, and review trails.
- `evidence.json`: Empirical evidence dossiers with confidence ratings and source URLs.

### Phase 03+ (Production Integration): Local SQLite WAL Database
In Phase 03 production implementation, this normalized data model will be compiled into an embedded local SQLite database operating in Write-Ahead Logging (WAL) mode (`better-sqlite3`):
- High-performance indexed relational queries ($< 0.5\text{ ms}$ lookups).
- Zero database server setup (single file `.uiforge/registry.db`).
- Deterministic migrations tracking Git commits.
- Strict foreign key constraints enforcing referential integrity.

---

## 3. Data Flow & Lifecycle Pipeline

The lifecycle of an external technology within UIForge follows a strict six-stage pipeline:

```
  Stage 1: Discovery & Identity Capture
  └── Allocate immutable canonical ID (e.g. `OS-COMP-01`). Map aliases and monorepo boundaries.
  
  Stage 2: Upstream Ingestion & Metadata Sanitization
  └── Extract package names, repository URLs, and documentation endpoints without executing scripts.
  
  Stage 3: Normalization & Entity Separation
  └── Split candidate into Repository, Package(s), Component(s), and Asset(s).
  
  Stage 4: Technical & Legal Audit Ingestion
  └── Bind Phase 02.2 dimensional scores and Phase 02.3 license intelligence.
  
  Stage 5: Consumption Permission Evaluation
  └── Apply deterministic eligibility logic across the 6 consumption modes.
  
  Stage 6: Provenance Sealing & Digest Computation
  └── Compute SHA-256 content digest, bind evidence dossiers, and seal record.
```

---

## 4. Subsystem Integration Points

The Internal Source Registry exposes read-only query contracts to the surrounding UIForge modules:

1. **Project Intelligence (Contract A):**
   - Queries `PackageResolver` to determine whether a detected user package matches an audited registry entry.
   - Extracts recommended version ranges and peer dependency requirements.
2. **Component Intelligence & Scaffolding (Contract C):**
   - Queries `ComponentResolver` for headless component slotting, Tailwind styling hooks, and WAI-ARIA patterns.
   - Checks `SOURCE_COPY` permission before emitting raw component source into customer projects.
3. **Agent Integration SDK & MCP (Contract H):**
   - Provides deterministic tools (`registry_query_source`, `registry_check_permission`) so autonomous agents can verify technology boundaries without hallucination.
4. **Browser & Visual Verification (Contract G):**
   - Queries `AssetResolver` and `ExternalToolResolver` to locate verified Playwright and axe-core execution bundles.
