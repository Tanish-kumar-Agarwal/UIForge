# UIForge Phase 02.2 — Workstream 5: Empirical Evidence & Experiment Audit Trail (Reconciled Final)

**Document Identifier:** `UIF-PH02-WS5-EVIDENCE-RECONCILED`  
**Parent Workstream:** Phase 02.2 WS-5: AI Agent Architecture, Model Context Protocol (MCP), Agent SDK, Context Engineering & Tooling Integration  
**Execution Date:** November 21, 2026  
**Environment:** Node.js v22.12.0 (Windows x64), V8 Engine  
**Runner Script:** `research/phase-02/phase-02.2-technical-audit/ws5-evidence/run_ws5_experiments.cjs`  
**Raw Results:** `research/phase-02/phase-02.2-technical-audit/ws5-evidence/ws5-execution-results.json`  

---

## 1. Executive Summary & Evidence Classification Realism

This document records the empirical results, algorithmic validations, protocol audits, and simulation models for the ten experimental evaluations (E1–E10) conducted during **Workstream 5**.

In strict adherence to UIForge's **Evidence Over Assumptions** standard (`GEMINI.md`) and incorporating independent technical peer review findings:
1. **No Overclaims:** Simulated cost models and string manipulation algorithms are never conflated with live multi-agent execution or live LLM inference benchmarks.
2. **Honest Protocol Baselines:** Protocol evaluations explicitly reflect the current official Model Context Protocol specification (`2026-07-28` implemented by the modular v2 TypeScript SDK) while accounting for the v1 maintenance line (`2025-11-25`) and backward compatibility for clients using older specifications (`2024-11-05`).
3. **Transport-Specific Security:** Clear demarcation between local `stdio` (isolated OS process pipes; no HTTP or Bearer authentication needed) and remote `streamableHttp` (requires TLS and HTTP authorization when exposed over networks).
4. **Clear Demarcation:** The distinction between documentation analysis, local algorithmic testing, and live runtime connection is consistently maintained across all tests:
   $$\text{DOCUMENTATION VERIFIED} \neq \text{CONFIGURATION VERIFIED} \neq \text{CONNECTION TESTED} \neq \text{END-TO-END TESTED}$$

### Evidence Classification Key
- `[DOC/SOURCE-VERIFIED]`: Confirmed by inspecting official technical specifications (MCP 2026-07-28 & 2025-11-25 specs), SDK source repositories, or vendor developer documentation.
- `[LOCAL-HARNESS-TESTED]`: Empirically executed and verified using algorithmic validators, cryptographic hashing (SHA-256), and text processing logic inside the local Node.js environment.
- `[REPORTED-SIMULATION]`: Empirically executed against deterministic synthetic scenarios (cost models, untrusted comment filtering, in-memory state machines, loopback RPC dispatch); acknowledges simulation constraints.
- `[NOT-ESTABLISHED]`: Capabilities requiring live external LLM API inference, operating-system-level process containment, or live desktop IDE daemon connections not executed in this offline environment.
- `[PLANNED]`: Architectural features designed for future engine releases.

---

## 2. Reconciled Experiment Audit Trail (E1 – E10)

