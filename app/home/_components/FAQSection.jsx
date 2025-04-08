import React from 'react';
import { Box, Container } from '@mui/material';
import ClientFAQSection from '../ClientSideInterations/ClientFAQSection';

// Static FAQ data for SEO benefits
const faqs = [
  {
    question: "How much does the service cost?",
    answer: "Our pricing is weight-based at $2.99 per pound with a 10-pound minimum. We also offer subscription plans that can save you up to 20% for regular service. Special items like comforters or formal wear may have additional charges. You'll always see the full price before confirming.",
    category: "Pricing"
  },
  {
    question: "What is the typical turnaround time?",
    answer: "Our standard turnaround time is 48 hours from pickup to delivery. Need it faster? Our express service guarantees 24-hour turnaround for an additional fee. You'll receive real-time updates through our app.",
    category: "Service"
  },
  {
    question: "How do you handle delicate items?",
    answer: "Delicate items receive special attention. We sort all laundry by color, fabric type, and washing instructions. We use gentle cycles, appropriate water temperatures, and specialized detergents for delicate fabrics. For particularly special items, you can add notes in the app.",
    category: "Service"
  },
  {
    question: "What if an item is lost or damaged?",
    answer: "While extremely rare, we take full responsibility for any lost or damaged items. We'll reimburse you for the estimated value of the item up to $250 per item. For high-value clothing, we recommend noting it in the app when scheduling.",
    category: "Policies"
  },
  {
    question: "Are your cleaning products eco-friendly?",
    answer: "Yes! We use environmentally friendly, hypoallergenic detergents by default. You can also specify your preferred detergent, fabric softener, or request fragrance-free options through your account preferences.",
    category: "Products"
  },
  {
    question: "Do I need to be home for pickup and delivery?",
    answer: "No need to be home! Just leave your laundry bag in your designated spot, and our driver will pick it up. Same for delivery—we'll leave your freshly cleaned clothes where you specify. You'll receive notifications at each step.",
    category: "Service"
  }
];

const FAQSection = () => {
  return (
    <Box
      component="section"
      id="faq-section"
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(165deg, #F9FFFC 0%, rgba(237, 246, 240, 0.6) 100%)',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: { xs: 220, md: 300 },
          height: { xs: 220, md: 300 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(133, 210, 179, 0.2) 0%, rgba(133, 210, 179, 0) 70%)',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: { xs: 220, md: 300 },
          height: { xs: 220, md: 300 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(133, 210, 179, 0.15) 0%, rgba(133, 210, 179, 0) 70%)',
          zIndex: 0
        }}
      />
      
      {/* Additional decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: { xs: 0, md: 150 },
          height: { xs: 0, md: 150 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46, 123, 92, 0.07) 0%, rgba(46, 123, 92, 0) 70%)',
          zIndex: 0,
          display: { xs: 'none', md: 'block' }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '8%',
          width: { xs: 0, md: 120 },
          height: { xs: 0, md: 120 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(181, 236, 217, 0.3) 0%, rgba(181, 236, 217, 0) 70%)',
          zIndex: 0,
          display: { xs: 'none', md: 'block' }
        }}
      />
      
      {/* Accent decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '20%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#85D2B3',
          boxShadow: '0 0 20px rgba(133, 210, 179, 0.6)',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '35%',
          left: '18%',
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#2E7B5C',
          boxShadow: '0 0 15px rgba(46, 123, 92, 0.4)',
          zIndex: 0
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <ClientFAQSection faqs={faqs} />
      </Container>
    </Box>
  );
};

export default FAQSection;