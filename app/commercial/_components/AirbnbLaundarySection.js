'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  useMediaQuery,Button
} from '@mui/material';
import {theme} from "../../../contexts/Theme"
import { 
  AccessTime as FastTurnaroundIcon,
  LocalLaundryService as LaundryIcon,
  People as GuestsIcon,
  Autorenew as RenewalIcon,
  Calculate as CalculateIcon,
  Schedule as ScheduleIcon,
  Inventory as InventoryIcon,
  LocalShipping as DeliveryIcon
} from '@mui/icons-material';

const AirbnbLaundrySection = () => {
  const darkBlueColor = theme.palette.primary.darkBlue;
  const primaryColor = theme.palette.primary.main;
  const whitishMint = theme.palette.primary.whitishMint;
  const yellowishColor = theme.palette.primary.yellowish;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Benefits data
  const benefits = [
    {
      icon: <FastTurnaroundIcon />,
      title: "Quick Turnaround",
      description: "Fast service for between-guest changeovers ensuring your property is always ready."
    },
    {
      icon: <LaundryIcon />,
      title: "Premium Finish",
      description: "Hotel-quality finish that impresses guests and leads to better reviews."
    },
    {
      icon: <GuestsIcon />,
      title: "Guest Satisfaction",
      description: "Fresh, clean linens consistently contribute to 5-star guest experiences."
    },
    {
      icon: <RenewalIcon />,
      title: "Linen Longevity",
      description: "Professional care extends the life of your textiles, saving you money."
    }
  ];
  
  // Features data
  const features = [
    {
      icon: <CalculateIcon />,
      title: "Volume-Based Pricing",
      description: "Pay only for what you need with transparent pricing based on your actual usage."
    },
    {
      icon: <ScheduleIcon />,
      title: "Flexible Scheduling",
      description: "Schedule pickups around your guest check-ins and check-outs."
    },
    {
      icon: <InventoryIcon />,
      title: "Inventory Management",
      description: "Track your linens and know when they'll be ready."
    },
    {
      icon: <DeliveryIcon />,
      title: "Free Delivery",
      description: "No additional fees for pickup and delivery to your properties."
    }
  ];

  return (
    <Box 
      sx={{ 
        width: '100%',
        bgcolor: whitishMint,
        py: { xs: 3, sm: 4, md: 5 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
 {/* Subtle background element */}
 <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: { xs: '150px', sm: '200px', md: '300px' },
          height: { xs: '150px', sm: '200px', md: '300px' },
          background: `linear-gradient(135deg, ${primaryColor}20, transparent)`,
          borderRadius: '0 0 0 100%',
          zIndex: 0
        }}
      />
      
      
        {/* Hero Section - Compact */}
        <Box sx={{ mb: { xs: 3, sm: 4, md: 5 }, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              fontWeight: 700,
              color: darkBlueColor,
              mb: { xs: 1, sm: 2 },
              lineHeight: 1.2,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 50,
                height: 3,
                bgcolor: yellowishColor,
                borderRadius: 2
              }
            }}
          >
            Airbnb & Vacation Rental Laundry
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              color: darkBlueColor,
              mb: { xs: 2, sm: 3 },
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.5
            }}
          >
            Professional laundry solutions for businesses of all sizes. From hotels to restaurants, we keep your textiles fresh and clean.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: darkBlueColor,
                color: whitishMint,
                px: { xs: 2.5, sm: 3 },
                py: { xs: 1, sm: 1.25 },
                borderRadius: '50px',
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                fontWeight: 600,
                '&:hover': {
                  bgcolor: primaryColor,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: darkBlueColor,
                color: darkBlueColor,
                px: { xs: 2.5, sm: 3 },
                py: { xs: 1, sm: 1.25 },
                borderRadius: '50px',
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                fontWeight: 600,
                '&:hover': {
                  borderColor: primaryColor,
                  color: primaryColor,
                  bgcolor: `${primaryColor}10`,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          {/* Why Choose Us Column - Left Side */}
          <Grid item xs={12} md={6}>
            
            <Box
              sx={{
                bgcolor: darkBlueColor,
                borderRadius: 3,
                p: 3,
                height: '100%'
              }}
            >
              
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                  fontWeight: 700,
                  color: whitishMint,
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -6,
                    left: 0,
                    width: 40,
                    height: 3,
                    bgcolor: yellowishColor,
                    borderRadius: 2
                  }
                }}
              >
                Why Choose Our Service
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: `${whitishMint}10`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        bgcolor: `${whitishMint}15`,
                        '& .feature-icon': {
                          color: yellowishColor,
                          transform: 'scale(1.1)'
                        }
                      }
                    }}
                  >
                    <Box
                      className="feature-icon"
                      sx={{
                        color: whitishMint,
                        transition: 'all 0.3s ease',
                        mt: 0.5
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: whitishMint,
                          mb: 0.5,
                          fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: `${whitishMint}CC`,
                          lineHeight: 1.5,
                          fontSize: { xs: '0.85rem', sm: '0.9rem' }
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Benefits Column - Right Side */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                fontWeight: 700,
                color: darkBlueColor,
                mb: { xs: 3, sm: 4 },
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -6,
                  left: 0,
                  width: 40,
                  height: 3,
                  bgcolor: yellowishColor,
                  borderRadius: 2
                }
              }}
            >
              Our Benefits
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {benefits.map((benefit, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: whitishMint,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      '& .benefit-icon': {
                        color: yellowishColor,
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <Box
                    className="benefit-icon"
                    sx={{
                      color: darkBlueColor,
                      transition: 'all 0.3s ease',
                      mt: 0.5
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: darkBlueColor,
                        mb: 0.5,
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(0,60,67,0.8)',
                        lineHeight: 1.5,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' }
                      }}
                    >
                      {benefit.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AirbnbLaundrySection;
                  