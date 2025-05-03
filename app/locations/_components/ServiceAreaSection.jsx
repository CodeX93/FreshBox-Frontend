'use client';
import React, { useEffect, useState } from 'react';
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
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { theme } from '../../../contexts/Theme';
import { useServices } from '../../../contexts/ServicesContext';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const fallbackCenter = { lat: 52.3555, lng: -1.1743 }; // England

const zoom = 6;

const dummyServiceAreas = [
  {
    name: 'Central London',
    zipCode: '12345',
    city: 'London',
    state: 'England',
    serviceDays: ['Monday', 'Wednesday', 'Friday'],
    deliveryFee: 4.99,
    minOrderValue: 20,
    estimatedDeliveryTime: '24 hours',
    activeServices: 15,
    coverage: 'Zone 1-3',
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    name: 'Manchester West',
    zipCode: '23456',
    city: 'Manchester',
    state: 'England',
    serviceDays: ['Tuesday', 'Thursday'],
    deliveryFee: 3.99,
    minOrderValue: 15,
    estimatedDeliveryTime: '48 hours',
    activeServices: 10,
    coverage: 'West Side',
    lat: 53.4808,
    lng: -2.2426,
  },
  {
    name: 'Birmingham Central',
    zipCode: '34567',
    city: 'Birmingham',
    state: 'England',
    serviceDays: ['Monday', 'Saturday'],
    deliveryFee: 2.5,
    minOrderValue: 10,
    estimatedDeliveryTime: '24-48 hours',
    activeServices: 20,
    coverage: 'Downtown',
    lat: 52.4862,
    lng: -1.8904,
  },
  {
    name: 'Liverpool City',
    zipCode: '45678',
    city: 'Liverpool',
    state: 'England',
    serviceDays: ['Wednesday', 'Friday'],
    deliveryFee: 5,
    minOrderValue: 25,
    estimatedDeliveryTime: '36 hours',
    activeServices: 8,
    coverage: 'City Center',
    lat: 53.4084,
    lng: -2.9916,
  },
];

const ServiceAreaSection = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDnG4NCG4G_ZvCJLjz5KTlwmVORy0s31Ok',
    libraries,
  });

  const [selectedArea, setSelectedArea] = useState(null);
  const [userCenter, setUserCenter] = useState(fallbackCenter);
  const { servicesAreas } = useServices()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserCenter({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => setUserCenter(fallbackCenter)
      );
    }
  }, []);

  return (
    <Box sx={{ py: 8, backgroundColor: theme.palette.primary.whitishMint }}>
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
          <Grid item xs={12} md={8}>
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
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={userCenter}
                  zoom={zoom}
                  options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                  }}
                >
                  {servicesAreas?.map((area, idx) => (
                    <Marker
                      key={idx}
                      position={{
                        lat: area.location.coordinates[1], // Latitude
                        lng: area.location.coordinates[0]  // Longitude
                      }}
                      onClick={() => setSelectedArea(area)}
                      label={{
                        text: area.city,
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '14px',
                      }}
                    />
                  ))}

                  {selectedArea && (
                    <InfoWindow
                      position={{ lat:selectedArea.location.coordinates[1], lng: selectedArea.location.coordinates[0]}}
                      onCloseClick={() => setSelectedArea(null)}
                    >
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {selectedArea.name}
                        </Typography>
                        <Typography variant="body2">Zip: {selectedArea.zipCode}</Typography>
                        <Typography variant="body2">City: {selectedArea.city}</Typography>
                        <Typography variant="body2">State: {selectedArea.state}</Typography>
                        <Typography variant="body2">Min Order: £{selectedArea.minOrderValue}</Typography>
                        <Typography variant="body2">Delivery Fee: £{selectedArea.deliveryFee}</Typography>
                        <Typography variant="body2">ETA: {selectedArea.estimatedDeliveryTime}</Typography>
                      </Box>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <Box sx={{ width: '100%', height: '100%', backgroundColor: 'grey.300' }} />
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: theme.palette.primary.darkBlue,
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <RoomOutlinedIcon sx={{ color: theme.palette.primary.yellowish, fontSize: 30 }} />
              </Box>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                fontWeight={600}
                sx={{ color: theme.palette.primary.yellowish }}
              >
                Service Area Legend
              </Typography>
              <List sx={{ mt: 2 }}>
                <LegendItem
                  icon={<CheckCircleIcon sx={{ color: theme.palette.success.yellowish }} />}
                  title="Active Service Areas"
                  subtitle="Same-day service available"
                  delay={0.2}
                  Textcolor={theme.palette.primary.yellowish}
                />
                <LegendItem
                  icon={<ScheduleIcon sx={{ color: theme.palette.warning.yellowish }} />}
                  title="Coming Soon Areas"
                  subtitle="Launching soon"
                  delay={0.4}
                  Textcolor={theme.palette.primary.yellowish}
                />
                <LegendItem
                  icon={<CancelIcon sx={{ color: theme.palette.error.yellowish }} />}
                  title="Not Available"
                  subtitle="Join our waitlist"
                  delay={0.6}
                  Textcolor={theme.palette.primary.yellowish}
                />
              </List>
              <Box sx={{ mt: 'auto', pt: 2 }}>
                <Typography variant="body2" color={theme.palette.primary.yellowish}>
                  More areas coming soon. Stay tuned!
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const LegendItem = ({ icon, title, subtitle, delay, Textcolor }) => (
  <ListItem
    component={motion.li}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
  >
    <ListItemIcon sx={{ color: Textcolor }}>{icon}</ListItemIcon>
    <ListItemText
      primary={title}
      secondary={subtitle}
      primaryTypographyProps={{ sx: { color: Textcolor } }}
      secondaryTypographyProps={{ sx: { color: Textcolor } }}
    />
  </ListItem>
);

export default ServiceAreaSection;
