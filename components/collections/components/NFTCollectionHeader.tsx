import React from "react"

import { shortenAddress } from "@/lib/shortenAddress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const NFTCollectionHeader = ({ nftDetail }: { nftDetail: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{nftDetail.collection_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <div>
            <p className="mb-4 text-sm text-gray-600">
              {nftDetail.description}
            </p>
            <div className="flex flex-row gap-4">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Creator</CardTitle>
                </CardHeader>
                <CardContent>
                  {" "}
                  {shortenAddress(nftDetail?.creator_address, 10)}{" "}
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Curr Supply</CardTitle>
                </CardHeader>
                <CardContent>
                  {nftDetail.current_supply.toLocaleString()}
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Total Supply</CardTitle>
                </CardHeader>
                <CardContent>{nftDetail.max_supply}</CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NFTCollectionHeader
