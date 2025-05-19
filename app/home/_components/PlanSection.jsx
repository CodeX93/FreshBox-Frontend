'use client';
import React, { useState } from 'react';
import {theme} from "../../../contexts/Theme"
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
  Typography,
  Fade,
  Zoom,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  useMediaQuery,
  Collapse,
  IconButton,
  Dialog
} from '@mui/material';

import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

import PaymentPage from '../../plans/PaymentPage';

const PlanCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'planType',
})(({ planType, theme }) => ({
  backgroundColor: planType === 'premium' ? '#94FFD4' : '#94FFD4',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  overflow: 'visible',
  // boxShadow: planType === 'premium'
  //   ? '0 8px 24px rgba(148, 255, 212, 0.35)'
  //   : '0 4px 12px rgba(0, 60, 67, 0.1)',
  // '&:hover': {
  //   transform: 'translateY(-8px)',
  //   boxShadow: planType === 'premium'
  //     ? '0 12px 28px rgba(148, 255, 212, 0.5)'
  //     : '0 8px 20px rgba(0, 60, 67, 0.2)',
  // }
}));


const PopularTag = styled(Chip)(() => ({
  position: 'absolute',
  top: -12,
  right: 24,
  backgroundColor: '#94FFD4',
  color: '#003C43',
  fontWeight: 'bold',
}));

