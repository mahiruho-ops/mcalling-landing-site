export interface SlotInterval {
  start: Date;
  end: Date;
}

export interface SchedulerSlot extends SlotInterval {
  label: string;
}

export interface HoldContact {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface SlotHoldRecord {
  holdToken: string;
  slotStart: Date;
  slotEnd: Date;
  timezone: string;
  expiresAt: Date;
  status: "held" | "released" | "expired" | "finalized";
}

export interface BookingRecord {
  id: string;
  bookingRef: string;
  slotStart: Date;
  slotEnd: Date;
  timezone: string;
  status: "pending" | "confirmed" | "failed" | "cancelled";
  googleMeetLink?: string | null;
  googleEventHtmlLink?: string | null;
}
