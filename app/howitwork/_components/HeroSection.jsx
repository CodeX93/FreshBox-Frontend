'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme'; // Update path as needed
import Image from 'next/image';

const HeroSection = ({ fadeInUp, scrollY }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 'auto', sm: 'auto', md: '90vh' },
          minHeight: { xs: 400, sm: 450, md: 700 },
          maxHeight: { xs: 'none', md: 900 },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: '#e6f9f3', // Light mint background
          pt: { xs: 6, sm: 8, md: 0 },
          pb: { xs: 8, sm: 10, md: 0 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} alignItems="center">
            {/* Left side content */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                sx={{ px: { xs: 1, sm: 2, md: 0 } }}
              >
                <Chip 
                  label="20% Discount for 1 Month Subscription" 
                  sx={{ 
                    mb: { xs: 1.5, md: 2 },
                    backgroundColor: '#94FFD4',
                    color: '#000',
                    fontWeight: 500,
                    borderRadius: '16px',
                    py: 0.5,
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
                  }} 
                />
                
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    color: '#1e3a37', // Dark teal
                    lineHeight: 1.2,
                    mb: { xs: 1.5, md: 2 },
                  }}
                >
                  Laundry Made Simple
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    color: '#1e3a37', 
                    mb: { xs: 3, md: 4 },
                    maxWidth: 600,
                    fontWeight: 400,
                    fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                    lineHeight: 1.5
                  }}
                >
                  We pick up, clean, and deliver your laundry so you can focus on what matters most. Professional service with just a few clicks.
                </Typography>

                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                  <Button
                    variant="contained"
                    size={isSmallMobile ? "small" : "medium"}
                    endIcon={<ArrowForwardIcon />}
                    href="#process"
                    sx={{
                      borderRadius: 2,
                      py: { xs: 0.75, md: 1 },
                      px: { xs: 2, md: 3 },
                      fontWeight: 600,
                      backgroundColor: '#94FFD4',
                      color: '#1e3a37',
                      boxShadow: 'none',
                      textTransform: 'none',
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                      '&:hover': {
                        backgroundColor: '#8edfbf',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    See how it works
                  </Button>
                </Box>

                {/* Stats section */}
                <Box sx={{ display: 'flex', gap: { xs: 3, sm: 4, md: 6 } }}>
                  <Box>
                    <Typography
                      variant="h3"
                      component="p"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.5rem' },
                        color: '#1e3a37',
                      }}
                    >
                      18m+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#1e3a37',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      Happy<br />Customers
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography
                      variant="h3"
                      component="p"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.5rem' },
                        color: '#1e3a37',
                      }}
                    >
                      10+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#1e3a37',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      Years of<br />Experience
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right side image */}
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ mb: { xs: 3, md: 0 } }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: '300px', sm: '350px', md: '100%' },
                }}
              >
                {/* Circular light green background */}
                <Box 
                  sx={{
                    position: 'absolute',
                    width: { xs: '80%', sm: '85%', md: '90%' },
                    height: { xs: '80%', sm: '85%', md: '90%' },
                    borderRadius: '50%',
                    backgroundColor: '#94FFD4',
                    opacity: 0.5,
                    zIndex: 0,
                  }}
                />
                
                {/* Bubbles */}
                {[...Array(isSmallMobile ? 5 : 10)].map((_, i) => (
                  <Box
                    key={i}
                    component={motion.div}
                    animate={{
                      y: [0, -10, 0],
                      transition: { 
                        repeat: Infinity, 
                        duration: 2 + Math.random() * 3, 
                        ease: "easeInOut",
                        delay: Math.random() * 2
                      },
                    }}
                    sx={{
                      position: 'absolute',
                      width: isSmallMobile ? (5 + Math.random() * 15) : (10 + Math.random() * 20),
                      height: isSmallMobile ? (5 + Math.random() * 15) : (10 + Math.random() * 20),
                      borderRadius: '50%',
                      border: '1px solid #1e3a37',
                      backgroundColor: 'transparent',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      zIndex: 1,
                      display: { xs: i < 5 ? 'block' : 'none', md: 'block' },
                    }}
                  />
                ))}

                {/* Washing machine image */}
                <Box 
                  sx={{
                    position: 'relative',
                    width: { xs: '50%', sm: '55%', md: '60%' },
                    height: 'auto',
                    zIndex: 2,
                  }}
                >
                  {/* Replace with the real washing machine image URL */}
                  <img
                    src="https://s3-alpha-sig.figma.com/img/c6ca/a559/7a018b89222ec1abfd41a1f975af9a51?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oVmBem5E1~rWmWFQ9kraQ6T0E~QXDPMbNF~y6CV5KjfzpHQa9dgSzc0P67x-HmgDM4j~n0f5fHsESBKjYuWS2Jmnuqu69oh1sKqscYp97FgA3r3wXRVlKI4YBlpuP4y9C-KDixhHMvFBUVtelS8e-Nj1siptD1UoxvbxN12ZvMQj4R8gfjpxQuazdgdHv5ldswlE0CUVHuWZlWh6BBGuz1LWsYfh8Rp3wHWmEx8gvN1bPbbl4HCRZ911l~rap4-NGW~PHhCY0rSyAH4htAbFyKYOywEFthW~JOQPu5RzDrBxLuszkONKUDpHHneNFHYaOuUY1XWf-g8RRT~ArHQERw__"
                    alt="Washing Machine"
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HeroSection;