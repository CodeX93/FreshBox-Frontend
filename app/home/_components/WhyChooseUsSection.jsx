'use client';

import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  ThemeProvider
} from '@mui/material';
import { motion } from 'framer-motion';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedIcon from '@mui/icons-material/Verified';
import SettingsIcon from '@mui/icons-material/Settings';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { theme } from '../../../contexts/Theme'; // Import your theme context

const WhyChooseUsSection = () => {
  // Using your theme colors for feature icons
  const features = [
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      title: "No Hidden Fees",
      description: "Clear pricing based on weight or number of items. What you see is what you pay.",
      color: theme.palette.primary.main // Using your turquoise color
    },
    {
      icon: <VerifiedIcon fontSize="large" />,
      title: "Contactless Service",
      description: "Safe, contact-free pickup and delivery right at your doorstep.",
      color: theme.palette.primary.dark // Using your dark turquoise
    },
    {
      icon: <SettingsIcon fontSize="large" />,
      title: "Customizable Preferences",
      description: "Set your detergent, fabric softener, and folding preferences for a personalized experience.",
      color: theme.palette.secondary.main // Using your yellow color
    },
    {
      icon: <ThumbUpIcon fontSize="large" />,
      title: "100% Satisfaction Guarantee",
      description: "Not happy with our service? We'll redo it or refund your money, no questions asked.",
      color: theme.palette.secondary.dark // Using your dark yellow
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="section"
        id="why-choose-us-section"
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f7fa', // Light gray background
          py: 8
        }}
      >
        <Container maxWidth="xl">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="h2" // Using h2 from your theme
              component="h2"
              align="center"
              gutterBottom
              sx={{ 
                mb: { xs: 4, md: 6 },
                // Using theme typography instead of hardcoded fontWeight
                color: '#1a202c', // Dark gray
                position: 'relative',
                display: 'inline-block',
                margin: '0 auto',
                textAlign: 'center',
                width: '100%',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  backgroundColor: theme.palette.primary.main, // Your turquoise color
                  borderRadius: 2
                }
              }}
            >
              Why Choose Us?
            </Typography>
          </motion.div>

          {/* Features Grid */}
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * index,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card
                    elevation={2}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'box-shadow 0.3s',
                      '&:hover': {
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', height: '100%' }}>
                      {/* Icon Column */}
                      <Box
                        sx={{
                          backgroundColor: feature.color,
                          color: 'white',
                          p: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 80
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotateY: 180 }}
                          animate={{ scale: 1, rotateY: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.2 + (0.1 * index),
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, -10, 10, -10, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {feature.icon}
                        </motion.div>
                      </Box>
                      
                      {/* Content */}
                      <CardContent 
                        sx={{ 
                          flexGrow: 1,
                          backgroundColor: 'white',
                          p: 3
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          component="h3" 
                          gutterBottom
                          sx={{ 
                            color: '#1a202c', // Dark gray
                            fontWeight: 600 
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#4a5568', // Medium gray for readability
                            lineHeight: 1.6
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          {/* Bottom Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                mt: 6,
                p: 3,
                borderRadius: 2,
                backgroundColor: `${theme.palette.primary.main}10`, // Light turquoise with transparency
                border: `1px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography 
                variant="h6"
                sx={{ 
                  color: '#1a202c',
                  fontWeight: 500
                }}
              >
                Join thousands of happy customers who have simplified their laundry routine
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default WhyChooseUsSection;