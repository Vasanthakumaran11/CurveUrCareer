import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const USER_STORAGE_KEY = 'curveurcareer_user';
const USERS_STORAGE_KEY = 'curveurcareer_users';

const readStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveStoredUser = (user) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const signup = async (email, password, displayName) => {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const users = getStoredUsers();
    if (users.some((stored) => stored.email === email)) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      uid: Date.now().toString(),
      email,
      displayName: displayName || email.split('@')[0],
      password
    };

    const nextUsers = [...users, newUser];
    saveStoredUsers(nextUsers);
    saveStoredUser(newUser);
    setUser(newUser);
    return { user: newUser };
  };

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const users = getStoredUsers();
    const matched = users.find((stored) => stored.email === email && stored.password === password);

    if (!matched) {
      throw new Error('Invalid email or password.');
    }

    saveStoredUser(matched);
    setUser(matched);
    return { user: matched };
  };

  const loginWithGoogle = async () => {
    const googleUser = {
      uid: `google-${Date.now()}`,
      email: 'google-user@example.com',
      displayName: 'Google User'
    };

    saveStoredUser(googleUser);
    setUser(googleUser);
    return { user: googleUser };
  };

  const logout = async () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    return { success: true };
  };

  const value = {
    user,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
