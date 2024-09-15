import { useMutation } from "@tanstack/react-query"

import { fetchCoinDetailsBySymbol } from "../queries"

export const useGetCoinDetailsBySymbol = () => {
  return useMutation({
    mutationKey: ["coinDetailsBySymbol"],
    mutationFn: (coinSymbol: string) => fetchCoinDetailsBySymbol(coinSymbol),
  })
}
