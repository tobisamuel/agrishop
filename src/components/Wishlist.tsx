import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

const WishlistPage = () => {
  return (
    <div className="px-2 py-4">
      <div>
        <h1 className="text-2xl">Wishlist</h1>
      </div>

      <div className="mt-5 py-24 flex flex-col justify-center items-center bg-slate-50 rounded">
        <span className="text-5xl text-slate-400">
          <FaRegHeart />
        </span>
        <span>Nothing here.</span>
        <Link to="/" className="text-red-500 underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;
