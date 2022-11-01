import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { FaTimes } from "react-icons/fa";
import { updateNote } from "../api/requests";
import useAutosizeTextArea from "../hooks/useAutosizeTextarea";
import { Note } from "../utils/types";

type EditFormProps = {
  closeForm: () => void;
  _id: string;
  title: string;
  content: string;
  userId: string;
};

const NoteEditForm = ({
  closeForm,
  _id,
  title,
  content,
  userId,
}: EditFormProps) => {
  const queryClient = useQueryClient();
  const editMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const formik = useFormik<Note>({
    initialValues: {
      _id,
      title,
      content,
      userId,
    },
    onSubmit: (note, { resetForm }) => {
      editMutation.mutate(note);
      resetForm();
      closeForm();
    },
  });

  const textareaRef = useAutosizeTextArea(formik.values.content);

  return (
    <div className="min-h-[250px] bg-gray-200 shadow-lg">
      <form className="p-4 h-full flex flex-col" onSubmit={formik.handleSubmit}>
        <div>
          <h1 className="text-xl font-medium text-zinc-700 sm:text-2xl">
            <input
              className="w-full mb-3 bg-transparent text-xl font-medium sm:text-2xl focus:outline-none"
              type="text"
              placeholder="Title"
              aria-label="title"
              autoComplete="off"
              {...formik.getFieldProps("title")}
            />
          </h1>
        </div>

        <div className="flex-auto">
          <textarea
            className="w-full leading-relaxed break-words bg-transparent resize-none focus:outline-none"
            placeholder="Write a note..."
            autoComplete="off"
            autoFocus
            rows={1}
            ref={textareaRef}
            {...formik.getFieldProps("content")}
          />
        </div>

        <div className="flex justify-between items-end">
          <button
            className="p-2 rounded-full text-lg text-zinc-500 hover:bg-zinc-300"
            type="button"
            onClick={closeForm}
          >
            <FaTimes />
          </button>

          <button
            type="submit"
            className="h-9 w-16 px-3 py-1 bg-zinc-400 rounded-lg border-2 flex justify-center items-center border-zinc-300 text-white disabled:bg-zinc-300"
            disabled={!formik.dirty || formik.isSubmitting}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditForm;
