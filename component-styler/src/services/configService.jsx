/**
 * Configuration API Service
 * Handles all API calls for configuration CRUD operations with JWT authentication
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Store token in sessionStorage (expires when browser closes)
const TOKEN_KEY = 'app-jwt-token';
const TOKEN_EXPIRY_KEY = 'app-jwt-expiry';
const USER_KEY = 'app-user';

/**
 * Register a new user
 * @param {string} username - Username (min 3 chars)
 * @param {string} email - Email address
 * @param {string} password - Password (min 6 chars)
 * @returns {Promise<{id: string, username: string, email: string, role: string}>}
 */
export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Login user and get JWT token
 * @param {string} username - Username or email
 * @param {string} password - Password
 * @returns {Promise<{token: string, expiresIn: string, user: object}>}
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();

    // Store token with expiry
    sessionStorage.setItem(TOKEN_KEY, data.token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(data.user));

    // Parse expiry time (e.g., "1m" = 60 seconds)
    const expiryMs = parseExpiryToMs(data.expiresIn);
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, Date.now() + expiryMs);

    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Get current user profile
 * @returns {Promise<object>}
 */
export const getCurrentUser = async () => {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Token is invalid, clear storage
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
      sessionStorage.removeItem(USER_KEY);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
  sessionStorage.removeItem(USER_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);

  if (!token || !expiry) {
    return false;
  }

  // Check if token is still valid
  return Date.now() < parseInt(expiry);
};

/**
 * Get stored user info
 */
export const getStoredUser = () => {
  const user = sessionStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Convert expiry string (e.g., "1m", "60s") to milliseconds
 * @param {string} expiryStr - Expiry string from JWT response
 * @returns {number}
 */
const parseExpiryToMs = (expiryStr) => {
  if (!expiryStr) return 60000; // Default 1 minute
  
  const match = expiryStr.match(/(\d+)([smhd])/i);
  if (!match) return 60000;

  const [, value, unit] = match;
  const num = parseInt(value);

  switch (unit.toLowerCase()) {
    case 's': return num * 1000;
    case 'm': return num * 60 * 1000;
    case 'h': return num * 60 * 60 * 1000;
    case 'd': return num * 24 * 60 * 60 * 1000;
    default: return 60000;
  }
};

/**
 * Get valid token from storage
 * @returns {string|null}
 */
const getValidToken = () => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);

  // Check if token exists and is still valid
  if (token && expiry && Date.now() < parseInt(expiry)) {
    return token;
  }

  return null;
};

/**
 * Get all configurations with pagination
 * @param {number} skip - Number of items to skip
 * @param {number} limit - Number of items to return
 * @returns {Promise<Array>}
 */
export const getConfigurations = async (skip = 0, limit = 100) => {
  try {
    const token = getValidToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(
      `${API_BASE_URL}/configs?skip=${skip}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch configurations: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching configurations:', error);
    throw error;
  }
};

/**
 * Get a single configuration by ID
 * @param {string} id - Configuration ID
 * @returns {Promise<Object>}
 */
export const getConfiguration = async (id) => {
  try {
    const token = getValidToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/configs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch configuration: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching configuration:', error);
    throw error;
  }
};

/**
 * Create a new configuration
 * @param {Object} config - Configuration object
 * @returns {Promise<Object>}
 */
export const createConfiguration = async (config) => {
  try {
    const token = getValidToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/configs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error(`Failed to create configuration: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating configuration:', error);
    throw error;
  }
};

/**
 * Update a configuration
 * @param {string} id - Configuration ID
 * @param {Object} updates - Updated configuration fields
 * @returns {Promise<Object>}
 */
export const updateConfiguration = async (id, updates) => {
  try {
    const token = getValidToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/configs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update configuration: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating configuration:', error);
    throw error;
  }
};

/**
 * Delete a configuration
 * @param {string} id - Configuration ID
 * @returns {Promise<void>}
 */
export const deleteConfiguration = async (id) => {
  try {
    const token = getValidToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/configs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete configuration: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting configuration:', error);
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  isAuthenticated,
  getStoredUser,
  getConfigurations,
  getConfiguration,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration,
};
