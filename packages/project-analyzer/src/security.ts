import * as fs from 'node:fs';
import * as path from 'node:path';
import { type SkippedFileReason, UIForgeError, ErrorCode, ErrorCategory } from '@uiforge/contracts';

export interface SecurityOptions {
  maxDepth?: number;
  maxFiles?: number;
  maxFileSize?: number;
  scanTimeoutMs?: number;
  customExclusions?: string[];
}

export interface FileReadResult {
  content: string;
  bytesRead: number;
}

export interface SecurityCheckResult {
  allowed: boolean;
  reason?: SkippedFileReason;
  detail?: string;
  realPath?: string;
}

/**
 * Standard sensitive directory names that must never be traversed.
 */
export const SENSITIVE_DIRECTORIES = new Set([
  '.git',
  '.svn',
  '.hg',
  '.uiforge',
  'node_modules',
  'dist',
  'build',
  '.next',
  '.turbo',
  '.cache',
  'coverage',
  '.pnpm-store',
]);

/**
 * Standard sensitive file patterns containing credentials or private keys.
 */
export const SENSITIVE_FILE_PATTERNS = [
  /^\.env(?:\..+)?$/i,
  /\.(pem|key|pfx|p8|crt|passwd)$/i,
  /^(?:id_rsa|id_ed25519|id_dsa)(?:\..+)?$/i,
  /^(?:credentials|secrets?|service[-_]account)(?:\..+)?$/i,
  /\.token$/i,
];

/**
 * Binary file extensions that should not be read as text.
 */
export const BINARY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
  '.bmp',
  '.tiff',
  '.mp4',
  '.mp3',
  '.wav',
  '.ogg',
  '.zip',
  '.tar',
  '.gz',
  '.7z',
  '.exe',
  '.dll',
  '.so',
  '.dylib',
  '.wasm',
  '.pdf',
  '.ttf',
  '.woff',
  '.woff2',
  '.eot',
  '.bin',
  '.lockb',
]);

/**
 * Rule representation for Git-compatible ignore matching.
 */
export interface IgnoreRule {
  baseDir: string;
  rawPattern: string;
  isNegated: boolean;
  isDirectoryOnly: boolean;
  isAnchored: boolean;
  regex: RegExp;
}

/**
 * Git-compatible ignore matcher supporting comments, negation, globs, ** and nested files.
 */
export class GitIgnoreMatcher {
  private readonly rules: IgnoreRule[] = [];

  public addRules(baseDir: string, ignoreFileContent: string): void {
    const lines = ignoreFileContent.split(/\r?\n/);
    for (const rawLine of lines) {
      const trimmed = rawLine.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      let pattern = trimmed;
      let isNegated = false;
      if (pattern.startsWith('!')) {
        isNegated = true;
        pattern = pattern.slice(1).trim();
      }

      if (!pattern) continue;

      let isDirectoryOnly = false;
      if (pattern.endsWith('/')) {
        isDirectoryOnly = true;
        pattern = pattern.slice(0, -1);
      }

      let isAnchored = false;
      if (pattern.startsWith('/')) {
        isAnchored = true;
        pattern = pattern.slice(1);
      } else if (pattern.includes('/')) {
        isAnchored = true;
      }

      const regex = this.globToRegex(pattern, isAnchored);
      this.rules.push({
        baseDir,
        rawPattern: trimmed,
        isNegated,
        isDirectoryOnly,
        isAnchored,
        regex,
      });
    }
  }

  public isIgnored(targetPath: string, isDirectory: boolean): boolean {
    const normalizedTarget = targetPath.replace(/\\/g, '/');
    let ignored = false;

    for (const rule of this.rules) {
      const normalizedBase = rule.baseDir.replace(/\\/g, '/');
      let relPath: string;

      if (normalizedTarget === normalizedBase) {
        relPath = '';
      } else if (normalizedTarget.startsWith(normalizedBase + '/')) {
        relPath = normalizedTarget.slice(normalizedBase.length + 1);
      } else {
        // Outside rule's directory scope
        continue;
      }

      if (rule.isDirectoryOnly && !isDirectory) {
        continue;
      }

      if (rule.regex.test(relPath)) {
        ignored = !rule.isNegated;
      }
    }

    return ignored;
  }

