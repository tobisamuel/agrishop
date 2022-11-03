import { useState } from "react";
import { FaRegAddressBook } from "react-icons/fa";
import useFetchAddress from "../../hooks/useFetchAddress";
import AddressForm from "../../components/AddressForm";
import Modal from "../../components/modal";
import Spinner from "../../components/spinner";
import EditAddressForm from "../../components/EditAddressForm";
import ConfirmDelete from "../../components/confirmDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../../api/requests";

export const AddressesPage = () => {
  const { data, isLoading } = useFetchAddress();
  const [showFormModal, setShowFormModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
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
          onClick={() => setShowFormModal(true)}
        >
          Add a new address
        </button>

        <div className="mt-4 min-h-[300px] px-2 py-4 bg-slate-50 rounded md:px-4">
          {isLoading && <Spinner />}

          {data?.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map((address) => (
                <div key={address._id} className="w-full p-4 bg-white shadow">
                  <div>
                    <span className="font-semibold">{`${address.firstName} ${address.lastName}`}</span>
                  </div>

                  <div className="text-sm">{`${address.address}`}</div>
                  <div className="text-sm">{`${address.city}, ${address.state}, ${address.zip}`}</div>

                  <div className="mt-12 space-x-2 text-sm">
                    <button
                      className="text-slate-700"
                      onClick={() => setShowEditModal(true)}
                    >
                      edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      delete
                    </button>
                  </div>

                  {showDeleteModal && (
                    <Modal>
                      <ConfirmDelete
                        address={address}
                        closeModal={closeDeleteModal}
                      />
                    </Modal>
                  )}

                  {showEditModal && (
                    <Modal>
                      <EditAddressForm
                        closeModal={closeEditModal}
                        address={address}
                      />
                    </Modal>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-24 flex flex-col justify-center items-center">
              <span className="text-5xl text-slate-400">
                <FaRegAddressBook />
              </span>
              <span className="mt-2">You have not added an address yet.</span>
            </div>
          )}
        </div>
      </div>

      {showFormModal && (
        <Modal>
          <AddressForm closeModal={closeFormModal} />
        </Modal>
      )}
    </>
  );
};
