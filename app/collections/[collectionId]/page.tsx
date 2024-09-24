import React from "react"

import { NFTCollectionData } from "@/components/collections"

const CollectionIdPage = async ({ params }: { params: any }) => {
  const { collectionId } = params
  return <NFTCollectionData collectionId={collectionId} />
}

export default CollectionIdPage
