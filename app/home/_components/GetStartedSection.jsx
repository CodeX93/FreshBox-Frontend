import React from 'react';
import { Box, Container } from '@mui/material';
import ClientGetStartedSection from '../ClientSideInterations/ClientGetStartedSection';

// Defining static data at the server level
const steps = [
  {
    number: 1,
    text: "Sign up and create your account"
  },
  {
    number: 2,
    text: "Schedule your first pickup"
  },
  {
    number: 3,
    text: "Enjoy clean, fresh laundry delivered back to you"
  }
];

// Darker navy blue that complements turquoise better
const backgroundColorDark = '#0A2E50';

const GetStartedSection = () => {
  return (
    <Box
      component="section"
      id="get-started-section"
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: backgroundColorDark,
        color: '#ffffff',
        py: { xs: 6, md: 8 },
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Pass only the serializable data to the client component */}
        <ClientGetStartedSection steps={steps} />
      </Container>
    </Box>
  );
};

export default GetStartedSection;