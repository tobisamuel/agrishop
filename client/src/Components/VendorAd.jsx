import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const LinkR = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  // margin-top: 20px;
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: lightsalmon;
  ${mobile({ height: "55vh" })}
`;

const TextContainer = styled.div`
  width: 50%;
  align-self: flex-start;
  margin-left: 60px;
`;

const Text1 = styled.h1`
  font-size: 40px;
  margin: 0 0 10px 0;
  ${mobile({ fontSize: "25px" })}
`;

const Text2 = styled.h1`
  font-size: 45px;
  margin-top: 10px;
  ${mobile({ fontSize: "35px" })}
`;

const Button = styled.button`
  padding: 20px;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
  width: 150px;
  ${mobile({ width: "120px", padding: "12px" })}
`;

const VendorAd = () => {
  return (
    <Container>
      <TextContainer>
        <Text1>Become an</Text1>
        <Text2>AGRISHOP Vendor</Text2>
        <LinkR to="/vendor">
          <Button>Get started</Button>
        </LinkR>
      </TextContainer>
    </Container>
  );
};

export default VendorAd;
