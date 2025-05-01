'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../lib/theme';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ServicesProvider } from '@/contexts/ServicesContext';
import { ChatProvider } from '@/contexts/ChatContext';

export function Providers({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  return (
    <AuthProvider>
    <ServicesProvider>
      <ChatProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
      </ChatProvider>
      </ServicesProvider>
    </AuthProvider>
  );
}
