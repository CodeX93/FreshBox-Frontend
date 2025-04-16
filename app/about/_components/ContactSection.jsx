'use client'
import React, { useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper 
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../contexts/Theme"; // Update this path to match your project structure

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        ref={ref}
        sx={{ 
          py: 10, 
          backgroundColor: theme.palette.primary.light // Using your theme's light primary color
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" // Using your theme's h2 style
            align="center" 
            gutterBottom 
            sx={{ mb: 6, color: theme.palette.primary.dark }} // Using your theme's dark primary color
          >
            Contact Us
          </Typography>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Grid container spacing={4}>
              {/* Contact Information */}
              <Grid 
                item 
                xs={12} 
                md={5} 
                component={motion.div}
                variants={itemVariants}
              >
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderTop: `4px solid ${theme.palette.primary.main}` // Adding your primary color as accent
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <EmailIcon sx={{ mr: 2, fontSize: 40, color: theme.palette.primary.main }} />
                    <Typography variant="h6">
                      hello@freshboxlaundry.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PhoneIcon sx={{ mr: 2, fontSize: 40, color: theme.palette.primary.main }} />
                    <Typography variant="h6">
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ mr: 2, fontSize: 40, color: theme.palette.primary.main }} />
                    <Typography variant="h6">
                      123 Innovation Street, Tech City, TC 12345
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              {/* Contact Form */}
              <Grid 
                item 
                xs={12} 
                md={7} 
                component={motion.div}
                variants={itemVariants}
              >
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 4,
                    borderTop: `4px solid ${theme.palette.secondary.main}` // Using secondary color for accent
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: theme.palette.primary.main,
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: theme.palette.primary.main,
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: theme.palette.primary.main,
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                        disableElevation
                          type="submit"
                          variant="contained"
                          color="primary" // Using primary color from theme
                          size="large"
                          fullWidth
                          component={motion.button}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          sx={{
                            py: 1.5, // Slightly taller button
                            fontWeight: 'bold'
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}