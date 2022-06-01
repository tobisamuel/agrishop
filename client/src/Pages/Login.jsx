import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

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
  width: 30%;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({ width: "80%" })}
`;

const Title = styled.h1`
  font-size: 30px;
  color: teal;
  margin-bottom: 0;
`;

const Question = styled.h5`
  /* font-size: 12px; */
  /* color: teal; */
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 0;
`;

const Form = styled.form`
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 30%;
  padding: 10px;
  margin: 20px;
  border: none;
  border-radius: 20px;
  background-color: #019191;
  color: white;
  &:hover {
    background-color: teal;
  }
  &:disabled {
    color: lightgray;
    cursor: not-allowed;
  }
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login to AgriShop</Title>
        <Question>
          Don't have an account? <LinkR to="/register">Register</LinkR>
        </Question>
        <Form>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{ mb: 1, width: "100%" }}
            onChange={handleEmailChange}
          />
          <TextField
            id="standard-basic"
            type="password"
            label="Password"
            variant="standard"
            sx={{ mb: 1, width: "100%" }}
            onChange={handlePasswordChange}
          />
          <Button onClick={handleLogin} disabled={isFetching}>
            Login
          </Button>
          {error && <Error>Something went wrong....</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
