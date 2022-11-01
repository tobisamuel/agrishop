import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import SigninForm from "../components/SigninForm";

export const Login = () => {
  return (
    <div>
      <main className="h-screen flex flex-col justify-center items-center">
        <Link to="/" className="inline-block text-teal-600 font-semibold">
          <Logo />
        </Link>

        <div className="flex-1">
          <div className="mt-4 w-full md:w-[360px] p-6 rounded-md md:shadow-lg">
            <h1 className="text-3xl font-semibold">Sign in</h1>

            <SigninForm />
          </div>
        </div>
      </main>
    </div>
  );
};
