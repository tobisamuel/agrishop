import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../Components/Layout";
import Product from "../Components/ProductCard";
import styles from "./productlist.module.css";
import { publicRequest } from "../api/";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const location = useLocation();
  let navigate = useNavigate();

  const initialLocation = location.pathname.split("/")[2];
  const [category, setCategory] = useState(initialLocation);

  const handleFilters = (e) => {
    const value = e.target.value;
    setCategory(value);
    navigate(`/products/${value}`);
  };

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
      <h1 className={styles.title}>Products</h1>
      <div className={styles.filterContainer}>
        <div className={styles.searchContainer}>
          <SearchIcon sx={{ ml: 1 }} />
          <InputBase
            placeholder="Search for Products"
            sx={{ ml: 1, flex: 1 }}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
        </div>
        <div className={styles.filter}>
          <span className={styles.filterText}>Filter by Category:</span>
          <select name="category" onChange={handleFilters}>
            <option value="all">All</option>
            <option value="grains">Grains</option>
            <option value="poultry">Poultry</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
          </select>
        </div>
      </div>
      <div className={styles.productContainer}>
        <Grid container spacing={2}>
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
              <Grid item xs={12} sm={6} md={2}>
                <Product key={index} product={product} />
              </Grid>
            ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default ProductList;
