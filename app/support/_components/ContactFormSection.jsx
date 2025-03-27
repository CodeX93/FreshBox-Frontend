import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress
} from '@mui/material';

import {
  Send as SendIcon,
  AccessTime as ClockIcon
} from '@mui/icons-material';

// Define constants
const TURQUOISE = '#28ddcd';
const TURQUOISE_DARK = '#20c5b7';

// Support categories
const supportCategories = [
  { value: "general", label: "General Inquiry" },
  { value: "order", label: "Order Issue" },
  { value: "service", label: "Service Question" },
  { value: "billing", label: "Billing Problem" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "technical", label: "Technical Support" },
  { value: "commercial", label: "Commercial Services" },
  { value: "other", label: "Other" }
];

const ContactFormSection = ({ formData, handleInputChange, handleSubmit, isSubmitting }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: { xs: 3, sm: 4, md: 5 },
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'grey.100',
        height: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: `linear-gradient(90deg, ${TURQUOISE}, ${TURQUOISE}50)`
      }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" fontWeight={800} sx={{ mb: 1.5, color: '#2d3748' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
          Fill out the form below and we'll get back to you as soon as possible.
        </Typography>
        <Divider />
      </Box>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl 
              fullWidth 
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  }
                }
              }}
            >
              <InputLabel id="category-label">Support Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Support Category"
              >
                {supportCategories.map(category => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Order Number (if applicable)"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleInputChange}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              multiline
              rows={6}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: TURQUOISE
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              sx={{ 
                py: 1.5,
                px: 4,
                bgcolor: TURQUOISE,
                color: 'white',
                borderRadius: '12px',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(40, 221, 205, 0.4)',
                '&:hover': { 
                  bgcolor: TURQUOISE_DARK,
                  boxShadow: '0 6px 20px rgba(40, 221, 205, 0.6)',
                }
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mt: 2, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'flex-start' } 
              }}
            >
              <ClockIcon fontSize="small" sx={{ mr: 0.5, color: TURQUOISE }} />
              We typically respond within 24 hours
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactFormSection;