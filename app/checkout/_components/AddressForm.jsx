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
  Alert,
  Collapse,
  IconButton 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';

import {theme} from "../../../contexts/Theme"

function AddressForm({ addressData, handleAddressChange, addressError }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Delivery Address
      </Typography>
      
      <Collapse in={addressError}>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {}}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Address not in coverage area
          </Typography>
          <Typography variant="body2">
            We currently only service London zones 1-3. Please enter a different address or contact customer support.
          </Typography>
        </Alert>
      </Collapse>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Address Type</FormLabel>
            <RadioGroup
              row
              name="addressType"
              value={addressData.addressType}
              onChange={handleAddressChange}
            >
              <FormControlLabel 
                value="home" 
                control={ <Radio
                  sx={{
                    color: theme.palette.primary.darkBlue, // default color
                    '&.Mui-checked': {
                      color: theme.palette.primary.darkBlue, // color when checked
                    },
                  }}
                />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HomeIcon sx={{ mr: 1 }} />
                    Home
                  </Box>
                } 
              />
              <FormControlLabel 
                value="office" 
                control={ <Radio
                  sx={{
                    color: theme.palette.primary.darkBlue, // color when checked
                    '&.Mui-checked': {
                      color: theme.palette.primary.darkBlue, // color when checked
                    },
                  }}
                />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BusinessIcon sx={{ mr: 1 }} />
                    Office
                  </Box>
                } 
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Postcode"
            name="postcode"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary.darkBlue, // default border
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
              },
            }}
            value={addressData.postcode}
            onChange={handleAddressChange}
            error={addressError}
            helperText={addressError ? "Postcode not in service area" : ""}
          />
        </Grid>
        
        <Grid item xs={12}>
        <TextField
  required
  fullWidth
  label="Address Line 1"
  name="addressLine1"
  value={addressData.addressLine1}
  onChange={handleAddressChange}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.darkBlue,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.darkBlue,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.darkBlue,
      },
    },
  }}
/>

        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2"
            name="addressLine2"
            value={addressData.addressLine2}
            onChange={handleAddressChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
              },
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={addressData.city}
            onChange={handleAddressChange}
            disabled
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
              },
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Delivery Notes (Optional)"
            name="notes"
            value={addressData.notes}
            onChange={handleAddressChange}
            multiline
            rows={3}
            placeholder="E.g., Doorbell doesn't work, please call when arriving"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.darkBlue,
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddressForm;