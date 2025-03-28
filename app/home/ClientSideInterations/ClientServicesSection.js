'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Paper,
  Stack,
  useMediaQuery,
  ThemeProvider
} from '@mui/material';
import Link from 'next/link';
import { 
  ChevronRight as ChevronRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { theme } from '../../../contexts/Theme';

const FeaturedService = ({ service, index, inView }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index}
      style={{ width: '100%' }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          boxShadow: theme.shadows[8],
          height: 'auto',
          minHeight: isMobile ? 'auto' : 340,
          transition: 'all 0.3s ease',
          ':hover': {
            transform: 'translateY(-10px)',
            boxShadow: theme.shadows[16],
          }
        }}
      >
        <CardMedia
          component="div"
          sx={{
            width: isMobile ? '100%' : '50%',
            height: isMobile ? 220 : 'auto',
            minHeight: isMobile ? 200 : 340,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(/images/services/${service.slug}.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.5s ease',
              ':hover': {
                transform: 'scale(1.05)',
              }
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: theme.spacing(2),
              left: theme.spacing(2),
              zIndex: 1,
            }}
          >
            <Chip
              label={service.name}
              sx={{
                fontWeight: 'bold',
                color: 'white',
                px: 1,
                backgroundColor: theme.palette.primary.main,
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
              size="medium"
            />
          </Box>
        </CardMedia>

        <CardContent
          sx={{
            width: isMobile ? '100%' : '50%',
            padding: theme.spacing(isSmallMobile ? 2 : 3, isSmallMobile ? 2 : 4),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Typography
              variant={isSmallMobile ? "h6" : "h5"}
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 2,
              }}
            >
              {service.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {service.description}
            </Typography>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <Stack spacing={1} sx={{ mt: 2, mb: 3 }}>
                {service.features.map((feature, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component={motion.div}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: theme.palette.primary.main,
                        mr: 1.5,
                      }}
                    />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                ))}
              </Stack>
            </motion.div>

            <Stack 
              direction={isSmallMobile ? "column" : "row"} 
              spacing={isSmallMobile ? 1 : 2} 
              sx={{ mt: 2 }}
            >
              <Button
                fullWidth={isSmallMobile}
                variant="outlined"
                onClick={() => setExpanded(!expanded)}
                startIcon={
                  <KeyboardArrowDownIcon
                    sx={{
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s',
                    }}
                  />
                }
                sx={{ 
                  fontWeight: 600,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    borderColor: theme.palette.primary.dark,
                    backgroundColor: `${theme.palette.primary.main}10`,
                  }
                }}
              >
                {expanded ? 'Less Info' : 'More Info'}
              </Button>

              <Button
                fullWidth={isSmallMobile}
                component={Link}
                href={`/services/${service.slug}`}
                variant="contained"
                endIcon={<ChevronRightIcon />}
                sx={{ 
                  fontWeight: 600,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }}
              >
                Details
              </Button>
            </Stack>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServiceScroller = ({ services, inView }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const totalServices = services.length;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % totalServices);
  };

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + totalServices) % totalServices);
  };

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => handleNext(), 6000);
      return () => clearInterval(interval);
    }
  }, [inView]);

  const variants = {
    enter: (direction) => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      }
    },
    exit: (direction) => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0,
      zIndex: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      }
    })
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
        my: isMobile ? 4 : 6,
      }}
    >
      {/* Navigation Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          zIndex: 10,
          px: isSmallMobile ? 1 : 2,
        }}
      >
        <Button
          onClick={handlePrev}
          size={isSmallMobile ? "small" : "medium"}
          sx={{
            minWidth: isSmallMobile ? 36 : 48,
            width: isSmallMobile ? 36 : 48,
            height: isSmallMobile ? 36 : 48,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: theme.shadows[4],
            color: theme.palette.primary.main,
            '&:hover': {
              bgcolor: 'white',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <ArrowBackIcon fontSize={isSmallMobile ? "small" : "medium"} />
        </Button>
        <Button
          onClick={handleNext}
          size={isSmallMobile ? "small" : "medium"}
          sx={{
            minWidth: isSmallMobile ? 36 : 48,
            width: isSmallMobile ? 36 : 48,
            height: isSmallMobile ? 36 : 48,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: theme.shadows[4],
            color: theme.palette.primary.main,
            '&:hover': {
              bgcolor: 'white',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <ArrowForwardIcon fontSize={isSmallMobile ? "small" : "medium"} />
        </Button>
      </Box>

      {/* Service carousel */}
      <motion.div
        key={activeIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
      >
        <FeaturedService service={services[activeIndex]} index={0} inView={inView} />
      </motion.div>

      {/* Fixed pagination dots - repositioned to avoid collision */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3,
          mb: 2,
          gap: { xs: 1.5, sm: 2 },
          position: 'relative',
          zIndex: 5,
        }}
      >
        {services.map((_, index) => (
          <Box
            key={index}
            component={motion.div}
            onClick={() => {
              setDirection(index > activeIndex ? 'right' : 'left');
              setActiveIndex(index);
            }}
            sx={{
              width: isSmallMobile ? 8 : 10,
              height: isSmallMobile ? 8 : 10,
              borderRadius: '50%',
              bgcolor: index === activeIndex ? theme.palette.primary.main : theme.palette.grey[300],
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: index === activeIndex ? `0 0 0 2px rgba(255,255,255,0.8), 0 0 0 4px ${theme.palette.primary.main}40` : 'none',
              '&:hover': {
                bgcolor: index === activeIndex ? theme.palette.primary.main : theme.palette.grey[400],
                transform: 'scale(1.1)',
              },
            }}
            animate={{
              scale: index === activeIndex ? 1.2 : 1,
            }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default function ClientServicesSection({ services }) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallMobile = useMediaQuery('(max-width:400px)');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }} ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <Box sx={{ textAlign: 'center', mb: isSmallMobile ? 4 : isMobile ? 5 : 6 }}>
            <Typography
              variant="overline"
              component="span"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                letterSpacing: 1.5,
                mb: 1,
                display: 'block',
                fontSize: isSmallMobile ? '0.65rem' : '0.75rem',
              }}
            >
              PROFESSIONAL CARE
            </Typography>
            <Typography
              variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
              component="h2"
              sx={{
                color: theme.palette.primary.black,
                fontWeight: 700,
                mb: 2,
                WebkitBackgroundClip: 'text',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              Our Services
              <Box
                component={motion.div}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                sx={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  height: 2,
                  bgcolor: theme.palette.primary.main,
                }}
              />
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                mb: 4,
                px: isSmallMobile ? 2 : 0,
                lineHeight: 1.6,
              }}
            >
              We offer a wide range of cleaning services to keep your garments looking their best.
              Each service is tailored to meet specific fabric care requirements.
            </Typography>
          </Box>
        </motion.div>

        {/* Featured Service Carousel */}
        <ServiceScroller services={services} inView={isInView} />

        {/* Service Cards */}
        <Box sx={{ mt: isSmallMobile ? 5 : 8 }}>
          <Grid container spacing={isExtraSmallMobile ? 2 : isSmallMobile ? 3 : 4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={service.slug}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: theme.shadows[3],
                      transition: 'all 0.3s ease',
                      ':hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[10],
                      },
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 180,
                        position: 'relative',
                      }}
                      image={`/images/services/${service.slug}.jpg`}
                      title={service.name}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          p: isSmallMobile ? 1.5 : 2,
                        }}
                      >
                        <Typography 
                          variant={isSmallMobile ? "subtitle1" : "h6"} 
                          sx={{ color: 'white', fontWeight: 600 }}
                        >
                          {service.name}
                        </Typography>
                      </Box>
                    </CardMedia>
                    <CardContent sx={{ 
                      flexGrow: 1, 
                      p: isExtraSmallMobile ? 1.5 : isSmallMobile ? 2 : 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {service.description}
                      </Typography>

                      <Box sx={{ mt: 'auto' }}>
                        <Button
                          component={Link}
                          href={`/services/${service.slug}`}
                          endIcon={<ChevronRightIcon />}
                          sx={{ 
                            fontWeight: 600, 
                            p: 0,
                            color: theme.palette.primary.main,
                            '&:hover': {
                              color: theme.palette.primary.dark,
                              backgroundColor: 'transparent',
                              transform: 'translateX(4px)'
                            },
                            transition: 'transform 0.2s ease'
                          }}
                        >
                          Learn More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: isSmallMobile ? 5 : isMobile ? 7 : 9 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Paper
              elevation={10}
              sx={{
                p: isExtraSmallMobile ? 2.5 : isSmallMobile ? 3.5 : isMobile ? 4.5 : 6,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                boxShadow: '0 10px 30px rgba(40, 221, 205, 0.3)',
                mx: isSmallMobile ? 1 : 0,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Decorative dot pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  opacity: 0.1,
                  backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                  backgroundSize: '15px 15px',
                  zIndex: 0,
                  display: { xs: 'none', sm: 'block' }
                }}
              />
              
              <Typography 
                variant={isExtraSmallMobile ? "subtitle1" : isSmallMobile ? "h6" : "h5"} 
                sx={{ 
                  color: 'white', 
                  fontWeight: 600, 
                  mb: isSmallMobile ? 2.5 : 3,
                  px: isSmallMobile ? 1 : 2,
                  position: 'relative',
                  zIndex: 1,
                  maxWidth: 700,
                  mx: 'auto'
                }}
              >
                Ready to experience our premium cleaning services?
              </Typography>
              <Button
                component={Link}
                href="/services"
                variant="contained"
                size={isSmallMobile ? "medium" : "large"}
                endIcon={<ChevronRightIcon />}
                sx={{
                  px: isSmallMobile ? 3 : 4,
                  py: isSmallMobile ? 1 : 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: theme.shadows[8],
                  background: theme.palette.secondary.main,
                  color: 'white',
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    background: theme.palette.secondary.dark,
                    boxShadow: theme.shadows[12],
                    transform: 'translateY(-3px)'
                  },
                  transition: 'transform 0.2s ease'
                }}
              >
                View All Services
              </Button>
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}