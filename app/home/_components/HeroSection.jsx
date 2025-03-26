'use client';

import { 
  Box,
  Typography,
  Button,
  Container,
  ThemeProvider
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { theme } from '../../../contexts/Theme'; // Import your theme context
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/howitwork');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          color: 'white',
        }}
      >
        {/* Background Video */}
        <Box
  component="iframe"
  src="https://www.youtube.com/embed/F-AiKOv2b_A?autoplay=1&mute=1&loop=1&playlist=F-AiKOv2b_A&controls=0&showinfo=0&modestbranding=1"
  allow="autoplay"
  frameBorder="0"
  allowFullScreen
  sx={{
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  }}
/>


        {/* Fallback Background Image */}
        <Box
          component="img"
          src="/placeholder-laundry-bg.jpg" // Replace with your actual image
          alt="Background"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            display: { xs: 'block', md: 'none' }, // Show only on mobile
          }}
        />

        {/* Overlay */}
        <Box sx={{ 
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1
        }} />

        {/* Foreground Content */}
        <Container
          maxWidth="md"
          sx={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: { xs: 2, sm: 3, md: 4 }, // Better padding on small screens
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            <Typography 
              variant="h1" // Using h1 from your theme
              component="h1" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }, // Slightly smaller for better proportions
                lineHeight: 1.2,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Laundry & Dry Cleaning Delivered
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.9, 
                mb: 6,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              }}
            >
              Professional cleaning services at your doorstep
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{
                py: { xs: 1.5, md: 2 },
                px: { xs: 4, md: 6 },
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                '&:hover': {
                  backgroundColor: theme.palette.primary.mainHover,
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
              endIcon={<ChevronRightIcon sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }} />}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}