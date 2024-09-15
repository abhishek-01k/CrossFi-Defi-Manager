import { useMutation } from "@tanstack/react-query"

import { fetchNFTCollectionByName } from "../queries"

export const useGetCollectionDetailsByName = () => {
  return useMutation({
    mutationKey: ["collectionDetailsByName"],
    mutationFn: fetchNFTCollectionByName,
  })
}
