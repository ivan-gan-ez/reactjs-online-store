import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { getProducts } from "../utils/api_products";
import { RemoveFromCart } from "../utils/cart";

import Header from "../components/Header";
import { Button, Container, Typography } from "@mui/material";

import { useState } from "react";

const CartPage = () => {
  const cartInLocalStorage = localStorage.getItem("cart");
  const [cart, setCart] = useState(
    cartInLocalStorage ? JSON.parse(cartInLocalStorage) : []
  );

  const itemTotals = cart.map((item) => item.quantity * item.price);

  let total = 0;
  let i = 0;
  while (i < itemTotals.length) {
    total += itemTotals[i];
    i += 1;
  }

  const handleDelete = (id) => {
    RemoveFromCart(id);
    setCart(cart.filter((item) => item._id !== id));
  };

  if (cart.length === 0) {
    return (
      <Container sx={{ p: 6 }}>
        <Header />
        <Container maxWidth="md">
          <Typography variant="h3" align="center" my={3}>
            Your Cart
          </Typography>
        </Container>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <Typography sx={{ p: 3 }}>
                  Your cart is currently empty.
                </Typography>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>${total.toFixed(2)}</Typography>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }

  return (
    <Container sx={{ p: 6 }}>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h3" align="center" my={3}>
          Your Cart
        </Typography>
      </Container>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Action</TableCell>
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
                <TableCell align="right">{`$${item.price}`}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{`$${(
                  item.price * item.quantity
                ).toFixed(2)}`}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="red"
                    onClick={() => handleDelete(item._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <Typography fontWeight={600}>${total.toFixed(2)}</Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CartPage;
