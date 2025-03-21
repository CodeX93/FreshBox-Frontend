import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  FormControlLabel, 
  Checkbox 
} from '@mui/material';

function ContactForm({ contactData, handleContactChange }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Contact Details
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={contactData.firstName}
            onChange={handleContactChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            name="lastName"
            value={contactData.lastName}
            onChange={handleContactChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={contactData.email}
            onChange={handleContactChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phone"
            value={contactData.phone}
            onChange={handleContactChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="createAccount"
                checked={contactData.createAccount}
                onChange={handleContactChange}
                color="primary"
              />
            }
            label="Create an account for faster checkout next time"
          />
        </Grid>
        
        {contactData.createAccount && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={contactData.password}
              onChange={handleContactChange}
            />
          </Grid>
        )}
        
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="marketingConsent"
                checked={contactData.marketingConsent}
                onChange={handleContactChange}
                color="primary"
              />
            }
            label="I'd like to receive exclusive offers and updates via email"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactForm;