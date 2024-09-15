export const getNFTCollectionDataByCollectionNameQuery = (
  collectionName: string
) => {
  return `
    query MyQuery {
    current_collections_v2(where: {collection_name: {_regex: "${collectionName}"}}) {
      collection_id
      collection_name
      collection_properties
      creator_address
      current_supply
      description
      max_supply
      total_minted_v2
    }
  }
    `
}


export const getNFTDataQueryByCollectionId = (collectionId: string) => {
  return `
query MyQuery {
  current_collections_v2_by_pk(
  collection_id: "${collectionId}"
) {
  collection_name
  creator_address
  current_supply
  description
  max_supply
  total_minted_v2
  }
}
  `
}

export const getNFTTokenDataByCollectionId = (collectionId: string, page: number, pageSize: number) => {
  return `
  query MyQuery {
  current_token_datas_v2(
    where: {collection_id: {_eq: "${collectionId}"}}
    order_by: {last_transaction_version: desc_nulls_last}
      limit: ${pageSize}
    offset: ${page}
  ) {
    token_name
    token_data_id
    token_uri
    supply
    maximum
    last_transaction_version
    description
    decimals
    current_token_ownerships {
      owner_address
      amount
      last_transaction_version
      last_transaction_timestamp
      token_data_id
      token_standard
    }
  }
}
`
}