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


import HowItWorkImage1 from "../../../Assets/HowItWork1.png"
import HowItWorkImage2 from "../../../Assets/HowItWork2.png"
import HowItWorkImage3 from "../../../Assets/HowItWork3.png"
import HowItWorkImage4 from "../../../Assets/HowItWork4.png"
import HowItWorkImage5 from "../../../Assets/HowItWork5.png"
import HowItWorkImage6 from "../../../Assets/HowItWork6.png"

// Icons
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Image from 'next/image';

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
      title: "Sign Up",
      description: "Schedule your pickup and delivery times that work for your busy schedule. Same-day service available.",
      step: 1,
      imagePath: HowItWorkImage1,
      detailedDescription: "Create your account online or through our iOS/Android app in just a few steps. No fees, no commitments—your card is only charged once we pick up your laundry.",
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
      title: "Order Your Way",
      description: "Our expert team handles your clothes with care using eco-friendly products and professional techniques.",
      step: 2,
      imagePath: HowItWorkImage2,
      detailedDescription: "Pick your service, choose a Cleaning or pickup day, and personalize your order with options like folding, ironing, and more—tailored exactly to your needs.<br/>You can update your preferences anytime for maximum flexibility—it's all about what works best for you.",
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
      title: "Pickup Made Simple",
      description: "Receive your freshly cleaned clothes back at your door, exactly when you need them.",
      step: 3,
      imagePath: HowItWorkImage3,
      detailedDescription: "<b>After Order</b>, You'll receive your personalized FreshBox Pro bags to sort laundry and dry cleaning with ease. <br/>On Cleaning or pickup day, simply place your items in the bags and leave them in a secure location or your designated FreshBox locker—ready for our driver to collect and<br/>We'll take care of the rest! We'll remind you the day before to have your laundry ready for pickup or to expect Cleaners.<br/>And for good measure, we'll let you know when our Cleaners or driver is on the way.",
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
      title: "Real-Time Tracking & Notifications",
      description: "Track your order in real time and stay updated at every step of the process.",
      step: 4,
      imagePath: HowItWorkImage4,
      detailedDescription: "Track your order in real time using your tracking ID and get notified at every stage. From placing your service request to pickup, cleaning, and delivery—we'll keep you updated every step of the way.<br/>Prefer not to leave your laundry unattended or grant home/office access? No problem. Our app notifies you when your driver or cleaner is en route and when you're next in line for pickup or delivery.",
      features: [
        "Real-time order tracking",
        "Push notifications",
        "SMS updates",
        "Email notifications",
        "Live status updates"
      ]
    },
    {
      icon: <DeliveryDiningIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: "Delivery Day",
      description: "Your freshly cleaned clothes delivered right to your door at your preferred time.",
      step: 5,
      imagePath: HowItWorkImage5,
      detailedDescription: "When your clothes are professionally cleaned, crisp, and ready, one of our drivers will deliver them to your preferred drop-off spot—be it your home, office, or secure FreshBox Pro locker. Fresh, right where you need it.",
      features: [
        "Flexible delivery options",
        "Contactless delivery available",
        "Secure locker delivery",
        "Real-time delivery tracking",
        "Professional packaging"
      ]
    },
    {
      icon: <DoneAllIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: "Post Cleaning",
      description: "Quality check and customer satisfaction follow-up after service completion.",
      step: 6,
      imagePath: HowItWorkImage6,
      detailedDescription: "After your clothes are delivered, we ensure everything meets our high standards. Our quality control team performs final checks, and we follow up to ensure your complete satisfaction. If you have any concerns, our customer support team is ready to assist you.",
      features: [
        "Quality assurance check",
        "Customer satisfaction survey",
        "Feedback collection",
        "Issue resolution support",
        "Service improvement tracking"
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
          background: theme.palette.primary.darkBlue,
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
            position: 'relative',
            background: theme.palette.primary.darkBlue,
          }}
        >
          {/* Background accent */}
          {/* <Box sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: theme.palette.primary.darkBlue,
            zIndex: 0
          }} /> */}
          
          <Container maxWidth="lg" sx={{background: theme.palette.primary.darkBlue,}}>
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
                  color: theme.palette.primary.whitishMint,
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
                  color: theme.palette.primary.whitishMint,
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
                  disableElevation
                    variant="outlined"
                    color="primary"
                    size="large"
                    endIcon={<ArrowDownwardIcon />}
                    href="#phase-1"
                    sx={{
                      
                      px: 3,
                      py: 1.5,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.darkBlue,
                      bgcolor:theme.palette.primary.main,
                      '&:hover': {
                        
                        borderColor: theme.palette.primary.yellowish,
                        backgroundColor: theme.palette.primary.main
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
            backgroundColor: theme.palette.primary.whitishMint,
            
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
                        backgroundColor: '#94FFD4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: '#003C43'
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
  dangerouslySetInnerHTML={{ __html: processes[0].title }}
/>
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
     <Box
  sx={{
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 2,
    transition: 'transform 0.6s ease-in-out',
    width:'100%',
    aspectRatio: '1/1',  // 16:9 aspect ratio (9/16 = 0.5625)
  }}
>
  <Image
    src={processes[0].imagePath}
    alt={processes[0].title.replace(/<[^>]+>/g, '')}
    fill
    style={{
      objectFit: 'cover',
    }}
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</Box>


                  
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
            backgroundColor: theme.palette.primary.whitishMint,
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
                 
                 <Box
  sx={{
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 2,
    transition: 'transform 0.6s ease-in-out',
    width:'100%',
    aspectRatio: '1/1',  // 16:9 aspect ratio (9/16 = 0.5625)
  }}
>
  <Image
    src={processes[1].imagePath}
    alt={processes[1].title.replace(/<[^>]+>/g, '')}
    fill
    style={{
      objectFit: 'cover',
    }}
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</Box>
                  
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
                        backgroundColor: '#94FFD4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: '#003C43'
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
                      dangerouslySetInnerHTML={{ __html: processes[1].detailedDescription }}
                    
                  
                    
                  />

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
            backgroundColor: theme.palette.primary.whitishMint,
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
                        backgroundColor: theme.palette.primary.light,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: '#003C43'
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
                      dangerouslySetInnerHTML={{ __html: processes[2].detailedDescription }}
                      />

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
                 
                 <Box
  sx={{
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 2,
    transition: 'transform 0.6s ease-in-out',
    width:'100%',
    aspectRatio: '1/1',  // 16:9 aspect ratio (9/16 = 0.5625)
  }}
>
  <Image
    src={processes[2].imagePath}
    alt={processes[2].title.replace(/<[^>]+>/g, '')}
    fill
    style={{
      objectFit: 'cover',
    }}
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</Box>
                  
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
            backgroundColor: theme.palette.primary.whitishMint,
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
                
                      <Box
  sx={{
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 2,
    transition: 'transform 0.6s ease-in-out',
    width:'100%',
    aspectRatio: '1/1', // 16:9 aspect ratio (9/16 = 0.5625)
  }}
>
  <Image
    src={processes[3].imagePath}
    alt={processes[3].title.replace(/<[^>]+>/g, '')}
    fill
    style={{
      objectFit: 'cover',
    }}
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</Box>
      
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
                        backgroundColor: theme.palette.primary.light,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: '#003C43'
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
                      dangerouslySetInnerHTML={{ __html: processes[3].detailedDescription }}
                      />

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
        {/* Phase 5 */}


        <Box
          id="phase-5"
          ref={phaseThreeRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: { xs: 8, md: 12 },
            position: 'relative',
            backgroundColor: theme.palette.primary.whitishMint,
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
                        backgroundColor: theme.palette.primary.light,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: '#003C43'
                        }}
                      >
                        5
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
                      {processes[4].title}
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
                      dangerouslySetInnerHTML={{ __html: processes[4].detailedDescription }}
                      />

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
                      {processes[4].features.map((feature, index) => (
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
                 
                 <Box
  sx={{
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 2,
    transition: 'transform 0.6s ease-in-out',
    width:'100%',
    aspectRatio: '1/1',  // 16:9 aspect ratio (9/16 = 0.5625)
  }}
>
  <Image
    src={processes[4].imagePath}
    alt={processes[4].title.replace(/<[^>]+>/g, '')}
    fill
    style={{
      objectFit: 'cover',
    }}
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</Box>
                  
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>


        {/* Phase 6 */}


        <Box
          id="phase-6"
          ref={phaseFourRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: { xs: 8, md: 12 },
            position: 'relative',
            backgroundColor: theme.palette.primary.whitishMint,
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
                
                      <Box
  sx={{
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 2,
    transition: 'transform 0.6s ease-in-out',
    width:'100%',
    aspectRatio: '1/1', // 16:9 aspect ratio (9/16 = 0.5625)
  }}
>
  <Image
    src={processes[5].imagePath}
    alt={processes[5].title.replace(/<[^>]+>/g, '')}
    fill
    style={{
      objectFit: 'cover',
    }}
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</Box>
      
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
                        backgroundColor: theme.palette.primary.light,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        mb: 2
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: '#003C43'
                        }}
                      >
                        6
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
                      {processes[5].title}
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
                      dangerouslySetInnerHTML={{ __html: processes[5].detailedDescription }}
                      />

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
                      {processes[5].features.map((feature, index) => (
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
