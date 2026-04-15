import { NextRequest, NextResponse } from "next/server";
import { getSchedulerConfig } from "@/lib/scheduler-config";
import { holdSlot } from "@/lib/scheduler-service";

export async function POST(request: NextRequest) {
  try {
    const config = getSchedulerConfig();
    if (!config.enabled) {
      return NextResponse.json({ success: false, message: "Scheduler is disabled" }, { status: 503 });
    }

    const body = await request.json();
    const {
      slotStartIso,
      slotEndIso,
      timezone,
      name,
      email,
      phone,
      company,
      holdToken,
    } = body as Record<string, unknown>;

    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim().toLowerCase() : "";
    const phoneStr = typeof phone === "string" ? phone.trim() : "";
    const companyStr = typeof company === "string" ? company.trim() : "";
    const slotStartIsoStr = typeof slotStartIso === "string" ? slotStartIso : "";
    const slotEndIsoStr = typeof slotEndIso === "string" ? slotEndIso : "";
    const timezoneStr = typeof timezone === "string" && timezone.trim() ? timezone.trim() : config.timezone;
    const holdTokenStr = typeof holdToken === "string" && holdToken.trim() ? holdToken.trim() : undefined;

    if (!nameStr || !emailStr || !phoneStr || !companyStr || !slotStartIsoStr || !slotEndIsoStr) {
      return NextResponse.json(
        { success: false, message: "Name, email, phone, company and selected slot are required" },
        { status: 400 },
      );
    }

    const hold = await holdSlot({
      slotStartIso: slotStartIsoStr,
      slotEndIso: slotEndIsoStr,
      timezone: timezoneStr,
      holdToken: holdTokenStr,
      contact: {
        name: nameStr,
        email: emailStr,
        phone: phoneStr,
        company: companyStr,
      },
    });

    return NextResponse.json({
      success: true,
      holdToken: hold.holdToken,
      expiresAt: hold.expiresAt,
      message: "Slot held successfully",
    });
  } catch (error) {
    console.error("Error creating scheduler hold:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to hold selected slot",
      },
      { status: 409 },
    );
  }
}
