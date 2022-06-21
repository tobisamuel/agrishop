import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, user);
  };

  return (
    <div>
      <div className="my-3">
        <h1 className="self-center text-center text-3xl text-teal-600 font-bold">
          <Link to="/">AGRISHOP</Link>
        </h1>
        <div className="flex justify-center">
          <form className="flex flex-col my-3 px-7 py-5 border-2">
            <h1 className="mb-3 text-2xl font-semibold">Sign In</h1>
            <label className="text-xs font-bold">Email address</label>
            <input
              className="border-x border-y p-1"
              name="email"
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
              className="p-2 mt-3 text-sm bg-teal-700 text-white rounded-md disabled:cursor-not-allowed disabled:bg-gray-400"
              onClick={handleLogin}
              disabled={isFetching}
            >
              Login
            </button>
            {error && (
              <span className="text-xs text-red-600">
                Something went wrong....
              </span>
            )}

            <h5 className="mt-2">
              Don't have an account?
              <Link to="/register">
                <span className="ml-1 text-teal-600">Register</span>
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
