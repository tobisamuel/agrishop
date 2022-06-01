import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 10px;
  height: 20vh;
  position: relative;
  border: 3px solid teal;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
  border-radius: 5px;
  ${mobile({ height: "20vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 35px;
  color: #003f3f;
  margin: 0px 0px 10px;
  ${mobile({ margin: "0px 0px 5px" })}
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const CategoryItem = ({ category }) => {
  return (
    <Container>
      <Link to={`/products/${category.cat}`}>
        <Image src={category.img} />
        <Info>
          <Title>{category.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
