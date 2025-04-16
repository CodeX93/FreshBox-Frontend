'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Box,
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
  Card,
  CardContent,
  Alert,
  Snackbar,
  FormControlLabel,
  Switch,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Avatar
} from '@mui/material';

import {
  User,
  Settings,
  Mail,
  Phone,
  Edit,
  CreditCard,
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
import { userService } from './userService';
import { theme } from "../../contexts/Theme";

// Constants
const TURQOISE_Color = theme.palette.primary.main;
const Dark_Blue = theme.palette.primary.darkBlue;

// TabPanel Component
function TabPanel({ children, value, index, ...other }) {
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

// RecentOrderCard Component
const RecentOrderCard = ({ order }) => {
  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>Order #{order.id}</Typography>
          <Chip 
            label={order.status} 
            size="small"
            sx={{ 
              borderRadius: 1,
              bgcolor: 
                order.status === 'Delivered' ? TURQOISE_Color : 
                order.status === 'In Progress' ? Dark_Blue : 
                theme.palette.primary.whitishMint,
              color: 
                order.status === 'In Progress' ? '#fff' : 
                order.status === 'Delivered' ? 'black' : 
                'black'
            }}
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
          <Typography variant="body2" fontWeight={600} color={Dark_Blue}>
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
          disableElevation 
            size="small" 
            endIcon={<ChevronRight size={16} />}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600, 
              color: Dark_Blue
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// PaymentMethodCard Component
const PaymentMethodCard = ({ method, isEditing, onSetDefault, onDelete }) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderRadius: 2, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: method.isDefault ? `1px solid ${Dark_Blue}` : 'none'
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
                  bgcolor: Dark_Blue
                }}
              />
            )}
            
            {isEditing && (
              <>
                <IconButton 
                  size="small"
                  sx={{ color: 'grey.500', mr: 1 }}
                  onClick={() => onSetDefault(method)}
                  disabled={method.isDefault}
                >
                  <Check size={16} />
                </IconButton>
                <IconButton 
                  size="small"
                  sx={{ color: 'grey.500' }}
                  onClick={() => onDelete(method.id)}
                >
                  <X size={16} />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// ProfileHeader Component
const ProfileHeader = ({ 
  profile, 
  isEditing, 
  setIsEditing, 
  handleSubmit, 
  handleProfilePictureUpload 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Process image URL
  const processImageUrl = (url) => {
    if (!url) return '';
    
    // If it's already an absolute URL or data URL, return as is
    if (url.startsWith('http') || url.startsWith('data:')) {
      return url;
    }
    
    // For server-side paths like "/uploads/profile-pictures/..."
    // Use the API server URL instead of the frontend URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5023';
    return `${apiBaseUrl}${url}`;
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Cover background */}
      <Box 
        sx={{ 
          height: '120px', 
          bgcolor: Dark_Blue,
          backgroundImage: `linear-gradient(120deg, ${Dark_Blue} 0%, ${Dark_Blue} 100%)`,
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
          {profile.profileImage ? (
            <Box
              sx={{
                width: { xs: 100, md: 120 },
                height: { xs: 100, md: 120 },
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                bgcolor: Dark_Blue,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '2.5rem', md: '3rem' }
              }}
            >
              <Image
                src={processImageUrl(profile.profileImage)}
                alt={profile.name || "User"}
                width={120}
                height={120}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: { xs: 100, md: 120 },
                height: { xs: 100, md: 120 },
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                bgcolor: Dark_Blue,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '2.5rem', md: '3rem' }
              }}
            >
              {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </Box>
          )}
          
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
              <Edit size={16} color={Dark_Blue} />
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
          disableElevation
            variant="outlined" 
            onClick={() => setIsEditing(!isEditing)}
            startIcon={isEditing ? <X size={16} /> : <Edit size={16} />}
            color={isEditing ? "error" : "primary"}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              color: isEditing ? 'error.main' : Dark_Blue,
              borderColor: isEditing ? 'error.main' : Dark_Blue,
              '&:hover': {
                borderColor: isEditing ? 'error.dark' : Dark_Blue,
                bgcolor: isEditing ? 'rgba(211, 47, 47, 0.04)' : 'rgba(40, 221, 205, 0.04)'
              }
            }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
          
          {isEditing && (
            <Button 
            disableElevation
              variant="contained" 
              onClick={handleSubmit}
              startIcon={<Save size={16} />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                bgcolor: Dark_Blue,
                '&:hover': {
                  bgcolor: Dark_Blue
                }
              }}
            >
              Save Changes
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Main Profile Component
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
    profileImage: '',
    preferences: {
      detergent: 'sensitive',
      temperature: 'warm',
      folding: 'hanging',
      notifications: true,
      emailUpdates: true
    },
    paymentMethods: []
  });



  

  // Attempt to load token from localStorage at start
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      console.log('No token found in localStorage');
    } else {
      console.log('Token found in localStorage:', savedToken.substring(0, 15) + '...');
    }
  }, []);
  
  // Track profile image URL changes
  useEffect(() => {
    if (profile.profileImage && profile.profileImage !== previousImageUrl.current) {
      console.log('Profile image URL changed:', profile.profileImage);
      previousImageUrl.current = profile.profileImage;
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
      
      const userData = await userService.getCurrentUser();
      
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
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initialize with user context and load data
  useEffect(() => {
    if (!user) {
      console.log('No user found in context, redirecting to login');
      router.push('/auth/login');
    } else {
      console.log('User found in context:', user);
      
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
  }, [user, router]);

  // Event handlers
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      // Map profile state to the expected API format
      const userData = {
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phone,
        address: profile.address,
        preferences: profile.preferences
      };
      
      await userService.updateProfile(user.id, userData);
      
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

  return (
    <>
      <Navbar light={false}/>
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
              <CircularProgress sx={{ color: Dark_Blue }} />
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
                    <ProfileHeader 
                      profile={profile}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      handleSubmit={handleSubmit}
                      handleProfilePictureUpload={handleProfilePictureUpload}
                    />
                    
                    <Box sx={{ px: 2 }}>
                      <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange}
                        variant={isMobile ? "scrollable" : "standard"}
                        scrollButtons={isMobile ? "auto" : false}
                        sx={{ 
                          '& .MuiTabs-indicator': {
                            backgroundColor: Dark_Blue,
                          },
                          '& .MuiTab-root.Mui-selected': {
                            color: Dark_Blue,
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
                    {/* Profile Tab */}
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
                                disableElevation
                                  type="submit" 
                                  variant="contained" 
                                  sx={{ 
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    bgcolor: Dark_Blue,
                                    '&:hover': {
                                      bgcolor: Dark_Blue
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
                    
                    {/* Orders Tab */}
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
                                sx={{
                                  borderRadius:2,
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: Dark_Blue,
                                    },
                                    '&:hover fieldset': {
                                      borderColor: Dark_Blue,
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: Dark_Blue,
                                    },
                                  },
                                }}
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
                                sx={{
                                  borderRadius:2,
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: Dark_Blue,
                                    },
                                    '&:hover fieldset': {
                                      borderColor: Dark_Blue,
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: Dark_Blue,
                                    },
                                  },
                                }}
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
                                sx={{
                                  borderRadius:2,
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: Dark_Blue,
                                    },
                                    '&:hover fieldset': {
                                      borderColor: Dark_Blue,
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: Dark_Blue,
                                    },
                                  },
                                }}
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
                                      color: Dark_Blue,
                                      '&:hover': {
                                        backgroundColor: Dark_Blue,
                                      },
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                      backgroundColor: Dark_Blue,
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
                                      color: Dark_Blue,
                                      '&:hover': {
                                        backgroundColor: Dark_Blue,
                                      },
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                      backgroundColor: Dark_Blue,
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
                            disableElevation
                              type="submit" 
                              variant="contained" 
                              sx={{ 
                                borderRadius: 2,
                                textTransform: 'none',
                                bgcolor: Dark_Blue,
                                '&:hover': {
                                  bgcolor: Dark_Blue
                                }
                              }}
                            >
                              Save Preferences
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </TabPanel>
                    
                    {/* Payment Tab */}
                    <TabPanel value={tabValue} index={2}>
                      <Box>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                          Payment Methods
                        </Typography>
                        
                        {profile.paymentMethods && profile.paymentMethods.length > 0 ? (
                          <Box>
                            {profile.paymentMethods.map((method) => (
                              <PaymentMethodCard 
                                key={method.id}
                                method={method}
                                isEditing={isEditing}
                                onSetDefault={handlePaymentMethodUpdate}
                                onDelete={handlePaymentMethodDelete}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Box 
                            sx={{ 
                              p: 4, 
                              textAlign: 'center', 
                              bgcolor: 'rgba(0,0,0,0.02)',
                              borderRadius: 2,
                              mb: 3
                            }}
                          >
                            <CreditCard size={40} style={{ color: Dark_Blue, marginBottom: 16 }} />
                            <Typography variant="h6" fontWeight={500} sx={{ mb: 1 }}>
                              No Payment Methods
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                              Add a payment method to make checkout faster
                            </Typography>
                          </Box>
                        )}
                        
                        <Button
                        disableElevation
                          variant="outlined"
                          startIcon={<CreditCard size={18} />}
                          onClick={handleAddPaymentMethod}
                          sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            borderColor: Dark_Blue,
                            color: Dark_Blue,
                            '&:hover': {
                              borderColor: Dark_Blue,
                              bgcolor: 'rgba(40, 221, 205, 0.04)'
                            }
                          }}
                        >
                          Add Payment Method
                        </Button>
                      </Box>
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
                      