'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  alpha,
  ThemeProvider
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme'; // Import your theme context

// Animation keyframes
const fadeInUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const ripple = keyframes`
  0% { 
    transform: scale(1); 
    opacity: 0.8; 
  }
  100% { 
    transform: scale(1.5); 
    opacity: 0; 
  }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled components
const AnimatedBox = styled(Box)(({ delay = 0 }) => ({
  opacity: 0,
  animation: `${fadeInUp} 0.8s ease-out ${delay}s forwards`
}));

const FloatingContainer = styled(Container)({
  animation: `${float} 6s ease-in-out infinite`,
  position: 'relative'
});

const GradientBackground = styled(Box)(() => ({
  width: '100%',
  // Using your turquoise colors for the gradient
  backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.common.white, 0.1)} 0%, ${alpha(theme.palette.common.white, 0)} 60%)`,
  }
}));

const AnimatedTextField = styled(TextField)(() => ({
  flexGrow: 1,
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.common.white,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: `0 6px 14px ${alpha(theme.palette.common.black, 0.2)}`,
    }
  }
}));

const PulseButton = styled(Button)(() => ({
  position: 'relative',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  // Using your secondary yellow color for the button
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-3px)',
    boxShadow: `0 6px 20px ${alpha(theme.palette.common.black, 0.25)}`,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: alpha(theme.palette.common.white, 0.3),
      transform: 'translate(-50%, -50%)',
      animation: `${ripple} 1s ease-out infinite`
    }
  },
  '&:active': {
    transform: 'translateY(-1px)',
    boxShadow: `0 2px 10px ${alpha(theme.palette.common.black, 0.2)}`,
  }
}));

const ShiningText = styled(Typography)(() => ({
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-150%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(to right, rgba(255,255,255,0) 0%, ${alpha(theme.palette.common.white, 0.4)} 50%, rgba(255,255,255,0) 100%)`,
    transform: 'skewX(-30deg)',
    animation: 'shine 4s infinite',
  },
  '@keyframes shine': {
    '0%, 100%': {
      left: '-150%',
    },
    '50%': {
      left: '150%',
    },
  },
}));

const BackgroundCircle = styled(Box, {
  shouldForwardProp: (prop) => !['positionX', 'positionY', 'size', 'delay'].includes(prop),
})(({ size, positionX, positionY, delay }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  top: positionY,
  left: positionX,
  opacity: 0,
  animation: `${fadeInUp} 1s ease-out ${delay}s forwards, ${float} 5s ease-in-out ${delay + 1}s infinite`
}));

export default function CTASection({ zipCode, setZipCode }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GradientBackground sx={{ width: '100%', py: 8, color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {/* Background decorative elements */}
        <BackgroundCircle size="200px" positionX="5%" positionY="15%" delay={0.3} />
        <BackgroundCircle size="150px" positionX="80%" positionY="60%" delay={0.5} />
        <BackgroundCircle size="100px" positionX="20%" positionY="70%" delay={0.7} />
        <BackgroundCircle size="250px" positionX="70%" positionY="10%" delay={0.9} />
        
        <FloatingContainer maxWidth="lg" sx={{ textAlign: 'center', zIndex: 1 }}>
          <AnimatedBox delay={0.2}>
            <ShiningText 
              variant="h2" // Using h2 from your theme
              component="h2" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                // Using theme typography instead of hardcoded fontWeight
              }}
            >
              Ready for fresh, clean clothes?
            </ShiningText>
          </AnimatedBox>
          
          <AnimatedBox delay={0.4}>
            <Typography variant="h6" sx={{ 
              opacity: 0.9, 
              mb: 4, 
              maxWidth: '650px', 
              mx: 'auto',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              Join thousands of happy customers who have simplified their laundry routine.
            </Typography>
          </AnimatedBox>
          
          <AnimatedBox 
            delay={0.6}
            sx={{
              position: 'relative',
              '&::after': isInputFocused ? {
                content: '""',
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                right: '-15px',
                bottom: '-15px',
                borderRadius: '12px',
                border: '2px solid rgba(255,255,255,0.2)',
                animation: `${glow} 2s infinite`
              } : {}
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                maxWidth: '500px',
                mx: 'auto',
                justifyContent: 'center',
                borderRadius: 1,
                padding: { xs: 1, sm: 2 },
                background: alpha(theme.palette.common.white, 0.1),
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`
              }}
            >
              <AnimatedTextField
                placeholder="Enter ZIP Code"
                variant="outlined"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/[^\d]/g, '').slice(0, 5))} // Only allow digits and limit to 5
                inputProps={{ maxLength: 5 }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                sx={{
                  // Custom focus styles to match your brand
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main, // Using your turquoise color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: theme.palette.primary.main, // Using your turquoise color
                  }
                }}
              />
              <PulseButton
                variant="contained"
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                Get Started
              </PulseButton>
            </Box>
          </AnimatedBox>
        </FloatingContainer>
      </GradientBackground>
    </ThemeProvider>
  );
}