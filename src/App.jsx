import { BrowserRouter, Routes, Route } from "react-router";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentVerify from "./pages/PaymentVerify";
import { Toaster } from "sonner";
import OrdersPage from "./pages/OrdersPage";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/AuthLogin";
import SignupPage from "./pages/AuthSignup";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />}></Route>
            <Route path="/products/new" element={<ProductAdd />}></Route>
            <Route path="/products/:id/edit" element={<ProductEdit />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/checkout" element={<CheckoutPage />}></Route>
            <Route path="/verify-payment" element={<PaymentVerify />}></Route>
            <Route path="/orders" element={<OrdersPage />}></Route>
            <Route path="/categories" element={<CategoriesPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
