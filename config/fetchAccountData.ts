export const fetchAccountData = async (address: string) => {
  // const accountAddress = "0x274c398a921b8e2ba345feac3039e1c8b196a7eb1395cdd3584af3a85eb9ec50";
  // const accountAddress =
  //   "0x3be173d51e3338e21f131459aeccfdbe4f009227943948daba21702d3c1c27e7"

  try {
    const res = await fetch("/api/fetchAccountData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountAddress: address }),
    })
    const response = await res.json()

    if (response.errors) {
      console.log("Errors in fetcing token activities", response.errors)
      return null
    } else {
      console.log("Fetched user data successfully >>", response)
      return response.data
    }
  } catch (error) {
    console.log("Error", error)
    return null
  }
}
