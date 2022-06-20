import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mobile } from "../../../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editVendor } from "../../../redux/apiCalls";

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

const VendorForm = () => {
  const dispatch = useDispatch();

  const vendor = useSelector((state) => state.vendor.currentVendor);
  const vendor_id = vendor?._id;

  const [firstName, setFirstName] = useState(vendor?.firstName);
  const [lastName, setLastName] = useState(vendor?.lastName);
  const [email, setEmail] = useState(vendor?.email);
  const [phone, setPhone] = useState(vendor?.phoneNumber);
  const [businessName, setBusinessName] = useState(vendor?.businessName);
  const [businessAddress, setBusinessAddress] = useState(
    vendor?.businessAddress
  );

  const handleChange = (e, field) => {
    if (field === "firstName") {
      setFirstName(e.target.value);
    } else if (field === "lastName") {
      setLastName(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "phone") {
      setPhone(e.target.value);
    } else if (field === "businessName") {
      setBusinessName(e.target.value);
    } else if (field === "businessAddress") {
      setBusinessAddress(e.target.value);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editVendor(vendor_id, dispatch, {
      firstName,
      lastName,
      email,
      phone,
      businessName,
      businessAddress,
    });
    window.alert(`You have successfully edited your details`);
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
      <TextField
        onChange={(e) => handleChange(e, "businessName")}
        fullWidth
        defaultValue={businessName}
        id="standard-basic"
        label="Business Name"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <TextField
        onChange={(e) => handleChange(e, "businessAddress")}
        fullWidth
        defaultValue={businessAddress}
        id="standard-basic"
        label="Business Address"
        variant="standard"
        sx={{ m: "5px" }}
      />
      <Button variant="contained" sx={{ mt: 4 }} onClick={handleEdit}>
        Save Changes
      </Button>
    </Form>
  );
};

export default VendorForm;
