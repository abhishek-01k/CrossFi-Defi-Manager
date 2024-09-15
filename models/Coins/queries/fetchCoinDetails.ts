export const fetchCoinDetailsByName = async (
  coinName: string
): Promise<any> => {
  const res = await fetch("/api/fetchCoinDetailsByName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ coinName: coinName }),
  })
  const response = await res.json()
  console.log("Response", response)
  if (response.data) {
    return response.data.coin_infos
  } else {
    throw new Error("Error in fetching Coin Details, Please try again later")
  }
}

export const fetchCoinDetailsBySymbol = async (
  coinSymbol: string
): Promise<any> => {
  const res = await fetch("/api/fetchCoinDetailsBySymbol", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symbol: coinSymbol }),
  })
  const response = await res.json()
  console.log("Response", response)
  if (response.data) {
    return response.data.coin_infos
  } else {
    throw new Error("Error in fetching Coin Details, Please try again later")
  }
}
