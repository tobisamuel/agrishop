import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 43vh;
  /* margin-top: 20px; */
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  ${mobile({ justifyContent: "center", alignItems: "center" })}
`;

const Title = styled.h1`
  color: teal;
  margin: 20px 0px;
  font-weight: 600;
`;

const CatContainer = styled.div`
  /* background-color: #003f3f; */
  display: flex;
  margin: 0 10px 30px 10px;
  /* padding-bottom: 10px; */
  justify-content: space-evenly;
  ${mobile({ padding: "0 10", flexDirection: "column" })}
`;

function Categories() {
  return (
    <Container>
      <TitleContainer>
        <Title>Top Categories</Title>
      </TitleContainer>

      <CatContainer>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </CatContainer>
    </Container>
  );
}

export default Categories;
