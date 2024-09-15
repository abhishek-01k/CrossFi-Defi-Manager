export const shortenAddress = (address: string, length: number) => {
  if (address) {
    const addressShorted =
      address.slice(0, length) + "..." + address.slice(-length)
    return addressShorted
  } else {
    return null
  }
}
