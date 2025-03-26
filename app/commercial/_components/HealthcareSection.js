'use client';

import React,{ useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  MedicalServices as HealthcareIcon,
  Sanitizer as SanitizerIcon,
  Shield as ShieldIcon,
  LocalHospital as HospitalIcon,
  EngineeringSharp as TechIcon,
  TimeToLeave as DeliveryIcon,
  VerifiedUser as CertifiedIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { motion, useAnimation, useInView } from 'framer-motion';

// Define constants
const TURQUOISE = '#28ddcd';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

export default function HealthcareSection() {
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
  
  // Features list - reduced for space
  const features = [
    {
      icon: <ShieldIcon sx={{ color: 'white', fontSize: 22 }} />,
      title: "Healthcare Compliance",
      description: "Meeting all healthcare regulatory standards.",
      bgColor: TURQUOISE
    },
    {
      icon: <SanitizerIcon sx={{ color: 'white', fontSize: 22 }} />,
      title: "Medical-Grade Sanitization",
      description: "Eliminating bacteria, viruses, and pathogens.",
      bgColor: TURQUOISE
    },
    {
      icon: <TechIcon sx={{ color: 'white', fontSize: 22 }} />,
      title: "Contamination Prevention",
      description: "Strict sorting and processing procedures.",
      bgColor: TURQUOISE
    },
    {
      icon: <CertifiedIcon sx={{ color: 'white', fontSize: 22 }} />,
      title: "Certified Process",
      description: "Staff trained in healthcare textile handling.",
      bgColor: TURQUOISE
    }
  ];
  
  // Healthcare facilities we serve - reduced for space
  const facilities = [
    "Medical Offices",
    "Dental Practices",
    "Urgent Care Centers",
    "Physical Therapy",
    "Chiropractic Offices",
    "Veterinary Clinics",
    "Diagnostic Centers",
    "Long-term Care"
  ];
  
  // Healthcare items we process
  const healthcareItems = [
    "Medical Scrubs",
    "Patient Gowns",
    "Bed Linens",
    "Exam Table Covers",
    "Medical Sheets",
    "Lab Coats",
    "Surgical Towels",
    "Privacy Curtains",
    "Medical Uniforms",
    "Protective Covers"
  ];

  return (
    <Box 
      ref={ref}
      sx={{ 
        minHeight: { xs: 'auto', md: '100vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#f8f9fa',
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
          bottom: '20%',
          right: '5%',
          width: '40%',
          height: '40%',
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
                  <HealthcareIcon sx={{ color: TURQUOISE, fontSize: { xs: 25, sm: 30 } }} />
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
                    Healthcare Laundry Solutions
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
                    Medical-grade laundry services that meet rigorous healthcare standards
                  </MotionTypography>
                </Box>
              </MotionBox>
            </Grid>
            
            <Grid item xs={12}>
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                {/* Left column - Main content */}
                <Grid item xs={12} sm={12} md={5} order={{ xs: 1, sm: 1 }}>
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
                      Specialized Healthcare Textile Care
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
                      Healthcare facilities require the highest standards of cleanliness and sanitization for textiles. Our healthcare laundry service provides medical offices, clinics, and care facilities with reliable, compliant laundry solutions that prioritize patient and staff safety.
                    </MotionTypography>
                    
                    <MotionTypography
                      variant="h6"
                      component="h4"
                      sx={{ 
                        fontWeight: 600,
                        mb: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.95rem', sm: '1rem' }
                      }}
                    >
                      Healthcare Facilities We Serve
                    </MotionTypography>
                    
                    <Grid container spacing={1} sx={{ mb: { xs: 1.5, sm: 2 } }}>
                      {facilities.map((facility, index) => (
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
                            <CheckCircleIcon sx={{ 
                              color: TURQUOISE, 
                              mr: 1, 
                              fontSize: { xs: 14, sm: 16 },
                              flexShrink: 0
                            }} />
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                lineHeight: 1.3
                              }}
                            >
                              {facility}
                            </Typography>
                          </MotionBox>
                        </Grid>
                      ))}
                    </Grid>
                    
                    <MotionBox
                      variants={itemVariants}
                      sx={{
                        mt: { xs: 1, sm: 2 },
                        display: 'flex',
                        justifyContent: { xs: 'center', sm: 'space-between' },
                        alignItems: { xs: 'center', sm: 'center' },
                        flexDirection: { xs: 'column', sm: 'row' },
                        flexWrap: 'wrap',
                        gap: { xs: 1.5, sm: 1 }
                      }}
                    >
                      <Button
                        variant="contained"
                        size={isSmallScreen ? "small" : "medium"}
                        startIcon={<HealthcareIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                        sx={{ 
                          bgcolor: TURQUOISE,
                          color: 'white',
                          px: { xs: 1.5, sm: 2 },
                          py: { xs: 0.75, sm: 1 },
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: { xs: '0.8rem', sm: '0.85rem' },
                          '&:hover': { bgcolor: '#20c5b7' },
                          display: { xs: 'none', sm: 'inline-flex' }
                        }}
                      >
                        Request Healthcare Pricing
                      </Button>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary', 
                          fontSize: { xs: '0.75rem', sm: '0.8rem' }, 
                          fontStyle: 'italic',
                          textAlign: { xs: 'center', sm: 'left' }
                        }}
                      >
                        Compliant with all healthcare regulations
                      </Typography>
                    </MotionBox>
                  </MotionBox>
                </Grid>
                
                {/* Middle and Right columns - Feature cards and Healthcare Items */}
                <Grid item xs={18} sm={12} md={7} order={{ xs: 2, sm: 2 }}>
                  
                    
                    {/* Healthcare Items */}
                    <Grid item xs={20} sm={10} md={5}>
                      <MotionPaper
                        elevation={0}
                        variants={cardVariants}
                        custom={1}
                        sx={{ 
                          p: { xs: 1.5, sm: 2 },
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: 'rgba(40,221,205,0.3)',
                          bgcolor: 'rgba(40,221,205,0.05)',
                          height: '100%'
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          fontWeight={600} 
                          sx={{ 
                            mb: { xs: 1.5, sm: 2 }, 
                            display: 'flex', 
                            alignItems: 'center', 
                            fontSize: { xs: '0.9rem', sm: '1rem' } 
                          }}
                        >
                          <ShieldIcon sx={{ 
                            color: TURQUOISE, 
                            mr: 1, 
                            fontSize: { xs: 18, sm: 20 },
                            flexShrink: 0
                          }} />
                          Healthcare Items We Process
                        </Typography>
                        
                        <Grid container spacing={1}>
                          {healthcareItems.map((item, index) => (
                            <Grid item xs={6} key={index}>
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mb: { xs: 0.75, sm: 1 } 
                              }}>
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
                                  fontSize={{ xs: '0.75rem', sm: '0.8rem' }}
                                  sx={{ lineHeight: 1.3 }}
                                >
                                  {item}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                        
                        <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
                        
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              mb: { xs: 1, sm: 1.5 }, 
                              fontSize: { xs: '0.8rem', sm: '0.85rem' }, 
                              fontWeight: 500 
                            }}
                          >
                            All textiles sanitized to medical standards
                          </Typography>
                          <Button
                            variant="outlined"
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
                            Learn About Our Process
                          </Button>
                        </Box>
                      </MotionPaper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Bottom CTA section */}
            <Grid item xs={12}>
              <MotionPaper
                elevation={0}
                variants={itemVariants}
                sx={{ 
                  mt: { xs: 2, sm: 3 },
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  bgcolor: 'white'
                }}
              >
                <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography 
                      variant="h6" 
                      fontWeight={600} 
                      sx={{ 
                        mb: 0.5, 
                        fontSize: { xs: '0.9rem', sm: '1rem' } 
                      }}
                    >
                      Our Healthcare Compliance Standards
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: { xs: 0.5, sm: 1 }, 
                        fontSize: { xs: '0.8rem', sm: '0.85rem' } 
                      }}
                    >
                      We maintain the highest standards in healthcare textile processing, following all industry guidelines and regulations.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {[
                        "Medical-grade sanitization",
                        "OSHA-compliant protocols",
                        "Healthcare certification",
                        "Quality assurance testing"
                      ].map((item, index) => (
                        <Box 
                          key={index}
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            width: { xs: '100%', sm: '50%' },
                            mb: 0.5
                          }}
                        >
                          <CheckCircleIcon sx={{ 
                            color: TURQUOISE, 
                            mr: 1, 
                            fontSize: { xs: 12, sm: 14 },
                            flexShrink: 0
                          }} />
                          <Typography 
                            variant="body2" 
                            fontSize={{ xs: '0.75rem', sm: '0.8rem' }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                  
                  <Grid 
                    item 
                    xs={12} 
                    md={4} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: { xs: 'center', md: 'center' },
                      mt: { xs: 1, md: 0 }
                    }}
                  >
                    <Button
                      variant="contained"
                      size={isSmallScreen ? "small" : "medium"}
                      sx={{ 
                        bgcolor: TURQUOISE,
                        color: 'white',
                        px: { xs: 2, sm: 3 },
                        py: { xs: 0.75, sm: 1 },
                        width: { xs: '100%', sm: 'auto' },
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        '&:hover': { bgcolor: '#20c5b7' }
                      }}
                    >
                      Schedule a Consultation
                    </Button>
                  </Grid>
                </Grid>
              </MotionPaper>
            </Grid>
            
            {/* Mobile CTA button (shown only on small screens) */}
            <Grid item xs={12} sx={{ display: { xs: 'block', sm: 'none' }, mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<HealthcareIcon sx={{ fontSize: 18 }} />}
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
                Request Healthcare Pricing
              </Button>
            </Grid>
          
        </MotionBox>
      </Container>
    </Box>
  );
}