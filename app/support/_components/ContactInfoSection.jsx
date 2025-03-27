import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Fade
} from '@mui/material';

import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

// Define constants
const TURQUOISE = '#28ddcd';
const TURQUOISE_DARK = '#20c5b7';
const TURQUOISE_LIGHT = '#e8f9f8';

const ContactInfoSection = ({ loaded }) => {
  return (
    <Fade in={loaded} timeout={1000} style={{ transitionDelay: '300ms' }}>
      <Box>
        <Typography 
          variant="h3" 
          component="h2" 
          fontWeight={800} 
          textAlign="center" 
          sx={{ 
            mb: { xs: 3, md: 4 },
            color: '#2d3748',
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            position: 'relative',
            display: 'inline-block',
            width: '100%'
          }}
        >
          Ways to Connect
          <Box sx={{
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: 60, sm: 80 },
            height: 4,
            bgcolor: TURQUOISE,
            borderRadius: 2
          }} />
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {[
            { 
              icon: <EmailIcon sx={{ fontSize: 36 }} />, 
              title: "Email Us", 
              detail: "support@freshbox.com", 
              subDetail: "24/7 email support" 
            },
            { 
              icon: <PhoneIcon sx={{ fontSize: 36 }} />, 
              title: "Call Us", 
              detail: "(800) 123-4567", 
              subDetail: "Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm" 
            },
            { 
              icon: <LocationIcon sx={{ fontSize: 36 }} />, 
              title: "Visit Us", 
              detail: "123 Clean Street, Suite 200", 
              subDetail: "Metro City, ST 12345" 
            },
          ].map((contact, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Fade in={loaded} timeout={1000} style={{ transitionDelay: `${400 + (index * 100)}ms` }}>
                <Paper
                  elevation={0}
                  sx={{ 
                    p: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'grey.100',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    '&:hover': {
                      borderColor: TURQUOISE,
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: TURQUOISE_LIGHT,
                      color: TURQUOISE,
                      p: 2.5,
                      borderRadius: '16px',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${TURQUOISE}30`
                    }}
                  >
                    {contact.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, color: '#2d3748' }}>
                    {contact.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    fontWeight={500} 
                    sx={{ 
                      mb: 1.5,
                      color: TURQUOISE,
                      fontSize: '1.1rem'
                    }}
                  >
                    {contact.detail}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    textAlign="center"
                  >
                    {contact.subDetail}
                  </Typography>
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
};

export default ContactInfoSection;