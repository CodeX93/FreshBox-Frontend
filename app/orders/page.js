"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Divider,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  LinearProgress,
  Slider,
  Rating,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import {
  LocalLaundryService,
  CheckCircle,
  Schedule,
  ExpandMore,
  Search,
  Wash,
  Dry,
  AccessTime,
  LocationOn,
  DeliveryDining,
  Inventory2,
  ReceiptLong,
  Chat,
  ArrowForward,
  FilterList,
  CalendarToday,
  Home,
  Star,
  StarBorder,
  Cancel,
  Description,
  Phone,
} from "@mui/icons-material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Custom theme with Fresh Box colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#85D2B3", // Medium green as primary color
      light: "#BDF4E3", // Light mint
      dark: "#2E7B5C", // Dark green
      white: "#FFFFFF", // Added white for component compatibility
      mainHover: "#90DDBE", // Light medium green for hover states
      black: "#000000", // Added black for component compatibility
      darkBlue: "#0a1929", // Kept from original theme for compatibility
    },
    secondary: {
      main: "#B5ECD9", // Mint as secondary color
      light: "#BDF4E3", // Light mint
      dark: "#2E7B5C", // Dark green
    },
    background: {
      default: "transparent", // Change default background to transparent
      paper: "transparent",
    },
    text: {
      primary: "#2E7B5C", // Dark green for primary text
      secondary: "#555555", // Medium gray for secondary text
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
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
          boxShadow: "none",
          borderTop: "none",
          borderBottom: "none",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          background: "transparent",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          background: "transparent",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          background: "transparent",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // Ensure Paper components from MUI don't affect the AppBar
          "&.MuiAppBar-root": {
            backgroundColor: "transparent",
            background: "transparent",
          },
        },
      },
    },
  },
});

