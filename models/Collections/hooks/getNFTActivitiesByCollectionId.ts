import { useMutation } from "@tanstack/react-query"

import { fetchNFTActivitiesByCollectionId } from "../queries"

export const useGetNFTActivitiesByCollectionId = () => {
    return useMutation({
        mutationKey: ["NFTActivitiesByCollectionId"],
        mutationFn: fetchNFTActivitiesByCollectionId,
    })
}
