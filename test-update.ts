import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // using anon key to simulate client

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpdate() {
  const { data: orders } = await supabase.from('orders').select('id').limit(1);
  if (!orders || orders.length === 0) {
    console.log("No orders found");
    return;
  }
  const orderId = orders[0].id;
  
  const { data, error } = await supabase
    .from('orders')
    .update({ status: 'delivered' })
    .eq('id', orderId)
    .select();
    
  if (error) {
    console.error("Error updating:", JSON.stringify(error, null, 2));
  } else {
    console.log("Success:", data);
  }
}

testUpdate();
