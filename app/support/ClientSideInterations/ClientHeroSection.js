'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Grid,
  Fade,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from '@mui/material';

import {
  Search as SearchIcon,
  Chat as ChatIcon,
  Phone as PhoneIcon,
  VideoCall as VideoCallIcon,
  Book as GuideIcon
} from '@mui/icons-material';

import {theme} from "../../../contexts/Theme"
// Define constants
const TURQUOISE = theme.palette.primary.main;
const DARK_TURQUOISE = theme.palette.primary.darkBlue;
const TURQUOISE_LIGHT = theme.palette.primary.whitishMint;
const yellowish = theme.palette.primary.yellowish;

const ClientHeroSection = ({ 
  loaded, 
  searchQuery, 
  setSearchQuery, 
  searchActive, 
  setSearchActive,
  isMobile,
  heroTitle,
  heroDescription
}) => {
  const theme = useTheme();
  const [navbarHeight, setNavbarHeight] = useState(64); // Default height
  
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchActive(query.trim() !== '');
  };

  // Effect for navbar measurement and styling
  useEffect(() => {
    // Get actual navbar height for precise calculations
    const navbar = document.querySelector('nav');
    if (navbar) {
      const updateNavbarMeasurements = () => {
        const height = navbar.offsetHeight;
        setNavbarHeight(height);
        
        // Apply styles to navbar
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
        navbar.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
        
        // Create smooth transition for navbar
        document.body.style.scrollBehavior = 'smooth';
      };
      
      updateNavbarMeasurements();
      window.addEventListener('resize', updateNavbarMeasurements);
      
      // Handle navbar color and text on scroll
      const handleScroll = () => {
        if (window.scrollY > 50) {
          navbar.style.backgroundColor = '#ffffff';
          navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
          navbar.style.backgroundColor = 'transparent';
          navbar.style.boxShadow = 'none';
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('resize', updateNavbarMeasurements);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [loaded]);

  // Effect to update navbar text color for better visibility
  useEffect(() => {
    const navbarLinks = document.querySelectorAll('nav a, nav button, nav .MuiSvgIcon-root');
    if (navbarLinks) {
      // Create style tag for smooth transition
      const styleTag = document.createElement('style');
      styleTag.innerHTML = `
        .nav-transition {
          transition: color 0.3s ease !important;
        }
      `;
      document.head.appendChild(styleTag);
      
      navbarLinks.forEach(element => {
        if (element instanceof HTMLElement) {
          element.classList.add('nav-transition');
          element.style.color = 'white';
        }
      });
      
      // Change back to original color on scroll
      const handleScroll = () => {
        if (window.scrollY > 50) {
          navbarLinks.forEach(element => {
            if (element instanceof HTMLElement) {
              element.style.color = '';  // Reset to theme default
            }
          });
        } else {
          navbarLinks.forEach(element => {
            if (element instanceof HTMLElement) {
              element.style.color = 'white';
            }
          });
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.head.removeChild(styleTag);
      };
    }
  }, [loaded]);

  // Determine proper padding based on device and navbar height
  const dynamicTopPadding = isMobile 
    ? navbarHeight + 60 // Increased from 40 to 60 for mobile
    : navbarHeight + 80; // Increased from 60 to 80 for desktop
    
  const dynamicHeroHeight = isMobile
    ? 'auto'
    : '100vh';

  return (
    <Box 
      sx={{ 
        minHeight: dynamicHeroHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: `${dynamicTopPadding}px`, // Dynamic padding based on navbar height
        paddingBottom: { xs: 10, md: 12 }, // Increased padding on bottom
        marginTop: `-${navbarHeight}px`, // Pull up by exact navbar height
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          position: 'relative', 
          zIndex: 1, 
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'center',
          px: { xs: 3, sm: 4, md: 5 }, // Added horizontal padding
        }}
      >
        <Fade in={loaded} timeout={800}>
          <Grid container spacing={6} alignItems="center"> {/* Increased spacing from 4 to 6 */}
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1"
                sx={{ 
                  fontWeight: 800,
                  color: DARK_TURQUOISE,
                  mb: 3, // Increased from 2 to 3
                  fontSize: { xs: '2.25rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                {heroTitle}
                <Box sx={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '30%',
                  height: 4,
                  bgcolor: TURQUOISE,
                  borderRadius: 2
                }} />
              </Typography>
              <Typography 
                variant="h5"
                sx={{ 
                  color: DARK_TURQUOISE,
                  mb: 5, // Increased from 4 to 5
                  maxWidth: 550,
                  fontWeight: 400,
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' },
                  lineHeight: 1.6, // Increased from 1.5 to 1.6 for better readability
                  letterSpacing: '0.02em', // Added slight letter spacing
                }}
              >
                {heroDescription}
              </Typography>
              
              {/* Search Bar */}
              <Paper
                elevation={searchActive ? 3 : 1}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  p: 1, // Increased from 0.75 to 1
                  pl: 3, // Increased from 2.5 to 3
                  border: '1px solid',
                  borderColor: searchActive ? 'white' : 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '16px',
                  maxWidth: 550,
                  mb: { xs: 5, md: 2 }, // Increased from mb: { xs: 4, md: 1 }
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    borderColor: 'white'
                  }
                }}
              >
                <SearchIcon sx={{ color: searchActive ? DARK_TURQUOISE : 'text.secondary', mr: 2 }} /> {/* Increased margin */}
                <TextField
                  fullWidth
                  placeholder="Search our help resources..."
                  variant="standard"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: '1.05rem', padding: '4px 0' } // Added padding
                  }}
                  sx={{ flex: 1 }}
                />
                <Button 
                  variant="contained"
                  disableElevation
                  sx={{ 
                    bgcolor: DARK_TURQUOISE,
                    color: 'white',
                    borderRadius: '12px',
                    px: { xs: 3, sm: 4 }, // Increased horizontal padding
                    py: 1.5, // Increased vertical padding from 1.2 to 1.5
                    fontWeight: 600,
                    ml: 1, // Added left margin
                    '&:hover': { bgcolor: TURQUOISE }
                  }}
                >
                  Search
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: { xs: 3, sm: 4 } // Increased gap from { xs: 2, sm: 3 }
                }}
              >
                {/* Support Option Cards */}
                {[
                  { icon: <ChatIcon sx={{ fontSize: 40 }} />, title: "Live Chat", desc: "Chat with our support team" },
                  { icon: <PhoneIcon sx={{ fontSize: 40 }} />, title: "Call Us", desc: "Speak directly with support" },
                  { icon: <VideoCallIcon sx={{ fontSize: 40 }} />, title: "Video Consult", desc: "Schedule a video call" },
                  { icon: <GuideIcon sx={{ fontSize: 40 }} />, title: "Help Center", desc: "Browse support articles" }
                ].map((option, index) => (
                  <Fade key={index} in={loaded} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Card 
                      elevation={1}
                      sx={{ 
                        width: { xs: '100%', sm: 'calc(50% - 32px)' }, // Adjusted for new gap
                        borderRadius: 4,
                        
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        bgcolor: DARK_TURQUOISE,

                      }}
                    >
                     
                      
                      <CardContent sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        p: { xs: 3, sm: 4 } // Increased padding from p: { xs: 2.5, sm: 3 }
                      }}>
                        <Box sx={{ 
                          color: yellowish, 
                          mb: 2.5, // Increased from 2 to 2.5
                          p: 2, // Increased from 1.5 to 2
                          borderRadius: '12px',
                          bgcolor: DARK_TURQUOISE,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {option.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: yellowish }}> {/* Increased margin */}
                          {option.title}
                        </Typography>
                        <Typography variant="body1" color={TURQUOISE_LIGHT} sx={{ lineHeight: 1.6 }}> {/* Added line height */}
                          {option.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
};

export default ClientHeroSection;