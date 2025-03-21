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

// Define constants
const TURQUOISE = '#28ddcd';

// Reusable styled components
const NavButton = ({ children, ...props }) => {
  // Remove trigger from props to prevent passing it to the DOM
  const { trigger, ...otherProps } = props;
  
  return (
    <Button
      color="primary"
      {...otherProps}
      sx={{ 
        mx: { md: 0.5, lg: 1 },
        fontWeight: 600,
        px: { md: 1, lg: 1.5 },
        py: 1,
        borderRadius: '8px',
        color: TURQUOISE,
        fontSize: { md: '0.9rem', lg: '1.1rem' },
        whiteSpace: 'nowrap',
        '&:hover': {
          bgcolor: trigger ? 'rgba(40, 221, 205, 0.1)' : 'rgba(40, 221, 205, 0.2)'
        },
        ...(props.sx || {})
      }}
    >
      {children}
    </Button>
  );
};

// Navigation data
const navItems = [
  { name: 'Services & Pricing', path: '/services', hasSubmenu: true },
  { name: 'How It Works', path: '/howitwork' },
  { name: 'Areas', path: '/area' },
];

const serviceSubmenu = [
  { name: 'Dry Cleaning', path: '/services', icon: <DryCleaningIcon />, description: 'Professional care for your delicate garments' },
  { name: 'Wash & Fold', path: '/services', icon: <WashIcon />, description: 'Convenient solution for everyday laundry' },
  { name: 'Laundry', path: '/services', icon: <LaundryIcon />, description: 'Complete laundry service with premium care' },
  { name: 'Household Items', path: '/services', icon: <HouseholdIcon />, description: 'Cleaning service for linens, curtains, and more' },
];

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth(); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [ongoingOrdersCount, setOngoingOrdersCount] = useState(0);
  const [userPlan, setUserPlan] = useState('Basic'); 

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  // Load user data
  useEffect(() => {
    // Replace with actual API calls in production
    setUserPlan(user?.plan || 'Basic');
    setUnreadMessageCount(5);
    setOngoingOrdersCount(3);
  }, [user]);

  // Helper functions
  const toggleDrawer = (open) => (event) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const handleServicesMenuOpen = (event) => setServicesAnchorEl(event.currentTarget);
  const handleServicesMenuClose = () => setServicesAnchorEl(null);
  const toggleMobileServicesMenu = () => setMobileServicesOpen(!mobileServicesOpen);
  
  const handleUserMenuOpen = (event) => setUserMenuAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchorEl(null);
  
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

  // Plan helper functions
  const getPlanIcon = () => {
    switch(userPlan) {
      case 'Premium': return <PremiumPlanIcon sx={{ fontSize: { md: '1.1rem', lg: '1.3rem' }, color: '#FFD700' }} />;
      case 'Enterprise': return <EnterprisePlanIcon sx={{ fontSize: { md: '1.1rem', lg: '1.3rem' }, color: '#6A0DAD' }} />;
      default: return <BasicPlanIcon sx={{ fontSize: { md: '1.1rem', lg: '1.3rem' }, color: '#1976d2' }} />;
    }
  };

  const getPlanColor = () => {
    switch(userPlan) {
      case 'Premium': return '#FFD700';
      case 'Enterprise': return '#6A0DAD';
      default: return '#1976d2';
    }
  };

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : 'U';

  // Plans menu
  const [plansMenuAnchorEl, setPlansMenuAnchorEl] = useState(null);
  const plansMenuOpen = Boolean(plansMenuAnchorEl);
  const plansMenuId = plansMenuOpen ? 'plans-menu' : undefined;
  
  const handlePlansMenuOpen = (event) => setPlansMenuAnchorEl(event.currentTarget);
  const handlePlansMenuClose = () => setPlansMenuAnchorEl(null);
  
  const navigateToPlan = (plan) => {
    handlePlansMenuClose();
    // Navigate to plans page
    window.location.href = '/plans';
    // You could use Next.js router instead:
    // router.push('/plans');
  };
  
  // UI Components
  const renderLogo = () => (
    <Box component={Link} href="/" sx={{ 
      textDecoration: 'none', 
      color: 'inherit', 
      display: 'flex', 
      alignItems: 'center',
      gridColumn: '1',
      transition: 'transform 0.2s ease',
      '&:hover': { transform: 'scale(1.05)' }
    }}>
      <Box sx={{ 
        position: 'relative',
        width: { xs: 40, sm: 45, md: 50 },
        height: { xs: 40, sm: 45, md: 50 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)'
      }}>
        <Image
          src={Logo}
          alt="Fresh Box Logo"
          fill
          priority
          sizes="(max-width: 768px) 40px, (max-width: 1200px) 45px, 50px"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Typography
        variant="h5"
        component="div"
        sx={{ 
          color: TURQUOISE,
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
  );

  const renderServicesSubmenu = () => (
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
                <Box sx={{ p: 2, bgcolor: TURQUOISE, color: 'white' }}>
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
                          bgcolor: `rgba(40, 221, 205, 0.05)`,
                          '& .MuiBox-root.icon-container': {
                            bgcolor: TURQUOISE,
                            transform: 'scale(1.1)'
                          },
                          '& .item-title': {
                            color: TURQUOISE
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
                          bgcolor: TURQUOISE,
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
                          sx={{ mb: 0.5, transition: 'color 0.2s ease' }}
                        >
                          {submenuItem.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
                    onClick={handleServicesMenuClose}
                    sx={{ 
                      borderRadius: '8px',
                      bgcolor: TURQUOISE,
                      '&:hover': { bgcolor: '#20c5b7' }
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
  );

  const renderPlansMenu = () => (
    <Menu
      id={plansMenuId}
      anchorEl={plansMenuAnchorEl}
      keepMounted
      open={plansMenuOpen}
      onClose={handlePlansMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: '10px',
          mt: 1.5,
          minWidth: 220,
          boxShadow: '0px 5px 15px rgba(0,0,0,0.15)'
        }
      }}
    >
      <Box sx={{ p: 2, bgcolor: TURQUOISE, color: 'white' }}>
        <Typography variant="subtitle1" fontWeight={600}>Select Plan</Typography>
        <Typography variant="body2">
          {userPlan === 'Basic' ? 'Upgrade for more features' : 'Manage your subscription'}
        </Typography>
      </Box>
      
      {/* Basic Plan */}
      <MenuItem 
        component={Link}
        href="/plans"
        onClick={() => navigateToPlan('Basic')}
        sx={{ 
          py: 1.5, 
          bgcolor: userPlan === 'Basic' ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
          pointerEvents: userPlan === 'Basic' ? 'none' : 'auto',
        }}
      >
        <BasicPlanIcon sx={{ mr: 1.5, fontSize: '1.25rem', color: '#1976d2' }} />
        <Box>
          <Typography fontWeight={userPlan === 'Basic' ? 700 : 400}>
            Basic Plan
            {userPlan === 'Basic' && 
              <Box component="span" sx={{ ml: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
                (Current)
              </Box>
            }
          </Typography>
          {userPlan !== 'Basic' && 
            <Typography variant="body2" color="text.secondary">
              Switch back to Basic
            </Typography>
          }
        </Box>
      </MenuItem>
      
      {/* Premium Plan */}
      <MenuItem 
        component={Link}
        href="/plans"
        onClick={() => navigateToPlan('Premium')}
        sx={{ 
          py: 1.5, 
          bgcolor: userPlan === 'Premium' ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
          pointerEvents: userPlan === 'Premium' ? 'none' : 'auto',
        }}
      >
        <PremiumPlanIcon sx={{ mr: 1.5, fontSize: '1.25rem', color: '#FFD700' }} />
        <Box>
          <Typography fontWeight={userPlan === 'Premium' ? 700 : 400}>
            Premium Plan
            {userPlan === 'Premium' && 
              <Box component="span" sx={{ ml: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
                (Current)
              </Box>
            }
          </Typography>
          {userPlan === 'Basic' ? 
            <Typography variant="body2" color="text.secondary">
              Upgrade to Premium
            </Typography>
            : userPlan === 'Enterprise' ?
            <Typography variant="body2" color="text.secondary">
              Switch to Premium
            </Typography>
            : null
          }
        </Box>
      </MenuItem>
      
      {/* Enterprise Plan */}
      <MenuItem 
        component={Link}
        href="/plans"
        onClick={() => navigateToPlan('Enterprise')}
        sx={{ 
          py: 1.5, 
          bgcolor: userPlan === 'Enterprise' ? 'rgba(106, 13, 173, 0.1)' : 'transparent',
          pointerEvents: userPlan === 'Enterprise' ? 'none' : 'auto',
        }}
      >
        <EnterprisePlanIcon sx={{ mr: 1.5, fontSize: '1.25rem', color: '#6A0DAD' }} />
        <Box>
          <Typography fontWeight={userPlan === 'Enterprise' ? 700 : 400}>
            Enterprise Plan
            {userPlan === 'Enterprise' && 
              <Box component="span" sx={{ ml: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
                (Current)
              </Box>
            }
          </Typography>
          {(userPlan === 'Basic' || userPlan === 'Premium') && 
            <Typography variant="body2" color="text.secondary">
              Upgrade to Enterprise
            </Typography>
          }
        </Box>
      </MenuItem>
      
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          component={Link}
          href="/plans"
          sx={{ 
            borderRadius: '8px',
            bgcolor: TURQUOISE,
            '&:hover': { bgcolor: '#20c5b7' }
          }}
        >
          View All Plan Details
        </Button>
      </Box>
    </Menu>
  );

  const renderUserMenu = () => (
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
        <AccountCircleIcon sx={{ mr: 1.5, fontSize: '1.25rem', color: TURQUOISE }} />
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
  );

  const renderMobileDrawer = () => (
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
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'grey.100'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              position: 'relative',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              overflow: 'hidden'
            }}>
              <Image
                src={Logo}
                alt="Fresh Box Logo"
                fill
                priority
                sizes="40px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Typography variant="h6" component="div" sx={{ ml: 1.5, fontWeight: 700, color: TURQUOISE }}>
              Fresh Box
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: TURQUOISE }}>
            <ExpandLessIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          <List>
            {isAuthenticated && (
              <>
                <ListItem 
                  button 
                  onClick={handlePlansMenuOpen}
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
                  <ExpandMoreIcon sx={{ color: getPlanColor() }} />
                </ListItem>
                <Divider sx={{ my: 1.5 }} />

                <ListItem 
                  button 
                  component={Link}
                  href="/orders"
                  onClick={toggleDrawer(false)}
                  sx={{ borderRadius: '8px', mb: 1, py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: TURQUOISE }}>
                    <Badge badgeContent={ongoingOrdersCount} color="warning" sx={{padding: '2px'}}>
                      <OrdersIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary="My Orders"
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem', color: TURQUOISE }}
                  />
                </ListItem>
                <Divider sx={{ my: 1.5 }} />

                <ListItem 
                  button 
                  component={Link}
                  href="/chats"
                  onClick={toggleDrawer(false)}
                  sx={{ borderRadius: '8px', mb: 1, py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: TURQUOISE }}>
                    <Badge badgeContent={unreadMessageCount} color="error" sx={{padding: '2px'}}>
                      <ChatIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary="My Chats"
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem', color: TURQUOISE }}
                  />
                </ListItem>
                <Divider sx={{ my: 1.5 }} />
              </>
            )}

            {navItems.map((item) => (
              item.hasSubmenu ? (
                <Box key={item.name}>
                  <ListItem 
                    button 
                    onClick={toggleMobileServicesMenu}
                    sx={{ borderRadius: '8px', mb: 1, py: 1.5 }}
                  >
                    <ListItemText 
                      primary={item.name} 
                      primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem', color: TURQUOISE }}
                    />
                    {mobileServicesOpen ? 
                      <ExpandLessIcon sx={{ color: TURQUOISE }} /> : 
                      <ExpandMoreIcon sx={{ color: TURQUOISE }} />
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
                          sx={{ pl: 4, borderRadius: '8px', mb: 0.5, py: 1 }}
                        >
                          <ListItemIcon sx={{ minWidth: 40, color: TURQUOISE }}>
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
                        sx={{ pl: 4, borderRadius: '8px', mb: 0.5, py: 1, color: TURQUOISE }}
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
                    sx={{ borderRadius: '8px', mb: 1, py: 1.5 }}
                  >
                    <ListItemText 
                      primary={item.name}
                      primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem', color: TURQUOISE }}
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
                  color: TURQUOISE,
                  borderColor: TURQUOISE
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
                sx={{ mb: 2, borderRadius: '8px', py: 1.2, fontSize: '1rem' }}
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
                color: TURQUOISE,
                borderColor: TURQUOISE
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
              bgcolor: TURQUOISE,
              '&:hover': { bgcolor: '#20c5b7' }
            }}
          >
            Schedule Pickup
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

  // Render authenticated user buttons
  const renderAuthButtons = () => (
    <>
      {/* Plan dropdown button */}
      <Button
        color="primary"
        onClick={handlePlansMenuOpen}
        aria-controls={plansMenuId}
        aria-haspopup="true"
        endIcon={<ExpandMoreIcon />}
        sx={{ 
          fontWeight: 600,
          borderRadius: '8px',
          px: { md: 0.5, lg: 1.5 },
          minWidth: { md: 'auto' },
          color: getPlanColor(),
          fontSize: { md: '0.7rem', lg: '0.9rem' },
          whiteSpace: 'nowrap',
          '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.1)' },
          border: '1px solid',
          borderColor: getPlanColor()
        }}
      >
        {getPlanIcon()}
        <Box sx={{ ml: { md: 0.5, lg: 0.75 }, display: { md: 'none', lg: 'block' } }}>
          {userPlan} Plan
        </Box>
      </Button>
      
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
          color: TURQUOISE,
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
          color: TURQUOISE,
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
          color: TURQUOISE,
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
            bgcolor: TURQUOISE,
            color: 'white',
            fontSize: { md: '0.7rem', lg: '0.9rem' },
            mr: { md: 0.5, lg: 0.75 }
          }}
        >
          {getInitial(user?.name)}
        </Avatar>
        {user?.name || 'User'}
      </Button>
    </>
  );

  return (
    <>
      {/* Render Plans Menu */}
      {renderPlansMenu()}
      
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          transition: 'all 0.3s ease',
          bgcolor: trigger ? 'rgba(255, 255, 255, 0.97)' : 'transparent',
          color: TURQUOISE,
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
              color: TURQUOISE,
              gap: 2
            }}
          >
            {/* Logo and brand */}
            {renderLogo()}

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
                  borderColor: TURQUOISE,
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
                    <NavButton 
                      endIcon={<ExpandMoreIcon />}
                      onClick={handleServicesMenuOpen}
                      aria-describedby={servicesPopupId}
                      trigger={trigger}
                    >
                      {item.name}
                    </NavButton>
                    {renderServicesSubmenu()}
                  </Box>
                ) : (
                  <NavButton 
                    key={item.name}
                    component={Link}
                    href={item.path}
                    trigger={trigger}
                  >
                    {item.name}
                  </NavButton>
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
                  {renderAuthButtons()}
                  {renderUserMenu()}
                </>
              ) : (
                <Button
                  variant="contained"
                  component={Link}
                  href="/auth/login"
                  startIcon={<LoginIcon />}
                  sx={{ 
                    borderRadius: '8px',
                    py: 1.2,
                    fontSize: '1rem',
                    color: TURQUOISE,
                    borderColor: TURQUOISE,
                    '&:hover': { bgcolor: '#20c5b7' }
                  }}
                >
                  Log In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileDrawer()}
    </>
  );
}