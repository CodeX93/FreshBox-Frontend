import React from 'react';
import { Box, Container } from '@mui/material';
import ClientGetStartedSection from '../ClientSideInterations/ClientGetStartedSection';

// Defining static data at the server level
const steps = [
  {
    number: 1,
    text: "Sign up and create your account"
  },
  {
    number: 2,
    text: "Schedule your first pickup"
  },
  {
    number: 3,
    text: "Enjoy clean, fresh laundry delivered back to you"
  }
];

const GetStartedSection = () => {
  // Using a gradient background with the provided green colors
  const gradientBackground = 'linear-gradient(135deg, #2E7B5C 0%, #0a1929 100%)';
  
  return (
    <Box
      component="section"
      id="get-started-section"
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: gradientBackground,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        py: { xs: 6, md: 8 },
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url(/patterns/dots.svg) repeat',
          opacity: 0.05,
          zIndex: 1
        }
      }}
    >
      {/* Decorative Elements with theme colors */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '5%', md: '15%' },
          right: { xs: '5%', md: '10%' },
          width: { xs: 80, md: 120 },
          height: { xs: 80, md: 120 },
          borderRadius: '50%',
          background: 'rgba(133, 210, 179, 0.07)', // #85D2B3 with opacity
          boxShadow: 'inset 0 0 15px rgba(133, 210, 179, 0.1)',
          zIndex: 1
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '10%', md: '15%' },
          left: { xs: '5%', md: '12%' },
          width: { xs: 150, md: 200 },
          height: { xs: 150, md: 200 },
          borderRadius: '50%',
          background: 'rgba(181, 236, 217, 0.05)', // #B5ECD9 with opacity
          boxShadow: 'inset 0 0 20px rgba(181, 236, 217, 0.07)',
          zIndex: 1
        }}
      />
      
      <Container maxWidth="xl" sx={{ 
        px: { xs: 2, sm: 3, md: 4 },
        position: 'relative',
        zIndex: 2
      }}>
        {/* Pass the serializable data to the client component */}
        <ClientGetStartedSection steps={steps} />
      </Container>
    </Box>
  );
};

export default GetStartedSection;

