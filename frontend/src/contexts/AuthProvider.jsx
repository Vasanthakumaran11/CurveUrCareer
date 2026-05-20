import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const API_BASE = 'http://localhost:5050/api/auth';
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
  const [loading, setLoading] = useState(false);

  // ── SIGNUP ──────────────────────────────────────────────────
  const signup = async (email, password, displayName) => {
    if (!email || !password) throw new Error('Email and password are required.');

    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Signup failed.');

      const newUser = {
        uid: data.user?.id || Date.now().toString(),
        email: data.user?.email || email,
        displayName: displayName || email.split('@')[0],
      };
      saveSession(newUser, data.session?.access_token || null);
      setUser(newUser);
      return { user: newUser };
    } catch (err) {
      // Fallback: local signup if backend unavailable
      if (err.message.includes('Failed to fetch')) {
        return _localSignup(email, password, displayName);
      }
      throw err;
    }
  };

  // ── LOGIN ───────────────────────────────────────────────────
  const login = async (email, password) => {
    if (!email || !password) throw new Error('Email and password are required.');

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Invalid email or password.');

      const loggedUser = {
        uid: data.user?.id || Date.now().toString(),
        email: data.user?.email || email,
        displayName: data.user?.user_metadata?.displayName || email.split('@')[0],
      };
      saveSession(loggedUser, data.session?.access_token || null);
      setUser(loggedUser);
      return { user: loggedUser };
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        return _localLogin(email, password);
      }
      throw err;
    }
  };

  // ── GOOGLE LOGIN (simulated prompt — no real OAuth without redirect) ──
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
        await fetch(`${API_BASE}/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (_) {
      // silent — still clear session locally
    }
    clearSession();
    setUser(null);
    return { success: true };
  };

  // ── LOCAL FALLBACKS (when backend is offline) ────────────────
  const _localSignup = (email, password, displayName) => {
    const USERS_KEY = 'curveurcareer_users';
    let users = [];
    try { users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch {}
    if (users.some((u) => u.email === email)) throw new Error('An account with this email already exists.');
    const newUser = { uid: Date.now().toString(), email, displayName: displayName || email.split('@')[0], password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const { password: _, ...safeUser } = newUser;
    saveSession(safeUser, null);
    setUser(safeUser);
    return { user: safeUser };
  };

  const _localLogin = (email, password) => {
    const USERS_KEY = 'curveurcareer_users';
    let users = [];
    try { users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch {}
    const matched = users.find((u) => u.email === email && u.password === password);
    if (!matched) throw new Error('Invalid email or password.');
    const { password: _, ...safeUser } = matched;
    saveSession(safeUser, null);
    setUser(safeUser);
    return { user: safeUser };
  };

  const value = { user, signup, login, loginWithGoogle, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
