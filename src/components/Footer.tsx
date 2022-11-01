import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center bg-slate-50">
      <div className="w-full px-4 py-5 bg-slate-400 flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-4 text-xl">
          <Link to="/">
            <FiFacebook />
          </Link>
          <Link to="/">
            <FiTwitter />
          </Link>
          <Link to="/">
            <FiInstagram />
          </Link>
          <Link to="/">
            <FiYoutube />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
