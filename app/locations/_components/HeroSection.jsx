import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  InputBase,
  Container
} from '@mui/material';
import { motion } from 'framer-motion';
import { theme } from '../../../contexts/Theme';

const HeroSection = () => {
  const [zipCode, setZipCode] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = theme.palette.primary;

  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    setZipCode(value);
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
                  mt: { xs: 2, sm: 3, md: 5 }, // added margin top
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
                  placeholder="123456"
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
            </Box>
          </Box>

          {/* Right Section - Hidden on Mobile */}
          <Box 
            sx={{ 
              width: { xs: '90%', md: '50%' },
              order: { xs: 1, md: 2 },
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              py: { xs: 2, md: 0 }
            }}
          >
            <Box
              component={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              sx={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box
                component="img"
                src="https://s3-alpha-sig.figma.com/img/7910/f37b/d3870f67507c15197443b9a8cd7ae26f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NQ13Cu4-3Ft~-j-DDOUsdSQWUTNYL~R9w7MCJf6KEa~iagCEpmMgg7gwwWdwattXzay4~gIqyoMey4GxW1mIOsghpJGnA31LlYxCq1jdm1kwJME5SwFgtMeGQOz1mP3dzxY40HCpqqLlRp3rFEOwx8RlqzZ34FI-Ie5p83D3dw4BPM26Tgc-ZRiwmSdsDz0teCgu0zB5RrqCaVazk09mOU2haiKohb-~JLFWxFR8gB5TOFz2HiSdW4yQfTDqH~IPG79VNe7mXNPwxxIOp7XXOIavWYQJsBmHynFDNz1ZbF~1CwolCecxKshexTMJGF8TNfUYaZ1YgsTjX~gqE2s2Yw__"
                alt="Location Illustration"
                sx={{
                  width: '100%',
                  maxWidth: { md: '90%', lg: '100%' },
                  display: 'block',
                }}
              />
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* Green Circle - Hidden on Mobile */}
      <Box
        sx={{
          position: 'absolute',
          width: { xs: '100%', md: 800, lg: 1000 },
          height: { xs: '100%', md: 800, lg: 1000 },
          borderRadius: { xs: 0, md: '50%' },
          backgroundColor: colors.main,
          top: { xs: 0, md: '50%' },
          right: { xs: 0, md: '-200px', lg: '-250px', xl: '-300px' },
          transform: { xs: 'none', md: 'translateY(-50%)' },
          zIndex: 1,
          display: { xs: 'none', md: 'block' }
        }}
      />

      {/* Decorative Circles - Already Hidden on Mobile */}
      {[/* ... decorative circles config ... */].map((bubble, idx) => (
        <Box
          key={idx}
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
            borderRadius: '50%',
            width: bubble.size,
            height: bubble.size,
            ...(bubble.top && { top: bubble.top }),
            ...(bubble.bottom && { bottom: bubble.bottom }),
            ...(bubble.right && { right: bubble.right }),
            ...(bubble.left && { left: bubble.left }),
            backgroundColor: bubble.filled ? colors.darkBlue : 'transparent',
            border: bubble.filled ? 'none' : `2px solid ${colors.darkBlue}`,
            opacity: bubble.opacity || 0.5,
            zIndex: 3,
            display: { xs: 'none', md: 'block' }
          }}
        />
      ))}
    </Box>
  );
};

export default HeroSection;
