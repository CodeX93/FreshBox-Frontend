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
import {theme} from "../../../contexts/Theme"

// Define constants
const TURQUOISE = theme.palette.primary.main;
const DARK_BLUE = theme.palette.primary.darkBlue;

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
      return `$${price.toFixed(2)}/ lb`;
    } else if (priceType === 'per item') {
      return `$${price.toFixed(2)}/ Item`;
    } else if (priceType === 'per set') {
      return `$${price.toFixed(2)}/ set`;
    } else if (priceType === 'per stain') {
      return `$${price.toFixed(2)}/ stain`;
    }
    return `$${price.toFixed(2)}`;
  };
  
  // Get bgcolor based on service category
  const getCardBackground = (category) => {
    switch (category) {
      case 'Premium':
        return '#e3f7f5'; // Light turquoise
      case 'Specialized':
        return '#e8f4fd'; // Light blue
      case 'Add-on':
        return '#e6f7ed'; // Light green
      case 'Business':
        return '#fff4e6'; // Light orange
      default:
        return '#e6f7ed'; // Default light green like in screenshot
    }
  };
  
  return (
    <Card 
      elevation={0}
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        bgcolor: TURQUOISE,
        '&:hover': {
          boxShadow: 1,
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Service Image */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: 180 },
            position: 'relative',
            height: { xs: 160, md: 'auto' },
            bgcolor: theme.palette.primary.whitishMint,
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
        </Box>
        
        {/* Service Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ 
            flex: '1 0 auto', 
            py: { xs: 2, md: 2 }, 
            px: { xs: 2, md: 3 },
            pb: { xs: 1, md: 1 }
          }}>
            <Typography 
              variant="h5" 
              component="h2"
              sx={{ 
                fontWeight: 700,
                mb: 0.5,
                color: DARK_BLUE,
                fontSize: { xs: '1.25rem', md: '1.4rem' }
              }}
            >
              {service.title}
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {service.description}
            </Typography>
            
            <Chip 
              label={service.category}
              size="small"
              sx={{ 
                my: 1,
                fontWeight: 600,
                bgcolor: '#1a4d40',
                color: 'white',
                borderRadius: 1,
                height: 28,
              }}
            />
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 1
            }}>
              <Box 
                sx={{ 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: DARK_BLUE,
                  '&:hover': { opacity: 0.85 }
                }}
                onClick={toggleDetails}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    mr: 0.5,
                    textDecoration: 'underline'
                  }}
                >
                  {showDetails ? 'Hide Details' : 'View Details'}
                </Typography>
                {showDetails ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
              </Box>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: DARK_BLUE,
                  fontSize: '1.1rem'
                }}
              >
                {formatPrice(service.price, service.priceType)}
              </Typography>
            </Box>
            
            <Collapse in={showDetails}>
              <Box sx={{ mt: 2, mb: 1 }}>
                <Divider sx={{ mb: 1.5 }} />
                
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 1,
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
                  {service.specifications && service.specifications.map((spec, index) => (
                    <ListItem key={index} disablePadding disableGutters sx={{ mb: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CheckIcon sx={{ fontSize: 18, color: DARK_BLUE }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={spec} 
                        primaryTypographyProps={{ 
                          variant: 'body2', 
                          color: DARK_BLUE, 
                        }} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </CardContent>
          
          {/* Add to Cart Action */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 2, md: 3 },
              py: 1.5,
              mt: 'auto'
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
              }}
            >
              <IconButton 
                onClick={decrementQuantity}
                size="small"
                sx={{ 
                  bgcolor: DARK_BLUE,
                  color: theme.palette.primary.whitishMint,
                  '&:hover': {
                    bgcolor: '#222',
                  },
                  borderRadius: 0.5,
                  width: 28,
                  height: 28
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
                  width: 40,
                  '& .MuiOutlinedInput-root': {
                    height: 28,
                    '& fieldset': {
                      borderColor: 'rgba(0,0,0,0.12)',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '4px 8px'
                  }
                }}
              />
              
              <IconButton 
                onClick={incrementQuantity}
                size="small"
                sx={{ 
                  bgcolor: DARK_BLUE,
                  color: theme.palette.primary.whitishMint,
                  '&:hover': {
                    bgcolor: '#222',
                  },
                  borderRadius: 0.5,
                  width: 28,
                  height: 28
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Button
            disableElevation
              variant="contained"
              onClick={() => handleAddToCart(service, quantity)}
              sx={{ 
                bgcolor: DARK_BLUE,
                color: theme.palette.primary.whitishMint,
                textTransform: 'none',
                borderRadius: 0.5,
                px: 2,
                py: 0.5,
                '&:hover': {
                  bgcolor: '#102020'
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