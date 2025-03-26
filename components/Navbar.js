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
  Business as EnterprisePlanIcon,
  SpaSharp as MassageSpa,
  LocalHospital as HealthcareIcon,
  Factory as CommercialIcon,
  FitnessCenter as GymIcon,
  RequestQuote as RequestQuoteIcon,
  Storefront as AirbnbIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Logo from '../Assets/logo2.png';
import { useAuth } from '../contexts/AuthContext';

// Define constants
const TURQUOISE = '#28ddcd';
const DARK_TURQUOISE = '#20c5b7';
const LIGHT_TURQUOISE = '#5de6d8';

// Reusable styled components
const NavButton = ({ children, ...props }) => {
  const { trigger, ...otherProps } = props;
  
  return (
    <Button
      color="inherit"
      {...otherProps}
      sx={{ 
        mx: { sm: 0.25, md: 0.5, lg: 1 },
        fontWeight: 600,
        px: { sm: 0.5, md: 1, lg: 1.5 },
        py: 1,
        borderRadius: '8px',
        color: 'white',
        fontSize: { sm: '0.8rem', md: '0.9rem', lg: '1rem' },
        whiteSpace: 'nowrap',
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          transform: 'translateY(-2px)',
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
  { name: 'Getting Started', path: '/howitwork', hasSubmenu: true },
  { name: 'FreshBox Care and Pricing', path: '/services', hasSubmenu: true },
  { name: 'Locations', path: '/locations' },
  { name: 'Commercial', path: '/commercial', hasSubmenu: true },
  { name: 'Support', path: '/support' },
];

const serviceSubmenu = [
  { name: 'Wash & Fold', path: '/services', icon: <WashIcon />, description: 'Convenient solution for everyday laundry' },
  { name: 'Laundry', path: '/services', icon: <LaundryIcon />, description: 'Complete laundry service with premium care' },
  { name: 'Household Items', path: '/services', icon: <HouseholdIcon />, description: 'Cleaning service for linens, curtains, and more' },
  { name: 'Dry Cleaning', path: '/services', icon: <DryCleaningIcon />, description: 'Professional care for your delicate garments' },
];

const GettingStartedSubMenu = [
  { name: 'How It Works', path: '/howitwork', icon: <WashIcon />, description: 'Learn how our service works' },
];

const CommercialSubMenu = [
  { name: 'Commercial Laundry Service', path: '/commercial', icon: <CommercialIcon />, description: 'Full-service solutions for businesses' },
  { name: 'Airbnb Laundry', path: '/airbnb', icon: <AirbnbIcon />, description: 'Specialized service for rental properties' },
  { name: 'Massage & Spa Laundry', path: '/spa', icon: <MassageSpa />, description: 'Luxury care for spa linens' },
  { name: 'Healthcare Laundry', path: '/healthcare', icon: <HealthcareIcon />, description: 'Sanitized solutions for medical facilities' },
  { name: 'Gym Towel Laundry Service', path: '/gym', icon: <GymIcon />, description: 'Fresh towels for fitness centers' },
  { name: 'Request a Commercial Quote', path: '/quote', icon: <RequestQuoteIcon />, description: 'Get a customized business quote' },
];

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth(); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [ongoingOrdersCount, setOngoingOrdersCount] = useState(0);
  const [userPlan, setUserPlan] = useState('Basic'); 
  const [commercialAnchorEl, setCommercialAnchorEl] = useState(null);
  const [gettingStartedAnchorEl, setGettingStartedAnchorEl] = useState(null);
  const [mobileCommercialOpen, setMobileCommercialOpen] = useState(false);
  const [mobileGettingStartedOpen, setMobileGettingStartedOpen] = useState(false);
  const [plansMenuAnchorEl, setPlansMenuAnchorEl] = useState(null);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  // Boolean flags for menus
  const servicesOpen = Boolean(servicesAnchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);
  const commercialOpen = Boolean(commercialAnchorEl);
  const gettingStartedOpen = Boolean(gettingStartedAnchorEl);
  const plansMenuOpen = Boolean(plansMenuAnchorEl);
  
  // Menu IDs
  const servicesPopupId = servicesOpen ? 'services-popup-menu' : undefined;
  const userMenuId = userMenuOpen ? 'user-menu' : undefined;
  const commercialPopupId = commercialOpen ? 'commercial-popup-menu' : undefined;
  const gettingStartedPopupId = gettingStartedOpen ? 'getting-started-popup-menu' : undefined;
  const plansMenuId = plansMenuOpen ? 'plans-menu' : undefined;

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

  const handleCommercialMenuOpen = (event) => setCommercialAnchorEl(event.currentTarget);
  const handleCommercialMenuClose = () => setCommercialAnchorEl(null);
  const toggleMobileCommercialMenu = () => setMobileCommercialOpen(!mobileCommercialOpen);

  const handleGettingStartedMenuOpen = (event) => setGettingStartedAnchorEl(event.currentTarget);
  const handleGettingStartedMenuClose = () => setGettingStartedAnchorEl(null);
  const toggleMobileGettingStartedMenu = () => setMobileGettingStartedOpen(!mobileGettingStartedOpen);

  const handlePlansMenuOpen = (event) => setPlansMenuAnchorEl(event.currentTarget);
  const handlePlansMenuClose = () => setPlansMenuAnchorEl(null);
  
  const navigateToPlan = (plan) => {
    handlePlansMenuClose();
    window.location.href = '/plans';
  };

  // Plan helper functions
  const getPlanIcon = () => {
    switch(userPlan) {
      case 'Premium': return <PremiumPlanIcon sx={{ fontSize: { sm: '1rem', md: '1.1rem', lg: '1.3rem' }, color: '#FFD700' }} />;
      case 'Enterprise': return <EnterprisePlanIcon sx={{ fontSize: { sm: '1rem', md: '1.1rem', lg: '1.3rem' }, color: '#6A0DAD' }} />;
      default: return <BasicPlanIcon sx={{ fontSize: { sm: '1rem', md: '1.1rem', lg: '1.3rem' }, color: '#1976d2' }} />;
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

  // UI Components
  const renderLogo = () => (
    <Box 
      component={Link} 
      href="/" 
      sx={{ 
        textDecoration: 'none', 
        color: 'inherit', 
        display: 'flex', 
        alignItems: 'center',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }}
    >
  <Box sx={{
  position: 'relative',
  width: { xs: 70, sm: 90, md: 100, lg: 100 },
  height: { xs: 70, sm: 90, md: 100, lg: 100 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10%',
  overflow: 'hidden',
  boxShadow: trigger ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
  transition: 'all 0.3s ease',
  mr: { xs: 1.5, sm: 2.5 }
}}>
  <Image
    src={Logo} // Path to your SVG file
    alt="FreshBox Logo"
    priority
    fill
    sizes="(max-width: 600px) 70px, (max-width: 900px) 90px, (max-width: 1200px) 100px, 100px"
    style={{
      objectFit: 'contain',
      padding: '4px',
      maxWidth: '100px',
      maxHeight: '100px'
    }}
  />
</Box>
      
      <Typography
        variant="h5"
        component="div"
        sx={{ 
          color: 'white',
          fontWeight: 700, 
          display: { xs: 'none', sm: 'block' },
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem' },
          fontFamily: '"Poppins", sans-serif',
          letterSpacing: '-0.5px',
          textShadow: trigger ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        FreshBox
      </Typography>
    </Box>
  );

  const renderSubmenuWithPopper = (
    id, 
    open, 
    anchorEl, 
    handleClose, 
    title, 
    description, 
    submenuItems, 
    allLink, 
    allLinkText
  ) => (
    <Popper 
      id={id}
      open={open} 
      anchorEl={anchorEl}
      transition
      placement="bottom-start"
      sx={{ zIndex: 1300 }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper 
            elevation={3}
            sx={{ 
              mt: 1.5, 
              width: { sm: 300, md: 320, lg: 350 },
              overflow: 'hidden',
              borderRadius: '12px',
              border: '1px solid',
              borderColor: 'grey.100',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Box>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: TURQUOISE, 
                  color: 'white',
                  backgroundImage: 'linear-gradient(135deg, #28ddcd, #20c5b7)'
                }}>
                  <Typography variant="h6" fontWeight={600}>{title}</Typography>
                  <Typography variant="body2">
                    {description}
                  </Typography>
                </Box>
                <Box>
                  {submenuItems.map((submenuItem, index) => (
                    <Box 
                      key={submenuItem.name}
                      component={Link}
                      href={submenuItem.path}
                      onClick={handleClose}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        textDecoration: 'none',
                        color: 'text.primary',
                        p: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(40, 221, 205, 0.1)',
                          '& .MuiBox-root.icon-container': {
                            bgcolor: TURQUOISE,
                            transform: 'scale(1.1) rotate(5deg)'
                          },
                          '& .item-title': {
                            color: TURQUOISE,
                            transform: 'translateX(4px)'
                          }
                        },
                        borderBottom: index < submenuItems.length - 1 ? '1px solid' : 'none',
                        borderColor: 'grey.100'
                      }}
                    >
                      <Box 
                        className="icon-container"
                        sx={{ 
                          color: 'white', 
                          mr: 2,
                          transition: 'all 0.3s ease',
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
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          className="item-title"
                          fontWeight={600} 
                          sx={{ mb: 0.5, transition: 'all 0.3s ease' }}
                        >
                          {submenuItem.name}
                        </Typography>
                        {submenuItem.description && (
                          <Typography variant="body2" color="text.secondary">
                            {submenuItem.description}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        <ChevronRightIcon fontSize="small" color="action" />
                      </Box>
                    </Box>
                  ))}
                </Box>
                {allLink && (
                  <Box sx={{ p: 2, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.100' }}>
                    <Button 
                      component={Link}
                      href={allLink}
                      fullWidth
                      variant="contained"
                      onClick={handleClose}
                      sx={{ 
                        borderRadius: '8px',
                        bgcolor: TURQUOISE,
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          bgcolor: DARK_TURQUOISE,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      {allLinkText}
                    </Button>
                  </Box>
                )}
              </Box>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );

  const renderServicesSubmenu = () => renderSubmenuWithPopper(
    servicesPopupId,
    servicesOpen,
    servicesAnchorEl,
    handleServicesMenuClose,
    "Our Services",
    "Professional laundry solutions for all your needs",
    serviceSubmenu,
    "/services",
    "View All Services & Pricing"
  );

  const renderCommercialSubmenu = () => renderSubmenuWithPopper(
    commercialPopupId,
    commercialOpen,
    commercialAnchorEl,
    handleCommercialMenuClose,
    "Commercial Services",
    "Professional laundry solutions for businesses",
    CommercialSubMenu,
    "/commercial",
    "Learn More About Commercial Services"
  );

  const renderGettingStartedSubmenu = () => renderSubmenuWithPopper(
    gettingStartedPopupId,
    gettingStartedOpen,
    gettingStartedAnchorEl,
    handleGettingStartedMenuClose,
    "Getting Started",
    "Learn how FreshBox works for you",
    GettingStartedSubMenu,
    null,
    null
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
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          border: '1px solid',
          borderColor: 'grey.100'
        }
      }}
    >
      <Box sx={{ 
        p: 2, 
        bgcolor: TURQUOISE, 
        color: 'white',
        backgroundImage: 'linear-gradient(135deg, #28ddcd, #20c5b7)'
      }}>
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
          transition: 'background-color 0.3s ease',
          '&:hover': {
            bgcolor: userPlan === 'Basic' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)'
          }
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
          transition: 'background-color 0.3s ease',
          '&:hover': {
            bgcolor: userPlan === 'Premium' ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 215, 0, 0.05)'
          }
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
          transition: 'background-color 0.3s ease',
          '&:hover': {
            bgcolor: userPlan === 'Enterprise' ? 'rgba(106, 13, 173, 0.1)' : 'rgba(106, 13, 173, 0.05)'
          }
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
            transition: 'all 0.3s ease',
            '&:hover': { 
              bgcolor: DARK_TURQUOISE,
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }
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
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          border: '1px solid',
          borderColor: 'grey.100'
        }
      }}
    >
      <Box sx={{ 
        p: 2, 
        bgcolor: TURQUOISE, 
        color: 'white',
        backgroundImage: 'linear-gradient(135deg, #28ddcd, #20c5b7)'
      }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {user?.name || 'Your Account'}
        </Typography>
        <Typography variant="body2">
          Manage your profile
        </Typography>
      </Box>
      
      <MenuItem 
        component={Link}
        href="/profile"
        onClick={handleUserMenuClose}
        sx={{ 
          py: 1.5,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(40, 221, 205, 0.05)',
            '& .MuiSvgIcon-root': {
              color: TURQUOISE,
              transform: 'scale(1.1)'
            }
          }
        }}
      >
        <AccountCircleIcon sx={{ 
          mr: 1.5, 
          fontSize: '1.25rem', 
          color: 'text.secondary',
          transition: 'all 0.3s ease'
        }} />
        <Typography>My Profile</Typography>
      </MenuItem>
      
      <MenuItem 
        component={Link}
        href="/plan"
        onClick={handleUserMenuClose}
        sx={{ 
          py: 1.5,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(40, 221, 205, 0.05)',
            '& .MuiSvgIcon-root': {
              transform: 'scale(1.1)'
            }
          }
        }}
      >
        <Box sx={{ mr: 1.5, transition: 'all 0.3s ease' }}>
          {getPlanIcon()}
        </Box>
        <Typography>{userPlan} Plan</Typography>
      </MenuItem>
      
      <Divider />
      
      <MenuItem 
        onClick={handleLogout}
        sx={{ 
          py: 1.5, 
          color: 'error.main',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(211, 47, 47, 0.05)',
            '& .MuiSvgIcon-root': {
              transform: 'scale(1.1)'
            }
          }
        }}
      >
        <LogoutIcon sx={{ 
          mr: 1.5, 
          fontSize: '1.25rem',
          transition: 'all 0.3s ease'
        }} />
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
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'grey.100',
          backgroundImage: 'linear-gradient(135deg, #28ddcd, #20c5b7)',
          color: 'white'
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
              overflow: 'hidden',
              bgcolor: 'white',
              p: 0.5
            }}>
              <Image
                src={Logo}
                alt="FreshBox Logo"
                fill
                priority
                sizes="40px"
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="h6" component="div" sx={{ ml: 1.5, fontWeight: 700 }}>
              FreshBox
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, py: 1 }}>
          {isAuthenticated && (
            <>
              <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(40, 221, 205, 0.05)', borderRadius: '10px', border: '1px solid', borderColor: 'rgba(40, 221, 205, 0.2)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: TURQUOISE,
                      color: 'white',
                      width: 40,
                      height: 40
                    }}
                  >
                    {getInitial(user?.name)}
                  </Avatar>
                  <Box sx={{ ml: 1.5 }}>
                    <Typography fontWeight={600}>{user?.name || 'User'}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getPlanIcon()}
                      <Typography variant="body2" sx={{ ml: 0.5, color: getPlanColor() }}>
                        {userPlan} Plan
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    component={Link}
                    href="/profile"
                    startIcon={<AccountCircleIcon />}
                    sx={{ 
                      borderRadius: '8px',
                      color: TURQUOISE,
                      borderColor: TURQUOISE,
                      '&:hover': { 
                        borderColor: DARK_TURQUOISE,
                        bgcolor: 'rgba(40, 221, 205, 0.05)'
                      }
                    }}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{ 
                      borderRadius: '8px',
                      color: 'error.main',
                      borderColor: 'error.main',
                      '&:hover': { 
                        borderColor: 'error.dark',
                        bgcolor: 'rgba(211, 47, 47, 0.05)'
                      }
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                mb: 2
              }}>
                <Button
                  variant="contained"
                  component={Link}
                  href="/orders"
                  fullWidth
                  sx={{ 
                    borderRadius: '8px',
                    py: 1,
                    bgcolor: TURQUOISE,
                    '&:hover': { bgcolor: DARK_TURQUOISE }
                  }}
                  startIcon={
                    <Badge badgeContent={ongoingOrdersCount} color="warning">
                      <OrdersIcon />
                    </Badge>
                  }
                >
                  Orders
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  href="/chats"
                  fullWidth
                  sx={{ 
                    borderRadius: '8px',
                    py: 1,
                    bgcolor: TURQUOISE,
                    '&:hover': { bgcolor: DARK_TURQUOISE }
                  }}
                  startIcon={
                    <Badge badgeContent={unreadMessageCount} color="error">
                      <ChatIcon />
                    </Badge>
                  }
                >
                  Chats
                </Button>
              </Box>
              
              <Divider sx={{ my: 2 }} />
            </>
          )}

          <List sx={{ 
            '& .MuiListItem-root': { 
              borderRadius: '8px', 
              mb: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(40, 221, 205, 0.05)'
              }
            }
          }}>
            {navItems.map((item) => (
              item.hasSubmenu ? (
                <Box key={item.name}>
                  <ListItem 
                    button 
                    onClick={
                      item.name === 'FreshBox Care and Pricing' ? toggleMobileServicesMenu :
                      item.name === 'Commercial' ? toggleMobileCommercialMenu :
                      item.name === 'Getting Started' ? toggleMobileGettingStartedMenu : null
                    }
                    sx={{ 
                      py: 1.5,
                      bgcolor: (
                        (item.name === 'FreshBox Care and Pricing' && mobileServicesOpen) ||
                        (item.name === 'Commercial' && mobileCommercialOpen) ||
                        (item.name === 'Getting Started' && mobileGettingStartedOpen)
                      ) ? 'rgba(40, 221, 205, 0.1)' : 'transparent',
                    }}
                  >
                    <ListItemText 
                      primary={item.name} 
                      primaryTypographyProps={{ 
                        fontWeight: 600, 
                        fontSize: '1rem', 
                        color: (
                          (item.name === 'FreshBox Care and Pricing' && mobileServicesOpen) ||
                          (item.name === 'Commercial' && mobileCommercialOpen) ||
                          (item.name === 'Getting Started' && mobileGettingStartedOpen)
                        ) ? TURQUOISE : 'inherit'
                      }}
                    />
                    {(
                      (item.name === 'FreshBox Care and Pricing' && mobileServicesOpen) ||
                      (item.name === 'Commercial' && mobileCommercialOpen) ||
                      (item.name === 'Getting Started' && mobileGettingStartedOpen)
                    ) ? 
                      <ExpandLessIcon sx={{ color: TURQUOISE }} /> : 
                      <ExpandMoreIcon />
                    }
                  </ListItem>
                  
                  {/* Submenu Collapses */}
                  {item.name === 'FreshBox Care and Pricing' && (
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
                              py: 1,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                bgcolor: 'rgba(40, 221, 205, 0.1)',
                                '& .MuiListItemIcon-root': {
                                  color: TURQUOISE
                                }
                              }
                            }}
                          >
                            <ListItemIcon sx={{ 
                              minWidth: 40, 
                              color: 'text.secondary',
                              transition: 'all 0.3s ease'
                            }}>
                              {submenuItem.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={submenuItem.name}
                              secondary={submenuItem.description}
                              primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
                              secondaryTypographyProps={{ fontSize: '0.75rem' }}
                            />
                          </ListItem>
                        ))}
                        <Button
                          component={Link}
                          href="/services"
                          onClick={toggleDrawer(false)}
                          fullWidth
                          sx={{ 
                            mt: 1, 
                            mb: 1,
                            ml: 2,
                            borderRadius: '8px', 
                            color: TURQUOISE,
                            border: `1px solid ${TURQUOISE}`,
                            '&:hover': {
                              bgcolor: 'rgba(40, 221, 205, 0.05)'
                            }
                          }}
                        >
                          View All Services & Pricing
                        </Button>
                      </List>
                    </Collapse>
                  )}
                  
                  {item.name === 'Commercial' && (
                    <Collapse in={mobileCommercialOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {CommercialSubMenu.map((submenuItem) => (
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
                              py: 1,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                bgcolor: 'rgba(40, 221, 205, 0.1)',
                                '& .MuiListItemIcon-root': {
                                  color: TURQUOISE
                                }
                              }
                            }}
                          >
                            <ListItemIcon sx={{ 
                              minWidth: 40, 
                              color: 'text.secondary',
                              transition: 'all 0.3s ease'
                            }}>
                              {submenuItem.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={submenuItem.name}
                              secondary={submenuItem.description}
                              primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
                              secondaryTypographyProps={{ fontSize: '0.75rem' }}
                            />
                          </ListItem>
                        ))}
                        <Button
                          component={Link}
                          href="/commercial"
                          onClick={toggleDrawer(false)}
                          fullWidth
                          sx={{ 
                            mt: 1,
                            mb: 1,
                            ml: 2,
                            borderRadius: '8px', 
                            color: TURQUOISE,
                            border: `1px solid ${TURQUOISE}`,
                            '&:hover': {
                              bgcolor: 'rgba(40, 221, 205, 0.05)'
                            }
                          }}
                        >
                          Learn More About Commercial Services
                        </Button>
                      </List>
                    </Collapse>
                  )}
                  
                  {item.name === 'Getting Started' && (
                    <Collapse in={mobileGettingStartedOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {GettingStartedSubMenu.map((submenuItem) => (
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
                              py: 1,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                bgcolor: 'rgba(40, 221, 205, 0.1)',
                                '& .MuiListItemIcon-root': {
                                  color: TURQUOISE
                                }
                              }
                            }}
                          >
                            <ListItemIcon sx={{ 
                              minWidth: 40, 
                              color: 'text.secondary',
                              transition: 'all 0.3s ease'
                            }}>
                              {submenuItem.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={submenuItem.name}
                              secondary={submenuItem.description}
                              primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
                              secondaryTypographyProps={{ fontSize: '0.75rem' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </Box>
              ) : (
                <ListItem 
                  key={item.name}
                  button 
                  component={Link}
                  href={item.path}
                  onClick={toggleDrawer(false)}
                  sx={{ py: 1.5 }}
                >
                  <ListItemText 
                    primary={item.name}
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '1rem' }}
                  />
                </ListItem>
              )
            ))}
          </List>
        </Box>

        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid', 
          borderColor: 'grey.100',
          bgcolor: 'grey.50'
        }}>
          {!isAuthenticated && (
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
                borderColor: TURQUOISE,
                '&:hover': {
                  borderColor: DARK_TURQUOISE,
                  bgcolor: 'rgba(40, 221, 205, 0.05)'
                }
              }}
            >
              Log In
            </Button>
          )}
          
          {/* <Button
            variant="contained"
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
              '&:hover': { 
                bgcolor: DARK_TURQUOISE,
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Schedule Pickup
          </Button> */}
        </Box>
      </Box>
    </Drawer>
  );

  // Render authenticated user buttons
  const renderAuthButtons = () => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: { sm: 0.5, md: 1, lg: 1.5 }
    }}>
      {/* Plan dropdown button */}
      <Tooltip title={`${userPlan} Plan`}>
        <Button
          color="inherit"
          onClick={handlePlansMenuOpen}
          aria-controls={plansMenuId}
          aria-haspopup="true"
          endIcon={<ExpandMoreIcon sx={{ 
            color: 'white',
            display: { sm: 'none', md: 'inline-flex' }
          }} />}
          sx={{ 
            fontWeight: 600,
            borderRadius: '8px',
            px: { sm: 0.5, md: 1, lg: 1.5 },
            py: 0.75,
            minWidth: { sm: 'auto' },
            color: 'white',
            fontSize: { sm: '0.7rem', md: '0.8rem', lg: '0.9rem' },
            whiteSpace: 'nowrap',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            '&:hover': { 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'white'
            },
            transition: 'all 0.3s ease'
          }}
        >
          {getPlanIcon()}
          <Box sx={{ 
            ml: { sm: 0, md: 0.5, lg: 0.75 }, 
            display: { sm: 'none', md: 'block' } 
          }}>
            {userPlan} Plan
          </Box>
        </Button>
      </Tooltip>
      
      {/* Orders Button with Badge */}
      <Tooltip title="My Orders">
        <Button
          color="inherit"
          component={Link}
          href="/orders"
          sx={{ 
            fontWeight: 600,
            borderRadius: '8px',
            px: { sm: 0.5, md: 1, lg: 1.5 },
            py: 0.75,
            minWidth: { sm: 'auto' },
            color: 'white',
            fontSize: { sm: '0.7rem', md: '0.8rem', lg: '0.9rem' },
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <Badge 
            badgeContent={ongoingOrdersCount} 
            color="warning" 
            sx={{ padding: '2px' }}
          >
            <OrdersIcon sx={{ 
              fontSize: { sm: '1rem', md: '1.1rem', lg: '1.3rem' },
              mr: { sm: 0, md: 0.5, lg: 0.75 }
            }} />
          </Badge>
          <Box sx={{ display: { sm: 'none', md: 'block' } }}>
            Orders
          </Box>
        </Button>
      </Tooltip>
      
      {/* Chats Button with Badge */}
      <Tooltip title="My Chats">
        <Button
          color="inherit"
          component={Link}
          href="/chat"
          sx={{ 
            fontWeight: 600,
            borderRadius: '8px',
            px: { sm: 0.5, md: 1, lg: 1.5 },
            py: 0.75,
            minWidth: { sm: 'auto' },
            color: 'white',
            fontSize: { sm: '0.7rem', md: '0.8rem', lg: '0.9rem' },
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <Badge 
            badgeContent={unreadMessageCount} 
            color="error" 
            sx={{ padding: '2px' }}
          >
            <ChatIcon sx={{ 
              fontSize: { sm: '1rem', md: '1.1rem', lg: '1.3rem' },
              mr: { sm: 0, md: 0.5, lg: 0.75 }
            }} />
          </Badge>
          <Box sx={{ display: { sm: 'none', md: 'block' } }}>
            Chats
          </Box>
        </Button>
      </Tooltip>
      
      {/* User Profile Button */}
      <Button
        color="inherit"
        aria-controls={userMenuId}
        aria-haspopup="true"
        onClick={handleUserMenuOpen}
        sx={{ 
          fontWeight: 600,
          borderRadius: '8px',
          px: { sm: 0.5, md: 1, lg: 1.5 },
          py: 0.5,
          color: 'white',
          fontSize: { sm: '0.7rem', md: '0.8rem', lg: '0.9rem' },
          whiteSpace: 'nowrap',
          textTransform: 'none',
          minWidth: { sm: 'auto' },
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.1)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <Avatar 
          sx={{ 
            width: { sm: 24, md: 26, lg: 30 }, 
            height: { sm: 24, md: 26, lg: 30 }, 
            bgcolor: 'white',
            color: TURQUOISE,
            fontSize: { sm: '0.7rem', md: '0.8rem', lg: '0.9rem' },
            mr: { sm: 0, md: 0.5, lg: 0.75 },
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          {getInitial(user?.name)}
        </Avatar>
        <Box sx={{ display: { sm: 'none', md: 'block' } }}>
          {user?.name || 'User'}
        </Box>
      </Button>
    </Box>
  );

  return (
    <>
      {/* Render various menus */}
      {renderPlansMenu()}
      {renderUserMenu()}
      
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          transition: 'all 0.3s ease',
          bgcolor: TURQUOISE,
          backgroundImage: trigger ? 
            'linear-gradient(135deg, #28ddcd, #20c5b7)' : 
            'linear-gradient(135deg, #28ddcd, #20c5b7)',
          color: 'white',
          backdropFilter: 'none',
          boxShadow: trigger ? '0px 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
          py: { xs: trigger ? 0.5 : 1, md: trigger ? 0.75 : 1.5 },
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ 
            px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
            transition: 'all 0.3s ease'
          }}
        >
          <Toolbar
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              minHeight: { xs: 64, md: trigger ? 64 : 80 },
              transition: 'all 0.3s ease',
              p: { xs: 0 }
            }}
            disableGutters
          >
            {/* Logo and brand */}
            {renderLogo()}

            {/* Desktop navigation links */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: { md: 0.25, lg: 0.5 },
                mx: 'auto',
                px: 2
              }}
            >
              {navItems.map((item) => 
                item.hasSubmenu ? (
                  <Box key={item.name}>
                    <NavButton 
                      endIcon={<ExpandMoreIcon />}
                      onClick={
                        item.name === 'FreshBox Care and Pricing' ? handleServicesMenuOpen :
                        item.name === 'Commercial' ? handleCommercialMenuOpen :
                        item.name === 'Getting Started' ? handleGettingStartedMenuOpen : null
                      }
                      aria-describedby={
                        item.name === 'FreshBox Care and Pricing' ? servicesPopupId :
                        item.name === 'Commercial' ? commercialPopupId :
                        item.name === 'Getting Started' ? gettingStartedPopupId : undefined
                      }
                      trigger={trigger}
                    >
                      {item.name}
                    </NavButton>
                    {item.name === 'FreshBox Care and Pricing' && renderServicesSubmenu()}
                    {item.name === 'Commercial' && renderCommercialSubmenu()}
                    {item.name === 'Getting Started' && renderGettingStartedSubmenu()}
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

            {/* Right side buttons */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 1.5 }
            }}>
              {isAuthenticated ? (
                <>
                  {/* Show on medium and up screens */}
                  <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    {renderAuthButtons()}
                  </Box>
                  
                  {/* Show only on xs screens */}
                  <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                    <Tooltip title="My Account">
                      <IconButton
                        onClick={handleUserMenuOpen}
                        sx={{
                          color: 'white',
                          border: '1px solid rgba(255, 255, 255, 0.5)',
                          borderRadius: '8px',
                          p: 0.8,
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'white'
                          }
                        }}
                      >
                        <Badge 
                          badgeContent={unreadMessageCount + ongoingOrdersCount} 
                          color="error"
                          sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}
                        >
                          <AccountCircleIcon />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ) : (
                <Button
                  variant="outlined"
                  component={Link}
                  href="/auth/login"
                  startIcon={<LoginIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
                  sx={{ 
                    borderRadius: '8px',
                    py: 0.75,
                    px: { xs: 1.5, sm: 2 },
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Log In
                </Button>
              )}
              
              {/* <Button
                variant="contained"
                component={Link}
                href="/schedule"
                startIcon={<ScheduleIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
                sx={{ 
                  borderRadius: '8px',
                  py: 0.75,
                  px: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  bgcolor: 'white',
                  color: TURQUOISE,
                  fontWeight: 600,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Schedule Pickup
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  Schedule
                </Box>
              </Button> */}
              
              {/* Mobile menu icon */}
              <IconButton
                size="large"
                aria-label="menu"
                color="inherit"
                onClick={toggleDrawer(true)}
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '8px',
                  p: 0.8,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile drawer */}
      {renderMobileDrawer()}
      
      {/* Toolbar spacer */}
      
    </>
  );
}