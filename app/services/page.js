'use client';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { 
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Container,
  Paper,
  Divider,
  Chip,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  useTheme,
  Tooltip,
  Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import IronIcon from '@mui/icons-material/Iron';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';


// Service data with more details and images
const services = [
  {
    id: 1,
    title: "Wash & Fold",
    price: 1.50,
    unit: "per item",
    icon: <LocalLaundryServiceIcon sx={{ fontSize: 40 }} />,
    image: "/images/wash-fold.jpg",
    color: "#e3f2fd",
    description: "Our premium wash & fold service cleans and neatly folds your everyday clothing and linens using eco-friendly detergents.",
    features: [
      "2-hour collection window",
      "48-hour standard service",
      "Eco-friendly detergents",
      "Weight-based pricing"
    ],
    options: [
      { name: "Standard (48h)", price: 0, turnaround: "48 hours" },
      { name: "Express (24h)", price: 5, turnaround: "24 hours" },
      { name: "Same Day", price: 10, turnaround: "Same day" }
    ]
  },
  {
    id: 2,
    title: "Dry Cleaning",
    price: 3.50,
    unit: "per item",
    icon: <DryCleaningIcon sx={{ fontSize: 40 }} />,
    image: "/images/dry-cleaning.jpg",
    color: "#fff8e1",
    description: "Professional dry cleaning for your delicate garments and fabrics requiring special care and treatment.",
    features: [
      "Specialist stain removal",
      "Professional pressing",
      "Next-day service",
      "Wedding dress cleaning"
    ],
    options: [
      { name: "Standard (48h)", price: 0, turnaround: "48 hours" },
      { name: "Express (24h)", price: 7, turnaround: "24 hours" }
    ]
  },
  {
    id: 3,
    title: "Ironing",
    price: 2.00,
    unit: "per item",
    icon: <IronIcon sx={{ fontSize: 40 }} />,
    image: "/images/ironing.jpg",
    color: "#f3e5f5",
    description: "Expert ironing service to give your garments that crisp, professional finish for work or special occasions.",
    features: [
      "Same-day service",
      "Expert handling",
      "Hanging or folding",
      "Bulk discounts"
    ],
    options: [
      { name: "Standard (48h)", price: 0, turnaround: "48 hours" },
      { name: "Express (24h)", price: 3, turnaround: "24 hours" },
      { name: "Same Day", price: 6, turnaround: "Same day" }
    ]
  },
  {
    id: 4,
    title: "Household",
    price: 10.00,
    unit: "per item",
    icon: <CheckroomIcon sx={{ fontSize: 40 }} />,
    image: "/images/household.jpg",
    color: "#e8f5e9",
    description: "Specialized cleaning for larger household items like duvets, blankets, curtains, and other home textiles.",
    features: [
      "Duvets & blankets",
      "Curtains & drapes",
      "Cushion covers",
      "Specialist cleaning"
    ],
    options: [
      { name: "Standard (72h)", price: 0, turnaround: "72 hours" },
      { name: "Express (48h)", price: 8, turnaround: "48 hours" }
    ]
  }
];

// How it works steps
const howItWorksSteps = [
  {
    label: "Select Services",
    description: "Choose from our range of laundry and dry cleaning services",
    icon: <CleaningServicesIcon color="primary" />
  },
  {
    label: "Schedule Pickup",
    description: "Pick a convenient time for us to collect your items",
    icon: <DeliveryDiningIcon color="primary" />
  },
  {
    label: "Professional Cleaning",
    description: "We clean your items with eco-friendly methods",
    icon: <WaterDropIcon color="primary" />
  },
  {
    label: "Delivery",
    description: "Your fresh, clean items delivered back to your door",
    icon: <LocalLaundryServiceIcon color="primary" />
  }
];

export default function ServicesPage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState([]);
  const [expandedAccordion, setExpandedAccordion] = useState('panel1');
  const router = useRouter();
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

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
    <Navbar />
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ 
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/laundry-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 800,
                  fontSize: '3.5rem',
                  mb: 2,
                  color: 'white',
                  [theme.breakpoints.down('md')]: { fontSize: '2.5rem' }
                }}>
                  Premium Laundry<br/>Services
                </Typography>
                <Typography variant="h5" sx={{ 
                  fontWeight: 400, 
                  color: 'white',
                  mb: 4
                }}>
                  Save time with our professional cleaning services
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    sx={{ 
                      py: 1.5, 
                      px: 4,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                  >
                    Book Now
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    sx={{ 
                      py: 1.5, 
                      px: 4,
                      borderRadius: 2,
                      color: 'white',
                      borderColor: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Paper elevation={5} sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    Why Choose Us?
                  </Typography>
                  <List>
                    {[
                      'Free pickup and delivery',
                      'Eco-friendly cleaning solutions',
                      'Fast turnaround times', 
                      '100% satisfaction guarantee',
                      'Expert handling of delicate fabrics'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Left Side - Services */}
          <Grid item xs={12} md={8}>
            {/* Services Navigation */}
            <Paper elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                variant="scrollable"
                scrollButtons="auto"
                sx={{ px: 2 }}
              >
                <Tab 
                  icon={<LocalLaundryServiceIcon />} 
                  label="All Services" 
                  iconPosition="start"
                />
                {services.map((service, index) => (
                  <Tab 
                    key={index}
                    icon={service.icon} 
                    label={service.title} 
                    iconPosition="start"
                  />
                ))}
              </Tabs>
            </Paper>

            {/* How It Works Section */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                How It Works
              </Typography>
              <Stepper alternativeLabel sx={{ mb: 2 }}>
                {howItWorksSteps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel 
                      StepIconComponent={() => (
                        <Avatar sx={{ 
                          width: 40, 
                          height: 40, 
                          bgcolor: theme.palette.primary.main 
                        }}>
                          {step.icon}
                        </Avatar>
                      )}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {step.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {step.description}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>

            {/* Service Cards */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              {activeTab === 0 ? 'Our Services' : services[activeTab-1].title}
            </Typography>
            
            <Grid container spacing={3}>
              {(activeTab === 0 ? services : [services[activeTab-1]]).map((service) => (
                <Grid item xs={12} key={service.id}>
                  <Card 
                    elevation={3} 
                    sx={{ 
                      borderRadius: 2,
                      overflow: 'visible',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-5px)' }
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <CardMedia
                          component="img"
                          height="100%"
                          image={service.image || "/placeholder-service.jpg"}
                          alt={service.title}
                          sx={{ 
                            height: { xs: 200, md: '100%' },
                            objectFit: 'cover'
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                {service.title}
                              </Typography>
                              <Typography 
                                variant="h6" 
                                color="primary" 
                                sx={{ fontWeight: 700, mb: 2 }}
                              >
                                £{service.price.toFixed(2)} {service.unit}
                              </Typography>
                            </Box>
                            <Box 
                              sx={{ 
                                bgcolor: service.color || 'primary.light', 
                                borderRadius: '50%',
                                p: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {service.icon}
                            </Box>
                          </Box>
                          
                          <Typography variant="body1" sx={{ mb: 3 }}>
                            {service.description}
                          </Typography>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Features
                              </Typography>
                              <List dense>
                                {service.features.map((feature, i) => (
                                  <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 28 }}>
                                      <CheckIcon color="success" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary={feature} 
                                      primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Turnaround Options
                              </Typography>
                              <Stack spacing={1}>
                                {service.options.map((option, i) => (
                                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                      <Typography variant="body2">
                                        {option.name}
                                      </Typography>
                                    </Box>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() => handleAddToCart(service, option)}
                                      startIcon={<AddIcon />}
                                      sx={{ borderRadius: 6, textTransform: 'none' }}
                                    >
                                      {option.price > 0 ? `+£${option.price.toFixed(2)}` : 'Add'}
                                    </Button>
                                  </Box>
                                ))}
                              </Stack>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pricing FAQs */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Frequently Asked Questions
              </Typography>
              
              <Accordion 
                expanded={expandedAccordion === 'panel1'} 
                onChange={handleAccordionChange('panel1')}
                sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    How does weight-based pricing work?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Our weight-based pricing works on a simple principle - we charge per kilogram of laundry. 
                    The minimum order is 6kg at £9.00, and each additional kilogram is charged at £1.50. 
                    This pricing model is perfect for regular laundry needs like clothing, bedding, and towels.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Accordion 
                expanded={expandedAccordion === 'panel2'} 
                onChange={handleAccordionChange('panel2')}
                sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    What is the difference between Dry Cleaning and Wash & Fold?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Wash & Fold is for everyday items that can be machine washed, while Dry Cleaning uses 
                    special solvents to clean delicate fabrics that can't be washed with water. 
                    Dry cleaning is recommended for suits, silk, wool, and items with "dry clean only" labels.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Accordion 
                expanded={expandedAccordion === 'panel3'} 
                onChange={handleAccordionChange('panel3')}
                sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Do you offer express or same-day service?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Yes, we offer express and same-day services for most of our laundry options. 
                    Express service has a 24-hour turnaround while same-day service ensures your items are 
                    back to you on the same day if collected before 10 AM. Additional charges apply for these services.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
          
          {/* Right Side - Order Summary */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: 'sticky' }, top: 20 }}>
              <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  p: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <ShoppingCartIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Your Order
                  </Typography>
                  <Badge 
                    badgeContent={cartItemCount} 
                    color="error" 
                    sx={{ ml: 'auto' }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </Box>
                
                <Box sx={{ p: 3 }}>
                  {cart.length === 0 ? (
                    <Box sx={{ py: 4, textAlign: 'center' }}>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Your cart is empty
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add services to get started
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <List sx={{ mb: 2 }}>
                        {cart.map((item) => (
                          <ListItem 
                            key={item.id}
                            secondaryAction={
                              <IconButton 
                                edge="end" 
                                onClick={() => handleRemoveFromCart(item.id)}
                                size="small"
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            }
                            sx={{ px: 0, py: 1 }}
                          >
                            <ListItemText
                              primary={
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {item.name} - {item.option}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body2" color="text.secondary">
                                  £{(item.basePrice + item.optionPrice).toFixed(2)} {item.quantity > 1 ? `x ${item.quantity}` : ''}
                                </Typography>
                              }
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                              <IconButton 
                                size="small" 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography sx={{ mx: 1, minWidth: 20, textAlign: 'center' }}>
                                {item.quantity}
                              </Typography>
                              <IconButton 
                                size="small" 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Subtotal</Typography>
                        <Typography variant="body2">£{cartTotal.toFixed(2)}</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Collection & Delivery</Typography>
                        <Typography variant="body2">Free</Typography>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          £{cartTotal.toFixed(2)}
                        </Typography>
                      </Box>
                    </>
                  )}
                  
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    onClick={() => router.push('/checkout')}
                    disabled={cart.length === 0}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Paper>
              
              {/* Delivery Info */}
              <Paper elevation={2} sx={{ mt: 3, p: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Delivery Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <DeliveryDiningIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    Free collection & delivery in London zones 1-3
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    2-hour collection window
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Chip 
                    label="Minimum Order £15" 
                    color="primary" 
                    variant="outlined" 
                    size="small" 
                  />
                  <Chip 
                    label="Weekend Delivery Available" 
                    color="success" 
                    variant="outlined" 
                    size="small" 
                  />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        
        {/* CTA Banner */}
        <Paper 
          elevation={0} 
          sx={{ 
            mt: 8,
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Try Our Services Today
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Join thousands of satisfied customers who have made laundry day a thing of the past.
            Get started with your first order and enjoy 15% off with code WELCOME15.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              bgcolor: 'white',
              color: 'primary.main',
              fontWeight: 600,
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                color: 'primary.dark'
              },
              borderRadius: 2
            }}
          >
            Get Started Now
          </Button>
        </Paper>
      </Container>
    </Box>
    <Footer />
    </>
  );
}

// Add the Avatar component since it's used but wasn't imported
