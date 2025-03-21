'use client'
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid 
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Box 
      ref={ref}
      sx={{ 
        py: 10, 
        backgroundColor: 'white' 
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Our Mission
          </Typography>
          
          <Grid 
            container 
            spacing={4} 
            component={motion.div}
          >
            <Grid 
              item 
              xs={12} 
              md={6} 
              component={motion.div}
              variants={itemVariants}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3 
                }}
              >
                <RocketLaunchIcon 
                  color="primary" 
                  sx={{ fontSize: 50, mr: 2 }} 
                />
                <Typography variant="h5">
                  Our Mission
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                We are dedicated to pushing the boundaries of innovation, 
                creating solutions that transform industries and improve 
                lives through cutting-edge technology and creative thinking.
              </Typography>
            </Grid>
            
            <Grid 
              item 
              xs={12} 
              md={6} 
              component={motion.div}
              variants={itemVariants}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3 
                }}
              >
                <VisibilityIcon 
                  color="secondary" 
                  sx={{ fontSize: 50, mr: 2 }} 
                />
                <Typography variant="h5">
                  Our Vision
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                To be a global leader in innovation, consistently delivering 
                groundbreaking solutions that address the world's most 
                challenging problems through collaboration and creativity.
              </Typography>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}