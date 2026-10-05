CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  image TEXT,
  accent_color TEXT DEFAULT '#D4AF37',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collections are viewable by everyone" ON collections FOR SELECT USING (true);
CREATE POLICY "Admins can insert collections" ON collections FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update collections" ON collections FOR UPDATE USING (true);
CREATE POLICY "Admins can delete collections" ON collections FOR DELETE USING (true);

-- Insert existing dummy data as defaults
INSERT INTO collections (name, slug, tagline, description, image, accent_color) VALUES 
('Minimalist Muse', 'minimalist-muse', 'Clean lines. Subtle elegance.', 'A curated collection of delicate pieces designed for the modern minimalist. These versatile designs seamlessly transition from day to night.', 'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800', '#D4AF37'),
('Vintage Revival', 'vintage-revival', 'Timeless classics reimagined.', 'Inspired by heirloom pieces from decades past, this collection features ornate detailing and classic silhouettes brought into the modern era.', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800', '#8B4513'),
('Bridal Brilliance', 'bridal-brilliance', 'For your special day.', 'Exquisite matching sets, engagement rings, and bridal party gifts designed to make your wedding day shine.', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800', '#E6E6FA'),
('Everyday Essentials', 'everyday-essentials', 'Your daily sparkle.', 'The pieces you never take off. Simple, durable, and effortlessly chic basics that form the foundation of any jewellery wardrobe.', 'https://images.unsplash.com/photo-1573408301145-b98c46544405?auto=format&fit=crop&q=80&w=800', '#C0C0C0'),
('Statement Makers', 'statement-makers', 'Be bold.', 'Chunky chains, oversized hoops, and vibrant gemstones for when you want your jewellery to do the talking.', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800', '#FF4500');
