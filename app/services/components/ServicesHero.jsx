'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme';

const ServicesHero = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
     <Box
  sx={{
    width: '100%',
    height: '100vh',
    minHeight: '100vh',
    backgroundColor: theme.palette.primary.whitishMint,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    py: { xs: 5, md: 0 },
  }}
>

        {/* Content Container */}
        <Container 
          maxWidth="xl" 
          sx={{ 
            position: 'relative', 
            zIndex: 2,
            height: { xs: '100%', sm: 'auto' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xs: 'center', sm: 'flex-start' } // Center content vertically on mobile
          }}
        >
          <Stack 
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, sm: 4, md: 6 }} 
            alignItems="center"
            sx={{ 
              height: { xs: '100%', sm: 'auto' },
              my: { xs: 'auto', sm: 0 }
            }}
          >
            {/* Left section - Text content */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '50%' },
                order: { xs: 2, md: 1 }
              }}
            >
              <Box
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                sx={{ 
                  px: { xs: 2, sm: 2, md: 0 },
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: { xs: 'center', md: 'flex-start' }, // Center content horizontally on mobile
                  textAlign: { xs: 'center', md: 'left' }, // Center text on mobile
                  maxWidth: 600
                }}
              >
                {/* Discount Badge */}
                <Box
                  sx={{
                    display: 'inline-block',
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 50,
                    py: 1,
                    px: 2,
                    mb: 3,
                    mt: { xs: 7, sm: 0 }, // Added top margin for mobile
                    width: 'auto' // Ensure it doesn't expand too wide
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      fontWeight: 600,
                      color: theme.palette.primary.darkBlue,
                      
                    }}
                  >
                    20% Discount for 1 Month Subscription
                  </Typography>
                </Box>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    color: theme.palette.primary.darkBlue,
                    fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  Premium Laundry Services
                </Typography>
                
                <Typography
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
                    color: theme.palette.primary.darkBlue,
                    mb: 4,
                    lineHeight: 1.5,
                  }}
                >
                  Save time with our professional cleaning services
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mb: 5,
                  flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on mobile
                  width: { xs: '100%', sm: 'auto' },
                  alignItems: { xs: 'center', md: 'flex-start' } // Center buttons on mobile
                }}>
                  {/* Book Now Button */}
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: theme.palette.primary.main, 
                      color: theme.palette.primary.darkBlue,
                      px: 3,
                      py: 1.5,
                      borderRadius: 1,
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', sm: '0.95rem' },
                      textTransform: 'none',
                      boxShadow: 'none',
                      width: { xs: '100%', sm: 'auto' }, // Full width on mobile
                      '&:hover': {
                        bgcolor: '#a8e3ca',
                      }
                    }}
                  >
                    Book Now
                  </Button>
                  
                  {/* Learn More Button */}
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#1D363F',
                      color: 'white',
                      px: 3,
                      py: 1.5,
                      borderRadius: 1,
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', sm: '0.95rem' },
                      textTransform: 'none',
                      boxShadow: 'none',
                      width: { xs: '100%', sm: 'auto' }, // Full width on mobile
                      '&:hover': {
                        bgcolor: '#15272e',
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Right section - empty for absolute positioning */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '50%' },
                order: { xs: 1, md: 2 },
                display: { xs: 'none', md: 'block' }
              }}
            />
          </Stack>
        </Container>

        {/* Green Circle Background - hidden on mobile */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: { 
              sm: '-30%', 
              md: '-25%', 
              lg: '-20%' 
            },
            transform: 'translateY(-50%)',
            width: { 
              sm: '650px', 
              md: '800px', 
              lg: '900px' 
            },
            height: { 
              sm: '650px', 
              md: '800px', 
              lg: '900px' 
            },
            borderRadius: '50%',
            bgcolor: theme.palette.primary.main,
            zIndex: 1,
            display: { xs: 'none', sm: 'block' } // Hidden on mobile
          }}
        />

        {/* Washing Machine Image - hidden on mobile */}
        <Box
          component="img"
          src="https://s3-alpha-sig.figma.com/img/3ad0/56cd/5e31bd5f524395328cfa30f48d841ba7?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Q~Tv4CQ0ls-TC1N-nnHRFP7sHOIaHZn4t-I6GPwQyvJTjzaA4Mjtd~7JrI-24NlVQRBT~JowF-eiFz-lUsSaq3xVIQ3KTlqJ-vKTvT9ktT5raFDBgyKzKLWO7uy3NyYUdmqc0WrrxJN~xkcPvD0NNPs~7p1TLrKeI4kQwQmELHCEnP9aCmNj-vypCVqiUJKynOTLfslQ7S6q0REygMtJQ23l2qN16vvMIDioquYfPbeQfpFn1EMeC-qSV9jxUCpN2nugQPepynun7atqL8SJwEErbPz7D8v0cILwWQhxGLHODenDx~dRx6GXNWHiMyss7Gr0SfxHs0Dcn8QAKsvBhg__"
          alt="Washing machine"
          sx={{
            position: 'absolute',
            right: { sm: '10%', md: '10%' },
            top: '50%',
            transform: 'translateY(-50%)',
            width: { sm: '250px', md: '300px', lg: '320px' },
            height: 'auto',
            zIndex: 2,
            display: { xs: 'none', sm: 'block' } // Hidden on mobile
          }}
        />

        {/* Decorative Circles - hidden on mobile */}
        {[
          { top: '15%', right: '15%', size: 20 },
          { top: '12%', right: '25%', size: 15 },
          { top: '8%', right: '10%', size: 10 },
          { top: '30%', right: '5%', size: 18 },
          { top: '45%', right: '20%', size: 12 },
          { top: '60%', right: '15%', size: 25 },
          { top: '70%', right: '25%', size: 15 },
          { top: '80%', right: '10%', size: 18 },
        ].map((circle, idx) => (
          <Box
            key={`outline-${idx}`}
            component={motion.div}
            animate={{
              y: [0, -5, 0],
              transition: { 
                repeat: Infinity, 
                duration: 2 + Math.random() * 2, 
                ease: "easeInOut",
                delay: Math.random() * 1
              }
            }}
            sx={{
              position: 'absolute',
              width: circle.size,
              height: circle.size,
              top: circle.top,
              right: circle.right,
              borderRadius: '50%',
              border: `1.5px solid ${theme.palette.primary.darkBlue}`,
              opacity: 0.5,
              zIndex: 3,
              display: { xs: 'none', sm: 'block' } // Hidden on mobile
            }}
          />
        ))}

        {/* Filled Circles - hidden on mobile */}
        {[
          { top: '20%', right: '20%', size: 8 },
          { top: '40%', right: '8%', size: 6 },
          { top: '55%', right: '25%', size: 10 },
          { top: '75%', right: '20%', size: 7 },
        ].map((circle, idx) => (
          <Box
            key={`filled-${idx}`}
            sx={{
              position: 'absolute',
              width: circle.size,
              height: circle.size,
              top: circle.top,
              right: circle.right,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.darkBlue,
              opacity: 0.3,
              zIndex: 3,
              display: { xs: 'none', sm: 'block' } // Hidden on mobile
            }}
          />
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default ServicesHero;