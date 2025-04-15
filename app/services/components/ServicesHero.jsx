'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme';

const ServicesHero = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        backgroundColor: theme.palette.primary.whitishMint, // Using theme's whitish mint
        pt: { xs: 10, sm: 12, md: 10 },
        pb: { xs: 6, sm: 8, md: 10 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 'auto', sm: 'auto', md: '90vh' },
        maxHeight: { xs: 'none', md: 900 },
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} alignItems="center">
            {/* Left side - Text content */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                style={{ padding: isSmallMobile ? '0 8px' : '0' }}
              >
                <Typography variant="h1" sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  mb: { xs: 1.5, sm: 2, md: 3 },
                  color: theme.palette.primary.darkBlue, // Using theme's dark green
                  lineHeight: 1.2
                }}>
                  Premium Laundry Services
                </Typography>
                
                <Typography variant="h5" sx={{ 
                  fontWeight: 400, 
                  color: theme.palette.primary.dark, // Using theme's dark green
                  mb: { xs: 3, sm: 4, md: 5 },
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.1rem' },
                  maxWidth: { xs: '100%', md: '90%' }
                }}>
                  Save time with our professional cleaning services
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1.5, sm: 2 },
                  mb: { xs: 3, sm: 4 }
                }}>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      py: { xs: 1.25, sm: 1.5 }, 
                      px: { xs: 3, sm: 4 },
                      borderRadius: 1,
                      fontWeight: 600,
                      backgroundColor: theme.palette.primary.main, // Using theme's primary color
                      color: theme.palette.primary.black, // Using theme's black
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.mainHover, // Using theme's hover color
                        boxShadow: 'none'
                      },
                      minWidth: { xs: '100%', sm: 150 },
                      fontSize: { xs: '0.875rem', sm: 'inherit' }
                    }}
                  >
                    Book Now
                  </Button>
                  
                  <Button 
                    variant="contained" 
                    sx={{ 
                      py: { xs: 1.25, sm: 1.5 }, 
                      px: { xs: 3, sm: 4 },
                      borderRadius: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                      backgroundColor: theme.palette.primary.darkBlue, // Using theme's dark blue
                      color: theme.palette.primary.white, // Using theme's white
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark, // Using theme's dark color for hover
                        boxShadow: 'none'
                      },
                      minWidth: { xs: '100%', sm: 150 },
                      fontSize: { xs: '0.875rem', sm: 'inherit' }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            {/* Right side - Image with circles */}
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ mb: { xs: 2, md: 0 } }}>
              <Box sx={{ 
                position: 'relative', 
                height: { xs: '280px', sm: '320px', md: '100%' }, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                {/* Large circle background */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: { xs: '80%', sm: '85%', md: '90%' },
                    height: 0,
                    paddingBottom: { xs: '80%', sm: '85%', md: '90%' },
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main, // Using theme's primary color
                    opacity: 0.5,
                    zIndex: 0,
                  }}
                />
                
                {/* Decorative bubbles/circles */}
                {[...Array(isSmallMobile ? 6 : 10)].map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -10, 0],
                      transition: { 
                        repeat: Infinity, 
                        duration: 2 + Math.random() * 3, 
                        ease: "easeInOut",
                        delay: Math.random() * 2
                      },
                    }}
                    style={{
                      position: 'absolute',
                      width: isSmallMobile ? (6 + Math.random() * 15) : (8 + Math.random() * 20),
                      height: isSmallMobile ? (6 + Math.random() * 15) : (8 + Math.random() * 20),
                      borderRadius: '50%',
                      border: `1px solid ${theme.palette.primary.dark}`, // Using theme's dark color
                      top: `${10 + Math.random() * 80}%`,
                      left: `${10 + Math.random() * 80}%`,
                      zIndex: 1,
                      display: { xs: index < 6 ? 'block' : 'none', md: 'block' }
                    }}
                  />
                ))}
                
                {/* Sweater Image */}
                <Box
                  component="img"
                  src="https://s3-alpha-sig.figma.com/img/3ad0/56cd/5e31bd5f524395328cfa30f48d841ba7?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Q~Tv4CQ0ls-TC1N-nnHRFP7sHOIaHZn4t-I6GPwQyvJTjzaA4Mjtd~7JrI-24NlVQRBT~JowF-eiFz-lUsSaq3xVIQ3KTlqJ-vKTvT9ktT5raFDBgyKzKLWO7uy3NyYUdmqc0WrrxJN~xkcPvD0NNPs~7p1TLrKeI4kQwQmELHCEnP9aCmNj-vypCVqiUJKynOTLfslQ7S6q0REygMtJQ23l2qN16vvMIDioquYfPbeQfpFn1EMeC-qSV9jxUCpN2nugQPepynun7atqL8SJwEErbPz7D8v0cILwWQhxGLHODenDx~dRx6GXNWHiMyss7Gr0SfxHs0Dcn8QAKsvBhg__"
                  alt="Folded sweater"
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    width: { xs: '50%', sm: '55%', md: '60%' },
                    height: 'auto',
                    objectFit: 'contain',
                    ml: { xs: 0, sm: 2, md: 4 }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ServicesHero;