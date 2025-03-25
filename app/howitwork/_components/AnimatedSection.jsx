'use client';
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme'; // Update this path

// Wrapper component that adds animations to sections with theme context
const AnimatedSection = ({
  children,
  backgroundColor = 'transparent',
  animationDirection = 'up', // 'up', 'down', 'left', 'right'
  delay = 0.2,
  duration = 0.6,
  id,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  // Set up the animation variants based on direction
  const getAnimationVariants = () => {
    const distance = 100;
    const variants = {
      hidden: {},
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    };
    
    switch (animationDirection) {
      case 'up':
        variants.hidden = { opacity: 0, y: distance };
        break;
      case 'down':
        variants.hidden = { opacity: 0, y: -distance };
        break;
      case 'left':
        variants.hidden = { opacity: 0, x: distance };
        break;
      case 'right':
        variants.hidden = { opacity: 0, x: -distance };
        break;
      default:
        variants.hidden = { opacity: 0, y: distance };
    }
    return variants;
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);
  
  // Determine text color based on background using theme colors
  const getTextColor = () => {
    // Dark backgrounds that need white text
    const darkBackgrounds = [
      theme.palette.primary.main, // '#28ddcd'
      theme.palette.primary.dark, // '#0D3B6E'
      theme.palette.secondary.dark, // If you add this later
      '#1976d2',
      '#115293'
    ];
    
    // Check if backgroundColor is one of the dark ones or matches a theme color
    if (darkBackgrounds.includes(backgroundColor) || 
        backgroundColor === theme.palette.primary.main || 
        backgroundColor === theme.palette.primary.dark) {
      return 'white';
    }
    
    // For transparent or light backgrounds, use default text color
    return 'inherit';
  };
  
  // Check if backgroundColor is a theme color key and convert it
  const resolveBackgroundColor = () => {
    if (backgroundColor === 'primary.main') return theme.palette.primary.main;
    if (backgroundColor === 'primary.light') return theme.palette.primary.light;
    if (backgroundColor === 'primary.dark') return theme.palette.primary.dark;
    if (backgroundColor === 'secondary.main') return theme.palette.secondary.main;
    return backgroundColor;
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Box
        id={id}
        component={motion.div}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={getAnimationVariants()}
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: resolveBackgroundColor(),
          color: getTextColor(),
          overflow: 'hidden',
          py: 8,
          ...props.sx
        }}
        {...props}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default AnimatedSection;