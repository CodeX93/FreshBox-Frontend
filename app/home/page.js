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


import TrackOrderButton from './ClientSideInterations/TrackOrderButton';
  

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <QualityPromiseSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <ClientSideInteractions />
        <GetStartedSection />
        <FAQSection />
      </main>
      <Footer />
      <TrackOrderButton />
    </>
  );
}
