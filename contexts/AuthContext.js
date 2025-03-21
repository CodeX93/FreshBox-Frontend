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
  const signup = async (email, password, name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, { email, password, name }, { withCredentials: true });
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

  // Verify Phone OTP
  const verifyPhoneOtp = async (phoneNumber, otp, verificationId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/phone/verify-otp`, 
        { phoneNumber, otp, verificationId }, 
        { withCredentials: true }
      );
      setUser(response.data.user);
      return response.data;
    } catch (error) {
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
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};