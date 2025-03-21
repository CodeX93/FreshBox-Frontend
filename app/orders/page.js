'use client'
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Chip,
  Stepper,
  Step,
  StepLabel,
  Divider,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack
} from '@mui/material';
import { 
  LocalLaundryService, 
  CheckCircle, 
  Schedule, 
  ExpandMore, 
  Search,
  Wash,
  Dry,
  AccessTime,
  LocationOn,
  DeliveryDining,
  Inventory2,
  ReceiptLong,
  Chat,
  ArrowForward,
  FilterList,
  CalendarToday,
  Home,
  Star,
  StarBorder,
  Cancel,
  Description,
  Phone
} from '@mui/icons-material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Sample data for laundry orders (reusing your existing data)
const sampleLaundryOrders = [
  {
    id: "LD-2023-001",
    date: "2023-03-19T14:30:00",
    status: "delivered",
    items: [
      { name: "Wash & Fold", price: 24.99, quantity: 5, unit: "kg" },
      { name: "Dry Cleaning (Shirts)", price: 6.99, quantity: 3, unit: "pieces" }
    ],
    address: "123 Main St, Anytown, London",
    deliveredDate: "2023-03-22T10:15:00",
    totalWeight: 5,
    total: 45.96
  },
  {
    id: "LD-2023-002",
    date: "2023-03-18T09:45:00",
    status: "processing",
    items: [
      { name: "Wash & Fold", price: 24.99, quantity: 8, unit: "kg" },
      { name: "Bedding (King Size)", price: 29.99, quantity: 1, unit: "set" }
    ],
    address: "456 Oak Dr, Somewhere, London",
    currentStep: 2,
    steps: [
      { label: "Order Placed", completed: true, date: "2023-03-18T09:45:00" },
      { label: "Picked Up", completed: true, date: "2023-03-18T14:30:00" },
      { label: "Cleaning", completed: true, date: "2023-03-19T08:00:00" },
      { label: "Quality Check", completed: false },
      { label: "Out for Delivery", completed: false },
      { label: "Delivered", completed: false }
    ],
    total: 229.91,
    totalWeight: 8,
    estimatedDelivery: "2023-03-23"
  },
  {
    id: "LD-2023-003",
    date: "2023-03-17T16:20:00",
    status: "scheduled",
    items: [
      { name: "Wash & Fold", price: 24.99, quantity: 3, unit: "kg" },
      { name: "Ironing", price: 3.99, quantity: 10, unit: "pieces" }
    ],
    address: "789 Pine Ln, Nowhere, London",
    scheduledDate: "2023-03-25T13:00:00",
    scheduledTime: "13:00 - 15:00",
    total: 114.87,
    totalWeight: 3
  },
  {
    id: "LD-2023-004",
    date: "2023-03-15T11:10:00",
    status: "delivered",
    items: [
      { name: "Dry Cleaning (Suit)", price: 29.99, quantity: 1, unit: "piece" },
      { name: "Dry Cleaning (Dress)", price: 19.99, quantity: 2, unit: "pieces" }
    ],
    address: "321 Elm St, Anytown, London",
    deliveredDate: "2023-03-18T09:30:00",
    total: 69.97,
    totalWeight: 1.5
  },
  {
    id: "LD-2023-005",
    date: "2023-03-14T08:55:00",
    status: "ready",
    items: [
      { name: "Wash & Fold", price: 24.99, quantity: 4, unit: "kg" },
      { name: "Stain Removal", price: 9.99, quantity: 2, unit: "items" }
    ],
    address: "654 Maple Ave, Somewhere, London",
    readyDate: "2023-03-17T15:45:00",
    waitingCollection: true,
    total: 119.94,
    totalWeight: 4
  }
];

