'use client';

import React,{ useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Card,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  RequestQuote as RequestQuoteIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  LocalPhone as PhoneIcon,
  Email as EmailIcon,
  Event as CalendarIcon
} from '@mui/icons-material';
import { motion, useAnimation, useInView } from 'framer-motion';

// Define constants
const TURQUOISE = '#28ddcd';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionGrid = motion(Grid);
const MotionCard = motion(Card);

export default function RequestQuoteSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();
  
  // Form state
  const [formData, setFormData] = useState({
    businessName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessType: '',
    serviceInterest: '',
    estimatedVolume: [10, 50],
    pickupFrequency: '',
    additionalInfo: '',
    contactPreference: 'email'
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  // Business type options - reduced for space
  const businessTypes = [
    { value: "hotel", label: "Hotel & Hospitality" },
    { value: "airbnb", label: "Airbnb & Vacation Rentals" },
    { value: "restaurant", label: "Restaurant & Food Service" },
    { value: "spa", label: "Spa & Wellness Center" },
    { value: "gym", label: "Gym & Fitness Facility" },
    { value: "healthcare", label: "Healthcare Facility" },
    { value: "other", label: "Other Business" }
  ];
  
  // Service interest options - reduced for space
  const serviceOptions = [
    { value: "commercialLaundry", label: "Commercial Laundry Service" },
    { value: "airbnbLaundry", label: "Airbnb Laundry" },
    { value: "spaLaundry", label: "Massage & Spa Laundry" },
    { value: "healthcareLaundry", label: "Healthcare Laundry" },
    { value: "gymTowels", label: "Gym Towel Laundry Service" }
  ];
  
  // Pickup frequency options
  const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "semiWeekly", label: "2-3 Times Per Week" },
    { value: "weekly", label: "Weekly" },
    { value: "biWeekly", label: "Every Two Weeks" },
    { value: "custom", label: "Custom Schedule" }
  ];
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    setFormData({
      ...formData,
      estimatedVolume: newValue
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate for demo
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          businessName: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          businessType: '',
          serviceInterest: '',
          estimatedVolume: [10, 50],
          pickupFrequency: '',
          additionalInfo: '',
          contactPreference: 'email'
        });
      } else {
        setSubmitError(true);
      }
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Close alert handlers
  const handleCloseSuccess = () => setSubmitSuccess(false);
  const handleCloseError = () => setSubmitError(false);
  
  // Volume formatter for slider
  const volumeFormatter = (value) => {
    return `${value} lbs`;
  };
  
  return (
    <Box 
      ref={ref}
      sx={{ 
        minHeight: { xs: 'auto', md: 'auto' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#f5f7fa', // Light background color for the section
        position: 'relative',
        py: { xs: 4, sm: 6, md: 8 },
        overflowX: 'hidden'
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 } // Added horizontal padding
        }}
      >
        <MotionBox
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Section header card - Boxed */}
          <MotionCard
            elevation={1}
            variants={itemVariants}
            sx={{ 
              borderRadius: 3,
              mb: 3,
              overflow: 'hidden',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
            }}
          >
            <Box sx={{ 
              p: { xs: 2, sm: 3 },
              background: `linear-gradient(135deg, ${TURQUOISE}10, ${TURQUOISE}20)`,
              position: 'relative'
            }}>
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: { xs: 50, sm: 60 },
                    height: { xs: 50, sm: 60 },
                    borderRadius: '50%',
                    bgcolor: 'rgba(40,221,205,0.2)',
                    mr: { xs: 0, sm: 2 },
                    mb: { xs: 1.5, sm: 0 }
                  }}
                >
                  <RequestQuoteIcon sx={{ color: TURQUOISE, fontSize: { xs: 25, sm: 30 } }} />
                </Box>
                
                <Box>
                  <MotionTypography
                    variant="h3"
                    component="h2"
                    variants={itemVariants}
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2.2rem' },
                      lineHeight: 1.2
                    }}
                  >
                    Request a Commercial Quote
                  </MotionTypography>
                  
                  <MotionTypography
                    variant="h6"
                    color="text.secondary"
                    variants={itemVariants}
                    sx={{ 
                      fontWeight: 400,
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                    }}
                  >
                    Get a customized laundry solution tailored to your business needs
                  </MotionTypography>
                </Box>
              </Box>
            </Box>
          </MotionCard>
          
          {/* Main content - Boxed cards layout */}
          <Grid container spacing={3}>
            {/* Left column - Form */}
            <Grid item xs={12} md={8} order={{ xs: 2, sm: 2, md: 1 }}>
              <MotionCard
                elevation={1}
                variants={itemVariants}
                sx={{ 
                  borderRadius: 3,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  <form onSubmit={handleSubmit}>
                    <Typography 
                      variant="h6" 
                      fontWeight={600} 
                      sx={{ 
                        mb: { xs: 1.5, sm: 2 }, 
                        fontSize: { xs: '1rem', sm: '1.1rem' } 
                      }}
                    >
                      Business Information
                    </Typography>
                    
                    <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Business Name"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          size="small"
                          inputProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                          InputLabelProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          size="small"
                          inputProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                          InputLabelProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          size="small"
                          inputProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                          InputLabelProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          size="small"
                          inputProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                          InputLabelProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          size="small"
                          inputProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                          InputLabelProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <FormControl fullWidth required variant="outlined" size="small">
                          <InputLabel id="business-type-label" style={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>Type of Business</InputLabel>
                          <Select
                            labelId="business-type-label"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            label="Type of Business"
                            inputProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                          >
                            {businessTypes.map((option) => (
                              <MenuItem key={option.value} value={option.value} style={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: { xs: 0.5, sm: 1 } }} />
                        <Typography 
                          variant="h6" 
                          fontWeight={600} 
                          sx={{ 
                            my: { xs: 0.5, sm: 1 }, 
                            fontSize: { xs: '1rem', sm: '1.1rem' } 
                          }}
                        >
                          Service Requirements
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required variant="outlined" size="small">
                          <InputLabel id="service-interest-label" style={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>Service of Interest</InputLabel>
                          <Select
                            labelId="service-interest-label"
                            name="serviceInterest"
                            value={formData.serviceInterest}
                            onChange={handleInputChange}
                            label="Service of Interest"
                            inputProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                          >
                            {serviceOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value} style={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required variant="outlined" size="small">
                          <InputLabel id="pickup-frequency-label" style={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>Preferred Pickup Frequency</InputLabel>
                          <Select
                            labelId="pickup-frequency-label"
                            name="pickupFrequency"
                            value={formData.pickupFrequency}
                            onChange={handleInputChange}
                            label="Preferred Pickup Frequency"
                            inputProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                          >
                            {frequencyOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value} style={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Typography 
                          variant="body2" 
                          gutterBottom 
                          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                        >
                          Estimated Weekly Volume (lbs)
                        </Typography>
                        <Box sx={{ px: 1 }}>
                          <Slider
                            value={formData.estimatedVolume}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            valueLabelFormat={volumeFormatter}
                            min={0}
                            max={500}
                            step={10}
                            marks={[
                              { value: 0, label: '0' },
                              { value: 250, label: '250' },
                              { value: 500, label: '500+' }
                            ]}
                            sx={{
                              '& .MuiSlider-thumb': {
                                color: TURQUOISE
                              },
                              '& .MuiSlider-track': {
                                color: TURQUOISE
                              },
                              '& .MuiSlider-rail': {
                                color: 'rgba(40,221,205,0.2)'
                              }
                            }}
                          />
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Additional Information"
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          multiline
                          rows={isSmallScreen ? 1 : 2}
                          placeholder="Tell us more about your specific laundry needs, special requirements, or questions."
                          variant="outlined"
                          size="small"
                          inputProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                          InputLabelProps={{ style: { fontSize: isSmallScreen ? '0.875rem' : '1rem' } }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Typography 
                          variant="body2" 
                          gutterBottom 
                          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                        >
                          Preferred Method of Contact
                        </Typography>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formData.contactPreference === 'email'}
                                onChange={() => setFormData({...formData, contactPreference: 'email'})}
                                name="contactPreference"
                                value="email"
                                size="small"
                                sx={{
                                  '&.Mui-checked': {
                                    color: TURQUOISE
                                  }
                                }}
                              />
                            }
                            label={<Typography sx={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>Email</Typography>}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formData.contactPreference === 'phone'}
                                onChange={() => setFormData({...formData, contactPreference: 'phone'})}
                                name="contactPreference"
                                value="phone"
                                size="small"
                                sx={{
                                  '&.Mui-checked': {
                                    color: TURQUOISE
                                  }
                                }}
                              />
                            }
                            label={<Typography sx={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>Phone</Typography>}
                          />
                        </FormGroup>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size={isSmallScreen ? "small" : "medium"}
                          disabled={isSubmitting}
                          endIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
                          sx={{ 
                            bgcolor: TURQUOISE,
                            color: 'white',
                            px: { xs: 2, sm: 3 },
                            py: { xs: 0.75, sm: 1 },
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            '&:hover': { bgcolor: '#20c5b7' }
                          }}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </MotionCard>
            </Grid>
            
            {/* Right column - Contact options */}
            <Grid item xs={12} md={4} order={{ xs: 1, sm: 1, md: 2 }}>
              <MotionCard
                elevation={1}
                variants={itemVariants}
                sx={{ 
                  borderRadius: 3,
                  height: '100%',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                  background: `linear-gradient(135deg, ${TURQUOISE}05, ${TURQUOISE}15)`
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    sx={{ 
                      mb: { xs: 1.5, sm: 2 }, 
                      fontSize: { xs: '1rem', sm: '1.1rem' } 
                    }}
                  >
                    Need Help Right Away?
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: { xs: 1.5, sm: 2 }, 
                      fontSize: { xs: '0.8rem', sm: '0.85rem' } 
                    }}
                  >
                    Don't want to wait for a quote? Connect with our commercial team directly:
                  </Typography>
                  
                  <Box>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 1.5
                      }}
                    >
                      <PhoneIcon sx={{ 
                        color: TURQUOISE, 
                        mr: 1.5, 
                        fontSize: { xs: 16, sm: 18 },
                        flexShrink: 0
                      }} />
                      <Typography 
                        variant="body1" 
                        fontWeight={500} 
                        sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      >
                        (800) 123-4567
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 1.5
                      }}
                    >
                      <EmailIcon sx={{ 
                        color: TURQUOISE, 
                        mr: 1.5, 
                        fontSize: { xs: 16, sm: 18 },
                        flexShrink: 0 
                      }} />
                      <Typography 
                        variant="body1" 
                        fontWeight={500} 
                        sx={{ 
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          wordBreak: 'break-word'
                        }}
                      >
                        commercial@freshbox.com
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center'
                      }}
                    >
                      <CalendarIcon sx={{ 
                        color: TURQUOISE, 
                        mr: 1.5, 
                        fontSize: { xs: 16, sm: 18 },
                        flexShrink: 0
                      }} />
                      <Typography 
                        variant="body1" 
                        fontWeight={500} 
                        sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      >
                        Schedule a Consultation
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    size={isSmallScreen ? "small" : "medium"}
                    sx={{ 
                      mt: 2,
                      color: TURQUOISE,
                      borderColor: TURQUOISE,
                      py: { xs: 0.75, sm: 1 },
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      borderRadius: '8px',
                      '&:hover': { 
                        borderColor: TURQUOISE,
                        bgcolor: 'rgba(40,221,205,0.1)'
                      }
                    }}
                  >
                    Schedule a Call
                  </Button>
                </Box>
              </MotionCard>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>
      
      {/* Success and error messages */}
      <Snackbar 
        open={submitSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccess}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isSmallScreen ? 'center' : 'right' 
        }}
        sx={{
          maxWidth: { xs: '90%', sm: 'auto' }
        }}
      >
        <Alert 
          onClose={handleCloseSuccess} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Quote request submitted successfully! Our team will contact you soon.
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={submitError} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isSmallScreen ? 'center' : 'right' 
        }}
        sx={{
          maxWidth: { xs: '90%', sm: 'auto' }
        }}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          There was an error submitting your request. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
}