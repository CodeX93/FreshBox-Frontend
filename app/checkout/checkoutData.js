import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import React from 'react';

// Checkout steps
export const steps = [
  {
    label: 'Address',
    icon: <LocationOnIcon />
  },
  {
    label: 'Services',
    icon: <LocalLaundryServiceIcon />
  },
  {
    label: 'Schedule',
    icon: <AccessTimeIcon />
  },
  {
    label: 'Contact',
    icon: <PersonIcon />
  },
  {
    label: 'Payment',
    icon: <PaymentIcon />
  }
];


// Available time slots
export const timeSlots = [
  { id: 1, start: '08:00', end: '10:00' },
  { id: 2, start: '10:00', end: '12:00' },
  { id: 3, start: '12:00', end: '14:00' },
  { id: 4, start: '14:00', end: '16:00' },
  { id: 5, start: '16:00', end: '18:00' },
  { id: 6, start: '18:00', end: '20:00' },
];

// Helper functions
export const getTimeSlot = (slotId) => {
  const slot = timeSlots.find(slot => slot.id === slotId);
  return slot ? `${slot.start} - ${slot.end}` : '';
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-GB', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short'
  });
};

// Generate date options for scheduling
export const generateDateOptions = (startDaysFromNow) => {
  const dates = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + startDaysFromNow);
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const formattedDate = date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
    
    dates.push({
      value: date.toISOString().split('T')[0], // YYYY-MM-DD format
      label: formattedDate
    });
  }
  
  return dates;
};