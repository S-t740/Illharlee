import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function wipeOrders() {
  const { error: itemsError } = await supabase.from('order_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: ordersError } = await supabase.from('orders').delete().neq('id', 'none');
  
  if (itemsError) console.error('Error deleting items:', itemsError);
  if (ordersError) console.error('Error deleting orders:', ordersError);
  
  if (!itemsError && !ordersError) {
    console.log('Successfully wiped all orders and order_items!');
  }
}
wipeOrders();
