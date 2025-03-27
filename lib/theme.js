import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: 'transparent',  // Change default background to transparent
      paper: 'transparent',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body {
          margin: 0;
          padding: 0;
          border: none;
          outline: none;
          overflow-x: hidden;
        }
        body::before {
          display: none !important;
        }
      `,
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          background: 'transparent',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          background: 'transparent',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          background: 'transparent',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // Ensure Paper components from MUI don't affect the AppBar
          '&.MuiAppBar-root': {
            backgroundColor: 'transparent',
            background: 'transparent',
          },
        },
      },
    },
  }
});