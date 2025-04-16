'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { theme } from "../../../contexts/Theme";

const HeroSection = () => {
  const primaryColor = theme.palette.primary.main;
  const darkBlueColor = theme.palette.primary.darkBlue;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
    <Box 
      sx={{
        width: '100%',
        height: { xs: '100vh', md: '100vh' },
        minHeight: { xs: '100vh', md: 700 },
        backgroundColor: theme.palette.primary.whitishMint,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Content Container */}
      <Container 
        maxWidth={false}
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          height: '100%', // Full viewport height
          display: 'flex',
          alignItems: 'center', // Center vertically
          px: { xs: 3, sm: 4, md: 5, lg: 6 },
          maxWidth: '1800px',
        }}
      >
        <Stack 
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          sx={{ width: '100%' }}
        >
          {/* Left section - Text content */}
          <Box 
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            sx={{ 
              width: { xs: '100%', md: '50%', lg: '40%' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Box sx={{ maxWidth: 600, mx: { xs: 'auto', md: 0 } }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  color: darkBlueColor,
                  fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3.5rem' },
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Commercial Laundry Solutions
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.2rem' },
                  color: darkBlueColor,
                  mb: 4,
                  lineHeight: 1.5,
                }}
              >
                FreshBox provides comprehensive commercial laundry solutions with eco-friendly processes and flexible scheduling designed to adapt to your unique business needs.
              </Typography>

              {/* Buttons */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ 
                  mb: 4,
                  width: '100%',
                  alignItems: { xs: 'center', md: 'flex-start' },
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: primaryColor,
                    color: darkBlueColor,
                    px: 4,
                    py: 1.5,
                    borderRadius: 1,
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: '#8cdec0',
                    },
                    textTransform: 'none',
                    width: { xs: '100%', sm: '200px' },
                    boxShadow: 'none',
                  }}
                >
                  Request A Quote
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: darkBlueColor,
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 1,
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: '#00494f',
                    },
                    textTransform: 'none',
                    width: { xs: '100%', sm: '200px' },
                    boxShadow: 'none',
                  }}
                >
                  Learn More
                </Button>
              </Stack>

              {/* Features with bullet points */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: { xs: 'column', sm: 'row' },
                  rowGap: 2,
                  columnGap: 3,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  alignItems: { xs: 'center', md: 'flex-start' }
                }}
              >
                {[
                  'Eco-Friendly',
                  'Free Pickup',
                  '24-Hour Turnaround',
                  'Commercial Discounts'
                ].map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      ...(index === 3 && {
                        flexBasis: { xs: 'auto', sm: '100%' },
                        mt: { xs: 0, sm: 0 }
                      })
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: darkBlueColor,
                        mr: 1.5,
                        flexShrink: 0
                      }}
                    />
                    <Typography
                      sx={{
                        color: darkBlueColor,
                        fontSize: '0.95rem',
                        fontWeight: 500
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          
          {/* Right section - Empty for desktop layout */}
          <Box sx={{ 
            width: { xs: '100%', md: '50%', lg: '60%' },
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            height: '100%'
          }} />
        </Stack>
      </Container>

      {/* Green Circle Background - hidden on mobile */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: '-60%', sm: '-40%', md: '-30%', lg: '-20%' },
          transform: 'translateY(-50%)',
          width: { xs: '600px', sm: '700px', md: '800px', lg: '900px' },
          height: { xs: '600px', sm: '700px', md: '800px', lg: '900px' },
          borderRadius: '50%',
          bgcolor: primaryColor,
          zIndex: 1,
          display: { xs: 'none', md: 'block' } // Hidden on mobile
        }}
      />

      {/* Laundry Basket Image - hidden on mobile */}
      <Box
        component="img"
        src="https://s3-alpha-sig.figma.com/img/ed54/57a3/ad4ad7ff84678a476d6196fa22b8a790?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roEpVVMIuhumWMa88uKzmxAe9bZtxgAp73VUiGltRZGENVIl8UVQptr2cRwOXJStziqVE4GKwTDWDOWO-b7g1ZIVFWWQ4Ot7XpQVvUKEa-cHwxDtqaQzbPAaefDUKUF2S7plVXqfewVV1F7m5r7lT--E5EEAQUyExDPguVpEht4N~MLEBXxILAPbPnT19psT3L5NtLuKC4QJkNHcOGzkOKN3MLN2kouOJ6EOHEwQzHwCV7CgFJCBP83s3ILEweqTeBi9EbIbM86SjVPE2N7SRUaex93IUPd64rthoLFKDWgajnoxtzLuPXhgUGx2rAegETI~xncaRWTRP3RwhiNrAA__"
        alt="Commercial laundry service illustration"
        sx={{
          position: 'absolute',
          right: { md: '5%' },
          top: '50%',
          transform: 'translateY(-50%)',
          width: { md: '350px', lg: '400px' },
          height: 'auto',
          zIndex: 2,
          display: { xs: 'none', md: 'block' } // Hidden on mobile
        }}
      />

      {/* Empty Circles - Outlined - hidden on mobile */}
      {[
        { top: '25%', right: '15%', size: 15 },
        { top: '15%', right: '25%', size: 10 },
        { top: '40%', right: '30%', size: 12 },
        { top: '60%', right: '25%', size: 8 },
        { top: '68%', right: '15%', size: 14 },
        { top: '75%', right: '30%', size: 10 },
        { top: '45%', right: '10%', size: 18 },
        { top: '10%', right: '10%', size: 12 },
        { top: '85%', right: '20%', size: 9 },
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
            border: `1.5px solid ${darkBlueColor}`,
            opacity: 0.5,
            zIndex: 2,
            display: { xs: 'none', md: 'block' } // Hidden on mobile
          }}
        />
      ))}

      {/* Filled Circles - hidden on mobile */}
      {[
        { top: '20%', right: '20%', size: 6 },
        { top: '35%', right: '20%', size: 8 },
        { top: '50%', right: '15%', size: 5 },
        { top: '65%', right: '20%', size: 7 },
        { top: '80%', right: '28%', size: 6 },
      ].map((circle, idx) => (
        <Box
          key={`filled-${idx}`}
          component={motion.div}
          animate={{
            y: [0, -3, 0],
            transition: { 
              repeat: Infinity, 
              duration: 1.5 + Math.random() * 1.5, 
              ease: "easeInOut",
              delay: Math.random() * 0.5
            }
          }}
          sx={{
            position: 'absolute',
            width: circle.size,
            height: circle.size,
            top: circle.top,
            right: circle.right,
            borderRadius: '50%',
            backgroundColor: darkBlueColor,
            opacity: 0.3,
            zIndex: 2,
            display: { xs: 'none', md: 'block' } // Hidden on mobile
          }}
        />
      ))}
    </Box>
  );
};

export default HeroSection;