const HomePlansSection = () => {
  
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedPlanType, setSelectedPlanType] = useState('monthly');
  const { plans, user } = useAuth();
  const [expandedPlans, setExpandedPlans] = useState({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  
  // Function to toggle expanded state for each plan
  const handleExpandClick = (planId) => {
    setExpandedPlans(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  const handlePlanTypeChange = (event) => {
    setSelectedPlanType(event.target.value);
  };

  const getPrice = (pricing) => pricing[selectedPlanType] || null;

  const handlePlanClick = (plan) => {
    const price = getPrice(plan.pricing);
    setSelectedPlan(plan);
    setSelectedPrice(price);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  // Calculate which billing cycle offers the best value for each plan
  const getBestValueBilling = (pricing) => {
    if (!pricing) return null;
    
    const cycles = Object.keys(pricing);
    if (cycles.length <= 1) return null;
    
    let bestCycle = null;
    let bestSavings = 0;
    const monthlyPrice = pricing.monthly;
    
    if (!monthlyPrice) return null;
    
    cycles.forEach(cycle => {
      if (cycle === 'monthly') return;
      
      const cyclePrice = pricing[cycle];
      let effectiveMonthlyPrice;
      
      switch(cycle) {
        case 'biweekly':
          effectiveMonthlyPrice = cyclePrice * 2;
          break;
        case 'quarterly':
          effectiveMonthlyPrice = cyclePrice / 3;
          break;
        case 'annual':
          effectiveMonthlyPrice = cyclePrice / 12;
          break;
        default:
          return;
      }
      
      const savings = 1 - (effectiveMonthlyPrice / monthlyPrice);
      
      if (savings > bestSavings) {
        bestSavings = savings;
        bestCycle = cycle;
      }
    });
    
    if (bestSavings > 0.05) { // Only show if savings are significant (>5%)
      return {
        cycle: bestCycle,
        savings: Math.round(bestSavings * 100)
      };
    }
    
    return null;
  };

  return (
    <>
      <Box 
        sx={{ 
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: '#E3FEF7',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={600}>
            <Box sx={{ 
              p: 4,
              borderRadius: 2,
              background: `linear-gradient(135deg, rgba(148, 255, 212, 0.2) 0%, rgba(227, 254, 247, 0.9) 100%)` 
            }}>
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                align="center" 
                gutterBottom 
                sx={{ 
                  mb: 6, 
                  fontWeight: 'bold',
                  color: '#003C43' 
                }}
              >
                Pricing Plans
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    name="planType"
                    value={selectedPlanType}
                    onChange={handlePlanTypeChange}
                  >
                    {['biweekly', 'monthly', 'quarterly', 'annual'].map((type) => (
                      <FormControlLabel
                        key={type}
                        value={type}
                        control={<Radio sx={{
                          color: '#003C43',
                          '&.Mui-checked': { color: '#003C43' },
                        }} />}
                        label={type.charAt(0).toUpperCase() + type.slice(1)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>

              <Grid container spacing={4}>
                {plans.map((plan) => {
                  const price = getPrice(plan.pricing);
                  const isExpanded = expandedPlans[plan.id] || false;
                  const bestValue = getBestValueBilling(plan.pricing);
                  
                  // Calculate how many features to show when collapsed
                  const collapsedFeatureCount = 3;
                  const visibleFeatures = plan.features.slice(0, collapsedFeatureCount);
                  const hiddenFeatures = plan.features.slice(collapsedFeatureCount);
                  
                  return (
                    <Grid item xs={12} md={4} key={plan.id}>
                      <Zoom in={true} timeout={800}>
                        <PlanCard planType={plan.id} >
                          {plan.popular && <PopularTag label="Most Popular" sx={{ bgcolor: '#94FFD4' }} />}
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h4" align="center" gutterBottom>
                              {plan.name}
                            </Typography>

                            <Box sx={{ textAlign: 'center', my: 3 }}>
                              {price ? (
                                <>
                                  <Typography variant="h3" sx={{ color: '#003C43' }}>
                                    ${price}
                                  </Typography>
                                  <Typography variant="subtitle1" color="text.secondary">
                                    per {selectedPlanType === 'biweekly' ? '2 weeks' : selectedPlanType}
                                  </Typography>
                                  {selectedPlanType === 'monthly' && bestValue && (
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                      Save {bestValue.savings}% with {bestValue.cycle} billing
                                    </Typography>
                                  )}
                                  {(selectedPlanType === 'annual' || selectedPlanType === 'quarterly') && plan.id !== 'basic' && (
                                    <Chip
                                      label={`Save ${selectedPlanType === 'annual' ? '20%' : '13%'}`}
                                      sx={{
                                        mt: 1,
                                        backgroundColor: '#94FFD4',
                                        color: '#003C43'
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
                              {/* Always visible features */}
                              {visibleFeatures.map((feature, index) => (
                                <ListItem key={index} sx={{ py: 0.5 }}>
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    {feature.icon === 'star' ? (
                                      <StarIcon sx={{ color: feature.included ? '#94FFD4' : 'text.disabled' }} />
                                    ) : (
                                      <CheckIcon sx={{ color: feature.included ? '#94FFD4' : 'text.disabled' }} />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={feature.text}
                                    primaryTypographyProps={{
                                      fontWeight: feature.icon === 'star' ? 'bold' : 'normal',
                                      color: feature.included ? 'text.primary' : 'text.secondary',
                                      fontSize: '0.95rem'
                                    }}
                                  />
                                </ListItem>
                              ))}
                              
                              {/* Expandable features */}
                              {hiddenFeatures.length > 0 && (
                                <>
                                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                    {hiddenFeatures.map((feature, index) => (
                                      <ListItem key={`hidden-${index}`} sx={{ py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                          {feature.icon === 'star' ? (
                                            <StarIcon sx={{ color: feature.included ? '#94FFD4' : 'text.disabled' }} />
                                          ) : (
                                            <CheckIcon sx={{ color: feature.included ? '#94FFD4' : 'text.disabled' }} />
                                          )}
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={feature.text}
                                          primaryTypographyProps={{
                                            fontWeight: feature.icon === 'star' ? 'bold' : 'normal',
                                            color: feature.included ? 'text.primary' : 'text.secondary',
                                            fontSize: '0.95rem'
                                          }}
                                        />
                                      </ListItem>
                                    ))}
                                  </Collapse>
                                  
                                  {/* Expand/Collapse button */}
                                  <Box sx={{ textAlign: 'center', mt: 1 }}>
                                    <Button
                                      size="small"
                                      onClick={() => handleExpandClick(plan.id)}
                                      endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                      sx={{ color: '#003C43' }}
                                    >
                                      {isExpanded ? 'Show Less' : 'Show More'}
                                    </Button>
                                  </Box>
                                </>
                              )}
                            </List>
                          </CardContent>
                          <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                            <Button
                              disableElevation
                              variant={user?.plan?.planName === plan.name ? "outlined" : "contained"}
                              size="large"
                              disabled={!price || user?.plan?.planName === plan.name}
                              onClick={() => handlePlanClick(plan)}
                              sx={{
                                borderColor: '#003C43',
                                bgcolor: user?.plan?.planName === plan.name ? 'transparent' : '#003C43',
                                color: user?.plan?.planName === plan.name ? '#003C43' : '#E3FEF7',
                                '&:hover': { 
                                  bgcolor: user?.plan?.planName === plan.name ? 'rgba(148, 255, 212, 0.2)' : '#00292D',
                                  borderColor: '#003C43' 
                                }
                              }}
                            >
                              {user?.plan?.planName === plan.name ? "Current Plan" : "Get Started"}
                            </Button>
                          </CardActions>
                        </PlanCard>
                      </Zoom>
                    </Grid>
                  );
                })}
              </Grid>

              <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Need a custom solution for your business?
                </Typography>
                <Button
                disabled
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#003C43',
                    color: '#003C43',
                    '&:hover': { borderColor: '#003C43', bgcolor: 'rgba(148, 255, 212, 0.2)' }
                  }}
                  onClick={() => router.push('/contact')}
                >
                  Contact Us for Enterprise Plans
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Payment Dialog */}
      <Dialog 
        open={isPaymentModalOpen} 
        onClose={closePaymentModal}
        fullScreen={isMobile}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ position: 'absolute', right: 8, top: 8, zIndex: 2 }}>
          <IconButton onClick={closePaymentModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedPlan && selectedPrice && (
          <PaymentPage 
            plan={selectedPlan} 
            price={selectedPrice}
            onComplete={closePaymentModal}
          />
        )}
      </Dialog>
    </>
  );
};

export default HomePlansSection;