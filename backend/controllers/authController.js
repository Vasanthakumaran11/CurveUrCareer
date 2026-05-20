import { supabase } from '../config/supabase.js';

/**
 * Register a new user with Supabase Auth
 * POST /api/auth/signup
 */
export const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required fields'
    });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(201).json({
      success: true,
      message: 'Signup successful. Your credentials are stored in Supabase Auth.',
      user: data.user
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

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      session: data.session,
      user: data.user
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
    // Intercept Bearer Token to tell Supabase which session is logging out
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      // Set the session context for the Supabase instance
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: ''
      });
    }

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
  // req.user has already been populated by requireAuth middleware
  return res.status(200).json({
    success: true,
    user: req.user
  });
};
