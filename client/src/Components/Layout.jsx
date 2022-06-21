import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="h-8 bg-teal-600 text-white flex items-center justify-center">
        50% off selected items! Click here
      </div>

      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
