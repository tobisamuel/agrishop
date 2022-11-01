import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { login } from "../api/requests";
import * as Yup from "yup";
import { useState } from "react";
import { getErrorStatus } from "../api/axios";

interface LocationState {
  from: {
    pathname: string;
  };
}

const LoginForm = () => {
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = (location.state as LocationState)?.from.pathname;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data, { resetForm }) => {
      try {
        const auth = await login(data);
        setAuth(auth);
        resetForm();
        navigate(pathname || "/notes", { replace: true });
      } catch (error) {
        const status = getErrorStatus(error);
        if (status === 400) {
          setError("Missing email or Password");
        } else if (status === 401) {
          setError("Please enter a valid email address and password.");
        } else {
          setError("Login Failed");
        }
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter a valid email"),
      password: Yup.string().required("Please enter your password"),
    }),
  });

  const renderErrorMessage = (field: string) => {
    return formik.touched[field as keyof typeof formik.touched] &&
      formik.errors[field as keyof typeof formik.errors] ? (
      <span className="text-sm text-red-500">
        {formik.errors[field as keyof typeof formik.errors]}
      </span>
    ) : null;
  };

  return (
    <form className="flex flex-col mt-6" onSubmit={formik.handleSubmit}>
      {error && (
        <p className="mb-3 pb-2 font-semibold text-red-500 ">{error}</p>
      )}
      <div>
        <fieldset>
          <label htmlFor="email" className="inline-block text-sm font-semibold">
            Email Address
          </label>
          <input
            id="email"
            className={`w-full border-2 px-2 py-3 mt-1 rounded-md text-base font-normal ${
              formik.errors.email ? "outline-red-500" : "outline-green-500"
            } focus:outline-2 focus:outline-offset-0`}
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("email")}
            required
          />
          {renderErrorMessage("email")}
        </fieldset>

        <fieldset>
          <label
            htmlFor="password"
            className="inline-block mt-3 text-sm font-semibold"
          >
            Password
          </label>
          <input
            id="password"
            className={`w-full border-2 px-2 py-3 mt-1 rounded-md ${
              formik.errors.password ? "outline-red-500" : "outline-green-500"
            } focus:outline-2 focus:outline-offset-0`}
            type="password"
            autoComplete="off"
            {...formik.getFieldProps("password")}
          />
          {renderErrorMessage("password")}
        </fieldset>
      </div>

      <button
        className="mt-4 p-3 flex justify-center bg-zinc-600 text-white text-md font-medium rounded-md hover:bg-zinc-700 disabled:bg-zinc-200 disabled:text-zinc-400 transition-all duration-300"
        type="submit"
        disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
      >
        <div className="flex items-center gap-2">
          <span>Sign In</span>
          <span
            className={`${
              formik.isSubmitting ? "block" : "hidden"
            } border-2 border-t-2  border-t-white rounded-full h-4 w-4 animate-spin border-zinc-400`}
          ></span>
        </div>
      </button>
    </form>
  );
};

export default LoginForm;
