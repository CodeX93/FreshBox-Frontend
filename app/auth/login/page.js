'use client';

import { useState, useEffect } from 'react';
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
  Stack,
  Container,
  Tabs,
  Tab,
  Fade,
  useMediaQuery,
  useTheme
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
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { theme } from "../../../contexts/Theme";

// Define brand colors
const BRAND_PRIMARY = theme.palette.primary.main; // Medium green primary color
const BRAND_DARK_BLUE = theme.palette.primary.darkBlue; // Dark blue color
const BRAND_WHITISH_MINT = theme.palette.primary.whitishMint; // Light mint color

export default function LoginPage() {
  const router = useRouter();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));
  
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
  const [formReady, setFormReady] = useState(false);

  // Set animation on mount
  useEffect(() => {
    setFormReady(true);
  }, []);

  // Handle tab change
  const handleAuthMethodChange = (newValue) => {
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

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BRAND_WHITISH_MINT,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -150,
          right: -150,
          width: 400,
          height: 400,
          backgroundColor: BRAND_PRIMARY,
          opacity: 0.3,
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          backgroundColor: BRAND_PRIMARY,
          opacity: 0.2,
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />

      <Container 
        maxWidth="sm" 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          py: 0
        }}
      >
        <Fade in={formReady} timeout={800}>
          <Paper
            elevation={isMobile ? 2 : 4}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              mx: 'auto',
              backgroundColor: 'white',
              position: 'relative',
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: BRAND_PRIMARY,
                borderRadius: '4px',
              }
            }}
          >
            {/* Colorful top edge */}
            <Box
              sx={{
                height: 6,
                width: '100%',
                background: BRAND_PRIMARY,
              }}
            />

            {/* Header */}
            <Box
              sx={{
                pt: { xs: 3, sm: 4 },
                pb: { xs: 2, sm: 3 },
                px: { xs: 3, sm: 5 },
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h4"
                fontWeight={800}
                gutterBottom
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  color: BRAND_DARK_BLUE,
                  lineHeight: 1.3,
                }}
              >
                Welcome back!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '0.9rem' },
                  maxWidth: '80%',
                  mx: 'auto',
                  color: 'rgba(0, 60, 67, 0.7)',
                }}
              >
                Log in to your account to continue
              </Typography>
            </Box>

            {/* Auth method tabs */}
            <Box
              sx={{
                px: { xs: 3, sm: 5 },
                mb: { xs: 1, sm: 2 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  bgcolor: BRAND_WHITISH_MINT,
                  p: 0.5,
                  mb: 2,
                  borderRadius: 2,
                }}
              >
                <Button
                disableElevation
                  fullWidth
                  onClick={() => handleAuthMethodChange('email')}
                  sx={{
                    py: 1,
                    bgcolor: authMethod === 'email' ? 'white' : 'transparent',
                    color: authMethod === 'email' ? BRAND_DARK_BLUE : 'rgba(0, 60, 67, 0.7)',
                    fontWeight: authMethod === 'email' ? 600 : 500,
                    boxShadow: authMethod === 'email' ? '0 2px 8px rgba(0,60,67,0.08)' : 'none',
                    borderRadius: 1.5,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    '&:hover': {
                      bgcolor: authMethod === 'email' ? 'white' : 'rgba(255,255,255,0.6)'
                    }
                  }}
                  startIcon={<EmailIcon sx={{ 
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    color: authMethod === 'email' ? BRAND_DARK_BLUE : 'rgba(0, 60, 67, 0.7)'
                  }} />}
                >
                  Email
                </Button>
                <Button
                disableElevation
                  fullWidth
                  onClick={() => handleAuthMethodChange('phone')}
                  sx={{
                    py: 1,
                    bgcolor: authMethod === 'phone' ? 'white' : 'transparent',
                    color: authMethod === 'phone' ? BRAND_DARK_BLUE : 'rgba(0, 60, 67, 0.7)',
                    fontWeight: authMethod === 'phone' ? 600 : 500,
                    boxShadow: authMethod === 'phone' ? '0 2px 8px rgba(0,60,67,0.08)' : 'none',
                    borderRadius: 1.5,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    '&:hover': {
                      bgcolor: authMethod === 'phone' ? 'white' : 'rgba(255,255,255,0.6)'
                    }
                  }}
                  startIcon={<PhoneIcon sx={{ 
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    color: authMethod === 'phone' ? BRAND_DARK_BLUE : 'rgba(0, 60, 67, 0.7)'
                  }} />}
                >
                  Phone
                </Button>
              </Box>

              {/* Alert Messages */}
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    '& .MuiAlert-icon': { alignItems: 'center' }
                  }}
                >
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    '& .MuiAlert-icon': { alignItems: 'center' },
                    backgroundColor: 'rgba(148, 255, 212, 0.2)',
                    color: BRAND_DARK_BLUE,
                    '& .MuiAlert-icon': {
                      color: BRAND_DARK_BLUE
                    }
                  }}
                >
                  {success}
                </Alert>
              )}
            </Box>

            {/* Form Content */}
            <Box
              sx={{
                px: { xs: 3, sm: 5 },
                pb: { xs: 3, sm: 4 },
              }}
            >
              {/* Email Login Form */}
              {authMethod === 'email' && (
                <Fade in={authMethod === 'email'} timeout={500}>
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
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&.Mui-focused fieldset': {
                            borderColor: BRAND_PRIMARY,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: BRAND_DARK_BLUE,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: 'rgba(0, 60, 67, 0.6)' }} />
                          </InputAdornment>
                        ),
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
                      sx={{
                        mb: 1,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&.Mui-focused fieldset': {
                            borderColor: BRAND_PRIMARY,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: BRAND_DARK_BLUE,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: 'rgba(0, 60, 67, 0.6)' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                              sx={{ color: 'rgba(0, 60, 67, 0.6)' }}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <Box sx={{ textAlign: 'right', mb: 2 }}>
                      <Link href="/auth/forgot-password" passHref>
                        <Typography
                          component="span"
                          fontSize="0.9rem"
                          fontWeight={500}
                          sx={{
                            color: BRAND_DARK_BLUE,
                            cursor: 'pointer',
                            '&:hover': { 
                              textDecoration: 'underline',
                              color: 'rgba(0, 60, 67, 0.8)'
                            },
                          }}
                        >
                          Forgot password?
                        </Typography>
                      </Link>
                    </Box>
                    
                    <Button
                      disableElevation
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        mb: 2,
                        bgcolor: BRAND_PRIMARY,
                        color: BRAND_DARK_BLUE,
                        '&:hover': {
                          bgcolor: BRAND_DARK_BLUE,
                          color: BRAND_WHITISH_MINT,
                        },
                        '&:disabled': {
                          bgcolor: 'rgba(148, 255, 212, 0.5)',
                          color: 'rgba(0, 60, 67, 0.5)',
                        }
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: BRAND_DARK_BLUE }} />
                      ) : (
                        'Log in'
                      )}
                    </Button>
                    
                    {/* Social Login Section */}
                    <Box sx={{ my: 3 }}>
                      <Divider sx={{ 
                        '&::before, &::after': {
                          borderColor: 'rgba(0, 60, 67, 0.15)',
                        }
                      }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(0, 60, 67, 0.6)',
                            px: 1,
                            fontSize: '0.85rem'
                          }}
                        >
                          Or continue with
                        </Typography>
                      </Divider>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 1, sm: 2 },
                        mt: 2
                      }}>
                        <Button
                          disableElevation
                          fullWidth
                          variant="outlined"
                          onClick={handleGoogleLogin}
                          disabled={loading}
                          startIcon={<GoogleIcon />}
                          sx={{
                            py: 1.25,
                            borderRadius: 2,
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            textTransform: 'none',
                            borderColor: 'rgba(0, 60, 67, 0.15)',
                            color: BRAND_DARK_BLUE,
                            '&:hover': {
                              borderColor: BRAND_DARK_BLUE,
                              bgcolor: 'rgba(148, 255, 212, 0.05)',
                            },
                          }}
                        >
                          Google
                        </Button>
                        
                        <Button
                          disableElevation
                          fullWidth
                          variant="outlined"
                          onClick={handleFacebookLogin}
                          disabled={loading}
                          startIcon={<FacebookIcon />}
                          sx={{
                            py: 1.25,
                            borderRadius: 2,
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            textTransform: 'none',
                            borderColor: 'rgba(0, 60, 67, 0.15)',
                            color: BRAND_DARK_BLUE,
                            '&:hover': {
                              borderColor: BRAND_DARK_BLUE,
                              bgcolor: 'rgba(148, 255, 212, 0.05)',
                            },
                          }}
                        >
                          Facebook
                        </Button>
                        
                        <Button
                          disableElevation
                          fullWidth
                          variant="outlined"
                          onClick={handleAppleLogin}
                          disabled={loading}
                          startIcon={<AppleIcon />}
                          sx={{
                            py: 1.25,
                            borderRadius: 2,
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            textTransform: 'none',
                            borderColor: 'rgba(0, 60, 67, 0.15)',
                            color: BRAND_DARK_BLUE,
                            '&:hover': {
                              borderColor: BRAND_DARK_BLUE,
                              bgcolor: 'rgba(148, 255, 212, 0.05)',
                            },
                          }}
                        >
                          Apple
                        </Button>
                      </Box>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(0, 60, 67, 0.7)' }}>
                        New to FreshBox?{' '}
                        <Link href="/auth/register" passHref>
                          <Typography
                            component="span"
                            sx={{
                              color: BRAND_DARK_BLUE,
                              fontWeight: 600,
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            Register Now
                          </Typography>
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              )}

              {/* Phone Authentication Form */}
              {authMethod === 'phone' && (
                <Fade in={authMethod === 'phone'} timeout={500}>
                  <Box>
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
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&.Mui-focused fieldset': {
                                borderColor: BRAND_PRIMARY,
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: BRAND_DARK_BLUE,
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon sx={{ color: 'rgba(0, 60, 67, 0.6)' }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        
                        <Button
                        disableElevation
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={loading || !phoneNumber.trim()}
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: '1rem',
                            mb: 2,
                            bgcolor: BRAND_PRIMARY,
                            color: BRAND_DARK_BLUE,
                            '&:hover': {
                              bgcolor: BRAND_DARK_BLUE,
                              color: BRAND_WHITISH_MINT,
                            },
                            boxShadow: `0 4px 14px rgba(148, 255, 212, 0.4)`,
                            '&:disabled': {
                              bgcolor: 'rgba(148, 255, 212, 0.5)',
                              color: 'rgba(0, 60, 67, 0.5)',
                            }
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} sx={{ color: BRAND_DARK_BLUE }} />
                          ) : (
                            'Send Verification Code'
                          )}
                        </Button>
                      </Box>
                    )}
                    
                    {phoneStep === 2 && (
                      <Box component="form" onSubmit={handleVerifyOtp} noValidate>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: '0.95rem',
                              color: 'rgba(0, 60, 67, 0.7)',
                              mb: 1,
                            }}
                          >
                            We've sent a verification code to:
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            sx={{ color: BRAND_DARK_BLUE }}
                          >
                            {phoneNumber}
                          </Typography>
                        </Box>
                        
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="otp"
                          label="6-Digit Code"
                          name="otp"
                          autoFocus
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          inputProps={{ maxLength: 6 }}
                          sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&.Mui-focused fieldset': {
                                borderColor: BRAND_PRIMARY,
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: BRAND_DARK_BLUE,
                            },
                          }}
                        />
                        
                        <Button
                        disableElevation
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={loading || otp.length !== 6}
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: '1rem',
                            mb: 2,
                            bgcolor: BRAND_PRIMARY,
                            color: BRAND_DARK_BLUE,
                            '&:hover': {
                              bgcolor: BRAND_DARK_BLUE,
                              color: BRAND_WHITISH_MINT,
                            },
                            boxShadow: `0 4px 14px rgba(148, 255, 212, 0.4)`,
                            '&:disabled': {
                              bgcolor: 'rgba(148, 255, 212, 0.5)',
                              color: 'rgba(0, 60, 67, 0.5)',
                            }
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} sx={{ color: BRAND_DARK_BLUE }} />
                          ) : (
                            'Verify Code'
                          )}
                        </Button>
                        
                        <Button
                        disableElevation
                          fullWidth
                          startIcon={<ArrowBackIcon sx={{ color: BRAND_DARK_BLUE }} />}
                          onClick={() => setPhoneStep(1)}
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            color: BRAND_DARK_BLUE,
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: 'rgba(148, 255, 212, 0.15)',
                            },
                            textTransform: 'none',
                          }}
                        >
                          Back to Phone Number
                        </Button>
                      </Box>
                    )}
                    
                    {phoneStep === 3 && (
                      <Box component="form" onSubmit={handleSubmitUserInfo} noValidate>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: '0.95rem',
                              color: 'rgba(0, 60, 67, 0.7)',
                              mb: 1,
                            }}
                          >
                            Your phone has been verified! Complete your profile:
                          </Typography>
                        </Box>
                        
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
                          sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&.Mui-focused fieldset': {
                                borderColor: BRAND_PRIMARY
                              }
                            }
                          }}
                        />
                        
                        <Button
                          disableElevation
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
                            bgcolor: BRAND_PRIMARY,
                            color: BRAND_DARK_BLUE,
                            '&:hover': {
                              bgcolor: BRAND_DARK_BLUE,
                              color: BRAND_WHITISH_MINT,
                            },
                            '&:disabled': {
                              bgcolor: 'rgba(148, 255, 212, 0.5)',
                              color: 'rgba(0, 60, 67, 0.5)',
                            }
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} sx={{ color: BRAND_DARK_BLUE }} />
                          ) : (
                            'Complete Registration'
                          )}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Fade>
              )}
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}