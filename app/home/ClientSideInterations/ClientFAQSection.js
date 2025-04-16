'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  ThemeProvider,
  useMediaQuery
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MessageIcon from '@mui/icons-material/Message';
import { theme } from '../../../contexts/Theme';
import { useRouter } from 'next/navigation';

// Helper functions
const getTagColor = (category) => {
  switch (category) {
    case 'Pricing': return '#2E7B5C'; // Dark green from theme
    case 'Service': return '#85D2B3'; // Primary medium green from theme
    case 'Policies': return '#B5ECD9'; // Secondary mint from theme
    case 'Products': return '#BDF4E3'; // Light mint from theme
    default: return '#2E7B5C'; // Default to dark green
  }
};

const getTagTextColor = (category) => {
  switch (category) {
    case 'Pricing': return '#FFFFFF'; // White text on dark background
    case 'Service': return '#0a1929'; // Dark text on medium background
    case 'Policies': return '#0a1929'; // Dark text on light background
    case 'Products': return '#0a1929'; // Dark text on light background
    default: return '#FFFFFF'; // Default to white text
  }
};

const highlightText = (text, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') return text;
  
  const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
  
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <mark key={index} style={{ backgroundColor: `rgba(133, 210, 179, 0.2)`, padding: '0 2px', borderRadius: '2px' }}>{part}</mark>
        ) : part
      )}
    </>
  );
};

