'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from "../../components/Navbar"
// Import section components
import HeroSection from './_components/HeroSection';
import CommercialLaundrySection from './_components/ComercialLaundarySection';
import AirbnbLaundrySection from './_components/AirbnbLaundarySection';
import MassageSpaSection from './_components/MassageSpaSection';
import HealthcareSection from './_components/HealthcareSection';
import GymTowelSection from './_components/GymTowelSection';
import RequestQuoteSection from './_components/RequestQuoteSection';

// Define constants
const TURQUOISE = '#28ddcd';

export default function CommercialPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Refs for each section
  const heroRef = useRef(null);
  const commercialRef = useRef(null);
  const airbnbRef = useRef(null);
  const spaRef = useRef(null);
  const healthcareRef = useRef(null);
  const gymRef = useRef(null);
  const quoteRef = useRef(null);
  
  // Track active section for navigation
  const [activeSection, setActiveSection] = useState('hero');
  
  // Scroll animation hook
  const { scrollY } = useScroll();
  
  // Handle intersection observer to detect active section
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // Reduced threshold for better mobile detection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all section refs
    if (heroRef.current) observer.observe(heroRef.current);
    if (commercialRef.current) observer.observe(commercialRef.current);
    if (airbnbRef.current) observer.observe(airbnbRef.current);
    if (spaRef.current) observer.observe(spaRef.current);
    if (healthcareRef.current) observer.observe(healthcareRef.current);
    if (gymRef.current) observer.observe(gymRef.current);
    if (quoteRef.current) observer.observe(quoteRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (commercialRef.current) observer.unobserve(commercialRef.current);
      if (airbnbRef.current) observer.unobserve(airbnbRef.current);
      if (spaRef.current) observer.unobserve(spaRef.current);
      if (healthcareRef.current) observer.unobserve(healthcareRef.current);
      if (gymRef.current) observer.unobserve(gymRef.current);
      if (quoteRef.current) observer.unobserve(quoteRef.current);
    };
  }, []);

  // Scroll to section function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Section styling based on screen size
  const sectionStyle = {
    minHeight: { xs: 'auto', md: '100vh' },
    width: '100%',
    position: 'relative',
    overflowX: 'hidden',
    overflowY: { xs: 'visible', md: 'hidden' }
  };

  return (
    <>
    <Navbar light={false}/>
    
    <Box sx={{ 
      width: '100%', 
      overflowX: 'hidden',
      position: 'relative',
      bgcolor: '#fff' 
    }}>
      {/* Responsive sections with minimum height */}
      <Box id="hero" ref={heroRef} sx={sectionStyle}>
        <HeroSection />
      </Box>

      <Box id="commercial" ref={commercialRef} sx={sectionStyle}>
        <CommercialLaundrySection />
      </Box>

      <Box id="airbnb" ref={airbnbRef} sx={sectionStyle}>
        <AirbnbLaundrySection />
      </Box>

      <Box id="spa" ref={spaRef} sx={sectionStyle}>
        <MassageSpaSection />
      </Box>

      <Box id="healthcare" ref={healthcareRef} sx={sectionStyle}>
        <HealthcareSection />
      </Box>

      <Box id="gym" ref={gymRef} sx={sectionStyle}>
        <GymTowelSection />
      </Box>

      <Box id="quote" ref={quoteRef} sx={sectionStyle}>
        <RequestQuoteSection />
      </Box>
    </Box>
    </>
  );
}