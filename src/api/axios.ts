import axios, { AxiosError } from "axios";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export default axios.create({ baseURL: DATABASE_URL, withCredentials: true });

export const axiosPrivate = axios.create({
  baseURL: DATABASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export function getErrorStatus(error: unknown) {
  if (error instanceof AxiosError) return error.response?.status;
}
