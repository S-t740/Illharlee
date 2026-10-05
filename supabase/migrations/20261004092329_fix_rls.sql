CREATE POLICY "Orders are viewable by everyone" ON orders FOR SELECT USING (true);
CREATE POLICY "Order items are viewable by everyone" ON order_items FOR SELECT USING (true);
