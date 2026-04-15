/**
 * Checks scheduler tables and migration 002 columns. Usage: node --env-file=.env scripts/check-migrations.mjs
 */
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  const tables = await client.query(
    `SELECT table_name FROM information_schema.tables
     WHERE table_schema = 'public' AND table_name IN ('bookings', 'slot_holds', 'booking_events')`,
  );
  const have = new Set(tables.rows.map((r) => r.table_name));
  console.log("Core tables present:", [...have].sort().join(", ") || "(none)");

  const cols = await client.query(
    `SELECT column_name FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'bookings'
     ORDER BY ordinal_position`,
  );
  const names = cols.rows.map((r) => r.column_name);
  console.log("bookings column count:", names.length);

  const m002 = ["management_token", "reminder_24h_sent_at", "reminder_1h_sent_at"];
  const missing = m002.filter((c) => !names.includes(c));
  if (missing.length === 0) {
    console.log("Migration 002: OK (all marker columns present).");
  } else {
    console.log("Migration 002: PENDING — missing columns:", missing.join(", "));
  }

  const m001 = have.has("bookings") && have.has("slot_holds");
  console.log("Migration 001 (scheduler schema):", m001 ? "OK" : "PENDING or incomplete");
} finally {
  await client.end();
}
