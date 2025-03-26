'use client';
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from './_components/HeroSection';
import ServicesSection from './_components/ServicesSection';
import QualityPromiseSection from './_components/QualityPromiseSection';
import WhyChooseUsSection from './_components/WhyChooseUsSection';
import GetStartedSection from './_components/GetStartedSection';
import FAQSection from './_components/FAQSection';

export default function Home() {
  const [zipCode, setZipCode] = useState('');
  const [zipError, setZipError] = useState('');
  const [selectedService, setSelectedService] = useState('dry-cleaning');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Basic scroll detection
      setIsScrolled(window.scrollY > 50);
      
      // Show floating button after scrolling past hero
      setShowButton(window.scrollY > 400);
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page loads already scrolled
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const validateZipCode = (zip) => {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!zipCode) {
      setZipError('Please enter your ZIP code');
      return;
    }
    if (!validateZipCode(zipCode)) {
      setZipError('Please enter a valid 5-digit ZIP code');
      return;
    }
    setZipError('');
    console.log(`Scheduling for ${selectedService} in ${zipCode}`);
  };
  
  return (
    <>
      <Navbar />
      <HeroSection
        zipCode={zipCode}
        setZipCode={setZipCode}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        handleSubmit={handleSubmit}
        zipError={zipError}
      />
      <ServicesSection />
      <QualityPromiseSection />
      <WhyChooseUsSection />
      <GetStartedSection />
      <FAQSection />
      
      
      {/* Inline floating button */}
      {showButton && (
        <button
          onClick={() => console.log('Schedule Pickup clicked')}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#28ddcd',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '9999px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 9999,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          <Calendar size={20} />
          <span>Schedule Pickup</span>
        </button>
      )}
    </>
  );
}