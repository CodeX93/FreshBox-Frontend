'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Chip,
  Divider,
  Paper,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const ServiceCard = ({ service, handleAddToCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation variants
  const featureItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 15, scale: 1.1 },
    transition: { duration: 0.3 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        elevation={2} 
        sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          '&:hover': {
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            borderColor: theme.palette.primary.main
          },
          position: 'relative'
        }}
      >
        {/* Service type tag */}
        <Chip 
          label={service.category || "Service"}
          size="small"
          icon={<LocalOfferIcon />}
          sx={{ 
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid',
            borderColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            fontWeight: 600,
            backdropFilter: 'blur(4px)',
            '& .MuiChip-icon': {
              color: theme.palette.primary.main
            }
          }}
        />

        <Grid container>
          {/* Image Section */}
          <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
            <Box sx={{ position: 'relative', height: { xs: 220, md: '100%' } }}>
              <CardMedia
                component="img"
                image={service.image || "/placeholder-service.jpg"}
                alt={service.title}
                sx={{ 
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              
              {/* Overlay gradient */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                  display: { xs: 'block', md: 'none' }
                }}
              />
              
              {/* Mobile price banner */}
              {isMobile && (
                <Box 
                  sx={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      color: 'white',
                      textShadow: '0 1px 3px rgba(0,0,0,0.4)'
                    }}
                  >
                    £{service.price.toFixed(2)} {service.unit}
                  </Typography>
                  
                  <Chip 
                    label="Best Seller" 
                    size="small"
                    sx={{ 
                      bgcolor: theme.palette.secondary.main,
                      color: 'white',
                      fontWeight: 600,
                      visibility: service.bestSeller ? 'visible' : 'hidden'
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
          
          {/* Content Section */}
          <Grid item xs={12} md={8}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              {/* Header with title, price and icon */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                mb: 2,
                gap: { xs: 1, sm: 0 }
              }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800, 
                        color: theme.palette.primary.dark,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                      }}
                    >
                      {service.title}
                    </Typography>
                    
                    {!isMobile && service.bestSeller && (
                      <Chip 
                        label="Best Seller" 
                        size="small"
                        sx={{ 
                          ml: 2,
                          bgcolor: theme.palette.secondary.main,
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    )}
                  </Box>
                  
                  {!isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700, 
                          color: theme.palette.primary.main,
                          mr: 1
                        }}
                      >
                        £{service.price.toFixed(2)} {service.unit}
                      </Typography>
                      
                      <Tooltip title="Pricing details">
                        <InfoOutlinedIcon 
                          fontSize="small" 
                          sx={{ 
                            color: theme.palette.text.secondary,
                            cursor: 'pointer'
                          }}
                        />
                      </Tooltip>
                    </Box>
                  )}
                </Box>
                
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Paper 
                    elevation={3}
                    sx={{ 
                      bgcolor: service.color || theme.palette.primary.light, 
                      borderRadius: '50%',
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                    }}
                  >
                    {React.cloneElement(service.icon, { 
                      sx: { 
                        color: theme.palette.primary.main,
                        fontSize: '1.75rem'
                      } 
                    })}
                  </Paper>
                </motion.div>
              </Box>
              
              {/* Description */}
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3,
                  lineHeight: 1.6,
                  color: theme.palette.text.secondary
                }}
              >
                {service.description}
              </Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              {/* Features and Options */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1.5, 
                      color: theme.palette.primary.dark,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 4, 
                        height: 20, 
                        bgcolor: theme.palette.primary.main,
                        mr: 1,
                        borderRadius: 1
                      }}
                    />
                    Features
                  </Typography>
                  
                  <List dense disablePadding>
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={featureItemVariants}
                      >
                        <ListItem 
                          sx={{ 
                            px: 0, 
                            py: 0.75,
                            borderBottom: i < service.features.length - 1 ? '1px dashed rgba(0,0,0,0.06)' : 'none'
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                bgcolor: `${theme.palette.primary.main}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <CheckIcon 
                                sx={{ 
                                  color: theme.palette.primary.main,
                                  fontSize: '0.9rem'
                                }} 
                              />
                            </Box>
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              sx: { color: theme.palette.text.secondary }
                            }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1.5, 
                      color: theme.palette.primary.dark,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 4, 
                        height: 20, 
                        bgcolor: theme.palette.primary.main,
                        mr: 1,
                        borderRadius: 1
                      }}
                    />
                    Turnaround Options
                  </Typography>
                  
                  <Paper
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      p: { xs: 1.5, sm: 2 },
                      borderColor: 'rgba(0,0,0,0.08)'
                    }}
                  >
                    <Stack spacing={1.5}>
                      {service.options.map((option, i) => (
                        <Box 
                          key={i} 
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            pb: i < service.options.length - 1 ? 1.5 : 0,
                            borderBottom: i < service.options.length - 1 ? '1px dashed rgba(0,0,0,0.08)' : 'none'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 26,
                                height: 26,
                                borderRadius: '50%',
                                bgcolor: `${theme.palette.primary.main}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1
                              }}
                            >
                              <AccessTimeIcon 
                                fontSize="small" 
                                sx={{ 
                                  color: theme.palette.primary.main,
                                  fontSize: '1rem'
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography 
                                variant="body2"
                                sx={{ fontWeight: 600, lineHeight: 1.2 }}
                              >
                                {option.name}
                              </Typography>
                              {option.description && (
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ display: 'block' }}
                                >
                                  {option.description}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          
                          <motion.div
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleAddToCart(service, option)}
                              startIcon={<AddShoppingCartIcon />}
                              sx={{ 
                                borderRadius: 6, 
                                textTransform: 'none',
                                bgcolor: theme.palette.primary.main,
                                color: 'white',
                                '&:hover': {
                                  bgcolor: theme.palette.primary.dark,
                                },
                                px: { xs: 1.5, sm: 2 },
                                py: 0.75,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                              }}
                            >
                              {option.price > 0 ? `+£${option.price.toFixed(2)}` : 'Add'}
                            </Button>
                          </motion.div>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;