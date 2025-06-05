'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AppBar, Toolbar, Typography, Box, Button, Container, IconButton,
  Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse,
  Divider, useScrollTrigger, Fade, Paper, Popper, ClickAwayListener,
 useMediaQuery, Avatar, Menu, Badge, MenuItem, Tooltip
} from '@mui/material';

import {
  Menu as MenuIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon,
  Dry as DryCleaningIcon, LocalLaundryService as LaundryIcon, Wash as WashIcon,
  Home as HouseholdIcon, Login as LoginIcon, Schedule as ScheduleIcon,
  ChevronRight as ChevronRightIcon, AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon, ShoppingBag as OrdersIcon, Chat as ChatIcon,
  Dashboard as BasicPlanIcon, Star as PremiumPlanIcon, Business as EnterprisePlanIcon,
  SpaSharp as MassageSpa, LocalHospital as HealthcareIcon, Factory as CommercialIcon,
  FitnessCenter as GymIcon, RequestQuote as RequestQuoteIcon, Storefront as AirbnbIcon,
  Close as CloseIcon,PersonAddAlt1Outlined as SignUpIcon, LocationOn as LocationOnIcon
} from '@mui/icons-material';
import Logo from '../Assets/logo2.jpg';
import { useAuth } from '../contexts/AuthContext';
import {theme} from "../contexts/Theme"
import { useChat } from '@/contexts/ChatContext';

// Constants
const TURQUOISE = theme.palette.primary.main;
const DARK_TURQUOISE = theme.palette.primary.darkBlue;
const LIGHT_TURQUOISE = '#5de6d8';

// Navigation data - moved outside component
const navItems = [
  { name: 'Getting Started', path: '/howitwork', hasSubmenu: true },
  { name: 'FreshBox Care and Pricing', path: '/services', hasSubmenu: true },
  { name: 'Locations', path: '/locations', hasSubmenu: true },
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
  { name: 'Airbnb Laundry', path: '/commercial', icon: <AirbnbIcon />, description: 'Specialized service for rental properties' },
  { name: 'Massage & Spa Laundry', path: '/commercial', icon: <MassageSpa />, description: 'Luxury care for spa linens' },
  { name: 'Healthcare Laundry', path: '/commercial', icon: <HealthcareIcon />, description: 'Sanitized solutions for medical facilities' },
  { name: 'Gym Towel Laundry Service', path: '/commercial', icon: <GymIcon />, description: 'Fresh towels for fitness centers' },
  { name: 'Request a Commercial Quote', path: '/commercial', icon: <RequestQuoteIcon />, description: 'Get a customized business quote' },
];

// Replace locationsSubmenu with a flat array of states/areas
const locationsList = [
  'Alabama', 'Arizona', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Illinois', 'Iowa', 'Kansas', 'Kentucky', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Missouri',
  'Nebraska', 'Nevada', 'New Jersey', 'New York', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'Texas', 'Tennessee', 'Utah', 'Virginia', 'Washington D.C.', 'Washington', 'Coming Soon'
];

// Reusable styled components
const NavButton = ({ children, scrolled, light, ...props }) => {
  
  const { trigger, ...otherProps } = props;

  let textColor;

  if (light && !scrolled) {
    textColor = 'white';
  } else {
    textColor = theme.palette.primary.darkBlue;
  }
  
  return (
    <Button
    disableElevation
      color="inherit"
      {...otherProps}
      sx={{
        mx: { sm: 0.25, md: 0.25, lg: 0.5 },
        fontWeight: 600,
        px: { sm: 0.25, md: 0.5, lg: 1 },
        py: 0.75,
        color: textColor,
        fontSize: { sm: '0.6rem', md: '0.7rem', lg: '0.8rem' },
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
        },
        ...(props.sx || {}),
      }}
    >
      {children}
    </Button>
  );
};

// Helper to split array into N columns
const splitIntoColumns = (arr, numCols) => {
  const cols = Array.from({ length: numCols }, () => []);
  arr.forEach((item, idx) => {
    cols[idx % numCols].push(item);
  });
  return cols;
};

