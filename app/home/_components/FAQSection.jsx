'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Grid,
  Button,
  Box,
  Divider,
  ThemeProvider
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MessageIcon from '@mui/icons-material/Message';
import { theme } from '../../../contexts/Theme'; // Import your theme context

// FAQ data
const faqs = [
  {
    question: "How much does the service cost?",
    answer: "Our pricing is weight-based at $2.99 per pound with a 10-pound minimum. We also offer subscription plans that can save you up to 20% for regular service. Special items like comforters or formal wear may have additional charges. You'll always see the full price before confirming.",
    category: "Pricing"
  },
  {
    question: "What is the typical turnaround time?",
    answer: "Our standard turnaround time is 48 hours from pickup to delivery. Need it faster? Our express service guarantees 24-hour turnaround for an additional fee. You'll receive real-time updates through our app.",
    category: "Service"
  },
  {
    question: "How do you handle delicate items?",
    answer: "Delicate items receive special attention. We sort all laundry by color, fabric type, and washing instructions. We use gentle cycles, appropriate water temperatures, and specialized detergents for delicate fabrics. For particularly special items, you can add notes in the app.",
    category: "Service"
  },
  {
    question: "What if an item is lost or damaged?",
    answer: "While extremely rare, we take full responsibility for any lost or damaged items. We'll reimburse you for the estimated value of the item up to $250 per item. For high-value clothing, we recommend noting it in the app when scheduling.",
    category: "Policies"
  },
  {
    question: "Are your cleaning products eco-friendly?",
    answer: "Yes! We use environmentally friendly, hypoallergenic detergents by default. You can also specify your preferred detergent, fabric softener, or request fragrance-free options through your account preferences.",
    category: "Products"
  },
  {
    question: "Do I need to be home for pickup and delivery?",
    answer: "No need to be home! Just leave your laundry bag in your designated spot, and our driver will pick it up. Same for delivery—we'll leave your freshly cleaned clothes where you specify. You'll receive notifications at each step.",
    category: "Service"
  }
];

// Helper functions
const getTagColor = (category) => {
  switch (category) {
    case 'Pricing': return '#4CAF50'; // Green
    case 'Service': return theme.palette.primary.main; // Using your turquoise
    case 'Policies': return '#F44336'; // Red
    case 'Products': return '#9C27B0'; // Purple
    default: return '#2196F3'; // Blue
  }
};

const highlightText = (text, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') return text;
  
  const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
  
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <mark key={index} style={{ backgroundColor: `${theme.palette.primary.main}20`, padding: '0 2px', borderRadius: '2px' }}>{part}</mark>
        ) : part
      )}
    </>
  );
};

const FAQSection = () => {
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  
  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFaqs(faqs);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const filtered = faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    );
    
    setFilteredFaqs(filtered);
  }, [searchQuery]);

  const handleToggle = (panel) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.05 * i, duration: 0.3 }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="section"
        id="faq-section"
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          py: 10,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}40 0%, transparent 70%)`,
            opacity: 0.5,
            zIndex: 0
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
            background: `linear-gradient(135deg, ${theme.palette.primary.light}40 0%, transparent 70%)`,
            opacity: 0.5,
            zIndex: 0
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={10} lg={8}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      mb: 3
                    }}
                  >
                    <HelpOutlineIcon sx={{ fontSize: 40, color: '#ffffff' }} />
                  </Box>
                  <Typography
                    variant="h3"
                    component="h2"
                    align="center"
                    sx={{ 
                      fontWeight: 700, 
                      color: '#1a202c',
                      mb: 2
                    }}
                  >
                    Frequently Asked Questions
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ 
                      mb: 4, 
                      color: '#4a5568',
                      maxWidth: 700,
                      mx: 'auto'
                    }}
                  >
                    Everything you need to know about our laundry service
                  </Typography>

                  {/* Search Bar */}
                  <Box
                    component={motion.div}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      maxWidth: 550,
                      height: 56,
                      mx: 'auto',
                      px: 3,
                      borderRadius: 28,
                      backgroundColor: searchFocus ? '#ffffff' : '#f7fafc',
                      border: `1px solid ${searchFocus ? theme.palette.primary.main : '#e2e8f0'}`,
                      boxShadow: searchFocus ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.3s ease',
                      mb: 7
                    }}
                  >
                    <SearchIcon sx={{ color: '#a0aec0', mr: 2 }} />
                    <input
                      type="text"
                      placeholder="Search for answers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocus(true)}
                      onBlur={() => setSearchFocus(false)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        background: 'transparent',
                        fontSize: '1rem',
                        color: '#4a5568'
                      }}
                    />
                    {searchQuery && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          size="small"
                          onClick={() => setSearchQuery('')}
                          sx={{ 
                            minWidth: 'auto', 
                            p: 0.5,
                            color: '#a0aec0',
                            '&:hover': { color: '#4a5568' }
                          }}
                        >
                          ✕
                        </Button>
                      </motion.div>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </motion.div>

          {/* FAQ Accordion */}
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={10} lg={8}>
              <AnimatePresence>
                {filteredFaqs.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: 4,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        p: 6,
                        textAlign: 'center',
                        mb: 6
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          backgroundColor: '#f7fafc',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          mb: 3
                        }}
                      >
                        <SearchIcon sx={{ fontSize: 40, color: '#a0aec0' }} />
                      </Box>
                      <Typography variant="h5" sx={{ color: '#1a202c', mb: 2 }}>
                        No matching questions found
                      </Typography>
                      <Typography sx={{ color: '#4a5568', mb: 3 }}>
                        Try different keywords or browse all our FAQs
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => setSearchQuery('')}
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main
                        }}
                      >
                        Show All FAQs
                      </Button>
                    </Box>
                  </motion.div>
                ) : (
                  <Box
                    sx={{
                      backgroundColor: '#ffffff',
                      borderRadius: 4,
                      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                      overflow: 'hidden',
                      mb: 6
                    }}
                  >
                    <AnimatePresence>
                      {filteredFaqs.map((faq, index) => (
                        <motion.div
                          key={index}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0, height: 0 }}
                          layout
                        >
                          <React.Fragment>
                            {index > 0 && (
                              <Divider sx={{ mx: 3, borderColor: '#edf2f7' }} />
                            )}
                            <Box
                              onClick={() => handleToggle(`panel${index}`)}
                              sx={{
                                p: 3,
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                '&:hover': {
                                  backgroundColor: '#f7fafc'
                                }
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'flex-start'
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                                  <Box
                                    sx={{
                                      backgroundColor: getTagColor(faq.category),
                                      color: '#ffffff',
                                      fontSize: '0.75rem',
                                      fontWeight: 600,
                                      px: 1.5,
                                      py: 0.5,
                                      borderRadius: 5,
                                      mr: 2,
                                      mt: 0.3,
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {faq.category}
                                  </Box>
                                  <Typography
                                    variant="h6"
                                    component="h3"
                                    sx={{
                                      fontWeight: 600,
                                      color: '#1a202c',
                                      pr: 8
                                    }}
                                  >
                                    {highlightText(faq.question, searchQuery)}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </React.Fragment>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </Box>
                )}
              </AnimatePresence>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FAQSection;
