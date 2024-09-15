export const getTokensDataQueryByAccount = (accountAddress: string) => {
  return `
    query MyQuery {
  current_fungible_asset_balances(
    offset: 0
    where: {owner_address: {_eq: "${accountAddress}"}}
  ) {
    owner_address
    amount
    asset_type
    storage_id
    is_frozen
    token_standard
    metadata {
      asset_type
      creator_address
      decimals
      name
      symbol
      token_standard
      maximum_v2
      supply_v2
    }
  }
     fungible_asset_activities(
      limit: 10
      offset: 0
      where: {owner_address: {_eq: "${accountAddress}"}}
    ) {
      amount
      asset_type
      block_height
      owner_address
      entry_function_id_str
      event_index
      gas_fee_payer_address
      is_frozen
      is_gas_fee
      is_transaction_success
      storage_id
      storage_refund_amount
      token_standard
      transaction_timestamp
      transaction_version
      type
      metadata {
        asset_type
        name
        decimals
        symbol
      }
    }
}
`
}
