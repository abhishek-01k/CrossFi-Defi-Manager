import { useQuery } from "@tanstack/react-query"

import { fetchCoinPrice } from "../queries"

export const useGetCoinPrice = ({ tokenId }: { tokenId: string }) => {
  return useQuery({
    queryKey: ["Coins Price", tokenId],
    queryFn: () => fetchCoinPrice(tokenId),
    enabled: !!tokenId,
    retry: false,
  })
}
