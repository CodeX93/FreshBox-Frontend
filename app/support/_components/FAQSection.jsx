import React from 'react';
import { Box, Typography } from '@mui/material';
import ClientFAQSection from '../ClientSideInterations/ClientFAQSection';

// Define constants
const TURQUOISE = '#28ddcd';
const TURQUOISE_DARK = '#20c5b7';
const TURQUOISE_LIGHT = '#e8f9f8';

// FAQ data
const faqData = [
  {
    question: "How do I schedule a laundry pickup?",
    answer: "You can schedule a pickup through our website or mobile app. Simply log in to your account, select 'Schedule Pickup' from the dashboard, choose your preferred date and time slot, and confirm your booking."
  },
  {
    question: "What is the turnaround time for regular laundry services?",
    answer: "Our standard turnaround time for regular wash & fold services is 24 hours. For specialized services like dry cleaning, it may take 2-3 business days depending on the items and treatment required."
  },
  {
    question: "How does your pricing work?",
    answer: "Our pricing is transparent and calculated by weight for wash & fold services. Dry cleaning and specialized treatments are priced per item. You can view our detailed pricing chart on the Services page or request a custom quote for commercial services."
  },
  {
    question: "Do you offer rush or same-day service?",
    answer: "Yes, we offer rush and same-day services for an additional fee, subject to availability. Please schedule your pickup before 9 AM to ensure same-day service completion."
  },
  {
    question: "What areas do you service?",
    answer: "We currently serve the greater metropolitan area including downtown and surrounding neighborhoods. Check our Locations page for specific service boundaries or enter your zip code on our homepage to verify service availability."
  },
  {
    question: "How do I change or cancel my scheduled pickup?",
    answer: "You can modify or cancel your scheduled pickup through your account dashboard up to 2 hours before the scheduled time without any penalty. Changes made after this window may incur a rescheduling fee."
  },
  {
    question: "Do you provide special handling for delicate garments?",
    answer: "Absolutely! We offer specialized care for delicate fabrics, designer items, and heirloom textiles. Simply mark these items as 'Special Care' when scheduling your pickup, and our experts will ensure appropriate handling."
  },
  {
    question: "How do I track my order status?",
    answer: "You can track your order in real-time through your account dashboard or by using the order tracking number sent to you via email/SMS after pickup. Our system updates you at each stage from pickup to delivery."
  }
];

const FAQSection = ({ searchQuery, setSearchQuery, expandedFAQ, setExpandedFAQ, searchActive }) => {
  return (
    <Box sx={{ py: 4 }} id="faq-section">
      {/* Hidden content for SEO */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h2>Frequently Asked Questions about Laundry and Dry Cleaning Services</h2>
        <div itemScope itemType="https://schema.org/FAQPage">
          {faqData.map((faq, index) => (
            <div key={index} itemScope itemType="https://schema.org/Question">
              <h3 itemProp="name">{faq.question}</h3>
              <div itemScope itemType="https://schema.org/Answer">
                <div itemProp="text">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client component that handles interactivity */}
      <ClientFAQSection
        faqData={faqData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        expandedFAQ={expandedFAQ}
        setExpandedFAQ={setExpandedFAQ}
        searchActive={searchActive}
      />
    </Box>
  );
};

export default FAQSection;