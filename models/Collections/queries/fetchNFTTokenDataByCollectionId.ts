export const fetchNFTTokenDataByCollectionId = async ({
    collectionId,
    page,
    pageSize
}: {
    collectionId: string
    page: number
    pageSize: number
}) => {
    const res = await fetch("/api/fetchNFTTokenData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            collectionId: collectionId,
            page,
            pageSize
        }),
    })
    const response = await res.json()
    console.log("Response", response)
    if (response.data) {
        return response.data.current_token_datas_v2

    } else {
        throw new Error("Error in fetching Coin Details, Please try again later")
    }
}
