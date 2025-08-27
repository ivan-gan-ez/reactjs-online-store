import { BrowserRouter, Routes, Route } from "react-router";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentVerify from "./pages/PaymentVerify";
import { Toaster } from "sonner";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />}></Route>
          <Route path="/products/new" element={<ProductAdd />}></Route>
          <Route path="/products/:id/edit" element={<ProductEdit />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/verify-payment" element={<PaymentVerify />}></Route>
          <Route path="/orders" element={<OrdersPage />}></Route>
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
