'use client';

import { useState } from 'react';
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
  InputLabel
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
  CheckCircle as SuccessIcon
} from '@mui/icons-material';

// Define constants
const TURQUOISE = '#28ddcd';

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
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(false);
  
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
  
  return (
    <Box sx={{ py: 12, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: `linear-gradient(to right, #fff, rgba(40, 221, 205, 0.1))`,
          py: { xs: 6, md: 8 },
          mb: 6
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  color: '#333',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }
                }}
              >
                How Can We Help You?
              </Typography>
              <Typography 
                variant="h5"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 500 }}
              >
                We're here to assist with any questions about our laundry and cleaning services.
              </Typography>
              
              {/* Search Bar */}
              <Paper
                elevation={0}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  p: 0.5,
                  pl: 2,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: '50px',
                  maxWidth: 500,
                  mb: { xs: 2, md: 0 }
                }}
              >
                <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <TextField
                  fullWidth
                  placeholder="Search our help resources..."
                  variant="standard"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    disableUnderline: true
                  }}
                  sx={{ flex: 1 }}
                />
                <Button 
                  variant="contained"
                  disableElevation
                  sx={{ 
                    bgcolor: TURQUOISE,
                    borderRadius: '50px',
                    px: 3,
                    '&:hover': { bgcolor: '#20c5b7' }
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
                  gap: 2
                }}
              >
                {/* Support Option Cards */}
                {[
                  { icon: <ChatIcon sx={{ fontSize: 36 }} />, title: "Live Chat", desc: "Chat with our support team" },
                  { icon: <PhoneIcon sx={{ fontSize: 36 }} />, title: "Call Us", desc: "Speak directly with support" },
                  { icon: <VideoCallIcon sx={{ fontSize: 36 }} />, title: "Video Consult", desc: "Schedule a video call" },
                  { icon: <GuideIcon sx={{ fontSize: 36 }} />, title: "Help Center", desc: "Browse support articles" }
                ].map((option, index) => (
                  <Card 
                    key={index}
                    elevation={0}
                    sx={{ 
                      width: { xs: '100%', sm: 'calc(50% - 16px)' },
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': { 
                        borderColor: TURQUOISE,
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      py: 3
                    }}>
                      <Box sx={{ color: TURQUOISE, mb: 1.5 }}>
                        {option.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {option.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Contact Form Section */}
          <Grid item xs={12} lg={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                height: '100%'
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h2" fontWeight={700} sx={{ mb: 1 }}>
                  Contact Us
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      endIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
                      sx={{ 
                        py: 1.5,
                        px: 4,
                        bgcolor: TURQUOISE,
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 600,
                        '&:hover': { bgcolor: '#20c5b7' }
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          
          {/* FAQ Section */}
          <Grid item xs={12} lg={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                height: '100%'
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h2" fontWeight={700} sx={{ mb: 1 }}>
                  Frequently Asked Questions
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Find quick answers to common questions about our services.
                </Typography>
                <Divider />
              </Box>
              
              <Box sx={{ mb: 4 }}>
                {filteredFAQs.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <HelpIcon sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No results found for "{searchQuery}"
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Try different keywords or browse all FAQs below
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {filteredFAQs.map((faq, index) => (
                      <Accordion 
                        key={index}
                        expanded={expandedFAQ === `panel${index}`}
                        onChange={handleAccordionChange(`panel${index}`)}
                        elevation={0}
                        disableGutters
                        sx={{ 
                          border: '1px solid',
                          borderColor: 'grey.200',
                          mb: 2,
                          borderRadius: 2,
                          '&::before': { display: 'none' },
                          '&.Mui-expanded': { 
                            borderColor: TURQUOISE
                          }
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{ 
                            px: 3,
                            '& .MuiAccordionSummary-content': { 
                              display: 'flex',
                              alignItems: 'center'
                            }
                          }}
                        >
                          <FAQIcon sx={{ mr: 2, color: TURQUOISE }} />
                          <Typography variant="h6" fontWeight={600} fontSize="1.1rem">
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 3, pt: 0, pb: 3 }}>
                          <Typography variant="body1" color="text.secondary" sx={{ ml: 5 }}>
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
                  bgcolor: 'rgba(40, 221, 205, 0.1)',
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'rgba(40, 221, 205, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <SupportIcon sx={{ color: TURQUOISE, fontSize: 42 }} />
                <Box>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                    Still have questions?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our support team is available 24/7 to help you with any questions.
                  </Typography>
                  <Button
                    variant="contained"
                    disableElevation
                    startIcon={<ChatIcon />}
                    sx={{ 
                      mt: 1.5,
                      bgcolor: TURQUOISE,
                      color: 'white',
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#20c5b7' }
                    }}
                  >
                    Start Live Chat
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Contact Information */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" component="h2" fontWeight={700} textAlign="center" sx={{ mb: 4 }}>
            Ways to Connect
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
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
                <Paper
                  elevation={0}
                  sx={{ 
                    textAlign: 'center',
                    p: 4,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: TURQUOISE,
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: 'rgba(40, 221, 205, 0.1)',
                      p: 2,
                      borderRadius: '50%',
                      mb: 2,
                      color: TURQUOISE
                    }}
                  >
                    {contact.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                    {contact.title}
                  </Typography>
                  <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
                    {contact.detail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {contact.subDetail}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      
      {/* Success and Error Messages */}
      <Snackbar 
        open={successMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="success" 
          variant="filled"
          icon={<SuccessIcon />}
          sx={{ 
            width: '100%',
            alignItems: 'center'
          }}
        >
          Your message has been sent! We'll be in touch soon.
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={errorMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Something went wrong. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
}