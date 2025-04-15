'use client';
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {theme} from "../../../contexts/Theme"
const DeliveryInfo = () => {
  

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.3
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
      <Paper elevation={2} sx={{ 
        mt: 3, 
        p: 3, 
        borderRadius: 2,
        border: '1px solid rgba(226, 232, 240, 0.8)',
        position: 'relative',
        overflow: 'hidden',
        bgcolor:'white'
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: theme.palette.primary.main,
          }}
        />
        
        <Typography variant="subtitle1" sx={{ 
          fontWeight: 600, 
          mb: 2,
          color: theme.palette.primary.darkBlue
        }}>
          Delivery Information
        </Typography>
        
        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <DeliveryDiningIcon 
              fontSize="small" 
              sx={{ mr: 1, color: theme.palette.primary.darkBlue }} 
            />
            <Typography variant="body2" sx={{color:theme.palette.primary.darkBlue}}>
              Free collection & delivery in London zones 1-3
            </Typography>
          </Box>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon 
              fontSize="small" 
              sx={{ mr: 1, color: theme.palette.primary.darkBlue }} 
            />
            <Typography variant="body2" sx={{color:theme.palette.primary.darkBlue}}>
              2-hour collection window
            </Typography>
          </Box>
        </motion.div>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <motion.div
            custom={0}
            variants={chipVariants}
          >
            <Chip 
              label="Minimum Order £15" 
              sx={{color:theme.palette.primary.darkBlue}}
              variant="outlined" 
              size="small" 
            />
          </motion.div>
          
          <motion.div
            custom={1}
            variants={chipVariants}
          >
            <Chip 
              label="Weekend Delivery Available" 
              sx={{color:theme.palette.primary.darkBlue}}
              variant="outlined" 
              size="small" 
            />
          </motion.div>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default DeliveryInfo;