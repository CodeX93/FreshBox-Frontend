'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fade,
  Chip
} from '@mui/material';

import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  QuestionAnswer as FAQIcon,
  Help as HelpIcon,
  Chat as ChatIcon,
  VideoCall as VideoCallIcon,
  Book as GuideIcon,
  ContactSupport as SupportIcon,
  Send as SendIcon,
  CheckCircle as SuccessIcon,
  AccessTime as ClockIcon
} from '@mui/icons-material';

// Define constants
const TURQUOISE = '#28ddcd';
const TURQUOISE_DARK = '#20c5b7';
const TURQUOISE_LIGHT = '#e8f9f8';

// FAQ data
const faqData = [
  {
    question: "How do I schedule a laundry pickup?",
    answer: "You can schedule a pickup through our website or mobile app. Simply log in to your account, select 'Schedule Pickup' from the dashboard, choose your preferred date and time slot, and confirm your booking."
  },
  {
    question: "What is the turnaround time for regular laundry services?",
    answer: "Our standard turnaround time for regular wash & fold services is 24 hours. For specialized services like dry cleaning, it may take 2-3 business days depending on the items and treatment required."
  },
  {
    question: "How does your pricing work?",
    answer: "Our pricing is transparent and calculated by weight for wash & fold services. Dry cleaning and specialized treatments are priced per item. You can view our detailed pricing chart on the Services page or request a custom quote for commercial services."
  },
  {
    question: "Do you offer rush or same-day service?",
    answer: "Yes, we offer rush and same-day services for an additional fee, subject to availability. Please schedule your pickup before 9 AM to ensure same-day service completion."
  },
  {
    question: "What areas do you service?",
    answer: "We currently serve the greater metropolitan area including downtown and surrounding neighborhoods. Check our Locations page for specific service boundaries or enter your zip code on our homepage to verify service availability."
  },
  {
    question: "How do I change or cancel my scheduled pickup?",
    answer: "You can modify or cancel your scheduled pickup through your account dashboard up to 2 hours before the scheduled time without any penalty. Changes made after this window may incur a rescheduling fee."
  },
  {
    question: "Do you provide special handling for delicate garments?",
    answer: "Absolutely! We offer specialized care for delicate fabrics, designer items, and heirloom textiles. Simply mark these items as 'Special Care' when scheduling your pickup, and our experts will ensure appropriate handling."
  },
  {
    question: "How do I track my order status?",
    answer: "You can track your order in real-time through your account dashboard or by using the order tracking number sent to you via email/SMS after pickup. Our system updates you at each stage from pickup to delivery."
  }
];

