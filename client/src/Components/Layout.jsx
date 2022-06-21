import Announcements from "./Announcements";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Announcements />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
