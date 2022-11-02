import { Routes, Route } from "react-router-dom";
import {
  Account,
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
import AddressesPage from "./components/Addresses";
import OrdersPage from "./components/Orders";
import WishlistPage from "./components/Wishlist";
import AccountPage from "./components/Account";

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
          <Route path="account" element={<Account />}>
            <Route index element={<AccountPage />} />
            <Route path="addresses" element={<AddressesPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
