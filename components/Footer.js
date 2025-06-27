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
  ThemeProvider,
  Card
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {
  LinkedIn as LinkedInIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  ArrowUpward as ArrowUpwardIcon
} from '@mui/icons-material';
import Logo from '../Assets/logo2.jpg';
import { theme } from '../contexts/Theme';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
    
    // Show scroll to top button when scrolled down
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setShowThankYou(true);
      setEmail('');
      setTimeout(() => setShowThankYou(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LaundryNCleaningItems = [
    'How It Works', 'FAQ', 'Locations', 'Gift Cards', 
    'Refer Friends & Family', 'Commercial Services',
    'Airbnb Cleaning', 'Dry Cleaning', 'Protection Policy'
  ];

  const companyLinks = [
    'About Us', 'Contact', 'Blog', 'Careers', 
    'Partner Program', 'Brand Partnership', 'Terms', 
    'Privacy Policy', 'Accessibility'
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/freshboxpro', icon: <FacebookIcon />, color: '#1877F2' },
    { name: 'Instagram', url: 'https://www.instagram.com/freshboxpro', icon: <InstagramIcon />, color: '#E4405F' },
    { name: 'YouTube', url: 'https://www.youtube.com/freshboxpro', icon: <YouTubeIcon />, color: '#FF0000' },
    { name: 'Twitter', url: 'https://twitter.com/freshboxpro', icon: <TwitterIcon />, color: '#1DA1F2' },
    { name: 'WhatsApp', url: 'https://wa.me/12006009206', icon: <WhatsAppIcon />, color: '#25D366' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/freshboxpro', icon: <LinkedInIcon />, color: '#0A66C2' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          bgcolor: theme.palette.primary.FooterDarkColor || '#1a1a1a',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          }
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.3
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', py: 6 }}>
          <Fade in={animateIn} timeout={800}>
            <Grid container spacing={4}>
              {/* Company Info Section */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 160,
                      height: 55,
                      mb: 2,
                      cursor: 'pointer',
                      filter: 'brightness(0) invert(1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        filter: 'brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))',
                      }
                    }}
                  >
                    <Image
                      src={Logo}
                      alt="FreshBox Pro Logo"
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      opacity: 0.8, 
                      mb: 3, 
                      lineHeight: 1.6,
                      maxWidth: '280px'
                    }}
                  >
                    FreshBox Pro is America's one-stop solution for a cleaner home, fresher wardrobe, and more free time. From sparkling spaces to spotless clothes—we bring the clean to you.
                  </Typography>
                </Box>

                {/* Contact Information */}
                <Box sx={{ mb: 3 }}>
                  {[
                    { icon: <PhoneIcon />, text: "(200) 600-9206", href: "tel:+12006009206" },
                    { icon: <EmailIcon />, text: "support@freshboxpro.com", href: "mailto:support@freshboxpro.com" },
                  ].map((item, index) => (
                    <Fade key={index} in={animateIn} style={{ transitionDelay: `${200 + index * 100}ms` }}>
                      <Box 
                        component="a"
                        href={item.href}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1.5,
                          color: 'inherit',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          p: 1,
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            transform: 'translateX(8px)',
                            color: theme.palette.primary.light
                          }
                        }}
                      >
                        <Box sx={{ 
                          mr: 2, 
                          opacity: 0.7,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 24,
                          height: 24
                        }}>
                          {item.icon}
                        </Box>
                        <Typography variant="body2">
                          {item.text}
                        </Typography>
                      </Box>
                    </Fade>
                  ))}
                </Box>
              </Grid>
              
              {/* Services Section */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: '600', 
                    mb: 3,
                    fontSize: '1.1rem',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '30px',
                      height: '3px',
                      bgcolor: theme.palette.primary.main,
                      borderRadius: '2px',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '60px',
                    }
                  }}
                >
                  Services
                </Typography>
                <List disablePadding>
                  {LaundryNCleaningItems.map((item, index) => (
                    <Fade key={index} in={animateIn} style={{ transitionDelay: `${400 + index * 50}ms` }}>
                      <ListItem 
                        disablePadding 
                        disableGutters 
                        sx={{ 
                          mb: 0.5,
                          transition: 'all 0.2s ease',
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.03)',
                            pl: 1
                          }
                        }}
                      >
                        <ListItemText 
                          primary={
                            <Link 
                              href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                              style={{ textDecoration: 'none' }}
                            >
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(255, 255, 255, 0.75)', 
                                  fontSize: '0.875rem',
                                  transition: 'all 0.3s ease',
                                  py: 0.5,
                                  '&:hover': { 
                                    color: theme.palette.primary.light,
                                  } 
                                }}
                              >
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
              
              {/* Company Section */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: '600', 
                    mb: 3,
                    fontSize: '1.1rem',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '30px',
                      height: '3px',
                      bgcolor: theme.palette.primary.main,
                      borderRadius: '2px',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '60px',
                    }
                  }}
                >
                  Company
                </Typography>
                <List disablePadding>
                  {companyLinks.map((item, index) => (
                    <Fade key={index} in={animateIn} style={{ transitionDelay: `${400 + index * 50}ms` }}>
                      <ListItem 
                        disablePadding 
                        disableGutters 
                        sx={{ 
                          mb: 0.5,
                          transition: 'all 0.2s ease',
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.03)',
                            pl: 1
                          }
                        }}
                      >
                        <ListItemText 
                          primary={
                            <Link 
                              href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                              style={{ textDecoration: 'none' }}
                            >
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(255, 255, 255, 0.75)', 
                                  fontSize: '0.875rem',
                                  transition: 'all 0.3s ease',
                                  py: 0.5,
                                  '&:hover': { 
                                    color: theme.palette.primary.light,
                                  } 
                                }}
                              >
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

              {/* Connect Section (Social Icons) */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: '600', 
                    mb: 3,
                    fontSize: '1.1rem',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '30px',
                      height: '3px',
                      bgcolor: theme.palette.primary.main,
                      borderRadius: '2px',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '60px',
                    }
                  }}
                >
                  Connect
                </Typography>
                {/* Vertical list of social names as links */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                  <Link href="https://www.instagram.com/freshboxpro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>Instagram</Typography>
                  </Link>
                  <Link href="https://www.facebook.com/freshboxpro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>Facebook</Typography>
                  </Link>
                  <Link href="https://www.youtube.com/freshboxpro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>Youtube</Typography>
                  </Link>
                  <Link href="https://twitter.com/freshboxpro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>X (Twitter)</Typography>
                  </Link>
                  <Link href="#" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>TikTok</Typography>
                  </Link>
                  <Link href="https://wa.me/12006009206" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>Whatsapp</Typography>
                  </Link>
                  <Link href="/support" style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>Contact</Typography>
                  </Link>
                </Box>
                {/* Horizontal grid of colored square social icons: 3 columns, 2 rows */}
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 38px)',
                  gap: 1.5,
                  mb: 2,
                  mt: 1,
                  justifyContent: 'start',
                }}>
                  <IconButton component="a" href="https://www.facebook.com/freshboxpro" target="_blank" rel="noopener noreferrer" sx={{ bgcolor: '#1877F2', borderRadius: 2, p: 0.5, width: 38, height: 38, '&:hover': { bgcolor: '#145db2' } }}>
                    <FacebookIcon sx={{ color: 'white', fontSize: 28 }} />
                  </IconButton>
                  <IconButton component="a" href="https://www.instagram.com/freshboxpro" target="_blank" rel="noopener noreferrer" sx={{ bgcolor: '#E4405F', borderRadius: 2, p: 0.5, width: 38, height: 38, '&:hover': { bgcolor: '#b92d4b' } }}>
                    <InstagramIcon sx={{ color: 'white', fontSize: 28 }} />
                  </IconButton>
                  <IconButton component="a" href="https://www.youtube.com/freshboxpro" target="_blank" rel="noopener noreferrer" sx={{ bgcolor: '#FF0000', borderRadius: 2, p: 0.5, width: 38, height: 38, '&:hover': { bgcolor: '#b80000' } }}>
                    <YouTubeIcon sx={{ color: 'white', fontSize: 28 }} />
                  </IconButton>
                  <IconButton component="a" href="https://wa.me/12006009206" target="_blank" rel="noopener noreferrer" sx={{ bgcolor: '#25D366', borderRadius: 2, p: 0.5, width: 38, height: 38, '&:hover': { bgcolor: '#1da851' } }}>
                    <WhatsAppIcon sx={{ color: 'white', fontSize: 28 }} />
                  </IconButton>
                  <IconButton component="a" href="#" target="_blank" rel="noopener noreferrer" sx={{ bgcolor: '#000000', borderRadius: 2, p: 0.5, width: 38, height: 38, '&:hover': { bgcolor: '#222' } }}>
                    {/* TikTok icon is not imported, use MusicNoteIcon as placeholder */}
                    <MusicNoteIcon sx={{ color: 'white', fontSize: 28 }} />
                  </IconButton>
                  <IconButton component="a" href="https://twitter.com/freshboxpro" target="_blank" rel="noopener noreferrer" sx={{ bgcolor: '#000000', borderRadius: 2, p: 0.5, width: 38, height: 38, '&:hover': { bgcolor: '#222' } }}>
                    <TwitterIcon sx={{ color: 'white', fontSize: 28 }} />
                  </IconButton>
                </Box>
              </Grid>

              {/* Redesigned Get Our App Section */}
              <Grid item xs={12} sm={6} md={2.4}>
                <Box sx={{
                  bgcolor: '#2A7DB8',
                  borderRadius: 3,
                  p: 3,
                  mb: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 4px 24px rgba(42,125,184,0.10)',
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: '600', 
                      mb: 2,
                      fontSize: '1.1rem',
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Download Our App
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                    <Box 
                      component="a" 
                      href="https://apps.apple.com/app/freshbox-pro" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      sx={{ 
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    >
                      <Image
                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                        alt="Download on the App Store"
                        width={140}
                        height={48}
                        priority={false}
                      />
                    </Box>
                    <Box 
                      component="a" 
                      href="https://play.google.com/store/apps/details?id=com.freshboxpro" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      sx={{ 
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    >
                      <Image
                        src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                        alt="Get it on Google Play"
                        width={160}
                        height={62}
                        priority={false}
                      />
                    </Box>
                  </Box>
                </Box>
                {/* Newsletter Signup */}
                <Grow in={animateIn} style={{ transformOrigin: '0 0' }}>
                  <Card
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.05)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 2, 
                      p: 3, 
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                      }
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: '600', mb: 1, color: 'white' }}>
                      Stay Updated
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 2, lineHeight: 1.5 }}>
                      Get the latest offers and updates delivered to your inbox.
                    </Typography>
                    <Box component="form" onSubmit={handleSubscribe} sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: 'rgba(255, 255, 255, 0.6)',
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          '&:hover': {
                            bgcolor: theme.palette.primary.dark,
                            transform: 'translateY(-1px)',
                          },
                          py: 1
                        }}
                      >
                        {showThankYou ? 'Thank You!' : 'SUBSCRIBE'}
                      </Button>
                    </Box>
                  </Card>
                </Grow>
              </Grid>
            </Grid>
          </Fade>
          
          {/* Elegant Divider */}
          <Box sx={{ my: 4, position: 'relative' }}>
            <Divider sx={{ 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              '&::before, &::after': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }
            }} />
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '4px',
                bgcolor: theme.palette.primary.main,
                borderRadius: '2px',
                opacity: 0.6
              }}
            />
          </Box>
          
          {/* Footer Bottom */}
          <Fade in={animateIn} timeout={1200}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'space-between', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              gap: 2,
              pt: 2
            }}>
              <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.875rem' }}>
                © {new Date().getFullYear()} FreshBox Pro. All rights reserved.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <Link 
                    key={item}
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          color: theme.palette.primary.light,
                          transform: 'translateY(-1px)'
                        } 
                      }}
                    >
                      {item}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Box>
          </Fade>
        </Container>

        
      </Box>
    </ThemeProvider>
  );
}