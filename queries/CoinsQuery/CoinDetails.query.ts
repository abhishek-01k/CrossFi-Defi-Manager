export const getCoinDetailsQueryByName = (coinName: string) => {
  return `
    query MyQuery {
        coin_infos(where: {name: {_regex: "${coinName}"}},limit: 20) {
        coin_type
        coin_type_hash
        creator_address
        decimals
        name
        supply_aggregator_table_handle
        supply_aggregator_table_key
        symbol
        transaction_created_timestamp
        transaction_version_created
        }
    }`
}

export const getCoinDetailsQueryBySymbol = (symbol: string) => {
  return `
  query MyQuery {
    coin_infos(where: {symbol: {_regex: "${symbol}"}}, limit: 20) {
      coin_type
      coin_type_hash
      creator_address
      decimals
      name
      supply_aggregator_table_handle
      supply_aggregator_table_key
      symbol
      transaction_created_timestamp
      transaction_version_created
    }
  }
`
}
