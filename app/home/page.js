'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from './_components/HeroSection';
import ServicesSection from './_components/ServicesSection';
import QualityPromiseSection from './_components/QualityPromiseSection';
import WhyChooseUsSection from './_components/WhyChooseUsSection';
import GetStartedSection from './_components/GetStartedSection';
import FAQSection from './_components/FAQSection';
import ProcessSection from './_components/ProcessSection';
import ClientSideInteractions from './ClientSideInterations/ClientHeroSection';
import Box from '@mui/material/Box';
import TrackOrderButton from './ClientSideInterations/TrackOrderButton';
import HomePlansSection from './_components/PlanSection';
import Image from 'next/image';
import SmartCleaningBanner from '../../Assets/cleaning.png';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import ProvidedLaundryImage from '../../Assets/provided-laundry-image.png';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const theme = useTheme();

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    localStorage.setItem('hasSeenWelcomeModal', 'true');
  };

  const handleGetDiscount = () => {
    console.log('Email submitted:', email);
    handleCloseModal();
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: '100%',
          bgcolor: '#E3FEF7',
          minHeight: '100vh',
          m: 0,
          p: 0
        }}
      >
        <HeroSection />
        <ProcessSection />
        <ServicesSection />
        <QualityPromiseSection />
        {/* <WhyChooseUsSection /> */}
        
        <HomePlansSection />
        {/* <FAQSection /> */}
      </Box>

      {/* Bottom-left Welcome Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: { xs: '90vw', sm: 800 },
            width: { xs: '90vw', sm: 800 },
            zIndex: 1300,
            bgcolor: theme.palette.primary.whitishMint,
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {/* Close Button */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              zIndex: 10,
              bgcolor: theme.palette.primary.whitishMint,
              '&:hover': { 
                bgcolor: theme.palette.primary.light,
                transform: 'rotate(90deg)',
                transition: 'all 0.3s ease'
              },
              width: 40,
              height: 40
            }}
          >
            <CloseIcon sx={{ color: theme.palette.primary.darkBlue }} />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%',
              minHeight: { xs: 'auto', sm: 500 }
            }}
          >
            {/* Left: Image */}
            <Box 
              sx={{ 
                flex: 1.2, 
                position: 'relative', 
                minHeight: { xs: 300, sm: 500 },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(to right, ${theme.palette.primary.darkBlue}40, transparent)`,
                  zIndex: 1
                }
              }}
            >
              <Image
                src={ProvidedLaundryImage}
                alt="Laundry Promo"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:600px) 100vw, 50vw"
                priority
              />
            </Box>

            {/* Right: Content */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 4, sm: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: theme.palette.primary.whitishMint,
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                sx={{ 
                  mb: 1,
                  fontSize: { xs: '1.75rem', sm: '2.25rem' },
                  color: theme.palette.primary.darkBlue
                }}
              >
                Get 20% Off
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  color: theme.palette.primary.main
                }}
              >
                your first order
              </Typography>

              <TextField
                fullWidth
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="large"
                variant="outlined"
                sx={{
                  mb: 3,
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    height: 56,
                    fontSize: '1.1rem',
                    '& fieldset': {
                      borderColor: theme.palette.primary.darkBlue,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.primary.darkBlue,
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleGetDiscount}
                sx={{
                  bgcolor: theme.palette.primary.darkBlue,
                  color: theme.palette.primary.whitishMint,
                  borderRadius: 2,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 20px ${theme.palette.primary.darkBlue}40`
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Claim your $20 credit
              </Button>

              <Typography 
                variant="caption" 
                sx={{ 
                  mt: 3, 
                  color: theme.palette.primary.darkBlue,
                  fontSize: '0.875rem',
                  opacity: 0.8
                }}
              >
                *Valid for new customers only. Terms apply.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Floating Get $20 Off Button */}
      {!modalOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 32,
            left: 32,
            zIndex: 1200,
          }}
        >
          <Button
            onClick={() => setModalOpen(true)}
            sx={{
              background: 'linear-gradient(90deg, #0099A8 0%, #16D9E3 100%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              borderRadius: '20px',
              px: 4,
              py: 1.5,
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
              minWidth: 0,
              minHeight: 0,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(90deg, #16D9E3 0%, #0099A8 100%)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)'
              },
            }}
          >
            Get 20% Off
          </Button>
        </Box>
      )}

    </>
  );
}
