import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function seedOrders() {
  const { data: products } = await supabase.from('products').select('*').limit(5);
  if (!products || products.length === 0) return console.log('No products to make orders with.');

  for (let i = 0; i < 5; i++) {
    const orderId = crypto.randomUUID();
    const orderNumber = `ILL-20261004-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const p = products[Math.floor(Math.random() * products.length)];
    const qty = Math.floor(Math.random() * 3) + 1;
    
    const subtotal = p.price * qty;
    const delivery_fee = 350;
    const total = subtotal + delivery_fee;
    
    const statuses = ['processing', 'dispatched', 'delivered'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const oData = {
      id: orderId,
      order_number: orderNumber,
      subtotal, delivery_fee, total,
      status,
      payment_method: 'mpesa',
      customer_full_name: 'Test Customer ' + i,
      customer_phone: '0712345678',
      customer_email: 'test' + i + '@example.com',
      delivery_county: 'Nairobi',
      delivery_location: 'CBD',
      delivery_instructions: ''
    };
    
    await supabase.from('orders').insert([oData]);
    
    const iData = {
      order_id: orderId,
      product_id: p.id,
      product_name: p.name,
      product_image: p.images[0] || '',
      quantity: qty,
      unit_price: p.price,
      total: p.price * qty
    };
    await supabase.from('order_items').insert([iData]);
  }
  console.log('Seeded 5 dummy orders!');
}
seedOrders();
