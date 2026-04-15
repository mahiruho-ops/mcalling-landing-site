/**
 * Applies db/migrations/001_scheduler.sql using DATABASE_URL from the environment.
 * Usage (from repo root): node --env-file=.env scripts/run-scheduler-migration.mjs
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pg from "pg";

const { Client } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env or .env.local, then re-run.");
  process.exit(1);
}

const sql = readFileSync(join(root, "db", "migrations", "001_scheduler.sql"), "utf8");
const client = new Client({ connectionString: url });
await client.connect();
try {
  await client.query(sql);
  console.log("Scheduler migration applied successfully.");
} finally {
  await client.end();
}