// Mobile-friendly locations list for drawer
const renderMobileLocationsList = (onClose) => {
  // Separate 'Coming Soon' from the rest
  const comingSoon = locationsList.filter(state => state === 'Coming Soon');
  const states = locationsList.filter(state => state !== 'Coming Soon');
  return (
    <Box sx={{ width: '100%', pb: 2 }}>
      {/* Header */}
      <Box sx={{
        px: 2,
        pt: 2,
        pb: 1,
        borderBottom: '1px solid',
        borderColor: 'rgba(29, 85, 95, 0.08)',
        background: theme.palette.primary.whitishMint,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: '#34D399', fontSize: 22 }} />
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1D555F' }}>
            Our Locations
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.95rem', color: '#1976d2', mt: 0.5 }}>
          Select your state to get started
        </Typography>
      </Box>
      {/* States list - single column for mobile */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        px: 2,
        py: 2,
        background: theme.palette.primary.whitishMint,
        maxHeight: 320,
        overflowY: 'auto',
      }}>
        {states.map((state) => (
          <Button
            key={state}
            component={Link}
            href={`/locations`}
            sx={{
              color: '#1976d2',
              fontWeight: 500,
              fontSize: '1.08rem',
              textTransform: 'none',
              justifyContent: 'flex-start',
              minWidth: 0,
              px: 0.5,
              py: 1.2,
              borderRadius: '8px',
              transition: 'all 0.18s',
              mb: 0.1,
              '&:hover': {
                textDecoration: 'underline',
                background: 'linear-gradient(90deg, #e6f9f7 0%, #fafdff 100%)',
                color: '#1251a3',
                boxShadow: '0 2px 8px rgba(40,221,205,0.07)'
              }
            }}
            fullWidth
            onClick={onClose}
          >
            {state}
          </Button>
        ))}
      </Box>
      {/* Coming Soon section */}
      {comingSoon.length > 0 && (
        <Box sx={{ px: 2, pt: 1 }}>
          <Divider sx={{ my: 1, borderColor: theme.palette.primary.whitishMint }} />
          <Button
            component={Link}
            href={`/locations`}
            sx={{
              color: '#bdbdbd',
              fontWeight: 500,
              fontSize: '1.08rem',
              textTransform: 'none',
              justifyContent: 'flex-start',
              minWidth: 0,
              px: 0.5,
              py: 1.2,
              borderRadius: '8px',
              background: 'rgba(29, 85, 95, 0.04)',
              cursor: 'not-allowed',
            }}
            fullWidth
            disabled
          >
            {comingSoon[0]}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default function Navbar({ light = false }) {
  const { user, logout, isAuthenticated } = useAuth();
  const {chats} = useChat()
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State management - grouped by functionality
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {usersOrders} = useAuth()
  
  // Menu states
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [commercialAnchorEl, setCommercialAnchorEl] = useState(null);
  const [gettingStartedAnchorEl, setGettingStartedAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [plansMenuAnchorEl, setPlansMenuAnchorEl] = useState(null);
  
  // Mobile menu states
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCommercialOpen, setMobileCommercialOpen] = useState(false);
  const [mobileGettingStartedOpen, setMobileGettingStartedOpen] = useState(false);
  const [userPlan, setUserPlan] = useState('Basic');

  // Add locations menu state
  const [locationsAnchorEl, setLocationsAnchorEl] = useState(null);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);

  // Derived states
  const servicesOpen = Boolean(servicesAnchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);
  const commercialOpen = Boolean(commercialAnchorEl);
  const gettingStartedOpen = Boolean(gettingStartedAnchorEl);
  const plansMenuOpen = Boolean(plansMenuAnchorEl);
  const locationsOpen = Boolean(locationsAnchorEl);
  
  // Menu IDs
  const servicesPopupId = servicesOpen ? 'services-popup-menu' : undefined;
  const userMenuId = userMenuOpen ? 'user-menu' : undefined;
  const commercialPopupId = commercialOpen ? 'commercial-popup-menu' : undefined;
  const gettingStartedPopupId = gettingStartedOpen ? 'getting-started-popup-menu' : undefined;
  const plansMenuId = plansMenuOpen ? 'plans-menu' : undefined;
  const locationsPopupId = locationsOpen ? 'locations-popup-menu' : undefined;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  // Effects
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  
    setUserPlan(user?.plan?.planName || '');


  }, [user]);

  // Event handlers - grouped by functionality
  const toggleDrawer = (open) => (event) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  // Menu handlers
  const handleServicesMenuOpen = (event) => setServicesAnchorEl(event.currentTarget);
  const handleServicesMenuClose = () => setServicesAnchorEl(null);
  const toggleMobileServicesMenu = () => setMobileServicesOpen(!mobileServicesOpen);
  
  const handleCommercialMenuOpen = (event) => setCommercialAnchorEl(event.currentTarget);
  const handleCommercialMenuClose = () => setCommercialAnchorEl(null);
  const toggleMobileCommercialMenu = () => setMobileCommercialOpen(!mobileCommercialOpen);

  const handleGettingStartedMenuOpen = (event) => setGettingStartedAnchorEl(event.currentTarget);
  const handleGettingStartedMenuClose = () => setGettingStartedAnchorEl(null);
  const toggleMobileGettingStartedMenu = () => setMobileGettingStartedOpen(!mobileGettingStartedOpen);
  
  // User menu handlers
  const handleUserMenuOpen = (event) => setUserMenuAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchorEl(null);
  
  const handlePlansMenuOpen = (event) => setPlansMenuAnchorEl(event.currentTarget);
  const handlePlansMenuClose = () => setPlansMenuAnchorEl(null);
  
  const navigateToPlan = (plan) => {
    handlePlansMenuClose();
    window.location.href = '/plans';
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      handleUserMenuClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Add locations menu handlers
  const handleLocationsMenuOpen = (event) => {
    if (locationsAnchorEl) {
      setLocationsAnchorEl(null); // Toggle off if already open
    } else {
      setLocationsAnchorEl(event.currentTarget); // Open
    }
  };
  const handleLocationsMenuClose = () => setLocationsAnchorEl(null);
  const toggleMobileLocationsMenu = () => setMobileLocationsOpen(!mobileLocationsOpen);

  // Helper functions
  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : 'U';

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

  // Reusable UI components
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
        '&:hover': { transform: 'scale(1.02)' }
      }}
    >
      <Box sx={{
        position: 'relative',
        width: { xs: 100, sm: 120, md: 140, lg: 160 },
        height: { xs: 50, sm: 60, md: 70, lg: 80 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10%',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        mr: { xs: 0.5, sm: 0.5 }
      }}>
        <Image
          src={Logo}
          alt="FreshBox Logo"
          priority
          fill
          sizes="(max-width: 600px) 100px, (max-width: 900px) 120px, (max-width: 1200px) 140px, 160px"
          style={{
            objectFit: 'contain',
            padding: '0px',
            maxWidth: '160px',
            maxHeight: '80px'
          }}
        />
      </Box>
    </Box>
  );

  // Submenu popper - now accepts full config object to reduce repetition
  const renderSubmenuWithPopper = ({
    id, open, anchorEl, handleClose, title, description, submenuItems, allLink, allLinkText
  }) => (
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
              width: { sm: 280, md: 300, lg: 320 },
              overflow: 'hidden',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: 'rgba(29, 85, 95, 0.1)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.05)'
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Box sx={{ p: 2 }}>
                <Box>
                  {submenuItems.map((item, index) => (
                    <Box
                      key={item.name}
                      component={Link}
                      href={item.path}
                      onClick={handleClose}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'text.primary',
                        py: 1.5,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          '& .item-title': {
                            color: '#1D555F', // Teal color from design
                          }
                        }
                      }}
                    >
                      <Box
                        className="icon-container"
                        sx={{
                          color: '#34D399', // Mint green color
                          mr: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 30,
                          height: 30
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        className="item-title"
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          color: '#1D555F', // Teal text color
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                {allLink && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                    disableElevation
                      component={Link}
                      href={allLink}
                      fullWidth
                      variant="text"
                      onClick={handleClose}
                      sx={{
                        color: '#1D555F', // Teal text color
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: 'rgba(29, 85, 95, 0.05)',
                          textDecoration: 'underline'
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
  // Simplify submenu renders by passing config objects
  const renderServicesSubmenu = () => renderSubmenuWithPopper({
    id: servicesPopupId,
    open: servicesOpen,
    anchorEl: servicesAnchorEl,
    handleClose: handleServicesMenuClose,
    title: "Our Services",
    description: "Professional laundry solutions for all your needs",
    submenuItems: serviceSubmenu,
    allLink: "/services",
    allLinkText: "View All Services & Pricing"
  });

  const renderCommercialSubmenu = () => renderSubmenuWithPopper({
    id: commercialPopupId,
    open: commercialOpen,
    anchorEl: commercialAnchorEl,
    handleClose: handleCommercialMenuClose,
    title: "Commercial Services",
    description: "Professional laundry solutions for businesses",
    submenuItems: CommercialSubMenu,
    allLink: "/commercial",
    allLinkText: "Learn More About Commercial Services"
  });

  const renderGettingStartedSubmenu = () => renderSubmenuWithPopper({
    id: gettingStartedPopupId,
    open: gettingStartedOpen,
    anchorEl: gettingStartedAnchorEl,
    handleClose: handleGettingStartedMenuClose,
    title: "Getting Started",
    description: "Learn how FreshBox works for you",
    submenuItems: GettingStartedSubMenu,
    allLink: null,
    allLinkText: null
  });

  // Replace renderLocationsSubmenu with a custom two-column grid
  const renderLocationsSubmenu = () => {
    // Separate 'Coming Soon' from the rest
    const comingSoon = locationsList.filter(state => state === 'Coming Soon');
    const states = locationsList.filter(state => state !== 'Coming Soon');
    const columns = splitIntoColumns(states, 2);
    return (
      <Popper
        id={locationsPopupId}
        open={locationsOpen}
        anchorEl={locationsAnchorEl}
        transition
        placement="bottom-start"
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={6}
              sx={{
                mt: 1.5,
                minWidth: 380,
                maxWidth: 480,
                px: 0,
                py: 0,
                borderRadius: '18px',
                border: '1px solid',
                borderColor: 'rgba(29, 85, 95, 0.12)',
                boxShadow: '0 8px 32px rgba(40,221,205,0.10)',
                background: 'linear-gradient(135deg, #fafdff 80%, #e6f9f7 100%)',
                overflow: 'hidden',
              }}
            >
              <ClickAwayListener onClickAway={handleLocationsMenuClose}>
                <Box>
                  {/* Header */}
                  <Box sx={{
                    px: 3,
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'rgba(29, 85, 95, 0.08)',
                    background: 'linear-gradient(90deg, #e6f9f7 0%, #fafdff 100%)',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon sx={{ color: '#34D399', fontSize: 22 }} />
                      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1D555F' }}>
                        Our Locations
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.92rem', color: '#1976d2', mt: 0.5 }}>
                      Select your state to get started
                    </Typography>
                  </Box>
                  {/* States grid */}
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 0,
                    px: 2.5,
                    py: 2,
                    background: theme.palette.primary.whitishMint,
                    maxHeight: 340,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                      borderRadius: '8px',
                      background: '#e6f9f7',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#b2dfdb',
                      borderRadius: '8px',
                    },
                  }}>
                    {columns.map((col, colIdx) => (
                      <Box key={colIdx}>
                        {col.map((state) => (
                          <Button
                            key={state}
                            component={Link}
                            href={`/locations`}
                            sx={{
                              color: '#1976d2',
                              fontWeight: 500,
                              fontSize: '1rem',
                              textTransform: 'none',
                              justifyContent: 'flex-start',
                              minWidth: 0,
                              px: 0,
                              py: 1.1,
                              borderRadius: '8px',
                              transition: 'all 0.18s',
                              mb: 0.2,
                              '&:hover': {
                                textDecoration: 'underline',
                                background: 'linear-gradient(90deg, #e6f9f7 0%, #fafdff 100%)',
                                color: '#1251a3',
                                boxShadow: '0 2px 8px rgba(40,221,205,0.07)'
                              }
                            }}
                            fullWidth
                            onClick={handleLocationsMenuClose}
                          >
                            {state}
                          </Button>
                        ))}
                      </Box>
                    ))}
                  </Box>
                  {/* Divider and Coming Soon */}
                  {/* {comingSoon.length > 0 && (
                    <>
                      <Divider sx={{ mx: 2.5, my: 0.5, borderColor: theme.palette.primary.whitishMint, }} />
                      <Box sx={{ px: 2.5, pb: 2, pt: 1 , background: theme.palette.primary.whitishMint,}}>
                        <Button
                          component={Link}
                          href={`/locations`}
                          sx={{
                            color: '#bdbdbd',
                            fontWeight: 500,
                            fontSize: '1rem',
                            textTransform: 'none',
                            justifyContent: 'flex-start',
                            minWidth: 0,
                            px: 0,
                            py: 1.1,
                            borderRadius: '8px',
                            
                            cursor: 'not-allowed',
                          }}
                          fullWidth
                          disabled
                        >
                          {comingSoon[0]}
                        </Button>
                      </Box>
                    </>
                  )} */}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    );
  };

  // Menu components
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
        color: DARK_TURQUOISE,
        
      }}>
        <Typography variant="subtitle1" fontWeight={600}>Select Plan</Typography>
        <Typography variant="body2">
          {userPlan === 'Basic' ? 'Upgrade for more features' : 'Manage your subscription'}
        </Typography>
      </Box>
      
      {/* Plan menu items */}
      {['Basic', 'Premium', 'Enterprise'].map(plan => {
        const isCurrentPlan = userPlan === plan;
        const planColors = {
          Basic: { color: '#1976d2', bgColor: 'rgba(25, 118, 210, 0.1)', hoverBg: 'rgba(25, 118, 210, 0.05)' },
          Premium: { color: '#FFD700', bgColor: 'rgba(255, 215, 0, 0.1)', hoverBg: 'rgba(255, 215, 0, 0.05)' },
          Enterprise: { color: '#6A0DAD', bgColor: 'rgba(106, 13, 173, 0.1)', hoverBg: 'rgba(106, 13, 173, 0.05)' }
        };
        
        const planIcons = {
          Basic: <BasicPlanIcon sx={{ mr: 1.5, fontSize: '1.25rem', color: planColors[plan].color }} />,
          Premium: <PremiumPlanIcon sx={{ mr: 1.5, fontSize: '1.25rem', color: planColors[plan].color }} />,
          Enterprise: <EnterprisePlanIcon sx={{ mr: 1.5, fontSize: '1.25rem', color: planColors[plan].color }} />
        };
        
        return (
          <MenuItem 
            key={plan}
            component={Link}
            href="/plans"
            onClick={() => navigateToPlan(plan)}
            sx={{ 
              py: 1.5, 
              bgcolor: isCurrentPlan ? planColors[plan].bgColor : 'transparent',
              color:'#0a1929',
              pointerEvents: isCurrentPlan ? 'none' : 'auto',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                bgcolor: isCurrentPlan ? planColors[plan].bgColor : planColors[plan].hoverBg
              }
            }}
          >
            {planIcons[plan]}
            <Box>
              <Typography fontWeight={isCurrentPlan ? 700 : 400}>
                {plan} Plan
                {isCurrentPlan && 
                  <Box component="span" sx={{ ml: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
                    (Current)
                  </Box>
                }
              </Typography>
              {!isCurrentPlan && 
                <Typography variant="body2" color="text.secondary">
                  {userPlan === 'Basic' ? `Upgrade to ${plan}` : 
                   plan === 'Basic' ? 'Switch back to Basic' : 
                   `Switch to ${plan}`}
                </Typography>
              }
            </Box>
          </MenuItem>
        );
      })}
      
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
        disableElevation
          fullWidth
          variant="contained"
          component={Link}
          href="/plans"
          sx={{ 
            borderRadius: '8px',
            bgcolor: TURQUOISE,
            color:DARK_TURQUOISE,
            transition: 'all 0.3s ease',
            '&:hover': { 
              bgcolor: DARK_TURQUOISE,
              color:TURQUOISE,
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
        color:DARK_TURQUOISE,
        
      }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {user?.name || 'Your Account'}
        </Typography>
        <Typography variant="body2">
          Manage your profile
        </Typography>
      </Box>
      
      {/* User menu items */}
      {[
        { path: '/profile', icon: <AccountCircleIcon />, label: 'My Profile' },
        { path: '/plan', icon: getPlanIcon(), label: `${userPlan} Plan` }
      ].map(item => (
        <MenuItem 
          key={item.path}
          component={Link}
          href={item.path}
          onClick={handleUserMenuClose}
          sx={{ 
            py: 1.5,
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(40, 221, 205, 0.05)',
              '& .MuiSvgIcon-root': {
                color: '#2E7B5C',
                transform: 'scale(1.1)'
              }
            }
          }}
        >
          <Box sx={{ 
            mr: 1.5, 
            display: 'flex',
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem', 
              color: 'text.secondary',
              transition: 'all 0.3s ease'
            }
          }}>
            {item.icon}
          </Box>
          <Typography>{item.label}</Typography>
        </MenuItem>
      ))}
      
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
  

  // Mobile drawer component
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
        {/* Drawer header */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'grey.100',
          backgroundColor:TURQUOISE,
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
              bgcolor:theme.palette.primary.whitishMint,
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
            <Typography variant="h6" component="div" sx={{ ml: 1.5, fontWeight: 700,color:DARK_TURQUOISE }}>
              FreshBox
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer content */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, py: 1 }}>
          {isAuthenticated && (
            <>
              {/* User profile section */}
              <Box sx={{ 
                mb: 2, 
                p: 2, 
                bgcolor: 'rgba(40, 221, 205, 0.05)', 
                borderRadius: '10px', 
                border: '1px solid', 
                borderColor: 'rgba(40, 221, 205, 0.2)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: TURQUOISE,
                      color: DARK_TURQUOISE,
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
                  disableElevation
                    variant="outlined"
                    size="small"
                    fullWidth
                    component={Link}
                    href="/profile"
                    startIcon={<AccountCircleIcon />}
                    sx={{ 
                      borderRadius: '8px',
                      bgColor: TURQUOISE,
                      color:DARK_TURQUOISE,
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
                  disableElevation
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{ 
                      borderRadius: '8px',
                      bgColor: TURQUOISE,
                      color:DARK_TURQUOISE,
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
                disableElevation
                  variant="contained"
                  component={Link}
                  href="/orders"
                  fullWidth
                  sx={{ 
                    borderRadius: '8px',
                    py: 1,
                    bgcolor: TURQUOISE,
                    color:DARK_TURQUOISE,
                    '&:hover': { bgcolor: DARK_TURQUOISE }
                  }}
                  startIcon={
                    <Badge badgeContent={usersOrders?.length} color="warning">
                      <OrdersIcon />
                    </Badge>
                  }
                >
                  Orders
                </Button>
                <Button
                disableElevation
                  variant="contained"
                  component={Link}
                  href="/chats"
                  fullWidth
                  sx={{ 
                    borderRadius: '8px',
                    py: 1,
                    bgcolor: TURQUOISE,
                    color:DARK_TURQUOISE,
                    '&:hover': { bgcolor: DARK_TURQUOISE }
                  }}
                  startIcon={
                    <Badge badgeContent={chats?.length} color="error">
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

          {/* Navigation menu */}
          <List sx={{ 
            '& .MuiListItem-root': { 
              borderRadius: '8px', 
              mb: 1,
              transition: 'all 0.3s ease',
              bgcolor: theme.palette.primary.whitishMint,
              color:DARK_TURQUOISE,
              '&:hover': {
                bgcolor: DARK_TURQUOISE,
                    color:TURQUOISE,
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
                      item.name === 'Getting Started' ? toggleMobileGettingStartedMenu :
                      item.name === 'Locations' ? toggleMobileLocationsMenu : null
                    }
                    sx={{ 
                      py: 1.5,
                      bgcolor: (
                        (item.name === 'FreshBox Care and Pricing' && mobileServicesOpen) ||
                        (item.name === 'Commercial' && mobileCommercialOpen) ||
                        (item.name === 'Getting Started' && mobileGettingStartedOpen) ||
                        (item.name === 'Locations' && mobileLocationsOpen)
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
                          (item.name === 'Getting Started' && mobileGettingStartedOpen) ||
                          (item.name === 'Locations' && mobileLocationsOpen)
                        ) ? TURQUOISE : 'inherit'
                      }}
                    />
                    {(
                      (item.name === 'FreshBox Care and Pricing' && mobileServicesOpen) ||
                      (item.name === 'Commercial' && mobileCommercialOpen) ||
                      (item.name === 'Getting Started' && mobileGettingStartedOpen) ||
                      (item.name === 'Locations' && mobileLocationsOpen)
                    ) ? 
                      <ExpandLessIcon sx={{ color: TURQUOISE }} /> : 
                      <ExpandMoreIcon />
                    }
                  </ListItem>
                  
                  {/* Submenu for each category */}
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
                                  color: DARK_TURQUOISE
                                }
                              }
                            }}
                          >
                            <ListItemIcon sx={{ 
                              minWidth: 40, 
                              color: DARK_TURQUOISE,
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
                        disableElevation
                          component={Link}
                          href="/services"
                          onClick={toggleDrawer(false)}
                          fullWidth
                          sx={{ 
                            mt: 1, 
                            mb: 1,
                            ml: 2,
                            borderRadius: '8px', 
                            color: DARK_TURQUOISE,
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
                              color:DARK_TURQUOISE,
                              bgColor:TURQUOISE,
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
                        disableElevation
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
                                bgcolor: '#2E7B5C',
                                '& .MuiListItemIcon-root': {
                                  color: TURQUOISE
                                }
                              }
                            }}
                          >
                            <ListItemIcon sx={{ 
                              minWidth: 40, 
                              color: '#2E7B5C',
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
                  
                  {item.name === 'Locations' && (
                    <Collapse in={mobileLocationsOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {renderMobileLocationsList(toggleDrawer(false))}
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

        {/* Drawer footer */}
        <Box sx={{ 
  p: 2, 
  borderTop: '1px solid', 
  borderColor: 'grey.100',
  bgcolor: 'grey.50'
}}>
  {!isAuthenticated && (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
      disableElevation
        variant="contained"
        component={Link}
        href="/auth/login"
        startIcon={<LoginIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
        sx={{ 
          
          py: 0.75,
          px: { xs: 1.5, sm: 2 },
          fontWeight:'bolder',
          fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
          color: DARK_TURQUOISE,
          bgColor: TURQUOISE,
          
          
          flexGrow: 1
        }}
      >
        Log In
      </Button>
      <Button
      disableElevation
        variant="outlined"
        component={Link}
        href="/auth/register"
        startIcon={<SignUpIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
        sx={{ 
          
          py: 0.75,
          px: { xs: 1.5, sm: 2 },
          fontWeight:'bolder',
          fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
          color: DARK_TURQUOISE,
          bgColor: TURQUOISE,
          
          flexGrow: 1
        }}
      >
        SignUp
      </Button>
    </Box>
  )}
</Box>
      </Box>
    </Drawer>
  );

  // Render authenticated user buttons
  const renderAuthButtons = () => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: { sm: 0.25, md: 0.5, lg: 1 }
    }}>
      {/* Plan dropdown button */}
      <Tooltip title={`${userPlan} Plan`}>
        <Button
        disableElevation
          color="inherit"
          onClick={handlePlansMenuOpen}
          aria-controls={plansMenuId}
          aria-haspopup="true"
          endIcon={<ExpandMoreIcon sx={{ 
            color: scrolled ? '#0a1929' : '#0a1929',
            display: { sm: 'none', md: 'inline-flex' },
            fontSize: { sm: '0.8rem', md: '1rem' }
          }} />}
          
          sx={{ 
          
            fontWeight: 600,
            borderRadius: '6px',
            px: { sm: 0.25, md: 0.5, lg: 1 },
            py: 0.5,
            minWidth: { sm: 'auto' },
            color: scrolled ? '#0a1929' : '#0a1929',
            fontSize: { sm: '0.6rem', md: '0.7rem', lg: '0.8rem' },
            whiteSpace: 'nowrap',
      
            border: scrolled ? '1px solid #0a1929' : '1px solid rgba(255, 255, 255, 0.5)',
            '&:hover': { 
              bgcolor: scrolled ? 'rgba(10, 25, 41, 0.04)' : 'rgba(255, 255, 255, 0.1)',
              borderColor: scrolled ? '#0a1929' : '#0a1929'
            },
            transition: 'all 0.3s ease'
          }}
        >
          {getPlanIcon()}
          <Box sx={{ 
            ml: { sm: 0, md: 0.25, lg: 0.5 }, 
            display: { sm: 'none', md: 'block' } 
          }}>
            {userPlan}
          </Box>
        </Button>
      </Tooltip>
      
      {/* Orders Button with Badge */}
      <Tooltip title="My Orders">
        <Button
        disableElevation
          color="inherit"
          component={Link}
          href="/orders"
          sx={{ 
            fontWeight: 600,
            borderRadius: '6px',
            px: { sm: 0.25, md: 0.5, lg: 1 },
            py: 0.5,
            minWidth: { sm: 'auto' },
            color: scrolled ? '#0a1929' : '#0a1929',
            fontSize: { sm: '0.6rem', md: '0.7rem', lg: '0.8rem' },
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: scrolled ? 'rgba(10, 25, 41, 0.04)' : 'rgba(255, 255, 255, 0.1)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <Badge 
            badgeContent={usersOrders?.length} 
            color="warning" 
            sx={{ padding: '1px' }}
          >
            <OrdersIcon sx={{ 
              fontSize: { sm: '0.9rem', md: '1rem', lg: '1.1rem' },
              mr: { sm: 0, md: 0.25, lg: 0.5 },
              color: scrolled ? '#0a1929' : '#0a1929'
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
        disableElevation
          color="inherit"
          component={Link}
          href="/chat"
          sx={{ 
            fontWeight: 600,
            borderRadius: '6px',
            px: { sm: 0.25, md: 0.5, lg: 1 },
            py: 0.5,
            minWidth: { sm: 'auto' },
            color: scrolled ? '#0a1929' : '#0a1929',
            fontSize: { sm: '0.6rem', md: '0.7rem', lg: '0.8rem' },
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: scrolled ? 'rgba(10, 25, 41, 0.04)' : 'rgba(255, 255, 255, 0.1)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <Badge 
            badgeContent={chats?.length} 
            color="error" 
            sx={{ padding: '1px' }}
          >
            <ChatIcon sx={{ 
              fontSize: { sm: '0.9rem', md: '1rem', lg: '1.1rem' },
              mr: { sm: 0, md: 0.25, lg: 0.5 },
              color: scrolled ? '#0a1929' : '#0a1929'
            }} />
          </Badge>
          <Box sx={{ display: { sm: 'none', md: 'block' } }}>
            Chats
          </Box>
        </Button>
      </Tooltip>
      
      {/* User Profile Button */}
      <Button
      disableElevation
        color="inherit"
        aria-controls={userMenuId}
        aria-haspopup="true"
        onClick={handleUserMenuOpen}
        sx={{ 
          fontWeight: 600,
          borderRadius: '6px',
          px: { sm: 0.25, md: 0.5, lg: 1 },
          py: 0.5,
          color: scrolled ? theme.palette.primary.darkBlue : '#0a1929',
          fontSize: { sm: '0.6rem', md: '0.7rem', lg: '0.8rem' },
          whiteSpace: 'nowrap',
          textTransform: 'none',
          minWidth: { sm: 'auto' },
          '&:hover': {
            bgcolor: scrolled ? 'rgba(10, 25, 41, 0.04)' : 'rgba(255, 255, 255, 0.1)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <Avatar 
          sx={{ 
            width: { sm: 22, md: 24, lg: 26 }, 
            height: { sm: 22, md: 24, lg: 26 }, 
            bgcolor: scrolled? theme.palette.primary.darkBlue : theme.palette.primary.darkBlue,
            color: scrolled? theme.palette.primary.darkBlue : theme.palette.primary.darkBlue,
            fontSize: { sm: '0.6rem', md: '0.7rem', lg: '0.8rem' },
            mr: { sm: 0, md: 0.25, lg: 0.5 },
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

  // Main render
  // Replace the entire return statement in your Navbar component with this:

return (
  <>
    {/* Render various menus */}
    {renderPlansMenu()}
    {renderUserMenu()}
    {renderLocationsSubmenu()}
    {renderMobileDrawer()}
    
    <AppBar
      component="header" 
      position="fixed" 
      elevation={0}
      sx={{
        bgcolor: light 
          ? (scrolled ? TURQUOISE : "transparent") 
          : (scrolled ? theme.palette.primary.main : theme.palette.primary.main),
        background: light 
          ? (scrolled ? TURQUOISE : "transparent") 
          : (scrolled ? theme.palette.primary.main : theme.palette.primary.main),
        color: light 
          ? (scrolled ? theme.palette.primary.darkBlue : '#0a1929') 
          : theme.palette.primary.darkBlue,
        boxShadow: scrolled ? "0px 2px 8px rgba(0, 0, 0, 0.15)" : "none",
        transition: "all 0.3s ease",
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        marginTop: 0,
        paddingTop: 0
      }}
    >
      <Container 
        maxWidth="xl"
        sx={{ px: { xs: 2, sm: 3 } }} // Added horizontal padding
      >
        <Toolbar disableGutters>
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
  scrolled={scrolled}
  light={light}  // Add this line
  endIcon={<ExpandMoreIcon />}
  onClick={
    item.name === 'FreshBox Care and Pricing' ? handleServicesMenuOpen :
    item.name === 'Commercial' ? handleCommercialMenuOpen :
    item.name === 'Getting Started' ? handleGettingStartedMenuOpen :
    item.name === 'Locations' ? handleLocationsMenuOpen : null
  }
  aria-describedby={
    item.name === 'FreshBox Care and Pricing' ? servicesPopupId :
    item.name === 'Commercial' ? commercialPopupId :
    item.name === 'Getting Started' ? gettingStartedPopupId :
    item.name === 'Locations' ? locationsPopupId : undefined
  }
>
  {item.name}
</NavButton>
                  {item.name === 'FreshBox Care and Pricing' && renderServicesSubmenu()}
                  {item.name === 'Commercial' && renderCommercialSubmenu()}
                  {item.name === 'Getting Started' && renderGettingStartedSubmenu()}
                  {item.name === 'Locations' && renderLocationsSubmenu()}
                </Box>
              ) : (
                <NavButton 
                key={item.name}
                scrolled={scrolled}
                light={light}  // Add this line
                component={Link}
                href={item.path}
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
            gap: { xs: 1, sm: 1.5 },
            pr: { xs: 1, sm: 2 } // Added right padding
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
                        
                        p: 0.8,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: 'white'
                        }
                      }}
                    >
                      <Badge 
                        badgeContent={chats?.length} 
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
              <>
                <Button
                disableElevation
                  variant="contained"
                  component={Link}
                  href="/auth/login"
                  startIcon={<LoginIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
                  sx={{ 
                    
                    py: 0.75,
                    px: { xs: 1.5, sm: 2 },
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    color: scrolled ? '#94FFD4' : '#0a1929',
                    bgcolor:scrolled ? '#0a1929':'#94FFD4',
                   
                    transition: 'all 0.3s ease'
                  }}
                >
                  Log In
                </Button>
                <Button
                disableElevation
                  variant="contained"
                  component={Link}
                  href="/auth/register"
                  startIcon={<SignUpIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
                  sx={{ 
                    
                    py: 0.75,
                    px: { xs: 1.5, sm: 2 },
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    color: scrolled ? '#94FFD4' : '#E3FEF7',
                    
                    bgcolor:scrolled ? '#0a1929':'#135D66',
                    
                    
                  }}
                >
                  SignUp
                </Button>
              </>
            )}
            
            {/* Mobile menu icon */}
            <IconButton
              aria-label="menu"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                color: scrolled ? '#0a1929' : 'white',
                border: scrolled ? '1px solid #0a1929' : '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '8px',
                p: { xs: 1, sm: 0.8 },
                backgroundColor: scrolled ? 'rgba(40, 221, 205, 0.1)' : 'rgba(40, 221, 205, 0.2)',
                
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </>
);
}