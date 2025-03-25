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
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';

const ServiceCard = ({ service, handleAddToCart }) => {
  const theme = useTheme();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        elevation={3} 
        sx={{ 
          borderRadius: 2,
          overflow: 'visible',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(226, 232, 240, 0.8)',
        }}
      >
        <Grid container>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="100%"
              image={service.image || "/placeholder-service.jpg"}
              alt={service.title}
              sx={{ 
                height: { xs: 200, md: '100%' },
                objectFit: 'cover'
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.dark }}>
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.main }}
                  >
                    £{service.price.toFixed(2)} {service.unit}
                  </Typography>
                </Box>
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: service.color || theme.palette.primary.light, 
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {React.cloneElement(service.icon, { 
                      sx: { 
                        color: theme.palette.primary.main 
                      } 
                    })}
                  </Box>
                </motion.div>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                {service.description}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: theme.palette.primary.dark }}>
                    Features
                  </Typography>
                  <List dense>
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={featureItemVariants}
                      >
                        <ListItem sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckIcon sx={{ color: theme.palette.primary.main }} fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: theme.palette.primary.dark }}>
                    Turnaround Options
                  </Typography>
                  <Stack spacing={1}>
                    {service.options.map((option, i) => (
                      <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                          <Typography variant="body2">
                            {option.name}
                          </Typography>
                        </Box>
                        <motion.div
                          variants={buttonVariants}
                          initial="initial"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleAddToCart(service, option)}
                            startIcon={<AddIcon />}
                            sx={{ 
                              borderRadius: 6, 
                              textTransform: 'none',
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                              '&:hover': {
                                borderColor: theme.palette.primary.dark,
                                backgroundColor: `${theme.palette.primary.main}10`
                              }
                            }}
                          >
                            {option.price > 0 ? `+£${option.price.toFixed(2)}` : 'Add'}
                          </Button>
                        </motion.div>
                      </Box>
                    ))}
                  </Stack>
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