"use client"
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Button,
  SvgIcon
} from '@mui/material';
import { useRouter } from 'next/navigation';

const WhyChooseUs = () => {
  const router = useRouter();

  // Custom icons using SvgIcon
  const DollarIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </SvgIcon>
  );

  const CheckIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </SvgIcon>
  );

  const SettingsIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.38.12-.58l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.22-.07.47.12.58l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.38-.12.58l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.58l-2.03-1.58z"/>
    </SvgIcon>
  );

  const ThumbsUpIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
    </SvgIcon>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
       {/* Why Choose Us Button */}
       <Box sx={{ mb:2 }}>
        <Box
          component="button"
          sx={{
            border: '3px solid #0F3034',
            borderRadius: '50px',
            py: 1.5,
            px: 4,
            color: '#0F3034',
            fontWeight: 'bolder',
            fontSize: '1.1rem',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(15, 48, 52, 0.05)'
            }
          }}
        >
          WHY CHOOSE US?
        </Box>
      </Box>
      <Box textAlign="center" mb={4}>
     
        <Typography 
          variant="h2" 
          sx={{ 
            color: '#213B25', 
            fontWeight: 700,
            fontSize: '2.5rem',
            mb: 2 
          }}
        >
          Why <Box component="span" sx={{color: '#94FFD4'}}>FreshBox Pro</Box> is The Right Choice for You?
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* No Hidden Fees Card */}
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              backgroundColor: '#94FFD4', 
              borderRadius: 2, 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ 
              color: '#003C43', 
              mb: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
              <DollarIcon sx={{ fontSize: 48 }} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#003C43', 
                fontWeight: 600, 
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              No Hidden Fees
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#003C43', 
                opacity: 0.8 
              }}
            >
              We believe in complete transparency. Our pricing is clearly based on the weight or number of items—no confusing charges or unexpected costs. What you see is exactly what you pay, with no surprises—just honest, upfront value every time.
            </Typography>
          </Box>
        </Grid>

        {/* Contactless Service Card */}
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              backgroundColor: '#94FFD4', 
              borderRadius: 2, 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ 
              color: '#003C43', 
              mb: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
              <CheckIcon sx={{ fontSize: 48 }} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#003C43', 
                fontWeight: 600, 
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              Contactless Service
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#003C43', 
                opacity: 0.8 
              }}
            >
              Our Contactless Service offers safe, hassle-free pickup and delivery right at your doorstep. Enjoy the convenience of having your items collected and delivered without any direct contact, ensuring a seamless and secure experience from start to finish.
            </Typography>
          </Box>
        </Grid>

        {/* Customizable Preferences Card - Double Height */}
        <Grid item xs={12} md={8}>
          <Box 
            sx={{ 
              backgroundColor: '#94FFD4', 
              borderRadius: 2, 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ 
              color: '#003C43', 
              mb: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
              <SettingsIcon sx={{ fontSize: 48 }} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#003C43', 
                fontWeight: 600, 
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              Customizable Preferences
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#003C43', 
                opacity: 0.8 
              }}
            >
              Our Customizable Preferences allow you to tailor your service to your exact needs. Whether it's choosing your preferred detergent, fabric softener, or folding style, we ensure that every detail is personalized to fit your preferences. Enjoy a more convenient and personalized experience, with every order carefully handled just the way you like it.
            </Typography>
          </Box>
        </Grid>

        {/* 100% Satisfaction Card - Double Width */}
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              backgroundColor: '#003C43', 
              borderRadius: 2, 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              color: 'white',
            }}
          >
            <Box sx={{ 
              color: '#FBFFCF', 
              mb: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
              <ThumbsUpIcon sx={{ fontSize: 48, color: 'white' }} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#FBFFCF', 
                fontWeight: 600, 
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              100% Satisfaction Guarantee
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#FBFFCF', 
                mb: 2 
              }}
            >
              Our Customizable Preferences allow you to tailor your service to your exact needs. Whether it's choosing your preferred detergent, fabric softener, or folding style, we ensure that every detail is personalized to fit your preferences.
            </Typography>
            <br/>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#FBFFCF', 
                mb: 2 
              }}
            >
              Join thousands of happy customers who have simplified their laundry routine
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => router.push('/support')}
              sx={{ 
                bgcolor: '#FBFFCF', 
                color: '#213B25',
                '&:hover': {
                  bgcolor: '#f0f0f0'
                },
                textTransform: 'none',
                px: 3,
                py: 1,
                borderRadius: 2,
                fontWeight: 600
              }}
            >
              Get Started
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WhyChooseUs;