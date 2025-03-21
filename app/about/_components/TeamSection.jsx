'use client'
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Avatar, 
  Card, 
  CardContent 
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      avatar: '/api/placeholder/150/150',
      bio: 'Visionary leader with 15 years of tech industry experience.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      avatar: '/api/placeholder/150/150',
      bio: 'Innovation expert specializing in emerging technologies.'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Chief Design Officer',
      avatar: '/api/placeholder/150/150',
      bio: 'Award-winning designer focusing on user-centric solutions.'
    },
    {
      name: 'David Thompson',
      role: 'Head of Strategy',
      avatar: '/api/placeholder/150/150',
      bio: 'Strategic thinker driving global business expansion.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box 
      ref={ref}
      sx={{ 
        py: 10, 
        backgroundColor: 'white' 
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ mb: 6 }}
        >
          Meet Our Leadership Team
        </Typography>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid 
                item 
                xs={12} 
                md={3} 
                key={index}
                component={motion.div}
                variants={cardVariants}
              >
                <Card 
                  component={motion.div}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center', 
                    p: 3 
                  }}
                >
                  <Avatar 
                    alt={member.name}
                    src={member.avatar}
                    sx={{ 
                      width: 150, 
                      height: 150, 
                      mb: 2 
                    }}
                  />
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {member.role}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                    >
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}