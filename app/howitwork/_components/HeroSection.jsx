import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection = ({ fadeInUp, scrollY }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollAnimation = {
    y: isMobile ? 0 : scrollY * 0.1,
    opacity: 1 - (scrollY * 0.002),
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 'auto', md: '90vh' },
        minHeight: { xs: 500, md: 700 },
        maxHeight: 900,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        pt: { xs: 8, md: 0 },
        pb: { xs: 10, md: 0 },
      }}
    >
      {/* Animated background elements */}
      <Box
        component={motion.div}
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
          transition: { repeat: Infinity, duration: 20, ease: "easeInOut" },
        }}
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.light}33, ${theme.palette.primary.main}33)`,
        }}
      />
      
      <Box
        component={motion.div}
        animate={{
          x: [0, -20, 0],
          y: [0, 10, 0],
          transition: { repeat: Infinity, duration: 15, ease: "easeInOut" },
        }}
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.light}22, ${theme.palette.primary.main}22)`,
        }}
      />

      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={6} 
          alignItems="center"
          direction={isMobile ? 'column-reverse' : 'row'}
        >
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              style={scrollY > 0 ? scrollAnimation : {}}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  color: 'white',
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                Laundry Made <Box component="span" sx={{ color: theme.palette.secondary.main }}>Simple</Box>
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  opacity: 0.9,
                  mb: 4,
                  maxWidth: 600,
                }}
              >
                We pick up, clean, and deliver your laundry so you can focus on what matters most. Professional service with just a few clicks.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  href="#process"
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 3,
                    fontWeight: 600,
                    boxShadow: theme.shadows[4],
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: theme.shadows[6],
                    },
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                >
                  See How It Works
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 3,
                    fontWeight: 600,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Paper
                elevation={16}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  transform: isMobile ? 'none' : 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                  transition: '0.5s all',
                  '&:hover': {
                    transform: isMobile ? 'none' : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
                  },
                  boxShadow: theme.shadows[10],
                }}
              >
                <Box
                  component="img"
                  src="/images/laundry-service.jpg" // Replace with your actual image path
                  alt="Laundry Service"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Wave Divider */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          sx={{
            position: 'relative',
            display: 'block',
            width: 'calc(100% + 1.3px)',
            height: 70,
            fill: theme.palette.background.default,
          }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.63,118.92,150.87,124.61,214.19,113.25,265.34,103.88,310.94,80.78,362.28,67.9c17-4.27,34.27-6.82,51.72-6.82Q433.32,61.08,450.72,67Z" />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;