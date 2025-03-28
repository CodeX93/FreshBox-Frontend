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
        backgroundColor: '#ffffff',
        py: 10,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(40, 221, 205, 0.25) 0%, transparent 70%)',
          opacity: 0.5,
          zIndex: 0
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
          background: 'linear-gradient(135deg, rgba(40, 221, 205, 0.25) 0%, transparent 70%)',
          opacity: 0.5,
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