### Experiment E1: MCP Protocol Specification Baseline & Modular v2 SDK Architecture Audit
- **Classification:** `[DOC/SOURCE-VERIFIED]` (Official Specification & SDK Audit)
- **Objective:** Evaluate the Model Context Protocol (MCP) specification baseline and modular TypeScript SDK architecture to determine transport models, lifecycle handshakes, primitive boundaries, and architectural fit for UIForge.
- **Specification Audit Findings (November 2026 Baseline):**
  - **Protocol Versions:**
    - **Current Stable Specification:** **`2026-07-28`**, implemented by the stable **v2 SDK**.
    - **Maintenance Specification:** **`2025-11-25`**, supported by the v1 SDK maintenance line.
    - **Legacy Draft:** `2024-11-05`, the initial public draft specification.
    - *Backward Compatibility:* v2 servers negotiate protocol versions during the `initialize` handshake, enabling graceful interoperation with clients implementing earlier specifications.
  - **Modular Package Breakdown (v2 SDK):**
    - `@modelcontextprotocol/server`: Core server runtime and lifecycle handling.
    - `@modelcontextprotocol/client`: Client connection and tool invocation abstractions.
    - `@modelcontextprotocol/core`: Shared types, JSON-RPC schema definitions, and protocol constants.
    - Optional HTTP Framework Adapters: Modular transport bindings for Node.js `http`, Express, and Fastify.
  - **Transports & Security Boundaries:**
    - `stdio`: Line-delimited JSON-RPC over parent/child process pipes. Inherits local OS file and execution boundaries with zero open network ports. No HTTP or Bearer authentication is required. **Logging Invariant:** `stdout` is strictly reserved for valid JSON-RPC frames; all diagnostic logs must route to `stderr`.
    - `streamableHttp`: Standardized as a **single unified HTTP POST endpoint** accepting JSON-RPC requests and returning streaming chunked responses. **Crucial 2026 Changes:** The legacy GET streaming endpoint was removed; protocol-level session management was removed in favor of transport headers and connection state. **Applicable Remote Security:** When exposed over networks, requires TLS encryption, HTTP authorization (e.g., Bearer tokens), and CORS/CSRF origin controls.
  - **Lifecycle Handshake:**
    1. Client spawns server process or connects via HTTP POST.
    2. Client sends `initialize` request (`clientInfo`, `capabilities`, `protocolVersion`).
    3. Server responds with `serverInfo`, `capabilities`, `instructions`, and negotiated `protocolVersion`.
    4. Client sends `initialized` notification to complete handshake.
    5. Operational phase: `tools/list`, `tools/call`, `resources/list`, `resources/read`, `prompts/list`.
    6. Notifications: Logging, progress, dynamic tool/resource updates.
    7. Termination: Transport close or SIGTERM process shutdown.
- **Architectural Conclusion:**
  - MCP is an RPC transport adapter for exposing tools and resources. It is **not** an application framework. UIForge Core remains a standalone, headless TypeScript engine with internal domain contracts, exposing an MCP server adapter as an optional ingress layer.

---

### Experiment E2: Agent Compatibility Matrix & Feature Matrix
- **Classification:** `[DOC/SOURCE-VERIFIED]` (Documentation Audit — Not Live Tested)
- **Objective:** Compare 5 major AI coding agents across interface model, documented MCP transport support, tool execution safety, context delivery mechanisms, and optimal UIForge integration patterns.
- **Audited Agent Matrix:**
  1. **Claude Code (Anthropic):**
     - Interface: Terminal CLI agent.
     - Documented MCP Support: Native stdio + Streamable HTTP via `claude mcp add`.
     - Status: `DOCUMENTATION VERIFIED` (Not connection tested in this harness).
     - Tool Execution: Interactive terminal confirmation with glob/regex prefix auto-approval rules.
     - Context Delivery: System prompt + `CLAUDE.md` project memory files + MCP dynamic tool responses.
     - Recommended Integration: Hybrid `@uiforge/mcp-server` stdio + `CLAUDE.md` workflow directives.
  2. **Cursor (Anysphere):**
     - Interface: VS Code fork / IDE Agent mode.
     - Documented MCP Support: Native configuration via `.cursor/mcp.json` / workspace settings.
     - Status: `DOCUMENTATION VERIFIED` (Not connection tested in this harness).
     - Tool Execution: Background read operations; modal approval on file writes.
     - Context Delivery: `.cursorrules`, semantic vector indexing, MCP resources.
     - Recommended Integration: Dedicated `@uiforge/mcp-server` stdio bridge.
  3. **OpenCode & Community Agents:**
     - Interface: Open-source terminal CLI / desktop clients.
     - Documented MCP Support: Stdio JSON-RPC or direct CLI subprocess execution.
     - Status: `DOCUMENTATION VERIFIED` (Not connection tested in this harness).
     - Tool Execution: Configurable autonomy levels.
     - Context Delivery: Markdown templates, stdin context passing.
     - Recommended Integration: Direct CLI execution with structured JSON output + MCP server.
  4. **OpenAI Codex / Canvas:**
     - Interface: Web interface, VS Code extension, raw API.
     - Documented MCP Support: Expanding ecosystem support via CLI and configuration files.
     - Status: `DOCUMENTATION VERIFIED` (Not connection tested in this harness).
     - Tool Execution: Function calling JSON Schema contracts.
     - Context Delivery: System instructions, assistant messages, tool responses.
     - Recommended Integration: Technology-neutral JSON Schema tools + programmatic Node.js SDK.
  5. **Google Antigravity:**
     - Interface: Agentic Assistant with Sandboxed Execution & Swarm capabilities.
     - Documented MCP Support: Native MCP server registry + dynamic subagents + slash commands.
     - Status: `DOCUMENTATION VERIFIED` (Not connection tested in this harness).
     - Tool Execution: Standard sandboxed commands + elevated bypass requiring manual approval.
     - Context Delivery: System prompts, markdown artifacts, `GEMINI.md` project rules.
     - Recommended Integration: First-class: `GEMINI.md` protocol rules + MCP server + CLI commands.
