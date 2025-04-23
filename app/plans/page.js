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
import Navbar from '../../components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

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
  const {plans} = useAuth()

  const handlePlanTypeChange = (event) => {
    setSelectedPlanType(event.target.value);
  };

  const handleBackClick = () => {
    router.push('/');
  };



  // Helper function to get current price based on selected plan type
  const getPrice = (pricing) => {
    return pricing[selectedPlanType] || null;
  };

  // Add-ons data
  const addons = [
    {
      title: 'Extra Items',
      description: '$1/item (lower rates for Premium and Enterprise)'
    },
    {
      title: 'Same-day Service',
      description: '$5 surcharge for non-Enterprise members'
    },
    {
      title: 'Specialty Cleaning',
      description: '$2 per item (delicates, down items)'
    },
    {
      title: 'Stain Treatment',
      description: '$3 per item'
    }
  ];

  return (
    <>
      {/* <Navbar light={false}/> */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in={true} timeout={600}>
          <Box>
            <Button
              disableElevation
              startIcon={<ArrowBackIcon />}
              onClick={handleBackClick}
              sx={{ mb: 4, color: '#2E7B5C', borderColor: '#2E7B5C' }}
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
                      color: '#2E7B5C',
                      '&.Mui-checked': {
                        color: '#2E7B5C',
                      },
                    }} />}
                    label="Biweekly"
                  />
                  <FormControlLabel
                    value="monthly"
                    control={<Radio sx={{ 
                      color: '#2E7B5C',
                      '&.Mui-checked': {
                        color: '#2E7B5C',
                      },
                    }} />}
                    label="Monthly"
                  />
                  <FormControlLabel
                    value="quarterly"
                    control={<Radio sx={{ 
                      color: '#2E7B5C',
                      '&.Mui-checked': {
                        color: '#2E7B5C',
                      },
                    }} />}
                    label="Quarterly"
                  />
                  <FormControlLabel
                    value="annual"
                    control={<Radio sx={{ 
                      color: '#2E7B5C',
                      '&.Mui-checked': {
                        color: '#2E7B5C',
                      },
                    }} />}
                    label="Annual"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Grid container spacing={4}>
              {plans.map((plan) => (
                <Grid item xs={12} md={4} key={plan.id}>
                  <Zoom in={true} timeout={800} style={{ transitionDelay: plan.delay }}>
                    <PlanCard planType={plan.id}>
                      {plan.popular && <PopularTag label="Most Popular" sx={{bgcolor:'#2E7B5C'}} />}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" component="h2" gutterBottom align="center">
                          {plan.name}
                        </Typography>

                        <Box sx={{ textAlign: 'center', my: 3 }}>
                          {getPrice(plan.pricing) ? (
                            <>
                              <Typography variant="h3" component="p" sx={{ color: '#2E7B5C' }}>
                                ${getPrice(plan.pricing)}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary">
                                per {selectedPlanType === 'biweekly' ? '2 weeks' : selectedPlanType}
                              </Typography>
                              {(selectedPlanType === 'annual' || selectedPlanType === 'quarterly') && plan.id !== 'basic' && (
                                <Chip 
                                  label={`Save ${selectedPlanType === 'annual' ? '20%' : '13%'}`} 
                                  sx={{ 
                                    mt: 1, 
                                    backgroundColor: '#2E7B5C',
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
                          {plan.features.map((feature, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                {feature.icon === 'star' ? (
                                  <StarIcon sx={{ color: feature.included ? '#28ddcd' : 'disabled' }} />
                                ) : (
                                  <CheckIcon sx={{ color: feature.included ? '#28ddcd' : 'disabled' }} />
                                )}
                              </ListItemIcon>
                              <ListItemText 
                                primary={feature.text} 
                                primaryTypographyProps={{ 
                                  fontWeight: feature.icon === 'star' ? 'bold' : 'normal',
                                  color: feature.included ? 'text.primary' : 'text.secondary'
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                        <Button 
                          disableElevation
                          variant={'outlined'} 
                          size="large"
                          disabled={!getPrice(plan.pricing)}
                          sx={{ 
                            borderColor: '#2E7B5C', 
                            color:  '#2E7B5C',
                            backgroundColor: 'transparent',
                            '&:hover': {
                              borderColor: '#2E7B5C',
                            
                            }
                          }}
                        >
                          Select {plan.name}
                        </Button>
                      </CardActions>
                    </PlanCard>
                  </Zoom>
                </Grid>
              ))}
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
                  {addons.map((addon, index) => (
                    <Grid item xs={12} md={3} key={index}>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {addon.title}
                        </Typography>
                        <Typography variant="body2">
                          {addon.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Fade>
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default PlansPage;