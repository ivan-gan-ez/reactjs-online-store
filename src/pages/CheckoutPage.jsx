import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { getProducts } from "../utils/api_products";
import { RemoveFromCart, GetCartItems } from "../utils/cart";

import Header from "../components/Header";
import { Button, Container, Typography, Grid, TextField } from "@mui/material";

import { useState } from "react";
import { toast } from "sonner";
import validator from "email-validator";

import { createOrder } from "../utils/api_orders";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CheckoutPage = () => {
  const cartInLocalStorage = localStorage.getItem("cart");
  const [cart, setCart] = useState(GetCartItems());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const itemTotals = cart.map((item) => item.quantity * item.price);

  let total = 0;
  let i = 0;
  while (i < itemTotals.length) {
    total += itemTotals[i];
    i += 1;
  }

  const handleCheckout = async () => {
    if (!name || !email) {
      toast.error("Please fill in both fields.");
    } else if (!validator.validate(email)) {
      toast.error("Please use a valid email address.");
    } else {
      //do checkout
      try {
        setLoading(true);
        //create order
        const response = await createOrder(name, email, cart, total);
        //get billplz url
        console.log(response);
        const billplz_url = response.billplz_url;
        // redirect user to billplz page
        window.location.href = billplz_url;
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Container sx={{ p: 6 }}>
        <Header current="checkout" title="Checkout" />

        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Contact Information
            </Typography>
            <Box mb={2}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Button fullWidth variant="contained" onClick={handleCheckout}>
              Pay ${total.toFixed(2)}
            </Button>
          </Grid>

          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Your Order Summary
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow
                      key={item._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>

                      <TableCell align="right">{`$${(
                        item.price * item.quantity
                      ).toFixed(2)}`}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} align="right">
                      <Typography fontWeight={600}>
                        ${total.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CheckoutPage;
