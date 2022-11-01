import useFetchUser from "../hooks/useFetchUser";
import Spinner from "./spinner";

const AccountPage = () => {
  const { data, isLoading } = useFetchUser();

  if (isLoading) return <Spinner />;

  return (
    <div className="px-2 py-4">
      <div>
        <h1 className="text-2xl">My Account</h1>
        <h2 className="mt-2 text-sm">Manage your account</h2>
      </div>

      <div className="mt-4">
        <form>
          <fieldset>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium"
            >
              First Name
            </label>

            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              id="firstName"
              type="text"
              defaultValue={data?.firstName}
              autoComplete="off"
            />
          </fieldset>

          <fieldset>
            <label
              htmlFor="lastName"
              className="block my-2 text-sm font-medium"
            >
              Last Name
            </label>

            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              id="lastName"
              type="text"
              defaultValue={data?.lastName}
              autoComplete="off"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="email" className="block my-2 text-sm font-medium">
              Email
            </label>

            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              id="email"
              type="text"
              defaultValue={data?.email}
              autoComplete="off"
            />
          </fieldset>

          <div className="text-right">
            <button
              type="submit"
              className="text-sm text-white font-medium mt-4 px-5 py-2 bg-zinc-500 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div>
        <h1 className="mb-6 text-2xl text-zinc-600 font-medium">
          Change Password
        </h1>

        <form className="space-y-4">
          <fieldset>
            <label
              htmlFor="oldPassword"
              className="block mb-4 text-sm font-medium"
            >
              Old Password
            </label>

            <input
              id="oldPassword"
              className={`w-full block border-2 p-3 rounded-md text-sm focus:outline-2 focus:outline-offset-0`}
              type="password"
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
              className={`w-full block border-2 p-3 rounded-md text-sm focus:outline-2 focus:outline-offset-0`}
              type="password"
            />
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
              className={`w-full block border-2 p-3 rounded-md text-sm focus:outline-2 focus:outline-offset-0`}
              type="password"
            />
          </fieldset>

          <div className="text-right">
            <button
              type="submit"
              className="text-white font-medium mt-10 px-5 py-2 bg-zinc-600 rounded-md disabled:cursor-not-allowed"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
