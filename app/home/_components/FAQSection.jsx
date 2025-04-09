"use client"
import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  TextField, 
  IconButton,
  Collapse,
  Fade
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon,
  HelpOutline as HelpIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const FAQSection = () => {
  const router = useRouter();
  const [expandedQuestion, setExpandedQuestion] = useState(0); // First question expanded by default
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const faqs = [
    {
      question: "How much does the service cost?",
      answer: "Our pricing is weight-based at $2.99 per pound with a 10-pound minimum. We also offer subscription plans that can save you up to 20% for regular service. Special items like comforters or formal wear may have additional charges. You'll always see the full price before confirming.",
    },
    {
      question: "What is the typical turnaround time?",
      answer: "Our standard turnaround time is 48 hours from pickup to delivery. Need it faster? Our express service guarantees 24-hour turnaround for an additional fee. You'll receive real-time updates through our app.",
    },
    {
      question: "How do you handle delicate items?",
      answer: "Delicate items receive special attention. We sort all laundry by color, fabric type, and washing instructions. We use gentle cycles, appropriate water temperatures, and specialized detergents for delicate fabrics.",
    },
    {
      question: "What if an item is lost or damaged?",
      answer: "While extremely rare, we take full responsibility for any lost or damaged items. We'll reimburse you for the estimated value of the item up to $250 per item.",
    },
    {
      question: "Are your cleaning products eco-friendly?",
      answer: "Yes! We use environmentally friendly, hypoallergenic detergents by default. You can also specify your preferred detergent or request fragrance-free options.",
    },
    {
      question: "Do I need to be home for pickup and delivery?",
      answer: "No need to be home! Just leave your laundry bag in your designated spot, and our driver will pick it up. Same for delivery—we'll leave your freshly cleaned clothes where you specify.",
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchFocus = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box textAlign="center" mb={4}>
          {/* Question Mark Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
          >
            <Box 
              sx={{ 
                width: 100, 
                height: 100, 
                borderRadius: '50%', 
                backgroundColor: '#2D4059',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 3,
                boxShadow: '0 10px 30px rgba(45, 64, 89, 0.3)'
              }}
            >
              <HelpIcon sx={{ color: 'white', fontSize: 50 }} />
            </Box>
          </motion.div>

          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              color: '#2D4059',
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                backgroundColor: '#F5D547'
              }
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: '#2D4059',
              opacity: 0.7,
              mt: 3,
              mb: 4,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Everything you need to know about our laundry service
          </Typography>

          {/* Enhanced Search Bar */}
          <Box 
            sx={{ 
              position: 'relative', 
              maxWidth: 600,
              mx: 'auto',
              mb: 4 
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TextField
                fullWidth
                variant="outlined"
                inputRef={searchRef}
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <IconButton 
                      onClick={handleSearchFocus}
                      sx={{ mr: 1, color: '#2D4059' }}
                    >
                      <SearchIcon />
                    </IconButton>
                  ),
                  sx: {
                    backgroundColor: '#FFFBE6',
                    borderRadius: 4,
                    boxShadow: '0 4px 15px rgba(45, 64, 89, 0.1)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F5D547',
                      borderWidth: 2
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2D4059'
                    }
                  }
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 4,
                  }
                }}
              />
            </motion.div>
          </Box>

          {/* FAQ List */}
          <Box 
            sx={{ 
              border: '2px solid #F5D547', 
              borderRadius: 3,
              backgroundColor: '#FFFBE6',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(45, 64, 89, 0.1)'
            }}
          >
            {filteredFAQs.map((faq, index) => (
              <Box key={index}>
                {index > 0 && <Box sx={{ borderTop: '1px solid #F5D547' }} />}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    p: 2,
                    cursor: 'pointer',
                    backgroundColor: expandedQuestion === index 
                      ? 'rgba(245, 213, 71, 0.1)' 
                      : 'transparent',
                    transition: 'background-color 0.3s ease'
                  }}
                  onClick={() => setExpandedQuestion(
                    expandedQuestion === index ? null : index
                  )}
                >
                  <Typography 
                    sx={{ 
                      color: '#2D4059', 
                      fontWeight: expandedQuestion === index ? 600 : 400,
                      flex: 1,
                      textAlign: 'left'
                    }}
                  >
                    {faq.question}
                  </Typography>
                  <motion.div
                    animate={{ 
                      rotate: expandedQuestion === index ? 180 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconButton 
                      sx={{ 
                        color: '#2D4059',
                        backgroundColor: expandedQuestion === index 
                          ? 'rgba(245, 213, 71, 0.2)' 
                          : 'transparent'
                      }}
                    >
                      {expandedQuestion === index ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                  </motion.div>
                </Box>
                <Collapse in={expandedQuestion === index}>
                  <Fade in={expandedQuestion === index}>
                    <Box 
                      sx={{ 
                        p: 3, 
                        backgroundColor: 'white', 
                        borderTop: '1px solid #F5D547',
                        textAlign: 'left'
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: '#2D4059',
                          lineHeight: 1.6
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </Box>
                  </Fade>
                </Collapse>
              </Box>
            ))}
          </Box>

          {/* Contact Support Section */}
          <Box 
            sx={{ 
              mt: 4, 
              backgroundColor: '#2D4059', 
              borderRadius: 3, 
              p: 4, 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative Circles */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                backgroundColor: 'rgba(245, 213, 71, 0.1)',
                zIndex: 1
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -50,
                left: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                backgroundColor: 'rgba(245, 213, 71, 0.1)',
                zIndex: 1
              }}
            />

            <Box sx={{ flex: 1, zIndex: 2, pr: 4 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 2, 
                  color: '#F5D547',
                  fontWeight: 700
                }}
              >
                Still have questions?
              </Typography>
              <Typography 
                sx={{ 
                  mb: 3, 
                  opacity: 0.8,
                  lineHeight: 1.6
                }}
              >
                Our dedicated support team is ready to help. Reach out anytime, and we'll provide prompt and personalized assistance.
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="contained" 
                  onClick={() => router.push('/support')}
                  sx={{ 
                    backgroundColor: '#F5D547', 
                    color: '#2D4059',
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': {
                      backgroundColor: '#F5D547',
                      opacity: 0.9
                    }
                  }}
                >
                  Contact Support
                </Button>
              </motion.div>
            </Box>

            {/* Question Mark Graphic */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'block' },
                width: 200,
                height: 150,
                zIndex: 2
              }}
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 300 200"
                style={{ 
                  width: '100%', 
                  height: '100%',
                  fill: '#F5D547'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <path 
                  d="M150 50 Q200 100 150 150 Q100 100 150 50Z" 
                  style={{ opacity: 0.3 }}
                />
                <circle cx="100" cy="100" r="20" style={{ opacity: 0.6 }} />
                <circle cx="200" cy="100" r="20" style={{ opacity: 0.6 }} />
                <circle cx="150" cy="50" r="10" />
                <circle cx="150" cy="150" r="10" />
              </motion.svg>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default FAQSection;