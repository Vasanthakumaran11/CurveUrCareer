import { supabase } from '../config/supabase.js';
import { fallbackCache } from '../config/inMemoryCache.js';

/**
 * Register a new user with Supabase Auth
 * Stores: email + password in Supabase Auth  
 * Stores: username (displayName) in user_metadata + profiles table
 * POST /api/auth/signup
 */
export const signup = async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required fields'
    });
  }

  const username = displayName || email.split('@')[0];

  try {
    // 1. Create user in Supabase Auth (stores email + hashed password)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          display_name: username
        }
      }
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    // Supabase may return user=null when email confirmation is enabled
    // but the user IS created. We build a response either way.
    const userId = data.user?.id || null;
    const userEmail = data.user?.email || email;

    // 2. Insert a row into the public "profiles" table
    let profile = null;
    if (userId) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          username: username,
          email: userEmail,
          created_at: new Date().toISOString()
        }, { onConflict: 'id' })
        .select()
        .single();

      if (profileError) {
        console.warn('Profile insert warning (non-fatal):', profileError.message);
      } else {
        profile = profileData;
      }
    }

    // 3. If email confirmation is enabled, user/session will be null
    //    but signup still succeeded. Try auto-login to get a session.
    let session = data.session;
    let userData = data.user;

    if (!session && !error) {
      // Try to immediately sign in (works if email confirmation is disabled)
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (!loginError && loginData.session) {
        session = loginData.session;
        userData = loginData.user;
      }
    }

    return res.status(201).json({
      success: true,
      message: session 
        ? 'Signup successful! User stored in Supabase.' 
        : 'Signup successful! Please check your email to confirm your account, or you can log in directly.',
      user: userData 
        ? { ...userData, profile }
        : { id: userId, email: userEmail, user_metadata: { username, display_name: username }, profile },
      session: session || null,
      needsConfirmation: !session
    });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({ success: false, error: 'Server registration failure' });
  }
};

/**
 * Authenticate existing user with Supabase Auth
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required fields'
    });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ success: false, error: error.message });
    }

    // Fetch extended public profile data
    let profile = null;
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();
      profile = profileData || fallbackCache.getProfile(data.user.id);
    } catch (e) {
      console.warn('Failed to load profile on login:', e.message);
      profile = fallbackCache.getProfile(data.user.id);
    }

    // Ensure cache has at least a default profile
    if (!profile) {
      const defaultUsername = data.user.user_metadata?.username || data.user.email?.split('@')[0] || 'Explorer';
      profile = fallbackCache.setProfile(data.user.id, {
        id: data.user.id,
        email: data.user.email,
        username: defaultUsername,
        name: defaultUsername,
        education_stage: 'college',
        onboarding_completed: false
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      session: data.session,
      user: {
        ...data.user,
        profile: profile
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ success: false, error: 'Server authentication failure' });
  }
};

/**
 * Sign out and invalidate session on Supabase
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (err) {
    console.error('Logout Error:', err);
    return res.status(500).json({ success: false, error: 'Server logout failure' });
  }
};

/**
 * Retrieve current user profile (JWT protected)
 * GET /api/auth/profile
 */
export const getProfile = async (req, res) => {
  try {
    const { data: profile, error } = await req.supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .maybeSingle();

    const cachedProfile = fallbackCache.getProfile(req.user.id);
    const finalProfile = profile || cachedProfile || null;

    return res.status(200).json({
      success: true,
      user: {
        ...req.user,
        profile: finalProfile
      }
    });
  } catch (err) {
    console.error('Get profile error:', err);
    const cachedProfile = fallbackCache.getProfile(req.user.id);
    return res.status(200).json({
      success: true,
      user: {
        ...req.user,
        profile: cachedProfile || null
      }
    });
  }
};
