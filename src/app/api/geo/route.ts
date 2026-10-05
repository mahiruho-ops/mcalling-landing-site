import { NextRequest, NextResponse } from "next/server";

/**
 * Get client IP from request headers (no 3rd party API).
 * Uses common headers set by proxies/CDNs; falls back to empty so geo lookup uses India.
 */
function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  return null;
}

const fallbackCountryCode = "IN";

/** Local and private addresses have no public country. Skip the database entirely. */
function isNonPublicIp(ip: string | null): boolean {
  if (!ip) return true;
  const normalized = ip.toLowerCase().replace(/^::ffff:/, "");
  if (
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized === "0.0.0.0" ||
    normalized === "localhost"
  ) {
    return true;
  }
  if (
    normalized.startsWith("192.168.") ||
    normalized.startsWith("10.") ||
    normalized.startsWith("172.16.") ||
    normalized.startsWith("172.17.") ||
    normalized.startsWith("172.18.") ||
    normalized.startsWith("172.19.") ||
    normalized.startsWith("172.2") ||
    normalized.startsWith("172.30.") ||
    normalized.startsWith("172.31.")
  ) {
    return true;
  }
  return false;
}

/**
 * GET /api/geo
 * Returns country code from client IP using local geoip-lite (no 3rd party API).
 * Fallback: India (IN).
 */
export async function GET(request: NextRequest) {
  const ip = getClientIp(request);

  if (isNonPublicIp(ip)) {
    return NextResponse.json({ countryCode: fallbackCountryCode });
  }

  try {
    // Dynamic import so geoip-lite (Node-only) is only loaded on the server,
    // and only when there is a public IP to look up.
    const geoip = await import("geoip-lite");
    const lookup = geoip.lookup(ip as string);
    const countryCode = lookup?.country ?? fallbackCountryCode;
    return NextResponse.json({ countryCode });
  } catch (error) {
    console.error("Geo lookup error:", error);
    return NextResponse.json({ countryCode: fallbackCountryCode });
  }
}
