import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const UserTokenComponent = ({ tokensData }: { tokensData: any[] }) => {
  console.log("tokensData", tokensData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coin Balances</CardTitle>
      </CardHeader>
      <CardContent>
        {tokensData.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Coin Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokensData.map((coin: any, index) => {
                const balance = coin.balance / 10 ** coin.contract_decimals;
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {coin?.contract_name}
                    </TableCell>
                    <TableCell>{balance.toLocaleString()}</TableCell>
                    <TableCell>
                      {coin.contract_ticker_symbol}
                    </TableCell>
                    <TableCell className="capitalize">
                      {coin.type}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <p>No Tokens Data Available</p>
        )}
      </CardContent>
    </Card>
  )
}

export { UserTokenComponent }
