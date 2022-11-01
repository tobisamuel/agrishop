import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaRegCreditCard,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import Logo from "./Logo";

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

const Sidebar = () => {
  return (
    <div className="hidden w-80 h-screen bg-slate-800 lg:block">
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
  );
};

export default Sidebar;
