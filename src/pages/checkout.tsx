import { Link } from "react-router-dom";
import CartItem from "../components/cartitem";
import Layout from "../components/layout";
import { useCart } from "../context/cart";

export const Checkout = () => {
  const { cart, cartQuantity } = useCart();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-180px)] bg-gray-100 md:min-h-[calc(100vh-128px)]">
        <div className="p-2 space-y-4 bg-gray-100 md:container md:mx-auto md:min-w-[1000px] md:space-y-0 md:flex md:gap-5">
          <div className="bg-white p-3 flex-1 md:min-w-[684px]">
            <h1 className="text-3xl mb-2">Checkout ({cart.size} item)</h1>

            <div className="border-b border-slate-200"></div>

            <div className="mt-2 text-xl font-bold">Shipping Address</div>
            <div className="w-full pt-2 pb-4 flex justify-between items-center">
              <div>
                <div>
                  <span className="font-semibold">Oduwole Oluwatobi</span>
                  <span className="ml-2">+234 812722426</span>
                </div>

                <div className="text-sm">123, Street,</div>
                <div className="text-sm">Munich, Germany, 70001</div>
              </div>

              <button className="text-blue-800">change</button>
            </div>

            {cart.items.map((item) => (
              <CartItem
                key={item.product._id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="sticky bottom-0 w-full h-fit p-4 border-t bg-white md:border-t-0 md:rounded md:w-72">
            <div className="hidden pb-2 text-xl font-semibold border-b border-slate-200 md:block">
              Order Summary
            </div>

            <div>
              <div className="flex justify-between items-center md:mt-2">
                <span>Items:</span>
                <span className="">&#8358;{cartQuantity}</span>
              </div>

              <div className="flex justify-between items-center md:mt-2">
                <span>Shipping:</span>
                <span className="">Free</span>
              </div>

              <div className="flex justify-between items-center md:mt-2">
                <span className="font-bold">Total:</span>
                <span className="text-lg font-bold">&#8358;{cartQuantity}</span>
              </div>
            </div>

            <div className="mt-2 w-full text-center">
              <Link
                to="/"
                className="inline-block w-full p-2 bg-slate-400 text-white rounded-md"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
