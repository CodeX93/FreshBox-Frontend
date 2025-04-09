'use client';

import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Fade,
  Button,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Define constants
const TURQUOISE = '#2E7B5C';
const TURQUOISE_DARK = '#20c5b7';
const TURQUOISE_LIGHT = '#e8f9f8';

// Styled components for enhanced UI
const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid',
  borderColor: theme.palette.grey[100],
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
  '&:hover': {
    borderColor: TURQUOISE,
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 35px rgba(40, 221, 205, 0.15)'
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: TURQUOISE_LIGHT,
  color: TURQUOISE,
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${TURQUOISE}30`,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: TURQUOISE,
    color: 'white',
    transform: 'scale(1.1)'
  }
}));

const ContactDetail = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  color: TURQUOISE,
  fontSize: '1.1rem',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    color: TURQUOISE_DARK,
    textDecoration: 'underline'
  }
}));

const ClientContactInfo = ({ loaded, contactOptions }) => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <Fade in={loaded} timeout={1000} style={{ transitionDelay: '300ms' }}>
      <Box>
        <Typography 
          variant="h3" 
          component="h2" 
          id="contact-section-heading"
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
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} justifyContent="center">
            {contactOptions.map((contact, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <ContactCard elevation={0}>
                    <IconContainer
                      component={motion.div}
                      whileHover={{ scale: 1.1, backgroundColor: TURQUOISE, color: 'white' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {contact.icon}
                    </IconContainer>
                    
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, color: '#2d3748' }}>
                      {contact.title}
                    </Typography>
                    
                    <Tooltip title={contact.type === 'email' || contact.type === 'phone' ? 'Click to copy' : 'Open in maps'}>
                      <ContactDetail 
                        variant="body1"
                        component={motion.p}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => {
                          if (contact.type === 'email' || contact.type === 'phone') {
                            copyToClipboard(contact.detail);
                          } else if (contact.href) {
                            window.open(contact.href, '_blank');
                          }
                        }}
                      >
                        {contact.detail}
                      </ContactDetail>
                    </Tooltip>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      textAlign="center"
                    >
                      {contact.subDetail}
                    </Typography>
                    
                    {/* Action button */}
                    <Box sx={{ mt: 3, width: '100%' }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        component={motion.button}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={contact.href}
                        target={contact.type === 'address' ? '_blank' : undefined}
                        sx={{
                          color: TURQUOISE,
                          borderColor: TURQUOISE,
                          '&:hover': {
                            borderColor: TURQUOISE_DARK,
                            backgroundColor: `${TURQUOISE}10`
                          },
                          borderRadius: 2,
                          textTransform: 'none',
                          py: 1
                        }}
                      >
                        {contact.type === 'email' ? 'Send Email' : 
                          contact.type === 'phone' ? 'Call Now' : 'Get Directions'}
                      </Button>
                    </Box>
                  </ContactCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Fade>
  );
};

export default ClientContactInfo;