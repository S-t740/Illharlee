import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
  const { data, error } = await supabase.from('products').select('*');
  console.log("Anon Fetch Data:", data);
  console.log("Anon Fetch Error:", error);

  const adminClient = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: adminData, error: adminError } = await adminClient.from('products').select('*');
  console.log("Admin Fetch Data:", adminData?.length);
  console.log("Admin Fetch Error:", adminError);
}

testFetch();
