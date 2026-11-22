# UIFORGE — PHASE 03: SHARED CONTRACT CATALOGUE (CONTRACTS 01 TO 28)
## Versioned Machine-Readable Contracts, Schemas, Identifiers, Relationships & Security Profiles

**Document ID:** `UIF-PH03-CONTRACT-CATALOGUE`  
**Phase:** 03 — Product Specification & Architecture Freeze  
**Status:** Certified / Complete  
**Date:** November 22, 2026  
**Standard:** Principal Software Architect & Lead API Architect  

---

## 1. Executive Contract Architecture

All communication between UIForge monorepo packages, external coding agents, storage backends, and developer CLI tools is governed by **28 Versioned Canonical Contracts**.

Contracts are defined in `@uiforge/contracts`. Every contract enforces:
- An immutable URI namespace: `uiforge.contract.<name>.v<major>`.
- Strict runtime validation via Zod schemas.
- Strong TypeScript type generation.
- Explicit identifier prefixes and entity relationships.
- Security and data sensitivity classifications.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CANONICAL CONTRACTS INDEX (01 TO 28)                            │
├────┬───────────────────────────────┬───────────────────────────────────────┬───────────┤
│ #  │ Contract Name                 │ Canonical Schema URI                  │ Category  │
├────┼───────────────────────────────┼───────────────────────────────────────┼───────────┤
│ 01 │ Project Contract              │ uiforge.contract.project.v1           │ Workspace │
│ 02 │ Project Snapshot Contract     │ uiforge.contract.project-snapshot.v1  │ Snapshot  │
│ 03 │ Analysis Run Contract         │ uiforge.contract.analysis-run.v1      │ Analysis  │
│ 04 │ Design Brief Contract         │ uiforge.contract.design-brief.v1      │ Design    │
│ 05 │ Visual Direction Contract     │ uiforge.contract.visual-direction.v1  │ Design    │
│ 06 │ Design System Contract        │ uiforge.contract.design-system.v1     │ Tokens    │
│ 07 │ Token Contract (DTCG)         │ uiforge.contract.token.v1             │ Tokens    │
│ 08 │ Component Definition Contract │ uiforge.contract.component-def.v1     │ Component │
│ 09 │ Component Impl. Contract      │ uiforge.contract.component-impl.v1    │ Component │
│ 10 │ Component Verif. Contract     │ uiforge.contract.component-verif.v1   │ Component │
│ 11 │ Registry Source Contract      │ uiforge.contract.registry-source.v1   │ Registry  │
│ 12 │ Provenance Contract           │ uiforge.contract.provenance.v1        │ Security  │
│ 13 │ Evidence Contract             │ uiforge.contract.evidence.v1          │ QA / Eval │
│ 14 │ Finding Contract              │ uiforge.contract.finding.v1           │ QA / Eval │
│ 15 │ Evaluation Contract           │ uiforge.contract.evaluation.v1        │ QA / Eval │
│ 16 │ Agent Contract                │ uiforge.contract.agent.v1             │ Agent MCP │
│ 17 │ Agent Session Contract        │ uiforge.contract.agent-session.v1     │ Agent MCP │
│ 18 │ Task Contract                 │ uiforge.contract.task.v1              │ Task      │
│ 19 │ Tool Execution Contract       │ uiforge.contract.tool-execution.v1    │ Agent MCP │
│ 20 │ Permission Contract           │ uiforge.contract.permission.v1        │ Security  │
│ 21 │ Approval Contract             │ uiforge.contract.approval.v1          │ Security  │
│ 22 │ Proposed Modification Contract│ uiforge.contract.proposed-mod.v1      │ Safe Mod  │
│ 23 │ Modification Result Contract  │ uiforge.contract.mod-result.v1        │ Safe Mod  │
│ 24 │ Validation Run Contract       │ uiforge.contract.validation-run.v1    │ CI / Gate │
│ 25 │ Comparison Contract           │ uiforge.contract.comparison.v1        │ Diff / QA │
│ 26 │ Export Artifact Contract      │ uiforge.contract.export-artifact.v1   │ Reporting │
│ 27 │ Workflow Contract             │ uiforge.contract.workflow.v1          │ Orchestr. │
│ 28 │ Error Contract                │ uiforge.contract.error.v1             │ Cross-cut │
└────┴───────────────────────────────┴───────────────────────────────────────┴───────────┘
```

---

## 2. Granular Contract Specifications (Contracts 01 to 28)

### 01. Project Contract (`uiforge.contract.project.v1`)
- **Purpose:** Represents the top-level target repository workspace and framework configuration.
- **ID Format:** `PRJ-<uuid>`
- **Required Fields:** `id`, `name`, `rootPath`, `createdAt`, `framework` (`{ name, version, router }`), `styling` (`{ engine, tailwindVersion, cssModules }`).
- **Optional Fields:** `description`, `gitRepositoryUrl`, `activeSnapshotId`.
- **Relationships:** Has many `Snapshots`, has many `AnalysisRuns`, has one `DesignSystem`.
- **Security:** Paths strictly validated against directory traversal.

### 02. Project Snapshot Contract (`uiforge.contract.project-snapshot.v1`)
- **Purpose:** Immutable, point-in-time capture of project code state, token hashes, and active component lists.
- **ID Format:** `SNAP-<sha256-first-8>`
- **Required Fields:** `id`, `projectId`, `timestamp`, `gitCommit`, `tokensDigest`, `componentInventoryDigest`, `packageLockDigest`.
- **Optional Fields:** `label`, `parentSnapshotId`, `evaluationSummary`.
- **Relationships:** Belongs to `Project`, references `Evaluation`.

### 03. Analysis Run Contract (`uiforge.contract.analysis-run.v1`)
- **Purpose:** Results of a read-only brownfield repository inspection (`FR-02`).
- **ID Format:** `ANL-<uuid>`
- **Required Fields:** `id`, `projectId`, `timestamp`, `durationMs`, `filesScanned`, `routes` (`RouteRecord[]`), `stylingConventions`, `extractedTokensCount`.
- **Optional Fields:** `warnings`, `unparseableFiles`.
- **Relationships:** Belongs to `Project`, produces input for `DesignBrief`.

### 04. Design Brief Contract (`uiforge.contract.design-brief.v1`)
- **Purpose:** Structured requirements document detailing user personas, information architecture, and UI constraints (`FR-03`).
- **ID Format:** `BRF-<uuid>`
- **Required Fields:** `id`, `projectId`, `version`, `title`, `userPersonas` (`Persona[]`), `layoutHierarchy`, `stateSpecifications` (`Loading`, `Empty`, `Error`, `Default`), `responsiveConstraints`, `accessibilityCriteria`.
- **Optional Fields:** `brandArchetype`, `referenceUrls`.
- **Relationships:** Input to `VisualDirection` and `Workflow A`.

### 05. Visual Direction Contract (`uiforge.contract.visual-direction.v1`)
- **Purpose:** Aesthetic direction defining selected color palette, typography pairing, radius ramps, and elevation rules (`FR-04`).
- **ID Format:** `DIR-<slug>`
- **Required Fields:** `id`, `briefId`, `archetype`, `colorPalette` (`{ primary, secondary, neutral, error, warning, success }`), `typography` (`{ headingFont, bodyFont, monoFont, scale }`), `radiusRamp`, `elevationRamp`.
- **Optional Fields:** `sampleMockupUrls`.
- **Relationships:** References `DesignBrief`, produces input for `DesignSystem`.

### 06. Design System Contract (`uiforge.contract.design-system.v1`)
- **Purpose:** Complete specification of the project's design system tokens, themes, and styling adapters (`FR-05`).
- **ID Format:** `DS-<uuid>`
- **Required Fields:** `id`, `projectId`, `name`, `tokenFileUri`, `themeModes` (`light`, `dark`), `targetEngines` (`["css-variables", "tailwind-v4"]`).
- **Optional Fields:** `fontAssets` (`FontAsset[]`), `customTransforms`.
- **Relationships:** Has many `Tokens`, produces `globals.css`.

### 07. Token Contract (W3C DTCG) (`uiforge.contract.token.v1`)
- **Purpose:** Individual design token conforming strictly to W3C DTCG Draft 2025.10.
- **ID Format:** `TOK-<category>.<name>` (e.g. `TOK-color.primary.500`)
- **Required Fields:** `$type` (`color`, `dimension`, `fontFamily`, `duration`, `shadow`), `$value`, `path` (`string[]`).
- **Optional Fields:** `$description`, `$extensions`.
- **Relationships:** Belongs to `DesignSystem`.

### 08. Component Definition Contract (`uiforge.contract.component-def.v1`)
- **Purpose:** Abstract metadata defining a reusable UI component's interface and capabilities (`FR-06`).
- **ID Format:** `CMP-<name>` (e.g. `CMP-dialog`)
- **Required Fields:** `id`, `name`, `category`, `description`, `propsInterface` (`PropDefinition[]`), `accessibilityTier` (Tier 0 to Tier 3), `supportedVariants`.
- **Optional Fields:** `requiredPrimitives` (e.g. `@radix-ui/react-dialog`).
- **Relationships:** Implemented by `ComponentImplementation`.

### 09. Component Implementation Contract (`uiforge.contract.component-impl.v1`)
- **Purpose:** Concrete source-copy code implementation of a component in a specific framework (`FR-06`).
- **ID Format:** `IMPL-<componentId>-<framework>`
- **Required Fields:** `id`, `componentId`, `framework` (`react`, `vue`, `svelte`), `filePath`, `sourceCode`, `dependencies` (`string[]`), `licenseSpdx`.
- **Optional Fields:** `storyCode`, `testCode`.
- **Relationships:** Realizes `ComponentDefinition`, references `Provenance`.

### 10. Component Verification Contract (`uiforge.contract.component-verif.v1`)
- **Purpose:** Verification scorecard of a component assessing accessibility, responsiveness, and tests.
- **ID Format:** `VRF-CMP-<uuid>`
- **Required Fields:** `id`, `componentId`, `wcagAutomatedPass`, `keyboardNavigable`, `mobileResponsive`, `bundleSizeKb`.
- **Optional Fields:** `testCoveragePercent`.
- **Relationships:** Evaluates `ComponentImplementation`.

### 11. Registry Source Contract (`uiforge.contract.registry-source.v1`)
- **Purpose:** Metadata defining an approved external component registry or source repository.
- **ID Format:** `SRC-<candidateId>` (Phase 02.4 source ID)
- **Required Fields:** `id`, `candidateId`, `name`, `registryUrl`, `licenseRef`, `consumptionPermissions` (`ConsumptionPermissionsRecord`).
- **Optional Fields:** `lastAuditDate`, `provenanceDigest`.
- **Relationships:** Feeds `@uiforge/component-registry`.

### 12. Provenance Contract (`uiforge.contract.provenance.v1`)
- **Purpose:** Cryptographic provenance envelope tracking origins of imported source code (`Principle 8`).
- **ID Format:** `PRV-<sha256-first-8>`
- **Required Fields:** `id`, `sourceUrl`, `gitCommit`, `licenseSpdx`, `fileDigestSha256`, `ingestTimestamp`, `verifiedBy`.
- **Optional Fields:** `authorAttributionNotice`.
- **Relationships:** Attached to `ComponentImplementation` and `ExportArtifact`.

### 13. Evidence Contract (`uiforge.contract.evidence.v1`)
- **Purpose:** Machine-readable assertion evidence envelope proving a test condition (`Principle 11`).
- **ID Format:** `EVD-<uuid>`
- **Required Fields:** `id`, `evidenceType` (`AXE_ASSERTION`, `PIXEL_DIFF`, `TS_DIAGNOSTIC`, `NETWORK_LOG`), `assertionName`, `passed`, `timestamp`, `rawPayloadDigest`.
- **Optional Fields:** `screenshotDigest`, `domSelector`.
- **Relationships:** Embedded in `Evaluation` and `QualityReport`.

### 14. Finding Contract (`uiforge.contract.finding.v1`)
- **Purpose:** Individual defect discovered during UX, accessibility, or responsive auditing (`FR-07`, `FR-08`).
- **ID Format:** `FND-<uuid>`
- **Required Fields:** `id`, `evaluationId`, `category` (`A11Y`, `UX`, `RESPONSIVE`, `COMPILE`), `severity` (`CRITICAL`, `SERIOUS`, `MODERATE`, `MINOR`), `title`, `description`, `selector`, `viewport`.
- **Optional Fields:** `wcagCriteria`, `remediationPatch`, `screenshotUrl`.
- **Relationships:** Belongs to `Evaluation`, resolved by `ProposedModification`.

### 15. Evaluation Contract (`uiforge.contract.evaluation.v1`)
- **Purpose:** Complete multi-viewport browser verification battery result (`FR-10`).
- **ID Format:** `EVAL-<uuid>`
- **Required Fields:** `id`, `projectId`, `targetUrl`, `timestamp`, `overallScore`, `findings` (`FindingRecord[]`), `evidence` (`EvidenceRecord[]`), `consoleErrorsCount`.
- **Optional Fields:** `viewportBreakdown`, `visualDeltaPercent`.
- **Relationships:** Associated with `ProjectSnapshot`, feeds `QualityReport`.

### 16. Agent Contract (`uiforge.contract.agent.v1`)
- **Purpose:** Metadata defining an external AI coding agent connecting via MCP (`FR-09`).
- **ID Format:** `AGT-<slug>`
- **Required Fields:** `id`, `name`, `protocolVersion` (`2026-07-28` / legacy), `transport` (`stdio`, `http`), `capabilities` (`string[]`).
- **Optional Fields:** `clientVersion`, `tokenBudgetLimit`.
- **Relationships:** Initiates `AgentSession`.

### 17. Agent Session Contract (`uiforge.contract.agent-session.v1`)
- **Purpose:** Active connection session tracking agent requests, token consumption, and active permissions.
- **ID Format:** `SES-<uuid>`
- **Required Fields:** `id`, `agentId`, `startedAt`, `status` (`ACTIVE`, `CLOSED`), `grantedPermissionLevel` (0 to 4).
- **Optional Fields:** `contextTokensUsed`, `activeTaskId`.
- **Relationships:** Belongs to `Agent`, contains many `ToolExecutions`.

### 18. Task Contract (`uiforge.contract.task.v1`)
- **Purpose:** High-level execution task coordinated by the Core State Machine.
- **ID Format:** `TSK-<uuid>`
- **Required Fields:** `id`, `workflowId`, `name`, `status` (`PENDING`, `EXECUTING`, `COMPLETED`, `FAILED`, `CANCELLED`), `createdAt`, `permissionLevel`.
- **Optional Fields:** `parentTaskId`, `errorRecord`.
- **Relationships:** Orchestrated by `WorkflowCoordinator`.

### 19. Tool Execution Contract (`uiforge.contract.tool-execution.v1`)
- **Purpose:** Audit record of an MCP tool invocation (`tools/call`).
- **ID Format:** `EXE-<uuid>`
- **Required Fields:** `id`, `sessionId`, `toolName`, `argumentsHash`, `timestamp`, `durationMs`, `success`.
- **Optional Fields:** `authorizationTokenId`, `errorDetails`.
- **Relationships:** Belongs to `AgentSession`, logged in `audit.jsonl`.

### 20. Permission Contract (`uiforge.contract.permission.v1`)
- **Purpose:** Five-level security permission classification (`ADR-008`).
- **ID Format:** `PERM-LEVEL-<0..4>`
- **Required Fields:** `level` (0: Read-Only, 1: Local Output, 2: Scaffold, 3: Mutate Existing, 4: Subprocess), `name`, `description`, `requiresUserApproval` (`boolean`).
- **Relationships:** Enforced by `@uiforge/security`.

### 21. Approval Contract (`uiforge.contract.approval.v1`)
- **Purpose:** Cryptographically signed, diff-bound authorization token granted by a human user.
- **ID Format:** `AUTH-<uuid>`
- **Required Fields:** `id`, `permissionLevel`, `targetFiles` (`string[]`), `diffSha256`, `issuedAt`, `expiresAt`, `signatureSha256`.
- **Optional Fields:** `approverIdentity` (`cli-user`, `studio-admin`).
- **Relationships:** Authorizes `ProposedModification`.

### 22. Proposed Modification Contract (`uiforge.contract.proposed-mod.v1`)
- **Purpose:** Proposed code mutation containing targeted coordinate slice patches and unified diffs (`FR-11`).
- **ID Format:** `MOD-<uuid>`
- **Required Fields:** `id`, `projectId`, `targetFilePath`, `characterSpan` (`[start, end]`), `originalTextDigest`, `replacementText`, `unifiedDiff`.
- **Optional Fields:** `resolvedFindingId`, `rationale`.
- **Relationships:** Authorized by `Approval`, executed by `SafeModifier`.

### 23. Modification Result Contract (`uiforge.contract.mod-result.v1`)
- **Purpose:** Outcome of an applied or rolled-back code mutation.
- **ID Format:** `RES-<uuid>`
- **Required Fields:** `id`, `modificationId`, `committed` (`boolean`), `walJournalId`, `baselineErrorsCount`, `postErrorsCount`, `deltaRegressionsCount`.
- **Optional Fields:** `rollbackReason`, `appliedDiff`.
- **Relationships:** Emitted by `SafeModifierEngine`.

### 24. Validation Run Contract (`uiforge.contract.validation-run.v1`)
- **Purpose:** Results of CI/CD quality gate policy evaluations (`Mode 7: VALIDATE`).
- **ID Format:** `VAL-<uuid>`
- **Required Fields:** `id`, `projectId`, `timestamp`, `passed` (`boolean`), `policiesEvaluated` (`PolicyEvaluation[]`), `exitCode`.
- **Optional Fields:** `sarifReportPath`, `junitXmlPath`.
- **Relationships:** Evaluates `Evaluation`, gates pull requests.

### 25. Comparison Contract (`uiforge.contract.comparison.v1`)
- **Purpose:** Delta analysis comparing two snapshots, git commits, or visual runs (`Mode 6: COMPARE`).
- **ID Format:** `CMP-<snapshotA>-<snapshotB>`
- **Required Fields:** `id`, `baselineSnapshotId`, `comparisonSnapshotId`, `tokensDelta`, `componentDelta`, `accessibilityDelta`, `pixelMismatchRatio`.
- **Optional Fields:** `visualDiffImagePath`.
- **Relationships:** Compares two `ProjectSnapshots`.

### 26. Export Artifact Contract (`uiforge.contract.export-artifact.v1`)
- **Purpose:** Packaged standalone deliverable (HTML report, DTCG tokens, Markdown summary).
- **ID Format:** `EXP-<uuid>`
- **Required Fields:** `id`, `exportType` (`HTML_DOSSIER`, `DTCG_TOKENS`, `MARKDOWN_SUMMARY`), `outputPath`, `fileSizeBytes`, `sha256Digest`.
- **Optional Fields:** `provenanceStamp`.
- **Relationships:** Emitted by `@uiforge/reporting`.

### 27. Workflow Contract (`uiforge.contract.workflow.v1`)
- **Purpose:** Multi-step workflow orchestration definition (Workflows A, B, C, D).
- **ID Format:** `WFK-<type>-<uuid>`
- **Required Fields:** `id`, `type` (`NEW_PROJECT`, `BROWNFIELD_IMPROVEMENT`, `AGENT_LOOP`, `CI_GATE`), `status`, `currentStepIndex`, `steps` (`TaskRecord[]`).
- **Optional Fields:** `cancellationReason`.
- **Relationships:** Managed by `IWorkflowCoordinator`.

### 28. Error Contract (`uiforge.contract.error.v1`)
- **Purpose:** Standardized, taxonomy-aligned system error payload.
- **ID Format:** `ERR-<category>-<code>` (e.g. `ERR-SECURITY-UNAUTHORIZED_WRITE`)
- **Required Fields:** `code`, `category` (`VALIDATION`, `SECURITY`, `AST_PARSER`, `BROWSER`, `STORAGE`, `NETWORK`), `message`, `fatal` (`boolean`), `timestamp`.
- **Optional Fields:** `remediationHint`, `callStack`, `fieldErrors`.
- **Relationships:** Used across allMonorepo APIs and MCP responses.
