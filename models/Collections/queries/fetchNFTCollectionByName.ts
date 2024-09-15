export const fetchNFTCollectionByName = async ({
  collectionName,
}: {
  collectionName: string
}) => {
  const res = await fetch("/api/fetchNFTCollectionByCollectionName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: collectionName,
    }),
  })
  const response = await res.json()
  console.log("Response", response)
  if (response.data) {
    return response.data.current_collections_v2
  } else {
    throw new Error("Error in fetching Coin Details, Please try again later")
  }
}