- **Architectural Conclusion:**
  - Ecosystem documentation confirms widespread adoption of MCP across all 5 clients. However, because client-side configurations vary and no live agent connections were established in this offline environment, connection testing and end-to-end integration remain Phase 03 deliverables.

---

### Experiment E3: Tool Contract Validation & Schema Enforcement
- **Classification:** `[LOCAL-HARNESS-TESTED]` (Algorithmic Schema Validator)
- **Objective:** Verify that UIForge tools enforce strict boundary validation, reject unknown properties, enforce type safety, and catch malformed payloads before invoking underlying domain logic.
- **Harness Procedure:**
  - Schema defined for `uiforge_inspect_component`:
    - Required: `componentName` (string, length 1..100).
    - Optional: `filePath` (string), `includeA11y` (boolean), `depth` (integer, 1..5).
    - Strict constraint: `additionalProperties: false`.
  - Executed two test calls:
    1. Valid Call: `{ componentName: 'Button', filePath: 'components/ui/button.tsx', depth: 2 }`
    2. Invalid Call: `{ componentName: '', depth: 10, maliciousExtraProp: 'malicious_code' }`
- **Empirical Results:**
  - Valid Call: Passed cleanly with 0 errors.
  - Invalid Call: Caught exactly 3 validation errors:
    1. `Unknown field not permitted: 'maliciousExtraProp'`
    2. `Field 'componentName' must not be empty`
    3. `Field 'depth' must be an integer between 1 and 5`
  - Overall Schema Integrity: **PASS**.

---

### Experiment E4: Layered Context Compression & Character Heuristic Benchmark
- **Classification:** `[LOCAL-HARNESS-TESTED]` (Context Compression Harness Result)
- **Methodological Qualification:**
  - Evaluates local text compression and structural facts preservation using a standard character-based heuristic (~4 characters per token).
  - This experiment measures **information compression** in a synthetic fixture; it does **not** evaluate live LLM task completion effectiveness, which requires actual model execution.
- **Input and Output Character Metrics:**
  - Input Fixture (Monolithic Project Dump):
    - `package.json`: 124 characters
    - `components/Button.tsx`: 2,160 characters
    - `components/Card.tsx`: 1,800 characters
    - `components/Table.tsx`: 5,760 characters
    - `tokens.json`: 120 characters
    - **Total Input Characters:** **9,964 characters**
    - **Estimated Input Tokens:** $\lceil 9964 / 4 \rceil = \mathbf{2,491\text{ tokens}}$
  - Output Fixture (5-Layer Structured JSON Package):
    - Layer 1 (Identity), Layer 2 (Architecture Map), Layer 3 (Target Component Excerpt)
    - **Total Output Characters:** **871 characters**
    - **Estimated Output Tokens:** $\lceil 871 / 4 \rceil = \mathbf{218\text{ tokens}}$
