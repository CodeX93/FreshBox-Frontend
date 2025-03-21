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
  Container
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  LocationOn as MapPinIcon,
  Error as AlertCircleIcon
} from '@mui/icons-material';

export default function HeroSection({ 
  zipCode, 
  setZipCode,
  selectedService,
  setSelectedService,
  handleSubmit,
  zipError 
}) {
  return (
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
        }}
      />

      {/* Fallback Background Image for Mobile */}
      <Box
        component="img"
        src="/placeholder-laundry-bg.jpg" // Replace with your fallback image
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
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 800 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2,
              fontSize: { xs: '2.5rem', md: '4rem' },
              lineHeight: 1.2,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Improve text readability
            }}
          >
            Laundry & Dry Cleaning Delivered
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              opacity: 0.9, 
              mb: 4,
              fontSize: { xs: '1.25rem', md: '1.75rem' },
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Improve text readability
            }}
          >
            Professional cleaning services at your doorstep
          </Typography>
          
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly lighter for better contrast
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'text.primary', 
                  fontWeight: 700, 
                  mb: 3,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Improve text readability
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
                    fontSize: '1.1rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#28ddcd',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#28ddcd',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'action.active',
                    }
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
                  flexDirection: { xs: 'column', md: 'row' }, 
                  gap: 2 
                }}
              >
                <FormControl fullWidth error={!!zipError}>
                  <TextField
                    placeholder="ZIP Code"
                    variant="outlined"
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                      if (zipError) setZipError('');
                    }}
                    inputProps={{ 
                      maxLength: 5, 
                      style: { fontSize: '1.1rem' },
                      'aria-label': 'Enter your ZIP code', // Accessibility
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MapPinIcon color="action" />
                        </InputAdornment>
                      ),
                      sx: { py: 1.5 }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#28ddcd',
                        },
                      },
                    }}
                  />
                  {zipError && (
                    <FormHelperText sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                      <AlertCircleIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      {zipError}
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    py: 1.75,
                    px: 4,
                    fontSize: '1rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#28ddcd',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#20c5b7',
                    }
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
  );
}