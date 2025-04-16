"use client"
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Button,
  
  useMediaQuery
} from '@mui/material';
import { useRouter } from 'next/navigation';
import {theme}from "../../../contexts/Theme"
const WhyChooseUs = () => {
  const router = useRouter();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Custom icons using SVG directly for exact match
  const DollarIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C8.27 2 2 8.27 2 16C2 23.73 8.27 30 16 30C23.73 30 30 23.73 30 16C30 8.27 23.73 2 16 2ZM17 26H15V21H17V26ZM17 19H15V9H17V19Z" fill="#0E2A2F"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22.17L6.83 17L4.83 19L12 26.17L28 10.17L26 8.17L12 22.17Z" fill="#0E2A2F"/>
    </svg>
  );

  const SettingsIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4 2H14.6C14.04 2 13.58 2.42 13.52 2.98L13.3 5.68C12.54 5.96 11.84 6.34 11.2 6.82L8.76 5.72C8.26 5.5 7.66 5.66 7.36 6.12L5.96 8.5C5.68 8.94 5.78 9.54 6.2 9.86L8.42 11.58C8.36 12.04 8.32 12.52 8.32 13C8.32 13.48 8.36 13.96 8.42 14.4L6.2 16.14C5.78 16.46 5.68 17.06 5.96 17.5L7.36 19.88C7.66 20.34 8.26 20.5 8.76 20.28L11.2 19.18C11.84 19.66 12.54 20.04 13.3 20.32L13.52 23.02C13.58 23.58 14.04 24 14.6 24H17.4C17.96 24 18.42 23.58 18.48 23.02L18.7 20.32C19.46 20.04 20.16 19.66 20.8 19.18L23.24 20.28C23.74 20.5 24.34 20.34 24.64 19.88L26.04 17.5C26.32 17.06 26.22 16.46 25.8 16.14L23.58 14.4C23.64 13.96 23.68 13.48 23.68 13C23.68 12.52 23.64 12.04 23.58 11.58L25.8 9.86C26.22 9.54 26.32 8.94 26.04 8.5L24.64 6.12C24.34 5.66 23.74 5.5 23.24 5.72L20.8 6.82C20.16 6.34 19.46 5.96 18.7 5.68L18.48 2.98C18.42 2.42 17.96 2 17.4 2ZM16 17C13.8 17 12 15.2 12 13C12 10.8 13.8 9 16 9C18.2 9 20 10.8 20 13C20 15.2 18.2 17 16 17Z" fill="#0E2A2F"/>
    </svg>
  );

  const ThumbsUpIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 12H19L21.6 5.6C22.04 4.24 21.04 2.8 19.6 2.8H18.4L12 9.2V26.8H24.4C25.6 26.8 26.64 25.92 26.88 24.76L28.88 14.76C29.2 13.28 28.08 12 26.56 12H28ZM28 12H18.4H14V26.8M6 12H2V26.8H6V12Z" fill="#FBFFCF"/>
    </svg>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, md: 3 } }}>
      {/* Why Choose Us Button */}
      <Box sx={{ mb: 2.5, display: 'flex', justifyContent: 'flex-start' }}>
        <Box
          component="button"
          sx={{
            border: '1px solid #0E2A2F',
            borderRadius: '50px',
            py: 1,
            px: 3,
            color: '#0E2A2F',
            fontWeight: 600,
            fontSize: '0.85rem',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(14, 42, 47, 0.05)'
            }
          }}
        >
          WHY CHOOSE US?
        </Box>
      </Box>

      {/* Main Heading */}
      <Typography 
        variant="h3" 
        sx={{ 
          color: '#0E2A2F', 
          fontWeight: 600,
          fontSize: { xs: '1.8rem', md: '2.25rem' },
          mb: 4,
          lineHeight: 1.2
        }}
      >
        Why <Box component="span" sx={{ color: theme.palette.primary.main }}>FreshBox Pro</Box> is The Right Choice for You?
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2.5}>
            {/* No Hidden Fees Card */}
            <Grid item xs={12} sm={6}>
              <Box 
                sx={{ 
                  backgroundColor: theme.palette.primary.main, 
                  borderRadius: 3, 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ 
                  color: '#0E2A2F', 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <DollarIcon />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#0E2A2F', 
                    fontWeight: 600, 
                    mb: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  No Hidden Fees
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#0E2A2F', 
                    fontSize: '0.85rem',
                    lineHeight: 1.5
                  }}
                >
                  We believe in complete transparency. Our pricing is clearly based on the weight or number of items—no confusing charges or unexpected costs. What you see is exactly what you pay, with no surprises—just honest, upfront value every time.
                </Typography>
              </Box>
            </Grid>

            {/* Contactless Service Card */}
            <Grid item xs={12} sm={6}>
              <Box 
                sx={{ 
                  backgroundColor: theme.palette.primary.main, 
                  borderRadius: 3, 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ 
                  color: '#0E2A2F', 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <CheckIcon />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#0E2A2F', 
                    fontWeight: 600, 
                    mb: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  Contactless Service
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#0E2A2F',
                    fontSize: '0.85rem',
                    lineHeight: 1.5
                  }}
                >
                  Our Contactless Service offers safe, hassle-free pickup and delivery right at your doorstep. Enjoy the convenience of having your items collected and delivered without any direct contact, ensuring a seamless and secure experience from start to finish.
                </Typography>
              </Box>
            </Grid>

            {/* Customizable Preferences Card */}
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 3, 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ 
                  color: '#0E2A2F', 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <SettingsIcon />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#0E2A2F', 
                    fontWeight: 600, 
                    mb: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  Customizable Preferences
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#0E2A2F',
                    fontSize: '0.85rem',
                    lineHeight: 1.5
                  }}
                >
                  Our Customizable Preferences allow you to tailor your service to your exact needs. Whether it's choosing your preferred detergent, fabric softener, or folding style, we ensure that every detail is personalized to fit your preferences. Enjoy a more convenient and personalized experience, with every order carefully handled just the way you like it.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* 100% Satisfaction Card that spans full height */}
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              backgroundColor: '#0E2A2F', 
              borderRadius: 3, 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ 
              color: '#FBFFCF', 
              mb: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
              <ThumbsUpIcon />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#FBFFCF', 
                fontWeight: 'bolder', 
                mb: 1.5,
                fontSize: '1.7rem'
              }}
            >
              100% Satisfaction <br/>Guarantee
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#FBFFCF',
                mb: 5,
                fontSize: '0.85rem',
                lineHeight: 1.7
                
                
              }}
            >
              Our Customizable Preferences allow you to tailor your service to your exact needs. Whether it's choosing your preferred detergent, fabric softener, or folding style, we ensure that every detail is personalized to fit your preferences. Enjoy a more convenient and personalized experience, with every order carefully handled just the way you like it.
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#FBFFCF',
                mt: 5,
                fontSize: '0.85rem',
                lineHeight: 1.5
              }}
            >
              Join thousands of happy customers who have simplified their laundry routine
            </Typography>
            
            <Box sx={{ mt: 'auto' }}>
              <Button 
              disableElevation
                variant="contained" 
                onClick={() => router.push('/support')}
                sx={{ 
                  bgcolor: '#FBFFCF', 
                  color: '#0E2A2F',
                  '&:hover': {
                    bgcolor: '#e9edbf'
                  },
                  textTransform: 'none',
                  px: 2,
                  py: 0.75,
                  borderRadius: 1,
                  fontWeight: 500,
                  fontSize: '0.85rem'
                }}
              >
                Get Started →
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WhyChooseUs;