"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  useGetCollectionDetailsByName,
  useGetCollectionLists,
} from "@/models/Collections/hooks"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { RotatingLines } from "react-loader-spinner"

import { APP_PATHS } from "@/config/Routes"
import { shortenAddress } from "@/lib/shortenAddress"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/crossfi-manager/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/crossfi-manager/components/ui/card"
import { Input } from "@/crossfi-manager/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/crossfi-manager/components/ui/table"

const CollectionPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const [searchCollectionDetails, setSearchCollectionDetails] = useState([])

  const totalPages = 10

  const router = useRouter()

  const { isLoading, data: collectionLists } = useGetCollectionLists({
    page: currentPage - 1,
    pageSize: 10,
  })

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const { mutate: fetchCollectionDetailsByName, isPending: searching } =
    useGetCollectionDetailsByName()

  const handleSearchCollectionByName = async () => {
    if (searchTerm) {
      fetchCollectionDetailsByName(
        {
          collectionName: searchTerm,
        },
        {
          onSuccess: (res) => {
            setSearchCollectionDetails(res)
          },
          onError: (err) => {
            console.log("Err", err)
            toast({
              variant: "destructive",
              title: "Error in fetching collection details",
            })
          },
        }
      )
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">Aptos NFT Explorer</h1>

      <div className="mb-8">
        <div className="mb-4 flex gap-4">
          <Input
            type="text"
            placeholder="Search NFT collections by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
          />
          <Button onClick={handleSearchCollectionByName}>
            <Search className="mr-2 size-4" />
            Search
          </Button>
          <Button
            disabled={searchTerm.length <= 0}
            onClick={() => {
              setSearchTerm("")
              setSearchCollectionDetails([])
            }}
          >
            Clear
          </Button>
        </div>

        {searching ||
          (isLoading && (
            <RotatingLines
              visible={true}
              width="40"
              strokeColor="#2c68e7"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ))}

        {searchCollectionDetails.length ? (
          <Card>
            <CardHeader>
              <CardTitle>NFT Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Index</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Current Supply</TableHead>
                    <TableHead>Max Supply</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="h-[50vh]">
                  {!searchCollectionDetails.length && (
                    <div>No Data available</div>
                  )}
                  {searchCollectionDetails.map(
                    (collection: any, index: number) => {
                      const hexCollectionId = `0x${collection.collection_id}`
                      return (
                        <TableRow
                          key={index}
                          className="h-[50px] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell
                            className="cursor-pointer text-blue-500 hover:underline"
                            onClick={() =>
                              router.push(
                                `${APP_PATHS.NFTS}/${hexCollectionId}`
                              )
                            }
                          >
                            {collection.collection_name}
                          </TableCell>
                          <TableCell
                            className="cursor-pointer text-blue-500 hover:underline"
                            onClick={() => {
                              if (collection?.creator_address)
                                router.push(
                                  `${APP_PATHS.PROFILE}/${collection?.creator_address}`
                                )
                            }}
                          >
                            {shortenAddress(collection?.creator_address, 5)}
                          </TableCell>
                          <TableCell>
                            {collection.current_supply?.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {collection.max_supply?.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      )
                    }
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>NFT Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Index</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Supply</TableHead>
                    <TableHead>Transfers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="h-[50vh]">
                  {!collectionLists.length && <div>No Data available</div>}
                  {collectionLists.map((collection: any, index: number) => {
                    const hexCollectionId = `0x${collection.collection_data_id_hash}`
                    return (
                      <TableRow
                        key={index}
                        className=" h-[50px] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                      >
                        <TableCell>{collection.rank}</TableCell>
                        <TableCell
                          className="cursor-pointer text-blue-500 hover:underline"
                          onClick={() =>
                            router.push(`${APP_PATHS.NFTS}/${hexCollectionId}`)
                          }
                        >
                          {collection.collection_name}
                        </TableCell>
                        <TableCell
                          className="cursor-pointer text-blue-500 hover:underline"
                          onClick={() => {
                            if (collection?.creator_address)
                              router.push(
                                `${APP_PATHS.PROFILE}/${collection?.creator_address}`
                              )
                          }}
                        >
                          {shortenAddress(collection?.creator_address, 10)}
                        </TableCell>
                        <TableCell>
                          {collection.supply?.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {collection.transfer_count?.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              <div className="mt-4 flex items-center justify-between">
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
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default CollectionPage
