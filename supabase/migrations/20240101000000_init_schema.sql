-- Create enquiries table
CREATE TABLE enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  parent_name text NOT NULL,
  phone text NOT NULL,
  email text,
  child_grade text NOT NULL,
  program text NOT NULL,
  preferred_start text,
  message text,
  status text DEFAULT 'new',
  contacted_at timestamptz
);

-- Create rate_limits table
CREATE TABLE rate_limits (
  ip_address text PRIMARY KEY,
  last_submission timestamptz DEFAULT now(),
  submission_count int DEFAULT 1
);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for enquiries
-- INSERT is implicitly denied for public/anon. 
-- Only allowed via Service Role Key (which bypasses RLS) in Edge Function.

-- SELECT/UPDATE allowed only for authenticated users (admin dashboard)
CREATE POLICY "Enable read access for authenticated users"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update access for authenticated users"
  ON enquiries
  FOR UPDATE
  TO authenticated
  USING (true);

-- No DELETE policy for anyone except Service Role
-- (Service Role bypasses RLS, so no explicit policy needed for it)

-- RLS Policies for rate_limits
-- Completely restricted from public access. Service Role only.
-- (Implicitly denied because RLS is enabled and no policies are defined)
