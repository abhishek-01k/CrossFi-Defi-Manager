import React from "react"
import { useRouter } from "next/navigation"

import { APP_PATHS } from "@/config/Routes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const UserNFTComponent = ({ NFTsData }: { NFTsData: any[] }) => {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>NFTs</CardTitle>
      </CardHeader>
      <CardContent>
        {NFTsData.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Collection Name</TableHead>
                <TableHead>Curr_Supply</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {NFTsData.map((nft: any, index) => {
                const amount = nft.amount
                const action_type = nft.table_type_v1

                if (amount > 0) {
                  return (
                    <TableRow key={index}>
                      <TableCell>{nft.current_token_data.token_name}</TableCell>
                      <TableCell>{nft.amount}</TableCell>
                      <TableCell
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => {
                          router.push(
                            `${APP_PATHS.NFTS}/${nft.current_token_data.collection_id}`
                          )
                        }}
                      >
                        {
                          nft.current_token_data.current_collection
                            .collection_name
                        }
                      </TableCell>
                      <TableCell>
                        {
                          nft.current_token_data.current_collection
                            .current_supply
                        }
                      </TableCell>
                      <TableCell>{action_type}</TableCell>
                      <TableCell>{nft.token_standard}</TableCell>
                    </TableRow>
                  )
                } else {
                  return null
                }
              })}
            </TableBody>
          </Table>
        ) : (
          <p>No NFTs Data Available</p>
        )}
      </CardContent>
    </Card>
  )
}

export { UserNFTComponent }
