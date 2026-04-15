import { NextResponse } from "next/server";
import { cancelBookingByManagementToken } from "@/lib/scheduler-store";

export async function POST(request: Request) {
  let body: { token?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token.trim() : "";
  if (!token) {
    return NextResponse.json({ ok: false, error: "token_required" }, { status: 400 });
  }

  const result = await cancelBookingByManagementToken(token);
  if (!result.ok) {
    const status = result.error === "not_found" ? 404 : 409;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }

  return NextResponse.json({ ok: true, alreadyCancelled: result.alreadyCancelled ?? false });
}
