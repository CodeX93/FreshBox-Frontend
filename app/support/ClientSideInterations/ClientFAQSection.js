'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery
} from '@mui/material';

import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  QuestionAnswer as FAQIcon,
  Chat as ChatIcon,
  ContactSupport as SupportIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';


import {theme} from "../../../contexts/Theme"
// Define constants
const TURQUOISE = theme.palette.primary.main;
const TURQUOISE_DARK = theme.palette.primary.darkBlue;
const TURQUOISE_LIGHT = theme.palette.primary.whitishMint;
const YELLOWISH = theme.palette.primary.yellowish;


const ClientFAQSection = ({ 
  faqData, 
  searchQuery, 
  setSearchQuery, 
  expandedFAQ, 
  setExpandedFAQ,
  searchActive
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  const [searchInputFocused, setSearchInputFocused] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Update filtered FAQs when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFAQs(faqData);
    } else {
      const filtered = faqData.filter(
        faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFAQs(filtered);
    }
  }, [searchQuery, faqData]);

  // Handle accordion expansion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedFAQ(isExpanded ? panel : false);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Highlight search terms in text
  const highlightSearchTerms = (text) => {
    if (!searchQuery.trim()) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark 
              key={i}
              style={{ 
                backgroundColor: `${TURQUOISE}30`, 
                color: TURQUOISE_DARK,
                padding: '0 2px',
                borderRadius: '2px'
              }}
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <>
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
      <Typography 
        variant="h4" 
        component="h2" 
        fontWeight={700} 
        sx={{ 
          mb: 4, 
          textAlign: 'center',
          color: '#2d3748',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 3,
            backgroundColor: TURQUOISE_DARK,
            borderRadius: 2
          }
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* Enhanced Search box */}
      <Fade in={true} timeout={800}>
        <Box 
          sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            mb: 5,
            px: 2 
          }}
        >
          <Paper
            elevation={searchInputFocused ? 2 : 1}
            component={motion.div}
            whileHover={{ 
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              y: -2
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              borderRadius: 2,
              border: '1px solid',
              borderColor: searchInputFocused || searchActive ? TURQUOISE : 'grey.200',
              transition: 'all 0.3s ease',
              backgroundColor: searchInputFocused ? YELLOWISH : TURQUOISE_LIGHT
            }}
          >
            <SearchIcon 
              sx={{ 
                color: searchInputFocused || searchActive ? TURQUOISE_DARK : 'grey.500', 
                mr: 1.5,
                transition: 'color 0.3s ease'
              }} 
            />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setSearchInputFocused(true)}
              onBlur={() => setSearchInputFocused(false)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '1rem',
                fontFamily: 'inherit',
                background: 'transparent',
                padding: '8px 0'
              }}
            />
            <AnimatePresence>
              {(searchActive || searchQuery.trim()) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                  disableElevation
                    size="small"
                    onClick={() => setSearchQuery('')}
                    sx={{ 
                      ml: 1, 
                      color: 'grey.500',
                      minWidth: 'auto',
                      '&:hover': {
                        backgroundColor: `${TURQUOISE_LIGHT}`,
                        color: TURQUOISE_DARK
                      }
                    }}
                  >
                    Clear
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Paper>
        </Box>
      </Fade>

      {/* Search results */}
      <AnimatePresence>
        {searchActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
              <Chip
                label={`${filteredFAQs.length} results for "${searchQuery}"`}
                variant="outlined"
                onDelete={() => setSearchQuery('')}
                sx={{ 
                  mb: 2, 
                  bgcolor: TURQUOISE_DARK,
                  color: TURQUOISE,
                  borderColor: TURQUOISE,
                  fontWeight: 500,
                  '& .MuiChip-deleteIcon': {
                    color: TURQUOISE,
                    '&:hover': {
                      color: TURQUOISE_DARK
                    }
                  }
                }}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results message */}
      <AnimatePresence>
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Box 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto', 
                textAlign: 'center',
                py: 6,
                bgcolor: 'rgba(169, 2, 2, 0.02)',
                borderRadius: 3,
                
              }}
            >
              <Box 
                component={motion.div} 
                animate={{ 
                  y: [0, -10, 0],
                  transition: { 
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2
                  }
                }}
              >
                <HelpIcon sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
              </Box>
              <Typography variant="h6" color="text.secondary" fontWeight={600}>
                No results found for "{searchQuery}"
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, mb: 3 }}>
                Try different keywords or browse all FAQs below
              </Typography>
              <Button 
              disableElevation
                variant="outlined"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery('')}
                sx={{ 
                  borderColor: YELLOWISH,
                  color: TURQUOISE_LIGHT,
                  bgcolor:TURQUOISE_DARK,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  '&:hover': { 
                    borderColor: YELLOWISH,
                    bgcolor: TURQUOISE_DARK,
                    color:TURQUOISE 
                  }
                }}
              >
                Show All FAQs
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Accordion 
                expanded={expandedFAQ === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
                elevation={0}
                disableGutters
                sx={{ 
                  border: '1px solid',
                  borderColor: expandedFAQ === `panel${index}` ? TURQUOISE : 'grey.200',
                  mb: 2,
                  bgcolor:TURQUOISE_LIGHT,
                  borderRadius: '12px !important',
                  overflow: 'hidden',
                  '&::before': { display: 'none' },
                  '&.Mui-expanded': { 
                    margin: '0 0 16px 0',
                    borderColor: TURQUOISE,
                    boxShadow: `0 4px 15px ${TURQUOISE}30`
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ 
                      color: expandedFAQ === `panel${index}` ? TURQUOISE : 'text.secondary',
                      transition: 'transform 0.3s ease, color 0.3s ease',
                      transform: expandedFAQ === `panel${index}` ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} />
                  }
                  sx={{ 
                    px: 3,
                    py: 1.5,
                    backgroundColor: expandedFAQ === `panel${index}` ? TURQUOISE_LIGHT : 'transparent',
                    transition: 'background-color 0.3s ease',
                    // '&:hover': {
                    //   backgroundColor: expandedFAQ === `panel${index}` ? TURQUOISE_LIGHT : '#f9fafb'
                    // },
                    '& .MuiAccordionSummary-content': { 
                      display: 'flex',
                      alignItems: 'center',
                      margin: '10px 0'
                    }
                  }}
                >
                  <Box 
                    component={motion.div}
                    // whileHover={{ scale: 1.1 }}
                    sx={{ 
                      color: TURQUOISE_DARK, 
                      bgcolor: TURQUOISE_LIGHT,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      mr: 2,
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                      boxShadow: expandedFAQ === `panel${index}` ? `0 3px 10px ${TURQUOISE}50` : 'none'
                    }}
                  >
                    <FAQIcon fontSize="small" />
                  </Box>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    fontSize="1.05rem"
                    color={expandedFAQ === `panel${index}` ? TURQUOISE_DARK : 'text.primary'}
                    sx={{ transition: 'color 0.3s ease' }}
                  >
                    {highlightSearchTerms(faq.question)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pt: 0, pb: 3, position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 5.4,
                      top: -5,
                      bottom: 20,
                      width: 2,
                      bgcolor: `${TURQUOISE}50`,
                      borderRadius: 8
                    }}
                  />
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ 
                      ml: 6, 
                      lineHeight: 1.7,
                      position: 'relative',
                    }}
                  >
                    {highlightSearchTerms(faq.answer)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </motion.div>

      {/* Enhanced "Still have questions" box
      <Fade in={true} timeout={1000}>
        <Box 
          component={motion.div}
          whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(40, 221, 205, 0.2)' }}
          transition={{ type: 'spring', stiffness: 300 }}
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
            gap: { xs: 3, sm: 4 },
            transition: 'all 0.3s ease'
          }}
        >
          <Box 
            component={motion.div}
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            sx={{ 
              bgcolor: 'white',
              color: TURQUOISE,
              width: 70,
              height: 70,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(40, 221, 205, 0.25)',
              flexShrink: 0
            }}
          >
            <SupportIcon sx={{ fontSize: 40 }} />
          </Box>
          
          <Box sx={{ 
            flex: 1,
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Typography 
              variant="h5" 
              fontWeight={700} 
              sx={{ mb: 1, color: TURQUOISE_DARK }}
            >
              Still have questions?
            </Typography>
            <Typography 
              variant="body1" 
              color="#ffffff"
              sx={{ mb: { xs: 2, sm: 2 } }}
            >
              Our support team is available 24/7 to help you with any questions about our laundry and cleaning services.
            </Typography>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              startIcon={<ChatIcon />}
              sx={{ 
                bgcolor: TURQUOISE,
                color: 'white',
                borderRadius: '10px',
                py: 1.2,
                px: 3,
                fontWeight: 600,
                '&:hover': { bgcolor: TURQUOISE_DARK },
                boxShadow: '0 4px 15px rgba(40, 221, 205, 0.3)',
              }}
            >
              Start Live Chat
            </Button>
          </Box>
        </Box>
      </Fade> */}
    </Paper>
    </>
  );
};

export default ClientFAQSection;