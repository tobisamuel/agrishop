import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../api/requests";
import { useCart } from "../context/cart";
import useAuth from "../hooks/useAuth";
import { Product } from "../utils/types";

type Props = {
  product: Product;
  quantity: number;
};

const WishlistItem = ({ product }: Props) => {
  const { userId } = useAuth();
  const { dispatch } = useCart();
  const queryClient = useQueryClient();

  const wishlistMutation = useMutation(removeFromWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    });
  };

  const removeFromList = () => {
    wishlistMutation.mutate({ userId, productId: product._id });
  };

  return (
    <div>
      {/* border */}
      <div className="border-b border-slate-200"></div>

      {/* item */}
      <div className="w-full my-3">
        {/* top */}
        <div className="flex gap-3">
          {/* left */}
          <Link to={`/${product.slug}`}>
            <div className="relative shrink-0 h-32 w-32 bg-slate-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </Link>

          {/* right */}
          <div className="flex-1 px-1">
            <div className="w-full flex flex-col justify-between">
              <Link to={`/${product.slug}`}>
                <span className="text-sm">{product.name}</span>
              </Link>

              <div className="mt-1 text-lg font-bold text-gray-900">
                <span>&#8358;</span>
                <span>{product.price}</span>
              </div>
            </div>

            <span
              className={`text-sm ${
                product.inStock ? "text-green-600" : "text-red-600"
              } font-semibold`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>

            <div className="mt-2 space-x-2">
              <button
                className="text-sm text-green-600 underline"
                type="button"
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <button
                className="text-sm text-red-600 underline"
                type="button"
                onClick={removeFromList}
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
