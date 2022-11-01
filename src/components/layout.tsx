import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;

// className = "flex-1 min-h-screen pt-12 px-6 md:px-12 bg-gray-100";
