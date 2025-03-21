'use client'
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent 
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import PeopleIcon from '@mui/icons-material/People';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SecurityIcon from '@mui/icons-material/Security';

export default function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const values = [
    {
      icon: <IntegrationInstructionsIcon color="primary" sx={{ fontSize: 50 }} />,
      title: 'Innovation',
      description: 'We constantly seek new approaches and embrace cutting-edge technologies.'
    },
    {
      icon: <PeopleIcon color="secondary" sx={{ fontSize: 50 }} />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and collective intelligence.'
    },
    {
      icon: <EmojiObjectsIcon color="primary" sx={{ fontSize: 50 }} />,
      title: 'Creativity',
      description: 'We encourage bold ideas and out-of-the-box thinking.'
    },
    {
      icon: <SecurityIcon color="secondary" sx={{ fontSize: 50 }} />,
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and ethical behavior.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box 
      ref={ref}
      sx={{ 
        py: 10, 
        backgroundColor: '#f4f4f4' 
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ mb: 6 }}
        >
          Our Core Values
        </Typography>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid 
                item 
                xs={12} 
                md={3} 
                key={index}
                component={motion.div}
                variants={cardVariants}
              >
                <Card 
                  component={motion.div}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center', 
                    p: 3 
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {value.icon}
                  </Box>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                    >
                      {value.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}