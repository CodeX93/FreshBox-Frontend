import React, { useState, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  Grid,
  Chip,
  Button,
  ButtonGroup,
  Fade,
  Divider,
  Tabs,
  Tab,
  ThemeProvider
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { theme } from '../../../contexts/Theme'; // Import your theme context

// Mock ZIP code data with neighborhoods
const ZIP_CODE_DATA = {
  AVAILABLE: [
    { zip: '10001', neighborhood: 'Chelsea' },
    { zip: '10002', neighborhood: 'Lower East Side' },
    { zip: '10003', neighborhood: 'East Village' },
    { zip: '10016', neighborhood: 'Murray Hill' },
    { zip: '10017', neighborhood: 'Midtown East' },
    { zip: '10018', neighborhood: 'Midtown' },
    { zip: '10019', neighborhood: 'Midtown West' },
    { zip: '10020', neighborhood: 'Midtown' },
    { zip: '10022', neighborhood: 'Midtown East' },
    { zip: '10023', neighborhood: 'Upper West Side' },
    { zip: '10024', neighborhood: 'Upper West Side' },
  ],
  COMING_SOON: [
    { zip: '10004', neighborhood: 'Financial District', eta: '30 days' },
    { zip: '10005', neighborhood: 'Financial District', eta: '30 days' },
    { zip: '10006', neighborhood: 'Financial District', eta: '30 days' },
    { zip: '10007', neighborhood: 'Tribeca', eta: '45 days' },
    { zip: '10012', neighborhood: 'SoHo', eta: '14 days' },
    { zip: '10013', neighborhood: 'SoHo', eta: '21 days' },
    { zip: '10014', neighborhood: 'West Village', eta: '21 days' },
    { zip: '10021', neighborhood: 'Upper East Side', eta: '45 days' },
    { zip: '10028', neighborhood: 'Upper East Side', eta: '45 days' },
  ],
  WAITLIST: [
    { zip: '10008', neighborhood: 'Lower Manhattan' },
    { zip: '10009', neighborhood: 'East Village' },
    { zip: '10010', neighborhood: 'Gramercy Park' },
    { zip: '10011', neighborhood: 'Chelsea' },
    { zip: '10015', neighborhood: 'Financial District' },
    { zip: '10025', neighborhood: 'Upper West Side' },
    { zip: '10026', neighborhood: 'Harlem' },
    { zip: '10027', neighborhood: 'Morningside Heights' },
    { zip: '10029', neighborhood: 'East Harlem' },
    { zip: '10030', neighborhood: 'Harlem' },
  ]
};

const AvailabilitySection = () => {
  // Use your theme instead of useTheme hook
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Helper to render the chips based on status
  const renderStatusChip = (status, eta = null) => {
    switch(status) {
      case 'available':
        return (
          <Chip 
            icon={<CheckCircleIcon />} 
            label="Available" 
            color="success" 
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      case 'coming-soon':
        return (
          <Chip 
            icon={<PendingIcon />} 
            label={eta ? `Coming in ${eta}` : "Coming Soon"} 
            color="warning" 
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      case 'waitlist':
        return (
          <Chip 
            icon={<ErrorIcon />} 
            label="Waitlist Only" 
            color="error"
            variant="outlined" 
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      default:
        return null;
    }
  };

  // Define the currently active data based on tab
  const getActiveData = () => {
    switch(activeTab) {
      case 0: return ZIP_CODE_DATA.AVAILABLE;
      case 1: return ZIP_CODE_DATA.COMING_SOON;
      case 2: return ZIP_CODE_DATA.WAITLIST;
      default: return [];
    }
  };

  const activeStatus = ['available', 'coming-soon', 'waitlist'][activeTab];
  const activeData = getActiveData();

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          py: 8,
          backgroundColor: '#fff'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h2" // Using h2 from your theme
                component="h2" 
                align="center" 
                gutterBottom
                sx={{ 
                  mb: 2 
                  // Using theme fontWeight instead of hardcoded 700
                }}
              >
                Service Availability by Area
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography 
                variant="h6" 
                align="center" 
                color="text.secondary"
                sx={{ mb: 5, maxWidth: '700px', mx: 'auto' }}
              >
                Browse our service coverage by ZIP code and neighborhood
              </Typography>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 4 
              }}
            >
              <Paper 
                elevation={1}
                sx={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                  mb: 4
                }}
              >
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  variant="fullWidth"
                  TabIndicatorProps={{
                    style: {
                      display: 'none',
                    }
                  }}
                  sx={{
                    '& .MuiTab-root': {
                      py: 2,
                      minWidth: { xs: '100px', sm: '150px' },
                      backgroundColor: theme.palette.grey[100],
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.primary.main, // Using your primary turquoise
                        fontWeight: 600
                      },
                    }
                  }}
                >
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon fontSize="small" />
                        <Typography>Available</Typography>
                        <Chip 
                          label={ZIP_CODE_DATA.AVAILABLE.length} 
                          size="small" 
                          color={activeTab === 0 ? "primary" : "default"}
                          sx={{ ml: 0.5 }}
                        />
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PendingIcon fontSize="small" />
                        <Typography>Coming Soon</Typography>
                        <Chip 
                          label={ZIP_CODE_DATA.COMING_SOON.length} 
                          size="small" 
                          color={activeTab === 1 ? "primary" : "default"}
                          sx={{ ml: 0.5 }}
                        />
                      </Box>
                    }
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ErrorIcon fontSize="small" />
                        <Typography>Waitlist</Typography>
                        <Chip 
                          label={ZIP_CODE_DATA.WAITLIST.length} 
                          size="small" 
                          color={activeTab === 2 ? "primary" : "default"}
                          sx={{ ml: 0.5 }}
                        />
                      </Box>
                    }
                  />
                </Tabs>
              </Paper>

              <ButtonGroup 
                variant="outlined" 
                size="small" 
                sx={{ mb: 4 }}
              >
                <Button 
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                  sx={{
                    // Using your theme colors
                    color: viewMode === 'grid' ? '#fff' : theme.palette.primary.main,
                    backgroundColor: viewMode === 'grid' ? theme.palette.primary.main : 'transparent',
                    '&:hover': {
                      backgroundColor: viewMode === 'grid' ? theme.palette.primary.dark : theme.palette.primary.light,
                    }
                  }}
                >
                  Grid View
                </Button>
                <Button 
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'contained' : 'outlined'}
                  sx={{
                    // Using your theme colors
                    color: viewMode === 'list' ? '#fff' : theme.palette.primary.main,
                    backgroundColor: viewMode === 'list' ? theme.palette.primary.main : 'transparent',
                    '&:hover': {
                      backgroundColor: viewMode === 'list' ? theme.palette.primary.dark : theme.palette.primary.light,
                    }
                  }}
                >
                  List View
                </Button>
              </ButtonGroup>
            </motion.div>

            {viewMode === 'grid' ? (
              <Grid container spacing={2}>
                {activeData.map((item, index) => (
                  <Grid item xs={6} sm={4} md={3} key={item.zip}>
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)' 
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`,
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {item.zip}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ mb: 2 }}
                        >
                          {item.neighborhood}
                        </Typography>
                        {renderStatusChip(activeStatus, item.eta)}
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper 
                elevation={3}
                sx={{ 
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ p: 3, backgroundColor: theme.palette.grey[50] }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <PlaylistAddCheckIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography variant="h6" component="h3" fontWeight={600}>
                      {activeTab === 0 ? 'Available Areas' : 
                      activeTab === 1 ? 'Coming Soon Areas' : 'Waitlist Only Areas'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {activeTab === 0 ? 'These areas have active service with same or next-day availability' : 
                    activeTab === 1 ? 'Service is coming to these areas soon - join the waitlist for priority access' : 
                    'These areas are not currently scheduled for service, but adding your name to the waitlist helps us prioritize expansion'}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  {activeData.map((item, index) => (
                    <React.Fragment key={item.zip}>
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ backgroundColor: theme.palette.action.hover }}
                      >
                        <Box 
                          sx={{ 
                            py: 2, 
                            px: 1,
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: 1,
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <Box>
                            <Typography 
                              variant="subtitle1" 
                              component="span" 
                              sx={{ fontWeight: 600, mr: 1 }}
                            >
                              {item.zip}
                            </Typography>
                          </Box>
                          <Box>
                            {renderStatusChip(activeStatus, item.eta)}
                          </Box>
                        </Box>
                      </motion.div>
                      {index < activeData.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </Box>
              </Paper>
            )}
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AvailabilitySection;  