import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button 
} from '@mui/material';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 10,
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            About Our Company
          </Typography>
          
          <Typography 
            variant="h5" 
            component="p" 
            gutterBottom
            sx={{ mb: 4 }}
          >
            Innovating Tomorrow, Inspiring Today
          </Typography>
          
          <Button 
          disableElevation
            variant="contained" 
            color="secondary" 
            size="large"
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Learn More
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}