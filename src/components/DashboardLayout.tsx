import { Link } from "react-router-dom";
import { ReactNode, useRef, useState } from "react";
import {
  FaChartLine,
  FaRegCreditCard,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Logo from "./Logo";
import Sidebar from "./sidebar";
import useOutsideClick from "../hooks/useOutsideClick";

const MenuItems = [
  { title: "Orders", href: "/vendor/dashboard/orders", icon: FaRegCreditCard },
  {
    title: "Products",
    href: "/vendor/dashboard/products",
    icon: FaRegCreditCard,
  },
  { title: "Finances", href: "/vendor/dashboard/finances", icon: FaChartLine },
  { title: "Profile", href: "/vendor/dashboard/profile", icon: FaUserAlt },
];

type Props = {
  title?: string;
  children: ReactNode;
};

const DashboardLayout = ({ children, title = "Agrishop Vendors" }: Props) => {
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
        } transform ease-in-out duration-300`}
      >
        <div className="w-full h-full px-4 py-8 flex flex-col justify-between">
          <div>
            <Logo />

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
          <Logo />
          <div className="text-right flex-grow basis-0"></div>
        </div>

        <div className="px-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
