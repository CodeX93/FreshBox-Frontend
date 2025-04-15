import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {theme} from "../../../contexts/Theme"

// Define constants
const TURQUOISE = theme.palette.primary.main;
const DARK_BLUE = theme.palette.primary.darkBlue;

function ServicesSummary({ cart, total }) {
  // Function to calculate item price based on item structure
  const getItemPrice = (item) => {
    // Handle different cart formats
    if (item.basePrice !== undefined && item.optionPrice !== undefined) {
      // Original format
      return (Number(item.basePrice) + Number(item.optionPrice)).toFixed(2);
    } else if (item.price !== undefined) {
      // API service format
      return Number(item.price).toFixed(2);
    }
    
    // Default fallback
    if (item.totalPrice && item.quantity) {
      return (Number(item.totalPrice) / Number(item.quantity)).toFixed(2);
    }
    
    return '0.00';
  };
  
  // Function to get formatted item total
  const getItemTotal = (item) => {
    if (item.totalPrice !== undefined) {
      return Number(item.totalPrice).toFixed(2);
    }
    
    // Calculate from price and quantity
    const price = Number(getItemPrice(item));
    const quantity = Number(item.quantity || 1);
    return (price * quantity).toFixed(2);
  };
  
  // Function to get option display text
  const getOptionDisplay = (item) => {
    if (item.option) {
      return item.option;
    }
    return item.priceType || '';
  };
  
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, color: DARK_BLUE }}>
        Selected Services
      </Typography>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.id} sx={{ py: 2, px: 0 }}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: DARK_BLUE }}>
                  {item.name}{getOptionDisplay(item) ? ` - ${getOptionDisplay(item)}` : ''}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  ${getItemPrice(item)} × {item.quantity || 1}
                </Typography>
              }
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              ${getItemTotal(item)}
            </Typography>
          </ListItem>
        ))}
        <Divider sx={{ my: 2 }} />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            ${Number(total).toFixed(2)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Collection & Delivery" />
          <Typography variant="body1">
            Free
          </Typography>
        </ListItem>
        <Divider sx={{ my: 2 }} />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
            }
          />
          <Typography variant="h6" sx={{ fontWeight: 700, color: DARK_BLUE }}>
            ${Number(total).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Alert
        severity="info"
        sx={{ 
          mt: 4,
          '& .MuiAlert-icon': {
            color: DARK_BLUE,
            
          }
        }}
        icon={<CheckCircleIcon />}
      >
        Your services have been added to your order. You can go back to modify your services or continue to schedule your collection and delivery.
      </Alert>
    </Box>
  );
}

export default ServicesSummary;