- **Compression Formulas & Measured Reductions:**
  $$\text{Character Reduction} = \frac{9964 - 871}{9964} \times 100\% = \mathbf{91.26\%}$$
  $$\text{Heuristic Token Reduction} = \frac{2491 - 218}{2491} \times 100\% = \mathbf{91.2\%}$$
- **Deterministic Preservation Verification:**
  - Checked 4 core facts via programmatic boolean assertions:
    1. `Fact 1`: Framework identity retained (`layer1_Identity.framework === 'Next.js 15 (App Router)'`) -> `true`
    2. `Fact 2`: Target component identifier retained (`layer3.targetComponent === 'Button'`) -> `true`
    3. `Fact 3`: TypeScript interface contract retained (`layer3.propsInterface.includes('ButtonProps')`) -> `true`
    4. `Fact 4`: Diagnostic contrast finding retained (`layer3.diagnosticFindings[0].includes('2.54:1')`) -> `true`
  - Assertion method: `[fact1, fact2, fact3, fact4].every(Boolean)` returned `true`.
- **Limitation Notice:** The ~4 characters-per-token heuristic is an estimation, not a tokenizer measurement (e.g. tiktoken/SentencePiece). This local test proves structural text compression; it does not evaluate live LLM task completion effectiveness.

---

### Experiment E5: Permission & Approval Policy Evaluation Simulation
- **Classification:** `[LOCAL-HARNESS-TESTED]` (In-Memory Policy Logic Simulation)
- **Methodological Qualification & Status:**
  - Evaluates in-memory policy rules only (validating single-use token consumption, file scope, expiration, and user revocation).
  - **Critical Boundary Distinction:** Demonstrates that policy logic rejects out-of-scope or expired operations in memory. It does **not** prove that a real operating-system process cannot bypass those checks or write outside an approved scope. Actual filesystem enforcement (canonical path validation, symlink guards, TOCTOU handling) remains a Phase 03 implementation requirement.
- **Harness Procedure:**
  - Evaluated 5 policy scenarios:
    1. `READ_FILE` on `components/Button.tsx` (Level 0 Read-Only) -> Allowed.
    2. `WRITE_AST` on `components/Button.tsx` without approval token -> Blocked.
    3. `WRITE_AST` on `components/Button.tsx` with valid token -> Allowed.
    4. `WRITE_AST` on `package.json` with button-scoped token -> Blocked.
    5. `WRITE_AST` on `components/Button.tsx` after token revocation -> Blocked.
- **Empirical Results:**
  - All 5 policy assertions executed as expected in memory.
  - Logical policy enforcement verified; OS-level syscall interposition pending Phase 03.

---

### Experiment E6: Untrusted Code Sanitization & Content-Hashed Packaging
- **Classification:** `[REPORTED-SIMULATION]` (Sanitization & Content-Hashed Packaging Simulation)
- **Methodological Qualification & Security Clarification:**
  - **No Cryptographic Signature Claim:** Removed all references to a "signed envelope". The test computes a SHA-256 digest of the raw content string (`contentIntegrityDigest`). A SHA-256 digest detects data alteration relative to an expected hash; it is **not** an asymmetric cryptographic digital signature (which requires private/public key pairs).
  - **No Prompt Injection Immunity Claim:** Packaging untrusted text inside a JSON envelope and computing a hash does **not** neutralize malicious instructions or prove immunity to adversarial prompt manipulation. An agent can still be manipulated into generating incorrect code or leaking data through permitted tools.
  - **True Defense Model:** Real-world defense relies on:
    1. Untrusted source classification (tagging code snippets as `UNTRUSTED_SOURCE_SNIPPET`).
    2. Comment filtering (tested against synthetic test comments).
    3. Strict Level 3 execution authorization gates (blocking unauthorized file writes regardless of model text).
