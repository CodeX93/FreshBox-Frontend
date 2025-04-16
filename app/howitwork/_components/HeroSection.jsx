'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme'; // Update path as needed

const HowItWorkHeroSection = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const colors = theme.palette.primary;
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          backgroundColor: colors.whitishMint,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          py: { xs: 5, md: 0 },
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ position: 'relative', zIndex: 2, px: { xs: 2, md: 4 } }}
        >
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={{ xs: 4, md: 2 }}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Left Section */}
            <Box 
              component={motion.div}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              sx={{ 
                width: { xs: '100%', md: '50%' },
                order: { xs: 2, md: 1 },
                textAlign: { xs: 'center', md: 'left' },
                px: { xs: 0, md: 3 }
              }}
            >
              <Box sx={{ maxWidth: 600, mx: { xs: 'auto', md: 0 } }}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    color: colors.darkBlue,
                    fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3rem' },
                    mb: 2,
                    mt: { xs: 2, sm: 3, md: 5 },
                    lineHeight: 1.2,
                  }}
                >
                  Laundry Made Simple
                </Typography>
                
                <Typography
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.2rem' },
                    color: colors.darkBlue,
                    mb: 4,
                    lineHeight: 1.5,
                  }}
                >
                  We pick up, clean, and deliver your laundry so you can focus on what matters most. 
                  {!isMobile && <br />}
                  Professional service with just a few clicks.
                </Typography>

                <Box sx={{ 
                  mb: 5,
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Button
                    disableElevation
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderRadius: 1,
                      py: { xs: 1.2, md: 1.5 },
                      px: { xs: 2.5, md: 3 },
                      fontWeight: 600,
                      backgroundColor: colors.main,
                      color: colors.darkBlue,
                      boxShadow: 'none',
                      textTransform: 'none',
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      '&:hover': {
                        backgroundColor: '#8edfbf',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    See How it works
                  </Button>
                </Box>

                {/* Stats section */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 3, sm: 5, md: 6 },
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' },
                        color: colors.darkBlue,
                        lineHeight: 1.1,
                      }}
                    >
                      18m+
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.darkBlue,
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        lineHeight: 1.2,
                        fontWeight: 500,
                      }}
                    >
                      Happy<br />Customers
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' },
                        color: colors.darkBlue,
                        lineHeight: 1.1,
                      }}
                    >
                      10+
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.darkBlue,
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        lineHeight: 1.2,
                        fontWeight: 500,
                      }}
                    >
                      Years of<br />Experience
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Right Section - Hidden on Mobile */}
            <Box 
              sx={{ 
                width: { xs: '90%', md: '50%' },
                order: { xs: 1, md: 2 },
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                py: { xs: 2, md: 0 }
              }}
            >
              <Box
                component={motion.div}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Box
                  component="img"
                  src="https://s3-alpha-sig.figma.com/img/c6ca/a559/7a018b89222ec1abfd41a1f975af9a51?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oVmBem5E1~rWmWFQ9kraQ6T0E~QXDPMbNF~y6CV5KjfzpHQa9dgSzc0P67x-HmgDM4j~n0f5fHsESBKjYuWS2Jmnuqu69oh1sKqscYp97FgA3r3wXRVlKI4YBlpuP4y9C-KDixhHMvFBUVtelS8e-Nj1siptD1UoxvbxN12ZvMQj4R8gfjpxQuazdgdHv5ldswlE0CUVHuWZlWh6BBGuz1LWsYfh8Rp3wHWmEx8gvN1bPbbl4HCRZ911l~rap4-NGW~PHhCY0rSyAH4htAbFyKYOywEFthW~JOQPu5RzDrBxLuszkONKUDpHHneNFHYaOuUY1XWf-g8RRT~ArHQERw__"
                  alt="Washing Machine"
                  sx={{
                    width: '90%',
                    maxWidth: { md: '90%', lg: '100%' },
                    display: 'block',
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Container>

        {/* Green Circle - Hidden on Mobile */}
        <Box
          sx={{
            position: 'absolute',
            width: { xs: '100%', md: 800, lg: 1000 },
            height: { xs: '100%', md: 800, lg: 1000 },
            borderRadius: { xs: 0, md: '50%' },
            backgroundColor: colors.main,
            top: { xs: 0, md: '50%' },
            right: { xs: 0, md: '-200px', lg: '-250px', xl: '-300px' },
            transform: { xs: 'none', md: 'translateY(-50%)' },
            zIndex: 1,
            display: { xs: 'none', md: 'block' }
          }}
        />

        {/* Decorative Circles - Hidden on Mobile */}
        {[
          { top: '15%', right: '15%', size: 20, filled: false, opacity: 0.5 },
          { top: '10%', right: '25%', size: 15, filled: false, opacity: 0.5 },
          { top: '20%', right: '35%', size: 10, filled: false, opacity: 0.5 },
          { top: '35%', right: '8%', size: 18, filled: false, opacity: 0.5 },
          { top: '45%', right: '30%', size: 12, filled: false, opacity: 0.5 },
          { top: '60%', right: '20%', size: 25, filled: false, opacity: 0.5 },
          { top: '75%', right: '25%', size: 15, filled: false, opacity: 0.5 },
          { top: '80%', right: '10%', size: 18, filled: false, opacity: 0.5 },
          { top: '20%', right: '20%', size: 8, filled: true, opacity: 0.5 },
          { top: '40%', right: '15%', size: 6, filled: true, opacity: 0.5 },
          { top: '55%', right: '28%', size: 10, filled: true, opacity: 0.5 },
          { top: '70%', right: '18%', size: 7, filled: true, opacity: 0.5 },
        ].map((bubble, idx) => (
          <Box
            key={idx}
            component={motion.div}
            animate={{
              y: [0, -5, 0],
              transition: { 
                repeat: Infinity, 
                duration: 2 + Math.random() * 2, 
                ease: "easeInOut",
                delay: Math.random() * 1
              }
            }}
            sx={{
              position: 'absolute',
              borderRadius: '50%',
              width: bubble.size,
              height: bubble.size,
              top: bubble.top,
              right: bubble.right,
              backgroundColor: bubble.filled ? colors.darkBlue : 'transparent',
              border: bubble.filled ? 'none' : `1.5px solid ${colors.darkBlue}`,
              opacity: bubble.opacity || 0.5,
              zIndex: 3,
              display: { xs: 'none', md: 'block' }
            }}
          />
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default HowItWorkHeroSection;