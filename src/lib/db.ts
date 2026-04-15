import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __mkcallingPgPool: Pool | undefined;
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required for scheduler features");
  }
  return new Pool({
    connectionString,
    max: 10,
  });
}

export const dbPool = globalThis.__mkcallingPgPool ?? createPool();

if (!globalThis.__mkcallingPgPool) {
  globalThis.__mkcallingPgPool = dbPool;
}
