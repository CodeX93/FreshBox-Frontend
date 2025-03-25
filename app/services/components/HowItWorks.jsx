'use client';
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { howItWorksSteps } from '../ServicesData'; // Update this path

const HowItWorks = () => {
  const theme = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: index => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.1 * index,
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '5px',
            height: '100%',
            backgroundColor: theme.palette.primary.main,
          }}
        />
        
        <motion.div variants={itemVariants}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.dark }}>
            How It Works
          </Typography>
        </motion.div>
        
        <Stepper alternativeLabel sx={{ mb: 2 }}>
          {howItWorksSteps.map((step, index) => (
            <Step key={index}>
              <StepLabel 
                StepIconComponent={() => (
                  <motion.div
                    custom={index}
                    variants={iconVariants}
                  >
                    <Avatar sx={{ 
                      width: 40, 
                      height: 40, 
                      bgcolor: theme.palette.primary.main,
                      boxShadow: '0 4px 10px rgba(40, 221, 205, 0.3)',
                    }}>
                      {React.cloneElement(step.icon, { sx: { color: 'white' } })}
                    </Avatar>
                  </motion.div>
                )}
              >
                <motion.div
                  variants={itemVariants}
                  style={{ textAlign: 'center' }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>
                    {step.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.description}
                  </Typography>
                </motion.div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {/* Connected line animation */}
        <Box sx={{ position: 'relative', height: 4, mt: 1 }}>
          <Box sx={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: '#E0E0E0' }} />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              height: '2px',
              backgroundColor: theme.palette.primary.main
            }}
          />
        </Box>
      </Paper>
    </motion.div>
  );
};

export default HowItWorks;