  private globToRegex(pattern: string, isAnchored: boolean): RegExp {
    let re = '';
    let i = 0;
    while (i < pattern.length) {
      const c = pattern[i];
      if (!c) break;
      if (c === '*' && pattern[i + 1] === '*') {
        if (pattern[i + 2] === '/') {
          re += '(?:.+/)?';
          i += 3;
        } else {
          re += '.*';
          i += 2;
        }
      } else if (c === '*') {
        re += '[^/]*';
        i++;
      } else if (c === '?') {
        re += '[^/]';
        i++;
      } else if (['.', '(', ')', '+', '|', '^', '$', '@', '%', '{', '}'].includes(c)) {
        re += '\\' + c;
        i++;
      } else {
        re += c;
        i++;
      }
    }

    if (isAnchored) {
      return new RegExp(`^${re}(?:/.*)?$`);
    } else {
      return new RegExp(`(?:^|/)${re}(?:/.*)?$`);
    }
  }
}

/**
 * Filesystem Security Boundary Manager
 * Enforces canonical paths, symlink containment, TOCTOU safety, secret shields, and bounded reads.
 */
export class SecurityBoundaryManager {
  readonly canonicalRoot: string;
  readonly maxDepth: number;
  readonly maxFiles: number;
  readonly maxFileSize: number;
  readonly scanTimeoutMs: number;
  readonly ignoreMatcher: GitIgnoreMatcher;
  readonly visitedRealDirs: Set<string>;
  readonly customExclusions: string[];

  constructor(rawRootPath: string, options: SecurityOptions = {}) {
    if (!rawRootPath) {
      throw new UIForgeError({
        code: ErrorCode.ERR_VALIDATION_SCHEMA_MISMATCH,
        category: ErrorCategory.VALIDATION,
        message: 'Project root directory must be specified',
      });
    }

    const resolved = path.resolve(rawRootPath);
    if (!fs.existsSync(resolved)) {
      throw new UIForgeError({
        code: ErrorCode.ERR_SECURITY_PATH_TRAVERSAL,
        category: ErrorCategory.SECURITY,
        message: `Project root directory does not exist: ${resolved}`,
        remediationHint: 'Provide a valid existing directory path',
      });
    }

    try {
      this.canonicalRoot = fs.realpathSync(resolved);
    } catch (err) {
      throw new UIForgeError({
        code: ErrorCode.ERR_SECURITY_PATH_TRAVERSAL,
        category: ErrorCategory.SECURITY,
        message: `Failed to resolve real path of project root: ${(err as Error).message}`,
      });
    }

    this.maxDepth = options.maxDepth ?? 10;
    this.maxFiles = options.maxFiles ?? 1000;
    this.maxFileSize = options.maxFileSize ?? 1048576; // 1 MB default
    this.scanTimeoutMs = options.scanTimeoutMs ?? 30000; // 30 sec default
    this.customExclusions = options.customExclusions ?? [];
    this.ignoreMatcher = new GitIgnoreMatcher();
    this.visitedRealDirs = new Set<string>();

    // Add canonical root to visited directories
    this.visitedRealDirs.add(this.canonicalRoot);

    // Load root .gitignore if present
    const rootGitIgnore = path.join(this.canonicalRoot, '.gitignore');
    if (fs.existsSync(rootGitIgnore)) {
      try {
        const content = fs.readFileSync(rootGitIgnore, 'utf8');
        this.ignoreMatcher.addRules(this.canonicalRoot, content);
      } catch {
        // Silently continue if unreadable
      }
    }
  }

