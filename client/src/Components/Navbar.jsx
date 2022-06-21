import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity); // get quantity from store with useSelector hook
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.alert(`You have successfully logged out`);
    navigate("/");
  };

  return (
    <nav className="px-5 py-5">
      <div className="flex justify-between items-center mx-auto">
        {/* left */}
        <Link to="/" className="flex items-center">
          <span className="self-center text-3xl text-teal-600 font-bold">
            AGRISHOP
          </span>
        </Link>

        {/* Right Side */}
        <div className="text-teal-600 space-x-6">
          {user ? (
            <Link to="/user/profile">
              <span className="text-lg">Hello, {user.firstName}</span>
            </Link>
          ) : (
            <Link to="/login">
              <span className="text-lg">LOGIN</span>
            </Link>
          )}

          {user ? (
            <span className="text-lg cursor-pointer" onClick={handleLogout}>
              LOGOUT
            </span>
          ) : (
            <Link to="/register">
              <span className="text-lg">REGISTER</span>
            </Link>
          )}

          <Link to="/cart">
            <Badge
              color="primary"
              badgeContent={quantity}
              sx={{ "& .MuiBadge-badge": { backgroundColor: "teal" } }}
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
