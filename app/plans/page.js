// app/plans/page.js
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Fade,
  Zoom,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Custom styled components
const PlanCard = styled(Card)(({ theme, planType }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  overflow: 'visible',
  boxShadow: planType === 'premium' ? 
    '0 8px 24px rgba(40, 221, 205, 0.25)' : 
    '0 4px 12px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: planType === 'premium' ? 
      '0 12px 28px rgba(40, 221, 205, 0.35)' : 
      '0 8px 20px rgba(0, 0, 0, 0.15)',
  }
}));

const PopularTag = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  right: 24,
  backgroundColor: '#28ddcd',
  color: 'white',
  fontWeight: 'bold',
}));

const PlansPage = () => {
  const router = useRouter();
  const [selectedPlanType, setSelectedPlanType] = useState('monthly');

  const handlePlanTypeChange = (event) => {
    setSelectedPlanType(event.target.value);
  };

  const handleBackClick = () => {
    router.push('/');
  };

  // Plan pricing configurations
  const planPricing = {
    basic: {
      biweekly: 20,
      monthly: 30,
      quarterly: null,
      annual: null,
    },
    premium: {
      biweekly: 35,
      monthly: 50,
      quarterly: 130,
      annual: 480,
    },
    enterprise: {
      biweekly: null,
      monthly: 100,
      quarterly: 275,
      annual: 1000,
    },
  };

  // Helper function to get current price based on selected plan type
  const getPrice = (planType) => {
    return planPricing[planType][selectedPlanType] || null;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Fade in={true} timeout={600}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            sx={{ mb: 4, color: '#28ddcd', borderColor: '#28ddcd' }}
            variant="outlined"
          >
            Back
          </Button>

          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
            Choose Your Plan
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                name="planType"
                value={selectedPlanType}
                onChange={handlePlanTypeChange}
              >
                <FormControlLabel
                  value="biweekly"
                  control={<Radio sx={{ 
                    color: '#28ddcd',
                    '&.Mui-checked': {
                      color: '#28ddcd',
                    },
                  }} />}
                  label="Biweekly"
                />
                <FormControlLabel
                  value="monthly"
                  control={<Radio sx={{ 
                    color: '#28ddcd',
                    '&.Mui-checked': {
                      color: '#28ddcd',
                    },
                  }} />}
                  label="Monthly"
                />
                <FormControlLabel
                  value="quarterly"
                  control={<Radio sx={{ 
                    color: '#28ddcd',
                    '&.Mui-checked': {
                      color: '#28ddcd',
                    },
                  }} />}
                  label="Quarterly"
                />
                <FormControlLabel
                  value="annual"
                  control={<Radio sx={{ 
                    color: '#28ddcd',
                    '&.Mui-checked': {
                      color: '#28ddcd',
                    },
                  }} />}
                  label="Annual"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Grid container spacing={4}>
            {/* Basic Plan */}
            <Grid item xs={12} md={4}>
              <Zoom in={true} timeout={800} style={{ transitionDelay: '100ms' }}>
                <PlanCard planType="basic">
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" component="h2" gutterBottom align="center">
                      Basic
                    </Typography>

                    <Box sx={{ textAlign: 'center', my: 3 }}>
                      {getPrice('basic') ? (
                        <>
                          <Typography variant="h3" component="p" sx={{ color: '#28ddcd' }}>
                            ${getPrice('basic')}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            per {selectedPlanType === 'biweekly' ? '2 weeks' : selectedPlanType}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="subtitle1" color="error">
                          Not available for {selectedPlanType} billing
                        </Typography>
                      )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Standard laundry service (wash and fold)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Limited number of items per month (up to 40 items/month)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Basic customer support (email or chat)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon color="disabled" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="No priority service or discounts" 
                          sx={{ color: 'text.secondary' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon color="disabled" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="No reward points accumulation" 
                          sx={{ color: 'text.secondary' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon color="disabled" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="No free trial" 
                          sx={{ color: 'text.secondary' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button 
                      variant="outlined" 
                      size="large"
                      disabled={!getPrice('basic')}
                      sx={{ 
                        borderColor: '#28ddcd', 
                        color: '#28ddcd',
                        '&:hover': {
                          borderColor: '#1eb3a6',
                          backgroundColor: 'rgba(40, 221, 205, 0.04)'
                        }
                      }}
                    >
                      Select Basic
                    </Button>
                  </CardActions>
                </PlanCard>
              </Zoom>
            </Grid>

            {/* Premium Plan */}
            <Grid item xs={12} md={4}>
              <Zoom in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                <PlanCard planType="premium">
                  <PopularTag label="Most Popular" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" component="h2" gutterBottom align="center">
                      Premium
                    </Typography>

                    <Box sx={{ textAlign: 'center', my: 3 }}>
                      {getPrice('premium') ? (
                        <>
                          <Typography variant="h3" component="p" sx={{ color: '#28ddcd' }}>
                            ${getPrice('premium')}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            per {selectedPlanType === 'biweekly' ? '2 weeks' : selectedPlanType}
                          </Typography>
                          {selectedPlanType === 'annual' && (
                            <Chip 
                              label="Save 20%" 
                              sx={{ 
                                mt: 1, 
                                backgroundColor: '#2db799',
                                color: 'white'
                              }}
                              size="small" 
                            />
                          )}
                        </>
                      ) : (
                        <Typography variant="subtitle1" color="error">
                          Not available for {selectedPlanType} billing
                        </Typography>
                      )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Standard and express laundry options" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Up to 75 items/month" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Discounted rates for additional items ($1/item)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Priority service (next-day delivery)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Reward points system (1 point per $1)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="10% discount on additional services" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Access to exclusive promotions" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="7-day free trial for new users" />
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button 
                      variant="contained" 
                      size="large" 
                      disabled={!getPrice('premium')}
                      sx={{ 
                        backgroundColor: '#28ddcd',
                        '&:hover': {
                          backgroundColor: '#1eb3a6'
                        }
                      }}
                    >
                      Select Premium
                    </Button>
                  </CardActions>
                </PlanCard>
              </Zoom>
            </Grid>

            {/* Enterprise Plan */}
            <Grid item xs={12} md={4}>
              <Zoom in={true} timeout={800} style={{ transitionDelay: '300ms' }}>
                <PlanCard planType="enterprise">
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" component="h2" gutterBottom align="center">
                      Enterprise
                    </Typography>

                    <Box sx={{ textAlign: 'center', my: 3 }}>
                      {getPrice('enterprise') ? (
                        <>
                          <Typography variant="h3" component="p" sx={{ color: '#28ddcd' }}>
                            ${getPrice('enterprise')}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            per {selectedPlanType === 'biweekly' ? '2 weeks' : selectedPlanType}
                          </Typography>
                          {selectedPlanType === 'annual' && (
                            <Chip 
                              label="Save 20%" 
                              sx={{ 
                                mt: 1, 
                                backgroundColor: '#2db799',
                                color: 'white'
                              }}
                              size="small" 
                            />
                          )}
                        </>
                      ) : (
                        <Typography variant="subtitle1" color="error">
                          Not available for {selectedPlanType} billing
                        </Typography>
                      )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <StarIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Unlimited laundry services" primaryTypographyProps={{ fontWeight: 'bold' }} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Customizable service limits" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Premium customer support (dedicated manager)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Priority service (same-day guarantee)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Discounted rates for bulk laundry" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Advanced reward points (2 points per $1)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="14-day free trial for new users" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Free delivery and pickup" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="15% discount on additional services" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon sx={{ color: '#28ddcd' }} />
                        </ListItemIcon>
                        <ListItemText primary="Access to exclusive promotions and events" />
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button 
                      variant="outlined" 
                      size="large"
                      disabled={!getPrice('enterprise')}
                      sx={{ 
                        borderColor: '#28ddcd', 
                        color: '#28ddcd',
                        '&:hover': {
                          borderColor: '#1eb3a6',
                          backgroundColor: 'rgba(40, 221, 205, 0.04)'
                        }
                      }}
                    >
                      Select Enterprise
                    </Button>
                  </CardActions>
                </PlanCard>
              </Zoom>
            </Grid>
          </Grid>

          <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mt: 6, 
                bgcolor: 'rgba(40, 221, 205, 0.05)', 
                borderRadius: 2 
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Available Add-ons
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Extra Items
                    </Typography>
                    <Typography variant="body2">
                      $1/item (lower rates for Premium and Enterprise)
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Same-day Service
                    </Typography>
                    <Typography variant="body2">
                      $5 surcharge for non-Enterprise members
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Specialty Cleaning
                    </Typography>
                    <Typography variant="body2">
                      $2 per item (delicates, down items)
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Stain Treatment
                    </Typography>
                    <Typography variant="body2">
                      $3 per item
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        </Box>
      </Fade>
    </Container>
  );
};

export default PlansPage;