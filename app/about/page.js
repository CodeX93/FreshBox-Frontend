
import { Box } from '@mui/material';

import HeroSection from './_components/HeroSection';
import MissionSection from './_components/MissionSection';
import TeamSection from './_components/TeamSection';

import ContactSection from './_components/ContactSection';
import ValuesSection from './_components/ValueSection';




export default function About() {
  return (
    
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: '#f4f4f4'
      }}>
        <HeroSection />
        <MissionSection />
        <ValuesSection />
        <TeamSection />
        <ContactSection />
      </Box>
    
  );
}