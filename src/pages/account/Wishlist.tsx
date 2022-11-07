import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../utils/types";
import Spinner from "../../components/spinner";
import WishlistItem from "../../components/WishlistItem";

export const WishlistPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useAuth();

  const getWishlist = async (id: string) => {
    const response = await axiosPrivate.get<Product[]>(`/users/${id}/wishlist`);
    return response.data;
  };

  const wishlistQuery = useQuery(
    ["wishlist", userId],
    () => getWishlist(userId),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  const { data, isLoading } = wishlistQuery;

  if (isLoading) return <Spinner />;

  return (
    <div className="px-2 py-4">
      <div>
        <h1 className="text-2xl">Wishlist</h1>
      </div>

      {data?.length ? (
        <div className="mt-2">
          {data.map((product, index) => (
            <WishlistItem
              product={product}
              quantity={index}
              key={product._id}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 py-24 flex flex-col justify-center items-center bg-slate-50 rounded">
          <span className="text-5xl text-slate-400">
            <FaRegHeart />
          </span>
          <span>Nothing here.</span>
          <Link to="/" className="text-red-500 underline">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};
