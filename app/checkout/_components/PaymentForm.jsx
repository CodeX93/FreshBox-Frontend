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
import {theme} from "../../../contexts/Theme"


function PaymentForm({ paymentData, handlePaymentChange, total }) {
  const DARK_BLUE=theme.palette.primary.darkBlue;
  const borderStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: DARK_BLUE,
      },
      '&:hover fieldset': {
        borderColor: DARK_BLUE,
      },
      '&.Mui-focused fieldset': {
        borderColor: DARK_BLUE,
      },
    },
    '& .MuiInputLabel-root': {
      color: DARK_BLUE, // Change label color when the field is focused
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: DARK_BLUE, // Change label color when the field is focused
    },
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Payment
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total to pay:{' '}
        <Box component="span" sx={{ fontWeight: 700 }}>
          £{total.toFixed(2)}
        </Box>
      </Typography>

      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          name="paymentMethod"
          value={paymentData.paymentMethod}
          onChange={handlePaymentChange}
        >
          <FormControlLabel
            value="card"
            control={
              <Radio
                sx={{
                  color: DARK_BLUE,
                  '&.Mui-checked': {
                    color: DARK_BLUE,
                  },
                }}
              />
            }
            label="Credit/Debit Card"
            sx={{
              '& .MuiFormControlLabel-label': {
                color: paymentData.paymentMethod === 'card' ? DARK_BLUE : 'inherit',
              },
            }}
          />
          <FormControlLabel
            value="paypal"
            control={
              <Radio
                sx={{
                  color: DARK_BLUE,
                  '&.Mui-checked': {
                    color: DARK_BLUE,
                  },
                }}
              />
            }
            label="PayPal"
            sx={{
              '& .MuiFormControlLabel-label': {
                color: paymentData.paymentMethod === 'paypal' ? DARK_BLUE : 'inherit',
              },
            }}
          />
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
              sx={borderStyle}
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
              sx={borderStyle}
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
              sx={borderStyle}
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
              sx={borderStyle}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="saveCard"
                  checked={paymentData.saveCard}
                  onChange={handlePaymentChange}
                  sx={{
                    color: '#2E7B5C',
                    '&.Mui-checked': {
                      color: '#2E7B5C',
                    },
                  }}
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
