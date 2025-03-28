'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography, Button, ThemeProvider } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { theme } from '../../../contexts/Theme';

const ClientProcessSection = ({ processes }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const controls = useAnimation();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setCurrentStep(index);
            controls.start({ opacity: 1, y: 0 });
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [controls]);

  return (
    <ThemeProvider theme={theme}>
      {processes.map((step, index) => (
        <Box
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          sx={{ height: { xs: 'auto', md: '90vh' }, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 3, py: { xs: 6, md: 0 } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', maxWidth: '1200px' }}
          >
            <Grid container spacing={6} alignItems="center" direction={{ xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.dark, textAlign: { xs: 'center', md: 'left' } }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.7, color: '#4a5568', textAlign: { xs: 'center', md: 'left' } }}>
                  {step.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button variant="contained" color="primary" sx={{ borderRadius: 30, px: 3, py: 1.5, color: 'white', fontWeight: 'bold' }}>
                    {step.buttonText}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  component="img"
                  src={step.imagePath}
                  alt={step.title}
                  sx={{ width: '100%', maxWidth: { xs: '90%', md: '100%' }, height: 'auto', maxHeight: 500, objectFit: 'contain', borderRadius: 3, boxShadow: 3 }}
                />
              </Grid>
            </Grid>
          </motion.div>
        </Box>
      ))}
    </ThemeProvider>
  );
};

export default ClientProcessSection;