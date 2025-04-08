'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Fade,
  SwipeableDrawer,
  Divider
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// Individual testimonial card component with enhanced design
const TestimonialCard = ({ testimonial, position, isMobile }) => {
  // Get curve style based on position (left, center, right)
  const getCurveStyle = () => {
    const curveHeight = isMobile ? '60px' : '80px';
    
    if (position === "left") {
      return {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: curveHeight,
        background: 'linear-gradient(90deg, #2E7B5C 0%, #3d9272 100%)',
        borderTopRightRadius: '0',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '100%',
        borderBottomRightRadius: '0',
        zIndex: 0,
        opacity: 0.9
      };
    } else if (position === "right") {
      return {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: curveHeight,
        background: 'linear-gradient(90deg, #3d9272 0%, #2E7B5C 100%)',
        borderTopRightRadius: '0',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '100%',
        zIndex: 0,
        opacity: 0.9
      };
    } else { // center
      return {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: curveHeight,
        background: 'linear-gradient(90deg, #2E7B5C 0%, #1a4634 100%)',
        borderTopRightRadius: '0',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '100%',
        borderBottomRightRadius: '100%',
        zIndex: 0,
      };
    }
  };

  // Quote mark color based on position
  const quoteColor = position === "center" ? "#2E7B5C" : "#85D2B3";

  return (
    <Fade in={true} timeout={600}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { 
            xs: '280px', 
            sm: '300px', 
            md: '320px', 
            lg: '360px' 
          },
          height: { 
            xs: '280px', 
            sm: '300px', 
            md: '330px', 
            lg: '370px' 
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: position === "center" ? 'scale(1.05)' : 'scale(0.95)',
          transformOrigin: 'center center',
          zIndex: position === "center" ? 5 : 1,
          margin: { xs: '0.5rem', md: '0.75rem' },
          transition: 'all 0.4s ease-in-out',
        }}
      >
        {/* Avatar - positioned above/in the card */}
        <Avatar
          src={testimonial.image}
          alt={testimonial.name}
          sx={{
            width: { xs: 60, md: 70 },
            height: { xs: 60, md: 70 },
            border: '3px solid white',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            position: 'absolute',
            top: position === "center" ? '-30px' : '10px',
            left: position === "center" ? '50%' : position === "left" ? '25px' : 'auto',
            right: position === "right" ? '25px' : 'auto',
            transform: position === "center" ? 'translateX(-50%)' : 'none',
            zIndex: 10,
          }}
        />
          
        {/* Card with enhanced styling */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: position === "center" 
              ? '0 8px 24px rgba(46, 123, 92, 0.15)' 
              : '0 4px 16px rgba(0,0,0,0.06)',
            padding: { xs: 2, sm: 2.5, md: 2.5 },
            pt: position === "center" ? 5 : 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: position === "center" 
                ? '0 12px 28px rgba(46, 123, 92, 0.2)' 
                : '0 8px 20px rgba(0,0,0,0.08)',
            }
          }}
        >
          {/* Curved background element */}
          <Box sx={getCurveStyle()} />
          
          {/* Stars - only for center position */}
          {position === "center" && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mb: 1,
              mt: 1,
              zIndex: 2,
              position: 'relative'
            }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon 
                  key={star} 
                  sx={{ 
                    color: '#FFD700', 
                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                    mx: 0.2
                  }} 
                />
              ))}
            </Box>
          )}
          
          {/* Name and Company */}
          <Box sx={{ 
            width: '100%', 
            textAlign: 'center', 
            mb: 1.5,
            mt: position === "center" ? 1 : 5,
            position: 'relative',
            zIndex: 2,
          }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 600,
                color: '#333',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
              }}
            >
              {testimonial.name}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                mt: 0.5,
                fontWeight: 500,
              }}
            >
              {testimonial.company}
            </Typography>
          </Box>
          
          {/* Quote mark */}
          <Box sx={{ 
            position: 'relative', 
            width: '100%', 
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            mb: 1
          }}>
            <FormatQuoteIcon 
              sx={{ 
                color: quoteColor, 
                fontSize: { xs: '1.5rem', md: '1.8rem' },
                opacity: 0.8
              }} 
            />
          </Box>
          
          {/* Quote text */}
          <Typography
            variant="body2"
            sx={{
              color: '#444',
              fontSize: { xs: '0.8rem', md: '0.85rem' },
              lineHeight: 1.6,
              textAlign: 'center',
              fontStyle: 'italic',
              maxWidth: '90%',
              zIndex: 2,
              position: 'relative',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {testimonial.quote}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

// Main carousel component with enhanced design
const TestimonialsCarousel = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Middle testimonial as active
  const [isAnimating, setIsAnimating] = useState(false);
  const totalTestimonials = testimonials.length;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? totalTestimonials - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };
  
  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => 
      prevIndex === totalTestimonials - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);
  
  // Get visible testimonials (3 on desktop, 1 on mobile)
  const getVisibleTestimonials = () => {
    if (isSmallScreen) {
      return [
        { testimonial: testimonials[activeIndex], position: "center" }
      ];
    }
    
    if (isMobile) {
      // On tablet: active and next testimonial
      const next = activeIndex === totalTestimonials - 1 ? 0 : activeIndex + 1;
      
      return [
        { testimonial: testimonials[activeIndex], position: "center" },
        { testimonial: testimonials[next], position: "right" },
      ];
    }
    
    // On desktop: previous, active, and next testimonials
    const prev = activeIndex === 0 ? totalTestimonials - 1 : activeIndex - 1;
    const next = activeIndex === totalTestimonials - 1 ? 0 : activeIndex + 1;
    
    return [
      { testimonial: testimonials[prev], position: "left" },
      { testimonial: testimonials[activeIndex], position: "center" },
      { testimonial: testimonials[next], position: "right" },
    ];
  };
  
  const visibleTestimonials = getVisibleTestimonials();
  
  return (
    <Box 
      sx={{ 
        width: '100%', 
        position: 'relative',
        py: { xs: 2, md: 3 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 6, sm: 7, md: 8 } // Add horizontal padding for nav buttons
      }}
    >
      {/* Title */}
      <Typography 
        variant="h3" 
        component="h2" 
        align="center"
        sx={{
          fontWeight: 700,
          mb: { xs: 3, md: 4 },
          color: '#2E7B5C',
          fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2.2rem' },
          position: 'relative',
          display: 'inline-block',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '3px',
            backgroundColor: '#85D2B3',
            borderRadius: '3px'
          }
        }}
      >
        Was unsere Kunden sagen
      </Typography>
      
      {/* Navigation arrows - moved to extreme edges */}
      <IconButton
        onClick={handlePrev}
        aria-label="Previous testimonial"
        disabled={isAnimating}
        sx={{
          position: 'absolute',
          left: { xs: '5px', sm: '10px', md: '15px' },
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#2E7B5C',
          bgcolor: 'rgba(255,255,255,0.9)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: 'white',
            color: '#1a4634',
          },
          zIndex: 20,
          width: { xs: 36, md: 44 },
          height: { xs: 36, md: 44 },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
      </IconButton>
      
      <IconButton
        onClick={handleNext}
        aria-label="Next testimonial"
        disabled={isAnimating}
        sx={{
          position: 'absolute',
          right: { xs: '5px', sm: '10px', md: '15px' },
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#2E7B5C',
          bgcolor: 'rgba(255,255,255,0.9)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: 'white',
            color: '#1a4634',
          },
          zIndex: 20,
          width: { xs: 36, md: 44 },
          height: { xs: 36, md: 44 },
        }}
      >
        <ChevronRightIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
      </IconButton>
      
      {/* Testimonials row - reduced horizontal padding */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 1, sm: 2, md: 3, lg: 4 },
          position: 'relative',
          width: '100%',
          my: { xs: 1, md: 2 },
          flexGrow: 1,
        }}
      >
        {visibleTestimonials.map((item, index) => (
          <TestimonialCard
            key={index}
            testimonial={item.testimonial}
            position={item.position}
            isMobile={isMobile}
          />
        ))}
      </Box>
      
      {/* Pagination dots */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          mt: { xs: 1, md: 2 },
          mb: { xs: 1, md: 0 },
        }}
      >
        {testimonials.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setActiveIndex(index);
                setTimeout(() => setIsAnimating(false), 400);
              }
            }}
            sx={{
              width: { xs: 8, md: 10 },
              height: { xs: 8, md: 10 },
              borderRadius: '50%',
              backgroundColor: activeIndex === index ? '#2E7B5C' : '#e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: activeIndex === index ? '#2E7B5C' : '#B5ECD9',
                transform: 'scale(1.2)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default function TestimonialSection() {
  // Sample data matching Image 1 but with slightly shortened quotes
  const testimonialData = [
    {
      id: 1,
      name: 'Julia Hoffmann',
      company: 'Burger Brothers',
      quote: 'Cras iaculis finibus finibus. Nulla ac neque elementum eros sodales cursus. Cras nisi erat, pulvinar a eleifend vel, iaculis sit amet sapien.',
      image: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 2, 
      name: 'Hannah Schmitt',
      company: 'Rubin Snacks',
      quote: 'Nunc accumsan, massa ut mollis condimentum, purus nisi porttitor ex, ut placerat ligula nisi eu ante. Maecenas aliquam sagittis lobortis.',
      image: 'https://i.pravatar.cc/150?img=33'
    },
    {
      id: 3,
      name: 'Walter Meller',
      company: 'Starbux Berlin',
      quote: 'Quisque tristique lectus quam, et tristique turpis lacinia sit amet. Vivamus nec felis felis. Morbi cursus faucibus nulla.',
      image: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 4,
      name: 'Thomas Klein',
      company: 'Fitness Club',
      quote: 'Integer pharetra libero et enim tincidunt, non commodo orci vestibulum. Donec sodales urna nec purus ornare.',
      image: 'https://i.pravatar.cc/150?img=11'
    },
    {
      id: 5,
      name: 'Sarah Weber',
      company: 'Tech Solutions',
      quote: 'Praesent vel semper eros. Suspendisse potenti. Sed ultrices neque vel nulla feugiat, non consequat sem ultrices.',
      image: 'https://i.pravatar.cc/150?img=9'
    }
  ];
  
  return (
    <Container 
      maxWidth={false}
      disableGutters
      sx={{ 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <TestimonialsCarousel testimonials={testimonialData} />
    </Container>
  );
}