import React from 'react';
import { Box, Container } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedIcon from '@mui/icons-material/Verified';
import SettingsIcon from '@mui/icons-material/Settings';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { theme } from '../../../contexts/Theme'; 
import ClientWhyChooseUsSection from '../ClientSideInterations/ClientWhyChooseUsSection';

// Static data defined at the server level
const features = [
  {
    icon: <AttachMoneyIcon fontSize="large" />,
    title: "No Hidden Fees",
    description: "Clear pricing based on weight or number of items. What you see is what you pay.",
    color: theme.palette.primary.main
  },
  {
    icon: <VerifiedIcon fontSize="large" />,
    title: "Contactless Service",
    description: "Safe, contact-free pickup and delivery right at your doorstep.",
    color: theme.palette.primary.dark
  },
  {
    icon: <SettingsIcon fontSize="large" />,
    title: "Customizable Preferences",
    description: "Set your detergent, fabric softener, and folding preferences for a personalized experience.",
    color: theme.palette.secondary.main
  },
  {
    icon: <ThumbUpIcon fontSize="large" />,
    title: "100% Satisfaction Guarantee",
    description: "Not happy with our service? We'll redo it or refund your money, no questions asked.",
    color: theme.palette.secondary.dark
  }
];

const WhyChooseUsSection = () => {
  return (
    <Box
      component="section"
      id="why-choose-us-section"
      sx={{
        minHeight: { xs: 'auto', md: '90vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        py: { xs: 5, sm: 6, md: 7 }
      }}
    >
      <Container maxWidth="xl">
        <ClientWhyChooseUsSection features={features} />
      </Container>
    </Box>
  );
};

export default WhyChooseUsSection;