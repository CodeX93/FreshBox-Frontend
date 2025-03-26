'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  Phone as PhoneIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import {useAuth} from '../../../contexts/AuthContext'

export default function LoginPage() {
  const router = useRouter();
  const { 
    login, 
    googleSignIn, 
    facebookSignIn, 
    appleSignIn, 
    phoneSignIn, 
    verifyOtpOnly,
    completePhoneRegistration 
  } = useAuth();
  
  // State for authentication method tabs
  const [authMethod, setAuthMethod] = useState('email');
  
  // Email/Password login state
  const [emailLoginData, setEmailLoginData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  // Phone authentication state
  const [phoneStep, setPhoneStep] = useState(1); // 1 for phone input, 2 for OTP, 3 for name
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [userName, setUserName] = useState('');
  
  // General state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle tab change
  const handleAuthMethodChange = (event, newValue) => {
    setAuthMethod(newValue);
    setError('');
    setSuccess('');
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
    setSuccess('');
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
    setSuccess('');
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
    setSuccess('');
    setLoading(true);

    try {
      // Only verify the OTP without logging in
      await verifyOtpOnly(phoneNumber, otp, verificationId);
      setPhoneStep(3); // Move to name input step
      setSuccess('Phone number verified! Please enter your name to continue.');
    } catch (error) {
      setError(error.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Complete the registration with name and log in
      await completePhoneRegistration(phoneNumber, otp, verificationId, userName);
      setSuccess('Registration successful!');
      
      // Redirect after successful registration
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    } catch (error) {
      setError(error.message || 'Failed to complete registration.');
    } finally {
      setLoading(false);
    }
  };

  // Common button styles for social logins
  const socialButtonStyle = {
    py: { xs: 1.25, sm: 1.5 },
    height: { xs: '48px', sm: '56px' },
    borderRadius: 2,
    borderColor: 'grey.300',
    color: 'text.primary',
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'none',
    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
    fontWeight: 500,
    '&:hover': {
      bgcolor: 'rgba(0, 0, 0, 0.04)',
      borderColor: 'grey.400'
    },
    '& .MuiButton-startIcon': {
      marginRight: { xs: 1, sm: 1.5 },
      marginLeft: '-24px',
      position: 'absolute',
      left: { xs: 16, sm: 24 },
      '& .MuiSvgIcon-root': {
        fontSize: { xs: '1.25rem', sm: '1.5rem' }
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 4 },
        bgcolor: '#f8f9fa'
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'grey.200',
          boxShadow: { xs: 1, sm: 3 },
          width: '100%',
          maxWidth: '400px',
          mx: 'auto'
        }}
      >
        {/* Header with yellow accent on left */}
        <Box sx={{ display: 'flex', position: 'relative' }}>
          <Box sx={{ 
            width: { xs: '8px', sm: '12px' }, 
            backgroundColor: '#ffc107', 
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0
          }} />
          <Box sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            width: '100%',
            textAlign: 'center'
          }}>
            <Typography 
              variant="h4" 
              fontWeight={700} 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
                letterSpacing: '-0.5px'
              }}
            >
              Welcome back!
            </Typography>
          </Box>
        </Box>

        {/* Form Content */}
        <Box sx={{ 
          px: { xs: 2, sm: 2.5, md: 3 }, 
          pb: { xs: 2, sm: 2.5, md: 3 }, 
          pt: 1,
          width: '100%'
        }}>
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
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={emailLoginData.email}
                onChange={handleEmailLoginChange}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    height: { xs: '50px', sm: '56px' }
                  }
                }}
                variant="outlined"
                size="medium"
                InputProps={{
                  sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                }}
                InputLabelProps={{
                  sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                }}
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        size="medium"
                        sx={{ 
                          mr: { xs: '-8px', sm: '-4px' },
                          p: { xs: 0.5, sm: 1 }
                        }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                }}
                InputLabelProps={{
                  sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                }}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    height: { xs: '50px', sm: '56px' }
                  }
                }}
                variant="outlined"
                size="medium"
              />
              
              <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
                <Link href="/auth/forgot-password" passHref>
                  <Typography 
                    component="span"
                    color="#e6b012" 
                    fontWeight={600}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                    }}
                  >
                    I forgot my password
                  </Typography>
                </Link>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ 
                  py: { xs: 1.25, sm: 1.5 },
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  mb: { xs: 2, sm: 3 },
                  bgcolor: '#e6b012',
                  '&:hover': {
                    bgcolor: '#d4a010'
                  },
                  height: { xs: '48px', sm: '56px' }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
              </Button>
            </Box>
          )}

          {/* Phone Authentication Form */}
          {authMethod === 'phone' && (
            <>
              {phoneStep === 1 && (
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
                    sx={{ 
                      mb: { xs: 2, sm: 3 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1.5,
                        height: { xs: '50px', sm: '56px' }
                      }
                    }}
                    InputProps={{
                      sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                    }}
                    InputLabelProps={{
                      sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                    }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || !phoneNumber.trim()}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      bgcolor: '#e6b012',
                      '&:hover': {
                        bgcolor: '#d4a010'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Verification Code'}
                  </Button>
                </Box>
              )}
              
              {phoneStep === 2 && (
                <Box component="form" onSubmit={handleVerifyOtp} noValidate>
                  <Typography 
                    variant="body1" 
                    gutterBottom
                    sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}
                  >
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
                    sx={{ 
                      mb: { xs: 2, sm: 3 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1.5,
                        height: { xs: '50px', sm: '56px' }
                      }
                    }}
                    InputProps={{
                      sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                    }}
                    InputLabelProps={{
                      sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                    }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || !otp.trim()}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      mb: 2,
                      bgcolor: '#e6b012',
                      '&:hover': {
                        bgcolor: '#d4a010'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify Code'}
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
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
              
              {phoneStep === 3 && (
                <Box component="form" onSubmit={handleSubmitUserInfo} noValidate>
                  <Typography 
                    variant="body1" 
                    gutterBottom 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                    }}
                  >
                    Great! Your phone number has been verified. Please enter your name to complete setup:
                  </Typography>
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="Your Name"
                    name="userName"
                    autoFocus
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="John Doe"
                    sx={{ 
                      mb: { xs: 2, sm: 3 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1.5,
                        height: { xs: '50px', sm: '56px' }
                      }
                    }}
                    InputProps={{
                      sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                    }}
                    InputLabelProps={{
                      sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                    }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || !userName.trim()}
                    sx={{ 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      mb: 2,
                      bgcolor: '#e6b012',
                      '&:hover': {
                        bgcolor: '#d4a010'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Complete Registration'}
                  </Button>
                </Box>
              )}
            </>
          )}

          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="body1"
              sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}
            >
              Don't have an account?{' '}
              <Link href="/auth/register" passHref>
                <Typography 
                  component="span" 
                  color="#e6b012"
                  fontWeight={600}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                    fontSize: 'inherit'
                  }}
                >
                  Sign up
                </Typography>
              </Link>
              .
            </Typography>
          </Box>

          {/* Social Login Options - Vertical alignment */}
          <Box sx={{ mt: { xs: 1, sm: 2 } }}>
            <Divider sx={{ mb: { xs: 2, sm: 3 } }}>
              <Typography 
                color="text.secondary" 
                variant="body2"
                sx={{ 
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  px: { xs: 1, sm: 2 }
                }}
              >
                Or
              </Typography>
            </Divider>
            
            <Stack 
              spacing={{ xs: 1, sm: 1.5 }} 
              direction="column" 
              width="100%"
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleLogin}
                startIcon={<GoogleIcon />}
                sx={socialButtonStyle}
              >
                Continue with Google
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                onClick={handleAppleLogin}
                startIcon={<AppleIcon />}
                sx={socialButtonStyle}
              >
                Continue with Apple
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                onClick={handleFacebookLogin}
                startIcon={<FacebookIcon />}
                sx={socialButtonStyle}
              >
                Continue with Facebook
              </Button>
            </Stack>
          </Box>

          {/* Phone Auth Tab - Only shown if not already selected */}
          {authMethod !== 'phone' && (
            <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: 'center' }}>
              <Button
                variant="text"
                color="primary"
                onClick={() => setAuthMethod('phone')}
                startIcon={<PhoneIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />}
                sx={{ 
                  color: '#28ddcd',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                  py: 0.5,
                  justifyContent: 'center'
                }}
              >
                Login with phone number instead
              </Button>
            </Box>
          )}
          
          {/* Email Auth Tab - Only shown if not already selected */}
          {authMethod !== 'email' && (
            <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: 'center' }}>
              <Button
                variant="text"
                color="primary"
                onClick={() => setAuthMethod('email')}
                startIcon={<EmailIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />}
                sx={{ 
                  color: '#28ddcd',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                  py: 0.5,
                  justifyContent: 'center'
                }}
              >
                Login with email instead
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}