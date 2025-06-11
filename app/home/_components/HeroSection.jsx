'use client';

import { 
  Box,
  Typography,
  Container,
  ThemeProvider,
  InputBase,
  IconButton,
  Paper,
  TextField,InputAdornment
} from '@mui/material';
import {Search,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { theme } from '../../../contexts/Theme'; // Import your theme context
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import OrderSearchModal from './OrderSearchModal'; // Adjust the import path as necessary
import Image from 'next/image';

export default function HeroSection() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [address, setAddress] = useState('');
  const [searchValue, setSearchValue] = useState('');
const [modalOpen, setModalOpen] = useState(false);

const handleOpenModal = () => {
  if (searchValue.trim()) setModalOpen(true);
};

const handleCloseModal = () => setModalOpen(false);


  const handleGetStarted = () => {
    if (address.trim()) {
      router.push(`/howitwork?address=${encodeURIComponent(address)}`);
    } else {
      router.push('/howitwork');
    }
  };

  useEffect(() => {
    // Ensure video resizing and positioning is handled on window resize
    const handleResize = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        video.style.width = '100vw';
        video.style.height = '120vh';
        video.style.objectFit = 'cover';
      }
    };

    handleResize(); // Initial sizing
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          width: '100vw', // Use viewport width
          height: '120vh', // Use viewport height
          overflow: 'hidden',
          color: 'white',
          margin: 0,
          padding: 0
        }}
      >
        {/* Background Video */}
        <Box
          component="video"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source 
            src="https://videos.pexels.com/video-files/4109356/4109356-sd_960_506_25fps.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </Box>

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

        {/* Overlay - Enhanced with gradient */}
        <Box sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1
        }} />

        {/* Foreground Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center horizontally
            justifyContent: 'center', // Center vertically
            px: { xs: 2, sm: 3, md: 4 }, 
            textAlign: 'center' // Center all text
          }}
        >
          <Box 
            sx={{ 
              maxWidth: {xs: '100%', sm: '600px', md: '700px'},
              animation: 'fadeIn 1s ease-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontWeight: 800, 
                mb: 1,
                mt:2,
                fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4.2rem' },
                lineHeight: 1.1,
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4)',
                letterSpacing: '-0.5px'
              }}
            >
              The Smartest Way to Do Laundry
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.95, 
                mb: 2,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 400,
                textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
                maxWidth: '80%',
                mx: 'auto'
              }}
            >
              We pick up, clean, and deliver your laundry and dry cleaning.
            </Typography>
            
            {/* Pill-shaped widget - With white background */}
            <Paper
              elevation={8}
              sx={{
                display: 'flex',
                borderRadius: 24,
                overflow: 'hidden', 
                width: '100%',
                maxWidth: { xs: '90%', sm: '420px' },
                mb: 2,
                mx: 'auto', // Center horizontally
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                },
                height: { xs: '52px', sm: '56px' }, // Explicit height for better control
                bgcolor: '#94FFD4', // White background for the entire pill
              }}
            >
              <Box
                sx={{
                  p: 1.5, // Reduced padding
                  pl: 2.5, // Reduced left padding
                  width: '35%',
                  borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: '#94FFD4', // White background for the left side
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: '15%',
                    height: '70%',
                    width: 1,
                    bgcolor: 'rgba(0, 0, 0, 0.0)',
                  }
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'black', 
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.95rem' }, // Smaller font
                    lineHeight: 1.2
                  }}
                >
                  Pickup
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: { xs: '0.7rem', sm: '0.8rem' }, // Smaller font
                    lineHeight: 1.2
                  }}
                >
                  Tonight
                </Typography>
              </Box>
              
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#94FFD4', // White background for the right side
                  height: '100%'
                }}
              >
                <InputBase
  placeholder={`Where\n(Add address)`}
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  sx={{
    ml: 2,
    flex: 1,
    color: 'text.primary',
    fontSize: { xs: '0.85rem', sm: '0.9rem' },
    '& input::placeholder': {
      color: 'text.secondary',
      opacity: 0.7,
      whiteSpace: 'pre-line', // Enables line breaks in placeholder
    },
    height: '100%',
  }}
/>

                <IconButton 
                  sx={{ 
                    bgcolor: '#135D66',
                    color: '#E3FEF7',
                    borderRadius: '50%',
                    '&:hover': {
                      bgcolor: theme.palette.primary.mainHover,
                      transform: 'scale(1.05)'
                    },
                    width: { xs: 38, sm: 42 }, // Smaller button
                    height: { xs: 38, sm: 42 }, // Smaller button
                    mr: 0.5,
                    transition: 'all 0.2s ease',
                  }}
                  onClick={handleGetStarted}
                >
                  <ArrowForwardIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
                </IconButton>
              </Box>
            </Paper>

            {/* App badges and ratings - Enhanced design */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
                mb: 3
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  p: 1,
                  borderRadius: 2,
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    bgcolor: 'white',
                    mr: 1
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                  </svg>
                </Box>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  p: 1,
                  borderRadius: 2,
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    bgcolor: 'white',
                    mr: 1
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </Box>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  p: 1,
                  borderRadius: 2,
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    bgcolor: 'white',
                    mr: 1
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(4)].map((_, i) => (
                      <Box key={i} component="span" sx={{ color: '#FFD700', fontSize: '0.9rem' }}>★</Box>
                    ))}
                    <Box component="span" sx={{ color: '#FFD700', fontSize: '0.9rem' }}>½</Box>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'white', opacity: 0.9 }}>
                    5,000+ reviews
                  </Typography>
                </Box>
              </Box>
            </Box>
                <Box
            sx={{
            
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: 3,
              mt: 1,
              width: '100%',
              animation: 'fadeUp 1.2s ease-out',
              '@keyframes fadeUp': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
           {/* Order ID Search - Pill Shape */}
<Paper
  elevation={8}
  sx={{
    display: 'flex',
    alignItems: 'center', // <-- this centers children vertically
    borderRadius: 24,
    overflow: 'hidden',
    width: '100%',
    maxWidth: { xs: '90%', sm: '420px' },
    mx: 'auto',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderColor: theme.palette.primary.main,
    mb: 3,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
    },
    height: { xs: '52px', sm: '56px' },
    bgcolor: 'rgba(255, 255, 255, 0.15)',
  }}
>

  <InputBase
    placeholder="Search Order ID"
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    sx={{
      px: 2.5,
      flex: 1,
      color: theme.palette.primary.main,
      fontSize: { xs: '0.85rem', sm: '0.95rem' },
      borderColor:theme.palette.primary.main,
      height: '100%',
      '& input::placeholder': {
        color: 'text.secondary',
        borderColor:theme.palette.primary.main,
        opacity: 0.7,
      },
    }}
  />
  <IconButton
    sx={{
      bgcolor: theme.palette.primary.main,
      color: theme.palette.primary.DarkBlue,
      borderRadius: '50%',
      borderColor:theme.palette.primary.main,
      '&:hover': {
        bgcolor: 'transparent',
        transform: 'scale(1.05)',
        borderColor:theme.palette.primary.main,
      },
      width: { xs: 38, sm: 42 },
      height: { xs: 38, sm: 42 },
      mr: 0.5,
      transition: 'all 0.2s ease',
    }}
    onClick={handleOpenModal}
  >
    <Search sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
  </IconButton>
</Paper>


          </Box>
          </Box>
            
      
        </Container>
    <OrderSearchModal
  open={modalOpen}
  onClose={handleCloseModal}
  onOrderSelect={() => setModalOpen(false)}
  defaultSearch={searchValue}
/>

      </Box>
    </ThemeProvider>
    
  );
}