import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Layout from "../components/layout";
import RatingStars from "../components/RatingStars";
import Spinner from "../components/spinner";
import { useCart } from "../context/cart";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFetchProduct from "../hooks/useFetchProduct";

export const ProductPage = () => {
  const { slug } = useParams();
  const { userId } = useAuth();
  const { dispatch } = useCart();
  const axiosPrivate = useAxiosPrivate();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const { data: product, isLoading } = useFetchProduct(slug);

  const queryClient = useQueryClient();

  const addToWishlist = async ({
    userId,
    product_id,
  }: {
    userId: string;
    product_id?: string;
  }) => {
    const response = await axiosPrivate.post(`/users/${userId}/wishlist`, {
      product_id,
    });
    return response.data;
  };

  const wishlistMutation = useMutation(addToWishlist, {
    onSuccess: () => {
      setLiked(true);
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const addToList = () => {
    wishlistMutation.mutate({ userId, product_id: product?._id });
  };

  const reduceQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Layout>
      <div className="md:container mx-auto w-full p-2 md:flex md:min-w-[1000px]">
        <div className="relative w-full h-[300px] md:w-[500px] md:h-[500px] bg-slate-100">
          <img
            src={product?.image}
            className="h-full w-full object-cover object-center"
            alt=""
          />
        </div>

        <div className="flex-1 px-2 mt-4 md:mt-0 md:ml-6 md:w-2/3">
          <div className="">
            <div className="p-1 bg-black text-white text-xs max-w-fit rounded-sm">
              <span> {product?.vendor.businessName}</span>
            </div>

            <span className="text-xs"> {product?.vendor.businessAddress}</span>

            <h1 className="my-2 md:text-3xl">{product?.name}</h1>

            <div className="flex gap-4">
              <button type="button" onClick={addToList}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-6 h-6 stroke-red-600 ${
                    liked ? "fill-red-600" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

              <RatingStars />
            </div>

            <div className="mt-4 mb-2 border-b border-slate-200"></div>

            <span className="text-xl font-bold text-gray-900 md:text-2xl">
              <span>&#8358;</span>
              <span>{product?.price}</span>
            </span>

            <div>
              <span>Quantity:</span>
              <div className="mt-2 w-24 flex items-center text-sm">
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
            </div>

            <div className="fixed bottom-0 left-0 mt-2 p-3 w-full bg-white border-y md:static md:border-y-0 md:p-0">
              <button
                className="w-full p-3 bg-slate-300 font-semibold rounded hover:bg-slate-400"
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>
          </div>

          <div className="mt-4 md:px-2">
            <h3>{product?.description}</h3>
            <div className="mt-2 h-64 bg-gray-100"></div>
            <div className="mt-2 h-64 bg-gray-100"></div>
            <div className="mt-2 h-64 bg-gray-100"></div>
          </div>
        </div>

        <div className="mt-4 h-64 bg-slate-300 md:mt-0 md:w-36 md:ml-8 hidden">
          dfd
        </div>
      </div>
    </Layout>
  );
};

// export async function getStaticProps(context: GetStaticPropsContext) {
//   const slug = context.params?.productSlug;

//   const product = await getProduct(slug);

//   return {
//     props: { product },
//   };
// }

// export async function getStaticPaths() {
//   const products = await getProducts();

//   const paths = products.map((product) => {
//     return {
//       params: {
//         productSlug: product?.slug,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }
