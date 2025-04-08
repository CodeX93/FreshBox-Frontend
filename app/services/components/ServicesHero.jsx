'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';

const ServicesHero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.4
      }
    })
  };

  return (
    <Box sx={{ 
      background: `linear-gradient(rgba(13, 59, 110, 0.8), rgba(40, 221, 205, 0.8)), url('/laundry-bg.jpg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      pt: { xs: 16, sm: 18, md: 16 }, // Increased top padding to prevent navbar collision
      pb: { xs: 8, sm: 10, md: 12 }, // Responsive bottom padding
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      minHeight: { xs: 'auto', md: '80vh' } // Responsive minimum height
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} alignItems="center">
          {/* Left side - Text content */}
          <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <Typography variant="h2" sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem', lg: '4rem' },
                mb: { xs: 1.5, md: 2 },
                color: 'white',
                lineHeight: { xs: 1.2, md: 1.1 }
              }}>
                Premium Laundry<br/>Services
              </Typography>
              
              <Typography variant="h5" sx={{ 
                fontWeight: 400, 
                color: 'white',
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
              }}>
                Save time with our professional cleaning services
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1.5, sm: 2 }, 
                flexWrap: 'wrap',
                flexDirection: { xs: 'column', sm: 'row' },
                width: { xs: '100%', sm: 'auto' }
              }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ width: isSmallScreen ? '100%' : 'auto' }}
                >
                  <Button 
                    variant="contained" 
                    size="large" 
                    fullWidth={isSmallScreen}
                    sx={{ 
                      py: { xs: 1.25, md: 1.5 }, 
                      px: { xs: 3, md: 4 },
                      borderRadius: 2,
                      fontWeight: 600,
                      color:'white',
                      backgroundColor: theme.palette.primary.darkBlue,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ width: isSmallScreen ? '100%' : 'auto' }}
                >
                  <Button 
                    variant="outlined" 
                    size="large" 
                    fullWidth={isSmallScreen}
                    sx={{ 
                      py: { xs: 1.25, md: 1.5 }, 
                      px: { xs: 3, md: 4 },
                      borderRadius: 2,
                      color: 'white',
                      borderColor: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>

          {/* Right side - "Why Choose Us" card */}
          <Grid 
            item 
            xs={12} 
            md={5} 
            order={{ xs: 1, md: 2 }}
            sx={{ 
              mb: { xs: 4, md: 0 },
              display: { xs: 'block', sm: 'block' } // Always show the card, even on mobile
            }}
          >
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Paper elevation={5} sx={{ 
                p: { xs: 2.5, sm: 3, md: 4 }, 
                borderRadius: { xs: 3, md: 4 },
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                maxWidth: { xs: '100%', md: '90%' },
                mx: { xs: 'auto', md: 0 }
              }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  mb: { xs: 1.5, md: 2 }, 
                  color: theme.palette.primary.dark,
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.5rem' }
                }}>
                  Why Choose Us?
                </Typography>
                <List sx={{ py: 0 }}>
                  {[
                    'Free pickup and delivery',
                    'Eco-friendly cleaning solutions',
                    'Fast turnaround times', 
                    '100% satisfaction guarantee',
                    'Expert handling of delicate fabrics'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={listItemVariants}
                    >
                      <ListItem sx={{ py: { xs: 0.5, md: 1 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 28, md: 36 } }}>
                          <CheckIcon sx={{ 
                            color: theme.palette.primary.main,
                            fontSize: { xs: '1.1rem', md: '1.3rem' }
                          }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          primaryTypographyProps={{
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                          }}
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Animated floating elements - only show on larger screens */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              y: [0, -15, 0],
              transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              width: isTablet ? 70 : 100,
              height: isTablet ? 70 : 100,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              zIndex: 1
            }}
          />
          
          <motion.div
            animate={{
              y: [0, 15, 0],
              transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }}
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '10%',
              width: isTablet ? 50 : 70,
              height: isTablet ? 50 : 70,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              zIndex: 1
            }}
          />
        </>
      )}
    </Box>
  );
};

export default ServicesHero;