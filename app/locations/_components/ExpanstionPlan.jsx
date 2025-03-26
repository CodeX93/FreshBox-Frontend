import React from 'react';
// From MUI core
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Chip,
  Avatar,
  Fade,
  ThemeProvider
} from '@mui/material';

// From MUI Lab (experimental components)
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';

import { motion } from 'framer-motion';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LandscapeIcon from '@mui/icons-material/Landscape';
import PublicIcon from '@mui/icons-material/Public';
import PinDropIcon from '@mui/icons-material/PinDrop';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Import your theme context
import { theme } from '../../../contexts/Theme';

// Mock expansion timeline data
const EXPANSION_DATA = [
  {
    quarter: "Q2 2023",
    areas: [
      { name: "SoHo", zips: ["10012", "10013"], date: "May 2023" },
      { name: "West Village", zips: ["10014"], date: "June 2023" }
    ],
    status: "upcoming",
    icon: <DirectionsCarIcon />
  },
  {
    quarter: "Q3 2023",
    areas: [
      { name: "Financial District", zips: ["10004", "10005", "10006"], date: "July 2023" },
      { name: "Tribeca", zips: ["10007"], date: "August 2023" }
    ],
    status: "planned",
    icon: <LandscapeIcon />
  },
  {
    quarter: "Q4 2023",
    areas: [
      { name: "Upper East Side", zips: ["10021", "10028"], date: "October 2023" }
    ],
    status: "planned",
    icon: <PublicIcon />
  },
  {
    quarter: "Q1 2024",
    areas: [
      { name: "Harlem", zips: ["10026", "10027", "10030"], date: "TBD" },
      { name: "East Harlem", zips: ["10029"], date: "TBD" }
    ],
    status: "future",
    icon: <PinDropIcon />
  }
];

const ExpansionPlan = () => {
  // Removed useTheme hook as we're directly using imported theme

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Status to color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return theme.palette.primary.main; // Changed from info.main to primary.main (turquoise)
      case 'planned': return theme.palette.secondary.main; // Using your secondary (yellow) for planned
      case 'future': return theme.palette.grey[500];
      default: return theme.palette.primary.main; // Your turquoise blue
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          py: 8,
          backgroundColor: theme.palette.grey[50]
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h2" // Using h2 from your theme
                component="h2" 
                align="center" 
                gutterBottom
                sx={{ mb: 2 }}
                // Using theme typography instead of hardcoded fontWeight
              >
                We're Expanding!
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography 
                variant="h6" 
                align="center" 
                color="text.secondary"
                sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
              >
                Check out our expansion roadmap to see when we'll be coming to your neighborhood
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              <Grid 
                item 
                xs={12} 
                md={5}
                component={motion.div}
                variants={itemVariants}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                      Expansion Roadmap
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Our service is growing rapidly! Here's our planned expansion schedule for the coming quarters. Dates are subject to change based on demand and operational capacity.
                    </Typography>
                  </Box>

                  <Timeline position="right">
                    {EXPANSION_DATA.map((phase, index) => (
                      <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{ display: { xs: 'none', sm: 'block' } }}>
                          <Typography variant="subtitle2" component="span">
                            {phase.quarter}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot sx={{ backgroundColor: getStatusColor(phase.status) }}>
                            {phase.icon}
                          </TimelineDot>
                          {index < EXPANSION_DATA.length - 1 && (
                            <TimelineConnector sx={{ backgroundColor: getStatusColor(phase.status) }} />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Box sx={{ 
                            position: 'relative',
                            mb: 2,
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: -10,
                              top: 8,
                              width: 0,
                              height: 0,
                              borderTop: '8px solid transparent',
                              borderRight: `8px solid ${theme.palette.background.paper}`,
                              borderBottom: '8px solid transparent'
                            }
                          }}>
                            <Paper
                              elevation={1}
                              sx={{
                                p: 2,
                                borderRadius: 1,
                                border: `1px solid ${theme.palette.divider}`,
                              }}
                            >
                              <Typography variant="subtitle1" component="div" fontWeight={600}>
                                {phase.quarter}
                              </Typography>
                              {phase.areas.map((area, areaIndex) => (
                                <Box key={areaIndex} sx={{ mt: 1.5 }}>
                                  <Typography variant="body2" component="div">
                                    <Box component="span" sx={{ fontWeight: 600 }}>
                                      {area.name}
                                    </Box>
                                    <Box component="span" sx={{ color: 'text.secondary', ml: 1 }}>
                                      {area.zips.join(', ')}
                                    </Box>
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <QueryBuilderIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                                    <Typography variant="caption" color="text.secondary">
                                      Target: {area.date}
                                    </Typography>
                                  </Box>
                                </Box>
                              ))}
                            </Paper>
                          </Box>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Paper>
              </Grid>

              <Grid 
                item 
                xs={12} 
                md={7}
                component={motion.div}
                variants={itemVariants}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    // Using your theme's primary color for the gradient
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}10)`,
                  }}
                >
                  <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                    Priority Expansion Areas
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ mb: 3 }}>
                    We prioritize expansion based on customer demand and operational feasibility. 
                    These neighborhoods are our next focus areas for the upcoming service launch.
                  </Typography>

                  <Grid container spacing={2}>
                    {EXPANSION_DATA.slice(0, 2).flatMap((phase) => 
                      phase.areas.map((area, areaIndex) => (
                        <Grid item xs={12} sm={6} key={`${phase.quarter}-${areaIndex}`}>
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Paper
                              elevation={2}
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                border: `1px solid ${theme.palette.divider}`,
                                transition: 'transform 0.3s ease'
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: getStatusColor(phase.status),
                                    height: 36,
                                    width: 36,
                                    mr: 1.5
                                  }}
                                >
                                  {phase.icon}
                                </Avatar>
                                <Box>
                                  <Typography variant="h6" component="h4" fontWeight={600}>
                                    {area.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {phase.quarter} · {area.date}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" paragraph sx={{ mb: 1 }}>
                                  ZIP codes covered:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {area.zips.map((zip) => (
                                    <Chip 
                                      key={zip} 
                                      label={zip} 
                                      size="small" 
                                      variant="outlined"
                                      sx={{ borderColor: getStatusColor(phase.status) }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                              
                              <Chip 
                                icon={<NavigateNextIcon />} 
                                label={
                                  phase.status === 'upcoming' ? "Coming Soon" : 
                                  phase.status === 'planned' ? "Planned" : "Future Expansion"
                                } 
                                size="small"
                                sx={{ 
                                  alignSelf: 'flex-start', 
                                  mt: 'auto',
                                  backgroundColor: phase.status === 'upcoming' ? theme.palette.primary.main : 
                                                  phase.status === 'planned' ? theme.palette.secondary.main : 
                                                  theme.palette.grey[500],
                                  color: '#fff'
                                }}
                              />
                            </Paper>
                          </motion.div>
                        </Grid>
                      ))
                    )}
                  </Grid>

                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Fade in timeout={1500}>
                      <Typography variant="body2" color="text.secondary">
                        Not seeing your area? Join our waitlist to help us prioritize your neighborhood!
                      </Typography>
                    </Fade>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ExpansionPlan;