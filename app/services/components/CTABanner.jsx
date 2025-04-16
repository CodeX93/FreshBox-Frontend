'use client';
import React from 'react';
import {
  Paper,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import {theme} from "../../../contexts/Theme"

const CTABanner = () => {
  

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          mt: 8,
          p: { xs: 4, md: 6 },
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating circle decorations */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
          }}
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1
          }}
        />
        
        <motion.div
          animate={{
            y: [0, 15, 0],
            transition: { repeat: Infinity, duration: 7, ease: "easeInOut" }
          }}
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1
          }}
        />
        
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            position: 'relative',
            zIndex: 2
          }}
        >
          Try Our Services Today
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4, 
            maxWidth: 700, 
            mx: 'auto',
            position: 'relative',
            zIndex: 2
          }}
        >
          Join thousands of satisfied customers who have made laundry day a thing of the past.
          Get started with your first order and enjoy 15% off with code WELCOME15.
        </Typography>
        
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
          disableElevation
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              bgcolor: 'white',
              color: theme.palette.primary.main,
              fontWeight: 600,
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                color: theme.palette.primary.dark
              },
              borderRadius: 2,
              position: 'relative',
              zIndex: 2
            }}
          >
            Get Started Now
          </Button>
        </motion.div>
      </Paper>
    </motion.div>
  );
};

export default CTABanner;