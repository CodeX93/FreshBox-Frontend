"use client"

import React from 'react';
import { Box } from '@mui/material';

// Import all section components
// Make sure the path and filenames match exactly what you have in your project
import HeroSection from './_components/HeroSection';
import ServiceAreaMap from './_components/ServiceAreaSection';
import ZipCodeChecker from './_components/ZipCodeCheckSection';
import ScheduleSection from './_components/ScheduleSection';
import AvailabilityList from './_components/AvailablitySection';
import ExpansionPlans from './_components/ExpanstionPlan';
import WaitlistSection from './_components/WaitlistSection';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// Main Page component that assembles all sections
const AreaPage = () => {
  return (
    <>
    <Navbar/>
    <Box component="main">
      {/* Hero section with ZIP code check */}
      <HeroSection />
      
      {/* Visual map of service areas */}
      <ServiceAreaMap />
      
      {/* Detailed ZIP code checker */}
      <ZipCodeChecker />
      
      {/* Pickup and delivery schedule by neighborhood */}
      <ScheduleSection />
      
      {/* List of available and upcoming service areas */}
      <AvailabilityList />
      
      {/* Future expansion plans */}
      <ExpansionPlans />
      
      {/* Waitlist signup for non-covered areas */}
      <WaitlistSection />
    </Box>
    
    </>
  );
};

export default AreaPage;