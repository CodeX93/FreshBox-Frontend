import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip
} from '@mui/material';

import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  QuestionAnswer as FAQIcon,
  Chat as ChatIcon,
  ContactSupport as SupportIcon
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

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  const [expandedFAQ, setExpandedFAQ] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // Update filtered FAQs when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFAQs(faqData);
      setSearchActive(false);
    } else {
      setSearchActive(true);
      const filtered = faqData.filter(
        faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFAQs(filtered);
    }
  }, [searchQuery]);

  // Handle accordion expansion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedFAQ(isExpanded ? panel : false);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        fontWeight={700} 
        sx={{ 
          mb: 4, 
          textAlign: 'center',
          color: '#2d3748'
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* Search box */}
      <Box 
        sx={{ 
          maxWidth: 600, 
          mx: 'auto', 
          mb: 5,
          px: 2 
        }}
      >
        <Paper
          elevation={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 2,
            border: '1px solid',
            borderColor: searchActive ? TURQUOISE : 'grey.200',
            '&:hover': {
              borderColor: TURQUOISE
            }
          }}
        >
          <HelpIcon sx={{ color: 'grey.500', mr: 1.5 }} />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
          {searchActive && (
            <Button
              size="small"
              onClick={() => setSearchQuery('')}
              sx={{ ml: 1, color: 'grey.500' }}
            >
              Clear
            </Button>
          )}
        </Paper>
      </Box>

      {/* Search results */}
      {searchActive && (
        <Box sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
          <Chip
            label={`${filteredFAQs.length} results for "${searchQuery}"`}
            variant="outlined"
            onDelete={() => setSearchQuery('')}
            sx={{ 
              mb: 2, 
              bgcolor: TURQUOISE_LIGHT,
              color: TURQUOISE_DARK,
              borderColor: TURQUOISE
            }}
          />
        </Box>
      )}

      {/* No results message */}
      {filteredFAQs.length === 0 && (
        <Box 
          sx={{ 
            maxWidth: 800, 
            mx: 'auto', 
            textAlign: 'center',
            py: 6,
            bgcolor: 'rgba(0,0,0,0.02)',
            borderRadius: 3
          }}
        >
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
            Show All FAQs
          </Button>
        </Box>
      )}

      {/* FAQ items */}
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
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
      </Box>

      {/* Still have questions box */}
      <Box 
        sx={{ 
          maxWidth: 800, 
          mx: 'auto',
          mt: 6,
          bgcolor: TURQUOISE_LIGHT,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: `${TURQUOISE}30`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 3, sm: 4 }
        }}
      >
        <Box 
          sx={{ 
            bgcolor: 'white',
            color: TURQUOISE,
            width: 60,
            height: 60,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            flexShrink: 0
          }}
        >
          <SupportIcon sx={{ fontSize: 36 }} />
        </Box>
        
        <Box sx={{ 
          flex: 1,
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography 
            variant="h6" 
            fontWeight={700} 
            sx={{ mb: 1 }}
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
            startIcon={<ChatIcon />}
            sx={{ 
              bgcolor: TURQUOISE,
              color: 'white',
              borderRadius: '10px',
              py: 1.2,
              px: 3,
              fontWeight: 600,
              '&:hover': { bgcolor: TURQUOISE_DARK }
            }}
          >
            Start Live Chat
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FAQSection;