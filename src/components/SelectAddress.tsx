import useFetchAddress from "../hooks/useFetchAddress";

type Props = {
  closeModal: () => void;
};

const SelectAddress = ({ closeModal }: Props) => {
  const { data } = useFetchAddress();

  return (
    <div className="w-screen h-full">
      <div className="fixed top-0 left-0 right-0 w-full h-full bg-black/50"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 p-4 bg-white rounded-lg md:w-1/2 z-50">
        <form>
          <fieldset>
            <legend className="mb-4 text-xl font-semibold">
              Select an Address:
            </legend>

            {data?.map((address) => (
              <div>
                <input
                  type="radio"
                  id={address.address}
                  name="drone"
                  value={address._id}
                  checked
                />
                <label
                  htmlFor={address.address}
                  className="ml-2"
                >{`${address.firstName} ${address.lastName}, ${address.address}, ${address.city}, ${address.state}, ${address.zip}`}</label>
              </div>
            ))}
          </fieldset>

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

export default SelectAddress;
