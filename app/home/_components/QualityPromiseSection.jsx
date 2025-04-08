'use client';

import React from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import TestimonialSection from '../ClientSideInterations/ClientQualityPromiseSection';

// This is the main page component that takes full screen with enhanced visual elements
export default function TestimonialPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh', // Set to full viewport height
        position: 'relative',
        bgcolor: '#f9fbfa', // Very light mint tint instead of pure white
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center', // Center content vertically
        justifyContent: 'center', // Center content horizontally
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: { xs: '200px', md: '300px', lg: '400px' },
          height: { xs: '200px', md: '300px', lg: '400px' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(189, 244, 227, 0.4) 0%, rgba(189, 244, 227, 0) 70%)',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '-8%',
          left: '-5%',
          width: { xs: '180px', md: '250px', lg: '350px' },
          height: { xs: '180px', md: '250px', lg: '350px' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(189, 244, 227, 0.3) 0%, rgba(189, 244, 227, 0) 70%)',
          zIndex: 0,
        }}
      />
      
      {/* Subtle pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23075E54' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0,
        }}
      />
      
      {/* Camera/photo button shown in screenshot */}
      <Box
        sx={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          width: { xs: '45px', md: '50px' },
          height: { xs: '45px', md: '50px' },
          borderRadius: '50%',
          backgroundColor: '#2E7B5C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
          },
        }}
      >
        <Box
          component="span"
          sx={{
            color: 'white',
            fontSize: { xs: '20px', md: '24px' },
            fontWeight: 'bold',
          }}
        >
          ⬤
        </Box>
      </Box>
      
      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
          maxWidth: 'none', // Remove max width constraint
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible', // Allow buttons to extend beyond container
        }}
      >
        <TestimonialSection />
      </Container>
      
      {/* Bottom decorative bar */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, #2E7B5C 0%, #85D2B3 50%, #2E7B5C 100%)',
          zIndex: 10,
        }}
      />
    </Box>
  );
}