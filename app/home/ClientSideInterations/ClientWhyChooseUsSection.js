'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Feature Card Component 
const FeatureCard = ({ icon, title, description, bgColor, textColor = 'white' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        p: isMobile ? 2 : 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 2,
      }}
    >
      <Box sx={{ 
        mb: 1, 
        color: textColor, 
        display: 'flex',
        fontSize: isMobile ? '1.2rem' : '1.5rem',
      }}>
        {icon}
      </Box>
      <Typography variant="h6" component="h3" sx={{ 
        fontWeight: 600, 
        textTransform: 'uppercase',
        letterSpacing: 1,
        mb: 1,
        fontSize: isMobile ? '0.9rem' : '1.1rem',
        color: textColor,
      }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ 
        color: textColor === 'white' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
        fontSize: isMobile ? '0.75rem' : '0.85rem',
      }}>
        {description}
      </Typography>
    </Box>
  );
};

const WhyChooseUsSection = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Color palette
  const darkGreen = '#213B25';
  const lightGreen = '#B5E2D0';
  const darkBrown = '#21130D';
  const white = '#FFFFFF';

  // Mobile Layout
  if (isMobile) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              color: '#000',
              fontWeight: 700,
              fontSize: '2.5rem',
              lineHeight: 1.1,
              mb: 2,
              textTransform: 'uppercase',
            }}
          >
            Why Choose Us?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555',
              maxWidth: '90%',
              mx: 'auto',
              fontSize: '0.9rem',
            }}
          >
            Everyday we work hard to make life of our clients better and happier.
          </Typography>
        </Box>

        {/* Extended Feature Grid */}
        <Grid container spacing={2}>
          {[
            {
              icon: <LightbulbOutlinedIcon fontSize="small" />,
              title: "Expert Care",
              description: "Professionally trained staff with specialized knowledge.",
              bgColor: darkGreen
            },
            {
              icon: <CalendarTodayIcon fontSize="small" />,
              title: "Free Pickup & Delivery",
              description: "Convenient door-to-door service that saves you time.",
              bgColor: darkGreen
            },
            {
              icon: <AccessTimeIcon fontSize="small" />,
              title: "24-Hour Service",
              description: "Quick turnaround times with 24-hour service available.",
              bgColor: white,
              textColor: darkGreen
            },
            {
              icon: <SettingsIcon fontSize="small" />,
              title: "Advanced Technology",
              description: "State-of-the-art cleaning equipment and techniques.",
              bgColor: darkBrown
            },
            {
              icon: <LightbulbOutlinedIcon fontSize="small" />,
              title: "Eco-Friendly",
              description: "Green cleaning solutions safer for your clothes and family.",
              bgColor: darkGreen
            },
            {
              icon: <SettingsIcon fontSize="small" />,
              title: "Customized Solutions",
              description: "Personalized service plans tailored to your needs.",
              bgColor: darkGreen
            },
            {
              icon: <StarIcon fontSize="small" />,
              title: "Quality Guarantee",
              description: "100% satisfaction guarantee with free re-cleaning if not satisfied.",
              bgColor: darkBrown
            }
          ].map((feature, index) => (
            <Grid 
              item 
              xs={6} 
              key={index} 
              sx={{ 
                height: '15vh',
                ...(index === 6 && { xs: 12 }) // Full width for last item
              }}
            >
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                bgColor={feature.bgColor}
                textColor={feature.textColor}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  // Desktop Layout
  return (
    <Box 
      component="section" 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#fff',
        width: '100%',
        height: '100vh',
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        {/* Left Column - Feature Cards */}
        <Grid 
          item 
          xs={4} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Feature 1 */}
          <Box sx={{ height: '50%', p: 1 }}>
            <FeatureCard
              icon={<MonetizationOnIcon fontSize="large" />}
              title="Competitive Pricing"
              description="Experience quality laundry services without breaking the bank—we offer fair and competitive pricing."
              bgColor={darkGreen}
            />
          </Box>
          
          {/* Feature 2 */}
          <Box sx={{ height: '50%', p: 1 }}>
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
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Box 
            sx={{ 
              textAlign: 'center',
              p: 3,
            }}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: darkGreen,
                fontWeight: 500,
                mb: 1,
                textTransform: 'uppercase',
                letterSpacing: 2,
              }}
            >
              / Why FreshBox?
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                color: darkBrown,
                fontWeight: 700,
                fontSize: '3rem',
                lineHeight: 1.1,
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
                mx: 'auto',
                mb: 3,
                fontSize: '0.9rem',
              }}
            >
              Everyday we work hard to make life of our clients better and happier by providing 
              premium laundry and dry cleaning services with quick turnaround times.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="text" 
                endIcon={<KeyboardArrowRightIcon />}
                onClick={() => router.push('/support')}
                sx={{ 
                  color: darkGreen,
                  fontWeight: 500,
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

        {/* Right Column - Feature Cards */}
        <Grid 
          item 
          xs={4} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Feature 3 */}
          <Box sx={{ height: '50%', p: 1 }}>
            <FeatureCard
              icon={<AccessTimeIcon fontSize="large" />}
              title="24-Hour Service"
              description="Quick turnaround times with 24-hour service available for urgent cleaning needs."
              bgColor={darkGreen}
            />
          </Box>
          
          {/* Feature 4 */}
          <Box sx={{ height: '50%', p: 1 }}>
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