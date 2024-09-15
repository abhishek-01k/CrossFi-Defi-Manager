import { NODEREAL_URL } from "@/config/url.config"

type CollectionListsPayload = {
  page: number
  pageSize: number
}

export const fetchCollectionLists = async ({
  page,
  pageSize,
}: CollectionListsPayload) => {
  const url = `${NODEREAL_URL}/api/collection?page=${page}&pageSize=${pageSize}&network=Mainnet`
  const res = await fetch(url)
  const response = await res.json()
  if (response.msg === "success") {
    return response.data
  } else {
    throw new Error("Error in fetching Coin details")
  }
}
