'use client';

import React from 'react';
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
        
        {/* Image Section */}
        <motion.div variants={imageFade} style={{ 
          flex: isMobile ? '1 1 100%' : 1,
          order: { xs: 1, md: isEven ? 1 : 2 },
        }}>
          <Box 
            sx={{ 
              position: 'relative',
              height: { xs: 280, sm: 320, md: 400 },
              width: { xs: '100%', md: '100%' },
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
              }
            }}
          >
            <Image 
              src={process.imagePath}
              alt={process.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ 
                objectFit: 'cover',
                borderRadius: 'inherit'
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

const ClientProcessSection = ({ processes }) => {
  // Add process numbers if they don't exist
  const processesWithNumbers = processes.map((process, index) => 
    process.number ? process : { ...process, number: index + 1 }
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
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