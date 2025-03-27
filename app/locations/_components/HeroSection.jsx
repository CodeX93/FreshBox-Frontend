import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Paper,
  Grid,
  Fade,
  ThemeProvider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { theme } from '../../../contexts/Theme'; // Import your theme context

const HeroSection = () => {
  const [zipCode, setZipCode] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleZipCodeChange = (e) => {
    // Only allow numbers and limit to 5 digits
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 5);
    setZipCode(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: '100%',
          minHeight: '60vh',
          // Add top padding to account for Navbar height
          pt: { 
            xs: isMobile ? '80px' : '100px',  // Adjust based on your Navbar's mobile height
            md: '120px'  // Adjust based on your Navbar's desktop height
          },
          // Change gradient to use your theme colors
          backgroundImage: `linear-gradient(to right, ${theme.palette.primary.light}30, ${theme.palette.primary.light}10)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Fade in timeout={1000}>
                <Typography 
                  variant="h1"
                  component="h1" 
                  align="center"
                  sx={{ 
                    mb: 2,
                    // Change gradient to use your primary turquoise
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    fontSize: { xs: '2.5rem', md: '3.5rem' } 
                  }}
                >
                  See if We're in Your Neighborhood
                </Typography>
              </Fade>
            </Grid>
            
            <Grid item xs={12}>
              <Fade in timeout={1500}>
                <Typography 
                  variant="h6" 
                  align="center" 
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}
                >
                  Our laundry service is expanding rapidly across the city. Check if your area is covered for our premium wash & fold service.
                </Typography>
              </Fade>
            </Grid>
            
            <Grid item xs={12} sm={10} md={8}>
              <Fade in timeout={2000}>
                <Paper 
                  elevation={4}
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.9)'
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'center',
                      gap: 2 
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Enter ZIP Code"
                      value={zipCode}
                      onChange={handleZipCodeChange}
                      placeholder="12345"
                      InputProps={{
                        startAdornment: <LocationOnIcon sx={{ mr: 1, color: theme.palette.primary.main }} />,
                      }}
                      sx={{ 
                        flexGrow: 1,
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.primary.main,
                        }
                      }}
                    />
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="large"
                      disabled={zipCode.length !== 5}
                      component={motion.button}
                      whileTap={{ scale: 0.95 }}
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        minWidth: { xs: '100%', sm: 'auto' },
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        }
                      }}
                    >
                      Check Availability
                    </Button>
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HeroSection;