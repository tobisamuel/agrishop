import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/cart";
import { Product } from "../utils/types";

type Props = {
  product: Product;
  quantity: number;
};

const CartItem = ({ quantity, product }: Props) => {
  const { dispatch } = useCart();

  const reduceQuantity = () => {
    if (quantity <= 1) return;
    dispatch({ type: "DECREASE_QUANTITY", payload: product._id });
  };

  const increaseQuantity = () => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: product._id,
    });
  };

  const deleteItem = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product._id,
    });
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
            <div className="w-full flex flex-col justify-between lg:items-start lg:flex-row">
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

            {/* buttons */}
            <div className="hidden mt-4 lg:flex lg:justify-between lg:items-center">
              <div className="w-28 flex items-center text-lg">
                <button
                  className="p-2 bg-neutral-100 rounded-md"
                  onClick={reduceQuantity}
                >
                  <FaMinus />
                </button>
                <span className="flex-1 text-center p-2">{quantity}</span>
                <button
                  className="p-2 bg-neutral-100 rounded-md"
                  onClick={increaseQuantity}
                >
                  <FaPlus />
                </button>
              </div>

              <div className="text-right">
                <button className="p-2 text-lg" onClick={deleteItem}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* buttons for mobile */}
        <div className="mt-4 flex justify-between items-center lg:hidden">
          <div className="w-32 flex items-center text-lg">
            <button
              className="p-2 bg-neutral-100 rounded-md"
              onClick={reduceQuantity}
            >
              <FaMinus />
            </button>
            <span className="flex-1 text-center p-2">{quantity}</span>
            <button
              className="p-2 bg-neutral-100 rounded-md"
              onClick={increaseQuantity}
            >
              <FaPlus />
            </button>
          </div>

          <div className="text-right">
            <button className="p-2 text-lg" onClick={deleteItem}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
