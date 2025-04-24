import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  InputBase,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import { theme } from '../../../contexts/Theme';
import { useServices } from '@/contexts/ServicesContext';

const HeroSection = () => {
  const [zipCode, setZipCode] = useState('');
  const { servicesAreas } = useServices();
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = theme.palette.primary;

  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    setZipCode(value);
    // Reset status when user types
    setAvailabilityStatus(null);
  };

  const checkAvailability = () => {
    if (!zipCode || zipCode.length < 3) {
      setAvailabilityStatus('invalid');
      setOpenSnackbar(true);
      return;
    }

    // Check if zip code exists in servicesAreas
    const isAvailable = servicesAreas.some(area => 
      area.zipCode.toString().startsWith(zipCode)
    );

    setAvailabilityStatus(isAvailable ? 'available' : 'unavailable');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        backgroundColor: colors.whitishMint,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 5, md: 0 },
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ position: 'relative', zIndex: 2, px: { xs: 2, md: 4 } }}
      >
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 4, md: 2 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left Section */}
          <Box 
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            sx={{ 
              width: { xs: '100%', md: '50%' },
              order: { xs: 2, md: 1 },
              textAlign: { xs: 'center', md: 'left' },
              px: { xs: 0, md: 3 }
            }}
          >
            <Box sx={{ maxWidth: 600, mx: { xs: 'auto', md: 0 } }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  color: colors.darkBlue,
                  fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3.2rem' },
                  mb: 2,
                  mt: { xs: 2, sm: 3, md: 5 },
                  lineHeight: 1.2,
                }}
              >
                See if We're in Your Neighborhood
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.2rem' },
                  color: colors.darkBlue,
                  mb: 4,
                  lineHeight: 1.5,
                }}
              >
                Our laundry service is expanding rapidly across the city.
                {!isMobile && <br />}
                Check if your area is covered for our premium wash & fold service.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  border: `4px solid ${colors.darkBlue}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  height: { xs: 'auto', sm: '65px' },
                  maxWidth: '100%',
                  width: { xs: '100%', sm: '100%', md: '500px' },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                <InputBase
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  placeholder="Enter your zip code"
                  fullWidth
                  sx={{
                    px: 3,
                    py: { xs: 2, sm: 0 },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    bgcolor: 'white',
                    flex: 1,
                    fontWeight: 600,
                    height: { xs: '60px', sm: '100%' },
                  }}
                />
                <Button
                  disableElevation
                  variant="contained"
                  onClick={checkAvailability}
                  sx={{
                    height: { xs: '60px', sm: '100%' },
                    borderRadius: 0,
                    px: { xs: 2, md: 4 },
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    bgcolor: colors.main,
                    color: colors.darkBlue,
                    '&:hover': {
                      bgcolor: colors.mainHover,
                    },
                    textTransform: 'none',
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  Check Availability
                </Button>
              </Box>

              {availabilityStatus === 'available' && (
                <Typography
                  sx={{
                    mt: 2,
                    color: colors.success,
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}
                >
                  🎉 Yes! We service your area!
                </Typography>
              )}

              {availabilityStatus === 'unavailable' && (
                <Typography
                  sx={{
                    mt: 2,
                    color: colors.error,
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}
                >
                  😔 Not available in your area yet
                </Typography>
              )}
            </Box>
          </Box>
          
          {/* Right section - Empty for desktop layout */}
          <Box sx={{ 
            width: { xs: '100%', md: '50%', lg: '60%' },
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            order: { xs: 1, md: 2 },
            height: '100%'
          }} />
        </Stack>
      </Container>

      {/* Snackbar for showing messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            availabilityStatus === 'available' ? 'success' : 
            availabilityStatus === 'unavailable' ? 'error' : 'warning'
          }
          sx={{ width: '100%' }}
        >
          {availabilityStatus === 'available' && 'Great news! We service your area.'}
          {availabilityStatus === 'unavailable' && "We don't currently service this area, but we're expanding!"}
          {availabilityStatus === 'invalid' && 'Please enter a valid zip code'}
        </Alert>
      </Snackbar>

      {/* Rest of your existing background elements... */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: '-60%', sm: '-40%', md: '-30%', lg: '-20%' },
          transform: 'translateY(-50%)',
          width: { xs: '600px', sm: '700px', md: '800px', lg: '900px' },
          height: { xs: '600px', sm: '700px', md: '800px', lg: '900px' },
          borderRadius: '50%',
          bgcolor: colors.main,
          zIndex: 1,
          display: { xs: 'none', md: 'block' }
        }}
      />

      {/* Laundry Basket Image - hidden on mobile */}
      <Box
        component="img"
        src="https://s3-alpha-sig.figma.com/img/7910/f37b/d3870f67507c15197443b9a8cd7ae26f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NQ13Cu4-3Ft~-j-DDOUsdSQWUTNYL~R9w7MCJf6KEa~iagCEpmMgg7gwwWdwattXzay4~gIqyoMey4GxW1mIOsghpJGnA31LlYxCq1jdm1kwJME5SwFgtMeGQOz1mP3dzxY40HCpqqLlRp3rFEOwx8RlqzZ34FI-Ie5p83D3dw4BPM26Tgc-ZRiwmSdsDz0teCgu0zB5RrqCaVazk09mOU2haiKohb-~JLFWxFR8gB5TOFz2HiSdW4yQfTDqH~IPG79VNe7mXNPwxxIOp7XXOIavWYQJsBmHynFDNz1ZbF~1CwolCecxKshexTMJGF8TNfUYaZ1YgsTjX~gqE2s2Yw__"
        alt="Commercial laundry service illustration"
        sx={{
          position: 'absolute',
          right: { md: '5%' },
          top: '50%',
          transform: 'translateY(-50%)',
          width: { md: '350px', lg: '400px' },
          height: 'auto',
          zIndex: 2,
          display: { xs: 'none', md: 'block' }
        }}
      />

      {/* Empty Circles - Outlined - hidden on mobile */}
      {[
        { top: '25%', right: '15%', size: 15 },
        { top: '15%', right: '25%', size: 10 },
        { top: '40%', right: '30%', size: 12 },
        { top: '60%', right: '25%', size: 8 },
        { top: '68%', right: '15%', size: 14 },
        { top: '75%', right: '30%', size: 10 },
        { top: '45%', right: '10%', size: 18 },
        { top: '10%', right: '10%', size: 12 },
        { top: '85%', right: '20%', size: 9 },
      ].map((circle, idx) => (
        <Box
          key={`outline-${idx}`}
          component={motion.div}
          animate={{
            y: [0, -5, 0],
            transition: { 
              repeat: Infinity, 
              duration: 2 + Math.random() * 2, 
              ease: "easeInOut",
              delay: Math.random() * 1
            }
          }}
          sx={{
            position: 'absolute',
            width: circle.size,
            height: circle.size,
            top: circle.top,
            right: circle.right,
            borderRadius: '50%',
            border: `1.5px solid ${colors.darkBlue}`,
            opacity: 0.5,
            zIndex: 2,
            display: { xs: 'none', md: 'block' }
          }}
        />
      ))}

      {/* Filled Circles - hidden on mobile */}
      {[
        { top: '20%', right: '20%', size: 6 },
        { top: '35%', right: '20%', size: 8 },
        { top: '50%', right: '15%', size: 5 },
        { top: '65%', right: '20%', size: 7 },
        { top: '80%', right: '28%', size: 6 },
      ].map((circle, idx) => (
        <Box
          key={`filled-${idx}`}
          component={motion.div}
          animate={{
            y: [0, -3, 0],
            transition: { 
              repeat: Infinity, 
              duration: 1.5 + Math.random() * 1.5, 
              ease: "easeInOut",
              delay: Math.random() * 0.5
            }
          }}
          sx={{
            position: 'absolute',
            width: circle.size,
            height: circle.size,
            top: circle.top,
            right: circle.right,
            borderRadius: '50%',
            backgroundColor: colors.darkBlue,
            opacity: 0.3,
            zIndex: 2,
            display: { xs: 'none', md: 'block' }
          }}
        />
      ))}
    </Box>
  );
};

export default HeroSection;