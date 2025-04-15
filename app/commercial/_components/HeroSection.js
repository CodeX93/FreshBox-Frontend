'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { theme } from "../../../contexts/Theme";

const HeroSection = () => {
  const primaryColor = theme.palette.primary.main;
  const darkBlueColor = theme.palette.primary.darkBlue;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{
        width: '100%',
        minHeight: { xs: 'auto', md: '100vh' },
        backgroundColor: theme.palette.primary.whitishMint,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
          {/* Left section */}
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Box sx={{ pr: { md: 6 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: darkBlueColor,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem', lg: '2.8rem' },
                  mb: { xs: 1.5, md: 2 },
                  lineHeight: 1.2,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Commercial Laundry Solutions
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
                  color: darkBlueColor,
                  mb: { xs: 3, md: 4 },
                  maxWidth: '600px',
                  textAlign: { xs: 'center', md: 'left' },
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                FreshBox provides comprehensive commercial laundry solutions with eco-friendly processes and flexible scheduling designed to adapt to your unique business needs.
              </Typography>

              <Stack 
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1.5, sm: 2 }} 
                mb={4}
                sx={{
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Button
                  variant="contained"
                  fullWidth={isExtraSmall}
                  sx={{
                    bgcolor: primaryColor,
                    color: darkBlueColor,
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    '&:hover': {
                      bgcolor: '#8cdec0',
                    },
                    textTransform: 'none',
                    maxWidth: { xs: '100%', sm: '200px' },
                  }}
                >
                  Request A Quote
                </Button>
                <Button
                  variant="contained"
                  fullWidth={isExtraSmall}
                  sx={{
                    bgcolor: darkBlueColor,
                    color: 'white',
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    '&:hover': {
                      bgcolor: '#00494f',
                    },
                    textTransform: 'none',
                    maxWidth: { xs: '100%', sm: '200px' },
                  }}
                >
                  Learn More
                </Button>
              </Stack>

              <Box sx={{ 
                display: 'flex', 
                flexWrap: { xs: 'wrap', md: 'nowrap' }, 
                gap: { xs: 2, md: 4 },
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                overflow: 'visible',
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}>
                {['Eco-Friendly', 'Free Pickup', '24-Hour Turnaround', 'Commercial Discounts'].map((feature, index) => (
                  <Box 
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                      mb: { xs: 1, md: 0 },
                      minWidth: { xs: '45%', sm: 'auto' },
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: darkBlueColor,
                        mr: 1.5,
                        flexShrink: 0,
                      }}
                    />
                    <Typography 
                      sx={{ 
                        color: darkBlueColor,
                        fontSize: { xs: '0.85rem', md: '0.9rem' },
                        fontWeight: 500,
                        whiteSpace: { xs: 'normal', md: 'nowrap' },
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right section with image - now visible on all screen sizes */}
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ mb: { xs: 2, md: 0 } }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxHeight: { xs: '250px', sm: '350px', md: '450px' },
              }}
            >
              <Box
                component="img"
                src="https://s3-alpha-sig.figma.com/img/ed54/57a3/ad4ad7ff84678a476d6196fa22b8a790?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roEpVVMIuhumWMa88uKzmxAe9bZtxgAp73VUiGltRZGENVIl8UVQptr2cRwOXJStziqVE4GKwTDWDOWO-b7g1ZIVFWWQ4Ot7XpQVvUKEa-cHwxDtqaQzbPAaefDUKUF2S7plVXqfewVV1F7m5r7lT--E5EEAQUyExDPguVpEht4N~MLEBXxILAPbPnT19psT3L5NtLuKC4QJkNHcOGzkOKN3MLN2kouOJ6EOHEwQzHwCV7CgFJCBP83s3ILEweqTeBi9EbIbM86SjVPE2N7SRUaex93IUPd64rthoLFKDWgajnoxtzLuPXhgUGx2rAegETI~xncaRWTRP3RwhiNrAA__"
                alt="Commercial laundry service illustration"
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  zIndex: 2,
                  position: 'relative',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Background circle - responsive size (hidden on mobile) */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: { sm: '-50%', md: '-30%' },
          transform: 'translateY(-50%)',
          width: { sm: '800px', md: '1000px' },
          height: { sm: '800px', md: '1000px' },
          borderRadius: '50%',
          bgcolor: primaryColor,
          zIndex: 1,
          opacity: 0.3,
          display: { xs: 'none', sm: 'block' }, // Hide on mobile
        }}
      />

      {/* Decorative bubbles - hidden on mobile */}
      {[
        { top: '5%', right: '5%', size: { sm: 16, md: 18 } },
        { top: '8%', right: '8%', size: { sm: 20, md: 25 } },
        { top: '4%', right: '12%', size: { sm: 12, md: 15 } },
        { top: '45%', right: '25%', size: { sm: 25, md: 35 } },
        { top: '55%', right: '35%', size: { sm: 15, md: 20 } },
        { bottom: '25%', right: '23%', size: { sm: 22, md: 28 } },
        { bottom: '20%', right: '30%', size: { sm: 12, md: 15 }, filled: true, opacity: 0.3 },
        { bottom: '15%', right: '18%', size: { sm: 30, md: 40 } },
        { bottom: '12%', right: '15%', size: { sm: 10, md: 12 }, filled: true, opacity: 0.4 },
      ].map((bubble, idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: bubble.size,
            height: bubble.size,
            ...(bubble.top && { top: bubble.top }),
            ...(bubble.bottom && { bottom: bubble.bottom }),
            ...(bubble.right && { right: bubble.right }),
            backgroundColor: bubble.filled ? darkBlueColor : 'transparent',
            border: bubble.filled ? 'none' : '2px solid #1a3131',
            opacity: bubble.opacity || 0.5,
            zIndex: 3,
            display: { xs: 'none', sm: 'block' }, // Hide on mobile
          }}
        />
      ))}
    </Box>
  );
};

export default HeroSection;