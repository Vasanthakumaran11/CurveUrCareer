import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const signUp = async () => {
  console.log('Signing up test user...');
  const { data, error } = await supabase.auth.signUp({
    email: 'tester_443836@curveurcareer.com',
    password: 'TestPassword123!',
    options: {
      data: {
        username: 'tester_443836'
      }
    }
  });
  console.log('Signup data:', data);
  console.log('Signup error:', error);
};

signUp();
