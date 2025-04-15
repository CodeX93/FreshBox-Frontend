import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useMediaQuery,
  InputBase,
  useTheme,
} from '@mui/material';
import {theme} from "../../../contexts/Theme"

const HeroSection = () => {
  const [zipCode, setZipCode] = useState('');
  
  const priamryColor=theme.palette.primary.main;
  const darkBlueColor=theme.palette.primary.darkBlue;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    setZipCode(value);
  };

  return (
    <Box 
  sx={{
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.primary.whitishMint,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: { xs: 2, md: 4 },
    pt: { xs: '80px', md: '100px' }, // 👈 Add padding to avoid navbar
    pb: { xs: 4, md: 6 }, // keep existing vertical padding
    boxSizing: 'border-box',
  }}
>

  
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          {/* Left section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 6 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: darkBlueColor,
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  mb: 2,
                }}
              >
                See if We're in Your Neighborhood
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  color: darkBlueColor,
                  mb: 4,
                  maxWidth: '600px',
                }}
              >
                Our laundry service is expanding rapidly across the city.
                <br />
                Check if your area is covered for our premium wash & fold service.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  border: '4px solid #1a3131',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  height: '65px',
                  maxWidth: { xs: '100%', sm: '600px' },
                }}
              >
                <InputBase
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  placeholder="123456"
                  fullWidth
                  sx={{
                    px: 3,
                    fontSize: '1.1rem',
                    bgcolor: 'white',
                    flex: 1,
                    fontWeight: 600,
                    height: '100%',
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    height: '100%',
                    borderRadius: 0,
                    px: 4,
                    fontWeight: 600,
                    fontSize: '1rem',
                    bgcolor: darkBlueColor,
                    color: theme.palette.primary.whitishMint,
                    '&:hover': {
                      bgcolor: '#8cdec0',
                    },
                  }}
                >
                  Check Availability
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right section with image */}
          <Grid
  item
  xs={12}
  md={6}
  sx={{
    display: 'flex',
    justifyContent: 'center',
    mt: { xs: 4, md: 0 }, // Adds top margin on mobile for spacing
  }}
>
          <Box
    component="img"
    src="https://s3-alpha-sig.figma.com/img/7910/f37b/d3870f67507c15197443b9a8cd7ae26f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NQ13Cu4-3Ft~-j-DDOUsdSQWUTNYL~R9w7MCJf6KEa~iagCEpmMgg7gwwWdwattXzay4~gIqyoMey4GxW1mIOsghpJGnA31LlYxCq1jdm1kwJME5SwFgtMeGQOz1mP3dzxY40HCpqqLlRp3rFEOwx8RlqzZ34FI-Ie5p83D3dw4BPM26Tgc-ZRiwmSdsDz0teCgu0zB5RrqCaVazk09mOU2haiKohb-~JLFWxFR8gB5TOFz2HiSdW4yQfTDqH~IPG79VNe7mXNPwxxIOp7XXOIavWYQJsBmHynFDNz1ZbF~1CwolCecxKshexTMJGF8TNfUYaZ1YgsTjX~gqE2s2Yw__"
    alt="Location Illustration"
    sx={{
      maxWidth: { xs: '90%', sm: '100%' },
      height: 'auto',
      zIndex: 2,
    }}
  />
          </Grid>
        </Grid>
      </Container>

      {/* Decorative background circle */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '-15%',
          transform: 'translateY(-50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          bgcolor:priamryColor,
          zIndex: 1,
          opacity: 0.8,
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Decorative bubbles */}
      {[
  { top: '5%', right: '5%', size: 18 },
  { top: '8%', right: '8%', size: 25 },
  { top: '4%', right: '12%', size: 15 },
  { top: '45%', right: '25%', size: 35 },
  { top: '55%', right: '35%', size: 20 },
  { bottom: '25%', right: '23%', size: 28 },
  { bottom: '20%', right: '30%', size: 15, filled: true, opacity: 0.3 },
  { bottom: '15%', right: '18%', size: 40 },
  { bottom: '12%', right: '15%', size: 12, filled: true, opacity: 0.4 },
].map((bubble, idx) => (
  <Box
    key={idx}
    sx={{
      position: 'absolute',
      borderRadius: '50%',
      width: bubble.size,
      height: bubble.size,
      ...(bubble.top && { top: bubble.top }),
      ...(bubble.bottom && { bottom: bubble.bottom }),
      ...(bubble.right && { right: bubble.right }),
      backgroundColor: bubble.filled ? darkBlueColor : 'transparent',
      border: bubble.filled ? 'none' : '2px solid #1a3131',
      opacity: bubble.opacity || 0.5,
      zIndex: 3,
      display: { xs: 'none', md: 'block' }, // 👈 hides bubbles on small screens
    }}
  />
))}
    </Box>
  );
};

export default HeroSection;
