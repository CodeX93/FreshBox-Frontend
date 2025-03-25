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
        <Container maxWidth="xl">
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
                mb: 1, 
                fontWeight: 700,
                color: theme.palette.primary.dark
              }}
            >
              What Our Customers Say
            </Typography>
            
            <Typography
              variant="h6"
              align="center"
              sx={{ 
                mb: 6,
                color: '#4a5568'
              }}
            >
              Don't just take our word for it
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
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
                      pt: 4,
                      borderRadius: 3,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      border: '1px solid rgba(226, 232, 240, 0.8)',
                      overflow: 'visible'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '5px',
                        width: '30%',
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
                          top: -20,
                          left: 20,
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.primary.main, // Changed to turquoise background
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: '0 4px 12px rgba(40, 221, 205, 0.3)' // Matching shadow color
                        }}
                      >
                        <FormatQuoteIcon 
                          sx={{ 
                            fontSize: 24,
                            color: 'white', // Changed to white for better contrast
                          }}
                        />
                      </Box>
                    </motion.div>
                    
                    <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                      <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                        "{testimonial.text}"
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>
                        {testimonial.author}
                      </Typography>
                      <Box sx={{ display: 'flex', mt: 1 }}>
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
                                color: i < testimonial.rating ? theme.palette.secondary.main : '#E2E8F0',
                                mr: 0.5,
                                fontSize: '1.2rem'
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
          
          {/* Background decorative element */}
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              right: 0,
              width: '30%',
              height: '50%',
              backgroundColor: theme.palette.primary.light,
              opacity: 0.05,
              borderTopLeftRadius: 100,
              borderBottomLeftRadius: 100,
              zIndex: -1
            }}
          />
        </Container>
      </AnimatedSection>
    </ThemeProvider>
  );
};

export default TestimonialsSection;