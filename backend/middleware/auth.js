import { supabase } from '../config/supabase.js';

/**
 * Authentication Middleware
 * Intercepts Bearer tokens and validates them with Supabase Identity Service
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: 'Authorization header is missing or malformed (expected Bearer token)' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Request verification directly from Supabase Authentication
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid or expired session token',
        details: error?.message || 'User context not found'
      });
    }

    // Attach authenticated user payload to request context
    req.user = user;
    next();
  } catch (err) {
    console.error('Middleware Auth Error:', err);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error during session validation' 
    });
  }
};
