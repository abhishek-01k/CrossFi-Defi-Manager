export const fetchNFTDataByCollectionId = async ({
    collectionId,
}: {
    collectionId: string
}) => {
    const res = await fetch("/api/fetchNFTData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            collectionId: collectionId,
        }),
    })
    const response = await res.json()
    console.log("Response", response)
    if (response.data) {
        return response.data.current_collections_v2_by_pk

    } else {
        throw new Error("Error in fetching Coin Details, Please try again later")
    }
}
