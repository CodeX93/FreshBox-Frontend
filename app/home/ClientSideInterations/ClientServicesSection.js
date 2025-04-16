'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  useTheme, 
  useMediaQuery,
  Button,
  Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';

// Feature item with checkmark
const FeatureItem = ({ text }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderRadius: '50%',
        bgcolor: '#0F3034',
        mr: 1,
      }}
    >
      <CheckIcon sx={{ color: 'white', fontSize: '0.8rem' }} />
    </Box>
    <Typography 
      variant="body2" 
      sx={{ 
        color: '#0F3034', 
        fontWeight: 500,
        fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
        lineHeight: 1.3
      }}
    >
      {text}
    </Typography>
  </Box>
);

// Testimonial Card Component
const TestimonialCard = () => (
  <Card 
    elevation={0} 
    sx={{ 
      bgcolor: '#0F3034', 
      borderRadius: '8px',
      p: 1,
      height: '100%',
    }}
  >
    <Box sx={{ display: 'flex', mb: 0.25 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon 
          key={star} 
          sx={{ 
            color: '#FFD700', 
            fontSize: '0.7rem',
            mr: 0.1
          }} 
        />
      ))}
    </Box>

    <Typography 
      variant="subtitle2" 
      sx={{ 
        color: 'white', 
        fontWeight: 600,
        fontSize: '0.8rem',
        mb: 0.25
      }}
    >
      Michael T
    </Typography>

    <Typography 
      variant="caption" 
      sx={{ 
        color: 'white',
        fontSize: '0.7rem',
        lineHeight: 1.3,
        display: 'block'
      }}
    >
      "The convenience of LaundryHeap has completely changed my weekly routine. I get so much time back!"
    </Typography>
  </Card>
);

// Main benefit card component
const BenefitCard = ({ icon, title, description }) => (
  <Box sx={{ mb: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <Typography 
        component="span" 
        sx={{ 
          mr: 1, 
          color: '#0F3034', 
          fontSize: { xs: '1.2rem', sm: '1.3rem' },
          mt: '-2px',
          display: 'inline-block'
        }}
      >
        {icon}
      </Typography>
      <Box>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: '#0F3034', 
            fontWeight: 600,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            lineHeight: 1.3
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#0F3034',
            lineHeight: 1.3,
            fontSize: { xs: '0.75rem', sm: '0.8rem' }
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  </Box>
);

// Main component
const ClientQualityPromiseSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Features list
  const features = [
    "Eco-friendly cleaning processes and detergents",
    "Expert handling of delicate fabrics and special care items",
    "Reliable pickup and delivery scheduling",
    "Satisfaction guarantee on all services",
    "Transparent pricing with no hidden fees"
  ];

  // Benefits items
  const benefits = [
    {
      icon: "✋",
      title: "Reliable & Protected Handling",
      description: "Our skilled team carefully handles your items, guaranteeing top-tier protection and safety at every step."
    },
    {
      icon: "✋",
      title: "10 Years of Trusted Service",
      description: "Thousands trust us for our consistent, reliable service worldwide backed by a decade of expertise."
    },
    {
      icon: "✋",
      title: "Exceptional Care, Always",
      description: "Each item is cleaned with precision, using methods that maintain and protect your garment's quality."
    }
  ];

  return (
    <Box sx={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg" sx={{ height: '100%', px: { xs: 2, sm: 3 } }}>
        <Stack 
          spacing={2} 
          sx={{ 
            height: '100%', 
            py: { xs: 2, sm: 3 }, 
            justifyContent: 'space-between'
          }}
        >
          {/* Benefits Section - Top Row */}
          <Box>
            <Grid container spacing={2}>
              {benefits.map((benefit, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <BenefitCard 
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Quality Promise Section - Middle */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid container spacing={2}>
              {/* Left side: Quality Promise */}
              <Grid item xs={12} md={7}>
                <Box 
                  sx={{ 
                    bgcolor: '#C8FFE3', 
                    borderRadius: '10px',
                    p: { xs: 2, sm: 2.5 },
                    height: '100%'
                  }}
                >
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    sx={{ 
                      color: '#0F3034', 
                      fontWeight: 700,
                      fontSize: { xs: '1.4rem', sm: '1.6rem' },
                      mb: 1
                    }}
                  >
                    Our Quality Promise
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#0F3034',
                      mb: 1.5,
                      fontSize: { xs: '0.8rem', sm: '0.85rem' }
                    }}
                  >
                    At FreshBox, we're committed to providing the highest quality laundry and dry cleaning services available.
                  </Typography>
                  
                  {features.map((feature, index) => (
                    <FeatureItem key={index} text={feature} />
                  ))}
                </Box>
              </Grid>
              
              {/* Right side: Testimonials grid */}
              <Grid item xs={12} md={5}>
                <Grid container spacing={1}>
                  {/* Create 2x3 grid of testimonials */}
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Grid item xs={6} key={index}>
                      <TestimonialCard />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Why Choose Us Button - Bottom */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
            disableElevation
              variant="outlined"
              sx={{
                border: '2px solid #0F3034',
                borderRadius: '50px',
                py: { xs: 0.75, sm: 1 },
                px: { xs: 2, sm: 3 },
                color: '#0F3034',
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                '&:hover': {
                  backgroundColor: 'rgba(15, 48, 52, 0.05)',
                  borderColor: '#0F3034',
                }
              }}
            >
              WHY CHOOSE US?
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ClientQualityPromiseSection;