import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:4000";

export default axios.create({ baseURL: BASE_URL, withCredentials: true });

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export function getErrorStatus(error: unknown) {
  if (error instanceof AxiosError) return error.response?.status;
}
