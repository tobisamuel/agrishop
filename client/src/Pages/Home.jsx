import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Layout from "../Components/Layout";
import NewProducts from "../Components/NewProducts";
import Categories from "../Components/Categories";

const Home = () => {
  return (
    <Layout>
      <div className="w-full h-96 bg-rose-300 flex justify-center items-center">
        <h1 className="text-7xl">AGRISHOP</h1>
      </div>

      {/* Categories */}
      <Categories />

      {/* Vendor Ad */}
      <div className="h-72 px-6 flex justify-between items-center bg-rose-400">
        <div className="space-y-3">
          <h1 className="text-4xl">Become an</h1>
          <h1 className="text-6xl">AGRISHOP Vendor</h1>
        </div>
        <button className="w-40 p-3 text-base bg-transparent border-2 cursor-pointer">
          <Link to="/vendor">Get started</Link>
        </button>
      </div>

      {/* New Products */}
      <NewProducts />

      <div className="h-96 flex justify-center items-center text-7xl bg-teal-800 text-white">
        BSSSS
      </div>
    </Layout>
  );
};

export default Home;
