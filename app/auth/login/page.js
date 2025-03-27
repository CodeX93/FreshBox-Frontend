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

// Define brand colors
const BRAND_PRIMARY = '#28ddcd'; // Turquoise
const BRAND_ACCENT = '#e6b012';  // Yellow/Gold

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
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
        backgroundColor: '#f7f9fc',
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
          borderRadius: '50%',
          background: `radial-gradient(circle, ${BRAND_PRIMARY}20, ${BRAND_PRIMARY}05)`,
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
          borderRadius: '50%',
          background: `radial-gradient(circle, ${BRAND_ACCENT}20, ${BRAND_ACCENT}05)`,
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
              boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
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
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: '4px',
              }
            }}
          >
            {/* Colorful top edge */}
            <Box
              sx={{
                height: 6,
                width: '100%',
                background: `${BRAND_PRIMARY}`,
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
                  color: '#2A3342',
                  lineHeight: 1.3,
                }}
              >
                Welcome back!
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '0.9rem' },
                  maxWidth: '80%',
                  mx: 'auto',
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
                  borderRadius: 3,
                  bgcolor: '#f7f9fc',
                  p: 0.5,
                  mb: 2
                }}
              >
                <Button
                  fullWidth
                  onClick={() => handleAuthMethodChange('email')}
                  sx={{
                    py: 1,
                    bgcolor: authMethod === 'email' ? 'white' : 'transparent',
                    color: authMethod === 'email' ? '#2A3342' : 'text.secondary',
                    fontWeight: authMethod === 'email' ? 600 : 500,
                    boxShadow: authMethod === 'email' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    borderRadius: 2.5,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    '&:hover': {
                      bgcolor: authMethod === 'email' ? 'white' : 'rgba(255,255,255,0.6)'
                    }
                  }}
                  startIcon={<EmailIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' } }} />}
                >
                  Email
                </Button>
                <Button
                  fullWidth
                  onClick={() => handleAuthMethodChange('phone')}
                  sx={{
                    py: 1,
                    bgcolor: authMethod === 'phone' ? 'white' : 'transparent',
                    color: authMethod === 'phone' ? '#2A3342' : 'text.secondary',
                    fontWeight: authMethod === 'phone' ? 600 : 500,
                    boxShadow: authMethod === 'phone' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    borderRadius: 2.5,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    '&:hover': {
                      bgcolor: authMethod === 'phone' ? 'white' : 'rgba(255,255,255,0.6)'
                    }
                  }}
                  startIcon={<PhoneIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' } }} />}
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
                    '& .MuiAlert-icon': { alignItems: 'center' }
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
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" sx={{ color: 'text.secondary' }} />
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
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" sx={{ color: 'text.secondary' }} />
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
                    />
                    
                    <Box sx={{ textAlign: 'right', mb: 2 }}>
                      <Link href="/auth/forgot-password" passHref>
                        <Typography
                          component="span"
                          fontSize="0.9rem"
                          fontWeight={500}
                          sx={{
                            color: BRAND_PRIMARY,
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
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
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        mb: 2,
                        bgcolor: BRAND_PRIMARY,
                        '&:hover': {
                          bgcolor: '#20c5b7', // Darker turquoise
                        },
                        boxShadow: `0 4px 14px ${BRAND_PRIMARY}4D`,
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                      ) : (
                        'Log in'
                      )}
                    </Button>
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
                            },
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon color="action" sx={{ color: 'text.secondary' }} />
                              </InputAdornment>
                            ),
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
                            mb: 2,
                            bgcolor: BRAND_PRIMARY,
                            '&:hover': {
                              bgcolor: '#20c5b7', // Darker turquoise
                            },
                            boxShadow: `0 4px 14px ${BRAND_PRIMARY}4D`,
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
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
                              color: 'text.secondary',
                              mb: 1,
                            }}
                          >
                            We've sent a verification code to:
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            sx={{ color: '#2A3342' }}
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
                            },
                          }}
                        />
                        
                        <Button
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
                            '&:hover': {
                              bgcolor: '#20c5b7', // Darker turquoise
                            },
                            boxShadow: `0 4px 14px ${BRAND_PRIMARY}4D`,
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                          ) : (
                            'Verify Code'
                          )}
                        </Button>
                        
                        <Button
                          fullWidth
                          startIcon={<ArrowBackIcon />}
                          onClick={() => setPhoneStep(1)}
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            color: 'text.secondary',
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: 'rgba(0,0,0,0.03)',
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
                              color: 'text.secondary',
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
                            },
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon color="action" sx={{ color: 'text.secondary' }} />
                              </InputAdornment>
                            ),
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
                            bgcolor: BRAND_PRIMARY,
                            '&:hover': {
                              bgcolor: '#20c5b7', // Darker turquoise
                            },
                            boxShadow: `0 4px 14px ${BRAND_PRIMARY}4D`,
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                          ) : (
                            'Complete Registration'
                          )}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Fade>
              )}

              {/* Social Login Divider */}
              
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Typography
    variant="body2"
    sx={{
      color: 'text.secondary',
      px: 1.5,
      mb:2,
      position: 'relative',
      fontWeight:'bold',
      bgcolor: 'white',
      display: 'inline-block',
    }}
  >
    Or Login Using
  </Typography>
