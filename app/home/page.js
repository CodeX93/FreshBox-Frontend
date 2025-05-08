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
import { Box } from '@mui/material'; // Changed from lucide-react to @mui/material
import HomePlansSection from './_components/PlanSection';

export default function Home() {
  return (
    <Box sx={{ 
      width: '100%',
      bgcolor: '#E3FEF7', // whitishMint background color
      minHeight: '100vh',
      m: 0,
      p: 0
    }}>
      <Navbar light={true}/>
      <ClientSideInteractions />
      <ServicesSection />
      <QualityPromiseSection />
      <WhyChooseUsSection />
      <HomePlansSection/>
      <ProcessSection/>
      <FAQSection />
    </Box>
  );
}