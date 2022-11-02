import { Link } from "react-router-dom";
import SignupForm from "../../components/SignupForm";
import VendorsLogo from "../../components/VendorsLogo";

const VendorSignup = () => {
  return (
    <div>
      <main className="h-screen flex flex-col justify-center items-center">
        <Link to="/vendors">
          <VendorsLogo />
        </Link>

        <div className="flex-1">
          <div className="mt-4 w-full md:w-[360px] md:p-6 rounded-md md:shadow-lg">
            <h1 className="text-3xl font-semibold">Create an account</h1>

            <SignupForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorSignup;
