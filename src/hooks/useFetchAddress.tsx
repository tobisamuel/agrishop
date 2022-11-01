import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Address } from "../utils/types";
import useAuth from "../hooks/useAuth";

const useFetchAddress = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useAuth();

  const getAddresses = async (userId: string) => {
    const response = await axiosPrivate.get<Address[]>(`/addresses/${userId}`);
    return response.data;
  };

  const addressQuery = useQuery(
    ["addresses", userId],
    () => getAddresses(userId),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return addressQuery;
};

export default useFetchAddress;
