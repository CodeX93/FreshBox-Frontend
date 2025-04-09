'use client';

import React,{ useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Button,
  Card,
  CardContent,
  Divider,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Grid,
  useMediaQuery
} from '@mui/material';

import { 
  HomeWork as AirbnbIcon,
  AccessTime as FastTurnaroundIcon,
  LocalLaundryService as LaundryIcon,
  People as GuestsIcon,
  Autorenew as RenewalIcon,
  MonetizationOn as ProfitIcon,
  Star as RatingIcon,
  CheckCircle as CheckIcon,
  Calculate as CalculateIcon,
  Schedule as ScheduleIcon,
  Inventory as InventoryIcon,
  LocalShipping as DeliveryIcon
} from '@mui/icons-material';
import { motion, useAnimation, useInView } from 'framer-motion';

// Define constants
const TURQUOISE = '#2E7B5C';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

export default function AirbnbLaundrySection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 70,
        damping: 14,
        delay: custom * 0.1 + 0.2
      }
    })
  };
  
  // Pricing tiers
  const pricingTiers = [
    {
      title: "Basic",
      price: "$2.50",
      unit: "per pound",
      features: [
        "Wash & Fold Service",
        "48-Hour Turnaround",
        "Scheduled Pickups",
        "Basic Inventory Tracking"
      ],
      isPopular: false
    },
    {
      title: "Premium",
      price: "$3.50",
      unit: "per pound",
      features: [
        "Premium Wash & Fold",
        "24-Hour Turnaround",
        "Priority Scheduling",
        "Advanced Inventory System",
        "Stain Treatment",
        "Fragrance Options"
      ],
      isPopular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      unit: "pricing",
      features: [
        "Custom Service Package",
        "Express Turnaround",
        "Dedicated Account Manager",
        "Full-Service Management",
        "Multiple Property Support",
        "Seasonal Storage"
      ],
      isPopular: false
    }
  ];
  
  // Benefits
  const benefits = [
    {
      icon: <FastTurnaroundIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Quick Turnaround",
      description: "Fast service for between-guest changeovers ensuring your property is always ready."
    },
    {
      icon: <LaundryIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Premium Finish",
      description: "Hotel-quality finish that impresses guests and leads to better reviews."
    },
    {
      icon: <GuestsIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Guest Satisfaction",
      description: "Fresh, clean linens consistently contribute to 5-star guest experiences."
    },
    {
      icon: <RenewalIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Linen Longevity",
      description: "Professional care extends the life of your textiles, saving you money."
    }
  ];
  
  // Special features
  const specialFeatures = [
    {
      icon: <CalculateIcon />,
      title: "Volume-Based Pricing",
      description: "Pay only for what you need with transparent pricing based on your actual usage."
    },
    {
      icon: <ScheduleIcon />,
      title: "Flexible Scheduling",
      description: "Schedule pickups around your guest check-ins and check-outs for maximum convenience."
    },
    {
      icon: <InventoryIcon />,
      title: "Inventory Management",
      description: "Our tracking system ensures you always know where your linens are and when they'll be ready."
    },
    {
      icon: <DeliveryIcon />,
      title: "Free Delivery",
      description: "No additional fees for pickup and delivery to your rental properties."
    }
  ];
  
  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Airbnb Superhost",
      comment: "FreshBox has been a game-changer for my 5 Airbnb properties. My guests consistently mention the fresh linens in their 5-star reviews.",
      initials: "SJ",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Vacation Rental Owner",
      comment: "The pickup and delivery service saves me hours every week. The quality is exceptional and my properties always look professional.",
      initials: "MR",
      rating: 5
    }
  ];
  
  return (
    <Box 
      ref={ref}
      sx={{ 
        minHeight: { xs: 'auto', md: 'auto' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#f5f7fa', // Light background color for the section
        position: 'relative',
        py: { xs: 4, sm: 6, md: 8 }
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 } // Added horizontal padding
        }}
      >
        <MotionBox
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Section header card - Boxed */}
          <MotionCard
            elevation={1}
            variants={itemVariants}
            sx={{ 
              borderRadius: 3,
              mb: 3,
              overflow: 'hidden',
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
            }}
          >
            <Box sx={{ 
              p: { xs: 2, sm: 3 },
              background: `linear-gradient(135deg, ${TURQUOISE}10, ${TURQUOISE}20)`,
              position: 'relative'
            }}>
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: { xs: 50, sm: 60 },
                    height: { xs: 50, sm: 60 },
                    borderRadius: '50%',
                    bgcolor: 'rgba(40,221,205,0.2)',
                    mr: { xs: 0, sm: 2 },
                    mb: { xs: 1.5, sm: 0 }
                  }}
                >
                  <AirbnbIcon sx={{ color: TURQUOISE, fontSize: { xs: 25, sm: 30 } }} />
                </Box>
                
                <Box>
                  <MotionTypography
                    variant="h3"
                    component="h2"
                    variants={itemVariants}
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2.2rem' },
                      lineHeight: 1.2
                    }}
                  >
                    Airbnb & Vacation Rental Laundry
                  </MotionTypography>
                  
                  <MotionTypography
                    variant="h6"
                    color="text.secondary"
                    variants={itemVariants}
                    sx={{ 
                      fontWeight: 400,
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                    }}
                  >
                    Keep your properties pristine and your guests happy with specialized solutions
                  </MotionTypography>
                </Box>
              </Box>
            </Box>
          </MotionCard>
          
          {/* Main content - Boxed cards layout */}
          <Grid container spacing={3}>
            {/* Left column */}
            <Grid item xs={12} md={6} lg={4}>
              <MotionCard
                elevation={1}
                variants={itemVariants}
                sx={{ 
                  borderRadius: 3,
                  height: '100%',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  <MotionTypography
                    variant="h5"
                    component="h3"
                    sx={{ 
                      fontWeight: 600,
                      mb: { xs: 1, sm: 2 },
                      color: 'text.primary',
                      fontSize: { xs: '1.1rem', sm: '1.2rem' }
                    }}
                  >
                    Elevate Your Rental Business
                  </MotionTypography>
                  
                  <MotionTypography
                    variant="body1"
                    sx={{ 
                      mb: { xs: 1.5, sm: 2 },
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }
                    }}
                  >
                    For short-term rental hosts, fresh linens and towels are essential to guest satisfaction and 5-star reviews. Our specialized laundry service helps you maintain the highest standards while saving you time and effort.
                  </MotionTypography>
                  
                  <MotionBox
                    variants={cardVariants}
                    custom={2}
                    sx={{ 
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 3,
                      bgcolor: 'rgba(40,221,205,0.1)',
                      border: '1px solid',
                      borderColor: 'rgba(40,221,205,0.2)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: { xs: 1.5, sm: 2 }
                    }}
                  >
                    <ProfitIcon sx={{ 
                      color: TURQUOISE, 
                      fontSize: { xs: 24, sm: 28 }, 
                      mr: 1.5,
                      mt: 0.5
                    }} />
                    <Box>
                      <Typography 
                        variant="body1" 
                        fontWeight={600} 
                        sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      >
                        Increase Your Rental Profit
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                      >
                        Outsourcing laundry saves 5-10 hours per week per property, allowing you to manage more listings and focus on growing your business.
                      </Typography>
                    </Box>
                  </MotionBox>
                  
                  <MotionPaper
                    elevation={0}
                    variants={itemVariants}
                    sx={{ 
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      mb: { xs: 1.5, sm: 2 }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      fontWeight={600} 
                      sx={{ 
                        mb: { xs: 1, sm: 1.5 }, 
                        fontSize: { xs: '0.9rem', sm: '1rem' } 
                      }}
                    >
                      Items We Handle
                    </Typography>
                    
                    <Grid container spacing={1}>
                      {[
                        "Bed Sheets & Pillowcases",
                        "Duvet Covers & Inserts",
                        "Bath, Hand & Face Towels",
                        "Washcloths & Bath Mats",
                        "Kitchen Towels & Dishcloths",
                        "Tablecloths & Napkins",
                        "Throw Blankets & Decorative Pillows",
                        "Curtains & Shower Curtains"
                      ].map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Box
                              sx={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                bgcolor: TURQUOISE,
                                mr: 1,
                                flexShrink: 0
                              }}
                            />
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                lineHeight: 1.3
                              }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </MotionPaper>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    size={isSmallScreen ? "small" : "medium"}
                    sx={{ 
                      bgcolor: TURQUOISE,
                      color: 'white',
                      px: { xs: 2, sm: 3 },
                      py: { xs: 0.75, sm: 1 },
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      '&:hover': { bgcolor: '#20c5b7' }
                    }}
                  >
                    Get Rental Host Pricing
                  </Button>
                </Box>
              </MotionCard>
            </Grid>
            
            {/* Middle column - Benefits & Pricing */}
            <Grid item xs={12} md={6} lg={4}>
              {/* Benefits Card */}
              <MotionCard
                elevation={1}
                variants={itemVariants}
                sx={{ 
                  borderRadius: 3,
                  mb: 3,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  <MotionTypography
                    variant="h5"
                    component="h3"
                    variants={itemVariants}
                    sx={{ 
                      fontWeight: 600,
                      mb: { xs: 1, sm: 2 },
                      fontSize: { xs: '1.1rem', sm: '1.2rem' }
                    }}
                  >
                    Host Benefits
                  </MotionTypography>
                  
                  <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    {benefits.map((benefit, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <MotionCard
                          elevation={0}
                          variants={cardVariants}
                          custom={index}
                          whileHover={{ 
                            y: -5,
                            borderColor: TURQUOISE,
                            transition: { duration: 0.2 }
                          }}
                          sx={{ 
                            p: { xs: 1.5, sm: 2 },
                            height: '100%',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'grey.200',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Box sx={{ 
                              bgcolor: 'rgba(40,221,205,0.1)',
                              borderRadius: '50%',
                              width: { xs: 36, sm: 40 },
                              height: { xs: 36, sm: 40 },
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 1.5,
                              flexShrink: 0
                            }}>
                              {React.cloneElement(benefit.icon, { 
                                sx: { 
                                  color: TURQUOISE, 
                                  fontSize: { xs: 20, sm: 24 } 
                                } 
                              })}
                            </Box>
                            <Box>
                              <Typography
                                variant="body1"
                                component="h5"
                                fontWeight={600}
                                sx={{ 
                                  mb: 0.5, 
                                  fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                }}
                              >
                                {benefit.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                              >
                                {benefit.description}
                              </Typography>
                            </Box>
                          </Box>
                        </MotionCard>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </MotionCard>
              
              {/* Pricing Card */}
              <MotionCard
                elevation={1}
                variants={itemVariants}
                sx={{ 
                  borderRadius: 3,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    fontWeight={600}
                    sx={{ 
                      mb: { xs: 1.5, sm: 2 }, 
                      fontSize: { xs: '0.9rem', sm: '1rem' } 
                    }}
                  >
                    Host Plans & Pricing
                  </Typography>
                  
                  <Grid container spacing={{ xs: 1, sm: 2 }}>
                    {pricingTiers.map((tier, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Box 
                          sx={{
                            borderRadius: 2,
                            p: { xs: 1.25, sm: 1.5 },
                            border: '1px solid',
                            borderColor: tier.isPopular ? TURQUOISE : 'grey.200',
                            height: '100%',
                            position: 'relative',
                            bgcolor: tier.isPopular ? 'rgba(40,221,205,0.05)' : 'transparent'
                          }}
                        >
                          {tier.isPopular && (
                            <Chip
                              label="Popular"
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: -10,
                                right: 10,
                                bgcolor: TURQUOISE,
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem'
                              }}
                            />
                          )}
                          
                          <Typography 
                            variant="h6" 
                            fontWeight={600} 
                            sx={{ 
                              fontSize: { xs: '0.9rem', sm: '1rem' }, 
                              mb: 0.5 
                            }}
                          >
                            {tier.title}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                            <Typography 
                              variant="h6" 
                              fontWeight={700} 
                              sx={{ 
                                color: TURQUOISE, 
                                fontSize: { xs: '1.1rem', sm: '1.2rem' } 
                              }}
                            >
                              {tier.price}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                ml: 0.5, 
                                fontSize: { xs: '0.65rem', sm: '0.7rem' } 
                              }}
                            >
                              {tier.unit}
                            </Typography>
                          </Box>
                          
                          <Divider sx={{ mb: 1 }} />
                          
                          <List dense disablePadding>
                            {tier.features.slice(0, 4).map((feature, idx) => (
                              <ListItem key={idx} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                  <CheckIcon sx={{ color: TURQUOISE, fontSize: 16 }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={feature} 
                                  primaryTypographyProps={{ 
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' } 
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </MotionCard>
            </Grid>
            
            {/* Right column - Features & Testimonials */}
            <Grid item xs={12} md={12} lg={4}>
              <Grid container spacing={3}>
                {/* Special Features Card */}
                <Grid item xs={12} md={6} lg={12}>
                  <MotionCard
                    elevation={1}
                    variants={itemVariants}
                    sx={{ 
                      borderRadius: 3,
                      height: '100%',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                      background: `linear-gradient(135deg, ${TURQUOISE}05, ${TURQUOISE}15)`
                    }}
                  >
                    <Box sx={{ p: { xs: 2, sm: 3 } }}>
                      <Typography 
                        variant="h6" 
                        fontWeight={600} 
                        sx={{ 
                          mb: { xs: 1, sm: 1.5 }, 
                          fontSize: { xs: '0.9rem', sm: '1rem' } 
                        }}
                      >
                        Special Features
                      </Typography>
                      
                      {specialFeatures.map((feature, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            mb: { xs: 1, sm: 1.5 }, 
                            display: 'flex', 
                            alignItems: 'flex-start' 
                          }}
                        >
                          <Box sx={{ 
                            color: TURQUOISE, 
                            mr: 1,
                            mt: 0.3,
                            fontSize: { xs: 18, sm: 20 }
                          }}>
                            {React.cloneElement(feature.icon, { 
                              sx: { fontSize: 'inherit' } 
                            })}
                          </Box>
                          <Box>
                            <Typography 
                              variant="body1" 
                              fontWeight={600} 
                              sx={{ 
                                fontSize: { xs: '0.8rem', sm: '0.85rem' }, 
                                mb: 0.2 
                              }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                            >
                              {feature.description}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </MotionCard>
                </Grid>
                
                {/* Testimonial Card */}
                <Grid item xs={12} md={6} lg={12}>
                  <MotionCard
                    elevation={1}
                    variants={itemVariants}
                    sx={{ 
                      borderRadius: 3,
                      height: '100%',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
                    }}
                  >
                    <Box sx={{ p: { xs: 2, sm: 3 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <RatingIcon sx={{ 
                          color: TURQUOISE, 
                          mr: 1, 
                          fontSize: { xs: 16, sm: 18 } 
                        }} />
                        <Typography 
                          variant="h6" 
                          fontWeight={600} 
                          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                        >
                          Host Testimonials
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ mb: 2 }} />
                      
                      {testimonials.map((testimonial, idx) => (
                        <Box 
                          key={idx} 
                          sx={{ 
                            mb: idx < testimonials.length - 1 ? 3 : 0,
                            p: 1.5,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'rgba(0,0,0,0.08)',
                            background: 'white'
                          }}
                        >
                          <Box sx={{ display: 'flex', mb: 1 }}>
                            {Array(testimonial.rating).fill().map((_, i) => (
                              <Box
                                key={i}
                                component="span"
                                sx={{
                                  color: '#FFD700',
                                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                  mr: 0.2
                                }}
                              >
                                ★
                              </Box>
                            ))}
                          </Box>
                        
                          <Typography
                            variant="body2"
                            sx={{
                              fontStyle: 'italic',
                              mb: 1.5,
                              fontSize: { xs: '0.8rem', sm: '0.85rem' },
                              lineHeight: 1.4
                            }}
                          >
                            "{testimonial.comment}"
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                bgcolor: TURQUOISE,
                                width: { xs: 24, sm: 28 },
                                height: { xs: 24, sm: 28 },
                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                mr: 1
                              }}
                            >
                              {testimonial.initials}
                            </Avatar>
                            <Box>
                              <Typography 
                                variant="body2" 
                                fontWeight={600} 
                                sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                              >
                                {testimonial.name}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}
                              >
                                {testimonial.role}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </MotionCard>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Bottom CTA card */}
            <Grid item xs={12}>
              <MotionCard
                elevation={2}
                variants={itemVariants}
                sx={{
                  mt: { xs: 1, sm: 2 },
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
                }}
              >
                <Box sx={{ 
                  p: { xs: 2, sm: 3 },
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: { xs: 1.5, sm: 2 }
                }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight={600} 
                      sx={{ 
                        mb: 0.5, 
                        fontSize: { xs: '0.9rem', sm: '1rem' } 
                      }}
                    >
                      Ready to simplify your rental laundry operations?
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        mb: { xs: 1, sm: 0 }
                      }}
                    >
                      Let us handle the laundry while you focus on growing your rental business and keeping guests happy.
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1, sm: 2 }, 
                    flexWrap: 'wrap', 
                    justifyContent: { xs: 'center', sm: 'flex-end' },
                    width: { xs: '100%', sm: 'auto' }
                  }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ 
                        bgcolor: TURQUOISE,
                        color: 'white',
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.6, sm: 0.8 },
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        '&:hover': { bgcolor: '#20c5b7' }
                      }}
                    >
                      Schedule Pickup
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ 
                        color: TURQUOISE,
                        borderColor: TURQUOISE,
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.6, sm: 0.8 },
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        '&:hover': { 
                          borderColor: TURQUOISE,
                          bgcolor: 'transparent'
                        }
                      }}
                    >
                      Contact Sales
                    </Button>
                  </Box>
                </Box>
              </MotionCard>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}
                  