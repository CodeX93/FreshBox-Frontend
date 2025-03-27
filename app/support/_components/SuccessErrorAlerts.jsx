import React from 'react';
import {
  Snackbar,
  Alert,
  Typography
} from '@mui/material';

import {
  CheckCircle as SuccessIcon
} from '@mui/icons-material';

const SuccessErrorAlerts = ({ successMessage, errorMessage, handleCloseAlert }) => {
  return (
    <>
      {/* Success Message */}
      <Snackbar 
        open={successMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 2 }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="success" 
          variant="filled"
          icon={<SuccessIcon />}
          sx={{ 
            width: '100%',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Your message has been sent! We'll be in touch soon.
          </Typography>
        </Alert>
      </Snackbar>
      
      {/* Error Message */}
      <Snackbar 
        open={errorMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 2 }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="error" 
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Something went wrong. Please try again.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default SuccessErrorAlerts;