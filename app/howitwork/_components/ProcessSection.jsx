'use client';

import React, { useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Paper,
  Button,
  useMediaQuery,
  Divider
} from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../contexts/Theme'; // Update this path to match your project structure

// Icons
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ProcessSection = ({ fadeInUp, scrollY }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // References for different sections
  const sectionRef = useRef(null);
  const phaseOneRef = useRef(null);
  const phaseTwoRef = useRef(null);
  const phaseThreeRef = useRef(null);
  const phaseFourRef = useRef(null);
  
  // InView states
  const isHeaderInView = useInView(sectionRef, { once: false, threshold: 0.3 });
  const isPhaseOneInView = useInView(phaseOneRef, { once: false, threshold: 0.3 });
  const isPhaseTwoInView = useInView(phaseTwoRef, { once: false, threshold: 0.3 });
  const isPhaseThreeInView = useInView(phaseThreeRef, { once: false, threshold: 0.3 });
  const isPhaseFourInView = useInView(phaseFourRef, { once: false, threshold: 0.3 });
  
  // Animation controls
  const headerControls = useAnimation();
  const phaseOneControls = useAnimation();
  const phaseTwoControls = useAnimation();
  const phaseThreeControls = useAnimation();
  const phaseFourControls = useAnimation();

  useEffect(() => {
    if (isHeaderInView) headerControls.start('visible');
    if (isPhaseOneInView) phaseOneControls.start('visible');
    if (isPhaseTwoInView) phaseTwoControls.start('visible');
    if (isPhaseThreeInView) phaseThreeControls.start('visible');
    if (isPhaseFourInView) phaseFourControls.start('visible');
  }, [
    isHeaderInView, 
    isPhaseOneInView, 
    isPhaseTwoInView, 
    isPhaseThreeInView,
    isPhaseFourInView,
    headerControls, 
    phaseOneControls, 
    phaseTwoControls, 
    phaseThreeControls,
    phaseFourControls
  ]);

  const processes = [
    {
      icon: <ScheduleIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: "Book Online",
      description: "Schedule your pickup and delivery times that work for your busy schedule. Same-day service available.",
      step: 1,
      imagePath: "https://plus.unsplash.com/premium_photo-1661768289109-c814be8d7c3d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va2luZ3xlbnwwfHwwfHx8MA%3D%3D", // Booking / scheduling
      detailedDescription: "Our intuitive booking system allows you to schedule laundry services in just a few clicks. Select your preferred pickup time, delivery window, and any special instructions for your items. We offer flexible scheduling options including same-day service, next-day delivery, and recurring weekly or monthly pickups to fit your lifestyle. No more waiting in laundromats or planning your day around laundry cycles - we work around your schedule.",
      features: [
        "24/7 online booking system",
        "Flexible time slots for pickup and delivery",
        "Recurring service scheduling available",
        "Easy rescheduling options",
        "Real-time order tracking"
      ]
    },
    {
      icon: <LocalLaundryServiceIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: "We Clean",
      description: "Our expert team handles your clothes with care using eco-friendly products and professional techniques.",
      step: 2,
      imagePath: "https://plus.unsplash.com/premium_photo-1677234147281-3b505c036d36?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xlYW58ZW58MHx8MHx8fDA%3D", // Laundry machine / cleaning
      detailedDescription: "Once we collect your items, they're brought to our state-of-the-art cleaning facility where our trained professionals sort, pre-treat, and process each garment according to its specific care requirements. We use premium, eco-friendly detergents and cleaning agents that are tough on stains but gentle on fabrics and the environment. Our industrial-grade machines provide superior cleaning while maintaining the integrity and color of your clothes.",
      features: [
        "Professional stain treatment",
        "Eco-friendly cleaning products",
        "Cold and warm wash options",
        "Sensitive skin-friendly detergents",
        "Fabric-specific cleaning techniques"
      ]
    },
    {
      icon: <DeliveryDiningIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: "We Deliver",
      description: "Receive your freshly cleaned clothes back at your door, exactly when you need them.",
      step: 3,
      imagePath: "https://images.unsplash.com/photo-1695654390723-479197a8c4a3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D", // Delivery person or package
      detailedDescription: "After cleaning, your items are carefully folded or hung, packaged, and delivered right to your doorstep. Our professional delivery team ensures your laundry arrives at the scheduled time, fresh and ready to wear. We understand the importance of reliability - you'll receive notifications before delivery and can track your order in real-time through our app. If you're not home, we'll follow your delivery preferences to ensure your clean clothes are safely stored until you return.",
      features: [
        "Contactless delivery options",
        "Real-time delivery tracking",
        "Professional packaging",
        "Garments hung or folded per preference",
        "Secure drop-off protocols"
      ]
    },
    {
      icon: <DoneAllIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: "Satisfaction Guaranteed",
      description: "If you're not completely satisfied, we'll make it right. Your happiness is our priority.",
      step: 4,
      imagePath: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1200&q=80", // Happy customer / satisfaction
      detailedDescription: "Your satisfaction is our top priority. If you're not completely happy with our service, we'll make it right - whether that means re-cleaning an item at no additional cost or providing a full refund. Our customer service team is available 24/7 to address any concerns and ensure you have the best experience possible. We stand behind every garment we process and value the trust you place in us with your favorite items.",
      features: [
        "100% satisfaction guarantee",
        "Free re-cleaning for any issues",
        "24/7 customer support",
        "Comprehensive insurance coverage",
        "Easy feedback system"
      ]
    }
  ];
  

  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageFrameVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        id="process" 
        ref={sectionRef}
        sx={{
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            py: { xs: 8, md: 12 },
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Background accent */}
          <Box sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}22, ${theme.palette.primary.main}22)`,
            zIndex: 0
          }} />
          
          <Container maxWidth="lg">
            <motion.div
              initial="hidden"
              animate={headerControls}
              variants={fadeInVariants}
            >
              <Typography 
                variant="h2" 
                component="h2" 
                align="center"
                sx={{ 
                  mb: 2, 
                  fontWeight: 700,
                  color: theme.palette.primary.dark
                }}
              >
                How It Works
              </Typography>
              
              <Typography 
                variant="h5" 
                component="p" 
                align="center"
                sx={{ 
                  mb: 8,
                  mx: 'auto',
                  maxWidth: 600,
                  color: '#4a5568'
                }}
              >
                Just 4 simple steps to get your laundry done with professional care
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    transition: { repeat: Infinity, duration: 1.5 }
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    endIcon={<ArrowDownwardIcon />}
                    href="#phase-1"
                    sx={{
                      borderRadius: 30,
                      px: 3,
                      py: 1.5,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        backgroundColor: 'rgba(40, 221, 205, 0.08)'
                      }
                    }}
                  >
                    Explore Our Process
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Phase 1 - Left text, Right image */}
        <Box
          id="phase-1"
          ref={phaseOneRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: { xs: 8, md: 12 },
            position: 'relative',
            background: theme.palette.primary.light
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial="hidden"
                  animate={phaseOneControls}
                  variants={fadeInLeftVariants}
                >
                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: 'white'
                        }}
                      >
                        1
                      </Typography>
                    </Box>

                    <Typography 
                      variant="h3" 
                      component="h2"
                      sx={{ 
                        fontWeight: 700,
                        mb: 3,
                        color: theme.palette.primary.dark
                      }}
                    >
                      {processes[0].title}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body1"
                    sx={{ 
                      mb: 4,
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: '#4a5568'
                    }}
                  >
                    {processes[0].detailedDescription}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      component="h4"
                      sx={{ 
                        fontWeight: 600,
                        mb: 3,
                        color: theme.palette.primary.dark
                      }}
                    >
                      Key Features:
                    </Typography>

                    <Box component="ul" sx={{ pl: 2 }}>
                      {processes[0].features.map((feature, index) => (
                        <Box 
                          component={motion.li}
                          custom={index}
                          initial="hidden"
                          animate={phaseOneControls}
                          variants={featureItemVariants}
                          key={index}
                          sx={{ mb: 1 }}
                        >
                          <Typography variant="body1" sx={{ color: '#4a5568' }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <motion.div
                  initial="hidden"
                  animate={phaseOneControls}
                  variants={imageFrameVariants}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 2,
                      background: 'white',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transform: 'rotate(2deg)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        boxShadow: `inset 0 0 0 10px white`,
                        zIndex: 1,
                        borderRadius: '12px',
                        pointerEvents: 'none'
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={processes[0].imagePath}
                      alt={processes[0].title}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: 1,
                        transition: 'transform 0.6s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.03)'
                        }
                      }}
                    />
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Phase 2 - Right text, Left image */}
        <Box
          id="phase-2"
          ref={phaseTwoRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: { xs: 8, md: 12 },
            position: 'relative',
            background: '#ffffff'
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial="hidden"
                  animate={phaseTwoControls}
                  variants={imageFrameVariants}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 2,
                      background: 'white',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transform: 'rotate(2deg)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        boxShadow: `inset 0 0 0 10px white`,
                        zIndex: 1,
                        borderRadius: '12px',
                        pointerEvents: 'none'
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={processes[2].imagePath}
                      alt={processes[2].title}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: 1,
                        transition: 'transform 0.6s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.03)'
                        }
                      }}
                    />
                  </Paper>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <motion.div
                  initial="hidden"
                  animate={phaseTwoControls}
                  variants={fadeInRightVariants}
                >
                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: 'white'
                        }}
                      >
                        2
                      </Typography>
                    </Box>

                    <Typography 
                      variant="h3" 
                      component="h2"
                      sx={{ 
                        fontWeight: 700,
                        mb: 3,
                        color: theme.palette.primary.dark
                      }}
                    >
                      {processes[1].title}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body1"
                    sx={{ 
                      mb: 4,
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: '#4a5568'
                    }}
                  >
                    {processes[1].detailedDescription}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      component="h4"
                      sx={{ 
                        fontWeight: 600,
                        mb: 3,
                        color: theme.palette.primary.dark
                      }}
                    >
                      Key Features:
                    </Typography>

                    <Box component="ul" sx={{ pl: 2 }}>
                      {processes[1].features.map((feature, index) => (
                        <Box 
                          component={motion.li}
                          custom={index}
                          initial="hidden"
                          animate={phaseTwoControls}
                          variants={featureItemVariants}
                          key={index}
                          sx={{ mb: 1 }}
                        >
                          <Typography variant="body1" sx={{ color: '#4a5568' }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Phase 3 - Left text, Right image */}
        <Box
          id="phase-3"
          ref={phaseThreeRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: { xs: 8, md: 12 },
            position: 'relative',
            background: theme.palette.primary.light
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial="hidden"
                  animate={phaseThreeControls}
                  variants={fadeInLeftVariants}
                >
                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: 'white'
                        }}
                      >
                        3
                      </Typography>
                    </Box>

                    <Typography 
                      variant="h3" 
                      component="h2"
                      sx={{ 
                        fontWeight: 700,
                        mb: 3,
                        color: theme.palette.primary.dark
                      }}
                    >
                      {processes[2].title}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body1"
                    sx={{ 
                      mb: 4,
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: '#4a5568'
                    }}
                  >
                    {processes[2].detailedDescription}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      component="h4"
                      sx={{ 
                        fontWeight: 600,
                        mb: 3,
                        color: theme.palette.primary.dark
                      }}
                    >
                      Key Features:
                    </Typography>

                    <Box component="ul" sx={{ pl: 2 }}>
                      {processes[2].features.map((feature, index) => (
                        <Box 
                          component={motion.li}
                          custom={index}
                          initial="hidden"
                          animate={phaseThreeControls}
                          variants={featureItemVariants}
                          key={index}
                          sx={{ mb: 1 }}
                        >
                          <Typography variant="body1" sx={{ color: '#4a5568' }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <motion.div
                  initial="hidden"
                  animate={phaseThreeControls}
                  variants={imageFrameVariants}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 2,
                      background: 'white',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transform: 'rotate(2deg)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        boxShadow: `inset 0 0 0 10px white`,
                        zIndex: 1,
                        borderRadius: '12px',
                        pointerEvents: 'none'
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={processes[0].imagePath}
                      alt={processes[0].title}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: 1,
                        transition: 'transform 0.6s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.03)'
                        }
                      }}
                    />
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Phase 4 - Right text, Left image */}
        <Box
          id="phase-4"
          ref={phaseFourRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: { xs: 8, md: 12 },
            position: 'relative',
            background: '#ffffff'
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial="hidden"
                  animate={phaseFourControls}
                  variants={imageFrameVariants}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 2,
                      background: 'white',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transform: 'rotate(2deg)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        boxShadow: `inset 0 0 0 10px white`,
                        zIndex: 1,
                        borderRadius: '12px',
                        pointerEvents: 'none'
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={processes[3].imagePath}
                      alt={processes[3].title}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: 1,
                        transition: 'transform 0.6s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.03)'
                        }
                      }}
                    />
                  </Paper>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <motion.div
                  initial="hidden"
                  animate={phaseFourControls}
                  variants={fadeInRightVariants}
                >
                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: 'white'
                        }}
                      >
                        4
                      </Typography>
                    </Box>

                    <Typography 
                      variant="h3" 
                      component="h2"
                      sx={{ 
                        fontWeight: 700,
                        mb: 3,
                        color: theme.palette.primary.dark
                      }}
                    >
                      {processes[3].title}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body1"
                    sx={{ 
                      mb: 4,
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: '#4a5568'
                    }}
                  >
                    {processes[3].detailedDescription}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      component="h4"
                      sx={{ 
                        fontWeight: 600,
                        mb: 3,
                        color: theme.palette.primary.dark
                      }}
                    >
                      Key Features:
                    </Typography>

                    <Box component="ul" sx={{ pl: 2 }}>
                      {processes[3].features.map((feature, index) => (
                        <Box 
                          component={motion.li}
                          custom={index}
                          initial="hidden"
                          animate={phaseFourControls}
                          variants={featureItemVariants}
                          key={index}
                          sx={{ mb: 1 }}
                        >
                          <Typography variant="body1" sx={{ color: '#4a5568' }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProcessSection;
