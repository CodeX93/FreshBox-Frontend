import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  Fade,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Mock schedule data
const SCHEDULE_DATA = [
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true,
    expressAvailable: true
  },
  {
    area: "Midtown (10016-10020)",
    pickupDays: ["Monday", "Tuesday", "Thursday", "Saturday"],
    deliveryDays: ["Tuesday", "Wednesday", "Friday", "Sunday"],
    pickupTimes: "8:00 AM - 8:00 PM",
    sameDayAvailable: true,
    expressAvailable: true
  },
  {
    area: "Upper East Side (10021-10028)",
    pickupDays: ["Tuesday", "Thursday", "Saturday"],
    deliveryDays: ["Wednesday", "Friday", "Sunday"],
    pickupTimes: "9:00 AM - 7:00 PM",
    sameDayAvailable: false,
    expressAvailable: false
  },
  {
    area: "West Side (10023-10024)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "8:00 AM - 9:00 PM",
    sameDayAvailable: true,
    expressAvailable: false
  },
];

const ScheduleSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
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
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 2 
              }}
            >
              Pickup & Delivery Schedule
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h6" 
              align="center" 
              color="text.secondary"
              sx={{ mb: 5, maxWidth: '700px', mx: 'auto' }}
            >
              Our convenient scheduling covers different neighborhoods on different days
            </Typography>
          </motion.div>

          {isMobile ? (
            // Mobile accordion view
            <motion.div variants={itemVariants}>
              <Box>
                {SCHEDULE_DATA.map((area, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    sx={{ 
                      mb: 2,
                      borderRadius: expanded === `panel${index}` ? '12px 12px 0 0' : '12px',
                      '&:before': { display: 'none' },
                      boxShadow: theme.shadows[2]
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}bh-content`}
                      id={`panel${index}bh-header`}
                      sx={{ 
                        borderRadius: expanded === `panel${index}` ? '12px 12px 0 0' : '12px',
                        backgroundColor: theme.palette.background.paper,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {area.area}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 2, pb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1" fontWeight={500}>
                          Pickup Days: {area.pickupDays.join(', ')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1" fontWeight={500}>
                          Delivery Days: {area.deliveryDays.join(', ')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1" fontWeight={500}>
                          Pickup Times: {area.pickupTimes}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {area.sameDayAvailable && (
                          <Chip 
                            label="Same-Day Available" 
                            color="success" 
                            variant="outlined"
                            size="small"
                          />
                        )}
                        {area.expressAvailable && (
                          <Chip 
                            label="Express Service" 
                            color="info" 
                            variant="outlined"
                            size="small"
                          />
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </motion.div>
          ) : (
            // Desktop table view
            <motion.div variants={itemVariants}>
              <TableContainer 
                component={Paper} 
                elevation={3}
                sx={{ 
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 4
                }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="schedule table">
                  <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: 'white' }}>Neighborhood</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'white' }}>Pickup Days</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'white' }}>Delivery Days</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'white' }}>Pickup Times</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'white' }}>Service Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {SCHEDULE_DATA.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ 
                          '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
                          '&:last-child td, &:last-child th': { border: 0 },
                          transition: 'background-color 0.3s',
                          '&:hover': {
                            backgroundColor: theme.palette.action.selected
                          }
                        }}
                      >
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          {row.area}
                        </TableCell>
                        <TableCell>{row.pickupDays.join(', ')}</TableCell>
                        <TableCell>{row.deliveryDays.join(', ')}</TableCell>
                        <TableCell>{row.pickupTimes}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {row.sameDayAvailable && (
                              <Chip 
                                label="Same-Day Available" 
                                color="success" 
                                size="small"
                              />
                            )}
                            {row.expressAvailable && (
                              <Chip 
                                label="Express Service" 
                                color="info" 
                                size="small"
                              />
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>
          )}

          <motion.div 
            variants={itemVariants}
            sx={{ mt: 4 }}
          >
            <Fade in timeout={1000}>
              <Typography variant="body2" color="text.secondary" align="center">
                Schedule is subject to change on holidays. All pickups must be scheduled at least 2 hours in advance.
              </Typography>
            </Fade>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ScheduleSection;