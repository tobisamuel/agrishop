import { useFormik } from "formik";
import * as Yup from "yup";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useId from "../hooks/useId";

type PassArgs = {
  id: string;
  oldPassword: string;
  newPassword: string;
};

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PasswordForm = () => {
  const userId = useId();
  const axiosPrivate = useAxiosPrivate();

  const changePassword = async (data: PassArgs) => {
    const response = await axiosPrivate.post("/users/password", data);
    return response.data;
  };

  const formik = useFormik({
    initialValues: {
      id: userId,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (data, { resetForm }) => {
      try {
        const { id, oldPassword, newPassword } = data;
        const response = await changePassword({ id, oldPassword, newPassword });
        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(
          PWD_REGEX,
          "Must be between 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character (!, #  or @)."
        )
        .required("Enter your password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords do not match.")
        .required("Enter your password"),
    }),
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl text-zinc-600 font-medium">
        Change Password
      </h1>

      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <fieldset>
          <label
            htmlFor="oldPassword"
            className="block mb-4 text-sm font-medium"
          >
            Old Password
          </label>

          <input
            id="oldPassword"
            className={`w-full block border-2 p-3 rounded-md text-sm ${
              formik.errors.oldPassword
                ? "outline-red-500"
                : "outline-green-500"
            } focus:outline-2 focus:outline-offset-0`}
            type="password"
            {...formik.getFieldProps("oldPassword")}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="newPassword"
            className="block mb-4 text-sm font-medium"
          >
            New Password
          </label>

          <input
            id="newPassword"
            className={`w-full block border-2 p-3 rounded-md text-sm ${
              formik.errors.newPassword
                ? "outline-red-500"
                : "outline-green-500"
            } focus:outline-2 focus:outline-offset-0`}
            type="password"
            {...formik.getFieldProps("newPassword")}
          />

          {formik.touched.newPassword && formik.errors.newPassword ? (
            <p className="text-sm text-red-500">{formik.errors.newPassword}</p>
          ) : null}
        </fieldset>

        <fieldset>
          <label
            htmlFor="confirmPassword"
            className="block mb-4 text-sm font-medium"
          >
            Confirm New Password
          </label>

          <input
            id="confirmPassword"
            className={`w-full block border-2 p-3 rounded-md text-sm ${
              formik.errors.confirmPassword
                ? "outline-red-500"
                : "outline-green-500"
            } focus:outline-2 focus:outline-offset-0`}
            type="password"
            {...formik.getFieldProps("confirmPassword")}
          />

          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className="text-sm text-red-500">
              {formik.errors.confirmPassword}
            </p>
          ) : null}
        </fieldset>

        <div className="text-right">
          <button
            type="submit"
            className="text-white font-medium mt-10 px-5 py-2 bg-zinc-600 rounded-md disabled:cursor-not-allowed"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
