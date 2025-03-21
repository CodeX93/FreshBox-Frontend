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
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import {useAuth} from '../../../contexts/AuthContext'

export default function LoginPage() {
  const router = useRouter();
  const { login, googleSignIn, facebookSignIn, appleSignIn, phoneSignIn, verifyPhoneOtp } = useAuth();
  
  // State for authentication method tabs
  const [authMethod, setAuthMethod] = useState('email');
  
  // Email/Password login state
  const [emailLoginData, setEmailLoginData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  // Phone authentication state
  const [phoneStep, setPhoneStep] = useState(1); // 1 for phone input, 2 for OTP
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  
  // General state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle tab change
  const handleAuthMethodChange = (event, newValue) => {
    setAuthMethod(newValue);
    setError('');
  };

  // Handle email/password input changes
  const handleEmailLoginChange = (e) => {
    const { name, value } = e.target;
    setEmailLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Email/Password Login Handler
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(emailLoginData.email, emailLoginData.password);
      setSuccess('Login successful!');
      
      // Redirect after successful login
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Social Login Handlers
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      // Redirect happens automatically via the auth provider
    } catch (error) {
      setError('Google login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      await facebookSignIn();
      // Redirect happens automatically via the auth provider
    } catch (error) {
      setError('Facebook login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      await appleSignIn();
      // Redirect happens automatically via the auth provider
    } catch (error) {
      setError('Apple login failed. Please try again.');
      setLoading(false);
    }
  };

  // Phone Authentication Handlers
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await phoneSignIn(phoneNumber);
      setVerificationId(result.verificationId);
      setPhoneStep(2);
      setSuccess('Verification code sent successfully!');
    } catch (error) {
      setError(error.message || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyPhoneOtp(phoneNumber, otp, verificationId);
      setSuccess('Phone verification successful!');
      
      // Redirect after successful verification
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      setError(error.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
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
            Welcome Back
          </Typography>
          <Typography variant="body1">
            Sign in to your Fresh Box account
          </Typography>
        </Box>

        {/* Authentication Methods Tabs */}
        <Tabs 
          value={authMethod} 
          onChange={handleAuthMethodChange} 
          variant="fullWidth" 
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            icon={<EmailIcon fontSize="small" />} 
            label="Email" 
            value="email" 
            iconPosition="start"
            sx={{ fontWeight: 600 }}
          />
          <Tab 
            icon={<PhoneIcon fontSize="small" />} 
            label="Phone" 
            value="phone" 
            iconPosition="start"
            sx={{ fontWeight: 600 }}
          />
        </Tabs>

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

          {/* Email Login Form */}
          {authMethod === 'email' && (
            <Box component="form" onSubmit={handleEmailLogin} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={emailLoginData.email}
                onChange={handleEmailLoginChange}
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
                autoComplete="current-password"
                value={emailLoginData.password}
                onChange={handleEmailLoginChange}
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
              
              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link href="/auth/forgot-password" passHref>
                  <Typography 
                    component="span"
                    color="primary" 
                    fontWeight={600}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  bgcolor: '#28ddcd',
                  '&:hover': {
                    bgcolor: '#20c5b7'
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>
          )}

          {/* Phone Authentication Form */}
          {authMethod === 'phone' && (
            <>
              {phoneStep === 1 ? (
                <Box component="form" onSubmit={handleRequestOtp} noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="tel"
                    autoFocus
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (234) 567-8900"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      bgcolor: '#28ddcd',
                      '&:hover': {
                        bgcolor: '#20c5b7'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Verification Code'}
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleVerifyOtp} noValidate>
                  <Typography variant="body1" gutterBottom>
                    We've sent a verification code to {phoneNumber}
                  </Typography>
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="otp"
                    label="Verification Code"
                    name="otp"
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    inputProps={{ maxLength: 6 }}
                    sx={{ mb: 3 }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      mb: 2,
                      bgcolor: '#28ddcd',
                      '&:hover': {
                        bgcolor: '#20c5b7'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify Code'}
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => setPhoneStep(1)}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    Back
                  </Button>
                </Box>
              )}
            </>
          )}

          {/* Social Login Options */}
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 3 }}>
              <Typography color="text.secondary" variant="body2">
                OR CONTINUE WITH
              </Typography>
            </Divider>
            
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleGoogleLogin}
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
                  onClick={handleFacebookLogin}
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
                  onClick={handleAppleLogin}
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
        </Box>

        {/* Footer */}
        <Box sx={{ p: 3, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.200', textAlign: 'center' }}>
          <Typography variant="body1">
            Don't have an account?{' '}
            <Link href="/auth/register" passHref>
              <Typography 
                component="span" 
                color="primary" 
                fontWeight={600}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}