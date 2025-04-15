import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { theme } from '../../../contexts/Theme';

// Mock schedule data
const SCHEDULE_DATA = [
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  },
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  },
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  },
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  },
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  },
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  },
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  },
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  },
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  },
  {
    area: "Downtown (10001-10004)",
    pickupDays: ["Monday", "Wednesday", "Friday"],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    pickupTimes: "7:00 AM - 9:00 PM",
    sameDayAvailable: true
  }
];

// Mobile card component
const MobileScheduleCard = ({ data, index }) => (
  <Card
    elevation={0}
    sx={{
      mb: 2,
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      backgroundColor: index % 2 === 0 ? '#f8f8f8' : 'white',
    }}
  >
    <CardContent sx={{ p: 2 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 500, 
          color: '#1a3131', 
          mb: 2,
          fontSize: '1rem'
        }}
      >
        {data.area}
      </Typography>
      
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography 
            component="div" 
            sx={{ 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: theme.palette.primary.darkBlue,
              textTransform: 'uppercase',
              mb: 0.5
            }}
          >
            Pickup Days
          </Typography>
          <Typography 
            component="div" 
            sx={{ fontSize: '0.9rem', color: '#4a4a4a', mb: 1.5 }}
          >
            {data.pickupDays.join(', ')}
          </Typography>
        </Grid>
        
        <Grid item xs={6}>
          <Typography 
            component="div" 
            sx={{ 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: theme.palette.primary.darkBlue,
              textTransform: 'uppercase',
              mb: 0.5
            }}
          >
            Delivery Days
          </Typography>
          <Typography 
            component="div" 
            sx={{ fontSize: '0.9rem', color: '#4a4a4a', mb: 1.5 }}
          >
            {data.deliveryDays.join(', ')}
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <Typography 
            component="div" 
            sx={{ 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: theme.palette.primary.darkBlue,
              textTransform: 'uppercase',
              mb: 0.5
            }}
          >
            Pickup Times
          </Typography>
          <Typography 
            component="div" 
            sx={{ fontSize: '0.9rem', color: '#4a4a4a', mb: 1.5 }}
          >
            {data.pickupTimes}
          </Typography>
        </Grid>
      </Grid>
      
      {data.sameDayAvailable && (
        <Box sx={{ mt: 1 }}>
          <Typography 
            component="div" 
            sx={{ 
              color: theme.palette.primary.darkBlue,
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            Same-Day Available
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const ScheduleSection = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: theme.palette.primary.whitishMint,
        width: '100%'
      }}
    >
      <Container maxWidth="xl">
        {!isMobile ? (
          // Desktop view - Table
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: '10px',
              overflow: 'hidden',
              mb: 3,
              border: '1px solid #e0e0e0'
            }}
          >
            <Table sx={{ minWidth: 750 }} aria-label="schedule table">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.darkBlue }}>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'white', 
                      py: 2,
                      borderBottom: 'none',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    Neighborhood
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'white', 
                      py: 2,
                      borderBottom: 'none',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    Pickup Days
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'white', 
                      py: 2,
                      borderBottom: 'none',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    Delivery Days
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'white', 
                      py: 2,
                      borderBottom: 'none',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    Pickup Times
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      fontWeight: 600, 
                      color: 'white', 
                      py: 2,
                      borderBottom: 'none',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    Service Options
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {SCHEDULE_DATA.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#f8f8f8' },
                      '&:nth-of-type(even)': { backgroundColor: 'white' },
                      '&:last-child td, &:last-child th': { border: 0 },
                      height: '64px'
                    }}
                  >
                    <TableCell 
                      component="th" 
                      scope="row" 
                      sx={{ 
                        fontWeight: 500,
                        color: '#1a3131',
                        fontSize: '0.95rem',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      {row.area}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#4a4a4a',
                        fontSize: '0.9rem',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      {row.pickupDays.join(', ')}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#4a4a4a',
                        fontSize: '0.9rem', 
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      {row.deliveryDays.join(', ')}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#4a4a4a',
                        fontSize: '0.9rem',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      {row.pickupTimes}
                    </TableCell>
                    <TableCell 
                      align="right"
                      sx={{ 
                        color: theme.palette.primary.darkBlue,
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      {row.sameDayAvailable && (
                        <Chip
                          label="Same-Day Available"
                          sx={{
                            color: theme.palette.primary.darkBlue,
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            '& .MuiChip-label': {
                              padding: 0
                            }
                          }}
                          size="small"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          // Mobile view - Cards
          <Box sx={{ mb: 3 }}>
            {SCHEDULE_DATA.map((row, index) => (
              <MobileScheduleCard key={index} data={row} index={index} />
            ))}
          </Box>
        )}
        
        <Typography 
          variant="h4" 
          sx={{ 
            color: theme.palette.primary.darkBlue,
            textAlign: 'center',
            fontSize: { xs: '0.9rem', md: '1.0rem' },
            maxWidth: '800px',
            fontWeight: 'bolder',
            mx: 'auto',
            mt: 5,
            mb: 3,
            px: { xs: 2, md: 0 }
          }}
        >
          Schedule is subject to change on holidays. All pickups must be scheduled at least 2 hours in advance.
        </Typography>
      </Container>
    </Box>
  );
};

export default ScheduleSection;