// Custom theme with Fresh Box colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#28ddcd',  // Fresh Box teal color
      light: '#7aefe4',
      dark: '#1bb3a6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6b6b',  // Complementary color for alerts/important actions
      light: '#ff9e9e',
      dark: '#c73c3c',
    },
    info: {
      main: '#3d7aed', // For processing status
    },
    success: {
      main: '#4caf50', // For delivered status
    },
    warning: {
      main: '#ff9800', // For scheduled status
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Utility function to format dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Status color mapping with refined aesthetics
const statusColors = {
  delivered: 'success',
  processing: 'info',
  scheduled: 'warning',
  ready: 'primary'
};

// Status icon mapping
const statusIcons = {
  delivered: <CheckCircle />,
  processing: <LocalLaundryService />,
  scheduled: <Schedule />,
  ready: <Inventory2 />
};

// Order status text display
const getStatusText = (status) => {
  switch(status) {
    case 'delivered': return 'Delivered';
    case 'processing': return 'In Progress';
    case 'scheduled': return 'Scheduled';
    case 'ready': return 'Ready for Collection';
    default: return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const LaundryOrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  // Simulate fetching orders
  useEffect(() => {
    // Sort orders by date (most recent first)
    const sortedOrders = [...sampleLaundryOrders].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    setOrders(sortedOrders);
  }, []);

  // Open order details
  const openOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
  };

  // Close order details
  const closeOrderDetails = () => {
    setSelectedOrderId(null);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter orders by tab and search term
  const getFilteredOrders = () => {
    let filtered = orders;
    
    // Filter by tab status
    if (tabValue === 1) {
      filtered = filtered.filter(order => order.status === 'processing');
    } else if (tabValue === 2) {
      filtered = filtered.filter(order => order.status === 'ready');
    } else if (tabValue === 3) {
      filtered = filtered.filter(order => order.status === 'scheduled');
    } else if (tabValue === 4) {
      filtered = filtered.filter(order => order.status === 'delivered');
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredOrders = getFilteredOrders();
  const selectedOrder = orders.find(order => order.id === selectedOrderId);

  // Order Detail View Component
  const OrderDetailView = ({ order }) => {
    if (!order) return null;
    
    return (
      <Dialog 
        open={true} 
        onClose={closeOrderDetails} 
        fullScreen={isMobile}
        fullWidth 
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: isMobile ? 0 : 3 }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
          pb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ 
              bgcolor: `${statusColors[order.status]}.light`,
              color: `${statusColors[order.status]}.main`,
              mr: 2
            }}>
              {statusIcons[order.status]}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Order {order.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(order.date)}
              </Typography>
            </Box>
          </Box>
          <Chip 
            label={getStatusText(order.status)} 
            color={statusColors[order.status]}
            sx={{ fontWeight: 500 }}
          />
          <IconButton onClick={closeOrderDetails} edge="end" aria-label="close">
            <Cancel />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={4}>
            {/* Order Progress */}
            {order.status === 'processing' && (
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'background.default', borderRadius: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Order Progress
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={(order.currentStep / (order.steps.length - 1)) * 100} 
                      color="primary" 
                      size={60}
                      thickness={5}
                      sx={{ mr: 2 }}
                    />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Current Status</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {order.steps[order.currentStep].label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Estimated Delivery: {order.estimatedDelivery}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Stepper 
                    activeStep={order.currentStep} 
                    alternativeLabel
                    sx={{ mt: 4 }}
                  >
                    {order.steps.map((step, index) => (
                      <Step key={index} completed={step.completed}>
                        <StepLabel>
                          {step.label}
                          {step.date && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              {formatDate(step.date)}
                            </Typography>
                          )}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  
                  {order.currentStep === 2 && (
                    <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'primary.light', borderRadius: 3, mt: 4, mb: 2 }}>
                      <Wash sx={{ fontSize: 48, color: 'primary.dark', mb: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'primary.dark' }}>
                        Your items are being cleaned with eco-friendly detergents
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        We use premium, environmentally-friendly cleaning agents that are gentle on fabrics and the planet.
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            )}
            
            {/* Order Information - Left Column */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Order Details
              </Typography>
              
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Weight
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {order.totalWeight} kg
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Amount
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    £{order.total.toFixed(2)}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  Delivery Address
                </Typography>
                <Typography variant="body2" paragraph>
                  {order.address}
                </Typography>
                
                {order.status === 'delivered' && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                      <CheckCircle fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      Delivered On
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(order.deliveredDate)}
                    </Typography>
                  </Box>
                )}
                
                {order.status === 'scheduled' && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'warning.main' }}>
                      <Schedule fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      Scheduled Pickup
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(order.scheduledDate)}
                    </Typography>
                    <Chip 
                      label={order.scheduledTime} 
                      color="warning" 
                      variant="outlined"
                      size="small" 
                      sx={{ mt: 1 }}
                      icon={<AccessTime fontSize="small" />}
                    />
                  </Box>
                )}
                
                {order.status === 'ready' && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      <Inventory2 fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      Ready for Collection Since
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(order.readyDate)}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="small"
                      startIcon={<DeliveryDining />}
                      sx={{ mt: 2 }}
                      fullWidth
                    >
                      Schedule Delivery
                    </Button>
                  </Box>
                )}
              </Paper>
              
              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  startIcon={<Chat />}
                  fullWidth
                >
                  Contact Support
                </Button>
                
                {order.status === 'delivered' && (
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    startIcon={<StarBorder />}
                    fullWidth
                  >
                    Rate Service
                  </Button>
                )}
              </Stack>
            </Grid>
            
            {/* Order Items - Right Column */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Order Items
              </Typography>
              
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                <List disablePadding>
                  {order.items.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem disablePadding sx={{ py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.light' }}>
                            {item.name.includes('Dry') ? <Dry color="primary" /> : <Wash color="primary" />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={item.name}
                          secondary={`${item.quantity} ${item.unit}`}
                        />
                        <ListItemSecondaryAction>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            £{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            £{item.price.toFixed(2)} per {item.unit}
                          </Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < order.items.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="subtitle1">Subtotal</Typography>
                  <Typography variant="subtitle1">£{order.total.toFixed(2)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="subtitle1">Delivery</Typography>
                  <Typography variant="subtitle1">£0.00</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>£{order.total.toFixed(2)}</Typography>
                </Box>
                
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Description />}
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Download Receipt
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button onClick={closeOrderDetails} color="inherit">
            Close
          </Button>
          {(order.status === 'delivered' || order.status === 'ready') && (
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<LocalLaundryService />}
            >
              Reorder Same Items
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  // Order Card Component for List View
  const OrderCard = ({ order }) => {
    return (
      <Card sx={{ mb: 2, overflow: 'visible', borderRadius: 3, cursor: 'pointer' }} onClick={() => openOrderDetails(order.id)}>
        <CardContent sx={{ p: 3 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: `${statusColors[order.status]}.main`,
                      borderRadius: '50%',
                      border: '2px solid white',
                    }}
                  />
                }
              >
                <Avatar 
                  sx={{ 
                    bgcolor: `${statusColors[order.status]}.light`,
                    color: `${statusColors[order.status]}.main`,
                    width: 56,
                    height: 56
                  }}
                >
                  {statusIcons[order.status]}
                </Avatar>
              </Badge>
            </Grid>
            
            <Grid item xs>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{order.id}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(order.date)}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>£{order.total.toFixed(2)}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.totalWeight} kg
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {order.items.map((item, index) => (
                  <Chip 
                    key={index}
                    size="small" 
                    label={`${item.quantity} ${item.unit} ${item.name}`}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {order.address}
                  </Typography>
                </Box>
                
                <Chip 
                  label={getStatusText(order.status)} 
                  color={statusColors[order.status]}
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Box>
              
              {order.status === 'processing' && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(order.currentStep / (order.steps.length - 1)) * 100}
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: 'background.default',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {order.steps[order.currentStep].label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Est. Delivery: {order.estimatedDelivery}
                    </Typography>
                  </Box>
                </Box>
              )}
              
              {order.status === 'scheduled' && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Schedule fontSize="small" sx={{ color: 'warning.main', mr: 0.5 }} />
                  <Typography variant="body2" color="warning.main">
                    Pickup scheduled for {formatDate(order.scheduledDate)} ({order.scheduledTime})
                  </Typography>
                </Box>
              )}
              
              {order.status === 'ready' && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Inventory2 fontSize="small" sx={{ color: 'primary.main', mr: 0.5 }} />
                  <Typography variant="body2" color="primary.main">
                    Ready for collection since {formatDate(order.readyDate)}
                  </Typography>
                </Box>
              )}
              
              {order.status === 'delivered' && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <CheckCircle fontSize="small" sx={{ color: 'success.main', mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    Delivered on {formatDate(order.deliveredDate)}
                  </Typography>
                </Box>
              )}
            </Grid>
            
            <Grid item>
              <IconButton color="primary" sx={{ bgcolor: 'primary.light' }}>
                <ArrowForward />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const orderStatusCounts = {
    processing: orders.filter(order => order.status === 'processing').length,
    ready: orders.filter(order => order.status === 'ready').length,
    scheduled: orders.filter(order => order.status === 'scheduled').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        
        <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>My Laundry Orders</Typography>
            <Typography variant="body1" color="text.secondary">
              Track and manage all your laundry services in one place
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {/* Order Tracking Interface */}
            <Grid item xs={12}>
              <Paper sx={{ p: 0, borderRadius: 3, overflow: 'hidden' }}>
                {/* Search and Filter Bar */}
                <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={9}>
                      <TextField
                        fullWidth
                        placeholder="Search orders by ID, service type, or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        size="medium"
                        sx={{ 
                          bgcolor: 'background.default',
                          borderRadius: 2,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<FilterList />}
                        onClick={() => setFilterDialogOpen(true)}
                        sx={{ height: '56px', borderRadius: 2 }}
                      >
                        Filter
                      </Button>
                    </Grid>
                    {/* <Grid item xs={6} md={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<LocalLaundryService />}
                        sx={{ height: '56px', borderRadius: 2 }}
                      >
                        New Order
                      </Button>
                    </Grid> */}
                  </Grid>
                </Box>
                
                {/* Tabs for order status filtering */}
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    px: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                      minHeight: 64,
                      textTransform: 'none',
                      fontWeight: 500,
                    }
                  }}
                >
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge badgeContent={orders.length} color="primary" sx={{ mr: 1 }}>
                          <Box />
                        </Badge>
                        All Orders
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge badgeContent={orderStatusCounts.processing} color="info" sx={{ mr: 1 }}>
                          <Box />
                        </Badge>
                        In Progress
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge badgeContent={orderStatusCounts.ready} color="primary" sx={{ mr: 1 }}>
                          <Box />
                        </Badge>
                        Ready
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge badgeContent={orderStatusCounts.scheduled} color="warning" sx={{ mr: 1 }}>
                          <Box />
                        </Badge>
                        Scheduled
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge badgeContent={orderStatusCounts.delivered} color="success" sx={{ mr: 1 }}>
                          <Box />
                        </Badge>
                        Delivered
                      </Box>
                    } 
                  />
                </Tabs>
                
                {/* Order List */}
                <Box sx={{ p: 3 }}>
                  {filteredOrders.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <LocalLaundryService sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>No orders found</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {searchTerm 
                          ? "Try adjusting your search criteria"
                          : "You don't have any laundry orders in this category"}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<LocalLaundryService />}
                      >
                        Create New Order
                      </Button>
                    </Box>
                  ) : (
                    <>
                      {filteredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </>
                  )}
                </Box>
              </Paper>
            </Grid>
            
            {/* Quick Action Cards */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mr: 2 }}>
                    <LocalLaundryService />
                  </Avatar>
                  <Typography variant="h6">Quick Order</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Need laundry service fast? Choose from your saved templates.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{ mt: 'auto' }}
                >
                  Start Quick Order
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.main', mr: 2 }}>
                    <Schedule />
                  </Avatar>
                  <Typography variant="h6">Schedule Pickup</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Plan ahead by scheduling a convenient pickup time.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="warning" 
                  fullWidth
                  sx={{ mt: 'auto' }}
                >
                  Schedule Now
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.light', color: 'success.main', mr: 2 }}>
                    <Phone />
                  </Avatar>
                  <Typography variant="h6">Customer Support</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Need help with your orders? Our team is ready to assist you.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="success" 
                  fullWidth
                  sx={{ mt: 'auto' }}
                >
                  Contact Us
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        
        {/* Order Details Dialog */}
        {selectedOrder && <OrderDetailView order={selectedOrder} />}
        
        {/* Filter Dialog */}
        <Dialog
          open={filterDialogOpen}
          onClose={() => setFilterDialogOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Filter Orders</DialogTitle>
          <DialogContent dividers>
            <Typography variant="subtitle2" gutterBottom>Date Range</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="From"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="To"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>Order Status</Typography>
            <Grid container spacing={1}>
              {["Processing", "Ready", "Scheduled", "Delivered"].map((status) => (
                <Grid item xs={6} key={status}>
                  <Chip
                    label={status}
                    clickable
                    color="default"
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>Service Type</Typography>
            <Grid container spacing={1}>
              {["Wash & Fold", "Dry Cleaning", "Ironing", "Stain Removal"].map((service) => (
                <Grid item xs={6} key={service}>
                  <Chip
                    label={service}
                    clickable
                    color="default"
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>Price Range</Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                getAriaLabel={() => 'Price range'}
                value={[20, 150]}
                min={0}
                max={300}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: '£0' },
                  { value: 100, label: '£100' },
                  { value: 200, label: '£200' },
                  { value: 300, label: '£300' },
                ]}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFilterDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={() => setFilterDialogOpen(false)}>Apply Filters</Button>
          </DialogActions>
        </Dialog>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

// Adding a missing import for LinearProgress
import { LinearProgress, Slider } from '@mui/material';

export default LaundryOrderTracking;