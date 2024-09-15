export const getNFTActivitiesQueryById = (
  collectionId: string,
  page: number,
  pageSize: number
) => {
  return `query MyQuery {
  token_activities_v2(
    where: {current_token_data: {collection_id: {_eq: "${collectionId}"}}}
    order_by: {transaction_version: desc_nulls_last}
     limit: ${pageSize}
    offset: ${page}
  ) {
    after_value
    before_value
    entry_function_id_str
    from_address
    is_fungible_v2
    to_address
    transaction_version
    token_data_id
    token_amount
    transaction_timestamp
    current_token_data {
      token_name
    }
    event_index
    type
  }
}
  `
}


