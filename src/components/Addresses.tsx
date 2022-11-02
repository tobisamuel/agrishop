import { useState } from "react";

import { FaRegAddressBook } from "react-icons/fa";
import useFetchAddress from "../hooks/useFetchAddress";
import AddressForm from "./AddressForm";
import Modal from "./modal";
import Spinner from "./spinner";

const AddressesPage = () => {
  const { data, isLoading } = useFetchAddress();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="px-2 py-4">
        <div>
          <h1 className="text-2xl">Shipping Address</h1>
        </div>

        <button
          type="button"
          className="mt-4 px-4 py-2 bg-slate-300 text-sm rounded"
          onClick={() => setShowModal(true)}
        >
          Add a new address
        </button>

        <div className="mt-4 min-h-[300px] px-2 py-4 bg-slate-50 rounded">
          {isLoading && <Spinner />}

          {data ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map((address) => (
                <div key={address._id} className="w-full p-4 bg-white shadow">
                  <div>
                    <span className="font-semibold">{`${address.firstName} ${address.lastName}`}</span>
                  </div>

                  <div className="text-sm">{`${address.address}`}</div>
                  <div className="text-sm">{`${address.city}, ${address.state}, ${address.zip}`}</div>

                  <div className="mt-12 space-x-2 text-sm">
                    <button className="text-slate-700">edit</button>
                    <button className="text-red-600">delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <span className="text-5xl text-slate-400">
                <FaRegAddressBook />
              </span>
              <span className="mt-2">You have not added an address yet.</span>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal>
          <AddressForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default AddressesPage;
