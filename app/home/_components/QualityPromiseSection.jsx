import React from 'react';
import { Box, Container } from '@mui/material';
import { theme } from '../../../contexts/Theme';
import ClientQualityPromiseSection from '../ClientSideInterations/ClientQualityPromiseSection';

// Data that can be defined at the server level
const qualityPromises = [
  "Eco-friendly cleaning processes and detergents",
  "Expert handling of delicate fabrics and special care items",
  "Reliable pickup and delivery scheduling",
  "Satisfaction guarantee on all services",
  "Transparent pricing with no hidden fees"
];

const testimonials = [
  {
    quote: "The convenience of LaundryHeap has completely changed my weekly routine. I get so much time back!",
    author: "Michael T."
  },
  {
    quote: "I'm impressed with the attention to detail. My clothes have never looked better.",
    author: "Sarah L."
  }
];

export default function QualityPromiseSection() {
  return (
    <Box sx={{ 
      width: '100%', 
      py: 8, 
      bgcolor: `${theme.palette.primary.main}10`, 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Static decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: 150,
        height: 150,
        borderRadius: '50%',
        bgcolor: `${theme.palette.primary.main}20`,
        opacity: 0.3,
        zIndex: 0
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        bgcolor: `${theme.palette.secondary.main}20`,
        opacity: 0.2,
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Pass the data to the client component */}
        <ClientQualityPromiseSection 
          qualityPromises={qualityPromises} 
          testimonials={testimonials} 
        />
      </Container>
    </Box>
  );
}