/**
 * Applies db/migrations/002_booking_reminders_and_management.sql
 * Usage: node --env-file=.env scripts/run-migration-002.mjs
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
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = readFileSync(join(root, "db", "migrations", "002_booking_reminders_and_management.sql"), "utf8");
const client = new Client({ connectionString: url });
await client.connect();
try {
  await client.query(sql);
  console.log("Migration 002 applied successfully.");
} finally {
  await client.end();
}
