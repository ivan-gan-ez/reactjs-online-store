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
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export default function Header(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;
  const navigate = useNavigate();

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

      {currentuser && (
        <Typography
          variant="h6"
          textAlign="center"
          fontWeight="600"
          sx={{ pb: 3 }}
        >
          {currentuser.name}
        </Typography>
      )}

      <Container sx={{ width: "100%", textAlign: "center", p: 3 }}>
        <Button
          component={Link}
          to="/"
          variant={current === "home" ? "contained" : "outlined"}
          color="blue"
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/cart"
          variant={current === "cart" ? "contained" : "outlined"}
          color="blue"
          sx={{ ml: 2 }}
        >
          Cart
        </Button>
        <Button
          component={Link}
          to="/categories"
          variant={current === "categories" ? "contained" : "outlined"}
          color="blue"
          sx={{ ml: 2 }}
        >
          Categories
        </Button>
        <Button
          component={Link}
          to="/orders"
          variant={current === "orders" ? "contained" : "outlined"}
          color="blue"
          sx={{ ml: 2 }}
        >
          Orders
        </Button>
        {currentuser ? (
          <Button
            variant="outlined"
            color="blue"
            sx={{ ml: 2 }}
            onClick={() => {
              removeCookie("currentuser");
              navigate("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              variant={current === "login" ? "contained" : "outlined"}
              color="blue"
              sx={{ ml: 2 }}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant={current === "signup" ? "contained" : "outlined"}
              color="blue"
              sx={{ ml: 2 }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Container>
      <Divider />
    </Box>
  );
}
