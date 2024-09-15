export const getNFTsDataQuery = (page?: number) => {
  console.log("Page >>", page)

  return `
     query MyQuery {
  current_collections_v2 (
   limit: 10
   offset:${page}
  ) {
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

export const getNFTsDataQueryByCollectionId = (collectionId: string) => {
  // 0x7ac8cecb76edbbd5da40d719bbb9795fc5744e4098ee0ce1be4bb86c90f42301
  return `
  query MyQuery {
  current_collections_v2_by_pk(
    collection_id: "${collectionId}"
  ) {
    collection_id
    collection_name
    collection_properties
    creator_address
    current_supply
    description
    max_supply
    uri
  }
  current_token_datas_v2(
    limit: 15
    offset: 0
    where: {collection_id: {_eq: "${collectionId}"}}
  ) {
    token_name
    token_data_id
    token_uri
    current_token_ownerships {
      owner_address
      amount
    }
  }
}
  `
}

export const getNFTsDataQueryByCollectionName = (collectionName: string) => {
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
