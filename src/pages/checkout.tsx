import { useState, ChangeEvent } from "react";
import AddressForm from "../components/AddressForm";
import CartItem from "../components/cartitem";
import Layout from "../components/layout";
import Modal from "../components/modal";
import Spinner from "../components/spinner";
import { CartItemType, useCart } from "../context/cart";
import useFetchAddress from "../hooks/useFetchAddress";
import { usePaystackPayment } from "react-paystack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../api/requests";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export type OrderDeets = {
  userId: string;
  products: CartItemType[];
  amount: number;
  address: string;
};

export const Checkout = () => {
  const [address, setAddress] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const { cart, cartQuantity, dispatch } = useCart();
  const { data, isLoading } = useFetchAddress();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const orderMutation = useMutation(createOrder);

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: cartQuantity * 100,
    publicKey: "pk_test_17ac1b0dce817884103d7ee65124009a6d22d1d2",
  };

  const initializePayment = usePaystackPayment(config);

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  const handleClick = (e: ChangeEvent<HTMLSelectElement>) => {
    setAddress(e.currentTarget.value);
  };

  const orderData = {
    userId,
    products: cart.items,
    amount: cartQuantity,
    address: address,
  };

  const onSuccess = () => {
    orderMutation.mutate(orderData);
    dispatch({ type: "CLEAR_CART" });
    navigate("/");
  };

  const onClose = () => {
    console.log("closed");
  };

  if (isLoading) return <Spinner />;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-180px)] bg-gray-100 md:min-h-[calc(100vh-128px)]">
        <div className="p-2 space-y-4 bg-gray-100 md:container md:mx-auto md:min-w-[1000px] md:space-y-0 md:flex md:gap-5">
          <div className="bg-white p-3 flex-1 md:min-w-[684px]">
            <h1 className="text-3xl mb-2">Checkout ({cart.size} item)</h1>

            <div className="border-b border-slate-200"></div>

            <h2 className="mt-2 text-xl font-bold">Shipping Address</h2>

            {data ? (
              <div className="w-full pt-2 pb-4">
                <label className="block">Choose an address:</label>
                <select onChange={handleClick}>
                  {data.map((address) => {
                    const fullAddress = `${address.firstName} ${address.lastName}, ${address.phoneNumber}, ${address.address}, ${address.city}, ${address.state}, ${address.zip}`;

                    return (
                      <option value={fullAddress} key={address._id}>
                        {fullAddress}
                      </option>
                    );
                  })}
                </select>
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
              <div>
                <button
                  className="inline-block w-full p-2 bg-slate-400 text-white rounded-md"
                  onClick={() => {
                    initializePayment(onSuccess, onClose);
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        {showFormModal && (
          <Modal>
            <AddressForm closeModal={closeFormModal} />
          </Modal>
        )}
      </div>
    </Layout>
  );
};
