'use client';

import { useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Paper,
  Card,
  Button,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Business as CommercialIcon,
  Timer as FastTurnaroundIcon,
  EnergySavingsLeaf as EcoFriendlyIcon,
  LocalShipping as DeliveryIcon,
  Inventory as InventoryIcon,
  AttachMoney as SavingsIcon,
  Security as SecurityIcon,
  Settings as ProcessIcon,
  LocalLaundryService as LaundryIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { motion, useAnimation, useInView } from 'framer-motion';

// Define constants
const TURQUOISE = '#28ddcd';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionGrid = motion(Grid);
const MotionCard = motion(Card);

export default function CommercialLaundrySection() {
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
  
  // Features list
  const features = [
    {
      icon: <FastTurnaroundIcon sx={{ color: TURQUOISE, fontSize: 22 }} />,
      title: 'Fast Turnaround',
      description: '24-48 hour service to maintain operations.'
    },
    {
      icon: <EcoFriendlyIcon sx={{ color: TURQUOISE, fontSize: 22 }} />,
      title: 'Eco-Friendly',
      description: 'Sustainable methods with biodegradable detergents.'
    },
    {
      icon: <DeliveryIcon sx={{ color: TURQUOISE, fontSize: 22 }} />,
      title: 'Free Delivery',
      description: 'Scheduled pickups at your business location.'
    },
    {
      icon: <SavingsIcon sx={{ color: TURQUOISE, fontSize: 22 }} />,
      title: 'Volume Discounts',
      description: 'Significant savings for regular clients.'
    }
  ];
  
  // Industries we serve
  const industries = [
    "Restaurants",
    "Hotels",
    "Offices",
    "Retail",
    "Salons",
    "Manufacturing",
    "Event Venues",
    "Schools"
  ];
  
  // Process steps
  const processSteps = [
    { number: 1, title: "Assessment" },
    { number: 2, title: "Custom Plan" },
    { number: 3, title: "Setup" },
    { number: 4, title: "Service" }
  ];

  return (
    <Box 
      ref={ref}
      sx={{ 
        minHeight: { xs: 'auto', md: 'auto' }, // Changed from 100vh to auto
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#f5f7fa', // Changed background color to light gray
        position: 'relative',
        py: { xs: 4, sm: 6, md: 8 }
      }}
    >
      <Container 
        maxWidth="lg" // Reduced from xl to lg
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
                  <CommercialIcon sx={{ color: TURQUOISE, fontSize: { xs: 25, sm: 30 } }} />
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
                    Commercial Laundry Services
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
                    Professional solutions to handle all your business laundry needs
                  </MotionTypography>
                </Box>
              </Box>
            </Box>
          </MotionCard>
          
          {/* Main content - Boxed cards layout */}
          <Grid container spacing={3}>
            {/* Left column - Main content */}
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
                    variant="body1"
                    sx={{ 
                      mb: 2,
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontSize: { xs: '0.9rem', sm: '0.95rem' }
                    }}
                  >
                    FreshBox Commercial Laundry Services delivers high-quality, reliable laundry solutions designed specifically for businesses. We understand that clean, professional textiles reflect on your business image, which is why we use commercial-grade equipment and specialized processes.
                  </MotionTypography>
                  
                  <MotionTypography
                    variant="h6"
                    component="h4"
                    sx={{ 
                      fontWeight: 600,
                      mb: 1.5,
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    Industries We Serve
                  </MotionTypography>
                  
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    {industries.map((industry, index) => (
                      <Grid item xs={6} key={index}>
                        <MotionBox
                          variants={itemVariants}
                          custom={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 0.5
                          }}
                        >
                          <CheckIcon sx={{ color: TURQUOISE, mr: 1, fontSize: { xs: 14, sm: 16 } }} />
                          <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                            {industry}
                          </Typography>
                        </MotionBox>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <MotionPaper
                    elevation={0}
                    variants={itemVariants}
                    sx={{ 
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'rgba(40,221,205,0.3)',
                      bgcolor: 'rgba(40,221,205,0.05)',
                      mb: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <ProcessIcon sx={{ color: TURQUOISE, fontSize: { xs: 20, sm: 22 }, mr: 1.5 }} />
                      <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        Our Process
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      pl: { xs: 0.5, sm: 1 }
                    }}>
                      {processSteps.map((step, index) => (
                        <MotionBox
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: 0.3 + (index * 0.1) }}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            px: { xs: 0.25, sm: 0.5 }
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 24, sm: 28 },
                              height: { xs: 24, sm: 28 },
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: TURQUOISE,
                              color: 'white',
                              fontWeight: 700,
                              fontSize: { xs: '0.8rem', sm: '0.9rem' },
                              mb: 0.5
                            }}
                          >
                            {step.number}
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }, 
                              fontWeight: 500 
                            }}
                          >
                            {step.title}
                          </Typography>
                        </MotionBox>
                      ))}
                    </Box>
                  </MotionPaper>
                  
                  <MotionBox
                    variants={itemVariants}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      size={isSmallScreen ? "small" : "medium"}
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
                      Get Custom Business Quote
                    </Button>
                  </MotionBox>
                </Box>
              </MotionCard>
            </Grid>
            
            {/* Middle column - Feature cards */}
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
                    variant="h6"
                    component="h3"
                    variants={itemVariants}
                    sx={{ 
                      fontWeight: 600,
                      mb: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    Our Business Advantages
                  </MotionTypography>
                  
                  <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    {features.map((feature, index) => (
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
                            alignItems: 'flex-start',
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
                            mt: 0.3
                          }}>
                            {feature.icon}
                          </Box>
                          <Box>
                            <Typography
                              variant="body1"
                              component="h5"
                              fontWeight={600}
                              sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, mb: 0.3 }}
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
            
            {/* Right column - Services section */}
            <Grid item xs={12} md={12} lg={4}>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LaundryIcon sx={{ color: TURQUOISE, mr: 1.5, fontSize: { xs: 20, sm: 22 } }} />
                    <Typography 
                      variant="h6" 
                      fontWeight={600} 
                      sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                    >
                      Commercial Items We Process
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={1.5}>
                    {[
                      {
                        title: "Hospitality",
                        items: ["Table linens", "Chef uniforms", "Bed sheets", "Towels"]
                      },
                      {
                        title: "Office & Retail",
                        items: ["Employee uniforms", "Cleaning cloths", "Floor mats", "Curtains"]
                      },
                      {
                        title: "Specialty Items",
                        items: ["Shop rags", "Coveralls", "Lab coats", "Delicate fabrics"]
                      }
                    ].map((category, index) => (
                      <Grid item xs={12} key={index}>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600, 
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            mb: 0.5,
                            color: TURQUOISE
                          }}
                        >
                          {category.title}
                        </Typography>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          mb: { xs: 0.5, sm: 1 }
                        }}>
                          {category.items.map((item, i) => (
                            <Box 
                              key={i}
                              sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                mr: 2,
                                mb: 1,
                                width: { xs: 'calc(50% - 16px)', md: 'calc(50% - 16px)' }
                              }}
                            >
                              <Box
                                sx={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: '50%',
                                  bgcolor: TURQUOISE,
                                  mr: 1
                                }}
                              />
                              <Typography 
                                variant="body2" 
                                sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                        
                        {index < 2 && (
                          <Divider sx={{ my: 1 }} />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
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
              </MotionCard>
            </Grid>
            
            {/* Call to action card */}
            <Grid item xs={12}>
              <MotionCard
                elevation={2}
                variants={itemVariants}
                sx={{
                  mt: { xs: 1, sm: 2 },
                  borderRadius: 3,
                  bgcolor: 'white',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ 
                  p: { xs: 2, sm: 3 },
                  bgcolor: TURQUOISE,
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <Typography 
                    variant="h6" 
                    fontWeight={700} 
                    sx={{ 
                      mb: { xs: 0.5, sm: 1 }, 
                      fontSize: { xs: '1rem', sm: '1.1rem' } 
                    }}
                  >
                    Ready to transform your business laundry operations?
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: { xs: 1, sm: 1.5 }, 
                      fontSize: { xs: '0.8rem', sm: '0.85rem' }, 
                      maxWidth: 700, 
                      mx: 'auto' 
                    }}
                  >
                    Join hundreds of businesses that trust FreshBox with their commercial laundry needs.
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1, sm: 2 }, 
                    justifyContent: 'center', 
                    flexWrap: 'wrap' 
                  }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ 
                        bgcolor: 'white',
                        color: TURQUOISE,
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.6, sm:.8 },
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                      }}
                    >
                      Request a Quote
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ 
                        color: 'white',
                        borderColor: 'white',
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.6, sm: 0.8 },
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        '&:hover': { 
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      Learn More
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