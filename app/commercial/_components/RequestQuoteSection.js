import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
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
  useMediaQuery,
  useTheme
} from '@mui/material';
import {theme} from "../../../contexts/Theme"
import { 
  RequestQuote as RequestQuoteIcon,
  Send as SendIcon,
  LocalPhone as PhoneIcon,
  Email as EmailIcon,
  Event as CalendarIcon
} from '@mui/icons-material';

const RequestQuoteSection = () => {
  const darkBlueColor = theme.palette.primary.darkBlue;
  const primaryColor = theme.palette.primary.main;
  const whitishMint = theme.palette.primary.whitishMint;
  const yellowishColor = theme.palette.primary.yellowish;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
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
  
  // Business type options
  const businessTypes = [
    { value: "hotel", label: "Hotel & Hospitality" },
    { value: "airbnb", label: "Airbnb & Vacation Rentals" },
    { value: "restaurant", label: "Restaurant & Food Service" },
    { value: "spa", label: "Spa & Wellness Center" },
    { value: "gym", label: "Gym & Fitness Facility" },
    { value: "healthcare", label: "Healthcare Facility" },
    { value: "other", label: "Other Business" }
  ];
  
  // Service interest options
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
      sx={{ 
        width: '100%',
        bgcolor: whitishMint,
        pt: { xs: 3, sm: 4, md: 5 }, // Keep top padding
        pb: 0, // Remove bottom padding
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // Remove minHeight to prevent extra space
      }}
    >
      {/* Subtle background element */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: { xs: '150px', sm: '200px', md: '300px' },
          height: { xs: '150px', sm: '200px', md: '300px' },
          background: `linear-gradient(135deg, ${primaryColor}20, transparent)`,
          borderRadius: '0 0 0 100%',
          zIndex: 0
        }}
      />
      
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 1, mb: 5 }}>
        {/* Hero Section - Compact */}
        <Box sx={{ mb: { xs: 3, sm: 4, md: 5 }, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              fontWeight: 700,
              color: darkBlueColor,
              mb: { xs: 1, sm: 2 },
              lineHeight: 1.2,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 50,
                height: 3,
                bgcolor: yellowishColor,
                borderRadius: 2
              }
            }}
          >
            Request a Commercial Quote
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              color: darkBlueColor,
              mb: { xs: 2, sm: 3 },
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.5
            }}
          >
            Get a customized laundry solution tailored to your business needs. Our team will create a personalized proposal based on your requirements.
          </Typography>
        </Box>

        {/* Main content */}
        <Grid container spacing={3} sx={{ mb: 0 }}>
          {/* Form Column */}
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: 3,
                p: 3,
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                height: '100%'
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                  fontWeight: 700,
                  color: darkBlueColor,
                  mb: { xs: 2, sm: 3 },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -6,
                    left: 0,
                    width: 40,
                    height: 3,
                    bgcolor: yellowishColor,
                    borderRadius: 2
                  }
                }}
              >
                Quote Request Form
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {/* Business Information Section */}
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: darkBlueColor,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        mb: 1
                      }}
                    >
                      Business Information
                    </Typography>
                  </Grid>
                  
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
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControl fullWidth required variant="outlined" size="small">
                      <InputLabel id="business-type-label">Type of Business</InputLabel>
                      <Select
                        labelId="business-type-label"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        label="Type of Business"
                      >
                        {businessTypes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  
                  {/* Service Requirements Section */}
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: darkBlueColor,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        mb: 1
                      }}
                    >
                      Service Requirements
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required variant="outlined" size="small">
                      <InputLabel id="service-interest-label">Service of Interest</InputLabel>
                      <Select
                        labelId="service-interest-label"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleInputChange}
                        label="Service of Interest"
                      >
                        {serviceOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required variant="outlined" size="small">
                      <InputLabel id="pickup-frequency-label">Preferred Pickup Frequency</InputLabel>
                      <Select
                        labelId="pickup-frequency-label"
                        name="pickupFrequency"
                        value={formData.pickupFrequency}
                        onChange={handleInputChange}
                        label="Preferred Pickup Frequency"
                      >
                        {frequencyOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.9rem',
                        color: darkBlueColor,
                        mb: 1
                      }}
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
                            color: darkBlueColor
                          },
                          '& .MuiSlider-track': {
                            color: darkBlueColor
                          },
                          '& .MuiSlider-rail': {
                            color: 'rgba(0,60,67,0.2)'
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
                      rows={3}
                      placeholder="Tell us more about your specific laundry needs, special requirements, or questions."
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.9rem',
                        color: darkBlueColor,
                        mb: 1
                      }}
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
                                color: darkBlueColor
                              }
                            }}
                          />
                        }
                        label="Email"
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
                                color: darkBlueColor
                              }
                            }}
                          />
                        }
                        label="Phone"
                      />
                    </FormGroup>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                    disableElevation
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      endIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
                      sx={{ 
                        bgcolor: darkBlueColor,
                        color: whitishMint,
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1, sm: 1.25 },
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: primaryColor,
                          transform: 'translateY(-2px)',
                          transition: 'all 0.3s ease'
                        }
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
          
          {/* Contact Info Column */}
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <Box
              sx={{
                bgcolor: darkBlueColor,
                borderRadius: 3,
                p: 3,
                
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                  fontWeight: 700,
                  color: whitishMint,
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -6,
                    left: 0,
                    width: 40,
                    height: 3,
                    bgcolor: yellowishColor,
                    borderRadius: 2
                  }
                }}
              >
                Need Help?
              </Typography>
              
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  color: whitishMint,
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                Don't want to wait for a quote? Connect with our commercial team directly for immediate assistance.
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: `${whitishMint}10`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      bgcolor: `${whitishMint}15`,
                      '& .contact-icon': {
                        color: yellowishColor,
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <Box
                    className="contact-icon"
                    sx={{
                      color: whitishMint,
                      transition: 'all 0.3s ease',
                      mt: 0.5
                    }}
                  >
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: whitishMint,
                        mb: 0.5,
                        fontSize: '1rem'
                      }}
                    >
                      Call Us
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: `${whitishMint}CC`,
                        lineHeight: 1.5,
                        fontSize: '0.9rem'
                      }}
                    >
                      (800) 123-4567
                    </Typography>
                  </Box>
                </Box>
                
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: `${whitishMint}10`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      bgcolor: `${whitishMint}15`,
                      '& .contact-icon': {
                        color: yellowishColor,
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <Box
                    className="contact-icon"
                    sx={{
                      color: whitishMint,
                      transition: 'all 0.3s ease',
                      mt: 0.5
                    }}
                  >
                    <EmailIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: whitishMint,
                        mb: 0.5,
                        fontSize: '1rem'
                      }}
                    >
                      Email Us
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: `${whitishMint}CC`,
                        lineHeight: 1.5,
                        fontSize: '0.9rem'
                      }}
                    >
                      commercial@freshbox.com
                    </Typography>
                  </Box>
                </Box>
                
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: `${whitishMint}10`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      bgcolor: `${whitishMint}15`,
                      '& .contact-icon': {
                        color: yellowishColor,
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <Box
                    className="contact-icon"
                    sx={{
                      color: whitishMint,
                      transition: 'all 0.3s ease',
                      mt: 0.5
                    }}
                  >
                    <CalendarIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: whitishMint,
                        mb: 0.5,
                        fontSize: '1rem'
                      }}
                    >
                      Schedule a Call
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: `${whitishMint}CC`,
                        lineHeight: 1.5,
                        fontSize: '0.9rem'
                      }}
                    >
                      Book a consultation with our team
                    </Typography>
                  </Box>
                </Box>
                
                <Button
                disableElevation
                  variant="contained"
                  sx={{
                    bgcolor: whitishMint,
                    color: darkBlueColor,
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.25 },
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    mt: 2,
                    '&:hover': {
                      bgcolor: yellowishColor,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  Schedule Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
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
};

export default RequestQuoteSection;