import { NextResponse } from "next/server";
import { getSchedulerConfig } from "@/lib/scheduler-config";
import { getSchedulerBoundsPayload } from "@/lib/scheduler-service";

export async function GET() {
  try {
    const config = getSchedulerConfig();
    if (!config.enabled) {
      return NextResponse.json({ success: false, message: "Scheduler is disabled" }, { status: 503 });
    }

    const bounds = getSchedulerBoundsPayload();
    return NextResponse.json({
      success: true,
      ...bounds,
    });
  } catch (error) {
    console.error("Error fetching scheduler bounds:", error);
    return NextResponse.json({ success: false, message: "Unable to fetch scheduler bounds" }, { status: 500 });
  }
}