  /**
   * Evaluates whether a directory entry may be safely scanned.
   */
  public checkEntry(
    parentDir: string,
    entryName: string,
    isEntryDirectory: boolean,
  ): SecurityCheckResult {
    // 1. Directory Exclusion check
    if (isEntryDirectory && SENSITIVE_DIRECTORIES.has(entryName)) {
      return {
        allowed: false,
        reason: 'SENSITIVE_SECRET',
        detail: `Excluded meta directory: ${entryName}`,
      };
    }

    // 2. Sensitive file pattern check
    if (!isEntryDirectory) {
      for (const pattern of SENSITIVE_FILE_PATTERNS) {
        if (pattern.test(entryName)) {
          return {
            allowed: false,
            reason: 'SENSITIVE_SECRET',
            detail: `Shielded secret-bearing file: ${entryName}`,
          };
        }
      }
    }

    // 3. Binary file extension check
    if (!isEntryDirectory) {
      const ext = path.extname(entryName).toLowerCase();
      if (BINARY_EXTENSIONS.has(ext)) {
        return {
          allowed: false,
          reason: 'BINARY_FILE',
          detail: `Excluded binary extension: ${ext}`,
        };
      }
    }

    // 4. Custom exclusions
    for (const exclusion of this.customExclusions) {
      if (entryName === exclusion || entryName.startsWith(exclusion)) {
        return {
          allowed: false,
          reason: 'GITIGNORE',
          detail: `Matched custom exclusion: ${exclusion}`,
        };
      }
    }

    const fullPath = path.join(parentDir, entryName);

    // 5. .gitignore matching
    if (this.ignoreMatcher.isIgnored(fullPath, isEntryDirectory)) {
      return {
        allowed: false,
        reason: 'GITIGNORE',
        detail: `Ignored by .gitignore: ${entryName}`,
      };
    }

    // 6. Symlink & Containment verification (TOCTOU resistant)
    try {
      if (fs.existsSync(fullPath)) {
        const lstat = fs.lstatSync(fullPath);
        if (lstat.isSymbolicLink()) {
          const realPath = fs.realpathSync(fullPath);

          // Verify symlink destination stays within canonicalRoot
          if (!this.isWithinRoot(realPath)) {
            return {
              allowed: false,
              reason: 'SYMLINK_OUTSIDE_ROOT',
              detail: `Symlink '${entryName}' escapes project root`,
            };
          }

          // Verify symlink loop
          const stat = fs.statSync(realPath);
          if (stat.isDirectory()) {
            if (this.visitedRealDirs.has(realPath)) {
              return {
                allowed: false,
                reason: 'SYMLINK_LOOP',
                detail: `Recursive symlink cycle detected for '${entryName}'`,
              };
            }
          }
          return { allowed: true, realPath };
        }
      }
    } catch (err) {
      const nodeErr = err as NodeJS.ErrnoException;
      return {
        allowed: false,
        reason: 'PERMISSION_DENIED',
        detail: `Cannot stat file (${nodeErr.code}): ${entryName}`,
      };
    }

    return { allowed: true };
  }

  /**
   * Reads a file safely with bounded buffer size and TOCTOU containment re-validation.
   */
  public safeReadFile(targetPath: string): FileReadResult | null {
    let fd: number | null = null;
    try {
      // Re-verify realpath immediately before open
      const realPath = fs.realpathSync(targetPath);
      if (!this.isWithinRoot(realPath)) {
        return null;
      }

      fd = fs.openSync(realPath, 'r');
      const stat = fs.fstatSync(fd);

      if (!stat.isFile()) {
        return null;
      }

      if (stat.size > this.maxFileSize) {
        return null;
      }

      const buffer = Buffer.alloc(stat.size);
      const bytesRead = fs.readSync(fd, buffer, 0, stat.size, 0);

      // Check first 512 bytes for null byte (binary probe)
      const probeLength = Math.min(bytesRead, 512);
      for (let i = 0; i < probeLength; i++) {
        if (buffer[i] === 0) {
          // Detected binary file
          return null;
        }
      }

      return {
        content: buffer.toString('utf8', 0, bytesRead),
        bytesRead,
      };
    } catch {
      return null;
    } finally {
      if (fd !== null) {
        try {
          fs.closeSync(fd);
        } catch {
          // Ignore close error
        }
      }
    }
  }

  /**
   * Confirms whether a canonical path is contained strictly within the project root.
   */
  public isWithinRoot(resolvedPath: string): boolean {
    return (
      resolvedPath === this.canonicalRoot ||
      resolvedPath.startsWith(this.canonicalRoot + path.sep)
    );
  }

  /**
   * Registers a directory's real path to prevent cycle traversal.
   */
  public registerDirectory(realPath: string): void {
    this.visitedRealDirs.add(realPath);

    // If directory contains a nested .gitignore, add its rules
    const nestedIgnore = path.join(realPath, '.gitignore');
    if (fs.existsSync(nestedIgnore)) {
      try {
        const content = fs.readFileSync(nestedIgnore, 'utf8');
        this.ignoreMatcher.addRules(realPath, content);
      } catch {
        // Silently continue
      }
    }
  }
}
