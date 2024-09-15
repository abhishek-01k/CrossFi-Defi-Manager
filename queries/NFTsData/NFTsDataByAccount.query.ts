export const getNFTsDataQueryByAccount = (accountAddress: string) => {
  return `
    query MyQuery {
   current_token_ownerships_v2(
    offset: 0
    where: {owner_address: {_eq: "${accountAddress}"}}
  ) {
    amount
    last_transaction_timestamp
    last_transaction_version
    owner_address
    storage_id
    table_type_v1
    token_data_id
    token_standard
    current_token_data {
      collection_id
      token_name
      token_uri
      current_collection {
        creator_address
        collection_name
        description
        current_supply
        uri
      }
    }
  }
  token_activities_v2(
      offset: 0
      where: {event_account_address: {_eq: "${accountAddress}"}}
    ) {
      transaction_version
      type
      transaction_timestamp
      token_standard
      token_data_id
      token_amount
      to_address
      from_address
      event_index
      event_account_address
      entry_function_id_str
      current_token_data {
        collection_id
        token_data_id
        token_name
        token_uri
        current_collection {
          collection_name
          collection_id
        }
      }
    }
}
`
}
