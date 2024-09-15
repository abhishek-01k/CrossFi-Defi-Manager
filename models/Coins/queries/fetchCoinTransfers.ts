type CoinTransferType = {
  coinType: string
  page: number
  pageSize: number
}
export const fetchCoinTransfers = async ({
  coinType,
  page,
  pageSize,
}: CoinTransferType) => {
  const res = await fetch("/api/fetchCoinTransfers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coinType: coinType,
      page: page,
      pageSize: pageSize,
    }),
  })
  const response = await res.json()
  console.log("Response", response)
  if (response.data) {
    return response.data.coin_activities
  } else {
    throw new Error("Error in fetching Coin Details, Please try again later")
  }
}