// Support categories
const supportCategories = [
  { value: "general", label: "General Inquiry" },
  { value: "order", label: "Order Issue" },
  { value: "service", label: "Service Question" },
  { value: "billing", label: "Billing Problem" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "technical", label: "Technical Support" },
  { value: "commercial", label: "Commercial Services" },
  { value: "other", label: "Other" }
];

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
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  const [searchActive, setSearchActive] = useState(false);
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle FAQ search
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchActive(query.trim() !== '');
    
    if (query.trim() === '') {
      setFilteredFAQs(faqData);
    } else {
      const filtered = faqData.filter(
        faq => 
          faq.question.toLowerCase().includes(query) || 
          faq.answer.toLowerCase().includes(query)
      );
      setFilteredFAQs(filtered);
    }
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
  
  // Handle accordion expansion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedFAQ(isExpanded ? panel : false);
  };
  
  // Close snackbar alerts
  const handleCloseAlert = () => {
    setSuccessMessage(false);
    setErrorMessage(false);
  };
  
  // Set loaded state when component mounts
  useEffect(() => {
    setLoaded(true);
  }, []);
  
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
      <Box 
        sx={{ 
          background: `linear-gradient(135deg, #fff, ${TURQUOISE}15)`,
          py: { xs: 6, md: 8 },
          mb: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Hero Background Elements */}
        {!isMobile && (
          <>
            <Box sx={{
              position: 'absolute',
              right: -20,
              top: 20,
              width: '50%',
              height: '50%',
              background: `radial-gradient(circle, ${TURQUOISE}10, ${TURQUOISE}00)`,
              opacity: 0.8,
              zIndex: 0
            }} />
            
            <Box sx={{
              position: 'absolute',
              right: 100,
              top: -40,
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: `2px dashed ${TURQUOISE}40`,
              zIndex: 0
            }} />
            
            <Box sx={{
              position: 'absolute',
              left: '10%',
              bottom: '10%',
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: `2px dashed ${TURQUOISE}30`,
              zIndex: 0
            }} />
          </>
        )}
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={loaded} timeout={800}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h2" 
                  component="h1"
                  sx={{ 
                    fontWeight: 800,
                    color: '#2d3748',
                    mb: 2,
                    fontSize: { xs: '2.25rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                    position: 'relative',
                    display: 'inline-block'
                  }}
                >
                  How Can We Help You?
                  <Box sx={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: '30%',
                    height: 4,
                    bgcolor: TURQUOISE,
                    borderRadius: 2
                  }} />
                </Typography>
                <Typography 
                  variant="h5"
                  sx={{ 
                    color: '#4a5568',
                    mb: 4, 
                    maxWidth: 550,
                    fontWeight: 400,
                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' },
                    lineHeight: 1.5
                  }}
                >
                  We're here to assist with any questions about our laundry and cleaning services.
                </Typography>
                
                {/* Search Bar */}
                <Paper
                  elevation={searchActive ? 3 : 1}
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    p: 0.75,
                    pl: 2.5,
                    border: '1px solid',
                    borderColor: searchActive ? TURQUOISE : 'grey.200',
                    borderRadius: '16px',
                    maxWidth: 550,
                    mb: { xs: 4, md: 1 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      borderColor: TURQUOISE
                    }
                  }}
                >
                  <SearchIcon sx={{ color: searchActive ? TURQUOISE : 'text.secondary', mr: 1.5 }} />
                  <TextField
                    fullWidth
                    placeholder="Search our help resources..."
                    variant="standard"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      disableUnderline: true,
                      style: { fontSize: '1.05rem' }
                    }}
                    sx={{ flex: 1 }}
                  />
                  <Button 
                    variant="contained"
                    disableElevation
                    sx={{ 
                      bgcolor: TURQUOISE,
                      color: 'white',
                      borderRadius: '12px',
                      px: { xs: 2, sm: 3 },
                      py: 1.2,
                      fontWeight: 600,
                      '&:hover': { bgcolor: TURQUOISE_DARK }
                    }}
                  >
                    Search
                  </Button>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: { xs: 2, sm: 3 }
                  }}
                >
                  {/* Support Option Cards */}
                  {[
                    { icon: <ChatIcon sx={{ fontSize: 36 }} />, title: "Live Chat", desc: "Chat with our support team" },
                    { icon: <PhoneIcon sx={{ fontSize: 36 }} />, title: "Call Us", desc: "Speak directly with support" },
                    { icon: <VideoCallIcon sx={{ fontSize: 36 }} />, title: "Video Consult", desc: "Schedule a video call" },
                    { icon: <GuideIcon sx={{ fontSize: 36 }} />, title: "Help Center", desc: "Browse support articles" }
                  ].map((option, index) => (
                    <Fade key={index} in={loaded} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          width: { xs: '100%', sm: 'calc(50% - 24px)' },
                          borderRadius: 4,
                          border: '1px solid',
                          borderColor: 'grey.100',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': { 
                            borderColor: TURQUOISE,
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                          },
                          '&:hover .icon-background': {
                            transform: 'scale(1.2)'
                          }
                        }}
                      >
                        <Box className="icon-background" sx={{
                          position: 'absolute',
                          top: -20,
                          right: -20,
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          bgcolor: `${TURQUOISE}15`,
                          transition: 'transform 0.5s ease'
                        }} />
                        
                        <CardContent sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          p: { xs: 2.5, sm: 3 }
                        }}>
                          <Box sx={{ 
                            color: TURQUOISE, 
                            mb: 2,
                            p: 1.5,
                            borderRadius: '12px',
                            bgcolor: TURQUOISE_LIGHT,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {option.icon}
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            {option.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {option.desc}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Fade>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Contact Form Section */}
          <Grid item xs={12} lg={6}>
            <Fade in={loaded} timeout={1000}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 3, sm: 4, md: 5 },
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'grey.100',
                  height: '100%',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${TURQUOISE}, ${TURQUOISE}50)`
                }} />
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h4" component="h2" fontWeight={800} sx={{ mb: 1.5, color: '#2d3748' }}>
                    Contact Us
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </Typography>
                  <Divider />
                </Box>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            }
                          }
                        }}
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
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl 
                        fullWidth 
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            }
                          }
                        }}
                      >
                        <InputLabel id="category-label">Support Category</InputLabel>
                        <Select
                          labelId="category-label"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          label="Support Category"
                        >
                          {supportCategories.map(category => (
                            <MenuItem key={category.value} value={category.value}>
                              {category.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Order Number (if applicable)"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={6}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: TURQUOISE
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        sx={{ 
                          py: 1.5,
                          px: 4,
                          bgcolor: TURQUOISE,
                          color: 'white',
                          borderRadius: '12px',
                          fontWeight: 600,
                          boxShadow: '0 4px 14px rgba(40, 221, 205, 0.4)',
                          '&:hover': { 
                            bgcolor: TURQUOISE_DARK,
                            boxShadow: '0 6px 20px rgba(40, 221, 205, 0.6)',
                          }
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mt: 2, 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: { xs: 'center', sm: 'flex-start' } 
                        }}
                      >
                        <ClockIcon fontSize="small" sx={{ mr: 0.5, color: TURQUOISE }} />
                        We typically respond within 24 hours
                      </Typography>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Fade>
          </Grid>
          
          {/* FAQ Section */}
          <Grid item xs={12} lg={6}>
            <Fade in={loaded} timeout={1000} style={{ transitionDelay: '200ms' }}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 3, sm: 4, md: 5 },
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'grey.100',
                  height: '100%',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${TURQUOISE}50, ${TURQUOISE})`
                }} />
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h4" component="h2" fontWeight={800} sx={{ mb: 1.5, color: '#2d3748' }}>
                    Frequently Asked Questions
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    Find quick answers to common questions about our services.
                  </Typography>
                  <Divider />
                </Box>
                
                <Box sx={{ mb: 4 }}>
                  {filteredFAQs.length === 0 ? (
                    <Box sx={{ 
                      textAlign: 'center', 
                      py: 6,
                      px: 2,
                      bgcolor: 'rgba(0,0,0,0.02)',
                      borderRadius: 3
                    }}>
                      <HelpIcon sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" fontWeight={600}>
                        No results found for "{searchQuery}"
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, mb: 3 }}>
                        Try different keywords or browse all FAQs below
                      </Typography>
                      <Button 
                        variant="outlined"
                        onClick={() => setSearchQuery('')}
                        sx={{ 
                          borderColor: TURQUOISE,
                          color: TURQUOISE,
                          borderRadius: 2,
                          '&:hover': { 
                            borderColor: TURQUOISE_DARK,
                            bgcolor: TURQUOISE_LIGHT 
                          }
                        }}
                      >
                        Clear Search
                      </Button>
                    </Box>
                  ) : (
                    <>
                      {searchActive && (
                        <Chip
                          label={`${filteredFAQs.length} results for "${searchQuery}"`}
                          variant="outlined"
                          onDelete={() => setSearchQuery('')}
                          sx={{ 
                            mb: 2, 
                            bgcolor: TURQUOISE_LIGHT,
                            color: TURQUOISE_DARK,
                            borderColor: TURQUOISE,
                            '& .MuiChip-deleteIcon': {
                              color: TURQUOISE,
                              '&:hover': { color: TURQUOISE_DARK }
                            }
                          }}
                        />
                      )}
                      
                      {filteredFAQs.map((faq, index) => (
                        <Accordion 
                          key={index}
                          expanded={expandedFAQ === `panel${index}`}
                          onChange={handleAccordionChange(`panel${index}`)}
                          elevation={0}
                          disableGutters
                          sx={{ 
                            border: '1px solid',
                            borderColor: expandedFAQ === `panel${index}` ? TURQUOISE : 'grey.200',
                            mb: 2,
                            borderRadius: '12px !important',
                            overflow: 'hidden',
                            '&::before': { display: 'none' },
                            '&.Mui-expanded': { 
                              margin: '0 0 16px 0',
                              borderColor: TURQUOISE,
                              boxShadow: `0 4px 12px ${TURQUOISE}30`
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ 
                                color: expandedFAQ === `panel${index}` ? TURQUOISE : 'text.secondary',
                                transition: 'transform 0.3s ease',
                                transform: expandedFAQ === `panel${index}` ? 'rotate(180deg)' : 'rotate(0deg)'
                              }} />
                            }
                            sx={{ 
                              px: 3,
                              py: 1.5,
                              backgroundColor: expandedFAQ === `panel${index}` ? TURQUOISE_LIGHT : 'transparent',
                              '& .MuiAccordionSummary-content': { 
                                display: 'flex',
                                alignItems: 'center',
                                margin: '10px 0'
                              }
                            }}
                          >
                            <Box sx={{ 
                              color: 'white', 
                              bgcolor: TURQUOISE,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              mr: 2,
                              flexShrink: 0,
                              transition: 'all 0.3s ease'
                            }}>
                              <FAQIcon fontSize="small" />
                            </Box>
                            <Typography 
                              variant="h6" 
                              fontWeight={600} 
                              fontSize="1.05rem"
                              color={expandedFAQ === `panel${index}` ? TURQUOISE_DARK : 'text.primary'}
                            >
                              {faq.question}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ px: 3, pt: 0, pb: 3 }}>
                            <Typography 
                              variant="body1" 
                              color="text.secondary" 
                              sx={{ 
                                ml: 6, 
                                lineHeight: 1.7,
                                position: 'relative',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  left: -20,
                                  top: 0,
                                  bottom: 0,
                                  width: 2,
                                  bgcolor: `${TURQUOISE}30`,
                                  borderRadius: 8
                                }
                              }}
                            >
                              {faq.answer}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </>
                  )}
                </Box>
                
                <Box 
                  sx={{ 
                    bgcolor: TURQUOISE_LIGHT,
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: `${TURQUOISE}30`,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    gap: { xs: 2, sm: 3 },
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{
                    position: 'absolute',
                    right: -30,
                    bottom: -30,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    bgcolor: `${TURQUOISE}15`,
                    zIndex: 0
                  }} />
                  
                  <Box 
                    sx={{ 
                      bgcolor: 'white',
                      color: TURQUOISE,
                      width: { xs: 50, sm: 60 },
                      height: { xs: 50, sm: 60 },
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      zIndex: 1,
                      flexShrink: 0
                    }}
                  >
                    <SupportIcon sx={{ fontSize: { xs: 30, sm: 36 } }} />
                  </Box>
                  
                  <Box sx={{ 
                    flex: 1,
                    textAlign: { xs: 'center', sm: 'left' },
                    zIndex: 1
                  }}>
                    <Typography 
                      variant="h6" 
                      fontWeight={700} 
                      sx={{ 
                        mb: 0.5,
                        color: '#2d3748'
                      }}
                    >
                      Still have questions?
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ mb: { xs: 2, sm: 1.5 } }}
                    >
                      Our support team is available 24/7 to help you with any questions.
                    </Typography>
                    <Button
                      variant="contained"
                      disableElevation
                      startIcon={<ChatIcon />}
                      sx={{ 
                        bgcolor: TURQUOISE,
                        color: 'white',
                        borderRadius: '10px',
                        py: 1.2,
                        px: { xs: 3, sm: 4 },
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(40, 221, 205, 0.3)',
                        '&:hover': { 
                          bgcolor: TURQUOISE_DARK,
                          boxShadow: '0 6px 16px rgba(40, 221, 205, 0.5)',
                        }
                      }}
                    >
                      Start Live Chat
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
        
        {/* Contact Information */}
        <Box sx={{ mt: { xs: 6, md: 8 }, mb: 4 }}>
          <Fade in={loaded} timeout={1000} style={{ transitionDelay: '300ms' }}>
            <Box>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight={800} 
                textAlign="center" 
                sx={{ 
                  mb: { xs: 3, md: 4 },
                  color: '#2d3748',
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  position: 'relative',
                  display: 'inline-block',
                  width: '100%'
                }}
              >
                Ways to Connect
                <Box sx={{
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: { xs: 60, sm: 80 },
                  height: 4,
                  bgcolor: TURQUOISE,
                  borderRadius: 2
                }} />
              </Typography>
              
              <Grid container spacing={4} justifyContent="center">
                {[
                  { 
                    icon: <EmailIcon sx={{ fontSize: 36 }} />, 
                    title: "Email Us", 
                    detail: "support@freshbox.com", 
                    subDetail: "24/7 email support" 
                  },
                  { 
                    icon: <PhoneIcon sx={{ fontSize: 36 }} />, 
                    title: "Call Us", 
                    detail: "(800) 123-4567", 
                    subDetail: "Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm" 
                  },
                  { 
                    icon: <LocationIcon sx={{ fontSize: 36 }} />, 
                    title: "Visit Us", 
                    detail: "123 Clean Street, Suite 200", 
                    subDetail: "Metro City, ST 12345" 
                  },
                ].map((contact, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Fade in={loaded} timeout={1000} style={{ transitionDelay: `${400 + (index * 100)}ms` }}>
                      <Paper
                        elevation={0}
                        sx={{ 
                          p: { xs: 3, sm: 4 },
                          borderRadius: 4,
                          border: '1px solid',
                          borderColor: 'grey.100',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                          '&:hover': {
                            borderColor: TURQUOISE,
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
                          }
                        }}
                      >
                        <Box 
                          sx={{ 
                            bgcolor: TURQUOISE_LIGHT,
                            color: TURQUOISE,
                            p: 2.5,
                            borderRadius: '16px',
                            mb: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px solid ${TURQUOISE}30`
                          }}
                        >
                          {contact.icon}
                        </Box>
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, color: '#2d3748' }}>
                          {contact.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          fontWeight={500} 
                          sx={{ 
                            mb: 1.5,
                            color: TURQUOISE,
                            fontSize: '1.1rem'
                          }}
                        >
                          {contact.detail}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          textAlign="center"
                        >
                          {contact.subDetail}
                        </Typography>
                      </Paper>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Box>
      </Container>
      
      {/* Success and Error Messages */}
      <Snackbar 
        open={successMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 2 }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="success" 
          variant="filled"
          icon={<SuccessIcon />}
          sx={{ 
            width: '100%',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Your message has been sent! We'll be in touch soon.
          </Typography>
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={errorMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 2 }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="error" 
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Something went wrong. Please try again.
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
}