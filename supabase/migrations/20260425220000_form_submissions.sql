CREATE TABLE form_submissions (
  id          bigserial PRIMARY KEY,
  created_at  timestamptz NOT NULL DEFAULT now(),

  -- Identity
  form_name   text NOT NULL,
  page        text,

  -- Contact fields
  name        text,
  email       text,
  phone       text,
  message     text,

  -- Multi-select arrays
  help_with   text[],
  services    text[],

  -- Compliance
  sms_consent boolean NOT NULL DEFAULT false,

  -- UTM tracking
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_term     text,
  utm_content  text,

  -- Request metadata (filled server-side)
  ip_address  text,
  user_agent  text,
  referrer    text,

  -- Catch-all for future fields
  raw_data    jsonb
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Public may insert (form submissions); no one may read/update/delete via anon
CREATE POLICY "anon_insert" ON form_submissions
  FOR INSERT TO anon WITH CHECK (true);
