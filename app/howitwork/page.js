// PART 2: Updated HowItWorksPage component
'use client';
import React, { useEffect, useState } from 'react';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProcessSection from './_components/ProcessSection';
import WhyChooseUsSection from './_components/WhyChooseUsSection';
import TestimonialsSection from './_components/TestimonialSection';
import GetStartedSection from './_components/GetStartedSection';
import FAQSection from './_components/FAQSection';
import HeroSection from './_components/HeroSection';
// Adding animations
import { motion } from 'framer-motion';
import {theme} from "../../contexts/Theme"

const HowItWorksPage = () => {
  
  
  const [scrollY, setScrollY] = useState(0);

  // Handle smooth scrolling
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      }
    };

    // Track scroll position for animations
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Navbar light={false}/>
      <Box
        component="main"
        sx={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <HeroSection
            fadeInUp={fadeInUp}
            scrollY={scrollY}
          />
          <Box sx={{ position: 'relative', zIndex: 2,background: theme.palette.primary.darkBlue, }}>
            <ProcessSection
              fadeInUp={fadeInUp}
              scrollY={scrollY}
            />
          </Box>
          <Box sx={{
            position: 'relative',
            background: theme.palette.primary.whitishMint,
            py: 0, // Remove padding here to prevent extra space
            mb: 0 // Remove margin bottom
          }}>
            <TestimonialsSection
              fadeInUp={fadeInUp}
              scrollY={scrollY}
            />
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default HowItWorksPage;