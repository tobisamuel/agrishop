import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Announcements from "../Components/Announcements";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProduct,
  increaseQuantity,
  reduceQuantity,
} from "../redux/cartRedux";

import { usePaystackPayment } from "react-paystack";
import { Link, useNavigate } from "react-router-dom";

const LinkR = styled(Link)`
  text-decoration: none;
`;
const Container = styled.div``;
const Wrapper = styled.div`
  margin-bottom: 30px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  ${mobile({ fontSize: "15px" })}
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;
const CartItemsContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: #f3f3f3;
  height: 100%;
  border-radius: 10px;
  margin: 0 10px;
`;

const CartItemContainer = styled.div`
  width: 65%;
  align-self: center;
  background-color: white;
  border-radius: 10px;
  margin: 20px 0 20px 0;
  /* ${mobile({ width: "60vw" })} */
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItem = styled.div`
  display: flex;
`;

const Image = styled.img`
  flex: 1;
  height: 100%;
  width: 50px;
  align-self: center;
  border-radius: 5px;
  margin: 20px;
`;

const Details = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const VendorName = styled.h4`
  font-weight: 700;
`;

const ProductName = styled.h1`
  font-weight: 300;
`;

const AddContainer = styled.div`
  flex: 2;
  /* width: 50%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Price = styled.h5`
  flex: 1;
  font-size: 24px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

const SummaryDetails = styled.div`
  display: flex;
  align-items: center;
  ${mobile({ flexDirection: "row", marginTop: "20" })};
`;

const SummaryTitle = styled.h2`
  font-size: 30px;
  margin-right: 1px;
  ${mobile({ display: "none" })}
`;

const SubTotal = styled.h5`
  font-size: 24px;
  margin-right: 10px;
  ${mobile({ display: "none" })}
`;

const Total = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-right: 10px;
  ${mobile({ flex: "2", marginLeft: "20px" })}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Button = styled.button`
  width: 10%;
  height: 50px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  ${mobile({ flex: "1", margin: "10px" })}
`;

const CartMessage = styled.h1`
  margin-left: 10px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch(); // used to dispatch redux actions
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/checkout");
  };

  return (
    <Container>
      <Announcements />
      <Navbar />
      <Wrapper>
        <Title>Cart</Title>
        <Button
          onClick={(e) => {
            navigate("/products/all");
          }}
        >
          Back to Shopping
        </Button>

        <Bottom>
          <CartItemsContainer>
            {cart.products.length === 0 ? (
              <CartMessage>Your cart is empty</CartMessage>
            ) : (
              cart.products.map((product, index) => (
                <CartItemContainer key={index}>
                  <ItemWrapper>
                    <CartItem>
                      <Image src={product.img} />
                      <Details>
                        <VendorName>{product.vendor}</VendorName>
                        <ProductName>{product.name}</ProductName>
                      </Details>
                      <AddContainer>
                        <IconButton
                          sx={{ cursor: "pointer", m: "2px" }}
                          onClick={() => dispatch(removeProduct(product))}
                        >
                          <DeleteForeverIcon />
                        </IconButton>

                        <AmountContainer>
                          <IconButton
                            sx={{ cursor: "pointer", mr: "2px" }}
                            onClick={() => dispatch(reduceQuantity(product))}
                            disabled={product.quantity > 1 ? false : true}
                          >
                            <RemoveIcon />
                          </IconButton>

                          <Amount>{product.quantity}</Amount>

                          <IconButton
                            sx={{ cursor: "pointer", ml: "2px" }}
                            onClick={() => dispatch(increaseQuantity(product))}
                          >
                            <AddIcon />
                          </IconButton>
                        </AmountContainer>
                      </AddContainer>
                      <Price>&#8358;{product.price * product.quantity}</Price>
                    </CartItem>
                  </ItemWrapper>
                </CartItemContainer>
              ))
            )}
          </CartItemsContainer>
        </Bottom>
        <ButtonContainer>
          <SummaryDetails>
            <Total>Total: </Total>
            <SummaryTitle>&#8358;</SummaryTitle>
            <SubTotal>{cart.total}</SubTotal>
          </SummaryDetails>

          {user ? (
            <Button onClick={handleClick}>Proceed to Checkout</Button>
          ) : (
            <SummaryTitle>Log in to proceed</SummaryTitle>
          )}
        </ButtonContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
