CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS slot_holds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hold_token TEXT NOT NULL UNIQUE,
  slot_start TIMESTAMPTZ NOT NULL,
  slot_end TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_company TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'held',
  expires_at TIMESTAMPTZ NOT NULL,
  released_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT slot_holds_status_check CHECK (status IN ('held', 'released', 'expired', 'finalized'))
);

CREATE INDEX IF NOT EXISTS idx_slot_holds_active_window
  ON slot_holds (slot_start, slot_end, expires_at)
  WHERE status = 'held';

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref TEXT NOT NULL UNIQUE,
  hold_token TEXT UNIQUE REFERENCES slot_holds(hold_token),
  slot_start TIMESTAMPTZ NOT NULL,
  slot_end TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_company TEXT NOT NULL,
  interest_payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  google_event_id TEXT,
  google_event_html_link TEXT,
  google_meet_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT bookings_status_check CHECK (status IN ('pending', 'confirmed', 'failed', 'cancelled'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_slot_unique_active
  ON bookings (slot_start, slot_end)
  WHERE status IN ('pending', 'confirmed');

CREATE TABLE IF NOT EXISTS booking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  hold_token TEXT,
  event_type TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_booking_events_booking_id ON booking_events (booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_events_hold_token ON booking_events (hold_token);
