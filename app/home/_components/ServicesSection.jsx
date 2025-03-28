import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { theme } from '../../../contexts/Theme';
import ClientServicesSection from '../ClientSideInterations/ClientServicesSection';

// Services data that can be defined at the server level
const services = [
  {
    name: "Dry Cleaning",
    description: "Professional care for your delicate garments that require special attention.",
    slug: "dry-cleaning",
    features: ["Garment inspection", "Stain pre-treatment", "Expert pressing"]
  },
  {
    name: "Wash & Fold",
    description: "Convenient solution for your everyday laundry needs, washed and perfectly folded.",
    slug: "wash-fold",
    features: ["Sorted by color", "Premium detergents", "Precisely folded"]
  },
  {
    name: "Laundry",
    description: "Custom laundering for shirts, blouses, and other machine-washable garments.",
    slug: "laundry",
    features: ["Starch options", "Hang or fold", "Button protection"]
  },
  {
    name: "Household Items",
    description: "Special care for comforters, bedding, table linens, and other home textiles.",
    slug: "household",
    features: ["Specialty cleaning", "Careful handling", "Perfect finishing"]
  }
];

export default function ServicesSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        py: { xs: 5, md: 9 },
        minHeight: { xs: 'auto', md: '100vh' },
        bgcolor: theme.palette.background.default,
        overflow: 'hidden',
      }}
    >
      {/* Static background decorations can remain in server component */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.light}33, ${theme.palette.primary.main}1A)`,
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.secondary.light}33, ${theme.palette.secondary.main}1A)`,
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
      
      {/* Pass the services data to the client component */}
      <ClientServicesSection services={services} />
    </Box>
  );
}