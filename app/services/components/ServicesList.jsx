'use client';
import React from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  Chip,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import FilterListIcon from '@mui/icons-material/FilterList';
import ServiceCard from './ServiceCard';
import { services } from '../ServicesData'; // Update this path

// Define constants
const TURQUOISE = '#28ddcd';
const DARK_BLUE = '#0D3B6E';

const ServicesList = ({ activeTab, handleTabChange, handleAddToCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  // Get current service category name
  const currentServiceCategory = activeTab === 0 ? 'All Services' : services[activeTab-1].title;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Page Section Header */}
      <Box sx={{ 
        mb: { xs: 3, md: 4 },
        position: 'relative'
      }}>
        <motion.div variants={titleVariants}>
          <Typography 
            variant="h4" 
            component="h1"
            sx={{
              fontWeight: 800,
              color: DARK_BLUE,
              mb: { xs: 1, sm: 1.5 },
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }
            }}
          >
            Our Services
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{
              color: 'text.secondary',
              maxWidth: 800,
              mb: { xs: 3, md: 4 },
              lineHeight: 1.6
            }}
          >
            Professional laundry and cleaning solutions tailored to your needs. Choose from our range of services below.
          </Typography>
        </motion.div>
      </Box>

      {/* Services Navigation */}
      <motion.div
        variants={titleVariants}
        style={{ position: 'relative' }}
      >
        <Paper 
          elevation={2} 
          sx={{
            mb: { xs: 4, md: 5 },
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.08)',
            position: 'relative',
            zIndex: 2
          }}
        >
          {isSmall && (
            <Box sx={{ 
              p: 1.5, 
              display: 'flex', 
              alignItems: 'center', 
              borderBottom: '1px solid rgba(0,0,0,0.08)'
            }}>
              <FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Filter Services
              </Typography>
            </Box>
          )}
          
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 0.75 },
              minHeight: { xs: 48, sm: 56 },
              '& .MuiTabs-indicator': {
                backgroundColor: TURQUOISE,
                height: 3,
                borderRadius: '3px 3px 0 0'
              },
              '& .Mui-selected': {
                color: `${TURQUOISE} !important`,
                fontWeight: 600
              },
              '& .MuiTab-root': {
                minHeight: { xs: 48, sm: 56 },
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                textTransform: 'none',
                transition: 'all 0.3s ease',
                mx: { xs: 0.5, sm: 1 },
                '&:hover': {
                  color: TURQUOISE,
                  opacity: 0.8,
                  backgroundColor: 'rgba(40, 221, 205, 0.05)'
                }
              },
              '& .MuiSvgIcon-root': {
                mr: { xs: 0.5, sm: 1 },
                fontSize: { xs: '1.2rem', sm: '1.4rem' }
              },
              '& .MuiTabs-scrollButtons': {
                '&.Mui-disabled': { opacity: 0.3 },
                '&:not(.Mui-disabled)': {
                  color: DARK_BLUE
                }
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
      </motion.div>

      {/* Selected Service Category Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <motion.div variants={titleVariants}>
          <Chip 
            label={currentServiceCategory}
            color="primary"
            sx={{ 
              bgcolor: TURQUOISE,
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9rem',
              mb: 2,
              '& .MuiChip-label': { px: 1.5 }
            }}
          />
          
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 700,
              color: DARK_BLUE,
              mb: 1,
              fontSize: { xs: '1.35rem', sm: '1.5rem', md: '1.75rem' }
            }}
          >
            {activeTab === 0 ? 'All Available Services' : services[activeTab-1].title}
          </Typography>
          
          {activeTab !== 0 && (
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 2, maxWidth: 800 }}
            >
              {services[activeTab-1].description}
            </Typography>
          )}
          
          <Divider sx={{ mb: 3 }} />
        </motion.div>
      </Box>

      {/* Service Cards with improved spacing */}
      <Grid container spacing={4}>
        {(activeTab === 0 ? services : [services[activeTab-1]]).map((service, index) => (
          <Grid 
            item 
            xs={12} 
            key={service.id}
            component={motion.div}
            custom={index}
            variants={cardVariants}
          >
            <ServiceCard
              service={service}
              handleAddToCart={handleAddToCart}
            />
            
            {/* Add spacer after each card except the last one */}
            {index < (activeTab === 0 ? services.length - 1 : 0) && (
              <Box sx={{ 
                height: { xs: 16, md: 24 }, 
                width: '100%',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '5%',
                  width: '90%',
                  height: 1,
                  bgcolor: 'rgba(0,0,0,0.06)',
                  borderRadius: 1
                }
              }} />
            )}
          </Grid>
        ))}
      </Grid>
      
      {/* Additional Services Information */}
      {activeTab === 0 && (
        <Box 
          sx={{ 
            mt: 6, 
            p: { xs: 2.5, sm: 3, md: 4 }, 
            bgcolor: 'rgba(40, 221, 205, 0.08)',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'rgba(40, 221, 205, 0.2)'
          }}
          component={motion.div}
          variants={titleVariants}
        >
          <Typography variant="h6" sx={{ mb: 1.5, color: DARK_BLUE, fontWeight: 700 }}>
            Need a Custom Service?
          </Typography>
          <Typography variant="body1">
            Don't see what you're looking for? Contact us for custom laundry and cleaning solutions tailored to your specific needs.
          </Typography>
        </Box>
      )}
    </motion.div>
  );
};

export default ServicesList;