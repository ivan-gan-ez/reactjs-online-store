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
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { addProduct } from "../utils/api_products";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";
import { getCategories } from "../utils/api_categories";

const ProductAdd = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [cat, setCat] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // call the API
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when page loads

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (!name || !price || !cat) {
      toast.error("Please fill up the required fields!");
    }

    try {
      // 2. trigger API to create new product
      await addProduct(name, desc, price, cat, image);

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
                {categories.map((cat) => (
                  <MenuItem value={cat._id}>{cat.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box my={2}>
            {image ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={API_URL + image} width="200px" />
                <Button
                  color="red"
                  variant="contained"
                  size="small"
                  onClick={() => setImage(null)}
                  sx={{ ml: 1.5 }}
                >
                  Remove image
                </Button>
              </Box>
            ) : (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={async (event) => {
                    const data = await uploadImage(event.target.files[0]);
                    // { image_url: "uploads/image.png" }
                    setImage(data.image_url);
                  }}
                  accept="image/*"
                />
              </Button>
            )}
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
