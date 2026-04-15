import { DateTime } from "luxon";
import type { SchedulerConfig, WorkingHoursConfig } from "./scheduler-config";
import { getSchedulerConfig } from "./scheduler-config";
import type { SlotInterval } from "./scheduler-types";

const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

type DayKey = (typeof dayKeys)[number];

function dayKeyFromDateTime(dt: DateTime): DayKey {
  return dayKeys[dt.weekday % 7];
}

function hasWorkingHoursOnDay(dt: DateTime, workingHours: WorkingHoursConfig): boolean {
  const key = dayKeyFromDateTime(dt);
  return workingHours[key].length > 0;
}

/**
 * Earliest instant a slot may start: after `leadBusinessDays` full business days
 * (days with at least one working-hours range), counting from "today" in scheduler TZ.
 * For lead 0, returns `now` (same-day booking allowed if slots remain).
 */
export function getEarliestBookableInstant(now: Date, config: SchedulerConfig): Date {
  if (config.leadBusinessDays <= 0) {
    return now;
  }

  let cursor = DateTime.fromJSDate(now).setZone(config.timezone).startOf("day");
  let remaining = config.leadBusinessDays;
  let safety = 0;
  while (remaining > 0 && safety < 400) {
    cursor = cursor.plus({ days: 1 });
    if (hasWorkingHoursOnDay(cursor, config.workingHours)) {
      remaining -= 1;
    }
    safety += 1;
  }

  const key = dayKeyFromDateTime(cursor);
  const ranges = config.workingHours[key];
  if (!ranges.length) {
    return DateTime.fromJSDate(now).setZone(config.timezone).plus({ years: 1 }).toUTC().toJSDate();
  }

  const [firstStart] = ranges[0];
  const [hourStr, minuteStr] = firstStart.split(":");
  const hour = Number.parseInt(hourStr ?? "0", 10);
  const minute = Number.parseInt(minuteStr ?? "0", 10);
  const instant = cursor.set({ hour, minute, second: 0, millisecond: 0 });
  return instant.toUTC().toJSDate();
}

/** yyyy-MM-dd in scheduler TZ for the first calendar day that can include a bookable slot. */
export function getEarliestSelectableDateString(now: Date, config: SchedulerConfig): string {
  const minInstant = getEarliestBookableInstant(now, config);
  return DateTime.fromJSDate(minInstant).setZone(config.timezone).toFormat("yyyy-LL-dd");
}

function overlaps(a: SlotInterval, b: SlotInterval): boolean {
  return a.start < b.end && a.end > b.start;
}

function formatSlotLabel(start: DateTime, end: DateTime): string {
  return `${start.toFormat("hh:mm a")} - ${end.toFormat("hh:mm a")}`;
}

export interface ComputedSlot {
  start: Date;
  end: Date;
  label: string;
}

export function buildSlotsForDate(date: string): ComputedSlot[] {
  const config = getSchedulerConfig();
  const dayStart = DateTime.fromISO(date, { zone: config.timezone }).startOf("day");
  if (!dayStart.isValid) return [];

  const dayKey = dayKeys[dayStart.weekday % 7];
  const ranges = config.workingHours[dayKey];
  const slots: ComputedSlot[] = [];

  for (const [rangeStart, rangeEnd] of ranges) {
    const rangeStartDt = DateTime.fromFormat(`${date} ${rangeStart}`, "yyyy-MM-dd HH:mm", {
      zone: config.timezone,
    });
    const rangeEndDt = DateTime.fromFormat(`${date} ${rangeEnd}`, "yyyy-MM-dd HH:mm", {
      zone: config.timezone,
    });
    if (!rangeStartDt.isValid || !rangeEndDt.isValid || rangeEndDt <= rangeStartDt) continue;

    let cursor = rangeStartDt;
    while (cursor.plus({ minutes: config.slotDurationMinutes }) <= rangeEndDt) {
      const slotEnd = cursor.plus({ minutes: config.slotDurationMinutes });
      slots.push({
        start: cursor.toUTC().toJSDate(),
        end: slotEnd.toUTC().toJSDate(),
        label: formatSlotLabel(cursor, slotEnd),
      });
      cursor = cursor.plus({ minutes: config.slotDurationMinutes + config.bufferMinutes });
    }
  }

  return slots;
}

export function filterUnavailableSlots(
  candidateSlots: ComputedSlot[],
  unavailableIntervals: SlotInterval[],
  options?: { minimumSlotStart?: Date },
): ComputedSlot[] {
  const now = new Date();
  const config = getSchedulerConfig();
  const effectiveMin =
    options?.minimumSlotStart ?? getEarliestBookableInstant(now, config);

  return candidateSlots.filter((slot) => {
    if (slot.start < effectiveMin) return false;
    return !unavailableIntervals.some((interval) =>
      overlaps({ start: slot.start, end: slot.end }, interval),
    );
  });
}
