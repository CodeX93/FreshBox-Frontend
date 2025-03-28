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
const DARK_TURQUOISE = '#20c5b7';

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
        bgcolor: DARK_TURQUOISE,
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, sm: 6, md: 6 }, // Increased padding
        px: { xs: 2, sm: 3, md: 4 }  // Added horizontal padding
      }}
    >
      {/* Background shape decorations */}
      <MotionBox
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: 'white',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />
      
      <Container 
        maxWidth="xl" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          py: { xs: 3, md: 4 } // Added vertical padding
        }}
      >
        <Grid 
          container 
          spacing={{ xs: 4, sm: 5, md: 6 }} // Increased spacing between grid items
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              sx={{ px: { xs: 1, sm: 2, md: 3 } }} // Added horizontal padding
            >
              <MotionTypography
                variant="h1"
                component="h1"
                variants={itemVariants}
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3.5rem' },
                  mb: { xs: 1.5, sm: 2, md: 2.5 }, // Increased margin
                  color: 'white',
                  lineHeight: 1.1,
                  letterSpacing: '0.01em' // Added slight letter spacing
                }}
              >
                Commercial Laundry Solutions
              </MotionTypography>
              
              <MotionTypography
                variant="h4"
                variants={itemVariants}
                sx={{ 
                  mb: { xs: 2, sm: 3, md: 3.5 }, // Increased margin
                  fontWeight: 400,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.3 // Increased line height
                }}
              >
                Professional laundry services for businesses of all sizes
              </MotionTypography>
              
              <MotionBox variants={itemVariants}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: { xs: 3, sm: 4, md: 5 }, // Increased margin
                    fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1.05rem' }, // Slightly increased font size
                    maxWidth: 550, // Increased max width
                    color: 'rgba(255, 255, 255, 0.8)',
                    display: isSmallHeight && isMobile ? 'none' : 'block',
                    lineHeight: 1.6 // Increased line height for better readability
                  }}
                >
                  FreshBox provides comprehensive commercial laundry solutions with eco-friendly processes and flexible scheduling designed to adapt to your unique business needs.
                </Typography>
              </MotionBox>
              
              <MotionBox 
                display="flex" 
                gap={{ xs: 2, sm: 3 }} // Increased gap
                flexWrap="wrap"
                variants={itemVariants}
              >
                <MotionButton
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  sx={{ 
                    bgcolor: 'white',
                    color: DARK_TURQUOISE,
                    px: { xs: 3, sm: 4 }, // Increased padding
                    py: { xs: 1, sm: 1.5 }, // Increased padding
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.95rem' }, // Increased font size
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                    textTransform: 'none' // Remove all caps
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
                    color: 'white',
                    borderColor: 'white',
                    px: { xs: 3, sm: 4 }, // Increased padding
                    py: { xs: 1, sm: 1.5 }, // Increased padding
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.95rem' }, // Increased font size
                    '&:hover': { 
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    },
                    textTransform: 'none' // Remove all caps
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
                  gap: { xs: 2, md: 3 }, // Increased gap
                  mt: { xs: 4, sm: 5 } // Increased margin top
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
                        width: 8, // Increased size
                        height: 8, // Increased size
                        borderRadius: '50%',
                        bgcolor: 'white',
                        mr: 1.5 // Increased margin
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      fontWeight={500}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: { xs: '0.8rem', sm: '0.85rem' } // Increased font size
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
                minHeight: { xs: '220px', sm: '260px', md: '320px' }, // Increased height
                mt: { xs: 3, md: 0 }, // Added margin top on mobile
                mb: { xs: 4, md: 0 }  // Added margin bottom on mobile
              }}
              initial="hidden"
              animate="visible"
            >
              {/* Central icon */}
              <MotionBox
                variants={iconVariants}
                sx={{
                  width: { xs: 130, sm: 170, md: 220 }, // Increased size
                  height: { xs: 130, sm: 170, md: 220 }, // Increased size
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'white',
                  boxShadow: '0 10px 35px rgba(0,0,0,0.15)', // Enhanced shadow
                  border: { xs: '6px solid', sm: '8px solid', md: '10px solid' },
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  zIndex: 2
                }}
              >
                <CommercialIcon 
                  sx={{ 
                    fontSize: { xs: 50, sm: 70, md: 90 }, // Increased size
                    color: DARK_TURQUOISE
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
                  elevation={3} // Increased elevation
                  sx={{
                    position: 'absolute',
                    py: { sm: 1, md: 1.5 }, // Increased padding
                    px: { sm: 2, md: 2.5 }, // Increased padding
                    borderRadius: '8px',
                    bgcolor: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    ...item,
                    zIndex: 1,
                    cursor: 'pointer'
                  }}
                >
                  <Typography 
                    variant="body2" 
                    fontWeight={600}
                    color={DARK_TURQUOISE}
                    sx={{
                      fontSize: { sm: '0.8rem', md: '0.9rem' } // Increased font size
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
                    gap: 1.5, // Increased gap
                    position: 'absolute',
                    bottom: '-30px', // Moved down
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
                      elevation={2} // Increased elevation
                      sx={{
                        py: 0.75, // Increased padding
                        px: 2, // Increased padding
                        borderRadius: '8px',
                        bgcolor: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={DARK_TURQUOISE}
                        sx={{
                          fontSize: '0.75rem' // Increased font size
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
            alignItems: 'center',
            padding: 2 // Added padding
          }}
        >
          <Typography 
            variant="body2" 
            color="white"
            sx={{ mb: 1, fontSize: '0.85rem' }} // Increased margin and font size
          >
            Scroll to explore
          </Typography>
          <Box 
            sx={{ 
              width: 28, // Increased size
              height: 44, // Increased size
              borderRadius: 14, // Increased radius
              border: '2px solid',
              borderColor: 'rgba(255, 255, 255, 0.4)',
              display: 'flex',
              justifyContent: 'center',
              pt: 1.5 // Increased padding
            }}
          >
            <Box 
              sx={{ 
                width: 6, // Increased size
                height: 6, // Increased size
                borderRadius: '50%',
                bgcolor: 'white'
              }}
            />
          </Box>
        </MotionBox>
      )}
    </Box>
  );
}