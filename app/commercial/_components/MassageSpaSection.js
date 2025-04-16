import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
  Divider,
  Paper,
} from '@mui/material';
import {theme} from "../../../contexts/Theme"
import { 
  Spa as MassageSpaIcon,
  CheckCircle as CheckIcon,
  LocalLaundryService as LaundryIcon,
  Healing as HealingIcon,
  AccessTime as TimeIcon,
  MonetizationOn as MoneyIcon,
  Inventory as InventoryIcon,
  EnergySavingsLeaf as EcoIcon,
  SentimentSatisfied as SatisfactionIcon
} from '@mui/icons-material';

const MassageSpaSection = () => {
  const darkBlueColor = theme.palette.primary.darkBlue;
  const primaryColor = theme.palette.primary.main;
  const whitishMint = theme.palette.primary.whitishMint;
  const yellowishColor = theme.palette.primary.yellowish;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Benefits data
  const benefits = [
    {
      icon: <TimeIcon />,
      title: "Save Time",
      description: "Focus on clients while we handle your laundry needs with professional care."
    },
    {
      icon: <MoneyIcon />,
      title: "Reduce Costs",
      description: "Lower utility bills and maintenance expenses by outsourcing your laundry services."
    },
    {
      icon: <EcoIcon />,
      title: "Eco-Friendly",
      description: "Sustainable practices aligned with wellness values, reducing your environmental impact."
    },
    {
      icon: <SatisfactionIcon />,
      title: "Enhanced Experience",
      description: "Fresh, clean linens elevate the client experience and reflect your quality standards."
    }
  ];
  
  // Features data
  const features = [
    {
      icon: <CheckIcon />,
      title: "Premium Fabric Care",
      description: "Special care for luxury cotton and high-end spa textiles."
    },
    {
      icon: <HealingIcon />,
      title: "Hygienic Process",
      description: "Medical-grade sanitization ensuring client safety and comfort."
    },
    {
      icon: <InventoryIcon />,
      title: "Stain Expertise",
      description: "Specialized removal of oils and products without damaging fabrics."
    },
    {
      icon: <LaundryIcon />,
      title: "Neutral Scent",
      description: "Fresh, neutral finish that won't interfere with your aromatherapy experience."
    }
  ];

  // Items we service data
  const serviceItems = [
    "Massage table sheets",
    "Face cradle covers",
    "Bath & hand towels",
    "Spa robes",
    "Hot stone pouches",
    "Treatment covers",
    "Blankets"
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
      
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 1 }}>
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
            Massage & Spa Laundry Services
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
            Specialized cleaning for massage sheets, spa towels, and wellness linens. Premium care for your premium business.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
            disableElevation
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
            disableElevation
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

        {/* Combined Benefits and Features Section */}
        <Grid container spacing={3}>
          {/* Benefits Column */}
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
              Benefits for Your Spa
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
          
          {/* Why Choose Us Column */}
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
                Premium Spa Laundry Features
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
          
          {/* Items We Service Section */}
          <Grid item xs={12}>
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${primaryColor}30`,
                bgcolor: `${whitishMint}`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                  fontWeight: 700,
                  color: darkBlueColor,
                  mb: 3,
                  textAlign: 'center',
                  position: 'relative',
                  display: 'inline-block',
                  width: '100%',
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
                Spa Items We Service
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {serviceItems.map((item, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: `${primaryColor}10`,
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: `${primaryColor}20`,
                          transform: 'translateY(-4px)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: primaryColor,
                          flexShrink: 0
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          fontWeight: 500,
                          color: darkBlueColor
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                disableElevation
                  variant="contained"
                  sx={{
                    bgcolor: darkBlueColor,
                    color: whitishMint,
                    px: { xs: 3, sm: 4 },
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
                  Schedule a Pickup
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MassageSpaSection;