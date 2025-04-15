'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {theme} from "../../../contexts/Theme"

const HeroSection = () => {
  const priamryColor = theme.palette.primary.main;
  const darkBlueColor = theme.palette.primary.darkBlue;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.primary.whitishMint,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          {/* Left section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 6 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: darkBlueColor,
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  mb: 2,
                  whiteSpace: 'nowrap',
                  lineHeight: 1.2,
                }}
              >
                Commercial Laundry Solutions
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  color: darkBlueColor,
                  mb: 4,
                  maxWidth: '600px',
                }}
              >
                FreshBox provides comprehensive commercial laundry solutions with eco-friendly processes and flexible scheduling designed to adapt to your unique business needs.
              </Typography>

              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mb: 4 
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: priamryColor,
                    color: darkBlueColor,
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: '#8cdec0',
                    },
                    textTransform: 'none',
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
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: '#00494f',
                    },
                    textTransform: 'none',
                  }}
                >
                  Learn More
                </Button>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'nowrap', 
                gap: 4,
                alignItems: 'center',
                overflow: 'auto',
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
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: darkBlueColor,
                        mr: 1.5,
                      }}
                    />
                    <Typography 
                      sx={{ 
                        color: darkBlueColor,
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right section with image */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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

      {/* Background circle */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '-30%',
          transform: 'translateY(-50%)',
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          bgcolor: priamryColor,
          zIndex: 1,
          opacity: 0.3,
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Decorative bubbles */}
      {[
        { top: '5%', right: '5%', size: 18 },
        { top: '8%', right: '8%', size: 25 },
        { top: '4%', right: '12%', size: 15 },
        { top: '45%', right: '25%', size: 35 },
        { top: '55%', right: '35%', size: 20 },
        { bottom: '25%', right: '23%', size: 28 },
        { bottom: '20%', right: '30%', size: 15, filled: true, opacity: 0.3 },
        { bottom: '15%', right: '18%', size: 40 },
        { bottom: '12%', right: '15%', size: 12, filled: true, opacity: 0.4 },
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
            display: { xs: 'none', md: 'block' },
          }}
        />
      ))}
    </Box>
  );
};

export default HeroSection;