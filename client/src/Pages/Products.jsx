import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../Components/Layout";
import Product from "../Components/ProductCard";
import { publicRequest } from "../api";

const categories = ["All", "Grains", "Poultry", "Vegetables", "Fruits"];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const location = useLocation();

  const initialLocation = location.pathname.split("/")[2];
  const [category, setCategory] = useState(initialLocation);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category !== "all" ? `products?category=${category}` : "products"
        );
        setProducts(res.data);
      } catch (error) {}
    };
    getProducts();
  }, [category]);

  return (
    <Layout>
      <div className="grid grid-cols-8 h-screen">
        {/* Sidebar */}
        <div className="p-5 bg-teal-50">
          <span className="text-xl font-bold">Categories</span>
          <ul>
            {categories.map((category, index) => (
              <Link to={`/products/${category.toLowerCase()}`} key={index}>
                <li>{category}</li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="col-span-7 p-5">
          <div className="flex justify-between">
            <h1 className="text-teal-600 text-xl pb-5 font-bold">
              {category.toUpperCase()}
            </h1>

            {/* Search Bar */}
            <div className="flex items-center border-teal-600 border-2 rounded-lg h-8">
              <SearchIcon sx={{ ml: 1 }} />
              <input
                className="ml-2 outline-none"
                placeholder="Search for Products"
                onChange={(e) => {
                  setSearchItem(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {products
              .filter((product) => {
                if (searchItem === "") {
                  return product;
                } else if (
                  product.name.toLowerCase().includes(searchItem.toLowerCase())
                ) {
                  return product;
                }
              })
              .map((product, index) => (
                <Product key={index} product={product} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
