'use client';
import { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Container
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Component imports

import AddressForm from './_components/AddressForm';
import ServicesSummary from './_components/ServicesSummary';
import ScheduleForm from './_components/ScheduleForm';
import ContactForm from './_components/ContactForm';
import PaymentForm from './_components/PaymentForm';
import OrderSummary from './_components/OrderSummary';
import OrderConfirmation from './_components/OrderConfirmation';

// Data and utilities
import { steps, coveredPostcodes, timeSlots } from './checkoutData';

export default function CheckoutProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Form states
  const [addressData, setAddressData] = useState({
    addressType: 'home',
    postcode: '',
    addressLine1: '',
    addressLine2: '',
    city: 'London',
    notes: '',
  });
  
  const [servicesData, setServicesData] = useState({
    selectedServices: [],
  });
  
  const [scheduleData, setScheduleData] = useState({
    collectionDate: '',
    collectionTimeSlot: '',
    deliveryDate: '',
    deliveryTimeSlot: '',
  });
  
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    createAccount: false,
    password: '',
    marketingConsent: false,
  });
  
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    saveCard: false,
  });
  
  // Cart state
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Wash & Fold",
      option: "Standard (48h)",
      basePrice: 1.50,
      optionPrice: 0,
      quantity: 3,
      totalPrice: 4.50,
    },
    {
      id: 2,
      name: "Dry Cleaning",
      option: "Express (24h)",
      basePrice: 3.50,
      optionPrice: 7,
      quantity: 2,
      totalPrice: 21.00,
    }
  ]);
  
  // Calculate cart totals
  const cartTotal = cart.reduce((total, item) => total + item.totalPrice, 0);

  // Check if address is in coverage area
  const checkCoverage = (postcode) => {
    // Extract the first part of the postcode (e.g., "SW1" from "SW1A 1AA")
    const postcodeInput = postcode.trim().toUpperCase();
    
    // Remove spaces from input and check formats like N1, N16, etc.
    const postcodeNoSpace = postcodeInput.replace(/\s+/g, '');
    
    return coveredPostcodes.some(code => {
      // Handle cases where the input might be N16XE (without space)
      // or where it might be something like SW1A1AA (without space)
      return postcodeNoSpace.startsWith(code) || 
             postcodeInput.startsWith(code);
    });
  };

  // Handle next button click
  const handleNext = () => {
    setIsLoading(true);
    
    // Validate current step
    let isValid = true;
    
    if (activeStep === 0) {
      // Address validation
      if (!addressData.postcode || !addressData.addressLine1) {
        isValid = false;
      } else {
        // Check if address is in coverage area
        const inCoverage = checkCoverage(addressData.postcode);
        if (!inCoverage) {
          setAddressError(true);
          isValid = false;
        } else {
          setAddressError(false);
        }
      }
    } else if (activeStep === 1) {
      // Services validation - can proceed if cart has items
      isValid = cart.length > 0;
    } else if (activeStep === 2) {
      // Schedule validation
      isValid = scheduleData.collectionDate !== '' && scheduleData.collectionTimeSlot !== '' && 
                scheduleData.deliveryDate !== '' && scheduleData.deliveryTimeSlot !== '';
    } else if (activeStep === 3) {
      // Contact validation
      isValid = contactData.firstName && contactData.lastName && 
                contactData.email && contactData.phone;
                
      // If creating account, validate password
      if (contactData.createAccount && !contactData.password) {
        isValid = false;
      }
    } else if (activeStep === 4) {
      // Payment validation
      if (paymentData.paymentMethod === 'card') {
        isValid = paymentData.cardNumber && paymentData.expiryDate && 
                  paymentData.cvv && paymentData.nameOnCard;
      }
      
      // For the demo, we'll always consider payment successful
      if (isValid) {
        // Simulate payment processing
        setTimeout(() => {
          setOrderComplete(true);
          setIsLoading(false);
        }, 2000);
        return;
      }
    }
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      if (isValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }, 800);
  };

  // Handle back button click
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle form changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value
    });
    
    // Clear the coverage error when postcode changes
    if (name === 'postcode') {
      setAddressError(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value, checked, type } = e.target;
    setContactData({
      ...contactData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value, checked, type } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleScheduleChange = (name, value) => {
    setScheduleData({
      ...scheduleData,
      [name]: value
    });
  };

  // Content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm 
            addressData={addressData}
            handleAddressChange={handleAddressChange}
            addressError={addressError}
          />
        );
      case 1:
        return (
          <ServicesSummary 
            cart={cart}
            total={cartTotal}
          />
        );
      case 2:
        return (
          <ScheduleForm 
            scheduleData={scheduleData}
            handleScheduleChange={handleScheduleChange}
            timeSlots={timeSlots}
          />
        );
      case 3:
        return (
          <ContactForm 
            contactData={contactData}
            handleContactChange={handleContactChange}
          />
        );
      case 4:
        return (
          <PaymentForm 
            paymentData={paymentData}
            handlePaymentChange={handlePaymentChange}
            total={cartTotal}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: 3, pb: 8,  marginTop: '100px'}}>
        <Container maxWidth="lg">
          {orderComplete ? (
            <OrderConfirmation 
              cartTotal={cartTotal}
              contactData={contactData}
              scheduleData={scheduleData}
            />
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
                  <Box sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    p: 2,
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Checkout
                    </Typography>
                  </Box>
                  
                  <Stepper 
                    activeStep={activeStep} 
                    alternativeLabel 
                    sx={{ 
                      pt: 4, 
                      pb: 3,
                      px: { xs: 1, sm: 4 }
                    }}
                  >
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel 
                          StepIconComponent={({ active, completed }) => (
                            <Box
                              sx={{
                                borderRadius: '50%',
                                bgcolor: active || completed ? 'primary.main' : 'grey.300',
                                color: active || completed ? 'white' : 'text.secondary',
                                width: 40,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {step.icon}
                            </Box>
                          )}
                        >
                          {step.label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  
                  <Box sx={{ p: 4 }}>
                    {getStepContent(activeStep)}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                      <Button
                        variant="outlined"
                        disabled={activeStep === 0 || isLoading}
                        onClick={handleBack}
                        startIcon={<ArrowBackIcon />}
                        sx={{ borderRadius: 2 }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                        disabled={isLoading}
                        sx={{ 
                          borderRadius: 2,
                          px: 3,
                          py: 1
                        }}
                      >
                        {activeStep === steps.length - 1 ? 'Complete Order' : 'Continue'}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ position: { md: 'sticky' }, top: 20 }}>
                  <OrderSummary 
                    cart={cart}
                    cartTotal={cartTotal}
                    addressData={addressData}
                    scheduleData={scheduleData}
                    activeStep={activeStep}
                    timeSlots={timeSlots}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}