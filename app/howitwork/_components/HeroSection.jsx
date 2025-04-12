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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 'auto', md: '90vh' },
          minHeight: { xs: 500, md: 700 },
          maxHeight: 900,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: '#e6f9f3', // Light mint background
          pt: { xs: 8, md: 0 },
          pb: { xs: 10, md: 0 },
        }}
      >
        {/* Vertical divider line */}
       

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left side content */}
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Chip 
                  label="20% Discount for 1 Month Subscription" 
                  sx={{ 
                    mb: 2,
                    backgroundColor: '#94FFD4',
                    color: '#000',
                    fontWeight: 500,
                    borderRadius: '16px',
                    py: 0.5
                  }} 
                />
                
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3rem' },
                    color: '#1e3a37', // Dark teal
                    lineHeight: 1.2,
                    mb: 2,
                  }}
                >
                  Laundry Made Simple
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    color: '#1e3a37', 
                    mb: 4,
                    maxWidth: 600,
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.5
                  }}
                >
                  We pick up, clean, and deliver your laundry so you can focus on what matters most. Professional service with just a few clicks.
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    size="medium"
                    endIcon={<ArrowForwardIcon />}
                    href="#process"
                    sx={{
                      borderRadius: 2,
                      py: 1,
                      px: 3,
                      fontWeight: 600,
                      backgroundColor: '#94FFD4',
                      color: '#1e3a37',
                      boxShadow: 'none',
                      textTransform: 'none',
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
                <Box sx={{ display: 'flex', gap: 6 }}>
                  <Box>
                    <Typography
                      variant="h3"
                      component="p"
                      sx={{
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: '#1e3a37',
                      }}
                    >
                      18m+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#1e3a37',
                        fontSize: '0.75rem',
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
                        fontSize: '1.5rem',
                        color: '#1e3a37',
                      }}
                    >
                      10+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#1e3a37',
                        fontSize: '0.75rem',
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
            <Grid item xs={12} md={6}>
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
                  height: '100%',
                }}
              >
                {/* Circular light green background */}
                <Box 
                  sx={{
                    position: 'absolute',
                    width: '90%',
                    height: '90%',
                    borderRadius: '50%',
                    backgroundColor: '#94FFD4',
                    opacity: 0.5,
                    zIndex: 0,
                  }}
                />
                
                {/* Bubbles */}
                {[...Array(10)].map((_, i) => (
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
                      width: 10 + Math.random() * 20,
                      height: 10 + Math.random() * 20,
                      borderRadius: '50%',
                      border: '1px solid #1e3a37',
                      backgroundColor: 'transparent',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      zIndex: 1,
                    }}
                  />
                ))}

                {/* Washing machine image */}
                <Box 
                  sx={{
                    position: 'relative',
                    width: '60%',
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