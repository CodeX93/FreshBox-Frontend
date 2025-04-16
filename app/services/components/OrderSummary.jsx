'use client';
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Button,
  Badge,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter } from 'next/navigation';
import {theme} from "../../../contexts/Theme"

// Define constants
const TURQUOISE = theme.palette.primary.main;
const DARK_BLUE = theme.palette.primary.darkBlue;

const OrderSummary = ({ cart, cartTotal, cartItemCount, handleRemoveFromCart, updateQuantity }) => {
  const theme = useTheme();
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Calculate total for a single item
  const calculateItemTotal = (item) => {
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 1);
    return (price * quantity).toFixed(2);
  };

  // Format price based on service price type
  const formatPriceWithType = (item) => {
    const price = Number(item.price || 0);
    const priceType = item.priceType || 'per item';
    
    return `$${price.toFixed(2)} ${priceType}`;
  };

  // Calculate the cart subtotal
  const calculateSubtotal = () => {
    if (!cart || cart.length === 0) return 0;
    
    return cart.reduce((total, item) => {
      const price = Number(item.price || 0);
      const quantity = Number(item.quantity || 1);
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  // Get the correct ID from the item
  const getItemId = (item) => {
    return item._id || item.id;
  };

  // Get the correct name from the item
  const getItemName = (item) => {
    return item.name || item.title;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Paper elevation={3} sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        backgroundColor: 'white', // Ensure solid background color
        '@media (max-width: 600px)': {
          backgroundColor: 'white', // Explicitly set for mobile
        }
      }}>
        <Box sx={{ 
          bgcolor: TURQUOISE, 
          color: DARK_BLUE,
          p: 2,
          display: 'flex',
          alignItems: 'center'
        }}>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Your Order
          </Typography>
          <Badge 
            badgeContent={cartItemCount} 
            color="error" 
            sx={{ ml: 'auto' }}
          >
            <ShoppingCartIcon />
          </Badge>
        </Box>
        
        <Box sx={{ 
          p: 3, 
          backgroundColor: 'white', // Ensure solid background color
          '@media (max-width: 600px)': {
            backgroundColor: 'white', // Explicitly set for mobile
            boxShadow: 'none', // Remove any shadow that might affect transparency
          }
        }}>
          {cart.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ShoppingCartIcon 
                  sx={{ 
                    fontSize: 50, 
                    color: DARK_BLUE, 
                    mb: 2 
                  }} 
                />
              </motion.div>
              <Typography variant="body1" color={DARK_BLUE} sx={{ mb: 2 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color={DARK_BLUE}>
                Add services to get started
              </Typography>
            </Box>
          ) : (
            <>
              <List sx={{ 
                mb: 2,
                backgroundColor: 'white', // Ensure solid background for list
              }}>
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={getItemId(item)}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={listItemVariants}
                      style={{ backgroundColor: 'white' }} // Ensure solid background
                    >
                      <ListItem 
                        secondaryAction={
                          <IconButton 
                            edge="end" 
                            onClick={() => handleRemoveFromCart(getItemId(item))}
                            size="small"
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        }
                        sx={{ 
                          px: 0, 
                          py: 1,
                          backgroundColor: 'white', // Ensure solid background
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2" sx={{ 
                              fontWeight: 600,
                              color: DARK_BLUE
                            }}>
                              {getItemName(item)}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color={DARK_BLUE}>
                              {formatPriceWithType(item)} 
                              {Number(item.quantity || 1) > 1 ? ` x ${item.quantity}` : ''}
                            </Typography>
                          }
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => updateQuantity(getItemId(item), Math.max(1, Number(item.quantity || 1) - 1))}
                              sx={{ color: DARK_BLUE }}
                              disabled={Number(item.quantity || 1) <= 1}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                          </motion.div>
                          <Typography sx={{ 
                            mx: 1, 
                            minWidth: 20, 
                            textAlign: 'center',
                            fontWeight: 600,
                            color: DARK_BLUE,
                          }}>
                            {item.quantity || 1}
                          </Typography>
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => updateQuantity(getItemId(item), Number(item.quantity || 1) + 1)}
                              sx={{ color: DARK_BLUE }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </motion.div>
                        </Box>
                      </ListItem>
                      {/* Show item total */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        pr: 5,
                        pb: 1,
                        backgroundColor: 'white', // Ensure solid background
                      }}>
                        <Typography variant="caption" sx={{color: DARK_BLUE}}>
                          Subtotal: ${calculateItemTotal(item)}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 1,
                backgroundColor: 'white', // Ensure solid background
              }}>
                <Typography variant="body2" sx={{color: DARK_BLUE}}>Subtotal</Typography>
                <Typography variant="body2" sx={{color: DARK_BLUE}}>${calculateSubtotal()}</Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 1,
                backgroundColor: 'white', // Ensure solid background
              }}>
                <Typography variant="body2" sx={{color: DARK_BLUE}}>Collection & Delivery</Typography>
                <Typography variant="body2" sx={{color: DARK_BLUE}}>Free</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 3,
                backgroundColor: 'white', // Ensure solid background
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: DARK_BLUE}}>Total</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: DARK_BLUE }}>
                  ${calculateSubtotal()}
                </Typography>
              </Box>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                disableElevation
                  variant="contained" 
                  fullWidth 
                  size="large"
                  onClick={() => router.push('/checkout?from=services')}
                  disabled={cart.length === 0}
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    color: theme.palette.primary.whitishMint,
                    backgroundColor: DARK_BLUE,
                    '&:hover': {
                      backgroundColor: DARK_BLUE,
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>
              </motion.div>
            </>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default OrderSummary;