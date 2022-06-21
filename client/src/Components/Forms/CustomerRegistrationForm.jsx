import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiCalls";

const CustomerRegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(dispatch, customer);
    navigate("/");
  };

  return (
    <form className="flex flex-col py-10 space-y-4">
      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleInputChange}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleInputChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input name="phone" placeholder="Phone" onChange={handleInputChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <button
        className="p-3 m-5 rounded-md bg-teal-600 text-white border-0"
        onClick={handleRegister}
      >
        Register
      </button>
    </form>
  );
};

export default CustomerRegistrationForm;