</Box>


              {/* Social Login Buttons */}
              <Stack direction="column" spacing={1.5} sx={{ mb: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleGoogleLogin}
                  sx={{
                    py: 1.25,
                    borderRadius: 2,
                    borderColor: 'rgba(0,0,0,0.12)',
                    color: 'text.primary',
                    textTransform: 'none',
                    fontWeight: 500,
                    position: 'relative',
                    pl: 4,
                    justifyContent: 'center',
                    '&:hover': {
                      borderColor: 'rgba(0,0,0,0.26)',
                      bgcolor: 'rgba(0,0,0,0.02)',
                    },
                  }}
                >
                  <GoogleIcon sx={{ 
                    position: 'absolute', 
                    left: 16,
                    fontSize: '1.25rem'
                  }} />
                  Google
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleFacebookLogin}
                  sx={{
                    py: 1.25,
                    borderRadius: 2,
                    borderColor: 'rgba(0,0,0,0.12)',
                    color: 'text.primary',
                    textTransform: 'none',
                    fontWeight: 500,
                    position: 'relative',
                    pl: 4,
                    justifyContent: 'center',
                    '&:hover': {
                      borderColor: 'rgba(0,0,0,0.26)',
                      bgcolor: 'rgba(0,0,0,0.02)',
                    },
                  }}
                >
                  <FacebookIcon sx={{ 
                    position: 'absolute', 
                    left: 16,
                    fontSize: '1.25rem'
                  }} />
                  Facebook
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleAppleLogin}
                  sx={{
                    py: 1.25,
                    borderRadius: 2,
                    borderColor: 'rgba(0,0,0,0.12)',
                    color: 'text.primary',
                    textTransform: 'none',
                    fontWeight: 500,
                    position: 'relative',
                    pl: 4,
                    justifyContent: 'center',
                    '&:hover': {
                      borderColor: 'rgba(0,0,0,0.26)',
                      bgcolor: 'rgba(0,0,0,0.02)',
                    },
                  }}
                >
                  <AppleIcon sx={{ 
                    position: 'absolute', 
                    left: 16,
                    fontSize: '1.25rem'
                  }} />
                  Apple
                </Button>
              </Stack>

              {/* Sign Up Link */}
              <Box
                sx={{
                  textAlign: 'center',
                  bgcolor: 'rgba(0,0,0,0.02)',
                  py: 2,
                  px: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Don't have an account?{' '}
                  <Link href="/auth/register" passHref>
                    <Typography
                      component="span"
                      color={BRAND_PRIMARY}
                      fontWeight={600}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Sign up
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}