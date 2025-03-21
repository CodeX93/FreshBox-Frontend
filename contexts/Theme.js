import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#28ddcd', // LaundryHeap's primary Turqoise blue
      light: '#E3F2FD',
      dark: '#0D3B6E'
    },
    secondary: {
      main: '#FFC107' // Accent yellow
    }
  },
  typography: {
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2.8rem',
      fontWeight: 700
    }
  }
});