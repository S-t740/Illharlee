import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  const args = process.argv.slice(2);
  const email = args[0];
  const password = args[1];

  if (!email || !password) {
    console.log("Usage: npx tsx create-admin-user.ts <email> <password>");
    process.exit(1);
  }

  console.log(`Creating/updating admin user: ${email}...`);

  // First check if user exists
  const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  
  if (listError) {
    console.error("Failed to list users:", listError.message);
    process.exit(1);
  }

  const existing = usersData.users.find(u => u.email?.toLowerCase() === email.toLowerCase());

  if (existing) {
    console.log(`User already exists (id: ${existing.id}). Updating password and confirming email...`);
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true
    });
    if (error) {
      console.error("Failed to update user:", error.message);
      process.exit(1);
    }
    console.log(`✓ Admin user ${email} password successfully updated!`);
  } else {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    if (error) {
      console.error("Failed to create user:", error.message);
      process.exit(1);
    }
    console.log(`✓ Admin user ${email} created successfully (id: ${data.user.id})!`);
  }
}

main();
