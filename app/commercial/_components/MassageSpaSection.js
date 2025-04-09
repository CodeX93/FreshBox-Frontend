'use client';

import React,{ useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Paper,
  Button,
  Card,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
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
import { motion, useAnimation, useInView } from 'framer-motion';

// Define constants
const TURQUOISE = '#2E7B5C';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

export default function MassageSpaSection() {
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
  
  // Benefits (reduced for space)
  const benefits = [
    {
      icon: <TimeIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Save Time",
      description: "Focus on clients while we handle your laundry."
    },
    {
      icon: <MoneyIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Reduce Costs",
      description: "Lower utility bills and maintenance expenses."
    },
    {
      icon: <EcoIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Eco-Friendly",
      description: "Sustainable practices aligned with wellness values."
    }
  ];
  
  // Service features (reduced for space)
  const features = [
    {
      title: "100% Cotton & Luxury Fabrics",
      description: "Special care for premium spa linens."
    },
    {
      title: "Hygienic Cleaning Process",
      description: "Medical-grade sanitization for client safety."
    },
    {
      title: "Stain Removal Expertise",
      description: "Removing oils without damaging fabrics."
    },
    {
      title: "Fresh, Neutral Scent",
      description: "Won't interfere with aromatherapy experience."
    }
  ];
  
  // Items we service (reduced and simplified)
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
                  <MassageSpaIcon sx={{ color: TURQUOISE, fontSize: { xs: 25, sm: 30 } }} />
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
                    Massage & Spa Laundry Services
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
                    Specialized cleaning for massage sheets, spa towels, and wellness linens
                  </MotionTypography>
                </Box>
              </Box>
            </Box>
          </MotionCard>
          
          {/* Main content - Boxed cards layout */}
          <Grid container spacing={3}>
            {/* Left column - Main info */}
            <Grid item xs={12} md={6} lg={5}>
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
                    variant="body1"
                    sx={{ 
                      mb: { xs: 1.5, sm: 2 },
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontSize: { xs: '0.9rem', sm: '0.95rem' }
                    }}
                  >
                    Your spa or wellness business deserves linens that match the quality of your services. Our specialized laundry service understands the unique challenges of spa textiles - from oil stains to essential oil residues - and delivers immaculately clean, soft linens that meet the highest standards.
                  </MotionTypography>
                  
                  <MotionBox
                    variants={itemVariants}
                    sx={{ 
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'rgba(40,221,205,0.3)',
                      bgcolor: 'rgba(40,221,205,0.05)',
                      mb: { xs: 1.5, sm: 2 }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      mb: 1,
                      flexDirection: { xs: 'column', sm: 'row' }
                    }}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: { xs: 0.5, sm: 0 }
                      }}>
                        <HealingIcon sx={{ 
                          color: TURQUOISE, 
                          fontSize: { xs: 20, sm: 22 }, 
                          mr: 1.5,
                          mt: { xs: 0, sm: 0.3 }
                        }} />
                        <Typography 
                          variant="h6" 
                          fontWeight={600} 
                          fontSize={{ xs: '0.9rem', sm: '1rem' }}
                        >
                          Wellness Businesses We Serve
                        </Typography>
                      </Box>
                    </Box>
                    <Grid container spacing={1} sx={{ pl: { xs: 1, sm: 4 } }}>
                      {[
                        "Massage Studios",
                        "Day Spas",
                        "Medical Spas",
                        "Wellness Centers",
                        "Yoga Studios",
                        "Physical Therapy"
                      ].map((business, index) => (
                        <Grid item xs={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                              {business}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </MotionBox>
                  
                  <MotionTypography
                    variant="h6"
                    component="h3"
                    variants={itemVariants}
                    sx={{ 
                      fontWeight: 600,
                      mb: { xs: 1, sm: 1.5 },
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    Premium Services for Spa Linens
                  </MotionTypography>
                  
                  <Grid container spacing={{ xs: 1, sm: 1.5 }}>
                    {features.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <MotionCard
                          elevation={0}
                          variants={cardVariants}
                          custom={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            p: 1.5,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'rgba(0,0,0,0.08)',
                            height: '100%'
                          }}
                        >
                          <Box sx={{ 
                            minWidth: 28,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: 0.3
                          }}>
                            <CheckIcon sx={{ 
                              color: TURQUOISE, 
                              fontSize: { xs: 16, sm: 18 } 
                            }} />
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
                              sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                            >
                              {feature.description}
                            </Typography>
                          </Box>
                        </MotionCard>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </MotionCard>
            </Grid>
            
            {/* Middle & Right columns */}
            <Grid item xs={12} md={6} lg={7}>
              <Grid container spacing={3}>
                {/* Benefits section */}
                <Grid item xs={12} sm={12} md={12} lg={6}>
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
                        variant="h6"
                        component="h3"
                        variants={itemVariants}
                        sx={{ 
                          fontWeight: 600,
                          mb: { xs: 1.5, sm: 2 },
                          fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                      >
                        Benefits for Your Spa Business
                      </MotionTypography>
                      
                      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                        {benefits.map((benefit, index) => (
                          <Grid item xs={12} key={index}>
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
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'grey.200',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Box sx={{ 
                                bgcolor: 'rgba(40,221,205,0.1)',
                                borderRadius: '50%',
                                width: { xs: 32, sm: 36 },
                                height: { xs: 32, sm: 36 },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
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
                                  sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                                >
                                  {benefit.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                                >
                                  {benefit.description}
                                </Typography>
                              </Box>
                            </MotionCard>
                          </Grid>
                        ))}
                        
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            fullWidth
                            size={isSmallScreen ? "small" : "medium"}
                            startIcon={<MassageSpaIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                            sx={{ 
                              bgcolor: TURQUOISE,
                              color: 'white',
                              px: { xs: 1.5, sm: 2 },
                              py: { xs: 0.75, sm: 1 },
                              borderRadius: '8px',
                              fontWeight: 600,
                              fontSize: { xs: '0.8rem', sm: '0.9rem' },
                              '&:hover': { bgcolor: '#20c5b7' }
                            }}
                          >
                            Get Spa Service Pricing
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </MotionCard>
                </Grid>
                
                {/* Services items section */}
                <Grid item xs={12} sm={12} md={12} lg={6}>
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
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: { xs: 1.5, sm: 2 } 
                      }}>
                        <LaundryIcon sx={{ 
                          color: TURQUOISE, 
                          mr: 1.5, 
                          fontSize: { xs: 20, sm: 22 } 
                        }} />
                        <Typography 
                          variant="h6" 
                          fontWeight={600} 
                          sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                        >
                          Spa Items We Clean
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />
                      
                      <Box>
                        {serviceItems.map((item, i) => (
                          <Box 
                            key={i}
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              mb: { xs: 1, sm: 1.5 }
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: TURQUOISE,
                                mr: 1.5,
                                flexShrink: 0
                              }}
                            />
                            <Typography 
                              variant="body2" 
                              sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        ))}
                        
                        <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: 'center' }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              mb: { xs: 1.5, sm: 2 }, 
                              fontSize: { xs: '0.8rem', sm: '0.85rem' }, 
                              fontStyle: 'italic',
                              lineHeight: 1.4
                            }}
                          >
                            All items returned free of oils and stains while preserving fabric quality
                          </Typography>
                          
                          <Button
                            variant="outlined"
                            fullWidth
                            size="small"
                            sx={{ 
                              color: TURQUOISE,
                              borderColor: TURQUOISE,
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                              py: 0.5,
                              '&:hover': { 
                                borderColor: TURQUOISE,
                                bgcolor: 'transparent'
                              }
                            }}
                          >
                            View All Services
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </MotionCard>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Call to action card */}
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
                  background: `linear-gradient(135deg, ${TURQUOISE}15, ${TURQUOISE}30)`,
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
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: 'rgba(0,0,0,0.8)'
                      }}
                    >
                      Ready to elevate your spa experience?
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        mb: { xs: 1, sm: 0 },
                        color: 'rgba(0,0,0,0.6)'
                      }}
                    >
                      Join wellness businesses that trust FreshBox with their premium linens.
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
                        bgcolor: 'white',
                        color: TURQUOISE,
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.6, sm: 0.8 },
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.85)' }
                      }}
                    >
                      Request a Quote
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ 
                        color: 'rgba(0,0,0,0.8)',
                        borderColor: 'rgba(0,0,0,0.3)',
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.6, sm: 0.8 },
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        '&:hover': { 
                          borderColor: 'rgba(0,0,0,0.5)',
                          bgcolor: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      Schedule Pickup
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