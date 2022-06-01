import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcements from "../Components/Announcements";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { publicRequest } from "../api";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: 30 })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "0 0px" })}
`;

const VendorDiv = styled.div`
  background-color: #000000;
  padding: 3px;
  display: inline-block;
  ${mobile({ marginTop: "10px" })}
`;

const VendorName = styled.h5`
  font-weight: 500;
  color: white;
  margin: 5px;
  width: fit-content;
`;

const Title = styled.h1``;

const Description = styled.p`
  margin: 20px 0;
`;

const Price = styled.h4`
  font-weight: 100;
  font-size: 40px;
  margin-top: 0;
  margin-bottom: 20px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  font-weight: 700;
  align-items: center;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 50%;
  margin-top: 20px;
  padding: 15px;
  border: 1px solid teal;
  border-radius: 10px;
  background-color: white;
  color: teal;
  cursor: pointer;
  &:hover {
    background-color: teal;
    color: white;
    transition: all 0.5s ease;
  }
  ${mobile({ width: "100%" })}
`;

const ProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch(); // used to dispatch redux actions

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("products/" + id);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
  });

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    const cart_id = new Date().getTime(); // create unique cart id and pass to action payload
    dispatch(addProduct({ ...product, quantity, cart_id })); // wrap action with dispatch
  };

  return (
    <Container>
      <Announcements />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <VendorDiv>
            <VendorName>{product.vendor}</VendorName>
          </VendorDiv>
          <Title>{product.name}</Title>
          <Description>{product.description}</Description>
          <Price>&#8358;{product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon
                onClick={() => handleQuantity("dec")}
                sx={{ cursor: "pointer" }}
              />
              <Amount>{quantity}</Amount>
              <AddIcon
                onClick={() => handleQuantity("inc")}
                sx={{ cursor: "pointer" }}
              />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ProductPage;
