'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
  Fade,
  Grow,
  Zoom,
  ThemeProvider
} from '@mui/material';

import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { theme } from '../contexts/Theme'; // Import your theme context

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateIn(true);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setShowThankYou(true);
      setEmail('');
      // Reset thank you message after 3 seconds
      setTimeout(() => setShowThankYou(false), 3000);
    }
  };

  const services = ['Dry Cleaning', 'Wash & Fold', 'Laundry', 'Household Items', 'Special Items'];
  const companyLinks = ['About Us', 'How It Works', 'Pricing', 'FAQs', 'Contact Us'];

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          bgcolor: '#0a1929', // Keeping the black background color
          color: 'white', 
          pt: 8, 
          pb: 4,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            bgcolor: '#0c1e2e' // Keeping the hover color
          }
        }}
      >
        <Container maxWidth="lg">
          <Fade in={animateIn} timeout={800}>
            <Grid container spacing={4}>
              {/* Company Info */}
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 1,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -5,
                        left: 0,
                        width: '40px',
                        height: '3px',
                        bgcolor: theme.palette.primary.main, // Using your turquoise color
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '80px',
                      }
                    }}
                  >
                    LaundryHeap
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                    Professional laundry and dry cleaning services delivered to your doorstep. Quality care for all your garments.
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  {[
                    { icon: <FacebookIcon fontSize="small" />, label: 'Facebook' },
                    { icon: <TwitterIcon fontSize="small" />, label: 'Twitter' },
                    { icon: <InstagramIcon fontSize="small" />, label: 'Instagram' },
                    { icon: <LinkedInIcon fontSize="small" />, label: 'LinkedIn' }
                  ].map((item, index) => (
                    <Zoom in={animateIn} style={{ transitionDelay: `${index * 100}ms` }} key={item.label}>
                      <IconButton 
                        aria-label={item.label} 
                        size="small" 
                        sx={{ 
                          color: 'white', 
                          bgcolor: 'rgba(255, 255, 255, 0.1)', 
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            bgcolor: theme.palette.primary.main, // Using your turquoise color
                            transform: 'translateY(-3px)'
                          } 
                        }}
                      >
                        {item.icon}
                      </IconButton>
                    </Zoom>
                  ))}
                </Box>
                
                {[
                  { icon: <PhoneIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />, text: "(800) 555-WASH" },
                  { icon: <EmailIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />, text: "info@laundryheap.com" },
                  { icon: <LocationIcon fontSize="small" sx={{ mr: 1, mt: 0.3, opacity: 0.7 }} />, text: "123 Clean Street\nLaundry City, LC 12345" }
                ].map((item, index) => (
                  <Fade key={index} in={animateIn} style={{ transitionDelay: `${200 + index * 100}ms` }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: index === 2 ? 'flex-start' : 'center', 
                      mb: 1.5,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(5px)'
                      }
                    }}>
                      {item.icon}
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </Fade>
                ))}
              </Grid>
              
              {/* Quick Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40px',
                    height: '3px',
                    bgcolor: theme.palette.primary.main, // Using your turquoise color
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '80px',
                  }
                }}>
                  Services
                </Typography>
                <List disablePadding>
                  {services.map((item, index) => (
                    <Fade key={index} in={animateIn} style={{ transitionDelay: `${300 + index * 100}ms` }}>
                      <ListItem disablePadding disableGutters sx={{ mb: 1 }}>
                        <ListItemText 
                          primary={
                            <Link href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                              <Typography variant="body2" sx={{ 
                                color: 'rgba(255, 255, 255, 0.7)', 
                                transition: 'all 0.3s ease',
                                '&:hover': { 
                                  color: theme.palette.primary.light, // Using your light turquoise color
                                  pl: 1
                                } 
                              }}>
                                {item}
                              </Typography>
                            </Link>
                          } 
                        />
                      </ListItem>
                    </Fade>
                  ))}
                </List>
              </Grid>
              
              {/* Company */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40px',
                    height: '3px',
                    bgcolor: theme.palette.primary.main, // Using your turquoise color
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '80px',
                  }
                }}>
                  Company
                </Typography>
                <List disablePadding>
                  {companyLinks.map((item, index) => (
                    <Fade key={index} in={animateIn} style={{ transitionDelay: `${300 + index * 100}ms` }}>
                      <ListItem disablePadding disableGutters sx={{ mb: 1 }}>
                        <ListItemText 
                          primary={
                            <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                              <Typography variant="body2" sx={{ 
                                color: 'rgba(255, 255, 255, 0.7)', 
                                transition: 'all 0.3s ease',
                                '&:hover': { 
                                  color: theme.palette.primary.light, // Using your light turquoise color
                                  pl: 1
                                } 
                              }}>
                                {item}
                              </Typography>
                            </Link>
                          } 
                        />
                      </ListItem>
                    </Fade>
                  ))}
                </List>
              </Grid>
              
              {/* Newsletter */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold', 
                  mb: 2,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '40px',
                    height: '3px',
                    bgcolor: theme.palette.primary.main, // Using your turquoise color
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '80px',
                  }
                }}>
                  Subscribe to Our Newsletter
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
                  Get updates on special offers, new services, and laundry tips.
                </Typography>
                
                <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    placeholder="Your email address"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.08)',
                        },  
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      },
                      '& input': { color: 'white' },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton 
                            edge="end" 
                            sx={{ 
                              color: theme.palette.primary.main, // Using your turquoise color
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'rotate(20deg)',
                                color: theme.palette.primary.light // Using your light turquoise color
                              }
                            }}
                            type="submit"
                          >
                            <SendIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                
                {showThankYou && (
                  <Grow in={showThankYou}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.primary.light, // Using your light turquoise color
                        mb: 2,
                        fontWeight: 'medium'
                      }}
                    >
                      Thank you for subscribing!
                    </Typography>
                  </Grow>
                )}
                
                <Grow in={animateIn} style={{ transformOrigin: '0 0' }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.05)', 
                    borderRadius: 1, 
                    p: 2, 
                    mt: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Download Our App
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                      Manage your laundry services on the go.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                          color: 'white',
                          borderColor: theme.palette.secondary.main,
                          '&:hover': {
                            borderColor: theme.palette.secondary.light,
                            bgcolor: 'rgba(255, 255, 255, 0.1)'
                          }
                        }}
                      >
                        App Store
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                          color: 'white',
                          borderColor: theme.palette.secondary.main,
                          '&:hover': {
                            borderColor: theme.palette.secondary.light,
                            bgcolor: 'rgba(255, 255, 255, 0.1)'
                          }
                        }}
                      >
                        Google Play
                      </Button>
                    </Box>
                  </Box>
                </Grow>
              </Grid>
            </Grid>
          </Fade>
          
          <Divider sx={{ 
            borderColor: 'rgba(255, 255, 255, 0.1)', 
            my: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: '50%',
              bottom: 0,
              height: '4px',
              width: '50px',
              transform: 'translateX(-50%)',
              bgcolor: theme.palette.primary.main, // Using your turquoise color
              opacity: 0.5
            }
          }} />
          
          <Fade in={animateIn} timeout={1200}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'space-between', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              gap: 2 
            }}>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                © {new Date().getFullYear()} LaundryHeap. All rights reserved.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Link href="/privacy-policy" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      color: theme.palette.primary.light, // Using your light turquoise color
                      transform: 'translateY(-2px)'
                    } 
                  }}>
                    Privacy Policy
                  </Typography>
                </Link>
                <Link href="/terms-of-service" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      color: theme.palette.primary.light, // Using your light turquoise color
                      transform: 'translateY(-2px)'
                    } 
                  }}>
                    Terms of Service
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
                         