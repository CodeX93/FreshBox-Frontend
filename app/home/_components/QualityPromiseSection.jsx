'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInFromLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const growWidth = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const AnimatedBox = styled(Box)(({ theme, delay = 0 }) => ({
  opacity: 0,
  animation: `${fadeIn} 0.6s ease-out ${delay}s forwards`,
}));

const AnimatedListItem = styled(ListItem)(({ theme, delay = 0 }) => ({
  opacity: 0,
  animation: `${slideInFromLeft} 0.5s ease-out ${delay}s forwards`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateX(5px)',
  },
}));

const AnimatedUnderline = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: -4,
  left: 0,
  height: 3,
  backgroundColor: theme.palette.primary.main,
  width: 0,
  animation: `${growWidth} 0.8s ease-out 0.5s forwards`,
  borderRadius: 2,
}));

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const TestimonialBox = styled(Box)(({ theme, delay = 0 }) => ({
  opacity: 0,
  animation: `${fadeIn} 0.6s ease-out ${delay}s forwards`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const GradientLine = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: 0,
  height: 4,
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  animation: `${growWidth} 1.5s ease-out 1s forwards`,
}));

const AnimatedCheckIcon = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  padding: theme.spacing(0.5),
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.success.main,
    animation: `${pulse} 0.5s ease infinite`,
  },
}));

// Component
export default function QualityPromiseSection() {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const qualityPromises = [
    "Eco-friendly cleaning processes and detergents",
    "Expert handling of delicate fabrics and special care items",
    "Reliable pickup and delivery scheduling",
    "Satisfaction guarantee on all services",
    "Transparent pricing with no hidden fees"
  ];

  const testimonials = [
    {
      quote: "The convenience of LaundryPro has completely changed my weekly routine. I get so much time back!",
      author: "Michael T."
    },
    {
      quote: "I'm impressed with the attention to detail. My clothes have never looked better.",
      author: "Sarah L."
    }
  ];

  return (
    <Box sx={{ 
      width: '100%', 
      py: 8, 
      bgcolor: 'primary.50', 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: 150,
        height: 150,
        borderRadius: '50%',
        bgcolor: 'primary.100',
        opacity: 0.3,
        animation: `${fadeIn} 1s ease-out 0.2s forwards`,
        zIndex: 0
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        bgcolor: 'secondary.100',
        opacity: 0.2,
        animation: `${fadeIn} 1s ease-out 0.4s forwards`,
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} lg={6}>
            <AnimatedBox delay={0.1}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>
                  Our Quality Promise
                </Typography>
                <AnimatedUnderline />
              </Box>
            </AnimatedBox>
            
            <AnimatedBox delay={0.3}>
              <Typography variant="body1" sx={{ fontSize: '1.125rem', mb: 3 }}>
                At LaundryPro, we're committed to providing the highest quality laundry and dry cleaning services available.
              </Typography>
            </AnimatedBox>
            
            <List disablePadding>
              {qualityPromises.map((promise, index) => (
                <AnimatedListItem 
                  key={index} 
                  disableGutters 
                  sx={{ py: 0.75 }}
                  delay={0.4 + index * 0.1}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AnimatedCheckIcon>
                      <CheckIcon fontSize="small" color="success" />
                    </AnimatedCheckIcon>
                  </ListItemIcon>
                  <ListItemText 
                    primary={promise} 
                    primaryTypographyProps={{ 
                      sx: { 
                        transition: 'color 0.3s ease',
                        '&:hover': { color: 'primary.main' } 
                      } 
                    }} 
                  />
                </AnimatedListItem>
              ))}
            </List>
          </Grid>
          
          <Grid item xs={12} lg={6}>
            <AnimatedBox delay={0.5}>
              <AnimatedPaper sx={{ p: 3, borderRadius: 4, position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      color: 'warning.main', 
                      fontSize: '1.25rem', 
                      mr: 1,
                      display: 'flex', 
                      alignItems: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover': { 
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    ★★★★★
                  </Box>
                  <Typography sx={{ fontWeight: 600 }}>
                    4.8/5 from 2,000+ reviews
                  </Typography>
                </Box>
                
                {testimonials.map((testimonial, index) => (
                  <TestimonialBox key={index} delay={0.7 + index * 0.2}>
                    {index > 0 && <Divider sx={{ my: 2 }} />}
                    <Typography variant="body2" sx={{ 
                      fontStyle: 'italic', 
                      mb: 1,
                      transition: 'color 0.3s ease',
                      '&:hover': { color: 'text.primary' }
                    }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {testimonial.author}
                    </Typography>
                  </TestimonialBox>
                ))}
                
                <GradientLine />
              </AnimatedPaper>
            </AnimatedBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}