-- Allow all operations on feedback (for MVP without Auth)
CREATE POLICY "Anyone can update feedback" ON feedback FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete feedback" ON feedback FOR DELETE USING (true);
CREATE POLICY "Anyone can select all feedback" ON feedback FOR SELECT USING (true);
