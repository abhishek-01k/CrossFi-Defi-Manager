import { NODEREAL_URL } from "@/config/url.config"

type CoinListsPayload = {
  page: number
  limit: number
}

export const fetchCoinLists = async ({ page, limit }: CoinListsPayload) => {
  try {
    const res = await fetch("/api/crossFi/fetchTokenList", {
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
