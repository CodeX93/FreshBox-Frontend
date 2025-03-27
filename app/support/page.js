'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';

// Import all components
import HeroSection from './_components/HeroSection';
import ContactFormSection from './_components/ContactFormSection';
import FAQSection from './_components/FAQSection.jsx';
import ContactInfoSection from './_components/ContactInfoSection';
import SuccessErrorAlerts from './_components/SuccessErrorAlerts';

// Define constants - shared across components
const TURQUOISE = '#28ddcd';
const TURQUOISE_DARK = '#20c5b7';
const TURQUOISE_LIGHT = '#e8f9f8';

// Main SupportPage component
export default function SupportPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    orderNumber: '',
    message: ''
  });
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  // Set loaded state when component mounts
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.1) { // Simulate 90% success rate
        setSuccessMessage(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'general',
          orderNumber: '',
          message: ''
        });
      } else {
        setErrorMessage(true);
      }
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Close snackbar alerts
  const handleCloseAlert = () => {
    setSuccessMessage(false);
    setErrorMessage(false);
  };
  
  return (
    <Box sx={{ 
      pt: { xs: 12, sm: 14, md: 16 }, 
      pb: { xs: 8, sm: 10, md: 12 },
      bgcolor: '#f9fafb',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorations */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${TURQUOISE}20, ${TURQUOISE}05)`,
        zIndex: 0,
        filter: 'blur(60px)'
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${TURQUOISE}15, ${TURQUOISE}00)`,
        zIndex: 0,
        filter: 'blur(40px)'
      }} />

      {/* Hero Section */}
      <HeroSection 
        loaded={loaded} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchActive={searchActive}
        setSearchActive={setSearchActive}
        isMobile={isMobile}
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Contact Form Section */}
          <Grid item xs={12} lg={6}>
            <Fade in={loaded} timeout={1000}>
              <Box>
                <ContactFormSection 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </Box>
            </Fade>
          </Grid>
          
          {/* FAQ Section */}
          <Grid item xs={12} lg={6}>
            <Fade in={loaded} timeout={1000} style={{ transitionDelay: '200ms' }}>
              <Box>
                <FAQSection 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  searchActive={searchActive}
                  expandedFAQ={expandedFAQ}
                  setExpandedFAQ={setExpandedFAQ}
                />
              </Box>
            </Fade>
          </Grid>
        </Grid>
        
        {/* Contact Information */}
        <Box sx={{ mt: { xs: 6, md: 8 }, mb: 4 }}>
          <ContactInfoSection loaded={loaded} />
        </Box>
      </Container>
      
      {/* Success and Error Messages */}
      <SuccessErrorAlerts 
        successMessage={successMessage}
        errorMessage={errorMessage}
        handleCloseAlert={handleCloseAlert}
      />
    </Box>
  );
}