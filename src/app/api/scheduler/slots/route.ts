import { NextRequest, NextResponse } from "next/server";
import { getSchedulerConfig } from "@/lib/scheduler-config";
import { getSchedulerBoundsPayload, listAvailableSlotsForDate } from "@/lib/scheduler-service";

export async function GET(request: NextRequest) {
  try {
    const config = getSchedulerConfig();
    if (!config.enabled) {
      return NextResponse.json({ success: false, message: "Scheduler is disabled" }, { status: 503 });
    }

    const date = request.nextUrl.searchParams.get("date");
    if (!date) {
      return NextResponse.json({ success: false, message: "date query param is required" }, { status: 400 });
    }

    const slots = await listAvailableSlotsForDate(date);
    const bounds = getSchedulerBoundsPayload();
    return NextResponse.json({
      success: true,
      timezone: config.timezone,
      leadBusinessDays: bounds.leadBusinessDays,
      earliestSelectableDate: bounds.earliestSelectableDate,
      slots,
    });
  } catch (error) {
    console.error("Error fetching scheduler slots:", error);
    return NextResponse.json({ success: false, message: "Unable to fetch available slots" }, { status: 500 });
  }
}
