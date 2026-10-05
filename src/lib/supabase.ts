import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xwhsbliytvssspvwyyzg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aHNibGl5dHZzc3Nwdnd5eXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwMDAwMDAsImV4cCI6MjAxMDAwMDAwMH0.1234567890123456789012345678901234567890123';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
