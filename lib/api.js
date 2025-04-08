// api.js - Update your API service with the correct endpoint paths

// API base URL
const API_BASE_URL = '/api'; // Adjust if needed

// Create axios instance with base URL and auth token handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for sending cookies with the request
});

// Add token to every request if it exists
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// User Profile API Services
export const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    try {
      // Use the correct path that matches your server routes
      const res = await api.get('/profile/me');
      console.log('API response:', res.data);
      return res.data;
    } catch (err) {
      console.error('API error:', err);
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Update user profile
  updateProfile: async (userId, userData) => {
    try {
      const res = await api.put(`/profile/${userId}`, userData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Update user password
  updatePassword: async (userId, passwordData) => {
    try {
      const res = await api.put(`/profile/${userId}/password`, passwordData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Upload profile picture
  uploadProfilePicture: async (userId, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', imageFile);
      
      const res = await api.put(`/profile/${userId}/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return res.data;
    } catch (err) {
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Add or update payment method
  updatePaymentMethod: async (userId, paymentData) => {
    try {
      const res = await api.put(`/profile/${userId}/payment-methods`, paymentData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Delete payment method
  deletePaymentMethod: async (userId, methodId) => {
    try {
      const res = await api.delete(`/profile/${userId}/payment-methods/${methodId}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Get user orders (placeholder)
  getUserOrders: async (userId) => {
    try {
      const res = await api.get(`/orders/user/${userId}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  }
};

export default userService;