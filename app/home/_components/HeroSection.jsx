'use client';

import { 
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  FormHelperText,
  Button,
  Container,
  ThemeProvider
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  LocationOn as MapPinIcon,
  Error as AlertCircleIcon
} from '@mui/icons-material';
import { theme } from '../../../contexts/Theme'; // Import your theme context

export default function HeroSection({ 
  zipCode, 
  setZipCode,
  selectedService,
  setSelectedService,
  handleSubmit,
  zipError 
}) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          color: 'white',
        }}
      >
        {/* Background Video */}
        <Box
          component="iframe"
          src="https://www.youtube.com/embed/F-AiKOv2b_A?autoplay=1&mute=1&loop=1&playlist=F-AiKOv2b_A&controls=0&showinfo=0&modestbranding=1"
          allow="autoplay"
          frameBorder="0"
          allowFullScreen
          sx={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            display: { xs: 'none', md: 'block' }, // Hide on mobile to improve performance
          }}
        />

        {/* Fallback Background Image */}
        <Box
          component="img"
          src="/placeholder-laundry-bg.jpg" // Replace with your actual image
          alt="Background"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            display: { xs: 'block', md: 'none' }, // Show only on mobile
          }}
        />

        {/* Overlay */}
        <Box sx={{ 
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1
        }} />

        {/* Foreground Content */}
        <Container
          maxWidth="md"
          sx={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: { xs: 2, sm: 3, md: 4 }, // Better padding on small screens
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            <Typography 
              variant="h1" // Using h1 from your theme
              component="h1" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }, // Slightly smaller for better proportions
                lineHeight: 1.2,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Laundry & Dry Cleaning Delivered
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.9, 
                mb: 4,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              }}
            >
              Professional cleaning services at your doorstep
            </Typography>
            
            <Card
              elevation={6}
              sx={{
                borderRadius: 3,
                backgroundColor: 'white',
                overflow: 'visible', // Allow for shadow to be fully visible
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'text.primary', 
                    fontWeight: 700, 
                    mb: 3,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  Schedule Your First Pickup
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="service-select-label">Service</InputLabel>
                  <Select
                    labelId="service-select-label"
                    value={selectedService}
                    label="Service"
                    onChange={(e) => setSelectedService(e.target.value)}
                    sx={{ 
                      height: 48, // Fixed height
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <MenuItem value="dry-cleaning">Dry Cleaning</MenuItem>
                    <MenuItem value="wash-fold">Wash & Fold</MenuItem>
                    <MenuItem value="laundry">Laundry</MenuItem>
                    <MenuItem value="household">Household Items</MenuItem>
                  </Select>
                </FormControl>
                
                <Box 
                  component="form" 
                  onSubmit={handleSubmit} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    gap: 2,
                    alignItems: 'stretch', // Ensure equal height
                  }}
                >
                  <FormControl fullWidth error={!!zipError}>
                    <TextField
                      placeholder="ZIP Code"
                      variant="outlined"
                      value={zipCode}
                      onChange={(e) => {
                        // Only allow numbers and limit to 5 digits
                        const value = e.target.value.replace(/[^\d]/g, '').slice(0, 5);
                        setZipCode(value);
                        if (zipError) zipError = '';
                      }}
                      inputProps={{ 
                        maxLength: 5, 
                        'aria-label': 'Enter your ZIP code',
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <MapPinIcon color="action" />
                          </InputAdornment>
                        ),
                        sx: { height: 48 } // Fixed height to match button
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: 48, // Fixed height
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                    />
                    {zipError && (
                      <FormHelperText sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: 'error.main',
                        mt: 0.5 
                      }}>
                        <AlertCircleIcon sx={{ fontSize: 14, mr: 0.5 }} />
                        {zipError}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      height: 48, // Fixed height to match input
                      px: 3,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                      minWidth: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    Schedule Pickup
                    <ChevronRightIcon sx={{ ml: 0.5 }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}