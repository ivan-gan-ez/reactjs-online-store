import Header from "../components/Header";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { addProduct } from "../utils/api_products";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [cat, setCat] = useState("");

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (!name || !price || !cat) {
      toast.error("Please fill up the required fields!.");
    }

    try {
      // 2. trigger API to create new product
      await addProduct(name, desc, price, cat);

      // 3. if successful, redirect back to home page and send success message
      toast.success("Product successfully added!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container sx={{ p: 6 }}>
        <Header />
        <Container maxWidth="md">
          <Typography variant="h3" align="center" my={3}>
            Add New Product
          </Typography>
          <Box my={2}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Box>
          <Box my={2}>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            />
          </Box>
          <Box my={2}>
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </Box>
          <Box my={2}>
            <FormControl sx={{ minWidth: "200px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cat}
                label="Category"
                onChange={(event) => {
                  setCat(event.target.value);
                }}
              >
                <MenuItem value={"Games"}>Games</MenuItem>
                <MenuItem value={"Consoles"}>Consoles</MenuItem>
                <MenuItem value={"Accessories"}>Accessories</MenuItem>
                <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="green"
            fullWidth
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default ProductAdd;
