'use client';

import React from 'react';
import {
  Typography,
  Grid,
  Button,
  Box,
  useMediaQuery,
  ThemeProvider
} from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { theme } from '../../../contexts/Theme'; // Import the theme from your context

const ClientGetStartedSection = ({ steps }) => {
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

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%' }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Content Column - Order changes on mobile */}
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Heading with improved typography */}
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 800, 
                    fontSize: { xs: '2rem', sm: '2.4rem', md: '2.7rem', lg: '3rem' },
                    color: theme.palette.primary.white,
                    mb: { xs: 2, md: 3 },
                    lineHeight: 1.2,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-12px',
                      left: '0',
                      width: '60px',
                      height: '4px',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '2px'
                    }
                  }}
                >
                  Ready to Free Up Your Time?
                </Typography>
              </motion.div>
              
              {/* Subheading with better spacing */}
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    mb: { xs: 4, md: 5 },
                    fontWeight: 400,
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                    mt: 3
                  }}
                >
                  Three simple steps to freshly cleaned clothes:
                </Typography>
              </motion.div>
              
              {/* Steps with improved styling */}
              <Box sx={{ mb: { xs: 5, md: 6 } }}>
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
                        mb: 3,
                        p: { xs: 2, sm: 2.5, md: 3 },
                        borderRadius: 2.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          backgroundColor: 'rgba(133, 210, 179, 0.1)',
                          transform: 'translateX(5px) scale(1.01)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                        },
                        border: '1px solid rgba(133, 210, 179, 0.1)'
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: { xs: 40, sm: 45, md: 50 },
                          height: { xs: 40, sm: 45, md: 50 },
                          borderRadius: '50%',
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.black,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                          mr: { xs: 2, md: 3 },
                          flexShrink: 0,
                          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                        }}
                      >
                        {step.number}
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: theme.palette.primary.white, 
                          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                          lineHeight: 1.4,
                          fontWeight: 400
                        }}
                      >
                        {step.text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
              
              {/* CTA Button with improved styling */}
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
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      py: { xs: 1.5, md: 2 }, 
                      px: { xs: 4, md: 5 }, 
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.black,
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.mainHover,
                        boxShadow: '0 5px 15px rgba(133, 210, 179, 0.4)'
                      },
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 15px rgba(133, 210, 179, 0.3)',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Get Started Now
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
          
          {/* Right Image Column - Better styling and effects */}
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ position: 'relative' }}>
            {/* Badge with improved styling */}
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
                right: isMobile ? '5%' : isTablet ? '5%' : '0%',
                bottom: isMobile ? '20%' : isTablet ? '20%' : '10%',
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  width: { xs: 100, sm: 110, md: 130 },
                  height: { xs: 100, sm: 110, md: 130 },
                  borderRadius: '50%',
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.black,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: { xs: 1.5, md: 2 },
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(133, 210, 179, 0.3)',
                  border: '3px solid white'
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 800,
                    color: theme.palette.primary.dark,
                    lineHeight: 1,
                    fontSize: { xs: '1.8rem', sm: '2rem', md: '2.3rem' }
                  }}
                >
                  24h
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 700,
                    color: theme.palette.primary.dark,
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }
                  }}
                >
                  Turnaround Time
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ position: 'relative' }}
            >
              {/* Image with improved styling */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: { xs: 4, md: 5 },
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: { 
                    xs: 'perspective(1000px) rotateY(0deg)', 
                    md: 'perspective(1000px) rotateY(-5deg)' 
                  },
                  transition: 'all 0.5s',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg) translateY(-10px)',
                    boxShadow: '0 30px 50px rgba(0,0,0,0.3)'
                  },
                  maxWidth: { xs: '90%', sm: '90%', md: '100%' },
                  mx: 'auto',
                  aspectRatio: '4/3',
                  width: '100%',
                  border: '5px solid rgba(133, 210, 179, 0.1)'
                }}
              >
                <Image 
                  src="https://images.pexels.com/photos/4108797/pexels-photo-4108797.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Freshly folded laundry delivery"
                  priority
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 600px"
                  style={{ 
                    objectFit: 'cover',
                    borderRadius: 'inherit'
                  }}
                />
                
                {/* Overlay with improved design */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: { xs: 2.5, md: 3.5 },
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3) 60%, rgba(0,0,0,0))',
                    color: 'white',
                    textAlign: 'center',
                    zIndex: 2
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.primary.white,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    Join thousands of satisfied customers
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </ThemeProvider>
  );
};

export default ClientGetStartedSection;