import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/requests";

const useFetchProducts = () => {
  return useQuery(["products"], getProducts, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
  });
};

export default useFetchProducts;
