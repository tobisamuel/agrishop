import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import CustomerRegistration from "./Pages/CustomerRegistration";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import ProductPage from "./Pages/ProductPage";
import Cart from "./Pages/Cart";
import CheckOut from "./Pages/Checkout";
import UserPage from "./Pages/profile/UserPage";
import UserOrders from "./Pages/profile/Orders";
import OrderDetails from "./Pages/profile/OrderDetails";
import UserProfile from "./Pages/profile/Profile";
import VendorRegistration from "./Pages/VendorRegistration";
import VendorLogin from "./Pages/Vendor/VendorLogin";
import VendorHome from "./Pages/Vendor/Home";
import VendorDashboard from "./Pages/Vendor/Dashboard/VendorDashboard";
import Orders from "./Pages/Vendor/Dashboard/Orders";
import Products from "./Pages/Vendor/Dashboard/Products";
import Profile from "./Pages/Vendor/Dashboard/Profile";
import ProductEdit from "./Pages/Vendor/Dashboard/ProductEdit";
import AddProduct from "./Pages/Vendor/Dashboard/AddProduct";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const vendor = useSelector((state) => state.vendor.currentVendor);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="register" element={<CustomerRegistration />} />
      <Route path="user" element={<UserPage />}>
        <Route path="orders" element={<UserOrders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route
          path="profile"
          element={user === null ? <Navigate to="/" /> : <UserProfile />}
        />
      </Route>
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<CheckOut />} />
      <Route path="products/:category" element={<ProductList />} />
      <Route path="product/:id" element={<ProductPage />} />

      <Route path="vendor" element={<VendorHome />} />
      <Route
        path="vendor/login"
        element={
          vendor ? <Navigate to="/vendor/dashboard/profile" /> : <VendorLogin />
        }
      />
      <Route path="vendor/register" element={<VendorRegistration />} />
      <Route
        path="vendor/dashboard"
        element={vendor ? <VendorDashboard /> : <Navigate to="/vendor" />}
      >
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductEdit />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
