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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Paper elevation={3} sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        border: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        <Box sx={{ 
          bgcolor: theme.palette.primary.main, 
          color: 'white',
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
        
        <Box sx={{ p: 3 }}>
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
                    color: 'rgba(0, 0, 0, 0.1)', 
                    mb: 2 
                  }} 
                />
              </motion.div>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add services to get started
              </Typography>
            </Box>
          ) : (
            <>
              <List sx={{ mb: 2 }}>
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={listItemVariants}
                    >
                      <ListItem 
                        secondaryAction={
                          <IconButton 
                            edge="end" 
                            onClick={() => handleRemoveFromCart(item.id)}
                            size="small"
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        }
                        sx={{ px: 0, py: 1 }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2" sx={{ 
                              fontWeight: 600,
                              color: theme.palette.primary.dark
                            }}>
                              {item.name} - {item.option}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              £{(item.basePrice + item.optionPrice).toFixed(2)} {item.quantity > 1 ? `x ${item.quantity}` : ''}
                            </Typography>
                          }
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                          </motion.div>
                          <Typography sx={{ 
                            mx: 1, 
                            minWidth: 20, 
                            textAlign: 'center',
                            fontWeight: 600
                          }}>
                            {item.quantity}
                          </Typography>
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </motion.div>
                        </Box>
                      </ListItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2">£{cartTotal.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Collection & Delivery</Typography>
                <Typography variant="body2">Free</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  £{cartTotal.toFixed(2)}
                </Typography>
              </Box>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  onClick={() => router.push('/checkout')}
                  disabled={cart.length === 0}
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
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