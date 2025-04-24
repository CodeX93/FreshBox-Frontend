"use client";
import { useState, useEffect } from "react";
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
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PayPalIcon from "@mui/icons-material/Payment";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Component imports
import AddressForm from "./_components/AddressForm";
import ServicesSummary from "./_components/ServicesSummary";
import ScheduleForm from "./_components/ScheduleForm";
import ContactForm from "./_components/ContactForm";
import OrderSummary from "./_components/OrderSummary";
import { theme } from "../../contexts/Theme";

// Data and utilities
import { steps, coveredPostcodes, timeSlots } from "./checkoutData";
import { useAuth } from "@/contexts/AuthContext";
import ApiServeces from "@/lib/ApiServeces";

// Define constants
const TURQUOISE = theme.palette.primary.main;
const DARK_BLUE = theme.palette.primary.darkBlue;

// Updated steps with payment method selection
const checkoutSteps = [
  { label: "Address", icon: <LocationOnIcon /> },
  { label: "Services", icon: <LocalLaundryServiceIcon /> },
  { label: "Schedule", icon: <AccessTimeIcon /> },
  { label: "Contact", icon: <PersonIcon /> },
  { label: "Payment", icon: <PaymentIcon /> },
];

const PaymentMethodSelection = ({ paymentData, handlePaymentChange }) => {
  return (
    <FormControl component="fieldset" sx={{ width: "100%", mt: 2 }}>
      <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
        Select Payment Method
      </FormLabel>
      <RadioGroup
        name="paymentMethod"
        value={paymentData.paymentMethod || "card"}
        onChange={handlePaymentChange}
      >
        <FormControlLabel
          value="card"
          control={<Radio />}
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CreditCardIcon />
              <span>Credit/Debit Card</span>
            </Box>
          }
          sx={{ mb: 1 }}
        />
        <FormControlLabel
          value="paypal"
          control={<Radio />}
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PayPalIcon />
              <span>PayPal</span>
            </Box>
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

export default function CheckoutProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const { user } = useAuth();

  // Helper function to split name into first and last names
  const splitName = (fullName) => {
    if (!fullName) return { firstName: "", lastName: "" };
    const parts = fullName.split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  };

  // Helper to split address
  const splitAddress = (address) => {
    if (!address) return { addressLine1: "", addressLine2: "" };
    const [line1, ...line2Parts] = address.split(",");
    return {
      addressLine1: line1?.trim() || "",
      addressLine2: line2Parts.join(",").trim() || "",
    };
  };

  // Form states initialized with user data
  const [addressData, setAddressData] = useState({
    addressType: "home",
    postcode: "",
    ...splitAddress(user?.address),
    city: "",
    notes: "",
  });

  const [servicesData, setServicesData] = useState({
    selectedServices: [],
  });

  const [scheduleData, setScheduleData] = useState({
    collectionDate: "",
    collectionTimeSlot: "",
    deliveryDate: "",
    deliveryTimeSlot: "",
  });

  const [contactData, setContactData] = useState({
    ...splitName(user?.name),
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    createAccount: false,
    password: "",
    marketingConsent: user?.preferences?.emailUpdates || false,
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: "card", // Default to card
  });

  // Cart state - initialize empty and will be populated from localStorage
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("laundryServiceCart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        // If no cart in localStorage and not coming from services page,
        // redirect back to services
        if (
          !searchParams.get("from") ||
          searchParams.get("from") !== "services"
        ) {
          router.push("/services");
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, [router, searchParams]);

  // Calculate cart totals based on API service format
  const calculateCartTotal = () => {
    if (!cart || cart.length === 0) return 0;

    return cart.reduce((total, item) => {
      // Handle different cart item formats
      if (item.totalPrice) {
        // Use pre-calculated total if available
        return total + Number(item.totalPrice);
      } else {
        // Calculate from price and quantity
        const price = Number(item.price || item.basePrice || 0);
        const optionPrice = Number(item.optionPrice || 0);
        const quantity = Number(item.quantity || 1);
        return total + (price + optionPrice) * quantity;
      }
    }, 0);
  };

  const cartTotal = calculateCartTotal();
  
  // Get cart item count
  const cartItemCount = cart.reduce((count, item) => {
    return count + Number(item.quantity || 1);
  }, 0);

  // Check if address is in coverage area
  const checkCoverage = (postcode) => {
    // Extract the first part of the postcode (e.g., "SW1" from "SW1A 1AA")
    const postcodeInput = postcode.trim().toUpperCase();

    // Remove spaces from input and check formats like N1, N16, etc.
    const postcodeNoSpace = postcodeInput.replace(/\s+/g, "");

    return coveredPostcodes.some((code) => {
      // Handle cases where the input might be N16XE (without space)
      // or where it might be something like SW1A1AA (without space)
      return postcodeNoSpace.startsWith(code) || postcodeInput.startsWith(code);
    });
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
      [name]: value,
    });

    // Clear the coverage error when postcode changes
    if (name === "postcode") {
      setAddressError(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value, checked, type } = e.target;
    setContactData({
      ...contactData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleScheduleChange = (name, value) => {
    setScheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  // Get service name from item
  const getServiceName = (item) => {
    return item.name;
  };

  // Get service price display
  const getServicePriceDisplay = (item) => {
    // Handle different price formats in cart items
    if (item.basePrice !== undefined && item.optionPrice !== undefined) {
      return `$${(Number(item.basePrice) + Number(item.optionPrice)).toFixed(
        2
      )}`;
    } else if (item.price !== undefined) {
      return `$${Number(item.price).toFixed(2)} ${item.priceType || ""}`;
    }
    return "$0.00";
  };

  // Function to adapt cart items for ServicesSummary component
  const adaptCartForSummary = () => {
    return cart.map((item) => ({
      name: getServiceName(item),
      priceType: item.priceType,
      pricePerItem: item.price,
      totalPrice: item.totalPrice,
      quantity: item.quantity,
      category: item.category,
      specifications: item.specifications || [],
    }));
  };

  const cartItems = adaptCartForSummary();

  const orderData = {
    items: cartItems,
    totalPrice: cartTotal,
    deliveryAddress: addressData,
    user: user?._id,
    paymentType: paymentData.paymentMethod,
    contactInfo: contactData,
    schedule: scheduleData,
  };

  const handleNext = async () => {
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
      isValid =
        scheduleData.collectionDate !== "" &&
        scheduleData.collectionTimeSlot !== "" &&
        scheduleData.deliveryDate !== "" &&
        scheduleData.deliveryTimeSlot !== "";
    } else if (activeStep === 3) {
      // Contact validation
      isValid =
        contactData.firstName &&
        contactData.lastName &&
        contactData.email &&
        contactData.phone;

      // If creating account, validate password
      if (contactData.createAccount && !contactData.password) {
        isValid = false;
      }
    } else if (activeStep === 4) {
      // Payment method validation
      isValid = !!paymentData.paymentMethod;
      
      if (isValid) {
        try {
          // Process payment based on selected method
          const response = await ApiServeces.payForOrderStripe(orderData);
          
          if (response.data.success || response.data.checkoutUrl) {
            localStorage.setItem(
              "orderData",
              JSON.stringify({
                orderData,
                cartTotal,
                contactData,
                scheduleData,
                timestamp: new Date().toISOString(),
              })
            );
            
            // Redirect to payment gateway
            router.push(response.data.checkoutUrl);
            return;
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          setIsLoading(false);
          return;
        }
      }
    }

    // Simulate network request for non-payment steps
    setTimeout(() => {
      setIsLoading(false);
      if (isValid && activeStep !== 4) { // Don't proceed to next step if it's the payment step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }, 800);
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
          <ServicesSummary cart={adaptCartForSummary()} total={cartTotal} />
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
          <PaymentMethodSelection
            paymentData={paymentData}
            handlePaymentChange={handlePaymentChange}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          bgcolor: "#E3FEF7",
          minHeight: "100vh",
          pt: 3,
          pb: 8,
          marginTop: "100px",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper
                elevation={3}
                sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}
              >
                <Box
                  sx={{
                    bgcolor: DARK_BLUE,
                    color: theme.palette.primary.whitishMint,
                    p: 2,
                  }}
                >
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
                    px: { xs: 1, sm: 4 },
                  }}
                >
                  {checkoutSteps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        StepIconComponent={({ active, completed }) => (
                          <Box
                            sx={{
                              borderRadius: "50%",
                              bgcolor:
                                active || completed ? DARK_BLUE : TURQUOISE,
                              color:
                                active || completed
                                  ? theme.palette.primary.whitishMint
                                  : DARK_BLUE,
                              width: 40,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
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

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 4,
                    }}
                  >
                    {activeStep !== 1 && (
                      <Button
                        disableElevation
                        variant="contained"
                        disabled={activeStep === 0 || isLoading}
                        onClick={handleBack}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                          borderRadius: 2,
                          bgcolor: theme.palette.primary.darkBlue,
                          color: theme.palette.primary.whitishMint,
                          px: 3,
                          py: 1,
                        }}
                      >
                        Back
                      </Button>
                    )}
                    {activeStep === 1 && <Box />}
                    <Button
                      disableElevation
                      variant="contained"
                      onClick={handleNext}
                      endIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <ArrowForwardIcon />
                        )
                      }
                      disabled={isLoading}
                      sx={{
                        borderRadius: 2,
                        bgcolor: theme.palette.primary.darkBlue,
                        color: theme.palette.primary.whitishMint,
                        px: 3,
                        py: 1,
                      }}
                    >
                      {activeStep === checkoutSteps.length - 1
                        ? "Complete Order"
                        : "Continue"}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ position: { md: "sticky" }, top: 20 }}>
                <OrderSummary
                  cart={cart}
                  cartTotal={cartTotal}
                  cartItemCount={cartItemCount}
                  addressData={addressData}
                  scheduleData={scheduleData}
                  activeStep={activeStep}
                  timeSlots={timeSlots}
                  getServiceName={getServiceName}
                  getServicePriceDisplay={getServicePriceDisplay}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}