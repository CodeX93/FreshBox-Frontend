'use client';

import React from 'react';
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

// Define constants
const TURQUOISE = '#28ddcd';
const DARK_TURQUOISE = '#20c5b7';
const TURQUOISE_LIGHT = '#e8f9f8';

const HeroSection = ({ 
  loaded, 
  searchQuery, 
  setSearchQuery, 
  searchActive, 
  setSearchActive,
  isMobile 
}) => {
  const theme = useTheme();
  
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchActive(query.trim() !== '');
  };

  return (
    <Box 
      sx={{ 
        background: DARK_TURQUOISE, // Solid Turquoise background
        py: { xs: 6, md: 8 },
        mb: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        color: 'white', // Text color changed to white for contrast
      }}
    >
      {/* Hero Background Elements */}
      {!isMobile && (
        <>
          <Box sx={{
            position: 'absolute',
            right: -20,
            top: 20,
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.2), rgba(255,255,255,0))',
            opacity: 0.8,
            zIndex: 0
          }} />
          
          <Box sx={{
            position: 'absolute',
            right: 100,
            top: -40,
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '2px dashed rgba(255,255,255,0.3)',
            zIndex: 0
          }} />
          
          <Box sx={{
            position: 'absolute',
            left: '10%',
            bottom: '10%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '2px dashed rgba(255,255,255,0.2)',
            zIndex: 0
          }} />
        </>
      )}
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={loaded} timeout={800}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1"
                sx={{ 
                  fontWeight: 800,
                  color: 'white', // White text for better contrast on turquoise
                  mb: 2,
                  fontSize: { xs: '2.25rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                How Can We Help You?
                <Box sx={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '30%',
                  height: 4,
                  bgcolor: 'white', // White underline for contrast
                  borderRadius: 2
                }} />
              </Typography>
              <Typography 
                variant="h5"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
                  mb: 4, 
                  maxWidth: 550,
                  fontWeight: 400,
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' },
                  lineHeight: 1.5
                }}
              >
                We're here to assist with any questions about our laundry and cleaning services.
              </Typography>
              
              {/* Search Bar */}
              <Paper
                elevation={searchActive ? 3 : 1}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  p: 0.75,
                  pl: 2.5,
                  border: '1px solid',
                  borderColor: searchActive ? 'white' : 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '16px',
                  maxWidth: 550,
                  mb: { xs: 4, md: 1 },
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    borderColor: 'white'
                  }
                }}
              >
                <SearchIcon sx={{ color: searchActive ? DARK_TURQUOISE : 'text.secondary', mr: 1.5 }} />
                <TextField
                  fullWidth
                  placeholder="Search our help resources..."
                  variant="standard"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: '1.05rem' }
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
                    px: { xs: 2, sm: 3 },
                    py: 1.2,
                    fontWeight: 600,
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
                  gap: { xs: 2, sm: 3 }
                }}
              >
                {/* Support Option Cards */}
                {[
                  { icon: <ChatIcon sx={{ fontSize: 36 }} />, title: "Live Chat", desc: "Chat with our support team" },
                  { icon: <PhoneIcon sx={{ fontSize: 36 }} />, title: "Call Us", desc: "Speak directly with support" },
                  { icon: <VideoCallIcon sx={{ fontSize: 36 }} />, title: "Video Consult", desc: "Schedule a video call" },
                  { icon: <GuideIcon sx={{ fontSize: 36 }} />, title: "Help Center", desc: "Browse support articles" }
                ].map((option, index) => (
                  <Fade key={index} in={loaded} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Card 
                      elevation={1}
                      sx={{ 
                        width: { xs: '100%', sm: 'calc(50% - 24px)' },
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { 
                          borderColor: 'white',
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                        },
                        '&:hover .icon-background': {
                          transform: 'scale(1.2)'
                        }
                      }}
                    >
                      <Box className="icon-background" sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        bgcolor: `${TURQUOISE}15`,
                        transition: 'transform 0.5s ease'
                      }} />
                      
                      <CardContent sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        p: { xs: 2.5, sm: 3 }
                      }}>
                        <Box sx={{ 
                          color: DARK_TURQUOISE, 
                          mb: 2,
                          p: 1.5,
                          borderRadius: '12px',
                          bgcolor: TURQUOISE_LIGHT,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {option.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#2d3748' }}>
                          {option.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
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

export default HeroSection;