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
  Avatar,
  Paper,
} from '@mui/material';
import {theme} from "../../../contexts/Theme"
import { 
  FitnessCenter as GymIcon,
  Timer as TimerIcon,
  LocalLaundryService as LaundryIcon,
  EmojiEvents as TrophyIcon,
  MonetizationOn as MoneyIcon,
  EnergySavingsLeaf as EcoIcon,
  CheckCircle as CheckCircleIcon,
  ThumbUp as ThumbUpIcon
} from '@mui/icons-material';

const GymTowelSection = () => {
  const darkBlueColor = theme.palette.primary.darkBlue;
  const primaryColor = theme.palette.primary.main;
  const whitishMint = theme.palette.primary.whitishMint;
  const yellowishColor = theme.palette.primary.yellowish;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Benefits data
  const benefits = [
    {
      icon: <TimerIcon />,
      title: "Save Time & Resources",
      description: "Free up staff to focus on members while we handle towel cleaning and management."
    },
    {
      icon: <TrophyIcon />,
      title: "Improve Member Experience",
      description: "Fresh, clean towels enhance your facility's professional image and member satisfaction."
    },
    {
      icon: <MoneyIcon />,
      title: "Reduce Operational Costs",
      description: "Lower utility bills and eliminate expenses for laundry equipment and supplies."
    },
    {
      icon: <EcoIcon />,
      title: "Environmentally Friendly",
      description: "Our efficient processes use less water and energy than on-site laundry operations."
    }
  ];
  
  // Features data
  const features = [
    {
      icon: <CheckCircleIcon />,
      title: "Regular Scheduling",
      description: "Reliable pickup and delivery on a schedule that works for your facility."
    },
    {
      icon: <CheckCircleIcon />,
      title: "Volume-Based Pricing",
      description: "Cost-effective rates based on your specific towel usage needs."
    },
    {
      icon: <CheckCircleIcon />,
      title: "Sanitization Process",
      description: "High-temperature washing that eliminates bacteria and odors."
    },
    {
      icon: <CheckCircleIcon />,
      title: "Inventory Management",
      description: "Tracking system to monitor towel inventory and prevent loss."
    }
  ];

  // Facilities we serve
  const facilities = [
    "Fitness Centers",
    "Gyms",
    "Health Clubs",
    "Yoga Studios",
    "CrossFit Boxes",
    "Sports Complexes",
    "Swimming Pools",
    "Tennis Clubs"
  ];

  // Testimonial
  const testimonial = {
    name: "David Miller",
    role: "Fitness Center Manager",
    comment: "FreshBox has eliminated our towel management headaches. Our members love the consistently clean towels, and we've reduced our costs significantly.",
    initials: "DM"
  };

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
            Gym Towel Laundry Service
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
            Professional towel cleaning for fitness centers and athletic facilities. Enhance member experience while reducing operational costs.
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
                borderRadius: '8px',
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
                borderRadius: '8px',
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
              Benefits for Your Fitness Facility
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
          
          {/* Features Column */}
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
                Our Service Features
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
          
          {/* Facilities We Serve */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                mt: { xs: 1, md: 4 },
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
                Fitness Facilities We Serve
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {facilities.map((facility, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
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
                        {facility}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          
          {/* Testimonial */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                mt: { xs: 1, md: 4 },
                p: 3,
                borderRadius: 3,
                bgcolor: darkBlueColor,
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
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
                <ThumbUpIcon sx={{ color: yellowishColor }} /> Facility Testimonial
              </Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                {Array(5).fill().map((_, i) => (
                  <Box 
                    key={i} 
                    component="span" 
                    sx={{ 
                      color: yellowishColor,
                      fontSize: { xs: '1.2rem', sm: '1.4rem' },
                      mr: 0.5
                    }}
                  >
                    ★
                  </Box>
                ))}
              </Box>
              
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                  color: whitishMint,
                  mb: 3,
                  fontStyle: 'italic',
                  lineHeight: 1.6
                }}
              >
                "{testimonial.comment}"
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{ 
                    bgcolor: yellowishColor,
                    color: darkBlueColor,
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    fontWeight: 700,
                    fontSize: { xs: '1rem', sm: '1.2rem' }
                  }}
                >
                  {testimonial.initials}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      fontWeight: 600,
                      color: whitishMint
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      color: `${whitishMint}AA`
                    }}
                  >
                    {testimonial.role}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          {/* Call to Action */}
          <Grid item xs={12}>
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${yellowishColor}50`,
                bgcolor: `${whitishMint}`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={1} sx={{ textAlign: 'center' }}>
                  <GymIcon sx={{ 
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }, 
                    color: darkBlueColor
                  }} />
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                      fontWeight: 700,
                      color: darkBlueColor,
                      mb: 1,
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    Ready to upgrade your gym's towel service?
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      color: 'rgba(0,60,67,0.8)',
                      mb: { xs: 2, md: 0 },
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    Start providing premium, hygienic towels to your members while reducing operational costs and staff workload.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                  <Button
                  disableElevation
                    variant="contained"
                    sx={{
                      bgcolor: darkBlueColor,
                      color: whitishMint,
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.25 },
                      borderRadius: '8px',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: primaryColor,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    Get a Custom Quote
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GymTowelSection;