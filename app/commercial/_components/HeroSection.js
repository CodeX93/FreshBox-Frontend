'use client';

import { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { Business as CommercialIcon } from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';

// Define constants
const TURQUOISE = '#28ddcd';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionPaper = motion(Paper);

export default function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallHeight = useMediaQuery('(max-height: 700px)');
  
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start('visible');
  }, [controls]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 150,
        delay: 0.3,
        duration: 0.5 
      }
    }
  };
  
  return (
    <Box 
      sx={{ 
        minHeight: { xs: 'calc(100vh - 20px)', sm: '100vh' },
        height: { xs: 'auto', sm: '100vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#f9f9f9',
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(40,221,205,0.1) 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, sm: 4 }
      }}
    >
      {/* Background shape decorations */}
      <MotionBox
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: TURQUOISE,
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3 }} 
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              <MotionTypography
                variant="h1"
                component="h1"
                variants={itemVariants}
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3.5rem' },
                  mb: { xs: 0.5, sm: 1 },
                  color: '#333',
                  lineHeight: 1.1
                }}
              >
                Commercial Laundry Solutions
              </MotionTypography>
              
              <MotionTypography
                variant="h4"
                color="text.secondary"
                variants={itemVariants}
                sx={{ 
                  mb: { xs: 1, sm: 2 },
                  fontWeight: 400,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' }
                }}
              >
                Professional laundry services for businesses of all sizes
              </MotionTypography>
              
              <MotionBox variants={itemVariants}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: { xs: 1.5, sm: 2, md: 3 }, 
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                    maxWidth: 500,
                    color: 'text.secondary',
                    display: isSmallHeight && isMobile ? 'none' : 'block'
                  }}
                >
                  FreshBox provides comprehensive commercial laundry solutions with eco-friendly processes and flexible scheduling designed to adapt to your unique business needs.
                </Typography>
              </MotionBox>
              
              <MotionBox 
                display="flex" 
                gap={{ xs: 1, sm: 2 }}
                flexWrap="wrap"
                variants={itemVariants}
              >
                <MotionButton
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  sx={{ 
                    bgcolor: TURQUOISE,
                    color: 'white',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 0.75, sm: 1 },
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': { bgcolor: '#20c5b7' }
                  }}
                >
                  Request a Quote
                </MotionButton>
                
                <MotionButton
                  variant="outlined"
                  size={isMobile ? "medium" : "large"}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  sx={{ 
                    color: TURQUOISE,
                    borderColor: TURQUOISE,
                    px: { xs: 2, sm: 3 },
                    py: { xs: 0.75, sm: 1 },
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': { 
                      borderColor: TURQUOISE,
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  Learn More
                </MotionButton>
              </MotionBox>
              
              <MotionBox 
                variants={itemVariants}
                sx={{ 
                  display: isSmallHeight && isMobile ? 'none' : 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: { xs: 1, md: 2 },
                  mt: { xs: 2, sm: 3 }
                }}
              >
                {['Eco-Friendly', 'Free Pickup', '24-Hour Turnaround', 'Commercial Discounts'].map((feature, index) => (
                  <Box 
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: TURQUOISE,
                        mr: 1
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      fontWeight={500}
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: { xs: '0.75rem', sm: '0.8rem' }
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </MotionBox>
            </MotionBox>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <MotionBox
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                minHeight: { xs: '180px', sm: '240px', md: '300px' }
              }}
              initial="hidden"
              animate="visible"
            >
              {/* Central icon */}
              <MotionBox
                variants={iconVariants}
                sx={{
                  width: { xs: 120, sm: 160, md: 200 },
                  height: { xs: 120, sm: 160, md: 200 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'white',
                  boxShadow: 'none',
                  border: { xs: '6px solid', sm: '8px solid', md: '10px solid' },
                  borderColor: 'rgba(40,221,205,0.1)',
                  zIndex: 2
                }}
              >
                <CommercialIcon 
                  sx={{ 
                    fontSize: { xs: 40, sm: 60, md: 80 },
                    color: TURQUOISE
                  }} 
                />
              </MotionBox>
              
              {/* Service cards - display for tablet and above */}
              {!isMobile && [
                { label: 'Airbnb', top: '10%', right: isTablet ? '8%' : '18%', delay: 0.5 },
                { label: 'Healthcare', bottom: '10%', right: isTablet ? '10%' : '20%', delay: 0.6 },
                { label: 'Gym', bottom: '25%', left: isTablet ? '5%' : '15%', delay: 0.7 },
                { label: 'Spa', top: '25%', left: isTablet ? '0%' : '10%', delay: 0.8 },
              ].map((item, index) => (
                <MotionPaper
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: item.delay,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05 }}
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    py: { sm: 0.75, md: 1 },
                    px: { sm: 1.5, md: 2 },
                    borderRadius: '8px',
                    bgcolor: 'white',
                    border: '1px solid rgba(40,221,205,0.3)',
                    ...item,
                    zIndex: 1,
                    cursor: 'pointer'
                  }}
                >
                  <Typography 
                    variant="body2" 
                    fontWeight={600}
                    color="text.primary"
                    sx={{
                      fontSize: { sm: '0.75rem', md: '0.875rem' }
                    }}
                  >
                    {item.label}
                  </Typography>
                </MotionPaper>
              ))}
              
              {/* For mobile, show service items in a horizontal row */}
              {isMobile && (
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 1,
                    position: 'absolute',
                    bottom: '-20px',
                    width: '100%'
                  }}
                >
                  {['Airbnb', 'Healthcare', 'Gym', 'Spa'].map((label, index) => (
                    <MotionPaper
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.5 + (index * 0.1),
                        type: 'spring',
                        stiffness: 100
                      }}
                      elevation={0}
                      sx={{
                        py: 0.5,
                        px: 1.5,
                        borderRadius: '8px',
                        bgcolor: 'white',
                        border: '1px solid rgba(40,221,205,0.3)',
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color="text.primary"
                        sx={{
                          fontSize: '0.7rem'
                        }}
                      >
                        {label}
                      </Typography>
                    </MotionPaper>
                  ))}
                </MotionBox>
              )}
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
      
      {/* Scroll indicator - hide on very small screens */}
      {!isSmallHeight && (
        <MotionBox
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [0, 8, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            delay: 1.5
          }}
          sx={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 0.5, fontSize: '0.8rem' }}
          >
            Scroll to explore
          </Typography>
          <Box 
            sx={{ 
              width: 24,
              height: 40,
              borderRadius: 12,
              border: '2px solid',
              borderColor: 'rgba(0,0,0,0.2)',
              display: 'flex',
              justifyContent: 'center',
              pt: 1
            }}
          >
            <Box 
              sx={{ 
                width: 5,
                height: 5,
                borderRadius: '50%',
                bgcolor: TURQUOISE
              }}
            />
          </Box>
        </MotionBox>
      )}
    </Box>
  );
}