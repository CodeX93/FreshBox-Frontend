// services/userService.js
import axios from 'axios';

// Create API Service
const api = axios.create({
  baseURL: 'http://localhost:5023/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // For sending cookies with the request
  timeout: 15000 // Increased timeout to prevent hanging requests
});

// Add token to every request if it exists
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
      console.log('Adding token to request:', token.substring(0, 15) + '...');
    }
    
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error tracking
api.interceptors.response.use(
  response => {
    console.log(`Response from ${response.config.url}:`, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
    return response;
  },
  error => {
    console.error('Response error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// User service functions
export const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    try {
      console.log('Making API request to /users/me');
      const res = await api.get('/users/me');
      console.log('API response success:', res.data);
      return res.data;
    } catch (err) {
      console.error('getCurrentUser error:', err);
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Update user profile
  updateProfile: async (userId, userData) => {
    try {
      console.log(`Updating profile for user ${userId}:`, userData);
      const res = await api.put(`/users/${userId}`, userData);
      console.log('Update profile response:', res.data);
      return res.data;
    } catch (err) {
      console.error('updateProfile error:', err);
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Update user password
  updatePassword: async (userId, passwordData) => {
    try {
      console.log(`Updating password for user ${userId}`);
      const res = await api.put(`/users/${userId}/password`, passwordData);
      return res.data;
    } catch (err) {
      console.error('updatePassword error:', err);
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Upload profile picture
  uploadProfilePicture: async (userId, imageFile) => {
    try {
      console.log(`Uploading profile picture for user ${userId}`);
      const formData = new FormData();
      formData.append('profilePicture', imageFile);
      
      const res = await api.put(`/users/${userId}/profile-picture`, formData, {
        headers: {
          // Let the browser set the Content-Type with boundary
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Upload response:', res.data);
      return res.data;
    } catch (err) {
      console.error('uploadProfilePicture error:', err);
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Add or update payment method
  updatePaymentMethod: async (userId, paymentData) => {
    try {
      console.log(`Updating payment method for user ${userId}:`, paymentData);
      const res = await api.put(`/users/${userId}/payment-methods`, paymentData);
      return res.data;
    } catch (err) {
      console.error('updatePaymentMethod error:', err);
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Delete payment method
  deletePaymentMethod: async (userId, methodId) => {
    try {
      console.log(`Deleting payment method ${methodId} for user ${userId}`);
      const res = await api.delete(`/users/${userId}/payment-methods/${methodId}`);
      return res.data;
    } catch (err) {
      console.error('deletePaymentMethod error:', err);
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  },
  
  // Get user orders
  getUserOrders: async (userId) => {
    try {
      console.log(`Getting orders for user ${userId}`);
      const res = await api.get(`/orders/user/${userId}`);
      return res.data;
    } catch (err) {
      console.error('getUserOrders error:', err);
      throw err.response?.data || { msg: 'Error connecting to server' };
    }
  }
};

export default userService;