'use client';

import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Button,
  Box,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';

const GetStartedSection = () => {
  const theme = useTheme();
  
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
    <Box
      component="section"
      id="get-started-section"
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0D3B6E', // Dark blue background
        color: '#ffffff', // White text
        py: 8
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%' }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            {/* Left Content Column */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Heading */}
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h3" 
                    component="h2" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: { xs: '2.2rem', md: '2.8rem' },
                      color: '#ffffff',
                      mb: 3
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
                      mb: 4,
                      fontWeight: 400
                    }}
                  >
                    Three simple steps to freshly cleaned clothes:
                  </Typography>
                </motion.div>
                
                {/* Steps */}
                <Box sx={{ mb: 5 }}>
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
                          p: 2,
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
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.secondary.main || '#FFC107',
                            color: '#000000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            mr: 3,
                            flexShrink: 0
                          }}
                        >
                          {step.number}
                        </Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#ffffff', 
                            fontSize: '1.1rem'
                          }}
                        >
                          {step.text}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
                
                {/* CTA Button */}
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
                  disableElevation 
                    variant="contained" 
                    size="large"
           
                    sx={{ 
                      py: 1.5, 
                      px: 4, 
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      backgroundColor: theme.palette.secondary.main || '#FFC107',
                      color: '#000000',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.dark || '#FFA000',
                      }
                    }}
                  >
                    Get Started Now
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
            
            {/* Right Image Column */}
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ position: 'relative' }}
              >
                {/* Decorative elements */}
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: '70%',
                    height: '70%',
                    borderRadius: 4,
                    border: `3px dashed ${theme.palette.secondary.main || '#FFC107'}`,
                    zIndex: 0
                  }}
                />
                
                {/* Main image */}
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'transform 0.5s',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(0deg)'
                    }
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
                  
                  {/* Overlay for better text contrast */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 3,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#ffffff'
                      }}
                    >
                      Join thousands of satisfied customers
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.2,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300
                }}
                style={{
                  position: 'absolute',
                  right: { xs: '5%', md: '-5%' },
                  bottom: { xs: '-5%', md: '10%' },
                  zIndex: 2
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.secondary.main || '#FFC107',
                    color: '#000000',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
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
                      lineHeight: 1
                    }}
                  >
                    24h
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#000000'
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
  );
};

export default GetStartedSection;