import { Link } from "react-router-dom";
import VendorLoginForm from "../../components/VendorLoginForm";
import VendorsLogo from "../../components/VendorsLogo";

const VendorLogin = () => {
  return (
    <div>
      <main className="h-screen flex flex-col justify-center items-center">
        <span className="mt-8 text-4xl font-bold font-tamil">
          <Link to="/vendors">
            <VendorsLogo />
          </Link>
        </span>
        <div className="flex-1">
          <div className="mt-4 w-96 p-6 rounded-md shadow-lg">
            <h1 className="mt-3 text-3xl font-semibold">Sign in</h1>

            <VendorLoginForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorLogin;
