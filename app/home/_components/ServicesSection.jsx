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
  useMediaQuery,
  useTheme
} from '@mui/material';
import {theme} from "../../../contexts/Theme"
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
        borderRadius: 3, 
        mb: 2, 
        bgcolor: theme.palette.primary.main,
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Box 
            sx={{ 
              mr: 2,
              bgcolor: theme.palette.primary.darkBlue,
              width: 56,
              height: 56,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {/* Shirt/clothing icon SVG */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 7L17.5 3.5H10.5L7 7L3.5 10.5V24.5H24.5V10.5L21 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Box>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.primary.darkBlue,
                fontWeight: 600,
                fontSize: '1.25rem',
                mb: 0.5
              }}
            >
              {service.name}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block', 
                color: theme.palette.primary.darkBlue,
                mb: 1,
                fontSize: '0.75rem'
              }}
            >
              {service.serviceLabel}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.primary.darkBlue,
                lineHeight: 1.5,
                fontSize: '0.875rem',
                opacity: 0.85
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
  // const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ bgcolor: '#0E2A2F', minHeight: '100vh', py: 5, px: { xs: 2, sm: 4 } }}>
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {/* Top Section */}
        <Grid container spacing={3}>
          {/* Left Card */}
          <Grid item xs={12} md={5} lg={5}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 3, 
                bgcolor: theme.palette.primary.main,
                p: 4, 
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
                    color: theme.palette.primary.darkBlue,
                    fontWeight: 700, 
                    mb: 2,
                    fontSize: { xs: '1.75rem', md: '2rem' }
                  }}
                >
                  FreshBox Care
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#1E3A37', 
                    mb: 4,
                    lineHeight: 1.6,
                    fontSize: '1rem'
                  }}
                >
                  Your clothes are treated with the utmost care, receiving the attention they deserve.
                </Typography>
                <Button 
                disableElevation
                  variant="contained" 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    bgcolor: '#1E3A37', 
                    color: '#E3FEF7', 
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontSize: '0.9rem',
                    fontWeight: 500,
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
                  color: '#1E3A37', 
                  mt: 6,
                  fontSize: '0.875rem',
                  opacity: 0.85
                }}
              >
                Our minimum order value is $35. All orders include free delivery.
              </Typography>
            </Card>
          </Grid>
          
          {/* Right Services */}
          <Grid item xs={12} md={7} lg={7}>
            <Box>
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
        
      {/* Bottom Call-to-Action Section */}
      <Container maxWidth="lg">
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            bgcolor: theme.palette.primary.main,
            overflow: 'hidden',
            width: '100%',
            boxShadow: 'none',
            mb: 4
          }}
        >
          <Grid container>
            <Grid item xs={12} md={7} sx={{ 
              p: { xs: 4, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#1E3A37',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  lineHeight: 1.2
                }}
              >
                Ready to experience our<br/>premium cleaning services?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#1E3A37',
                  mb: 4,
                  maxWidth: '90%',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  lineHeight: 1.6,
                  opacity: 0.85
                }}
              >
                We take pride in delivering top-tier cleaning services that leave your home or office spotless. Experience the difference of professional cleaning tailored to your needs.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                disableElevation
                  variant="contained"
                  sx={{
                    bgcolor: '#1E3A37',
                    color: 'white',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    py: 1,
                    px: 2.5,
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: '#132a27'
                    }
                  }}
                >
                  Schedule Your Cleaning Today
                </Button>
                <Button
                disableElevation
                  variant="outlined"
                  sx={{
                    borderColor: '#1E3A37',
                    color: '#1E3A37',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    py: 1,
                    px: 2.5,
                    borderRadius: 1,
                    '&:hover': {
                      borderColor: '#1E3A37',
                      bgcolor: 'rgba(30, 58, 55, 0.05)'
                    }
                  }}
                >
                  Learn more
                </Button>
              </Box>
            </Grid>
            <Grid item md={5} sx={{ 
              display: { xs: 'none', md: 'block' },
              position: 'relative'
            }}>
              {/* Using the image URL provided */}
              <Box
                component="img"
                src="https://s3-alpha-sig.figma.com/img/ace5/cac0/472bcef1b8e75f1b868b72d9fd21fddc?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s2yNED0O5TXaZlBWVDDEobbSHZX56vczB2hrOa6h2BztL6QuWHXKqCPZL0uIsTz8PbzQ1h~cLS7DfIeOfGdw17FOscJQP8pglHlm78sMpKdq5zrLg2vXOf5lBBF93QiJyeJW~XnDiSF7GoZzPpw-QkoRVde7BvJUjrzl7f3pJZP8-Hrqyd8~lTfJbJ0iP1dLIkLLt3xVZ2tvuNXGrTTyTobyNhEdnQTvXdaPBMtwhfTzcO7E6HiGN8d7LHzY23KA47CNSLfWuUaBcZjtBwxZXruxbqMn6P2L4KN2SCbZn-8HrlvrIKvc4C8BRpCZ8GputPpHxNfEGkZ7~8vGNloHkw__"
                alt="Folded colorful laundry"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default ServicesSection;