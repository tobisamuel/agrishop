import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-600">
      <h1 className="text-3xl text-white font-bold">404 Page Not Found</h1>
      <Link to="/">
        <h2 className="text-lg text-white font-semibold">Back to Home</h2>
      </Link>
    </div>
  );
};
