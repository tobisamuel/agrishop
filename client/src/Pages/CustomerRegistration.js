import React from "react";
import styled from "styled-components";
import CustomerForm from "../Components/CustomerForm";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const LinkR = styled(Link)`
  text-decoration: none;
  color: teal;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  ${mobile({ width: "70vw", height: "90vh" })}
`;

const Title = styled.h1`
  font-size: 30px;
  color: teal;
  margin-bottom: 0;
  ${mobile({ fontSize: "15px", marginTop: "5px" })}
`;

const Question = styled.h4`
  /* font-size: 12px; */
  /* color: teal; */
  font-weight: 600;
  margin: 10px 0 0 0;
  ${mobile({ fontSize: "10px", marginTop: "5px" })}
`;

const FormContainer = styled.div`
  width: 400px;
`;

const CustomerRegistration = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Register for AgriShop</Title>
        <Question>
          Already have an account? <LinkR to="/login">Log in</LinkR>
        </Question>
        <FormContainer>
          <CustomerForm />
        </FormContainer>
      </Wrapper>
    </Container>
  );
};

export default CustomerRegistration;
