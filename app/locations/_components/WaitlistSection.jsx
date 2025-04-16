import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Paper,
  Grid,
  Alert,
  AlertTitle,
  Collapse,
  Fade,
  InputAdornment,
  Divider,
  Zoom,
  ThemeProvider
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { theme } from '../../../contexts/Theme'; // Import your theme context

const WaitlistSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    zipCode: '',
    address: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for ZIP code
    if (name === 'zipCode') {
      // Only allow numbers and limit to 5 digits
      const zipValue = value.replace(/[^\d]/g, '').slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: zipValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.zipCode.trim()) {
      errors.zipCode = 'ZIP code is required';
    } else if (formData.zipCode.length !== 5) {
      errors.zipCode = 'ZIP code must be 5 digits';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
        setIsLoading(false);
      }, 1500);
    }
  };
  
  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      zipCode: '',
      address: ''
    });
    setFormErrors({});
    setIsSubmitted(false);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          py: 8,
          // Change gradient to use your theme colors
          backgroundImage: `linear-gradient(to right, ${theme.palette.primary.light}30, ${theme.palette.primary.light}10)`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decoration */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            filter: 'blur(60px)',
            zIndex: 0
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h2" // Using h2 from your theme
                component="h2" 
                align="center" 
                gutterBottom
                sx={{ mb: 2 }}
                // Using theme typography instead of hardcoded fontWeight
              >
                Not Covered Yet?
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography 
                variant="h6" 
                align="center" 
                color="text.secondary"
                sx={{ mb: 5, maxWidth: '700px', mx: 'auto' }}
              >
                Join our waitlist and be first to know when we expand to your area
              </Typography>
            </motion.div>

            <Grid container spacing={4} alignItems="center" justifyContent="center">
              <Grid 
                item 
                xs={12} 
                md={6}
                component={motion.div}
                variants={itemVariants}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {isSubmitted ? (
                    <Zoom in={isSubmitted}>
                      <Box 
                        sx={{ 
                          textAlign: 'center',
                          py: 3
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                          }}
                        >
                          <CheckCircleOutlineIcon 
                            sx={{ 
                              fontSize: 80, 
                              color: theme.palette.success.main,
                              mb: 2
                            }} 
                          />
                        </motion.div>
                        
                        <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                          You're on the Waitlist!
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Thanks for your interest in our service. We'll notify you as soon as we expand to your area!
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          We prioritize new areas based on demand, so your registration helps us plan our next expansion.
                        </Typography>
                        
                        <Button
                        disableElevation
                          variant="outlined"
                          sx={{ 
                            mt: 2,
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main
                          }}
                          onClick={handleReset}
                        >
                          Add Another ZIP Code
                        </Button>
                      </Box>
                    </Zoom>
                  ) : (
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                        Join the Waitlist
                      </Typography>
                      <Typography variant="body2" paragraph sx={{ mb: 3 }}>
                        Let us know where you'd like us to expand next. We'll email you as soon as service becomes available in your area.
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="name"
                            label="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon sx={{ color: theme.palette.primary.main }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: theme.palette.primary.main,
                              }
                            }}
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon sx={{ color: theme.palette.primary.main }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: theme.palette.primary.main,
                              }
                            }}
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="zipCode"
                            label="ZIP Code"
                            value={formData.zipCode}
                            onChange={handleChange}
                            error={!!formErrors.zipCode}
                            helperText={formErrors.zipCode}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PlaceIcon sx={{ color: theme.palette.primary.main }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: theme.palette.primary.main,
                              }
                            }}
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="address"
                            label="Street Address (Optional)"
                            value={formData.address}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <HomeIcon sx={{ color: theme.palette.primary.main }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: theme.palette.primary.main,
                              }
                            }}
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Button
                          disableElevation
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            startIcon={isLoading ? null : <SendIcon />}
                            sx={{ 
                              py: 1.5,
                              fontWeight: 600,
                              backgroundColor: theme.palette.primary.main,
                              '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                              }
                            }}
                          >
                            {isLoading ? 'Processing...' : 'Join Waitlist'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Paper>
              </Grid>
              
              <Grid 
                item 
                xs={12} 
                md={5}
                component={motion.div}
                variants={itemVariants}
              >
                <Box sx={{ pl: { md: 4 } }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    fontWeight={600}
                    sx={{ mb: 3 }}
                  >
                    Why Join Our Waitlist?
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Alert 
                      icon={<ForwardToInboxIcon fontSize="inherit" />}
                      sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        '& .MuiAlert-icon': {
                          color: theme.palette.primary.main
                        }
                      }}
                    >
                      <AlertTitle>Priority Access</AlertTitle>
                      Waitlist members get first access when we launch in new areas.
                    </Alert>
                    
                    <Alert 
                      severity="success"
                      sx={{ mb: 2, borderRadius: 2 }}
                    >
                      <AlertTitle>Special Promotions</AlertTitle>
                      Exclusive discounts and offers for our founding members.
                    </Alert>
                    
                    <Alert 
                      sx={{ 
                        borderRadius: 2,
                        backgroundColor: `${theme.palette.secondary.main}20`,
                        '& .MuiAlert-icon': {
                          color: theme.palette.secondary.main
                        }
                      }}
                    >
                      <AlertTitle>Help Us Grow</AlertTitle>
                      Your interest helps us prioritize which neighborhoods to expand to next.
                    </Alert>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    We're constantly expanding our service areas based on customer demand. The more people sign up from your neighborhood, the sooner we'll be able to launch there!
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default WaitlistSection;