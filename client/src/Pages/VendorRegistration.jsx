import React from "react";
import styled from "styled-components";
import VendorForm from "../Components/VendorForm";
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
  width: 35%;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
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

const Button = styled.button`
  width: 30%;
  padding: 10px;
  margin: 20px;
  border: none;
  border-radius: 30px;
  background-color: #019191;
  color: white;
  &:hover {
    background-color: teal;
  }
  cursor: pointer;
`;

const VendorRegistration = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Become a Vendor</Title>
        <Question>
          Already have an account? <LinkR to="/vendor/login">Log in</LinkR>
        </Question>
        <VendorForm />
        <Button>Register</Button>
      </Wrapper>
    </Container>
  );
};

export default VendorRegistration;
