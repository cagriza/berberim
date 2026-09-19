import { readFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const defaultDbPath = join(rootDir, "data", "berberim.sqlite");
const schemaPath = join(rootDir, "database", "schema.sql");
const seedPath = join(rootDir, "database", "seed.sql");

export async function ensureDatabaseFile(dbPath = process.env.BERBERIM_DB_PATH || defaultDbPath) {
  await mkdir(dirname(dbPath), { recursive: true });
  return dbPath;
}

export function openDatabase(dbPath = process.env.BERBERIM_DB_PATH || defaultDbPath) {
  const db = new DatabaseSync(dbPath);
  db.exec("pragma foreign_keys = on;");
  return db;
}

export function initializeDatabase(db) {
  db.exec(readFileSync(schemaPath, "utf8"));
  try {
    db.exec("alter table staff_profiles add column work_status text not null default 'Aktif';");
  } catch {
    // Column already exists on databases initialized with the current schema.
  }
  db.exec(readFileSync(seedPath, "utf8"));
}

export async function createDatabase() {
  const dbPath = await ensureDatabaseFile();
  const db = openDatabase(dbPath);
  initializeDatabase(db);
  return db;
}

export function all(db, sql, params = []) {
  return db.prepare(sql).all(...params);
}

export function get(db, sql, params = []) {
  return db.prepare(sql).get(...params);
}

export function run(db, sql, params = []) {
  const result = db.prepare(sql).run(...params);
  return {
    changes: result.changes,
    lastInsertRowid: Number(result.lastInsertRowid || 0),
  };
}
