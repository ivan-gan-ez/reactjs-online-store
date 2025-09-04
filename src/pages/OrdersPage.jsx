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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { deleteOrder, getOrders, updateOrder } from "../utils/api_orders";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

const OrdersPage = () => {
  // get orders from API
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user not logged in
  const { token = "" } = currentuser;

  // call the API
  useEffect(() => {
    getOrders(token)
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]); // call only once when the page load

  const handleOrderUpdate = async (id, status) => {
    setLoading(true);
    await updateOrder(id, status, token);
    const updatedOrders = await getOrders(token);
    setOrders(updatedOrders);
    toast.info("Status updated!");
    setLoading(false);
  };

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
        setLoading(true);
        try {
          await deleteOrder(id, token);
          const updatedOrders = await getOrders(token);
          setOrders(updatedOrders);
          toast.success("Order has been deleted.");
        } catch (error) {
          toast.error(error.response.data.error);
        }
        setLoading(false);
      }
    });
  };

  return (
    <Container sx={{ p: 6 }}>
      <Header current="orders" title="My Orders" />
      <Container maxWidth="lg">
        {loading ? (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
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
                          disabled={
                            order.status === "pending" ||
                            currentuser.role === "user"
                          }
                          onChange={(e) =>
                            handleOrderUpdate(order._id, e.target.value)
                          }
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
                      {order.status === "pending" &&
                      currentuser.role === "admin" ? (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleOrderDelete(order._id);
                          }}
                        >
                          Delete
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Container>
  );
};

export default OrdersPage;
