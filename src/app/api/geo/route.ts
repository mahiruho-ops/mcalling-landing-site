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

/**
 * GET /api/geo
 * Returns country code from client IP using local geoip-lite (no 3rd party API).
 * Fallback: India (IN).
 */
export async function GET(request: NextRequest) {
  const fallbackCountryCode = "IN";

  try {
    // Dynamic import so geoip-lite (Node-only) is only loaded on the server
    const geoip = await import("geoip-lite");
    const ip = getClientIp(request);

    if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
      return NextResponse.json({ countryCode: fallbackCountryCode });
    }

    const lookup = geoip.lookup(ip);
    const countryCode = lookup?.country ?? fallbackCountryCode;

    return NextResponse.json({ countryCode });
  } catch (error) {
    console.error("Geo lookup error:", error);
    return NextResponse.json({ countryCode: fallbackCountryCode });
  }
}
