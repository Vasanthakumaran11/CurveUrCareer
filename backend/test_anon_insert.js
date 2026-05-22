import { supabase } from './config/supabase.js';

const test = async () => {
  const userId = 'eae743c8-09cb-4e36-9c36-939009b38c12';
  const testEmail = 'tester_443836@curveurcareer.com';
  
  console.log('\n--- Trying anon INSERT ---');
  const defaultUsername = 'Anon Tester';
  const { data: newProfile, error: insertError } = await supabase
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
