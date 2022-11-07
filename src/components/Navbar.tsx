import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useCart } from "../context/cart";
import useAuth from "../hooks/useAuth";
import useOutsideClick from "../hooks/useOutsideClick";
import Logo from "./Logo";

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { accessToken, signOut } = useAuth();
  const { cart } = useCart();

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openNav = () => {
    setNavOpen(true);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  useOutsideClick(ref, closeNav);
  useOutsideClick(menuRef, closeMenu);

  return (
    <nav className="bg-slate-50">
      <div className="md:container mx-auto px-2 py-1 bg-slate-50 md:min-w-[1000px]">
        <div className="h-12 flex justify-between items-center">
          <div className="basis-48 flex items-center gap-2">
            <button
              type="button"
              className="text-2xl md:hidden"
              onClick={openNav}
            >
              <FaBars />
            </button>

            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:block flex-auto px-3">
            <form className="w-full h-full flex bg-white border rounded-[5px]">
              <button className="mx-4" type="submit">
                <FaSearch />
              </button>
              <input
                id="search"
                className="w-full py-2 border-none focus:outline-none"
                type="text"
                placeholder="Search Agrishop"
              />
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/account" className="md:hidden">
              <FiUser className="text-2xl" />
            </Link>

            <div className="hidden relative md:inline-block">
              <button
                className="flex items-center gap-2 font-semibold"
                onClick={openMenu}
              >
                <FiUser className="text-2xl" />
                <span className="hidden md:block">Account</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Account Menu */}
              <div
                className={`${
                  menuOpen ? "block" : "hidden"
                } absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div ref={menuRef} role="none">
                  {!accessToken && (
                    <Link
                      to="/login"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                      tabIndex={-1}
                    >
                      Login
                    </Link>
                  )}

                  <Link
                    to="/account"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    My Account
                  </Link>

                  <Link
                    to="/account/orders"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Orders
                  </Link>

                  <Link
                    to="/account/wishlist"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    Wishlist
                  </Link>

                  {accessToken && (
                    <button
                      className="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Link to="/cart" className="flex items-center gap-2 font-semibold">
              <span className="relative">
                <span
                  className={`${
                    cart.size ? "block" : "hidden"
                  } absolute -top-1 -right-2 h-4 w-4 flex items-center justify-center bg-gray-800 text-[8px] text-white border-2 border-slate-50  rounded-full`}
                >
                  {cart.size}
                </span>
                <FiShoppingCart className="text-2xl" />
              </span>
              <span className="hidden md:block">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:container mx-auto px-2 pb-2 bg-slate-50 md:hidden">
        <div className="w-full h-full flex bg-white border-2 rounded-full">
          <button className="ml-2" type="submit">
            <FaSearch />
          </button>
          <input
            className="w-full ml-3 py-2 bg-transparent border-none focus:outline-none"
            type="text"
            placeholder="Search Agrishop"
          />
        </div>
      </div>

      {/* Toggleable Nav */}
      <div
        className={`absolute top-0 w-full h-full bg-black/80 z-40 ${
          navOpen ? "" : "-translate-x-full"
        } transition-opacity ease-in-out duration-[300ms] delay-[0ms] will-change-[opacity] md:hidden`}
      >
        <button className="fixed top-10 right-5 text-white">
          <FaTimes />
        </button>
      </div>

      <div
        ref={ref}
        className={`absolute top-0 min-w-[288px] w-[80vw] h-full bg-slate-50 z-50 md:hidden md:static ${
          navOpen ? "" : "-translate-x-full"
        } transition-transform ease-in-out duration-[300ms] delay-[0ms] will-change-transform`}
      ></div>
    </nav>
  );
};

export default Navbar;
