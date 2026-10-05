-- Allow full access to products and orders for MVP Admin features
CREATE POLICY "Allow full access to products" ON products FOR ALL USING (true);
CREATE POLICY "Allow full access to orders" ON orders FOR ALL USING (true);
