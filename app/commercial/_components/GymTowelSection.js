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
  Avatar,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
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
import { motion, useAnimation, useInView } from 'framer-motion';

// Define constants
const TURQUOISE = '#28ddcd';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

export default function GymTowelSection() {
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
  
  // Benefits - reduced for space
  const benefits = [
    {
      icon: <TimerIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Save Time & Resources",
      description: "Free up staff to focus on members while we handle towel cleaning."
    },
    {
      icon: <TrophyIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Improve Member Experience",
      description: "Fresh towels enhance your facility's professional image."
    },
    {
      icon: <MoneyIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Reduce Operational Costs",
      description: "Lower utility bills and eliminate supply expenses."
    },
    {
      icon: <EcoIcon sx={{ color: TURQUOISE, fontSize: 24 }} />,
      title: "Environmentally Friendly",
      description: "Less water and energy than on-site laundry operations."
    }
  ];
  
  // Service features - reduced for space
  const features = [
    "Regular pickup & delivery",
    "Flexible service frequency",
    "Volume-based pricing",
    "High-temperature sanitization",
    "Antimicrobial treatment",
    "Fresh, neutral scent",
    "Inventory tracking",
    "Online account management"
  ];
  
  // Testimonial - reduced for space
  const testimonial = {
    name: "David Miller",
    role: "Fitness Center Manager",
    comment: "FreshBox has eliminated our towel management headaches. Our members love the consistently clean towels, and we've reduced our costs significantly.",
    initials: "DM"
  };
  
  // Facilities we serve - reduced for space
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

  return (
    <Box 
      ref={ref}
      sx={{ 
        minHeight: { xs: 'auto', md: '100vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#ffffff',
        position: 'relative',
        py: { xs: 4, sm: 6, md: 8 }
      }}
    >
      {/* Background elements */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        sx={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '30%',
          height: '30%',
          borderRadius: '50%',
          background: TURQUOISE,
          filter: 'blur(80px)',
          zIndex: 0
        }}
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="center">
            {/* Section header - more compact */}
            <Grid item xs={12}>
              <MotionBox 
                variants={itemVariants}
                sx={{ 
                  display: 'flex',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  mb: { xs: 2, sm: 3 }
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
                    bgcolor: 'rgba(40,221,205,0.1)',
                    mr: { xs: 0, sm: 2 },
                    mb: { xs: 1.5, sm: 0 }
                  }}
                >
                  <GymIcon sx={{ color: TURQUOISE, fontSize: { xs: 25, sm: 30 } }} />
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
                    Gym Towel Laundry Service
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
                    Professional towel cleaning for fitness centers and athletic facilities
                  </MotionTypography>
                </Box>
              </MotionBox>
            </Grid>
            
            <Grid item xs={12}>
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                {/* Left column - Main content */}
                <Grid item xs={12} sm={6} md={4} order={{ xs: 1, sm: 1 }}>
                  <MotionBox variants={itemVariants}>
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
                      Professional Gym Towel Cleaning
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
                      Fitness centers and gyms go through hundreds of towels daily. Our specialized gym towel laundry service provides a hygienic, efficient solution that enhances member experience while reducing operational costs and staff workload.
                    </MotionTypography>
                    
                    <MotionPaper
                      elevation={0}
                      variants={cardVariants}
                      custom={1}
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
                          fontSize: { xs: '0.95rem', sm: '1rem' } 
                        }}
                      >
                        Service Features
                      </Typography>
                      
                      <Grid container spacing={1}>
                        {features.map((feature, index) => (
                          <Grid item xs={6} key={index}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <CheckCircleIcon sx={{ 
                                color: TURQUOISE, 
                                mr: 1, 
                                fontSize: { xs: 14, sm: 16 },
                                flexShrink: 0
                              }} />
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                  lineHeight: 1.3
                                }}
                              >
                                {feature}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </MotionPaper>
                    
                    <MotionTypography
                      variant="h6"
                      fontWeight={600}
                      variants={itemVariants}
                      sx={{ 
                        mb: { xs: 1, sm: 1.5 }, 
                        fontSize: { xs: '0.95rem', sm: '1rem' } 
                      }}
                    >
                      Facilities We Serve
                    </MotionTypography>
                    
                    <Grid container spacing={1} sx={{ mb: { xs: 1.5, sm: 2 } }}>
                      {facilities.map((facility, index) => (
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
                              {facility}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    
                    <MotionBox 
                      variants={itemVariants}
                      sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                      <Button
                        variant="contained"
                        size={isSmallScreen ? "small" : "small"}
                        startIcon={<GymIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                        sx={{ 
                          bgcolor: TURQUOISE,
                          color: 'white',
                          px: { xs: 1.5, sm: 2 },
                          py: { xs: 0.75, sm: 0.8 },
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          '&:hover': { bgcolor: '#20c5b7' }
                        }}
                      >
                        Get Fitness Facility Quote
                      </Button>
                    </MotionBox>
                  </MotionBox>
                </Grid>
                
                {/* Middle and Right columns - Benefit cards and Testimonial */}
                <Grid item xs={12} sm={6} md={8} order={{ xs: 2, sm: 2 }}>
                  <Grid container spacing={{ xs: 2, sm: 3 }}>
                    {/* Benefits section */}
                    <Grid item xs={12} md={8}>
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
                        Benefits for Your Fitness Facility
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
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'flex-start'
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
                                mr: 1.5,
                                mt: 0.3,
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
                                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                    lineHeight: 1.3
                                  }}
                                >
                                  {benefit.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ 
                                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                    lineHeight: 1.4
                                  }}
                                >
                                  {benefit.description}
                                </Typography>
                              </Box>
                            </MotionCard>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    
                    {/* Testimonial section */}
                    <Grid item xs={12} md={4}>
                      <MotionPaper
                        elevation={0}
                        variants={itemVariants}
                        sx={{ 
                          p: { xs: 1.5, sm: 2 },
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: 'rgba(40,221,205,0.3)',
                          bgcolor: 'rgba(40,221,205,0.05)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: '10px'
                        }}>
                          <ThumbUpIcon sx={{ 
                            color: TURQUOISE, 
                            mr: 1.5, 
                            fontSize: { xs: 18, sm: 20 },
                            flexShrink: 0 
                          }} />
                          <Typography 
                            variant="h6" 
                            fontWeight={600} 
                            sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                          >
                            Facility Testimonial
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', mb: 1.5 }}>
                          {Array(5).fill().map((_, i) => (
                            <Box 
                              key={i} 
                              component="span" 
                              sx={{ 
                                color: TURQUOISE,
                                fontSize: { xs: '1rem', sm: '1.2rem' },
                                mr: 0.3
                              }}
                            >
                              ★
                            </Box>
                          ))}
                        </Box>
                        
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            mb: { xs: 1.5, sm: 2 }, 
                            fontStyle: 'italic',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            flexGrow: 1,
                            lineHeight: 1.4
                          }}
                        >
                          "{testimonial.comment}"
                        </Typography>
                        
                        <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{ 
                              bgcolor: TURQUOISE,
                              color: 'white',
                              width: { xs: 28, sm: 32 },
                              height: { xs: 28, sm: 32 },
                              mr: 1.5,
                              fontWeight: 600,
                              fontSize: { xs: '0.7rem', sm: '0.8rem' }
                            }}
                          >
                            {testimonial.initials}
                          </Avatar>
                          <Box>
                            <Typography 
                              variant="body1" 
                              fontWeight={600} 
                              sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                            >
                              {testimonial.name}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                            >
                              {testimonial.role}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{
                            mt: 2,
                            color: TURQUOISE,
                            borderColor: TURQUOISE,
                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                            py: { xs: 0.5, sm: 0.6 },
                            '&:hover': { 
                              borderColor: TURQUOISE,
                              bgcolor: 'transparent'
                            }
                          }}
                        >
                          Read More Success Stories
                        </Button>
                      </MotionPaper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Bottom CTA */}
            <Grid item xs={12}>
              <MotionBox
                variants={itemVariants}
                sx={{
                  mt: { xs: 2, sm: 3 },
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 3,
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: TURQUOISE,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 1.5, sm: 3 }
                }}
              >
                <LaundryIcon sx={{ 
                  color: TURQUOISE, 
                  fontSize: { xs: 24, sm: 28 },
                  alignSelf: { xs: 'center', sm: 'auto' }
                }} />
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    sx={{ 
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    Start providing premium towel service to your members
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    Contact us today for a customized solution and pricing for your facility
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size={isSmallScreen ? "small" : "medium"}
                  sx={{ 
                    bgcolor: TURQUOISE,
                    color: 'white',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 0.75, sm: 1 },
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': { bgcolor: '#20c5b7' },
                    whiteSpace: 'nowrap',
                    alignSelf: { xs: 'center', sm: 'auto' },
                    width: { xs: '100%', sm: 'auto' }
                  }}
                >
                  Schedule a Demo
                </Button>
              </MotionBox>
            </Grid>
            
            {/* Mobile CTA button (shown only on small screens) */}
            <Grid item xs={12} sx={{ display: { xs: 'block', sm: 'none' }, mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<GymIcon sx={{ fontSize: 18 }} />}
                size="medium"
                sx={{ 
                  bgcolor: TURQUOISE,
                  color: 'white',
                  py: 1,
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  '&:hover': { bgcolor: '#20c5b7' }
                }}
              >
                Get Fitness Facility Quote
              </Button>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}