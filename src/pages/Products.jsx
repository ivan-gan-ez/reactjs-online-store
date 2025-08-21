import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useState, useEffect } from "react";
import { Link } from "react-router";

import Header from "../components/Header";

import Product from "../components/Product";
import { getProducts } from "../utils/api_products";

function Products() {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(filter, page).then((data) => {
      setProducts(data);
    });
  }, [filter, page]);

  return (
    <>
      <Container
        sx={{
          p: 6,
        }}
      >
        <Header />
        <Box sx={{ px: 12, mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight="600">
              Products
            </Typography>
            <Button
              component={Link}
              to="/products/new"
              variant="contained"
              color="green"
            >
              Add New
            </Button>
          </Box>

          <FormControl sx={{ minWidth: "200px", my: 3 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Category"
              onChange={(event) => {
                setFilter(event.target.value);
                setPage(1);
              }}
            >
              <MenuItem value={"all"}>All Categories</MenuItem>
              <MenuItem value={"Games"}>Games</MenuItem>
              <MenuItem value={"Consoles"}>Consoles</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
              <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid size={{ sm: 12, md: 6, lg: 4 }} key={product._id}>
                  <Product
                    product={product}
                    filter={filter}
                    page={page}
                    setProducts={setProducts}
                  ></Product>
                </Grid>
              ))}
            </Grid>
          </Box>

          {products.length === 0 ? (
            <Typography variant="h6" align="center">
              No more products :(
            </Typography>
          ) : null}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="orange"
              disabled={page === 1 ? true : false}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Previous
            </Button>
            <Typography fontWeight="600" fontSize="1.25rem">
              Page: {page}
            </Typography>
            <Button
              variant="contained"
              color="indigo"
              disabled={products.length === 0 ? true : false}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Products;
