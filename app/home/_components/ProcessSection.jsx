import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ClientProcessSection from '../ClientSideInterations/ClientProcessSection';

// Define the static data at the server level for SEO benefits
const processes = [
  {
    number: 1,
    title: "Create Your Account",
    description: "Create your 2ULaundry account, download the app, and select your cleaning preferences.",
    imagePath: "https://images.pexels.com/photos/7415124/pexels-photo-7415124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Person setting up account on smartphone",
    secondaryImagePath: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    secondaryImageAlt: "Person signing up for laundry service on laptop",
    buttonText: "Get Started",
    icon: "smartphone"
  },
  {
    number: 2,
    title: "On Pickup Day",
    description: "You'll get your personalized laundry bags to separate your laundry & dry cleaning. On Laundry Day, your stuff goes into bags and set them out.",
    imagePath: "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Laundry bags ready for pickup",
    buttonText: "Schedule Pickup",
    icon: "local_shipping"
  },
  {
    number: 3,
    title: "On Delivery Day",
    description: "When your clothes are cleaned, crisp, and ready to wear, one of our laundry delivery drivers will return them to you – at your designated drop-off location.",
    imagePath: "https://images.pexels.com/photos/4391478/pexels-photo-4391478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Delivery of freshly cleaned clothes",
    secondaryImagePath: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    secondaryImageAlt: "Neatly folded and pressed clean clothes",
    buttonText: "What to Expect",
    icon: "local_laundry_service"
  },
  {
    number: 4,
    title: "Not home? No problem!",
    description: "That's very common! If you won't be home, you can leave your laundry bags out, we'll let you know when our drivers are on the way.",
    imagePath: "https://images.pexels.com/photos/5591667/pexels-photo-5591667.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Laundry bags at doorstep for contactless pickup",
    buttonText: "Learn More",
    icon: "home"
  }
];

const ProcessSection = () => {
  return (
    <Box 
      component="section" 
      id="process-section"
      sx={{ 
        background: '#003C43',
        overflowX: 'hidden',
        position: 'relative',
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 15 }
      }}
    >
      {/* Decorative background shapes */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '5%', 
          right: '-5%',
          width: { xs: 150, md: 280 },
          height: { xs: 150, md: 280 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(133, 210, 179, 0.2) 0%, rgba(133, 210, 179, 0) 70%)',
          zIndex: 0
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: '10%', 
          left: '-8%',
          width: { xs: 200, md: 380 },
          height: { xs: 200, md: 380 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(133, 210, 179, 0.15) 0%, rgba(133, 210, 179, 0) 70%)',
          zIndex: 0
        }} 
      />
      
      {/* Accent shape */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '30%', 
          left: '15%',
          width: { xs: 0, md: 120 },
          height: { xs: 0, md: 120 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46, 123, 92, 0.08) 0%, rgba(46, 123, 92, 0) 70%)',
          zIndex: 0,
          display: { xs: 'none', md: 'block' }
        }} 
      />
      
      {/* Static header section that can be rendered on the server */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 10 } }}>
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              fontWeight: 700, 
              color: '#FBFFCF',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
              mb: 3,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: '#85D2B3',
                fontWeight:'bolder'
              }
            }}
          >
            How does our laundry service work?
          </Typography>
          <Typography 
            variant="h6" 
            component="p"
            sx={{ 
              color: '#E3FEF7',
              maxWidth: '750px',
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              fontWeight: 400,
              lineHeight: 1.6,
              mt: 4
            }}
          >
            We make laundry day easy! Laundry service delivered — at the click of a button.
          </Typography>
        </Box>
        
        {/* Pass the processes data to the client component */}
        <ClientProcessSection processes={processes} />
      </Container>
    </Box>
  );
};

export default ProcessSection;