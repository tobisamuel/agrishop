import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/apiCalls";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const CustomerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e, field) => {
    if (field === "firstName") {
      setFirstName(e.target.value);
    } else if (field === "lastName") {
      setLastName(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "phone") {
      setPhone(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(dispatch, { firstName, lastName, email, phone, password });
    navigate("/");
  };

  return (
    <Form>
      <TextField
        onChange={(e) => handleChange(e, "firstName")}
        fullWidth
        id="standard-basic"
        label="First Name"
        variant="standard"
        sx={{
          mb: 1,
          mt: 2,
          "& .MuiInput-root:after": {
            borderBottomColor: "teal",
          },
        }}
        size="large"
      />
      <TextField
        onChange={(e) => handleChange(e, "lastName")}
        fullWidth
        id="standard-basic"
        label="Last Name"
        variant="standard"
        sx={{
          mb: 1,
          "& .MuiInput-root:after": {
            borderBottomColor: "teal",
          },
        }}
        size="small"
      />
      <TextField
        onChange={(e) => handleChange(e, "email")}
        fullWidth
        id="standard-basic"
        label="Email"
        type="email"
        variant="standard"
        sx={{
          mb: 1,
          "& .MuiInput-root:after": {
            borderBottomColor: "teal",
          },
        }}
      />
      <TextField
        onChange={(e) => handleChange(e, "phone")}
        fullWidth
        id="standard-basic"
        label="Phone"
        variant="standard"
        sx={{
          mb: 1,
          "& .MuiInput-root:after": {
            borderBottomColor: "teal",
          },
        }}
      />
      <TextField
        onChange={(e) => handleChange(e, "password")}
        fullWidth
        id="standard-basic"
        type="password"
        label="Password"
        variant="standard"
        sx={{
          mb: 1,
          "& .MuiInput-root:after": {
            borderBottomColor: "teal",
          },
        }}
      />
      <Button onClick={handleRegister}>Register</Button>
    </Form>
  );
};

export default CustomerForm;
