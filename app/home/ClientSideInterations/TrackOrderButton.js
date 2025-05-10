'use client';

import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import OrderSearchModal from '../_components/OrderSearchModal';

export default function TrackOrderButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 1000,
        }}
      >
        <Fab
          variant="extended"
   
          onClick={handleOpenModal}
          aria-label="track order"
          sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', backgroundColor:'#94FFD4' }}
        >
          <LocalShippingIcon sx={{ mr: 1 }} />
          Track Order
        </Fab>
      </Box>

      <OrderSearchModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
}
