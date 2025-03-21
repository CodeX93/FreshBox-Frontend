import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  FormControl, 
  FormLabel, 
  RadioGroup,
  FormControlLabel, 
  Radio,
  Checkbox 
} from '@mui/material';

function PaymentForm({ paymentData, handlePaymentChange, total }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Payment
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total to pay: <Box component="span" sx={{ fontWeight: 700 }}>£{total.toFixed(2)}</Box>
      </Typography>
      
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          name="paymentMethod"
          value={paymentData.paymentMethod}
          onChange={handlePaymentChange}
        >
          <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
        </RadioGroup>
      </FormControl>
      
      {paymentData.paymentMethod === 'card' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Card Number"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handlePaymentChange}
              placeholder="1234 5678 9012 3456"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Expiry Date"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handlePaymentChange}
              placeholder="MM/YY"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              name="cvv"
              value={paymentData.cvv}
              onChange={handlePaymentChange}
              placeholder="123"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Name on Card"
              name="nameOnCard"
              value={paymentData.nameOnCard}
              onChange={handlePaymentChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="saveCard"
                  checked={paymentData.saveCard}
                  onChange={handlePaymentChange}
                  color="primary"
                />
              }
              label="Save card for future orders"
            />
          </Grid>
        </Grid>
      )}
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          By completing your purchase, you agree to our Terms of Service and Privacy Policy.
          Your payment information is encrypted and secure.
        </Typography>
      </Box>
    </Box>
  );
}

export default PaymentForm;