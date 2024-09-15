import { useMutation } from "@tanstack/react-query"

import { fetchNFTTokenDataByCollectionId } from "../queries"

export const useGetNFTTokenDataByCollectionId = () => {
    return useMutation({
        mutationKey: ["NFTTokenDataByCollectionId"],
        mutationFn: fetchNFTTokenDataByCollectionId,
    })
}
