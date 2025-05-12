// app/page.tsx or app/home/page.tsx (depending on routing)
import React from 'react';
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
  

export default function Home() {
  return (
    <>
     <Navbar />
<Box sx={{
width: '100%',
bgcolor: '#E3FEF7', // whitishMint background color
minHeight: '100vh',
m: 0,
p: 0
 }}>
<HeroSection />
<ServicesSection />
<QualityPromiseSection />
<WhyChooseUsSection />
<ProcessSection />

<FAQSection />
</Box>
      {/* <TrackOrderButton /> */}
    </>
  );
}
