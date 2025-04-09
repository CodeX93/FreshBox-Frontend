import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  IconButton,
  TextField,
  Collapse,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  CheckCircleOutline as CheckIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define constants
const TURQUOISE = '#2E7B5C';
const DARK_BLUE = '#0D3B6E';

const ServiceCard = ({ service, handleAddToCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  
  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  // Handle show more details
  const toggleDetails = () => setShowDetails(!showDetails);
  
  // Format price based on price type
  const formatPrice = (price, priceType) => {
    if (priceType === 'per lb') {
      return `$${price.toFixed(2)} / lb`;
    } else if (priceType === 'per item') {
      return `$${price.toFixed(2)} / item`;
    } else if (priceType === 'per set') {
      return `$${price.toFixed(2)} / set`;
    } else if (priceType === 'per stain') {
      return `$${price.toFixed(2)} / stain`;
    }
    return `$${price.toFixed(2)}`;
  };
  
  // Get color based on service category
  const getChipColor = (category) => {
    switch (category) {
      case 'Premium':
        return theme.palette.primary.main;
      case 'Specialized':
        return theme.palette.secondary.main;
      case 'Add-on':
        return theme.palette.info.main;
      case 'Business':
        return theme.palette.warning.main;
      default:
        return TURQUOISE;
    }
  };
  
  return (
    <Card 
      elevation={1}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-4px)',
          borderColor: alpha(TURQUOISE, 0.3)
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Service Image */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: 220 },
            position: 'relative',
            height: { xs: 180, md: 'auto' },
            bgcolor: 'grey.100'
          }}
        >
          {service.imageUrl ? (
            <Box 
              component="img"
              src={service.imageUrl}
              alt={service.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                bgcolor: alpha(TURQUOISE, 0.1),
                color: DARK_BLUE
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Image not available
              </Typography>
            </Box>
          )}
          
          <Chip 
            label={service.category}
            size="small"
            sx={{ 
              position: 'absolute',
              top: 12,
              left: 12,
              fontWeight: 600,
              bgcolor: getChipColor(service.category),
              color: 'white'
            }}
          />
        </Box>
        
        {/* Service Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto', py: { xs: 2, md: 3 }, px: { xs: 2, md: 3 } }}>
            <Typography 
              variant="h5" 
              component="h2"
              sx={{ 
                fontWeight: 700,
                mb: 1,
                color: DARK_BLUE,
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              {service.title}
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {service.description}
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                flexWrap: 'wrap',
                gap: 1
              }}
            >
              <Chip
                icon={<AccessTimeIcon />}
                label={`${service.estimatedTime} hours turnaround`}
                size="small"
                variant="outlined"
                sx={{ borderColor: alpha(TURQUOISE, 0.5), color: DARK_BLUE }}
              />
              
              <Typography 
                variant="h6" 
                color="primary"
                sx={{ 
                  ml: 'auto',
                  fontWeight: 700,
                  color: DARK_BLUE
                }}
              >
                {formatPrice(service.price, service.priceType)}
              </Typography>
            </Box>
            
            {service.specifications && service.specifications.length > 0 && (
              <>
                <Box sx={{ mb: 2 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      cursor: 'pointer',
                      color: TURQUOISE,
                      '&:hover': { opacity: 0.85 }
                    }}
                    onClick={toggleDetails}
                  >
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600,
                        mr: 0.5
                      }}
                    >
                      {showDetails ? 'Hide Details' : 'View Details'}
                    </Typography>
                    {showDetails ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                  </Box>
                </Box>
                
                <Collapse in={showDetails}>
                  <Box sx={{ mb: 2 }}>
                    <Divider sx={{ mb: 1.5 }} />
                    
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600,
                        mb: 1.5,
                        color: DARK_BLUE
                      }}
                    >
                      Service Includes:
                    </Typography>
                    
                    <List 
                      dense
                      disablePadding
                      sx={{ mb: 1 }}
                    >
                      {service.specifications.map((spec, index) => (
                        <ListItem key={index} disablePadding disableGutters sx={{ mb: 0.75 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckIcon sx={{ fontSize: 18, color: TURQUOISE }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={spec} 
                            primaryTypographyProps={{ 
                              variant: 'body2', 
                              color: 'text.primary' 
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Collapse>
              </>
            )}
          </CardContent>
          
          <Divider />
          
          {/* Add to Cart Action */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: 'center',
              px: { xs: 2, md: 3 },
              py: 2
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: { xs: 2, sm: 0 },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              <IconButton 
                onClick={decrementQuantity}
                size="small"
                sx={{ 
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.12)'
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              
              <TextField
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    setQuantity(value);
                  }
                }}
                type="number"
                InputProps={{
                  inputProps: { 
                    min: 1,
                    style: { textAlign: 'center' }
                  }
                }}
                variant="outlined"
                size="small"
                sx={{ 
                  mx: 1,
                  width: 60,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0,0,0,0.12)',
                    },
                  }
                }}
              />
              
              <IconButton 
                onClick={incrementQuantity}
                size="small"
                sx={{ 
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.12)'
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<CartIcon />}
              fullWidth={isSmall}
              
              onClick={() => handleAddToCart(service, quantity)}
              sx={{ 
                ml: { xs: 0, sm: 'auto' },
                bgcolor: TURQUOISE,
                color:'#ffffff',
                '&:hover': {
                  bgcolor: alpha(TURQUOISE, 0.9)
                }
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ServiceCard;