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

  console.log('\n--- Querying profiles table (maybeSingle) ---');
  try {
    const res = await userSupabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    console.log('Profile select results:', res);
  } catch (e) {
    console.error('Profile select exception:', e);
  }

  console.log('\n--- Querying user_interests table ---');
  try {
    const res = await userSupabase
      .from('user_interests')
      .select('interest, interaction_strength')
      .eq('user_id', userId);
    console.log('Interests select results:', res);
  } catch (e) {
    console.error('Interests select exception:', e);
  }

  console.log('\n--- Querying behavior_profile table (single) ---');
  try {
    const res = await userSupabase
      .from('behavior_profile')
      .select('*')
      .eq('user_id', userId)
      .single();
    console.log('Behavior select results:', res);
  } catch (e) {
    console.error('Behavior select exception:', e);
  }

  console.log('\n--- Upserting discover_yourself_results table ---');
  try {
    const res = await userSupabase
      .from('discover_yourself_results')
      .upsert({
        user_id: userId,
        top_strengths: ['Logical Reasoning', 'Analytical Thinking'],
        detected_patterns: ['Pattern Solver'],
        recommended_pathways: ['Technology Systems'],
        skill_gaps: ['Creative Problem Solving'],
        personalized_summary: 'Test summary',
        completion_timestamp: new Date().toISOString()
      });
    console.log('Results upsert results:', res);
  } catch (e) {
    console.error('Results upsert exception:', e);
  }
};

test();
