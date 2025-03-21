'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';

// Wrapper component that adds animations to sections
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

  // Determine text color based on background
  const getTextColor = () => {
    // Dark backgrounds that need white text
    const darkBackgrounds = ['#28ddcd', '#0D3B6E', '#1976d2', '#115293'];
    
    // Check if backgroundColor is one of the dark ones
    if (darkBackgrounds.includes(backgroundColor)) {
      return 'white';
    }
    
    // For transparent or light backgrounds, use default text color
    return 'inherit';
  };

  return (
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
        backgroundColor: backgroundColor,
        color: getTextColor(), // Dynamically set text color based on background
        overflow: 'hidden',
        py: 8,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AnimatedSection;