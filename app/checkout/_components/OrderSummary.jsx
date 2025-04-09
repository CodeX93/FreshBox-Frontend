import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider 
} from '@mui/material';
import { getTimeSlot, formatDate } from '../checkoutData';

function OrderSummary({ cart, cartTotal, addressData, scheduleData, activeStep, timeSlots }) {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ 
        bgcolor: '#2E7B5C', 
        color: 'white',
        p: 2,
        display: 'flex',
        alignItems: 'center'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Order Summary
        </Typography>
      </Box>
      
      <Box sx={{ p: 3 }}>
        <List disablePadding>
          {cart.map((item) => (
            <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={item.name}
                secondary={`${item.option} × ${item.quantity}`}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                £{item.totalPrice.toFixed(2)}
              </Typography>
            </ListItem>
          ))}
          
          <Divider sx={{ my: 2 }} />
          
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Subtotal" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              £{cartTotal.toFixed(2)}
            </Typography>
          </ListItem>
          
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Delivery" />
            <Typography variant="body2">
              Free
            </Typography>
          </ListItem>
          
          <Divider sx={{ my: 2 }} />
          
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText 
              primary="Total" 
              primaryTypographyProps={{ fontWeight: 700 }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              £{cartTotal.toFixed(2)}
            </Typography>
          </ListItem>
        </List>
        
        {activeStep >= 0 && addressData.addressLine1 && (
          <>
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Delivery Address
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {addressData.addressLine1}
              {addressData.addressLine2 && <>, {addressData.addressLine2}</>}
              <br />
              {addressData.city}, {addressData.postcode}
            </Typography>
          </>
        )}
        
        {activeStep >= 2 && scheduleData.collectionDate && (
          <>
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Collection
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(scheduleData.collectionDate)}
              <br />
              {getTimeSlot(scheduleData.collectionTimeSlot)}
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(scheduleData.deliveryDate)}
                <br />
                {getTimeSlot(scheduleData.deliveryTimeSlot)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
}

export default OrderSummary;