import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/apiCalls";

const CustomerRegistration = () => {
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
    <div>
      <div className="my-3">
        <h1 className="self-center text-center text-3xl text-teal-600 font-bold">
          <Link to="/">AGRISHOP</Link>
        </h1>
        <div className="flex justify-center">
          <form className="flex flex-col my-3 px-7 py-5 border-2">
            <h1 className="mb-3 text-2xl font-semibold">Register</h1>
            <label className="text-xs font-bold">First Name</label>
            <input
              className="border-x border-y p-1"
              name="firstName"
              type="text"
              onChange={handleInputChange}
            />
            <label className="mt-3 text-xs font-bold">Last Name</label>
            <input
              className="border-x border-y p-1"
              name="lastName"
              type="text"
              onChange={handleInputChange}
            />

            <label className="mt-3 text-xs font-bold">Email address</label>
            <input
              className=" border-x border-y p-1"
              name="email"
              type="text"
              onChange={handleInputChange}
            />
            <label className="mt-3 text-xs font-bold">Phone Number</label>
            <input
              className="border-x border-y p-1"
              name="phone"
              type="text"
              onChange={handleInputChange}
            />
            <label className="mt-3 text-xs font-bold">Password</label>
            <input
              className="border-x border-y p-1"
              name="password"
              type="password"
              onChange={handleInputChange}
            />
            <button
              className="p-2 mt-3 text-sm bg-teal-700 text-white rounded-md"
              onClick={handleRegister}
            >
              Register
            </button>

            <h5 className="mt-2">
              Already have an account?
              <Link to="/login">
                <span className="ml-1 text-teal-600">Login</span>
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegistration;
