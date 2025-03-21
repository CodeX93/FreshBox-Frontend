'use client';
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Fade,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { GoogleMap, useLoadScript, OverlayView } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const center = {
  lat: 40.7128,
  lng: -74.006,
};
const zoom = 11;

const serviceAreas = [
  { color: 'success.main', bounds: { top: 20, left: 10, width: 25, height: 35 }, delay: 0.2 },
  { color: 'info.main', bounds: { top: 15, left: 40, width: 30, height: 25 }, delay: 0.4 },
  { color: 'warning.main', bounds: { top: 50, left: 30, width: 40, height: 30 }, delay: 0.6 },
  { color: 'error.main', bounds: { top: 65, left: 10, width: 20, height: 20 }, delay: 0.8 },
];

const ServiceAreaSection = () => {
  const theme = useTheme();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const renderOverlay = ({ color, bounds, delay, key }) => (
    <Box
    key={key}
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.7, scale: 1 }}
      transition={{
        duration: 0.7,
        delay,
        type: 'spring',
        stiffness: 100,
      }}
      viewport={{ once: true }}
      sx={{
        position: 'absolute',
        top: `${bounds.top}%`,
        left: `${bounds.left}%`,
        width: `${bounds.width}%`,
        height: `${bounds.height}%`,
        backgroundColor: theme.palette[color],
        borderRadius: 2,
        border: '2px solid white',
        boxShadow: 2,
        zIndex: 2,
      }}
    />
  );

  return (
    <Box sx={{ py: 8, backgroundColor: theme.palette.grey[50] }}>
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 6 }}
          >
            Our Service Areas
          </Typography>
        </Fade>

        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={8}
            component={motion.div}
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Paper
              elevation={3}
              sx={{
                position: 'relative',
                height: '500px',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              {isLoaded ? (
                <Box sx={{ width: '100%', height: '100%' }}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={zoom}
                    options={{ disableDefaultUI: true, styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }] }}
                  >
                    {/* Optional: Add markers or service polygons here */}
                  </GoogleMap>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'grey.300',
                  }}
                />
              )}
              {/* Overlay placeholders to visualize service zones */}
              {serviceAreas.map((area, idx) =>
  renderOverlay({ color: area.color, bounds: area.bounds, delay: area.delay, key: `overlay-${idx}` })
)}

            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            component={motion.div}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                Service Area Legend
              </Typography>

              <List sx={{ mt: 2 }}>
                <LegendItem
                  icon={<CheckCircleIcon sx={{ color: theme.palette.success.main }} />}
                  title="Active Service Areas"
                  subtitle="Same-day service available with flexible scheduling"
                  delay={0.2}
                />
                <LegendItem
                  icon={<CheckCircleIcon sx={{ color: theme.palette.info.main }} />}
                  title="Premium Express Zones"
                  subtitle="3-hour turnaround available"
                  delay={0.4}
                />
                <LegendItem
                  icon={<ScheduleIcon sx={{ color: theme.palette.warning.main }} />}
                  title="Coming Soon Areas"
                  subtitle="Service launching within 30 days"
                  delay={0.6}
                />
                <LegendItem
                  icon={<CancelIcon sx={{ color: theme.palette.error.main }} />}
                  title="Not Yet Available"
                  subtitle="Join our waitlist for service updates"
                  delay={0.8}
                />
              </List>

              <Box sx={{ mt: 'auto', pt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Our service areas are constantly expanding. Check back regularly or join our
                  waitlist to be notified when we reach your neighborhood.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const LegendItem = ({ icon, title, subtitle, delay }) => (
  <ListItem
    component={motion.li}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} secondary={subtitle} />
  </ListItem>
);

export default ServiceAreaSection;
