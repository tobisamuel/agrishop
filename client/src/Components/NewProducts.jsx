import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LatestProducts from "./Products/newProducts";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const LinkR = styled(Link)`
  text-decoration: none;
  color: teal;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const MiniNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: teal;
`;

const Text = styled.h2`
  font-weight: 500;
  margin-left: 20px;
`;

const Hyperlink = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const SeeAll = styled.h3`
  font-size: 15px;
`;

const NewProducts = () => {
  return (
    <Container>
      <MiniNav>
        <Text>New Products</Text>
        <Hyperlink>
          <SeeAll>SEE ALL</SeeAll>
          <LinkR to="/products/all">
            <ArrowForwardIosIcon sx={{ ml: "5px", cursor: "pointer" }} />
          </LinkR>
        </Hyperlink>
      </MiniNav>
      <LatestProducts />
    </Container>
  );
};

export default NewProducts;
