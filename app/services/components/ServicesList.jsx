'use client';
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Box,
  useMediaQuery,
  Chip,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import FilterListIcon from '@mui/icons-material/FilterList';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import IronIcon from '@mui/icons-material/Iron';
import BedIcon from '@mui/icons-material/Bed';
import BusinessIcon from '@mui/icons-material/Business';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ServiceCard from './ServiceCard';

import {theme} from "../../../contexts/Theme"
// API service to fetch data

import { serviceApi } from '../../../api/service'; // Update this path if needed

// Define constants
const TURQUOISE = theme.palette.primary.main;
const DARK_BLUE = theme.palette.primary.darkBlue;

// Map to associate categories with icons
const categoryIcons = {
  'All Services': <LocalLaundryServiceIcon />,
  'Standard': <LocalLaundryServiceIcon />,
  'Premium': <DryCleaningIcon />,
  'Specialized': <MedicalServicesIcon />,
  'Add-on': <IronIcon />,
  'Business': <BusinessIcon />
};

// Default descriptions for categories
const categoryDescriptions = {
  'All Services': 'Browse our complete range of laundry and cleaning services available for all your needs.',
  'Standard': 'Our standard services provide quality cleaning for everyday items at affordable prices.',
  'Premium': 'Premium services for your finest garments and special care items.',
  'Specialized': 'Specialized cleaning services for specific items that require extra attention.',
  'Add-on': 'Additional services that can be combined with our main cleaning options.',
  'Business': 'Professional services designed for businesses and corporate clients.'
};

const ServicesList = ({ handleAddToCart }) => {
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State variables
  const [activeTab, setActiveTab] = useState(0);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await serviceApi.getAllServices();
        if (response.success) {
          const servicesData = response.data;
          
          // Extract unique categories from services
          const uniqueCategories = [...new Set(servicesData.map(service => service.category))];
          
          // Add "All Services" as the first category
          const allCategories = ['All Services', ...uniqueCategories];
          
          setServices(servicesData);
          setCategories(allCategories);
        } else {
          setError('Failed to load services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Error loading services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);
  
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

  // Get filtered services based on active tab
  const filteredServices = categories[activeTab] === 'All Services'
    ? services
    : services.filter(service => service.category === categories[activeTab]);

  // Get current service category name
  const currentServiceCategory = categories[activeTab] || 'All Services';

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '300px' 
      }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

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
              bgcolor:theme.palette.primary.main,
              '& .MuiTabs-indicator': {
                backgroundColor: TURQUOISE,
                height: 3,
                borderRadius: '3px 3px 0 0'
              },
              '& .Mui-selected': {
                color: '#003C43 !important',
                fontWeight: 'bolder'
              },
              '& .MuiTab-root': {
                minHeight: { xs: 48, sm: 56 },
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                textTransform: 'none',
                transition: 'all 0.3s ease',
                mx: { xs: 0.5, sm: 1 },
                '&:hover': {
                  color: theme.palette.primary.darkBlue,
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
            {categories.map((category, index) => (
              <Tab
                key={index}
                icon={categoryIcons[category] || <LocalLaundryServiceIcon />}
                label={category}
                iconPosition="start"
                sx={{
                  color: theme.palette.primary.darkBlue,
                }}
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
              bgcolor: theme.palette.primary.darkBlue,
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
            {currentServiceCategory === 'All Services' ? 'All Available Services' : currentServiceCategory}
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 2, maxWidth: 800 }}
          >
            {categoryDescriptions[currentServiceCategory] || `Our ${currentServiceCategory} services offer quality cleaning solutions.`}
          </Typography>
          
          <Divider sx={{ mb: 3 }} />
        </motion.div>
      </Box>

      {/* Service Cards with improved spacing */}
      <Grid container spacing={4}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <Grid 
              item 
              xs={12} 
              key={service._id}
              component={motion.div}
              custom={index}
              variants={cardVariants}
            >
              <ServiceCard
                service={{
                  id: service._id,
                  title: service.name,
                  description: service.description,
                  price: service.price,
                  priceType: service.priceType,
                  estimatedTime: service.estimatedTime,
                  category: service.category,
                  imageUrl: service.imageUrl || '/images/service-placeholder.jpg',
                  specifications: service.specifications || []
                }}
                handleAddToCart={handleAddToCart}
              />
              
              {/* Add spacer after each card except the last one */}
              {index < filteredServices.length - 1 && (
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
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No services found in this category.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      
      {/* Additional Services Information */}
      {currentServiceCategory === 'All Services' && (
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