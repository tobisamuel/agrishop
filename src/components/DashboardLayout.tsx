import { Link, Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import {
  FaChartLine,
  FaRegCreditCard,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Sidebar from "./Sidebar";
import useOutsideClick from "../hooks/useOutsideClick";
import VendorsLogo from "./VendorsLogo";

const MenuItems = [
  {
    title: "Products",
    href: "/vendors/dashboard/products",
    icon: FaRegCreditCard,
  },
  { title: "Orders", href: "/vendors/dashboard/orders", icon: FaRegCreditCard },
  { title: "Income", href: "/vendors/dashboard/income", icon: FaChartLine },
  { title: "Profile", href: "/vendors/dashboard/profile", icon: FaUserAlt },
];

const DashboardLayout = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const openMenu = () => {
    setMenuOpen(true);
  };

  useOutsideClick(ref, closeMenu);

  return (
    <div className="relative flex">
      <Sidebar />

      {/* Mobile Menu */}
      <div
        ref={ref}
        className={`absolute top-0 w-72 h-full bg-slate-800 lg:hidden lg:static ${
          menuOpen ? "" : "-translate-x-full"
        } transform ease-in-out duration-300 z-50`}
      >
        <div className="w-full h-full px-4 py-8 flex flex-col justify-between">
          <div>
            <Link to="/vendors">
              <VendorsLogo />
            </Link>

            <div className="mt-8 space-y-3">
              {MenuItems.map((item, index) => (
                <Link
                  to={item.href}
                  key={index}
                  className="flex items-center gap-3 text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg"
                >
                  <item.icon className="text-xl" />
                  <span className="font-semibold">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300 px-4 py-3 hover:bg-slate-700 rounded-lg">
            <FaSignOutAlt className="text-xl" />
            <span className="font-semibold">Logout</span>
          </div>
        </div>
      </div>

      <div className="h-screen w-full overflow-y-scroll">
        <div className="hidden h-20 p-4 bg-slate-700 lg:block"></div>

        {/* Mobile Header */}
        <div className="h-20 p-4 bg-slate-700 flex justify-between items-center lg:hidden">
          <div className="text-xl text-white basis-0 flex-grow">
            <button type="button" onClick={openMenu}>
              <HiOutlineMenuAlt1 />
            </button>
          </div>

          <Link to="/vendors">
            <VendorsLogo />
          </Link>
          <div className="text-right flex-grow basis-0"></div>
        </div>

        <div className="px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
