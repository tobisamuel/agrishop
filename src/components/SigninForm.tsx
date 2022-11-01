import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";

export type UserFormInputs = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const { signInMutation } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormInputs>();

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    try {
      signInMutation.mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <fieldset>
          <label htmlFor="email" className="inline-block text-sm font-semibold">
            Email Address
          </label>
          <input
            id="email"
            className="w-full border-2 p-2 mt-1 rounded-md text-base font-normal focus:outline-2 focus:outline-offset-0"
            type="text"
            autoComplete="off"
            {...register("email")}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="password"
            className="inline-block text-sm font-semibold"
          >
            Password
          </label>
          <input
            id="password"
            className="w-full border-2 p-2 mt-1 rounded-md focus:outline-2 focus:outline-offset-0"
            type="password"
            autoComplete="off"
            {...register("password")}
          />
        </fieldset>

        <Link
          to="/"
          className="inline-block text-sm text-teal-600 font-semibold"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        className="mt-4 p-[10px] flex justify-center items-center gap-2 bg-teal-600 text-md text-white font-medium rounded-md hover:bg-teal-700 disabled:bg-gray-300 transition-all duration-300"
        type="submit"
        disabled={signInMutation.isLoading}
      >
        <span>Sign In</span>
        <span
          className={`${
            signInMutation.isLoading ? "block" : "hidden"
          } border-2 border-t-2  border-t-white rounded-full h-4 w-4 animate-spin border-zinc-400`}
        ></span>
      </button>

      <div className="mt-2 flex items-center">
        <div className="border-t w-full"></div>
        <span className="px-3">or</span>
        <div className="border-t w-full"></div>
      </div>

      <Link
        to="/register"
        className="w-full mt-2 p-3 text-center text-md font-medium rounded-md bg-gray-100 hover:bg-gray-200 transition-all duration-300"
      >
        Create an account{" "}
      </Link>
    </form>
  );
};

export default SigninForm;
