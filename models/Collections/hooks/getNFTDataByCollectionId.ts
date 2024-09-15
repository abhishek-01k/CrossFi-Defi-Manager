import { useMutation } from "@tanstack/react-query"

import { fetchNFTDataByCollectionId } from "../queries"

export const useGetNFTDataByCollectionId = () => {
    return useMutation({
        mutationKey: ["NFTDataByCollectionId"],
        mutationFn: fetchNFTDataByCollectionId,
    })
}
