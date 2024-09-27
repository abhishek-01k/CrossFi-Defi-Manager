import { NODEREAL_URL } from "@/config/url.config"

type CollectionListsPayload = {
  page: number
  limit: number
}

export const fetchCollectionLists = async ({
  page,
  limit,
}: CollectionListsPayload) => {
  try {
    const res = await fetch("/api/crossFi/fetchNFTList", {
      method: "POST",
      body: JSON.stringify({
        page,
        limit,
      }),
    })
    const response = await res.json()
    return response.data
  } catch (error) {
    console.log("Error", error)
    throw new Error("Error in fetching Coin details")
  }
}
