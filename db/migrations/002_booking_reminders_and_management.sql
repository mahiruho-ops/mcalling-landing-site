-- Booking management links + reminder tracking (Phase 2 scheduling emails)

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS management_token UUID;
UPDATE bookings SET management_token = gen_random_uuid() WHERE management_token IS NULL;
ALTER TABLE bookings ALTER COLUMN management_token SET DEFAULT gen_random_uuid();
ALTER TABLE bookings ALTER COLUMN management_token SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_management_token ON bookings(management_token);

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reminder_24h_sent_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reminder_1h_sent_at TIMESTAMPTZ;
