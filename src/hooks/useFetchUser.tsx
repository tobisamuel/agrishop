import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { User } from "../utils/types";
import useAuth from "../hooks/useAuth";

const useFetchUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useAuth();

  const getUser = async (id: string) => {
    const response = await axiosPrivate.get<User>(`/users/${id}`);
    return response.data;
  };

  const userQuery = useQuery(["user", userId], () => getUser(userId), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const user = userQuery.data;

  return userQuery;
};

export default useFetchUser;
