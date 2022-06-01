import { useState, useEffect } from "react";
import styled from "styled-components";
import { publicRequest } from "../api";
import Product from "./Product";
import { mobile } from "../responsive";

import { Grid } from "@mui/material";

const Container = styled.div`
  margin: 10px;
`;

const ProductsContainer = styled.div`
  display: flex;
  padding: 0 10px 20px 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0px 10px 10px" })}
`;

const Products = ({ category, sort }) => {
  const [products, setProducts] = useState([]);

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
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={2}>
            <Product key={index} product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>

    // <Container>
    //   <ProductsContainer className="products">
    //     {products.map((product, index) => (
    //       <Product key={index} product={product} />
    //     ))}
    //   </ProductsContainer>
    // </Container>
  );
};

export default Products;
