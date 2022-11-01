import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/requests";

const useFetchProduct = (slug: string | undefined) => {
  return useQuery(["products", slug], () => getProduct(slug), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
  });
};

export default useFetchProduct;
