import { useMutation } from "@tanstack/react-query"

import { fetchCoinTransfers } from "../queries"

export const useGetCoinTransfers = () => {
  return useMutation({
    mutationKey: ["coinTransfers"],
    mutationFn: fetchCoinTransfers,
  })
}