- **Harness Outcome:**
  - Text filtering successfully stripped test keywords (`[SANITIZED_HTML_COMMENT]`, `[FILTERED_INJECTION_KEYWORD]`).
  - Correctly demonstrated data encapsulation, but does not establish prompt injection immunity.

---

### Experiment E7: In-Memory Session Lifecycle & Idempotency Simulation
- **Classification:** `[REPORTED-SIMULATION]` (In-Memory State Machine Simulation)
- **Methodological Qualification:**
  - Evaluates in-memory state transitions and idempotency checks.
  - Does **not** establish operating-system process-level crash recovery across abrupt process termination (SIGKILL) or power failure (which requires disk-backed append-only journal serialization).
- **Harness Procedure:**
  - Session manager transitioned through `INITIALIZING` -> `ACTIVE` -> `COMPLETED`.
  - Dispatched an AST insertion operation with idempotency key `ast-insert-kpi-123`.
  - Re-dispatched the exact same operation with the same key to simulate duplicate agent delivery.
- **Empirical Results:**
  - Initial call executed the action (count = 1).
  - Duplicate call detected the existing key, returned cached execution metadata, and prevented re-execution (count remained 1).
  - Validated in-memory idempotency contract; persistent disk journaling remains a Phase 03 engineering requirement.

---

### Experiment E8: Single-Agent vs. Multi-Agent Coordination Overhead Model
- **Classification:** `[REPORTED-SIMULATION]` (`SIMULATED COST MODEL — NOT A LIVE AGENT BENCHMARK`)
- **Methodological Qualification:**
  - This is an **analytical and mathematical cost model** simulating coordination overhead. It does **not** represent an empirical benchmark of live AI agents executing on real LLM API endpoints.
  - Simulation results illustrate theoretical overhead based on stated assumptions; actual numbers in production depend on model context caching, provider pricing, task complexity, prompt structure, and retry frequency.
- **Simulation Assumptions & Parameters:**
  - Task: "Fix color contrast and add accessible keyboard modal behavior to KPI Card".
  - Base context tokens per agent: 3,500 tokens (system instructions + project context).
  - Single-Agent Model: 1 agent executing 3 sequential tool turns (3,200 execution/tool tokens). Total: **6,700 tokens**, simulated latency: **12.5 seconds**.
  - Multi-Agent Model: 4 specialized agents (Planner, Coder, Critic, Tester) each receiving 3,500 base context tokens (14,000 tokens), plus 4 inter-agent handoff turns (4,800 tokens), plus 3,200 execution tokens. Total: **22,000 tokens**, simulated latency: **38.0 seconds**.
- **Model Findings:**
  - Simulated Token Multiplication: **3.28x token overhead**.
  - Simulated Latency Inflation: **3.04x slower**.
- **Architectural Recommendation:**
  - UIForge adopts **Single-Agent Primacy** as a provisional architectural baseline supported by simplicity, predictable token expenditure, and tool leverage. Multi-agent orchestration is retained as an optional, advanced pipeline until live comparative agent benchmarks are executed.

---

### Experiment E9: Hash-Chain & Selected Secret Redaction Cases
- **Classification:** `[LOCAL-HARNESS-TESTED]` (`LOCAL-HARNESS-TESTED — HASH-CHAIN AND SELECTED REDACTION CASES`)
- **Methodological Qualification:**
  - Validates hash-chain computation and regex-based redaction across selected credential patterns (Bearer tokens, database passwords).
  - **Integrity Notice:** Hash chaining detects tampering only when anchored to an external, independently trusted checkpoint or signed ledger. An attacker with unrestricted write access to the log can rewrite events and recalculate valid SHA-256 hashes.
  - Regex-based scrubbing on specific fields does **not** constitute comprehensive or certified DLP (Data Loss Prevention) secret protection.
