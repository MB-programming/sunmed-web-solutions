import Axios from "../Axios";

/**
 * Authentication Service for Sanctum
 */
export const authService = {
  // Initialize CSRF cookie
  getCsrfCookie: async () => {
    try {
      await Axios.get('https://sunwebsolution.com/sanctum/csrf-cookie');
    } catch (error) {
      console.error('Failed to get CSRF cookie:', error);
      throw error;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      // First get CSRF cookie
      await authService.getCsrfCookie();

      const response = await Axios.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await Axios.post('/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  getUser: async () => {
    try {
      const response = await Axios.get('/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      await authService.getCsrfCookie();

      const response = await Axios.post('/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
