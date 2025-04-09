'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import {
  Box,
  Avatar,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Divider,
  Tab,
  Tabs,
  IconButton,
  Chip,
  Tooltip,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';

import {
  User,
  Settings,
  MapPin,
  Mail,
  Phone,
  Edit,
  CreditCard,
  Bell,
  Shield,
  History,
  Upload,
  Save,
  Check,
  X,
  Clock,
  Calendar,
  Truck,
  Star,
  ChevronRight
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

// API Service
const api = axios.create({
  baseURL: 'http://localhost:5023/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // ESSENTIAL for sending cookies with the request
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
const userService = {
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
          // Don't set Content-Type here, let the browser set it with boundary
          'Content-Type': undefined
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const RecentOrderCard = ({ order }) => {
  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>Order #{order.id}</Typography>
          <Chip 
            label={order.status} 
            size="small" 
            color={
              order.status === 'Delivered' ? '#BDF4E3' : 
              order.status === 'In Progress' ? 'primary' : 
              'secondary'
            }
            sx={{ borderRadius: 1 }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
          <Calendar size={14} style={{ marginRight: 6 }} />
          <Typography variant="body2">{order.date}</Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 14, my: 'auto' }} />
          <Clock size={14} style={{ marginRight: 6 }} />
          <Typography variant="body2">{order.time}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
          <Truck size={14} style={{ marginRight: 6 }} />
          <Typography variant="body2">{order.type}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" fontWeight={600} color="primary.main">
            ${order.total}
          </Typography>
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Star size={14} style={{ marginRight: 4 }} color="#FFD700" />
            <Typography variant="body2" sx={{ mr: 1 }}>Rate Order</Typography>
          </Box>
          <Button 
            size="small" 
            endIcon={<ChevronRight size={16} />}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600, 
              color: '#2E7B5C'
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function Profile() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const previousImageUrl = useRef('');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: '', // URL to profile image if available
    preferences: {
      detergent: 'sensitive',
      temperature: 'warm',
      folding: 'hanging',
      notifications: true,
      emailUpdates: true
    },
    paymentMethods: []
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: '8752', status: 'Delivered', date: 'Mar 15, 2025', time: '2:30 PM', type: 'Wash & Fold', total: '32.99' },
    { id: '8741', status: 'In Progress', date: 'Mar 8, 2025', time: '11:45 AM', type: 'Dry Cleaning', total: '48.50' },
    { id: '8726', status: 'Delivered', date: 'Feb 28, 2025', time: '9:15 AM', type: 'Wash & Fold', total: '29.99' }
  ]);
  const processImageUrl = (url) => {
    if (!url) return '';
    
    // If it's already an absolute URL or data URL, return as is
    if (url.startsWith('http') || url.startsWith('data:')) {
      return url;
    }
    
    // Make sure the URL starts with a slash if needed
    const normalizedPath = url.startsWith('/') ? url : `/${url}`;
    
    // Construct the full URL 
    // Remove any potential double slashes
    return `${api.defaults.baseURL.replace(/\/$/, '')}${normalizedPath}`;
  };
  
  // Attempt to load token from localStorage at start
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      console.log('No token found in localStorage');
    } else {
      console.log('Token found in localStorage:', savedToken.substring(0, 15) + '...');
    }
  }, []);
  useEffect(() => {
    if (profile.profileImage && profile.profileImage !== previousImageUrl.current) {
      console.log('Profile image URL changed:', profile.profileImage);
      previousImageUrl.current = profile.profileImage;
      
      // Optional URL check
      fetch(profile.profileImage, { method: 'HEAD' })
        .then(response => {
          console.log('Image URL check:', response.status, response.ok ? 'accessible' : 'not accessible');
        })
        .catch(error => {
          console.error('Failed to check image URL:', error);
        });
    }
  }, [profile.profileImage]);
  
  // Load user data
  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Make sure we have a token to access protected routes
      const token = localStorage.getItem('token');
      
      if (!token && (!user || !user.id)) {
        console.error('No token or user available, authentication may fail');
      }
      
      console.log('Making API request to:', `${api.defaults.baseURL}/users/me`);
      
      const userData = await userService.getCurrentUser();
      
      console.log('API response data:', userData);
      
      setProfile({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phoneNumber || '',
        address: userData.address || '',
        profileImage: userData.profilePicture || '',
        preferences: userData.preferences || {
          detergent: 'sensitive',
          temperature: 'warm',
          folding: 'hanging',
          notifications: true,
          emailUpdates: true
        },
        paymentMethods: userData.paymentMethods || []
      });
      
    } catch (error) {
      
        console.error('Error loading user data:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data
          } : 'No response',
          request: error.request ? 'Request was made but no response received' : 'No request'
        });
        
        const errorMessage = error.response?.status === 401
          ? 'Your session has expired. Please log in again.'
          : `Failed to load profile data: ${error.message || 'Network error'}`;
        
        setSnackbar({ 
          open: true, 
          message: errorMessage, 
          severity: 'error' 
        });
        
        // Redirect to login on 401 Unauthorized
        if (error.response?.status === 401) {
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        }
      
      // Rest of error handling remains the same
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (!user) {
      console.log('No user found in context, redirecting to login');
      router.push('/auth/login');
    } else {
      console.log('User found in context:', user);
      
      // Check if user has an ID
      if (!user.id) {
        console.error('User object is missing id property:', user);
      }
      
      // Initialize with user context data (only on first render)
      setProfile(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phoneNumber || prev.phone
      }));
      
      // Then load full profile from API
      loadUserData();
    }
  }, [user, router]); // Only depends on user and router

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Map profile state to the expected API format
      const userData = {
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phone,
        address: profile.address,
        preferences: profile.preferences
      };
      
      const result = await userService.updateProfile(user.id, userData);
      
      setSnackbar({ 
        open: true, 
        message: 'Profile updated successfully!', 
        severity: 'success' 
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      
      // Handle 401 errors by redirecting to login
      if (error.response?.status === 401) {
        setSnackbar({
          open: true,
          message: 'Your session has expired. Please log in again.',
          severity: 'error'
        });
        
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
        return;
      }
      
      setSnackbar({ 
        open: true, 
        message: error.msg || 'Failed to update profile', 
        severity: 'error' 
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  // Handle profile picture upload
  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      // Create a temporary local URL for preview before the upload completes
      const localPreviewUrl = URL.createObjectURL(file);
      
      // Update local state immediately to show a preview
      setProfile({
        ...profile,
        profileImage: localPreviewUrl // Show local preview immediately
      });
      
      // Display loading status
      setSnackbar({
        open: true,
        message: 'Uploading profile picture...',
        severity: 'info'
      });
      
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      // Send to server
      const result = await userService.uploadProfilePicture(user.id, file);
      
      // Update with the server URL when it returns
      setProfile(prev => ({
        ...prev,
        profileImage: result.profilePicture
      }));
      
      setSnackbar({
        open: true,
        message: 'Profile picture updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      
      // Revert to previous image on error
      loadUserData(); // Reload profile data to restore previous image
      
      setSnackbar({
        open: true,
        message: error.msg || 'Failed to upload profile picture',
        severity: 'error'
      });
    }
  };

  // Handle adding/updating payment method
  const handlePaymentMethodUpdate = async (paymentData) => {
    try {
      const result = await userService.updatePaymentMethod(user.id, paymentData);
      
      // Update local state with the updated payment methods
      setProfile({
        ...profile,
        paymentMethods: result.paymentMethods
      });
      
      setSnackbar({
        open: true,
        message: 'Payment method updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating payment method:', error);
      setSnackbar({
        open: true,
        message: error.msg || 'Failed to update payment method',
        severity: 'error'
      });
    }
  };

  // Handle payment method deletion
  const handlePaymentMethodDelete = async (methodId) => {
    try {
      await userService.deletePaymentMethod(user.id, methodId);
      
      // Update local state
      setProfile({
        ...profile,
        paymentMethods: profile.paymentMethods.filter(method => method.id !== methodId)
      });
      
      setSnackbar({
        open: true,
        message: 'Payment method removed successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting payment method:', error);
      setSnackbar({
        open: true,
        message: error.msg || 'Failed to delete payment method',
        severity: 'error'
      });
    }
  };
  
  // Handle password update
  const handlePasswordUpdate = async (passwordData) => {
    try {
      await userService.updatePassword(user.id, passwordData);
      
      setSnackbar({
        open: true,
        message: 'Password updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating password:', error);
      setSnackbar({
        open: true,
        message: error.msg || 'Failed to update password',
        severity: 'error'
      });
    }
  };

  // Function to add a new payment method
  const handleAddPaymentMethod = () => {
    // Open a modal or form to collect payment information
    // This would be implemented based on your UI design
    // For this example, we'll simulate adding a new card
    
    const newPayment = {
      type: 'Mastercard', 
      last4: '9876',
      expiry: '12/27',
      isDefault: profile.paymentMethods.length === 0 // Default if first card
    };
    
    handlePaymentMethodUpdate(newPayment);
  };

  // Function to retry loading user data
  const handleRetryLoad = () => {
    setSnackbar({
      open: true,
      message: 'Retrying to load profile data...',
      severity: 'info'
    });
    loadUserData();
  };

  return (
    <>
    <Navbar />
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f8f9fb', 
      pt: 10,
      pb: 6
    }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box sx={{ maxWidth: '1100px', mx: 'auto', px: { xs: 2, md: 3 } }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress sx={{ color: '#2E7B5C' }} />
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3}>
              {/* Profile Header */}
              <Grid item xs={12}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 3, 
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    position: 'relative',
                    mb: 3
                  }}
                >
                  {/* Cover background */}
                  <Box 
                    sx={{ 
                      height: '120px', 
                      bgcolor: '#2E7B5C',
                      backgroundImage: 'linear-gradient(120deg, #2E7B5C 0%, #2E7B5C 100%)',
                      position: 'relative'
                    }}
                  />
                  
                  <Box sx={{ 
                    p: { xs: 2, md: 3 },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'flex-end' },
                    position: 'relative',
                    mt: { xs: -6, md: -8 }
                  }}>
                    <Box sx={{ position: 'relative' }}>
                    <Avatar 
  src={processImageUrl(profile.profileImage)}
  alt={profile.name || "User"}
  sx={{ 
    width: { xs: 100, md: 120 }, 
    height: { xs: 100, md: 120 },
    border: '4px solid white',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    bgcolor: '#2E7B5C',
    fontSize: { xs: '2.5rem', md: '3rem' }
  }}
  imgProps={{
    onError: (e) => {
      console.error('Image failed to load:', profile.profileImage);
      e.target.onerror = null; // Prevent infinite error loop
      e.target.src = ''; // Clear the source to show the fallback
    }
  }}
>
  {profile.name ? profile.name.charAt(0) : "U"}
</Avatar>
                      
                      {isEditing && (
                        <Box
                          component="label"
                          htmlFor="profile-picture-upload"
                          sx={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5,
                            bgcolor: 'white',
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            cursor: 'pointer'
                          }}
                        >
                          <input
                            id="profile-picture-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleProfilePictureUpload}
                          />
                          <Edit size={16} color="#2E7B5C" />
                        </Box>
                      )}
                    </Box>
                    
                    <Box sx={{ 
                      ml: { xs: 0, md: 3 },
                      mt: { xs: 2, md: 0 },
                      textAlign: { xs: 'center', md: 'left' },
                      mb: { xs: 1, md: 0 }
                    }}>
                      <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                        {profile.name || "User"}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'center', sm: 'center' },
                        gap: { xs: 1, sm: 2 }
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                          <Mail size={16} style={{ marginRight: 6 }} />
                          <Typography variant="body2">{profile.email || "No email"}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                          <Phone size={16} style={{ marginRight: 6 }} />
                          <Typography variant="body2">{profile.phone || "No phone"}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ 
                      ml: { xs: 0, md: 'auto' }, 
                      mt: { xs: 2, md: 0 },
                      display: 'flex',
                      gap: 1
                    }}>
                      <Button 
                        variant="outlined" 
                        onClick={() => setIsEditing(!isEditing)}
                        startIcon={isEditing ? <X size={16} /> : <Edit size={16} />}
                        color={isEditing ? "error" : "primary"}
                        sx={{ 
                          borderRadius: 2,
                          textTransform: 'none',
                          color: isEditing ? 'error.main' : '#2E7B5C',
                          borderColor: isEditing ? 'error.main' : '#2E7B5C',
                          '&:hover': {
                            borderColor: isEditing ? 'error.dark' : '#2E7B5C',
                            bgcolor: isEditing ? 'rgba(211, 47, 47, 0.04)' : 'rgba(40, 221, 205, 0.04)'
                          }
                        }}
                      >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                      
                      {isEditing && (
                        <Button 
                          variant="contained" 
                          onClick={handleSubmit}
                          startIcon={<Save size={16} />}
                          sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            bgcolor: '#2E7B5C',
                            '&:hover': {
                              bgcolor: '#2E7B5C'
                            }
                          }}
                        >
                          Save Changes
                        </Button>
                      )}
                    </Box>
                  </Box>
                  
                  <Box sx={{ px: 2 }}>
                    <Tabs 
                      value={tabValue} 
                      onChange={handleTabChange}
                      variant={isMobile ? "scrollable" : "standard"}
                      scrollButtons={isMobile ? "auto" : false}
                      sx={{ 
                        '& .MuiTabs-indicator': {
                          backgroundColor: '#2E7B5C',
                        },
                        '& .MuiTab-root.Mui-selected': {
                          color: '#2E7B5C',
                        }
                      }}
                    >
                      <Tab 
                        label="Profile" 
                        icon={<User size={18} />} 
                        iconPosition="start"
                        sx={{ textTransform: 'none', minHeight: 64 }}
                      />
                      <Tab 
                        label="Preferences" 
                        icon={<Settings size={18} />} 
                        iconPosition="start"
                        sx={{ textTransform: 'none', minHeight: 64 }}
                      />
                      <Tab 
                        label="Orders" 
                        icon={<History size={18} />} 
                        iconPosition="start"
                        sx={{ textTransform: 'none', minHeight: 64 }}
                      />
                      <Tab 
                        label="Payment" 
                        icon={<CreditCard size={18} />} 
                        iconPosition="start"
                        sx={{ textTransform: 'none', minHeight: 64 }}
                      />
                    </Tabs>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 3, 
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                  }}
                >
                  <TabPanel value={tabValue} index={0}>
                    <Box component="form" onSubmit={handleSubmit}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                        Personal Information
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            disabled={!isEditing}
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            disabled={!isEditing}
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            disabled={!isEditing}
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Address"
                            value={profile.address}
                            multiline
                            rows={3}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            disabled={!isEditing}
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        </Grid>
                        
                        {isEditing && (
                          <Grid item xs={12}>
                            <Box sx={{ 
                              display: 'flex', 
                              justifyContent: 'flex-end', 
                              mt: 2 
                            }}>
                              <Button 
                                type="submit" 
                                variant="contained" 
                                sx={{ 
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  bgcolor: '#2E7B5C',
                                  '&:hover': {
                                    bgcolor: '#2E7B5C'
                                  }
                                }}
                              >
                                Save Changes
                              </Button>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={1}>
                    <Box component="form" onSubmit={handleSubmit}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                        Laundry Preferences
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <InputLabel>Detergent Type</InputLabel>
                            <Select
                              value={profile.preferences?.detergent || 'sensitive'}
                              label="Detergent Type"
                              disabled={!isEditing}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  preferences: {
                                    ...profile.preferences,
                                    detergent: e.target.value
                                  }
                                })
                              }
                              sx={{ borderRadius: 2 }}
                            >
                              <MenuItem value="regular">Regular</MenuItem>
                              <MenuItem value="sensitive">Sensitive Skin</MenuItem>
                              <MenuItem value="eco">Eco-Friendly</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <InputLabel>Water Temperature</InputLabel>
                            <Select
                              value={profile.preferences?.temperature || 'warm'}
                              label="Water Temperature"
                              disabled={!isEditing}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  preferences: {
                                    ...profile.preferences,
                                    temperature: e.target.value
                                  }
                                })
                              }
                              sx={{ borderRadius: 2 }}
                            >
                              <MenuItem value="cold">Cold</MenuItem>
                              <MenuItem value="warm">Warm</MenuItem>
                              <MenuItem value="hot">Hot</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <InputLabel>Folding Preference</InputLabel>
                            <Select
                              value={profile.preferences?.folding || 'hanging'}
                              label="Folding Preference"
                              disabled={!isEditing}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  preferences: {
                                    ...profile.preferences,
                                    folding: e.target.value
                                  }
                                })
                              }
                              sx={{ borderRadius: 2 }}
                            >
                              <MenuItem value="standard">Standard</MenuItem>
                              <MenuItem value="hanging">Hanging</MenuItem>
                              <MenuItem value="special">Special Instructions</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      
                      <Divider sx={{ my: 4 }} />
                      
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                        Notification Settings
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch 
                                checked={profile.preferences?.notifications !== false}
                                disabled={!isEditing}
                                onChange={(e) => 
                                  setProfile({
                                    ...profile,
                                    preferences: {
                                      ...profile.preferences,
                                      notifications: e.target.checked
                                    }
                                  })
                                }
                                sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#2E7B5C',
                                    '&:hover': {
                                      backgroundColor: 'rgba(40, 221, 205, 0.08)',
                                    },
                                  },
                                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#2E7B5C',
                                  },
                                }}
                              />
                            }
                            label="Push Notifications"
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch 
                                checked={profile.preferences?.emailUpdates !== false}
                                disabled={!isEditing}
                                onChange={(e) => 
                                  setProfile({
                                    ...profile,
                                    preferences: {
                                      ...profile.preferences,
                                      emailUpdates: e.target.checked
                                    }
                                  })
                                }
                                sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#2E7B5C',
                                    '&:hover': {
                                      backgroundColor: 'rgba(40, 221, 205, 0.08)',
                                    },
                                  },
                                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#2E7B5C',
                                  },
                                }}
                              />
                            }
                            label="Email Updates"
                          />
                        </Grid>
                      </Grid>
                      
                      {isEditing && (
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'flex-end', 
                          mt: 4 
                        }}>
                          <Button 
                            type="submit" 
                            variant="contained" 
                            sx={{ 
                              borderRadius: 2,
                              textTransform: 'none',
                              bgcolor: '#2E7B5C',
                              '&:hover': {
                                bgcolor: '#2E7B5C'
                              }
                            }}
                          >
                            Save Preferences
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={2}>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" fontWeight={600}>
                        Recent Orders
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                          textTransform: 'none',
                          borderRadius: 2,
                          color: '#2E7B5C',
                          borderColor: '#2E7B5C',
                          '&:hover': {
                            borderColor: '#2E7B5C',
                            bgcolor: 'rgba(40, 221, 205, 0.04)'
                          }
                        }}
                      >
                        View All Orders
                      </Button>
                    </Box>
                    
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <RecentOrderCard key={order.id} order={order} />
                      ))
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No orders found
                        </Typography>
                      </Box>
                    )}
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={3}>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" fontWeight={600}>
                        Payment Methods
                      </Typography>
                      {isEditing && (
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={handleAddPaymentMethod}
                          sx={{ 
                            textTransform: 'none',
                            borderRadius: 2,
                            color: '#2E7B5C',
                            borderColor: '#2E7B5C',
                            '&:hover': {
                              borderColor: '#2E7B5C',
                              bgcolor: 'rgba(40, 221, 205, 0.04)'
                            }
                          }}
                        >
                          Add Payment Method
                        </Button>
                      )}
                    </Box>
                    
                    {profile.paymentMethods && profile.paymentMethods.length > 0 ? (
                      profile.paymentMethods.map((method) => (
                        <Card 
                          key={method.id} 
                          sx={{ 
                            mb: 2, 
                            borderRadius: 2, 
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            border: method.isDefault ? '1px solid #2E7B5C' : 'none'
                          }}
                        >
                          <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CreditCard size={20} style={{ marginRight: 12 }} />
                                <Box>
                                  <Typography variant="subtitle1" fontWeight={600}>
                                    {method.type} •••• {method.last4}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Expires {method.expiry}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {method.isDefault && (
                                  <Chip 
                                    label="Default" 
                                    size="small" 
                                    color="primary"
                                    sx={{ 
                                      borderRadius: 1,
                                      mr: 1,
                                      bgcolor: '#2E7B5C'
                                    }}
                                  />
                                )}
                                
                                {isEditing && (
                                  <>
                                    <IconButton 
                                      size="small"
                                      sx={{ color: 'grey.500', mr: 1 }}
                                      onClick={() => {
                                        // Set this payment method as default
                                        const updatedMethod = {...method, isDefault: true};
                                        handlePaymentMethodUpdate(updatedMethod);
                                      }}
                                      disabled={method.isDefault}
                                    >
                                      <Check size={16} />
                                    </IconButton>
                                    <IconButton 
                                      size="small"
                                      sx={{ color: 'grey.500' }}
                                      onClick={() => handlePaymentMethodDelete(method.id)}
                                    >
                                      <X size={16} />
                                    </IconButton>
                                  </>
                                )}
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No payment methods found
                        </Typography>
                        {isEditing && (
                          <Button 
                            variant="outlined"
                            onClick={handleAddPaymentMethod} 
                            sx={{ 
                              mt: 2,
                              textTransform: 'none',
                              borderRadius: 2,
                              color: '#2E7B5C',
                              borderColor: '#2E7B5C',
                              '&:hover': {
                                borderColor: '#2E7B5C',
                                bgcolor: 'rgba(40, 221, 205, 0.04)'
                              }
                            }}
                          >
                            Add Payment Method
                          </Button>
                        )}
                      </Box>
                    )}
                  </TabPanel>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </Box>
    </Box>
 
    </>
  );
}