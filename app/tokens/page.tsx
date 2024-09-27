"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  useGetCoinLists,
} from "@/models/Coins"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RotatingLines } from "react-loader-spinner"

import { APP_PATHS } from "@/config/Routes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { shortenAddress } from "@/lib/shortenAddress"

export default function TokenPage() {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = 10
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const { isLoading, data: coinLists } = useGetCoinLists({
    page: currentPage - 1,
    limit: 10,
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">CrossFi Coin Explorer</h1>

      <div className="mb-8">
        {isLoading && <RotatingLines
          visible={true}
          width="40"
          strokeColor="#2c68e7"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />}

        <Card>
          <CardHeader>
            <CardTitle>Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Holders</TableHead>
                  <TableHead>Transfers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-[50vh]">
                {!coinLists.length && <RotatingLines
                  visible={true}
                  width="40"
                  strokeColor="#2c68e7"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />}
                {!!coinLists.length && coinLists.map((coin: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{coin.name}</TableCell>
                    <TableCell
                      className="cursor-pointer text-blue-500 hover:underline"
                      onClick={() => {
                        router.push(`${APP_PATHS.PROFILE}/${coin.contractAddress}`)
                      }}>
                      {shortenAddress(coin.contractAddress, 5)}
                    </TableCell>
                    <TableCell>{coin?.tokenSymbol}</TableCell>
                    <TableCell>
                      {coin.holderCount}
                    </TableCell>
                    <TableCell>
                      {coin.transferCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {!!coinLists.length && (
              <div className="mt-4 flex items-center justify-between">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
