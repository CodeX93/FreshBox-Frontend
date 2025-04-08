import React from 'react';
import { Box } from '@mui/material';
import { theme } from '../../../contexts/Theme';
import ClientServicesSection from '../ClientSideInterations/ClientServicesSection';

// Enhanced services data with optimized descriptions
const services = [
  {
    name: "Dry Cleaning",
    description: "Professional care for delicate garments requiring special attention. Our eco-friendly processes preserve colors and extend garment life.",
    slug: "dry-cleaning",
    features: ["Garment inspection", "Stain pre-treatment", "Expert pressing", "Eco-friendly solvents", "Same-day service"],
    imageUrl: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Professional dry cleaning service with hanging clothes"
  },
  {
    name: "Wash & Fold",
    description: "Convenient solution for everyday laundry needs. Save time with professionally washed and perfectly folded clothes.",
    slug: "wash-fold",
    features: ["Sorted by color", "Premium detergents", "Precisely folded", "Careful handling", "Weight-based pricing"],
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Neatly folded laundry clothes stacked in piles"
  },
  {
    name: "Laundry",
    description: "Custom laundering for shirts, blouses and machine-washable garments. Hand-finished for that crisp, professional look.",
    slug: "laundry",
    features: ["Starch options", "Hang or fold", "Button protection", "Hand-finished", "Wrinkle prevention"],
    imageUrl: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Modern laundry machines in a clean laundromat"
  },
  {
    name: "Household Items",
    description: "Special care for comforters, bedding, linens and home textiles. Each fabric receives the specialized treatment it requires.",
    slug: "household",
    features: ["Specialty cleaning", "Careful handling", "Perfect finishing", "Allergy-free option", "Custom folding"],
    imageUrl: "https://images.unsplash.com/photo-1583401656728-63592c6fe154?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Clean household textiles including folded comforters and linens"
  }
];

// Enhanced ServicesSection with better background elements
export default function ServicesSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #2E7B5C 0%, #1e5c42 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced decorative elements for a more dynamic background */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: -50, md: -100 },
          right: { xs: -50, md: -100 },
          width: { xs: 150, md: 300 },
          height: { xs: 150, md: 300 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}40 0%, ${theme.palette.primary.main}00 70%)`,
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: -30, md: -50 },
          left: { xs: -30, md: -50 },
          width: { xs: 100, md: 200 },
          height: { xs: 100, md: 200 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}40 0%, ${theme.palette.secondary.main}00 70%)`,
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
      
      {/* Additional decorative elements for visual interest */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '15%',
          width: { xs: 80, md: 150 },
          height: { xs: 80, md: 150 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}30 0%, ${theme.palette.primary.main}00 70%)`,
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '20%',
          width: { xs: 60, md: 120 },
          height: { xs: 60, md: 120 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}20 0%, ${theme.palette.secondary.main}00 70%)`,
          filter: 'blur(25px)',
          zIndex: 0,
        }}
      />
      
      {/* Subtle pattern overlay for texture */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
          zIndex: 0,
        }}
      />
      
      {/* Pass the enhanced services data to the client component */}
      <ClientServicesSection services={services} />
    </Box>
  );
}