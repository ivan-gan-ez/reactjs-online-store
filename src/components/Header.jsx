import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  ToggleButtonGroup,
  ToggleButton,
  Container,
  Button,
} from "@mui/material";
import { Link } from "react-router";
import { useState } from "react";

export default function Header(props) {
  const { current, title = "Welcome to PQRS III" } = props;
  return (
    <Box sx={{ py: 2 }}>
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="600"
        sx={{ pb: 3 }}
      >
        {title}
      </Typography>

      <Container sx={{ width: "100%", textAlign: "center", p: 3 }}>
        <Button
          component={Link}
          to="/"
          variant={current === "home" ? "contained" : "outlined"}
          color="blue"
          sx={{ mr: 2 }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/cart"
          variant={current === "cart" ? "contained" : "outlined"}
          color="blue"
          sx={{ mr: 2 }}
        >
          Cart
        </Button>
        <Button
          component={Link}
          to="/orders"
          variant={current === "orders" ? "contained" : "outlined"}
          color="blue"
        >
          My Orders
        </Button>
      </Container>
      <Divider />
    </Box>
  );
}
