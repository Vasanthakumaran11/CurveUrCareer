const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
const AUTH_API = `${API_URL}/api/auth`;

/**
 * Authentication Service layer
 * Handles API calls to backend endpoints
 */
export const authService = {
  /**
   * Registers a new user
   * @param {string} email 
   * @param {string} password 
   * @param {string} displayName 
   * @returns {Promise<object>}
   */
  signup: async (email, password, displayName) => {
    const res = await fetch(`${AUTH_API}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, displayName }),
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Signup failed.');
    }
    return data;
  },

  /**
   * Logs in a user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<object>}
   */
  login: async (email, password) => {
    const res = await fetch(`${AUTH_API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid email or password.');
    }
    return data;
  },

  /**
   * Logs out the user on the backend
   * @param {string} token 
   * @returns {Promise<object>}
   */
  logout: async (token) => {
    if (!token) return { success: true };
    
    const res = await fetch(`${AUTH_API}/logout`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
    });

    if (!res.ok) {
      // Even if server logout fails or is offline, we handle it gracefully
      console.warn('Backend logout failed, proceeding with local cleanup');
    }
    return { success: true };
  }
};
