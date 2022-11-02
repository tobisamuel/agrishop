import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { createAddress } from "../api/requests";
import useAuth from "../hooks/useAuth";
import { Address } from "../utils/types";
import Spinner from "./spinner";

type Props = {
  closeModal: () => void;
  address?: Address;
};

export type AddressFormInputs = {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

const AddressForm = ({ closeModal, address }: Props) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const addressMutation = useMutation(createAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormInputs>();

  register("userId", { value: userId });

  const onSubmit: SubmitHandler<AddressFormInputs> = async (data) => {
    try {
      console.log(data);
      addressMutation.mutate(data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-full">
      <div className="fixed top-0 left-0 w-full h-full bg-black/50"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 p-4 bg-white rounded-lg md:w-1/2">
        <h1 className="mt-2 mb-4 text-xl font-semibold">Add a new Address</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4 md:space-y-0 md:flex-row md:gap-3">
            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              type="text"
              id="firstName"
              aria-describedby="first name"
              placeholder="First Name"
              {...register("firstName")}
            />
            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              type="text"
              id="lastName"
              aria-describedby="last name"
              placeholder="Last Name"
              {...register("lastName")}
            />
          </div>

          <div className="flex flex-col gap-4 md:space-y-0 md:flex-row md:gap-3">
            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              type="text"
              id="phoneNumber"
              aria-describedby="phone Number"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              type="number"
              id="zipCode"
              aria-describedby="Zip Code"
              placeholder="Zip code"
              {...register("zip")}
            />
          </div>

          <div className="form-group">
            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              type="text"
              id="address"
              placeholder="Address"
              {...register("address")}
            />
          </div>

          <div className="flex flex-col gap-4 md:space-y-0 md:flex-row md:gap-3">
            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              type="text"
              id="city"
              aria-describedby="city"
              placeholder="City"
              {...register("city")}
            />
            <input
              className="w-full block border-2 p-2 rounded-md text-sm"
              type="text"
              id="state"
              aria-describedby="last name"
              placeholder="State"
              {...register("state")}
            />
          </div>

          <button
            data-modal-toggle="popup-modal"
            type="submit"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Add address
          </button>

          <button
            data-modal-toggle="popup-modal"
            type="button"
            onClick={closeModal}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
