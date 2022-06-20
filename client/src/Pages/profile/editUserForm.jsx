import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mobile } from "../../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../redux/apiCalls";

const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;

  ${mobile({ display: "none" })}
`;

const UserForm = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const user_id = user._id;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleChange = (e, field) => {
    if (field === "firstName") {
      setFirstName(e.target.value);
    } else if (field === "lastName") {
      setLastName(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "phone") {
      setPhone(e.target.value);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editUser(user_id, dispatch, { firstName, lastName, email, phone });
  };

  return (
    <Form>
      <TextField
        onChange={(e) => handleChange(e, "firstName")}
        fullWidth
        defaultValue={firstName}
        id="standard-basic"
        label="First Name"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        onChange={(e) => handleChange(e, "lastName")}
        fullWidth
        defaultValue={lastName}
        id="standard-basic"
        label="Last Name"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        onChange={(e) => handleChange(e, "email")}
        fullWidth
        defaultValue={email}
        id="standard-basic"
        label="Email Address"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        onChange={(e) => handleChange(e, "phone")}
        fullWidth
        defaultValue={phone}
        id="standard-basic"
        label="Phone Number"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <Button variant="contained" sx={{ mt: 4 }} onClick={handleEdit}>
        Save Changes
      </Button>
    </Form>
  );
};

export default UserForm;
