'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  useMediaQuery,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme'; // Update this path to match your project structure

const HeroSection = ({ fadeInUp, scrollY }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollAnimation = {
    y: isMobile ? 0 : scrollY * 0.1,
    opacity: 1 - (scrollY * 0.002),
  };

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
          backgroundColor: '#e6f9f3', // Light mint background from the design
          pt: { xs: 8, md: 0 },
          pb: { xs: 10, md: 0 },
        }}
      >
        {/* Animated background elements - keeping them for visual interest */}
        <Box
          component={motion.div}
          animate={{
            x: [0, 10, 0],
            y: [0, 15, 0],
            transition: { repeat: Infinity, duration: 20, ease: "easeInOut" },
          }}
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `rgba(127, 244, 212, 0.2)`, // Light mint circle
          }}
        />
        
        <Box
          component={motion.div}
          animate={{
            x: [0, -20, 0],
            y: [0, 10, 0],
            transition: { repeat: Infinity, duration: 15, ease: "easeInOut" },
          }}
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: `rgba(127, 244, 212, 0.2)`, // Light mint circle
          }}
        />

        <Container maxWidth="lg">
          <Grid 
            container 
            spacing={6} 
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                style={scrollY > 0 ? scrollAnimation : {}}
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
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3.5rem' },
                    color: '#1e3a37', // Dark teal color from design
                    lineHeight: 1.2,
                    mb: 2,
                  }}
                >
                  Laundry Made Simple
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    color: '#1e3a37', // Dark teal color for body text
                    opacity: 0.9,
                    mb: 4,
                    maxWidth: 600,
                    fontWeight: 400,
                    fontSize: '1.25rem'
                  }}
                >
                  We pick up, clean, and deliver your laundry so you can focus on what matters most. Professional service with just a few clicks.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    href="#process"
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      px: 3,
                      fontWeight: 600,
                      backgroundColor: '#94FFD4',
                      color: '#1e3a37',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: '#8edfbf',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    See How it works
                  </Button>
                </Box>

                {/* Stats section */}
                <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Box>
                    <Typography
                      variant="h3"
                      component="p"
                      sx={{
                        fontWeight: 700,
                        fontSize: '2rem',
                        color: '#1e3a37',
                        display: 'flex',
                        alignItems: 'baseline',
                      }}
                    >
                      18m+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#1e3a37',
                        fontSize: '0.875rem',
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
                        fontSize: '2rem',
                        color: '#1e3a37',
                        display: 'flex',
                        alignItems: 'baseline',
                      }}
                    >
                      10+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#1e3a37',
                        fontSize: '0.875rem',
                      }}
                    >
                      Years of<br />Experience
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Bubbles in the background */}
                <Box
                  component={motion.div}
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#94FFD4',
                    zIndex: 0,
                  }}
                />
                
                {/* Small decorative bubbles */}
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Box
                    key={index}
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
                      width: 10 + Math.random() * 30,
                      height: 10 + Math.random() * 30,
                      borderRadius: '50%',
                      border: '2px solid #1e3a37',
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      zIndex: 2,
                    }}
                  />
                ))}
                
                {/* Washing machine SVG - embedded directly to avoid external image dependencies */}
                <Box
                  component="div"
                  sx={{
                    width: '60%',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <svg 
                    viewBox="0 0 300 400" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: 'auto' }}
                  >
                    {/* Washing machine body */}
                    <rect x="30" y="20" width="240" height="360" rx="10" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                    
                    {/* Control panel */}
                    <rect x="30" y="20" width="240" height="60" rx="10" fill="#f0f0f0" stroke="#cccccc" strokeWidth="1" />
                    
                    {/* Display */}
                    <rect x="50" y="35" width="80" height="30" rx="5" fill="#e0e0e0" />
                    
                    {/* Knobs and buttons */}
                    <circle cx="170" cy="50" r="15" fill="#d0d0d0" stroke="#a0a0a0" strokeWidth="1" />
                    <circle cx="210" cy="50" r="10" fill="#d0d0d0" stroke="#a0a0a0" strokeWidth="1" />
                    <circle cx="240" cy="50" r="10" fill="#d0d0d0" stroke="#a0a0a0" strokeWidth="1" />
                    
                    {/* Door */}
                    <circle cx="150" cy="200" r="90" fill="#f0f0f0" stroke="#cccccc" strokeWidth="2" />
                    <circle cx="150" cy="200" r="80" fill="#ffffff" stroke="#e0e0e0" strokeWidth="2" />
                    
                    {/* Door window */}
                    <circle cx="150" cy="200" r="70" fill="#c8e6ff" stroke="#b0d8f0" strokeWidth="2" />
                    
                    {/* Drum visible through window */}
                    <circle cx="150" cy="200" r="50" fill="none" stroke="#d0d0d0" strokeWidth="3" />
                    
                    {/* Water/clothes simulation */}
                    <path d="M110,180 Q150,160 190,180 Q170,220 130,220 Q110,200 110,180" fill="#b0d0ff" opacity="0.7" />
                    
                    {/* Drum holes */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30) * Math.PI / 180;
                      const x = 150 + 40 * Math.cos(angle);
                      const y = 200 + 40 * Math.sin(angle);
                      return <circle key={i} cx={x} cy={y} r="5" fill="#e0e0e0" />;
                    })}
                    
                    {/* Door handle */}
                    <rect x="240" y="190" width="20" height="40" rx="5" fill="#d0d0d0" stroke="#b0b0b0" strokeWidth="1" />
                    
                    {/* Reflection highlights */}
                    <ellipse cx="120" cy="170" rx="25" ry="15" fill="#ffffff" opacity="0.3" />
                    <ellipse cx="180" cy="230" rx="20" ry="10" fill="#ffffff" opacity="0.2" />
                  </svg>
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