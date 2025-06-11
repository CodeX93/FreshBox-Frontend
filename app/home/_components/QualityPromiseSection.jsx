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
  Avatar 
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';

// Feature items with icon
const FeatureItem = ({ text }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <CheckCircleOutlineIcon 
        sx={{ 
          color: '#2E7B5C', 
          mr: 1.5, 
          fontSize: '1.3rem',
          mt: 0.3
        }} 
      />
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#333', 
          fontWeight: 500,
          fontSize: '1rem',
          lineHeight: 1.4
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

// Testimonial Card Component
const TestimonialCard = () => {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        bgcolor: '#0F3034', 
        borderRadius: '8px',
        mb: 2,
        p: 2
      }}
    >
      <Box sx={{ display: 'flex', mb: 1 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon 
            key={star} 
            sx={{ 
              color: '#FFD700', 
              fontSize: '1.1rem',
              mr: 0.3
            }} 
          />
        ))}
      </Box>

      <Typography 
        variant="h6" 
        sx={{ 
          color: 'white', 
          fontWeight: 600,
          fontSize: '1.1rem',
          mb: 0.5
        }}
      >
        Michael T
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ 
          color: 'white',
          fontSize: '0.85rem',
          lineHeight: 1.5
        }}
      >
        "The convenience of FreshBox has completely changed my weekly routine. I get so much time back!"
      </Typography>
    </Card>
  );
};

// Main benefit card component
const BenefitCard = ({ icon, title, description }) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Box component="span" sx={{ mr: 2, color: '#003C43', fontSize: '1.8rem' }}>
          {icon}
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#003C43', 
            fontWeight: 'bolder' 
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#333',
          lineHeight: 1.6
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

// Main component
const QualityPromiseSection = () => {
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
      icon: <span style={{ color: '#003C43', fontSize: '1.5rem' }}>✋</span>,
      title: "Reliable & Protected Handling",
      description: "Our skilled team carefully handles your items, guaranteeing top-tier protection and safety at every step."
    },
    {
      icon: <span style={{ color: '#003C43', fontSize: '1.5rem' }}>✋</span>,
      title: "10 Years of Trusted Service",
      description: "Thousands trust us for our consistent, reliable service worldwide backed by a decade of expertise."
    },
    {
      icon: <span style={{ color: '#003C43', fontSize: '1.5rem' }}>✋</span>,
      title: "Exceptional Care, Always",
      description: "Each item is cleaned with precision, using methods that maintain and protect your garment's quality."
    }
  ];
  

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Benefits Section */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
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

      {/* Quality Promise Section */}
      <Grid container spacing={3}>
        {/* Left side: Quality Promise */}
        <Grid item xs={12} md={7}>
          <Box 
            sx={{ 
              bgcolor: '#94FFD4', 
              borderRadius: '10px',
              p: { xs: 3, md: 4 },
              height: '100%'
            }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                color: '#0F3034', 
                fontWeight: 700,
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                mb: 2
              }}
            >
              What our Customers have to say
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#0F3034',
                mb: 4,
                fontSize: '1.1rem',
                maxWidth: '90%'
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
          <Grid container spacing={2}>
            {/* Create 2x3 grid of testimonials */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TestimonialCard />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

     
    </Container>
  );
};

export default QualityPromiseSection;