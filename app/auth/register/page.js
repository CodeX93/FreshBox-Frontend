"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  StepLabel,
  StepIcon,
  StepConnector,
  styled,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material";
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
  ArrowForward as ArrowForwardIcon,
  VerifiedUser as VerifiedUserIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import ApiServeces from "@/lib/ApiServeces";

// Define brand colors
const BRAND_PRIMARY = "#2E7B5C"; // Turquoise
const BRAND_ACCENT = "#2E7B5C"; // Yellow/Gold

// Custom styled components
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-root`]: {
    top: 10,
  },
  [`&.Mui-active`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage: `linear-gradient(90deg, ${BRAND_PRIMARY} 0%, ${BRAND_PRIMARY} 100%)`,
    },
  },
  [`&.Mui-completed`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage: `linear-gradient(90deg, ${BRAND_PRIMARY} 0%, ${BRAND_PRIMARY} 100%)`,
    },
  },
  [`& .MuiStepConnector-line`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.grey[300],
    borderRadius: 1,
  },
}));

const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[300],
  zIndex: 1,
  color: "#fff",
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: BRAND_PRIMARY,
    boxShadow: `0 0 0 6px ${BRAND_PRIMARY}20`,
  }),
  ...(ownerState.completed && {
    backgroundColor: BRAND_PRIMARY,
  }),
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    >
      {completed ? (
        <CheckIcon style={{ fontSize: 18 }} />
      ) : (
        <div style={{ fontSize: 14 }}>{props.icon}</div>
      )}
    </CustomStepIconRoot>
  );
}

const steps = [
  "Account Details",
  "Email Verification",
  "Personal Info",
  "Finish",
];

export default function SignupPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
    username: "",
    emailOtp: "",
  });

  // UI state
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formReady, setFormReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const { setUser } = useAuth();

  // Set animation on mount
  useEffect(() => {
    setFormReady(true);
  }, []);

  const registerUser = async () => {
    try {
      const res = await ApiServeces.signup(formData);

      if (res?.data?.success) {
        setSuccess("Verification code sent to your email.");
        setUserId(res.data.user._id);
        setError("");
        const token = res.data.token;
        localStorage?.setItem("token", JSON.stringify(token));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSuccess("");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await ApiServeces.verifyEmail({
        otp: formData.emailOtp,
        email: formData.email,
      });

      if (res?.data?.success) {
        setError("");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Verification failed");
    }
  };

  const updateUser = async () => {
    try {
      const res = await ApiServeces.updateUser(userId, {
        username: formData.username,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
      });
      if (res.data.success) {
        setError("");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        const user = res.data.user;
        localStorage?.setItem("user", JSON.stringify(user));
        setUser(user);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Profile update failed");
    }
  };

  const createAccount = async () => {
    router.push("/");
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleNext();
  };

  // Step navigation
  const handleNext = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Validate current step
      if (activeStep === 0) {
        // Validate email and password
        if (!formData.email) {
          throw new Error("Email is required");
        }
        if (!formData.password) {
          throw new Error("Password is required");
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (formData.password.length < 8) {
          throw new Error("Password must be at least 8 characters");
        }
        await registerUser();
      } else if (activeStep === 1) {
        if (!formData.emailOtp || formData.emailOtp.length !== 6) {
          throw new Error("Please enter a valid 6-digit code");
        }
        await verifyOtp();
      } else if (activeStep === 2) {
        if (!formData.name) {
          throw new Error("Full name is required");
        }
        await updateUser();
      } else if (activeStep === 3) {
        await createAccount();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError("");
  };

  const handleAppleSignup = async () => {};

  const handleFacebookSignup = async () => {};

  const handleGoogleSignup = async () => {};

  const handleResendEmailOtp = async () => {
    try {
      setLoading(true);
      const res = await ApiServeces.resendOtp({ email: formData.email });
      if (res.data.success) {
        setSuccess("Verification code resent successfully");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to resend code");
    } finally {
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
                    <EmailIcon sx={{ color: BRAND_PRIMARY }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: BRAND_PRIMARY }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: BRAND_PRIMARY }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
              }}
            />

            <Box
              sx={{
                bgcolor: "rgba(40, 221, 205, 0.08)",
                p: 2,
                borderRadius: 2,
                border: "1px solid rgba(40, 221, 205, 0.2)",
                mb: 3,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                By creating an account, you agree to Fresh Box's{" "}
                <Link href="/terms" passHref>
                  <Typography
                    component="span"
                    color={BRAND_PRIMARY}
                    fontWeight={600}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Terms of Service
                  </Typography>
                </Link>{" "}
                and{" "}
                <Link href="/privacy" passHref>
                  <Typography
                    component="span"
                    color={BRAND_PRIMARY}
                    fontWeight={600}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </Link>
                .
              </Typography>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box component="form" onSubmit={handleSubmit}>
            <Box
              sx={{
                textAlign: "center",
                mb: 4,
                p: 3,
                bgcolor: "rgba(40, 221, 205, 0.08)",
                borderRadius: 3,
              }}
            >
              <VerifiedUserIcon
                sx={{ fontSize: 60, mb: 2, color: BRAND_PRIMARY }}
              />
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Verify Your Email
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 400, mx: "auto" }}
              >
                We've sent a 6-digit verification code to{" "}
                <Typography
                  component="span"
                  fontWeight={600}
                  color="text.primary"
                >
                  {formData.email}
                </Typography>
              </Typography>
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              id="emailOtp"
              label="Verification Code"
              name="emailOtp"
              autoFocus
              value={formData.emailOtp}
              onChange={handleInputChange}
              placeholder="Enter 6-digit code"
              inputProps={{
                maxLength: 6,
                style: {
                  fontSize: "1.2rem",
                  letterSpacing: "0.5rem",
                  textAlign: "center",
                  fontWeight: 600,
                },
              }}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
              }}
            />

            <Button
              disableElevation
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || formData.emailOtp.length !== 6}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "1rem",
                mb: 2.5,
                bgcolor: BRAND_PRIMARY,
                "&:hover": {
                  bgcolor: "#20c5b7",
                },
                "&.Mui-disabled": {
                  bgcolor: "rgba(40, 221, 205, 0.5)",
                  color: "white",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Verify Code"
              )}
            </Button>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Didn't receive the code?{" "}
                <Button
                  disableElevation
                  color="primary"
                  size="small"
                  onClick={handleResendEmailOtp}
                  disabled={loading}
                  sx={{
                    fontWeight: 600,
                    color: BRAND_PRIMARY,
                    "&:hover": {
                      bgcolor: "rgba(40, 221, 205, 0.08)",
                    },
                  }}
                >
                  Resend Code
                </Button>
              </Typography>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Complete your profile with the following information:
            </Typography>

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
                    <PersonIcon sx={{ color: BRAND_PRIMARY }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
              }}
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
                    <UsernameIcon sx={{ color: BRAND_PRIMARY }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
              }}
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
                    <PhoneIcon sx={{ color: BRAND_PRIMARY }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: BRAND_PRIMARY,
                },
              }}
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "rgba(40, 221, 205, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <VerifiedUserIcon sx={{ fontSize: 40, color: BRAND_PRIMARY }} />
              </Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Review Your Information
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 500, textAlign: "center" }}
              >
                Please verify that your information is correct before creating
                your account.
              </Typography>
            </Box>

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 2,
                mb: 3,
                borderColor: "rgba(0,0,0,0.1)",
                bgcolor: "rgba(0,0,0,0.02)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={4} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {formData.email}
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        bgcolor: "success.light",
                        color: "white",
                        borderRadius: 5,
                        fontSize: "0.7rem",
                        py: 0.2,
                        px: 0.8,
                        ml: 1,
                        fontWeight: 500,
                      }}
                    >
                      <CheckIcon sx={{ fontSize: "0.8rem", mr: 0.3 }} />{" "}
                      Verified
                    </Box>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1.5 }} />
                </Grid>

                <Grid item xs={4} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Full Name:
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Typography variant="body2" fontWeight={600}>
                    {formData.name}
                  </Typography>
                </Grid>

                {formData.username && (
                  <>
                    <Grid item xs={4} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Username:
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9}>
                      <Typography variant="body2" fontWeight={600}>
                        {formData.username}
                      </Typography>
                    </Grid>
                  </>
                )}

                {formData.phoneNumber && (
                  <>
                    <Grid item xs={4} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Phone:
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9}>
                      <Typography variant="body2" fontWeight={600}>
                        {formData.phoneNumber}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>

            <Box
              sx={{
                textAlign: "center",
                bgcolor: "rgba(40, 221, 205, 0.08)",
                p: 2,
                borderRadius: 2,
                border: "1px dashed rgba(40, 221, 205, 0.3)",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                You can update your profile information after creating your
                account.
              </Typography>
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f9fc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -150,
          right: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND_PRIMARY}20, ${BRAND_PRIMARY}05)`,
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND_ACCENT}20, ${BRAND_ACCENT}05)`,
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          py: 0,
        }}
      >
        <Fade in={formReady} timeout={800}>
          <Paper
            elevation={isMobile ? 2 : 4}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              mx: "auto",
              backgroundColor: "white",
              position: "relative",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: "4px",
              },
            }}
          >
            {/* Colorful top edge */}
            <Box
              sx={{
                height: 6,
                width: "100%",
                background: `${BRAND_PRIMARY}`,
              }}
            />

            {/* Header */}
            <Box
              sx={{
                pt: { xs: 3, sm: 4 },
                pb: { xs: 2, sm: 3 },
                px: { xs: 3, sm: 4, md: 5 },
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                fontWeight={800}
                gutterBottom
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  color: "#2A3342",
                  lineHeight: 1.3,
                }}
              >
                Create Your Account
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "0.9rem" },
                  maxWidth: "80%",
                  mx: "auto",
                }}
              >
                Join Fresh Box to enjoy premium laundry services
              </Typography>
            </Box>

            {/* Stepper */}
            <Box
              sx={{
                width: "100%",
                px: { xs: 2, sm: 3, md: 5 },
                mb: { xs: 2, sm: 3 },
              }}
            >
              <Stepper
                activeStep={activeStep}
                alternativeLabel={!isMobile}
                orientation={isMobile ? "vertical" : "horizontal"}
                connector={<CustomStepConnector />}
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={CustomStepIcon}
                      sx={{
                        "& .MuiStepLabel-label": {
                          color:
                            activeStep === index
                              ? BRAND_PRIMARY
                              : "text.secondary",
                          fontWeight: activeStep === index ? 600 : 400,
                        },
                      }}
                    >
                      {!isMobile && label}
                    </StepLabel>
                    {isMobile && (
                      <Typography
                        variant="body2"
                        sx={{
                          mt: -1.5,
                          color:
                            activeStep === index
                              ? BRAND_PRIMARY
                              : "text.secondary",
                          fontWeight: activeStep === index ? 600 : 400,
                        }}
                      >
                        {label}
                      </Typography>
                    )}
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Form Content */}
            <Box
              sx={{
                px: { xs: 3, sm: 4, md: 5 },
                pb: { xs: 3, sm: 4 },
              }}
            >
              {/* Alert Messages */}
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    "& .MuiAlert-icon": { alignItems: "center" },
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
                    "& .MuiAlert-icon": { alignItems: "center" },
                  }}
                >
                  {success}
                </Alert>
              )}

              {/* Form Steps Content */}
              {activeStep === 1 ? (
                getStepContent(activeStep)
              ) : (
                <Fade in={true} timeout={500}>
                  <form onSubmit={handleSubmit}>
                    {getStepContent(activeStep)}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: { xs: 3, sm: 4 },
                        pt: { xs: 2, sm: 3 },
                        borderTop: "1px solid",
                        borderColor: "rgba(0,0,0,0.06)",
                      }}
                    >
                      <Button
                        disableElevation
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                          visibility: activeStep === 0 ? "hidden" : "visible",
                          borderColor: "rgba(0,0,0,0.15)",
                          color: "text.secondary",
                          "&:hover": {
                            borderColor: "rgba(0,0,0,0.25)",
                            bgcolor: "rgba(0,0,0,0.03)",
                          },
                          borderRadius: 2,
                          py: 1.2,
                        }}
                      >
                        Back
                      </Button>

                      {activeStep === steps.length - 1 ? (
                        <Button
                          disableElevation
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={loading}
                          sx={{
                            py: 1.5,
                            px: { xs: 3, sm: 4 },
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            bgcolor: BRAND_PRIMARY,
                            "&:hover": {
                              bgcolor: "#20c5b7",
                            },
                            boxShadow: `0 4px 14px ${BRAND_PRIMARY}4D`,
                          }}
                        >
                          {loading ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "white" }}
                            />
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      ) : (
                        <Button
                          disableElevation
                          type="submit"
                          variant="contained"
                          color="primary"
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            py: 1.5,
                            px: { xs: 3, sm: 4 },
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            bgcolor: BRAND_PRIMARY,
                            "&:hover": {
                              bgcolor: "#20c5b7",
                            },
                            boxShadow: `0 4px 14px ${BRAND_PRIMARY}4D`,
                          }}
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </form>
                </Fade>
              )}

              {/* Social Signup Options - Only show on first step */}
              {activeStep === 0 && (
                <Box sx={{ mt: { xs: 1, sm: 1 } }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      px: 1.5,
                      position: "relative",
                      bgcolor: "white",
                      fontWeight: 500,
                      display: "inline-block",
                    }}
                  >
                    OR SIGN UP WITH
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "row", gap: 1.0 }}>
                    <Button
                      disableElevation
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={handleGoogleSignup}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        borderColor: "rgba(0,0,0,0.12)",
                        color: "text.primary",
                        textTransform: "none",
                        fontWeight: 500,
                        position: "relative",
                        pl: 4,
                        justifyContent: "center",
                        "&:hover": {
                          borderColor: "rgba(0,0,0,0.26)",
                          bgcolor: "rgba(0,0,0,0.02)",
                        },
                      }}
                    >
                      <GoogleIcon
                        sx={{
                          position: "absolute",
                          left: 16,
                          fontSize: "1.25rem",
                        }}
                      />
                      {isMobile ? "Continue with Google" : "Google"}
                    </Button>
                    <Button
                      disableElevation
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={handleFacebookSignup}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        borderColor: "rgba(0,0,0,0.12)",
                        color: "text.primary",
                        textTransform: "none",
                        fontWeight: 500,
                        position: "relative",
                        pl: 4,
                        justifyContent: "center",
                        "&:hover": {
                          borderColor: "rgba(0,0,0,0.26)",
                          bgcolor: "rgba(0,0,0,0.02)",
                        },
                      }}
                    >
                      <FacebookIcon
                        sx={{
                          position: "absolute",
                          left: 16,
                          fontSize: "1.25rem",
                        }}
                      />
                      {isMobile ? "Continue with Facebook" : "Facebook"}
                    </Button>
                    <Button
                      disableElevation
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={handleAppleSignup}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        borderColor: "rgba(0,0,0,0.12)",
                        color: "text.primary",
                        textTransform: "none",
                        fontWeight: 500,
                        position: "relative",
                        pl: 4,
                        justifyContent: "center",
                        "&:hover": {
                          borderColor: "rgba(0,0,0,0.26)",
                          bgcolor: "rgba(0,0,0,0.02)",
                        },
                      }}
                    >
                      <AppleIcon
                        sx={{
                          position: "absolute",
                          left: 16,
                          fontSize: "1.25rem",
                        }}
                      />
                      {isMobile ? "Continue with Apple" : "Apple"}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Footer */}
            <Box
              sx={{
                p: { xs: 2, sm: 2.5 },
                bgcolor: "rgba(0,0,0,0.02)",
                borderTop: "1px solid",
                borderColor: "rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link href="/auth/login">
                  <Typography
                    component="span"
                    sx={{
                      color: BRAND_PRIMARY,
                      fontWeight: 600,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
