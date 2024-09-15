export const getCoinTransferQuery = (
  coinType: string,
  page: number,
  pageSize: number
) => {
  return `
    query MyQuery {
    coin_activities(
      limit: ${pageSize}
      offset: ${page}
      order_by: {block_height: desc}
      where: {coin_type: {_eq: "${coinType}"}}
    ) {
      activity_type
      amount
      coin_type
      transaction_version
      transaction_timestamp
      owner_address
      is_transaction_success
    }
}
    `
}
