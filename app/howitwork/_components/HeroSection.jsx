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

const HeroSection = ({ fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
} }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '100vh', sm: 'auto', md: '100vh' },
          minHeight: { xs: '100vh', sm: 600, md: 700 },
          maxHeight: { xs: 'none', md: 900 },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: theme.palette.primary.whitishMint,
          pt: { xs: 0, sm: 8, md: 0 },
          pb: { xs: 4, sm: 10, md: 0 },
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ 
            position: 'relative', 
            zIndex: 2,
            height: { xs: '100%', sm: 'auto' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}
        >
          <Stack 
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, sm: 4, md: 6 }} 
            alignItems="center"
            sx={{ 
              height: { xs: '100%', sm: 'auto' },
              my: { xs: 'auto', sm: 0 }
            }}
          >
            {/* Left side content */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '50%' },
                order: { xs: 2, md: 1 }
              }}
            >
              <Box
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                sx={{ 
                  px: { xs: 2, sm: 2, md: 0 },
                  mt: { xs: 0, md: 0 },
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'inline-block',
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 50,
                    py: 1,
                    px: 2,
                    mb: 3,
                    mt: { xs: 3, sm: 0 }
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      fontWeight: 600,
                      color: theme.palette.primary.darkBlue,
                    }}
                  >
                    20% Discount for 1 Month Subscription
                  </Typography>
                </Box>
                
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3rem' },
                    color: theme.palette.primary.darkBlue,
                    lineHeight: 1.2,
                    mb: 2,
                  }}
                >
                  Laundry Made Simple
                </Typography>
                
                <Typography
                  sx={{
                    color: theme.palette.primary.darkBlue,
                    mb: 4,
                    maxWidth: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: 1.5
                  }}
                >
                  We pick up, clean, and deliver your laundry so you can focus on what matters most. Professional service with just a few clicks.
                </Typography>

                <Box sx={{ mb: 5 }}>
                  <Button
                  disableElevation
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderRadius: 1,
                      py: { xs: 1.2, md: 1.5 },
                      px: { xs: 2.5, md: 3 },
                      fontWeight: 600,
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.darkBlue,
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
                <Box sx={{ display: 'flex', gap: { xs: 3, sm: 5, md: 6 } }}>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' },
                        color: theme.palette.primary.darkBlue,
                        lineHeight: 1.1,
                      }}
                    >
                      18m+
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.primary.darkBlue,
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
                        color: theme.palette.primary.darkBlue,
                        lineHeight: 1.1,
                      }}
                    >
                      10+
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.primary.darkBlue,
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

            {/* Right side - empty for absolute positioning */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '50%' },
                order: { xs: 1, md: 2 },
                display: { xs: 'none', md: 'block' }
              }}
            />
          </Stack>
        </Container>

        {/* Green circle background - hidden on mobile, visible on larger screens */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: { 
              sm: '-30%', 
              md: '-25%', 
              lg: '-20%' 
            },
            transform: 'translateY(-50%)',
            width: { 
              sm: '650px', 
              md: '800px', 
              lg: '900px' 
            },
            height: { 
              sm: '650px', 
              md: '800px', 
              lg: '900px' 
            },
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            zIndex: 1,
            display: { xs: 'none', sm: 'block' }
          }}
        />

        {/* Washing machine image - hidden on mobile, visible on larger screens */}
        <Box
          component="img"
          src="https://s3-alpha-sig.figma.com/img/c6ca/a559/7a018b89222ec1abfd41a1f975af9a51?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oVmBem5E1~rWmWFQ9kraQ6T0E~QXDPMbNF~y6CV5KjfzpHQa9dgSzc0P67x-HmgDM4j~n0f5fHsESBKjYuWS2Jmnuqu69oh1sKqscYp97FgA3r3wXRVlKI4YBlpuP4y9C-KDixhHMvFBUVtelS8e-Nj1siptD1UoxvbxN12ZvMQj4R8gfjpxQuazdgdHv5ldswlE0CUVHuWZlWh6BBGuz1LWsYfh8Rp3wHWmEx8gvN1bPbbl4HCRZ911l~rap4-NGW~PHhCY0rSyAH4htAbFyKYOywEFthW~JOQPu5RzDrBxLuszkONKUDpHHneNFHYaOuUY1XWf-g8RRT~ArHQERw__"
          alt="Washing Machine"
          sx={{
            position: 'absolute',
            top: '50%',
            right: { 
              sm: '10%', 
              md: '15%' 
            },
            transform: 'translateY(-50%)',
            width: { 
              sm: '280px', 
              md: '320px', 
              lg: '350px' 
            },
            height: 'auto',
            zIndex: 2,
            display: { xs: 'none', sm: 'block' }
          }}
        />

        {/* Decorative circles - only shown on non-mobile devices */}
        {[
          { top: '15%', right: '15%', size: 20 },
          { top: '10%', right: '25%', size: 15 },
          { top: '20%', right: '35%', size: 10 },
          { top: '35%', right: '8%', size: 18 },
          { top: '45%', right: '30%', size: 12 },
          { top: '60%', right: '20%', size: 25 },
          { top: '75%', right: '25%', size: 15 },
          { top: '80%', right: '10%', size: 18 },
        ].map((circle, idx) => (
          <Box
            key={`outline-${idx}`}
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
              width: circle.size,
              height: circle.size,
              top: circle.top,
              right: circle.right,
              borderRadius: '50%',
              border: `1.5px solid ${theme.palette.primary.darkBlue}`,
              opacity: 0.5,
              zIndex: 3,
              display: { xs: 'none', sm: 'block' }
            }}
          />
        ))}

        {/* Filled circles */}
        {[
          { top: '20%', right: '20%', size: 8 },
          { top: '40%', right: '15%', size: 6 },
          { top: '55%', right: '28%', size: 10 },
          { top: '70%', right: '18%', size: 7 },
        ].map((circle, idx) => (
          <Box
            key={`filled-${idx}`}
            sx={{
              position: 'absolute',
              width: circle.size,
              height: circle.size,
              top: circle.top,
              right: circle.right,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.darkBlue,
              opacity: 0.3,
              zIndex: 3,
              display: { xs: 'none', sm: 'block' }
            }}
          />
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default HeroSection;