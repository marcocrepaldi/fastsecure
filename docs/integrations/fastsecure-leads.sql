CREATE TABLE IF NOT EXISTS fastsecure_quote_leads (
  lead_id uuid PRIMARY KEY,
  payload jsonb NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  evolution_message_id text,
  notification_submitted_at timestamptz,
  CHECK ((evolution_message_id IS NULL) = (notification_submitted_at IS NULL))
);
