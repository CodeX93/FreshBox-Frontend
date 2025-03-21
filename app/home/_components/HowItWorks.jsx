'use client';
import React,{ useState, useEffect, useRef, useCallback } from 'react';
import { 
  Box, Typography, Container, Stack, Paper, List, ListItem, ListItemIcon,
  Zoom, Fab 
} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { 
  CalendarMonth, LocalLaundryService, LocalShipping, Check, Star 
} from '@mui/icons-material';
import { motion, useAnimate, AnimatePresence } from 'framer-motion';
import { CalendarIcon, CheckIcon, ListStartIcon, TruckIcon, WashingMachine } from 'lucide-react';

const ServiceWorkflow = ({ onComplete }) => {
  const [activeService, setActiveService] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [scope, animate] = useAnimate();
  const servicesRef = useRef([]);
  const containerRef = useRef(null);
  const lastScroll = useRef(0);
  const scrollTimeout = useRef(null);
  const iconStyle = { color: 'primary.main', fontSize: 32 };

  const services = [
    {
      name: "Laundry Service",
      description: "Professional cleaning for all your garments",
      icon: <WashingMachine sx={iconStyle} />,
      steps: [
        {
          icon: <CalendarIcon sx={iconStyle} />,
          title: "Schedule Pickup",
          description: "Choose a convenient time for us to pick up your items.",
          details: [
            "2-hour collection window",
            "Flexible scheduling options",
            "Real-time tracking available",
          ],
        },
        {
          icon: <WashingMachine sx={iconStyle} />,
          title: "Professional Cleaning",
          description: "We clean your items with care using premium products.",
          details: [
            "Eco-friendly detergents",
            "Specialized washing techniques",
            "Quality control checks",
          ],
        },
        {
          icon: <TruckIcon sx={iconStyle} />,
          title: "Delivery",
          description: "Your fresh, clean clothes delivered right to your door.",
          details: [
            "2-hour delivery window",
            "Contactless delivery option",
            "Same-day service available",
          ],
        },
      ],
    },
    {
      name: "Dry Cleaning",
      description: "Delicate care for special fabrics",
      icon: <ListStartIcon sx={iconStyle} />,
      steps: [
        {
          icon: <CalendarIcon sx={iconStyle} />,
          title: "Book a Pickup",
          description: "Select a time for us to collect your delicate items.",
          details: [
            "Tailored for delicate items",
            "Professional handling ensured",
            "Custom pickup instructions accepted",
          ],
        },
        {
          icon: <WashingMachine sx={iconStyle} />,
          title: "Dry Clean with Care",
          description: "We use advanced dry cleaning methods to preserve quality.",
          details: [
            "Safe for all delicate fabrics",
            "Inspection before and after cleaning",
            "Odor-free finish",
          ],
        },
        {
          icon: <TruckIcon sx={iconStyle} />,
          title: "Return",
          description: "Receive your garments cleaned and ready to wear.",
          details: [
            "Neatly packaged with hangers",
            "Crease-free delivery",
            "Timely notifications",
          ],
        },
      ],
    },
    {
      name: "Ironing Service",
      description: "Perfectly pressed clothes delivered fast",
      icon: <CheckIcon sx={iconStyle} />,
      steps: [
        {
          icon: <CalendarIcon sx={iconStyle} />,
          title: "Select Items",
          description: "Let us know what needs to be ironed and schedule a pickup.",
          details: [
            "Any type of fabric",
            "Custom ironing preferences",
            "Pickup at your convenience",
          ],
        },
        {
          icon: <WashingMachine sx={iconStyle} />,
          title: "Expert Ironing",
          description: "Our professionals handle each piece with precision.",
          details: [
            "Steam and press options",
            "Attention to collars and cuffs",
            "Folded or hung per your choice",
          ],
        },
        {
          icon: <TruckIcon sx={iconStyle} />,
          title: "Delivered to You",
          description: "Crisp, wrinkle-free clothes returned on schedule.",
          details: [
            "Same-day and next-day delivery",
            "Weather-protected packaging",
            "Satisfaction guaranteed",
          ],
        },
      ],
    },
  ];

  const currentService = services[activeService];
  const currentSteps = currentService?.steps || [];

  const handleServiceClick = (index) => {
    setActiveService(index);
    setActiveStep(0);
    if (servicesRef.current[index]) {
      animate(servicesRef.current[index], { scale: 0.95 }, { duration: 0.2 })
        .then(() => animate(servicesRef.current[index], { scale: 1 }));
    }
  };

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight } = containerRef.current;
    const direction = scrollTop > lastScroll.current ? 'down' : 'up';
    lastScroll.current = scrollTop;

    // Update active step calculation
    const stepHeight = scrollHeight / currentSteps.length;
    const newStep = Math.floor(scrollTop / stepHeight);
    setActiveStep(Math.min(newStep, currentSteps.length - 1));
  }, [currentSteps]);

  const safeScrollTo = useCallback((position) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const handleScrollEvent = () => handleScroll();
    node.addEventListener('scroll', handleScrollEvent);
    return () => node.removeEventListener('scroll', handleScrollEvent);
  }, [handleScroll]);

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  if (!services.length) return null;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 8,
      position: 'relative'
    }}>
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ 
          textAlign: 'center',
          mb: 8,
          
          fontFamily: 'Playfair Display',
          fontWeight: 700,
          background: '-webkit-linear-gradient(45deg, #28ddcd 30%, #20c5b7 90%)',

          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          How We Deliver Excellence
        </Typography>

        {/* Horizontal Service Selector */}
        <Box sx={{
          display: 'flex',
          gap: 4,
          mb: 8,
          overflowX: 'auto',
          py: 2,
          '&::-webkit-scrollbar': { display: 'none' }
        }}>
          <AnimatePresence>
            {services.map((service, index) => (
              <motion.div 
                key={service.name}
                ref={(el) => (servicesRef.current[index] = el)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleServiceClick(index)}
              >
                <Paper sx={{
                  minWidth: 300,
                  p: 4,
                  borderRadius: 4,
                  background: activeService === index ? 
  'linear-gradient(135deg, #28ddcd 0%, #20c5b7 100%)' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: activeService === index ? 
                    '0 15px 30px rgba(33,150,243,0.3)' : '0 8px 16px rgba(0,0,0,0.1)'
                }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    {React.cloneElement(service.icon, {
                      sx: { 
                        fontSize: 40,
                        color: activeService === index ? 'white' : '#2196F3'
                      }
                    })}
                  </Box>
                  <Typography variant="h5" sx={{
                    color: activeService === index ? 'white' : 'text.primary',
                    mb: 1,
                    fontWeight: 700
                  }}>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: activeService === index ? 'rgba(255,255,255,0.9)' : 'text.secondary'
                  }}>
                    {service.description}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        {/* Animated Process Timeline */}
        <Box ref={containerRef} sx={{
          height: '60vh',
          overflowY: 'auto',
          position: 'relative',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-thumb': { 
  backgroundColor: '#28ddcd',
  borderRadius: 4
},
        }}>
          <Box sx={{ position: 'relative', minHeight: '200vh' }}>
            <AnimatePresence>
              {currentSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{ position: 'absolute', top: index * 600, left: '10%', right: '10%' }}
                >
                  <Paper sx={{
                    p: 4,
                    borderRadius: 4,
                    background: 'white',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s',
                    transform: activeStep === index ? 'scale(1.05)' : 'scale(1)',
                    '&:hover': { transform: 'scale(1.03)' }
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      position: 'relative'
                    }}>
                      <Box sx={{
                        width: 60,
                        height: 60,
                        background: 'linear-gradient(135deg, #28ddcd 0%, #20c5b7 100%)',

                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3,
                        boxShadow: '0 5px 15px rgba(40,221,205,0.3)'

                      }}>
                        {React.cloneElement(step.icon, {
                          sx: { color: 'white', fontSize: 28 }
                        })}
                      </Box>
                      <motion.div
                        animate={{ rotate: activeStep === index ? [0, 15, -15, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #28ddcd 0%, #20c5b7 100%)',

                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          {step.title}
                        </Typography>
                      </motion.div>
                    </Box>
                    <Typography variant="body1" sx={{ 
                      mb: 3,
                      color: 'text.secondary',
                      lineHeight: 1.6
                    }}>
                      {step.description}
                    </Typography>
                    <Stack spacing={2}>
                      {step.details.map((detail, idx) => (
                        <Box key={idx} sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          borderRadius: 2,
                          background: 'rgba(40,221,205,0.05)',
                          transition: 'all 0.3s',
                          '&:hover': {
  background: 'rgba(40,221,205,0.1)'
}
                        }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                          <Check sx={{ color: '#28ddcd' }} />
                          </ListItemIcon>
                          <Typography variant="body2">{detail}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </Box>

        {/* Floating Action Button */}
        {/* <Zoom in={activeStep > 0}>
          <Fab
            color="primary"
            sx={{ position: 'fixed', bottom: 32, right: 32 }}
            onClick={() => safeScrollTo(0)}
          >
            <KeyboardArrowUp />
          </Fab>
        </Zoom> */}
      </Container>
    </Box>
  );
};

export default ServiceWorkflow;