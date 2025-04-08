import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7B5C',     // Medium green as primary color
      light: '#BDF4E3',    // Light mint
      dark: '#2E7B5C',     // Dark green
      white: '#FFFFFF',    // Added white for component compatibility
      mainHover: '#90DDBE', // Light medium green for hover states
      black: '#000000',    // Added black for component compatibility
      darkBlue: '#0a1929'  // Kept from original theme for compatibility
    },
    secondary: {
      main: '#B5ECD9',     // Mint as secondary color
      light: '#BDF4E3',    // Light mint
      dark: '#2E7B5C',     // Dark green
    },
    background: {
      default: 'transparent', // Change default background to transparent
      paper: 'transparent',
    },
    text: {
      primary: '#2E7B5C',    // Dark green for primary text
      secondary: '#555555',  // Medium gray for secondary text
    }
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