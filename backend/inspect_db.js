import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const queryDb = async () => {
  console.log('Querying triggers and functions...');
  
  // Let's run a custom SQL query using RPC if available, or just query profiles table structure
  // Since we don't have direct SQL client, let's inspect profiles RLS status
  const { data: profiles, error: profErr } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);

  console.log('Select profiles error:', profErr);
  console.log('Select profiles data:', profiles);
};

queryDb();