- **Harness Procedure:**
  - Sanitized an audit event containing `Bearer eyJhbGciOiJIUz...` and `dbPassword: super_secret_db_password_123`.
  - Serialized payload via canonical JSON and chained with preceding digest using SHA-256.
- **Empirical Results:**
  - Selected test credentials scrubbed: Replaced with `[REDACTED_BEARER_TOKEN]` and `[REDACTED_PASSWORD]`.
  - Chained digest generated: `sha256-d0bfc7e80dfbaf1600064bec08409279acd746c3c9071234e803086243b48b0b`.
  - Validated local hash chaining and regex scrubbing logic on tested cases.

---

### Experiment E10: Stdio JSON-RPC Loopback Simulation (Not Real MCP Integration)
- **Classification:** `[REPORTED-SIMULATION]` (`Simulated JSON-RPC Loopback — Not a Real MCP Process Integration Test`)
- **Methodological Qualification:**
  - Simulates receiving and responding to a JSON-RPC 2.0 `tools/call` message in memory.
  - **Crucial Distinction:** This test did **not** launch an actual MCP server child process, did **not** bind to OS pipes or HTTP sockets, and did **not** connect a live external MCP client (Claude Code, Cursor, etc.).
  - A genuine end-to-end integration test requires demonstrating:
    1. Subprocess launch and pipe binding.
    2. Initialization handshake (`initialize` -> response -> `initialized`).
    3. Protocol version negotiation (`2026-07-28` vs `2025-11-25`).
    4. Capability exchange (`tools`, `resources`, `prompts`).
    5. Tool discovery via `tools/list`.
    6. Live tool execution via `tools/call`.
    7. Structured response framing.
    8. Error handling and timeout recovery.
    9. Clean SIGTERM process teardown.
- **Harness Outcome:**
  - Validated that the simulated request/response message shape adheres to standard JSON-RPC 2.0. Real subprocess integration remains a Phase 03 deliverable.

---

## 3. Reconciled Evidence Classification Summary Table

| Experiment | Title | Reconciled Classification | Validated Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **E1** | MCP Spec & Modular v2 SDK Audit | `[DOC/SOURCE-VERIFIED]` | Audited `2026-07-28` & `2025-11-25` specs; modular packages verified | **VERIFIED** |
| **E2** | Agent Compatibility Matrix | `[DOC/SOURCE-VERIFIED]` | 5 clients audited; labeled DOCUMENTATION VERIFIED (not connection tested) | **VERIFIED** |
| **E3** | Tool Contract Validation | `[LOCAL-HARNESS-TESTED]` | Schema validator caught 3 boundary errors; zero false passes | **VERIFIED** |
| **E4** | Context Compression Benchmark | `[LOCAL-HARNESS-TESTED]` | 91.2% text reduction (~4 chars/token heuristic); 4/4 facts retained | **VERIFIED** |
| **E5** | Permission Policy Logic | `[LOCAL-HARNESS-TESTED]` | In-memory evaluation blocked out-of-scope & revoked writes | **VERIFIED** |
| **E6** | Untrusted Code Sanitization | `[REPORTED-SIMULATION]` | Text filter stripped test keywords; tagged as untrusted data | **VERIFIED** |
| **E7** | Session State & Idempotency | `[REPORTED-SIMULATION]` | In-memory duplicate call trapped; cached result returned | **VERIFIED** |
| **E8** | Single vs. Multi-Agent Cost Model | `[REPORTED-SIMULATION]` | Simulated cost model: 3.28x token bloat; provisional single-agent recommendation | **VERIFIED** |
| **E9** | Hash-Chain & Selected Redaction | `[LOCAL-HARNESS-TESTED]` | Hash chain computed; selected secrets scrubbed; anchoring limitations noted | **VERIFIED** |
| **E10** | Stdio JSON-RPC Loopback | `[REPORTED-SIMULATION]` | Valid JSON-RPC loopback; live subprocess test noted as Phase 03 requirement | **VERIFIED** |

*All 10 experiments audited, reconciled, and permanently recorded.*
