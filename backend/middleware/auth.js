import { createClient } from '@supabase/supabase-js';
import { supabase } from '../config/supabase.js';
import { fallbackCache } from '../config/inMemoryCache.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

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

    // Attach request-scoped Supabase client with user's JWT
    req.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });

    // Auto-ensure public.profiles row exists (self-healing for profiles table)
    let profileFound = false;
    try {
      const { data: existingProfile, error: selectError } = await req.supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!selectError && existingProfile) {
        profileFound = true;
        // Seed the in-memory cache with the actual DB state
        fallbackCache.setProfile(user.id, existingProfile);
      } else {
        const defaultUsername = user.user_metadata?.username || user.email.split('@')[0] || 'Explorer';
        const { data: createdProfile, error: upsertError } = await req.supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            username: defaultUsername,
            created_at: new Date().toISOString()
          }, { onConflict: 'id' })
          .select()
          .single();
        
        if (!upsertError && createdProfile) {
          profileFound = true;
          fallbackCache.setProfile(user.id, createdProfile);
          console.log(`💡 Public profile auto-created for user ID: ${user.id}`);
        } else {
          console.warn('Upsert profile failed (RLS blocked), initializing cache fallback.');
        }
      }
    } catch (err) {
      console.warn('Profile auto-ensure warning (non-fatal):', err.message);
    }

    // Always ensure profile cache has AT LEAST a default entry
    if (!fallbackCache.getProfile(user.id)) {
      const defaultUsername = user.user_metadata?.username || user.email.split('@')[0] || 'Explorer';
      fallbackCache.setProfile(user.id, {
        id: user.id,
        email: user.email,
        username: defaultUsername,
        name: defaultUsername,
        education_stage: 'college',
        onboarding_completed: false
      });
    }

    next();
  } catch (err) {
    console.error('Middleware Auth Error:', err);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error during session validation' 
    });
  }
};
