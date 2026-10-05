CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins can insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Admins can delete categories" ON categories FOR DELETE USING (true);

-- Insert existing dummy data as defaults
INSERT INTO categories (name, slug, icon) VALUES 
('Necklaces', 'necklaces', '✨'),
('Earrings', 'earrings', '💎'),
('Rings', 'rings', '💍'),
('Bracelets', 'bracelets', '💫'),
('Anklets', 'anklets', '🌸'),
('Jewellery Sets', 'jewellery-sets', '🎁');
