import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ClientProcessSection from '../ClientSideInterations/ClientProcessSection';

// Define the static data at the server level for SEO benefits
const processes = [
  {
    title: "Create Your Account",
    description: "Create your 2ULaundry account, download the app, and select your cleaning preferences.",
    imagePath: "/images/account-creation.png",
    buttonText: "Get Started"
  },
  {
    title: "On Pickup Day",
    description: "You'll get your personalized laundry bags to separate your laundry & dry cleaning. On Laundry Day, your stuff goes into bags and set them out.",
    imagePath: "/images/pickup-day.png",
    buttonText: "Schedule Pickup"
  },
  {
    title: "On Delivery Day",
    description: "When your clothes are cleaned, crisp, and ready to wear, one of our laundry delivery drivers will return them to you – at your designated drop-off location.",
    imagePath: "/images/delivery-day.png",
    buttonText: "What to Expect"
  },
  {
    title: "Not home? No problem!",
    description: "That's very common! If you won't be home, you can leave your laundry bags out, we'll let you know when our drivers are on the way.",
    imagePath: "/images/not-home.png",
    buttonText: "Learn More"
  }
];

const ProcessSection = () => {
  return (
    <Box sx={{ background: '#FFFBEA', overflowX: 'hidden' }}>
      {/* Static header section that can be rendered on the server */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: '#0A7B83' }}>
            How does our laundry service work?
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: 'text.secondary' }}>
            We make laundry day easy! Laundry service delivered — at the click of a button.
          </Typography>
        </Container>
      </Box>

      {/* Pass the processes data to the client component */}
      <ClientProcessSection processes={processes} />
    </Box>
  );
};

export default ProcessSection;