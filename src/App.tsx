import { Routes, Route } from "react-router-dom";
import {
  Home,
  SignUp,
  NotFound,
  Login,
  Cart,
  Checkout,
  ProductPage,
} from "./pages";
import RequireAuth from "./components/requireAuth";
import PersistLogin from "./components/persistLogin";
import {
  AccountPage,
  AddressesPage,
  OrdersPage,
  WishlistPage,
} from "./pages/account";
import Vendors from "./pages/vendors";
import Dashboard from "./pages/dashboard";
import Income from "./pages/dashboard/income";
import DashboardLayout from "./components/DashboardLayout";
import AccountLayout from "./components/AccountLayout";
import VendorLogin from "./pages/vendors/login";
import VendorSignup from "./pages/vendors/register";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />

      <Route element={<PersistLogin />}>
        <Route path="/" element={<Home />} />
        <Route path="products/:slug" element={<ProductPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route element={<RequireAuth />}>
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountPage />} />
            <Route path="addresses" element={<AddressesPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="vendors">
        <Route index element={<Vendors />} />
        <Route path="login" element={<VendorLogin />} />
        <Route path="register" element={<VendorSignup />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Income />} />
          <Route path="orders" element={<Income />} />
          <Route path="income" element={<Income />} />
          <Route path="profile" element={<Income />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
