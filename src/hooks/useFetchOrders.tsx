import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Order } from "../utils/types";
import useAuth from "../hooks/useAuth";

const useFetchOrders = ({ status = "pending" } = {}) => {
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useAuth();

  const getOrders = async (userId: string, status: string) => {
    const response = await axiosPrivate.get<Order[]>(
      `/users/${userId}/orders?status=${status}`
    );
    return response.data;
  };

  const orderQuery = useQuery(
    ["orders", { userId, status }],
    () => getOrders(userId, status),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return orderQuery;
};

export default useFetchOrders;
