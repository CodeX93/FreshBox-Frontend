'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
  useMediaQuery
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
              order.status === 'Delivered' ? 'success' : 
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
              color: '#28ddcd'
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
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    profileImage: '', // URL to profile image if available
    preferences: {
      detergent: 'sensitive',
      temperature: 'warm',
      folding: 'hanging',
      notifications: true,
      emailUpdates: true
    },
    paymentMethods: [
      { id: 1, type: 'Visa', last4: '4242', isDefault: true, expiry: '05/25' }
    ]
  });

  const recentOrders = [
    { id: '8752', status: 'Delivered', date: 'Mar 15, 2025', time: '2:30 PM', type: 'Wash & Fold', total: '32.99' },
    { id: '8741', status: 'In Progress', date: 'Mar 8, 2025', time: '11:45 AM', type: 'Dry Cleaning', total: '48.50' },
    { id: '8726', status: 'Delivered', date: 'Feb 28, 2025', time: '9:15 AM', type: 'Wash & Fold', total: '29.99' }
  ];

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
    // Fetch profile from Firebase here
  }, [user, router]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save profile to Firebase here
    setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    setIsEditing(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
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
                    bgcolor: '#28ddcd',
                    backgroundImage: 'linear-gradient(120deg, #28ddcd 0%, #38efd9 100%)',
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
                  <Avatar 
                    sx={{ 
                      width: { xs: 100, md: 120 }, 
                      height: { xs: 100, md: 120 },
                      border: '4px solid white',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      bgcolor: '#28ddcd',
                      fontSize: { xs: '2.5rem', md: '3rem' }
                    }}
                  >
                    {profile.name.charAt(0)}
                  </Avatar>
                  
                  <Box sx={{ 
                    ml: { xs: 0, md: 3 },
                    mt: { xs: 2, md: 0 },
                    textAlign: { xs: 'center', md: 'left' },
                    mb: { xs: 1, md: 0 }
                  }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {profile.name}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'center', sm: 'center' },
                      gap: { xs: 1, sm: 2 }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <Mail size={16} style={{ marginRight: 6 }} />
                        <Typography variant="body2">{profile.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <Phone size={16} style={{ marginRight: 6 }} />
                        <Typography variant="body2">{profile.phone}</Typography>
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
                        color: isEditing ? 'error.main' : '#28ddcd',
                        borderColor: isEditing ? 'error.main' : '#28ddcd',
                        '&:hover': {
                          borderColor: isEditing ? 'error.dark' : '#20c5b7',
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
                          bgcolor: '#28ddcd',
                          '&:hover': {
                            bgcolor: '#20c5b7'
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
                        backgroundColor: '#28ddcd',
                      },
                      '& .MuiTab-root.Mui-selected': {
                        color: '#28ddcd',
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
                                bgcolor: '#28ddcd',
                                '&:hover': {
                                  bgcolor: '#20c5b7'
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
                            value={profile.preferences.detergent}
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
                            value={profile.preferences.temperature}
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
                            value={profile.preferences.folding}
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
                              checked={profile.preferences.notifications} 
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
                                  color: '#28ddcd',
                                  '&:hover': {
                                    backgroundColor: 'rgba(40, 221, 205, 0.08)',
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#28ddcd',
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
                              checked={profile.preferences.emailUpdates} 
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
                                  color: '#28ddcd',
                                  '&:hover': {
                                    backgroundColor: 'rgba(40, 221, 205, 0.08)',
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#28ddcd',
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
                            bgcolor: '#28ddcd',
                            '&:hover': {
                              bgcolor: '#20c5b7'
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
                        color: '#28ddcd',
                        borderColor: '#28ddcd',
                        '&:hover': {
                          borderColor: '#20c5b7',
                          bgcolor: 'rgba(40, 221, 205, 0.04)'
                        }
                      }}
                    >
                      View All Orders
                    </Button>
                  </Box>
                  
                  {recentOrders.map((order) => (
                    <RecentOrderCard key={order.id} order={order} />
                  ))}
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
                        sx={{ 
                          textTransform: 'none',
                          borderRadius: 2,
                          color: '#28ddcd',
                          borderColor: '#28ddcd',
                          '&:hover': {
                            borderColor: '#20c5b7',
                            bgcolor: 'rgba(40, 221, 205, 0.04)'
                          }
                        }}
                      >
                        Add Payment Method
                      </Button>
                    )}
                  </Box>
                  
                  {profile.paymentMethods.map((method) => (
                    <Card 
                      key={method.id} 
                      sx={{ 
                        mb: 2, 
                        borderRadius: 2, 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        border: method.isDefault ? '1px solid #28ddcd' : 'none'
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
                                  bgcolor: '#28ddcd'
                                }}
                              />
                            )}
                            
                            {isEditing && (
                              <IconButton 
                                size="small"
                                sx={{ color: 'grey.500' }}
                              >
                                <Edit size={16} />
                              </IconButton>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </Box>
    
    </>
  );
}