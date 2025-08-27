import Header from "../components/Header";
import {
  Container,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { deleteOrder, getOrders, updateOrder } from "../utils/api_orders";
import Swal from "sweetalert2";
import { toast } from "sonner";

const OrdersPage = () => {
  // get orders from API
  const [orders, setOrders] = useState([]);

  // call the API
  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when page loads

  console.log(orders);

  const handleOrderDelete = async (id) => {
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
        await deleteOrder(id);
        const updatedOrders = await getOrders();
        setOrders(updatedOrders);
        toast.success("Order has been deleted.");
      }
    });
  };

  return (
    <Container sx={{ p: 6 }}>
      <Header current="orders" title="My Orders" />
      <Container maxWidth="lg">
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell align="left">Products</TableCell>
                <TableCell align="left">Total Amount</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Payment Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.customerName}
                    <br /> {order.customerEmail}
                  </TableCell>
                  <TableCell align="left">
                    {order.products.map((product) => (
                      <Box key={product._id}>{product.name}</Box>
                    ))}
                  </TableCell>
                  <TableCell align="left">
                    {order.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell align="left">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={order.status}
                        label="Status"
                        disabled={order.status === "pending" ? true : false}
                        onChange={(e) => updateOrder(order._id, e.target.value)}
                      >
                        <MenuItem value={"pending"} disabled>
                          Pending
                        </MenuItem>
                        <MenuItem value={"paid"}>Paid</MenuItem>
                        <MenuItem value={"failed"}>Failed</MenuItem>
                        <MenuItem value={"completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="left">
                    {order.paid_at ? order.paid_at : null}
                  </TableCell>
                  <TableCell align="right">
                    {order.status === "pending" ? (
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => handleOrderDelete(order._id)}
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  );
};

export default OrdersPage;
