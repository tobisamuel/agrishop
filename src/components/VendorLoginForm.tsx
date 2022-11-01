import { Link } from "react-router-dom";

const VendorLoginForm = () => {
  return (
    <form className="flex flex-col mt-4">
      <div className="space-y-2">
        <fieldset>
          <label htmlFor="email" className="inline-block text-sm font-semibold">
            Email Address
          </label>
          <input
            id="email"
            className="w-full border-2 px-2 py-3 mt-1 rounded-md text-base font-normal focus:outline-2 focus:outline-offset-0"
            type="text"
            autoComplete="off"
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
            className="w-full border-2 px-2 py-3 mt-1 rounded-md focus:outline-2 focus:outline-offset-0"
            type="password"
            autoComplete="off"
          />
        </fieldset>

        <Link to="/" className="inline-block text-teal-600 font-semibold">
          Forgot Password?
        </Link>
      </div>

      <button
        className="mt-4 p-3 bg-teal-600 text-white text-md font-medium rounded-md hover:bg-teal-700 disabled:bg-teal-200 disabled:text-teal-400 transition-all duration-300"
        type="submit"
      >
        Sign In
      </button>

      <div className="mt-2">
        <div className="flex items-center">
          <div className="border-t w-full"></div>
          <span className="px-3">or</span>
          <div className="border-t w-full"></div>
        </div>

        <button className="w-full mt-2 p-3 text-md font-medium rounded-md border-2 hover:bg-gray-50 transition-all duration-300">
          Register
        </button>
      </div>
    </form>
  );
};

export default VendorLoginForm;
