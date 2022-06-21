import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import styles from "./login.module.css";

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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Login to AgriShop</h1>
        <h5 className={styles.question}>
          Don't have an account? <Link to="/register">Register</Link>
        </h5>
        <form className={styles.form}>
          <TextField
            id="standard-basic"
            label="Email"
            name="email"
            variant="standard"
            sx={{ mb: 1, width: "100%" }}
            onChange={handleInputChange}
          />
          <TextField
            id="standard-basic"
            type="password"
            label="Password"
            name="password"
            variant="standard"
            sx={{ mb: 1, width: "100%" }}
            onChange={handleInputChange}
          />
          <button
            className={styles.button}
            onClick={handleLogin}
            disabled={isFetching}
          >
            Login
          </button>
          {error && (
            <span className={styles.error}>Something went wrong....</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
