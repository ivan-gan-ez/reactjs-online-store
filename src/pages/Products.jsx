import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useState, useEffect } from "react";

import Product from "../components/Product";
import { getProducts } from "../utils/api";

function Products() {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(filter).then((data) => {
      setProducts(data);
    });
  }, [filter]);

  return (
    <>
      <Box
        sx={{
          p: 6,
        }}
      >
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ p: 2 }}
          fontWeight="600"
        >
          Welcome To PQRS III
        </Typography>
        <hr />
        <Box sx={{ px: 12, mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="900">
              Products
            </Typography>
            <Button variant="contained" color="green">
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
              onChange={(event) => setFilter(event.target.value)}
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
                  <Product product={product}></Product>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Products;
