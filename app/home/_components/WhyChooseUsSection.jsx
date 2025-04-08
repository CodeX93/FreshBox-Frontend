'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';

// Feature Card Component for the benefits section
const FeatureCard = ({ icon, title, description, bgColor }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        color: 'white',
        p: isMobile ? 2 : 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ 
        mb: 1, 
        color: '#fff', 
        display: 'flex',
        fontSize: isMobile ? '1.2rem' : '1.5rem',
      }}>
        {icon}
      </Box>
      <Typography variant="h6" component="h3" sx={{ 
        fontWeight: 400, 
        textTransform: 'uppercase',
        letterSpacing: 1,
        mb: 1,
        fontSize: isMobile ? '0.9rem' : '1.1rem',
      }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ 
        color: 'rgba(255,255,255,0.8)',
        fontSize: isMobile ? '0.75rem' : '0.85rem',
      }}>
        {description}
      </Typography>
    </Box>
  );
};

const WhyChooseUsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const router = useRouter();

  // Replace the blues with green shades
  const darkGreen = '#213B25'; // Dark green replacing #1e3a4c
  const lightGreen = '#FFFFFF'; // White for cards that need better text contrast
  const darkBrown = '#21130D'; // Dark brown/black replacing #0a0a0a

  // On mobile and tablet, we'll use a different layout
  if (isMobile) {
    return (
      <Box 
        component="section" 
        id="why-razor-section"
        sx={{ 
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#fff',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        {/* Mobile layout - stacked grid */}
        <Grid container sx={{ minHeight: '100vh' }}>
          {/* Top - Why Choose Us */}
          <Grid 
            item 
            xs={12}
            sx={{ 
              backgroundColor: '#f5f5f5',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '25vh',
            }}
          >
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
                              <Typography 
                variant="subtitle1" 
                component="p" 
                sx={{ 
                  color: darkGreen,
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                / Why FreshBox?
              </Typography>
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  color: darkBrown,
                  fontWeight: 700,
                  fontSize: '2.5rem',
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >
                The Razor Difference
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#555',
                  maxWidth: '90%',
                  fontSize: '0.9rem',
                }}
              >
                For over a decade, we've been a proud service provider, earning and maintaining the trust of 
                the community in Saskatoon, Martensville, Warman, and surrounding areas.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                <Button 
                  variant="text" 
                  endIcon={<KeyboardArrowRightIcon />}
                  sx={{ 
                    color: darkGreen,
                    fontWeight: 500,
                    px: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Call Now
                </Button>
                <Button 
                  variant="text" 
                  endIcon={<KeyboardArrowRightIcon />}
                  sx={{ 
                    color: darkGreen,
                    fontWeight: 500,
                    px: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Book Free Estimate
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Feature grid - reasons */}
          <Grid container>
            {/* Row 1 */}
            <Grid item xs={6} sx={{ height: '18vh', backgroundColor: darkGreen }}>
              <FeatureCard
                icon={<MonetizationOnIcon fontSize="small" />}
                title="Competitive Pricing"
                description="Experience quality laundry services without breaking the bank—we offer fair and competitive pricing."
                bgColor={darkGreen}
              />
            </Grid>
            <Grid item xs={6} sx={{ height: '18vh', backgroundColor: darkGreen }}>
              <FeatureCard
                icon={<EmojiEventsIcon fontSize="small" />}
                title="Expert Care"
                description="Professionally trained staff with specialized knowledge in fabric care and stain removal."
                bgColor={darkGreen}
              />
            </Grid>
            
            {/* Row 2 */}
            <Grid item xs={6} sx={{ height: '18vh', backgroundColor: lightGreen }}>
              <FeatureCard
                icon={<AccessTimeIcon fontSize="small" />}
                title="24-Hour Service"
                description="Quick turnaround times with 24-hour service available for urgent cleaning needs."
                bgColor={lightGreen}
              />
            </Grid>
            <Grid item xs={6} sx={{ height: '18vh', backgroundColor: darkBrown }}>
              <FeatureCard
                icon={<StarIcon fontSize="small" />}
                title="100% Satisfaction"
                description="Don't just take our word for it—see what our clients say about FreshBox Laundry."
                bgColor={darkBrown}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }

  // Desktop layout
  return (
    <Box 
      component="section" 
      id="why-razor-section"
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#fff',
        width: '100%',
        height: '100vh', // Full viewport height
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        {/* Left Column - Feature Cards */}
        <Grid 
          item 
          xs={4} 
          md={4} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Feature 1 */}
          <Box sx={{ height: '50%', backgroundColor: darkGreen }}>
            <FeatureCard
              icon={<MonetizationOnIcon fontSize="large" />}
              title="Competitive Pricing"
              description="Experience quality laundry services without breaking the bank—we offer fair and competitive pricing."
              bgColor={darkGreen}
            />
          </Box>
          
          {/* Feature 2 */}
          <Box sx={{ height: '50%', backgroundColor: darkBrown }}>
            <FeatureCard
              icon={<EmojiEventsIcon fontSize="large" />}
              title="Expert Care"
              description="Professionally trained staff with specialized knowledge in fabric care and stain removal."
              bgColor={darkBrown}
            />
          </Box>
        </Grid>

        {/* Center Column - Title and Info */}
        <Grid 
          item 
          xs={4} 
          md={4} 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Title Section */}
          <Box 
            sx={{ 
              height: '100%',
              backgroundColor: '#fff',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Typography 
                variant="subtitle1" 
                component="p" 
                sx={{ 
                  color: darkGreen,
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                / Why FreshBox?
              </Typography>
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  color: darkBrown,
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1,
                  mb: 2,
                }}
              >
                The FreshBox<br />Difference
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#555',
                  maxWidth: '80%',
                  mb: 3,
                  fontSize: '0.9rem',
                }}
              >
                Everyday we work hard to make life of our clients better and happier by providing 
                premium laundry and dry cleaning services with quick turnaround times.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button 
                  variant="text" 
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={()=>{router.push('/support')}}
                  sx={{ 
                    color: darkGreen,
                    fontWeight: 500,
                    px: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Contact Now
                </Button>
                <Button 
                  variant="text" 
                  endIcon={<KeyboardArrowRightIcon />}
                  sx={{ 
                    color: darkGreen,
                    fontWeight: 500,
                    px: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Book Free Estimate
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Column - Feature Cards */}
        <Grid 
          item 
          xs={4} 
          md={4} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Feature 3 */}
          <Box sx={{ height: '50%', backgroundColor: darkGreen }}>
            <FeatureCard
              icon={<AccessTimeIcon fontSize="large" />}
              title="24-Hour Service"
              description="Quick turnaround times with 24-hour service available for urgent cleaning needs."
              bgColor={darkGreen}
            />
          </Box>
          
          {/* Feature 4 */}
          <Box sx={{ height: '50%', backgroundColor: darkBrown }}>
            <FeatureCard
              icon={<StarIcon fontSize="large" />}
              title="100% Satisfaction"
              description="Don't just take our word for it—see what our clients say about FreshBox Laundry."
              bgColor={darkBrown}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyChooseUsSection;