import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { createAddress } from "../api/requests";
import useAuth from "../hooks/useAuth";
import { UserFormInputs } from "./SigninForm";

type Props = {
  closeModal: () => void;
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

const AddressForm = ({ closeModal }: Props) => {
  const { signInMutation } = useAuth();

  const addressMutation = useMutation(createAddress, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormInputs>();

  const onSubmit: SubmitHandler<AddressFormInputs> = async (data) => {
    try {
      console.log(data);
      //   signInMutation.mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute w-screen min-h-full flex justify-center items-center bg-black/50">
      <div className=" flex justify-center items-center bg-white rounded-lg">
        <div className="p-6 text-center">
          <div>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                  <input
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-fuchsia-600 focus:outline-none"
                    type="text"
                    name="firstName"
                    id="firstName"
                    aria-describedby="first name"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group mb-6">
                  <input
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-fuchsia-600 focus:outline-none"
                    type="text"
                    name="lastName"
                    id="lastName"
                    aria-describedby="last name"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                  <input
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-fuchsia-600 focus:outline-none"
                    type="text"
                    name="firstName"
                    id="firstName"
                    aria-describedby="first name"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="form-group mb-6">
                  <input
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-fuchsia-600 focus:outline-none"
                    type="text"
                    name="lastName"
                    id="lastName"
                    aria-describedby="last name"
                    placeholder="Zip code"
                  />
                </div>
              </div>

              <div className="form-group mb-6">
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-fuchsia-600 focus:outline-none"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                  <input
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-fuchsia-600 focus:outline-none"
                    type="text"
                    name="firstName"
                    id="firstName"
                    aria-describedby="first name"
                    placeholder="City"
                  />
                </div>
                <div className="form-group mb-6">
                  <input
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-fuchsia-600 focus:outline-none"
                    type="text"
                    name="lastName"
                    id="lastName"
                    aria-describedby="last name"
                    placeholder="State"
                  />
                </div>
              </div>
            </form>

            <button
              data-modal-toggle="popup-modal"
              type="button"
              //   onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Submit
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={closeModal}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;