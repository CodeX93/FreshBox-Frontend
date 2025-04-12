import { Box, Container, Grid } from '@mui/material';
import ClientSupportPage from './ClientSideInterations/ClientSupportPage';
import Navbar from "../../components/Navbar"
// Define constants for SEO content
const TURQUOISE = '#28ddcd';
const TURQUOISE_DARK = '#20c5b7';
const TURQUOISE_LIGHT = '#e8f9f8';

export default function SupportPage() {
  return (
    <>
    <Navbar light={false}/>
    
    <Box sx={{ 
      pt: { xs: 0, sm: 0, md: 0 }, // Removed padding-top to allow NavBar to be transparent
      pb: { xs: 8, sm: 10, md: 12 },
      bgcolor: '#f9fafb',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorations */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${TURQUOISE}20, ${TURQUOISE}05)`,
        zIndex: 0,
        filter: 'blur(60px)'
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${TURQUOISE}15, ${TURQUOISE}00)`,
        zIndex: 0,
        filter: 'blur(40px)'
      }} />

      {/* Client component to handle interactive elements */}
      <ClientSupportPage />
    </Box>
    </>
  );
}