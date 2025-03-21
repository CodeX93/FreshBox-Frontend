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
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AnimatedSection from './AnimatedSection';

const TestimonialsSection = () => {
  const theme = useTheme();
  
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
      boxShadow: theme.shadows[6],
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
    <AnimatedSection
      animationDirection="right"
      id="testimonials-section"
    >
      <Container maxWidth="xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headingVariants}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 1, fontWeight: 600 }}
          >
            What Our Customers Say
          </Typography>
          
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
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
                    boxShadow: theme.shadows[3],
                  }}
                >
                  <motion.div
                    variants={quoteIconVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <FormatQuoteIcon 
                      sx={{ 
                        position: 'absolute',
                        top: -20,
                        left: 20,
                        fontSize: 50,
                        color: theme.palette.primary.main,
                        opacity: 0.8
                      }}
                    />
                  </motion.div>
                  
                  <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                      "{testimonial.text}"
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600 }}>
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
                              color: i < testimonial.rating ? theme.palette.secondary.main : theme.palette.grey[300],
                              mr: 0.5,
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
      </Container>
    </AnimatedSection>
  );
};

export default TestimonialsSection;