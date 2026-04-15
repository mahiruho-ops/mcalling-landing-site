type WorkingHourRange = [string, string];

export type WorkingHoursConfig = {
  mon: WorkingHourRange[];
  tue: WorkingHourRange[];
  wed: WorkingHourRange[];
  thu: WorkingHourRange[];
  fri: WorkingHourRange[];
  sat: WorkingHourRange[];
  sun: WorkingHourRange[];
};

export interface SchedulerConfig {
  enabled: boolean;
  timezone: string;
  slotDurationMinutes: number;
  bufferMinutes: number;
  holdMinutes: number;
  /** Full business days of notice before the first bookable calendar day (0 = same day allowed if slots remain). Default 1. */
  leadBusinessDays: number;
  workingHours: WorkingHoursConfig;
}

const defaultWorkingHours: WorkingHoursConfig = {
  mon: [["10:00", "18:00"]],
  tue: [["10:00", "18:00"]],
  wed: [["10:00", "18:00"]],
  thu: [["10:00", "18:00"]],
  fri: [["10:00", "18:00"]],
  sat: [],
  sun: [],
};

function parseBoolean(input: string | undefined, defaultValue: boolean): boolean {
  if (input == null) return defaultValue;
  const normalized = input.trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  return defaultValue;
}

function parsePositiveInt(input: string | undefined, fallback: number): number {
  if (!input) return fallback;
  const parsed = Number.parseInt(input, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function parseNonNegativeInt(input: string | undefined, fallback: number): number {
  if (!input) return fallback;
  const parsed = Number.parseInt(input, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return parsed;
}

function parseWorkingHours(input: string | undefined): WorkingHoursConfig {
  const trimmed = input?.trim();
  if (!trimmed) return defaultWorkingHours;
  try {
    const parsed = JSON.parse(trimmed) as WorkingHoursConfig;
    const keys: Array<keyof WorkingHoursConfig> = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    for (const key of keys) {
      if (!Array.isArray(parsed[key])) {
        throw new Error(`Invalid working hours for ${key}`);
      }
    }
    return parsed;
  } catch {
    console.warn(
      "SCHEDULER_WORKING_HOURS_JSON is not valid JSON (remove placeholders like '...'; use a single-line JSON object). Using default Mon–Fri 10:00–18:00.",
    );
    return defaultWorkingHours;
  }
}

export function getSchedulerConfig(): SchedulerConfig {
  return {
    enabled: parseBoolean(process.env.SCHEDULER_ENABLED, true),
    timezone: process.env.SCHEDULER_TIMEZONE || "Asia/Kolkata",
    slotDurationMinutes: parsePositiveInt(process.env.SCHEDULER_SLOT_DURATION_MINUTES, 30),
    bufferMinutes: parsePositiveInt(process.env.SCHEDULER_BUFFER_MINUTES, 10),
    holdMinutes: parsePositiveInt(process.env.SCHEDULER_HOLD_MINUTES, 15),
    leadBusinessDays: parseNonNegativeInt(process.env.SCHEDULER_LEAD_BUSINESS_DAYS, 1),
    workingHours: parseWorkingHours(process.env.SCHEDULER_WORKING_HOURS_JSON),
  };
}
