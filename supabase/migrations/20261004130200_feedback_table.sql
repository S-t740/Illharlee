CREATE TYPE feedback_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  product TEXT,
  status feedback_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback (anonymous submission)
CREATE POLICY "Anyone can insert feedback" ON feedback FOR INSERT WITH CHECK (true);

-- Allow anyone to read APPROVED feedback
CREATE POLICY "Anyone can read approved feedback" ON feedback FOR SELECT USING (status = 'approved');

-- (Admins using the service role key will bypass RLS to read/update all)

-- Trigger for updated_at
CREATE TRIGGER update_feedback_updated_at
    BEFORE UPDATE ON feedback
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
