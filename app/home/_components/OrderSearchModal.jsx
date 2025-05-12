"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Badge,
  Chip,
  LinearProgress,
  Button,
  DialogActions,
} from "@mui/material";
import {
  Search,
  Close,
  LocalLaundryService,
  CheckCircle,
  Schedule,
  Inventory2,
  LocationOn,
  ArrowForward,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";

// Status color mapping with refined aesthetics
const statusColors = {
  delivered: "success",
  processing: "info",
  scheduled: "warning",
  ready: "primary",
};

// Status icon mapping
const statusIcons = {
  delivered: <CheckCircle />,
  processing: <LocalLaundryService />,
  scheduled: <Schedule />,
  ready: <Inventory2 />,
};

// Order status text display
const getStatusText = (status) => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "processing":
      return "In Progress";
    case "scheduled":
      return "Scheduled";
    case "ready":
      return "Ready for Collection";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

// Utility function to format dates
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const OrderSearchModal = ({ open, onClose, onOrderSelect, defaultSearch = "" }) => {
  
  const [foundOrder, setFoundOrder] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const { usersOrders } = useAuth();
const [searchTerm, setSearchTerm] = useState(defaultSearch);

useEffect(() => {
  setSearchTerm(defaultSearch);
  if (defaultSearch && open) {
    handleSearch();
  }
}, [defaultSearch, open]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFoundOrder(null);
      setNoResults(false);
      return;
    }

    setIsSearching(true);
    setNoResults(false);

    // Simulate search with slight delay
    setTimeout(() => {
      const result = usersOrders.find(
        (order) => order._id.toLowerCase() === searchTerm.toLowerCase()
      );

      setFoundOrder(result || null);
      setNoResults(!result);
      setIsSearching(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFoundOrder(null);
    setNoResults(false);
  };

  // Order Card Component
  const OrderCard = ({ order }) => {
    return (
      <Card
        sx={{ 
          mt: 3, 
          overflow: "visible", 
          borderRadius: 3, 
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          }
        }}
        // onClick={() => onOrderSelect(order._id)}
      >
        <CardContent sx={{ p: 3 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: `${statusColors[order.status]}.main`,
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                }
              >
                <Avatar
                  sx={{
                    bgcolor: `${statusColors[order.status]}.light`,
                    color: `${statusColors[order.status]}.main`,
                    width: 56,
                    height: 56,
                  }}
                >
                  {statusIcons[order.status]}
                </Avatar>
              </Badge>
            </Grid>

            <Grid item xs>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {order._id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(order.createdAt)}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "94FFD4" }}
                  >
                    £{order.totalPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.items.length} Services
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {order.items.map((item, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={`${item.quantity} ${
                      item.quantity === 1 ? "item" : "items"
                    } ${item.name}`}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOn
                    fontSize="small"
                    sx={{ color: "text.secondary", mr: 0.5 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {order.deliveryAddress.addressLine1},
                    {order.deliveryAddress.addressLine2}
                  </Typography>
                </Box>

                <Chip
                  label={getStatusText(order.status)}
                  color={statusColors[order.status]}
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              {order.status === "processing" && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(order.currentStep / (order.steps.length - 1)) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "background.default",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 3,
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {order.steps[order.currentStep].label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Est. Delivery:{" "}
                      {new Date(
                        new Date(order.createdAt).setDate(
                          new Date(order.createdAt).getDate() + 2
                        )
                      ).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              )}

              {order.status === "scheduled" && (
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <Schedule
                    fontSize="small"
                    sx={{ color: "warning.main", mr: 0.5 }}
                  />
                  <Typography variant="body2" color="warning.main">
                    Pickup scheduled for {formatDate(order.scheduledDate)} (
                    {order.scheduledTime})
                  </Typography>
                </Box>
              )}

              {order.status === "ready" && (
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <Inventory2
                    fontSize="small"
                    sx={{ color: "primary.main", mr: 0.5 }}
                  />
                  <Typography variant="body2" color="primary.main">
                    Ready for collection since {formatDate(order.readyDate)}
                  </Typography>
                </Box>
              )}

              {order.status === "delivered" && (
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <CheckCircle
                    fontSize="small"
                    sx={{ color: "success.main", mr: 0.5 }}
                  />
                  <Typography variant="body2" color="success.main">
                    Delivered on {formatDate(order.deliveredDate)}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item>
              <IconButton color="94FFD4" sx={{ bgcolor: "primary.light" }}>
                <ArrowForward />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
           bgcolor: "white",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "primary.light",
          color: "primary.dark",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalLaundryService sx={{ mr: 1.5, color:'#003C43' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color:'#003C43' }}>
            Search Order by ID
          </Typography>
        </Box>
        <IconButton onClick={onClose} edge="end" aria-label="close" sx={{ color: "primary.dark" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pb: 4 }}>
        <Box sx={{ mt: 1, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Enter order ID (e.g., LD-2023-001)"
            value={searchTerm}
            // disabled={defaultSearch && open}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} edge="end" size="small">
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            variant="outlined"
            size="medium"
            autoFocus
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              
              disableElevation
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isSearching}
              sx={{ 
                backgroundColor: "#94FFD4",
                color:"#003C43",
                borderRadius: 2, 
                px: 3,
                transition: "transform 0.2s",
                "&:hover:not(:disabled)": {
                  transform: "translateY(-2px)",
                },
              }}
              startIcon={<Search />}
            >
              Search
            </Button>
          </Box>
        </Box>

        {isSearching && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress />
            <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
              Searching...
            </Typography>
          </Box>
        )}

        {noResults && !isSearching && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <LocalLaundryService
              sx={{ fontSize: 64, color: "action.disabled", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              No order found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We couldn't find any order with ID "{searchTerm}".
              <br />
              Please check the order ID and try again.
            </Typography>
          </Box>
        )}

        {foundOrder && !isSearching && <OrderCard order={foundOrder} />}

        {!foundOrder && !noResults && !isSearching && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Search sx={{ fontSize: 64, color: "action.disabled", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Search for your order
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your order ID to view its details and track its status.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions 
        sx={{ 
          px: 3, 
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderSearchModal;