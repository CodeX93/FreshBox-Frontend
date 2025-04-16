'use client';

import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AnimatedSection from './AnimatedSection'; // Update this path
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme'; // Update this path to match your project structure

const TestimonialsSection = ({ fadeInUp, scrollY }) => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isSmall = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));
  
  const testimonials = [
    {
      text: "I never knew laundry could be this easy! The service is prompt, my clothes come back perfectly clean, and the app makes scheduling a breeze.",
      author: "Sarah T., Working Professional",
      rating: 5
    },
    {
      text: "As a busy parent of three, this service has been a game-changer. The stain removal is incredible, and I love the option to choose eco-friendly detergents.",
      author: "James M., Parent",
      rating: 5
    },
    {
      text: "I was skeptical at first, but now I'm a convert. The attention to detail with my delicate clothes has been impressive. Worth every penny!",
      author: "Elena K., Fashion Enthusiast",
      rating: 4
    }
  ];

  const headingVariants = {
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
    hidden: { opacity: 0, y: 30 },
    visible: index => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        delay: 0.1 + (index * 0.1),
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -5,
      boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
      transition: { duration: 0.2 }
    }
  };

  const quoteIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: index => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.2,
        delay: 0.3 + (index * 0.05),
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <AnimatedSection
        animationDirection="right"
        id="testimonials-section"
        backgroundColor="transparent"
      >
        <Box sx={{ 
          py: { xs: 6, sm: 8, md: 10, lg: 12 }, // Increased vertical padding for all screen sizes
          px: { xs: 2, sm: 3, md: 4, lg: 5 },   // Added horizontal padding that increases with screen size
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Container 
            maxWidth="xl" 
            sx={{
              bgcolor: theme.palette.primary.darkBlue,
              borderRadius: { xs: 2, sm: 3, md: 4 }, // Responsive border radius
              py: { xs: 4, sm: 5, md: 6 },           // Increased vertical padding inside container
              px: { xs: 2, sm: 3, md: 4, lg: 5 },    // Increased horizontal padding inside container
              position: 'relative',
              boxShadow: { 
                xs: '0 8px 20px rgba(0,0,0,0.08)', 
                md: '0 15px 30px rgba(0,0,0,0.1)' 
              }
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={headingVariants}
            >
              <Typography
                variant="h2"
                component="h2"
                align="center"
                sx={{ 
                  mb: { xs: 1, sm: 1.5, md: 2 }, 
                  fontWeight: 700,
                  color: '#FBFFCF',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' } // More granular font scaling
                }}
              >
                What Our Customers Say
              </Typography>
              
              <Typography
                variant="h6"
                align="center"
                sx={{ 
                  mb: { xs: 3, sm: 4, md: 5 }, // Increased bottom margin for better spacing
                  color: 'rgba(251, 255, 207, 0.8)',
                  maxWidth: { xs: '95%', sm: '80%', md: '700px' }, // Responsive max width
                  mx: 'auto',
                  fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' } // More granular font scaling
                }}
              >
                Don't just take our word for it
              </Typography>
            </motion.div>

            <Grid 
              container 
              spacing={{ xs: 3, sm: 4, md: 4, lg: 5 }} // Increased spacing between cards
              sx={{ justifyContent: 'center' }} // Center cards on all screen sizes
            >
              {testimonials.map((testimonial, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={isTablet ? 6 : 12} 
                  md={4} 
                  key={index}
                  sx={{ 
                    display: 'flex',
                    maxWidth: { xs: '100%', sm: isTablet ? '85%' : '100%', md: '100%' } // Control card width
                  }}
                >
                  <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={cardVariants}
                    style={{ width: '100%', height: '100%' }} // Ensure motion div takes full width
                  >
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        pt: { xs: 3, sm: 3.5, md: 4 },
                        pb: { xs: 2, sm: 2.5, md: 3 },
                        px: { xs: 2, sm: 2.5, md: 3 },
                        borderRadius: { xs: 2, sm: 2.5, md: 3 }, // Responsive border radius
                        boxShadow: {
                          xs: '0 4px 10px rgba(0,0,0,0.06)',
                          sm: '0 6px 15px rgba(0,0,0,0.07)',
                          md: '0 8px 20px rgba(0,0,0,0.08)'
                        },
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        overflow: 'visible',
                        backgroundColor: 'rgba(21, 33, 43, 0.7)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '5px',
                          width: { xs: '30%', sm: '35%', md: '40%' }, // Responsive accent bar width
                          backgroundColor: theme.palette.primary.main,
                          borderTopLeftRadius: { xs: 2, sm: 2.5, md: 3 }
                        }}
                      />
                      
                      <motion.div
                        variants={quoteIconVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                      >
                        <Box
                          sx={{ 
                            position: 'absolute',
                            top: { xs: -15, sm: -16, md: -18 },
                            left: { xs: 15, sm: 18, md: 20 },
                            width: { xs: 30, sm: 33, md: 36 },
                            height: { xs: 30, sm: 33, md: 36 },
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.light,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 4px 10px rgba(40, 221, 205, 0.3)'
                          }}
                        >
                          <FormatQuoteIcon 
                            sx={{ 
                              fontSize: { xs: 16, sm: 18, md: 20 }, // Responsive icon size
                              color: theme.palette.primary.whitishMint,
                            }}
                          />
                        </Box>
                      </motion.div>
                      
                      <CardContent sx={{ 
                        flexGrow: 1, 
                        pt: { xs: 1, sm: 1.25, md: 1.5 },
                        pb: { xs: 0.25, sm: 0.5, md: 0.5 },
                        px: { xs: 0.5, sm: 0.75, md: 1 },
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <Typography 
                          variant="body1" 
                          paragraph 
                          sx={{ 
                            fontStyle: 'italic',
                            color: theme.palette.primary.whitishMint,
                            mb: { xs: 1.5, sm: 1.75, md: 2 },
                            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem', lg: '0.95rem' },
                            lineHeight: { xs: 1.4, sm: 1.45, md: 1.5 },
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: isSmall ? 3 : (isMobile ? 4 : 5), // Responsive line clamping
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: { xs: '4.2em', sm: '5.8em', md: '7.5em' } // Set minimum height to prevent layout shifts
                          }}
                        >
                          "{testimonial.text}"
                        </Typography>
                        <Divider sx={{ 
                          my: { xs: 1, sm: 1.25, md: 1.5 },
                          borderColor: 'rgba(251, 255, 207, 0.2)'
                        }} />
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600, 
                            color: '#FBFFCF',
                            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem', lg: '0.95rem' },
                            mt: { xs: 0.25, sm: 0.5, md: 0.5 }
                          }}
                        >
                          {testimonial.author}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          mt: { xs: 0.5, sm: 0.75, md: 1 },
                          mb: { xs: 0.25, sm: 0.5, md: 0.5 }
                        }}>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              custom={i}
                              variants={starVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: false, amount: 0.3 }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  color: i < testimonial.rating ? '#F5DE8C' : 'rgba(226, 232, 240, 0.3)',
                                  mr: { xs: 0.25, sm: 0.35, md: 0.5 },
                                  fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } // Responsive star size
                                }}
                              >
                                ★
                              </Box>
                            </motion.div>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            
            {/* Background decorative elements - made responsive */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '15%', sm: '12%', md: '10%' },
                right: 0,
                width: { xs: '15%', sm: '20%', md: '25%' },
                height: { xs: '30%', sm: '40%', md: '50%' },
                backgroundColor: 'rgba(40, 221, 205, 0.07)',
                borderTopLeftRadius: { xs: 50, sm: 75, md: 100 },
                borderBottomLeftRadius: { xs: 50, sm: 75, md: 100 },
                zIndex: 0,
                display: { xs: 'none', sm: 'block' } // Hide on very small screens
              }}
            />
            
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: '20%', sm: '17%', md: '15%' },
                left: 0,
                width: { xs: '12%', sm: '15%', md: '20%' },
                height: { xs: '25%', sm: '30%', md: '40%' },
                backgroundColor: 'rgba(40, 221, 205, 0.05)',
                borderTopRightRadius: { xs: 50, sm: 75, md: 100 },
                borderBottomRightRadius: { xs: 50, sm: 75, md: 100 },
                zIndex: 0,
                display: { xs: 'none', sm: 'block' } // Hide on very small screens
              }}
            />
          </Container>
        </Box>
      </AnimatedSection>
    </ThemeProvider>
  );
};

export default TestimonialsSection;