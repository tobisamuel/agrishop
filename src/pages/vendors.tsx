import { Link } from "react-router-dom";
import vendor from "../assets/vendor.jpg";
import VendorsLogo from "../components/VendorsLogo";

const Vendors = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div>
        <div className="relative h-full z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:h-screen lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
            <nav
              className="relative flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                <VendorsLogo />
              </div>

              <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
                <Link
                  to="/vendors/dashboard"
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  Dashboard
                </Link>

                <Link
                  to="/vendors/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </Link>
              </div>
            </nav>
          </div>

          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Sell your products on</span>
                <span className="block text-indigo-600 xl:inline">
                  Agrishop Vendors
                </span>
              </h1>

              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>

              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/vendors/register"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src={vendor}
          alt=""
        />
      </div>
    </div>
  );
};

export default Vendors;

{
  /* <!--
          Mobile menu, show/hide based on menu open state.

          Entering: "duration-150 ease-out"
            From: "opacity-0 scale-95"
            To: "opacity-100 scale-100"
          Leaving: "duration-100 ease-in"
            From: "opacity-100 scale-100"
            To: "opacity-0 scale-95"
        --> */
}
