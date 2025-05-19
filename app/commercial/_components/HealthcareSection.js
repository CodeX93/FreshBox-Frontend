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
  MedicalServices as HealthcareIcon,
  Sanitizer as SanitizerIcon,
  Shield as ShieldIcon,
  LocalHospital as HospitalIcon,
  EngineeringSharp as TechIcon,
  TimeToLeave as DeliveryIcon,
  VerifiedUser as CertifiedIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const HealthcareSection = ({handleClick}) => {
  const darkBlueColor = theme.palette.primary.darkBlue;
  const primaryColor = theme.palette.primary.main;
  const whitishMint = theme.palette.primary.whitishMint;
  const yellowishColor = theme.palette.primary.yellowish;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Benefits data
  const benefits = [
    {
      icon: <ShieldIcon />,
      title: "Healthcare Compliance",
      description: "Meeting all healthcare regulatory standards and guidelines for medical textiles."
    },
    {
      icon: <SanitizerIcon />,
      title: "Medical-Grade Sanitization",
      description: "Eliminating bacteria, viruses, and pathogens with specialized cleaning processes."
    },
    {
      icon: <TechIcon />,
      title: "Contamination Prevention",
      description: "Strict sorting and processing procedures to prevent cross-contamination."
    },
    {
      icon: <CertifiedIcon />,
      title: "Certified Process",
      description: "Staff trained in healthcare textile handling and medical laundry regulations."
    }
  ];
  
  // Features data
  const features = [
    {
      icon: <HospitalIcon />,
      title: "Hospital-Grade Quality",
      description: "Meeting stringent healthcare facility sanitization requirements."
    },
    {
      icon: <HealthcareIcon />,
      title: "Specialized Equipment",
      description: "Using advanced machinery designed for medical textile processing."
    },
    {
      icon: <DeliveryIcon />,
      title: "Healthcare Logistics",
      description: "Reliable pickup and delivery scheduled around your facility's needs."
    },
    {
      icon: <CheckCircleIcon />,
      title: "Quality Assurance",
      description: "Rigorous inspections to ensure compliance with healthcare standards."
    }
  ];

  // Healthcare facilities we serve
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
            Healthcare Laundry Solutions
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
            Medical-grade laundry services that meet rigorous healthcare standards for cleanliness, sanitization, and compliance.
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
              onClick={handleClick}
            >
              Get Started
            </Button>
            <Button
            disabled
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
              Medical Standards Compliance
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
                Healthcare Service Features
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
                Healthcare Facilities We Serve
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {facilities.map((facility, index) => (
                  <Grid item xs={6} sm={4} key={index}>
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
                      <CheckCircleIcon
                        sx={{
                          color: darkBlueColor,
                          fontSize: { xs: 16, sm: 18 },
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
          
          {/* Items We Process */}
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
                Healthcare Items We Process
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {healthcareItems.map((item, index) => (
                  <Grid item xs={6} sm={4} key={index}>
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
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          
          {/* Call to Action */}
          <Grid item xs={12}>
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                bgcolor: `${darkBlueColor}`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                      fontWeight: 700,
                      color: whitishMint,
                      mb: 1
                    }}
                  >
                    Ready to upgrade your healthcare laundry?
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      color: `${whitishMint}DD`,
                      mb: { xs: 2, md: 0 }
                    }}
                  >
                    Our medical-grade laundry service ensures compliance with all healthcare regulations and standards.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                  <Button
                  disableElevation
                    variant="contained"
                    sx={{
                      bgcolor: whitishMint,
                      color: darkBlueColor,
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.25 },
                      borderRadius: '8px',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: yellowishColor,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    Schedule a Consultation
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

export default HealthcareSection;