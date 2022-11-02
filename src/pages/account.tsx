import { NavLink, Outlet } from "react-router-dom";
import Layout from "../components/layout";

const navItems = [
  { name: "My Account", href: "/account" },
  { name: "Orders", href: "/account/orders" },
  { name: "Shipping Addresses", href: "/account/addresses" },
  { name: "Wishlist", href: "/account/wishlist" },
];

export const Account = () => {
  return (
    <Layout>
      {/* Mobile Nav */}
      <div className="p-2 bg-slate-300 flex gap-3 items-center overflow-scroll md:hidden scrollbar-hide">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `shrink-0 ${isActive ? "text-red-500 font-semibold" : ""}`
            }
          >
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="md:mt-5 md:container md:mx-auto md:min-w-[1000px] md:flex md:gap-5">
        <div className="hidden h-96 bg-slate-100 rounded md:block md:w-1/4">
          <div className="py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `shrink-0 ${isActive ? "text-red-500 font-semibold" : ""}`
                }
              >
                <div className="px-4 py-2 text-sm hover:bg-slate-200 hover:font-semibold">
                  <span>{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="min-h-[calc(100vh-220px)] md:min-h-[calc(100vh-148px)] md:w-3/4">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};
