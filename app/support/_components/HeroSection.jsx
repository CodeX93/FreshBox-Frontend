import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid
} from '@mui/material';
import ClientHeroSection from '../ClientSideInterations/ClientHeroSection';
import {theme} from "../../../contexts/Theme"
// Define constants
const TURQUOISE = theme.palette.primary.main;
const DARK_TURQUOISE = theme.palette.primary.darkBlue;
const LightMintColor = theme.palette.primary.whitishMint;

// Static content for SEO
const heroTitle = "How Can We Help You?";
const heroDescription = "We're here to assist with any questions about our laundry and cleaning services.";

// Main server component with SEO-friendly content
const HeroSection = ({
  loaded,
  searchQuery,
  setSearchQuery,
  searchActive,
  setSearchActive,
  isMobile
}) => {
  return (
    <Box
      id="support-hero-section"
      aria-label="Support hero section"
      sx={{
        background: LightMintColor,
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
        padding: { xs: '2rem 0', sm: '3rem 0', md: '4rem 0' }, // Added responsive padding
        marginBottom: { xs: '2rem', sm: '3rem', md: '4rem' },  // Added bottom margin
      }}
    >
      {/* Background Elements (static) */}
      <Box sx={{
        position: 'absolute',
        right: -20,
        top: 20,
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.2), rgba(255,255,255,0))',
        opacity: 0.8,
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        right: 100,
        top: -40,
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: '2px dashed rgba(255,255,255,0.3)',
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        left: '10%',
        bottom: '10%',
        width: 120,
        height: 120,
        borderRadius: '50%',
        border: '2px dashed rgba(255,255,255,0.2)',
        zIndex: 0
      }} />
      
      {/* Server-side rendering of SEO-important content that search engines will see */}
      <Container 
        sx={{ 
          position: 'relative', 
          zIndex: 1, 
          visibility: 'hidden', 
          height: 0, 
          overflow: 'hidden',
          padding: '2rem', // Added padding
          bgcolor:DARK_TURQUOISE
        }}
      >
        <h1>{heroTitle}</h1>
        <p>{heroDescription}</p>
        <ul>
          <li>Live Chat - Chat with our support team</li>
          <li>Call Us - Speak directly with support</li>
          <li>Video Consult - Schedule a video call</li>
          <li>Help Center - Browse support articles</li>
        </ul>
      </Container>
      
      {/* Client component for interactive elements */}
      <ClientHeroSection
        loaded={loaded}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchActive={searchActive}
        setSearchActive={setSearchActive}
        isMobile={isMobile}
        heroTitle={heroTitle}
        heroDescription={heroDescription}
      />
    </Box>
  );
};

export default HeroSection;