import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Footer = () => {
  return (
    <div className="grid grid-cols-3">
      {/* left side */}
      <div className="flex flex-col p-5">
        <span className="text-3xl text-teal-600 font-bold">AGRISHOP</span>
        <p className="py-2">
          AgriShop is a digital marketplace for selling and buying crops and
          agricultural products. AgriShop is a virtual platform where farmers
          can register as Vendors and list their products for sale and perform
          business transactions electronically.
        </p>
        <div className="flex space-x-3 text-teal-600">
          <TwitterIcon />
          <FacebookIcon />
          <InstagramIcon />
          <YouTubeIcon />
        </div>
      </div>

      {/* Center */}
      <div className="p-5">
        <h2 className="text-lg font-bold text-teal-600">Useful Links</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products/all">Products</Link>
          </li>
          <li>
            <Link to="/vendor">Vendor</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="p-5">
        <h2 className="text-lg font-bold text-teal-600">Contact</h2>
        <div className="grid grid-rows-4 space-y-3">
          <div>
            <LocationOnIcon />
            <span className="ml-3">
              University of Ilorin, Fate Tanke Rd, Ilorin, Kwara.
            </span>
          </div>
          <div>
            <PhoneIcon />
            <span className="ml-3">+234 123 456 789</span>
          </div>
          <div>
            <EmailOutlinedIcon />
            <span className="ml-3">agrishop@gmail.com</span>
          </div>
          <img src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
