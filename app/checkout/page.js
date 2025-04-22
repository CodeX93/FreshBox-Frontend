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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Component imports
import AddressForm from "./_components/AddressForm";
import ServicesSummary from "./_components/ServicesSummary";
import ScheduleForm from "./_components/ScheduleForm";
import ContactForm from "./_components/ContactForm";
import PaymentForm from "./_components/PaymentForm";
import OrderSummary from "./_components/OrderSummary";
import OrderConfirmation from "./_components/OrderConfirmation";
import { theme } from "../../contexts/Theme";

// Data and utilities
import { steps, coveredPostcodes, timeSlots } from "./checkoutData";
import { useAuth } from "@/contexts/AuthContext";
import ApiServeces from "@/lib/ApiServeces";

// Define constants
const TURQUOISE = theme.palette.primary.main;
const DARK_BLUE = theme.palette.primary.darkBlue;

export default function CheckoutProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

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

  // Get default payment method details
  const getDefaultPayment = (paymentMethods) => {
    if (!paymentMethods) return {};
    const defaultMethod = paymentMethods.find((method) => method.isDefault);
    if (!defaultMethod) return {};

    return {
      expiryDate: defaultMethod.expiry || "",
      nameOnCard: defaultMethod?.nameOnCard || "",
      cvv: defaultMethod.last4,
      cardNumber: defaultMethod.cardNumber,
      cardType: defaultMethod.type,
      paymentMethod: "card",
    };
  };
  console.log(user);
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
    ...getDefaultPayment(user?.paymentMethods),
  });

  // Only needed if user data might change after initial load
  useEffect(() => {
    if (user) {
      setAddressData((prev) => ({
        ...prev,
        ...splitAddress(user.address),
      }));

      setContactData((prev) => ({
        ...prev,
        ...splitName(user?.name),
        email: user?.email,
        phone: user?.phoneNumber,
        marketingConsent: user?.preferences?.emailUpdates || false,
      }));

      setPaymentData((prev) => ({
        ...prev,
        ...getDefaultPayment(user?.paymentMethods),
      }));
    }
  }, [user]);

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
        return total + ((price + optionPrice) * quantity);
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
    const { name, value, checked, type } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: type === "checkbox" ? checked : value,
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
      // Payment validation
      if (paymentData.paymentMethod === "card") {
        isValid =
          paymentData.cardNumber &&
          paymentData.expiryDate &&
          paymentData.cvv &&
          paymentData.nameOnCard;
      }

      // For the demo, we'll always consider payment successful
      if (isValid) {
        try {
          console.log(orderData)
          const res = await ApiServeces.createOrder(orderData);
          if (res.data.success) {
            const orderId = res.data.order._id;
            setOrderId(orderId);

            localStorage.removeItem("laundryServiceCart");
            setOrderComplete(true);
            setIsLoading(false);
          }
        } catch (error) {
          console.log;
        }

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
          <PaymentForm
            paymentData={paymentData}
            handlePaymentChange={handlePaymentChange}
            total={cartTotal}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      {/* <Navbar /> */}
   
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
          {orderComplete ? (
            <OrderConfirmation
              orderId={orderId}
              cartTotal={cartTotal}
              contactData={contactData}
              scheduleData={scheduleData}
            />
          ) : (
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
                    {steps.map((step, index) => (
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
                      {activeStep === 1 && <Box />}{" "}
                      {/* Empty box to maintain layout when back button is hidden */}
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
                        {activeStep === steps.length - 1
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
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}
