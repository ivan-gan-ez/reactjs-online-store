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
import { getProduct, updateProduct } from "../utils/api_products";
import { toast } from "sonner";
import { useNavigate, useParams, Link } from "react-router";

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { addProduct } from "../utils/api_products";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";

const ProductEdit = () => {
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
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  // load product from backend API and assign it to the useStates
  const { id } = useParams();

  useEffect(() => {
    getProduct(id)
      .then((productData) => {
        // check if productData is available
        if (productData) {
          // update useStates with productData
          setName(productData.name ? productData.name : "");
          setDesc(productData.description ? productData.description : "");
          setPrice(productData.price ? productData.price : 0);
          setCat(productData.category ? productData.category : "");
          setImage(productData.image ? productData.image : null);
        } else {
          // set error
          setError("Product not found.");
        }
      })
      .catch((error) => {
        setError("Product not found.");
      });
  }, [id]);

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (!name || !price || !cat) {
      toast.error("Please fill up the required fields!");
    }

    try {
      // 2. trigger API to update the product
      await updateProduct(id, name, desc, price, cat, image);

      // 3. if successful, redirect back to home page and send success message
      toast.success("Product successfully edited!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return (
      <>
        <Container sx={{ p: 6, textAlign: "center" }}>
          <Header />
          <Container maxWidth="md">
            <Typography variant="h3" align="center" my={3} color="red">
              Product not found.
            </Typography>
            <Button
              variant="contained"
              color="red"
              component={Link}
              to="/"
              sx={{ mt: 3 }}
            >
              Go back to homepage
            </Button>
          </Container>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container sx={{ p: 6 }}>
        <Header />
        <Container maxWidth="md">
          <Typography variant="h3" align="center" my={3}>
            Edit Product
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
            color="indigo"
            fullWidth
            onClick={handleFormSubmit}
          >
            Update
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default ProductEdit;
