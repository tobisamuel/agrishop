type Props = {
  handleDelete: () => void;
  closeModal: () => void;
};

const ConfirmDelete = ({ handleDelete, closeModal }: Props) => {
  return (
    <div className="absolute w-full min-h-full flex justify-center items-center bg-black/50">
      <div className="w-80 flex justify-center items-center bg-white rounded-lg">
        <div className="p-6 text-center">
          <div>
            <h3 className="mb-5 text-lg font-normal text-zinc-600">
              Are you sure you want to delete this note?
            </h3>

            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>

            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={closeModal}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
