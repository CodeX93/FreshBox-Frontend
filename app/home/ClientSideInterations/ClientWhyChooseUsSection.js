'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

// Feature Card Component for the left and bottom sections
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

const ExactWhyChooseUsClone = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Example of using router
  const handleFeatureClick = (path) => {
    router.push(path);
  };

  // On mobile and tablet, we'll use a different layout
  if (isMobile) {
    return (
      <Box 
        component="section" 
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
                  fontSize: '0.9rem',
                }}
              >
                Everyday we work hard to make life of our clients better and happier.
              </Typography>
            </Box>
          </Grid>

          {/* Center - Image */}
          <Grid 
            item 
            xs={12}
            sx={{ 
              position: 'relative',
              height: '30vh',
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="Woman in green sweater"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Grid>

          {/* Feature grid - 7 reasons */}
          <Grid container>
            {/* Row 1 */}
            <Grid item xs={6} sx={{ height: '15vh', backgroundColor: '#1e3a4c' }}>
              <FeatureCard
                icon={<LightbulbOutlinedIcon fontSize="small" />}
                title="Expert Care"
                description="Professionally trained staff with specialized knowledge."
                bgColor="#1e3a4c"
              />
            </Grid>
            <Grid item xs={6} sx={{ height: '15vh', backgroundColor: '#1e3a4c' }}>
              <FeatureCard
                icon={<CalendarTodayIcon fontSize="small" />}
                title="Free Pickup & Delivery"
                description="Convenient door-to-door service that saves you time."
                bgColor="#1e3a4c"
              />
            </Grid>
            
            {/* Row 2 */}
            <Grid item xs={6} sx={{ height: '15vh', backgroundColor: '#fff' }}>
              <FeatureCard
                icon={<AccessTimeIcon fontSize="small" />}
                title="24-Hour Service"
                description="Quick turnaround times with 24-hour service available."
                bgColor="#fff"
              />
            </Grid>
            <Grid item xs={6} sx={{ height: '15vh', backgroundColor: '#0a0a0a' }}>
              <FeatureCard
                icon={<SettingsIcon fontSize="small" />}
                title="Advanced Technology"
                description="State-of-the-art cleaning equipment and techniques."
                bgColor="#0a0a0a"
              />
            </Grid>
            
            {/* Row 3 */}
            <Grid item xs={6} sx={{ height: '15vh', backgroundColor: '#1e3a4c' }}>
              <FeatureCard
                icon={<LightbulbOutlinedIcon fontSize="small" />}
                title="Eco-Friendly"
                description="Green cleaning solutions safer for your clothes and family."
                bgColor="#1e3a4c"
              />
            </Grid>
            <Grid item xs={6} sx={{ height: '15vh', backgroundColor: '#1e3a4c' }}>
              <FeatureCard
                icon={<SettingsIcon fontSize="small" />}
                title="Customized Solutions"
                description="Personalized service plans tailored to your needs."
                bgColor="#1e3a4c"
              />
            </Grid>
            
            {/* Row 4 */}
            <Grid item xs={12} sx={{ height: '15vh', backgroundColor: '#0a0a0a' }}>
              <FeatureCard
                icon={<LightbulbOutlinedIcon fontSize="small" />}
                title="Quality Guarantee"
                description="100% satisfaction guarantee on all services with free re-cleaning if you're not completely satisfied."
                bgColor="#0a0a0a"
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
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#fff',
        width: '100%',
        height: '100vh', // Full viewport height
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        {/* Left Column - 5 Feature Cards */}
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
          <Box sx={{ height: '20%', backgroundColor: '#1e3a4c' }}>
            <FeatureCard
              icon={<LightbulbOutlinedIcon fontSize="large" />}
              title="Expert Care"
              description="Professionally trained staff with specialized knowledge in fabric care and stain removal."
              bgColor="#1e3a4c"
            />
          </Box>
          
          {/* Feature 2 */}
          <Box sx={{ height: '20%', backgroundColor: '#fff' }}>
            <FeatureCard
              icon={<AccessTimeIcon fontSize="large" />}
              title="24-Hour Service"
              description="Quick turnaround times with 24-hour service available for urgent cleaning needs."
              bgColor="#fff"
            />
          </Box>
          
          {/* Feature 3 */}
          <Box sx={{ height: '20%', backgroundColor: '#1e3a4c' }}>
            <FeatureCard
              icon={<CalendarTodayIcon fontSize="large" />}
              title="Eco-Friendly"
              description="Green cleaning solutions that are safer for your clothes, your family, and the environment."
              bgColor="#1e3a4c"
            />
          </Box>
          
          {/* Feature 6 */}
          <Box sx={{ height: '20%', backgroundColor: '#fff' }}>
            <FeatureCard
              icon={<SettingsIcon fontSize="large" />}
              title="Customized Solutions"
              description="Personalized service plans tailored to your specific cleaning needs and preferences."
              bgColor="#fff"
            />
          </Box>
          
          {/* Feature 7 */}
          <Box sx={{ height: '20%', backgroundColor: '#1e3a4c' }}>
            <FeatureCard
              icon={<LightbulbOutlinedIcon fontSize="large" />}
              title="Quality Guarantee"
              description="100% satisfaction guarantee on all services with free re-cleaning if you're not completely satisfied."
              bgColor="#1e3a4c"
            />
          </Box>
        </Grid>

        {/* Center Column - Image */}
        <Grid 
          item 
          xs={4} 
          md={4} 
          sx={{ 
            position: 'relative',
            height: '100%',
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="Woman in green sweater"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Grid>

        {/* Right Column - Feature Cards and Title */}
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
              height: '33.33%',
              backgroundColor: '#f5f5f5',
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
                alignItems: 'flex-end',
                textAlign: 'right',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  color: '#000',
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  lineHeight: 1,
                  mb: 1,
                  textTransform: 'uppercase',
                }}
              >
                Why<br />Choose<br />Us?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#555',
                  maxWidth: '80%',
                  fontSize: '0.9rem',
                }}
              >
                Everyday we work hard to make life of our clients better and happier.
              </Typography>
            </Box>
          </Box>
          
          {/* Feature 4 */}
          <Box sx={{ height: '33.33%', backgroundColor: '#1e3a4c' }}>
            <FeatureCard
              icon={<CalendarTodayIcon fontSize="large" />}
              title="Free Pickup & Delivery"
              description="Convenient door-to-door service that saves you time and hassle with scheduled pickups and deliveries."
              bgColor="#1e3a4c"
            />
          </Box>
          
          {/* Feature 5 */}
          <Box sx={{ height: '33.33%', backgroundColor: '#0a0a0a' }}>
            <FeatureCard
              icon={<SettingsIcon fontSize="large" />}
              title="Advanced Technology"
              description="State-of-the-art cleaning equipment and techniques that deliver superior results while being gentle on fabrics."
              bgColor="#0a0a0a"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
        >
          <FeatureCard
            icon={<LightbulbOutlinedIcon fontSize="large" />}
            title="Sample Headline"
            description="Sample text. Click to select the text box."
            bgColor="#1e3a4c"
          />
        </Grid>

        {/* Top Center - Image (continues into middle too) */}
        <Grid 
          item 
          xs={8} 
          md={4} 
          sx={{ 
            position: 'relative',
            height: '100%', // Full height for the image
            gridRow: 'span 3',
          }}
          rowSpan={3}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="Woman in green sweater"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Grid>

        {/* Top Right - Why Choose Us */}
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{ 
            backgroundColor: '#f5f5f5',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '33.33%',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              textAlign: 'right',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                color: '#000',
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3rem' },
                lineHeight: 1,
                mb: 1,
                textTransform: 'uppercase',
              }}
            >
              Why<br />Choose<br />Us?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#555',
                maxWidth: '80%',
                fontSize: '0.9rem',
              }}
            >
              Everyday we work hard to make life of our clients better and happier.
            </Typography>
          </Box>
        </Grid>

        {/* Middle Left - Empty but needed for layout */}
        <Grid 
          item 
          xs={4} 
          md={4} 
          sx={{ 
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '33.33%',
          }}
        >
          <FeatureCard
            icon={<AccessTimeIcon fontSize="large" />}
            title="Sample Headline"
            description="Sample text. Click to select the text box."
            bgColor="#fff"
          />
        </Grid>

        {/* Middle Right - Green Calendar Box */}
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{ 
            backgroundColor: '#1e3a4c',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '33.33%',
          }}
        >
          <FeatureCard
            icon={<CalendarTodayIcon fontSize="large" />}
            title="Sample Headline"
            description="Sample text. Click to select the text box."
            bgColor="#1e3a4c"
          />
        </Grid>

        {/* Bottom Left - White Box */}
        <Grid 
          item 
          xs={4} 
          md={4} 
          sx={{ 
            backgroundColor: '#1e3a4c',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '33.33%',
          }}
        >
          <FeatureCard
            icon={<AccessTimeIcon fontSize="large" />}
            title="Sample Headline"
            description="Sample text. Click to select the text box."
            bgColor="#1e3a4c"
          />
        </Grid>

        {/* Bottom Right - Black Settings Box */}
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{ 
            backgroundColor: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '33.33%',
          }}
        >
          <FeatureCard
            icon={<SettingsIcon fontSize="large" />}
            title="Sample Headline"
            description="Sample text. Click to select the text box."
            bgColor="#0a0a0a"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExactWhyChooseUsClone;