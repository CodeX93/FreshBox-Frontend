'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  ThemeProvider,
  Container,
  Button,
  useMediaQuery
} from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { theme } from '../../../contexts/Theme';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ProcessStep = ({ process, isEven }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const contentFade = {
    hidden: { opacity: 0, x: isEven ? 30 : -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
    }
  };

  const imageFade = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, delay: 0.1, ease: "easeOut" }
    }
  };

  // Use the secondary image as fallback if primary fails or isn't available
  const imageSrc = hasImageError && process.secondaryImagePath 
    ? process.secondaryImagePath 
    : process.imagePath;
    
  const imageAlt = hasImageError && process.secondaryImageAlt
    ? process.secondaryImageAlt
    : process.imageAlt;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: isEven ? 'row-reverse' : 'row' },
          mb: { xs: 10, md: 16 },
          alignItems: 'center',
          position: 'relative',
          gap: { xs: 2, md: 6 }
        }}
      >
        {/* Number Indicator */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            top: { xs: 0, md: '50%' },
            left: { xs: 0, md: isEven ? 'auto' : '0' },
            right: { xs: 'auto', md: isEven ? '0' : 'auto' },
            transform: { xs: 'none', md: 'translateY(-50%)' },
            width: { xs: 60, md: 70 },
            height: { xs: 60, md: 70 },
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.dark,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            zIndex: 10,
            mb: { xs: 3, md: 0 },
            mx: { xs: 'auto', md: 0 },
            mt: { xs: 0, md: 0 },
            boxShadow: '0 8px 24px rgba(133, 210, 179, 0.5)',
            ml: { xs: 0, md: isEven ? 0 : -35 },
            mr: { xs: 0, md: isEven ? -35 : 0 },
            border: '4px solid #FFFFFF',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: { xs: 'none', md: isEven ? 'translateY(-50%) scale(1.05)' : 'translateY(-50%) scale(1.05)' },
              boxShadow: '0 10px 28px rgba(133, 210, 179, 0.6)',
            }
          }}
        >
          {process.number}
        </Box>

        {/* Text Content */}
        <motion.div variants={contentFade} style={{ flex: 1 }}>
          <Box 
            sx={{ 
              flex: 1, 
              px: { xs: 3, md: 5 },
              order: { xs: 2, md: isEven ? 2 : 1 },
              textAlign: { xs: 'center', md: isEven ? 'right' : 'left' },
              pb: { xs: 4, md: 0 },
              position: 'relative',
              zIndex: 2,
              py: { xs: 4, md: 6 },
              // Add a card-like background for text content
              backgroundColor: isMobile ? theme.palette.primary.darkBlue : 'transparent',
              borderRadius: 4,
              ...(isMobile ? {
                borderRadius: 4,
                boxShadow: '0 12px 30px rgba(10, 25, 41, 0.1)',
              } : {}),
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: { xs: 0, md: isEven ? 'auto' : -20 },
                right: { xs: 0, md: isEven ? -20 : 'auto' },
                width: { xs: '100%', md: '105%' },
                background: !isMobile ? 'linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(10, 25, 41, 0.85) 100%)' : 'transparent',
                backdropFilter: 'blur(8px)',
                borderRadius: 4,
                zIndex: -1,
                ml: { xs: 0, md: isEven ? 'auto' : 0 },
                mr: { xs: 0, md: isEven ? 0 : 'auto' },
                boxShadow: !isMobile ? '0 16px 40px rgba(10, 25, 41, 0.2)' : 'none',
              }
            }}
          >
            <Typography 
              variant="h4" 
              component="h3" 
              sx={{ 
                fontWeight: 700, 
                color: '#FFFFFF',
                mb: 2.5,
                fontSize: { xs: '1.75rem', md: '2.2rem' },
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: { xs: '50%', md: isEven ? 'auto' : 0 },
                  right: { xs: 'auto', md: isEven ? 0 : 'auto' },
                  transform: { xs: 'translateX(-50%)', md: isEven ? 'none' : 'none' },
                  width: '60px',
                  height: '3px',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '2px'
                }
              }}
            >
              {process.title}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.95)',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
                maxWidth: { xs: '100%', md: '95%' },
                mx: { xs: 'auto', md: isEven ? '0 0 0 auto' : '0 auto 0 0' },
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
                mt: 3
              }}
            >
              {process.description}
            </Typography>
            <Button 
              variant="contained" 
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                mt: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.dark,
                fontWeight: 600,
                px: 3.5,
                py: 1.2,
                borderRadius: 10,
                fontSize: '0.95rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: theme.palette.primary.mainHover,
                  boxShadow: '0 10px 20px rgba(133, 210, 179, 0.25)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {process.buttonText}
            </Button>
          </Box>
        </motion.div>
        
        {/* Image Section - Improved for better responsiveness */}
        <motion.div 
          variants={imageFade} 
          style={{ 
            flex: isMobile ? '1 1 100%' : 1,
            order: { xs: 1, md: isEven ? 1 : 2 },
            width: '100%'
          }}
        >
          <Box 
            sx={{ 
              position: 'relative',
              // More responsive height to maintain proper aspect ratio across all screens
              height: { xs: 250, sm: 320, md: 380, lg: 450 },
              width: '100%',
              overflow: 'hidden',
              borderRadius: { 
                xs: '20px', 
                md: isEven ? '100px 16px 100px 100px' : '16px 100px 100px 100px' 
              },
              mb: { xs: 4, md: 0 },
              boxShadow: '0 16px 40px rgba(10, 25, 41, 0.15)',
              transition: 'all 0.5s ease',
              transform: 'perspective(1000px) rotateY(0deg)',
              '&:hover': {
                transform: isEven ? 'perspective(1000px) rotateY(-2deg)' : 'perspective(1000px) rotateY(2deg)',
                boxShadow: '0 20px 50px rgba(10, 25, 41, 0.2)',
              },
              // Loading state styling
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(10, 25, 41, 0.2)',
                zIndex: imageLoaded ? -1 : 1,
                transition: 'opacity 0.3s ease',
                opacity: imageLoaded ? 0 : 1,
              }
            }}
          >
            {/* Loading indicator */}
            {!imageLoaded && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '3px solid rgba(133, 210, 179, 0.3)',
                  borderTopColor: theme.palette.primary.main,
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
                  }
                }}
              />
            )}
            
            {/* Improved responsive Image component */}
            <Image 
              src={imageSrc}
              alt={imageAlt || `Step ${process.number}`}
              fill
              priority={process.number <= 2} // Load first two images with priority
              quality={85}
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
              style={{ 
                objectFit: 'cover',
                borderRadius: 'inherit'
              }}
              onLoadingComplete={() => setImageLoaded(true)}
              onError={() => {
                setHasImageError(true);
                // If even secondary image fails, we still want to remove loading indicator
                if (!process.secondaryImagePath) {
                  setImageLoaded(true);
                }
              }}
            />
            
            {/* Overlay with theme colors */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(133, 210, 179, 0.4) 0%, rgba(46, 123, 92, 0.7) 100%)',
                zIndex: 1,
                mixBlendMode: 'multiply',
                transition: 'all 0.3s ease',
                opacity: imageLoaded ? 1 : 0,
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(133, 210, 179, 0.3) 0%, rgba(46, 123, 92, 0.6) 100%)',
                }
              }}
            />
            
            {/* Decorative accent */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 15,
                right: isEven ? 'auto' : 15,
                left: isEven ? 15 : 'auto',
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: theme.palette.primary.main,
                opacity: 0.7,
                zIndex: 2,
                display: { xs: 'none', md: 'block' }
              }}
            />
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

// Modified to improve how we handle secondary images
const ClientProcessSection = ({ processes }) => {
  // Add process numbers if they don't exist
  const processesWithNumbers = processes.map((process, index) => 
    process.number ? process : { ...process, number: index + 1 }
  );

  return (
    <ThemeProvider theme={theme}>
      <Container 
        maxWidth="lg"
        sx={{
          // Ensure container is responsive on all screen sizes
          px: { xs: 2, sm: 3, md: 4 },
          overflowX: 'hidden' // Prevent horizontal scrolling on small screens
        }}
      >
        <Box sx={{ pt: 4 }}>
          {processesWithNumbers.map((process, index) => (
            <ProcessStep 
              key={process.number}
              process={process}
              isEven={index % 2 !== 0}
            />
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ClientProcessSection;