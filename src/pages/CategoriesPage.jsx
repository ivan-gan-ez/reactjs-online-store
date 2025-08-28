import {
  Container,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  Button,
  Typography,
  TextField,
  Box,
  Modal,
} from "@mui/material";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../utils/api_categories";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState("");
  const [updatedLabel, setUpdatedLabel] = useState("");

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

  // handle add
  const handleAdd = async (event) => {
    if (!label) {
      toast.error("Please fill up the required fields!");
    }

    try {
      await addCategory(label);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);

      toast.success("Category successfully added!");
      setLabel("");
    } catch (error) {
      console.log(error);
    }
  };

  // handle update
  const handleUpdate = async (id, label) => {
    if (!label) {
      toast.error("Please fill up the required fields!");
    }

    try {
      await updateCategory(id, label);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);

      setOpen(false);
      setUpdatedLabel("");
      toast.success("Category successfully updated!");
    } catch (error) {
      console.log(error);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
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
        await deleteCategory(id);
        const updatedCategories = await getCategories();
        setCategories(updatedCategories);
        toast.success("Category has been deleted.");
      }
    });
  };

  // modal stuff start

  const [selectedCategory, setSelectedCategory] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [open, setOpen] = useState(false);

  const handleOpen = async (id) => {
    const selectedCategory = await getCategory(id);
    setSelectedCategory(selectedCategory);
    setUpdatedLabel(selectedCategory.label);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // modal stuff end

  return (
    <Container sx={{ p: 6 }}>
      <Header current="categories" title="Categories" />
      <Container size="md">
        <Paper sx={{ p: 3, mb: 3.5 }}>
          <Typography variant="h5" fontWeight="600" sx={{ pb: 2 }}>
            Categories
          </Typography>
          <Box sx={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="Category name"
              variant="outlined"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              fullWidth
              sx={{ mr: 2.5 }}
            />
            <Button variant="contained" color="indigo" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.label}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="blue"
                      sx={{ mr: 2 }}
                      onClick={() => handleOpen(category._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="red"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* modal start */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editing {selectedCategory.label}
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            Enter a new name.
          </Typography>
          <TextField
            value={updatedLabel}
            onChange={(e) => setUpdatedLabel(e.target.value)}
            fullWidth
          ></TextField>
          <Box textAlign="right" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="blue"
              onClick={() => handleUpdate(selectedCategory._id, updatedLabel)}
              sx={{ mr: 1 }}
            >
              Update
            </Button>
            <Button variant="contained" color="red" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* modal end */}
    </Container>
  );
};

export default CategoriesPage;
