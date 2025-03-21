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

function ServicesSummary({ cart, total }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Selected Services
      </Typography>
      
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.id} sx={{ py: 2, px: 0 }}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {item.name} - {item.option}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  £{(item.basePrice + item.optionPrice).toFixed(2)} × {item.quantity}
                </Typography>
              }
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              £{item.totalPrice.toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            £{total.toFixed(2)}
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
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            £{total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      
      <Alert 
        severity="info" 
        sx={{ mt: 4 }}
        icon={<CheckCircleIcon />}
      >
        Your services have been added to your order. You can go back to modify your services or continue to schedule your collection and delivery.
      </Alert>
    </Box>
  );
}

export default ServicesSummary;