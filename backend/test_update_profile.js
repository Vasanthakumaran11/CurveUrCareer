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
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  console.log('\n--- 1. Querying profiles table (maybeSingle) ---');
  let { data: profile, error: profError } = await userSupabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  console.log('Profile select results:', { profile, profError });

  console.log('\n--- 2. Upserting profile (self-healing) ---');
  const defaultUsername = 'Autonomous Verification Unit';
  const { data: newProfile, error: insertError } = await userSupabase
    .from('profiles')
    .upsert({
      id: userId,
      email: testEmail,
      username: defaultUsername,
      name: defaultUsername,
      education_stage: 'college',
      onboarding_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' })
    .select()
    .single();
  console.log('Profile upsert results:', { newProfile, insertError });

  console.log('\n--- 3. Updating profiles table ---');
  const { error: profileFinalError } = await userSupabase
    .from('profiles')
    .update({
      onboarding_completed: true,
      exploration_type: 'Structured Logical Observer',
      confidence_level: 'High Confidence',
      learning_behavior: 'Adaptive Learner',
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);
  console.log('Profile update results:', { profileFinalError });

  console.log('\n--- 4. Upserting discover_yourself_results table ---');
  const { error: resError } = await userSupabase
    .from('discover_yourself_results')
    .upsert({
      user_id: userId,
      top_strengths: ['Logical Reasoning'],
      detected_patterns: ['Pattern Solver'],
      recommended_pathways: ['Technology Systems'],
      skill_gaps: ['Creative Problem Solving'],
      personalized_summary: 'Test summary',
      completion_timestamp: new Date().toISOString()
    });
  console.log('Results upsert results:', { resError });
};

test();
