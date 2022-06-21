import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Product from "./ProductCard";
import { publicRequest } from "../api";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const getNewProducts = async () => {
      try {
        const res = await publicRequest.get(`products?new=true`);
        setNewProducts(res.data);
      } catch (error) {}
    };
    getNewProducts();
  }, []);

  return (
    <div className="py-5">
      <div className="flex justify-between items-center px-5 py-5 text-teal-600">
        <h3 className="text-2xl font-bold">New Products</h3>
        <div className="flex items-center">
          <h3 className="text-base">SEE ALL</h3>
          <Link to="/products/all">
            <ArrowForwardIosIcon sx={{ ml: "5px", cursor: "pointer" }} />
          </Link>
        </div>
      </div>

      {/* Product Cards */}
      <div className="px-5 grid grid-cols-6 gap-x-3">
        {newProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
