"use client"

import React, { useContext } from "react"
import { GlobalContext } from "@/context/GlobalContext"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TokenTransferComponent = () => {
  const { TokenTransferData } = useContext(GlobalContext)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Action Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Asset Type</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TokenTransferData.map((transfer: any, index) => {
          const balance = transfer.metadata
            ? transfer.amount / 10 ** transfer.metadata.decimals
            : transfer.amount
          const action_type = transfer.type.split("::").slice(2)
          const asset_type = transfer.asset_type.split("::").slice(2)
          return (
            <TableRow key={index}>
              <TableCell>
                {transfer.is_transaction_success ? "✅" : "❌"}
              </TableCell>
              <TableCell>{action_type}</TableCell>
              <TableCell>{balance.toFixed(4)}</TableCell>
              <TableCell>{transfer.metadata?.symbol}</TableCell>
              <TableCell>{asset_type}</TableCell>
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

export { TokenTransferComponent }
