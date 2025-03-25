'use client';
import { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../contexts/Theme'; // Update path to match your project structure
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ServicesHero from './components/ServicesHero';
import HowItWorks from './components/HowItWorks';
import ServicesList from './components/ServicesList';
import FAQSection from './components/FAQSection';
import OrderSummary from './components/OrderSummary';
import DeliveryInfo from './components/DeliveryInfo';
import CTABanner from './components/CTABanner';

// Service data moved to a separate file (to be imported by components that need it)
// See servicesData.js for the full data

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState([]);
  
  // Handle adding a service to cart
  const handleAddToCart = (service, option) => {
    const cartItem = {
      id: `${service.id}-${Date.now()}`,
      serviceId: service.id, 
      name: service.title,
      basePrice: service.price,
      option: option.name,
      optionPrice: option.price,
      totalPrice: service.price + option.price,
      quantity: 1
    };
    
    setCart([...cart, cartItem]);
  };

  // Handle removing an item from cart
  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };
  
  // Update quantity of an item in the cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: (item.basePrice + item.optionPrice) * newQuantity
        };
      }
      return item;
    }));
  };

  // Calculate cart totals
  const cartTotal = cart.reduce((total, item) => total + item.totalPrice * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        
        {/* Hero Section */}
        <ServicesHero />

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Left Side - Services */}
            <Grid item xs={12} md={8}>
              {/* Service tabs and listings */}
              <ServicesList 
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                handleAddToCart={handleAddToCart}
              />
              
              {/* How It Works Section */}
              <HowItWorks />
              
              {/* FAQ Section */}
              <FAQSection />
            </Grid>
            
            {/* Right Side - Order Summary */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: { md: 'sticky' }, top: 20 }}>
                {/* Order Summary Component */}
                <OrderSummary 
                  cart={cart}
                  cartTotal={cartTotal}
                  cartItemCount={cartItemCount}
                  handleRemoveFromCart={handleRemoveFromCart}
                  updateQuantity={updateQuantity}
                />
                
                {/* Delivery Info Component */}
                <DeliveryInfo />
              </Box>
            </Grid>
          </Grid>
          
          {/* CTA Banner */}
          <CTABanner />
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
}