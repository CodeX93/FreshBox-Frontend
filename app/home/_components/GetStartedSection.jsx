'use client';

import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Button,
  Box,
  useMediaQuery,
  ThemeProvider
} from '@mui/material';
import { motion } from 'framer-motion';
import { theme } from '../../../contexts/Theme'; // Update path to match your project structure

const GetStartedSection = () => {
  // Use media queries for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const steps = [
    {
      number: 1,
      text: "Sign up and create your account"
    },
    {
      number: 2,
      text: "Schedule your first pickup"
    },
    {
      number: 3,
      text: "Enjoy clean, fresh laundry delivered back to you"
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="section"
        id="get-started-section"
        sx={{
          minHeight: { xs: 'auto', md: '100vh' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#0D3B6E', // Dark blue background
          color: '#ffffff', // White text
          py: { xs: 6, md: 8 },
          overflow: 'hidden' // Prevent overflow issues on mobile
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%' }}
        >
          <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
              {/* Left Content Column - Order changes on mobile */}
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {/* Heading - Adaptive font size */}
                  <motion.div variants={itemVariants}>
                    <Typography 
                      variant="h3" 
                      component="h2" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '2.8rem' },
                        color: '#ffffff',
                        mb: { xs: 2, md: 3 },
                        lineHeight: 1.2
                      }}
                    >
                      Ready to Free Up Your Time?
                    </Typography>
                  </motion.div>
                  
                  {/* Subheading */}
                  <motion.div variants={itemVariants}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#ffffff', 
                        opacity: 0.9, 
                        mb: { xs: 3, md: 4 },
                        fontWeight: 400,
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                      }}
                    >
                      Three simple steps to freshly cleaned clothes:
                    </Typography>
                  </motion.div>
                  
                  {/* Steps - Improved for mobile */}
                  <Box sx={{ mb: { xs: 4, md: 5 } }}>
                    {steps.map((step, index) => (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.4 + (index * 0.2), 
                          duration: 0.5 
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2.5,
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(5px)',
                            transition: 'transform 0.3s, background-color 0.3s',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              transform: 'translateX(5px)'
                            }
                          }}
                        >
                          <Box 
                            sx={{ 
                              width: { xs: 32, sm: 36, md: 40 },
                              height: { xs: 32, sm: 36, md: 40 },
                              borderRadius: '50%',
                              backgroundColor: theme.palette.secondary.main, // Yellow accent
                              color: '#000000',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',
                              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                              mr: { xs: 2, md: 3 },
                              flexShrink: 0
                            }}
                          >
                            {step.number}
                          </Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: '#ffffff', 
                              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                              lineHeight: 1.4
                            }}
                          >
                            {step.text}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                  
                  {/* CTA Button - Center on mobile */}
                  <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 1,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="contained" 
                        size={isMobile ? "medium" : "large"}
                        disableElevation
                        sx={{ 
                          py: { xs: 1.25, md: 1.5 }, 
                          px: { xs: 3, md: 4 }, 
                          fontWeight: 600,
                          fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                          backgroundColor: theme.palette.secondary.main, // Yellow accent
                          color: '#000000',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.dark,
                          },
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Get Started Now
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              </Grid>
              
              {/* Right Image Column - Better on mobile */}
              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ position: 'relative' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ position: 'relative' }}
                >
                  {/* Decorative elements - Hidden on small mobile */}
                  {!isMobile && (
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: { xs: -10, md: -20 },
                        right: { xs: -10, md: -20 },
                        width: '70%',
                        height: '70%',
                        borderRadius: 4,
                        border: `3px dashed ${theme.palette.secondary.main}`,
                        zIndex: 0,
                        display: { xs: 'none', sm: 'block' }
                      }}
                    />
                  )}
                  
                  {/* Main image - Better mobile proportions */}
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      borderRadius: { xs: 3, md: 4 },
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      transform: { 
                        xs: 'perspective(1000px) rotateY(0deg)', 
                        md: 'perspective(1000px) rotateY(-5deg)' 
                      },
                      transition: 'transform 0.5s',
                      '&:hover': {
                        transform: 'perspective(1000px) rotateY(0deg)'
                      },
                      maxWidth: { xs: '85%', sm: '90%', md: '100%' },
                      mx: 'auto'
                    }}
                  >
                    <Box 
                      component="img"
                      src="/api/placeholder/600/450"
                      alt="Freshly folded laundry delivery"
                      sx={{ 
                        width: '100%',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                    
                    {/* Overlay - Adapt text size */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: { xs: 2, md: 3 },
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                        color: 'white',
                        textAlign: 'center'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#ffffff',
                          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' }
                        }}
                      >
                        Join thousands of satisfied customers
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
                
                {/* Floating badge - Repositioned for mobile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 1.2,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      right: { xs: '5%', sm: '0%', md: '-5%' },
                      bottom: { xs: '-10%', sm: '-5%', md: '10%' },
                      zIndex: 2,
                      width: { xs: 90, sm: 100, md: 120 },
                      height: { xs: 90, sm: 100, md: 120 },
                      borderRadius: '50%',
                      backgroundColor: theme.palette.secondary.main, // Yellow accent
                      color: '#000000',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: { xs: 1.5, md: 2 },
                      textAlign: 'center',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                      border: '3px solid white'
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        color: '#000000',
                        lineHeight: 1,
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                      }}
                    >
                      24h
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#000000',
                        fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                      }}
                    >
                      Turnaround Time
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default GetStartedSection;