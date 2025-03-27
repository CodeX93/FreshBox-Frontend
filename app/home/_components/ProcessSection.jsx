'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme';

const ProcessSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const controls = useAnimation();
  const sectionsRef = useRef([]);

  const processes = [
    {
      title: "Create Your Account",
      description: "Create your 2ULaundry account, download the app, and select your cleaning preferences.",
      imagePath: "/images/account-creation.png",
      buttonText: "Get Started"
    },
    {
      title: "On Pickup Day",
      description: "You'll get your personalized laundry bags to separate your laundry & dry cleaning. On Laundry Day, your stuff goes into bags and set them out.",
      imagePath: "/images/pickup-day.png",
      buttonText: "Schedule Pickup"
    },
    {
      title: "On Delivery Day",
      description: "When your clothes are cleaned, crisp, and ready to wear, one of our laundry delivery drivers will return them to you – at your designated drop-off location.",
      imagePath: "/images/delivery-day.png",
      buttonText: "What to Expect"
    },
    {
      title: "Not home? No problem!",
      description: "That's very common! If you won't be home, you can leave your laundry bags out, we'll let you know when our drivers are on the way.",
      imagePath: "/images/not-home.png",
      buttonText: "Learn More"
    }
  ];

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
      <Box sx={{ background: '#FFFBEA', overflowX: 'hidden' }}>
        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
              How does our laundry service work?
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ color: 'text.secondary' }}>
              We make laundry day easy! Laundry service delivered — at the click of a button.
            </Typography>
          </Container>
        </Box>

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
                    <Button variant="contained" color="primary" sx={{ borderRadius: 30, px: 3, py: 1.5,color:'white', fontWeight:'bold' }}>
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
      </Box>
    </ThemeProvider>
  );
};

export default ProcessSection;
