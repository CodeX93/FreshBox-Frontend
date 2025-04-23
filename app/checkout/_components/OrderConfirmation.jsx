import React from "react";
import { Box, Typography, Paper, Grid, Button, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getTimeSlot, formatDate } from "../checkoutData";
import { theme } from "../../../contexts/Theme";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

function OrderConfirmation({ cartTotal, contactData, scheduleData, orderId }) {
  // Generate an order number
  const {getUsersOrders} = useAuth()
  const router = useRouter()

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
        <Box
          sx={{
            bgcolor: theme.palette.primary.darkBlue,
            color: "white",
            p: 3,
            textAlign: "center",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Thank You!
          </Typography>
          <Typography variant="h6">
            Your order has been placed successfully
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Order Number
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {orderId}
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ mb: 2 }}>
                Hi {contactData?.firstName},
              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                Thank you for your order. We've received your request and will
                process it right away. You will receive a confirmation email at{" "}
                {contactData?.email} with your order details.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Collection
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(scheduleData?.collectionDate)}
                    <br />
                    {getTimeSlot(scheduleData?.collectionTimeSlot)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Delivery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(scheduleData?.deliveryDate)}
                    <br />
                    {getTimeSlot(scheduleData?.deliveryTimeSlot)}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="subtitle1">Total Paid</Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.darkBlue,
                  }}
                >
                  £{cartTotal?.toFixed(2)}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  disableElevation
                  variant="contained"
                  size="large"
                  onClick={()=>{
                    getUsersOrders()
                    router.push("/")
                  }}
                  sx={{
                    backgroundColor: theme.palette.primary.darkBlue,
                    color: theme.palette.primary.whitishMint,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.darkBlue,
                    },
                  }}
                >
                  Track My Order
                </Button>

                <Button
                  disableElevation
                  variant="outlined"
                  size="large"
             
                  onClick={()=>{
                    getUsersOrders()
                    router.push("/")
                  }}
                  sx={{
                    backgroundColor: theme.palette.primary.whitishMint,
                    color: theme.palette.primary.darkBlue,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.whitishMint,
                      backgroundColor: theme.palette.primary.whitishMint,
                      borderColor: "#2E7B5C", // Keep border color on hover
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default OrderConfirmation;
