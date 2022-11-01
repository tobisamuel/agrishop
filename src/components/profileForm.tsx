import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import useId from "../hooks/useId";
import useFetchUser from "../hooks/useFetchUser";
import { updateUser } from "../api/requests";
import { User } from "../utils/types";
import Spinner from "./spinner";

const ProfileForm = () => {
  const queryClient = useQueryClient();
  const userId = useId();

  const userMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const { data, isLoading, error, isError } = useFetchUser(userId);

  const formik = useFormik<User>({
    enableReinitialize: true,
    initialValues: {
      id: userId,
      email: data?.email || "",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
    },
    onSubmit: async (data) => {
      userMutation.mutate(data);
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("This field is required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("This field is required"),
    }),
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className="mb-6 text-2xl text-zinc-600 font-medium">
        Personal Details
      </h1>

      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <fieldset>
          <label htmlFor="firstName" className="block mb-4 text-sm font-medium">
            First Name
          </label>

          <input
            className="w-full block border-2 p-3 rounded-md text-sm"
            id="firstName"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("firstName")}
          />

          {formik.touched.firstName && formik.errors.firstName ? (
            <p className="text-sm text-red-500">{formik.errors.firstName}</p>
          ) : null}
        </fieldset>

        <fieldset>
          <label htmlFor="lastName" className="block mb-4 text-sm font-medium">
            Last Name
          </label>

          <input
            className="w-full block border-2 p-3 rounded-md text-sm"
            id="lastName"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("lastName")}
          />

          {formik.touched.lastName && formik.errors.lastName ? (
            <p className="text-sm text-red-500">{formik.errors.lastName}</p>
          ) : null}
        </fieldset>

        <fieldset>
          <label htmlFor="email" className="block mb-4 text-sm font-medium">
            Email
          </label>

          <input
            className="w-full block border-2 p-3 rounded-md text-sm"
            id="email"
            type="text"
            disabled
            {...formik.getFieldProps("email")}
          />
        </fieldset>

        <div className="text-right">
          <button
            type="submit"
            className="text-white font-medium mt-8 px-5 py-2 bg-zinc-500 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
