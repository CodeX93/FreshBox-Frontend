// auth.js - Authentication Context and Provider
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define the base URL for all API calls
const API_BASE_URL = 'http://localhost:5023';

// Create Authentication Context
const AuthContext = createContext({});
console.log(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when component mounts
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/user`, { withCredentials: true });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Email/Password Registration
  const signup = async (email, password, name, username = '', phoneNumber = '') => {
    try {
      const userData = { 
        email, 
        password, 
        name 
      };
      
      // Add optional fields if provided
      if (username) userData.username = username;
      if (phoneNumber) userData.phoneNumber = phoneNumber;
      
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signup`, 
        userData, 
        { withCredentials: true }
      );
      
      setUser(response.data.user);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Email/Password Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password }, { withCredentials: true });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Google Authentication
  const googleSignIn = async () => {
    window.location.href = `${API_BASE_URL}/api/auth/google`;
    // The redirect will happen, and after successful authentication,
    // the user will be redirected back to the application
  };

  // Facebook Authentication
  const facebookSignIn = async () => {
    window.location.href = `${API_BASE_URL}/api/auth/facebook`;
  };

  // Apple Authentication
  const appleSignIn = async () => {
    window.location.href = `${API_BASE_URL}/api/auth/apple`;
  };

  // Phone Number Authentication
  const phoneSignIn = async (phoneNumber) => {
    try {
      // Step 1: Request OTP
      const response = await axios.post(`${API_BASE_URL}/api/auth/phone/request-otp`, { phoneNumber });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Step 1: Only verify OTP without login or redirect
  const verifyOtpOnly = async (phoneNumber, otp, verificationId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/phone/verify-otp`,
        { phoneNumber, otp, verificationId, skipLogin: true },
        { withCredentials: true }
      );
      
      console.log('OTP verification only response:', response.data);
      return response.data;
    } catch (error) {
      console.error('OTP verification error:', error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  // Step 2: Complete registration with name and login
  const completePhoneRegistration = async (phoneNumber, otp, verificationId, name) => {
    try {
      if (!name || !name.trim()) {
        throw new Error('Name is required to complete registration');
      }
      
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/phone/complete-registration`,
        { 
          phoneNumber, 
          otp, 
          verificationId, 
          name: name.trim() 
        },
        { withCredentials: true }
      );
      
      console.log('Registration completion response:', response.data);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Registration completion error:', error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  // Original verifyPhoneOtp (kept for backward compatibility)
  const verifyPhoneOtp = async (phoneNumber, otp, verificationId, name = '') => {
    try {
      // Include name in the request if provided
      const requestData = { phoneNumber, otp, verificationId };
      if (name && name.trim() !== '') {
        requestData.name = name.trim();
      }
      
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/phone/verify-otp`,
        requestData,
        { withCredentials: true }
      );
      
      console.log('OTP verification response:', response.data);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('OTP verification error:', error.response?.data || error);
      throw error.response?.data || error;
    }
  };



  // Request email verification OTP
const requestEmailOtp = async (email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/email/request-otp`,
      { email },
      { withCredentials: true }
    );
    
    console.log('Email OTP request response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Email OTP request error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

// Verify email OTP
const verifyEmailOtp = async (email, otp, verificationId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/email/verify-otp`,
      { email, otp, verificationId },
      { withCredentials: true }
    );
    
    console.log('Email OTP verification response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Email OTP verification error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};



  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    signup,
    login,
    logout,
    googleSignIn,
    facebookSignIn,
    appleSignIn,
    phoneSignIn,
    verifyPhoneOtp,
    verifyOtpOnly,      
    requestEmailOtp,
    verifyEmailOtp,
    completePhoneRegistration, // New function for second step with name
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Add this code to your Profile component to enhance API error handling

// Update your API service setup with credentials
const api = axios.create({
  baseURL: 'http://localhost:5023/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // ESSENTIAL for sending cookies with the request
  timeout: 10000 // Add a timeout to prevent hanging requests
});

// Enhanced loadUserData function with better error handling
const loadUserData = async () => {
  try {
    setIsLoading(true);
    
    console.log('Current user from context:', user);
    console.log('Making API request to:', `${api.defaults.baseURL}/users/me`);
    
    // Add debugging headers to request
    const userData = await api.get('/users/me', { 
      headers: {
        'x-requested-with': 'XMLHttpRequest',
        'x-debug': 'true'
      },
      withCredentials: true // Ensure credentials go with request
    });
    
    console.log('API response:', userData);
    console.log('API response data:', userData.data);
    
    setProfile({
      name: userData.data.name || '',
      email: userData.data.email || '',
      phone: userData.data.phoneNumber || '',
      address: userData.data.address || '',
      profileImage: userData.data.profilePicture || '',
      preferences: userData.data.preferences || {
        detergent: 'sensitive',
        temperature: 'warm',
        folding: 'hanging',
        notifications: true,
        emailUpdates: true
      },
      paymentMethods: userData.data.paymentMethods || []
    });
    
    // Optional: load user orders (commented out for now to focus on profile)
    /*
    try {
      const ordersData = await userService.getUserOrders(userData.data._id);
      if (ordersData && ordersData.length > 0) {
        setRecentOrders(ordersData);
      }
    } catch (orderError) {
      console.error('Error loading orders:', orderError);
      // Keep default orders if API fails
    }
    */
    
  } catch (error) {
    console.error('Error loading user data:', error);
    
    // Detailed error logging
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      } : 'No response',
      request: error.request ? 'Request was made but no response received' : 'No request was made'
    };
    
    console.error('Detailed error:', JSON.stringify(errorDetails, null, 2));
    
    // Check for specific error types
    let errorMessage = 'Failed to load profile data';
    
    if (error.response) {
      // Server responded with an error status code
      if (error.response.status === 401) {
        errorMessage = 'Your session has expired. Please log in again.';
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else if (error.response.status === 404) {
        errorMessage = 'Profile not found. Please complete your registration.';
      } else {
        errorMessage = `Server error: ${error.response.status} ${error.response.statusText}`;
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server. Please check your connection.';
    } else {
      // Something else caused the error
      errorMessage = `Error: ${error.message}`;
    }
    
    setSnackbar({ 
      open: true, 
      message: errorMessage, 
      severity: 'error' 
    });
  } finally {
    setIsLoading(false);
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};