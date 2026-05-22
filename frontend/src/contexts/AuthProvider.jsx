import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { authService } from '../services/authService';

const USER_STORAGE_KEY = 'curveurcareer_user';
const TOKEN_STORAGE_KEY = 'curveurcareer_token';

const readStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveSession = (user, token) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

const clearSession = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser());
  const [loading, setLoading] = useState(true);

  // ── INITIALIZATION ──────────────────────────────────────────
  React.useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const storedUser = readStoredUser();
      
      if (token && storedUser) {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
          const res = await fetch(`${API_URL}/api/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.user) {
              const freshUser = {
                uid: data.user.id || storedUser.uid,
                email: data.user.email,
                displayName: data.user.user_metadata?.username || data.user.profile?.username || storedUser.displayName,
                profile: data.user.profile || null
              };
              saveSession(freshUser, token);
              setUser(freshUser);
            }
          } else {
            // Session expired
            clearSession();
            setUser(null);
          }
        } catch (err) {
          console.warn('Auth check warning (possibly offline):', err);
        }
      } else {
        // No session stored
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // ── REFRESH PROFILE ─────────────────────────────────────────
  const refreshProfile = async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) return null;
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          const freshUser = {
            uid: data.user.id || user?.uid,
            email: data.user.email || user?.email,
            displayName: data.user.user_metadata?.username || data.user.profile?.username || user?.displayName,
            profile: data.user.profile || null
          };
          saveSession(freshUser, token);
          setUser(freshUser);
          return freshUser;
        }
      }
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    }
    return null;
  };

  // ── SIGNUP ──────────────────────────────────────────────────
  const signup = async (email, password, displayName) => {
    if (!email || !password) throw new Error('Email and password are required.');

    const data = await authService.signup(email, password, displayName);

    const newUser = {
      uid: data.user?.id || Date.now().toString(),
      email: data.user?.email || email,
      displayName: data.user?.user_metadata?.username || displayName || email.split('@')[0],
      profile: data.user?.profile || null
    };
    const token = data.session?.access_token || null;
    saveSession(newUser, token);
    setUser(newUser);
    return { user: newUser };
  };

  // ── LOGIN ───────────────────────────────────────────────────
  const login = async (email, password) => {
    if (!email || !password) throw new Error('Email and password are required.');

    const data = await authService.login(email, password);

    const loggedUser = {
      uid: data.user?.id || Date.now().toString(),
      email: data.user?.email || email,
      displayName: data.user?.user_metadata?.username || data.user?.user_metadata?.display_name || email.split('@')[0],
      profile: data.user?.profile || null
    };
    const token = data.session?.access_token || null;
    saveSession(loggedUser, token);
    setUser(loggedUser);
    return { user: loggedUser };
  };

  // ── GOOGLE LOGIN (simulated) ───────────────────────────────
  const loginWithGoogle = async () => {
    const email = window.prompt('Enter your Gmail address to sign in with Google:', 'you@gmail.com');
    if (email === null) throw new Error('Google sign-in cancelled.');

    const gmail = email.trim();
    if (!gmail || !gmail.includes('@')) throw new Error('Please enter a valid email address.');

    const name = gmail.split('@')[0];
    const googleUser = {
      uid: `google-${Date.now()}`,
      email: gmail,
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
      profile: {
        onboarding_completed: false
      }
    };
    saveSession(googleUser, null);
    setUser(googleUser);
    return { user: googleUser };
  };

  // ── LOGOUT ──────────────────────────────────────────────────
  const logout = async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    try {
      if (token) {
        await authService.logout(token);
      }
    } catch {
      // silent fail
    }
    clearSession();
    setUser(null);
    return { success: true };
  };

  const value = { user, signup, login, loginWithGoogle, logout, loading, refreshProfile };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
