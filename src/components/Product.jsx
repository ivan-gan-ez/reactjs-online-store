import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { getProducts, deleteProduct } from "../utils/api_products";
import { AddToCart, UpdateCart, GetCartItems } from "../utils/cart";
import { toast } from "sonner";
import { useState } from "react";
import { API_URL } from "../utils/constants";

export default function Product(props) {
  const { product, filter, page, setProducts } = props;

  const cartInLocalStorage = localStorage.getItem("cart");
  const [cart, setCart] = useState(GetCartItems());

  const handleProductDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1F81DF",
      cancelButtonColor: "#FC4749",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(id);
        const updatedProducts = await getProducts(filter, page);
        setProducts(updatedProducts);
        toast.success("Product has been deleted.");
      }
    });
  };

  const handleAddToCart = () => {
    console.log(GetCartItems());
    const alreadyInCart = cart.find((item) => item._id === product._id);

    if (alreadyInCart) {
      // update cart item with quantity + 1
      UpdateCart(product._id);
    } else {
      // add item to cart
      AddToCart(
        product._id,
        product.name,
        product.description,
        product.price,
        product.category
      );
    }
    // console.log(JSON.parse(localStorage.getItem("cart")));
    setCart(GetCartItems());
    toast("Item successfully added to cart.");
  };

  return (
    <Card
      sx={{
        minWidth: 150,
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          product.image
            ? API_URL + product.image
            : API_URL + "uploads/placeholder_image.png"
        }
      />
      <CardContent>
        <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
          {product.name}
        </Typography>
        <Typography sx={{ mb: 2, color: "text.secondary", fontSize: 14 }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Chip color="green" label={"$" + product.price} />
            <Chip
              color="orange"
              label={product.category.label ? product.category.label : ""}
            />
          </Box>

          {/*everything below has a left margin of 8 for some reason. and i can't remove it. */}

          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 1.5 }}
            color="blue"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              m: 0,
            }}
          >
            <Button
              variant="contained"
              color="indigo"
              component={Link}
              to={`/products/${product._id}/edit`}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="red"
              onClick={() => {
                handleProductDelete(product._id);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}
