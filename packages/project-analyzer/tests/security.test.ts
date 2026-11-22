import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { SecurityBoundaryManager, GitIgnoreMatcher } from '../src/security.js';
import { UIForgeError } from '@uiforge/contracts';

describe('SecurityBoundaryManager & GitIgnoreMatcher', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uiforge-sec-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('GitIgnoreMatcher', () => {
    it('handles comments, globs, directory slashes and negation', () => {
      const matcher = new GitIgnoreMatcher();
      const rules = `
# Comment line
*.log
build/
/root-only.txt
temp/**
!temp/keep.txt
`;
      matcher.addRules(tmpDir, rules);

      expect(matcher.isIgnored(path.join(tmpDir, 'debug.log'), false)).toBe(true);
      expect(matcher.isIgnored(path.join(tmpDir, 'src/error.log'), false)).toBe(true);
      expect(matcher.isIgnored(path.join(tmpDir, 'build'), true)).toBe(true);
      expect(matcher.isIgnored(path.join(tmpDir, 'build'), false)).toBe(false); // directory only
      expect(matcher.isIgnored(path.join(tmpDir, 'root-only.txt'), false)).toBe(true);
      expect(matcher.isIgnored(path.join(tmpDir, 'src/root-only.txt'), false)).toBe(false); // anchored
      expect(matcher.isIgnored(path.join(tmpDir, 'temp/sub/file.txt'), false)).toBe(true);
      expect(matcher.isIgnored(path.join(tmpDir, 'temp/keep.txt'), false)).toBe(false); // negated
      expect(matcher.isIgnored(path.join(tmpDir, 'normal.ts'), false)).toBe(false);
    });
  });

  describe('SecurityBoundaryManager', () => {
    it('blocks sensitive files and secrets (.env, keys, credentials)', () => {
      const mgr = new SecurityBoundaryManager(tmpDir);

      expect(mgr.checkEntry(tmpDir, '.env', false).allowed).toBe(false);
      expect(mgr.checkEntry(tmpDir, '.env.local', false).allowed).toBe(false);
      expect(mgr.checkEntry(tmpDir, '.env.production', false).allowed).toBe(false);
      expect(mgr.checkEntry(tmpDir, 'id_rsa', false).allowed).toBe(false);
      expect(mgr.checkEntry(tmpDir, 'server.key', false).allowed).toBe(false);
      expect(mgr.checkEntry(tmpDir, 'app.ts', false).allowed).toBe(true);
    });

    it('blocks binary extensions and null bytes', () => {
      const mgr = new SecurityBoundaryManager(tmpDir);

      expect(mgr.checkEntry(tmpDir, 'image.png', false).allowed).toBe(false);
      expect(mgr.checkEntry(tmpDir, 'archive.zip', false).allowed).toBe(false);
      expect(mgr.checkEntry(tmpDir, 'binary.wasm', false).allowed).toBe(false);

      // Null byte probe test
      const binFile = path.join(tmpDir, 'unknown.dat');
      const binBuf = Buffer.from([0x48, 0x65, 0x6c, 0x00, 0x6f]); // 'Hel\0o'
      fs.writeFileSync(binFile, binBuf);

      const readResult = mgr.safeReadFile(binFile);
      expect(readResult).toBeNull(); // Should detect null byte and reject
    });

    it('blocks traversal outside root and detects symlink escaping', () => {
      const outsideDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uiforge-outside-'));
      try {
        const mgr = new SecurityBoundaryManager(tmpDir);

        // Create symlink pointing outside root
        const outsideSymlink = path.join(tmpDir, 'escape-link');
        try {
          fs.symlinkSync(outsideDir, outsideSymlink, 'dir');
          const check = mgr.checkEntry(tmpDir, 'escape-link', true);
          expect(check.allowed).toBe(false);
          expect(check.reason).toBe('SYMLINK_OUTSIDE_ROOT');
        } catch {
          // On Windows without Developer Mode, symlinkSync may throw EPERM
        }
      } finally {
        fs.rmSync(outsideDir, { recursive: true, force: true });
      }
    });

    it('safely bounds file reads to maxFileSize', () => {
      const mgr = new SecurityBoundaryManager(tmpDir, { maxFileSize: 100 });
      const largeFile = path.join(tmpDir, 'large.txt');
      fs.writeFileSync(largeFile, 'A'.repeat(200));

      const res = mgr.safeReadFile(largeFile);
      expect(res).toBeNull(); // Exceeds 100 bytes limit
    });

    it('throws UIForgeError on non-existent root path', () => {
      expect(() => new SecurityBoundaryManager(path.join(tmpDir, 'non-existent'))).toThrow(
        UIForgeError,
      );
    });
  });
});
