import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { Product } from "../utils/types";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link to={`products/${product.slug}`}>
      <div className="w-full h-64 bg-white flex flex-col shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-300 hover:scale-[1.03]">
        {/* image */}
        <div className="relative w-full h-44 bg-slate-200 overflow-hidden aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* name */}
        <div className="max-h-[25%] px-2 py-3">
          <h5 className="text-sm tracking-tight truncate text-gray-900 dark:text-white">
            {product.name}
          </h5>

          {/* price */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              <span>&#8358;</span>
              <span>{product.price}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
