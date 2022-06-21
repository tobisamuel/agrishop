import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { mobile } from "../../responsive";

const Form = styled.form`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;

  ${mobile({ display: "none" })}
`;

const VendorForm = () => {
  return (
    <Form>
      <TextField
        id="standard-basic"
        label="First Name"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        id="standard-basic"
        label="Last Name"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        id="standard-basic"
        label="Email Address"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        id="standard-basic"
        label="Phone Number"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        id="standard-basic"
        label="Business Name"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        id="standard-basic"
        label="Business Address"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        id="standard-basic"
        type="password"
        label="Password"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        id="standard-basic"
        type="password"
        label="Confirm Password"
        variant="standard"
        sx={{ m: "5px" }}
      />
    </Form>
  );
};

export default VendorForm;
