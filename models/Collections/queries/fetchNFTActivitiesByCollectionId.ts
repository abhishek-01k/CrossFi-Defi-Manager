export const fetchNFTActivitiesByCollectionId = async ({
    collectionId,
    page,
    pageSize
}: {
    collectionId: string
    page: number
    pageSize: number
}) => {
    const res = await fetch("/api/fetchNFTActivitiesById", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            collectionId,
            page,
            pageSize
        }),
    })
    const response = await res.json()
    console.log("Response", response)
    if (response.data) {
        return response.data.token_activities_v2
    } else {
        throw new Error("Error in fetching Coin Details, Please try again later")
    }
}
