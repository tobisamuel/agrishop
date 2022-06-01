import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Announcements from "../Components/Announcements";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import Product from "../Components/Product";
import { publicRequest } from "../api/";

const Container = styled.div``;

const ProductContainer = styled.div`
  margin: 10px;
`;

const Title = styled.h1`
  margin: 10px 10px;
  text-align: center;
  color: teal;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 2px solid teal;
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 30%;
  height: 40px;
`;

const Filter = styled.div`
  margin: 10px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: teal;
`;

const Select = styled.select`
  padding: 10px;
  margin-left: 10px;
`;

const Option = styled.option``;

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
    <Container>
      <Announcements />
      <Navbar />
      <Title>Products</Title>
      <FilterContainer>
        <SearchContainer>
          <SearchIcon sx={{ ml: 1 }} />
          <InputBase
            placeholder="Search for Products"
            sx={{ ml: 1, flex: 1 }}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
        </SearchContainer>
        <Filter>
          <FilterText>Filter by Category:</FilterText>
          <Select name="category" onChange={handleFilters}>
            <Option value="all">All</Option>
            <Option value="grains">Grains</Option>
            <Option value="poultry">Poultry</Option>
            <Option value="vegetables">Vegetables</Option>
            <Option value="fruits">Fruits</Option>
          </Select>
        </Filter>
      </FilterContainer>
      {/* // <Products category={category} /> */}
      <ProductContainer>
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
      </ProductContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
