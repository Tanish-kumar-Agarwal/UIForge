/**
 * @uiforge/contracts - Error Taxonomy & Error Classes
 * Canonical error definitions conforming to uiforge.contract.error.v1
 */

export const ErrorCategory = {
  VALIDATION: 'VALIDATION',
  SECURITY: 'SECURITY',
  AST_PARSER: 'AST_PARSER',
  BROWSER: 'BROWSER',
  STORAGE: 'STORAGE',
  NETWORK: 'NETWORK',
  ORCHESTRATION: 'ORCHESTRATION',
  SAFE_MOD: 'SAFE_MOD',
} as const;

export type ErrorCategory = (typeof ErrorCategory)[keyof typeof ErrorCategory];

export const ErrorCode = {
  // Security
  ERR_SECURITY_APPROVAL_REQUIRED: 'ERR-SECURITY-APPROVAL_REQUIRED',
  ERR_SECURITY_PATH_TRAVERSAL: 'ERR-SECURITY-PATH_TRAVERSAL',
  ERR_SECURITY_TOKEN_EXPIRED: 'ERR-SECURITY-TOKEN_EXPIRED',
  ERR_SECURITY_TOKEN_TAMPERED: 'ERR-SECURITY-TOKEN_TAMPERED',
  ERR_SECURITY_PROPRIETARY_RESALE: 'ERR-SECURITY-PROPRIETARY_RESALE',

  // Validation
  ERR_VALIDATION_SCHEMA_MISMATCH: 'ERR-VALIDATION-SCHEMA_MISMATCH',
  ERR_VALIDATION_TOKEN_SYNTAX: 'ERR-VALIDATION-TOKEN_SYNTAX',
  ERR_VALIDATION_CONTRAST_FAIL: 'ERR-VALIDATION-CONTRAST_FAIL',

  // AST / Parser
  ERR_AST_UNRECOVERABLE_SYNTAX: 'ERR-AST-UNRECOVERABLE_SYNTAX',
  ERR_AST_TARGET_SPAN_MISMATCH: 'ERR-AST-TARGET_SPAN_MISMATCH',
  ERR_AST_MANIFEST_CORRUPT: 'ERR-AST-MANIFEST_CORRUPT',

  // Safe Modifier
  ERR_SAFE_MOD_TS_REGRESSION: 'ERR-SAFE_MOD-TS_REGRESSION',
  ERR_SAFE_MOD_WAL_RESTORE_FAILED: 'ERR-SAFE_MOD-WAL_RESTORE_FAILED',

  // Browser
  ERR_BROWSER_TARGET_UNREACHABLE: 'ERR-BROWSER-TARGET_UNREACHABLE',
  ERR_BROWSER_TIMEOUT_EXCEEDED: 'ERR-BROWSER-TIMEOUT_EXCEEDED',
  ERR_BROWSER_BINARIES_MISSING: 'ERR-BROWSER-BINARIES_MISSING',

  // Storage
  ERR_STORAGE_DISK_FULL: 'ERR-STORAGE-DISK_FULL',
  ERR_STORAGE_DATABASE_LOCKED: 'ERR-STORAGE-DATABASE_LOCKED',
  ERR_STORAGE_SNAPSHOT_NOT_FOUND: 'ERR-STORAGE-SNAPSHOT_NOT_FOUND',

  // Orchestration
  ERR_ORCHESTRATION_TASK_FAILED: 'ERR-ORCHESTRATION-TASK_FAILED',
  ERR_ORCHESTRATION_CANCELLED: 'ERR-ORCHESTRATION-CANCELLED',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export interface UIForgeErrorOptions {
  code: ErrorCode;
  category: ErrorCategory;
  message: string;
  fatal?: boolean;
  remediationHint?: string;
  fieldErrors?: Array<{ path: string; issue: string }>;
  cause?: unknown;
}

export class UIForgeError extends Error {
  readonly code: ErrorCode;
  readonly category: ErrorCategory;
  readonly fatal: boolean;
  readonly timestamp: string;
  readonly remediationHint?: string;
  readonly fieldErrors?: Array<{ path: string; issue: string }>;

  constructor(options: UIForgeErrorOptions) {
    super(options.message, { cause: options.cause });
    this.name = 'UIForgeError';
    this.code = options.code;
    this.category = options.category;
    this.fatal = options.fatal ?? true;
    this.timestamp = new Date().toISOString();
    this.remediationHint = options.remediationHint;
    this.fieldErrors = options.fieldErrors;
  }

  toJSON() {
    return {
      code: this.code,
      category: this.category,
      message: this.message,
      fatal: this.fatal,
      timestamp: this.timestamp,
      remediationHint: this.remediationHint,
      fieldErrors: this.fieldErrors,
    };
  }
}
