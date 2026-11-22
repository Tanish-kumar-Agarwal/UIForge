# UIForge Engineering Standards: Agent Integration & MCP Compliance

**Document ID:** `UIF-ENG-STD-009`  
**Classification:** Authoritative Engineering Standard  

---

## 1. Model Context Protocol (MCP 2026-07-28)
- UIForge provides an official Model Context Protocol server (`@uiforge/mcp-server`) conforming to the official protocol specification.
- Ingress transport: Stdio JSON-RPC 2.0 communication (`uiforge-mcp`).
- Tools must publish strict JSON Schemas and execute non-destructively by default.

---

## 2. Ingress Boundary Isolation
- MCP tools must never invoke mutation engines or filesystem modifiers directly.
- All operations must be dispatched through `@uiforge/core` and coordinated via the Task State Machine.
- Tool responses must return machine-actionable JSON payloads conforming to `@uiforge/contracts`.
