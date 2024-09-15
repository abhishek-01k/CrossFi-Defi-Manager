"use client"

import React, { useContext } from "react"
import { useRouter } from "next/navigation"
import { GlobalContext } from "@/context/GlobalContext"
import { Copy } from "lucide-react"

import { APP_PATHS } from "@/config/Routes"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NFTTransferComponent = () => {
  const { NFTsTransferData } = useContext(GlobalContext)

  const router = useRouter()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Collection</TableHead>
          <TableHead>Token ID</TableHead>
          <TableHead>Action Type</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {NFTsTransferData.map((transfer: any, index) => {
          const fromAddress = transfer.from_address
            ? transfer.from_address.slice(0, 10)
            : "NULL"
          const toAddress = transfer.to_address
            ? transfer.to_address.slice(0, 10)
            : "NULL"
          const action_type = transfer.type
            ? transfer.type.split("::").slice(2)
            : "NULL"
          return (
            <TableRow key={index}>
              <TableCell>
                <div className="flex cursor-pointer flex-row items-center gap-1">
                  {fromAddress}
                  {fromAddress !== "NULL" && (
                    <span>
                      <Copy
                        size={12}
                        onClick={() => {
                          navigator.clipboard.writeText(transfer.from_address)
                        }}
                      />
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex cursor-pointer flex-row items-center gap-1">
                  {toAddress}
                  {toAddress !== "NULL" && (
                    <span>
                      <Copy
                        size={12}
                        onClick={() => {
                          navigator.clipboard.writeText(transfer.to_address)
                        }}
                      />
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => {
                  router.push(
                    `${APP_PATHS.NFTS}/${transfer.current_token_data.collection_id}`
                  )
                }}
              >
                {transfer.current_token_data.current_collection.collection_name}
              </TableCell>
              <TableCell>{transfer.current_token_data.token_name}</TableCell>
              <TableCell>{action_type}</TableCell>
              <TableCell>
                {new Date(transfer.transaction_timestamp).toLocaleDateString()}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export { NFTTransferComponent }
