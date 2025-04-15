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
  useMediaQuery
} from '@mui/material';
import { theme } from '../../../contexts/Theme'; // Import your theme context

// Mock schedule data - with repeated Downtown entries as in the screenshot
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
                      color:theme.palette.primary.darkBlue,
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    {row.sameDayAvailable && (
                      <Chip
                        label="Same-Day Available"
                        sx={{
                          color:theme.palette.primary.darkBlue,
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
        
        <Typography 
          variant="h4" 
          sx={{ 
            color: theme.palette.primary.darkBlue,
            textAlign: 'center',
            fontSize: '1.00rem',
            maxWidth: '800px',
            fontWeight:'bolder',
            mx: 'auto',
            mt: 5,
            mb:3
          }}
        >
          Schedule is subject to change on holidays. All pickups must be scheduled at least 2 hours in advance.
        </Typography>
      </Container>
    </Box>
  );
};

export default ScheduleSection;