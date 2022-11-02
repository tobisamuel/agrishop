import axios, { axiosPrivate } from "./axios";
import { SignUpFormInputs } from "../components/SignupForm";
import { UserFormInputs } from "../components/SigninForm";
import { Address, LoginResponse, Product, User } from "../utils/types";
import { AddressFormInputs } from "../components/AddressForm";

export const userSignup = async (data: SignUpFormInputs) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: UserFormInputs) => {
  const response = await axios.post<LoginResponse>("/auth/user/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.get("/logout");
  return response.data;
};

export const refreshToken = async () => {
  const response = await axios.get<LoginResponse>("/refresh");
  return response.data;
};

export const getUser = async (userId: string) => {
  const response = await axiosPrivate.get<User>(`/users/${userId}`);
  return response.data;
};

export const getAddresses = async (userId: string) => {
  const response = await axiosPrivate.get<Address[]>(`/addresses/${userId}`);
  return response.data;
};

export const createAddress = async (data: AddressFormInputs) => {
  const response = await axiosPrivate.post<Address>(`/addresses`, data);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get<Product[]>(`/products`);
  return response.data;
};

export const getProduct = async (slug: string | undefined) => {
  const response = await axios.get<Product>(`/products/${slug}`);
  return response.data;
};

// export const createOrder =async (data:OrderForm) => {

// }

export const updateUser = async (data: User): Promise<User> => {
  const { _id, ...rest } = data;
  const response = await axiosPrivate.put(`/users/${_id}`, rest);
  return response.data;
};

type PassArgs = {
  id: string;
  oldPassword: string;
  newPassword: string;
};

export const changePassword = async (data: PassArgs) => {
  const response = await axiosPrivate.post("/users/password", data);

  return response.data;
};
