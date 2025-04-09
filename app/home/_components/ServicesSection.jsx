"use client"
import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Service data exactly matching screenshot
const services = [
  {
    name: "Dry Cleaning",
    description: "Professional care for your delicate garments that require special attention.",
    slug: "dry-cleaning",
    serviceLabel: "Service"
  },
  {
    name: "Wash & Fold",
    description: "Convenient solution for your everyday laundry needs, washed and perfectly folded.",
    slug: "wash-fold",
    serviceLabel: "Service"
  },
  {
    name: "Laundry",
    description: "Custom laundering for shirts, blouses, and other machine-washable garments.",
    slug: "laundry",
    serviceLabel: "Service"
  },
  {
    name: "Household Items",
    description: "Special care for comforters, bedding, table linens, and other home textiles.",
    slug: "household",
    serviceLabel: "Service"
  }
];

// Service Card Component
const ServiceCard = ({ service }) => {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: 2, 
        mb: 2, 
        bgcolor: '#c8ffe3',
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ 
              mr: 2,
              bgcolor: '#183734',
              width: 40,
              height: 40
            }}
          >
            {/* This would be your shirt/clothing icon */}
            <Box 
              sx={{ 
                width: 24, 
                height: 16, 
                bgcolor: 'white', 
                borderRadius: 0.5 
              }}
            />
          </Avatar>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#183734', 
                fontWeight: 500,
                fontSize: '1.1rem'
              }}
            >
              {service.name}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block', 
                color: '#183734', 
                mb: 0.25
              }}
            >
              {service.serviceLabel}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#183734',
                lineHeight: 1.4,
                fontSize: '0.875rem'
              }}
            >
              {service.description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Main Component
const ServicesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ bgcolor: '#0F3034', minHeight: '100vh', p: 3 }}>
      <Container maxWidth="lg">
        {/* Top Section */}
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {/* Left Card */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 2, 
                bgcolor: '#c8ffe3', 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    color: '#183734', 
                    fontWeight: 500, 
                    mb: 1
                  }}
                >
                  FreshBox Care
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#183734', 
                    mb: 3
                  }}
                >
                  Your clothes are treated with the utmost care, receiving the attention they deserve.
                </Typography>
                <Button 
                  variant="contained" 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    bgcolor: '#183734', 
                    color: 'white', 
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#132a27'
                    }
                  }}
                >
                  Explore Pricing
                </Button>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#183734', 
                  mt: 4
                }}
              >
                Our minimum order value is $35. All orders include free delivery.
              </Typography>
            </Card>
          </Grid>
          
          {/* Right Services */}
          <Grid item xs={12} md={6}>
            <Box>
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </Box>
          </Grid>
        </Grid>
        
        {/* Bottom Call-to-Action Section */}
        <Box sx={{ mt: 6 }}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 2, 
              bgcolor: '#c8ffe3', 
              overflow: 'hidden'
            }}
          >
            <Grid container>
              <Grid item xs={12} md={8} sx={{ p: 3 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#183734', 
                    fontWeight: 500, 
                    mb: 1.5
                  }}
                >
                  Ready to experience our premium cleaning services?
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#183734', 
                    mb: 3,
                    maxWidth: '90%'
                  }}
                >
                  We take pride in delivering top-tier cleaning services that leave your home or office spotless. Experience the difference of professional cleaning tailored to your needs.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button 
                    variant="contained" 
                    size="small"
                    sx={{ 
                      bgcolor: '#183734', 
                      color: 'white', 
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      '&:hover': {
                        bgcolor: '#132a27'
                      }
                    }}
                  >
                    Schedule Your Cleaning Today
                  </Button>
                  <Button 
                    variant="contained" 
                    size="small"
                    sx={{ 
                      bgcolor: '#9ef7d5', 
                      color: '#183734', 
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      '&:hover': {
                        bgcolor: '#8ae7c5'
                      }
                    }}
                  >
                    Learn more
                  </Button>
                </Box>
              </Grid>
              {!isMobile && (
                <Grid item md={4} sx={{ display: 'flex' }}>
                  {/* This would be your folded laundry image */}
                  <Box 
                    component="img"
                    src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xlYW5pbmclMjBzZXJ2aWNlfGVufDB8fDB8fHww" 
                    alt="Folded laundry"
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;