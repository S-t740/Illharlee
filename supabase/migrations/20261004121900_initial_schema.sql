-- Create enum types
CREATE TYPE order_status AS ENUM ('processing', 'dispatched', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE payment_method AS ENUM ('mpesa', 'card', 'cash');

-- Create Products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  compare_at_price INTEGER,
  description TEXT,
  short_description TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  collections TEXT[] NOT NULL DEFAULT '{}',
  materials TEXT[] NOT NULL DEFAULT '{}',
  care_instructions TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  sku TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Product Variations table
CREATE TABLE product_variations (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g. 'color', 'style', 'size'
  value TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0
);

-- Create Orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  subtotal INTEGER NOT NULL,
  delivery_fee INTEGER NOT NULL,
  total INTEGER NOT NULL,
  status order_status NOT NULL DEFAULT 'processing',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_method payment_method NOT NULL,
  
  -- Customer Information
  customer_full_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  
  -- Delivery Information
  delivery_county TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  delivery_instructions TEXT,
  is_pickup BOOLEAN NOT NULL DEFAULT false,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Order Items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_image TEXT NOT NULL,
  variation TEXT,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  total INTEGER NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- Products and variations are readable by everyone
CREATE POLICY "Public profiles are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Product variations are viewable by everyone" ON product_variations FOR SELECT USING (true);

-- Orders can be inserted by anyone (for anonymous checkout), but only read by authenticated admins
CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert order items" ON order_items FOR INSERT WITH CHECK (true);

-- Functions and Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
