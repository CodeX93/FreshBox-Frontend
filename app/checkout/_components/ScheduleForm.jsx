import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Paper,
  Alert
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { generateDateOptions } from '../checkoutData';

function ScheduleForm({ scheduleData, handleScheduleChange, timeSlots }) {
  // Generate date options
  const collectionDates = generateDateOptions(1); // Start from tomorrow
  const deliveryDates = generateDateOptions(2); // Start from day after tomorrow
  
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Collection & Delivery Schedule
      </Typography>
      
      <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Collection
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Collection Date</InputLabel>
              <Select
                value={scheduleData.collectionDate || ''}
                onChange={(e) => handleScheduleChange('collectionDate', e.target.value)}
                label="Collection Date"
              >
                {collectionDates.map((date, index) => (
                  <MenuItem key={index} value={date.value}>
                    {date.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a collection date</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Collection Time</InputLabel>
              <Select
                value={scheduleData.collectionTimeSlot || ''}
                onChange={(e) => handleScheduleChange('collectionTimeSlot', e.target.value)}
                label="Collection Time"
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot.id} value={slot.id}>
                    {slot.start} - {slot.end}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>2-hour collection window</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Delivery
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Delivery Date</InputLabel>
              <Select
                value={scheduleData.deliveryDate || ''}
                onChange={(e) => handleScheduleChange('deliveryDate', e.target.value)}
                label="Delivery Date"
                disabled={!scheduleData.collectionDate}
              >
                {deliveryDates.map((date, index) => (
                  <MenuItem key={index} value={date.value}>
                    {date.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a delivery date</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Delivery Time</InputLabel>
              <Select
                value={scheduleData.deliveryTimeSlot || ''}
                onChange={(e) => handleScheduleChange('deliveryTimeSlot', e.target.value)}
                label="Delivery Time"
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot.id} value={slot.id}>
                    {slot.start} - {slot.end}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>2-hour delivery window</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      <Alert 
        severity="info" 
        sx={{ mt: 4 }}
        icon={<AccessTimeIcon />}
      >
        <Typography variant="body2">
          Your items will be collected and delivered within the time slots you've selected. 
          You'll receive a notification when our driver is on the way.
        </Typography>
      </Alert>
    </Box>
  );
}

export default ScheduleForm;