"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  useGetCollectionLists,
} from "@/models/Collections/hooks"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RotatingLines } from "react-loader-spinner"

import { APP_PATHS } from "@/config/Routes"
import { shortenAddress } from "@/lib/shortenAddress"
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

const CollectionPage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = 5

  const router = useRouter()

  const { isLoading, data: collectionLists } = useGetCollectionLists({
    page: currentPage - 1,
    limit: 10,
  })

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">CrossFi NFT Explorer</h1>

      <div className="mb-8">

        {isLoading && (
          <RotatingLines
            visible={true}
            width="40"
            strokeColor="#2c68e7"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        )}
        <Card>
          <CardHeader>
            <CardTitle>NFT Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>Supply</TableHead>
                  <TableHead>Holders</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Transfers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-[50vh]">
                {!collectionLists.length && <div>No Data available</div>}
                {collectionLists.length && collectionLists.map((collection: any, index: number) => {
                  return (
                    <TableRow
                      key={index}
                      className=" h-[50px] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      <TableCell
                        className="cursor-pointer hover:underline"
                      >
                        {collection.name ?? '-'}
                      </TableCell>
                      <TableCell>
                        {collection.tokenSymbol ?? '-'}
                      </TableCell>
                      <TableCell
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => {
                          if (collection?.creatorAddress)
                            router.push(
                              `${APP_PATHS.PROFILE}/${collection?.creator_address}`
                            )
                        }}
                      >
                        {shortenAddress(collection?.creatorAddress, 5)}
                      </TableCell>
                      <TableCell>
                        {collection.totalSupply?.toLocaleString() ?? 0}
                      </TableCell>
                      <TableCell>
                        {collection.holderCount?.toLocaleString() ?? 0}
                      </TableCell>
                      <TableCell>
                        {collection.tokenType}
                      </TableCell>
                      <TableCell>
                        {collection.transferCount?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {!!collectionLists.length && <div className="mt-4 flex items-center justify-between">
              <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                <ChevronLeft className="mr-2 size-4" />
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
                <ChevronRight className="ml-2 size-4" />
              </Button>
            </div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CollectionPage
