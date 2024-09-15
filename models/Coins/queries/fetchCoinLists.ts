import { NODEREAL_URL } from "@/config/url.config"

type CoinListsPayload = {
  page: number
  pageSize: number
}

export const fetchCoinLists = async ({ page, pageSize }: CoinListsPayload) => {
  const url = `${NODEREAL_URL}/api/coin?page=${page}&pageSize=${pageSize}`
  const res = await fetch(url)
  const response = await res.json()
  if (response.msg === "success") {
    return response.data.coins_list
  } else {
    throw new Error("Error in fetching Coin details")
  }
}

export const fetchCoinPrice = async (tokenId: string) => {
  const url = `${NODEREAL_URL}/api/coin/${tokenId}`
  const res = await fetch(url)
  const response = await res.json()
  console.log("Response", response)
  if (response.msg === "success") {
    return response.data
  } else {
    throw new Error("Error in fetching Coin Price")
  }
}
