'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme';

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
const AnimatedBox = styled(Box)(({ delay = 0 }) => ({
  opacity: 0,
  animation: `${fadeIn} 0.6s ease-out ${delay}s forwards`,
}));

const AnimatedListItem = styled(ListItem)(({ delay = 0 }) => ({
  opacity: 0,
  animation: `${slideInFromLeft} 0.5s ease-out ${delay}s forwards`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateX(5px)',
  },
}));

const AnimatedUnderline = styled(Box)(() => ({
  position: 'absolute',
  bottom: -4,
  left: 0,
  height: 3,
  backgroundColor: theme.palette.primary.main,
  width: 0,
  animation: `${growWidth} 0.8s ease-out 0.5s forwards`,
  borderRadius: 2,
}));

const AnimatedPaper = styled(Paper)(() => ({
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const TestimonialBox = styled(Box)(({ delay = 0 }) => ({
  opacity: 0,
  animation: `${fadeIn} 0.6s ease-out ${delay}s forwards`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const GradientLine = styled(Box)(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: 0,
  height: 4,
  background: theme.palette.primary.main,
  animation: `${growWidth} 1.5s ease-out 1s forwards`,
}));

const AnimatedCheckIcon = styled(Box)(() => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(0.5),
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    animation: `${pulse} 0.5s ease infinite`,
  },
}));

// Client Component
export default function ClientQualityPromiseSection({ qualityPromises, testimonials }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} lg={6}>
          <AnimatedBox delay={0.1}>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
              <Typography 
                variant="h2"
                component="h2" 
                sx={{ 
                  color: theme.palette.text.primary
                }}
              >
                Our Quality Promise
              </Typography>
              <AnimatedUnderline />
            </Box>
          </AnimatedBox>
          
          <AnimatedBox delay={0.3}>
            <Typography variant="body1" sx={{ fontSize: '1.125rem', mb: 3 }}>
              At LaundryHeap, we're committed to providing the highest quality laundry and dry cleaning services available.
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
                    <CheckIcon 
                      fontSize="small" 
                      sx={{ color: 'white' }}
                    />
                  </AnimatedCheckIcon>
                </ListItemIcon>
                <ListItemText 
                  primary={promise} 
                  primaryTypographyProps={{ 
                    sx: { 
                      transition: 'color 0.3s ease',
                      '&:hover': { color: theme.palette.primary.main }
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
                    color: theme.palette.secondary.main,
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
                    '&:hover': { color: theme.palette.text.primary }
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
    </ThemeProvider>
  );
}