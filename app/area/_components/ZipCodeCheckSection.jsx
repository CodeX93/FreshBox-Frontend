import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Paper,
  Alert,
  AlertTitle,
  Collapse,
  Zoom,
  Fade,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ConstructionIcon from '@mui/icons-material/Construction';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

// Mock database of service ZIP codes
const MOCK_ZIP_CODES = {
  AVAILABLE: ['10001', '10002', '10003', '10016', '10017', '10018', '10019', '10020', '10022', '10023', '10024'],
  COMING_SOON: ['10004', '10005', '10006', '10007', '10012', '10013', '10014', '10021', '10028'],
  NOT_AVAILABLE: ['10008', '10009', '10010', '10011', '10015', '10025', '10026', '10027', '10029', '10030']
};

const ZipCodeChecker = () => {
  const theme = useTheme();
  const [zipCode, setZipCode] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Reset result when zip code changes
    if (showResult) {
      setShowResult(false);
    }
  }, [zipCode]);

  const handleZipCodeChange = (e) => {
    // Only allow numbers and limit to 5 digits
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 5);
    setZipCode(value);
  };

  const checkZipCode = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (MOCK_ZIP_CODES.AVAILABLE.includes(zipCode)) {
        setCheckResult({
          status: 'available',
          message: 'Yes! We service your area with next-day and same-day options.',
          icon: <CheckCircleOutlineIcon fontSize="large" />,
          color: 'success'
        });
      } else if (MOCK_ZIP_CODES.COMING_SOON.includes(zipCode)) {
        setCheckResult({
          status: 'coming-soon',
          message: "Not yet, but we're expanding to your area soon! Join our waitlist to be notified when we launch.",
          icon: <ConstructionIcon fontSize="large" />,
          color: 'warning'
        });
      } else {
        setCheckResult({
          status: 'not-available',
          message: "Unfortunately, we don't service your area yet. Sign up for our waitlist to help us prioritize expansion.",
          icon: <DoNotDisturbAltIcon fontSize="large" />,
          color: 'error'
        });
      }
      setShowResult(true);
      setLoading(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box 
      sx={{ 
        py: 8,
        backgroundColor: '#fff'
      }}
    >
      <Container maxWidth="md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 2 
              }}
            >
              Check Your ZIP Code
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography 
              variant="h6" 
              align="center" 
              color="text.secondary"
              sx={{ mb: 5, maxWidth: '700px', mx: 'auto' }}
            >
              Enter your ZIP code to see if our laundry service is available in your neighborhood
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                maxWidth: '600px',
                mx: 'auto',
                backgroundColor: theme.palette.grey[50]
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2
              }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="ZIP Code"
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  placeholder="Enter 5-digit ZIP"
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={zipCode.length !== 5 || loading}
                  onClick={checkZipCode}
                  startIcon={<SearchIcon />}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    minWidth: { xs: '100%', sm: 'auto' } 
                  }}
                >
                  {loading ? 'Checking...' : 'Check Availability'}
                </Button>
              </Box>

              <Collapse in={showResult} timeout={500}>
                <Zoom in={showResult} timeout={500}>
                  <Box sx={{ mt: 3 }}>
                    <Alert 
                      severity={checkResult?.color}
                      icon={checkResult?.icon}
                      variant="filled"
                      sx={{ 
                        borderRadius: 2,
                        '& .MuiAlert-icon': {
                          alignItems: 'center'
                        } 
                      }}
                    >
                      <AlertTitle sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                        {checkResult?.status === 'available' ? 'Great News!' : 
                         checkResult?.status === 'coming-soon' ? 'Coming Soon' : 'Not Available Yet'}
                      </AlertTitle>
                      {checkResult?.message}
                    </Alert>
                  </Box>
                </Zoom>
              </Collapse>

              <Fade in={true} timeout={1000}>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Try example ZIP codes: 10001 (Available), 10004 (Coming Soon), 10008 (Not Available)
                  </Typography>
                </Box>
              </Fade>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ZipCodeChecker;