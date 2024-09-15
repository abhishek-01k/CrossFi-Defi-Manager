import React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import NFTCollectionActivities from "./NFTCollectionActivities"
import NFTCollectionInventory from "./NFTCollectionInventory"

const NFTCollectionBody = ({ collectionId }: { collectionId: string }) => {
  return (
    <div>
      <Tabs defaultValue="Transfers">
        <TabsList className="">
          <TabsTrigger value="Transfers">Transfers</TabsTrigger>
          <TabsTrigger value="Inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="Transfers">
          <NFTCollectionActivities collectionId={collectionId} />
        </TabsContent>
        <TabsContent value="Inventory">
          <NFTCollectionInventory collectionId={collectionId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default NFTCollectionBody
