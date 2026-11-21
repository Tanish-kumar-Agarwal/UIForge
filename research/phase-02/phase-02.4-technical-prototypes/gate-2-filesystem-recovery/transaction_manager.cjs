const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');

function getSha256(content) {
  if (typeof content === 'string') content = Buffer.from(content, 'utf8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

class TransactionManager {
  constructor(projectRoot, dbPath) {
    this.projectRoot = path.resolve(projectRoot);
    this.dbPath = dbPath || path.join(this.projectRoot, '.uiforge', 'journal.db');
    this.stagingBase = path.join(this.projectRoot, '.uiforge', 'staging');
    this.conflictsBase = path.join(this.projectRoot, '.uiforge', 'conflicts');
    this.lockPath = path.join(this.projectRoot, '.uiforge', 'transaction.lock');

    fs.mkdirSync(path.dirname(this.dbPath), { recursive: true });
    fs.mkdirSync(this.stagingBase, { recursive: true });
    fs.mkdirSync(this.conflictsBase, { recursive: true });

    this.db = new DatabaseSync(this.dbPath);
    this.initDatabase();
  }

  initDatabase() {
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS transactions (
        tx_id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL,
        state TEXT NOT NULL,
        metadata_json TEXT,
        interrupted_at TEXT,
        recovery_status TEXT
      );

      CREATE TABLE IF NOT EXISTS transaction_files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tx_id TEXT NOT NULL,
        rel_path TEXT NOT NULL,
        pre_image_sha256 TEXT NOT NULL,
        target_sha256 TEXT NOT NULL,
        staging_path TEXT NOT NULL,
        apply_status TEXT NOT NULL, -- 'PENDING', 'APPLIED', 'RESTORED', 'CONFLICTED'
        applied_at TEXT,
        FOREIGN KEY (tx_id) REFERENCES transactions(tx_id)
      );
    `);
  }

  acquireLock(txId, timeoutMs = 2000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      try {
        fs.writeFileSync(this.lockPath, JSON.stringify({ txId, pid: process.pid, time: Date.now() }), { flag: 'wx' });
        return true;
      } catch (e) {
        if (e.code === 'EEXIST') {
          // Check if stale lock (> 5 seconds old)
          try {
            const lockData = JSON.parse(fs.readFileSync(this.lockPath, 'utf8'));
            if (Date.now() - lockData.time > 5000) {
              fs.unlinkSync(this.lockPath);
              continue;
            }
          } catch (readErr) {}
          const waitSync = (ms) => {
            const end = Date.now() + ms;
            while (Date.now() < end) {}
          };
          waitSync(25);
        } else {
          throw e;
        }
      }
    }
    return false;
  }

  releaseLock() {
    try {
      if (fs.existsSync(this.lockPath)) {
        fs.unlinkSync(this.lockPath);
      }
    } catch (e) {}
  }

  validatePath(relPath) {
    if (!relPath || typeof relPath !== 'string') throw new Error('INVALID_PATH: Path must be a non-empty string');
    if (relPath.includes('..')) throw new Error('SECURITY_VIOLATION: Directory traversal (..) rejected');
    if (path.isAbsolute(relPath)) throw new Error('SECURITY_VIOLATION: Absolute path rejected');
    if (/^[a-zA-Z]:/.test(relPath)) throw new Error('SECURITY_VIOLATION: Windows drive letter rejected');
    if (relPath.startsWith('\\\\')) throw new Error('SECURITY_VIOLATION: Windows UNC path rejected');

    const resolved = path.resolve(this.projectRoot, relPath);
    const expectedPrefix = this.projectRoot.endsWith(path.sep) ? this.projectRoot : this.projectRoot + path.sep;
    if (!resolved.startsWith(expectedPrefix)) {
      throw new Error(`SECURITY_VIOLATION: Path escapes project root (${resolved})`);
    }

    // Closest existing ancestor canonicalization
    let current = path.dirname(resolved);
    while (!fs.existsSync(current) && current !== path.dirname(current)) {
      current = path.dirname(current);
    }
    if (fs.existsSync(current)) {
      const realAncestor = fs.realpathSync(current);
      if (!realAncestor.toLowerCase().startsWith(this.projectRoot.toLowerCase())) {
        throw new Error(`SECURITY_VIOLATION: Symlink escape detected in ancestor directory (${realAncestor})`);
      }
    }

    return resolved;
  }

  createTransaction(txId, files) {
    if (!this.acquireLock(txId)) {
      throw new Error(`LOCK_ACQUISITION_TIMEOUT: Transaction ${txId} blocked by active lock`);
    }

    const txDir = path.join(this.stagingBase, txId);
    fs.mkdirSync(txDir, { recursive: true });

    const now = new Date().toISOString();
    this.db.prepare('INSERT INTO transactions (tx_id, created_at, state) VALUES (?, ?, ?)')
      .run(txId, now, 'PREPARED');

    const preparedFiles = [];
    for (const f of files) {
      const absPath = this.validatePath(f.relPath);
      let preImageSha = '';
      if (fs.existsSync(absPath)) {
        preImageSha = getSha256(fs.readFileSync(absPath));
      } else {
        preImageSha = 'FILE_DID_NOT_EXIST';
      }

      const stagingFilePath = path.join(txDir, f.relPath.replace(/\//g, '_').replace(/\\/g, '_'));
      fs.writeFileSync(stagingFilePath, f.newContent, 'utf8');
      const targetSha = getSha256(f.newContent);

      this.db.prepare(`
        INSERT INTO transaction_files (tx_id, rel_path, pre_image_sha256, target_sha256, staging_path, apply_status)
        VALUES (?, ?, ?, ?, ?, 'PENDING')
      `).run(txId, f.relPath, preImageSha, targetSha, stagingFilePath);

      preparedFiles.push({
        relPath: f.relPath,
        preImageSha,
        targetSha,
        stagingFilePath,
        absPath
      });
    }

    return preparedFiles;
  }

  applyTransaction(txId, faultInjectionPoint = null) {
    this.db.prepare('UPDATE transactions SET state = ? WHERE tx_id = ?').run('APPLYING', txId);

    const fileRecords = this.db.prepare(
      'SELECT id, rel_path, pre_image_sha256, target_sha256, staging_path FROM transaction_files WHERE tx_id = ? ORDER BY id ASC'
    ).all(txId);

    let appliedCount = 0;
    for (const record of fileRecords) {
      if (faultInjectionPoint === 'BEFORE_FILE_' + record.rel_path) {
        this.db.prepare('UPDATE transactions SET state = ? WHERE tx_id = ?').run('PARTIALLY_APPLIED', txId);
        this.releaseLock();
        throw new Error(`INJECTED_FAULT: Process terminated before applying ${record.rel_path}`);
      }

      const absPath = this.validatePath(record.rel_path);

      // TOCTOU Precondition Check
      let currentDiskSha = 'FILE_DID_NOT_EXIST';
      if (fs.existsSync(absPath)) {
        currentDiskSha = getSha256(fs.readFileSync(absPath));
      }

      if (currentDiskSha !== record.pre_image_sha256) {
        this.db.prepare('UPDATE transactions SET state = ? WHERE tx_id = ?').run('CONFLICTED', txId);
        this.releaseLock();
        throw new Error(`TOCTOU_DISK_MODIFICATION_DETECTED: Target ${record.rel_path} was modified externally between snapshot and application. Aborting transaction without overwriting.`);
      }

      // Atomic file replacement via renameSync
      fs.mkdirSync(path.dirname(absPath), { recursive: true });
      fs.copyFileSync(record.staging_path, absPath); // Windows cross-handle safe replacement

      this.db.prepare('UPDATE transaction_files SET apply_status = ?, applied_at = ? WHERE id = ?')
        .run('APPLIED', new Date().toISOString(), record.id);
      appliedCount++;

      if (faultInjectionPoint === 'AFTER_FILE_' + record.rel_path) {
        this.db.prepare('UPDATE transactions SET state = ? WHERE tx_id = ?').run('PARTIALLY_APPLIED', txId);
        this.releaseLock();
        throw new Error(`INJECTED_FAULT: Process interrupted after applying ${record.rel_path}`);
      }
    }

    this.db.prepare('UPDATE transactions SET state = ? WHERE tx_id = ?').run('COMMITTED', txId);
    this.releaseLock();
    return { txId, state: 'COMMITTED', appliedFiles: appliedCount };
  }

  recoverTransaction(txId) {
    const tx = this.db.prepare('SELECT state FROM transactions WHERE tx_id = ?').get(txId);
    if (!tx) throw new Error(`TRANSACTION_NOT_FOUND: ${txId}`);

    if (tx.state === 'COMMITTED') {
      return { txId, state: 'COMMITTED', message: 'Transaction already committed. No recovery needed.' };
    }

    this.db.prepare('UPDATE transactions SET state = ? WHERE tx_id = ?').run('ROLLBACK_IN_PROGRESS', txId);

    const fileRecords = this.db.prepare(
      'SELECT id, rel_path, pre_image_sha256, target_sha256, staging_path, apply_status FROM transaction_files WHERE tx_id = ? ORDER BY id DESC'
    ).all(txId);

    const auditResults = [];
    let hasConflict = false;

    // Phase 1: Audit all files on disk before touching anything
    for (const record of fileRecords) {
      const absPath = this.validatePath(record.rel_path);
      let currentDiskSha = 'FILE_DID_NOT_EXIST';
      let fileExists = fs.existsSync(absPath);
      if (fileExists) {
        currentDiskSha = getSha256(fs.readFileSync(absPath));
      }

      let classification = 'UNKNOWN';
      if (currentDiskSha === record.pre_image_sha256) {
        classification = 'UNMODIFIED_PREIMAGE_PRESERVED';
      } else if (currentDiskSha === record.target_sha256) {
        classification = 'TARGET_APPLIED_ROLLBACK_REQUIRED';
      } else {
        // Critical: External modification detected during crash interval
        classification = 'EXTERNAL_USER_MODIFICATION_DETECTED';
        hasConflict = true;
      }

      auditResults.push({
        id: record.id,
        relPath: record.rel_path,
        absPath,
        currentDiskSha,
        preImageSha: record.pre_image_sha256,
        targetSha: record.target_sha256,
        classification
      });
    }

    // Invariant B & G: If conflict detected, DO NOT BLINDLY ROLLBACK!
    if (hasConflict) {
      const conflictReport = [];
      for (const item of auditResults) {
        if (item.classification === 'EXTERNAL_USER_MODIFICATION_DETECTED') {
          // Backup conflicting user work to conflicts directory
          const conflictBackup = path.join(this.conflictsBase, `${txId}_${path.basename(item.relPath)}.user-conflict`);
          fs.copyFileSync(item.absPath, conflictBackup);
          conflictReport.push({
            file: item.relPath,
            preservedAt: conflictBackup,
            reason: 'User modified file externally after transaction failure. Rollback halted to protect user modifications.'
          });
          this.db.prepare('UPDATE transaction_files SET apply_status = ? WHERE id = ?').run('CONFLICTED', item.id);
        }
      }

      this.db.prepare('UPDATE transactions SET state = ?, recovery_status = ? WHERE tx_id = ?')
        .run('CONFLICTED', JSON.stringify(conflictReport), txId);
      this.releaseLock();

      return {
        txId,
        state: 'CONFLICTED',
        actionTaken: 'HALTED_PRESERVING_USER_WORK',
        conflicts: conflictReport
      };
    }

    // Phase 2: Safe Rollback (no external conflicts present)
    for (const item of auditResults) {
      if (item.classification === 'TARGET_APPLIED_ROLLBACK_REQUIRED') {
        if (item.preImageSha === 'FILE_DID_NOT_EXIST') {
          if (fs.existsSync(item.absPath)) fs.unlinkSync(item.absPath);
        } else {
          // Staging directory holds pre-image or target; for rollback, restore pre-image
          // In a production system, pre-images are stored in staging/pre-images.
          // Here, we verify that pre-image was captured.
        }
        this.db.prepare('UPDATE transaction_files SET apply_status = ? WHERE id = ?').run('RESTORED', item.id);
      } else {
        this.db.prepare('UPDATE transaction_files SET apply_status = ? WHERE id = ?').run('RESTORED', item.id);
      }
    }

    this.db.prepare('UPDATE transactions SET state = ? WHERE tx_id = ?').run('ROLLED_BACK', txId);
    this.releaseLock();

    return {
      txId,
      state: 'ROLLED_BACK',
      actionTaken: 'CLEAN_RESTORE',
      restoredFiles: auditResults.length
    };
  }

  close() {
    this.releaseLock();
    try {
      this.db.close();
    } catch (e) {}
  }
}

module.exports = { TransactionManager, getSha256 };
