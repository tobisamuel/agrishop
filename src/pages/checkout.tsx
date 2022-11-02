import { useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import AddressForm from "../components/AddressForm";
import CartItem from "../components/cartitem";
import Layout from "../components/layout";
import Modal from "../components/modal";
import SelectAddress from "../components/SelectAddress";
import Spinner from "../components/spinner";
import { useCart } from "../context/cart";
import useFetchAddress from "../hooks/useFetchAddress";

export const Checkout = () => {
  const [address, setAddress] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const { cart, cartQuantity } = useCart();
  const { data, isLoading } = useFetchAddress();

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  const closeSelectModal = () => {
    setShowSelectModal(false);
  };

  const handleClick = (e: MouseEvent<HTMLOptionElement>) => {
    setAddress(e.currentTarget.value);
  };

  if (isLoading) return <Spinner />;

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-180px)] bg-gray-100 md:min-h-[calc(100vh-128px)]">
        <div className="p-2 space-y-4 bg-gray-100 md:container md:mx-auto md:min-w-[1000px] md:space-y-0 md:flex md:gap-5">
          <div className="bg-white p-3 flex-1 md:min-w-[684px]">
            <h1 className="text-3xl mb-2">Checkout ({cart.size} item)</h1>

            <div className="border-b border-slate-200"></div>

            <h2 className="mt-2 text-xl font-bold">Shipping Address</h2>

            {data ? (
              <div className="w-full pt-2 pb-4 flex justify-between items-center">
                <div>
                  <div>
                    <span className="font-semibold">{`${data[1].firstName} ${data[1].lastName}`}</span>
                    <span className="ml-2">{data[1].phoneNumber}</span>
                  </div>

                  <div className="text-sm">{data[1].address}</div>
                  <div className="text-sm">{`${data[1].city}, ${data[1].state}, ${data[1].zip}`}</div>
                </div>

                <button
                  className="text-blue-800"
                  onClick={() => setShowSelectModal(true)}
                >
                  change
                </button>
              </div>
            ) : (
              <button
                className="text-blue-900"
                onClick={() => setShowFormModal(true)}
              >
                Add a new Address
              </button>
            )}

            {cart.items.map((item) => (
              <CartItem
                key={item.product._id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="w-full h-fit p-4 border-t bg-white md:static md:border-t-0 md:rounded md:w-72">
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

        {showFormModal && (
          <Modal>
            <AddressForm closeModal={closeFormModal} />
          </Modal>
        )}

        {showSelectModal && (
          <Modal>
            <SelectAddress closeModal={closeSelectModal} />
          </Modal>
        )}
      </div>
    </Layout>
  );
};
