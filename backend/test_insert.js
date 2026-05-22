import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const testEmail = 'tester_443836@curveurcareer.com';
const testPassword = 'TestPassword123!';

const test = async () => {
  console.log('Logging in user...');
  const { data, error } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  });

  if (error) {
    console.error('Login error:', error);
    return;
  }

  const userId = data.user.id;
  const token = data.session.access_token;
  console.log('User ID:', userId);

  const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
  const { error: sessionError } = await userSupabase.auth.setSession({
    access_token: token,
    refresh_token: ''
  });
  if (sessionError) {
    console.error('Session set error:', sessionError);
    return;
  }

  console.log('\n--- 1. Querying profiles table ---');
  let { data: profile, error: profError } = await userSupabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  console.log('Profile select results:', { profile, profError });

  if (profile) {
    console.log('Profile already exists! Deleting it to test insert...');
    const { error: delError } = await userSupabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    console.log('Profile delete results:', { delError });
  }

  console.log('\n--- 2. Trying standard INSERT ---');
  const defaultUsername = 'Insert Tester';
  const { data: newProfile, error: insertError } = await userSupabase
    .from('profiles')
    .insert({
      id: userId,
      email: testEmail,
      username: defaultUsername,
      name: defaultUsername,
      education_stage: 'college',
      onboarding_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();
  console.log('Profile insert results:', { newProfile, insertError });
};

test();
