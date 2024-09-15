import { useMutation } from "@tanstack/react-query"

import { fetchCoinDetailsByName } from "../queries"

export const useGetCoinDetailsByName = () => {
  return useMutation({
    mutationKey: ["coinDetailsByName"],
    mutationFn: (coinName: string) => fetchCoinDetailsByName(coinName),
  })
}
