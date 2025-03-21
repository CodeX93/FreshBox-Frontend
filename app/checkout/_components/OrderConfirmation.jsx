import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getTimeSlot, formatDate } from '../checkoutData';

function OrderConfirmation({ cartTotal, contactData, scheduleData }) {
  // Generate an order number
  const orderNumber = `LD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <Box sx={{ 
          bgcolor: 'success.main', 
          color: 'white',
          p: 3,
          textAlign: 'center'
        }}>
          <CheckCircleIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Thank You!
          </Typography>
          <Typography variant="h6">
            Your order has been placed successfully
          </Typography>
        </Box>
        
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Order Number
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {orderNumber}
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                Hi {contactData.firstName},
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                Thank you for your order. We've received your request and will process it right away.
                You will receive a confirmation email at {contactData.email} with your order details.
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Details
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Collection
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(scheduleData.collectionDate)}
                    <br />
                    {getTimeSlot(scheduleData.collectionTimeSlot)}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Delivery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(scheduleData.deliveryDate)}
                    <br />
                    {getTimeSlot(scheduleData.deliveryTimeSlot)}
                  </Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="subtitle1">
                  Total Paid
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  £{cartTotal.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  href="/dashboard"
                  sx={{ 
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    mr: 2
                  }}
                >
                  Track My Order
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  href="/"
                  sx={{ 
                    borderRadius: 2,
                    px: 4,
                    py: 1.5
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default OrderConfirmation;