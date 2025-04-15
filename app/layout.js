'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollTop';
import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

// Create responsive theme
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#28ddcd',
      light: '#E3FEF7',
      dark: '#20c5b7',
      contrastText: '#E3FEF7',
    },
    secondary: {
      main: '#ff6b6b',
      light: '#ff9a9a',
      dark: '#c73e3e',
      contrastText: '#E3FEF7',
    },
    background: {
      default: '#f8f9fa',
      paper: '#E3FEF7',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:960px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '3rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:960px)': {
        fontSize: '2.25rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (min-width:960px)': {
        fontSize: '1.1rem',
      },
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
          padding: 0,
          backgroundColor: 'transparent',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: '4px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Remove the default box-shadow for AppBar
          boxShadow: 'none',
          // Only apply shadow when scrolled - this will be controlled by your Navbar component
          '&.scrolled': {
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: {
            xs: 0,
            sm: 0,
            md: 0,
          },
          paddingRight: {
            xs: 0,
            sm: 0,
            md: 0,
          },
        },
      },
    },
  },
});

export default function RootLayout({ children }) {
  // State to track screen size for responsive adjustments
  const [isMobile, setIsMobile] = useState(false);

  // Effect to monitor screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < theme.breakpoints.values.md);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#28ddcd" />
        <title>FreshBox - Professional Laundry Services</title>
        <meta name="description" content="Your one-stop solution for all laundry needs" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                overflow: 'hidden',
                // Removed minHeight: '100vh' to prevent forced spacing
                m: 0, // Explicitly set margin to 0
                p: 0, // Explicitly set padding to 0
              }}
            >
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  width: '100%',
                  // Removed padding that was causing white space
                  pt: 0,
                  pb: 0,
                  m: 0,
                }}
              >
                {children}
              </Box>
              
              <Footer />
              <ScrollToTop />
            </Box>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}