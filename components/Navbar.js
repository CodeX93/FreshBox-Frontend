'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Divider,
  useScrollTrigger,
  Fade,
  Paper,
  Popper,
  ClickAwayListener,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  Badge,
  MenuItem,
  Tooltip
} from '@mui/material';

import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Dry as DryCleaningIcon,
  LocalLaundryService as LaundryIcon,
  Wash as WashIcon,
  Home as HouseholdIcon,
  Login as LoginIcon,
  Schedule as ScheduleIcon,
  ChevronRight as ChevronRightIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  ShoppingBag as OrdersIcon,
  Chat as ChatIcon,
  Dashboard as BasicPlanIcon,
  Star as PremiumPlanIcon,
  Business as EnterprisePlanIcon
} from '@mui/icons-material';
import Logo from '../Assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

// Create a more visible button for Login
const BorderedButton = ({ children, ...props }) => (
  <Button
    variant="outlined"
    {...props}
  >
    {children}
  </Button>
);

// Define turquoise color to use consistently
const turquoiseColor = '#28ddcd';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth(); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [ongoingOrdersCount, setOngoingOrdersCount] = useState(0);
  const [userPlan, setUserPlan] = useState('Basic'); // Default to Basic Plan

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  // Load user plan, unread message and ongoing order counts
  useEffect(() => {
    // Replace with actual API calls in production
    const totalUnreadMessages = 5;
    const totalOngoingOrders = 3;
    
    // Get user plan from user object if available, otherwise default to Basic
    const plan = user?.plan || 'Basic';
    
    setUserPlan(plan);
    setUnreadMessageCount(totalUnreadMessages);
    setOngoingOrdersCount(totalOngoingOrders);
  }, [user]);

  // Update scrolled state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { 
      name: 'Services & Pricing', 
      path: '/services', 
      hasSubmenu: true 
    },
    { 
      name: 'How It Works', 
      path: '/howitwork' 
    },
    { 
      name: 'Areas', 
      path: '/area' 
    },
  ];

  const serviceSubmenu = [
    { 
      name: 'Dry Cleaning', 
      path: '/services',
      icon: <DryCleaningIcon />,
      description: 'Professional care for your delicate garments'
    },
    { 
      name: 'Wash & Fold', 
      path: '/services',
      icon: <WashIcon />,
      description: 'Convenient solution for everyday laundry'
    },
    { 
      name: 'Laundry', 
      path: '/services',
      icon: <LaundryIcon />,
      description: 'Complete laundry service with premium care'
    },
    { 
      name: 'Household Items', 
      path: '/services',
      icon: <HouseholdIcon />,
      description: 'Cleaning service for linens, curtains, and more'
    },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleServicesMenuOpen = (event) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleServicesMenuClose = () => {
    setServicesAnchorEl(null);
  };

  const toggleMobileServicesMenu = () => {
    setMobileServicesOpen(!mobileServicesOpen);
  };

  // User profile menu handlers
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleUserMenuClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const servicesOpen = Boolean(servicesAnchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);
  const servicesPopupId = servicesOpen ? 'services-popup-menu' : undefined;
  const userMenuId = userMenuOpen ? 'user-menu' : undefined;

  // Get first letter of user name for avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // Get the plan icon based on the user's plan
  const getPlanIcon = () => {
    switch(userPlan) {
      case 'Premium':
        return <PremiumPlanIcon sx={{ fontSize: { md: '1.1rem', lg: '1.3rem' }, color: '#FFD700' }} />;
      case 'Enterprise':
        return <EnterprisePlanIcon sx={{ fontSize: { md: '1.1rem', lg: '1.3rem' }, color: '#6A0DAD' }} />;
      case 'Basic':
      default:
        return <BasicPlanIcon sx={{ fontSize: { md: '1.1rem', lg: '1.3rem' }, color: '#1976d2' }} />;
    }
  };

  // Get plan color based on the user's plan
  const getPlanColor = () => {
    switch(userPlan) {
      case 'Premium':
        return '#FFD700'; // Gold color for Premium
      case 'Enterprise':
        return '#6A0DAD'; // Purple color for Enterprise
      case 'Basic':
      default:
        return '#1976d2'; // Blue color for Basic
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          transition: 'all 0.3s ease',
          bgcolor: trigger ? 'rgba(255, 255, 255, 0.97)' : 'transparent',
          color: turquoiseColor,
          backdropFilter: trigger ? 'blur(10px)' : 'blur(6px)',
          boxShadow: trigger ? '0px 2px 10px rgba(0, 0, 0, 0.08)' : 'none',
          borderBottom: trigger ? '1px solid rgba(230, 230, 230, 0.5)' : 'none',
          py: trigger ? 0.5 : 1,
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
          <Toolbar
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr auto', md: '200px 1fr 400px' },
              alignItems: 'center',
              color: turquoiseColor,
              gap: 2
            }}
          >
            {/* Logo and brand */}
            <Box component={Link} href="/" sx={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              display: 'flex', 
              alignItems: 'center',
              gridColumn: '1',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}>
              {/* Logo container with proper size */}
              <Box 
                sx={{ 
                  position: 'relative',
                  width: { xs: 40, sm: 45, md: 50 },
                  height: { xs: 40, sm: 45, md: 50 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)'
                }}
              >
                <Image
                  src={Logo}
                  alt="Fresh Box Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 40px, (max-width: 1200px) 45px, 50px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                component="div"
                sx={{ 
                  color: turquoiseColor,
                  ml: 1.5, 
                  fontWeight: 700, 
                  display: { xs: 'none', sm: 'block' },
                  fontSize: { md: '1.2rem', lg: '1.5rem' },
                  fontFamily: '"Poppins", sans-serif',
                  letterSpacing: '-0.5px'
                }}
              >
                Fresh Box
              </Typography>
            </Box>

            {/* Mobile menu icon */}
            <Box sx={{ 
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end',
              gridColumn: '2'
            }}>
              <IconButton
                size="large"
                aria-label="menu"
                color="inherit"
                onClick={toggleDrawer(true)}
                sx={{ 
                  border: '1px solid',
                  borderColor: turquoiseColor,
                  borderRadius: '8px',
                  p: 0.8
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Desktop navigation links */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center', 
              justifyContent: 'center',
              gridColumn: '2',
              gap: { md: 0.5, lg: 1 }
            }}>
              {navItems.map((item) => 
                item.hasSubmenu ? (
                  <Box key={item.name}>
                    <Button 
                      color="primary"
                      endIcon={<ExpandMoreIcon />}
                      onClick={handleServicesMenuOpen}
                      aria-describedby={servicesPopupId}
                      sx={{ 
                        mx: { md: 0.5, lg: 1 },
                        fontWeight: 600,
                        px: { md: 1, lg: 1.5 },
                        py: 1,
                        borderRadius: '8px',
                        color: turquoiseColor,
                        fontSize: { md: '0.9rem', lg: '1.1rem' },
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          bgcolor: trigger ? 'rgba(40, 221, 205, 0.1)' : 'rgba(40, 221, 205, 0.2)'
                        }
                      }}
                    >
                      {item.name}
                    </Button>
                    <Popper 
                      id={servicesPopupId}
                      open={servicesOpen} 
                      anchorEl={servicesAnchorEl}
                      transition
                      placement="bottom-start"
                      sx={{ zIndex: 1300 }}
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper 
                            elevation={8}
                            sx={{ 
                              mt: 1.5, 
                              width: 320,
                              overflow: 'hidden',
                              borderRadius: '12px',
                              border: '1px solid',
                              borderColor: 'grey.100'
                            }}
                          >
                            <ClickAwayListener onClickAway={handleServicesMenuClose}>
                              <Box>
                                <Box sx={{ p: 2, bgcolor: turquoiseColor, color: 'white' }}>
                                  <Typography variant="h6" fontWeight={600}>Our Services</Typography>
                                  <Typography variant="body2">
                                    Professional laundry solutions for all your needs
                                  </Typography>
                                </Box>
                                <Box>
                                  {serviceSubmenu.map((submenuItem, index) => (
                                    <Box 
                                      key={submenuItem.name}
                                      component={Link}
                                      href={submenuItem.path}
                                      onClick={handleServicesMenuClose}
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        textDecoration: 'none',
                                        color: 'text.primary',
                                        p: 2,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                          bgcolor: 'rgba(40, 221, 205, 0.05)',
                                          '& .MuiBox-root.icon-container': {
                                            bgcolor: turquoiseColor,
                                            transform: 'scale(1.1)'
                                          },
                                          '& .item-title': {
                                            color: turquoiseColor
                                          }
                                        },
                                        borderBottom: index < serviceSubmenu.length - 1 ? '1px solid' : 'none',
                                        borderColor: 'grey.100'
                                      }}
                                    >
                                      <Box 
                                        className="icon-container"
                                        sx={{ 
                                          color: 'white', 
                                          mr: 2,
                                          transition: 'all 0.2s ease',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          bgcolor: turquoiseColor,
                                          p: 1,
                                          borderRadius: '8px',
                                          width: 40,
                                          height: 40
                                        }}
                                      >
                                        {submenuItem.icon}
                                      </Box>
                                      <Box>
                                        <Typography 
                                          className="item-title"
                                          fontWeight={600} 
                                          sx={{ 
                                            mb: 0.5,
                                            transition: 'color 0.2s ease'
                                          }}
                                        >
                                          {submenuItem.name}
                                        </Typography>
                                        <Typography 
                                          variant="body2" 
                                          color="text.secondary"
                                        >
                                          {submenuItem.description}
                                        </Typography>
                                      </Box>
                                      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                                        <ChevronRightIcon fontSize="small" color="action" />
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                                <Box sx={{ p: 2, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.100' }}>
                                  <Button 
                                    component={Link}
                                    href="/services"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleServicesMenuClose}
                                    sx={{ 
                                      borderRadius: '8px',
                                      bgcolor: turquoiseColor,
                                      '&:hover': {
                                        bgcolor: '#20c5b7'
                                      }
                                    }}
                                  >
                                    View All Services & Pricing
                                  </Button>
                                </Box>
                              </Box>
                            </ClickAwayListener>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </Box>
                ) : (
                  <Button 
                    key={item.name}
                    color="primary"
                    component={Link}
                    href={item.path}
                    sx={{ 
                      mx: { md: 0.5, lg: 1 },
                      fontWeight: 600,
                      px: { md: 1, lg: 1.5 },
                      py: 1,
                      fontSize: { md: '0.9rem', lg: '1.1rem' },
                      color: turquoiseColor,
                      borderRadius: '8px',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: trigger ? 'rgba(40, 221, 205, 0.1)' : 'rgba(40, 221, 205, 0.2)'
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                )
              )}
            </Box>

            {/* CTA buttons */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center', 
              justifyContent: 'flex-end',
              gridColumn: '3',
              gap: { md: 0.75, lg: 1 }
            }}>
              {isAuthenticated ? (
                <>
                  {/* Plan indicator with Badge */}
                  <Tooltip title={`${userPlan} Plan`}>
                    <Button
                      color="primary"
                      component={Link}
                      href="/plan"
                      sx={{ 
                        fontWeight: 600,
                        borderRadius: '8px',
                        px: { md: 0.5, lg: 1.5 },
                        minWidth: { md: 'auto' },
                        color: getPlanColor(),
                        fontSize: { md: '0.7rem', lg: '0.9rem' },
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          bgcolor: 'rgba(25, 118, 210, 0.1)'
                        },
                        border: '1px solid',
                        borderColor: getPlanColor()
                      }}
                    >
                      {getPlanIcon()}
                      <Box sx={{ ml: { md: 0.5, lg: 0.75 }, display: { md: 'none', lg: 'block' } }}>
                        {userPlan} Plan
                      </Box>
                    </Button>
                  </Tooltip>
                  
                  {/* Orders Button with Badge */}
                  <Button
                    color="primary"
                    component={Link}
                    href="/orders"
                    sx={{ 
                      fontWeight: 600,
                      borderRadius: '8px',
                      px: { md: 0.5, lg: 1.5 },
                      minWidth: { md: 'auto' },
                      color: turquoiseColor,
                      fontSize: { md: '0.7rem', lg: '0.9rem' },
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: trigger ? 'rgba(40, 221, 205, 0.1)' : 'rgba(40, 221, 205, 0.2)'
                      }
                    }}
                  >
                    <Badge badgeContent={ongoingOrdersCount} color="warning" sx={{padding: '2px'}}>
                      <OrdersIcon sx={{ fontSize: { md: '1.1rem', lg: '1.3rem' }, mr: { md: 0.5, lg: 0.75 } }} />
                    </Badge>
                    Orders
                  </Button>
                  
                  {/* Chats Button with Badge */}
                  <Button
                    color="primary"
                    component={Link}
                    href="/chat"
                    sx={{ 
                      fontWeight: 600,
                      borderRadius: '8px',
                      px: { md: 0.5, lg: 1.5 },
                      minWidth: { md: 'auto' },
                      color: turquoiseColor,
                      fontSize: { md: '0.7rem', lg: '0.9rem' },
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: trigger ? 'rgba(40, 221, 205, 0.1)' : 'rgba(40, 221, 205, 0.2)'
                      }
                    }}
                  >
                    <Badge badgeContent={unreadMessageCount} color="error" sx={{padding: '2px'}}>
                      <ChatIcon sx={{ fontSize: { md: '1.1rem', lg: '1.3rem' }, mr: { md: 0.5, lg: 0.75 } }} />
                    </Badge>
                    Chats
                  </Button>
                  
                  {/* User Profile Button */}
                  <Button
                    color="primary"
                    aria-controls={userMenuId}
                    aria-haspopup="true"
                    onClick={handleUserMenuOpen}
                    sx={{ 
                      fontWeight: 600,
                      borderRadius: '8px',
                      px: { md: 0.5, lg: 1.5 },
                      color: turquoiseColor,
                      fontSize: { md: '0.7rem', lg: '0.9rem' },
                      whiteSpace: 'nowrap',
                      textTransform: 'none',
                      minWidth: { md: 'auto' }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: { md: 22, lg: 28 }, 
                        height: { md: 22, lg: 28 }, 
                        bgcolor: turquoiseColor,
                        color: 'white',
                        fontSize: { md: '0.7rem', lg: '0.9rem' },
                        mr: { md: 0.5, lg: 0.75 }
                      }}
                    >
                      {getInitial(user?.name)}
                    </Avatar>
                    {user?.name || 'User'}
                  </Button>
                  <Menu
                    id={userMenuId}
                    anchorEl={userMenuAnchorEl}
                    keepMounted
                    open={userMenuOpen}
                    onClose={handleUserMenuClose}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        borderRadius: '10px',
                        mt: 1.5,
                        minWidth: 180,
                        boxShadow: '0px 5px 15px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <MenuItem 
                      component={Link}
                      href="/profile"
                      onClick={handleUserMenuClose}
                      sx={{ py: 1.5 }}
                    >
                      <AccountCircleIcon sx={{ mr: 1.5, fontSize: '1.25rem', color: turquoiseColor }} />
                      <Typography>My Profile</Typography>
                    </MenuItem>
                    <MenuItem 
                      component={Link}
                      href="/plan"
                      onClick={handleUserMenuClose}
                      sx={{ py: 1.5 }}
                    >
                      {getPlanIcon()}
                      <Typography sx={{ ml: 1.5 }}>{userPlan} Plan</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem 
                      onClick={handleLogout}
                      sx={{ py: 1.5, color: 'error.main' }}
                    >
                      <LogoutIcon sx={{ mr: 1.5, fontSize: '1.25rem' }} />
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <BorderedButton 
                  color="primary"
                  component={Link}
                  href="/auth/login"
                  sx={{ 
                    fontWeight: 600,
                    borderRadius: '8px',
                    px: { md: 0.5, lg: 1.5 },
                    py: { md: 0.5, lg: 0.75 },
                    color: turquoiseColor,
                    fontSize: { md: '0.7rem', lg: '0.9rem' },
                    whiteSpace: 'nowrap',
                    borderColor: turquoiseColor
                  }}
                >
                  <LoginIcon sx={{ fontSize: { md: '1.1rem', lg: '1.3rem' }, mr: { md: 0.5, lg: 0.75 } }} />
                  Log In
                </BorderedButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer menu */}
     
