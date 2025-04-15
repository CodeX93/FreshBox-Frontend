import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  InputAdornment,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { theme } from '../../../contexts/Theme'; // Import your theme context

// Mock ZIP code data with neighborhoods - using just Chelsea for this example as shown in screenshot
const ZIP_CODE_DATA = [
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' },
  { zip: '10001', neighborhood: 'Chelsea', status: 'available' }
];

const AvailabilitySection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter data based on search term
  const filteredData = ZIP_CODE_DATA.filter(item => 
    item.zip.includes(searchTerm) || 
    item.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box 
      sx={{ 
        py: 6,
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: theme.palette.primary.whitishMint, // Light mint background color
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography 
            variant="h2"
            component="h1" 
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: theme.palette.primary.darkBlue,
              mb: 2
            }}
          >
            Service Availability by Area
          </Typography>
          
          <Typography 
            variant="body1"
            sx={{ 
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: theme.palette.primary.darkBlue,
              mb: 5,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Browse our service coverage by ZIP code and neighborhood
          </Typography>
          
          {/* Search Box */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 3 
            }}
          >
            <TextField
              placeholder="Search for areas..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.primary.darkBlue }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: '100%', sm: '80%', md: '400px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: theme.palette.primary.main,
                  '& fieldset': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a3131',
                  }
                },
                '& .MuiInputBase-input': {
                  py: 1.5,
                  color: theme.palette.primary.darkBlue
                }
              }}
            />
          </Box>
          
          {/* View Selection */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 5 
            }}
          >
            <Box 
              sx={{ 
                display: 'flex',
                border: '1px solid #1a3131',
                borderRadius: '20px',
                overflow: 'hidden'
              }}
            >
              <Button
                variant={viewMode === 'grid' ? 'contained' : 'text'}
                onClick={() => setViewMode('grid')}
                sx={{
                  py: 1.2,
                  px: 4,
                  color: viewMode === 'grid' ? theme.palette.primary.whitishMint : theme.palette.primary.darkBlue,
                  backgroundColor: viewMode === 'grid' ? theme.palette.primary.darkBlue : 'transparent',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: viewMode === 'grid' ? theme.palette.primary.darkBlue : 'transparent',
                    color: viewMode === 'grid' ? theme.palette.primary.whitishMint : theme.palette.primary.darkBlue,

                  },
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                GRID VIEW
              </Button>
              <Button
                variant={viewMode === 'list' ? 'contained' : 'text'}
                onClick={() => setViewMode('list')}
                sx={{
                  py: 1.2,
                  px: 4,
                  color: viewMode === 'list' ? theme.palette.primary.whitishMint : theme.palette.primary.darkBlue,
                  backgroundColor: viewMode === 'list' ? theme.palette.primary.darkBlue : 'transparent',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: viewMode === 'list' ? theme.palette.primary.darkBlue : 'transparent',
                    color: viewMode === 'list' ? theme.palette.primary.whitishMint : theme.palette.primary.darkBlue,
                  },
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                LIST VIEW
              </Button>
            </Box>
          </Box>
          
          {/* Grid View of ZIP Codes */}
          {viewMode === 'grid' && (
            <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 3 }}>
              <Grid container spacing={4} justifyContent="center">
                {filteredData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        borderRadius: 2,
                        border: '1px solid rgb(250, 250, 250)',
                        backgroundColor: '#fff',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.05)'
                        }
                      }}
                    >
                      <Typography 
                        variant="h4" 
                        component="p" 
                        sx={{ 
                          fontWeight: 700, 
                          color: '#1a3131',
                          mb: 1,
                          fontSize: { xs: '1.5rem', md: '1.8rem' }
                        }}
                      >
                        {item.zip}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#1a3131',
                          mb: 2,
                          fontSize: '1rem'
                        }}
                      >
                        {item.neighborhood}
                      </Typography>
                      
                      <Box 
                        sx={{ 
                          backgroundColor: '#e3f7f4',
                          color: theme.palette.primary.darkBlue,
                          bgcolor: theme.palette.primary.main,
                          py: 0.5,
                          px: 2,
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}
                      >
                        Available
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          {/* List View of ZIP Codes */}
          {viewMode === 'list' && (
            <Box sx={{ px: { xs: 0, sm: 2, md: 4 }, py: 3 }}>
              <TableContainer 
                component={Paper} 
                elevation={0}
                sx={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  mb: 3,
                  border: '1px solid #f0f0f0',
                  backgroundColor: '#fff'
                }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="zip code table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.primary.darkBlue }}>
                      <TableCell 
                        sx={{ 
                          fontWeight: 600, 
                          color: 'white', 
                          py: 2,
                          borderBottom: 'none',
                          fontSize: '0.875rem',
                          textTransform: 'uppercase'
                        }}
                      >
                        ZIP Code
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          fontWeight: 600, 
                          color: 'white', 
                          py: 2,
                          borderBottom: 'none',
                          fontSize: '0.875rem',
                          textTransform: 'uppercase'
                        }}
                      >
                        Neighborhood
                      </TableCell>
                      <TableCell 
                        align="center"
                        sx={{ 
                          fontWeight: 600, 
                          color: 'white', 
                          py: 2,
                          borderBottom: 'none',
                          fontSize: '0.875rem',
                          textTransform: 'uppercase'
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:nth-of-type(odd)': { backgroundColor: '#f8f8f8' },
                          '&:nth-of-type(even)': { backgroundColor: 'white' },
                          '&:last-child td, &:last-child th': { border: 0 },
                          height: '60px'
                        }}
                      >
                        <TableCell 
                          component="th" 
                          scope="row" 
                          sx={{ 
                            fontWeight: 600,
                            color: '#1a3131',
                            fontSize: '0.95rem',
                            borderBottom: '1px solid #f0f0f0'
                          }}
                        >
                          {item.zip}
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            color: '#4a4a4a',
                            fontSize: '0.9rem',
                            borderBottom: '1px solid #f0f0f0'
                          }}
                        >
                          {item.neighborhood}
                        </TableCell>
                        <TableCell 
                          align="center"
                          sx={{ 
                            borderBottom: '1px solid #f0f0f0'
                          }}
                        >
                          <Box 
                            sx={{ 
                              display: 'inline-block',
                              backgroundColor: '#e3f7f4',
                              color: theme.palette.primary.darkBlue,
                              bgcolor: theme.palette.primary.main,
                              py: 0.5,
                              px: 2,
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              textTransform: 'capitalize'
                            }}
                          >
                            Available
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default AvailabilitySection;