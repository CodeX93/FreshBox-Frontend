// PART 1: Updated TestimonialsSection component
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
          py: { xs: 2, md: 4 },
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Container 
            maxWidth="xl" 
            sx={{
              bgcolor: theme.palette.primary.darkBlue,
              borderRadius: 4,
              py: { xs: 3, md: 4 },
              px: { xs: 2, sm: 3, md: 4 },
              position: 'relative',
              boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
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
                  mb: 1, 
                  fontWeight: 700,
                  color: '#FBFFCF',
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
                }}
              >
                What Our Customers Say
              </Typography>
              
              <Typography
                variant="h6"
                align="center"
                sx={{ 
                  mb: { xs: 2, md: 3 },
                  color: 'rgba(251, 255, 207, 0.8)',
                  maxWidth: '700px',
                  mx: 'auto',
                  fontSize: { xs: '0.9rem', md: '1rem' }
                }}
              >
                Don't just take our word for it
              </Typography>
            </motion.div>

            <Grid container spacing={{ xs: 2, md: 3 }}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={cardVariants}
                  >
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        pt: 3.5,
                        pb: 2,
                        px: { xs: 2, sm: 2.5 },
                        borderRadius: 3,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        overflow: 'visible',
                        backgroundColor: 'rgba(21, 33, 43, 0.7)'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '5px',
                          width: '40%',
                          backgroundColor: theme.palette.primary.main,
                          borderTopLeftRadius: 3
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
                            top: -18,
                            left: 20,
                            width: 36,
                            height: 36,
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
                              fontSize: 20,
                              color: theme.palette.primary.whitishMint,
                            }}
                          />
                        </Box>
                      </motion.div>
                      
                      <CardContent sx={{ 
                        flexGrow: 1, 
                        pt: 1.5,
                        pb: 0.5,
                        px: { xs: 0.5, sm: 1 },
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <Typography 
                          variant="body1" 
                          paragraph 
                          sx={{ 
                            fontStyle: 'italic',
                            color: theme.palette.primary.whitishMint,
                            mb: 2,
                            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                            lineHeight: 1.5,
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: isMobile ? 3 : 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          "{testimonial.text}"
                        </Typography>
                        <Divider sx={{ 
                          my: 1.5,
                          borderColor: 'rgba(251, 255, 207, 0.2)'
                        }} />
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600, 
                            color: '#FBFFCF',
                            fontSize: '0.9rem',
                            mt: 0.5
                          }}
                        >
                          {testimonial.author}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          mt: 1,
                          mb: 0.5
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
                                  mr: 0.5,
                                  fontSize: '1rem'
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
            
            {/* Background decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                right: 0,
                width: '25%',
                height: '50%',
                backgroundColor: 'rgba(40, 221, 205, 0.07)',
                borderTopLeftRadius: 100,
                borderBottomLeftRadius: 100,
                zIndex: 0
              }}
            />
            
            <Box
              sx={{
                position: 'absolute',
                bottom: '15%',
                left: 0,
                width: '20%',
                height: '40%',
                backgroundColor: 'rgba(40, 221, 205, 0.05)',
                borderTopRightRadius: 100,
                borderBottomRightRadius: 100,
                zIndex: 0
              }}
            />
          </Container>
        </Box>
      </AnimatedSection>
    </ThemeProvider>
  );
};

export default TestimonialsSection;