{/* Mobile drawer menu */}
<Drawer
  anchor="right"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
  sx={{
    '& .MuiDrawer-paper': { 
      width: { xs: '85%', sm: 350 },
      boxSizing: 'border-box',
      borderTopLeftRadius: '12px',
      borderBottomLeftRadius: '12px',
    },
  }}
>
  <Box
    sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column' 
    }}
  >
    <Box sx={{ 
      p: 3, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      borderBottom: '1px solid',
      borderColor: 'grey.100'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Mobile menu logo */}
        <Box 
          sx={{ 
            position: 'relative',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            overflow: 'hidden'
          }}
        >
          <Image
            src={Logo}
            alt="Fresh Box Logo"
            fill
            priority
            sizes="40px"
            style={{
              objectFit: 'cover',
            }}
          />
        </Box>
        <Typography variant="h6" component="div" sx={{ ml: 1.5, fontWeight: 700, color: turquoiseColor }}>
          Fresh Box
        </Typography>
      </Box>
      <IconButton onClick={toggleDrawer(false)} sx={{ color: turquoiseColor }}>
        <ExpandLessIcon />
      </IconButton>
    </Box>

    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
      <List>
        {/* Add Plan link in mobile menu for authenticated users */}
        {isAuthenticated && (
          <>
            <Box>
              <ListItem 
                button 
                component={Link}
                href="/plan"
                onClick={toggleDrawer(false)}
                sx={{ 
                  borderRadius: '8px',
                  mb: 1,
                  py: 1.5,
                  border: '1px solid',
                  borderColor: getPlanColor()
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: getPlanColor() }}>
                  {getPlanIcon()}
                </ListItemIcon>
                <ListItemText 
                  primary={`${userPlan} Plan`}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem', color: getPlanColor() }}
                />
              </ListItem>
              <Divider sx={{ my: 1.5 }} />
            </Box>
            <Box>
              <ListItem 
                button 
                component={Link}
                href="/orders"
                onClick={toggleDrawer(false)}
                sx={{ 
                  borderRadius: '8px',
                  mb: 1,
                  py: 1.5
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: turquoiseColor }}>
                  <Badge badgeContent={ongoingOrdersCount} color="warning" sx={{padding: '2px'}}>
                    <OrdersIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText 
                  primary="My Orders"
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem', color: turquoiseColor }}
                />
              </ListItem>
              <Divider sx={{ my: 1.5 }} />
            </Box>
            <Box>
              <ListItem 
                button 
                component={Link}
                href="/chats"
                onClick={toggleDrawer(false)}
                sx={{ 
                  borderRadius: '8px',
                  mb: 1,
                  py: 1.5
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: turquoiseColor }}>
                  <Badge badgeContent={unreadMessageCount} color="error" sx={{padding: '2px'}}>
                    <ChatIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText 
                  primary="My Chats"
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem', color: turquoiseColor }}
                />
              </ListItem>
              <Divider sx={{ my: 1.5 }} />
            </Box>
          </>
        )}

        {/* Navigation items */}
        {navItems.map((item) => (
          item.hasSubmenu ? (
            <Box key={item.name}>
              <ListItem 
                button 
                onClick={toggleMobileServicesMenu}
                sx={{ 
                  borderRadius: '8px',
                  mb: 1,
                  py: 1.5
                }}
              >
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem', color: turquoiseColor }}
                />
                {mobileServicesOpen ? 
                  <ExpandLessIcon sx={{ color: turquoiseColor }} /> : 
                  <ExpandMoreIcon sx={{ color: turquoiseColor }} />
                }
              </ListItem>
              <Collapse in={mobileServicesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {serviceSubmenu.map((submenuItem) => (
                    <ListItem 
                      key={submenuItem.name}
                      button
                      component={Link}
                      href={submenuItem.path}
                      onClick={toggleDrawer(false)}
                      sx={{ 
                        pl: 4,
                        borderRadius: '8px',
                        mb: 0.5,
                        py: 1
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: turquoiseColor }}>
                        {submenuItem.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={submenuItem.name}
                        secondary={submenuItem.description}
                        primaryTypographyProps={{ fontWeight: 500, fontSize: '1rem' }}
                        secondaryTypographyProps={{ fontSize: '0.75rem' }}
                      />
                    </ListItem>
                  ))}
                  <ListItem 
                    button
                    component={Link}
                    href="/services"
                    onClick={toggleDrawer(false)}
                    sx={{ 
                      pl: 4,
                      borderRadius: '8px',
                      mb: 0.5,
                      py: 1,
                      color: turquoiseColor
                    }}
                  >
                    <ListItemText 
                      primary="View All Services & Pricing"
                      primaryTypographyProps={{ fontWeight: 600, fontSize: '1rem' }}
                    />
                  </ListItem>
                </List>
              </Collapse>
              <Divider sx={{ my: 1.5 }} />
            </Box>
          ) : (
            <Box key={item.name}>
              <ListItem 
                button 
                component={Link}
                href={item.path}
                onClick={toggleDrawer(false)}
                sx={{ 
                  borderRadius: '8px',
                  mb: 1,
                  py: 1.5
                }}
              >
                <ListItemText 
                  primary={item.name}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem', color: turquoiseColor }}
                />
              </ListItem>
              <Divider sx={{ my: 1.5 }} />
            </Box>
          )
        ))}
      </List>
    </Box>

    <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'grey.100' }}>
      {isAuthenticated ? (
        <>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            component={Link}
            href="/profile"
            startIcon={<AccountCircleIcon />}
            sx={{ 
              mb: 2,
              borderRadius: '8px',
              py: 1.2,
              fontSize: '1rem',
              color: turquoiseColor,
              borderColor: turquoiseColor
            }}
          >
            {user?.name || 'My Profile'}
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ 
              mb: 2,
              borderRadius: '8px',
              py: 1.2,
              fontSize: '1rem'
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          component={Link}
          href="/auth/login"
          startIcon={<LoginIcon />}
          sx={{ 
            mb: 2,
            borderRadius: '8px',
            py: 1.2,
            fontSize: '1rem',
            color: turquoiseColor,
            borderColor: turquoiseColor
          }}
        >
          Log In
        </Button>
      )}
      
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        component={Link}
        href="/schedule"
        startIcon={<ScheduleIcon />}
        sx={{ 
          color: 'white',
          borderRadius: '8px',
          py: 1.2,
          fontSize: '1rem',
          bgcolor: turquoiseColor,
          '&:hover': {
            bgcolor: '#20c5b7'
          }
        }}
      >
        Schedule Pickup
      </Button>
    </Box>
  </Box>
</Drawer>
</>
  )
}

 

      