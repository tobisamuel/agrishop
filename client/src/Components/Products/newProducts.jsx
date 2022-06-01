import { useState, useEffect } from "react";
import styled from "styled-components";
import { publicRequest } from "../../api";
import Product from "../Product";
import { mobile } from "../../responsive";
import { Grid } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// const ProductsContainer = styled.div`
//   display: flex;
//   padding: 0 10px 20px 10px;
//   flex-wrap: wrap;
//   /* justify-content: space-between; */
//   ${mobile({ padding: "0px 10px 10px" })}
// `;
const ProductsContainer = styled.div`
  margin: 10px;
`;

const LatestProducts = () => {
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
    <Container>
      <ProductsContainer>
        <Grid container spacing={2}>
          {newProducts.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={2}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </ProductsContainer>
    </Container>

    // <ProductsContainer className="products">
    //     {newProducts.map((product, index) => (
    //       <Product key={index} product={product} />
    //     ))}
    //   </ProductsContainer>
  );
};

export default LatestProducts;
