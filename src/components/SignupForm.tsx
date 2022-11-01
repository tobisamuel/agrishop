import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userSignup } from "../api/requests";

export type SignUpFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const signUpMutation = useMutation(userSignup);

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    console.log(data);
    signUpMutation.mutate(data);
  };

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <fieldset>
          <label
            htmlFor="first-name"
            className="inline-block text-sm font-semibold"
          >
            First Name
          </label>
          <input
            id="first-name"
            className="w-full border-2 p-2 mt-[2px] rounded-md text-base font-normal focus:outline-2 focus:outline-offset-0"
            type="text"
            {...register("firstName")}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="last-name"
            className="inline-block text-sm font-semibold"
          >
            Last Name
          </label>
          <input
            id="last-name"
            className="w-full border-2 p-2 mt-[2px] rounded-md text-base font-normal focus:outline-2 focus:outline-offset-0"
            type="text"
            {...register("lastName")}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="email" className="inline-block text-sm font-semibold">
            Email Address
          </label>
          <input
            id="email"
            className="w-full border-2 p-2 mt-[2px] rounded-md text-base font-normal focus:outline-2 focus:outline-offset-0"
            type="text"
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
            className="w-full border-2 p-2 mt-[2px] rounded-md focus:outline-2 focus:outline-offset-0"
            type="password"
            autoComplete="off"
            {...register("password")}
          />
        </fieldset>
      </div>

      <button
        className="mt-4 p-[10px] flex justify-center items-center gap-2 bg-teal-600 text-md text-white font-medium rounded-md hover:bg-teal-700 disabled:bg-gray-300 transition-all duration-300"
        type="submit"
      >
        Create Account
      </button>

      <div className="mt-4 text-sm leading-none">
        Already have an account?{" "}
        <Link to="/login" className="inline-block text-teal-600 font-semibold">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
