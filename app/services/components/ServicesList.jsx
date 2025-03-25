'use client';
import React from 'react';
import { 
  Paper, 
  Tabs,
  Tab,
  Typography,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import ServiceCard from './ServiceCard';
import { services } from '../ServicesData'; // Update this path

const ServicesList = ({ activeTab, handleTabChange, handleAddToCart }) => {
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

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Services Navigation */}
      <Paper elevation={2} sx={{ 
        mb: 4, 
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            px: 2,
            '& .MuiTabs-indicator': {
              backgroundColor: '#28ddcd', // Primary turquoise
            },
            '& .Mui-selected': {
              color: '#28ddcd !important', // Primary turquoise
            }
          }}
        >
          <Tab 
            icon={<LocalLaundryServiceIcon />} 
            label="All Services" 
            iconPosition="start"
          />
          {services.map((service, index) => (
            <Tab 
              key={index}
              icon={service.icon} 
              label={service.title} 
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      {/* Service Cards */}
      <motion.div variants={titleVariants}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          mb: 3,
          color: '#0D3B6E' // Dark blue from theme
        }}>
          {activeTab === 0 ? 'Our Services' : services[activeTab-1].title}
        </Typography>
      </motion.div>
      
      <Grid container spacing={3}>
        {(activeTab === 0 ? services : [services[activeTab-1]]).map((service) => (
          <Grid item xs={12} key={service.id}>
            <ServiceCard 
              service={service} 
              handleAddToCart={handleAddToCart} 
            />
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default ServicesList;