const statusToStep = {
  processing: 0,
  assign: 1,
  scheduled: 2,
  ready: 3,
  delivered: 5,
  cancelled: -1,
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

// Status color mapping with refined aesthetics
const statusColors = {
  delivered: "success",
  processing: "info",
  assign: "info",
  scheduled: "warning",
  ready: "primary",
};

// Status icon mapping
const statusIcons = {
  delivered: <CheckCircle />,
  assign: <CheckCircle />,
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

const LaundryOrderTracking = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const { usersOrders } = useAuth();
  const receiptRef = useRef(null);

  // Simulate fetching orders
  useEffect(() => {
    if (usersOrders.length) setOrders(usersOrders);
  }, [usersOrders]);

  // Open order details
  const openOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
  };

  // Close order details
  const closeOrderDetails = () => {
    setSelectedOrderId(null);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle contact support click
  const handleContactSupport = () => {
    router.push("/support");
  };

  // Handle rate service click
  const handleRateService = () => {
    setRatingDialogOpen(true);
  };

  // Handle rating submission
  const handleRatingSubmit = () => {
    // Here you would typically send the rating to your backend
    console.log("Rating submitted:", {
      rating: ratingValue,
      comment: ratingComment,
      orderId: selectedOrderId,
    });
    setIsRatingSubmitted(true);
    setTimeout(() => {
      setRatingDialogOpen(false);
      setIsRatingSubmitted(false);
      setRatingValue(0);
      setRatingComment("");
    }, 2000);
  };

  // Handle download receipt
  const handleDownloadReceipt = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`receipt_${selectedOrderId}.pdf`);
      });
    }
  };

  // Filter orders by tab and search term
  const getFilteredOrders = () => {
    let filtered = orders;

    // Filter by tab status
    if (tabValue === 1) {
      filtered = filtered.filter((order) => order.status === "processing");
    } else if (tabValue === 2) {
      filtered = filtered.filter((order) => order.status === "assign");
    } else if (tabValue === 3) {
      filtered = filtered.filter((order) => order.status === "ready");
    } else if (tabValue === 4) {
      filtered = filtered.filter((order) => order.status === "scheduled");
    } else if (tabValue === 5) {
      filtered = filtered.filter((order) => order.status === "delivered");
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          order.deliveryAddress.addressLine1
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.deliveryAddress.addressLine2
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();
  const selectedOrder = orders.find((order) => order._id === selectedOrderId);

  // Rating Dialog Component
  const RatingDialog = () => {
    return (
      <Dialog
        open={ratingDialogOpen}
        onClose={() => setRatingDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rate Your Service</DialogTitle>
        <DialogContent dividers>
          {isRatingSubmitted ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 4,
              }}
            >
              <CheckCircle
                sx={{ fontSize: 60, color: "success.main", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Thank You for Your Feedback!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your rating has been submitted successfully.
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  How would you rate your experience?
                </Typography>
                <Rating
                  name="service-rating"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                  size="large"
                  sx={{ fontSize: "3rem" }}
                />
              </Box>
              <TextField
                label="Additional comments (optional)"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!isRatingSubmitted && (
            <>
              <Button
                onClick={() => setRatingDialogOpen(false)}
                color="inherit"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRatingSubmit}
                variant="contained"
                color="primary"
                disabled={ratingValue === 0}
              >
                Submit Rating
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  // Hidden receipt for PDF generation
  const HiddenReceipt = ({ order }) => {
    if (!order) return null;

    return (
      <Box
        ref={receiptRef}
        sx={{
          position: "absolute",
          left: "-9999px",
          width: "210mm", // A4 width
          p: 4,
          backgroundColor: "white",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2E7B5C" }}>
            Fresh Box Laundry
          </Typography>
          <Typography variant="subtitle1">Service Receipt</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography variant="subtitle2">Order ID:</Typography>
            <Typography variant="body1">{order._id}</Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Order Date:
            </Typography>
            <Typography variant="body1">
              {formatDate(order.createdAt)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="subtitle2">Status:</Typography>
            <Typography variant="body1">
              {getStatusText(order.status)}
            </Typography>
            {order.status === "delivered" && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Delivered On:
                </Typography>
                <Typography variant="body1">
                  {formatDate(order.deliveredDate)}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Customer Information
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1">
            {order.deliveryAddress.firstName}{" "}
            {order.deliveryAddress.lastName}
          </Typography>
          <Typography variant="body1">
            {order.deliveryAddress.addressLine1}
          </Typography>
          {order.deliveryAddress.addressLine2 && (
            <Typography variant="body1">
              {order.deliveryAddress.addressLine2}
            </Typography>
          )}
          <Typography variant="body1">
            {order.deliveryAddress.city}, {order.deliveryAddress.postalCode}
          </Typography>
          <Typography variant="body1">
            {order.deliveryAddress.phoneNumber}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Order Items
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Grid container sx={{ fontWeight: "bold", py: 1 }}>
            <Grid item xs={6}>
              <Typography>Item</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography align="right">Qty</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography align="right">Price</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography align="right">Total</Typography>
            </Grid>
          </Grid>
          {order.items.map((item, index) => (
            <Grid container key={index} sx={{ py: 1 }}>
              <Grid item xs={6}>
                <Typography>{item.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align="right">{item.quantity}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align="right">
                  £{item.pricePerItem.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align="right">
                  £{(item.pricePerItem * item.quantity).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: "right", mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Subtotal: £{order.totalPrice.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Delivery Fee: £0.00
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Total: £{order.totalPrice.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2">
            Thank you for choosing Fresh Box Laundry!
          </Typography>
          <Typography variant="body2">
            For any questions, please contact support@freshbox.com
          </Typography>
        </Box>
      </Box>
    );
  };

  // Order Detail View Component
  const OrderDetailView = ({ order }) => {
    if (!order) return null;

    return (
      <>
        <HiddenReceipt order={order} />
        <Dialog
          open={true}
          onClose={closeOrderDetails}
          fullScreen={isMobile}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: isMobile ? 0 : 3,
              backgroundColor: "white",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid",
              borderColor: "divider",
              pb: 2,
              backgroundColor: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: `${statusColors[order.status]}.light`,
                  color: `${statusColors[order.status]}.main`,
                  mr: 2,
                }}
              >
                {statusIcons[order.status]}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Order {order._id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(order.createdAt)}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={getStatusText(order.status)}
              color={statusColors[order.status]}
              sx={{ fontWeight: 500 }}
            />
            <IconButton
              onClick={closeOrderDetails}
              edge="end"
              aria-label="close"
            >
              <Cancel />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ backgroundColor: "white" }}>
            <Grid container spacing={4}>
              {/* Order Progress */}
              {order.status === "processing" && (
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{ p: 3, mb: 3, bgcolor: "white", borderRadius: 3 }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Order Progress
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <CircularProgress
                        variant="determinate"
                        value={
                          (order.currentStep / (order.steps.length - 1)) * 100
                        }
                        color="primary"
                        size={60}
                        thickness={5}
                        sx={{ mr: 2 }}
                      />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Current Status
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {order?.steps[statusToStep[order.status]]?.status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Estimated Delivery:{" "}
                          {new Date(
                            new Date(order.createdAt).setDate(
                              new Date(order.createdAt).getDate() + 2
                            )
                          ).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>

                    <Stepper
                      activeStep={order.currentStep}
                      alternativeLabel
                      sx={{ mt: 4 }}
                    >
                      {order.steps.map((step, index) => (
                        <Step key={index} completed={step.completed}>
                          <StepLabel>
                            {step?.status}
                            {step?.timestamp && (
                              <Typography
                                variant="caption"
                                display="block"
                                color="text.secondary"
                              >
                                {formatDate(step.timestamp)}
                              </Typography>
                            )}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    {order.currentStep === 4 && (
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 3,
                          bgcolor: "primary.light",
                          borderRadius: 3,
                          mt: 4,
                          mb: 2,
                        }}
                      >
                        <Wash
                          sx={{ fontSize: 48, color: "primary.dark", mb: 1 }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500, color: "primary.dark" }}
                        >
                          Your items are being cleaned with eco-friendly
                          detergents
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          We use premium, environmentally-friendly cleaning
                          agents that are gentle on fabrics and the planet.
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              )}

              {/* Order Information - Left Column */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Order Details
                </Typography>

                <Paper
                  elevation={0}
                  sx={{ p: 3, borderRadius: 3, bgcolor: "white" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Services
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {order.items.length} Services
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Amount
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "primary.main" }}
                    >
                      £{order.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    <LocationOn
                      fontSize="small"
                      sx={{ verticalAlign: "middle", mr: 0.5 }}
                    />
                    Delivery Address
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {order.deliveryAddress.addressLine1},
                    {order.deliveryAddress.addressLine2}
                  </Typography>

                  {order.status === "delivered" && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                      >
                        <CheckCircle
                          fontSize="small"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                        Delivered On
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(order.deliveredDate)}
                      </Typography>
                    </Box>
                  )}

                  {order.status === "scheduled" && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ fontWeight: 600, color: "warning.main" }}
                      >
                        <Schedule
                          fontSize="small"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                        Scheduled Pickup
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(order.scheduledDate)}
                      </Typography>
                      <Chip
                        label={order.scheduledTime}
                        color="warning"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1 }}
                        icon={<AccessTime fontSize="small" />}
                      />
                    </Box>
                  )}

                  {order.status === "ready" && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ fontWeight: 600, color: "primary.main" }}
                      >
                        <Inventory2
                          fontSize="small"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                        Ready for Collection Since
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(order.readyDate)}
                      </Typography>
                      <Button
                        disableElevation
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<DeliveryDining />}
                        sx={{ mt: 2 }}
                        fullWidth
                      >
                        Schedule Delivery
                      </Button>
                    </Box>
                  )}
                </Paper>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    disableElevation
                    variant="outlined"
                    color="primary"
                    startIcon={<Chat />}
                    fullWidth
                    onClick={handleContactSupport}
                  >
                    Contact Support
                  </Button>

                  {order.status === "delivered" && (
                    <Button
                      disableElevation
                      variant="outlined"
                      color="secondary"
                      startIcon={<StarBorder />}
                      fullWidth
                      onClick={handleRateService}
                    >
                      Rate Service
                    </Button>
                  )}
                </Stack>
              </Grid>

              {/* Order Items - Right Column */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Order Items
                </Typography>

                <Paper
                  elevation={0}
                  sx={{ p: 3, borderRadius: 3, bgcolor: "white" }}
                >
                  <List disablePadding>
                    {order.items.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem disablePadding sx={{ py: 1.5 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "primary.light" }}>
                              {item.name.includes("Dry") ? (
                                <Dry color="primary" />
                              ) : (
                                <Wash color="primary" />
                              )}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.name}
                            secondary={`${item.quantity} ${
                              item.quantity === 1 ? "item" : "items"
                            }`}
                          />
                          <ListItemSecondaryAction>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600 }}
                            >
                              £{(item.pricePerItem * item.quantity).toFixed(2)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              £{item.pricePerItem.toFixed(2)} per
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < order.items.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </React.Fragment>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1,
                    }}
                  >
                    <Typography variant="subtitle1">Subtotal</Typography>
                    <Typography variant="subtitle1">
                      £{order.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1,
                    }}
                  >
                    <Typography variant="subtitle1">Delivery</Typography>
                    <Typography variant="subtitle1">£0.00</Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "primary.main" }}
                    >
                      £{order.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>

                  <Button
                    disableElevation
                    variant="outlined"
                    color="primary"
                    startIcon={<Description />}
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handleDownloadReceipt}
                  >
                    Download Receipt
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions
            sx={{
              p: 2,
              justifyContent: "space-between",
              backgroundColor: "white",
            }}
          >
            <Button disableElevation onClick={closeOrderDetails} color="inherit">
              Close
            </Button>
            {(order.status === "delivered" || order.status === "ready") && (
              <Button
                disableElevation
                variant="contained"
                color="primary"
                startIcon={<LocalLaundryService />}
              >
                Reorder Same Items
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </>
    );
  };

  // Order Card Component for List View
  const OrderCard = ({ order }) => {
    return (
      <Card
        sx={{ mb: 2, overflow: "visible", borderRadius: 3, cursor: "pointer" }}
        onClick={() => openOrderDetails(order._id)}
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
                    sx={{ fontWeight: 600, color: "primary.main" }}
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
                      {order.steps[order.currentStep].status}
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
              <IconButton color="primary" sx={{ bgcolor: "primary.light" }}>
                <ArrowForward />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const orderStatusCounts = {
    processing: orders.filter((order) => order.status === "processing").length,
    assign: orders.filter((order) => order.status === "assign").length,
    ready: orders.filter((order) => order.status === "ready").length,
    scheduled: orders.filter((order) => order.status === "scheduled").length,
    delivered: orders.filter((order) => order.status === "delivered").length,
  };

  return (
    <>
      <Navbar light={false} />
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
          <Container maxWidth="lg" sx={{ pt: 12, pb: 8, mt: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom>
                My Laundry Orders
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Track and manage all your laundry services in one place
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Order Tracking Interface */}
              <Grid item xs={12}>
                <Paper sx={{ p: 0, borderRadius: 3, overflow: "hidden" }}>
                  {/* Search and Filter Bar */}
                  <Box
                    sx={{
                      p: 3,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={9}>
                        <TextField
                          fullWidth
                          placeholder="Search orders by ID, service type, or address..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                          size="medium"
                          sx={{
                            bgcolor: "background.default",
                            borderRadius: 2,
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Button
                          disableElevation
                          fullWidth
                          variant="outlined"
                          startIcon={<FilterList />}
                          onClick={() => setFilterDialogOpen(true)}
                          sx={{ height: "56px", borderRadius: 2 }}
                        >
                          Filter
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Tabs for order status filtering */}
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      px: 2,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      "& .MuiTab-root": {
                        minHeight: 64,
                        textTransform: "none",
                        fontWeight: 500,
                      },
                    }}
                  >
                    <Tab
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Badge
                            badgeContent={orders.length}
                            color="primary"
                            sx={{ mr: 1 }}
                          >
                            <Box />
                          </Badge>
                          All Orders
                        </Box>
                      }
                    />
                    <Tab
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Badge
                            badgeContent={orderStatusCounts.processing}
                            color="info"
                            sx={{ mr: 1 }}
                          >
                            <Box />
                          </Badge>
                          In Progress
                        </Box>
                      }
                    />
                    <Tab
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Badge
                            badgeContent={orderStatusCounts.assign}
                            color="info"
                            sx={{ mr: 1 }}
                          >
                            <Box />
                          </Badge>
                          Assigned
                        </Box>
                      }
                    />
                    <Tab
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Badge
                            badgeContent={orderStatusCounts.ready}
                            color="primary"
                            sx={{ mr: 1 }}
                          >
                            <Box />
                          </Badge>
                          Ready
                        </Box>
                      }
                    />
                    <Tab
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Badge
                            badgeContent={orderStatusCounts.scheduled}
                            color="warning"
                            sx={{ mr: 1 }}
                          >
                            <Box />
                          </Badge>
                          Scheduled
                        </Box>
                      }
                    />
                    <Tab
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Badge
                            badgeContent={orderStatusCounts.delivered}
                            color="success"
                            sx={{ mr: 1 }}
                          >
                            <Box />
                          </Badge>
                          Delivered
                        </Box>
                      }
                    />
                  </Tabs>

                  {/* Order List */}
                  <Box sx={{ p: 3 }}>
                    {filteredOrders.length === 0 ? (
                      <Box sx={{ textAlign: "center", py: 8 }}>
                        <LocalLaundryService
                          sx={{ fontSize: 64, color: "text.disabled", mb: 2 }}
                        />
                        <Typography variant="h6" gutterBottom>
                          No orders found
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 3 }}
                        >
                          {searchTerm
                            ? "Try adjusting your search criteria"
                            : "You don't have any laundry orders in this category"}
                        </Typography>
                        <Button
                          disableElevation
                          variant="contained"
                          color="primary"
                          startIcon={<LocalLaundryService />}
                        >
                          <Link
                            href="/services"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            Create New Order
                          </Link>
                        </Button>
                      </Box>
                    ) : (
                      <>
                        {filteredOrders.map((order) => (
                          <OrderCard key={order._id} order={order} />
                        ))}
                      </>
                    )}
                  </Box>
                </Paper>
              </Grid>

              {/* Quick Action Cards */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.light",
                        color: "primary.main",
                        mr: 2,
                      }}
                    >
                      <LocalLaundryService />
                    </Avatar>
                    <Typography variant="h6">Quick Order</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Need laundry service fast? Choose from your saved templates.
                  </Typography>
                  <Button
                    disabled
                    disableElevation
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: "auto" }}
                  >
                    Start Quick Order
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "warning.light",
                        color: "warning.main",
                        mr: 2,
                      }}
                    >
                      <Schedule />
                    </Avatar>
                    <Typography variant="h6">Schedule Pickup</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Plan ahead by scheduling a convenient pickup time.
                  </Typography>
                  <Button
                    disabled
                    disableElevation
                    variant="outlined"
                    color="warning"
                    fullWidth
                    sx={{ mt: "auto" }}
                  >
                    Schedule Now
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "success.light",
                        color: "success.main",
                        mr: 2,
                      }}
                    >
                      <Phone />
                    </Avatar>
                    <Typography variant="h6">Customer Support</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Need help with your orders? Our team is ready to assist you.
                  </Typography>
                  <Button
                    disabled
                    disableElevation
                    variant="outlined"
                    color="success"
                    fullWidth
                    sx={{ mt: "auto" }}
                  >
                    Contact Us
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {/* Order Details Dialog */}
          {selectedOrder && <OrderDetailView order={selectedOrder} />}

          {/* Rating Dialog */}
          <RatingDialog />

          {/* Filter Dialog */}
          <Dialog
            open={filterDialogOpen}
            onClose={() => setFilterDialogOpen(false)}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>Filter Orders</DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle2" gutterBottom>
                Date Range
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="From"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="To"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
                Order Status
              </Typography>
              <Grid container spacing={1}>
                {["Processing", "Ready", "Scheduled", "Delivered"].map(
                  (status) => (
                    <Grid item xs={6} key={status}>
                      <Chip
                        label={status}
                        clickable
                        color="default"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </Grid>
                  )
                )}
              </Grid>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
                Service Type
              </Typography>
              <Grid container spacing={1}>
                {[
                  "Wash & Fold",
                  "Dry Cleaning",
                  "Ironing",
                  "Stain Removal",
                ].map((service) => (
                  <Grid item xs={6} key={service}>
                    <Chip
                      label={service}
                      clickable
                      color="default"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
                Price Range
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={[20, 150]}
                  min={0}
                  max={300}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: "£0" },
                    { value: 100, label: "£100" },
                    { value: 200, label: "£200" },
                    { value: 300, label: "£300" },
                  ]}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                disableElevation
                onClick={() => setFilterDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                onClick={() => setFilterDialogOpen(false)}
              >
                Apply Filters
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LaundryOrderTracking;