'use client';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Fab, 
  Badge, 
  Drawer, 
  IconButton, 
  Typography, 
  Divider,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

// Import theme and components
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

export default function ServicesPage() {
  const customTheme = useTheme();
  const isMobile = useMediaQuery(customTheme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [highlightCart, setHighlightCart] = useState(false);

  // Handle scroll position for sticky elements
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle adding a service to cart
  const handleAddToCart = (service, option) => {
    const existingItemIndex = cart.findIndex(
      item => item.serviceId === service.id && item.option === option.name
    );

    let newCart;
    
    if (existingItemIndex > -1) {
      // If item already exists, update quantity
      newCart = [...cart];
      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantity: newCart[existingItemIndex].quantity + 1,
        totalPrice: (newCart[existingItemIndex].basePrice + newCart[existingItemIndex].optionPrice) * 
                   (newCart[existingItemIndex].quantity + 1)
      };
    } else {
      // Add new item
      const cartItem = {
        id: `${service.id}-${Date.now()}`,
        serviceId: service.id,
        name: service.title,
        basePrice: service.price,
        option: option.name,
        optionPrice: option.price,
        totalPrice: service.price + option.price,
        quantity: 1,
        image: service.image
      };
      newCart = [...cart, cartItem];
    }
    
    setCart(newCart);
    
    // Show notification
    setNotification({
      open: true,
      message: `${service.title} (${option.name}) added to cart`,
      severity: 'success'
    });
    
    // Highlight cart button
    setHighlightCart(true);
    setTimeout(() => setHighlightCart(false), 1000);
    
    // Open drawer on mobile
    if (isMobile) {
      setCartDrawerOpen(true);
    }
  };
  
  // Handle removing an item from cart
  const handleRemoveFromCart = (itemId) => {
    const itemToRemove = cart.find(item => item.id === itemId);
    setCart(cart.filter(item => item.id !== itemId));
    
    // Show notification
    if (itemToRemove) {
      setNotification({
        open: true,
        message: `${itemToRemove.name} removed from cart`,
        severity: 'info'
      });
    }
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
  const cartTotal = cart.reduce((total, item) => total + item.totalPrice, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    
    // Scroll to top of services list on tab change
    const servicesList = document.getElementById('services-list-section');
    if (servicesList) {
      servicesList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Toggle cart drawer
  const toggleCartDrawer = (open) => {
    setCartDrawerOpen(open);
  };
  
  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          bgcolor: 'background.default', 
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          pb: 10 // Add padding for footer
        }}
      >
        {/* Background decoration - subtle pattern */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(40, 221, 205, 0.04) 2px, transparent 0), radial-gradient(circle at 40px 70px, rgba(40, 221, 205, 0.03) 2px, transparent 0)',
            backgroundSize: '100px 100px',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />

        {/* Hero Section */}
        <ServicesHero />
        
        {/* Main Content */}
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: { xs: 4, md: 6 }, 
            position: 'relative',
            zIndex: 1
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Grid container spacing={4}>
              {/* Left Side - Services */}
              <Grid item xs={12} md={8}>
                <motion.div variants={itemVariants}>
                  {/* Service tabs and listings */}
                  <Box id="services-list-section">
                    <ServicesList
                      activeTab={activeTab}
                      handleTabChange={handleTabChange}
                      handleAddToCart={handleAddToCart}
                    />
                  </Box>
                </motion.div>

                <motion.div variants={itemVariants}>
                  {/* How It Works Section - Added spacing */}
                  <Box sx={{ mt: { xs: 6, md: 8 }, mb: { xs: 6, md: 8 } }}>
                    <Paper 
                      elevation={1}
                      sx={{ 
                        p: { xs: 2, sm: 3, md: 4 }, 
                        borderRadius: 3,
                        border: '1px solid rgba(0,0,0,0.05)'
                      }}
                    >
                      <HowItWorks />
                    </Paper>
                  </Box>
                </motion.div>

                <motion.div variants={itemVariants}>
                  {/* FAQ Section */}
                  <Box sx={{ mb: { xs: 4, md: 0 } }}>
                    <FAQSection />
                  </Box>
                </motion.div>
              </Grid>
              
              {/* Right Side - Order Summary */}
              <Grid item xs={12} md={4}>
                <Box 
                  sx={{ 
                    position: { md: 'sticky' }, 
                    top: 100,
                    display: { xs: 'none', md: 'block' }
                  }}
                >
                  <motion.div variants={itemVariants}>
                    {/* Order Summary Component */}
                    <OrderSummary
                      cart={cart}
                      cartTotal={cartTotal}
                      cartItemCount={cartItemCount}
                      handleRemoveFromCart={handleRemoveFromCart}
                      updateQuantity={updateQuantity}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    {/* Delivery Info Component */}
                    <Box sx={{ mt: 3 }}>
                      <DeliveryInfo />
                    </Box>
                  </motion.div>
                </Box>
              </Grid>
            </Grid>
            
            {/* CTA Banner */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mt: { xs: 6, md: 8 } }}>
                <CTABanner />
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
      
      {/* Mobile Cart Fab Button */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="shopping cart"
          sx={{ 
            position: 'fixed', 
            bottom: 20, 
            right: 20,
            zIndex: 1000,
            bgcolor: theme.palette.primary.main,
            transform: highlightCart ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.3s ease',
            boxShadow: highlightCart ? 
              '0 0 0 6px rgba(40, 221, 205, 0.3), 0 6px 16px rgba(0,0,0,0.2)' : 
              '0 6px 10px rgba(0,0,0,0.2)'
          }}
          onClick={() => toggleCartDrawer(true)}
        >
          <Badge 
            badgeContent={cartItemCount} 
            color="error"
            max={99}
            sx={{ 
              '& .MuiBadge-badge': {
                fontSize: '0.7rem',
                height: 18,
                minWidth: 18,
                fontWeight: 'bold'
              }
            }}
          >
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      )}
      
      {/* Mobile Cart Drawer */}
      <Drawer
        anchor="right"
        open={cartDrawerOpen}
        onClose={() => toggleCartDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: isSmallScreen ? '100%' : '85%',
            maxWidth: 500,
            borderTopLeftRadius: isSmallScreen ? 0 : 12,
            borderBottomLeftRadius: isSmallScreen ? 0 : 12,
            boxShadow: '-5px 0 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: theme.palette.primary.main, color: 'white' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Your Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
          </Typography>
          <IconButton 
            onClick={() => toggleCartDrawer(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
          <OrderSummary
            cart={cart}
            cartTotal={cartTotal}
            cartItemCount={cartItemCount}
            handleRemoveFromCart={handleRemoveFromCart}
            updateQuantity={updateQuantity}
            isMobileDrawer={true}
          />
          
          <Box sx={{ mt: 3 }}>
            <DeliveryInfo isMobileView={true} />
          </Box>
        </Box>
      </Drawer>
      
      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ 
            width: '100%',
            borderRadius: 2,
            '& .MuiAlert-icon': {
              color: notification.severity === 'success' ? theme.palette.primary.main : undefined
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}