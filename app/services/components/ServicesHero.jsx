'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';

const ServicesHero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.4
      }
    })
  };

  return (
    <Box sx={{ 
      background: `linear-gradient(rgba(13, 59, 110, 0.8), rgba(40, 221, 205, 0.8)), url('/laundry-bg.jpg')`, // Using theme colors
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      py: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <Typography variant="h2" sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                mb: 2,
                color: 'white',
                [theme.breakpoints.down('md')]: { fontSize: '2.5rem' }
              }}>
                Premium Laundry<br/>Services
              </Typography>
              
              <Typography variant="h5" sx={{ 
                fontWeight: 400, 
                color: 'white',
                mb: 4
              }}>
                Save time with our professional cleaning services
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="contained" 
                    size="large" 
                    sx={{ 
                      py: 1.5, 
                      px: 4,
                      borderRadius: 2,
                      fontWeight: 600,
                      backgroundColor: theme.palette.secondary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.dark,
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outlined" 
                    size="large" 
                    sx={{ 
                      py: 1.5, 
                      px: 4,
                      borderRadius: 2,
                      color: 'white',
                      borderColor: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Paper elevation={5} sx={{ 
                p: 4, 
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.dark }}>
                  Why Choose Us?
                </Typography>
                <List>
                  {[
                    'Free pickup and delivery',
                    'Eco-friendly cleaning solutions',
                    'Fast turnaround times', 
                    '100% satisfaction guarantee',
                    'Expert handling of delicate fabrics'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={listItemVariants}
                    >
                      <ListItem sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Animated floating elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 1
        }}
      />
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 1
        }}
      />
    </Box>
  );
};

export default ServicesHero;    