'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  AlternateEmail as UsernameIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';


const steps = ['Account Details', 'Personal Information', 'Review & Finish'];

export default function SignupPage() {
  const router = useRouter();
  const { signup, googleSignIn, facebookSignIn, appleSignIn } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phoneNumber: '',
    username: ''
  });
  
  // UI state
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Step navigation
  const handleNext = () => {
    // Validate current step
    if (activeStep === 0) {
      // Validate email and password
      if (!formData.email) {
        return setError('Email is required');
      }
      if (!formData.password) {
        return setError('Password is required');
      }
      if (formData.password !== formData.confirmPassword) {
        return setError('Passwords do not match');
      }
      if (formData.password.length < 8) {
        return setError('Password must be at least 8 characters');
      }
    } else if (activeStep === 1) {
      // Validate name
      if (!formData.name) {
        return setError('Full name is required');
      }
    }

    setError('');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      await signup(formData.email, formData.password, formData.name);
      setSuccess('Account created successfully!');
      
      // Redirect after successful signup
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Social signup handlers
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      // Redirect happens automatically via the auth provider
    } catch (error) {
      setError('Google signup failed. Please try again.');
      setLoading(false);
    }
  };

  const handleFacebookSignup = async () => {
    try {
      setLoading(true);
      await facebookSignIn();
      // Redirect happens automatically via the auth provider
    } catch (error) {
      setError('Facebook signup failed. Please try again.');
      setLoading(false);
    }
  };

  const handleAppleSignup = async () => {
    try {
      setLoading(true);
      await appleSignIn();
      // Redirect happens automatically via the auth provider
    } catch (error) {
      setError('Apple signup failed. Please try again.');
      setLoading(false);
    }
  };

  // Render form steps
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              By creating an account, you agree to Fresh Box's{' '}
              <Link href="/terms" passHref>
                <Typography component="span" color="primary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  Terms of Service
                </Typography>
              </Link>{' '}
              and{' '}
              <Link href="/privacy" passHref>
                <Typography component="span" color="primary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  Privacy Policy
                </Typography>
              </Link>
              .
            </Typography>
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username (optional)"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UsernameIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              id="phoneNumber"
              label="Phone Number (optional)"
              name="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Review Your Information
            </Typography>
            
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.email}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Full Name:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.name}
                  </Typography>
                </Grid>
                
                {formData.username && (
                  <>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Username:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2" fontWeight={500}>
                        {formData.username}
                      </Typography>
                    </Grid>
                  </>
                )}
                
                {formData.phoneNumber && (
                  <>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Phone:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2" fontWeight={500}>
                        {formData.phoneNumber}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please verify that the information above is correct. You can go back to make changes if needed.
            </Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        {/* Header */}
        <Box 
          sx={{ 
            bgcolor: '#28ddcd', 
            color: 'white', 
            p: 3, 
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1">
            Join Fresh Box and enjoy premium laundry services
          </Typography>
        </Box>

        {/* Stepper */}
        <Box sx={{ width: '100%', p: 3, pb: 0 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Form Content */}
        <Box sx={{ p: 3 }}>
          {/* Alert Messages */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {/* Form Steps */}
          <form onSubmit={activeStep === steps.length - 1 ? handleSignup : undefined}>
            {getStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
                sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ 
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    bgcolor: '#28ddcd',
                    '&:hover': {
                      bgcolor: '#20c5b7'
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 600,
                    bgcolor: '#28ddcd',
                    '&:hover': {
                      bgcolor: '#20c5b7'
                    }
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>

          {/* Social Signup Options - Only show on first step */}
          {activeStep === 0 && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }}>
                <Typography color="text.secondary" variant="body2">
                  OR SIGN UP WITH
                </Typography>
              </Divider>
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={handleGoogleSignup}
                    startIcon={<GoogleIcon />}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: 'grey.300',
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    Google
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={handleFacebookSignup}
                    startIcon={<FacebookIcon />}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: 'grey.300',
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    Facebook
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={handleAppleSignup}
                    startIcon={<AppleIcon />}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: 'grey.300',
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    Apple
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ p: 3, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.200', textAlign: 'center' }}>
          <Typography variant="body1">
            Already have an account?{' '}
            <Link href="/auth/login" passHref>
              <Typography 
                component="span" 
                color="primary" 
                fontWeight={600}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign in
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}