const ClientFAQSection = ({ faqs }) => {
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
  }, [searchQuery, faqs]);

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
      transition: { delay: 0.05 * i, duration: 0.5, ease: "easeOut" }
    })
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 80, md: 100 },
                  height: { xs: 80, md: 100 },
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: '0 10px 30px rgba(133, 210, 179, 0.3)',
                  mb: 4,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    right: -8,
                    bottom: -8,
                    borderRadius: '50%',
                    border: '2px dashed rgba(133, 210, 179, 0.5)',
                    animation: 'spin 15s linear infinite'
                  },
                  '@keyframes spin': {
                    '0%': {
                      transform: 'rotate(0deg)'
                    },
                    '100%': {
                      transform: 'rotate(360deg)'
                    }
                  }
                }}
              >
                <HelpOutlineIcon sx={{ fontSize: { xs: 40, md: 48 }, color: theme.palette.primary.dark }} />
              </Box>
              <Typography
                variant="h3"
                component="h2"
                align="center"
                sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.primary.dark,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  mb: 3,
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '2px'
                  }
                }}
              >
                Frequently Asked Questions
              </Typography>
              
              <Typography
                variant="h6"
                align="center"
                sx={{ 
                  mb: 5, 
                  color: theme.palette.text.secondary,
                  maxWidth: 750,
                  mx: 'auto',
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  mt: 4
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
                  maxWidth: 600,
                  height: 60,
                  mx: 'auto',
                  px: 3,
                  borderRadius: 30,
                  backgroundColor: searchFocus ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  border: `2px solid ${searchFocus ? theme.palette.primary.main : 'rgba(133, 210, 179, 0.3)'}`,
                  boxShadow: searchFocus ? '0 8px 25px rgba(133, 210, 179, 0.15)' : '0 4px 15px rgba(133, 210, 179, 0.05)',
                  transition: 'all 0.3s ease',
                  mb: 8
                }}
              >
                <SearchIcon sx={{ color: searchFocus ? theme.palette.primary.main : '#a0aec0', mr: 2 }} />
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
                    fontSize: '1.1rem',
                    color: theme.palette.text.secondary
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
                    disableElevation
                      size="small"
                      onClick={() => setSearchQuery('')}
                      sx={{ 
                        minWidth: 'auto', 
                        p: 0.5,
                        color: '#a0aec0',
                        '&:hover': { color: theme.palette.primary.dark }
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
                    boxShadow: '0 15px 50px rgba(46, 123, 92, 0.08)',
                    p: 6,
                    textAlign: 'center',
                    mb: 8,
                    border: '1px solid rgba(181, 236, 217, 0.5)'
                  }}
                >
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(181, 236, 217, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      mb: 3
                    }}
                  >
                    <SearchIcon sx={{ fontSize: 40, color: theme.palette.primary.dark }} />
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: theme.palette.primary.dark, 
                      mb: 2, 
                      fontWeight: 600 
                    }}
                  >
                    No matching questions found
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, mb: 4 }}>
                    Try different keywords or browse all our FAQs
                  </Typography>
                  <Button
                  disableElevation
                    variant="contained"
                    onClick={() => setSearchQuery('')}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.dark,
                      fontWeight: 600,
                      px: 4,
                      py: 1.2,
                      borderRadius: 10,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.mainHover,
                        boxShadow: '0 8px 20px rgba(133, 210, 179, 0.25)'
                      }
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
                  borderRadius: { xs: 3, md: 4 },
                  boxShadow: '0 15px 50px rgba(46, 123, 92, 0.08)',
                  overflow: 'hidden',
                  mb: 8,
                  border: '1px solid rgba(181, 236, 217, 0.5)'
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
                          <Divider sx={{ mx: 3, borderColor: 'rgba(181, 236, 217, 0.6)' }} />
                        )}
                        <Box
                          onClick={() => handleToggle(`panel${index}`)}
                          sx={{
                            p: { xs: 2.5, md: 3.5 },
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: expandedPanel === `panel${index}` ? 'rgba(181, 236, 217, 0.1)' : 'transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(181, 236, 217, 0.1)'
                            }
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: { xs: 'flex-start', md: 'center' },
                              flexDirection: { xs: 'column', md: 'row' }
                            }}
                          >
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'flex-start', 
                              flex: 1,
                              flexDirection: { xs: 'column', md: 'row' },
                              mb: { xs: 2, md: 0 }
                            }}>
                              <Box
                                sx={{
                                  backgroundColor: getTagColor(faq.category),
                                  color: getTagTextColor(faq.category),
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: 10,
                                  mr: { xs: 0, md: 2.5 },
                                  mb: { xs: 1.5, md: 0 },
                                  mt: { xs: 0, md: 0.3 },
                                  whiteSpace: 'nowrap',
                                  display: 'inline-block',
                                  minWidth: 70,
                                  textAlign: 'center'
                                }}
                              >
                                {faq.category}
                              </Box>
                              <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                  fontWeight: 600,
                                  color: theme.palette.primary.dark,
                                  pr: { xs: 0, md: 8 },
                                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                                }}
                              >
                                {highlightText(faq.question, searchQuery)}
                              </Typography>
                            </Box>
                            <motion.div
                              animate={{ 
                                rotate: expandedPanel === `panel${index}` ? 180 : 0,
                                scale: expandedPanel === `panel${index}` ? 1.1 : 1 
                              }}
                              transition={{ duration: 0.3 }}
                              style={{ marginLeft: isMobile ? 0 : 16 }}
                            >
                              <Box
                                sx={{
                                  width: { xs: 32, md: 36 },
                                  height: { xs: 32, md: 36 },
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: expandedPanel === `panel${index}` 
                                    ? theme.palette.primary.main 
                                    : 'rgba(181, 236, 217, 0.3)',
                                  transition: 'all 0.3s ease',
                                  ml: { xs: 'auto', md: 0 },
                                  mt: { xs: -6, md: 0 }
                                }}
                              >
                                <KeyboardArrowDownIcon
                                  sx={{
                                    color: expandedPanel === `panel${index}` 
                                      ? theme.palette.primary.dark 
                                      : theme.palette.primary.dark,
                                    fontSize: { xs: 24, md: 28 }
                                  }}
                                />
                              </Box>
                            </motion.div>
                          </Box>
                          
                          <AnimatePresence>
                            {expandedPanel === `panel${index}` && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4 }}
                                variants={fadeIn}
                              >
                                <Box 
                                  sx={{ 
                                    mt: 3, 
                                    ml: { xs: 0, md: isMobile ? 0 : 10 },
                                    p: 2.5, 
                                    borderLeft: { xs: 'none', md: `4px solid ${theme.palette.primary.main}` },
                                    backgroundColor: 'rgba(181, 236, 217, 0.06)',
                                    borderRadius: { xs: 2, md: '0 8px 8px 0' }
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color: theme.palette.text.secondary,
                                      lineHeight: 1.8,
                                      fontSize: '1rem'
                                    }}
                                  >
                                    {highlightText(faq.answer, searchQuery)}
                                  </Typography>
                                </Box>
                              </motion.div>
                            )}
                          </AnimatePresence>
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
      
      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 5, md: 6 },
            px: { xs: 3, md: 5 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, #85D2B3 0%, #2E7B5C 100%)',
            color: '#ffffff',
            maxWidth: 850,
            mx: 'auto',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(46, 123, 92, 0.15)'
          }}
        >
          {/* Decorative circles */}
          <Box
            sx={{
              position: 'absolute',
              top: -30,
              left: -30,
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -40,
              right: -40,
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.08)'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              right: '20%',
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)'
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <MessageIcon sx={{ fontSize: { xs: 28, md: 32 }, mr: 1.5 }} />
              <Typography 
                variant="h5" 
                component="h3" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '1.5rem', md: '1.75rem' }
                }}
              >
                Still have questions?
              </Typography>
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                maxWidth: 650, 
                mx: 'auto',
                opacity: 0.9,
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              Our support team is here to help. Contact us anytime and we'll get back to you as soon as possible.
            </Typography>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
              disableElevation
                variant="contained"
                size="large"
                onClick={() => {router.push('/support')}}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1rem",
                  fontWeight: 600,
                  backgroundColor: "#ffffff",
                  color: theme.palette.primary.dark,
                  borderRadius: 10,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  "&:hover": {
                    backgroundColor: "#F9FFFC",
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Support
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
};

export default ClientFAQSection;