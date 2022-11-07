import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import CartItem from "../components/cartitem";
import Layout from "../components/layout";
import { useCart } from "../context/cart";
import useAuth from "../hooks/useAuth";

export const Cart = () => {
  const { cart, cartQuantity } = useCart();
  const { accessToken } = useAuth();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-180px)] bg-gray-100 md:min-h-[calc(100vh-128px)]">
        <div className="p-2 space-y-4 bg-gray-100 md:container md:mx-auto md:min-w-[1000px] md:space-y-0 md:flex md:gap-5">
          <div className="bg-white p-3 flex-1 md:min-w-[684px]">
            <h1 className="text-3xl mb-2">Cart</h1>

            {cart.size > 0 ? (
              cart.items.map((item) => (
                <CartItem
                  key={item.product._id}
                  product={item.product}
                  quantity={item.quantity}
                />
              ))
            ) : (
              <div className="p-4 flex flex-col items-center">
                <FaCartPlus className="text-7xl" />
                <h2 className="mt-2 text-xl">Your shopping cart is empty</h2>
                <Link to="/" className="mt-2 text-slate-500 font-medium">
                  Continue shopping
                </Link>
              </div>
            )}

            {/* <div className="md:hidden relative mt-3 px-4 py-12 w-72 bg-white shadow-lg">
              <div className="absolute ">button</div>

              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-black rounded-full"></div>
                <h2>Name</h2>
              </div>

              <div className="mt-8 space-y-6">
                <div className="py-6 bg-gray-300 flex justify-center items-center">
                  text
                </div>
                <div className="py-6 bg-gray-300 flex justify-center items-center">
                  text
                </div>
                <div className="py-6 bg-gray-300 flex justify-center items-center">
                  text
                </div>
                <div className="py-6 bg-gray-300 flex justify-center items-center">
                  text
                </div>
                <div className="py-6 bg-gray-300 flex justify-center items-center">
                  text
                </div>
              </div>
            </div> */}
          </div>

          {/* Summary */}
          {cart.size > 0 ? (
            <div className="sticky bottom-0 w-full h-fit p-4 border-t bg-white md:border-t-0 md:rounded md:w-72">
              <div className="hidden pb-2 text-xl font-semibold border-b border-slate-200 md:block">
                Summary
              </div>

              <div className="flex justify-between items-center md:mt-2">
                <span>Subtotal:</span>
                <span className="text-lg font-bold">&#8358;{cartQuantity}</span>
              </div>

              <div className="mt-2 w-full text-center">
                <Link
                  to={accessToken ? "/checkout" : "/login"}
                  className="inline-block w-full p-2 bg-slate-400 text-white rounded-md"
                >
                  Proceed to checkout
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

{
  /* No items */
}
{
  /* <div className="mt-4 px-4 flex flex-col items-center">
          <FaCartPlus className="text-7xl" />
          <h2 className="mt-2 text-xl">Your shopping cart is empty</h2>
          <Link href="/">
            <a className="mt-3 text-slate-500 font-medium">See our top deals
          </Link>
          <Link href="/">
            <a className="mt-6 w-full p-3 text-center text-white bg-slate-500 rounded-md hover:bg-slate-600 md:w-64">
              Continue shopping
            
          </Link>
        </div> */
}
