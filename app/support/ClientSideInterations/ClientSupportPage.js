'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';

// Import all components
import HeroSection from '../_components/HeroSection';
import ContactFormSection from '../_components/ContactFormSection';
import FAQSection from '../_components/FAQSection.jsx';
import ContactInfoSection from '../_components/ContactInfoSection';
import SuccessErrorAlerts from '../_components/SuccessErrorAlerts';
import {theme} from "../../../contexts/Theme"
import ApiServeces from '@/lib/ApiServeces';
import { useAuth } from '@/contexts/AuthContext';
// Define constants for SEO content

export default function ClientSupportPage() {
  const TURQUOISE = theme.palette.primary.main;
  const TURQUOISE_DARK = theme.palette.primary.darkBlue;
  const TURQUOISE_LIGHT = theme.palette.primary.whitishMint;
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {user}=useAuth()
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    orderNumber: '',
    message: '',
    from:user._id
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await ApiServeces.createSupport(formData);
      if(res.data.success){
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'general',
          orderNumber: '',
          message: '',
          from:user._id
        })
        setSuccessMessage(true)
      }
      
    } catch (error) {
      console.log(error)
    }finally{
      setErrorMessage(false);
      setIsSubmitting(false);
    }
     
 
  };
  
  // Close snackbar alerts
  const handleCloseAlert = () => {
    setSuccessMessage(false);
    setErrorMessage(false);
  };
  
  return (
    <>
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
        {/* <Grid container spacing={{ xs: 4, md: 6 }}> */}
 {/* Contact Form Section  */}
          {/* <Grid item xs={12} lg={6}> */}
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
          {/* </Grid> */}
          
          {/* FAQ Section
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
          </Grid> */}
        {/* </Grid> */}
        
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
    </>
  );
}