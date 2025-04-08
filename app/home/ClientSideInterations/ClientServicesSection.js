'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  useMediaQuery,
  ThemeProvider,
  Stack,
  Fade,
  Chip,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import Link from 'next/link';
import { 
  ArrowForward as ArrowForwardIcon,
  Info as InfoIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { theme } from '../../../contexts/Theme';

// Service List Item Component with enhanced design
const ServiceListItem = ({ service, index }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);

  return (
    <Fade in={true} timeout={300 + (index * 100)}>
      <Card
        elevation={2}
        sx={{
          borderRadius: 2,
          mb: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(6px) translateY(-2px)',
            boxShadow: 4
          },
          overflow: 'hidden',
          border: '1px solid rgba(189, 244, 227, 0.3)'
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Grid container>
            {/* Service image - takes up 30% on larger screens */}
            <Grid item xs={3} 
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                position: 'relative',
                minHeight: 130
              }}
            >
              <Box 
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${service.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {service.popular && (
                <Chip
                  icon={<StarIcon fontSize="small" />}
                  label="Popular"
                  color="secondary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    fontWeight: 'bold',
                    zIndex: 2
                  }}
                />
              )}
            </Grid>
            
            {/* Service content - takes remaining width */}
            <Grid item xs={12} sm={9}>
              <Box sx={{ p: 2 }}>
                <Stack 
                  direction="row" 
                  spacing={1.5} 
                  alignItems="center"
                  sx={{ mb: 0.5 }}
                >
                  <Avatar
                    src={service.imageUrl}
                    alt={service.name}
                    sx={{ 
                      width: { xs: 40, md: 46 }, 
                      height: { xs: 40, md: 46 },
                      display: { xs: 'flex', sm: 'none' },
                      bgcolor: 'primary.light',
                      boxShadow: '0 2px 8px rgba(46, 123, 92, 0.2)'
                    }}
                  >
                    {service.name.charAt(0)}
                  </Avatar>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography 
                        variant="h6" 
                        color="primary.dark"
                        sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                      >
                        {service.name}
                      </Typography>
                      
                      <Tooltip title="More details">
                        <IconButton 
                          size="small"
                          onClick={() => setExpanded(!expanded)}
                          sx={{ 
                            color: 'primary.dark',
                            '&:hover': { backgroundColor: 'rgba(189, 244, 227, 0.2)' }
                          }}
                        >
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                      sx={{ 
                        mb: 0.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 500
                      }}
                    >
                      Professional Service
                    </Typography>
                  </Box>
                </Stack>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: expanded ? 'unset' : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: expanded ? 'visible' : 'hidden',
                    lineHeight: 1.5,
                    mb: expanded ? 2 : 0,
                    transition: 'all 0.3s'
                  }}
                >
                  {service.description}
                </Typography>
                
                {expanded && (
                  <Box sx={{ mt: 1.5 }}>
                    <Divider sx={{ mb: 1.5 }} />
                    <Typography 
                      variant="subtitle2" 
                      color="primary.dark"
                      sx={{ mb: 0.5, fontWeight: 600, fontSize: '0.8rem' }}
                    >
                      Features:
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {service.features?.slice(0, 3).map((feature, idx) => (
                        <Chip 
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{ 
                            mb: 0.5,
                            height: '22px',
                            backgroundColor: 'rgba(189, 244, 227, 0.4)',
                            color: 'primary.dark',
                            fontWeight: 500,
                            borderRadius: '4px',
                            fontSize: '0.7rem'
                          }}
                        />
                      ))}
                    </Stack>
                    
                    <Button
                      size="small"
                      component={Link}
                      href={`/services/${service.slug}`}
                      sx={{
                        mt: 1,
                        color: 'primary.dark',
                        textTransform: 'none',
                        fontWeight: 600,
                        p: 0,
                        fontSize: '0.75rem',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      View details
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fade>
  );
};

// Main Component with enhanced design
export default function ClientServicesSection({ services }) {
  const [isInView, setIsInView] = useState(true); // Set to true by default to always show content
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // No need for IntersectionObserver as we want to show content immediately
  // but keeping the ref for potential future use

  return (
    <ThemeProvider theme={theme}>
      <Box 
        ref={sectionRef}
        sx={{ 
          background: 'linear-gradient(135deg, #2E7B5C 0%, #1e5c42 100%)',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        {/* Decorative elements */}
        <Box 
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: { xs: 100, md: 200 },
            height: { xs: 100, md: 200 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(189, 244, 227, 0.15) 0%, rgba(189, 244, 227, 0) 70%)',
            zIndex: -1
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '8%',
            width: { xs: 80, md: 150 },
            height: { xs: 80, md: 150 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(189, 244, 227, 0.1) 0%, rgba(189, 244, 227, 0) 70%)',
            zIndex: -1
          }}
        />
        
        <Container maxWidth="lg" sx={{ height: '100%', py: { xs: 2, md: 3 } }}>
          <Grid 
            container 
            spacing={{ xs: 2, md: 3 }} 
            sx={{ 
              height: '100%', 
              alignItems: 'center',
              maxHeight: 'calc(100vh - 32px)'
            }}
          >
            {/* Left Side - Company Introduction with enhanced design */}
            <Grid item xs={12} md={5} sx={{ height: { md: '85%' } }}>
              <Fade in={true} timeout={400}>
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(189, 244, 227, 0.9) 100%)',
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Box>
                    <Typography
                      variant={isSmallMobile ? "h4" : "h3"}
                      component="h1"
                      color="primary.dark"
                      sx={{ 
                        fontWeight: 800, 
                        mb: 1,
                        background: 'linear-gradient(135deg, #2E7B5C 0%, #1e5c42 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.5px'
                      }}
                    >
                      FreshBox Care
                    </Typography>
                    
                    <Typography
                      variant="subtitle1"
                      color="primary.main"
                      sx={{ 
                        mb: 2, 
                        fontWeight: 600,
                        letterSpacing: '0.5px'
                      }}
                    >
                      Premium Laundry & Dry Cleaning
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 3, 
                        color: 'text.primary',
                        lineHeight: 1.5,
                        fontSize: { xs: '0.875rem', md: '0.925rem' }
                      }}
                    >
                      Your clothes deserve exceptional care. At FreshBox Care, we combine cutting-edge 
                      technology with eco-friendly practices to deliver pristine results.
                    </Typography>
                    
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                      <Button
                        variant="contained"
                        size="medium"
                        component={Link}
                        href="/pricing"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          backgroundColor: 'primary.dark',
                          color: 'white',
                          borderRadius: 2,
                          px: 2.5,
                          py: 1,
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: '0 4px 12px rgba(46, 123, 92, 0.3)',
                          '&:hover': {
                            backgroundColor: '#1e5c42',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 16px rgba(46, 123, 92, 0.35)',
                          }
                        }}
                      >
                        Explore Pricing
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="medium"
                        component={Link}
                        href="/how-it-works"
                        sx={{
                          borderColor: 'primary.dark',
                          color: 'primary.dark',
                          borderRadius: 2,
                          px: 2.5,
                          py: 1,
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: 'primary.dark',
                            backgroundColor: 'rgba(46, 123, 92, 0.05)',
                          }
                        }}
                      >
                        How It Works
                      </Button>
                    </Stack>
                  </Box>
                  
                  <Box
                    sx={{
                      mt: 3,
                      p: 1.5,
                      backgroundColor: 'rgba(46, 123, 92, 0.08)',
                      borderRadius: 2,
                      border: '1px dashed rgba(46, 123, 92, 0.3)'
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <StarIcon sx={{ color: 'primary.dark', fontSize: 18 }} />
                      <Typography 
                        variant="body2" 
                        color="primary.dark"
                        sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                      >
                        Special Offer
                      </Typography>
                    </Stack>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mt: 0.5, fontSize: '0.8rem' }}
                    >
                      Min. order $35. <strong>Free delivery</strong> and a complimentary eco-bag on first order.
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            {/* Right Side - Services List with enhanced design */}
            <Grid item xs={12} md={7} sx={{ height: { md: '85%' } }}>
              <Typography
                variant="h6"
                color="white"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  pl: 1,
                  borderLeft: '4px solid rgba(189, 244, 227, 0.7)',
                  display: { xs: 'block', md: 'none' },
                  fontSize: '1.125rem'
                }}
              >
                Our Services
              </Typography>
              
              <Box 
                sx={{ 
                  height: { md: '100%' },
                  maxHeight: { xs: 'calc(100vh - 360px)', md: 'calc(100vh - 120px)' }, 
                  overflow: 'auto',
                  pr: { md: 1 },
                  // Custom scrollbar styling
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.3)',
                    },
                  },
                }}
              >
                <Stack spacing={1.5}>
                  {services.map((service, index) => (
                    <ServiceListItem 
                      key={service.slug} 
                      service={{
                        ...service,
                        popular: index === 1 // Make the second service "popular" as an example
                      }} 
                      index={index} 
                    />
                  ))}
                </Stack>
                
                <Box 
                  sx={{ 
                    mt: 2, 
                    textAlign: 'center',
                    display: { xs: 'none', md: 'block' }
                  }}
                >
                  <Button
                    variant="outlined"
                    size="medium"
                    component={Link}
                    href="/services"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.8)',
                      color: 'white',
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    View All Services
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}