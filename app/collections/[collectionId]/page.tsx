import React from "react"

import { NFTCollectionData } from "@/crossfi-manager/components/collections"

const CollectionIdPage = async ({ params }: { params: any }) => {
  const { collectionId } = params
  return <NFTCollectionData collectionId={collectionId} />
}

export default CollectionIdPage
