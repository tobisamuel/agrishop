import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-400">
      <div className="w-full px-4 py-5 flex justify-between items-center md:container md:min-w-[1000px]">
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
