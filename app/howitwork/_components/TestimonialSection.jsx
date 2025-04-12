'use client';

import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AnimatedSection from './AnimatedSection'; // Update this path
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme'; // Update this path to match your project structure

const TestimonialsSection = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: index => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2 + (index * 0.2),
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -10,
      boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
      transition: { duration: 0.3 }
    }
  };

  const quoteIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
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
        duration: 0.3,
        delay: 0.6 + (index * 0.1),
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
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Container 
            maxWidth="xl" 
            sx={{
              bgcolor: theme.palette.primary.darkBlue,
              borderRadius: 4,
              py: { xs: 6, md: 8 },
              px: { xs: 3, sm: 4, md: 6 },
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
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
                gutterBottom
                sx={{ 
                  mb: 2, 
                  fontWeight: 700,
                  color: '#FBFFCF',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                What Our Customers Say
              </Typography>
              
              <Typography
                variant="h6"
                align="center"
                sx={{ 
                  mb: { xs: 5, md: 8 },
                  color: 'rgba(251, 255, 207, 0.8)',
                  maxWidth: '700px',
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                Don't just take our word for it
              </Typography>
            </motion.div>

            <Grid container spacing={{ xs: 4, md: 6 }}>
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
                        pt: 5,
                        pb: 3,
                        px: { xs: 2, sm: 3 },
                        borderRadius: 3,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
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
                          height: '6px',
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
                            top: -22,
                            left: 24,
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.light,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 4px 12px rgba(40, 221, 205, 0.3)'
                          }}
                        >
                          <FormatQuoteIcon 
                            sx={{ 
                              fontSize: 26,
                              color: theme.palette.primary.whitishMint,
                            }}
                          />
                        </Box>
                      </motion.div>
                      
                      <CardContent sx={{ 
                        flexGrow: 1, 
                        pt: 3,
                        pb: 1,
                        px: { xs: 1, sm: 2 },
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <Typography 
                          variant="body1" 
                          paragraph 
                          sx={{ 
                            fontStyle: 'italic',
                            color: theme.palette.primary.whitishMint,
                            mb: 3,
                            fontSize: '1.05rem',
                            lineHeight: 1.6,
                            flex: 1
                          }}
                        >
                          "{testimonial.text}"
                        </Typography>
                        <Divider sx={{ 
                          my: 2,
                          borderColor: 'rgba(251, 255, 207, 0.2)'
                        }} />
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600, 
                            color: '#FBFFCF',
                            fontSize: '1rem',
                            mt: 1
                          }}
                        >
                          {testimonial.author}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          mt: 1.5,
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
                                  mr: 0.7,
                                  fontSize: '1.25rem'
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